// mcp-door — COVER ALL WITH MINIMAL KEYS, IN MCP'S OWN WORDS, HELD BY INSTRUMENTS THAT CAN FAIL.
//
// tools/list now carries list_tools, call_tool and the tools the server's instructions name (src/mcp-door.ts).
// Held here: every tool the old listing carried is still reachable (list_tools {} and the first door's {} answer
// every one, and tools/call takes every name); list_tools {name} is the contract a direct tools/list row carries;
// a call through call_tool {name, arguments}, through the first door's uuidna_call {op, args}, and made directly
// return exactly the same answer, gate receipt and deposit; an unknown name is the same JSON-RPC error every way;
// and every name either surface answers to is one the Claude API accepts. Each check has a control: a door that
// loses a tool is caught, and a tool that is itself non-deterministic is named as such, never counted as agreement.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MCP_CATALOG, MCP_LISTED, TOOL_NAMES, STANDARD_NAMES, callTool, resolveToolName, wireRowOf, indexRowOf } from './mcp.js'
import { handleMcpRpc, mcpHttpToolNames, mcpHttpCatalogue, mcpHttpListedNames } from './mcp-http.js'
import { DOOR, DOOR_NAME, DOOR_DESCRIPTION, LIST, LIST_NAME, LIST_DESCRIPTION, CONNECT, idOf, doorIndex, listedOf, namedIn, openDoor, isDoorTool, type DoorRow, type ListRow } from './mcp-door.js'
import { wireBytes, WIRE_CAP, sealedBudget } from './mcp-wire.js'
import { contextGaps } from './scripts/context-budget.js'

type Rpc = { result?: { content?: { text: string }[]; isError?: boolean; _meta?: { gate?: { receipt: string }; deposit?: { id: string } } }; error?: { code: number; message: string } }
const settle = async (r: unknown): Promise<Rpc> => (r && typeof (r as { then?: unknown }).then === 'function' ? await (r as Promise<Rpc>) : r as Rpc)
const edge = (name: string, args: Record<string, unknown>): Promise<Rpc> =>
  settle(handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }))
/** the first door, in its own keys */
const viaDoor = (op: string, args: Record<string, unknown>): Promise<Rpc> => edge(DOOR, Object.keys(args).length ? { op, args } : { op })
/** call_tool, in tools/call's own keys */
const viaCall = (name: string, args: Record<string, unknown>): Promise<Rpc> => edge(DOOR_NAME, { name, arguments: args })
const parsed = <T>(r: Rpc): T => JSON.parse(r.result!.content![0]!.text) as T
/** what a caller reads: the answer block and the ledger line (the edge line carries gate and deposit, no chained receipt) */
const answer = (r: Rpc): string => JSON.stringify({ content: r.result?.content, error: r.error, isError: r.result?.isError })
const required = (s: unknown): string[] => (s as { required?: string[] } | undefined)?.required ?? []
/** the contract fields tools/list serves for one tool */
const contract = (r: Partial<DoorRow>) => ({ name: r.name, title: r.title, description: r.description, inputSchema: r.inputSchema, annotations: r.annotations })

/** the Claude API refuses a tool name outside this */
const NAME = /^[a-z][a-z0-9_]{0,63}$/

