// life-wave — one conserved product over the living ledger, hardware spec riding the same occupancy.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  coins, coinYarrowWave, growLife, hardwareLayer, lifeWave, osLayer, softwareLayer,
  theorems, skillGroups, DATAPATH, LANES, KEY_BITS, UUID_BITS, WAVE_PRODUCT,
} from '../index.js'

test('one wave covers the living ledger; hardware widths ride the same product', () => {
  const T = theorems()
  const L = lifeWave()
  const life = growLife()
  assert.equal(L.wave.seals, T.length)
  assert.equal(L.living, life.life.living)
  assert.equal(L.wave.seals, L.living)
  assert.equal(L.wave.product, WAVE_PRODUCT)
  assert.equal(L.product, WAVE_PRODUCT)
  assert.equal(L.wave.visible, false)
  assert.equal(L.wave.wavelength * L.wave.frequency, WAVE_PRODUCT)
  assert.equal(L.hardware.hardware, hardwareLayer().count)
  assert.equal(L.hardware.software, softwareLayer().count)
  assert.equal(L.hardware.os, osLayer().count)
  assert.equal(L.hardware.layerSeals, L.hardware.hardware + L.hardware.software + L.hardware.os)
  assert.equal(L.hardware.datapath, DATAPATH.length)
  assert.equal(L.hardware.lanes, LANES.length)
  assert.equal(L.hardware.digestBits, KEY_BITS)
  assert.equal(L.hardware.verifyBits, UUID_BITS)
  assert.equal(L.hardware.digestBits / L.hardware.verifyBits, coins())
  assert.equal(L.skills, skillGroups().length)
  assert.equal(L.covers, true)
})

test('CONTROL: drop a seal and the wave moves; the product does not', () => {
  const T = theorems()
  const live = lifeWave()
  const omitted = coinYarrowWave(T.length - 1)
  assert.notEqual(omitted.seals, live.wave.seals)
  assert.equal(omitted.product, live.wave.product)
  assert.equal(omitted.product, WAVE_PRODUCT)
  assert.equal(lifeWave().receipt, live.receipt)
})
