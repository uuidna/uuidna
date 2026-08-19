// readAloudLogic — ReadAloud.vue's testable core, pulled out of the component on purpose: a .vue file can't be
// unit-tested by Node's own test runner, so the logic that actually matters (does stop() really cancel speech? does
// the chunk queue actually reach "Finished reading" instead of stalling? does voice selection pick the right one?)
// lived untested after the first ship — verified once, by hand, in one browser session, then never checked again.
// This file takes the browser (speechSynthesis, document) as INJECTED dependencies instead of reading globals, so
// readAloudLogic.test.ts can supply a fake and run the exact same code Node's test runner already runs for the
// other 241 tests — wired into `npm run audit` (test:docs) so a regression here fails the SAME gate everything
// else does, not something that has to be remembered and re-checked by hand next time this file changes.

export interface VoiceLike { name: string; lang: string; default: boolean }
export interface UtteranceLike { onend: (() => void) | null; onerror: (() => void) | null; voice: VoiceLike | null; pitch: number }
export interface SpeechLike {
  speak(u: UtteranceLike): void
  cancel(): void
  pause(): void
  resume(): void
}

// Split into sentence-scale chunks — more robust across browsers than one very long utterance, and lets pause/
// resume land at a natural boundary instead of mid-sentence silence.
export function chunksOf(text: string): string[] {
  return text
    .split(/(?<=[.!?:])\s+(?=[A-Z0-9])|\n{2,}/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

// A curated preference list of natural-sounding system voices, tried in order for the page's own language before
// falling back to whatever the browser considers default — no claim any of these is "the best" universally, just
// a better starting point than an unreviewed default. Extend per-language as real gaps are found, not guessed.
export const PREFERRED_VOICES: Readonly<Record<string, readonly string[]>> = {
  'en': ['Samantha', 'Ava', 'Zoe', 'Alex'],
  'en-us': ['Samantha', 'Ava', 'Zoe', 'Alex'],
  'en-gb': ['Kate', 'Serena', 'Stephanie'],
}

export function pickVoice(voices: readonly VoiceLike[], htmlLang: string): VoiceLike | null {
  if (voices.length === 0) return null
  const lang = htmlLang.toLowerCase()
  const names = PREFERRED_VOICES[lang] || PREFERRED_VOICES[lang.split('-')[0]] || []
  for (const name of names) {
    const v = voices.find((x) => x.name === name)
    if (v) return v
  }
  // fall back to any voice matching the page's language, preferring one NOT flagged default (often the more
  // robotic system pick) if a non-default alternative exists in that language
  const inLang = voices.filter((v) => v.lang.toLowerCase().startsWith(lang.split('-')[0]))
  return inLang.find((v) => !v.default) || inLang[0] || voices[0] || null
}

// quantumAura's `ray` is 0..6 (the ℤ/7 rosette) — mapped onto a narrow 0.90..1.10 pitch band, the SAME ray a
// page's colour aura already reads, so ray N always means the same voice character everywhere it appears.
export function pitchFromRay(ray: number): number {
  return 0.9 + (ray / 6) * 0.2
}

export type ReadAloudPhase = 'idle' | 'reading' | 'paused'
export interface ReadAloudState { phase: ReadAloudPhase; status: string }

/** createReadAloudController(speech, makeUtterance) → the state machine ReadAloud.vue drives, with the browser's
 *  speechSynthesis injected rather than read from `window` — so a test supplies a fake and drives the exact
 *  transitions a real click sequence would. Owns its own state; read it via getState() after any call, or via
 *  the optional onChange callback — REQUIRED for the async transitions (speakNext's onend/onerror fire later,
 *  outside any start()/toggle()/stop() call, so a caller that only reads getState() right after calling one of
 *  those methods misses every transition that happens after — exactly the bug the first version of this
 *  component shipped with: the UI never re-synced when a chunk naturally finished playing). */
export function createReadAloudController(
  speech: SpeechLike,
  makeUtterance: (text: string) => UtteranceLike,
  onChange?: (s: ReadAloudState) => void,
) {
  let utterances: UtteranceLike[] = []
  let queueIndex = 0
  let phase: ReadAloudPhase = 'idle'
  let status = ''
  const set = (p: ReadAloudPhase, s: string) => { phase = p; status = s; onChange?.({ phase, status }) }

  const speakNext = () => {
    if (queueIndex >= utterances.length) { set('idle', 'Finished reading.'); return }
    const u = utterances[queueIndex]
    u.onend = () => { queueIndex++; speakNext() }
    u.onerror = () => { set('idle', 'Reading stopped — a speech error occurred.') }
    speech.speak(u)
  }

  const start = (text: string, voice: VoiceLike | null, pitch: number) => {
    if (!text) { set(phase, 'Nothing on this page to read.'); return }
    speech.cancel()
    utterances = chunksOf(text).map((chunk) => {
      const u = makeUtterance(chunk)
      if (voice) u.voice = voice
      u.pitch = pitch
      return u
    })
    queueIndex = 0
    set('reading', 'Reading page aloud. Press the button again to pause.')
    speakNext()
  }

  return {
    getState: (): ReadAloudState => ({ phase, status }),
    start,
    toggle(text: string, voice: VoiceLike | null, pitch: number) {
      if (phase === 'idle') { start(text, voice, pitch); return }
      if (phase === 'reading') { speech.pause(); set('paused', 'Paused.'); return }
      if (phase === 'paused') { speech.resume(); set('reading', 'Resuming.'); return }
    },
    stop() {
      speech.cancel()
      set('idle', 'Stopped.')
    },
  }
}
