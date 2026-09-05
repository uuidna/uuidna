import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bellState, ghzState, runCircuit, parity, parityWitness, marginal, distribution, type GateOp } from './quantum/index.js'
import { callTool } from './mcp.js'

// ── WHY THIS EXISTS. A peer session measured this simulator's own output and found it could not distinguish the
// state it simulates: GHZ on 5 qubits reports {00000: 1/2, 11111: 1/2} with a marginal of 1/2 on every qubit,
// and a classical coin that flips all five bits together reports IDENTICAL outcomes and IDENTICAL marginals.
// Marginals never discriminate — they are 1/2 for GHZ, for a mixture, and for a product state under H. The
// separating observation is the parity AFTER H on every qubit, and it costs nothing that was not already
// computed. These tests hold both halves: that the old statistics do NOT separate, and that the new one does.

const H = (n: number): GateOp[] => Array.from({ length: n }, (_, q) => ({ gate: 'h' as const, qubits: [q] }))
const GHZ3: GateOp[] = [{ gate: 'h', qubits: [0] }, { gate: 'cx', qubits: [0, 1] }, { gate: 'cx', qubits: [1, 2] }]
const f = (p: { num: bigint; den: bigint }): string => `${p.num}/${p.den}`

// THE FAULT, HELD AS A TEST. If a future change makes marginals discriminate, this fails and the parity column
// stops being necessary — which is worth knowing. Until then it records why the column was added.
test('marginals and raw outcomes do NOT separate GHZ from a bit-flipping coin', () => {
  const g = ghzState(5)
  for (let q = 0; q < 5; q++) {
    assert.equal(f(marginal(g, q, 0)), '1/2', `qubit ${q}: the marginal is 1/2, exactly as a coin gives`)
    assert.equal(f(marginal(g, q, 1)), '1/2')
  }
  const support = distribution(g).map((p, i) => [i, p] as const).filter(([, p]) => p.num !== 0n)
  assert.equal(support.length, 2, 'two outcomes, at 1/2 each — the coin has the same two')
  assert.equal(f(parity(g).even), '1/2', 'and the parity in the computational basis is 1/2 too, so it also fails')
  assert.equal(parity(g).concentrated, false)
})

// THE PEER'S EXACT CASES, reproduced. Their stated results: GHZ_3 then H⊗3 gives {000,011,101,110} at 1/4 —
// even parity only; |000⟩ then H⊗3 gives all eight at 1/8 — both parities.
test('GHZ then H on every qubit reaches EVEN parity only — the peer\'s first case', () => {
  const s = runCircuit(3, [...GHZ3, ...H(3)])
  const p = parity(s)
  assert.equal(f(p.even), '1/1', 'all the weight is on even-parity strings')
  assert.equal(f(p.odd), '0/1')
  assert.deepEqual(p.support, { even: 4, odd: 0 }, 'four strings at 1/4, all even')
  assert.equal(p.concentrated, true)
  const evens = distribution(s).map((x, i) => [i, x] as const).filter(([, x]) => x.num !== 0n).map(([i]) => i)
  assert.deepEqual(evens, [0, 3, 5, 6], '000, 011, 101, 110 — exactly the even-parity strings')
})

// THE CONTROL. A product state under the same gates covers BOTH parities, so the witness is not something that
// fires on everything — without this, `concentrated: true` on GHZ would prove nothing about the measurement.
test('a product state under the same gates covers BOTH parities — the peer\'s second case', () => {
  const s = runCircuit(3, H(3))
  const p = parity(s)
  assert.equal(f(p.even), '1/2')
  assert.equal(f(p.odd), '1/2')
  assert.deepEqual(p.support, { even: 4, odd: 4 }, 'all eight strings at 1/8, both parities')
  assert.equal(p.concentrated, false, 'the witness must NOT fire here, or it separates nothing')
})

test('parity is exact and total: even + odd is 1 for every state, with no float anywhere', () => {
  for (const s of [bellState(), ghzState(1), ghzState(2), ghzState(3), ghzState(5), runCircuit(3, H(3))]) {
    const p = parity(s)
    assert.equal(p.even.num * p.odd.den + p.odd.num * p.even.den, p.even.den * p.odd.den,
      'the two classes must partition the distribution exactly')
    assert.equal(p.support.even + p.support.odd, distribution(s).filter((x) => x.num !== 0n).length,
      'the support counts must BE the non-zero outcomes, not a number beside them')
  }
})

