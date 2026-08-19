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
import { pickVoice, pitchFromRay, createReadAloudController } from './readAloudLogic.js'

const route = useRoute()
const supported = ref(false)
const state = ref('idle') // idle | reading | paused
const status = ref('')

// The controller (readAloudLogic.ts) owns the actual state machine — unit-tested (readAloudLogic.test.ts, wired
// into `npm run test:docs`/audit) with a fake speechSynthesis, including the two things that shipped unverified
// the first time: does stop() really call cancel(), and does the chunk queue really reach "Finished reading"
// instead of stalling. This component is now a thin binding from that tested logic to Vue's reactivity + the DOM.
let controller = null

const label = computed(() =>
  state.value === 'reading' ? 'Pause reading' : state.value === 'paused' ? 'Resume reading' : 'Read this page aloud')

const pageText = () => {
  if (typeof document === 'undefined') return ''
  const doc = document.querySelector('.vp-doc')
  if (!doc) return ''
  // Exclude this control's own label/status from what gets read back.
  const clone = doc.cloneNode(true)
  clone.querySelectorAll('.read-aloud, [aria-hidden="true"]').forEach((el) => el.remove())
  return (clone.innerText || clone.textContent || '').trim()
}

const currentVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices().map((v) => ({ name: v.name, lang: v.lang, default: v.default }))
  const chosen = pickVoice(voices, document.documentElement.lang || 'en')
  if (!chosen) return null
  return window.speechSynthesis.getVoices().find((v) => v.name === chosen.name) || null
}

const currentPitch = () => {
  const meta = document.querySelector('meta[property="uuidna:address"]')
  const addr = meta?.getAttribute('content') || ''
  if (!addr) return 1
  return pitchFromRay(quantumAura(addr).ray)
}

const toggle = () => {
  if (!supported.value || !controller) return
  controller.toggle(pageText(), currentVoice(), currentPitch())
}

const stop = () => {
  if (!supported.value || !controller) return
  controller.stop()
}

onMounted(() => {
  supported.value = typeof window !== 'undefined' && 'speechSynthesis' in window
  if (supported.value) {
    // onChange fires on EVERY transition, including the async ones (a chunk finishing naturally, or erroring)
    // that happen outside any toggle()/stop() call — without this, the UI would freeze on "Pause reading" even
    // after speech genuinely finished, since nothing else re-reads the controller's state after the initial click.
    controller = createReadAloudController(
      window.speechSynthesis,
      (text) => new SpeechSynthesisUtterance(text),
      (s) => { state.value = s.phase; status.value = s.status },
    )
    // getVoices() often returns [] until the browser loads them asynchronously — prime it now so the FIRST click
    // already has the full voice list, not just whatever happened to be ready synchronously.
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
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-text-2); color: var(--vp-c-text-1);
}
.ra-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.ra-btn:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.ra-stop { color: var(--vp-c-text-2); }
/* visually hidden but announced — the live status is for assistive tech, not a visible line of text */
.ra-status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
