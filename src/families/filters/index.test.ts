import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FiltersFormulas } from './index.js'
import '../../mcp/families.js'

test('filters: cutoff, rolloff, qfactor, bandwidth, order, passband, stopband, ripple — crossing to electronics', async (t) => {
  assert.equal(FiltersFormulas.cutoff(1000, 10).value, 100, 'RC cutoff frequency')
  assert.equal(FiltersFormulas.rolloff(2, 3).value, 36)
  assert.equal(FiltersFormulas.qfactor(1000, 50).value, 20, 'the quality factor')
  assert.equal(FiltersFormulas.bandwidth(2000, 500).value, 1500)
  assert.equal(FiltersFormulas.order(60, 6).value, 10, 'ten poles for the attenuation')
  assert.equal(FiltersFormulas.passband(100, 3).value, 97)
  assert.equal(FiltersFormulas.stopband(4, 20).value, 80)
  assert.equal(FiltersFormulas.ripple(1000, 5).value, 50, 'five percent ripple')
  assert.equal(FiltersFormulas.cutoff(0, 10).value, 0)
  assert.equal(FiltersFormulas.cutoff(1000, 10).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('filters')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'filters', program: ['order'], params: [60, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `filters.order at ${uuid}`)
  uuidReceiptOf('filters order', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cutoff 100, rolloff 36, qfactor 20, bandwidth 1500, order 10, passband 97, stopband 80, ripple 50; crossing to electronics')
})
