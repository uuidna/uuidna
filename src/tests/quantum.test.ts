// quantum — the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale)). Verified the
// way the crypto KATs verify: exact KNOWN-ANSWER equality on integer positions, no tolerances, no decimal drift.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ket0, hadamard, cnot, cz, swap, toffoli, ccz, pauliX, pauliY, pauliZ, phaseS, phaseSdg,
  distribution, probability, marginal, amplitude, equalState, isInvolution, bellState, ghzState,
  receiptOf, quantumReceipt, report, fraction, computes,
  runCircuit, isClassical, classicalMap, truthTable,
  type QState, type GateOp,
} from '../index.js'

const dist = (s: QState): string[] => distribution(s).map(fraction)

// ── single-qubit gates — exact known answers ──────────────────────────────────────────────────────────────────
test('X|0⟩ = |1⟩', () => assert.deepEqual(dist(pauliX(ket0(1), 0)), ['0', '1']))
test('Z|0⟩ = |0⟩ (phase acts only on |1⟩)', () => assert.deepEqual(dist(pauliZ(ket0(1), 0)), ['1', '0']))
test('Y|0⟩ = i|1⟩ — probability on |1⟩, amplitude purely imaginary', () => {
  const y = pauliY(ket0(1), 0)
  assert.deepEqual(dist(y), ['0', '1'])
  assert.deepEqual(amplitude(y, 1), { re: 0n, im: 1n, scale: 0 })
})
test('H|0⟩ = |+⟩ — exact 1/2, 1/2', () => assert.deepEqual(dist(hadamard(ket0(1), 0)), ['1/2', '1/2']))

// ── Clifford identities — verified by EXACT amplitude equality (canonical form, no epsilon) ────────────────────
test('H·Z·H = X (on |0⟩)', () => assert.ok(equalState(hadamard(pauliZ(hadamard(ket0(1), 0), 0), 0), pauliX(ket0(1), 0))))
test('S·S = Z (on |+⟩)', () => assert.ok(equalState(phaseS(phaseS(hadamard(ket0(1), 0), 0), 0), pauliZ(hadamard(ket0(1), 0), 0))))
test('S·S† = I (on |+⟩)', () => assert.ok(equalState(phaseSdg(phaseS(hadamard(ket0(1), 0), 0), 0), hadamard(ket0(1), 0))))
test('H·H = I (on |0⟩)', () => assert.ok(equalState(hadamard(hadamard(ket0(1), 0), 0), ket0(1))))
test('X·X = I, Y·Y = I, Z·Z = I', () => {
  for (const g of [pauliX, pauliY, pauliZ]) assert.ok(equalState(g(g(hadamard(ket0(1), 0), 0), 0), hadamard(ket0(1), 0)))
})

// ── involutions — the self-inverse gates g∘g = I (the quantum analogue of dz∘dz = id) ─────────────────────────
test('X, Y, Z, H are involutions (g∘g = I) — verified via isInvolution on a live state', () => {
  const s = hadamard(ket0(1), 0) // a non-trivial 1-qubit state
  for (const g of [pauliX, pauliY, pauliZ, hadamard]) assert.ok(isInvolution((x) => g(x, 0), s), `${g.name} should be an involution`)
})
test('CNOT, CZ, SWAP, Toffoli, CCZ are involutions on entangled/superposed states', () => {
  const two = hadamard(ket0(2), 0), three = hadamard(hadamard(ket0(3), 0), 1)
  assert.ok(isInvolution((x) => cnot(x, 0, 1), two))
  assert.ok(isInvolution((x) => cz(x, 0, 1), two))
  assert.ok(isInvolution((x) => swap(x, 0, 1), two))
  assert.ok(isInvolution((x) => toffoli(x, 0, 1, 2), three))
  assert.ok(isInvolution((x) => ccz(x, 0, 1, 2), three))
})
test('S is NOT an involution — it has order 4 (S²=Z, S⁴=I); S·S†=I', () => {
  const s = hadamard(ket0(1), 0)
  assert.equal(isInvolution((x) => phaseS(x, 0), s), false)                              // S² = Z ≠ I
  assert.ok(equalState(phaseS(phaseS(phaseS(phaseS(s, 0), 0), 0), 0), s))                // S⁴ = I (order 4)
  assert.ok(isInvolution((x) => phaseS(phaseS(x, 0), 0), s))                             // but S² = Z IS an involution
  assert.ok(equalState(phaseSdg(phaseS(s, 0), 0), s))                                    // S·S† = I
})

// ── two- and three-qubit gates — exact permutations/phases ────────────────────────────────────────────────────
test('CNOT: |01⟩ → |11⟩ (control q0 set flips q1)', () => {
  assert.deepEqual(dist(cnot(pauliX(ket0(2), 0), 0, 1)), ['0', '0', '0', '1']) // index 3 = |11⟩
})
test('CZ: phase-flips |11⟩ only (probabilities unchanged, amplitude negates)', () => {
  const s = cz(pauliX(pauliX(ket0(2), 0), 1), 0, 1) // prepare |11⟩ then CZ
  assert.deepEqual(dist(s), ['0', '0', '0', '1'])
  assert.equal(amplitude(s, 3).re, -1n)
})
test('SWAP: |01⟩ ↔ |10⟩', () => assert.deepEqual(dist(swap(pauliX(ket0(2), 0), 0, 1)), ['0', '0', '1', '0']))
test('Toffoli: |110⟩ → |111⟩ (both controls set flip target)', () => {
  const prep = pauliX(pauliX(ket0(3), 0), 1) // q0=1, q1=1
  assert.deepEqual(dist(toffoli(prep, 0, 1, 2)), ['0', '0', '0', '0', '0', '0', '0', '1']) // index 7 = |111⟩
})
test('CCZ: phase-flips |111⟩ only', () => {
  const prep = pauliX(pauliX(pauliX(ket0(3), 0), 1), 2)
  const s = ccz(prep, 0, 1, 2)
  assert.deepEqual(dist(s), ['0', '0', '0', '0', '0', '0', '0', '1'])
  assert.equal(amplitude(s, 7).re, -1n)
})

