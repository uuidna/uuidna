import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MillingFormulas } from './index.js'
import '../../mcp/families.js'

test('milling: extraction, yield, throughput, flour, bran, fineness, moisture, blend — crossing to agriculture', async (t) => {
  assert.equal(MillingFormulas.extraction(720, 1000).value, 72, 'a 72% extraction rate')
  assert.equal(MillingFormulas.yield(1000, 75).value, 750, 'flour from grain')
  assert.equal(MillingFormulas.throughput(6000, 60).value, 100, 'grain milled per hour')
  assert.equal(MillingFormulas.flour(1000, 250).value, 750)
  assert.equal(MillingFormulas.bran(1000, 750).value, 250)
  assert.equal(MillingFormulas.fineness(950, 1000).value, 95)
  assert.equal(MillingFormulas.moisture(14, 100).value, 14)
  assert.equal(MillingFormulas.blend(600, 300, 100).value, 1000, 'total blend mass')
  assert.equal(MillingFormulas.extraction(720, 1000).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('milling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'milling', program: ['throughput'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `milling.throughput at ${uuid}`)
  uuidReceiptOf('milling throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; extraction 72, yield 750, throughput 100, flour 750, bran 250, fineness 95, moisture 14, blend 1000; crossing to agriculture')
})
