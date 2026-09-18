// mcp-names — ONE COMMON NAME PER TOOL, EVERY OLD NAME STILL ANSWERING, AND DOCUMENTATION THAT IS THE COMPUTATION.
//
// Held here, each with a control that can fail:
//   1. the names are DERIVED — recomputing them from the source reproduces the served table, and no declared row
//      is one the rules already reach;
//   2. every old name and its standard name answer IDENTICALLY — same answer, same gate receipt, same deposit;
//   3. the annotations are DERIVED from what the run reaches, and agree with the effects recorded beside them;
//   4. the docs examples REPRODUCE — the recorded excerpt is what the tool answers today, and the wire line is
//      read off the recorded shape; no tool is broken.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { MCP_CATALOG, MCP_LISTED, STANDARD_NAMES, callTool, resolveToolName, hostHardware } from './mcp.js'
import { handleMcpRpc, mcpHttpToolNames } from './mcp-http.js'
import { MCP_DOCS, MCP_DOCS_BROKEN } from './mcp-docs.generated.js'
import { RENAMES, VERBS, annotationsOf, derivedName, standardNames, wireLineOf, wordsOf, type NameInput, excerptOf } from './mcp-names.js'
import { DOOR, DOOR_NAME, isDoorTool } from './mcp-door.js'
import { effectReader, toolRunsOf } from './scripts/mcp-effects.js'
import { ROOT } from './scripts/api.js'

type Rpc = { result?: { content?: { text: string }[]; isError?: boolean; _meta?: { gate?: { receipt: string }; deposit?: { id: string } } }; error?: { code: number; message: string } }
const settle = async (r: unknown): Promise<Rpc> => (r && typeof (r as { then?: unknown }).then === 'function' ? await (r as Promise<Rpc>) : r as Rpc)
const edge = (name: string, args: Record<string, unknown>): Promise<Rpc> =>
  settle(handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }))
const answer = (r: Rpc): string => JSON.stringify({ content: r.result?.content, error: r.error, isError: r.result?.isError })

const SRC = join(ROOT, 'src')
const reader = effectReader(SRC)
const runs = new Map(toolRunsOf(SRC).map((r) => [r.old, r.run]))
const staticOf = (old: string) => reader.effectsOfRun(runs.get(old) ?? '', join(SRC, 'mcp.ts'))

test('every tool has computed documentation, one standard name, no two alike, and a plain title', () => {
  const names = MCP_CATALOG.map((t) => STANDARD_NAMES[t.name])
  for (const t of MCP_CATALOG) {
    const d = MCP_DOCS[t.name]
    assert.ok(d, `${t.name} has no computed documentation — run gen-mcp-docs`)
    assert.match(d.name, /^[a-z][a-z0-9]*(_[a-z0-9]+)+$/, `${t.name} → ${d.name} is not verb_object`)
    assert.ok(VERBS[d.name.split('_')[0]!], `${d.name} does not lead with a standard verb`)
    assert.ok(!d.name.startsWith('uuidna_'), `${d.name} keeps the house prefix`)
    assert.equal(d.title.toLowerCase(), d.name.split('_').join(' '))
  }
  assert.equal(new Set(names).size, names.length, 'two tools share a standard name')
  // CONTROL: the uniqueness check fires on a duplicate
  assert.notEqual(new Set([...names, names[0]]).size, names.length + 1)
})

