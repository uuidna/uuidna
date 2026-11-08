import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AquacultureFormulas } from './index.js'
import '../../mcp/families.js'

test('aquaculture: fcr, density, oxygen, growth, survival, biomass, feeding, ammonia — crossing to fishery', async (t) => {
  assert.equal(AquacultureFormulas.fcr(150, 100).value, 150, 'feed per gain ·100')
  assert.equal(AquacultureFormulas.density(1000, 50).value, 20, 'fish per unit volume')
  assert.equal(AquacultureFormulas.oxygen(8, 5).value, 160)
  assert.equal(AquacultureFormulas.growth(500, 50).value, 450, 'weight gained')
  assert.equal(AquacultureFormulas.survival(900, 1000).value, 90)
  assert.equal(AquacultureFormulas.biomass(1000, 2).value, 2000)
  assert.equal(AquacultureFormulas.feeding(60, 2000).value, 3, 'daily ration percent')
  assert.equal(AquacultureFormulas.ammonia(1000, 50).value, 20)
  assert.equal(AquacultureFormulas.fcr(150, 100).dst, 'fishery')
  assert.equal(hexFamiliesOf().get('aquaculture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aquaculture', program: ['density'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `aquaculture.density at ${uuid}`)
  uuidReceiptOf('aquaculture density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fcr 150, density 20, oxygen 160, growth 450, survival 90, biomass 2000, feeding 3, ammonia 20; crossing to fishery')
})
