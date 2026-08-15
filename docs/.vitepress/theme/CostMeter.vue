<!-- CostMeter — the RECOMPUTABLE cost of the ledger, read live from the bundled lean/*.lean, no self-report and no
     inputs. The produce cost is the formal-corpus size; the verify cost is O(1) per theorem. Deterministic: it folds
     to a receipt anyone rechecks. This is the recomputable counterpart to TokenMeter (which is a self-report). -->
<script setup>
import { recomputableCost } from '../../../dist/index.js'
const c = recomputableCost()
</script>

<template>
  <div class="cm">
    <div class="cm-out">
      <div><b>{{ c.formalBytes.toLocaleString() }}</b><span>formal bytes (Σ Lean text)</span></div>
      <div class="cm-key"><b>{{ c.bytesPerTheorem.toFixed(1) }}</b><span>bytes / theorem (recomputed)</span></div>
      <div><b>{{ c.verifyOps }}</b><span>verify ops (O(1) each)</span></div>
    </div>
    <p class="cm-range">costliest to state: <code>{{ c.largest.key }}</code> ({{ c.largest.bytes }}B) · cheapest: <code>{{ c.smallest.key }}</code> ({{ c.smallest.bytes }}B)</p>
    <p class="cm-receipt">cost receipt (fold, recompute it): <code>{{ c.receipt }}</code></p>
    <p class="cm-note">No self-report and no inputs — every number is computed from <code>lean/*.lean</code> itself and
    folds to that receipt, so anyone recomputes the same cost. This is efficiency <strong>proven</strong> (routed to
    the ledger); the meter above is efficiency <strong>measured</strong> (a self-report the page cannot check).</p>
    <p class="cm-thermo">⚡ <strong>The thermodynamic honesty:</strong> {{ c.thermodynamics.note }}</p>
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
</style>
