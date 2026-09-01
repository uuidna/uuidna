// site — ONE CONFIG, TWO CONSUMERS. VitePress renders the pages and Payload receives them, and each was carrying
// its own copy of the same facts: the name, the description, the origin, and the collection those pages land in.
// Two copies of one identity drift the moment either is edited alone, and the copy that drifts is discovered by a
// reader rather than by a gate — the same shape as a workflow re-implementing a folded question.
//
// So the identity is declared once, here, and both sides import it: docs/.vitepress/config.ts builds the site from
// it, and scripts/payload-sync emits its docs into the collection it names. A change lands in one place or not at all.
//
// SINGULAR IS A MODEL: this folder is one concept — the site's identity — so it carries index faces only.
// shared configuration, not content. What the pages SAY is computed from the sealed ledger elsewhere;
// this only fixes who they belong to and where they go.

/** The site's identity — the one place its name, voice and origin are written. */
export const SITE = {
  name: 'uuidna',
  description:
    'Lean 4 theorem ledger — content-addressed identity, honest by construction. Two coins conserved; cite by DOI-class handle.',
  origin: 'https://uuidna.com',
  mark: '',                                    // no emoji chrome in nav/sidebar; coin lives in /captain prose
  tagline: 'Content-addressed identity, honest by construction',
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
  //
  // HANDLE AS NOTE: every captain-coins deposit carries ?note=<referrer> where referrer is the page that sent the
  // donor into Revolut — the page's DOI-class handle door URL (noreferrer strips HTTP Referer; note substitutes).
  // Use sponsorDepositUrl(referrer); never the bare url alone on object surfaces.
  sponsor: {
    url: 'https://revolut.me/ceccec',
    handle: 'revolut.me/ceccec',
    // stated without pressure, because the sentence is true either way and the work does not become less free if
    // nobody pays: a page that manufactures obligation would be making a claim the ledger cannot seal
    message: 'Free to read, free to recompute, and proven either way. If it was worth something to you, send a coin.',
  },
} as const

/**
 * Captain-coins deposit URL: https://revolut.me/ceccec?note=${encodeURIComponent(realReferrer)}
 *
 * `realReferrer` = the page that referred the donor into Revolut — preferably the page's stable handle door
 * (`https://uuidna.com/<8-hex>`), or any absolute page URL / canonical. An 8-hex handle alone is expanded to its door.
 * Example: sponsorDepositUrl('https://uuidna.com/808f7b27')
 *   → https://revolut.me/ceccec?note=https%3A%2F%2Fuuidna.com%2F808f7b27
 */
export function sponsorDepositUrl(referrer: string): string {
  const raw = referrer.trim()
  if (!raw) throw new Error('sponsorDepositUrl: referrer is empty')
  let note = raw
  if (/^[0-9a-f]{8}$/i.test(raw)) note = `${SITE.origin}/${raw.toLowerCase()}`
  else if (/^https:\/\/uuidna\.com\/[0-9a-f]{8}$/i.test(raw)) note = raw.toLowerCase()
  else if (raw.startsWith('/')) note = SITE.origin + (raw === '/' ? '/' : raw)
  return `${SITE.sponsor.url}?note=${encodeURIComponent(note)}`
}

/** The Payload shape uuidna emits into — standard collection names only, so a vanilla instance recognises it
 *  without configuration: a `pages` collection, nested-docs parent relations, and the drafts `_status` field. */
export const PAYLOAD = {
  collection: 'pages',
  statuses: { published: 'published', draft: 'draft' },
} as const

/** The canonical URL of a site path — one join, so no consumer invents its own. */
export const urlOf = (path: string): string => SITE.origin + (path.startsWith('/') ? path : '/' + path)

/** Absolute OG/social image — docs/public/og.png (1200×630). */
export const OG_IMAGE = `${SITE.origin}/og.png` as const
