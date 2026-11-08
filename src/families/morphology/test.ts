import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MorphologyFormulas } from './index.js'
import '../../mcp/families.js'

test('morphology: morphemes, inflection, derivation, affixation, productivity, allomorphy, transparency, density — crossing to linguistics', async (t) => {
  assert.equal(MorphologyFormulas.morphemes(300, 100).value, 3, 'morphemes per word')
  assert.equal(MorphologyFormulas.inflection(6, 8).value, 75)
  assert.equal(MorphologyFormulas.derivation(50, 10).value, 5, 'derived words per root')
  assert.equal(MorphologyFormulas.affixation(30, 20).value, 150)
  assert.equal(MorphologyFormulas.productivity(5, 1000).value, 0)
  assert.equal(MorphologyFormulas.allomorphy(12, 4).value, 3, 'allomorphs per morpheme')
  assert.equal(MorphologyFormulas.transparency(70, 100).value, 70)
  assert.equal(MorphologyFormulas.density(150, 100).value, 150)
  assert.equal(MorphologyFormulas.morphemes(300, 100).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('morphology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'morphology', program: ['derivation'], params: [50, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `morphology.derivation at ${uuid}`)
  uuidReceiptOf('morphology derivation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; morphemes 3, inflection 75, derivation 5, affixation 150, productivity 0, allomorphy 3, transparency 70, density 150; crossing to linguistics')
})
