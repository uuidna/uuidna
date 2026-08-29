<!-- The hero, animated — and every number in it is SEALED, not chosen. The path is the fuse ladder
     (coins × width mod ring: 1→2→4→8→7→5), which is the doubling orbit only when captain coins() are
     contributed at each rung (trial_computes_only_with_two_coins). Without the coins the hero will not fuse:
     one unfused rung, no pulse. The rays are the seven reading DIMENSIONS. Motion is linear (speed law).
     Address is a prop or toUuid(theorem) — this component does not import the theorem census. -->
<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { DIMENSIONS } from '../../../dist/harness.js'
import { durationVars } from '../../../dist/css.js'
import { toUuid, A432_STEP, BASE } from '../../../dist/address.js'
import { coins } from '../../../dist/captain/billing/index.js'
import { PRICE } from '../../../dist/billing/index.js'
import { COINS, fuseLadder } from '../../../dist/hexbit/index.js'

const props = defineProps({
  dimension: { type: String, default: 'en' },
  rung: { type: Number, default: 1 },
  theorem: { type: String, default: 'vortex_orbit' },
  address: { type: String, default: '' },
  size: { type: Number, default: 240 },
})

const contributed = coins()
const fused = contributed === COINS && PRICE === contributed
const orbit = fuseLadder(1, contributed)
const dims = DIMENSIONS
const TEMPI = Object.values(durationVars())
const BASE_R = orbit.length
const DIM_OPACITY = 1 / DIMENSIONS.length

const found = computed(() => dims.indexOf(props.dimension))
const lead = computed(() => (found.value < 0 ? 0 : found.value))
const leadName = computed(() => dims[lead.value])
const proof = computed(() => withBase(`/theorem/${props.theorem}`))
const hue = (n) => `var(--seq-${((n + props.rung - 1) % 9) + 1}, var(--vp-c-brand-1))`
const hex = computed(() => (String(props.address || toUuid(props.theorem))).replace(/-/g, ''))
const digit = (i) => parseInt(hex.value[i % hex.value.length], 16)
const beat = (i) => TEMPI[digit(i) % TEMPI.length]
const nodeHue = (i) => `var(--seq-${(digit(i) % 9) + 1}, var(--vp-c-brand-1))`
const TURN = A432_STEP * BASE
const rayTurn = (i) => ((i - lead.value + dims.length) % dims.length) * (TURN / dims.length)
const nodeTurn = (i) => i * (TURN / (orbit.length || 1))
</script>

<template>
  <figure class="heroanim">
    <a :href="proof" :aria-label="`the proof of ${theorem}`">
      <svg :width="size" :height="size" viewBox="0 0 200 200" role="img"
           :data-fused="fused ? 1 : 0"
           :aria-label="fused ? `the doubling orbit ${orbit.join('→')} across ${dims.length} dimensions, ${leadName} leading` : 'will not fuse — captain coins not contributed'">
        <g class="rays">
          <g v-for="(d, i) in dims" :key="d" :transform="`rotate(${rayTurn(i)} 100 100)`">
            <line x1="100" y1="100" :x2="100" :y2="i === lead ? 54 : 64" :stroke="hue(i + 1)"
                  :stroke-width="i === lead ? 3 : 1" :class="i === lead ? 'lead' : 'dim'"
                  :style="{ '--beat': beat(i), '--dim': DIM_OPACITY, '--dim2': DIM_OPACITY * 2 }" />
            <text v-if="i === lead" x="100" y="50" text-anchor="middle" font-size="8" :fill="hue(i + 1)">{{ d }}</text>
          </g>
        </g>
        <g class="orbit">
          <g v-for="(v, i) in orbit" :key="v" :transform="`rotate(${nodeTurn(i)} 100 100)`">
            <circle cx="100" cy="30" :r="BASE_R" :fill="nodeHue(i)" :data-seq="digit(i) % 9">
              <animate v-if="fused" attributeName="r" :values="`${BASE_R};${BASE_R + v};${BASE_R}`" :dur="beat(i)" repeatCount="indefinite" />
            </circle>
            <text x="100" y="34" text-anchor="middle" font-size="10" class="num"
                  :transform="`rotate(${-nodeTurn(i)} 100 30)`">{{ v }}</text>
          </g>
        </g>
        <circle cx="100" cy="100" r="4" :fill="hue(5)" />
      </svg>
    </a>
    <figcaption>
      <template v-if="fused">
        the doubling orbit {{ orbit.join(' → ') }} → {{ orbit[0] }}, {{ dims.length }} dimensions,
        <strong>{{ leadName }}</strong> leading<span v-if="found < 0"> (asked for “{{ dimension }}”, which is not one of the seven)</span>
      </template>
      <template v-else>will not fuse — captain coins not contributed at each rung</template>
    </figcaption>
  </figure>
</template>

<style scoped>
.heroanim { margin: 1.5rem auto; text-align: center }
.heroanim a { display: inline-block; text-decoration: none }
figcaption { font-size: .78rem; color: var(--vp-c-text-2); margin-top: .4rem }
.lead { animation: burn var(--beat) infinite linear }
.dim { opacity: var(--dim); animation: fade var(--beat) infinite linear }
.heroanim svg[data-fused="0"] .lead,
.heroanim svg[data-fused="0"] .dim { animation: none }
.num { fill: var(--vp-c-bg); font-weight: 600 }
@keyframes burn { 0%, 100% { opacity: calc(1 - var(--dim)) } 50% { opacity: 1 } }
@keyframes fade { 0%, 100% { opacity: var(--dim) } 50% { opacity: var(--dim2) } }
@media (prefers-reduced-motion: reduce) {
  .lead, .dim { animation: none }
}
</style>
