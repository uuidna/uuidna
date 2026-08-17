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
} as const

/** The Payload shape uuidna emits into — standard collection names only, so a vanilla instance recognises it
 *  without configuration: a `pages` collection, nested-docs parent relations, and the drafts `_status` field. */
export const PAYLOAD = {
  collection: 'pages',
  statuses: { published: 'published', draft: 'draft' },
} as const

/** The canonical URL of a site path — one join, so no consumer invents its own. */
export const urlOf = (path: string): string => SITE.origin + (path.startsWith('/') ? path : '/' + path)
