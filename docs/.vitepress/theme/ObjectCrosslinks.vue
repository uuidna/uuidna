<!-- ObjectCrosslinks — related-object graph on every object page (link law: VPLink / VPButton / nav).

     Stock VitePress surfaces used elsewhere: VPDocFooter prev/next (compose params), sidebar, nav (ReferrerNav),
     local search, outline (this H2), socialLinks, SiteFooter. This component fills the related-object graph
     stock chrome cannot express: skill · principle · sequence · rotation · legs (axiom/witness/falsifier) ·
     related publications · prior art · keywords · unlocks. No capacity/OS QA cards; no hero bag leak. -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import Handle from './Handle.vue'
import RefererCompass from './RefererCompass.vue'
import { objectUi } from '../../../src/object-i18n.js'

const { params, frontmatter } = useData()
const props = defineProps({ localeTag: { type: String, default: 'en' } })

const ui = computed(() => objectUi(props.localeTag))

/** This URL's monograph graph — composed at SSG into params/frontmatter. No census import. */
const graph = computed(() => {
  const fm = frontmatter.value || {}
  if (fm.crosslinks && typeof fm.crosslinks === 'object') return fm.crosslinks
  const address = fm.seoAddress || fm.address || ''
  return {
    handle: fm.handle || '',
    address,
    sequence: { prev: null, next: null },
  }
})

const keywords = computed(() => {
  const g = graph.value
  if (Array.isArray(g?.keywords) && g.keywords.length) return g.keywords
  const tags = frontmatter.value?.tags
  return Array.isArray(tags) ? tags.slice(0, 12) : []
})

const relatedPubs = computed(() => {
  const g = graph.value
  if (Array.isArray(g?.relatedPublications) && g.relatedPublications.length) return g.relatedPublications
  const fm = frontmatter.value || {}
  const list = fm.relatedPublications
  if (!Array.isArray(list)) return []
  return list.map((rp) => ({
    key: rp.id,
    title: rp.title || rp.id,
    link: String(rp.pageUrl || '').replace('https://uuidna.com', '') || `/publications/${rp.id}`,
  }))
})

const relatedTheorems = computed(() => {
  const g = graph.value
  if (Array.isArray(g?.relatedTheorems) && g.relatedTheorems.length) return g.relatedTheorems
  return []
})

const relatedTheoremCount = computed(() => graph.value?.relatedTheoremCount || relatedTheorems.value.length)

const priorArt = computed(() => {
  const g = graph.value?.priorArt
  if (g) return g
  const fm = frontmatter.value || {}
  const claim = String(fm.priorArtClaim || '')
  const outcome = String(fm.priorArtOutcome || '')
  const priors = Array.isArray(fm.priorArtPriors) ? fm.priorArtPriors : []
  if (!claim && !priors.length) return null
  return { outcome, claim, priors }
})

const seals = computed(() => (Array.isArray(graph.value?.seals) ? graph.value.seals : []))

const hasAxes = computed(() => graph.value && (
  graph.value.skill || graph.value.principle
  || (graph.value.sequence && (graph.value.sequence.prev || graph.value.sequence.next))
  || graph.value.rotation
))

const hasProof = computed(() => graph.value && (
  graph.value.address || graph.value.handle || graph.value.file || graph.value.legs
))

const hasAxioms = computed(() => graph.value && (
  graph.value.unbound
  || (graph.value.dependsOn?.length > 0)
  || (graph.value.wingDefs?.length > 0)
  || graph.value.depCount > 0
))

const wingUnused = computed(() => {
  const g = graph.value
  if (!g?.wingDefs?.length) return []
  const used = new Set(g.dependsOn || [])
  return g.wingDefs.filter((d) => !used.has(d))
})

const hasRelated = computed(() => graph.value && (
  keywords.value.length || relatedPubs.value.length || relatedTheorems.value.length
  || priorArt.value || graph.value.monograph || graph.value.unlocks || graph.value.waves
  || seals.value.length || graph.value.objectKind === 'publication'
))

const useDemo = computed(() => graph.value?.use || frontmatter.value?.use || null)

const hasUse = computed(() => !!useDemo.value)

const shelfHref = computed(() => {
  const u = useDemo.value
  const key = params.value?.key || params.value?.id
  if (!u || !key) return '/school'
  return `${u.shelf.route}?key=${encodeURIComponent(key)}`
})

