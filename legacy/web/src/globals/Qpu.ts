// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The discovery document as a Payload global: GET /api/globals/qpu answers it from the handler alone, computed on read by the global's own hook; no custom endpoint.
import type { GlobalConfig } from 'payload'
import { discovery } from '@uuidna/qpu/discovery-document'
import { caller } from '@uuidna/qpu/mcp'

export const QpuGlobal: GlobalConfig = {
  slug: 'qpu',
  versions: false,
  access: { read: () => true },
  fields: [
    { name: 'origin', type: 'text', defaultValue: 'https://qpu.uuidna.com', admin: { description: 'the origin the discovery document names' } },
    { name: 'document', type: 'json', admin: { readOnly: true, description: 'the discovery document: computed on every read, never stored' } },
    { name: 'branding', type: 'json', admin: { readOnly: true, description: 'the branding of the tenant that asked, and the one theme and template its site and its admin share. Computed on this read from the tenants row.' } },
  ],
  // per tenant: the document names the origin of the host that asked (a tenant's domain), else the origin the global holds; a local host keeps the global's
  hooks: { afterRead: [async ({ doc, req }) => { const host = req?.headers?.get?.('host') ?? ''; const origin = host && !/^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? 'https://' + host.split(':')[0] : String(doc?.origin ?? 'https://qpu.uuidna.com'); const hostname = host.split(':')[0] ?? ''; const row = hostname ? ((await req.payload.find({ collection: 'tenants' as never, where: { 'domains.domain': { equals: hostname } }, limit: 1, overrideAccess: true })).docs[0] as { slug?: string; name?: string; branding?: unknown } | undefined) : undefined; const b = caller('configure')({ kind: 'branding', branding: { host: hostname, slug: row?.slug, name: row?.name, branding: row?.branding ?? null } }); return { ...doc, origin, document: discovery(origin, process.env as Record<string, unknown>), branding: b?.config ?? null } }] },
}
