<!-- QuantumAdvantage — home/README companion only.

     Site-level usable-capacity monitor from sealed advantage + capacity reports.
     Not mounted on theorem/object pages. No page-local fake metrics. No card injection. -->
<script setup>
import { computed } from 'vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { data } from '../advantage.data'

const capBars = computed(() => data.usablePlatforms.map((p, i) => ({
  ...p,
  y: 4 + i * 14,
})))
const capH = computed(() => Math.max(40, 8 + capBars.value.length * 14))
</script>

<template>
  <aside class="qa-home" aria-label="Measured usable-capacity advantage">
    <header class="qa-home-head">
      <strong>Usable-capacity advantage</strong>
      <span class="qa-home-gap">
        <code>2^{{ data.usableBits }}</code> vs reported {{ data.reportedLogical }} logical · gap
        <code>{{ data.gapFactor }}</code>
      </span>
    </header>

    <p class="qa-home-lede">
      Sealed arithmetic on the usable column only — theorem
      <code>{{ data.theorem }}</code>.
      Not a QPU claim and not a Shor-class speedup
      (<code>n_qubit_dimension</code> bounds classical simulation for n = 1..5).
    </p>

    <dl class="qa-home-stats">
      <div>
        <dt>usable bits</dt>
        <dd><code>2^{{ data.usableBits }}</code></dd>
      </div>
      <div>
        <dt>gap factor</dt>
        <dd><code>{{ data.gapFactor }}</code></dd>
      </div>
      <div>
        <dt>fold decade</dt>
        <dd><code>10^{{ data.measuredNsDecade }}</code> ns</dd>
      </div>
      <div v-if="data.ledgerCount">
        <dt>ledger</dt>
        <dd>{{ data.ledgerCount }} theorems</dd>
      </div>
    </dl>

    <div v-if="capBars.length" class="qa-home-chart">
      <p class="qa-home-chart-t">Usable capacity (log₂) — uuidna vs reported platforms</p>
      <svg class="qa-home-svg" :viewBox="`0 0 320 ${capH}`" role="img" :aria-label="`Usable capacity, gap ${data.gapFactor}`">
        <g v-for="p in capBars" :key="p.org + p.model">
          <text :x="0" :y="p.y + 8" font-size="8" fill="currentColor">{{ p.org }}</text>
          <rect
            :x="88" :y="p.y" :width="Math.max(4, p.usableBar * 2)" height="9" rx="1"
            :fill="p.highlight ? 'var(--vp-c-brand-1)' : 'currentColor'"
            :opacity="p.highlight ? 1 : 0.4"
          />
          <text :x="92 + Math.max(4, p.usableBar * 2)" :y="p.y + 8" font-size="8" fill="currentColor">
            {{ p.usable }}{{ p.highlight ? ' ←' : '' }}
          </text>
        </g>
      </svg>
    </div>

    <nav class="qa-home-actions" aria-label="Capacity report links">
      <VPButton theme="brand" size="medium" :href="data.theoremHref" :text="data.theorem" />
      <VPButton theme="alt" size="medium" href="/quantum" text="capacity report" />
      <VPLink class="qa-home-jsonld" href="/quantum-advantage.jsonld" no-icon>jsonld</VPLink>
    </nav>
  </aside>
</template>

<style scoped>
.qa-home {
  margin: 1.25rem 0 1.75rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  max-width: 40rem;
}
.qa-home-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
  margin-bottom: 0.45rem;
  color: var(--vp-c-text-1);
}
.qa-home-gap code { color: var(--vp-c-text-1); }
.qa-home-lede {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  line-height: 1.45;
}
.qa-home-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
  gap: 0.4rem;
  margin: 0 0 0.75rem;
}
.qa-home-stats div {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.35rem 0.45rem;
  text-align: center;
}
.qa-home-stats dt {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
}
.qa-home-stats dd {
  margin: 0.15rem 0 0;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
}
.qa-home-chart-t {
  margin: 0 0 0.25rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
}
.qa-home-svg {
  display: block;
  width: 100%;
  max-width: 480px;
  height: auto;
  color: var(--vp-c-text-2);
}
.qa-home-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.75rem;
  padding-top: 0.55rem;
  border-top: 1px solid var(--vp-c-divider);
}
.qa-home-actions :deep(.VPButton) {
  display: inline-flex;
  padding: 0 12px;
  line-height: 32px;
  font-size: 12px;
}
.qa-home-jsonld {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 0.2rem 0.45rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.qa-home-jsonld:hover { border-color: var(--vp-c-brand-1); }
</style>
