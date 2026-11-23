// Payload holds the Lean catalogue. This states the plan (catalogue-seed.ts) and Payload holds it (seedHold.ts): the tenant,
// the clause and module pages, the categories, a product for each theorem with its own variant type, whose options
// are the examples that theorem names, and a variant for each of them. Every write finds its document first, so a second run changes
// nothing that already agrees. SEED_CHECK=1 writes nothing and fails when a document is missing. SEED_MODULES names
// the modules to seed, comma separated; without it the whole catalogue is seeded. Documents that do not depend on one
// another are written together, SEED_TOGETHER at a time (COIN_QUBIT_SPACE when unset): a page waits only for its parent.
import { COIN_QUBIT_SPACE } from '@uuidna/qpu/config'
import { headedText, planCatalogue, richText } from '@/lib/qpu/catalogue'
import { holdDocument, holdFirstUser, signSeed, type Agree, type Doc, type FirstUser, type Held, type HoldItem } from '../utilities/seedHold.ts'

const check = process.env.SEED_CHECK === '1'
const only = (process.env.SEED_MODULES ?? '').split(',').map((name) => name.trim()).filter(Boolean)
const plan = planCatalogue(only)
// THE DOOR. With QPU_SEED_DOOR set, every document is held by the deployed app (POST <door>, signed with
// PAYLOAD_SECRET): the statements run inside the Worker, beside the database. Without it, Payload is started here
// and holds the documents through its local API, as a script beside a local database does.
const door = process.env.QPU_SEED_DOOR ?? ''
const local = door ? null : await (async () => { const { default: config } = await import('../payload.config.ts'); const { getPayload } = await import('payload'); return getPayload({ config }) })()
/** One signed request to the door, tried again when the network or the Worker fails it. */
const ask = async <T>(asked: Record<string, unknown>): Promise<T> => {
  const body = JSON.stringify({ ...asked, check })
  for (let attempt = 1; ; attempt += 1) {
    const time = String(Date.now())
    const answer = await fetch(door, { method: 'POST', headers: { 'content-type': 'application/json', 'x-qpu-time': time, 'x-qpu-signature': signSeed(process.env.PAYLOAD_SECRET ?? '', time, body) }, body, signal: AbortSignal.timeout(120000) }).catch((error: unknown) => error as Error)
    if (answer instanceof Response && answer.ok) return (await answer.json()) as T
    const said = answer instanceof Response ? `${answer.status} ${(await answer.text()).slice(0, 300)}` : answer.message
    if (attempt === 4 || (answer instanceof Response && answer.status < 500)) throw new Error(`${door}: ${said}`)
    await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
  }
}
let written = 0, missing = 0
const width = Math.max(1, Number(process.env.SEED_TOGETHER) || COIN_QUBIT_SPACE)
/** Every item handled, at most `width` at a time; the first failure ends the seed. */
const together = async <T>(items: readonly T[], each: (item: T) => Promise<void>): Promise<void> => {
  let next = 0
  await Promise.all(Array.from({ length: Math.min(width, items.length) }, async () => { while (next < items.length) await each(items[next++]!) }))
}

/** Find one document, and create or update it when it is absent or differs in what the plan says must agree. */
const hold = async (collection: string, where: Record<string, unknown>, data: Record<string, unknown>, agree: readonly Agree[] = [], force = false): Promise<Doc | null> => {
  const item: HoldItem = { collection, where, data, agree, force }
  const held = local ? await holdDocument(local, item, check) : await ask<Held>({ item })
  if (held.written) written += 1
  if (held.missing) missing += 1
  return held.doc
}
const idOf = (doc: Doc | null) => doc?.id ?? null
/** The SEO plugin's own fields, filled from what the document states: its title, and its text up to the length a description shows. */
const seo = (title: string, text: readonly string[] | string) => ({ title, description: (typeof text === 'string' ? text : text.filter(Boolean).join(' ')).slice(0, 160) })
/** What a document of the plan must agree on to be left as it is: its title, its SEO title, and that it is published. */
const stated = (title: string): Agree[] => [{ path: 'title', equals: title }, { path: '_status', equals: 'published' }, { path: 'meta.title', equals: title }]
const refersTo = (value: unknown, id: unknown) => (typeof value === 'object' && value !== null ? (value as Doc).id : value) === id

