import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HemodynamicsFormulas } from './index.js'
import '../../mcp/families.js'

test('hemodynamics: cardiacoutput, strokevolume, meanarterialpressure, ejectionfraction, pulsepressure, vascularresistance, pulserate, perfusionpressure — crossing to cardiology', async (t) => {
  assert.equal(HemodynamicsFormulas.cardiacoutput(70, 70).value, 4900, 'heart rate times stroke volume')
  assert.equal(HemodynamicsFormulas.strokevolume(120, 50).value, 70, 'end-diastolic less end-systolic')
  assert.equal(HemodynamicsFormulas.meanarterialpressure(120, 80).value, 93)
  assert.equal(HemodynamicsFormulas.ejectionfraction(70, 120).value, 58, 'percent of the ventricle ejected')
  assert.equal(HemodynamicsFormulas.pulsepressure(120, 80).value, 40)
  assert.equal(HemodynamicsFormulas.vascularresistance(93, 5).value, 1488)
  assert.equal(HemodynamicsFormulas.pulserate(360, 5).value, 72, 'beats per minute')
  assert.equal(HemodynamicsFormulas.perfusionpressure(93, 13).value, 80, 'perfusion pressure met')
  assert.equal(HemodynamicsFormulas.perfusionpressure(13, 93).value, 0)
  assert.equal(HemodynamicsFormulas.cardiacoutput(70, 70).dst, 'cardiology')
  assert.equal(hexFamiliesOf().get('hemodynamics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hemodynamics', program: ['cardiacoutput'], params: [70, 70] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4900, `hemodynamics.cardiacoutput at ${uuid}`)
  uuidReceiptOf('hemodynamics cardiacoutput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cardiacoutput 4900, strokevolume 70, meanarterialpressure 93, ejectionfraction 58, pulsepressure 40, vascularresistance 1488, pulserate 72, perfusionpressure 80; crossing to cardiology')
})
