import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiophysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('biophysics: diffusion, membrane, elasticity, osmosis, binding, conductance, folding, tension — crossing to materials', async (t) => {
  assert.equal(BiophysicsFormulas.diffusion(10, 4).value, 25, 'mean-square reach')
  assert.equal(BiophysicsFormulas.membrane(100, 4).value, 25)
  assert.equal(BiophysicsFormulas.elasticity(2000, 5).value, 400, "Young's modulus")
  assert.equal(BiophysicsFormulas.osmosis(3, 1000).value, 3)
  assert.equal(BiophysicsFormulas.binding(90, 10).value, 9)
  assert.equal(BiophysicsFormulas.conductance(50, 10).value, 5)
  assert.equal(BiophysicsFormulas.folding(80, 100).value, 80, 'percent folded')
  assert.equal(BiophysicsFormulas.tension(600, 20).value, 30)
  assert.equal(BiophysicsFormulas.diffusion(10, 4).dst, 'materials')
  assert.equal(hexFamiliesOf().get('biophysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biophysics', program: ['elasticity'], params: [2000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `biophysics.elasticity at ${uuid}`)
  uuidReceiptOf('biophysics elasticity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; diffusion 25, membrane 25, elasticity 400, osmosis 3, binding 9, conductance 5, folding 80, tension 30; crossing to materials')
})
