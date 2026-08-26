<!-- HexbitPlayer — the Vue SHELL of the standard hexbit quantum app for sound. The logic lives in
     src/quantum/apps/hexbit-player.ts (the captain's standard: src/quantum/apps/**, no assets, all computes in
     browser); this component only mounts it: states in, the app renders the exact-integer lattice PCM
     client-side, and the address of the bytes is printed so a listener can hold what they hear against what the
     page promised. No .wav is fetched — the recording is recomputed where the visitor stands, which is what
     makes it verifiable rather than merely served. HONEST SCOPE: the lattice sounding states — no claim that
     432 Hz carries special power; no microphone, network or storage touched. -->
<script setup>
import { ref, onMounted } from 'vue'
import { renderStates } from '../../../src/quantum/apps/hexbit-player.js'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'

const props = defineProps({
  states: { type: Array, required: true },   // hexbit states 0..15, in playing order
  ms: { type: Number, default: 252 },        // the bar: 4032 samples = 9·7·64 = 24²·7 (the_movie_and_the_song_are_one)
})
const src = ref('')
const addr = ref('')
const samples = ref(0)

onMounted(async () => {
  try { await bootUuidnaOSInBrowser() } catch { /* boot image drift — player still renders states; monitor names the fault */ }
  const r = renderStates(props.states, props.ms)
  samples.value = r.samples
  addr.value = r.address
  src.value = URL.createObjectURL(new Blob([r.bytes], { type: 'audio/wav' }))
})
</script>

<template>
  <div class="hexbit-player">
    <audio v-if="src" controls :src="src" style="width:100%"></audio>
    <small v-if="addr">computed in your browser just now — {{ states.length }} states, {{ samples }} samples,
      address <code>{{ addr }}</code> (recompute it: same states, same bytes, same address, on any machine)</small>
  </div>
</template>
