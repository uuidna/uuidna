import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CrystallographyFormulas } from './index.js'
import '../../mcp/families.js'

test('crystallography: bragg, spacing, density, packing, coordination, unitcell, symmetry, miller — crossing to materials', async (t) => {
  assert.equal(CrystallographyFormulas.bragg(2, 154).value, 308, 'the first-order reflection, doubled')
  assert.equal(CrystallographyFormulas.spacing(154, 30).value, 5133)
  assert.equal(CrystallographyFormulas.density(8, 4).value, 2, 'two atoms per cell')
  assert.equal(CrystallographyFormulas.packing(74, 100).value, 74, 'close-packed fraction')
  assert.equal(CrystallographyFormulas.coordination(12).value, 12, 'twelve nearest neighbours')
  assert.equal(CrystallographyFormulas.unitcell(5, 5).value, 25)
  assert.equal(CrystallographyFormulas.symmetry(48).value, 48, 'the cubic point group')
  assert.equal(CrystallographyFormulas.miller(6, 2).value, 3)
  assert.equal(CrystallographyFormulas.bragg(2, 154).dst, 'materials')
  assert.equal(hexFamiliesOf().get('crystallography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'crystallography', program: ['bragg'], params: [2, 154] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 308, `crystallography.bragg at ${uuid}`)
  uuidReceiptOf('crystallography bragg', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bragg 308, spacing 5133, density 2, packing 74, coordination 12, unitcell 25, symmetry 48, miller 3; crossing to materials')
})
