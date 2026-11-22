import { PROSE, proseFill } from '@uuidna/qpu/prose'
import { execFileSync } from 'child_process'
import { readFileSync } from 'fs'
import { getPayload } from 'payload'

import config from '@payload-config'
import { PRODUCT_CLAIMS, type ProductClaim, type Shots } from '@/products/claims'

/** Close each product of src/products/claims.ts as ISO/IEC 25051:2014 5.1 describes it, against a running app
 *  (MCP_URL, default http://localhost:3000/api/mcp): `pnpm payload run src/scripts/closeProducts.ts`. Everything said
 *  comes through the MCP door: textbook { theorem } gives each cited theorem's inline doc (a function's test prompt),
 *  its module's doc (the work task) and the axioms the kernel reports; circuit gives each outcome; tools/list the gate
 *  set. Products and variants are written through the Local API as LEGACY_ADMIN_EMAIL, so hooks and access run; each
 *  variant's hook must store the outcome the door answers, and the description cites the receipt it stores. A function
 *  no theorem doc states ships as a known limitation. */
const url = process.env.MCP_URL || 'http://localhost:3000/api/mcp'
const email = process.env.LEGACY_ADMIN_EMAIL || 'legacy-leads@qpu.localhost'
const payload = await getPayload({ config })
const admin = (await payload.find({ collection: 'users', limit: 1, overrideAccess: true, where: { email: { equals: email } } })).docs[0]
if (!admin?.roles?.includes('admin')) throw new Error(proseFill(PROSE.scriptsCloseProducts_s1, email))
const user = { ...admin, collection: 'users' as const }
const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' }).trim()

// the MCP door, asked as an anonymous client asks it
let id = 0
const rpc = async (method: string, params: Record<string, unknown> = {}) => {
  const res = await fetch(url, {
    body: JSON.stringify({ id: ++id, jsonrpc: '2.0', method, params }),
    headers: { accept: PROSE.scriptsCloseProducts_accept2, 'content-type': 'application/json' },
    method: 'POST',
  })
  const body = await res.text()
  const parsed = JSON.parse(body.trimStart().startsWith('{') ? body : (body.split('\n').filter((l) => l.startsWith('data:')).pop()?.slice(5) ?? '{}')) as {
    error?: { message?: string }
    result?: Record<string, unknown> & { isError?: boolean; structuredContent?: unknown }
  }
  if (parsed.error || parsed.result?.isError) throw new Error(`${url} ${method}: ${parsed.error?.message ?? JSON.stringify(parsed.result)}`)
  return parsed.result!
}
const tool = async <T>(name: string, args: Record<string, unknown>) => (await rpc('tools/call', { arguments: args, name })).structuredContent as T

// identification (5.1.3.1)
const server = (await rpc('initialize', { capabilities: {}, clientInfo: { name: 'qpu-close-products', version: '1' }, protocolVersion: '2025-06-18' })).serverInfo as { name: string; version: string }
const version = `qpu app ${(JSON.parse(readFileSync('package.json', 'utf8')) as { version: string }).version}, MCP server ${server.name} ${server.version}`
const date = git('log', '-1', '--format=%cs', 'HEAD')
const tools = (await rpc('tools/list')).tools as { inputSchema: { properties?: { operations?: { items?: { properties?: { gate?: { enum?: string[] } } } } } }; name: string }[]
const gates = tools.find((t) => t.name === 'circuit')?.inputSchema.properties?.operations?.items?.properties?.gate?.enum ?? []

