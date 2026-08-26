<!-- SponsorCard — the aside's sponsorship slot, served from the ledger's own identity instead of rented to a network.

     WHAT SLOT THIS IS. VitePress reserves a place in the aside for `themeConfig.carbonAds` and renders it through
     `aside-ads-before`. This component occupies exactly that place, and the config option stays unset. The reasons are
     written where the link lives (SITE.sponsor, src/site/index.ts) and are two: the documented carbonAds example ships
     placeholder ids, so enabling it as-written requests a serve id that does not exist and renders an empty box that
     LOOKS configured — absence dressed as a clean result, built deliberately; and a third-party ad script decides what
     a reader sees on an authority no reader can audit, which a site arguing that every figure recomputes from a sealed
     ledger cannot coherently host. One link, no script, no fetch, no third party, nothing observed about the reader.

     NO CLAIM IS MADE HERE, which is why this carries no theorem citation and needs none. The card states that the work
     is free to read and recompute — true whether or not anyone pays — and offers a link. It reports no figure, so it
     has no honesty class to carry; inventing a proof-stamp for a donation button would be the overclaim this tree
     spends its gates catching, one surface further out.

     HANDLE AS NOTE: href = revolut.me/ceccec?note=<page handle door> — the page that referred the donor into Revolut
     (substitutes for HTTP Referer, which noreferrer withholds). -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { SITE, sponsorDepositUrl } from '../../../dist/site/index.js'

const { frontmatter } = useData()
const sponsor = SITE.sponsor

/** Real referrer for the deposit note = this page's stable handle door (or canonical). */
const depositHref = computed(() => {
  const fm = frontmatter.value || {}
  const door = (fm.handleUrl || fm.seoHandleUrl || '').toString().trim()
  if (door) {
    try { return sponsorDepositUrl(door) } catch { /* fall through */ }
  }
  const handle = (fm.handle || '').toString().trim()
  if (/^[0-9a-f]{8}$/i.test(handle)) {
    try { return sponsorDepositUrl(handle) } catch { /* fall through */ }
  }
  // last resort: bare sponsor URL (no note) — better than a broken href
  return sponsor.url
})
</script>

<template>
  <aside class="sponsor-card">
    <p class="sc-lede"><span class="sc-mark" aria-hidden="true">{{ SITE.mark }}</span> Sponsor the ledger</p>
    <p class="sc-msg">{{ sponsor.message }}</p>
    <!-- rel: noopener for window.opener; noreferrer because doctrine withholds HTTP Referer — note= carries identity -->
    <a class="sc-link" :href="depositHref" target="_blank" rel="noopener noreferrer external">
      {{ sponsor.handle }}
    </a>
  </aside>
</template>

<style scoped>
.sponsor-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.85rem 0.9rem;
  margin-bottom: 1.25rem;
  background: var(--vp-c-bg-soft);
  font-size: 0.8rem;
  line-height: 1.5;
}
.sc-lede {
  margin: 0 0 0.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.sc-mark { margin-right: 0.3rem; }
.sc-msg {
  margin: 0 0 0.6rem;
  color: var(--vp-c-text-2);
}
.sc-link {
  display: inline-block;
  font-weight: 600;
  /* NOT var(--seq-5), which is what this line first said, copied from Dimensions.vue. The ℤ/9 accent is
     hsl(120 66% 55%) = #41d841, and against the light theme's own background that is 1.75:1 where WCAG AA asks
     4.5:1 for text — measured with this theme's own contrastRatio, not estimated. It reads fine in dark and is
     nearly invisible in light, which is exactly the failure a dark-themed author never sees. The brand var is
     6.56:1 light and 7.95:1 dark, so it is the colour, not the fallback. The pair is now in realComponentChecks
     so the gate fails if this drifts back. */
  color: var(--vp-c-brand-1);
  text-decoration: none;
  word-break: break-all;
}
.sc-link:hover { text-decoration: underline; }
</style>
