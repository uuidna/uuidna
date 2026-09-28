// hex-programs.call.test — A UUID IS A PROGRAM CALL, AND THIS IS THE CONSUMER THAT MAKES THAT TRUE.
//
// The captain, 2026-09-28: "a UUID is a program call — 32 bits name the door, 16 carry params, inside the 48-bit
// middle", and "remove useless code".
//
// WHY THIS FILE EXISTS. hex-programs derived a program address for every door and exposed uuidOfCall/callOfUuid, and a
// consumer check found ZERO real callers for the codec — only its own test. By the same standard that named 435 dead
// exports in this tree, that made it useless code: a published address space nothing addressed. The cure was a
// consumer, not a deletion, and resolveToolName is the one place every surface already resolves a name. These tests
// hold that wiring: a uuid reaching the dispatch must call the door its middle names, and must answer identically to
// the name it resolves to — otherwise there are two dispatches and one of them is a lie.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, resolveToolName, MCP_CATALOG } from './mcp.js'
import { uuidOfCall, hexProgramIndex } from './hex-programs.js'

const ix = hexProgramIndex()
const addressOf = (door: string): string =>
  uuidOfCall({ handle: '4f2a91c7', door, params: '0a3c', envelope: '40d2d1ad520f' }, ix)

test('a uuid resolves to the door its middle names', () => {
  for (const door of ['uuidna_address', 'uuidna_handle', 'uuidna_digital_root']) {
    assert.equal(resolveToolName(addressOf(door)), door, `${door} must be reachable by its own program address`)
  }
})

test('CALLING BY UUID IS CALLING BY NAME — the same answer, or there are two dispatches', () => {
  const cases: [string, Record<string, unknown>][] = [
    ['uuidna_address', { text: 'curcumin' }],
    ['uuidna_handle', { text: 'uuidna' }],
    ['uuidna_digital_root', { n: 432 }],
  ]
  for (const [door, args] of cases) {
    assert.deepEqual(callTool(addressOf(door), args), callTool(door, args),
      `${door} answered differently through its uuid than through its name`)
  }
})

test('the args gate still runs on a call that arrived as a uuid', () => {
  // the schema is the contract at the ONE door, and a uuid must not be a way around it
  const t = MCP_CATALOG.find((x) => x.name === 'uuidna_address')!
  assert.deepEqual(t.inputSchema?.required, ['text'], 'this test is pinned to a door that declares a required argument')
  assert.throws(() => callTool(addressOf('uuidna_address'), {}), /missing required argument/,
    'a uuid-addressed call with a missing required argument must be refused exactly as a named call is')
})

// ── THE CONTROLS. Without these, "a uuid resolves" passes against a resolver that returns a door for anything.
test('a well-formed uuid whose program names no door resolves to nothing', () => {
  assert.equal(resolveToolName('11111111-ffff-ffff-2222-333333333333'), undefined,
    'no door folds to ffffffff, and inventing one would route a call to the wrong door')
})

test('a bare tool name still resolves, and nonsense still does not', () => {
  assert.equal(resolveToolName('uuidna_address'), 'uuidna_address', 'the name path must not regress')
  assert.equal(resolveToolName('not-a-tool'), undefined)
  assert.equal(resolveToolName(''), undefined)
  assert.equal(resolveToolName(42 as unknown as string), undefined, 'a non-string is not an address')
})

test('the space is collision-free and the layout is the sealed one', () => {
  assert.deepEqual(ix.collisions, [], `two doors share a program address: ${JSON.stringify(ix.collisions)}`)
  assert.equal(ix.distinct, ix.doors)
  assert.equal(ix.bits, 32, 'the program is two message caps — 32 bits naming the door')
  assert.equal(ix.capacity.paramsInMiddle, 16 ** 4, 'one cap rides beside it: 16 bits of params')
  assert.equal(ix.capacity.program * ix.capacity.paramsInMiddle, ix.capacity.middle,
    'program space times param space is exactly the 48-bit middle — nothing borrowed, nothing spare')
})
