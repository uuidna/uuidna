import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AcquisitionFormulas } from './index.js'
import '../../mcp/families.js'

test('acquisition: cac, ltvratio, payback, conversion, channel, organic, velocity, roi — crossing to analytics', async (t) => {
  assert.equal(AcquisitionFormulas.cac(10000, 50).value, 200, 'spend per customer won')
  assert.equal(AcquisitionFormulas.ltvratio(600, 200).value, 300, 'LTV three times CAC')
  assert.equal(AcquisitionFormulas.payback(200, 50).value, 4, 'four months to pay back')
  assert.equal(AcquisitionFormulas.conversion(25, 100).value, 25)
  assert.equal(AcquisitionFormulas.channel(30, 120).value, 25)
  assert.equal(AcquisitionFormulas.organic(80, 200).value, 40)
  assert.equal(AcquisitionFormulas.velocity(3000, 30).value, 100, 'signups per day')
  assert.equal(AcquisitionFormulas.roi(5000, 1000).value, 500)
  assert.equal(AcquisitionFormulas.cac(10000, 50).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('acquisition')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'acquisition', program: ['payback'], params: [200, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `acquisition.payback at ${uuid}`)
  uuidReceiptOf('acquisition payback', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cac 200, ltvratio 300, payback 4, conversion 25, channel 25, organic 40, velocity 100, roi 500; crossing to analytics')
})
