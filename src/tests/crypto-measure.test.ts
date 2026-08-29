// crypto-measure — CONTROL for the Shannon meter (finding: p=1 reported 1 bit/byte).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeLog2, shannonBitsPerByte } from '../scripts/crypto-measure.js'
import { bitsOf, HEXBIT_BITS, COINS } from '../hexbit/index.js'

test('log2(1) is 0 — a constant buffer is zero entropy, not one bit/byte', () => {
  assert.equal(computeLog2(1), 0)
  assert.equal(computeLog2(0), 0)
  assert.equal(computeLog2(0.5), -1)
  const zeros = new Uint8Array(16)
  const z = shannonBitsPerByte(zeros)
  assert.equal(z.entropy, 0)
  assert.equal(z.n, 16)
  assert.equal(z.ceiling, bitsOf(16))
})

test('an n-byte sample ceilings at bitsOf(n), never the 8-bit alphabet', () => {
  const alphabet = HEXBIT_BITS * COINS
  const distinct = new Uint8Array(16)
  for (let i = 0; i < 16; i++) distinct[i] = i
  const s = shannonBitsPerByte(distinct)
  assert.equal(s.ceiling, bitsOf(16))
  assert.equal(s.entropy, s.ceiling)
  assert.ok(s.ceiling < alphabet)
})
