// site — ONE CONFIG, TWO CONSUMERS. VitePress renders the pages and Payload receives them, and each was carrying
// its own copy of the same facts: the name, the description, the origin, and the collection those pages land in.
// Two copies of one identity drift the moment either is edited alone, and the copy that drifts is discovered by a
// reader rather than by a gate — the same shape as a workflow re-implementing a folded question.
//
// So the identity is declared once, here, and both sides import it: docs/.vitepress/config.ts builds the site from
// it, and scripts/payload-sync emits its docs into the collection it names. A change lands in one place or not at all.
//
// SINGULAR IS A MODEL: this folder is one concept — the site's identity — so it carries index faces only.
// HONEST SCOPE: shared configuration, not content. What the pages SAY is computed from the sealed ledger elsewhere;
// this only fixes who they belong to and where they go.

/** The site's identity — the one place its name, voice and origin are written. */
export const SITE = {
  name: 'uuidna',
  description: 'Mathematics replaces money. Proof replaces authority. Theorems replace corruption.',
  origin: 'https://uuidna.com',
  mark: '🪙',                                   // the coin, worn by the site title and the footer
  tagline: 'A mathematically-proven economic system',
  repo: 'https://github.com/uuidna/uuidna',
  // THE SPONSORSHIP, in the one place the site's identity lives — the rule this file's own header states, applied to
  // a link that was already breaking it: SiteFooter.vue hard-typed this same URL under "The captain", and a literal
  // standing in a second surface is precisely the drift declared-once exists to end. Both surfaces now read this.
  //
  // WHY NOT themeConfig.carbonAds, which is the slot this serves and is three lines to enable. Two reasons that are
  // the same reason twice. FIRST, the values in its documented example are placeholders ('your-carbon-code'), and
  // shipping them requests cdn.carbonads.com with a serve id that does not exist: the aside renders an empty box
  // that LOOKS configured and serves nothing — the absence-rendered-as-a-clean-result this tree keeps catching, this
  // time built on purpose. SECOND, and the one that would still stand with real credentials: Carbon is a third-party
  // script that fetches at read time and decides what a reader sees on an authority no reader can audit. A site whose
  // entire argument is that every figure recomputes from a sealed ledger cannot rent its aside to a network nobody
  // can recompute. Served from here instead — one link, no script, no fetch, no third party.
  sponsor: {
    url: 'https://revolut.me/ceccec',
    handle: 'revolut.me/ceccec',
    // stated without pressure, because the sentence is true either way and the work does not become less free if
    // nobody pays: a page that manufactures obligation would be making a claim the ledger cannot seal
    message: 'Free to read, free to recompute, and proven either way. If it was worth something to you, send a coin.',
  },
} as const

/** The Payload shape uuidna emits into — standard collection names only, so a vanilla instance recognises it
 *  without configuration: a `pages` collection, nested-docs parent relations, and the drafts `_status` field. */
export const PAYLOAD = {
  collection: 'pages',
  statuses: { published: 'published', draft: 'draft' },
} as const

/** The canonical URL of a site path — one join, so no consumer invents its own. */
export const urlOf = (path: string): string => SITE.origin + (path.startsWith('/') ? path : '/' + path)
