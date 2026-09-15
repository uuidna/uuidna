// mcp-call — argument parsing, name resolution and the door's search, over an injected transport: no network here.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  argsOf, callNamed, callOnce, candidatesOf, commandFor, hostedDoor, parseArgv, replyOf, run, search, skeletonOf, suggestTools,
  DoorError, ENDPOINT, type RpcRequest, type RpcReply, type ToolRow, type Transport,
} from './mcp-call.js'

const text = (v: unknown, line?: string): RpcReply => ({ result: { content: [{ type: 'text', text: JSON.stringify(v) }, ...(line ? [{ type: 'text', text: line }] : [])] } })
const unknown = (name: string): RpcReply => ({ error: { code: -32602, message: `unknown tool: ${name}` } })

const CATALOGUE: ToolRow[] = [
  { name: 'uuidna_handle', description: 'the handle of an address', inputSchema: { type: 'object', properties: { address: { type: 'string' }, loadPayload: { type: 'boolean' } } } },
  { name: 'uuidna_address', description: 'mint the content-address of any value', inputSchema: { type: 'object', properties: { value: { type: 'string' } }, required: ['value'] } },
  { name: 'uuidna_merkle_root', description: 'merkle root over leaves', inputSchema: { type: 'object', properties: { leaves: { type: 'array' } }, required: ['leaves'] } },
]
/** a door with the current main catalogue's shape: uuidna_* names, no list_tools, tools/list carries schemas */
const mainSurface = (seen: RpcRequest[] = []): Transport => async (req) => {
  seen.push(req)
  if (req.method === 'tools/list') return { result: { tools: CATALOGUE } }
  const name = String(req.params?.name)
  const row = CATALOGUE.find((r) => r.name === name)
  if (!row) return unknown(name)
  return text({ tool: name, args: req.params?.arguments }, 'gate CLEAN · receipt r')
}
/** a door with the new door's shape: standard names, list_tools {query} and {name} */
const doorSurface: Transport = async (req) => {
  const name = String(req.params?.name)
  const args = (req.params?.arguments ?? {}) as Record<string, unknown>
  if (name === 'list_tools') {
    if (typeof args.name === 'string') { const r = CATALOGUE.find((x) => x.name === `uuidna_${String(args.name)}` || x.name === args.name); return r ? text({ ...r, name: r.name.slice(7) }) : { result: { content: [{ type: 'text', text: `error: unknown tool: ${String(args.name)}` }], isError: true } } }
    const q = String(args.query ?? '')
    return text({ query: q, tools: CATALOGUE.filter((r) => r.name.includes(q) || r.description.includes(q)).map((r) => ({ name: r.name.slice(7), description: r.description })) })
  }
  if (CATALOGUE.some((r) => r.name === `uuidna_${name}`)) return text({ standard: name })
  return unknown(name)
}

test('argv: a tool with one JSON object, key=value pairs, --local anywhere, list words, and the usage', () => {
  assert.deepEqual(parseArgv(['uuidna_address', '{"value":"hi"}']), { mode: 'call', tool: 'uuidna_address', args: { value: 'hi' }, words: [], local: false, url: ENDPOINT })
  assert.deepEqual(parseArgv(['--local', 'address', 'value=hi', 'n=3', 'flag=true', 'xs=[1,2]']).args, { value: 'hi', n: 3, flag: true, xs: [1, 2] })
  assert.equal(parseArgv(['address', '--local']).local, true)
  assert.deepEqual(parseArgv(['list', 'merkle', 'root']).words, ['merkle', 'root'])
  assert.equal(parseArgv([]).mode, 'help')
  assert.equal(parseArgv(['x'], { UUIDNA_MCP_URL: 'https://qpu.uuidna.com/mcp' }).url, 'https://qpu.uuidna.com/mcp')
  assert.equal(parseArgv(['x', '--url=http://127.0.0.1:8787/mcp']).url, 'http://127.0.0.1:8787/mcp')
  assert.throws(() => argsOf(['{"value":']), /not JSON/)
  assert.throws(() => argsOf(['[1]']), /neither a JSON object/)
  assert.throws(() => argsOf(['{"a":1}', 'b=2']), /ONE JSON object/)
  assert.throws(() => argsOf(['loose']), /neither a JSON object nor key=value/)
})

test('names: as typed, then with the uuidna_ prefix added or removed', () => {
  assert.deepEqual(candidatesOf('handle'), ['handle', 'uuidna_handle'])
  assert.deepEqual(candidatesOf('uuidna_handle'), ['uuidna_handle', 'handle'])
  assert.deepEqual(candidatesOf('merkle-root'), ['merkle_root', 'uuidna_merkle_root'])
})

test('a standard name reaches the main catalogue, and a catalogue id reaches the door surface', async () => {
  const seen: RpcRequest[] = []
  const a = await callNamed(hostedDoor(mainSurface(seen), 'test').call, 'handle', { address: 'x' })
  assert.equal(a.name, 'uuidna_handle')
  assert.deepEqual(a.value, { tool: 'uuidna_handle', args: { address: 'x' } })
  assert.equal(a.line, 'gate CLEAN · receipt r')
  assert.deepEqual(seen.map((r) => r.params?.name), ['handle', 'uuidna_handle'])
  const b = await callNamed(hostedDoor(doorSurface, 'test').call, 'uuidna_handle', {})
  assert.deepEqual([b.name, b.value], ['handle', { standard: 'handle' }])
})

