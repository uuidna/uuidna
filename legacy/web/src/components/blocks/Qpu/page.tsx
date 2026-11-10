// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// A UUID page through Payload's own API: the page is the entry of the call { tool: verify, arguments: { uuid } } in the entries collection —
// read by its content address through the local API (free: nothing computed), created once when absent (the collection's hook computes the result).
// The catch-all hands a single UUID segment to this component. Nothing is fetched from anywhere else; no custom endpoint.
import React from 'react'
import { getPayload } from 'payload'
import { entryText, uuid } from '@uuidna/qpu/blocks'
import { handle } from '@uuidna/qpu/mcp'
import { QpuApp } from './App'

type Call = { id: string; result?: { structuredContent?: Record<string, unknown>; _meta?: { widget?: string; theme?: Record<string, string> }; error?: { message: string } } }
// the tenant of the request: the host that names it (the tenants' domains, as the Worker's TENANTS), else the first tenant (a local run)
type Tenant = { id: string; slug: string; settings?: { arguments?: Record<string, unknown> } }
const tenant = async (payload: Awaited<ReturnType<typeof getPayload>>): Promise<Tenant> => {
  // next/headers is loaded when the module runs (never imported statically): the block renderer is reached by the Pages Router too, where that API does not exist (measured at build)
  let host = ''
  try { const { headers } = await import('next/headers'); host = (await headers()).get('host')?.split(':')[0] ?? '' } catch { /* no request: the first tenant */ }
  const byDomain = await payload.find({ collection: 'tenants' as never, where: { 'domains.domain': { equals: host } }, limit: 1, overrideAccess: true })
  const t = (byDomain.docs[0] ?? (await payload.find({ collection: 'tenants' as never, limit: 1, sort: 'slug', overrideAccess: true })).docs[0]) as Tenant | undefined
  if (!t) throw new Error('no tenant: seed the tenants first (src/scripts/seedQpu.ts)')
  return t
}
export const call = async (tool: string, args: Record<string, unknown>): Promise<Call> => {
  // the config loaded when the module runs, never imported statically: the block renderer is reached by the Pages Router too, and the config's hooks name App Router caches (measured at build)
  const { default: config } = await import('@payload-config')
  const payload = await getPayload({ config })
  const owner = await tenant(payload)
  // the tenant's settings (its tenants document, in this UI or through the Payload MCP plugin) configure every call under its hosts
  const from = 'page:' + owner.slug // the same call at two tenants is two entries: the address folds the tenant through from
  const body = { tool, arguments: { ...args, ...(owner.settings?.arguments ?? {}) } }
  const id = uuid(entryText({ kind: 'call', from, body }))
  // the collection is QPU's own (the generated types of the fork name the site's); the id is the content address of the call
  try { return await payload.findByID({ collection: 'entries' as never, id }) as unknown as Call } catch { /* not yet called: created once below */ }
  return await payload.create({ collection: 'entries' as never, data: { id, kind: 'call', from, body, tenant: owner.id } as never }) as unknown as Call
}

export const QpuPage = async ({ uuid }: { uuid: string }) => {
  const verify = await call('verify', { uuid })
  // the view read by the server from the handler's own resources/read (the MCP plugin takes a key from every client; the app is its own server)
  const view = (handle({ jsonrpc: '2.0', id: 1, method: 'resources/read', params: { uri: 'ui://qpu/verify' } }) as { result?: { contents: { text: string }[] } }).result?.contents[0]?.text ?? ''
  const r = verify.result
  if (!r?.structuredContent) return <main><h1>{uuid}</h1><p>{r?.error?.message ?? 'not verified'}</p></main>
  // the UI from the MCP only: the entry's result rendered by the tool's own ui:// resource, hosted through the Apps protocol; nothing drawn here
  return (
    <main data-block={uuid} data-entry={verify.id}>
      <h1>{uuid}</h1>
      <QpuApp tool="verify" args={{ uuid }} result={r} html={view} />
    </main>
  )
}
