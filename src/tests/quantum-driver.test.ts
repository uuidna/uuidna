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
  proveHardwareQuantum, runWitnesses, WITNESSES, hostQuantumDevice, LEVEL_PROBES, ledgerUnits, SIMULABLE_QUBITS,
  type Witness,
} from '../drivers/quantum/index.js'
import { theoremByKey } from '../theorems/index.js'

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
  assert.equal(a.simulableStates, 1 << SIMULABLE_QUBITS)
  assert.deepEqual([...a.witnesses].sort(), [...WITNESSES.map((w) => w.theorem)].sort())
})

test('the device never claims to be quantum — the honest scope is IN the record, not around it', () => {
  const d = hostQuantumDevice()
  assert.match(d.honest, /CLASSICAL HOST/)
  assert.match(d.honest, /no qubits/i)
  assert.match(d.honest, /n_qubit_dimension/)
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
