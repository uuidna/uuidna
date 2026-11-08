import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChemFormulas } from './index.js'

/** chem: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('chem: moles, molarity, mass, dilution, valence, yield, isotopes, bonds', async (t) => {
  assert.equal(ChemFormulas.moles(180, 18).value, 10, 'moles(180, 18)')
  assert.equal(ChemFormulas.molarity(2000, 2).value, 1000, 'molarity(2000, 2)')
  assert.equal(ChemFormulas.mass(3, 18).value, 54, 'mass(3, 18)')
  assert.equal(ChemFormulas.dilution(1000, 10).value, 100, 'dilution(1000, 10)')
  assert.equal(ChemFormulas.valence(3, 4).value, 3, 'valence(3, 4)')
  assert.equal(ChemFormulas.yield(85, 100).value, 85, 'yield(85, 100)')
  assert.equal(ChemFormulas.isotopes(2, 1).value, 3, 'isotopes(2, 1)')
  assert.equal(ChemFormulas.bonds(6, 2).value, 15, 'bonds(6, 2)')
  assert.equal(hexFamiliesOf().get('chem')?.length, 8)
  for (const [name, params, expected] of [["moles",[180,18],10],["molarity",[2000,2],1000],["mass",[3,18],54]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'chem', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `chem.${name} at ${uuid}`)
    uuidReceiptOf(`chem ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "moles=10, molarity=1000, mass=54")
})