type Theorem = { accepted: boolean; axioms: string[] | null; module: string | null; moduleDoc: string | null; says: string | null; theorem: string }
const flat = (s: string) => s.replace(/\s+/g, ' ').trim()
const line = (x: number) => ({ kind: 'line', x })
const FAMILIES: Record<ProductClaim['family'], (n: number) => { operations: unknown[] }> = {
  ghz: (n) => ({ operations: [{ gate: 'H', qubits: [line(0)] }, ...Array.from({ length: n - 1 }, (_, i) => ({ gate: 'CNOT', qubits: [line(i), line(i + 1)] }))] }),
}
const programOf = (claim: ProductClaim, n: number, shots: Shots) =>
  shots === 'exact' ? FAMILIES[claim.family](n) : { ...FAMILIES[claim.family](n), measure: { key: 'm', qubits: Array.from({ length: n }, (_, i) => line(i)) }, repetitions: shots }
const shotsLabel = (shots: Shots) => (shots === 'exact' ? 'exact state vector' : `${shots} shots`)
/** the exact outcome checked against the statement: support exactly {0…0, 1…1} with equal weight */
const holds = (n: number, outcome: { amplitudes?: { im: number; re: number }[] }) => {
  const weight = (outcome.amplitudes ?? []).map((a) => a.re * a.re + a.im * a.im)
  const support = weight.flatMap((w, i) => (w > 1e-12 ? [i] : []))
  return support.join() === `0,${2 ** n - 1}` && Math.abs(weight[0]! - weight[2 ** n - 1]!) < 1e-12
}

// Lexical, as the description's editor stores it
const text = (t: string, bold = false) => ({ type: 'text', detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '', text: t, version: 1 })
const block = { direction: 'ltr', format: '', indent: 0, version: 1 }
const heading = (t: string) => ({ ...block, type: 'heading', tag: 'h3', children: [text(t)] })
const paragraph = (t: string) => ({ ...block, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(t)] })
const list = (items: ReturnType<typeof text>[][]) => ({
  ...block, type: 'list', listType: 'bullet', start: 1, tag: 'ul',
  children: items.map((parts, i) => ({ ...block, type: 'listitem', value: i + 1, children: parts })),
})
const item = (label: string, ...parts: string[]) => [text(`${label}: `, true), ...parts.map((p, i) => text(p, i % 2 === 1))]

const findOrCreate = async (collection: 'variantOptions' | 'variantTypes', where: Record<string, unknown>, data: Record<string, unknown>) =>
  ((await payload.find({ collection, depth: 0, limit: 1, user, where: where as never })).docs[0] ?? (await payload.create({ collection, data: data as never, user }))) as unknown as { id: string; name?: string }

