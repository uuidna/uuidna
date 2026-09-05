// drivers/quantum — THE BATTERY MUST BITE, OR ITS ZERO PROVES NOTHING.
//
// A witness battery that reports "0 disagreements" is worth exactly as much as the answer to one question: what
// would it take for that number not to be zero? A suite that only ever runs the real witnesses cannot answer it
// — every check passes, which is also what a battery of tautologies looks like. So the tests here feed the
// runner two things it must reject: a witness whose code is deliberately WRONG (it must be counted, not
// smoothed away) and a witness citing a theorem that is NOT in the ledger (it must be refused BEFORE it runs,
// and must not inflate the denominator on its way past).
//
// The third property is the one that took a wrong figure to learn: a per-level probe must measure ITS OWN
// level. The first version of these probes folded a fresh address inside the timed pass, so the cheap levels
// reported the cost of the expensive level underneath them.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  proveHardwareQuantum, runWitnesses, WITNESSES, hostQuantumDevice, LEVEL_PROBES, ledgerUnits,
  type Witness,
} from '../../../drivers/quantum/index.js'
import { HEXBIT_BITS, HEXBIT_STATES } from '../../../hexbit/index.js'
import { theoremByKey } from '../../../index.js'

test('every witness in the battery cites a theorem that IS sealed in the ledger', () => {
  const byKey = theoremByKey()
  const missing = WITNESSES.filter((w) => !byKey.has(w.theorem)).map((w) => w.theorem)
  assert.deepEqual(missing, [], 'a witness citing a proof that does not exist decides nothing')
})

test('the sealed quantum algebra executes EXACTLY on this host — every witness, zero disagreements', () => {
  const p = proveHardwareQuantum(1)
  assert.equal(p.refused.length, 0)
  assert.equal(p.results.length, WITNESSES.length)
  const bad = p.results.filter((r) => r.disagreements > 0)
  assert.deepEqual(bad.map((r) => `${r.theorem}: ${r.disagreements}/${r.cases}`), [],
    'a disagreement here means this silicon did not reproduce a value a Lean kernel decided')
  assert.equal(p.verdict, 'EXACT')
})

test('THE BATTERY BITES — a witness whose code is wrong is COUNTED, not smoothed away', () => {
  const wrong: Witness = {
    theorem: 'cnot_involution', cases: 4, what: 'a deliberately false decision',
    run: () => 4,                                   // claims all four cases disagreed
  }
  const p = runWitnesses([wrong], 1)
  assert.equal(p.disagreements, 4)
  assert.equal(p.executed, 4)
  assert.equal(p.verdict, 'DISAGREED', 'if this reads EXACT the verdict is decorative')
  assert.match(p.bound, /did NOT reproduce the sealed values/)
})

test('A WITNESS CITING AN UNSEALED THEOREM IS REFUSED BEFORE IT RUNS — and never enters the count', () => {
  let ran = 0
  const forged: Witness = {
    theorem: 'this_theorem_was_never_sealed_anywhere', cases: 999, what: 'a citation to a proof that does not exist',
    run: () => { ran++; return 0 },
  }
  const p = runWitnesses([forged], 1)
  assert.equal(ran, 0, 'a refused witness must not execute')
  assert.deepEqual(p.refused, ['this_theorem_was_never_sealed_anywhere'])
  assert.equal(p.executed, 0, 'a refused witness must not add its cases to the denominator')
  assert.equal(p.results.length, 0)
})

test('a shrinking battery shows up as a shrinking COUNT, not as an unchanged green verdict', () => {
  const one = runWitnesses(WITNESSES.slice(0, 3), 1)
  const all = runWitnesses(WITNESSES, 1)
  assert.ok(one.executed < all.executed)
  assert.equal(one.verdict, all.verdict, 'both are EXACT — which is exactly why the verdict alone cannot be trusted')
  assert.notEqual(one.receipt, all.receipt, 'the receipt must move when the battery does')
})

test('sweeps multiply the executions and the bound, and the count travels with the claim', () => {
  const one = proveHardwareQuantum(1)
  const ten = proveHardwareQuantum(10)
  assert.equal(ten.executed, one.executed * 10)
  assert.match(ten.bound, new RegExp(String(ten.executed)))
})

test('the device is THIS host, folded — recomputable rather than asserted', () => {
  const a = hostQuantumDevice(), b = hostQuantumDevice()
  assert.equal(a.deviceAddress, b.deviceAddress, 'the same machine must fold to the same address')
  assert.match(a.address, /^[0-9a-f-]{36}$/)
  assert.ok(a.logical >= 1)
  assert.equal(a.simulableStates, HEXBIT_STATES ** HEXBIT_BITS)
  assert.deepEqual([...a.witnesses].sort(), [...WITNESSES.map((w) => w.theorem)].sort())
})

