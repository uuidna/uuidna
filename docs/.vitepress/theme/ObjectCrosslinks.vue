<!-- ObjectCrosslinks — proves the hero abstract across cross dimensions (cards/buttons/nav only — link law).

     Dimensions: hexbit address · skill · principle · QA usable-gap · Lean source · neighbour fold handles.
     Uses VitePress VPLink / VPButton; never raw inline prose anchors. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
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
  <div v-if="ctx" class="ox" data-slot="card" aria-label="Cross-dimension proof links">
    <h2 class="ox-h">{{ ui.proves }}</h2>
    <p class="ox-lede">{{ ui.provesLede }}</p>

    <div class="ox-grid">
      <article v-if="ctx.address" class="ox-card" data-seo-complete="1">
        <h3>{{ ui.hexbitDoor }}</h3>
        <p>Content-address handle — post-freeze permanence.</p>
        <Handle :uuid="ctx.address" />
        <VPButton theme="alt" size="medium" :href="'/' + ctx.handle" :text="'/' + ctx.handle" />
      </article>

      <article class="ox-card">
        <h3>Usable-capacity advantage</h3>
        <p>Measured gap <code>2^80</code> — theorem seal.</p>
        <VPButton theme="brand" size="medium" href="/theorem/usable_gap_is_two_to_eighty" text="usable_gap_is_two_to_eighty" />
      </article>

      <article v-if="ctx.kind === 'theorem'" class="ox-card">
        <h3>Skill · {{ ctx.skill }}</h3>
        <p>Capability axis of this seal.</p>
        <VPButton theme="alt" size="medium" :href="`/topics#skill-${ctx.skill}`" :text="ctx.skill" />
      </article>

      <article v-if="ctx.kind === 'theorem' && ctx.prevKey" class="ox-card">
        <h3>Principle neighbour</h3>
        <p>Same principle cluster — crosslinked typography via card.</p>
        <VPLink class="ox-link" :href="`/theorem/${ctx.prevKey}`" no-icon>{{ ctx.prevKey }}</VPLink>
        <VPLink v-if="ctx.nextKey" class="ox-link" :href="`/theorem/${ctx.nextKey}`" no-icon>{{ ctx.nextKey }}</VPLink>
      </article>

      <article v-if="ctx.kind === 'theorem' && ctx.file" class="ox-card">
        <h3>Lean wing</h3>
        <p>Source of the <code>by decide</code> seal.</p>
        <VPButton theme="alt" size="medium" :href="`/lean/${ctx.file}`" :text="ctx.file" />
      </article>

      <article v-if="ctx.kind === 'publication'" class="ox-card">
        <h3>Publication fold</h3>
        <p>{{ ctx.count }} sealed theorems · receipt handle.</p>
        <Handle v-if="ctx.receipt" :uuid="ctx.receipt" />
        <VPButton theme="alt" size="medium" href="/publications" text="All publications" />
      </article>

      <article v-if="relatedPubs.length" class="ox-card">
        <h3>Related publications</h3>
        <p>Crosslinked seals — metadata + keywords.</p>
        <VPLink
          v-for="rp in relatedPubs"
          :key="rp.id"
          class="ox-link"
          :href="rp.pageUrl.replace('https://uuidna.com', '') || '/'"
          no-icon
        >{{ rp.id }}</VPLink>
      </article>

      <article v-if="priorArtClaim" class="ox-card">
        <h3>Prior art · {{ priorArtOutcome }}</h3>
        <p class="ox-prior">{{ priorArtClaim }}</p>
      </article>

      <article class="ox-card">
        <h3>OS hexbit monitor</h3>
        <p>TypeScript computes · VitePress monitors Alpine ports.</p>
        <VPButton theme="alt" size="medium" href="/os" text="The OS" />
      </article>
    </div>
  </div>
</template>

<style scoped>
.ox { margin: 0.5rem 0 2rem; }
.ox-h { margin: 0 0 0.35rem; font-size: 1.05rem; border: none; }
.ox-lede { margin: 0 0 1rem; font-size: 0.85rem; color: var(--vp-c-text-2); }
.ox-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
.ox-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 0.85rem 0.95rem;
  background: var(--vp-c-bg-soft);
}
.ox-card h3 { margin: 0 0 0.35rem; font-size: 0.88rem; border: none; color: var(--vp-c-text-1); }
.ox-card p { margin: 0 0 0.65rem; font-size: 0.78rem; color: var(--vp-c-text-2); }
.ox-link {
  display: inline-block;
  margin: 0.2rem 0.35rem 0 0;
  font-size: 0.78rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 0.15rem 0.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.ox-link:hover { border-color: var(--vp-c-brand-1); }
.ox-prior { font-size: 0.72rem !important; line-height: 1.4; }
.ox-card :deep(.VPButton) { display: inline-flex; padding: 0 12px; line-height: 30px; font-size: 12px; }
</style>
