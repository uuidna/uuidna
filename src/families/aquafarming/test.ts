import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AquafarmingFormulas } from './index.js'
import '../../mcp/families.js'

test('aquafarming: stockingdensity, biomass, feedrate, oxygendemand, survivalrate, waterexchange, growthrate, harvestweight — crossing to ichthyology', async (t) => {
  assert.equal(AquafarmingFormulas.stockingdensity(1000, 20).value, 50, 'fifty fish per cubic metre')
  assert.equal(AquafarmingFormulas.biomass(500, 200).value, 100000)
  assert.equal(AquafarmingFormulas.feedrate(50000, 3).value, 1500, 'three percent of biomass daily')
  assert.equal(AquafarmingFormulas.oxygendemand(50000, 5).value, 250)
  assert.equal(AquafarmingFormulas.survivalrate(1000, 900).value, 90, 'ninety percent survive')
  assert.equal(AquafarmingFormulas.survivalrate(1000, 500).value, 50)
  assert.equal(AquafarmingFormulas.waterexchange(20, 6).value, 120)
  assert.equal(AquafarmingFormulas.growthrate(500, 50, 90).value, 5, 'grams gained per day')
  assert.equal(AquafarmingFormulas.harvestweight(900, 250).value, 225000)
  assert.equal(AquafarmingFormulas.stockingdensity(1000, 20).dst, 'ichthyology')
  assert.equal(hexFamiliesOf().get('aquafarming')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aquafarming', program: ['stockingdensity'], params: [1000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `aquafarming.stockingdensity at ${uuid}`)
  uuidReceiptOf('aquafarming stockingdensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stockingdensity 50, biomass 100000, feedrate 1500, oxygendemand 250, survivalrate 90, waterexchange 120, growthrate 5, harvestweight 225000; crossing to ichthyology')
})
