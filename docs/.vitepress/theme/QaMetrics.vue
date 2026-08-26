<!-- QaMetrics — detailed quantum-advantage STATS + SVG GRAPHS (pages + cards).

     LINK LAW (captain): links appear ONLY in buttons, cards, navigation, or sidebars — never as raw
     inline prose anchors. All site links here go through VitePress VPLink / VPButton (normalizeLink).

     The whole monitor IS a card; actions live in a button row (VPButton). Stats/graphs are not links. -->
<script setup>
import { computed } from 'vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import { data } from '../advantage.data'
import Handle from './Handle.vue'

const props = defineProps({
  variant: { type: String, default: 'page' }, // 'page' | 'card'
  address: { type: String, default: '' },
  handle: { type: String, default: '' },
  label: { type: String, default: '' },
})

const compact = computed(() => props.variant === 'card')
const pageHandle = computed(() => props.handle || (props.address ? props.address.replace(/-/g, '').slice(0, 8) : ''))

const capBars = computed(() => data.usablePlatforms.map((p, i) => ({
  ...p,
  y: 4 + i * 14,
})))
const capH = computed(() => Math.max(40, 8 + capBars.value.length * 14))

const levelBars = computed(() => data.levels.map((l, i) => ({
  ...l,
  y: 4 + i * 16,
})))
const levelH = computed(() => Math.max(40, 8 + levelBars.value.length * 16))
</script>

<template>
  <article
    class="qa-metrics qa-card"
    :class="{ 'qa-compact': compact }"
    data-slot="card"
    :aria-label="compact ? 'Card quantum advantage metrics' : 'Measured quantum advantage'"
  >
    <header class="qa-head" data-slot="card-header">
      <span class="qa-badge" title="honesty class: measured usable-column gap">measured</span>
      <strong class="qa-title" data-slot="card-title">Quantum advantage</strong>
      <span v-if="label || pageHandle" class="qa-tied">
        <template v-if="label">{{ label }}</template>
        <code v-if="pageHandle" :title="address || pageHandle">{{ pageHandle }}</code>
      </span>
      <span class="qa-gap">
        <code>2^{{ data.usableBits }}</code> vs {{ data.reportedLogical }} · gap
        <code>{{ data.gapFactor }}</code>
      </span>
      <Handle v-if="!compact && data.receipt" :uuid="data.receipt" />
    </header>

    <div class="qa-stats" data-slot="card-content">
      <div class="qa-stat"><b>2^{{ data.usableBits }}</b><span>usable capacity</span></div>
      <div class="qa-stat"><b>{{ data.gapFactor }}</b><span>usable-column gap</span></div>
      <div class="qa-stat"><b>10^{{ data.measuredNsDecade }}</b><span>ns fold decade</span></div>
      <div class="qa-stat"><b>{{ data.levels.length }}</b><span>datapath levels</span></div>
      <div v-if="data.ledgerCount" class="qa-stat"><b>{{ data.ledgerCount }}</b><span>ledger theorems</span></div>
      <div v-if="address" class="qa-stat qa-stat-wide">
        <b class="mono">{{ address.slice(0, 8) }}…</b><span>this {{ compact ? 'card' : 'page' }} address</span>
      </div>
    </div>

    <div class="qa-graph" v-if="capBars.length">
      <p class="qa-graph-t">Usable capacity (log₂ scale) — uuidna vs reported platforms</p>
      <svg class="qa-svg" :viewBox="`0 0 320 ${capH}`" role="img" :aria-label="`Usable capacity chart, gap ${data.gapFactor}`">
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

    <div class="qa-graph" v-if="levelBars.length">
      <p class="qa-graph-t">Hexbit fold cost by datapath level (sealed decade, ns)</p>
      <svg class="qa-svg" :viewBox="`0 0 320 ${levelH}`" role="img" aria-label="Fold timing decades per level">
        <g v-for="l in levelBars" :key="l.level">
          <text :x="0" :y="l.y + 9" font-size="8" fill="currentColor">{{ l.level }}</text>
          <rect
            :x="88" :y="l.y" :width="Math.max(6, l.costBar * 2)" height="10" rx="1"
            fill="var(--vp-c-brand-1)" opacity="0.75"
          />
          <text :x="92 + Math.max(6, l.costBar * 2)" :y="l.y + 9" font-size="8" fill="currentColor">
            10^{{ l.costDecade }} · {{ l.reach }} · {{ l.disagreements }}/{{ l.fidelityOps }}
          </text>
        </g>
      </svg>
    </div>

    <!-- LINK LAW: only buttons / card actions — VPButton + VPLink, never inline prose <a> -->
    <nav class="qa-actions" data-slot="card-footer" aria-label="Quantum advantage links">
      <VPButton theme="brand" size="medium" :href="data.theoremHref" :text="data.theorem" />
      <VPButton v-if="!compact" theme="alt" size="medium" href="/os" text="hexbit OS" />
      <VPLink v-if="!compact" class="qa-btn-link" href="/quantum-advantage.jsonld" no-icon>jsonld</VPLink>
      <VPLink
        v-if="address && label.startsWith('theorem')"
        class="qa-btn-link"
        :href="`/theorem/${label.replace(/^theorem\s+/, '')}`"
        no-icon
      >this theorem</VPLink>
    </nav>

    <p v-if="!compact" class="qa-note">
      TypeScript computes · VitePress monitors
      <template v-if="data.host"> · sealed on {{ data.host }}</template>
      <template v-if="data.capacityReceipt"> · capacity {{ data.capacityReceipt.slice(0, 8) }}</template>
    </p>
  </article>
