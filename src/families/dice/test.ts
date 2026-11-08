import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DiceFormulas } from './index.js'
import '../../mcp/families.js'

test('dice: outcomes, expectedsum, probabilitypct, range, combinations, variance, mode, advantage — crossing to probability', async (t) => {
  assert.equal(DiceFormulas.outcomes(6, 2).value, 36, 'faces two d6 can show')
  assert.equal(DiceFormulas.expectedsum(6, 2).value, 7, 'expected sum of 2d6')
  assert.equal(DiceFormulas.probabilitypct(6).value, 16, 'one face of a d6, floored percent')
  assert.equal(DiceFormulas.range(6, 2).value, 10, 'from 2 to 12')
  assert.equal(DiceFormulas.combinations(6, 2).value, 15)
  assert.equal(DiceFormulas.variance(6).value, 2, 'spread of a single d6, floored')
  assert.equal(DiceFormulas.mode(6, 3).value, 10, 'most common sum of 3d6')
  assert.equal(DiceFormulas.advantage(6).value, 4, 'expected higher of two d6, floored')
  assert.equal(DiceFormulas.outcomes(6, 2).dst, 'probability')
  assert.equal(hexFamiliesOf().get('dice')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dice', program: ['outcomes'], params: [6, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 36, `dice.outcomes at ${uuid}`)
  uuidReceiptOf('dice outcomes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; outcomes 36, expectedsum 7, probabilitypct 16, range 10, combinations 15, variance 2, mode 10, advantage 4; crossing to probability')
})
