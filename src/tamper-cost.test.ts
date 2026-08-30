// tamper-cost — verify vs forge at handle/coin/uuid tiers; neighbour + related witnesses; mint is free.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { tamperCosts, UUID_BITS, LEVERAGE, KEY_BITS, RAYS, HEXAGRAM_BITS, FUSED_RING, HEXAGRAM_STATES, COINS, HANDLE_HEXBITS, coins, coinNeighbours, coinBoardWitness, theorems } from './index.js'
import { HANDLE_BITS } from './hexbit/index.js'
import { LEGS } from './rosetta-legs.js'
import { axisMonographs } from './axis-monograph.js'

test('tamperCosts: handle 2^32; coin 63+1=64; uuid 63·2+2=128 with locate legs; mint 0', () => {
  const t = tamperCosts()
  assert.equal(t.handle.width, HANDLE_BITS)
  assert.equal(t.handle.forgeExponent, HANDLE_BITS)
  assert.equal(t.handle.completionExponent, UUID_BITS - HANDLE_BITS)
  assert.equal(t.handle.forgeWithWitnessesExponent, UUID_BITS)
  assert.equal(t.handle.relatedWitnesses, 3)
  assert.equal(t.handle.neighbourWitnesses, FUSED_RING)
  assert.equal(t.coin.width, LEVERAGE)
  assert.equal(t.coin.neighbourWitnesses, FUSED_RING)
  assert.equal(t.coin.closure, 1)
  assert.equal(t.coin.forgeWithWitnessesExponent, FUSED_RING + 1)
  assert.equal(t.coin.relatedWitnesses, 1)
  assert.equal(t.theorem.width, UUID_BITS)
  assert.equal(t.theorem.neighbourWitnesses, FUSED_RING * COINS)
  assert.equal(t.theorem.closure, COINS)
  assert.equal(t.theorem.forgeWithWitnessesExponent, FUSED_RING * COINS + COINS)
  assert.equal(t.theorem.relatedWitnesses, 3)
  assert.equal(t.theorem.forgeWithWitnessesExponent, UUID_BITS)
  assert.equal(t.theorem.ratioExponent, UUID_BITS - RAYS)
  assert.equal(t.coin.ratioExponent, LEVERAGE - HEXAGRAM_BITS)
  assert.equal((1n << BigInt(t.theorem.forgeExponent)) / BigInt(t.theorem.verify), 1n << BigInt(t.theorem.ratioExponent))
  assert.equal((1n << BigInt(t.coin.forgeExponent)) / BigInt(t.coin.verify), 1n << BigInt(t.coin.ratioExponent))
  assert.equal(t.mint, 0)
  assert.equal(t.traitorNet, 0)
  assert.equal(t.sha256CollisionExponent, KEY_BITS / coins())
  assert.equal(t.neighbours, FUSED_RING)
  assert.equal(t.board, HEXAGRAM_STATES)
  assert.equal(t.handlesPerUuid, 4)
  assert.equal(t.handlesPerCoin, 2)
  assert.equal(t.rosettaLegs, LEGS.length)
  assert.equal(t.locateLegs, 3)
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
