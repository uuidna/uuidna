<!-- ObjectPage — catch-all Layout for object pages (theorem · publication · handle · guide).

     Hero = H1 + abstract + locale (object pages only). Body = markdown + ObjectCrosslinks.
     Home (layout: home) uses DefaultTheme home composition; QA lives in markdown on home/README only. -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { computed, ref, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import ObjectCrosslinks from './ObjectCrosslinks.vue'
import ReferrerNav from './ReferrerNav.vue'
import ReadAloud from './ReadAloud.vue'
import SiteFooter from './SiteFooter.vue'
import SponsorCard from './SponsorCard.vue'
import Dimensions from './Dimensions.vue'
import UrlAudit from './UrlAudit.vue'
import {
  OBJECT_LOCALE_RAYS,
  translateObjectText,
  objectUi,
  primaryRayOf,
} from '../../../dist/object-i18n.js'
import { SITE, sponsorDepositUrl } from '../../../dist/site/index.js'
import { encodeLocale, decodeLocale } from './readAloudLogic.ts'

const { Layout } = DefaultTheme
const { frontmatter, params, title } = useData()

const LOCALE_KEY = 'uuidna-read-aloud-locale'
const localeTag = ref('en')

const isHome = computed(() => frontmatter.value?.layout === 'home')

const sourceH1 = computed(() => {
  const fm = frontmatter.value || {}
  const p = params.value || {}
  const raw = (fm.heroTitle || fm.title || p.name || title.value || '').toString()
  const head = raw.split('—')[0].trim() || raw
  return head.length <= 120 ? head : head.slice(0, 117) + '…'
})

const sourceAbstract = computed(() => {
  const fm = frontmatter.value || {}
  const p = params.value || {}
  return (fm.abstract || p.statement || p.abstract || fm.description || '').toString()
})

const ui = computed(() => objectUi(localeTag.value))
const h1Tr = computed(() => translateObjectText(sourceH1.value, localeTag.value))
const absTr = computed(() => translateObjectText(sourceAbstract.value, localeTag.value))

/** Captain-coins deposit: note = this page's handle door (the page that referred the donor into Revolut). */
const depositHref = computed(() => {
  const fm = frontmatter.value || {}
  const door = (fm.handleUrl || fm.seoHandleUrl || fm.depositReferrer || '').toString().trim()
  if (door) {
    try { return sponsorDepositUrl(door) } catch { /* fall through */ }
  }
  const handle = (fm.handle || '').toString().trim()
  if (/^[0-9a-f]{8}$/i.test(handle)) {
    try { return sponsorDepositUrl(handle) } catch { /* fall through */ }
  }
  return SITE.sponsor.url
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
    <template #doc-before>
      <template v-if="!isHome">
        <header class="object-hero" aria-labelledby="object-h1">
          <div class="object-locale" role="group" :aria-label="ui.locale">
            <label class="object-locale-label">{{ ui.locale }}
              <select class="object-locale-select" :value="localeTag" @change="persistLocale(($event.target).value)">
                <option v-for="ray in OBJECT_LOCALE_RAYS" :key="ray" :value="ray">{{ ray }}</option>
              </select>
            </label>
          </div>
          <h1 id="object-h1" class="object-h1">{{ h1Tr.text }}</h1>
          <p v-if="absTr.text" class="object-abstract">{{ absTr.text }}</p>
          <p v-if="h1Tr.kind === 'hexbit-reading' || absTr.kind === 'hexbit-reading'" class="object-reading-note">
            {{ ui.readingNote }} · <code>{{ absTr.handle || h1Tr.handle }}</code>
          </p>
          <p class="object-deposit">
            <a class="object-deposit-btn" :href="depositHref" target="_blank" rel="noopener noreferrer external">
              {{ SITE.mark }} Captain coins · {{ SITE.sponsor.handle }}
            </a>
          </p>
        </header>
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
      <Dimensions />
    </template>
  </Layout>
</template>

<style scoped>
.object-hero {
  margin: 0 0 1.5rem;
  padding: clamp(1.5rem, 4vw, 2.75rem) 0 1.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  max-width: 52rem;
}
.object-locale { margin: 0 0 0.85rem; }
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
.object-h1 {
  margin: 0 0 0.9rem;
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.12;
  letter-spacing: -0.025em;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
  background: none;
}
.object-abstract {
  margin: 0;
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  line-height: 1.45;
  color: var(--vp-c-text-2);
  max-width: 38rem;
  font-weight: 400;
}
.object-reading-note {
  margin: 0.65rem 0 0;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  max-width: 38rem;
}
.object-deposit { margin: 1rem 0 0; }
.object-deposit-btn {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
}
.object-deposit-btn:hover { text-decoration: underline; }
.object-proof {
  margin-top: 2.25rem;
  padding-top: 0.25rem;
}
</style>

<style>
.VPDoc:has(.object-hero) .vp-doc > h1:first-of-type { display: none !important; }
</style>
