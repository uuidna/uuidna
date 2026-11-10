import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StoichiometryFormulas } from './index.js'
import '../../mcp/families.js'

test('stoichiometry: moles, molarmass, limiting, yield, molarity, dilution, percentmass, empirical — crossing to chemistry', async (t) => {
  assert.equal(StoichiometryFormulas.moles(180, 18).value, 10, 'ten moles of water')
  assert.equal(StoichiometryFormulas.moles(5, 0).value, 0, 'guarded: no molar mass')
  assert.equal(StoichiometryFormulas.molarmass(2, 16).value, 32, 'O₂ molar mass')
  assert.equal(StoichiometryFormulas.limiting(5, 3).value, 3, 'the limiting reagent')
  assert.equal(StoichiometryFormulas.yield(80, 100).value, 80)
  assert.equal(StoichiometryFormulas.molarity(6, 2).value, 3, 'moles per litre')
  assert.equal(StoichiometryFormulas.dilution(10, 2, 4).value, 5, 'C₁V₁ = C₂V₂')
  assert.equal(StoichiometryFormulas.percentmass(2, 18).value, 11, 'hydrogen by mass in water')
  assert.equal(StoichiometryFormulas.empirical(2, 4).value, 2, 'CH₂ from C₂H₄')
  assert.equal(StoichiometryFormulas.moles(180, 18).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('stoichiometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stoichiometry', program: ['dilution'], params: [10, 2, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `stoichiometry.dilution at ${uuid}`)
  uuidReceiptOf('stoichiometry dilution', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; moles 10, molarmass 32, limiting 3, yield 80, molarity 3, dilution 5, percentmass 11, empirical 2; crossing to chemistry')
})
