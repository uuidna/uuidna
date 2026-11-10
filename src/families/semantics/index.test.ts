import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SemanticsFormulas } from './index.js'
import '../../mcp/families.js'

test('semantics: similarity, polysemy, entailment, ambiguity, density, distance, coherence, sentiment — crossing to linguistics', async (t) => {
  assert.equal(SemanticsFormulas.similarity(3, 4).value, 75, 'shared over total')
  assert.equal(SemanticsFormulas.polysemy(10, 3).value, 3, 'senses per word')
  assert.equal(SemanticsFormulas.entailment(2, 5).value, 40)
  assert.equal(SemanticsFormulas.ambiguity(12, 4).value, 3, 'readings per sentence')
  assert.equal(SemanticsFormulas.density(30, 100).value, 30)
  assert.equal(SemanticsFormulas.distance(5).value, 5, 'hops in the graph')
  assert.equal(SemanticsFormulas.coherence(9, 10).value, 90)
  assert.equal(SemanticsFormulas.sentiment(70, 30).value, 40, 'net positive')
  assert.equal(SemanticsFormulas.sentiment(30, 70).value, -40, 'net negative')
  assert.equal(SemanticsFormulas.similarity(3, 4).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('semantics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'semantics', program: ['similarity'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `semantics.similarity at ${uuid}`)
  uuidReceiptOf('semantics similarity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; similarity 75, polysemy 3, entailment 40, ambiguity 3, density 30, distance 5, coherence 90, sentiment 40/-40; crossing to linguistics')
})
