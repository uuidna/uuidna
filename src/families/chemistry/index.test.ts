import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChemistryFormulas } from './index.js'
import '../../mcp/families.js'

test('chemistry: moles, concentration, ph, yield, mass, dilution, ratio, bonds — crossing to cern', async (t) => {
  assert.equal(ChemistryFormulas.moles(180, 18).value, 10, 'ten moles of water')
  assert.equal(ChemistryFormulas.concentration(2, 4).value, 500, 'mmol/L')
  assert.equal(ChemistryFormulas.ph(7).value, 7, 'neutral')
  assert.equal(ChemistryFormulas.yield(80, 100).value, 80)
  assert.equal(ChemistryFormulas.mass(10, 18).value, 180)
  assert.equal(ChemistryFormulas.dilution(5, 20).value, 100, 'conserved amount')
  assert.equal(ChemistryFormulas.ratio(1, 4).value, 25)
  assert.equal(ChemistryFormulas.bonds(5).value, 4, 'a five-atom chain')
  assert.equal(ChemistryFormulas.moles(180, 18).dst, 'cern')
  assert.equal(hexFamiliesOf().get('chemistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chemistry', program: ['moles'], params: [180, 18] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `chemistry.moles at ${uuid}`)
  uuidReceiptOf('chemistry moles', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; moles 10, concentration 500, ph 7, yield 80, mass 180, dilution 100, ratio 25, bonds 4; crossing to cern')
})