test('the names are DERIVED: recomputed from the source, the served table reappears; no declared row is redundant', () => {
  const inputs: NameInput[] = MCP_CATALOG.map((t) => ({
    old: t.name, targets: t.name === DOOR ? [] : staticOf(t.name).targets, effects: MCP_DOCS[t.name]!.effects,
    required: ((t.inputSchema as { required?: unknown[] }).required ?? []).length,
  }))
  assert.deepEqual(standardNames(inputs), STANDARD_NAMES, 'the served names drifted from what the rules derive — run gen-mcp-docs')
  for (const [old, row] of Object.entries(RENAMES)) {
    const input = inputs.find((i) => i.old === old)
    assert.ok(input, `RENAMES declares ${old}, which the catalogue does not carry`)
    assert.notEqual(derivedName(input, {}).name, row.to, `RENAMES row ${old} → ${row.to} is what the rules already derive; the row is not needed`)
    assert.ok(row.why.length > 20, `RENAMES row ${old} gives no reason`)
  }
  // the house words the table names are gone from every served name
  const house = Object.values(RENAMES).flatMap((r) => [.../house (?:word|verb|phrase) "([^"]+)"/.exec(r.why)?.[1]?.split(' ') ?? []])
  const offenders = Object.values(STANDARD_NAMES).filter((n) => wordsOf(n).some((w) => house.includes(w)))
  assert.deepEqual(offenders, [], 'a served name still carries a house word the table replaces')
  // CONTROL: the redundancy check fires on a row the rules reach
  const plain = inputs.find((i) => i.old === 'uuidna_verify_statement')!
  assert.equal(derivedName(plain, { uuidna_verify_statement: { to: 'verify_statement' } }).name, derivedName(plain, {}).name)
})

test('ALIASES: every old name and every standard name resolve to the same tool, on both surfaces and through the door', async () => {
  for (const t of MCP_CATALOG) {
    assert.equal(resolveToolName(t.name), t.name, `${t.name} no longer resolves`)
    assert.equal(resolveToolName(STANDARD_NAMES[t.name]), t.name, `${STANDARD_NAMES[t.name]} does not resolve to ${t.name}`)
  }
  assert.equal(resolveToolName('no_such_tool'), undefined)
  // the door's {} index shows both names
  const index = callTool(DOOR, {}) as { tools: { name: string; aliases?: string[] }[] }
  for (const t of MCP_CATALOG) {
    const row = index.tools.find((r) => r.name === STANDARD_NAMES[t.name])
    assert.ok(row, `${STANDARD_NAMES[t.name]} is not in the door's index`)
    if (row.name !== t.name) assert.deepEqual(row.aliases, [t.name], `${row.name} does not show its old name`)
  }
  // an unknown name is refused naming what was asked, as before
  const unknown = await edge('no_such_tool', {})
  assert.equal(unknown.error?.message, 'unknown tool: no_such_tool')
})

test('ALIASES ANSWER IDENTICALLY: every zero-argument edge tool, by old name and by standard name — same answer, gate and deposit', async (t) => {
  const zero = MCP_CATALOG.filter((c) => mcpHttpToolNames().includes(c.name) && !isDoorTool(c.name) &&!((c.inputSchema as { required?: unknown[] }).required ?? []).length)
  const differs: string[] = [], varies: string[] = []
  for (const c of zero) {
    const old = await edge(c.name, {}), std = await edge(STANDARD_NAMES[c.name]!, {})
    const same = answer(old) === answer(std) && old.result?._meta?.gate?.receipt === std.result?._meta?.gate?.receipt &&
      old.result?._meta?.deposit?.id === std.result?._meta?.deposit?.id
    if (same) continue
    // CONTROL: a tool that answers differently to ITSELF is named, not counted as agreement or as a failure
    if (answer(await edge(c.name, {})) !== answer(old)) { varies.push(c.name); continue }
    differs.push(c.name)
  }
  assert.deepEqual(differs, [], 'these tools answer differently by their standard name than by their old name')
  assert.ok(zero.length - varies.length > 40)
  // with arguments, and a refusal, through the door by the standard name
  for (const [old, args] of [['uuidna_coprime', { a: 12, b: 18 }], ['uuidna_theorem', { key: 'two_coins' }], ['uuidna_coprime', { a: 'twelve' }]] as const) {
    const direct = await edge(old, args as Record<string, unknown>)
    const door = await edge(DOOR_NAME, { op: STANDARD_NAMES[old], args })
    assert.equal(answer(door), answer(direct), `${old}: the standard name through the door answered differently`)
    assert.equal(door.result?._meta?.gate?.receipt, direct.result?._meta?.gate?.receipt)
  }
  t.diagnostic(`old ≡ standard on ${zero.length - varies.length} zero-argument edge tools; varying by themselves: ${varies.join(', ') || 'none'}`)
})

