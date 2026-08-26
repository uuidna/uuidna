<!-- ReferrerNav — the nav bar's own contextual link, computed from the ledger and CURRENT POSITION + REFERRER
     together. Two layers, one always available:

     BASELINE — data.next[currentRoute] (ledger.data.ts, site.ts's canonicalOrder+nextOf): the SAME wrapping walk
     scripts/next.ts's Arm 4 recomputes and checks has ZERO gaps over all 1557+ pages. A route on this site always
     has a next, by that proof — so this baseline is available for EVERY page, fresh entry included, with no
     referrer needed at all. "Next is always known" because the walk is proven total, not because a fallback
     link was added.

     OVERRIDE — when the referrer (tracked client-side in sessionStorage; a static site has no server Referer
     header, so RefererCompass established this pattern first) was a theorem, and its principle has another
     member, THAT sibling replaces the baseline: a link a function of the actual path walked, not just position.
     Deterministic (folds the previous key to pick the sibling — same path, same suggestion, always recomputable).

     Lives in the nav-bar-content-after slot — genuinely part of the nav, not a page-bottom note. -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { data } from '../ledger.data'

const { params } = useData()
const route = useRoute()
const suggestion = ref(null)

// principle → its theorems, from the SAME ledger.data.groups every other component reads — no separate walk.
const groupOf = new Map(data.groups.map((g) => [g.name, g.theorems]))
const byKey = new Map(data.theorems.map((t) => [t.key, t]))

const STORAGE_KEY = 'uuidna:nav-ref'

// the current route as canonicalOrder names it — /theorem/<key> and /publications/<slug> for dynamic routes
// (matching data.next's own keys, built from the same PageNode.route shape), route.path otherwise.
const currentRoute = (cur) => cur.key ? `/theorem/${cur.key}` : cur.slug ? `/publications/${cur.slug}` : route.path.replace(/\/$/, '') || '/'

const compute = () => {
  const cur = params.value || {}
  let prev = null
  try { prev = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null') } catch { /* private mode / SSR */ }

  // BASELINE — always available: the proven-total wrapping walk's next for wherever we are right now.
  const here = currentRoute(cur)
  const baselineRoute = data.next[here]
  suggestion.value = baselineRoute ? { link: baselineRoute, name: baselineRoute.replace(/^\//, ''), context: null } : null

  // OVERRIDE — a sharper suggestion when the path walked makes one recomputable (previous page was a theorem).
  if (prev && prev.key && prev.key !== cur.key) {
    const prevTheorem = byKey.get(prev.key)
    const siblings = prevTheorem ? (groupOf.get(prevTheorem.principle) || []).filter((t) => t.key !== prev.key) : []
    if (siblings.length > 0) {
      const idx = [...prev.key].reduce((s, c) => s + c.charCodeAt(0), 0) % siblings.length
      const next = siblings[idx]
      suggestion.value = { link: `/theorem/${next.key}`, name: next.name, context: prevTheorem.principle }
    }
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ key: cur.key || null }))
  } catch { /* private mode / SSR — the next page simply gets no referrer override, still gets the baseline */ }
}

onMounted(compute)
watch(() => route.path, compute)
</script>

<template>
  <!-- LINK LAW: nav slot · VitePress VPLink (normalizeLink), not a hand-rolled <a> -->
  <VPLink
    v-if="suggestion"
    class="referrer-nav-link"
    :href="suggestion.link"
    no-icon
    :aria-label="(suggestion.context ? `Continue in ${suggestion.context}: ` : 'Next: ') + suggestion.name"
  >
    <span aria-hidden="true">↳</span> {{ suggestion.name }}
  </VPLink>
</template>

<style scoped>
.referrer-nav-link {
  display: inline-flex; align-items: center; font-size: .78rem; line-height: 1;
  padding: 0 .1rem; margin-left: .5rem; color: var(--vp-c-text-2); text-decoration: none;
  max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.referrer-nav-link:hover { color: var(--vp-c-brand-1); }
@media (max-width: 960px) { .referrer-nav-link { display: none; } }
</style>
