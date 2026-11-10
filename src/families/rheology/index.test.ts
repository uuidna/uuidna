import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RheologyFormulas } from './index.js'
import '../../mcp/families.js'

test('rheology: viscosity, shear, modulus, yielding, thixotropy, elasticity, flow, relaxation — crossing to materials', async (t) => {
  assert.equal(RheologyFormulas.viscosity(1000, 20).value, 50, 'stress over shear rate')
  assert.equal(RheologyFormulas.shear(600, 3).value, 200, 'velocity over the gap')
  assert.equal(RheologyFormulas.modulus(900, 30).value, 30)
  assert.equal(RheologyFormulas.yielding(100, 40).value, 60, 'past the threshold')
  assert.equal(RheologyFormulas.yielding(30, 40).value, 0, 'below the threshold')
  assert.equal(RheologyFormulas.thixotropy(500, 350).value, 150)
  assert.equal(RheologyFormulas.elasticity(80, 100).value, 80, 'percent recovered')
  assert.equal(RheologyFormulas.flow(1000, 25).value, 40)
  assert.equal(RheologyFormulas.relaxation(600, 12).value, 50)
  assert.equal(RheologyFormulas.viscosity(1000, 20).dst, 'materials')
  assert.equal(hexFamiliesOf().get('rheology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rheology', program: ['shear'], params: [600, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `rheology.shear at ${uuid}`)
  uuidReceiptOf('rheology shear', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; viscosity 50, shear 200, modulus 30, yielding 60, thixotropy 150, elasticity 80, flow 40, relaxation 50; crossing to materials')
})
