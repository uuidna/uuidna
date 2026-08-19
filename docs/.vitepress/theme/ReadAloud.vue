<!-- ReadAloud — a purely USER-INITIATED text-to-speech control for the page's own content, via the browser's Web
     Speech API. Deliberately the opposite of the auto-advancing-page idea it replaced: nothing plays, pauses, or
     stops without the reader pressing a button. Built as a real <button> (keyboard-operable, native semantics),
     announces its state through an aria-live region rather than relying on a title attribute (screen readers do
     not reliably expose title text) or on colour alone. Speech is cancelled on navigation so a page never keeps
     talking over the next one, and unmount always cleans up.

     VOICE — two real, honest choices, not a claim of literal 432Hz output or of making any voice "human": the
     Web Speech API only exposes a RELATIVE pitch multiplier, never an absolute frequency, and no pitch formula
     changes which synthesis engine is doing the talking. So: (1) prefer a naturally better-sounding installed
     voice over whatever the browser flags "default" (often one of the older, more robotic system voices) — a
     real, immediate improvement; (2) derive a SMALL, subtle pitch variation from quantumAura's own `ray` (aura.ts
     — the SAME ℤ/7 rosette-ray computation the page's colour aura already reads, applied to the SAME uuidna:address
     meta tag uuidna-quantum.ts embeds), so a page's voice and its glow share one ray, not two unrelated numbers.
     aura.ts's own header states its honest scope plainly: "ARTISTIC, not physics... NOT a claim that sound is
     light or that 432 Hz carries special physical power" — that scope applies here unchanged. Reusing quantumAura
     is about not computing a second, parallel, ad-hoc hash where a real one already exists — nothing more.

     HONEST SCOPE: this does not replace a real screen reader (VoiceOver/NVDA/JAWS already read this page's
     semantic HTML correctly without it) — it serves a different, narrower case: a sighted or low-vision reader
     without assistive tech running who wants the page read aloud on request. Renders nothing if the browser has
     no speechSynthesis (older/unsupported browsers) rather than showing a control that would silently fail. -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vitepress'
import { quantumAura } from '../../../dist/index.js'

const route = useRoute()
const supported = ref(false)
const state = ref('idle') // idle | reading | paused
const status = ref('')

let utterances = []
let queueIndex = 0
let chosenVoice = null
let chosenPitch = 1

const label = computed(() =>
  state.value === 'reading' ? 'Pause reading' : state.value === 'paused' ? 'Resume reading' : 'Read this page aloud')

// Split into sentence-scale chunks — more robust across browsers than one very long utterance, and lets pause/
// resume land at a natural boundary instead of mid-sentence silence.
const chunksOf = (text) => text
  .split(/(?<=[.!?:])\s+(?=[A-Z0-9])|\n{2,}/)
  .map((s) => s.trim())
  .filter((s) => s.length > 0)

const pageText = () => {
  if (typeof document === 'undefined') return ''
  const doc = document.querySelector('.vp-doc')
  if (!doc) return ''
  // Exclude this control's own label/status from what gets read back.
  const clone = doc.cloneNode(true)
  clone.querySelectorAll('.read-aloud, [aria-hidden="true"]').forEach((el) => el.remove())
  return (clone.innerText || clone.textContent || '').trim()
}

// A curated preference list of natural-sounding system voices, tried in order for the page's own language before
// falling back to whatever the browser considers default — no claim any of these is "the best" universally, just
// a better starting point than an unreviewed default. Extend per-language as real gaps are found, not guessed.
const PREFERRED = {
  'en': ['Samantha', 'Ava', 'Zoe', 'Alex'],
  'en-us': ['Samantha', 'Ava', 'Zoe', 'Alex'],
  'en-gb': ['Kate', 'Serena', 'Stephanie'],
}
const pickVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null
  const htmlLang = (document.documentElement.lang || 'en').toLowerCase()
  const names = PREFERRED[htmlLang] || PREFERRED[htmlLang.split('-')[0]] || []
  for (const name of names) {
    const v = voices.find((x) => x.name === name)
    if (v) return v
  }
  // fall back to any voice matching the page's language, preferring one NOT flagged default (often the more
  // robotic system pick) if a non-default alternative exists in that language
  const inLang = voices.filter((v) => v.lang.toLowerCase().startsWith(htmlLang.split('-')[0]))
  return inLang.find((v) => !v.default) || inLang[0] || voices[0] || null
}

