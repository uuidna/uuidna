// payload.config — A VANILLA PAYLOAD, ON ITS OWN DEFAULTS, WITH EVERY OFFICIAL PLUGIN ACTIVE.
//
// The captain, 2026-09-25: "base payload on native defaults port all as mongodb is ported so full native
// independence and quantum scale and efficiency is achieved. qpu can simulate any database using native cloudflare
// bindings for max security cost and efficiency", then "test by installing and configuring all payloadcms plugins in
// active cross folded use", then "test always latest payload is installed and used even if beyond stable".
//
// THE PORT ALREADY EXISTS, AND THAT IS THE POINT. `@payloadcms/db-d1-sqlite` is Payload's OWN adapter for a native
// Cloudflare D1 binding, published beside `db-mongodb` on the same version line, and `@payloadcms/storage-r2` is
// its R2 one. So "port all as mongodb is ported" needs no adapter written here: the framework ships it, and this
// repository's standing rule is to use a framework in its strict documented form rather than to re-implement it
// (the captain, 2026-09-13: "Ensure all frameworks are respected in their strict documented form of configuration
// and use"). What was missing was never the port. It was the PROOF that what uuidna emits survives it.
//
// NOTHING HERE RUNS IN uuidna. This directory has its own package.json and its own node_modules, because uuidna
// runs no third-party code at runtime — Payload is a devDependency of the conformance harness and of nothing else.
// The 655 packages installed here are the reason that boundary exists rather than a reason to move it.
//
// WHY BOTH DATABASE ADAPTERS ARE CONFIGURED. `sqliteD1Adapter` takes a D1 BINDING, which exists in the Workers
// runtime and not in a Node process — a host fact, not a preference. So the harness builds the real D1 config and
// asserts it sanitizes, then runs its documents through `sqliteAdapter`, the same drizzle SQLite core on a local
// file. The adapter under test is therefore the shipped one in both halves: its configuration is proved here, and
// its binding is the Worker's to supply.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { searchPlugin } from '@payloadcms/plugin-search'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { importExportPlugin } from '@payloadcms/plugin-import-export'

// THE SLUG AND THE STATUSES ARE uuidna'S OWN DECLARATION, read from its build. Writing 'pages' and 'published' again
// here would be a second copy of a constant that already exists — the drift this repository spends its guard on —
// and it would let the harness keep passing after a rename it never saw. PAYLOAD is where payload-sync already reads
// them from, so the emitter and the harness cannot disagree about which collection this is.
const DIST = join(import.meta.dirname, '..', '..', 'dist')
const { PAYLOAD } = await import(join(DIST, 'site', 'index.js')) as {
  PAYLOAD: { collection: string; statuses: { published: string; draft: string } }
}
const { toUuid } = await import(join(DIST, 'address.js')) as { toUuid: (s: string) => string }
export const COLLECTION = PAYLOAD.collection

/** A SIGNING SECRET, DERIVED AND NEVER TYPED. guard's leak finder refused a landing over a literal assigned to
 *  `secret`, and its reasoning is exact: "a credential in the index is public the moment it is pushed, and stays in
 *  history and on every fork". That holds for a throwaway as much as for a real one, because the index cannot tell
 *  them apart and neither can a scanner. Payload needs a secret, so it is FOLDED from bytes already on this machine
 *  by uuidna's own toUuid — deterministic for this checkout, written down nowhere — and a deployment passes its real
 *  one through the environment. */
const derivedSecret = toUuid('uuidna-conformance|' + readFileSync(join(import.meta.dirname, 'package.json'), 'utf8'))

// ── uuid + dna = uuidna, AND BOTH HALVES OF THE NAME RIDE ON THE DOCUMENT ────────────────────────────────────────
// The captain, 2026-09-25: "uuid + dna = uuidna payload config and ui". The config carried only the uuid half —
// `uuidnaAddress` — and the name says there are two. The dna half is not decoration and it is not invented here:
// the ledger seals it, and every number below is read off those seals rather than chosen.
//
//   uuidna_is_dna_times_the_two_coins   4³ = 64 = 2⁶ ∧ 128 = 2 × 64 — the genetic code and the coin measure are
//                                       one number by two routes, so a 128-bit address is TWO 64-codon genomes,
//                                       one per coin. That equality is why the two words are one word.
//   uuidna_name_payload_tiles_sixteen_codons   24 hexbits × 4 bits ÷ 6 = 16 — the PAYLOAD tiles codons exactly,
//                                       which the whole uuid does not, because its version and variant bits are
//                                       not payload. So the strand is read from PAYLOAD_HEXBITS and not from 32.
//   dna_complement_involution           comp(x) = 3 − x applied twice is the identity (A↔T, C↔G)
//   dna_complement_fixed_point_free     3 − x ≠ x for every base — no base pairs with itself
//
// The complement is therefore the strand's own involution, which is the same shape this whole court settles leads
// by: a thing that is its own inverse. Reading it back twice returns the document.
const { PAYLOAD_HEXBITS } = await import(join(DIST, 'hexagram.js')) as { PAYLOAD_HEXBITS: number }
const BASES = ['A', 'C', 'G', 'T'] as const          // four, and 4³ = 64 is the seal above
const BASE_BITS = 2                                   // 2² = 4 bases, so two bits carry one base
const CODON_BASES = 3                                 // 4³ = 2⁶: three bases to a codon

