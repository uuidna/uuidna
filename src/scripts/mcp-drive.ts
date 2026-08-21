#!/usr/bin/env node
// mcp-drive — THE SERVED SURFACE RECOMPUTES ITS OWN RECEIPTS, over its own wire. Spawns the shipped MCP
// (dist/mcp.js, stdio JSON-RPC — the exact transport a client speaks) and drives three computations through it:
// the 10 RFC 9562 uuid types addressed (nil, v1..v8, max), all 90 ordered mixes merged (merge is order-sensitive
// — the directed edge; 90 DISTINCT addresses or the fusion forgot its direction), and the full self-computation
// (uuidna_conformance: every theorem's DNA recomputes). Each stage folds to a quantum receipt; the mix fold is
// order-invariant, so the parallel pipe lands on the same root a sequential run does — scheduling cannot move it.
// Exit 1 on any broken invariant. Integrity, not truth: receipts of the served surface, not new mathematics.
import { spawn } from 'node:child_process'
import { createInterface } from 'node:readline'

const srv = spawn(process.execPath, ['dist/mcp.js'], { stdio: ['pipe', 'pipe', 'ignore'] })
const waiting = new Map<number, (m: { result?: { content: { text: string }[] }; error?: unknown }) => void>()
let seq = 0
createInterface({ input: srv.stdout! }).on('line', (line) => {
  const msg = JSON.parse(line) as { id?: number; result?: { content: { text: string }[] }; error?: unknown }
  if (msg.id !== undefined && waiting.has(msg.id)) { waiting.get(msg.id)!(msg); waiting.delete(msg.id) }
})
const rpc = (method: string, params: object): Promise<{ result?: { content: { text: string }[] }; error?: unknown }> =>
  new Promise((resolve) => { const id = ++seq; waiting.set(id, resolve); srv.stdin!.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n') })
const call = async (name: string, args: object): Promise<string> => {
  const r = await rpc('tools/call', { name, arguments: args })
  if (r.error) throw new Error(name + ': ' + JSON.stringify(r.error))
  return r.result!.content[0].text
}
const callJson = async <T>(name: string, args: object): Promise<T> => JSON.parse(await call(name, args)) as T

const TYPES = ['nil', 'v1_time_mac', 'v2_dce', 'v3_md5_name', 'v4_random', 'v5_sha1_name', 'v6_time_reordered', 'v7_unix_time', 'v8_custom', 'max']

await rpc('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'mcp-drive', version: '1' } })
const addresses = await Promise.all(TYPES.map((t) => call('uuidna_address', { text: 'uuid_type:' + t })))
const mixes = await Promise.all(TYPES.flatMap((_, i) => TYPES.filter((_, j) => j !== i).map((b) => call('uuidna_merge', { a: addresses[i], b: addresses[TYPES.indexOf(b)] }))))
const [typesFold, mixFold, conformance] = await Promise.all([
  call('uuidna_merkle_root', { leaves: addresses }),
  call('uuidna_merkle_root', { leaves: mixes }),
  callJson<{ conforms: boolean; passed: number; failed: number; receipt: string }>('uuidna_conformance', {}),
])
srv.kill()

const distinct = new Set(mixes).size
const failures: string[] = []
if (distinct !== 90) failures.push(`mix direction lost: ${distinct} distinct of 90 ordered — merge(a,b) must differ from merge(b,a)`)
if (!conformance.conforms) failures.push(`self-computation refused: conformance failed=${conformance.failed}`)

console.log(JSON.stringify({
  types: TYPES.length, ordered_mixes: mixes.length, distinct, unordered: 45, lattice: 2 ** TYPES.length,
  quantum_receipts: { types_fold: typesFold, mix_fold: mixFold, self_conformance: conformance.receipt },
  conforms: conformance.conforms,
}))
for (const f of failures) console.error('✗ mcp-drive — ' + f)
if (failures.length > 0) process.exit(1)
console.log('✓ mcp-drive — the served surface recomputed its receipts over its own wire: 3 folds, 90 directed mixes, self conforms.')
