import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CosmologyFormulas } from './index.js'
import '../../mcp/families.js'

test('cosmology: hubble, recession, age, density, expansion, horizon, curvature, temperature — crossing to gravity', async (t) => {
  assert.equal(CosmologyFormulas.hubble(1400, 20).value, 70, 'H0 proxy')
  assert.equal(CosmologyFormulas.recession(70, 10).value, 700, 'v = H0 · d')
  assert.equal(CosmologyFormulas.age(1400, 70).value, 20)
  assert.equal(CosmologyFormulas.density(1000, 4).value, 250)
  assert.equal(CosmologyFormulas.expansion(10, 3).value, 7, 'scale factor change')
  assert.equal(CosmologyFormulas.expansion(3, 10).value, 0)
  assert.equal(CosmologyFormulas.horizon(300, 14).value, 4200, 'particle horizon')
  assert.equal(CosmologyFormulas.curvature(27, 30).value, 900, 'Omega · 1000')
  assert.equal(CosmologyFormulas.temperature(1100, 2).value, 2202, 'CMB scaling')
  assert.equal(CosmologyFormulas.hubble(1400, 20).dst, 'gravity')
  assert.equal(hexFamiliesOf().get('cosmology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cosmology', program: ['recession'], params: [70, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 700, `cosmology.recession at ${uuid}`)
  uuidReceiptOf('cosmology recession', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hubble 70, recession 700, age 20, density 250, expansion 7, horizon 4200, curvature 900, temperature 2202; crossing to gravity')
})
