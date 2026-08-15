<!-- TokenMeter — tokens-per-theorem, any time, in your browser. Enter a token distribution and it divides the total
     by the LIVE sealed-theorem count (read from the bundled ledger) to give the honest cost-of-proof metric. The
     same computation the uuidna_tokens MCP tool runs. HONEST: the token counts are YOUR self-report (this page cannot
     observe them); the divisor — the theorem count — is the recomputable truth. Nothing is sent. -->
<script setup>
import { ref, computed } from 'vue'
import { theorems } from '../../../dist/index.js'

const N = theorems().length
const input = ref(120000)
const output = ref(30000)
const cached = ref(800000)
const reasoning = ref(50000)

const num = (v) => Number(v) || 0
const total = computed(() => num(input.value) + num(output.value) + num(cached.value) + num(reasoning.value))
const perTheorem = computed(() => (N ? total.value / N : 0))
const frac = (v) => (total.value ? Math.round((num(v) / total.value) * 100) : 0)
</script>

<template>
  <div class="tm">
    <div class="tm-inputs">
      <label>input <input v-model.number="input" type="number" min="0" /></label>
      <label>output <input v-model.number="output" type="number" min="0" /></label>
      <label>cached <input v-model.number="cached" type="number" min="0" /></label>
      <label>reasoning <input v-model.number="reasoning" type="number" min="0" /></label>
    </div>
    <div class="tm-out">
      <div><b>{{ total.toLocaleString() }}</b><span>tokens</span></div>
      <div><b>{{ N }}</b><span>theorems (live)</span></div>
      <div class="tm-key"><b>{{ perTheorem.toFixed(1) }}</b><span>tokens / theorem</span></div>
    </div>
    <div class="tm-dist">
      distribution — input {{ frac(input) }}% · output {{ frac(output) }}% · cached {{ frac(cached) }}% · reasoning {{ frac(reasoning) }}%
    </div>
    <p class="tm-note">The token counts are <strong>your self-report</strong> — this page cannot observe them. The
    divisor, the theorem count, is the recomputable truth read live from the ledger. Fold many reports over a session
    to watch the cost-per-theorem fall. Measured on independent skilled work, not money. Nothing is sent.</p>
  </div>
</template>

<style scoped>
.tm { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.tm-inputs { display: grid; grid-template-columns: repeat(2, 1fr); gap: .6rem 1rem; }
.tm-inputs label { font-size: .85rem; color: var(--vp-c-text-2); display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
.tm-inputs input { width: 8rem; padding: .35rem .5rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.tm-out { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; margin: 1rem 0 .5rem; }
.tm-out > div { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: .6rem; text-align: center; }
.tm-out b { display: block; font-size: 1.3rem; color: var(--vp-c-text-1); }
.tm-out .tm-key b { color: var(--seq-center); font-size: 1.5rem; }
.tm-out span { font-size: .72rem; color: var(--vp-c-text-2); }
.tm-dist { font-size: .8rem; color: var(--vp-c-text-2); }
.tm-note { font-size: .8rem; color: var(--vp-c-text-2); margin: .9rem 0 0; }
@media (max-width: 480px) { .tm-out { grid-template-columns: 1fr; } .tm-inputs { grid-template-columns: 1fr; } }
</style>
