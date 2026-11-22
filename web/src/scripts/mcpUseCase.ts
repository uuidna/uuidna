import { PROSE, proseFill } from '@uuidna/qpu/prose'
import { randomBytes } from 'crypto'
import { getPayload } from 'payload'

import config from '@payload-config'

/** The ecommerce catalog as an MCP use case, against a running app: `pnpm payload run src/scripts/mcpUseCase.ts`
 *  (MCP_URL defaults to http://localhost:3000/api/mcp). The admin from queueLegacyLeads gets a user API key, which the
 *  script keeps in memory only, and plugin-mcp is asked as a client asks: tools/list, a product read, a qpu catalogue tool, a uuidna door. */
const url = process.env.MCP_URL || 'http://localhost:3000/api/mcp'
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@qpu.localhost'
const payload = await getPayload({ config })

const admin = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true, where: { email: { equals: email } } })).docs[0]
if (!admin?.roles?.includes('admin')) throw new Error(proseFill(PROSE.scriptsMcpUseCase_s1, email))
const apiKey = randomBytes(24).toString('hex')
await payload.update({
  id: admin.id,
  collection: 'users',
  // useAPIKey adds these auth fields at runtime; the generated User type does not list them
  data: { apiKey, enableAPIKey: true } as Record<string, unknown>,
  user: { ...admin, collection: 'users' },
})

let id = 0
// anonymous: no key, as a public connector asks
const rpc = async (method: string, params: Record<string, unknown> = {}, anonymous = false) => {
  const res = await fetch(url, {
    body: JSON.stringify({ id: ++id, jsonrpc: '2.0', method, params }),
    headers: {
      accept: PROSE.scriptsMcpUseCase_accept2,
      ...(anonymous ? {} : { authorization: `users API-Key ${apiKey}` }),
      'content-type': 'application/json',
    },
    method: 'POST',
  })
  const text = await res.text()
  const json = text.trimStart().startsWith('{') ? text : (text.split('\n').filter((l) => l.startsWith('data:')).pop()?.slice(5) ?? '{}')
  return { status: res.status, body: JSON.parse(json) as { error?: { message?: string }; result?: Record<string, unknown> } }
}

const init = await rpc('initialize', { capabilities: {}, clientInfo: { name: 'qpu-mcp-use-case', version: '1' }, protocolVersion: '2025-06-18' })
const list = await rpc('tools/list')
const tools = ((list.body.result?.tools as { name: string }[] | undefined) ?? []).map((t) => t.name)
const find = tools.find((n) => /^find/i.test(n) && /product/i.test(n)) ?? tools.find((n) => n === 'findDocuments')
const products = find ? await rpc('tools/call', { arguments: find === 'findDocuments' ? { slug: 'products' } : {}, name: find }) : null
const qpu = await rpc('tools/call', { arguments: { uuid: '00000000-0000-4000-8000-000000000000' }, name: 'verify' })
const door = await rpc('tools/call', { arguments: { arguments: { input: '2 + 2 = 4' }, name: 'decide_expression' }, name: 'uuidna' })
// the anonymous view: what a client without a key may list and call
const anonList = await rpc('tools/list', {}, true)
const anonTools = ((anonList.body.result?.tools as { name: string }[] | undefined) ?? []).map((t) => t.name)
const anonProducts = await rpc('tools/call', { arguments: { slug: 'products' }, name: 'findDocuments' }, true)
const anonUsers = await rpc('tools/call', { arguments: { slug: 'users' }, name: 'findDocuments' }, true)
// UI and MCP agree: each stored program, asked again at /api/mcp, answers the outcome its hook stored
const stored = [
  ...(await payload.find({ collection: 'products', depth: 0, limit: 20, overrideAccess: true, where: { 'quantum.receipt': { exists: true } } })).docs,
  ...(await payload.find({ collection: 'variants', depth: 0, limit: 20, overrideAccess: true, where: { 'quantum.receipt': { exists: true } } })).docs,
]
const agreement = await Promise.all(
  stored.map(async (d) => {
    const r = await rpc('tools/call', { arguments: d.quantum?.program, name: 'circuit' }, true)
    return { title: d.title, receipt: d.quantum?.receipt, equal: JSON.stringify(r.body.result?.structuredContent) === JSON.stringify(d.quantum?.outcome) }
  }),
)
// an agent orders one run through the MCP door, with its key: the order hook runs the line's program
const bell = (await payload.find({ collection: 'variants', depth: 0, limit: 1, overrideAccess: true, where: { title: { equals: PROSE.scriptsMcpUseCase_equals3 } } })).docs[0]
const ordered = bell
  ? await rpc('tools/call', {
      arguments: { slug: 'orders', documents: [{ data: { amount: 0, currency: 'USD', customer: admin.id, items: [{ product: bell.product, quantity: 1, variant: bell.id }] } }] },
      name: 'createDocuments',
    })
  : null
const order = (await payload.find({ collection: 'orders', depth: 0, limit: 1, overrideAccess: true, sort: '-createdAt' })).docs[0]
const textOf = (r: typeof door | null) =>
  ((r?.body.result?.content as { text?: string }[] | undefined) ?? []).map((c) => c.text ?? '').join(' ').slice(0, 240)

payload.logger.info({
  msg: 'mcp use case',
  initialize: init.status,
  tools: tools.length,
  toolNames: tools.slice(0, 40),
  productsTool: find,
  products: textOf(products),
  qpuVerify: textOf(qpu),
  uuidnaDoor: textOf(door),
  anonymousTools: anonTools.length,
  anonymousCollectionTools: anonTools.filter((n) => /^[a-z]+[A-Z]/.test(n) && !/^echo_/.test(n)),
  anonymousProducts: textOf(anonProducts).slice(0, 80),
  anonymousUsers: textOf(anonUsers).slice(0, 120) || anonUsers.body.error?.message,
  agreement,
  orderAnswer: textOf(ordered).slice(0, 160),
  orderRuns: order?.runs?.map((r) => ({ item: r.item, receipt: r.receipt, outcome: r.outcome, equalsVariant: JSON.stringify(r.outcome) === JSON.stringify(bell?.quantum?.outcome) })),
  errors: [list, products, qpu, door].map((r) => r?.body.error?.message).filter(Boolean),
})
process.exit(0)
