import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PlanetologyFormulas } from './index.js'
import '../../mcp/families.js'

test('planetology: gravity, escapevelocity, density, albedo, insolation, roche, hillsphere, equilibrium — crossing to astronomy', async (t) => {
  assert.equal(PlanetologyFormulas.gravity(1000, 10).value, 10, 'surface gravity ⌊1000/100⌋')
  assert.equal(PlanetologyFormulas.escapevelocity(1000, 10).value, 100)
  assert.equal(PlanetologyFormulas.density(5000, 100).value, 50, 'bulk density')
  assert.equal(PlanetologyFormulas.albedo(30, 100).value, 30)
  assert.equal(PlanetologyFormulas.insolation(4000, 20).value, 10, 'flux ⌊4000/400⌋')
  assert.equal(PlanetologyFormulas.roche(100, 2).value, 200)
  assert.equal(PlanetologyFormulas.hillsphere(1000, 10).value, 100)
  assert.equal(PlanetologyFormulas.equilibrium(1000, 30).value, 700, '⌊1000·70/100⌋')
  assert.equal(PlanetologyFormulas.gravity(1000, 10).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('planetology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'planetology', program: ['density'], params: [5000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `planetology.density at ${uuid}`)
  uuidReceiptOf('planetology density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gravity 10, escapevelocity 100, density 50, albedo 30, insolation 10, roche 200, hillsphere 100, equilibrium 700; crossing to astronomy')
})
