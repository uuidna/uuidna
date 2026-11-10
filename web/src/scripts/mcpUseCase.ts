import { randomBytes } from 'crypto'
import { getPayload } from 'payload'

import config from '@payload-config'

/** The ecommerce catalog as an MCP use case, against a running app: `pnpm payload run src/scripts/mcpUseCase.ts`
 *  (MCP_URL defaults to http://localhost:3000/api/mcp). The admin from queueLegacyLeads gets a user API key, which the
 *  script keeps in memory only, and plugin-mcp is asked as a client asks: tools/list, a product read, a uuidna door. */
const url = process.env.MCP_URL || 'http://localhost:3000/api/mcp'
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@uuidna.localhost'
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
  return { status: res.status, body: JSON.parse(json) as { error?: { message?: string }; result?: Record<string, unknown> } }
}

const init = await rpc('initialize', { capabilities: {}, clientInfo: { name: 'uuidna-mcp-use-case', version: '1' }, protocolVersion: '2025-06-18' })
const list = await rpc('tools/list')
const tools = ((list.body.result?.tools as { name: string }[] | undefined) ?? []).map((t) => t.name)
const find = tools.find((n) => /^find/i.test(n) && /product/i.test(n)) ?? tools.find((n) => n === 'findDocuments')
const products = find ? await rpc('tools/call', { arguments: find === 'findDocuments' ? { slug: 'products' } : {}, name: find }) : null
const door = await rpc('tools/call', { arguments: { arguments: { input: '2 + 2 = 4' }, name: 'decide_expression' }, name: 'uuidna' })
const textOf = (r: typeof door | null) =>
  ((r?.body.result?.content as { text?: string }[] | undefined) ?? []).map((c) => c.text ?? '').join(' ').slice(0, 240)

payload.logger.info({
  msg: 'mcp use case',
  initialize: init.status,
  tools: tools.length,
  toolNames: tools.slice(0, 40),
  productsTool: find,
  products: textOf(products),
  uuidnaDoor: textOf(door),
  errors: [list, products, door].map((r) => r?.body.error?.message).filter(Boolean),
})
process.exit(0)
