import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CaramelizationFormulas } from './index.js'
import '../../mcp/families.js'

test('caramelization: temperaturethreshold, browningrate, sugarconversion, masslosspct, colorindex, timeattemp, activationstage, residualsugar — crossing to chemistry', async (t) => {
  assert.equal(CaramelizationFormulas.temperaturethreshold(160, 170).value, 170)
  assert.equal(CaramelizationFormulas.browningrate(80, 100).value, 80)
  assert.equal(CaramelizationFormulas.sugarconversion(90, 100).value, 90)
  assert.equal(CaramelizationFormulas.masslosspct(15, 100).value, 15)
  assert.equal(CaramelizationFormulas.colorindex(8, 10).value, 80)
  assert.equal(CaramelizationFormulas.timeattemp(600, 10).value, 60)
  assert.equal(CaramelizationFormulas.activationstage(170, 30).value, 5)
  assert.equal(CaramelizationFormulas.residualsugar(100, 90).value, 10)
  assert.equal(CaramelizationFormulas.temperaturethreshold(160, 170).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('caramelization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'caramelization', program: ['temperaturethreshold'], params: [160, 170] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 170, `caramelization.temperaturethreshold at ${uuid}`)
  uuidReceiptOf('caramelization temperaturethreshold', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; temperaturethreshold 170, browningrate 80, sugarconversion 90, masslosspct 15, colorindex 80, timeattemp 60, activationstage 5, residualsugar 10; crossing to chemistry')
})
