<!-- GpuDispatch — THE ONLY PLACE THE SHADER CAN ACTUALLY RUN. Node and Workers expose no navigator.gpu, so
     src/os/gpu ships a real WGSL dispatch the test suite can never execute: it verifies detection, refusal and
     the CPU reference, and reports agrees:null because nothing was compared. This harness is what turns that
     null into an answer, on the visitor's own hardware, and it reports the answer it gets — including the
     likely one, that the GPU LOSES at these sizes because a buffer write, a submit and a readback cost
     hundreds of microseconds against 132 ns/element on the CPU. Correctness is checked before any timing is
     shown; a faster wrong answer is not a result. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gpuPresence, residuesOnCpu, dispatchResidues } from '../../../src/os/gpu/index.js'

const present = ref(false)
const why = ref('')
const rows = ref<{ n: number; cpuNs: number; gpuMs: number | null; agrees: boolean | null; verdict: string }[]>([])
const err = ref('')
const running = ref(false)

// the CPU side is timed the same way os/timing does it: per element, because the per-CALL figure scales with
// the batch and would report the batch instead of the op.
const perElementNs = (fn: () => unknown, elements: number, iterations: number): number => {
  const a = performance.now()
  for (let i = 0; i < iterations; i++) fn()
  return ((performance.now() - a) * 1e6) / iterations / elements
}

const run = async (): Promise<void> => {
  running.value = true; rows.value = []; err.value = ''
  try {
    for (const n of [1024, 16384, 262144, 1048576]) {
      const v = new Uint32Array(n)
      for (let i = 0; i < n; i++) v[i] = (i * 2654435761) >>> 0
      const cpuNs = perElementNs(() => residuesOnCpu(v), n, n > 100000 ? 3 : 20)
      const t0 = performance.now()
      const d = await dispatchResidues(v)
      const gpuMs = d.ran ? performance.now() - t0 : null
      const cpuMs = (cpuNs * n) / 1e6
      const verdict = !d.ran ? 'no dispatch'
        : d.agrees === false ? `DISAGREED on ${d.mismatches} elements — no timing quoted`
        : gpuMs! < cpuMs ? `GPU wins by ${(cpuMs / gpuMs!).toFixed(2)}x`
        : `CPU wins by ${(gpuMs! / cpuMs).toFixed(2)}x`
      rows.value.push({ n, cpuNs, gpuMs, agrees: d.agrees, verdict })
    }
  } catch (e) { err.value = e instanceof Error ? e.message : String(e) }
  running.value = false
}

onMounted(() => { const p = gpuPresence(); present.value = p.webgpu; why.value = p.why })
</script>

<template>
  <article class="uuidna-card gpu-dispatch" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">GPU dispatch</h3>
      <p data-slot="card-description">the lattice residue, on your hardware — measured, not asserted</p>
    </div>
    <div data-slot="card-content">
      <p>{{ why }}</p>
      <p v-if="err">{{ err }}</p>
      <table v-if="rows.length">
        <thead><tr><th>elements</th><th>CPU ns/el</th><th>GPU total</th><th>agrees</th><th>verdict</th></tr></thead>
        <tbody>
          <tr v-for="r in rows" :key="r.n">
            <td>{{ r.n.toLocaleString() }}</td>
            <td>{{ r.cpuNs.toFixed(1) }}</td>
            <td>{{ r.gpuMs === null ? '—' : r.gpuMs.toFixed(2) + ' ms' }}</td>
            <td>{{ r.agrees === null ? 'not compared' : r.agrees ? 'yes' : 'NO' }}</td>
            <td>{{ r.verdict }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div data-slot="card-footer">
      <small>
        Correctness is checked element for element before any timing is shown. A dispatch that disagrees reports
        no timing at all. If the CPU wins, that is the result — the instrument exists to settle the question,
        not to flatter the accelerator.
      </small>
      <p><button data-slot="button" :disabled="running || !present" @click="run">{{ running ? 'measuring…' : 'run the dispatch' }}</button></p>
    </div>
  </article>
</template>
