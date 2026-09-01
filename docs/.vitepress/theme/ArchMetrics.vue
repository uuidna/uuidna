<!-- ArchMetrics — THE BUDGETS, MEASURED ON THE ARCHITECTURE READING THIS PAGE.

     A benchmark printed in a repository is a fact about the machine that ran it. The numbers in BUDGETS were set
     on an Apple M1 Max, and quoting them at a visitor on a phone would be quoting someone else's hardware at
     them. So this component measures HERE: it calibrates against the same fixed integer loop every host runs,
     then times the real data-parallel operations and reports each as a MULTIPLE of that calibration.

     WHY RATIOS AND NOT NANOSECONDS. A CPU half the speed doubles both the calibration and the work, and the
     ratio survives; a regression in the code moves only one side. That is what makes a budget portable across
     architectures instead of a claim about one desk — the architecture calibrates itself, and the verdict stays
     comparable.

     THE CLOCK IS COARSE AND THE PAGE SAYS SO. Browsers clamp performance.now and throttle background tabs; the
     same derivation in this tree measured 8.5 s foregrounded and 25.7 s hidden. Ratios are taken from a single
     run so both sides throttle together, which is exactly why the ratio is the number worth reading. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { hostArch, gpuPresence, calibrationNs, timingCensus, BUDGETS } from '../../../src/os/timing/index.js'
import { toUuid } from '../../../src/address.js'
import { merkleGravity } from '../../../src/gravity/index.js'

type Row = { op: string; ns: number; units: number; budget: number; within: boolean; why: string }
const arch = ref<{ platform: string; arch: string; cpus: number } | null>(null)
const accel = ref<{ webgpu: boolean; cores: number; why: string } | null>(null)
const unit = ref(0)
const rows = ref<Row[]>([])
const cracks = ref<string[]>([])
const err = ref('')
const running = ref(false)

const measure = (): void => {
  running.value = true
  err.value = ''
  try {
    arch.value = hostArch()
    accel.value = gpuPresence()
    unit.value = calibrationNs()

    // the same ops the budgets are declared for — measured per ELEMENT, because the per-call figure scales with
    // the batch and would make a bigger batch look slower while the work per item is unchanged
    const addresses = Array.from({ length: 1024 }, (_, i) => toUuid('arch-metrics-' + i))
    const census = timingCensus([
      { op: 'parallel.toUuid', run: () => { for (let i = 0; i < 1000; i++) toUuid('m' + i) }, elements: 1000 },
      { op: 'parallel.merkleGravity', run: () => merkleGravity(addresses), elements: addresses.length },
    ])
    rows.value = census.timings.map((t) => ({
      ...t,
      why: BUDGETS.find((b) => b.op === t.op)?.why ?? '',
    }))
    cracks.value = census.cracks
  } catch (e) {
    // a clock too coarse to calibrate is a real answer on some hosts — reported, not swallowed into a zero
    err.value = e instanceof Error ? e.message : String(e)
  } finally {
    running.value = false
  }
}

onMounted(measure)
</script>

<template>
  <article class="uuidna-card arch-metrics" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">The budgets, on your architecture</h3>
      <p data-slot="card-description">
        calibrated here, so the verdict is about this machine and not the one that set the numbers
      </p>
    </div>

    <div data-slot="card-content">
      <p v-if="err">this host could not be measured: {{ err }}</p>

      <template v-else>
        <p v-if="arch">
          <strong>{{ arch.platform }} · {{ arch.arch }}</strong> ·
          {{ arch.cpus || '—' }} logical processors ·
          calibration <strong>{{ unit.toFixed(0) }} ns</strong> for one fixed integer loop
          <template v-if="accel"> · WebGPU {{ accel.webgpu ? 'present' : 'absent' }}</template>
        </p>

        <table v-if="rows.length">
          <thead><tr><th>operation</th><th>ns / element</th><th>calibration units</th><th>budget</th><th>verdict</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.op">
              <td><code>{{ r.op }}</code></td>
              <td>{{ r.ns.toFixed(1) }}</td>
              <td>{{ r.units.toFixed(2) }}</td>
              <td>{{ r.budget }}</td>
              <td>{{ r.within ? 'within' : 'OVER' }}</td>
            </tr>
          </tbody>
        </table>

        <p v-if="cracks.length">
          Over budget on this host: <code>{{ cracks.join(', ') }}</code> — named, never averaged away. An op over
          budget here and within it elsewhere is a fact about this machine; an op over budget everywhere is a
          regression.
        </p>
        <p v-else-if="rows.length">Every measured op is within its declared budget on this host.</p>

        <p>
          <button :disabled="running" @click="measure">{{ running ? 'measuring…' : 'measure again' }}</button>
          — a second run on the same machine should land close; a wide gap means the tab was throttled, which is
          itself worth knowing.
        </p>

        <p>
          <strong>Read the ratio, not the nanoseconds.</strong> Browsers clamp their clocks and throttle hidden
          tabs — the same key derivation in this tree measured 8.5 s in a visible tab and 25.7 s in a background
          one. Both sides of a ratio throttle together, so the calibration-unit column survives what the
          nanosecond column does not.
        </p>
      </template>
    </div>
  </article>
</template>
