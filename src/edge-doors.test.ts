// edge-doors — THE DOORS THAT WALKED THE LEDGER, READ BY PIECE INSTEAD. Measured at uuidna.com/mcp on 2026-11-10: of
// 241 doors called with their own examples, eight refused with the whole-ledger reason. The edge cannot be simulated
// under node, so these hold the host answers the edge paths must reproduce, and the one invariant the edge credits
// path rests on: a principle's bucket is exactly the wings filed under it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'
import { THEOREMS, PRINCIPLES } from './theorems/index.js'
import { depositValid } from './captain/trial/deposit/index.js'

test('every theorem sits in a wing filed under its own principle, so a principle bucket read by wing is complete', () => {
  const filed = new Map(PRINCIPLES.map((p) => [p[0], p[1]]))
  const astray = THEOREMS.filter((t) => filed.get(t.file) !== t.principle).map((t) => t.key)
  assert.deepEqual(astray.slice(0, 5), [], `${astray.length} theorem(s) sit in a wing filed under another principle`)
})

test('uuidna_wing reads one wing, and an unknown wing names the served ones', () => {
  const core = callTool('uuidna_wing', { wing: 'Core' }) as { theorems: { key: string }[] }
  assert.equal(core.theorems.length, THEOREMS.filter((t) => t.file === 'Core.lean').length)
  const none = callTool('uuidna_wing', { wing: 'NoSuchWing' }) as { refused: boolean; why: string }
  assert.equal(none.refused, true)
  assert.match(none.why, new RegExp(`${new Set(THEOREMS.map((t) => t.file)).size} wings are served`))
})

test('uuidna_credits answers a key from its principle bucket', () => {
  const c = callTool('uuidna_credits', { key: 'two_coins' }) as { claimedBy: string; creditOrder: unknown[] }
  assert.ok(['historical', 'contextual', 'captain'].includes(c.claimedBy))
  assert.ok(c.creditOrder.length >= 1)
})

test('a deposit citing a sealed key is valid, and a key the ledger does not seal is not', () => {
  assert.equal(depositValid({ party: 'captain', proof: 'two_coins' }), true)
  // CONTROL
  assert.equal(depositValid({ party: 'captain', proof: 'two_coins_not_sealed' }), false)
})

test('uuidna_transform verifies a sealed statement and leaves prose unverified', () => {
  const r = callTool('uuidna_transform', { materials: ['110 - 108 = 2', 'the moon is cheese'] }) as { verified: number; unverified: number }
  assert.equal(r.verified, 1)
  assert.equal(r.unverified, 1)
})

test('uuidna_by_lean resolves a key to its lean identity', () => {
  const r = callTool('uuidna_by_lean', { query: 'two_coins' }) as { keys: string[]; statement: string }
  assert.ok(r.keys.includes('two_coins'))
  assert.equal(r.statement, '110 - 108 = 2')
})
