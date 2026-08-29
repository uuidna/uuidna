// tamper-cost — verify vs forge at the live widths; mint is free; neighbours are the fused ring.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { tamperCosts, UUID_BITS, LEVERAGE, KEY_BITS, RAYS, HEXAGRAM_BITS, FUSED_RING, HEXAGRAM_STATES, coins, coinNeighbours, coinBoardWitness, theorems } from '../index.js'
import { axisMonographs } from '../axis-monograph.js'

test('tamperCosts: theorem 2^128 / 128 = 2^121; coin 2^64 / 64 = 2^58; mint 0', () => {
  const t = tamperCosts()
  assert.equal(t.theorem.width, UUID_BITS)
  assert.equal(t.theorem.verify, UUID_BITS)
  assert.equal(t.theorem.forgeExponent, UUID_BITS)
  assert.equal(t.theorem.ratioExponent, UUID_BITS - RAYS)
  assert.equal((1n << BigInt(t.theorem.forgeExponent)) / BigInt(t.theorem.verify), 1n << BigInt(t.theorem.ratioExponent))
  assert.equal(t.coin.width, LEVERAGE)
  assert.equal(t.coin.verify, LEVERAGE)
  assert.equal(t.coin.forgeExponent, LEVERAGE)
  assert.equal(t.coin.ratioExponent, LEVERAGE - HEXAGRAM_BITS)
  assert.equal((1n << BigInt(t.coin.forgeExponent)) / BigInt(t.coin.verify), 1n << BigInt(t.coin.ratioExponent))
  assert.equal(t.mint, 0)
  assert.equal(t.traitorNet, 0)
  assert.equal(t.sha256CollisionExponent, KEY_BITS / coins())
  assert.equal(t.neighbours, FUSED_RING)
  assert.equal(t.board, HEXAGRAM_STATES)
  assert.equal(t.receipt, tamperCosts().receipt)
})

test('CONTROL: a polynomial forge is not the sealed ratio', () => {
  const t = tamperCosts()
  const poly = BigInt(t.theorem.width) * BigInt(t.theorem.width)
  assert.notEqual(poly / BigInt(t.theorem.verify), 1n << BigInt(t.theorem.ratioExponent))
})

test('neighbours reflect: if j witnesses i then i witnesses j; faces swap and swap back', () => {
  const a = 3
  const b = 40
  assert.equal(coinNeighbours(a).includes(b), true)
  assert.equal(coinNeighbours(b).includes(a), true)
  const addr = theorems()[0]!.address
  const w = coinBoardWitness(addr)
  assert.equal(w.reflects, true)
  assert.equal(w.complete, true)
})