// ── entangled states — exact distributions ────────────────────────────────────────────────────────────────────
test('Bell state (|00⟩+|11⟩)/√2 — exact 1/2, 0, 0, 1/2', () => assert.deepEqual(dist(bellState()), ['1/2', '0', '0', '1/2']))
test('no-signaling: each Bell marginal is exactly 1/2', () => {
  const b = bellState()
  for (const q of [0, 1]) { assert.equal(fraction(marginal(b, q, 0)), '1/2'); assert.equal(fraction(marginal(b, q, 1)), '1/2') }
})
test('GHZ(3) = (|000⟩+|111⟩)/√2 — only 000 and 111 carry 1/2', () => {
  const d = dist(ghzState(3))
  assert.equal(d[0], '1/2'); assert.equal(d[7], '1/2')
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((i) => d[i]), ['0', '0', '0', '0', '0', '0'])
})

// ── normalization, receipts, honesty ──────────────────────────────────────────────────────────────────────────
test('every distribution sums to exactly 1', () => {
  for (const s of [bellState(), ghzState(3), hadamard(ket0(1), 0), pauliY(ket0(1), 0)]) {
    const total = distribution(s).reduce((a, p) => a + Number(p.num) / Number(p.den), 0)
    assert.equal(total, 1)
  }
})
test('probability(i) agrees with the distribution', () => {
  const b = bellState()
  for (let i = 0; i < 4; i++) assert.equal(fraction(probability(b, i)), fraction(distribution(b)[i]))
})
test('the quantum receipt is deterministic and recomputable; distinct states → distinct receipts', () => {
  assert.match(quantumReceipt(), /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  assert.equal(quantumReceipt(), quantumReceipt())
  assert.notEqual(receiptOf(bellState()), receiptOf(ghzState(3)))
})
// ── operational: arbitrary circuits (OpenQASM gate names) and the classical bridge ────────────────────────────
test('runCircuit with OpenQASM gates reproduces Bell and GHZ', () => {
  assert.deepEqual(distribution(runCircuit(2, [{ gate: 'h', qubits: [0] }, { gate: 'cx', qubits: [0, 1] }])).map(fraction), ['1/2', '0', '0', '1/2'])
  const ghz = distribution(runCircuit(3, [{ gate: 'h', qubits: [0] }, { gate: 'cx', qubits: [0, 1] }, { gate: 'cx', qubits: [0, 2] }])).map(fraction)
  assert.equal(ghz[0], '1/2'); assert.equal(ghz[7], '1/2')
})
test('classical bridge: cx = XOR, ccx = reversible AND (truth table)', () => {
  // cx(q0→q1) is XOR: the basis permutation [0,3,2,1]
  assert.deepEqual(classicalMap(2, [{ gate: 'cx', qubits: [0, 1] }]), [0, 3, 2, 1])
  // ccx(q0,q1→q2) flips q2 iff q0∧q1 — the reversible AND into an ancilla
  const tt = truthTable(3, [{ gate: 'ccx', qubits: [0, 1, 2] }])
  assert.deepEqual(tt.find((r) => r.in === '011')!.out, '111') // q1q0=11 (index 3) → carry bit q2 set (index 7)
  assert.deepEqual(tt.find((r) => r.in === '001')!.out, '001') // only one control set → unchanged
})
test('classical bridge: a half-adder (sum = a⊕b, carry = a∧b) from cx + ccx', () => {
  // qubits: 0=a, 1=b, 2=carry, 3=sum(copy of b then xor a)
  const half: GateOp[] = [{ gate: 'ccx', qubits: [0, 1, 2] }, { gate: 'cx', qubits: [0, 1] }]
  const tt = truthTable(3, half)
  // a=1,b=1 (index 3): carry(q2)=1, and b←a⊕b=0 → outputs q0=1,q1=0,q2=1 = index 5
  assert.equal(tt.find((r) => r.in === '011')!.out, '101')
})
test('a circuit with H has no classical map (honestly flagged)', () => {
  assert.equal(isClassical([{ gate: 'h', qubits: [0] }, { gate: 'cx', qubits: [0, 1] }]), false)
  assert.throws(() => classicalMap(2, [{ gate: 'h', qubits: [0] }]), /no classical function/)
  assert.equal(isClassical([{ gate: 'cx', qubits: [0, 1] }, { gate: 'ccx', qubits: [0, 1, 2] }]), true)
})
test('runCircuit rejects unknown gates and out-of-range qubits', () => {
  assert.throws(() => runCircuit(2, [{ gate: 'cnot', qubits: [0, 1] } as unknown as GateOp]), /unknown gate/) // legacy name → not OpenQASM
  assert.throws(() => runCircuit(2, [{ gate: 'x', qubits: [5] }]), /out of range/)
})

test('the report is honest (passes the gate) and carries no floating point', () => {
  const o = report()
  assert.equal(computes(o).binary, 1)
  assert.match(o, /H·Z·H = X : true/)   // the identity computed, not asserted
  assert.match(o, /S·S = Z : true/)
  assert.ok(!/\d+\.\d+/.test(o))         // exact fractions only — no decimal drift
})