const hasLeg = (name) => Array.isArray(graph.value?.legs) && graph.value.legs.includes(name)

const topicHref = (kw) => {
  const s = String(kw || '')
  if (s.startsWith('related:')) return `/publications/${s.slice(8)}`
  if (s.startsWith('doi:')) return `https://doi.org/${s.slice(4)}`
  return `/topics#skill-${s}`
}

const axiomHref = (def) => {
  const f = graph.value?.file || ''
  return `/axioms?file=${encodeURIComponent(f)}&def=${encodeURIComponent(def)}`
}

const fill = (template, vars) => String(template).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

const gravityText = computed(() => {
  const g = graph.value
  if (!g) return ''
  if (g.unbound) return ui.value.gravityUnbound
  return fill(ui.value.gravityBound, { gravity: g.gravity, count: g.depCount })
})

const neighboursText = computed(() => {
  const g = graph.value
  if (!g || g.neighbourCount == null) return ''
  return fill(ui.value.neighboursClique, { count: g.neighbourCount })
})

const unusedText = computed(() => fill(ui.value.unusedInTheorem, { n: wingUnused.value.length }))

const hasTen = computed(() => !!graph.value?.ten)
const hasChannel = computed(() => !!graph.value?.channel)

const tenFreeText = computed(() => {
  const ten = graph.value?.ten
  if (!ten) return ''
  return fill(ui.value.tenFreeSummary, ten)
})

const tenCompactText = computed(() => {
  const ten = graph.value?.ten
  if (!ten) return ''
  return fill(ui.value.tenCompactSummary, ten)
})

const stationTen = computed(() => graph.value?.stations?.ten ?? null)
</script>

