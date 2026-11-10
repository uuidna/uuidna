import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CardiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('cardiology: ejection, output, map, qtc, target, bmi, risk, pulse — crossing to med', async (t) => {
  assert.equal(CardiologyFormulas.ejection(60, 120).value, 50, 'half the diastolic volume')
  assert.equal(CardiologyFormulas.output(70, 72).value, 5040, 'cardiac output')
  assert.equal(CardiologyFormulas.map(120, 80).value, 93)
  assert.equal(CardiologyFormulas.qtc(400, 800).value, 50)
  assert.equal(CardiologyFormulas.target(40).value, 180, 'max heart rate')
  assert.equal(CardiologyFormulas.bmi(70, 175).value, 22)
  assert.equal(CardiologyFormulas.risk(3, 10).value, 30)
  assert.equal(CardiologyFormulas.pulse(30, 15).value, 120, 'beats per minute')
  assert.equal(CardiologyFormulas.ejection(60, 120).dst, 'med')
  assert.equal(hexFamiliesOf().get('cardiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cardiology', program: ['map'], params: [120, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 93, `cardiology.map at ${uuid}`)
  uuidReceiptOf('cardiology map', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ejection 50, output 5040, map 93, qtc 50, target 180, bmi 22, risk 30, pulse 120; crossing to med')
})