test('the listing is derived: list_tools, call_tool, then exactly the served tools the instructions name', () => {
  const init = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'initialize' }) as { result: { instructions: string } }
  const served = mcpHttpToolNames()
  // the instructions name every tool by its STANDARD name, carry the one connect sentence, and name only served tools
  assert.deepEqual(init.result.instructions.match(/\buuidna_[a-z0-9_]+/g) ?? [], [], 'the edge instructions still name a tool by its old name')
  assert.ok(init.result.instructions.includes(CONNECT), 'the edge instructions do not name list_tools and call_tool')
  const servedNames = served.map((n) => STANDARD_NAMES[n] ?? n)
  const everyName = Object.values(STANDARD_NAMES)
  assert.deepEqual(namedIn(init.result.instructions, everyName).filter((n) => !servedNames.includes(n)), [], 'the edge instructions name a tool it does not serve')
  assert.deepEqual(mcpHttpListedNames(), [LIST_NAME, DOOR_NAME, ...namedIn(init.result.instructions, servedNames).filter((n) => !isDoorTool(n))])
  // stdio: the two doors first, every listed name a catalogue tool, and each door's own row unclipped
  assert.deepEqual(MCP_LISTED.slice(0, 2).map((t) => t.name), [LIST_NAME, DOOR_NAME])
  for (const t of MCP_LISTED) assert.ok(TOOL_NAMES.includes(resolveToolName(t.name) ?? ''), `${t.name} is listed but not in the catalogue`)
  assert.equal(MCP_LISTED[0]!.description, LIST_DESCRIPTION, 'list_tools says what it answers in full, never a clipped fragment')
  assert.equal(MCP_LISTED[1]!.description, DOOR_DESCRIPTION, 'call_tool says what it runs in full, never a clipped fragment')
  for (const d of [DOOR_DESCRIPTION, LIST_DESCRIPTION]) assert.ok(d.length <= WIRE_CAP)
  // CONTROL: a text naming nothing lists the two doors alone
  assert.deepEqual(listedOf(MCP_LISTED, 'no names here').map((t) => t.name), [LIST_NAME, DOOR_NAME])
})

test('COVERAGE: list_tools {} and the first door\'s {} both answer every tool the surface serves', async () => {
  // stdio — the first door's index is the catalogue, row for row, with the contract tools/list serves
  const stdio = callTool(DOOR, {}) as { count: number; tools: DoorRow[] }
  assert.equal(stdio.count, MCP_CATALOG.length)
  for (const t of MCP_CATALOG) {
    const row = stdio.tools.find((r) => r.name === (STANDARD_NAMES[t.name] ?? t.name))
    assert.ok(row, `${t.name} is not reachable through the stdio door`)
    assert.equal(row.description, wireRowOf(t).description)
    assert.deepEqual(row.inputSchema, t.inputSchema)
  }
  // list_tools {} — tools/list's own three fields, for every catalogue tool, and nothing else
  const brief = callTool(LIST, {}) as { tools: ListRow[] }
  assert.deepEqual(brief.tools.map((r) => r.name), MCP_CATALOG.map((t) => STANDARD_NAMES[t.name] ?? t.name))
  for (const r of brief.tools) assert.deepEqual(Object.keys(r), ['name', 'title', 'description'], `${r.name}: list_tools {} carries more than tools/list's own fields`)
  // edge — the same over the protocol, against every tool this surface serves
  const names = mcpHttpToolNames().map((n) => STANDARD_NAMES[n] ?? n)
  const index = parsed<{ count: number; tools: DoorRow[] }>(await edge(DOOR, {}))
  assert.deepEqual(index.tools.map((t) => t.name), names)
  assert.deepEqual(index.tools, JSON.parse(JSON.stringify(doorIndex(mcpHttpCatalogue()).tools)))
  const edgeBrief = parsed<{ tools: ListRow[] }>(await edge(LIST_NAME, {}))
  assert.deepEqual(edgeBrief.tools.map((t) => t.name), names)
  // CONTROL: an index missing one tool is caught by the same comparison
  const short = doorIndex(mcpHttpCatalogue().slice(1))
  assert.notDeepEqual(short.tools.map((t) => t.name), names)
})

test('list_tools {name} is the direct contract: the tools/list row, plus the actual answer\'s shape and example', async () => {
  // stdio — every catalogue tool, by its standard name and by its old name
  for (const t of MCP_CATALOG) {
    const byStd = callTool(LIST, { name: STANDARD_NAMES[t.name] }) as DoorRow
    assert.deepEqual(contract(byStd), contract(wireRowOf(t)), `${t.name}: list_tools {name} is not the contract tools/list serves`)
    assert.deepEqual(byStd, indexRowOf(t), `${t.name}: list_tools {name} lost the shape or example of its actual answer`)
    assert.deepEqual(callTool(LIST, { name: t.name }), byStd, `${t.name}: the old name reads a different contract`)
  }
  // edge — every tool tools/list carries there, against the row it carries
  const listed = (handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: DoorRow[] } }).result.tools
  for (const row of listed) {
    const got = parsed<DoorRow>(await edge(LIST_NAME, { name: row.name }))
    assert.deepEqual(contract(got), contract(JSON.parse(JSON.stringify(row))), `${row.name}: the edge's list_tools {name} differs from its tools/list row`)
    assert.equal(got.handle, row.handle, `${row.name}: the contract handle differs`)
  }
  // CONTROL: a row with one field changed is caught by the same comparison
  const coprime = MCP_CATALOG.find((t) => t.name === 'uuidna_coprime')!
  assert.notDeepEqual(contract({ ...wireRowOf(coprime), description: 'x' }), contract(wireRowOf(coprime)))
})

