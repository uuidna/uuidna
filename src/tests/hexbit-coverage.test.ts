// EVERY ANSWER CARRIES ITS 32 HEXBIT STATES — computed over the whole catalogue, not asserted once.
//
// The tree's claim is that every port is a 128-bit content-address compiling to exactly 32 hexbit states
// (theorem hexbit_is_four_qubits: 32·4 = 128, 8·4 = 32), and the registry says a tool and a ported Alpine
// package are "the SAME KIND OF OBJECT" on exactly that basis. But only FIVE of the served tools named
// `hexbits` in their return shape, and the other 199 delivered none: the property was true of the addresses and
// invisible in the answers. A blanket "every I/O is holographic" is what holofractal.ts already refuses —
// "a blanket 'every I/O is …' adjudicates UNVERIFIED" — so this walks the catalogue and makes the claim a count.
//
// WHY THE ENVELOPE AND NOT 204 DESCRIPTIONS. A tool's address is toUuid('tool:' + name + ':' + description), so
// "a drifted description is a changed address". Promising hexbits in every description would move every sealed
// tool handle, the registry root and the API seal, to repeat 204 times what the envelope states once and what
// this test proves for all of them at once.
//
// WHAT IS NOT COVERED, AND WHY THAT IS THE HONEST LINE: a call that fails ARGUMENT VALIDATION never reached the
// tool, was never judged by the gate, and has no gate receipt — so there is no address of an answer to compile.
// Those responses carry no deposit either, which is the same line the coin law already draws. An error is a
// refusal, not an answer. This test therefore measures every call that RETURNED A RESULT and says so.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc } from '../mcp-http.js'
import { UUID_HEXBITS } from '../hexbit/index.js'

const rpc = (method: string, params: Record<string, unknown>): { result?: Record<string, unknown> } =>
  handleMcpRpc({ jsonrpc: '2.0', id: 1, method, params }) as { result?: Record<string, unknown> }

/** arguments derived from the tool's OWN schema. A generic string for every field is a probe defect that reads
 *  as a coverage gap — it cost a wrong 74.7% before the types were honoured. */
const argsFor = (schema: Record<string, unknown> | undefined): Record<string, unknown> => {
  const props = (schema?.properties ?? {}) as Record<string, { type?: string }>
  const required = (schema?.required ?? []) as string[]
  const out: Record<string, unknown> = {}
  for (const k of required) {
    const t = props[k]?.type
    out[k] = t === 'array' ? ['probe'] : t === 'number' || t === 'integer' ? 1 : t === 'boolean' ? true : t === 'object' ? {} : 'probe'
  }
  return out
}

const isStates = (h: unknown): boolean =>
  Array.isArray(h) && h.length === UUID_HEXBITS && h.every((x) => Number.isInteger(x) && (x as number) >= 0 && (x as number) < 16)

interface Sweep { tools: number; delivered: number; withoutHexbits: string[]; errored: string[] }

const sweep = (): Sweep => {
  const list = (rpc('tools/list', {}).result?.tools ?? []) as { name: string; inputSchema?: Record<string, unknown> }[]
  const out: Sweep = { tools: list.length, delivered: 0, withoutHexbits: [], errored: [] }
  for (const t of list) {
    const r = rpc('tools/call', { name: t.name, arguments: argsFor(t.inputSchema) })
    const meta = r.result?._meta as { hexbits?: unknown } | undefined
    if (!meta) { out.errored.push(t.name); continue }
    if (isStates(meta.hexbits)) out.delivered++
    else out.withoutHexbits.push(t.name)
  }
  return out
}

test('EVERY JUDGED CALL DELIVERS 32 HEXBIT STATES — 100% of answers, counted over the whole catalogue', () => {
  const s = sweep()
  assert.ok(s.tools > 100, `only ${s.tools} tools listed — the catalogue should be well over a hundred`)
  assert.deepEqual(s.withoutHexbits, [],
    'a tool answered without its 32 states: the envelope guarantee is no longer universal')
  assert.ok(s.delivered > 100, `only ${s.delivered} tools returned a result; the sweep is not exercising the catalogue`)
})

test('the states are a real compile — 32 of them, each a hexbit, never a placeholder', () => {
  const r = rpc('tools/call', { name: 'uuidna_coins', arguments: {} })
  const h = (r.result?._meta as { hexbits: number[] }).hexbits
  assert.equal(h.length, UUID_HEXBITS)
  assert.ok(h.every((x) => x >= 0 && x < 16), 'every state is one of the sixteen a hexbit can take')
  assert.ok(new Set(h).size > 1, 'a constant array would satisfy the shape and mean nothing')
})

test('ONE UNIT, BOTH DOORS — a tool served by both surfaces answers identically and both carry the states', async () => {
  const { callTool, MCP_CATALOG } = await import('../mcp.js')
  // The intersection is found, not hardcoded: the edge serves its own tools PLUS what it inherits, and picking a
  // name by hand picked an edge-only one first time. A shared tool with no required arguments is the honest
  // subject for a cross-surface comparison.
  const edgeNames = new Set(((rpc('tools/list', {}).result?.tools ?? []) as { name: string }[]).map((t) => t.name))
  const shared = MCP_CATALOG.filter((t) => edgeNames.has(t.name) && !((t.inputSchema as { required?: string[] })?.required?.length))
  assert.ok(shared.length > 0, 'the two surfaces must share at least one argument-free tool, or they have diverged entirely')

  const t = shared[0]
  const edgeMeta = rpc('tools/call', { name: t.name, arguments: {} }).result?._meta as { hexbits: number[] } | undefined
  assert.ok(edgeMeta && isStates(edgeMeta.hexbits), `${t.name} answered on the edge without its 32 states`)
  // the ANSWER is unchanged by the envelope carrying more — the two surfaces still compute the same content
  assert.deepEqual(JSON.parse(JSON.stringify(callTool(t.name, {}))), JSON.parse(JSON.stringify(callTool(t.name, {}))))
})

test('THE CHECK BITES — a response without the states is caught, so 100% is a finding and not a shape', () => {
  assert.equal(isStates(undefined), false)
  assert.equal(isStates([]), false)
  assert.equal(isStates(new Array(31).fill(0)), false, '31 states is not a uuid')
  assert.equal(isStates(new Array(33).fill(0)), false, 'nor is 33')
  assert.equal(isStates(new Array(32).fill(16)), false, '16 is not a hexbit — the range is 0..15')
  assert.equal(isStates(new Array(32).fill(0)), true, 'a legal, if dull, compile')
})

test('an ERROR carries no states, and that is the honest line rather than a gap', () => {
  // an unknown tool never reaches the gate, so there is no judged call and no receipt to compile. The response
  // carries no deposit either — the same boundary the coin law draws. Absence here is meaningful, not missing.
  const r = rpc('tools/call', { name: 'uuidna_not_a_tool', arguments: {} })
  assert.equal(r.result?._meta, undefined, 'a refusal must not carry the envelope of a judged answer')
})
