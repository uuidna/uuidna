<!-- AuditPanel — the audit game, played: toggle each independent refuter between "cleared" and "refuted", and the
     claim's verdict resolves by the {0,1} algebra AuditGame.lean seals. A claim survives (a P-position) iff NO refuter
     has a winning move — survive = ∏(1−rᵢ); it is flagged the moment ANY refuter refutes. Adding a refuter is
     monotone (never un-flags), and a majority panel confirms the finding. Pure client-side — nothing sent. -->
<script setup>
import { ref, computed } from 'vue'

const refuters = ref([false, false, false]) // each: did this refuter find a winning refutation?
const N = computed(() => refuters.value.length)
const nRefute = computed(() => refuters.value.filter((r) => r).length)
const survive = computed(() => refuters.value.reduce((p, r) => p * (r ? 0 : 1), 1)) // ∏(1−rᵢ)
const flagged = computed(() => survive.value === 0)
const majority = computed(() => nRefute.value * 2 > N.value)
const toggle = (i) => { const a = refuters.value.slice(); a[i] = !a[i]; refuters.value = a }
const addR = () => { if (N.value < 5) refuters.value = [...refuters.value, false] }
const dropR = () => { if (N.value > 1) refuters.value = refuters.value.slice(0, -1) }
const product = computed(() => refuters.value.map((r) => (r ? 0 : 1)).join('·'))
</script>

<template>
  <div class="ap">
    <div class="ap-panel">
      <button
        v-for="(r, i) in refuters" :key="i"
        class="ap-ref" :class="{ refuted: r }"
        @click="toggle(i)"
        :aria-label="`refuter ${i + 1}: ${r ? 'refuted' : 'cleared'}`">
        <span class="ap-ref-n">refuter {{ i + 1 }}</span>
        <span class="ap-ref-v">{{ r ? '✗ refuted' : '✓ cleared' }}</span>
      </button>
      <div class="ap-add">
        <button @click="addR" :disabled="N >= 5" title="add an independent refuter">+</button>
        <button @click="dropR" :disabled="N <= 1" title="remove a refuter">−</button>
      </div>
    </div>

    <p class="ap-verdict">
      survive = ∏(1−rᵢ) = <code>{{ product }} = {{ survive }}</code> —
      <strong v-if="!flagged" class="clean">CLEAN — a P-position (no refuter has a winning move)</strong>
      <strong v-else class="flag">FLAGGED — a refuter found a winning move</strong>
    </p>
    <p class="ap-note">
      {{ nRefute }}/{{ N }} refuted<template v-if="N >= 3"> · majority ({{ Math.floor(N / 2) + 1 }}+):
      <b :class="majority ? 'flag' : 'clean'">{{ majority ? 'confirmed' : 'not reached' }}</b></template>
      — adding a refuter is monotone: it can only flag, never un-flag.
    </p>
    <p class="ap-coins">
      <strong>an audit is a game:</strong> the verdict is <b>decidable</b> — a refutation is a winning move, a clean
      claim is a P-position — and N independent refuters are strictly more accurate. Sealed as
      <a href="/theorem/clean_is_a_p_position"><code>clean_is_a_p_position</code></a> ·
      <a href="/theorem/flag_is_any_refutation"><code>flag_is_any_refutation</code></a>.
      HONEST SCOPE: the decision is decidable, the coverage is not — a floor, not a wall. Nothing sent.
    </p>
  </div>
</template>

<style scoped>
.ap { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.ap-panel { display: flex; flex-wrap: wrap; gap: .8rem; justify-content: center; align-items: stretch; }
.ap-ref { display: flex; flex-direction: column; gap: .3rem; padding: .7rem 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); cursor: pointer; min-width: 7.5rem; }
.ap-ref.refuted { border-color: var(--vp-c-danger-1, #d33); background: var(--vp-c-danger-soft, rgba(221,51,51,.1)); }
.ap-ref-n { font-size: .72rem; color: var(--vp-c-text-3); text-transform: uppercase; letter-spacing: .04em; }
.ap-ref-v { font-weight: 600; }
.ap-ref.refuted .ap-ref-v { color: var(--vp-c-danger-1, #d33); }
.ap-ref:not(.refuted) .ap-ref-v { color: var(--vp-c-brand-1); }
.ap-add { display: flex; flex-direction: column; gap: .3rem; justify-content: center; }
.ap-add button { width: 2rem; height: 2rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); cursor: pointer; color: var(--vp-c-text-1); }
.ap-add button:disabled { opacity: .4; cursor: not-allowed; }
.ap-verdict { text-align: center; margin: 1rem 0 .3rem; }
.ap-verdict .clean { color: var(--vp-c-brand-1); }
.ap-verdict .flag { color: var(--vp-c-danger-1, #d33); }
.ap-note { text-align: center; font-size: .85rem; color: var(--vp-c-text-2); margin: .2rem 0; }
.ap-note .clean { color: var(--vp-c-brand-1); }
.ap-note .flag { color: var(--vp-c-danger-1, #d33); }
.ap-coins { font-size: .82rem; color: var(--vp-c-text-2); margin: 1rem 0 0; border-top: 1px solid var(--vp-c-divider); padding-top: .8rem; }
</style>