test('{query} and the first door\'s {q} find tools by every word; a word nothing carries finds nothing', async () => {
  const found = parsed<{ q: string; count: number; tools: DoorRow[] }>(await edge(DOOR, { q: 'merkle' }))
  assert.ok(found.count > 0)
  for (const t of found.tools) {
    assert.match([t.name, ...(t.aliases ?? []), t.title ?? '', t.description].join(' ').toLowerCase(), /merkle/)
    assert.ok(t.inputSchema, `${t.name} came back without its schema`)
  }
  assert.ok(found.tools.some((t) => t.aliases?.includes('uuidna_merkle_root')))
  // list_tools {query} finds the same tools, in tools/list's own fields
  const q = parsed<{ query: string; tools: ListRow[] }>(await edge(LIST_NAME, { query: 'merkle' }))
  assert.deepEqual(q.tools.map((t) => t.name), found.tools.map((t) => t.name))
  // a search by an OLD name finds the tool it still calls, either way
  const byOld = parsed<{ tools: DoorRow[] }>(await edge(DOOR, { q: 'uuidna_hologram' }))
  assert.deepEqual(byOld.tools.map((t) => t.name), [STANDARD_NAMES['uuidna_hologram']])
  assert.deepEqual(parsed<{ tools: ListRow[] }>(await edge(LIST_NAME, { query: 'uuidna_hologram' })).tools.map((t) => t.name), [STANDARD_NAMES['uuidna_hologram']])
  assert.equal(doorIndex(mcpHttpCatalogue(), 'zzqqxx-no-tool-says-this').count, 0)
  assert.deepEqual(parsed<{ tools: ListRow[] }>(await edge(LIST_NAME, { query: 'zzqqxx-no-tool-says-this' })).tools, [])
})

test('COMPATIBILITY: every zero-argument edge tool answers alike directly, through call_tool and through uuidna_call', async (t) => {
  const zero = mcpHttpCatalogue().filter((c) => !isDoorTool(idOf(c)) && required(c.inputSchema).length === 0)
  const differs: string[] = [], varies: string[] = []
  for (const c of zero) {
    const direct = answer(await edge(c.name, {}))
    const call = answer(await viaCall(c.name, {}))
    const door = answer(await viaDoor(c.name, {}))
    if (direct === call && direct === door) continue
    // THE CONTROL: a tool that answers differently to itself (live hardware, live network) is named, not counted
    if (answer(await edge(c.name, {})) !== direct) { varies.push(c.name); continue }
    differs.push(c.name)
  }
  assert.deepEqual(differs, [], 'these deterministic tools answer differently through a door — the door is not transparent')
  assert.ok(zero.length - varies.length > 40, `only ${zero.length - varies.length} deterministic zero-argument tools were compared`)
  t.diagnostic(`direct ≡ call_tool ≡ uuidna_call on ${zero.length - varies.length} deterministic zero-argument edge tools; varying by themselves: ${varies.join(', ') || 'none'}`)
})

