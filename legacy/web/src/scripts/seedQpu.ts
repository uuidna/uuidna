// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The site seeded from the one content source: every document payload { site: true } lays out, created as a page of the app through
// Payload's local API; a page already there (by slug) is left as it is. Run with: pnpm payload run src/scripts/seedQpu.ts
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { type DefaultDocumentIDType, getPayload } from 'payload'
import config from '@payload-config'
import { caller } from '@uuidna/qpu/mcp'

const payloadTool = caller('payload'), configureTool = caller('configure')

const main = async () => {
  const payload = await getPayload({ config })
  const site = payloadTool({ site: true }).collection.docs as { id: string; title: string; slug: string; layout: Record<string, unknown>[]; meta: { title: string; description: string }; parent?: string | null; hero?: Record<string, unknown> }[]
  // the tenants from the configs first, read from the handler at run time (nothing seeded is written into this file): one per host, by slug; the super
  // admin seeds, so no user is passed; every scoped document below belongs to the first tenant
  const tenants = configureTool({ kind: 'tenant' }).config.records as Record<string, { name: string; slug: string; domains: { domain: string }[]; currency: string }>
  let tenantsCreated = 0
  for (const t of Object.values(tenants)) {
    const found = await payload.find({ collection: 'tenants' as never, where: { slug: { equals: t.slug } }, limit: 1, overrideAccess: true })
    if (found.totalDocs) continue
    await payload.create({ collection: 'tenants' as never, overrideAccess: true, data: t as never })
    tenantsCreated += 1
  }
  const tenant = (await payload.find({ collection: 'tenants' as never, where: { slug: { equals: Object.keys(tenants)[0] } }, limit: 1, overrideAccess: true })).docs[0] as { id: string } | undefined
  if (!tenant) throw new Error('no tenant to scope the documents to')
  // the first user from the deployer's account: a deploy creates it (no create-first-user form), its password unknown to everyone — the admin sets one through
  // the panel's reset (forgot password) with the mail the app sends; the email from FIRST_USER_EMAIL, else CLOUDFLARE_EMAIL, else wrangler whoami; none: the form stands
  let firstUser = 'none'
  if (!(await payload.count({ collection: 'users', overrideAccess: true })).totalDocs) {
    // a local super admin for the dev harness: when QPU_APP_KEY is set outside production, the first user carries it as its API key, so the git hooks
    // decide through the Payload MCP, the machine runs and the generated indexes sync — no manual keychain step (never in production, never a real address)
    const localKey = process.env.NODE_ENV !== 'production' && process.env.QPU_APP_KEY ? process.env.QPU_APP_KEY : null
    const email = process.env.FIRST_USER_EMAIL ?? process.env.CLOUDFLARE_EMAIL ?? (() => { try { return /associated with the email ([^\s]+@[^\s]+?)[.,;]?(?:\s|$)/.exec(execSync('npx wrangler whoami', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).replace(/\u001b\[[0-9;]*m/g, ''))?.[1] ?? null } catch { return null } })() ?? (localKey ? 'admin@localhost.test' : null)
    if (email) { await payload.create({ collection: 'users', overrideAccess: true, context: { disableRevalidate: true }, data: { email, password: randomUUID() + randomUUID(), firstName: 'Super', lastName: 'Admin', roles: ['admin'], enableAPIKey: Boolean(localKey), ...(localKey ? { apiKey: localKey } : {}), tenants: [{ tenant: tenant.id, roles: ['tenant-admin'] }] } as never }); firstUser = localKey ? 'created as the local super admin with its API key from QPU_APP_KEY' : 'created from the account email (its password unknown: reset it through the admin panel)' }
    else firstUser = 'no account email known (FIRST_USER_EMAIL, CLOUDFLARE_EMAIL, wrangler whoami): the create-first-user form of the admin panel stands'
  } else firstUser = 'a user exists already'
  let created = 0, kept = 0, updated = 0
  for (const d of site) {
    const slug = d.slug.replace(/^\//, '')
    const found = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true, draft: true })
    // nested: the parent is the page of the parent slug, created before its children (the documents come parents first); the plugin computes the breadcrumbs
    const parent = d.parent ? ((await payload.find({ collection: 'pages', where: { slug: { equals: d.parent.replace(/^\//, '') } }, limit: 1, overrideAccess: true, draft: true })).docs[0] as { id: DefaultDocumentIDType } | undefined)?.id ?? null : null
    // the layout compared as Payload stores it: block ids, nulls and empty objects are not content, so a page is relaid only when its blocks changed
    const canon = (layout: unknown) => JSON.stringify(layout, (k, v) => (k === 'id' || v === null || (v?.constructor === Object && Object.keys(v).length === 0) ? undefined : v?.constructor === Object ? Object.fromEntries(Object.keys(v as object).sort().map((key) => [key, (v as Record<string, unknown>)[key]])) : v))
    if (found.totalDocs) { const page = found.docs[0] as { id: DefaultDocumentIDType; _status?: string; layout?: unknown[]; parent?: { id: DefaultDocumentIDType } | DefaultDocumentIDType | null }; const stale = canon(page.layout ?? []) !== canon(d.layout) || ((typeof page.parent === 'object' && page.parent ? page.parent.id : page.parent) ?? null) !== parent || (d.hero ? canon((page as { hero?: { richText?: unknown } }).hero?.richText ?? null) !== canon(d.hero.richText ?? null) : false); if (page._status !== 'published' || stale) await payload.update({ collection: 'pages', id: page.id, overrideAccess: true, context: { disableRevalidate: true }, data: { _status: 'published', ...(stale ? { layout: d.layout, parent, ...(d.hero ? { hero: d.hero } : {}) } : {}) } as never }); kept += 1; if (stale) updated += 1; continue }
    // published: the site is what the QPU computes, public at once; a draft would answer no reader
    await payload.create({ collection: 'pages', overrideAccess: true, context: { disableRevalidate: true }, data: { title: d.title, slug, hero: d.hero ?? { type: 'default' }, layout: d.layout, meta: d.meta, tenant: tenant.id, parent, _status: 'published' } as never })
    created += 1
  }
  // the licence catalogue as products of the ecommerce plugin, read from the handler at run time: one per variant, by title, prices in the minor unit per
  // currency — harmonised when the environment carries the rates the currency step measured (QPU_RATES, the JSON the currency tool answers), else the catalogue's own
  const catalogue = configureTool({ kind: 'ecommerce', ...(process.env.QPU_RATES ? { rates: JSON.parse(process.env.QPU_RATES) } : {}) }).config.catalogue.items as { title: string; licence: Record<string, string>; prices: Record<string, number> }[]
  let products = 0
  for (const item of catalogue) {
    const found = await payload.find({ collection: 'products' as never, where: { title: { equals: item.title } }, limit: 1, overrideAccess: true })
    if (found.totalDocs) continue
    await payload.create({ collection: 'products' as never, overrideAccess: true, context: { disableRevalidate: true }, data: { title: item.title, licence: item.licence, tenant: tenant.id, ...Object.fromEntries(Object.entries(item.prices).flatMap(([k, v]) => [[k, v], [k + 'Enabled', true]])), _status: 'published' } as never })
    products += 1
  }
  // the "Request an app" form of the form-builder plugin, from the handler: a submission generates the app (appRequest, form-submissions afterChange)
  const form = payloadTool({ app: { form: true } }).form as Record<string, unknown> & { title: string }
  let formState = 'kept'
  if (!(await payload.find({ collection: 'forms', where: { title: { equals: form.title } }, limit: 1, overrideAccess: true })).totalDocs) { await payload.create({ collection: 'forms', overrideAccess: true, context: { disableRevalidate: true }, data: form as never }); formState = 'created' }
  const plan = payloadTool({ deploy: { seed: true } }) as { seed: { complete: boolean; creates: { collection: string; where: Record<string, unknown>; data: Record<string, unknown>; parentSlug: string | null; productTitle: string | null }[] } }
  if (!plan.seed.complete) throw new Error('the website is not fully seeded')
  let added = 0
  for (const row of plan.seed.creates) {
    const found = await payload.find({ collection: row.collection as never, where: row.where as never, limit: 1, overrideAccess: true, draft: true })
    if (found.totalDocs) continue
    const parent = row.parentSlug ? ((await payload.find({ collection: 'pages', where: { slug: { equals: row.parentSlug } }, limit: 1, overrideAccess: true, draft: true })).docs[0] as { id: DefaultDocumentIDType } | undefined)?.id ?? null : null
    const product = row.productTitle ? ((await payload.find({ collection: 'products' as never, where: { title: { equals: row.productTitle } }, limit: 1, overrideAccess: true })).docs[0] as { id: string } | undefined)?.id ?? null : null
    await payload.create({ collection: row.collection as never, overrideAccess: true, context: { disableRevalidate: true }, data: { ...row.data, tenant: tenant.id, ...(row.parentSlug ? { parent } : {}), ...(row.productTitle && product ? { product } : {}) } as never })
    added += 1
  }
  console.log(`seed: ${created} page(s) created, ${kept} kept (${updated} relaid), from ${site.length} documents; ${tenantsCreated} tenant(s) created of ${Object.keys(tenants).length}; ${products} product(s) created of ${catalogue.length}; ${added} catalogue page(s), variant(s) and post(s) created of ${plan.seed.creates.length}; the request form ${formState}; first user: ${firstUser}; deploy is the completed order's afterChange hook`)
}
// awaited at the top level: payload run returns when the module has loaded, so a pending promise would be left behind (measured: the seed printed nothing and wrote nothing)
await main()
process.exit(0)
