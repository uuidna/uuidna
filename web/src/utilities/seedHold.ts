// The seed's door into Payload. A seed states a document (where it is found, what it holds, what must agree) and
// Payload holds it: found and agreeing, it is left; absent or different, it is created or updated through the local
// API, so every hook and plugin runs. The same function serves a script beside the database and the endpoint the
// deployed Worker answers, where the database is a binding and no statement crosses the network.
// The endpoint trusts a request signed with PAYLOAD_SECRET, the secret that already signs every session of this
// installation: who holds it can already act as any user, so the door grants nothing new.
import { createHmac, timingSafeEqual } from 'node:crypto'

import type { Endpoint, Payload } from 'payload'

export type Doc = { id: number | string } & Record<string, unknown>
/** What must agree for a found document to be left as it is: the value at a path equals one, or its JSON holds a text. */
export type Agree = { path: string; equals?: unknown; includes?: string }
export type HoldItem = { collection: string; where: Record<string, unknown>; data: Record<string, unknown>; agree?: readonly Agree[]; force?: boolean }
export type Held = { doc: Doc | null; written: boolean; missing: boolean }
export type FirstUser = { email: string; password: string }

const context = { disableRevalidate: true, disableRelease: true }

/** The value at a dotted path; a related document counts as its id, and `length` of a list is its length. */
const valueAt = (doc: unknown, path: string): unknown => {
  const value = path.split('.').reduce<unknown>((at, key) => (at !== null && typeof at === 'object' ? (at as Record<string, unknown>)[key] : undefined), doc)
  return value !== null && typeof value === 'object' && !Array.isArray(value) && 'id' in value ? (value as Doc).id : value
}
const agrees = (doc: Doc, agree: readonly Agree[]) =>
  agree.every((rule) => {
    const value = valueAt(doc, rule.path)
    return rule.includes !== undefined ? JSON.stringify(value ?? null).includes(rule.includes) : (value ?? null) === (rule.equals ?? null)
  })

/** Find one document, and create or update it when it is absent or differs in what the seed says must agree. */
export const holdDocument = async (payload: Payload, item: HoldItem, check: boolean): Promise<Held> => {
  const read = async (draft: boolean) =>
    (await payload.find({ collection: item.collection as never, where: item.where as never, limit: 1, depth: 0, draft, pagination: false, overrideAccess: true })).docs[0] as Doc | undefined
  // a seed that was stopped between a document and its version leaves the document without one: the latest version
  // does not show it, the collection does, and it is then written again instead of being created twice
  const latest = await read(true)
  const found = latest ?? (await read(false))
  if (latest && !item.force && agrees(latest, item.agree ?? [])) return { doc: latest, written: false, missing: false }
  if (check) return { doc: found ?? null, written: false, missing: true }
  const doc = found
    ? await payload.update({ collection: item.collection as never, id: found.id, data: item.data as never, context, depth: 0, draft: false, overrideAccess: true })
    : await payload.create({ collection: item.collection as never, data: item.data as never, context, depth: 0, draft: false, overrideAccess: true })
  return { doc: doc as unknown as Doc, written: true, missing: false }
}

/** The first admin, made only when no user is held; the users collection makes the first user an admin itself. */
export const holdFirstUser = async (payload: Payload, user: FirstUser, check: boolean): Promise<'made' | 'held'> => {
  const users = await payload.count({ collection: 'users', overrideAccess: true })
  if (users.totalDocs > 0) return 'held'
  if (!check) await payload.create({ collection: 'users', data: { email: user.email, password: user.password, roles: ['admin'] } as never, overrideAccess: true })
  return 'made'
}

/** How long a signed request stays valid. */
const FRESH_MS = 300000
/** The signature of a request body at a time, under the installation's secret. */
export const signSeed = (secret: string, time: string, body: string) => createHmac('sha256', secret).update(`${time}.${body}`).digest('hex')
const sameText = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))

/** POST /api/seed/hold: one signed request holds one document, or the first user, inside the app. */
export const seedHoldEndpoint: Endpoint = {
  path: '/seed/hold',
  method: 'post',
  handler: async (req) => {
    const secret = req.payload.config.secret
    const time = req.headers.get('x-qpu-time') ?? '', signature = req.headers.get('x-qpu-signature') ?? ''
    const body = (await req.text?.()) ?? ''
    if (!secret || !signature || !(Math.abs(Date.now() - Number(time)) < FRESH_MS) || !sameText(signature, signSeed(secret, time, body))) return Response.json({ error: 'unsigned' }, { status: 401 })
    const asked = JSON.parse(body) as { check?: boolean; item?: HoldItem; firstUser?: FirstUser }
    const check = asked.check === true
    if (asked.firstUser) return Response.json({ firstUser: await holdFirstUser(req.payload, asked.firstUser, check) })
    if (!asked.item) return Response.json({ error: 'nothing to hold' }, { status: 400 })
    return Response.json(await holdDocument(req.payload, asked.item, check))
  },
}
