<!-- ObjectPage — catch-all Layout. Every URL is a monograph: hex face when an address exists, stock H1 = handle.

     Hero = handle + hex face (tiles, Fu Xi board, aura). Locale chrome + Lean lead sit with the doc.
     Breadcrumbs: Layout #doc-before via ObjectBreadcrumbs. Nav next = this page's walkNext.
     Layout never imports the theorem census — that census is the /theorems monograph (and kin).
     Home (layout: home) uses stock VPHome + HeroAnimation in #home-hero-after; uuidnaOS serves the handle door. -->
<script setup>
import { computed, ref, watch, onMounted, defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import ObjectBreadcrumbs from './ObjectBreadcrumbs.vue'
import ObjectCrosslinks from './ObjectCrosslinks.vue'
import ReferrerNav from './ReferrerNav.vue'
import ReadAloud from './ReadAloud.vue'
import HexFace from './HexFace.vue'
import HeroAnimation from './HeroAnimation.vue'
import SiteFooter from './SiteFooter.vue'
import SponsorCard from './SponsorCard.vue'
import {
  OBJECT_LOCALE_RAYS,
  objectUi,
  primaryRayOf,
} from '../../../src/object-i18n.js'
import { encodeLocale, decodeLocale } from './readAloudLogic.ts'

const UrlAudit = defineAsyncComponent(() => import('./UrlAudit.vue'))

const { Layout } = DefaultTheme
const { frontmatter, params } = useData()

const LOCALE_KEY = 'uuidna-read-aloud-locale'
const localeTag = ref('en')

const isHome = computed(() => frontmatter.value?.layout === 'home')
const ui = computed(() => objectUi(localeTag.value))
/** Hex face only on composed object monographs — not axis listings or SEO-only addresses. */
const showHexFace = computed(() => {
  if (isHome.value) return false
  const kind = params.value?.kind
  if (kind === 'theorem' || kind === 'publication') return !!(params.value?.address || frontmatter.value?.address)
  return !!(params.value?.address)
})

function persistLocale(tag) {
  localeTag.value = tag
  try { localStorage.setItem(LOCALE_KEY, JSON.stringify(encodeLocale(tag))) } catch { /* private mode */ }
  if (typeof document !== 'undefined') document.documentElement.lang = primaryRayOf(tag)
}

function loadLocale() {
  try {
    const stored = decodeLocale(localStorage.getItem(LOCALE_KEY))
    if (stored?.tag) { localeTag.value = stored.tag; return }
  } catch { /* ignore */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'en'
  localeTag.value = nav
}

onMounted(loadLocale)

watch(localeTag, (t) => {
  if (typeof document !== 'undefined') document.documentElement.lang = primaryRayOf(t)
})
</script>

<template>
  <Layout>
    <template #not-found>
      <UrlAudit />
    </template>
    <template #nav-bar-content-after>
      <ReferrerNav />
    </template>
    <template #aside-ads-before>
      <SponsorCard />
    </template>
    <template #home-hero-after>
      <HeroAnimation :size="280" />
    </template>
    <template #doc-before>
      <!-- Stock VP Layout slot for breadcrumbs (vitepress.dev/guide/extending-default-theme). -->
      <ObjectBreadcrumbs v-if="!isHome" />
      <HexFace v-if="showHexFace" />
      <template v-if="!isHome">
        <div class="object-locale" role="group" :aria-label="ui.locale">
          <label class="object-locale-label">{{ ui.locale }}
            <select class="object-locale-select" :value="localeTag" @change="persistLocale(($event.target).value)">
              <option v-for="ray in OBJECT_LOCALE_RAYS" :key="ray" :value="ray">{{ ray }}</option>
            </select>
          </label>
        </div>
        <ReadAloud />
      </template>
      <template v-else>
        <ReadAloud />
      </template>
    </template>
    <template #doc-after>
      <div v-if="!isHome" class="object-proof">
        <ObjectCrosslinks :locale-tag="localeTag" />
      </div>
    </template>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </Layout>
</template>

<style scoped>
.object-locale { margin: 0 0 0.85rem; max-width: 52rem; }
.object-locale-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.object-locale-select {
  font: inherit;
  font-size: 0.8rem;
  padding: 0.15rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.object-proof {
  margin-top: 2.25rem;
  padding-top: 0.25rem;
}
</style>