// THE FIRST ADMIN, when the admin panel cannot make one. QPU_ADMIN_EMAIL and QPU_ADMIN_PASSWORD are read from the
// environment and never printed; with either unset, or with any user already held, nothing is done. The users
// collection makes the first user an admin itself (ensureFirstUserIsAdmin).
const admin: FirstUser = { email: process.env.QPU_ADMIN_EMAIL ?? '', password: process.env.QPU_ADMIN_PASSWORD ?? '' }
const firstUser: 'made' | 'held' | 'unset' = !(admin.email && admin.password) ? 'unset' : local ? await holdFirstUser(local, admin, check) : (await ask<{ firstUser: 'made' | 'held' }>({ firstUser: admin })).firstUser

const tenant = await hold('tenants', { slug: { equals: plan.tenant.slug } }, plan.tenant)
const pages = new Map<string, Doc | null>()
// a page is written once its parent is held, so the pages go wave by wave: the roots, then their children
for (let waiting = [...plan.pages]; waiting.length > 0;) {
  const ready = waiting.filter((page) => !page.parent || pages.has(page.parent))
  if (ready.length === 0) throw new Error(`no parent is planned for ${waiting.map((page) => page.slug).join(', ')}`)
  await together(ready, async (page) => {
    const parent = page.parent ? idOf(pages.get(page.parent) ?? null) : null
    const layout = [{ blockType: 'content', columns: [{ size: 'full', richText: richText(page.text) }] }]
    pages.set(page.slug, await hold('pages', { slug: { equals: page.slug } }, { title: page.title, slug: page.slug, tenant: idOf(tenant), parent, hero: { type: 'lowImpact' }, layout, meta: seo(page.title, page.text), _status: 'published' }, [...stated(page.title), { path: 'parent', equals: parent }]))
  })
  waiting = waiting.filter((page) => !ready.includes(page))
}
const categories = new Map<string, Doc | null>()
await together(plan.categories, async (category) => void categories.set(category.slug, await hold('categories', { slug: { equals: category.slug } }, category, [{ path: 'title', equals: category.title }])))
let variants = 0
const held = new Map<string, Doc | null>()
await together(plan.products, async (product) => {
  const category = idOf(categories.get(product.category) ?? null)
  const base = { title: product.title, slug: product.slug, tenant: idOf(tenant), description: richText(product.description), categories: category === null ? [] : [category], meta: seo(product.title, product.description), _status: 'published' }
  let made = await hold('products', { slug: { equals: product.slug } }, { ...base, enableVariants: false, variantTypes: [] }, stated(product.title))
  if (product.variants.length > 0 && made) {
    // the product's own variant type: its options are the examples this theorem names, and no other theorem's
    const own = Array.isArray(made.variantTypes) ? made.variantTypes[0] : undefined
    const ownId = typeof own === 'object' && own !== null ? (own as Doc).id : own
    const type = ownId !== undefined && ownId !== null ? ({ id: ownId } as Doc) : await hold('variantTypes', { id: { equals: -1 } }, plan.variantType)
    if (type && !refersTo(own, type.id)) made = await hold('products', { slug: { equals: product.slug } }, { ...base, enableVariants: true, variantTypes: [type.id] }, [], true)
    for (const example of product.variants) {
      const option = idOf(await hold('variantOptions', { and: [{ value: { equals: example } }, { variantType: { equals: idOf(type) } }] }, { label: example, value: example, variantType: idOf(type) }))
      await hold('variants', { and: [{ product: { equals: idOf(made) } }, { options: { in: [option] } }] }, { title: `${product.title} / ${example}`, product: idOf(made), options: [option], _status: 'published' })
      variants += 1
    }
  }
  held.set(product.slug, made)
})
// the home page: the lead in the hero, the text, three products side by side and the rest in a carousel
const featured = plan.home.featured.map((slug) => idOf(held.get(slug) ?? null)).filter((id) => id !== null)
const homeLayout = [
  { blockType: 'content', columns: [{ size: 'full', richText: richText(plan.home.text) }] },
  ...(featured.length === 3 ? [{ blockType: 'threeItemGrid', products: featured }] : []),
  { blockType: 'carousel', populateBy: 'collection', relationTo: 'products', limit: 12 },
]
await hold('pages', { slug: { equals: plan.home.slug } }, { title: plan.home.title, slug: plan.home.slug, tenant: idOf(tenant), hero: { type: 'lowImpact', richText: headedText(plan.home.title, [plan.home.lead]) }, layout: homeLayout, _status: 'published' }, [{ path: 'title', equals: plan.home.title }, { path: '_status', equals: 'published' }, { path: 'layout.length', equals: homeLayout.length }, { path: 'hero.richText', includes: plan.home.lead }])
console.log(JSON.stringify({ check, modules: only.length || 'all', ...plan.counts, variantsHeld: variants, firstUser, written, missing, allowsDeploy: check ? missing === 0 : true }))
if (check && missing > 0) process.exit(1)
process.exit(0)
