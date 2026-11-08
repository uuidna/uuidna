import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ExchangerateFormulas } from './index.js'
import '../../mcp/families.js'

test('exchangerate: crossrate, spread, pippips, forwardpoints, volatilitypct, conversioncombos, reservemonths, peggedmargin — crossing to banking', async (t) => {
  assert.equal(ExchangerateFormulas.crossrate(15000, 120).value, 125)
  assert.equal(ExchangerateFormulas.spread(10850, 10800).value, 50)
  assert.equal(ExchangerateFormulas.pippips(11000, 10900).value, 100)
  assert.equal(ExchangerateFormulas.forwardpoints(50, 3).value, 150)
  assert.equal(ExchangerateFormulas.volatilitypct(8, 100).value, 8)
  assert.equal(ExchangerateFormulas.conversioncombos(8, 2).value, 28)
  assert.equal(ExchangerateFormulas.reservemonths(120, 20).value, 6)
  assert.equal(ExchangerateFormulas.peggedmargin(2, 100).value, 2)
  assert.equal(ExchangerateFormulas.crossrate(15000, 120).dst, 'banking')
  assert.equal(hexFamiliesOf().get('exchangerate')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'exchangerate', program: ['crossrate'], params: [15000, 120] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `exchangerate.crossrate at ${uuid}`)
  uuidReceiptOf('exchangerate crossrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; crossrate 125, spread 50, pippips 100, forwardpoints 150, volatilitypct 8, conversioncombos 28, reservemonths 6, peggedmargin 2; crossing to banking')
})
