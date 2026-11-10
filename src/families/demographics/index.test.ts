import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DemographicsFormulas } from './index.js'
import '../../mcp/families.js'

test('demographics: birthrate, deathrate, growth, density, dependency, median, migration, life — crossing to econ', async (t) => {
  assert.equal(DemographicsFormulas.birthrate(12000, 1000000).value, 12, 'births per 1000')
  assert.equal(DemographicsFormulas.deathrate(8000, 1000000).value, 8, 'deaths per 1000')
  assert.equal(DemographicsFormulas.growth(12000, 8000).value, 4000, 'natural increase')
  assert.equal(DemographicsFormulas.growth(8000, 12000).value, -4000, 'natural decrease is negative')
  assert.equal(DemographicsFormulas.density(1000000, 500).value, 2000, 'per unit area')
  assert.equal(DemographicsFormulas.dependency(45, 55).value, 81)
  assert.equal(DemographicsFormulas.median(3900, 100).value, 39, 'mean-age proxy')
  assert.equal(DemographicsFormulas.migration(5000, 2000).value, 3000, 'net inflow')
  assert.equal(DemographicsFormulas.migration(2000, 5000).value, -3000, 'net outflow is negative')
  assert.equal(DemographicsFormulas.life(820000, 10000).value, 82, 'life-expectancy proxy')
  assert.equal(DemographicsFormulas.birthrate(12000, 1000000).dst, 'econ')
  assert.equal(hexFamiliesOf().get('demographics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'demographics', program: ['dependency'], params: [45, 55] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 81, `demographics.dependency at ${uuid}`)
  uuidReceiptOf('demographics dependency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; birthrate 12, deathrate 8, growth 4000/-4000, density 2000, dependency 81, median 39, migration 3000/-3000, life 82; crossing to econ')
})
