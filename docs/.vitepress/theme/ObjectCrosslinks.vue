<!-- ObjectCrosslinks — compact proves row (handle · Lean · skill · principle neighbours).
     Capacity / OS doors live on /quantum and home — not re-injected on every object page. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { data as ledger } from '../ledger.data'
import { data as pubs } from '../publications.data'
import Handle from './Handle.vue'
import { objectUi } from '../../../dist/object-i18n.js'

const { params, frontmatter } = useData()
const props = defineProps({ localeTag: { type: String, default: 'en' } })

const byKey = new Map(ledger.theorems.map((t) => [t.key, t]))
const bySlug = new Map(pubs.cards.map((p) => [p.slug, p]))

const ui = computed(() => objectUi(props.localeTag))

const relatedPubs = computed(() => {
  const fm = frontmatter.value || {}
  const list = fm.relatedPublications
  return Array.isArray(list) ? list : []
})
const priorArtOutcome = computed(() => String((frontmatter.value || {}).priorArtOutcome || ''))
const priorArtClaim = computed(() => String((frontmatter.value || {}).priorArtClaim || ''))

const ctx = computed(() => {
  const p = params.value || {}
  const fm = frontmatter.value || {}
  const key = p.key || (p.kind === 'theorem' ? p.id : undefined)
  const slug = p.slug || (p.kind === 'publications' ? p.id : undefined)
  if (key) {
    const t = byKey.get(key)
    if (!t) return null
    const siblings = (ledger.groups.find((g) => g.name === t.principle)?.theorems || []).filter((x) => x.key !== t.key)
    const next = siblings[0]
    const prev = siblings[siblings.length - 1]
    return {
      kind: 'theorem',
      key: t.key,
      address: t.address,
      skill: t.skill,
      principle: t.principle,
      file: t.file,
      nextKey: next?.key,
      prevKey: prev?.key,
      handle: t.address.replace(/-/g, '').slice(0, 8),
    }
  }
  if (slug) {
    const pub = bySlug.get(slug)
    if (!pub) return null
    return {
      kind: 'publication',
      slug: pub.slug,
      address: pub.address,
      receipt: pub.receipt,
      count: pub.count,
      handle: (pub.receipt || pub.address).replace(/-/g, '').slice(0, 8),
      file: pub.file,
    }
  }
  return {
    kind: 'page',
    address: fm.seoAddress || '',
    handle: fm.seoAddress ? String(fm.seoAddress).replace(/-/g, '').slice(0, 8) : '',
  }
})
</script>

<template>
  <nav v-if="ctx" class="ox" aria-label="Cross-dimension proof links">
    <h2 class="ox-h">{{ ui.proves }}</h2>
    <p class="ox-lede">{{ ui.provesLede }}</p>

    <ul class="ox-row">
      <li v-if="ctx.address" class="ox-item">
        <span class="ox-k">{{ ui.hexbitDoor }}</span>
        <Handle :uuid="ctx.address" />
        <VPLink class="ox-link" :href="'/' + ctx.handle" no-icon>/{{ ctx.handle }}</VPLink>
      </li>
      <li v-if="ctx.kind === 'theorem' && ctx.file" class="ox-item">
        <span class="ox-k">Lean</span>
        <VPLink class="ox-link" :href="`/lean/${ctx.file}`" no-icon>{{ ctx.file }}</VPLink>
      </li>
      <li v-if="ctx.kind === 'theorem'" class="ox-item">
        <span class="ox-k">Skill</span>
        <VPLink class="ox-link" :href="`/topics#skill-${ctx.skill}`" no-icon>{{ ctx.skill }}</VPLink>
      </li>
      <li v-if="ctx.kind === 'theorem' && (ctx.prevKey || ctx.nextKey)" class="ox-item">
        <span class="ox-k">Principle</span>
        <VPLink v-if="ctx.prevKey" class="ox-link" :href="`/theorem/${ctx.prevKey}`" no-icon>{{ ctx.prevKey }}</VPLink>
        <VPLink v-if="ctx.nextKey" class="ox-link" :href="`/theorem/${ctx.nextKey}`" no-icon>{{ ctx.nextKey }}</VPLink>
      </li>
      <li v-if="ctx.kind === 'publication'" class="ox-item">
        <span class="ox-k">Publication</span>
        <Handle v-if="ctx.receipt" :uuid="ctx.receipt" />
        <VPLink class="ox-link" href="/publications" no-icon>All publications</VPLink>
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
  flex-wrap: wrap;
  gap: 0.65rem 1.25rem;
  align-items: baseline;
}
.ox-item {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
  align-items: baseline;
  font-size: 0.82rem;
  max-width: 100%;
}
.ox-k {
  color: var(--vp-c-text-3);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.ox-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.ox-link:hover { border-bottom-color: var(--vp-c-brand-1); }
.ox-prior { color: var(--vp-c-text-2); font-size: 0.78rem; line-height: 1.4; max-width: 36rem; }
</style>
