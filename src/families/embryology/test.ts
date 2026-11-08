import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmbryologyFormulas } from './index.js'
import '../../mcp/families.js'

test('embryology: gestation, cleavage, viability, implantation, blastocyst, fragmentation, morphology, differentiation — crossing to med', async (t) => {
  assert.equal(EmbryologyFormulas.gestation(280).value, 280, 'the days carried')
  assert.equal(EmbryologyFormulas.cleavage(8, 4).value, 2, 'cells per hour')
  assert.equal(EmbryologyFormulas.viability(8, 10).value, 80)
  assert.equal(EmbryologyFormulas.implantation(2, 4).value, 50)
  assert.equal(EmbryologyFormulas.blastocyst(5, 10).value, 50)
  assert.equal(EmbryologyFormulas.fragmentation(2, 10).value, 20)
  assert.equal(EmbryologyFormulas.morphology(5).value, 5)
  assert.equal(EmbryologyFormulas.differentiation(50, 100).value, 50)
  assert.equal(EmbryologyFormulas.gestation(280).dst, 'med')
  assert.equal(hexFamiliesOf().get('embryology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'embryology', program: ['cleavage'], params: [8, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `embryology.cleavage at ${uuid}`)
  uuidReceiptOf('embryology cleavage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gestation 280, cleavage 2, viability 80, implantation 50, blastocyst 50, fragmentation 20, morphology 5, differentiation 50; crossing to med')
})
