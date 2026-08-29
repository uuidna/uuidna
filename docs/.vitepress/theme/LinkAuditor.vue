<!-- LinkAuditor — unused on Layout (must stay unused: importing ledger.data here must not reach ObjectPage).
     If remounted, give it THIS page's sealed key set from params, never the global census. -->
<script setup>
import { onMounted, watch, nextTick, ref } from 'vue'
import { useRoute } from 'vitepress'
import { data } from '../ledger.data'

// The sealed ledger, from the referrer's perspective — key → content-address. Baked at build, nothing fetched.
const SEALED = new Map(data.theorems.map((t) => [t.key, t.address]))
const route = useRoute()
const summary = ref(null)

const audit = () => {
  if (typeof document === 'undefined') return
  const doc = document.querySelector('.vp-doc')
  if (!doc) { summary.value = null; return }
  let verified = 0, unverified = 0, offLedger = 0
  doc.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') || ''
    const m = href.match(/\/theorem\/([a-z0-9_]+)(?:[#?]|$)/i)
    if (m && SEALED.has(m[1])) {
      a.dataset.audit = 'verified'
      a.setAttribute('title', `VERIFIED from here — sealed theorem, a leaf of the ledger fold · ${SEALED.get(m[1])}`)
      verified++
    } else if (m) {
      a.dataset.audit = 'unverified'
      a.setAttribute('title', `UNVERIFIED from here — /theorem/${m[1]} is not a sealed theorem in the ledger`)
      unverified++
    } else if (/^https?:/i.test(href)) {
      a.dataset.audit = 'offledger'
      a.setAttribute('title', 'off the ledger — an external destination this page cannot verify')
      offLedger++
    }
    // internal section links (/, /theorems, …) are navigation, not theorem claims — left unmarked.
  })
  summary.value = (verified + unverified + offLedger) > 0 ? { verified, unverified, offLedger } : null
}

onMounted(() => nextTick(audit))
watch(() => route.path, () => nextTick(audit))
</script>

<template>
  <div v-if="summary" class="link-auditor" :title="'Every link on this page audited automatically from here (the referrer), against the sealed ledger — nothing fetched.'">
    <span class="la-dot la-v">✓</span> {{ summary.verified }} verified
    <template v-if="summary.unverified"> · <span class="la-dot la-u">?</span> {{ summary.unverified }} unverified</template>
    <template v-if="summary.offLedger"> · <span class="la-dot la-o">↗</span> {{ summary.offLedger }} off-ledger</template>
  </div>
</template>

<style>
/* The per-link marks — subtle, positive-only clutter: a small superscript on links whose destination IS a sealed
   theorem (reassurance, not noise); off-ledger and unverified carry only the native tooltip, no visual mark. */
.vp-doc a[data-audit='verified']::after { content: '✓'; color: var(--vp-c-green-1); font-size: .62em; vertical-align: super; margin-left: 1px; opacity: .55; }
.vp-doc a[data-audit='verified']:hover::after { opacity: 1; }
.vp-doc a[data-audit='unverified'] { text-decoration-style: dotted; text-decoration-color: var(--vp-c-yellow-1); }

/* The summary chip — the automation made visible without touching the content: a fixed, unobtrusive corner readout. */
.link-auditor {
  position: fixed; right: 12px; bottom: 12px; z-index: 20;
  font-size: .72rem; line-height: 1; padding: .4rem .6rem; border-radius: 999px;
  background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2);
  box-shadow: 0 1px 4px rgba(0,0,0,.12); user-select: none; opacity: .82;
}
.link-auditor:hover { opacity: 1; }
.la-dot { font-weight: 700; }
.la-v { color: var(--vp-c-green-1); }
.la-u { color: var(--vp-c-yellow-1); }
.la-o { opacity: .6; }
@media (max-width: 640px) { .link-auditor { right: 8px; bottom: 8px; font-size: .68rem; } }
</style>
