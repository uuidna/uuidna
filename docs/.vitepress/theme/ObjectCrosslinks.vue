<!-- ObjectCrosslinks — related-object graph on every object page (link law: VPLink / VPButton / nav).

     Stock VitePress surfaces used elsewhere: VPDocFooter prev/next (compose params), sidebar, nav (ReferrerNav),
     local search, outline (this H2), socialLinks, SiteFooter. This component fills the related-object graph
     stock chrome cannot express: skill · principle · sequence · rotation · legs (axiom/witness/falsifier) ·
     related publications. No capacity/OS QA cards; no hero bag leak. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import { data as ledger } from '../ledger.data'
import { data as pubs } from '../publications.data'
import Handle from './Handle.vue'
import RefererCompass from './RefererCompass.vue'
import { objectUi } from '../../../dist/object-i18n.js'
import { theoremGraph, publicationGraph } from '../object-graph.js'

const { params, frontmatter } = useData()
const props = defineProps({ localeTag: { type: String, default: 'en' } })

const byKey = new Map(ledger.theorems.map((t) => [t.key, t]))
const bySkill = new Map()
const byPrin = new Map()
for (const t of ledger.theorems) {
  if (!bySkill.has(t.skill)) bySkill.set(t.skill, [])
  bySkill.get(t.skill).push(t)
  if (!byPrin.has(t.principle)) byPrin.set(t.principle, [])
  byPrin.get(t.principle).push(t)
}

const ui = computed(() => objectUi(props.localeTag))

const relatedPubs = computed(() => {
  const fm = frontmatter.value || {}
  const list = fm.relatedPublications
  return Array.isArray(list) ? list : []
})
const priorArtOutcome = computed(() => String((frontmatter.value || {}).priorArtOutcome || ''))
const priorArtClaim = computed(() => String((frontmatter.value || {}).priorArtClaim || ''))

/** Prefer compose-object params.crosslinks (SSG); fall back to live ledger recompute. */
const graph = computed(() => {
  const fm = frontmatter.value || {}
  if (fm.crosslinks && typeof fm.crosslinks === 'object') return fm.crosslinks
  const p = params.value || {}
  const key = p.key || (p.kind === 'theorem' ? p.id : undefined)
  const slug = p.slug || (p.kind === 'publications' ? p.id : undefined)
  if (key) {
    const t = byKey.get(key)
    if (!t) return null
    const row = ledger.legs?.[key]
    return theoremGraph(t, ledger.theorems, bySkill, byPrin, row, ledger.axiomHolds)
  }
  if (slug) {
    const pub = pubs.cards.find((c) => c.slug === slug)
    if (!pub) return null
    return publicationGraph(pub, pubs.cards)
  }
  const address = fm.seoAddress || ''
  return {
    handle: address ? String(address).replace(/-/g, '').slice(0, 8) : '',
    address,
    sequence: { prev: null, next: null },
  }
})

const hasLeg = (name) => Array.isArray(graph.value?.legs) && graph.value.legs.includes(name)
</script>

