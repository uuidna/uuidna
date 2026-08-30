// deadkey — THE FINDER THAT CATCHES DEAD CITATIONS, ON TRIAL FOR THE FIRST TIME.
//
// deadkeyGaps has existed since 2026-08-21, written because docs/school.md cited a purged key in three places
// while the guard stayed green. It had NO TEST. A finder that only ever runs against the live tree can only be
// observed PASSING — on a clean tree it returns [] whether it works or not — which is exactly the vacuous audit
// scripts/api.ts names: if no input makes the check say no, it is measuring the shape of its own implementation.
//
// AND IT WAS NOT WORKING, MEASURED 2026-08-25. Two holes, both found by asking what it SKIPS rather than what it
// reports:
//
//   THE SHAPE required at least TWO underscores, so all 108 one-underscore sealed keys — 6.4% of 1,690 — were
//   invisible. The exact violation it was written for could recur across a sixteenth of the ledger in silence.
//
//   THE TESTS TREE was exempt WHOLESALE, because tests carry deliberate negative fixtures. Scanning it anyway
//   found three key-shaped tokens and only one was a fixture: two were PURGED THEOREM KEYS still quoted in
//   backticks, sitting inside the finder's own blind spot. An exemption written to spare a control was hiding
//   the very thing the finder is for.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { deadKeysInLine, deadkeyGaps } from './scripts/one-receipt.js'
import { theorems } from './index.js'
import { MCP_CATALOG } from './mcp.js'

const BT = String.fromCharCode(96)                       // the backtick, never written as a literal
/** a citation fixture BUILT rather than typed. The finder scans raw source lines, so a fixture containing a real
 *  backtick-plus-dead-key would be a dead citation IN THIS FILE — which is the whole reason the tests tree used to
 *  be exempt wholesale, and re-exempting it here would undo the fix this file exists to prove. The tree's own
 *  use-versus-mention law (scripts/api.ts) gives the answer: a banned token is banned in prose too, so describe
 *  the thing and never write its literal form. The backtick is assembled from its code point; the key names are
 *  ordinary strings that no scanner can mistake for a citation. */
const cite = (key: string): string => BT + key + BT

const sealed = new Set(theorems().map((t) => t.key))
const tools = new Set(MCP_CATALOG.map((t) => t.name))

test('THE CONTROL — the finder can say NO, which it has never been asked to prove', () => {
  // the mutation: a key-shaped token in backticks that the ledger does not seal
  assert.deepEqual(deadKeysInLine('see ' + cite('purged_dead_key_name') + ' for more', sealed, tools), ['purged_dead_key_name'])
  // and it must NOT fire on a key that IS sealed — a finder that flags everything is the same uselessness
  const live = [...sealed][0]!
  assert.deepEqual(deadKeysInLine(`backed by \`${live}\``, sealed, tools), [], 'a live citation is not a finding')
  assert.deepEqual(deadKeysInLine('no backticks here at all', sealed, tools), [])
  assert.deepEqual(deadKeysInLine(cite('nounderscore'), sealed, tools), [], 'a single word is not key-shaped')
})

test('ONE underscore is key-shaped — the 6.4% the old rule could not see', () => {
  // the old rule was {2,}. These are the shapes it skipped, and 108 sealed keys wear them.
  assert.deepEqual(deadKeysInLine(cite('digital_dead'), sealed, tools), ['digital_dead'], 'one underscore must be seen')
  assert.deepEqual(deadKeysInLine(cite('a_b_c_d'), sealed, tools), ['a_b_c_d'], 'and more underscores still are')

  // THE MUTATION THAT RESTORES THE BUG: with a two-underscore rule the first of these vanishes. Pinned as a
  // property of the live ledger rather than a number typed here — if the ledger ever holds no one-underscore
  // key this assertion stops meaning anything, and it should be deleted rather than quietly passing.
  const oneUnderscore = [...sealed].filter((k) => (k.match(/_/g) ?? []).length === 1)
  assert.ok(oneUnderscore.length > 50,
    `the ledger seals ${oneUnderscore.length} one-underscore keys; a two-underscore rule is blind to every one`)
})

test('a sealed key, an MCP tool name and a declared non-citation are all EXEMPT, and for different reasons', () => {
  assert.deepEqual(deadKeysInLine(cite('uuidna_address'), sealed, tools), [], 'a served tool is a different namespace')
  assert.deepEqual(deadKeysInLine(cite('uuidna_anything_at_all'), sealed, tools), [], 'and the prefix is tool-shaped by construction')
  // the ONE declared exemption: a Lean tactic, which is key-shaped and is not a key. The list may only shrink.
  assert.deepEqual(deadKeysInLine('a ' + cite('native_decide') + ' adds an axiom', sealed, tools), [],
    'a Lean tactic is a namespace, not a citation')
  // and the exemption must be NARROW — a near-miss is still caught
  assert.deepEqual(deadKeysInLine(cite('native_decided'), sealed, tools), ['native_decided'])
})

test('the LIVE tree cites no dead key — tests included, which is new', () => {
  // This is the assertion that would have been vacuous on its own. It is meaningful only because the control
  // above proves the instrument fires, and because the tests directory is now IN scope: the two purged keys it
  // used to hide are stated in words now (the use-versus-mention law), not exempted.
  const gaps = deadkeyGaps()
  assert.deepEqual(gaps.map((g) => g.what), [], 'a dead citation anywhere a reader trusts is a finding')
})
