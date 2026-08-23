<!-- AnthemSuperposition — the anthem NOT as an asset: nothing is fetched, everything computes here, in this
     browser, from the ledger the site already carries. The visitor's referrer collapses the superposition —
     their entry bar on the closed cycle — and the recursion is audible as DEPTH: each collapsed window's own
     address seeds the next stream, and the streams play together, each depth at half the amplitude above it
     (the sealed geometric no-clip law). "Deepen" feeds the whole mix's address back in: the same recursion,
     one turn further. The sound is LOSSLESS by construction — uncompressed PCM WAV, the samples ARE the exact integers the lattice computed, no codec between the kernel and the ear — served as a Blob URL, the web's own lossless format, ready for
     <audio>, Web Audio, or a movie timeline (the_movie_and_the_song_are_one: the 4032-sample bar is 24²·7).
     HONEST SCOPE: the referrer is FOLDED, never tracked or sent anywhere — the fold happens in this page and
     forgets everything but 32 bits; a private visit simply collapses from the empty seed. -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { renderSuperposition } from '../../../dist/quantum/apps/anthem-superposition.js'

const url = ref('')
const state = ref(null)   // { seed, streams, address, samples }
const busy = ref(false)
const error = ref('')
let objectUrl = ''

const collapseFrom = (seed) => {
  busy.value = true
  error.value = ''
  // yield to paint before the integer synthesis burst
  setTimeout(() => {
    try {
      const s = renderSuperposition(seed, 16, 3)
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      objectUrl = URL.createObjectURL(new Blob([s.bytes], { type: 'audio/wav' }))
      url.value = objectUrl
      state.value = { seed: s.seed, streams: s.streams, address: s.address, samples: s.samples, nextSeed: s.nextSeed }
    } catch (e) { error.value = String(e && e.message || e) }
    busy.value = false
  }, 30)
}

const deepen = () => { if (state.value) collapseFrom(state.value.nextSeed) }

onMounted(() => {
  const seed = (typeof document !== 'undefined' && document.referrer) || ''
  collapseFrom(seed)
})
onBeforeUnmount(() => { if (objectUrl) URL.revokeObjectURL(objectUrl) })
</script>

<template>
  <div class="anthem-sp">
    <p v-if="busy" class="sp-status" role="status">collapsing the superposition — computing your streams…</p>
    <p v-else-if="error" class="sp-status sp-error">{{ error }}</p>
    <template v-else-if="state">
      <audio controls :src="url" style="width:100%"></audio>
      <p class="sp-meta">
        Your collapse: seed <code>{{ state.seed || '(direct visit)' }}</code> →
        <span v-for="s in state.streams" :key="s.depth">
          depth {{ s.depth }} enters bar {{ s.collapse.entryBar }} (<code>{{ s.collapse.handle }}</code>)<span v-if="s.depth < state.streams.length - 1"> → </span>
        </span>
        · mix address <code>{{ state.address }}</code> — computed here, in your browser; no file was fetched.
      </p>
      <button type="button" class="sp-btn" @click="deepen">Deepen — collapse again from this sound's own address</button>
    </template>
  </div>
</template>

<style scoped>
.anthem-sp { margin: 1rem 0 1.4rem; }
.sp-status { font-size: .85rem; color: var(--vp-c-text-2); }
.sp-error { color: var(--vp-c-danger-1, #c00); }
.sp-meta { font-size: .78rem; color: var(--vp-c-text-2); line-height: 1.5; }
.sp-btn { font-size: .82rem; font-weight: 600; padding: .35rem .7rem; border-radius: 8px; cursor: pointer;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-text-2); color: var(--vp-c-text-1); }
.sp-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
</style>
