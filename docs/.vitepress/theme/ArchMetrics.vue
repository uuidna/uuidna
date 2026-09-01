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
type Sec = Awaited<ReturnType<typeof import('../../../src/os/kdf/index.js')['securityLevel']>>
const sec = ref<Sec | null>(null)
type Margin = ReturnType<typeof import('../../../src/os/kdf/index.js')['quantumMargin']>
const margin = ref<Margin | null>(null)

// SPEED AND SECURITY ARE THE SAME NUMBER FROM OPPOSITE ENDS, so they are measured in one pass and shown
// together. Every millisecond a first send waits is a millisecond an attacker pays PER GUESS — that is what
// 600,000 iterations buys, and showing the speed table without it would report half the trade.
const measureSecurity = async (): Promise<void> => {
  try {
    const { securityLevel, quantumMargin } = await import('../../../src/os/kdf/index.js')
    sec.value = await securityLevel()
    // the ×1000 is FOLDED here, not merely named: it is subtracted from the sealed floor along with Grover's
    // halving, and what the table shows is what an attacker still has to cross after both are granted
    margin.value = quantumMargin(sec.value.adversaryFactor)
  } catch { sec.value = null }
}

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

onMounted(() => { measure(); void measureSecurity() })
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

        <h4>What the security costs, priced here</h4>
        <table v-if="sec">
          <tbody>
            <tr><td>key / address / Grover floor</td><td><strong>{{ sec.sealed.keyBits }}</strong> / {{ sec.sealed.addressBits }} / {{ sec.sealed.groverFloorBits }} bits <em>— sealed theorems</em></td></tr>
            <tr><td>cipher · derivation</td><td>{{ sec.sealed.aead }} · {{ sec.sealed.kdf }}, {{ sec.sealed.iterations.toLocaleString() }} iterations</td></tr>
            <tr><td>one session derivation, here</td><td><strong>{{ sec.derivationMs ?? '—' }} ms</strong> <em>— measured on this machine</em></td></tr>
            <tr><td>passphrase guesses / second, one core</td><td><strong>{{ sec.defenderGuessesPerSecond ?? '—' }}</strong> <em>— what an attacker pays on hardware like yours</em></td></tr>
            <tr><td>GPU adversary advantage</td><td>×{{ sec.adversaryFactor.toLocaleString() }} <em>— named, never folded into the figure above</em></td></tr>
          </tbody>
        </table>
        <p v-if="sec">
          The bit widths are proven; the guess rate is the softest number on this page. An adversary is not using
          your laptop — running PBKDF2 lanes on GPUs is generally credited with a 10³–10⁴ advantage, so the honest
          reading is the measured rate multiplied by that, and it is shown as a separate factor rather than
          quietly absorbed. A security claim that assumes the attacker shares your hardware is not a claim.
        </p>
        <p v-else>the security probe did not run on this host — reported rather than shown as a zero.</p>

        <h4 v-if="margin">Both advantages, folded — what is still left to cross</h4>
        <table v-if="margin">
          <tbody>
            <tr><td>the address</td><td>{{ margin.addressBits }} bits</td></tr>
            <tr><td>Grover, granted in full</td><td>halves it to <strong>{{ margin.groverFloorBits }}</strong> bits <em>— sha256_grover_margin_is_the_address</em></td></tr>
            <tr><td>a ×{{ sec?.adversaryFactor.toLocaleString() }} classical machine</td><td>removes at most <strong>{{ margin.classicalBitsRemoved }}</strong> more</td></tr>
            <tr><td>{{ margin.kdfBitsAdded }} bits back</td><td>the KDF adds at least that per guess</td></tr>
            <tr><td><strong>margin remaining</strong></td><td><strong>{{ margin.marginBits }} bits</strong> — <code>2^{{ margin.marginBits }}</code> work after every advantage above</td></tr>
          </tbody>
        </table>
        <p v-if="margin">
          Every step is an exact integer inequality — <code>1000 ≤ 1024 = 2¹⁰</code>, <code>600000 &gt; 524288 = 2¹⁹</code>,
          <code>128 / 2 = 64</code> — so no logarithm has to be trusted and the whole line is sealed
          <code>by decide</code>. Both bounds are taken in the <em>attacker's</em> favour; the margin is what
          survives that generosity. This is not a supremacy claim and not a promise about hardware that does not
          exist: it is arithmetic over three named quantities, and changing any of them recomputes it in public.
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