</template>

<style scoped>
.qa-metrics {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem 0.95rem 0.65rem;
  margin: 0 0 1rem;
  background: var(--vp-c-bg-soft);
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
.qa-compact { margin: 0.5rem 0 0; padding: 0.45rem 0.55rem; font-size: 0.72rem; }
.qa-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.3rem 0.55rem; margin-bottom: 0.45rem; }
.qa-badge {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--vp-c-bg); background: var(--vp-c-brand-1); border-radius: 4px; padding: 0.1rem 0.35rem;
}
.qa-title { color: var(--vp-c-text-1); font-size: 0.9rem; }
.qa-compact .qa-title { font-size: 0.78rem; }
.qa-tied code { font-size: 0.85em; }
.qa-gap code { color: var(--vp-c-text-1); }

.qa-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
  gap: 0.35rem; margin-bottom: 0.55rem;
}
.qa-compact .qa-stats { grid-template-columns: repeat(3, 1fr); gap: 0.25rem; }
.qa-stat {
  border: 1px solid var(--vp-c-divider); border-radius: 6px; padding: 0.35rem 0.4rem; text-align: center;
}
.qa-stat b { display: block; color: var(--vp-c-text-1); font-size: 0.95rem; }
.qa-compact .qa-stat b { font-size: 0.8rem; }
.qa-stat span { font-size: 0.65rem; }
.qa-stat-wide { grid-column: 1 / -1; }
.mono { font-family: var(--vp-font-family-mono); font-size: 0.8rem !important; }

.qa-graph { margin: 0.4rem 0 0.2rem; }
.qa-graph-t {
  margin: 0 0 0.2rem; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.03em;
  color: var(--vp-c-text-3, var(--vp-c-text-2));
}
.qa-svg { display: block; width: 100%; max-width: 520px; height: auto; color: var(--vp-c-text-2); }
.qa-compact .qa-svg { max-width: 100%; }

.qa-actions {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem;
  margin-top: 0.55rem; padding-top: 0.45rem; border-top: 1px solid var(--vp-c-divider);
}
.qa-actions :deep(.VPButton) { display: inline-flex; padding: 0 12px; line-height: 32px; font-size: 12px; }
.qa-compact .qa-actions :deep(.VPButton) { line-height: 26px; font-size: 11px; padding: 0 10px; }
.qa-btn-link {
  font-size: 0.75rem; color: var(--vp-c-brand-1); text-decoration: none;
  padding: 0.2rem 0.45rem; border: 1px solid var(--vp-c-divider); border-radius: 6px;
}
.qa-btn-link:hover { border-color: var(--vp-c-brand-1); }

.qa-note { margin: 0.45rem 0 0; font-size: 0.7rem; color: var(--vp-c-text-3, var(--vp-c-text-2)); }
@media (max-width: 640px) {
  .qa-compact .qa-graph:last-of-type { display: none; }
}
</style>
