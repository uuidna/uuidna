// mcp-e2e — THE SERVER AS A CLIENT MEETS IT: spawned as a process, spoken to in JSON-RPC over stdio.
//
// Every other MCP test in this suite calls the server IN-PROCESS — mcp-coverage and mcp-schema import callTool,
// mcp-http imports handleMcpRpc. Those check the catalogue and the dispatch, which is most of the logic, and they
// are fast. But they are blind to the layer a real client actually depends on: the handshake, the framing, the error
// SHAPE on the wire, and whether the process is still serving after it has refused something. mcp-drive.ts does
// spawn the real binary, and it is the only thing that does — but it drives three computations to recompute three
// receipts, which is a proof about arithmetic.
//
// So this is the usage test: connect once, then use the server the way a client does — list, call, misuse, and
// keep going. Every tool exercised here is OFFLINE by construction. Reaching for a network tool would make a red
// suite mean "an EU API is down" instead of "the server broke", which is the same law the school-apis tests hold.
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { createInterface } from 'node:readline'

interface Rpc { id?: number; result?: unknown; error?: { code?: number; message?: string } }

let srv: ChildProcessWithoutNullStreams
let seq = 0
const waiting = new Map<number, (m: Rpc) => void>()
const stderr: string[] = []

const rpc = (method: string, params?: object, ms = 20000): Promise<Rpc> =>
  new Promise((resolve, reject) => {
    const id = ++seq
    const timer = setTimeout(() => { waiting.delete(id); reject(new Error(`no answer to ${method} in ${ms}ms`)) }, ms)
    waiting.set(id, (m) => { clearTimeout(timer); resolve(m) })
    srv.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, ...(params ? { params } : {}) }) + '\n')
  })

/** the text a tools/call returns, which is where every uuidna tool puts its JSON payload */
const callText = (r: Rpc): string =>
  ((r.result as { content?: { text?: string }[] } | undefined)?.content?.[0]?.text) ?? ''

before(() => {
  srv = spawn(process.execPath, ['dist/mcp.js'], { stdio: ['pipe', 'pipe', 'pipe'] }) as ChildProcessWithoutNullStreams
  srv.stderr.on('data', (d: Buffer) => stderr.push(String(d)))
  createInterface({ input: srv.stdout }).on('line', (line) => {
    let msg: Rpc
    try { msg = JSON.parse(line) as Rpc } catch { return }   // a non-JSON line would itself be a framing defect
    if (msg.id !== undefined && waiting.has(msg.id)) waiting.get(msg.id)!(msg)
    waiting.delete(msg.id!)
  })
})

after(() => { srv.kill() })

