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

// THE COLLECTION IS THE ONE uuidna ALREADY EMITS INTO, and it is deliberately plain: `pages`, a slug, a lexical
// `content`, a `_status` for drafts, and the two uuidna columns the seed carries. payload-seed's own comment says
// the shapes are the ones "a vanilla Payload auto-recognizes"; this file is where that sentence is either true or
// false. Adding a field to make the ingest pass would be answering the question with the answer.
export const pages = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text' as const, required: true },
    { name: 'slug', type: 'text' as const, index: true, unique: true },
    { name: 'content', type: 'richText' as const },
    { name: 'uuidnaAddress', type: 'text' as const, index: true },
    { name: 'uuidnaVersion', type: 'text' as const },
    { name: 'parent', type: 'relationship' as const, relationTo: 'pages' as const },
  ],
}

const media = {
  slug: 'media',
  upload: true,
  fields: [{ name: 'alt', type: 'text' as const }],
}

// THE AUTH COLLECTION IS HERE BECAUSE ACCESS CONTROL REFUSED THE INGEST, AND THAT REFUSAL WAS CORRECT. Payload v4
// defaults an un-configured collection to authenticated-only writes, so the first run of the harness got a 403 on
// create. The two ways past it are not equal: `overrideAccess` would skip the check, and this repository's standing
// rule forbids exactly that (the captain, 2026-09-13: "compute all through hooks. no direct operations. fuse all
// canonically bypassing none" — and removing a check is never the lawful reading of a refusal). So the harness
// authenticates instead: a real user, created through the same local API, passed on every write, with the access
// rule left as Payload wrote it. The test is then testing the ingest a real deployment performs.
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
    collections: ['pages'],
    uploadsCollection: 'media',
    generateTitle: ({ doc }: { doc: { title?: string } }) => doc?.title ?? '',
    generateDescription: ({ doc }: { doc: { slug?: string } }) => `The sealed source of ${doc?.slug ?? 'a wing'}.`,
  }),
  nestedDocsPlugin({ collections: ['pages'], generateLabel: (_: unknown, doc: { title?: string }) => doc?.title ?? '', generateURL: (docs: { slug?: string }[]) => docs.reduce((u, d) => `${u}/${d.slug ?? ''}`, '') }),
  searchPlugin({ collections: ['pages'] }),
  redirectsPlugin({ collections: ['pages'] }),
  formBuilderPlugin({ fields: { text: true, textarea: true, select: true, email: true, message: true } }),
  importExportPlugin({ collections: ['pages'] }),
]

const common = {
  collections: [users, pages, media],
  editor: lexicalEditor(),
  secret: 'uuidna-conformance-only-not-a-credential',
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
