import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LivestockFormulas } from './index.js'
import '../../mcp/families.js'

test('livestock: feedconversion, fertility, forage, mortality, output, stocking, weaning, weightgain — crossing to agriculture', async (t) => {
  assert.equal(LivestockFormulas.feedconversion(600, 100).value, 600, 'FCR 6.00 ×100')
  assert.equal(LivestockFormulas.fertility(90, 100).value, 90)
  assert.equal(LivestockFormulas.forage(1200, 1000).value, 120, 'forage surplus')
  assert.equal(LivestockFormulas.mortality(3, 100).value, 3)
  assert.equal(LivestockFormulas.output(5000, 100).value, 50, 'product per head')
  assert.equal(LivestockFormulas.stocking(100, 40).value, 2, 'two animals per hectare')
  assert.equal(LivestockFormulas.weaning(85, 100).value, 85)
  assert.equal(LivestockFormulas.weightgain(450, 120).value, 330)
  assert.equal(LivestockFormulas.weightgain(100, 150).value, 0)
  assert.equal(LivestockFormulas.stocking(100, 40).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('livestock')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'livestock', program: ['stocking'], params: [100, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `livestock.stocking at ${uuid}`)
  uuidReceiptOf('livestock stocking', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; feedconversion 600, fertility 90, forage 120, mortality 3, output 50, stocking 2, weaning 85, weightgain 330; crossing to agriculture')
})
