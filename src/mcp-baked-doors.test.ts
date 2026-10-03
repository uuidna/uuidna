// mcp-baked-doors — A ZERO-ARGUMENT DOOR IS A FUNCTION OF THE LEDGER, AND THE EDGE SERVES WHAT THE HOST COMPUTED.
//
// MEASURED at uuidna.com/mcp on 2026-10-03: of 45 zero-argument self-knowledge doors, 8 answered and 37 refused with
// "the edge does not hold the whole ledger" — every trial door among the 37. The 8 read a tally the bake had kept
// (ledgerFacts: trial, credits, skills); the 37 walked the rows. The two groups are the same kind of function, and
// the difference between them was which ones somebody had remembered to bake. bakeableDoors() derives the set from
// the schemas, ledger-deposit --bake runs each twice on the host and keeps the agreeing answer, and callTool serves
// it at the edge for a bare call. These tests hold the derivation and the controls; the bake itself is measured by
// its own output.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, bakeableDoors } from './mcp.js'
import { EDGE_ROOT } from './theorems/edge-root.js'

test('bakeable is derived from the schemas: no required key, and nothing else', () => {
  const names = bakeableDoors()
  assert.ok(names.includes('uuidna_due_process'), 'a zero-argument door is bakeable')
  assert.ok(names.includes('uuidna_theorems'), 'a door whose arguments are all optional is bakeable for its bare call')
  // THE CONTROL — a door that REQUIRES an argument has no bare answer to bake, and must not be listed
  // (one control is enough; naming a second required-argument door here would make the exercise census count a
  // mention as a dedicated test, which it is not)
  assert.ok(!names.includes('uuidna_search'), 'uuidna_search requires q')
  assert.ok(names.length > 40 && names.length < 200, `a plausible count: ${names.length}`)
})

test('on a host the baked lookup never answers — the host runs its own ledger', () => {
  // callTool on a host must return the live door, not a bake of some other ledger: due_process computes here
  const live = callTool('uuidna_due_process', {}) as { verifiedAll: { theorems: number } }
  assert.ok(live.verifiedAll.theorems > 0)
})

test('what the bake kept, if a bake has run: every entry is an answer or a stated reason, never both or neither', () => {
  const doors = EDGE_ROOT?.facts?.doors
  if (!doors) { assert.ok(true, 'no doors baked yet — run ledger-deposit --bake'); return }
  const names = new Set(bakeableDoors())
  for (const [name, d] of Object.entries(doors)) {
    assert.ok(names.has(name), `${name} was baked but is not bakeable by the schemas`)
    const hasAnswer = 'answer' in d, hasWhy = 'unmeasured' in d
    assert.ok(hasAnswer !== hasWhy, `${name}: exactly one of answer / unmeasured`)
    assert.ok(Number.isInteger(d.bytes) && d.bytes >= 0, `${name}: bytes is a count`)
  }
  // THE CONTROL — a door that requires an argument is never in the bake
  assert.ok(!('uuidna_search' in doors), 'a required-argument door is not baked')
  // and the live host answer has the shape the bake kept, for a door whose answer is small and pure
  const d = doors['uuidna_due_process']
  if (d && 'answer' in d) {
    const live = callTool('uuidna_due_process', {}) as Record<string, unknown>
    assert.deepEqual(Object.keys(live).sort(), Object.keys(d.answer as Record<string, unknown>).sort(), 'the baked shape is the live shape')
  }
})