for (const claim of PRODUCT_CLAIMS) {
  // the product's own variant types first, so its existing variants are the ones updated
  const found = (await payload.find({ collection: 'products', depth: 1, draft: true, limit: 1, user, where: { slug: { equals: claim.slug } } })).docs[0]
  const own = (found?.variantTypes ?? []).flatMap((t) => (typeof t === 'object' ? [t] : []))
  const typeOf = async (name: string, label: string) => own.find((t) => t.name === name) ?? (await findOrCreate('variantTypes', { name: { equals: name } }, { label, name }))
  const [qubitsType, shotsType] = [await typeOf('qubits', 'Qubits'), await typeOf('shots', 'Shots')]
  const option = async (type: string, value: string, label: string) =>
    (await findOrCreate('variantOptions', { and: [{ variantType: { equals: type } }, { value: { equals: value } }] }, { label, value, variantType: type })).id

  const cited: Record<string, Theorem> = {}
  for (const key of new Set(Object.values(claim.theorems))) cited[key] = await tool<Theorem>('textbook', { theorem: key })
  const modules = [...new Map(Object.values(cited).flatMap((t) => (t.module && t.moduleDoc ? [[t.module, t.moduleDoc] as const] : []))).values()].map((doc) => ({
    component: doc.match(/---\s*\n[\s\S]*?component:\s*([^\n]+)[\s\S]*?\n---/)?.[1]?.trim(),
    body: flat(doc.replace(/^\s*#.*$/m, '').replace(/---\s*\n[\s\S]*?\n---/, '')),
  }))

  // the product, then each variant: its hook stores the outcome and receipt, and the outcome must be the door's answer
  const base = { title: claim.title, slug: claim.slug, enableVariants: true, variantTypes: [qubitsType.id, shotsType.id], quantum: { program: programOf(claim, claim.qubits[0]!, claim.shots[0]!) }, _status: 'published' as const }
  const product = found ? await payload.update({ id: found.id, collection: 'products', data: base, draft: false, user }) : await payload.create({ collection: 'products', data: base, draft: false, user })
  const existing = (await payload.find({ collection: 'variants', depth: 0, limit: 100, user, where: { product: { equals: product.id } } })).docs
  const runs = []
  for (const n of claim.qubits)
    for (const shots of claim.shots) {
      const program = programOf(claim, n, shots)
      const outcome = await tool<{ amplitudes?: { im: number; re: number }[] }>('circuit', program)
      const options = [await option(qubitsType.id, String(n), `${n} qubits`), await option(shotsType.id, String(shots), shotsLabel(shots))]
      const same = existing.find((v) => { const ids = (v.options ?? []).map((o) => (typeof o === 'object' ? o.id : o)); return ids.length === options.length && options.every((o) => ids.includes(o)) })
      const data = { product: product.id, options, quantum: { program }, _status: 'published' as const }
      const stored = same ? await payload.update({ id: same.id, collection: 'variants', data, user }) : await payload.create({ collection: 'variants', data, user })
      if (JSON.stringify(stored.quantum?.outcome) !== JSON.stringify(outcome)) throw new Error(proseFill(PROSE.scriptsCloseProducts_s3, stored.id))
      const theorem = shots === 'exact' && claim.theorems[n] ? cited[claim.theorems[n]] : undefined
      runs.push({ holds: shots === 'exact' && holds(n, outcome), label: `${n} qubits, ${shotsLabel(shots)}`, receipt: stored.quantum?.receipt, theorem: theorem?.accepted && theorem.says ? theorem : undefined })
    }
  const axioms = (t: Theorem) => (t.axioms === null ? 'axioms not reported' : t.axioms.length ? `depends on ${t.axioms.join(', ')}` : 'depends on no axioms')

  const description = { root: { ...block, type: 'root', children: [
    heading('Identification'),
    list([item('Name', claim.title), item('Version', version), item('Date', date), item('Variants', runs.map((r) => r.label).join('; ')), ...modules.flatMap((m) => (m.component ? [item('Component', m.component)] : []))]),
    heading('Work task'),
    ...modules.map((m) => paragraph(m.body)),
    heading('Functions and their tests'),
    // a Lean doc is a phrase; it closes as a sentence so the test that follows reads apart
    list(runs.flatMap((r) => (r.theorem ? [item(r.label, flat(r.theorem.says!).replace(/([^.!?])$/, '$1.'), ' Test: ', proseFill(PROSE.scriptsCloseProducts_s4, r.theorem.theorem, r.theorem.module, axioms(r.theorem), r.holds ? 'holds' : 'does not hold', r.receipt))] : []))),
    heading('Limits and known limitations'),
    list([item('Gate set', gates.join(', ')), ...runs.flatMap((r) => (r.theorem ? [] : [item(r.label, proseFill(PROSE.scriptsCloseProducts_s5, r.receipt), ' Closes when ', PROSE.scriptsCloseProducts_s6)]))]),
    heading('Support'),
    list([item('MCP', '/api/mcp'), item('Repository', git('remote', 'get-url', 'origin'))]),
    heading('Maintenance'),
    list([item('Generated by', PROSE.scriptsCloseProducts_s7)]),
  ] } }
  await payload.update({ id: product.id, collection: 'products', data: { description: description as never }, draft: false, user })
  payload.logger.info({ msg: 'product closed', slug: claim.slug, product: product.id, stated: runs.filter((r) => r.theorem).length, unstated: runs.filter((r) => !r.theorem).length, holds: runs.every((r) => !r.theorem || r.holds), version })
}
process.exit(0)
