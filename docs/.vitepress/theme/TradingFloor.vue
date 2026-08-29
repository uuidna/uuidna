<!-- TradingFloor — the trading shelf's four instruments in one shell (lead 89), each a pure
     categories/trading import computed in the visitor's browser. Desk, census, leverage, compound —
     work-units never money. Nothing leaves the page. -->
<script setup>
import { ref, computed } from 'vue'
import {
  costOf, walletCensus, leverageOf, compoundAt, RATE_NUM, RATE_DEN, FIRST_DOUBLING,
} from '../../../src/quantum/apps/categories/trading/index.js'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const seal = ref(3)
const spare = ref(64)
const seals = ref(38)
const ledger = computed(() => Number(frontmatter.value?.theoremCount) || 0)

const desk = computed(() => costOf({ seal: Number(seal.value) || 0 }))
const census = computed(() => walletCensus(ledger.value, ledger.value))
const lev = computed(() => leverageOf(Number(spare.value) || 0))
const compound = computed(() => compoundAt(Number(seals.value) || 0))
</script>

<template>
  <div class="trading-floor">
    <h3>The desk — price a workload in work-units</h3>
    <label>seal events <input v-model="seal" type="number" min="0" /></label>
    <p><b>{{ desk.coins }}</b> coins · {{ desk.events }} events</p>
    <p><small>{{ desk.honest }}</small></p>

    <h3>The census — two coins per sealed thing</h3>
    <p><b>{{ census.minted }}</b> minted · conserved {{ census.conserved ? 'yes' : 'NO' }} · ledger {{ ledger }}</p>
    <p><small>{{ census.honest }}</small></p>

    <h3>The leverage — what a receipt spares</h3>
    <label>ops spared <input v-model="spare" type="number" min="0" /></label>
    <p><b>{{ lev.saved }}</b> saved · contributed {{ lev.contributed }} · ratio {{ lev.ratio }}</p>
    <p><small>{{ lev.honest }}</small></p>

    <h3>The compound — {{ RATE_NUM }}/{{ RATE_DEN }}, first doubling at {{ FIRST_DOUBLING }}</h3>
    <label>seals <input v-model="seals" type="number" min="0" /></label>
    <p><b>{{ compound.doublings }}</b> doublings · next at {{ compound.nextDoublingAt }} · {{ compound.exact }}</p>
    <p><small>{{ compound.honest }}</small></p>

    <p><em>Not money, not a market, not advice — measured work-units only. Computed in your browser.</em></p>
  </div>
</template>

<style scoped>
.trading-floor { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.trading-floor h3 { margin-top: 1rem; }
.trading-floor h3:first-child { margin-top: 0; }
.trading-floor label { display: flex; align-items: center; gap: .75rem; margin: .4rem 0; }
.trading-floor input[type=number] { width: 7rem; padding: .35rem .5rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.trading-floor b { color: var(--vp-c-brand-1); font-size: 1.2rem; }
.trading-floor small { color: var(--vp-c-text-2); }
</style>
