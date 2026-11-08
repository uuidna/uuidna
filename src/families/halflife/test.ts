import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HalflifeFormulas } from './index.js'
import '../../mcp/families.js'

test('halflife: elapsedlives, remaining, decayed, constant, meanlife, activity, fraction, generations — crossing to chemistry', async (t) => {
  assert.equal(HalflifeFormulas.elapsedlives(100, 25).value, 4, 'four half-lives have passed')
  assert.equal(HalflifeFormulas.remaining(1000, 3).value, 125, 'an eighth is left after three half-lives')
  assert.equal(HalflifeFormulas.decayed(1000, 3).value, 875)
  assert.equal(HalflifeFormulas.constant(1000, 10).value, 69)
  assert.equal(HalflifeFormulas.meanlife(1000).value, 1443)
  assert.equal(HalflifeFormulas.activity(1000, 69).value, 69)
  assert.equal(HalflifeFormulas.fraction(100, 2).value, 25, 'a quarter remains after two half-lives')
  assert.equal(HalflifeFormulas.generations(10, 3).value, 80)
  assert.equal(HalflifeFormulas.remaining(1000, 3).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('halflife')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'halflife', program: ['remaining'], params: [1000, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `halflife.remaining at ${uuid}`)
  uuidReceiptOf('halflife remaining', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; elapsedlives 4, remaining 125, decayed 875, constant 69, meanlife 1443, activity 69, fraction 25, generations 80; crossing to chemistry')
})
