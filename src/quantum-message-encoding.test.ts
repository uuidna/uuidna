// quantum message — a key encoded in a phase is a key nobody can read.
//
// The encoding applied hadamardX for a set bit and hadamard for an unset one. Those states are algebraically
// distinct and have the IDENTICAL distribution, 1/2 1/2 per qubit, because they differ only in sign. Every receipt
// was therefore the same constant for every theorem and every plaintext, while the comment called it
// tamper-evident. The denominator was ALSO wrong — BigInt(1 << (scale * 2)) wraps to 1 at scale 16 — but fixing
// that alone changed nothing, which is how the real cause surfaced.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encodeMessage, measureMessage } from './index.js'
import { hadamard, hadamardX, ket0, distribution, fraction } from './index.js'
import { theorems } from './index.js'

test('the two gates the encoding used are INDISTINGUISHABLE by measurement', () => {
  const h = distribution(hadamard(ket0(1), 0)).map(fraction)
  const hx = distribution(hadamardX(ket0(1), 0)).map(fraction)
  assert.deepEqual(h, hx, 'phase-only difference — this is why the key was unreadable')
})

// ── THE FIX. Distinct theorems must give distinct receipts.
test('distinct theorems give distinct quantum receipts', () => {
  const keys = theorems().slice(0, 6).map((t) => t.key)
  const receipts = keys.map((k) => encodeMessage('hello', k).quantum.receipt)
  assert.equal(new Set(receipts).size, receipts.length, 'a constant receipt identifies nothing')
})

test('measureMessage recovers bits', () => {
  const out = measureMessage(encodeMessage('hello', theorems()[0].key))
  assert.ok(!/^0+$/.test(out), 'all-zeros was the old failure: p1 > p0 could never be true')
  assert.match(out, /^[01]+$/)
})

test('measurement is deterministic — the same message measures the same', () => {
  const k = theorems()[1].key
  assert.equal(measureMessage(encodeMessage('x', k)), measureMessage(encodeMessage('x', k)))
})

// ── HONEST SCOPE. The quantum receipt is evidence about the THEOREM CITED.
test('the quantum receipt folds the theorem, and the message fold carries the content', () => {
  const k = theorems()[0].key
  const a = encodeMessage('hello', k), b = encodeMessage('DIFFERENT', k)
  assert.equal(a.quantum.receipt, b.quantum.receipt, 'the state encodes the key, so it must not move with plaintext')
  assert.notEqual(a.fold, b.fold, 'message identity MUST move with the content')
})
