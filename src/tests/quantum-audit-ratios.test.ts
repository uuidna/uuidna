import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  quantumAuditRatios,
  uuidnaDecode,
  decodeAngles,
  decodeLife,
  decodePolarities,
  rosettaRayDegrees,
  bidirectionalRatio,
  rosettaRayOf,
} from '../quantum-audit-ratios.js'
import { THEOREMS } from '../theorems/index.js'
import { runSequence } from '../sequence-run.js'

test('decodeAngles — dash closes and rosetta step is 360/7', () => {
  const a = decodeAngles()
  assert.equal(a.dashStepDegrees, 60)
  assert.equal(a.rosettaRayStep, 51)
  assert.equal(a.closes, true)
  assert.equal(a.weightedBearing, 0)
})

test('decodePolarities — minus and plus buckets exist on live ledger', () => {
  const p = decodePolarities()
  assert.ok(p.minus + p.neutral + p.plus === THEOREMS.length)
  assert.equal(p.capacity.minus, 4)
  assert.equal(p.capacity.neutral, 2)
  assert.equal(p.capacity.plus, 4)
  assert.equal(p.byRay.length, 7)
})

test('rosettaRayDegrees — ray 3 integer step from 360/7', () => {
  assert.equal(rosettaRayDegrees(3), (3 * (360 / 7)) | 0)
})

test('bidirectionalRatio — balanced when counts match', () => {
  const r = bidirectionalRatio('test', 7, 7, 'a', 'b')
  assert.equal(r.balanced, true)
  assert.equal(r.forward, 1)
  assert.equal(r.reverse, 1)
})

test('quantumAuditRatios — fused receipt is deterministic', () => {
  const [a, b] = [quantumAuditRatios(), quantumAuditRatios()]
  assert.equal(a.fused, b.fused)
  assert.equal(a.rosetta.maskCoins, 160)
  assert.equal(a.kernel.balanced, a.kernel.a === a.kernel.b)
  assert.ok(a.life.living.count > 0)
  assert.equal(a.life.os.fourWidths.length, 4)
})

test('decodeLife — uuidnaOS boot and living ledger cross-read', () => {
  const life = decodeLife()
  assert.ok(life.os.bootStates > 0)
  assert.equal(life.living.count, THEOREMS.length)
  assert.ok(life.latent.count >= 0)
  assert.ok(life.balance.revealGap >= life.latent.count)
})

test('uuidnaDecode — one fused receipt over audit and life', () => {
  const [a, b] = [uuidnaDecode(), uuidnaDecode()]
  assert.equal(a.fused, b.fused)
  assert.equal(a.audit.fused, quantumAuditRatios().fused)
  assert.equal(a.life.receipt, a.audit.life.receipt)
})

test('rosettaRayOf — stable on address', () => {
  const t = THEOREMS[0]!
  assert.equal(rosettaRayOf(t.address), rosettaRayOf(t.address))
})
