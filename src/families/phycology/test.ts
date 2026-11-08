import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhycologyFormulas } from './index.js'
import '../../mcp/families.js'

test('phycology: chlorophyll, biomass, productivity, bloomdensity, growthrate, lipidcontent, turbidity, nutrientuptake — crossing to botany', async (t) => {
  assert.equal(PhycologyFormulas.chlorophyll(500, 8).value, 4000, 'pigment molecules across the cells')
  assert.equal(PhycologyFormulas.biomass(1000, 5).value, 5000)
  assert.equal(PhycologyFormulas.productivity(5000, 100).value, 50, 'carbon fixed per day')
  assert.equal(PhycologyFormulas.bloomdensity(100, 30).value, 4, 'four sample tiles for the bloom')
  assert.equal(PhycologyFormulas.growthrate(1000, 1999).value, 99)
  assert.equal(PhycologyFormulas.lipidcontent(300, 1000).value, 30)
  assert.equal(PhycologyFormulas.turbidity(10000, 90).value, 900)
  assert.equal(PhycologyFormulas.nutrientuptake(99, 95).value, 1, 'uptake meets demand')
  assert.equal(PhycologyFormulas.nutrientuptake(90, 95).value, 0)
  assert.equal(PhycologyFormulas.chlorophyll(500, 8).dst, 'botany')
  assert.equal(hexFamiliesOf().get('phycology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'phycology', program: ['bloomdensity'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `phycology.bloomdensity at ${uuid}`)
  uuidReceiptOf('phycology bloomdensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chlorophyll 4000, biomass 5000, productivity 50, bloomdensity 4, growthrate 99, lipidcontent 30, turbidity 900, nutrientuptake 1; crossing to botany')
})
