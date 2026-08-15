<!-- Global site footer — categorised useful links on every page (the default-theme footer only shows a flat message
     on no-sidebar pages). Mounted via the layout-bottom slot. Self-contained, responsive, themed with VitePress vars. -->
<script setup>
import { withBase } from 'vitepress'
import { toUuid } from '../../../dist/index.js'
// Internal links go through VitePress's withBase so the site base (and any locale prefix) is applied — no
// hand-built absolute paths that break under a base or a locale. External links (http…) pass through unchanged.
const href = (h) => (h.startsWith('/') ? withBase(h) : h)
const GH = 'https://github.com/uuidna/uuidna'
// The licence, shown as its content-address on every page — COMPUTED, not hardcoded: toUuid of the canonical licence
// line, so a licence change re-mints the receipt automatically (no pasted literal to go stale). See /license.
const LICENSE_LINE = 'CC BY-NC-ND 4.0 — free to read and redistribute with attribution, non-commercially, and without modification. Canonical at uuidna.com/license.'
const licenseUuid = toUuid(LICENSE_LINE)
const cols = [
  { title: 'The ledger', links: [
    { text: 'All theorems', href: '/theorems' },
    { text: 'Topics (by skill)', href: '/topics' },
    { text: 'Search', href: '/search' },
    { text: 'The trials', href: '/trials' },
    { text: 'Games', href: '/games' },
  ] },
  { title: 'Fuse it in', links: [
    { text: 'The school', href: '/school' },
    { text: 'MCP tools', href: '/mcp' },
    { text: 'Chat', href: '/chat' },
    { text: 'Books', href: '/books' },
    { text: 'Guides', href: '/guides' },
    { text: 'npm · @uuidna/uuidna', href: 'https://www.npmjs.com/package/@uuidna/uuidna' },
    { text: 'GitHub repository', href: GH },
  ] },
  { title: 'The captain', links: [
    { text: "The captain's coins", href: '/captain' },
    { text: 'The doctrine', href: '/doctrine' },
    { text: 'Donate · revolut.me/ceccec', href: 'https://revolut.me/ceccec' },
  ] },
  { title: 'Verify it yourself', links: [
    { text: 'The tests', href: '/tests' },
    { text: 'Deploy', href: '/deploy' },
    { text: 'Lean proofs · lean/', href: GH + '/tree/main/lean' },
    { text: 'PRINCIPLE.md', href: GH + '/blob/main/lean/PRINCIPLE.md' },
    { text: 'npm run lean (recompute)', href: GH + '#verify' },
  ] },
]
</script>

<template>
  <footer class="site-footer">
    <div class="sf-cols">
      <section v-for="c in cols" :key="c.title" class="sf-col">
        <h3>{{ c.title }}</h3>
        <ul>
          <li v-for="l in c.links" :key="l.text"><a :href="href(l.href)">{{ l.text }}</a></li>
        </ul>
      </section>
    </div>
    <div class="sf-base">
      <span><a :href="href('/license')">License <strong>CC BY-NC-ND 4.0</strong></a> · <a :href="href('/privacy')">Privacy</a> · <a :href="href('/justice')">Justice</a> · <code class="sf-uuid">{{ licenseUuid }}</code> — Tsvetan Rouschev.</span>
      <span>A theorem computes in Lean, or it is not a theorem. <em>Integrity, not truth.</em></span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { border-top: 1px solid var(--vp-c-divider); padding: 2.5rem 1.5rem 2rem; margin-top: 2rem; }
.sf-cols { max-width: 1120px; margin: 0 auto; display: grid; gap: 1.5rem 2rem; grid-template-columns: repeat(4, 1fr); }
.sf-col h3 { font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: var(--vp-c-text-2); margin: 0 0 .6rem; }
.sf-col ul { list-style: none; margin: 0; padding: 0; }
.sf-col li { margin: .3rem 0; }
.sf-col a { font-size: .9rem; color: var(--vp-c-text-1); text-decoration: none; }
.sf-col a:hover { color: var(--vp-c-brand-1); text-decoration: underline; }
.sf-base { max-width: 1120px; margin: 1.8rem auto 0; padding-top: 1.2rem; border-top: 1px solid var(--vp-c-divider); display: flex; flex-wrap: wrap; gap: .4rem 1.5rem; justify-content: space-between; font-size: .82rem; color: var(--vp-c-text-2); }
@media (max-width: 720px) { .sf-cols { grid-template-columns: repeat(2, 1fr); } }
</style>