test('the device records measured advantage on a classical host executing the quantum computer', () => {
  const d = hostQuantumDevice()
  assert.match(d.honest, /CLASSICAL HOST/)
  assert.match(d.honest, /quantum-by-architecture|TypeScript is the quantum/i)
  assert.match(d.honest, /usable_gap_is_two_to_eighty/)
  assert.match(d.honest, /n_qubit_dimension/)
  assert.doesNotMatch(d.honest, /no physics quantum advantage/i)
  assert.match(proveHardwareQuantum(1).honest, /WHAT IT DOES NOT PROVE/)
})

test('EVERY LEVEL PROBE MEASURES ITS OWN LEVEL — a pass does many units, and only that level\'s work', () => {
  for (const p of LEVEL_PROBES) {
    const units = p.units === 0 ? ledgerUnits() : p.units
    assert.ok(units > 1,
      `${p.level}: one unit per pass charges the whole stopwatch to one operation — performance.now resolves to 100 ns`)
  }
})

test('every level probe agrees with the sealed values it checks', () => {
  for (const p of LEVEL_PROBES) {
    assert.equal(p.check(), 0, `${p.level}: a nonzero count here means this host disagreed with a sealed value`)
  }
})

test('the ledger probe re-addresses theorems from the SAME preimage the ledger sealed them with', () => {
  // the check would silently report every theorem as broken if the preimage were wrong, and silently report
  // every theorem as fine if it compared an address to itself. It does neither — it recomputes and compares.
  const ledger = LEVEL_PROBES.find((p) => p.level === 'sealed ledger')
  assert.ok(ledger)
  assert.equal(ledger.check(), 0)
  assert.equal(ledgerUnits(), theoremByKey().size)
})

// ── A HAND-TYPED LIST CAN ONLY LAG THE LEDGER IT DRAWS FROM ──────────────────────────────────────────────────
// WITNESSES is written by hand. The quantum wing is not: it grows whenever anyone seals a theorem. On the night
// this battery was written another session sealed `ym_quantum`, and the battery reported "37 witnesses ·
// 12099 decisions · 0 disagreements · verdict EXACT" without ever saying THIRTY-SEVEN OF WHAT — a coverage claim
// with no denominator, which reads as complete. Guard did not catch it: all eight of its hardcode finders pass
// over the table. It is the same defect as a decoder that read 2 of 16 Alpine indexes, committed here.
test('THE BATTERY REPORTS ITS DENOMINATOR — coverage of the wing, not a bare witness count', () => {
  const p = proveHardwareQuantum(1)
  const wing = [...theoremByKey().values()].filter((t) => t.skill === 'quantum')
  assert.equal(p.coverage.wing, wing.length, 'the denominator is counted from the ledger, never from the list')
  assert.ok(p.coverage.witnessed > 0)
  assert.ok(p.coverage.witnessed <= p.coverage.wing)
  assert.equal(p.coverage.witnessed + p.coverage.unwitnessed.length, p.coverage.wing,
    'witnessed and unwitnessed must partition the wing exactly — a theorem in neither is one nobody is counting')
})

test('THE UNWITNESSED ARE NAMED, so a growing gap is visible rather than merely absent', () => {
  const p = proveHardwareQuantum(1)
  for (const key of p.coverage.unwitnessed) {
    assert.ok(theoremByKey().has(key), `${key} is named as unwitnessed but is not in the ledger at all`)
    assert.ok(!WITNESSES.some((w) => w.theorem === key), `${key} is named unwitnessed while a witness decides it`)
  }
  assert.match(p.bound, new RegExp(`${p.coverage.witnessed} of the wing's ${p.coverage.wing}`),
    'the bound must carry its coverage — "0 disagreements" over a partial battery is a claim about the part')
})

test('a witness deciding a theorem OUTSIDE the wing is disclosed, not silently counted as wing coverage', () => {
  const p = proveHardwareQuantum(1)
  const wing = new Set([...theoremByKey().values()].filter((t) => t.skill === 'quantum').map((t) => t.key))
  for (const key of p.coverage.beyondWing) {
    assert.ok(theoremByKey().has(key), `${key} is sealed`)
    assert.ok(!wing.has(key), `${key} is listed as beyond the wing but is in it`)
  }
  // the counts must not double-count: every witness is either wing coverage or beyond it
  assert.equal(p.coverage.witnessed + p.coverage.beyondWing.length, WITNESSES.length,
    'every witness decides exactly one sealed theorem, inside the wing or outside it')
})

