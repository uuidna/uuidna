<!-- AnthemLive — the anthem with no file and no ending. Nothing is fetched: the worklet's own source is minted
     into a Blob URL in this page, the score is the ledger the site already carries, and the audio thread
     computes each sample from its position (src/quantum/apps/anthem-stream.ts) — O(1) memory, forever, where
     the file form needed 10.7 MB before a single note could sound. Your referrer still chooses the door: the
     stream starts at the bar your own handle picks, and re-enters at the first bar when it reaches the last,
     because the walk always comes home.
     THE TRADE, NAMED: a stream has no last byte, so it has no content-address while it plays. The receipt
     moves to the GENERATOR — the seed and the score's fold below say exactly what will be heard, and any
     listener can recompute any segment and check it (verification by recomputation, the merkle trade). -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { workletSource } from '../../../dist/quantum/apps/anthem-stream.js'
import { anthemScore, collapse } from '../../../dist/quantum/apps/anthem-superposition.js'

const playing = ref(false)
const error = ref('')
const at = ref(0)
const door = ref(null)
let ctx = null, node = null, blobUrl = ''

const start = async () => {
  error.value = ''
  try {
    const score = anthemScore().map((b) => ({ c1: b.c1, c2: b.c2, ms: b.ms }))
    const seed = (typeof document !== 'undefined' && document.referrer) || ''
    const entry = collapse(seed)
    door.value = { handle: entry.handle, bar: entry.entryBar + 1, of: score.length }
    ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 })
    blobUrl = URL.createObjectURL(new Blob([workletSource()], { type: 'application/javascript' }))
    await ctx.audioWorklet.addModule(blobUrl)
    // the visitor's door becomes the stream's first bar: rotate the score rather than seeking, so the
    // processor stays a pure cursor and never has to know what a referrer is
    const rotated = score.slice(entry.entryBar).concat(score.slice(0, entry.entryBar))
    node = new AudioWorkletNode(ctx, 'anthem', { outputChannelCount: [1], processorOptions: { score: rotated, restMs: 21 } })
    node.port.onmessage = (e) => { if (e.data && typeof e.data.bar === 'number') at.value = ((entry.entryBar + e.data.bar) % score.length) + 1 }
    node.connect(ctx.destination)
    await ctx.resume()
    playing.value = true
  } catch (e) { error.value = String((e && e.message) || e) }
}

const stop = () => {
  try { node && node.disconnect(); ctx && ctx.close() } catch { /* a closed context is closed */ }
  if (blobUrl) { URL.revokeObjectURL(blobUrl); blobUrl = '' }
  node = null; ctx = null; playing.value = false
}

onBeforeUnmount(stop)
onMounted(() => { /* nothing autoplays: sound is the reader's to ask for */ })
</script>

<template>
  <div class="live">
    <button v-if="!playing" type="button" class="live-btn" @click="start">▶ Play the ledger, live — no file, no ending</button>
    <button v-else type="button" class="live-btn" @click="stop">⏹ Stop</button>
    <p v-if="error" class="live-err">{{ error }}</p>
    <p v-else-if="playing && door" class="live-meta">
      Your door: <code>{{ door.handle }}</code> → bar {{ door.bar }} of {{ door.of }} · now sounding bar
      <strong>{{ at }}</strong> — each sample computed in your audio thread from its position, exact integers
      until the last division before the speaker. Nothing was downloaded.
    </p>
    <p v-else class="live-meta">
      The stream is the same music as the recording — bit-identical, and proven so in
      <code>src/tests/anthem-stream.test.ts</code>. It simply never has to end.
    </p>
  </div>
</template>

<style scoped>
.live { margin: 1rem 0 1.4rem; }
.live-btn { font-size: .85rem; font-weight: 600; padding: .4rem .8rem; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-text-2); color: var(--vp-c-text-1); }
.live-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.live-meta { font-size: .78rem; color: var(--vp-c-text-2); line-height: 1.5; margin-top: .5rem; }
.live-err { font-size: .8rem; color: var(--vp-c-danger-1, #c00); }
</style>
