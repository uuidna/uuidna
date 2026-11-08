import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InverterFormulas } from './index.js'
import '../../mcp/families.js'

test('inverter: efficiency, power, thd, dcac, clipping, rating, loss, powerfactor — crossing to electrical', async (t) => {
  assert.equal(InverterFormulas.efficiency(950, 1000).value, 95, 'a 95% efficient inverter')
  assert.equal(InverterFormulas.power(230, 10).value, 2300, 'watts at the outlet')
  assert.equal(InverterFormulas.thd(5, 100).value, 5, 'five percent distortion')
  assert.equal(InverterFormulas.dcac(1000, 95).value, 950, 'AC watts from DC')
  assert.equal(InverterFormulas.clipping(250, 230).value, 20, 'twenty over the rail')
  assert.equal(InverterFormulas.clipping(200, 230).value, 0)
  assert.equal(InverterFormulas.rating(1000, 80).value, 800)
  assert.equal(InverterFormulas.loss(1000, 950).value, 50)
  assert.equal(InverterFormulas.powerfactor(800, 1000).value, 80)
  assert.equal(InverterFormulas.efficiency(950, 1000).dst, 'electrical')
  assert.equal(hexFamiliesOf().get('inverter')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'inverter', program: ['efficiency'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `inverter.efficiency at ${uuid}`)
  uuidReceiptOf('inverter efficiency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; efficiency 95, power 2300, thd 5, dcac 950, clipping 20, rating 800, loss 50, powerfactor 80; crossing to electrical')
})
