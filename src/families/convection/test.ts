import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConvectionFormulas } from './index.js'
import '../../mcp/families.js'

test('convection: heatflux, coefficient, reynolds, prandtl, grashof, rayleigh, filmtemp, boundarylayer — crossing to thermodynamics', async (t) => {
  assert.equal(ConvectionFormulas.heatflux(10, 5, 20).value, 1000, 'heat a surface sheds')
  assert.equal(ConvectionFormulas.coefficient(1000, 5).value, 200)
  assert.equal(ConvectionFormulas.reynolds(100, 2, 4).value, 50, 'inertia over viscosity')
  assert.equal(ConvectionFormulas.prandtl(700, 100).value, 7)
  assert.equal(ConvectionFormulas.grashof(10, 20, 3).value, 600)
  assert.equal(ConvectionFormulas.rayleigh(600, 7).value, 4200, 'Grashof times Prandtl')
  assert.equal(ConvectionFormulas.filmtemp(100, 20).value, 60)
  assert.equal(ConvectionFormulas.boundarylayer(100, 50).value, 10, 'layer thickness')
  assert.equal(ConvectionFormulas.reynolds(100, 2, 4).dst, 'thermodynamics')
  assert.equal(hexFamiliesOf().get('convection')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'convection', program: ['reynolds'], params: [100, 2, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `convection.reynolds at ${uuid}`)
  uuidReceiptOf('convection reynolds', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; heatflux 1000, coefficient 200, reynolds 50, prandtl 7, grashof 600, rayleigh 4200, filmtemp 60, boundarylayer 10; crossing to thermodynamics')
})