// A small, subtle, deterministic pitch variation from the page's own content-address — same address the aura
// colour system folds, read straight from the meta tag uuidna-quantum.ts already writes. quantumAura's `ray` is
// 0..6 (the ℤ/7 rosette) — mapped onto the SAME narrow 0.90..1.10 pitch band a page's aura hue already lives in
// spirit, so ray N always means the same voice character everywhere it appears, not a second, unrelated hash.
const pitchFromAddress = () => {
  const meta = document.querySelector('meta[property="uuidna:address"]')
  const addr = meta?.getAttribute('content') || ''
  if (!addr) return 1
  const { ray } = quantumAura(addr)
  return 0.9 + (ray / 6) * 0.2 // 0.90 .. 1.10, one of the SAME 7 rays the page's own colour aura reads
}

const speakNext = () => {
  if (queueIndex >= utterances.length) {
    state.value = 'idle'
    status.value = 'Finished reading.'
    return
  }
  const u = utterances[queueIndex]
  u.onend = () => { queueIndex++; speakNext() }
  u.onerror = () => { state.value = 'idle'; status.value = 'Reading stopped — a speech error occurred.' }
  window.speechSynthesis.speak(u)
}

const start = () => {
  const text = pageText()
  if (!text) { status.value = 'Nothing on this page to read.'; return }
  window.speechSynthesis.cancel()
  chosenVoice = pickVoice()
  chosenPitch = pitchFromAddress()
  utterances = chunksOf(text).map((chunk) => {
    const u = new SpeechSynthesisUtterance(chunk)
    if (chosenVoice) u.voice = chosenVoice
    u.pitch = chosenPitch
    return u
  })
  queueIndex = 0
  state.value = 'reading'
  status.value = 'Reading page aloud. Press the button again to pause.'
  speakNext()
}

const toggle = () => {
  if (!supported.value) return
  if (state.value === 'idle') { start(); return }
  if (state.value === 'reading') { window.speechSynthesis.pause(); state.value = 'paused'; status.value = 'Paused.'; return }
  if (state.value === 'paused') { window.speechSynthesis.resume(); state.value = 'reading'; status.value = 'Resuming.'; return }
}

const stop = () => {
  if (!supported.value) return
  window.speechSynthesis.cancel()
  state.value = 'idle'
  status.value = 'Stopped.'
}

onMounted(() => {
  supported.value = typeof window !== 'undefined' && 'speechSynthesis' in window
  // getVoices() often returns [] until the browser loads them asynchronously — prime it now so the FIRST click
  // already has the full voice list, not just whatever happened to be ready synchronously.
  if (supported.value) {
    window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener?.('voiceschanged', () => window.speechSynthesis.getVoices(), { once: true })
  }
})

// Never let a page keep talking after the reader has navigated away from it.
watch(() => route.path, stop)
onBeforeUnmount(stop)
</script>

<template>
  <div v-if="supported" class="read-aloud">
    <button type="button" class="ra-btn" :aria-pressed="state !== 'idle'" @click="toggle">
      <span aria-hidden="true">{{ state === 'reading' ? '⏸' : '▶' }}</span> {{ label }}
    </button>
    <button v-if="state !== 'idle'" type="button" class="ra-btn ra-stop" @click="stop">
      <span aria-hidden="true">⏹</span> Stop
    </button>
    <span class="ra-status" role="status" aria-live="polite">{{ status }}</span>
  </div>
</template>

<style scoped>
.read-aloud { display: flex; align-items: center; gap: .5rem; margin: 0 0 1.2rem; flex-wrap: wrap; }
.ra-btn {
  display: inline-flex; align-items: center; gap: .35rem; font-size: .82rem; font-weight: 600;
  padding: .35rem .7rem; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1);
}
.ra-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.ra-btn:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.ra-stop { color: var(--vp-c-text-2); }
/* visually hidden but announced — the live status is for assistive tech, not a visible line of text */
.ra-status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
