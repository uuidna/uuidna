import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { ALLOWED_AXIOMS, parseAxiomReport, disallowedAxioms } from './axiom-report.js'
import { probe } from './scripts/queue-wave.js'

// A CANDIDATE CAN PASS `by decide` AND STILL DRAG AN AXIOM, and until now nothing could refuse it: the axiom
// audit runs over the SEALED ledger, and it will not certify partially — so one propext row blocks the witness
// for every theorem. These hold the door's new arm, and the kernel is the instrument.

const kernel = (() => { try { execSync('lean --version', { stdio: 'pipe' }); return true } catch { return false } })()

test('the trust base is the bare kernel — allowed axioms ∅', () => {
  assert.equal(ALLOWED_AXIOMS.size, 0, 'not even propext; widening this is a documented decision, never a drift')
})

test('parseAxiomReport reads both of the kernel’s verdict phrases', () => {
  assert.deepEqual(parseAxiomReport("'k' does not depend on any axioms"), { k: [] })
  assert.deepEqual(parseAxiomReport("'k' depends on axioms: [Classical.choice, propext]"), { k: ['Classical.choice', 'propext'] })
})

test('a primed Lean name survives the parse — the inner quote must not truncate it', () => {
  // `foo'` prints as `'foo''`; a `'([^']+)'` class stops at the inner quote, drops the theorem, then falsely
  // drains it as unaudited. This is why the capture is lazy up to the verbatim verdict phrase.
  assert.deepEqual(parseAxiomReport("'foo'' does not depend on any axioms"), { "foo'": [] })
})

test('no verdict is NOT a pass — null and [] are different answers', () => {
  assert.equal(disallowedAxioms('the kernel said nothing about it', 'k'), null, 'an absent instrument may never read as clean')
  assert.deepEqual(disallowedAxioms("'k' does not depend on any axioms", 'k'), [], 'this one the kernel vouched for')
})

// THE KERNEL ITSELF, on the two forms that decided this fold. Skipped where no toolchain is installed — the
// conveyor VOIDS a wave on an absent kernel rather than refusing, and a test may not be stricter than the door.
test('the door refuses a propext-dragging candidate the kernel accepts', { skip: !kernel && 'no lean toolchain' }, () => {
  const bad = probe({
    key: 'axiom_door_probe_propext',
    why: 'the form that passes by decide and drags propext — an equality of two Bool comparisons at Prop level',
    lean: 'theorem axiom_door_probe_propext : ((List.range 4).all (fun i => ((i == i) == ([7, 8, 9, 10].getD i 0 == [7, 8, 9, 10].getD i 0)))) := by decide',
  })
  assert.ok(bad, 'the kernel accepts this proof; the trust base does not accept its cost')
  assert.match(bad, /propext/)
  assert.match(bad, /allowed axioms ∅/)
})

test('the door admits the axiom-free restatement of the same claim', { skip: !kernel && 'no lean toolchain' }, () => {
  // .eraseDups.length is the axiom-free idiom for pairwise distinctness — the CONTROL, so an arm that refused
  // everything would fail here instead of looking thorough.
  assert.equal(probe({
    key: 'axiom_door_probe_clean',
    why: 'pairwise distinctness stated decidably, which the bare kernel checks without any axiom at all',
    lean: 'theorem axiom_door_probe_clean : ([738, 1334, 1333, 919].eraseDups.length = 4) := by decide',
  }), null)
})

test('a candidate the kernel REFUSES still reports the kernel’s own diagnostic', { skip: !kernel && 'no lean toolchain' }, () => {
  const bad = probe({
    key: 'axiom_door_probe_false',
    why: 'a false statement, so the kernel refuses the proof outright and the axiom arm never gets a say',
    lean: 'theorem axiom_door_probe_false : (2 + 2 = 5) := by decide',
  })
  assert.ok(bad, 'a false claim must not reach the wing')
  assert.doesNotMatch(bad, /absent instrument/, 'an elaboration failure is a refusal, not a missing verdict')
})
