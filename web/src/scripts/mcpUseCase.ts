import { randomBytes } from 'crypto'
import { getPayload } from 'payload'

import config from '@payload-config'

/** The ecommerce catalog as MCP use cases, against a running app: `pnpm payload run src/scripts/mcpUseCase.ts`
 *  (MCP_URL defaults to http://localhost:3000/api/mcp). The admin from queueLegacyLeads gets a user API key, kept in
 *  memory only, and plugin-mcp's own tools are asked as a client asks them:
 *  - find a lead by path, count by verdict, list a category, read the schema;
 *  - a publish attempt the ISO/IEC 25051 guard must refuse;
 *  - development: the lead gets evidence (LEAD_EVIDENCE, a sealed theorem key), the trial re-runs, and a VERIFIED lead
 *    publishes with its variants. */
const url = process.env.MCP_URL || 'http://localhost:3000/api/mcp'
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@uuidna.localhost'
const leadPath = process.env.LEAD_PATH || 'src/quantum/index.ts'
const evidence = process.env.LEAD_EVIDENCE || 'uuidprog_bell_runs'
const payload = await getPayload({ config })

const admin = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true, where: { email: { equals: email } } })).docs[0]
if (!admin?.roles?.includes('admin')) throw new Error(`${email} is not an admin here: run queueLegacyLeads first or name one`)
const apiKey = randomBytes(24).toString('hex')
await payload.update({
  id: admin.id,
  collection: 'users',
  // useAPIKey adds these auth fields at runtime; the generated User type does not list them
  data: { apiKey, enableAPIKey: true } as Record<string, unknown>,
  user: { ...admin, collection: 'users' },
})

let id = 0
const rpc = async (method: string, params: Record<string, unknown> = {}) => {
  const res = await fetch(url, {
    body: JSON.stringify({ id: ++id, jsonrpc: '2.0', method, params }),
    headers: {
      accept: 'application/json, text/event-stream',
      authorization: `users API-Key ${apiKey}`,
      'content-type': 'application/json',
    },
    method: 'POST',
  })
  const text = await res.text()
  const json = text.trimStart().startsWith('{') ? text : (text.split('\n').filter((l) => l.startsWith('data:')).pop()?.slice(5) ?? '{}')
  return JSON.parse(json) as {
    error?: { message?: string }
    result?: { content?: { text?: string }[]; isError?: boolean; tools?: { name: string }[] }
  }
}
const call = async (name: string, args: Record<string, unknown>) => {
  const r = await rpc('tools/call', { arguments: args, name })
  const text = r.error?.message ?? r.result?.content?.map((c) => c.text ?? '').join(' ') ?? ''
  return { error: Boolean(r.error || r.result?.isError), text }
}
/** the JSON document a find tool prints after its header */
const docOf = (text: string) => {
  const m = /```json\n([\s\S]*?)\n```/.exec(text)
  return m ? (JSON.parse(m[1]!) as { id: number; lead?: Record<string, unknown> & { verdict?: string } }) : null
}

await rpc('initialize', { capabilities: {}, clientInfo: { name: 'uuidna-catalog-use-cases', version: '1' }, protocolVersion: '2025-06-18' })
const tools = ((await rpc('tools/list')).result?.tools ?? []).map((t) => t.name)
const byPath = await call('findDocuments', { slug: 'products', draft: true, where: { 'lead.path': { equals: leadPath } } })
const lead = docOf(byPath.text)
const unverified = await call('countDocuments', { slug: 'products', where: { 'lead.verdict': { equals: 'UNVERIFIED' } } })
const category = await call('findDocuments', { slug: 'categories', limit: 1, where: { slug: { equals: 'src-quantum' } } })
const schema = await call('getCollectionSchema', { slug: 'products' })
const refused = lead ? await call('updateDocument', { id: lead.id, slug: 'products', data: { _status: 'published' } }) : null
const developed = lead
  ? await call('updateDocument', { id: lead.id, slug: 'products', draft: true, data: { lead: { ...lead.lead, evidence } } })
  : null
const after = lead ? docOf((await call('findDocuments', { slug: 'products', draft: true, where: { id: { equals: lead.id } } })).text) : null
const published =
  lead && after?.lead?.verdict === 'VERIFIED' ? await call('updateDocument', { id: lead.id, slug: 'products', data: { _status: 'published' } }) : null
const variants = lead ? await call('countDocuments', { slug: 'variants', where: { product: { equals: lead.id } } }) : null

const line = (r: { error: boolean; text: string } | null) => (r ? `${r.error ? 'ERROR ' : ''}${r.text.replace(/\s+/g, ' ').slice(0, 220)}` : 'not run')
payload.logger.info({
  msg: 'catalog mcp use cases',
  tools: tools.length,
  findByPath: lead ? `product ${lead.id}, ${lead.lead?.verdict}` : line(byPath),
  countUnverified: line(unverified),
  category: line(category),
  schema: schema.error ? line(schema) : `${schema.text.length} chars`,
  publishUnverified: line(refused),
  giveEvidence: line(developed),
  verdictAfterEvidence: after?.lead?.verdict,
  publishVerified: line(published),
  variants: line(variants),
})
process.exit(0)