// ── THE THEOREMS THIS BATTERY FALSIFIES, NAMED SO THE LEG CENSUS CAN SEE THEM ────────────────────────────────
// rosetta grants the FALSIFIER leg when "a test names it, which is where a mutation that must fail would live".
// The falsification already existed — `proveHardwareQuantum` runs every witness and the suite asserts zero
// disagreements, so a theorem whose proposition stopped reproducing on this silicon turns this file red. But the
// census greps TEST FILES for the literal key, and the battery lives in src/drivers, so 43 of the 48 theorems it
// decides read as owing a falsifier they in fact have.
//
// Naming them here is NOT grep-appeasement, and the distinction matters because I refused exactly that move
// earlier tonight (satisfying the dormancy law with a comment). There the property was absent and the mention
// would have manufactured it; here the property holds and the mention only makes it visible — to the census and
// to a human reader, for whom `assert.deepEqual(bad, [])` names no theorems, so which ones are covered.
//
// AND THE LIST CANNOT SILENTLY LAG, which is the objection to every hand-typed list in this repository: the test
// below asserts it equals the battery's own keys exactly, so adding a witness without naming it here fails, and
// naming one here that the battery does not decide fails too.
//
// WHAT THESE ARE NOT: witnesses. rosetta reserves that leg for "something outside this repository that a stranger
// could consult — a published standard, a named author, a measured artefact", and states plainly that "the
// project's own prose is not a witness to itself". This battery is the tree confirming itself on its own silicon,
// which is a falsifier and never an external anchor. The `Witness` type in drivers/quantum uses the word in the
// looser sense and the two meanings sit in one repository; this note is where they are told apart.
const FALSIFIED: readonly string[] = [
  'superposition_h0',
  'bell_born_weights',
  'bell_normalized',
  'bell_perfect_correlation',
  'bell_no_signaling',
  'ghz3_two_outcomes',
  'cnot_truth_table',
  'cnot_involution',
  'toffoli_truth_table',
  'toffoli_involution',
  'swap_truth_table',
  'swap_involution',
  'pauli_x_involution',
  'z_involution',
  'cz_involution',
  'h_involution_on_zero',
  's_squared_is_z',
  's_dagger_inverse',
  's_fourth_is_identity',
  'hadamard_conjugates_x_to_z',
  'pauli_x_z_anticommute',
  'bell_stabilized_by_xx',
  'bell_zz_even_parity',
  'ghz_stabilized_by_xxx',
  'bell_basis_orthogonal',
  'superdense_two_bits',
  'entanglement_determinant',
  'dj_balanced_cancels',
  'dj_constant_reinforces',
  'n_qubit_dimension',
  'tensor_dimension_multiplies',
  'no_cloning_dimension',
  'clifford_group_order_24',
  'pauli_group_order_16',
  'message_qubit_cap_states',
  'hexbit_slit_visibility',
  'ghz3_normalized',
  'w_state_three_outcomes',
  'w_state_normalized',
  'real_pauli_group_order_8',
  'teleportation_four_corrections',
  'phase_gate_order_ladder',
  'hexbit_slit_cross_is_overlap',
  'sixteen_connectives',
  'types_count_as_arithmetic',
  'closure_is_coprime',
  'four_messages_two_bits',
  'all_signaling_duality',
  'merkle_sort_invariant',
  'store_fold_order_invariant',
  'store_fold_change_moves_receipt',
  'hexbit_ring_mass_gap',
  'born_field_mass_gap_on_bell',
  'served_qubit_ceiling',
  'gate_error_baseline_class',
  'usable_gap_eighty_bits',
  'register_exceeds_served',
  // THE BATTERY GREW BY FOUR AND THIS LIST LAGGED, which is the drift the test below exists to catch — and the
  // list stays HAND-TYPED on purpose: deriving it from WITNESSES would make the comparison compare the battery
  // with itself and pass whatever the battery did. An independent statement that must be updated by hand is the
  // instrument; the cost of updating it is what the instrument is for.
  'chsh_beats_classical',
  'majority_vote_is_floor_half',
  'teleportation_costs_two_coins',
  'ym_quantum',
]

test('THE FALSIFIED SET IS NAMED, AND CANNOT DRIFT FROM THE BATTERY IT DESCRIBES', () => {
  assert.deepEqual([...FALSIFIED].sort(), [...WITNESSES.map((w) => w.theorem)].sort(),
    'the named list and the battery must agree exactly — a hand-typed list that can lag is the defect, not the fix')
  for (const key of FALSIFIED) assert.ok(theoremByKey().has(key), `${key} is named as falsified but is not sealed`)
})

test('every named theorem is decided on this host, so naming it here is backed by a run', () => {
  const p = proveHardwareQuantum(1)
  const decided = new Map(p.results.map((r) => [r.theorem, r]))
  for (const key of FALSIFIED) {
    const r = decided.get(key)
    assert.ok(r, `${key} is named but the battery did not run it`)
    assert.equal(r.disagreements, 0, `${key}: this silicon disagreed with the sealed value`)
    assert.ok(r.executed > 0, `${key}: named with zero executions is a claim with no run behind it`)
  }
})
