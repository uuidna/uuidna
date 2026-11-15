import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { callTool } from './mcp.js'
import { decide } from './decide.js'
import { ROOT } from './scripts/api.js'

// uuidna_ask records only what uuidna_decide decides as arithmetic, and a statement already recorded is not
// written twice — so this test asks what lean/asked.json already holds and leaves the file byte-for-byte as it was.
const FILE = join(ROOT, 'lean', 'asked.json')
const asked = JSON.parse(readFileSync(FILE, 'utf8')) as { input: string; holds: boolean }[]

test('uuidna_ask: a recorded statement answers from the kernel and is not written again', () => {
  const before = readFileSync(FILE, 'utf8')
  const q = asked.find((x) => x.holds)!
  const r = callTool('uuidna_ask', { input: q.input }) as { verdict: string; holds: boolean; recorded: boolean; sealedAs: string | null }
  assert.equal(r.recorded, false, 'already in lean/asked.json')
  assert.equal(r.holds, true)
  assert.equal(r.verdict, 'VERIFIED', 'the lean-asked wing sealed it, so decide cites the theorem')
  assert.match(r.sealedAs ?? '', /^asked_/)
  assert.equal(readFileSync(FILE, 'utf8'), before, 'the file is untouched')
})

test('powmod(b, e, m) decides as b^e mod m, the steps the asked wing gives the kernel', () => {
  assert.equal(decide('powmod(2, 10, 1000) = 24').verdict, 'EVALUATED_TRUE', '2^10 = 1024')
  assert.equal(decide('powmod(3, 0, 7) = 1').verdict, 'EVALUATED_TRUE', 'an empty product')
  assert.equal(decide('powmod(5, 3, 1) = 0').verdict, 'EVALUATED_TRUE', 'everything is 0 mod 1')
  assert.equal(decide('powmod(2, 340, 341) = 1').verdict, 'EVALUATED_TRUE', '341 = 11·31 is a base-2 Fermat liar')
  assert.equal(decide('powmod(3, 340, 341) = 1').verdict, 'EVALUATED_FALSE', 'base 3 exposes 341')
  assert.equal(decide('powmod(2, 10, 1000) = 25').verdict, 'EVALUATED_FALSE', 'control: a wrong value is false')
  assert.equal(decide('powmod(2, 10, 0) = 1024').kind, 'prose', 'a zero modulus is a full power, refused by the cap')
})

test('control: uuidna_ask refuses what is not a Nat arithmetic statement, before deciding anything', () => {
  assert.throws(() => callTool('uuidna_ask', {}), /missing required argument: input/)
  assert.throws(() => callTool('uuidna_ask', { input: '2 + 2' }), /only a Nat arithmetic statement/)
  assert.throws(() => callTool('uuidna_ask', { input: 'x = 4' }), /only a Nat arithmetic statement/)
})
