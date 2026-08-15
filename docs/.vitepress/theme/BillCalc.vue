<!-- BillCalc — the measured exchange, computed in the browser. NOT financial trading: it measures the WORK a
     content-address saves (an O(N) recompute replaced by an O(1) verify) and states the two conserved coins. No
     money, no market, no price — a unit of proof-of-work-saved. Public / non-commercial use is free. -->
<script setup>
import { ref, computed } from 'vue'
import { billUuidna } from '../../../dist/index.js'

const recompute = ref(64)
const verify = ref(1)
const commercial = ref(false)
const bill = computed(() => billUuidna({ commercial: commercial.value, recomputeOps: Number(recompute.value) || 0, verifyOps: Number(verify.value) || 0 }))
</script>

<template>
  <div class="bill">
    <div class="bill-row"><label>recompute cost <small>O(N)</small></label><input v-model="recompute" type="number" min="0" /></div>
    <div class="bill-row"><label>verify cost <small>O(1)</small></label><input v-model="verify" type="number" min="0" /></div>
    <div class="bill-row"><label>commercial use</label><input v-model="commercial" type="checkbox" /></div>
    <div class="bill-out">
      <div><b>{{ bill.bitsSaved }}</b><span>bits saved</span></div>
      <div><b>{{ bill.coins }}</b><span>coins</span></div>
      <div><b>{{ bill.free ? 'free' : 'measured' }}</b><span>{{ bill.free ? 'public interest' : 'commercial' }}</span></div>
    </div>
    <p class="bill-basis">{{ bill.basis }}</p>
    <p class="bill-note"><strong>Not financial trading.</strong> This measures computational work saved, not money — the
    two coins are the topology of the double torus (−χ of a genus-2 surface = 2), a conserved invariant, never a price
    or an investment. Computed in your browser; nothing is sent.</p>
  </div>
</template>

<style scoped>
.bill { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.bill-row { display: flex; align-items: center; gap: 1rem; margin: .5rem 0; }
.bill-row label { flex: 1; font-size: .95rem; }
.bill-row label small { color: var(--vp-c-text-3); font-family: var(--vp-font-family-mono); }
.bill-row input[type=number] { width: 8rem; padding: .4rem .6rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.bill-out { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6rem; margin: 1rem 0 .4rem; }
.bill-out > div { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: .6rem; text-align: center; }
.bill-out b { display: block; font-size: 1.4rem; color: var(--vp-c-brand-1); }
.bill-out span { font-size: .72rem; color: var(--vp-c-text-2); }
.bill-basis { font-size: .82rem; color: var(--vp-c-text-2); margin: .6rem 0 0; }
.bill-note { font-size: .8rem; color: var(--vp-c-text-2); margin: .8rem 0 0; }
</style>
