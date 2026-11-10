import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FrontogenesisFormulas } from './index.js'
import '../../mcp/families.js'

test('frontogenesis: temperaturegradient, frontspeed, fronttypes, convergencerate, baroclinicity, pressuretrough, liftingindex, intensification — crossing to meteorology', async (t) => {
  assert.equal(FrontogenesisFormulas.temperaturegradient(100, 4).value, 25)
  assert.equal(FrontogenesisFormulas.frontspeed(600, 10).value, 60)
  assert.equal(FrontogenesisFormulas.fronttypes(4, 0).value, 4)
  assert.equal(FrontogenesisFormulas.convergencerate(5, 3).value, 15)
  assert.equal(FrontogenesisFormulas.baroclinicity(70, 100).value, 70)
  assert.equal(FrontogenesisFormulas.pressuretrough(1013, 990).value, 23)
  assert.equal(FrontogenesisFormulas.liftingindex(10, 4).value, 6)
  assert.equal(FrontogenesisFormulas.intensification(80, 100).value, 80)
  assert.equal(FrontogenesisFormulas.temperaturegradient(100, 4).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('frontogenesis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'frontogenesis', program: ['temperaturegradient'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `frontogenesis.temperaturegradient at ${uuid}`)
  uuidReceiptOf('frontogenesis temperaturegradient', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; temperaturegradient 25, frontspeed 60, fronttypes 4, convergencerate 15, baroclinicity 70, pressuretrough 23, liftingindex 6, intensification 80; crossing to meteorology')
})
