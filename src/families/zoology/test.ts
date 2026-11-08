import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ZoologyFormulas } from './index.js'
import '../../mcp/families.js'

test('zoology: population, density, metabolism, lifespan, fecundity, predation, migration, survival — crossing to ecology', async (t) => {
  assert.equal(ZoologyFormulas.population(100, 30).value, 70, 'net population change')
  assert.equal(ZoologyFormulas.density(100, 4).value, 25)
  assert.equal(ZoologyFormulas.metabolism(50, 3).value, 150)
  assert.equal(ZoologyFormulas.lifespan(12).value, 12)
  assert.equal(ZoologyFormulas.fecundity(1000, 40).value, 25, 'offspring per female')
  assert.equal(ZoologyFormulas.predation(30, 100).value, 30)
  assert.equal(ZoologyFormulas.migration(6000, 60).value, 100, 'time to cross')
  assert.equal(ZoologyFormulas.survival(950, 1000).value, 95)
  assert.equal(ZoologyFormulas.population(100, 30).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('zoology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'zoology', program: ['population'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 70, `zoology.population at ${uuid}`)
  uuidReceiptOf('zoology population', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; population 70, density 25, metabolism 150, lifespan 12, fecundity 25, predation 30, migration 100, survival 95; crossing to ecology')
})
