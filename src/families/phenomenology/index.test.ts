import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhenomenologyFormulas } from './index.js'
import '../../mcp/families.js'

test('phenomenology: intentionalacts, reductions, horizonlayers, noesisnoema, epochestages, experiencepairs, consciousnessmodes, givennessratio — crossing to philosophy', async (t) => {
  assert.equal(PhenomenologyFormulas.intentionalacts(5, 3).value, 8)
  assert.equal(PhenomenologyFormulas.reductions(3, 1).value, 3)
  assert.equal(PhenomenologyFormulas.horizonlayers(4).value, 16)
  assert.equal(PhenomenologyFormulas.noesisnoema(2, 3).value, 6)
  assert.equal(PhenomenologyFormulas.epochestages(4).value, 24)
  assert.equal(PhenomenologyFormulas.experiencepairs(8, 2).value, 28)
  assert.equal(PhenomenologyFormulas.consciousnessmodes(6, 0).value, 6)
  assert.equal(PhenomenologyFormulas.givennessratio(70, 100).value, 70)
  assert.equal(PhenomenologyFormulas.intentionalacts(5, 3).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('phenomenology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'phenomenology', program: ['intentionalacts'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `phenomenology.intentionalacts at ${uuid}`)
  uuidReceiptOf('phenomenology intentionalacts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; intentionalacts 8, reductions 3, horizonlayers 16, noesisnoema 6, epochestages 24, experiencepairs 28, consciousnessmodes 6, givennessratio 70; crossing to philosophy')
})
