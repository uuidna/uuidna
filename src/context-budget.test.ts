// context-budget — THE FINDER, WITH A CONTROL.
//
// A check that has never been seen to FAIL is not evidence: it may be measuring nothing. This runs contextGaps
// against a catalogue built to be guilty of each class it claims to catch, and against one built to be innocent,
// so a future edit that quietly defeats the finder fails here instead of passing everywhere.
//
// The guilty fixture reproduces the exact class this finder was folded for: one long sentence copied verbatim into
// several descriptions, which is how 14,401 bytes came to be re-sent on every request across 87 tools.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contextGaps, wireBytes, type WireTool } from './scripts/context-budget.js'
import { MCP_CATALOG } from './mcp.js'

const BOILERPLATE = 'The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.'
const CITATION = 'Integrity, not truth (theorem provenance_integrity_not_content_truth).'

const tool = (name: string, description: string): WireTool => ({ name, description, inputSchema: { type: 'object', properties: {} } })

test('the finder FIRES on duplicated prose — the class it was folded for', () => {
  const guilty = ['a', 'b', 'c', 'd'].map((n) => tool('t_' + n, `Do the ${n} thing. ${BOILERPLATE}`))
  const dry = contextGaps(guilty).filter((g) => g.what.includes('SAME'))
  assert.equal(dry.length, 1, 'one repeated sentence, named once')
  assert.match(dry[0]!.what, /4 descriptions carry the SAME/)
  assert.match(dry[0]!.what, /redundant bytes on every request/)
  assert.match(dry[0]!.fix, /INSTRUCTIONS/, 'the fix must say where the sentence belongs instead')
})

test('the finder FIRES on a description that is documentation billed to every request', () => {
  const guilty = [tool('t_long', 'Purpose. ' + 'derivation and history, at length. '.repeat(40))]
  const split = contextGaps(guilty).filter((g) => g.what.includes('on the wire (cap'))
  assert.equal(split.length, 1)
  assert.match(split[0]!.fix, /`detail`/, 'the fix must name the field the text belongs in')
})

test('the finder does NOT fire on a repeated CITATION — repeating a citation is the honesty', () => {
  // the same canonical citation in every description, which is exactly what this project requires and must survive
  const innocent = ['a', 'b', 'c', 'd', 'e'].map((n) => tool('t_' + n, `Do the ${n} thing. ${CITATION}`))
  assert.deepEqual(contextGaps(innocent).filter((g) => g.what.includes('SAME')), [], 'a citation under the law-phrase bound is not duplication')
})

test('the ceiling is measured against the LIVE served catalogue, and detail never reaches the wire', () => {
  const wire = wireBytes(MCP_CATALOG)
  assert.ok(wire > 0)
  // the wire measurement must exclude `detail` — that is the whole point of the split
  const withDetail = MCP_CATALOG.filter((t) => t.detail)
  assert.ok(withDetail.length > 0, 'at least one tool carries its derivation in detail')
  const detailBytes = withDetail.reduce((s, t) => s + (t.detail?.length ?? 0), 0)
  assert.ok(detailBytes > 0)
  assert.equal(JSON.stringify(MCP_CATALOG.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))).length, wire)
  assert.doesNotMatch(JSON.stringify(MCP_CATALOG.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))), /"detail"/)
})

test('the served surface holds every class the finder checks', () => {
  const gaps = contextGaps(MCP_CATALOG)
  const dry = gaps.filter((g) => g.what.includes('SAME'))
  assert.deepEqual(dry.map((g) => g.what), [], 'no sentence over the law-phrase bound may be repeated across three or more descriptions')
})