test('an unknown name, a tool refusal and a JSON-RPC error fail by kind', async () => {
  await assert.rejects(callNamed(hostedDoor(mainSurface(), 't').call, 'nope', {}), (e: unknown) => e instanceof DoorError && e.kind === 'unknown' && e.tried.join() === 'nope,uuidna_nope')
  const refusing: Transport = async () => ({ result: { content: [{ type: 'text', text: 'error: uuidna_address: missing required argument: value' }], isError: true } })
  await assert.rejects(callOnce(refusing, 'uuidna_address', {}), (e: unknown) => e instanceof DoorError && e.kind === 'tool' && /missing required argument/.test(e.message))
  const broken: Transport = async () => ({ error: { code: -32000, message: 'uuidnaOS refused to boot' } })
  await assert.rejects(callOnce(broken, 'x', {}), (e: unknown) => e instanceof DoorError && e.kind === 'rpc')
})

test('the event-stream body and a non-JSON body both read as replies', () => {
  assert.deepEqual(replyOf('event: message\ndata: {"jsonrpc":"2.0","id":1,"result":{"ok":1}}\n\n', 200).result, { ok: 1 })
  assert.match(replyOf('<html>502</html>', 502).error?.message ?? '', /HTTP 502/)
})

test('list: the door\'s own search where it has one, a keyword filter over tools/list where it does not', async () => {
  const d = await search(hostedDoor(doorSurface, 't'), ['merkle'])
  assert.equal(d.via, 'list_tools {query}')
  assert.deepEqual(d.tools.map((r) => r.name), ['merkle_root'])
  const m = await search(hostedDoor(mainSurface(), 't'), ['content', 'address'])
  assert.equal(m.via, 'keyword filter over the catalogue')
  assert.deepEqual(m.tools.map((r) => r.name), ['uuidna_address'])
})

test('the argument skeleton comes from the schema: required keys, else the first declared', () => {
  assert.deepEqual(skeletonOf(CATALOGUE[1]!.inputSchema), { value: '<value>' })
  assert.deepEqual(skeletonOf(CATALOGUE[0]!.inputSchema), { address: '<address>' })
  assert.deepEqual(skeletonOf(CATALOGUE[2]!.inputSchema), { leaves: [] })
  assert.equal(commandFor('uuidna_coins', { type: 'object', properties: {} }), 'npm run mcp -- uuidna_coins')
  assert.equal(commandFor('t', undefined, { q: "it's" }), `npm run mcp -- t '{"q":"it'\\''s"}'`)
})

test('suggestions rank a name hit over a description hit, and a tool the code names leads', async () => {
  const main = hostedDoor(mainSurface(), 't')
  const s = await suggestTools(main, ['address'])
  assert.deepEqual(s.suggestions.map((x) => x.name), ['uuidna_address', 'uuidna_handle'])
  assert.equal(s.suggestions[0]!.command, `npm run mcp -- uuidna_address '{"value":"<value>"}'`)
  const named = await suggestTools(main, ['address'], ['uuidna_merkle_root'])
  assert.equal(named.suggestions[0]!.name, 'uuidna_merkle_root')
  const viaDoor = await suggestTools(hostedDoor(doorSurface, 't'), ['handle'])
  assert.equal(viaDoor.suggestions[0]!.command, `npm run mcp -- handle '{"address":"<address>"}'`)
})

test('the command prints the tool\'s JSON, says where it came from, and exits non-zero on a JSON-RPC error', async () => {
  const lines: { out: string[]; err: string[] } = { out: [], err: [] }
  const io = { out: (s: string) => lines.out.push(s), err: (s: string) => lines.err.push(s) }
  assert.equal(await run(['address', 'value=hi'], {}, io, async () => hostedDoor(mainSurface(), 'uuidna.com/mcp')), 0)
  assert.deepEqual(lines.out, ['{"tool":"uuidna_address","args":{"value":"hi"}}'])
  assert.match(lines.err[0]!, /^via uuidna\.com\/mcp → uuidna_address · gate CLEAN/)
  lines.err.length = 0
  assert.equal(await run(['uuidna_newer', '{"a":1}'], {}, io, async () => hostedDoor(mainSurface(), 'uuidna.com/mcp')), 2)
  assert.match(lines.err[0]!, /does not serve "uuidna_newer".*\n.*npm run mcp -- uuidna_newer '\{"a":1\}' --local/)
  lines.out.length = 0; lines.err.length = 0
  const local = { where: 'dist', call: async (name: string) => ({ name, value: 'v' }), catalogue: async () => [] }
  assert.equal(await run(['x', '--local'], {}, io, async () => local), 0)
  assert.match(lines.err[0]!, /^computed locally/)
})
