import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CrystalFormulas } from './index.js'

/** crystal: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('crystal: lattice, atoms, planes, spacing, symmetry, defects, faces, combos', async (t) => {
  assert.equal(CrystalFormulas.lattice(4, 4, 4).value, 64, 'lattice(4, 4, 4)')
  assert.equal(CrystalFormulas.atoms(8, 1).value, 8, 'atoms(8, 1)')
  assert.equal(CrystalFormulas.planes(3, 0).value, 3, 'planes(3, 0)')
  assert.equal(CrystalFormulas.spacing(500, 10).value, 50, 'spacing(500, 10)')
  assert.equal(CrystalFormulas.symmetry(6, 1).value, 7, 'symmetry(6, 1)')
  assert.equal(CrystalFormulas.defects(1000, 100).value, 10, 'defects(1000, 100)')
  assert.equal(CrystalFormulas.faces(6, 8).value, 14, 'faces(6, 8)')
  assert.equal(CrystalFormulas.combos(7, 2).value, 21, 'combos(7, 2)')
  assert.equal(hexFamiliesOf().get('crystal')?.length, 8)
  for (const [name, params, expected] of [["lattice",[4,4,4],64],["atoms",[8,1],8],["planes",[3,0],3]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'crystal', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `crystal.${name} at ${uuid}`)
    uuidReceiptOf(`crystal ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "lattice=64, atoms=8, planes=3")
})
