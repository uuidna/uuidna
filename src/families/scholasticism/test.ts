import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScholasticismFormulas } from './index.js'
import '../../mcp/families.js'

test('scholasticism: questionscount, articleorderings, objectioncombos, distinctionsubsets, syllogismcount, disputationstages, summaparts, consensusratio — crossing to philosophy', async (t) => {
  assert.equal(ScholasticismFormulas.questionscount(500, 131).value, 631)
  assert.equal(ScholasticismFormulas.articleorderings(5).value, 120)
  assert.equal(ScholasticismFormulas.objectioncombos(10, 3).value, 120)
  assert.equal(ScholasticismFormulas.distinctionsubsets(6).value, 64)
  assert.equal(ScholasticismFormulas.syllogismcount(16, 4).value, 64)
  assert.equal(ScholasticismFormulas.disputationstages(4, 3).value, 7)
  assert.equal(ScholasticismFormulas.summaparts(3, 0).value, 3)
  assert.equal(ScholasticismFormulas.consensusratio(85, 100).value, 85)
  assert.equal(ScholasticismFormulas.questionscount(500, 131).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('scholasticism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'scholasticism', program: ['questionscount'], params: [500, 131] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 631, `scholasticism.questionscount at ${uuid}`)
  uuidReceiptOf('scholasticism questionscount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; questionscount 631, articleorderings 120, objectioncombos 120, distinctionsubsets 64, syllogismcount 64, disputationstages 7, summaparts 3, consensusratio 85; crossing to philosophy')
})