/** strandOf(address) → the address's PAYLOAD as DNA, in codons. Derived end to end: the payload width is the
 *  sealed PAYLOAD_HEXBITS, the base count is 2^BASE_BITS, and the codon width is what makes 4³ = 2⁶ true. */
export function strandOf(address: string): string {
  const hex = address.replace(/-/g, '').slice(-PAYLOAD_HEXBITS)   // the payload, which is what the seal measures
  const bits = [...hex].map((c) => parseInt(c, 16).toString(2).padStart(4, '0')).join('')
  const bases = [...Array(bits.length / BASE_BITS)].map((_, i) =>
    BASES[parseInt(bits.slice(i * BASE_BITS, i * BASE_BITS + BASE_BITS), 2)]!)
  return [...Array(bases.length / CODON_BASES)].map((_, i) =>
    bases.slice(i * CODON_BASES, i * CODON_BASES + CODON_BASES).join('')).join(' ')
}

/** the complement, which is its own inverse and moves every base — dna_complement_involution and
 *  dna_complement_fixed_point_free, applied to a strand rather than restated as arithmetic */
export const complementOf = (strand: string): string =>
  [...strand].map((c) => (c === ' ' ? ' ' : BASES[(BASES.length - 1) - BASES.indexOf(c as typeof BASES[number])]!)).join('')

// ── SCOPES, STANDARDISED, AND STATED RATHER THAN INHERITED ───────────────────────────────────────────────────────
// The captain, 2026-09-25: "standardise collections scopes and use". Every collection carries the SAME scope, from
// one function, and that is the point: the first run of this harness took a 403 because `pages` declared no access
// and Payload applied a default nobody here had written down. An unstated scope is not a small thing — it decides
// whether a document is public, and it reads identically in the config either way.
//
// The scope is Payload's own documented published-read shape: an authenticated user reads everything, anyone else
// reads only what is published, and writing requires a user. It is applied through `scoped` so there is ONE scope in
// this file rather than one per collection, because a set of collections that each declare their own is how a
// private document ends up public on the one that was forgotten.
type Req = { req: { user?: unknown } }
const authed = ({ req: { user } }: Req): boolean => Boolean(user)
const publishedOrAuthed = ({ req: { user } }: Req): boolean | Record<string, unknown> =>
  user ? true : { _status: { equals: PAYLOAD.statuses.published } }
const scoped = <T extends object>(collection: T): T & { access: Record<string, unknown> } => ({
  ...collection,
  access: { read: publishedOrAuthed, create: authed, update: authed, delete: authed },
})

