// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The docket as a Payload collection over D1: every entry addressed by its content — the id is the
// fold address of what it holds, the sha256 beside it — never overwritten; the four verbs are Payload's REST (/api/entries).
import { createHmac, hkdfSync } from 'node:crypto'
import type { CollectionConfig, Where } from 'payload'
import { entryText, uuid } from '@uuidna/qpu/blocks'
import { call, caller } from '@uuidna/qpu/mcp'
import { appCall } from '../payload.qpu.mcp'

type TenantUser = { roles?: string[]; tenants?: { tenant?: { id?: string } | string; roles?: string[] }[] } | null | undefined
const isSuperAdmin = (user: unknown): boolean => ((user as TenantUser)?.roles ?? []).includes('admin')
const tenantId = (t: unknown): string | null => (typeof t === 'string' ? t : (t as { id?: string } | undefined)?.id ?? null)
const tenantsWithRole = (user: unknown, roles: readonly string[]): string[] => ((user as TenantUser)?.tenants ?? []).filter((row) => (row.roles ?? []).some((r) => roles.includes(r))).map((row) => tenantId(row.tenant)).filter((id): id is string => !!id)
const member = (user: unknown, tenant: string | null, roles: readonly string[]): boolean => !!tenant && tenantsWithRole(user, roles).includes(tenant)
const tenants = (user: unknown): string[] => ((user as TenantUser)?.tenants ?? []).map((row) => tenantId(row.tenant)).filter((x): x is string => !!x)
// a machine client (CI, a session, the uuidna unit) is a Payload user signing in with its API key (Authorization: users API-Key <key>), so its
// role is the roles field on that user, which only an admin sets
const hasRole = (user: unknown, role: string): boolean => ((user as TenantUser)?.roles ?? []).includes(role)
export const Entries: CollectionConfig = {
  slug: 'entries',
  versions: false, // append-only: an entry never updates, so it has no history to keep
  admin: { useAsTitle: 'id', defaultColumns: ['id', 'kind', 'from', 'createdAt'] },
  enableQueryPresets: true, // each tenant's saved lists: its devices, readings, commands
  // access by tenant roles and user roles: a reader reads; a call is created by anyone; an entry of other kinds by a super admin, a tenant-admin or editor of its tenant, or a user holding the writer role; no one updates (an entry is its content address); a super admin or a tenant-admin of its tenant deletes
  access: {
    // the operational kinds (a machine's runs, chats, penalties, sessions) to their tenant and admins alone; the rest is the public docket
    read: ({ req }) => isSuperAdmin(req.user) || ({ or: [{ kind: { not_in: ['machine', 'chat', 'penalty', 'session', 'call', 'message', 'google-user-data'] } }, { and: [{ kind: { in: ['machine', 'chat', 'penalty', 'session', 'call', 'message'] } }, { tenant: { in: tenants(req.user) } }] }, { and: [{ kind: { in: ['google-user-data'] } }, { or: [{ from: { equals: String((req.user as { id?: unknown } | null)?.id ?? '') } }, { tenant: { in: tenantsWithRole(req.user, ['tenant-admin']) } }] }] }] } as Where),
    create: ({ req, data }) => data?.kind === 'call' || data?.kind === 'chat' || isSuperAdmin(req.user) || member(req.user, tenantId(data?.tenant), ['tenant-admin', 'editor']) || hasRole(req.user, 'writer'),
    update: () => false,
    delete: ({ req }) => isSuperAdmin(req.user) || { tenant: { in: tenantsWithRole(req.user, ['tenant-admin']) } },
  },
  fields: [
    { name: 'id', type: 'text', required: true, validate: (v: unknown) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(String(v)) || 'a UUID of 36 characters', custom: { theorem: 'textbook_uuid_is_36' }, admin: { readOnly: true, description: 'the content address: computed from kind, from and body' } },
    { name: 'kind', type: 'text', required: true, index: true, validate: (v: unknown) => /^[a-z][a-z-]*$/.test(String(v)) || 'lower-case letters and dashes', custom: { theorem: 'textbook_kind_alphabet' } },
    { name: 'from', type: 'text', required: true, index: true },
    { name: 'body', type: 'json' },
    { name: 'sha256', type: 'text', validate: (v: unknown) => (v == null || v === '') || /^[0-9a-f]{64}$/.test(String(v)) || '64 hex digits', custom: { theorem: 'textbook_sha256_is_64' }, admin: { readOnly: true } },
    { name: 'result', type: 'json', admin: { readOnly: true, description: 'kind call: the reply of the tool, computed by the hook from body { tool, arguments }; the API of every tool is this collection' } },
    // the docket's relations, Payload's own: an entry has many entries it links (a belongs-to-many of the same collection), and the entries
    // linking it are joined back by Payload, never stored twice
    { name: 'links', type: 'relationship', relationTo: 'entries', hasMany: true, admin: { description: 'the entries this one links: a relation of the docket (has many)' } },
    { name: 'linkedBy', type: 'join', collection: 'entries', on: 'links', admin: { description: 'the entries that link this one: the inverse, joined by Payload' } },
  ],
  hooks: {
    // every 404 from a block answered, nothing written: a well-formed UUID the collection does not hold is healed from the Worker by address (QPU_ORIGIN, accept json),
    // which answers the entry its docket holds or the UUID's own page computed from the id alone; unreachable, the same page is computed here by the handler
    afterError: [async ({ error, req }) => {
      const id = String((req as { routeParams?: { id?: unknown } } | undefined)?.routeParams?.id ?? (req?.url ?? '').split('?')[0]!.split('/').pop() ?? '')
      if ((error as { status?: number }).status !== 404) return
      if (/^[a-z][a-z0-9]*$/.test(id)) return { response: { id, kind: 'keyword', from: 'afterError', computed: true, written: false, thrown: false, bit: 0, closed: true, unhandled: 0, beyond: true, says: 'a one-word path the collection does not hold falls back to the zero bit, so the 404 left is zero, beyond what was imagined' }, status: 200 }
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) return
      try { const res = await fetch((process.env.QPU_ORIGIN ?? 'https://qpu.uuidna.com') + '/' + id, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(10000) }); if (res.ok) { const entry = await res.json() as { id?: string; kind?: string; from?: string; body?: unknown; links?: string[]; computed?: boolean }; if (entry && entry.kind && entry.from && !entry.computed) { try { await req.payload.create({ collection: 'entries' as never, data: { kind: entry.kind, from: entry.from, body: entry.body, links: entry.links ?? [] } as never, overrideAccess: true, context: { disableRevalidate: true } }) } catch { /* seeded already, or refused: the answer stands */ } } return { response: entry, status: 200 } } } catch { /* the Worker unreached: computed here */ }
      const v = caller('verify')({ uuid: id })
      return { response: { id, kind: 'uuid', from: 'computed', computed: true, body: v ?? null, says: 'no entry at this address: the page of the UUID from the id alone, nothing written (no content address to seed at)' }, status: 200 }
    }],
    beforeValidate: [async ({ data, operation, req }) => {
      if (operation !== 'create' || !data) return data
      // the tenant the multi-tenant plugin requires: the caller's, else the request host's row (as the users hook names it), else the first tenant, so a public call lands under the tenant that answers it
      if (!data.tenant) { const host = (req?.headers?.get?.('host') ?? '').split(':')[0] || 'localhost'; const byHost = await req.payload.find({ collection: 'tenants' as never, where: { 'domains.domain': { equals: host } }, limit: 1, overrideAccess: true }); const first = byHost.docs[0] ?? (await req.payload.find({ collection: 'tenants' as never, limit: 1, sort: 'createdAt', overrideAccess: true })).docs[0]; if (first) data.tenant = (first as { id: string }).id }
      // a call salted under the server's data key: the same request keeps its address, but no one who knows the request can compute it, nor its answer's
      if (data.kind === 'call' && process.env.QPU_DATA_KEY && data.body && typeof data.body === 'object' && !('salt' in data.body)) data.body = { ...data.body, salt: createHmac('sha256', Buffer.from(hkdfSync('sha256', process.env.QPU_DATA_KEY, '', 'qpu call salt', 32))).update(JSON.stringify(data.body)).digest('hex') }
      // the caller's role, from Payload's user (an API-key user carries its own roles) and the tenant: the chat door corrects what the role may not choose
      const tenant = tenantId(data.tenant) // the local name must not shadow the tenantId helper it calls (a shadowed const is in its temporal dead zone)
      const role = isSuperAdmin(req.user) || member(req.user, tenant, ['tenant-admin']) ? 'admin' : hasRole(req.user, 'writer') || member(req.user, tenant, ['editor']) ? 'writer' : 'reader'
      const chatDoor = (statement: string, chat: Record<string, unknown>) => caller('match')({ statement, chat })
      // a call is folded as it will run: its arguments corrected for the role first, so the same address always holds the same reply
      const asked = data.body as { tool?: string; arguments?: Record<string, unknown>; statement?: string; choice?: string } | undefined
      let corrected: unknown[] = []
      if (data.kind === 'call' && asked?.tool) { const c = chatDoor('call ' + asked.tool, { role, run: false, call: { tool: asked.tool, arguments: asked.arguments ?? {} } }); if (c?.call) { data.body = { tool: asked.tool, arguments: c.call.arguments }; corrected = c.corrected ?? [] } }
      // a chat entry: the statement, the role and any choice are its body; the hook answers it through the chat door, nothing thrown back
      if (data.kind === 'chat') data.body = { statement: String(asked?.statement ?? ''), role, ...(asked?.choice && { choice: String(asked.choice) }) }
      const chat = data.kind === 'chat' ? chatDoor(String(asked?.statement ?? ''), { role, choice: asked?.choice }) : undefined
      // the address folds the entry's canonical text and the ids it links: the same body linking other entries is another entry
      const links = Array.isArray(data.links) ? data.links.map((l) => String(typeof l === 'object' && l ? (l as { id?: unknown }).id : l)) : []
      const text = entryText({ kind: data.kind, from: data.from, body: data.body, links })
      const bytes = new TextEncoder().encode(text)
      const digest = await crypto.subtle.digest('SHA-256', bytes)
      // the API built from the config: an entry of kind call carries a tool and its arguments, and the hook answers it from the handler; the address folds the call, not the reply, so the same call is the same entry (read free, computed once)
      const body = data.body as { tool?: string; arguments?: Record<string, unknown> } | undefined
      // the reply's result stands as the entry's result (content, structuredContent, _meta with the widget); a refusal stands as { error }
      const reply = data.kind === 'call' && body?.tool ? appCall(body.tool, body.arguments ?? {}) : undefined
      const result = chat ? chat : reply ? { ...((reply.result ?? { error: reply.error }) as object), ...(corrected.length ? { corrected } : {}) } : undefined
      return { ...data, id: uuid(text), sha256: [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join(''), ...(result ? { result } : {}) }
    }],
    // no revalidation hook: an entry is its content address and never updates, so nothing cached under it ever changes (measured: a revalidateTag during the render that creates a call is refused by Next)
  },
}
