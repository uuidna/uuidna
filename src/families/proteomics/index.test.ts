import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProteomicsFormulas } from './index.js'
import '../../mcp/families.js'

test('proteomics: abundance, massspec, coverage, foldchange, isoelectric, digestion, interaction, expression — crossing to biochemistry', async (t) => {
  assert.equal(ProteomicsFormulas.abundance(25, 100).value, 25, 'a peptide quarter of the total')
  assert.equal(ProteomicsFormulas.massspec(2400, 3).value, 800, 'mass-to-charge')
  assert.equal(ProteomicsFormulas.coverage(60, 200).value, 30)
  assert.equal(ProteomicsFormulas.foldchange(300, 100).value, 300, 'threefold up')
  assert.equal(ProteomicsFormulas.isoelectric(7).value, 7)
  assert.equal(ProteomicsFormulas.digestion(18, 20).value, 90)
  assert.equal(ProteomicsFormulas.interaction(120, 40).value, 3, 'partners per protein')
  assert.equal(ProteomicsFormulas.expression(50000, 1000).value, 50, 'copies per cell')
  assert.equal(ProteomicsFormulas.abundance(25, 100).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('proteomics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'proteomics', program: ['massspec'], params: [2400, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `proteomics.massspec at ${uuid}`)
  uuidReceiptOf('proteomics massspec', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; abundance 25, massspec 800, coverage 30, foldchange 300, isoelectric 7, digestion 90, interaction 3, expression 50; crossing to biochemistry')
})
