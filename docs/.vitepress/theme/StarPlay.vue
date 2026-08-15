<!-- StarPlay — the star-polygon {n/step} game, drawn in the browser from the real starPolygon (the same function the
     uuidna_pentagram tool runs and pentagram_single_stroke seals). Pick points and a step; the stroke is a SINGLE
     closed path iff gcd(step,n)=1, else it splits into gcd loops. Pure client-side geometry, nothing sent. -->
<script setup>
import { ref, computed } from 'vue'
import { starPolygon } from '../../../dist/index.js'

const n = ref(5)
const step = ref(2)
const N = computed(() => Math.max(2, Math.min(24, Number(n.value) || 2)))
const S = computed(() => Math.max(1, Math.min(N.value - 1, Number(step.value) || 1)))
const poly = computed(() => starPolygon(N.value, S.value))

// Place n points on a circle; connect them in the stroke order the star visits.
const R = 120, C = 150
const pointAt = (k) => { const a = (k * 360 / N.value - 90) * Math.PI / 180; return [C + R * Math.cos(a), C + R * Math.sin(a)] }
const dots = computed(() => Array.from({ length: N.value }, (_, k) => pointAt(k)))
const line = computed(() => {
  const order = poly.value.stroke
  return order.map((k, i) => `${i ? 'L' : 'M'} ${pointAt(k)[0].toFixed(1)} ${pointAt(k)[1].toFixed(1)}`).join(' ') + ` L ${pointAt(order[0])[0].toFixed(1)} ${pointAt(order[0])[1].toFixed(1)}`
})
</script>

<template>
  <div class="star">
    <div class="star-ctrls">
      <label>points <input v-model="n" type="range" min="2" max="24" /> <b>{{ N }}</b></label>
      <label>step <input v-model="step" type="range" min="1" :max="N - 1" /> <b>{{ S }}</b></label>
    </div>
    <svg viewBox="0 0 300 300" class="star-svg" role="img" :aria-label="`star polygon ${N} over ${S}`">
      <circle :cx="C" :cy="C" :r="R" fill="none" stroke="var(--vp-c-divider)" stroke-width="1" />
      <path :d="line" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="2.5" stroke-linejoin="round" />
      <circle v-for="(p, i) in dots" :key="i" :cx="p[0]" :cy="p[1]" r="4" fill="var(--vp-c-text-1)" />
    </svg>
    <p class="star-verdict">
      <code>{{ '{' + N + '/' + S + '}' }}</code> —
      <strong v-if="poly.single">one single stroke</strong><strong v-else>{{ poly.loops }} separate loops</strong>
      · gcd({{ S }},{{ N }}) = {{ poly.single ? 1 : poly.loops }} · stroke [{{ poly.stroke.join(', ') }}]
    </p>
    <p class="star-note">A single stroke visits every point exactly when the step is coprime to the count — {5/2} is
    the pentagram, {12/7} is the circle of fifths. The same <code>starPolygon</code> the MCP tool runs; nothing sent.</p>
  </div>
</template>

<style scoped>
.star { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; text-align: center; }
.star-ctrls { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; margin-bottom: .8rem; }
.star-ctrls label { font-size: .9rem; color: var(--vp-c-text-2); }
.star-ctrls b { color: var(--vp-c-brand-1); min-width: 1.4rem; display: inline-block; }
.star-svg { width: 260px; max-width: 100%; height: auto; }
.star-verdict { font-size: .9rem; margin: .6rem 0 0; }
.star-note { font-size: .8rem; color: var(--vp-c-text-2); margin: .8rem 0 0; }
</style>