// ── THE HANDSHAKE. A client that cannot initialise never reaches a tool, so this is the first thing that can break.
test('e2e: initialize returns a protocol version and names the server', async () => {
  const r = await rpc('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'e2e', version: '0' } })
  assert.equal(r.error, undefined, `initialize errored: ${JSON.stringify(r.error)}`)
  const res = r.result as { protocolVersion?: string; serverInfo?: { name?: string; version?: string }; capabilities?: { tools?: unknown } }
  assert.ok(res.protocolVersion, 'a client negotiates on this field')
  assert.ok(res.serverInfo?.name, 'the server must name itself')
  assert.ok(res.serverInfo?.version, 'and its version — mcp-version.test.ts holds WHICH, this holds THAT')
  assert.ok(res.capabilities?.tools !== undefined, 'a server with tools must advertise the capability')
})

// ── THE CATALOGUE, ON THE WIRE. mcp-coverage checks the in-process array; this checks what is actually serialised.
test('e2e: tools/list serves every tool with a usable schema', async () => {
  const r = await rpc('tools/list')
  const tools = (r.result as { tools?: { name?: string; description?: string; inputSchema?: { type?: string } }[] }).tools ?? []
  assert.ok(tools.length > 100, `expected the full catalogue, saw ${tools.length}`)
  for (const t of tools) {
    assert.ok(t.name, 'a nameless tool cannot be called')
    assert.ok(t.description && t.description.length > 20, `${t.name}: a client shows this to a model — it must say something`)
    assert.equal(t.inputSchema?.type, 'object', `${t.name}: the schema must be an object schema`)
  }
  assert.equal(new Set(tools.map((t) => t.name)).size, tools.length, 'a duplicate name shadows a tool')
  // the tools added this session must survive the trip
  for (const n of ['uuidna_school_apis', 'uuidna_education_jobs', 'uuidna_oeapi'])
    assert.ok(tools.some((t) => t.name === n), `${n} is in the catalogue but not on the wire`)
})

// ── USE IT. An offline tool, called the way a client calls it, returning a payload that parses.
test('e2e: a tool call returns parseable JSON with the field it promises', async () => {
  const r = await rpc('tools/call', { name: 'uuidna_school_apis', arguments: {} })
  assert.equal(r.error, undefined, `the call errored: ${JSON.stringify(r.error)}`)
  const body = JSON.parse(callText(r)) as { count?: number; sources?: unknown[]; absent?: unknown[]; receipt?: string }
  assert.ok(body.count && body.count > 0, 'the registry must serve its sources over the wire')
  assert.equal(body.sources?.length, body.count, 'the count must match what is served')
  assert.ok(Array.isArray(body.absent), 'the absence law travels with the payload')
  assert.match(String(body.receipt), /^[0-9a-f-]{36}$/, 'the receipt is a content-address')
})

// ── DETERMINISM ACROSS CALLS. The same question twice must land on the same receipt, or nothing downstream can be
// recomputed by anyone. This is the repo's central claim, asserted where a client would actually observe it.
//
// THE TOOL UNDER TEST CHANGED, AND THE REASON IS A TEST THAT FAILED FOR THE WRONG CAUSE. This asserted
// determinism through `uuidna_oeapi`, which FETCHES a live external API: measured 2026-09-04, a cold call costs
// 11.9 seconds and the second costs 13 milliseconds (it caches), so two calls plus the server spawn raced a
// 20-second budget and lost whenever the network was slow — three failures and three passes across six runs of
// the same unchanged tree. The property was never in doubt: called directly, both receipts were
// be4065af-492e-8fb2-9a6d-055a4407876f, identical. So the test was reporting the weather while claiming a
// receipt had moved, which is exactly the fault this suite exists to catch in other people's code.
//
// The determinism claim is now asserted through the CHEAPEST ledger-derived tool that carries a receipt —
// uuidna_hardware, measured at 1ms cold. The first replacement chosen was uuidna_coverage, and it failed the
// same way for a different reason: it folds the whole ledger and costs 16.8 SECONDS cold, so it raced the same
// budget with no network involved at all. Twice now this test has reported a latency as a determinism failure,
// which is the lesson worth leaving here: when a check can fail for a reason other than the one it names, it
// will, and the fix is to remove the other reason rather than to widen the budget. No network, no ledger fold —
// a failure can now only mean the receipt actually moved. The network tool keeps its own determinism check
// below, with a budget that reflects what it really does and the dependency named.
test('e2e: the same call twice returns the same receipt', async () => {
  const a = JSON.parse(callText(await rpc('tools/call', { name: 'uuidna_hardware', arguments: {} }))) as { receipt: string }
  const b = JSON.parse(callText(await rpc('tools/call', { name: 'uuidna_hardware', arguments: {} }))) as { receipt: string }
  assert.match(String(a.receipt), /^[0-9a-f-]{36}$/, 'the tool must answer with a content-address')
  assert.equal(a.receipt, b.receipt, 'a receipt that moves between identical calls is not recomputable')
})

// THE NETWORK TOOL'S OWN DETERMINISM, with the dependency DECLARED rather than hidden inside a shared budget. A
// cold external fetch was measured at 11.9s, so the budget is raised where it actually binds: `rpc` carries its
// OWN 20-second cap, and that — not the test runner's option — is what was rejecting. Worth recording, because
// it cost two wrong diagnoses: the first blamed the external API, the second blamed a ledger fold, and both were
// real costs sitting UNDER a 20s ceiling nobody had looked at. A per-test timeout cannot lift a timeout that
// lives in the helper, and the failure message said "no answer in 20000ms" the whole time.
test('e2e: a network-backed tool is deterministic too — receipt, not latency', { timeout: 120000 }, async () => {
  const a = JSON.parse(callText(await rpc('tools/call', { name: 'uuidna_oeapi', arguments: {} }, 60000))) as { receipt: string }
  const b = JSON.parse(callText(await rpc('tools/call', { name: 'uuidna_oeapi', arguments: {} }, 60000))) as { receipt: string }
  assert.equal(a.receipt, b.receipt, 'a receipt that moves between identical calls is not recomputable')
})

// ── MISUSE, WHICH IS MOST OF REAL USAGE. A client sends a bad call; the server must refuse it CLEARLY and, more
// importantly, still be alive for the next one.
test('e2e: an unknown tool is refused by name, and the server survives it', async () => {
  const r = await rpc('tools/call', { name: 'uuidna_not_a_tool', arguments: {} })
  const said = JSON.stringify(r.error ?? callText(r))
  assert.match(said, /unknown tool|not_a_tool/i, `the refusal must name what was refused, said: ${said.slice(0, 160)}`)
  const after = await rpc('tools/list')
  assert.ok(((after.result as { tools?: unknown[] }).tools ?? []).length > 100, 'the server must keep serving after a refusal')
})

test('e2e: a missing required argument is refused, and the refusal NAMES the argument', async () => {
  const r = await rpc('tools/call', { name: 'uuidna_education_jobs', arguments: {} })
  const said = JSON.stringify(r.error ?? callText(r))
  assert.match(said, /subject/, `the schema declares "subject" required — the refusal must say so, said: ${said.slice(0, 160)}`)
})

test('e2e: an unknown METHOD is an error', async () => {
  const r = await rpc('no/such/method', {})
  assert.ok(r.error !== undefined || callText(r) === '', 'an unknown method must not be answered as though it worked')
  const after = await rpc('tools/list')
  assert.ok(((after.result as { tools?: unknown[] }).tools ?? []).length > 100, 'and the server keeps serving')
})

// ── THE CONNECTION IS A SESSION. A client makes many calls down one pipe; nothing may leak between them.
test('e2e: many sequential calls on one connection stay independent', async () => {
  const keys = ['two_coins', 'dz_fixed_points', 'mirror_fixed_five', 'dz_involution']
  const got: string[] = []
  for (const key of keys) {
    const body = JSON.parse(callText(await rpc('tools/call', { name: 'uuidna_theorem', arguments: { key } }))) as { key?: string }
    got.push(String(body.key))
  }
  assert.deepEqual(got, keys, 'each answer must belong to its own question — a mismatch here is a framing or id bug')
})

test('e2e: the server wrote nothing unexpected to stderr while serving', () => {
  const noise = stderr.join('').trim()
  assert.equal(noise, '', `stdio is the transport — anything on stderr is a leak a client may see: ${noise.slice(0, 200)}`)
})
