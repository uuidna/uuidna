import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FreightFormulas } from './index.js'
import '../../mcp/families.js'

test('freight: rate, weight, volume, density, chargeable, ton, lane, surcharge — crossing to logistics', async (t) => {
  assert.equal(FreightFormulas.rate(500, 2).value, 1000, 'rate over the distance')
  assert.equal(FreightFormulas.weight(20, 50).value, 1000, 'twenty units at fifty each')
  assert.equal(FreightFormulas.volume(2, 3, 4).value, 24)
  assert.equal(FreightFormulas.density(1000, 4).value, 250)
  assert.equal(FreightFormulas.chargeable(300, 500).value, 500, 'volumetric weight bills')
  assert.equal(FreightFormulas.chargeable(600, 500).value, 600, 'actual weight bills')
  assert.equal(FreightFormulas.ton(5000).value, 5)
  assert.equal(FreightFormulas.lane(400, 3).value, 1200, 'lane distance over trips')
  assert.equal(FreightFormulas.surcharge(1000, 15).value, 150)
  assert.equal(FreightFormulas.rate(500, 2).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('freight')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'freight', program: ['chargeable'], params: [300, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `freight.chargeable at ${uuid}`)
  uuidReceiptOf('freight chargeable', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 1000, weight 1000, volume 24, density 250, chargeable 500, ton 5, lane 1200, surcharge 150; crossing to logistics')
})
