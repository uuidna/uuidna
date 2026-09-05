// mcp-constraints — driven with fixtures and with the live surface, because the two ask different questions:
// the fixtures check the rule, the live run checks that the rule still describes what we actually serve.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { constraintReport, overLongNames, malformedNames, longestName, NAME_MAX, OPENAI_TOOL_CAP } from './mcp-constraints.js'
import { TOOL_NAMES } from './mcp.js'

test('a small, well-formed surface satisfies every published limit', () => {
  const r = constraintReport(['a_tool', 'b-tool', 'c1'])
  assert.equal(r.exceeded, 0)
  assert.equal(r.satisfied, r.verdicts.length)
})

test('the hard cap and the recommendation are separate claims, never collapsed', () => {
  const many = Array.from({ length: 64 }, (_, i) => `tool_${i}`)
  const r = constraintReport(many)
  const otc = r.verdicts.find((v) => v.code === 'OTC')
  const advice = r.verdicts.find((v) => v.code === 'OTC-advice')
  assert.equal(otc?.satisfied, true, '64 fits in a request')
  assert.equal(advice?.satisfied, false, '64 exceeds the guidance')
  assert.notEqual(otc?.whose, advice?.whose, 'a limit with no owner reads as a law of nature')
})

test('a name one character over the limit is caught, and one exactly at it is not', () => {
  const at = 'x'.repeat(NAME_MAX)
  const over = 'x'.repeat(NAME_MAX + 1)
  assert.deepEqual(overLongNames([at]), [])
  assert.deepEqual(overLongNames([over]), [over])
  assert.equal(longestName([at, 'short']).length, NAME_MAX)
})

test('a name outside the character set is caught by pattern, not by length', () => {
  assert.deepEqual(malformedNames(['ok_name', 'has space', 'dot.name', 'uni¢ode']), ['has space', 'dot.name', 'uni¢ode'])
  assert.deepEqual(malformedNames(['a-b_C9']), [])
})

// ── THE LIVE SURFACE. These read what is actually served, so they move when the tool list moves. They assert the
// SHAPE of the answer rather than a frozen count, because a count of this repository today is a reading — and a
// test that pins a reading is the same category error the ratchet record was written to end.

test('every served tool name is callable as written — length and pattern both hold', () => {
  assert.deepEqual(overLongNames(TOOL_NAMES), [], 'a name a client would reject is unreachable however good the tool is')
  assert.deepEqual(malformedNames(TOOL_NAMES), [])
})

test('the count limit is reported against the live surface, with the scope stated rather than the gap', () => {
  const r = constraintReport(TOOL_NAMES)
  const otc = r.verdicts.find((v) => v.code === 'OTC')
  assert.ok(otc, 'OTC is reported')
  assert.equal(otc.satisfied, TOOL_NAMES.length <= OPENAI_TOOL_CAP)
  if (!otc.satisfied) {
    assert.match(otc.note, /STATED SCOPE/, 'an exceeded limit names the scope, never a demand to shrink')
    assert.match(otc.note, /uuidna_unify/, 'and names the one call that answers state without the surface')
  }
})
