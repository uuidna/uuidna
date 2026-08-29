<!-- ReferrerNav — the nav bar's own contextual link, computed from THIS page's walkNext (frontmatter).

     BASELINE — frontmatter.walkNext: the SAME wrapping walk scripts/next.ts's Arm 4 recomputes and checks
     has ZERO gaps. Baked per URL at SSG so Layout never imports the census. "Next is always known"
     because the walk is proven total ([every_referrer_reaches_every_page]), not because a fallback
     link was added. Invert of next is prev ([prev_undoes_next]); rotation reflect is already the
     involution on the ledger. No principle-sibling override — neighbours that remain are hex/algebra.
-->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

const { frontmatter } = useData()
const route = useRoute()
const suggestion = ref(null)

const compute = () => {
  const fm = frontmatter.value || {}
  const walk = fm.walkNext
  suggestion.value = walk && walk.link
    ? { link: walk.link, name: walk.text || String(walk.link).replace(/^\//, '') }
    : null
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
    :aria-label="'Next: ' + suggestion.name"
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
