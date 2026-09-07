import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { writeFileSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { ALLOWED_AXIOMS, parseAxiomReport, disallowedAxioms, inadmissibleIn, AXIOM_INADMISSIBLE } from './axiom-report.js'
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

// ── THE ONE INADMISSIBLE FAMILY. Of fourteen List primitives probed against the kernel, exactly two drag
// propext and both are INDEXED ACCESS. Two sessions hit this tonight and both cured it by restating the claim;
// the cure worked because it stopped indexing, which neither of them knew. These hold the naming so the next
// hand gets a substitution instead of a trial loop.
import { theorems } from './theorems/index.js'

test('inadmissibleIn names the construct and what to use instead', () => {
  const hit = inadmissibleIn('theorem x : [1,2,3].getD 1 0 = 2 := by decide')
  assert.equal(hit.length, 1)
  assert.equal(hit[0]!.form, '.getD')
  assert.match(hit[0]!.instead, /\.all|\.eraseDups/)
})

test('a statement that indexes nowhere names nothing — the control', () => {
  assert.deepEqual(inadmissibleIn('theorem x : [1,2,2].eraseDups.length = 2 := by decide'), [])
  assert.deepEqual(inadmissibleIn('theorem x : (List.range 7).all (fun i => i < 7) := by decide'), [])
})

test('every inadmissible form carries a cause and a substitution — no bare ban', () => {
  for (const r of AXIOM_INADMISSIBLE) {
    assert.ok(r.why.length > 20, `${r.form} states why`)
    assert.ok(r.instead.length > 20, `${r.form} states what to use instead`)
  }
})

// THE LEDGER HOLDS THE LINE, and this is the assertion that keeps it held: no sealed statement may index.
// Zero of 2657 do today, and the audit has been refusing them one at a time without anyone naming the rule.
test('no sealed theorem uses an inadmissible form', () => {
  const offenders = theorems().filter((t) => inadmissibleIn(t.statement).length > 0)
  assert.deepEqual(offenders.map((t) => t.key), [],
    'a sealed statement that indexes would mean the axiom audit and this rule disagree — one of them would be wrong')
})

test('the KERNEL agrees: indexed access drags propext, structural access does not', { skip: !kernel && 'no lean toolchain' }, () => {
  const ax = (stmt: string): string[] | null => {
    const f = join(tmpdir(), 'uuidna-adm-probe.lean')
    writeFileSync(f, `theorem adm_probe : ${stmt} := by decide\n#print axioms adm_probe\n`)
    try { return disallowedAxioms(execSync(`lean ${JSON.stringify(f)}`, { encoding: 'utf8', stdio: ['ignore','pipe','pipe'] }), 'adm_probe') }
    finally { try { unlinkSync(f) } catch { /* disposable */ } }
  }
  assert.deepEqual(ax('[1,2,3].getD 1 0 = 2'), ['propext'], 'the measured fact this rule exists for')
  assert.deepEqual(ax('[1,2,2].eraseDups.length = 2'), [], 'and the substitution the rule prescribes is clean')
})

// ── per-wing receipts (lead 228): the question is the wing's text AND the keys asked, and only a moved wing re-asks
import { wingAskedKey, reusableWings } from './axiom-report.js'
test('a wing\'s asked key moves with its text and with its keys, and a prior receipt answers only the identical question', () => {
  const a = wingAskedKey('theorem x : 1 = 1 := by decide', ['x'])
  assert.equal(a, wingAskedKey('theorem x : 1 = 1 := by decide', ['x']), 'deterministic')
  assert.notEqual(a, wingAskedKey('theorem x : 2 = 2 := by decide', ['x']), 'the text is part of the question')
  assert.notEqual(a, wingAskedKey('theorem x : 1 = 1 := by decide', ['x', 'y']), 'the keys are part of the question')
  const prior = { 'A.lean': { asked: a, verdict: { x: [] } }, 'B.lean': { asked: 'stale', verdict: { y: [] } } }
  const r = reusableWings(prior, { 'A.lean': a, 'B.lean': 'fresh', 'C.lean': 'new' })
  assert.deepEqual(r, { reuse: ['A.lean'], probe: ['B.lean', 'C.lean'] }, 'unchanged reads back; moved and new go to the kernel')
  assert.deepEqual(reusableWings(undefined, { 'A.lean': a }), { reuse: [], probe: ['A.lean'] }, 'CONTROL — no receipt, everything is asked')
})