test('COMPATIBILITY: with arguments and refusals — direct, call_tool {name, arguments}, uuidna_call {op, args}: one answer, one receipt, one deposit', async () => {
  const sample: [string, Record<string, unknown>][] = [
    ['uuidna_theorem', { key: 'two_coins' }],
    ['uuidna_address', { value: 'hello' }],          // the edge's own implementation — the door opens THIS surface's tool
    ['uuidna_coprime', { a: 12, b: 18 }],
    ['uuidna_research', { text: 'the Betz ceiling is sixteen twenty-sevenths' }],
    ['uuidna_research', {}],                          // a refusal: missing required argument, named the same way
    ['uuidna_coprime', { a: 'twelve', b: [1] }],      // a type refusal
  ]
  for (const [name, args] of sample) {
    const direct = await edge(name, args)
    const forms: [string, Rpc][] = [
      ['call_tool {name, arguments}', await viaCall(name, args)],
      ['call_tool by the standard name', await viaCall(STANDARD_NAMES[name]!, args)],
      ['uuidna_call {op, args}', await viaDoor(name, args)],
      ['uuidna_call {name, arguments}', await edge(DOOR, { name, arguments: args })],
    ]
    for (const [form, r] of forms) {
      assert.equal(answer(r), answer(direct), `${name} ${JSON.stringify(args)} through ${form}: a different answer`)
      assert.equal(r.result?._meta?.gate?.receipt, direct.result?._meta?.gate?.receipt, `${name} through ${form}: the gate judged a different call`)
      assert.equal(r.result?._meta?.deposit?.id, direct.result?._meta?.deposit?.id, `${name} through ${form}: the deposit names a different op`)
    }
  }
  // stdio, through callTool: every door form runs the direct call
  const direct = callTool('uuidna_theorem', { key: 'two_coins' })
  assert.deepEqual(callTool(DOOR, { op: 'uuidna_theorem', args: { key: 'two_coins' } }), direct)
  assert.deepEqual(callTool(DOOR_NAME, { name: 'get_theorem', arguments: { key: 'two_coins' } }), direct)
})

test('an unknown name is the same JSON-RPC -32602 directly, through either door, and asked of list_tools', async () => {
  const bogus = 'uuidna_not_a_tool'
  const direct = await edge(bogus, {})
  assert.equal(direct.error?.code, -32602)
  assert.equal(direct.error?.message, `unknown tool: ${bogus}`)
  for (const [form, r] of [
    ['call_tool {name}', await viaCall(bogus, {})],
    ['uuidna_call {op}', await viaDoor(bogus, {})],
    ['list_tools {name}', await edge(LIST_NAME, { name: bogus })],
    ['call_tool → list_tools {name}', await viaCall(LIST_NAME, { name: bogus })],
  ] as [string, Rpc][]) assert.deepEqual(r.error, direct.error, `${form} refused an unknown name differently`)
  // stdio, in process: list_tools names what it was asked, as callTool does
  assert.throws(() => callTool(LIST, { name: bogus }), /unknown tool: uuidna_not_a_tool/)
  assert.throws(() => callTool(bogus, {}), /unknown tool: uuidna_not_a_tool/)
})

test('the doors do not open themselves, and a malformed door call is refused by name, nothing computed', async () => {
  assert.equal(openDoor(DOOR, { op: DOOR }), null)
  assert.equal(openDoor(DOOR, { name: DOOR_NAME }), null)
  assert.equal(openDoor(DOOR, { op: 'uuidna_coins', args: [1] }), null)
  assert.equal(openDoor(DOOR, { name: 'uuidna_coins', args: {} }), null, 'the two forms are never mixed')
  assert.equal(openDoor('uuidna_coins', { op: 'uuidna_theorem' }), null, 'only the call door is unwrapped')
  assert.equal(openDoor(LIST_NAME, { name: 'uuidna_theorem' }), null, 'list_tools reads a contract, it never runs one')
  assert.deepEqual(openDoor(DOOR, { op: 'uuidna_coins' }), { name: 'uuidna_coins', args: {} })
  assert.deepEqual(openDoor(DOOR_NAME, { name: 'get_coins', arguments: { a: 1 } }), { name: 'get_coins', args: { a: 1 } })
  assert.throws(() => callTool(DOOR, { op: DOOR }), /does not open itself/)
  assert.throws(() => callTool(DOOR_NAME, { name: DOOR_NAME }), /does not open itself/)
  const self = await viaCall(DOOR_NAME, {})
  assert.equal(self.result?.isError, true)
  assert.match(self.result!.content![0]!.text, /does not open itself/)
  const arr = await edge(DOOR, { op: 'uuidna_coins', args: [1] })
  assert.equal(arr.result?.isError, true)
  assert.match(arr.result!.content![0]!.text, /arguments an object/)
  const arr2 = await edge(DOOR_NAME, { name: 'uuidna_coins', arguments: [1] })
  assert.equal(arr2.result?.isError, true)
  assert.match(arr2.result!.content![0]!.text, /argument arguments must be object/)
})