<template>
  <nav v-if="graph" class="ox" aria-label="Cross-dimension proof links">
    <h2 class="ox-h">{{ ui.proves }}</h2>
    <RefererCompass />
    <p class="ox-lede">{{ ui.provesLede }}</p>

    <ul class="ox-row">
      <li v-if="graph.address || graph.handle" class="ox-item">
        <span class="ox-k">{{ ui.hexbitDoor }}</span>
        <Handle v-if="graph.address" :uuid="graph.address" />
        <VPButton
          v-if="graph.handle"
          theme="alt"
          size="medium"
          :href="'/' + graph.handle"
          :text="'/' + graph.handle"
        />
      </li>

      <li v-if="graph.skill" class="ox-item">
        <span class="ox-k">Skill</span>
        <VPLink v-if="graph.skill.prev" class="ox-link" :href="graph.skill.prev.link" no-icon>← {{ graph.skill.prev.key }}</VPLink>
        <VPButton theme="alt" size="medium" :href="`/topics#skill-${graph.skill.name}`" :text="graph.skill.name" />
        <VPLink v-if="graph.skill.next" class="ox-link" :href="graph.skill.next.link" no-icon>{{ graph.skill.next.key }} →</VPLink>
      </li>

      <li v-if="graph.principle" class="ox-item">
        <span class="ox-k">Principle</span>
        <VPLink v-if="graph.principle.prev" class="ox-link" :href="graph.principle.prev.link" no-icon>← {{ graph.principle.prev.key }}</VPLink>
        <span class="ox-muted">{{ graph.principle.name }}</span>
        <VPLink v-if="graph.principle.next" class="ox-link" :href="graph.principle.next.link" no-icon>{{ graph.principle.next.key }} →</VPLink>
      </li>

      <li v-if="graph.sequence && (graph.sequence.prev || graph.sequence.next)" class="ox-item">
        <span class="ox-k">Sequence</span>
        <VPLink v-if="graph.sequence.prev" class="ox-link" :href="graph.sequence.prev.link" no-icon>← {{ graph.sequence.prev.key || graph.sequence.prev.title }}</VPLink>
        <VPLink v-if="graph.sequence.next" class="ox-link" :href="graph.sequence.next.link" no-icon>{{ graph.sequence.next.key || graph.sequence.next.title }} →</VPLink>
      </li>

      <li v-if="graph.rotation" class="ox-item">
        <span class="ox-k">Rotation</span>
        <VPLink v-if="graph.rotation.discovery" class="ox-link" :href="graph.rotation.discovery.link" no-icon title="discovery +1">{{ graph.rotation.discovery.key }}</VPLink>
        <VPLink v-if="graph.rotation.rosette" class="ox-link" :href="graph.rotation.rosette.link" no-icon title="rosette +7">{{ graph.rotation.rosette.key }}</VPLink>
        <VPLink v-if="graph.rotation.vortex" class="ox-link" :href="graph.rotation.vortex.link" no-icon title="vortex +9">{{ graph.rotation.vortex.key }}</VPLink>
        <VPLink v-if="graph.rotation.reflect" class="ox-link" :href="graph.rotation.reflect.link" no-icon title="reflect">{{ graph.rotation.reflect.key }}</VPLink>
      </li>

      <li v-if="graph.file" class="ox-item">
        <span class="ox-k">Proof · Lean</span>
        <VPButton theme="alt" size="medium" :href="`/lean/${graph.file}`" :text="graph.file" />
      </li>

      <li v-if="graph.legs" class="ox-item">
        <span class="ox-k">Legs</span>
        <VPButton v-if="graph.axiomHolds" theme="alt" size="medium" href="/tests" text="axiom-free" />
        <VPButton v-if="hasLeg('witness')" theme="alt" size="medium" href="/rosetta" :text="'witness · ' + (graph.claimedBy || 'external')" />
        <VPButton v-if="hasLeg('falsifier')" theme="alt" size="medium" href="/tests" text="falsifier" />
        <VPButton v-if="hasLeg('address')" theme="alt" size="medium" href="/trials" text="address fold" />
        <span v-if="graph.missing?.length" class="ox-muted">missing {{ graph.missing.join(' · ') }}</span>
      </li>

      <li v-if="graph.objectKind === 'publication'" class="ox-item">
        <span class="ox-k">Publication</span>
        <VPButton theme="alt" size="medium" href="/publications" text="All publications" />
      </li>

      <li v-if="relatedPubs.length" class="ox-item">
        <span class="ox-k">Related</span>
        <VPLink
          v-for="rp in relatedPubs"
          :key="rp.id"
          class="ox-link"
          :href="rp.pageUrl.replace('https://uuidna.com', '') || '/'"
          no-icon
        >{{ rp.id }}</VPLink>
      </li>

      <li v-if="priorArtClaim" class="ox-item">
        <span class="ox-k">Prior art · {{ priorArtOutcome }}</span>
        <span class="ox-prior">{{ priorArtClaim }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.ox { margin: 0.5rem 0 2rem; }
.ox-h { margin: 0 0 0.35rem; font-size: 1.05rem; border: none; }
.ox-lede { margin: 0 0 0.85rem; font-size: 0.85rem; color: var(--vp-c-text-2); }
.ox-row {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.ox-item {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.55rem;
  align-items: center;
  font-size: 0.82rem;
  max-width: 100%;
}
.ox-k {
  color: var(--vp-c-text-3);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  min-width: 5.5rem;
}
.ox-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.ox-link:hover { border-bottom-color: var(--vp-c-brand-1); }
.ox-muted { color: var(--vp-c-text-3); font-size: 0.78rem; }
.ox-prior { color: var(--vp-c-text-2); font-size: 0.78rem; line-height: 1.4; max-width: 36rem; }
.ox-item :deep(.VPButton) {
  display: inline-flex;
  padding: 0 10px;
  line-height: 26px;
  font-size: 12px;
}
</style>
