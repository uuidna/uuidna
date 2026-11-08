import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PediatricsFormulas } from './index.js'
import '../../mcp/families.js'

test('pediatrics: dose, bsa, growthpercentile, apgar, bmi, fluidrequirement, heartrate, caloricneed — crossing to physiology', async (t) => {
  assert.equal(PediatricsFormulas.dose(20, 15).value, 300, 'weight-based dose in mg')
  assert.equal(PediatricsFormulas.bsa(36, 100).value, 1, 'one square metre of surface')
  assert.equal(PediatricsFormulas.growthpercentile(90, 100).value, 90)
  assert.equal(PediatricsFormulas.apgar(2, 2, 2).value, 6, 'a healthy newborn')
  assert.equal(PediatricsFormulas.apgar(2, 2, 1).value, 5)
  assert.equal(PediatricsFormulas.bmi(16, 100).value, 16)
  assert.equal(PediatricsFormulas.fluidrequirement(8, 100).value, 800, 'millilitres per day')
  assert.equal(PediatricsFormulas.heartrate(30, 15).value, 120, 'beats per minute')
  assert.equal(PediatricsFormulas.caloricneed(10, 100).value, 1000)
  assert.equal(PediatricsFormulas.dose(20, 15).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('pediatrics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pediatrics', program: ['dose'], params: [20, 15] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `pediatrics.dose at ${uuid}`)
  uuidReceiptOf('pediatrics dose', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dose 300, bsa 1, growthpercentile 90, apgar 6, bmi 16, fluidrequirement 800, heartrate 120, caloricneed 1000; crossing to physiology')
})
