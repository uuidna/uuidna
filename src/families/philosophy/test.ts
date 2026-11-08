import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhilosophyFormulas } from './index.js'
import '../../mcp/families.js'

test('philosophy: validity, premises, consistency, utility, consensus, syllogism, virtue, entailment — crossing to sociology', async (t) => {
  assert.equal(PhilosophyFormulas.validity(3, 4).value, 75, 'three of four forms sound')
  assert.equal(PhilosophyFormulas.premises(5).value, 5)
  assert.equal(PhilosophyFormulas.consistency(9, 10).value, 90)
  assert.equal(PhilosophyFormulas.utility(7, 100).value, 700, 'the utilitarian sum')
  assert.equal(PhilosophyFormulas.consensus(3, 4).value, 75)
  assert.equal(PhilosophyFormulas.syllogism(8, 5).value, 5, 'as strong as the weaker premise')
  assert.equal(PhilosophyFormulas.virtue(10, 3).value, 7, 'the golden mean')
  assert.equal(PhilosophyFormulas.virtue(3, 10).value, 0)
  assert.equal(PhilosophyFormulas.entailment(20, 4).value, 5)
  assert.equal(PhilosophyFormulas.validity(3, 4).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('philosophy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'philosophy', program: ['syllogism'], params: [8, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `philosophy.syllogism at ${uuid}`)
  uuidReceiptOf('philosophy syllogism', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; validity 75, premises 5, consistency 90, utility 700, consensus 75, syllogism 5, virtue 7, entailment 5; crossing to sociology')
})
