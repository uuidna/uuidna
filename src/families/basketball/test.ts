import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BasketballFormulas } from './index.js'
import '../../mcp/families.js'

test('basketball: fieldgoal, freethrow, efficiency, rebounds, assists, pace, truepct, plusminus — crossing to sports', async (t) => {
  assert.equal(BasketballFormulas.fieldgoal(9, 20).value, 45, 'field-goal percentage')
  assert.equal(BasketballFormulas.freethrow(17, 20).value, 85, 'free-throw percentage')
  assert.equal(BasketballFormulas.efficiency(30, 20).value, 150)
  assert.equal(BasketballFormulas.rebounds(220, 20).value, 11, 'rebounds per game')
  assert.equal(BasketballFormulas.assists(80, 20).value, 400, 'assist-to-turnover ratio')
  assert.equal(BasketballFormulas.pace(100, 48).value, 2, 'possessions per minute')
  assert.equal(BasketballFormulas.truepct(28, 25).value, 112, 'true shooting')
  assert.equal(BasketballFormulas.plusminus(110, 100).value, 10, 'ahead on court')
  assert.equal(BasketballFormulas.plusminus(100, 110).value, -10, 'behind on court')
  assert.equal(BasketballFormulas.fieldgoal(9, 20).dst, 'sports')
  assert.equal(hexFamiliesOf().get('basketball')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'basketball', program: ['fieldgoal'], params: [9, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 45, `basketball.fieldgoal at ${uuid}`)
  uuidReceiptOf('basketball fieldgoal', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fieldgoal 45, freethrow 85, efficiency 150, rebounds 11, assists 400, pace 2, truepct 112, plusminus 10/-10; crossing to sports')
})
