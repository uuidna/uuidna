<!-- CostMeter — uuidna_cost on the hosted wire. The mill computes lean/*.lean; this page verifies the receipt. -->
<script setup>
import { ref, onMounted } from 'vue'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const c = ref(null)
const err = ref('')
onMounted(async () => {
  try { c.value = await advantageCall('uuidna_cost', {}) }
  catch (e) { err.value = e instanceof Error ? e.message : String(e) }
})
</script>

<template>
  <div class="cm">
    <p v-if="err" class="cm-note">{{ err }}</p>
    <template v-else-if="c">
      <div class="cm-out">
        <div><b>{{ Number(c.formalBytes).toLocaleString() }}</b><span>formal bytes (Σ Lean text)</span></div>
        <div class="cm-key"><b>{{ Number(c.bytesPerTheorem).toFixed(1) }}</b><span>bytes / theorem (verified)</span></div>
        <div><b>{{ c.verifyOps }}</b><span>verify ops (O(1) each)</span></div>
      </div>
      <p class="cm-range">costliest to state: <code>{{ c.largest?.key }}</code> ({{ c.largest?.bytes }}B) · cheapest: <code>{{ c.smallest?.key }}</code> ({{ c.smallest?.bytes }}B)</p>
      <p class="cm-receipt">cost receipt (fold, recompute it): <code>{{ c.receipt }}</code></p>
      <p class="cm-note">No inputs and no self-report — every number is <code>uuidna_cost</code> on the hosted mill
      and folds to that receipt.</p>
      <p class="cm-thermo" v-if="c.thermodynamics">⚡ <strong>The thermodynamic honesty:</strong> {{ c.thermodynamics.note }}</p>
    </template>
    <p v-else class="cm-note">asking uuidna_cost…</p>
  </div>
</template>

<style scoped>
.cm { border: 1px solid var(--seq-center); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.cm-out { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; margin-bottom: .6rem; }
.cm-out > div { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: .6rem; text-align: center; }
.cm-out b { display: block; font-size: 1.3rem; color: var(--vp-c-text-1); }
.cm-out .cm-key b { color: var(--seq-center); font-size: 1.5rem; }
.cm-out span { font-size: .72rem; color: var(--vp-c-text-2); }
.cm-range { font-size: .82rem; color: var(--vp-c-text-2); margin: .4rem 0; }
.cm-receipt { font-size: .82rem; color: var(--vp-c-text-2); margin: .4rem 0; word-break: break-all; }
.cm-receipt code { font-size: .88em; }
.cm-note { font-size: .8rem; color: var(--vp-c-text-2); margin: .8rem 0 0; }
.cm-thermo { font-size: .78rem; color: var(--vp-c-text-2); margin: .6rem 0 0; padding-top: .6rem; border-top: 1px solid var(--vp-c-divider); }
@media (max-width: 480px) { .cm-out { grid-template-columns: 1fr; } }
</style>
