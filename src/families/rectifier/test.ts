import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RectifierFormulas } from './index.js'
import '../../mcp/families.js'

test('rectifier: ripplefactor, outputvoltage, efficiency, diodecount, pivrating, formfactor, loadcombos, conductionangle — crossing to electronics', async (t) => {
  assert.equal(RectifierFormulas.ripplefactor(48, 100).value, 48)
  assert.equal(RectifierFormulas.outputvoltage(900, 10).value, 90)
  assert.equal(RectifierFormulas.efficiency(81, 100).value, 81)
  assert.equal(RectifierFormulas.diodecount(4, 0).value, 4)
  assert.equal(RectifierFormulas.pivrating(2, 340).value, 680)
  assert.equal(RectifierFormulas.formfactor(111, 100).value, 1)
  assert.equal(RectifierFormulas.loadcombos(8, 2).value, 28)
  assert.equal(RectifierFormulas.conductionangle(180, 1).value, 180)
  assert.equal(RectifierFormulas.ripplefactor(48, 100).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('rectifier')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rectifier', program: ['ripplefactor'], params: [48, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 48, `rectifier.ripplefactor at ${uuid}`)
  uuidReceiptOf('rectifier ripplefactor', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ripplefactor 48, outputvoltage 90, efficiency 81, diodecount 4, pivrating 680, formfactor 1, loadcombos 28, conductionangle 180; crossing to electronics')
})
