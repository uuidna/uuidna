import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DiffusionFormulas } from './index.js'
import '../../mcp/families.js'

test('diffusion: flux, gradient, meansquare, permeability, fickrate, concentrationdrop, effusionratio, steadyflux — crossing to chemistry', async (t) => {
  assert.equal(DiffusionFormulas.flux(5, 20).value, 100, 'diffusivity times the gradient')
  assert.equal(DiffusionFormulas.gradient(100, 40, 3).value, 20)
  assert.equal(DiffusionFormulas.meansquare(5, 10).value, 100, 'mean squared displacement in 1D')
  assert.equal(DiffusionFormulas.permeability(10, 6, 4).value, 15)
  assert.equal(DiffusionFormulas.fickrate(5000, 100).value, 50, 'mass per unit time')
  assert.equal(DiffusionFormulas.concentrationdrop(90, 25).value, 65)
  assert.equal(DiffusionFormulas.concentrationdrop(20, 50).value, 0)
  assert.equal(DiffusionFormulas.effusionratio(100, 50).value, 200)
  assert.equal(DiffusionFormulas.steadyflux(50, 50).value, 1, 'steady state')
  assert.equal(DiffusionFormulas.steadyflux(50, 40).value, 0)
  assert.equal(DiffusionFormulas.flux(5, 20).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('diffusion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'diffusion', program: ['flux'], params: [5, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `diffusion.flux at ${uuid}`)
  uuidReceiptOf('diffusion flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flux 100, gradient 20, meansquare 100, permeability 15, fickrate 50, concentrationdrop 65, effusionratio 200, steadyflux 1; crossing to chemistry')
})
