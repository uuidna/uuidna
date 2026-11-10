import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VeterinaryFormulas } from './index.js'
import '../../mcp/families.js'

test('veterinary: dose, caloricrequirement, bcs, fluidtherapy, heartrate, medicationinterval, bodyweightgain, gestation — crossing to physiology', async (t) => {
  assert.equal(VeterinaryFormulas.dose(10, 5).value, 50, 'a 10 kg patient at 5 mg/kg')
  assert.equal(VeterinaryFormulas.caloricrequirement(20, 30).value, 600, 'daily kcal')
  assert.equal(VeterinaryFormulas.bcs(55, 50).value, 110, 'ten percent over ideal')
  assert.equal(VeterinaryFormulas.fluidtherapy(1000, 250).value, 4, 'four bags for the day')
  assert.equal(VeterinaryFormulas.heartrate(240, 2).value, 120, 'beats per minute')
  assert.equal(VeterinaryFormulas.medicationinterval(24, 3).value, 8, 'hours between doses')
  assert.equal(VeterinaryFormulas.bodyweightgain(10, 15).value, 5)
  assert.equal(VeterinaryFormulas.bodyweightgain(15, 10).value, 0)
  assert.equal(VeterinaryFormulas.gestation(63, 63).value, 1, 'term reached')
  assert.equal(VeterinaryFormulas.gestation(30, 63).value, 0)
  assert.equal(VeterinaryFormulas.dose(10, 5).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('veterinary')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'veterinary', program: ['heartrate'], params: [240, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `veterinary.heartrate at ${uuid}`)
  uuidReceiptOf('veterinary heartrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dose 50, caloricrequirement 600, bcs 110, fluidtherapy 4, heartrate 120, medicationinterval 8, bodyweightgain 5, gestation 1; crossing to physiology')
})
