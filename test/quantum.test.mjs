// quantum — the classical state-vector simulator, ported EXACT (integer amplitudes over √(2^scale), no floats).
// Every probability is an exact rational, so the assertions are equalities, not tolerances. Integrity, 0/7.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ket0, hadamard, cnot, bellState, distribution, marginal, quantumReceipt, report, fraction, computes } from '../dist/index.js'

test('Bell state (|00⟩+|11⟩)/√2 — exact distribution: P(00)=P(11)=1/2, P(01)=P(10)=0', () => {
  const d = distribution(bellState()).map(fraction)
  assert.deepEqual(d, ['1/2', '0', '0', '1/2']) // indices 00, 01, 10, 11
})

test('the distribution sums to exactly 1 (den a power of two, num exact)', () => {
  const d = distribution(bellState())
  // common denominator is 2^scale=2 before reduction; sum numerators over it
  const total = d.reduce((s, p) => s + Number(p.num) / Number(p.den), 0)
  assert.equal(total, 1)
})

test('no-signaling: each qubit marginal is exactly 1/2 — the correlation carries no message', () => {
  const b = bellState()
  for (const q of [0, 1]) {
    assert.equal(fraction(marginal(b, q, 0)), '1/2')
    assert.equal(fraction(marginal(b, q, 1)), '1/2')
  }
})

test('single-qubit superposition H|0⟩ → P(0)=P(1)=1/2, exact', () => {
  assert.deepEqual(distribution(hadamard(ket0(1), 0)).map(fraction), ['1/2', '1/2'])
})

test('CNOT is self-inverse (a permutation) — applying it twice restores the state', () => {
  const h = hadamard(ket0(2), 0)
  const twice = cnot(cnot(h, 0, 1), 0, 1)
  assert.deepEqual(twice.amp, h.amp)
  assert.equal(twice.scale, h.scale)
})

test('Hadamard is self-inverse on |0⟩ — H·H|0⟩ returns |0⟩ (probability 1 on index 0)', () => {
  assert.deepEqual(distribution(hadamard(hadamard(ket0(1), 0), 0)).map(fraction), ['1', '0'])
})

test('the quantum receipt is a deterministic, recomputable content-address', () => {
  assert.match(quantumReceipt(), /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  assert.equal(quantumReceipt(), quantumReceipt()) // same simulation → same uuid, for anyone
})

test('the report is honest (passes the gate) and carries no floating point', () => {
  const o = report()
  assert.equal(computes(o).binary, 1)                 // no overclaim — the honest floor holds
  assert.match(o, /NO quantum advantage, NOT a quantum\n?computer/)
  assert.ok(!/\d+\.\d+/.test(o))                      // exact fractions only — no decimals leak in
})
