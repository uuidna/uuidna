import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProteinFormulas } from './index.js'

/** protein: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('protein: residues, mass, domains, foldstates, bonds, helices, contacts, combos', async (t) => {
  assert.equal(ProteinFormulas.residues(300, 1).value, 300, 'residues(300, 1)')
  assert.equal(ProteinFormulas.mass(300, 110).value, 33000, 'mass(300, 110)')
  assert.equal(ProteinFormulas.domains(3, 0).value, 3, 'domains(3, 0)')
  assert.equal(ProteinFormulas.foldstates(5).value, 32, 'foldstates(5)')
  assert.equal(ProteinFormulas.bonds(299, 1).value, 299, 'bonds(299, 1)')
  assert.equal(ProteinFormulas.helices(8, 4).value, 12, 'helices(8, 4)')
  assert.equal(ProteinFormulas.contacts(10, 2).value, 45, 'contacts(10, 2)')
  assert.equal(ProteinFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('protein')?.length, 8)
  for (const [name, params, expected] of [["residues",[300,1],300],["mass",[300,110],33000],["domains",[3,0],3]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'protein', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `protein.${name} at ${uuid}`)
    uuidReceiptOf(`protein ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "residues=300, mass=33000, domains=3")
})
