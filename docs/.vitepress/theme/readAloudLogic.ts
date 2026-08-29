// readAloudLogic — ReadAloud.vue's testable core, pulled out of the component on purpose: a .vue file can't be
// unit-tested by Node's own test runner, so the logic that actually matters (does stop() really cancel speech? does
// the chunk queue actually reach "Finished reading" instead of stalling? does voice selection pick the right one?)
// lived untested after the first ship — verified once, by hand, in one browser session, then never checked again.
// This file takes the browser (speechSynthesis, document) as INJECTED dependencies instead of reading globals, so
// readAloudLogic.test.ts can supply a fake and run the exact same code Node's test runner already runs for the
// other 241 tests — wired into `npm run audit` (test:docs) so a regression here fails the SAME gate everything
// else does, not something that has to be remembered and re-checked by hand next time this file changes.

import { toUuid } from '../../../dist/address.js'
import { DIMENSIONS } from '../../../src/dimensions.js'
import { handleOf } from '../../../dist/handle.js'

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

/** the primary subtag of a BCP-47 tag: 'en-GB' → 'en'. Underscores tolerated — some engines report en_GB. */
const primaryOf = (tag: string): string => tag.toLowerCase().split(/[-_]/)[0]

/** one ladder, tried within a pool: curated name, then non-default, then first — the same preference at every
 *  level so a dialect never loses to a merely-famous voice from a sibling dialect. */
const bestOf = (pool: readonly VoiceLike[], names: readonly string[]): VoiceLike | null => {
  for (const name of names) {
    const v = pool.find((x) => x.name === name)
    if (v) return v
  }
  return pool.find((v) => !v.default) || pool[0] || null
}

/** THE DIALECT IS RESPECTED BEFORE THE LANGUAGE. Asked for en-GB, this exhausts en-GB voices before it will
 *  ever fall back to en-US — the first version filtered by primary subtag alone, so a requested dialect could
 *  silently lose to a curated voice from a sibling dialect. Exact dialect pool first, then the language pool,
 *  then whatever exists: a voice is always returned if any voice exists, but never a wrong-dialect one while a
 *  right-dialect one is installed. */
export function pickVoice(voices: readonly VoiceLike[], htmlLang: string): VoiceLike | null {
  if (voices.length === 0) return null
  const lang = htmlLang.toLowerCase().replace('_', '-')
  const names = PREFERRED_VOICES[lang] || PREFERRED_VOICES[primaryOf(lang)] || []
  const exact = voices.filter((v) => v.lang.toLowerCase().replace('_', '-') === lang)
  const inLang = voices.filter((v) => primaryOf(v.lang) === primaryOf(lang))
  return bestOf(exact, names) || bestOf(inLang, names) || voices[0] || null
}

/** THE LOCALE MENU IS COMPUTED FROM WHAT THE BROWSER ACTUALLY HAS, ordered by the seven sealed rays. The
 *  languages offered are exactly the languages with an installed voice — a menu entry that could not speak
 *  would be a control that silently fails, which the component's own honest scope forbids. The seven locale
 *  rays (src/harness.ts DIMENSIONS — the one list, never restated here) come first in their sealed order;
 *  every other installed language follows alphabetically, because a browser may know tongues the grid does
 *  not project and a reader who installed one deserves to use it. */
export function languagesOf(voices: readonly VoiceLike[]): string[] {
  const have = new Set(voices.map((v) => primaryOf(v.lang)))
  const rays = DIMENSIONS.filter((d: string) => have.has(d))
  const rest = [...have].filter((l) => !(DIMENSIONS as readonly string[]).includes(l)).sort()
  return [...rays, ...rest]
}

/** the dialects a language actually speaks here: the distinct full tags among installed voices, alphabetical —
 *  'en' → ['en-AU', 'en-GB', 'en-US'] on a typical host. A language with one dialect still lists it: the tag
 *  carries the region a reader is choosing, and hiding it would make the choice unreadable. */
export function dialectsOf(voices: readonly VoiceLike[], lang: string): string[] {
  const p = primaryOf(lang)
  return [...new Set(
    voices.filter((v) => primaryOf(v.lang) === p).map((v) => v.lang.replace('_', '-')),
  )].sort()
}

/** EVERY LINEAR TAG COLLIDES TO ONE HEXBIT HANDLE. A locale is spelled many ways — en-GB, en_gb, EN-GB — and
 *  BCP-47 says case and separator are not meaning, so all of a locale's linear spellings are folded to ONE
 *  canonical form and then to one eight-hexbit handle. The collision is the point: the handle names the locale,
 *  not the spelling, so a preference saved on one page recomputes to the same address on every other, and the
 *  chosen dialect can be spoken, logged or checked by the same 16-tone lattice as everything else here. */
export const canonicalTag = (tag: string): string => tag.toLowerCase().replace(/_/g, '-')
export const localeHandleOf = (tag: string): string => handleOf(toUuid(canonicalTag(tag)))

/** THE PWA SYNCS BY HANDLE, AND A HANDLE IS VERIFIED, NEVER TRUSTED. The chosen locale persists as
 *  { tag, handle } — the linear tag plus its own collision — and decode RECOMPUTES the handle before honouring
 *  it: a stored preference that no longer recomputes (edited by hand, corrupted, or written by an older scheme)
 *  is discarded to null rather than obeyed. Storage is the PWA's shared organ — every page, tab and installed
 *  window of this origin reads the same key and hears each other's writes through the browser's own storage
 *  event — so the sync needs no server and no new machinery, only an address that checks itself on arrival. */
export interface StoredLocale { tag: string; handle: string }
export const encodeLocale = (tag: string): StoredLocale => ({ tag: canonicalTag(tag), handle: localeHandleOf(tag) })
export function decodeLocale(raw: string | null): StoredLocale | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed?.tag !== 'string' || typeof parsed?.handle !== 'string') return null
    return parsed.handle === localeHandleOf(parsed.tag) ? { tag: canonicalTag(parsed.tag), handle: parsed.handle } : null
  } catch { return null }
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
