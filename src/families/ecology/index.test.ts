import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EcologyFormulas } from './index.js'
import '../../mcp/families.js'

test('ecology: population, density, diversity, carrying, biomass, predation, habitat, trophic — crossing to environment', async (t) => {
  assert.equal(EcologyFormulas.population(120, 80).value, 40, 'net growth')
  assert.equal(EcologyFormulas.population(50, 90).value, -40, 'a declining population')
  assert.equal(EcologyFormulas.density(1000, 25).value, 40)
  assert.equal(EcologyFormulas.diversity(30, 120).value, 25)
  assert.equal(EcologyFormulas.carrying(10000, 50).value, 200, 'how many the land sustains')
  assert.equal(EcologyFormulas.biomass(500, 12).value, 6000)
  assert.equal(EcologyFormulas.predation(900, 30).value, 30, 'prey per predator')
  assert.equal(EcologyFormulas.habitat(45, 300).value, 15)
  assert.equal(EcologyFormulas.trophic(10000, 10).value, 1000, 'the 10% rule')
  assert.equal(EcologyFormulas.population(120, 80).dst, 'environment')
  assert.equal(hexFamiliesOf().get('ecology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ecology', program: ['carrying'], params: [10000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `ecology.carrying at ${uuid}`)
  uuidReceiptOf('ecology carrying', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; population 40 and −40, density 40, diversity 25, carrying 200, biomass 6000, predation 30, habitat 15, trophic 1000; crossing to environment')
})