<template>
  <nav v-if="graph" class="ox" aria-label="Cross-dimension proof links">
    <h2 class="ox-h">{{ ui.proves }}</h2>
    <RefererCompass />
    <p class="ox-lede">{{ ui.provesLede }}</p>

    <section v-if="hasAxes" class="ox-group">
      <h3 class="ox-g">{{ ui.groupAxes }}</h3>
      <ul class="ox-row">
        <li v-if="graph.skill" class="ox-item">
          <span class="ox-k">Skill</span>
          <VPLink v-if="graph.skill.prev" class="ox-link" :href="graph.skill.prev.link" no-icon>← {{ graph.skill.prev.key }}</VPLink>
          <VPButton theme="alt" size="medium" :href="`/topics#skill-${graph.skill.name}`" :text="`${graph.skill.name} (${graph.skill.count})`" />
          <VPLink v-if="graph.skill.next" class="ox-link" :href="graph.skill.next.link" no-icon>{{ graph.skill.next.key }} →</VPLink>
        </li>

        <li v-if="graph.principle" class="ox-item">
          <span class="ox-k">Principle</span>
          <VPLink v-if="graph.principle.prev" class="ox-link" :href="graph.principle.prev.link" no-icon>← {{ graph.principle.prev.key }}</VPLink>
          <span class="ox-muted">{{ graph.principle.name }} ({{ graph.principle.count }})</span>
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
      </ul>
    </section>

    <section v-if="hasProof" class="ox-group">
      <h3 class="ox-g">{{ ui.groupProof }}</h3>
      <ul class="ox-row">
        <li v-if="graph.address || graph.handle" class="ox-item">
          <span class="ox-k">{{ ui.hexbitDoor }}</span>
          <Handle v-if="graph.address" :uuid="graph.address" />
          <VPButton
            v-if="graph.door"
            theme="alt"
            size="medium"
            :href="graph.door"
            :text="graph.handle"
          />
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
      </ul>
    </section>

    <section v-if="hasAxioms" class="ox-group">
      <h3 class="ox-g">{{ ui.groupAxioms }}</h3>
      <ul class="ox-row">
        <li class="ox-item">
          <span class="ox-k">{{ ui.dependsOnLabel }}</span>
          <span v-if="graph.unbound" class="ox-muted">{{ ui.unboundLabel }} — {{ ui.unboundNote }}</span>
          <VPButton
            v-for="def in graph.dependsOn"
            :key="def"
            theme="brand"
            size="medium"
            :href="axiomHref(def)"
            :text="def"
          />
          <span v-if="!graph.unbound && !graph.dependsOn?.length" class="ox-muted">—</span>
        </li>

        <li v-if="graph.wingDefs?.length" class="ox-item ox-item-stack">
          <span class="ox-k">{{ ui.wingCatalog }}</span>
          <span class="ox-prior-row">
            <VPButton
              v-for="def in graph.wingDefs"
              :key="'w-' + def"
              :theme="graph.dependsOn?.includes(def) ? 'brand' : 'alt'"
              size="medium"
              :href="axiomHref(def)"
              :text="def"
            />
          </span>
          <span v-if="wingUnused.length" class="ox-muted">{{ unusedText }}</span>
        </li>

        <li class="ox-item">
          <span class="ox-k">{{ ui.gravityLabel }}</span>
          <span class="ox-muted">{{ gravityText }}</span>
          <VPButton theme="alt" size="medium" href="/axioms" :text="ui.axiomIndexBtn" />
          <VPButton theme="alt" size="medium" href="/theorems?binding=unbound" :text="ui.unboundIndexBtn" />
        </li>

        <li v-if="graph.neighbourCount != null" class="ox-item">
          <span class="ox-k">{{ ui.neighboursLabel }}</span>
          <span class="ox-muted">{{ neighboursText }}</span>
          <VPButton
            v-if="graph.principle"
            theme="alt"
            size="medium"
            :href="`/theorems?principle=${encodeURIComponent(graph.principle.name)}`"
            :text="graph.principle.name"
          />
        </li>
      </ul>
    </section>

    <section v-if="hasTen || hasChannel" class="ox-group">
      <h3 v-if="hasTen" class="ox-g">{{ ui.groupTenD }}</h3>
      <ul v-if="hasTen" class="ox-row">
        <li class="ox-item">
          <span class="ox-k">{{ ui.tenFreeLabel }}</span>
          <span class="ox-muted">{{ tenFreeText }}</span>
        </li>
        <li class="ox-item">
          <span class="ox-k">{{ ui.tenCompactLabel }}</span>
          <span class="ox-muted">{{ tenCompactText }}</span>
          <span v-if="graph.auraHsl" class="ox-muted">{{ graph.auraHsl }}</span>
        </li>
        <li v-if="stationTen != null" class="ox-item">
          <span class="ox-k">{{ ui.stationTenLabel }}</span>
          <span class="ox-muted">{{ stationTen }}</span>
        </li>
        <li class="ox-item">
          <VPButton theme="alt" size="medium" href="/quantum#uuid-channel" :text="ui.tenQuantumBtn" />
        </li>
      </ul>

      <h3 v-if="hasChannel" class="ox-g">{{ ui.groupChannel }}</h3>
      <ul v-if="hasChannel" class="ox-row">
        <li class="ox-item">
          <span class="ox-k">Handle</span>
          <Handle :handle="graph.channel.handle" />
        </li>
        <li class="ox-item">
          <span class="ox-k">{{ ui.trinityLabel }}</span>
          <span class="ox-muted"><code>{{ graph.channel.trinities.join(' · ') }}</code></span>
        </li>
        <li class="ox-item">
          <span class="ox-k">{{ ui.tailLabel }}</span>
          <span class="ox-muted"><code>{{ graph.channel.tail }}</code></span>
        </li>
        <li class="ox-item">
          <span class="ox-k">Torus</span>
          <span class="ox-muted">{{ graph.channel.torusHome ? 'home' : '—' }}</span>
        </li>
        <li class="ox-item">
          <span class="ox-muted">{{ ui.channelNote }}</span>
          <VPButton theme="alt" size="medium" href="/quantum#uuid-channel" text="uuid channel" />
        </li>
      </ul>
    </section>

    <section v-if="hasUse" class="ox-group">
      <h3 class="ox-g">Use · proof of work</h3>
      <ul class="ox-row">
        <li class="ox-item">
          <span class="ox-k">Drill</span>
          <span class="ox-muted">Recompute above — attempts fold to a receipt</span>
        </li>
        <li class="ox-item">
          <span class="ox-k">Shelf</span>
          <VPButton theme="brand" size="medium" :href="shelfHref" :text="useDemo.shelf.label" />
        </li>
        <li v-if="useDemo.alpineApps" class="ox-item">
          <span class="ox-k">Alpine</span>
          <VPButton theme="alt" size="medium"
            :href="(useDemo.catalogueSkill || useDemo.skill)
              ? `/catalogue?skill=${encodeURIComponent(useDemo.catalogueSkill || useDemo.skill)}`
              : `/catalogue?theorem=${encodeURIComponent(useDemo.key)}`"
            :text="`${useDemo.alpineApps} apps harmonised`" />
        </li>
        <li class="ox-item">
          <span class="ox-k">OS</span>
          <VPButton theme="alt" size="medium" href="/terminal" text="uuidnaOS terminal" />
          <VPButton theme="alt" size="medium" href="/catalogue" text="Alpine catalogue" />
        </li>
      </ul>
    </section>

    <section v-if="hasRelated" class="ox-group">
      <h3 class="ox-g">{{ ui.groupRelated }}</h3>
      <ul class="ox-row">
        <li v-if="keywords.length" class="ox-item">
          <span class="ox-k">{{ ui.keywords }}</span>
          <VPButton
            v-for="kw in keywords"
            :key="kw"
            theme="alt"
            size="medium"
            :href="topicHref(kw)"
            :text="kw"
          />
        </li>

        <li v-if="graph.monograph" class="ox-item">
          <span class="ox-k">{{ ui.monograph }}</span>
          <VPLink class="ox-link" :href="graph.monograph.link" no-icon>{{ graph.monograph.title || graph.monograph.key }}</VPLink>
        </li>

        <li v-if="relatedTheorems.length" class="ox-item">
          <span class="ox-k">{{ ui.relatedTheorems }}</span>
          <VPLink
            v-for="rt in relatedTheorems"
            :key="rt.key"
            class="ox-link"
            :href="rt.link"
            no-icon
          >{{ rt.key }}</VPLink>
          <span v-if="relatedTheoremCount > relatedTheorems.length" class="ox-muted">
            +{{ relatedTheoremCount - relatedTheorems.length }} {{ ui.moreTheorems }}
          </span>
        </li>

        <li v-if="relatedPubs.length" class="ox-item">
          <span class="ox-k">{{ ui.relatedPubs }}</span>
          <VPLink
            v-for="rp in relatedPubs"
            :key="rp.key"
            class="ox-link"
            :href="rp.link"
            no-icon
          >{{ rp.key }}</VPLink>
        </li>

        <li v-if="seals.length" class="ox-item">
          <span class="ox-k">{{ ui.seals }}</span>
          <VPLink
            v-for="s in seals"
            :key="s.key"
            class="ox-link"
            :href="s.link"
            no-icon
          >{{ s.key }}</VPLink>
        </li>

        <li v-if="priorArt" class="ox-item ox-item-stack">
          <span class="ox-k">{{ ui.priorArt }}<template v-if="priorArt.outcome"> · {{ priorArt.outcome }}</template></span>
          <span v-if="priorArt.claim" class="ox-prior">{{ priorArt.claim }}</span>
          <span v-if="priorArt.priors?.length" class="ox-prior-row">
            <VPButton
              v-for="(pr, i) in priorArt.priors"
              :key="i"
              theme="alt"
              size="medium"
              :href="pr.link"
              :text="pr.who"
            />
          </span>
        </li>

        <li v-if="graph.unlocks || graph.waves || graph.doctrine" class="ox-item">
          <span class="ox-k">{{ ui.unlocks }}</span>
          <VPButton v-if="graph.unlocks" theme="alt" size="medium" :href="graph.unlocks.link" :text="graph.unlocks.text" />
          <VPButton v-if="graph.waves" theme="alt" size="medium" :href="graph.waves.link" :text="graph.waves.text" />
          <VPButton v-if="graph.doctrine" theme="alt" size="medium" :href="graph.doctrine.link" :text="graph.doctrine.text" />
        </li>

        <li v-if="graph.objectKind === 'publication'" class="ox-item">
          <span class="ox-k">Index</span>
          <VPButton theme="alt" size="medium" href="/publications" text="All publications" />
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped>
.ox { margin: 0.5rem 0 2rem; }
.ox-h { margin: 0 0 0.35rem; font-size: 1.05rem; border: none; }
.ox-lede { margin: 0 0 0.85rem; font-size: 0.85rem; color: var(--vp-c-text-2); }
.ox-group { margin: 0 0 1.1rem; }
.ox-g {
  margin: 0 0 0.45rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  border: none;
  letter-spacing: 0.02em;
}
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
.ox-item-stack { flex-direction: column; align-items: flex-start; }
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
.ox-prior-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.ox-item :deep(.VPButton) {
  display: inline-flex;
  padding: 0 10px;
  line-height: 26px;
  font-size: 12px;
}
</style>
