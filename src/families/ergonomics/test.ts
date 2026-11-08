import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ErgonomicsFormulas } from './index.js'
import '../../mcp/families.js'

test('ergonomics: lift, reach, posture, repetition, fatigue, illumination, noise, strain — crossing to med', async (t) => {
  assert.equal(ErgonomicsFormulas.lift(20, 6).value, 120, 'load lifted at a frequency')
  assert.equal(ErgonomicsFormulas.reach(45, 60).value, 75)
  assert.equal(ErgonomicsFormulas.posture(30, 90).value, 33)
  assert.equal(ErgonomicsFormulas.repetition(120, 60).value, 2, 'movements per minute')
  assert.equal(ErgonomicsFormulas.fatigue(480, 60).value, 800)
  assert.equal(ErgonomicsFormulas.illumination(10000, 20).value, 500)
  assert.equal(ErgonomicsFormulas.noise(85).value, 85)
  assert.equal(ErgonomicsFormulas.strain(60, 100).value, 60)
  assert.equal(ErgonomicsFormulas.lift(20, 6).dst, 'med')
  assert.equal(hexFamiliesOf().get('ergonomics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ergonomics', program: ['reach'], params: [45, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `ergonomics.reach at ${uuid}`)
  uuidReceiptOf('ergonomics reach', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lift 120, reach 75, posture 33, repetition 2, fatigue 800, illumination 500, noise 85, strain 60; crossing to med')
})
