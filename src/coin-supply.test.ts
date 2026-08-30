// coin-supply — issuance is seals × coins(); the cap is capacity × combinations; the cipher widths are those coins.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { coins, coinSupply, theorems, UUID_BITS, KEY_BITS, LEVERAGE, RAYS, HEXAGRAM_BITS } from './index.js'

test('mint is seals × coins(); the cap is capacity × combinations', () => {
  const T = theorems()
  const S = coinSupply()
  assert.equal(S.coins, coins())
  assert.equal(S.unit, coins())
  assert.equal(S.seals, T.length)
  assert.equal(S.minted, T.length * coins())
  assert.equal(S.capacity, UUID_BITS)
  assert.equal(S.referrerDoors, HEXAGRAM_BITS)
  assert.equal(S.combinations, RAYS * (RAYS - 1))
  assert.equal(S.combinations, HEXAGRAM_BITS * RAYS)
  assert.equal(S.max, S.capacity * S.combinations)
  assert.equal(S.remaining, S.max - S.minted)
  assert.equal(S.capSeals * S.unit, S.max)
  assert.equal(S.unsealed * S.unit, S.remaining)
  assert.equal(S.search, coins() - coins())
  assert.notEqual(S.decimalSubunit, S.unit)
})

test('CONTROL: omitting a seal drops the mint by coins() and leaves the cap still', () => {
  const live = coinSupply()
  const omitted = coinSupply(live.seals - 1)
  assert.equal(omitted.minted, live.minted - coins())
  assert.equal(omitted.remaining, live.remaining + coins())
  assert.equal(omitted.max, live.max)
  assert.equal(omitted.capacity, live.capacity)
  assert.equal(omitted.combinations, live.combinations)
})

test('the cipher occupancy is the two coins doubled into the key, Grover floor one uuid', () => {
  const S = coinSupply()
  assert.equal(S.crypto.coinBits, LEVERAGE)
  assert.equal(S.crypto.floorBits, UUID_BITS)
  assert.equal(S.crypto.keyBits, KEY_BITS)
  assert.equal(S.crypto.coinsOnFloor, coins())
  assert.equal(S.crypto.coinsOnKey, coins() * coins())
  assert.equal(S.crypto.keyBits, S.crypto.floorBits * coins())
  assert.equal(S.crypto.keyBits % S.crypto.coinBits, 0)
})

test('each coin is witnessed by the fused ring', () => {
  const S = coinSupply()
  assert.equal(S.witness.neighbours + 1, S.witness.board)
  assert.equal(S.witness.coins, coins())
  assert.equal(S.witness.board, LEVERAGE)
})

test('the receipt recomputes; a different mint is a different receipt', () => {
  const S = coinSupply()
  assert.equal(coinSupply().receipt, S.receipt)
  assert.notEqual(coinSupply(S.seals - 1).receipt, S.receipt)
})
