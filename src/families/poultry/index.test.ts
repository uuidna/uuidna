import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PoultryFormulas } from './index.js'
import '../../mcp/families.js'

test('poultry: laying, hatchability, feedconversion, mortality, density, dressing, eggmass, uniformity — crossing to agriculture', async (t) => {
  assert.equal(PoultryFormulas.laying(900, 1000).value, 90, 'lay rate percent')
  assert.equal(PoultryFormulas.hatchability(85, 100).value, 85)
  assert.equal(PoultryFormulas.feedconversion(2000, 1000).value, 2, 'feed per egg')
  assert.equal(PoultryFormulas.mortality(5, 1000).value, 0)
  assert.equal(PoultryFormulas.density(1200, 100).value, 12, 'birds per area')
  assert.equal(PoultryFormulas.dressing(70, 100).value, 70)
  assert.equal(PoultryFormulas.eggmass(1000, 60).value, 60000)
  assert.equal(PoultryFormulas.uniformity(950, 1000).value, 95)
  assert.equal(PoultryFormulas.laying(900, 1000).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('poultry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'poultry', program: ['density'], params: [1200, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `poultry.density at ${uuid}`)
  uuidReceiptOf('poultry density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; laying 90, hatchability 85, feedconversion 2, mortality 0, density 12, dressing 70, eggmass 60000, uniformity 95; crossing to agriculture')
})