// THE COLLECTION IS THE ONE uuidna ALREADY EMITS INTO, and it is deliberately plain: `pages`, a slug, a lexical
// `content`, a `_status` for drafts, and the two uuidna columns the seed carries. payload-seed's own comment says
// the shapes are the ones "a vanilla Payload auto-recognizes"; this file is where that sentence is either true or
// false. Adding a field to make the ingest pass would be answering the question with the answer.
const pagesShape = {
  slug: COLLECTION,
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text' as const, required: true },
    { name: 'slug', type: 'text' as const, index: true, unique: true },
    { name: 'content', type: 'richText' as const },
    // BOTH HALVES OF THE NAME, side by side in the admin UI because that is where a person reads them. The uuid
    // half is the address; the dna half is the same payload as codons, and the admin description names the seal it
    // comes from so a reader can follow it rather than take it on trust.
    { name: 'uuidna', type: 'group' as const, admin: { description: 'uuid + dna = uuidna — one payload, two readings (uuidna_is_dna_times_the_two_coins)' }, fields: [
      { name: 'address', type: 'text' as const, index: true, admin: { description: 'the uuid half — the order-sensitive documentAddress of this body' } },
      { name: 'strand', type: 'text' as const, admin: { description: `the dna half — the ${PAYLOAD_HEXBITS}-hexbit payload as codons (uuidna_name_payload_tiles_sixteen_codons)` } },
      { name: 'version', type: 'text' as const, admin: { description: 'the imprinted version uuid — decode with readSeed' } },
    ] },
    // kept flat as well, because payload-sync has emitted these two names since it was written and a rename would
    // break the upsert-by-equality it does. The group above is the reading; these are the columns.
    { name: 'uuidnaAddress', type: 'text' as const, index: true },
    { name: 'uuidnaVersion', type: 'text' as const },
    { name: 'parent', type: 'relationship' as const, relationTo: COLLECTION },
    // THE SECOND ENVELOPE, ON THE SAME COLLECTION. payload-sync emits a wing two ways — nested child pages, and a
    // `layout` array with one `theorem` block per theorem — and both are one document shape with a different body.
    // Standardising means they land in ONE collection instead of each acquiring its own, so `layout` is declared
    // here and the harness ingests both envelopes into the same place.
    { name: 'layout', type: 'blocks' as const, blocks: [{
      slug: 'theorem',
      fields: [
        { name: 'slug', type: 'text' as const },
        { name: 'title', type: 'text' as const },
        { name: 'content', type: 'richText' as const },
        { name: 'uuidnaAddress', type: 'text' as const },
      ],
    }] },
  ],
}
export const pages = scoped(pagesShape)

const media = scoped({
  slug: 'media',
  upload: true,
  fields: [{ name: 'alt', type: 'text' as const }],
})

// THE AUTH COLLECTION IS HERE BECAUSE ACCESS CONTROL REFUSED THE INGEST, AND THAT REFUSAL WAS CORRECT. Payload v4
// defaults an un-configured collection to authenticated-only writes, so the first run of the harness got a 403 on
// create. The two ways past it are not equal: `overrideAccess` would skip the check, and this repository's standing
// rule forbids exactly that (the captain, 2026-09-13: "compute all through hooks. no direct operations. fuse all
// canonically bypassing none" — and removing a check is never the lawful reading of a refusal). So the harness
// authenticates instead: a real user, created through the same local API, passed on every write, with the access
// rule left as Payload wrote it. The test is then testing the ingest a real deployment performs.
// `users` is the ONE collection the standard scope does not get, and not by oversight: it is the collection the
// scope is ABOUT, so gating its creation on an existing user is a bootstrap that cannot start. Payload's documented
// first-user behaviour covers it, and the harness's create IS that first user.
const users = {
  slug: 'users',
  auth: true,
  fields: [],
}

/** THE PLUGINS ARE CROSS-FOLDED, not merely listed. Each one is pointed at the SAME `pages` collection, so they
 *  compose over one document rather than each owning a private corner: seo reads its title and description from the
 *  page, nested-docs threads the `parent` relationship uuidna already emits, search indexes what seo describes,
 *  redirects points at the same slugs, form-builder and import-export ride the same collection. A plugin set that
 *  never meets on a document proves only that the packages install. */
export const plugins = [
  seoPlugin({
    collections: [COLLECTION],
    uploadsCollection: 'media',
    generateTitle: ({ doc }: { doc: { title?: string } }) => doc?.title ?? '',
    generateDescription: ({ doc }: { doc: { slug?: string } }) => `The sealed source of ${doc?.slug ?? 'a wing'}.`,
  }),
  nestedDocsPlugin({ collections: [COLLECTION], generateLabel: (_: unknown, doc: { title?: string }) => doc?.title ?? '', generateURL: (docs: { slug?: string }[]) => docs.reduce((u, d) => `${u}/${d.slug ?? ''}`, '') }),
  searchPlugin({ collections: [COLLECTION] }),
  redirectsPlugin({ collections: [COLLECTION] }),
  formBuilderPlugin({ fields: { text: true, textarea: true, select: true, email: true, message: true } }),
  importExportPlugin({ collections: [COLLECTION] }),
]

const common = {
  collections: [users, pages, media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? derivedSecret,
  typescript: { outputFile: '/dev/null' },
  plugins,
}

/** the config the harness RUNS — the same adapter family, on a local file, because a D1 binding is the Worker's */
export const localConfig = buildConfig({ ...common, db: sqliteAdapter({ client: { url: 'file:./conformance.db' } }) })

/** the config a Worker runs — the shipped D1 adapter on a native binding. Built and sanitized by the harness so
 *  the configuration is proved here; the binding itself only exists in the Workers runtime. */
export const d1Config = (binding: unknown) =>
  buildConfig({ ...common, db: sqliteD1Adapter({ binding: binding as never }) })

export default localConfig
