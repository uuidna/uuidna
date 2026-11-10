import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MaterialsFormulas } from './index.js'
import '../../mcp/families.js'

test('materials: stress, strain, density, modulus, hardness, fatigue, thermal, yield — crossing to cern', async (t) => {
  assert.equal(MaterialsFormulas.stress(1000, 10).value, 100, 'force over area')
  assert.equal(MaterialsFormulas.strain(5, 100).value, 5)
  assert.equal(MaterialsFormulas.density(1000, 10).value, 100)
  assert.equal(MaterialsFormulas.modulus(200, 2).value, 100, 'stress over strain')
  assert.equal(MaterialsFormulas.hardness(500, 5).value, 100)
  assert.equal(MaterialsFormulas.fatigue(100, 1000).value, 1, 'under the endurance limit')
  assert.equal(MaterialsFormulas.fatigue(2000, 1000).value, 0)
  assert.equal(MaterialsFormulas.thermal(10, 12).value, 120)
  assert.equal(MaterialsFormulas.yield(50, 100).value, 1, 'under yield strength')
  assert.equal(MaterialsFormulas.yield(150, 100).value, 0)
  assert.equal(MaterialsFormulas.stress(1000, 10).dst, 'cern')
  assert.equal(hexFamiliesOf().get('materials')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'materials', program: ['stress'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `materials.stress at ${uuid}`)
  uuidReceiptOf('materials stress', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stress 100, strain 5, density 100, modulus 100, hardness 100, fatigue 1, thermal 120, yield 1; crossing to cern')
})
