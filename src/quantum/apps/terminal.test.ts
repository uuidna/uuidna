// quantum/apps/terminal — THE SINGULARITY, TESTED. The property that matters: the terminal carries NO copy of
// the toolbox — zero tool names in the module, help included — because a second copy is what drifts. Plus the
// grammar (parse → exact JSON-RPC envelopes), the sealed meaning read from the port (never restated), honest
// errors on malformed input (data, never executed), and a transcript that compiles to the lattice
// deterministically and change-sensitively. Controls that can fail throughout.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseLine, rpcCall, rpcList, helpText, resultText, transcriptReceipt, routeUtterance, BUILTINS, type WireTool } from './terminal.js'
import { meaningOf } from './terminal-meaning.js'
import { ROOT } from '../../boundary.js'

test('THE SINGULARITY — the module ships zero tool names; the toolbox comes only from the wire', () => {
  const source = readFileSync(join(ROOT, 'src', 'quantum', 'apps', 'terminal.ts'), 'utf8')
  assert.ok(!/uuidna_[a-z0-9_]+/.test(source), 'a hardcoded uuidna_* name IS the second copy the singularity forbids')
  assert.ok(!/uuidna_/.test(helpText()), 'help must not name tools either')
  for (const b of BUILTINS) assert.ok(!b.startsWith('uuidna'), 'builtins are terminal words, never tools')
})

test('the grammar — a line parses to exactly one honest command', () => {
  assert.equal(parseLine('   ').kind, 'empty')
  assert.deepEqual(parseLine('help'), { kind: 'builtin', name: 'help' })
  const bare = parseLine('some_tool')
  assert.equal(bare.kind, 'call'); assert.deepEqual(bare.args, {})
  const withArgs = parseLine('some_tool {"key":"two_coins"}')
  assert.equal(withArgs.kind, 'call'); assert.deepEqual(withArgs.args, { key: 'two_coins' })
  // controls — each must FAIL as an error, never guess, never crash
  assert.equal(parseLine('rm -rf /').kind, 'error', 'shell-shaped input is not a tool name')
  assert.equal(parseLine('Some_Tool {}').kind, 'error', 'the registry shape is lowercase')
  assert.equal(parseLine('some_tool not-json').kind, 'error')
  assert.equal(parseLine('some_tool {broken').kind, 'error')
})

test('the wire shape — envelopes are exact JSON-RPC 2.0, the MCP\'s own protocol', () => {
  assert.deepEqual(rpcCall(parseLine('t {"a":1}'), 7),
    { jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 't', arguments: { a: 1 } } })
  assert.deepEqual(rpcList(1), { jsonrpc: '2.0', id: 1, method: 'tools/list' })
})

test('the meaning is the SEALED one — read from the port, never restated by hand', () => {
  const m = meaningOf()
  assert.match(m, /uuidna\/busybox/)
  assert.match(m, /toolbox of many common UNIX utilities/)
  assert.match(m, /the_terminal_is_the_toolbox/)
})

test('results render the answer then the ledger line; errors and strange shapes stay honest', () => {
  assert.equal(resultText({ result: { content: [{ type: 'text', text: 'answer' }, { type: 'text', text: 'ledger' }] } }), 'answer\nledger')
  assert.equal(resultText({ error: { message: 'drained' } }), '✗ drained')
  assert.equal(resultText({ odd: true }), '{"odd":true}')
})

test('the NL router — deterministic, floor-honest, schema-driven; ambiguity SHOWN, never guessed', () => {
  const tools: WireTool[] = [
    { name: 'demo_theorem', description: 'read one sealed theorem by key', inputSchema: { properties: { key: { type: 'string' } }, required: ['key'] } },
    { name: 'demo_search', description: 'search the sealed ledger', inputSchema: { properties: { q: { type: 'string' } }, required: ['q'] } },
    { name: 'demo_gate', description: 'the gate proves itself' },
  ]
  // routes by content words, extracts the arg from the leftover into the single required string
  const r = routeUtterance('show me the theorem two_coins', tools)
  assert.equal(r.kind, 'route'); assert.equal(r.name, 'demo_theorem'); assert.deepEqual(r.args, { key: 'two_coins' })
  // inline JSON wins verbatim; key=value pairs map through the schema
  assert.deepEqual(routeUtterance('theorem {"key":"anything"}', tools).args, { key: 'anything' })
  assert.deepEqual(routeUtterance('search the ledger q=vortex', tools).args, { q: 'vortex' })
  // deterministic: same sentence, same toolbox, same route
  assert.deepEqual(routeUtterance('show me the theorem two_coins', tools), r)
  // the floor holds: pure stopwords match nothing (control)
  assert.equal(routeUtterance('the of and is', tools).kind, 'none')
  // parseLine hands sentences to chat, not to error
  assert.equal(parseLine('show me the theorem two_coins').kind, 'chat')
})

test('the transcript compiles to the lattice — deterministic, change-sensitive, 32 on-lattice states', () => {
  const a = transcriptReceipt(['> help', 'the words'])
  const b = transcriptReceipt(['> help', 'the words'])
  const c = transcriptReceipt(['> help', 'other words'])
  assert.equal(a.address, b.address)
  assert.notEqual(a.address, c.address, 'a transcript that folds the same under change is a dead instrument')
  assert.equal(a.hexbits.length, 32)
  for (const h of a.hexbits) assert.ok(Number.isInteger(h) && h >= 0 && h <= 15)
})
