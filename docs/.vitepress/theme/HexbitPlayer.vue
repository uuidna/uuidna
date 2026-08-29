<!-- HexbitPlayer — lattice PCM from hexbit states. The mill is not booted here. -->
<script setup>
import { ref, onMounted } from 'vue'
import { renderStates } from '../../../src/quantum/apps/hexbit-player.js'

const props = defineProps({
  states: { type: Array, required: true },
  ms: { type: Number, default: 252 },
})
const src = ref('')
const addr = ref('')
const samples = ref(0)

onMounted(() => {
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