test('parityWitness runs the measurement itself, and states what it does NOT witness', () => {
  for (const n of [2, 3, 4, 5]) {
    const w = parityWitness(ghzState(n))
    assert.equal(w.xBasisConcentrated, true, `GHZ-${n} must concentrate in the X basis`)
    assert.equal(w.distinguishesFromEqualMixture, true)
    assert.equal(w.hadamard.concentrated, true)
  }
  // A PRODUCT STATE THAT HAS NOT BEEN H-TRANSFORMED does not concentrate — so the measurement is not trivially
  // true of everything.
  for (const ops of [[] as GateOp[], [{ gate: 'x' as const, qubits: [0] }], [{ gate: 'x' as const, qubits: [0] }, { gate: 'x' as const, qubits: [1] }]]) {
    const flat = parityWitness(runCircuit(3, ops))
    assert.equal(flat.xBasisConcentrated, false, 'a computational-basis state spreads under H, covering both parities')
    assert.deepEqual(flat.hadamard.support, { even: 4, odd: 4 })
  }
  const w = parityWitness(ghzState(5))
  assert.match(w.honest, /does NOT separate/i, 'the raw-parity limit must be stated, not implied')
  assert.match(w.honest, /mixture itself is NOT simulated/i, 'a pure-state simulator cannot run the impostor')
})

test('uuidna_quantum serves the parity column beside the marginals', () => {
  const r = callTool('uuidna_quantum', { circuit: 'ghz', qubits: 5 }) as {
    marginals: { p0: string }[]
    parity: { measured: { even: string; concentrated: boolean }; hadamard: { even: string; concentrated: boolean }; xBasisConcentrated: boolean; distinguishesFromEqualMixture: boolean; honest: string }
  }
  assert.equal(r.marginals[0]!.p0, '1/2', 'the marginal that cannot discriminate is still reported')
  assert.equal(r.parity.measured.even, '1/2', 'and so is the raw parity, which also cannot')
  assert.equal(r.parity.measured.concentrated, false)
  assert.equal(r.parity.hadamard.even, '1', 'the X-basis parity is where the information is')
  assert.equal(r.parity.xBasisConcentrated, true)
  assert.equal(r.parity.distinguishesFromEqualMixture, true, 'the claim that survives the refutation')
  assert.match(r.parity.honest, /standard argument/i)
  assert.match(r.parity.honest, /DOES NOT WITNESS/i, 'the served answer must carry the limit, not just the source')
})

// ── THE COUNTEREXAMPLE, RESTORED AS A NAMED TEST because I deleted it once as a broken control.
//
// A peer computed against the first version of this claim and refuted it. |+++⟩ = H⊗3|000⟩ is a PRODUCT state —
// |+⟩⊗|+⟩⊗|+⟩, zero entanglement, separable by inspection — and it concentrates MAXIMALLY under this witness:
// one outcome of eight, tighter than GHZ_3's four of eight. So X-basis concentration does not imply
// entanglement; it is alignment with the measurement basis, and separable states qualify.
//
// IT WAS ALREADY IN THIS FILE AS THE NEGATIVE CONTROL AND I REMOVED IT. Feeding H⊗3|000⟩ to a witness that
// applies H⊗3 itself returns |000⟩, which concentrates. I read that as a control undoing itself, called the
// test wrong, and replaced it with untransformed product states — deleting the one case that showed the
// over-claim. The instrument was right and my expectation was wrong. It is a named test now, not a control,
// so that removing it requires deleting a test whose title says what it is for.
test('a PRODUCT state concentrates maximally — X-basis concentration is not an entanglement witness', () => {
  const plus = runCircuit(3, H(3))                       // |+++⟩ — zero entanglement
  const w = parityWitness(plus)
  assert.equal(w.xBasisConcentrated, true, '|+++⟩ concentrates, and it is separable — so the two are independent')
  assert.deepEqual(w.hadamard.support, { even: 1, odd: 0 }, 'ONE outcome of eight: tighter than GHZ_3')
  const ghz = parityWitness(ghzState(3))
  assert.deepEqual(ghz.hadamard.support, { even: 4, odd: 0 }, 'GHZ_3 concentrates on four of eight')
  assert.ok(w.hadamard.support.even < ghz.hadamard.support.even,
    'the product state is MORE concentrated than the entangled one, which is the whole refutation')
})

test('the honest field states the refutation, so a reader cannot take concentration for entanglement', () => {
  const w = parityWitness(ghzState(5))
  assert.match(w.honest, /does not witness|DOES NOT WITNESS/i)
  assert.match(w.honest, /\|\+\+\+>/, 'the counterexample must be named in the tool\'s own answer')
  assert.match(w.honest, /equal mixture/i, 'and the claim that DOES survive must be stated')
  assert.equal(w.distinguishesFromEqualMixture, w.xBasisConcentrated,
    'the surviving claim rides the same measurement — stated separately so the names cannot drift apart')
})