test('EVERY NAME EITHER SURFACE ANSWERS TO matches ^[a-z][a-z0-9_]{0,63}$, the names the Claude API accepts', async () => {
  const stdioNames = [...MCP_CATALOG.map((t) => t.name), ...Object.values(STANDARD_NAMES), ...MCP_LISTED.map((t) => t.name),
    ...(callTool(LIST, {}) as { tools: ListRow[] }).tools.map((t) => t.name)]
  const edgeList = (handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: DoorRow[] } }).result.tools
  const edgeNames = [...mcpHttpToolNames(), ...mcpHttpCatalogue().flatMap((r) => [r.name, ...(r.aliases ?? [])]), ...edgeList.map((t) => t.name),
    ...parsed<{ tools: ListRow[] }>(await edge(LIST_NAME, {})).tools.map((t) => t.name)]
  assert.deepEqual(stdioNames.filter((n) => !NAME.test(n)), [], 'stdio answers to a name the Claude API refuses')
  assert.deepEqual(edgeNames.filter((n) => !NAME.test(n)), [], 'the edge answers to a name the Claude API refuses')
  assert.ok(stdioNames.length > 2 * MCP_CATALOG.length - 40 && edgeNames.length > 200, 'the sweep read the surfaces')
  // CONTROL: the pattern refuses what the API refuses
  for (const bad of ['uuidna-call', 'Call_tool', '1tool', 'x'.repeat(65), 'call tool', '']) assert.ok(!NAME.test(bad), `${bad} passed`)
  assert.ok(NAME.test('x'.repeat(64)))
})

test('THE WIRE: tools/list costs a fraction of the catalogue, measured per tool it reaches, under the sealed rate', (t) => {
  const listed = wireBytes(MCP_LISTED), whole = wireBytes(MCP_CATALOG)
  const rate = Number((BigInt(listed) * 100n) / BigInt(MCP_CATALOG.length))
  const sealed = sealedBudget()?.perToolHundredths
  assert.ok(sealed !== undefined, 'the wire rate is sealed')
  assert.ok(rate <= sealed, `the listing costs ${rate} hundredths per tool, over the sealed ${sealed}`)
  assert.ok(listed * 4 < whole, `the listing (${listed} bytes) must be a small fraction of the catalogue as rows (${whole} bytes)`)
  assert.deepEqual(contextGaps(MCP_CATALOG, MCP_LISTED).filter((g) => /per tool|ceiling/.test(g.what)), [])
  // CONTROL: the same finder, handed a padded listing, fires on the rate
  const padded = [...MCP_LISTED, { name: 'pad', description: 'x'.repeat(200_000), inputSchema: { type: 'object' } }]
  assert.ok(contextGaps(MCP_CATALOG, padded).some((g) => /per tool/.test(g.what)), 'a padded listing must fail the rate')
  const edgeList = (handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: DoorRow[] } }).result.tools
  const doors = MCP_LISTED.filter((l) => isDoorTool(l.name))
  const keys = new Set(MCP_LISTED.flatMap((l) => Object.keys((l.inputSchema as { properties?: object } | undefined)?.properties ?? {})))
  t.diagnostic(`stdio tools/list: ${MCP_LISTED.length} listed of ${MCP_CATALOG.length}, ${listed} bytes (the two doors ${wireBytes(doors)}; catalogue as rows ${whole}), ${rate} hundredths per tool reached, ${keys.size} distinct keys listed; edge tools/list: ${edgeList.length} listed of ${mcpHttpToolNames().length}, ${wireBytes(edgeList)} bytes`)
})