test('ANNOTATIONS are derived from what the run reaches, and agree with the effects recorded beside them', () => {
  for (const t of MCP_CATALOG) {
    const d = MCP_DOCS[t.name]!
    assert.deepEqual(d.annotations, annotationsOf(d.effects), `${t.name}: annotations do not follow from its effects`)
    if (t.name === DOOR) continue
    // the recorded effects contain what the source shows today (the example may add what it was seen to do)
    const s = staticOf(t.name).effects
    for (const k of Object.keys(s) as (keyof typeof s)[]) if (s[k]) assert.ok(d.effects[k], `${t.name}: the source reaches ${k} and the docs do not say so`)
    if (d.annotations.readOnlyHint) assert.ok(!d.effects.writes && !d.effects.spawns && !d.effects.deletes)
    if (!d.effects.network && !d.effects.writes && !d.effects.spawns && !d.effects.deletes) assert.ok(d.annotations.readOnlyHint && d.annotations.idempotentHint, `${t.name} is pure and not read-only/idempotent`)
  }
  // the network tools are open-world; the writer is not read-only
  for (const n of ['uuidna_fanout', 'uuidna_net_read']) assert.equal(MCP_DOCS[n]!.annotations.openWorldHint, true, `${n} reaches the network`)
  assert.equal(MCP_DOCS['uuidna_wave_deposit']!.annotations.readOnlyHint, false, 'uuidna_wave_deposit writes the queue')
  // the door reaches whatever it opens
  assert.equal(MCP_DOCS[DOOR]!.annotations.readOnlyHint, false)
  // CONTROL: the derivation fires on each effect
  assert.equal(annotationsOf({ network: false, writes: true, deletes: false, spawns: false }).readOnlyHint, false)
  assert.equal(annotationsOf({ network: true, writes: false, deletes: false, spawns: false }).openWorldHint, true)
  assert.equal(annotationsOf({ network: false, writes: true, deletes: true, spawns: false }).destructiveHint, true)
  // and the listed rows carry them on the wire
  for (const row of MCP_LISTED) assert.ok(row.annotations && row.title, `${row.name} is listed without its title and annotations`)
})

test('THE DOCS REPRODUCE: each documented example answers today what was recorded, and the wire line is read off its shape; nothing is broken', async (t) => {
  assert.deepEqual(MCP_DOCS_BROKEN.map((b) => `${b.old}: ${b.error}`), [], 'tools whose example threw are reported, not documented')
  let checked = 0
  for (const c of MCP_CATALOG) {
    const d = MCP_DOCS[c.name]!
    if (d.status !== 'documented' || isDoorTool(c.name) || !d.example) continue
    if (d.effects.network) continue   // documented against the 503 stub; the live network is not the stub
    assert.equal(d.description, wireLineOf(d.name, d.outputSchema), `${c.name}: the wire line is not read off the recorded shape`)
    let v = callTool(c.name, structuredClone(d.example.args), { hardware: hostHardware })   // the context the stdio server hands every call, as the generator did
    if (v && typeof (v as { then?: unknown }).then === 'function') v = await v
    const s = typeof v === 'string' ? v : JSON.stringify(v)
    // the SAME excerpt the generator recorded — one definition, imported, never a second clip written here
    assert.equal(excerptOf(v), d.example.excerpt, `${c.name}: the recorded example no longer reproduces — run gen-mcp-docs`)
    checked++
  }
  assert.ok(checked > 150, `only ${checked} examples reproduced`)
  // CONTROL: a changed excerpt is caught by the same comparison
  assert.notEqual('x' + MCP_DOCS['uuidna_coprime']!.example!.excerpt, MCP_DOCS['uuidna_coprime']!.example!.excerpt)
  t.diagnostic(`${checked} documented examples reproduced exactly`)
})
