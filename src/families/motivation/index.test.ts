import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MotivationFormulas } from './index.js'
import '../../mcp/families.js'

test('motivation: expectancy, valence, instrumentality, drive, incentive, persistence, goalgradient, selfefficacy — crossing to psychology', async (t) => {
  assert.equal(MotivationFormulas.expectancy(8, 10).value, 80, 'effort likely to perform')
  assert.equal(MotivationFormulas.valence(100, 40).value, 60, 'reward net of cost')
  assert.equal(MotivationFormulas.valence(30, 50).value, 0)
  assert.equal(MotivationFormulas.instrumentality(9, 10).value, 90)
  assert.equal(MotivationFormulas.drive(6, 7).value, 42, 'need times habit strength')
  assert.equal(MotivationFormulas.incentive(50, 4).value, 200)
  assert.equal(MotivationFormulas.persistence(100, 8).value, 12)
  assert.equal(MotivationFormulas.goalgradient(100, 30).value, 4, 'steps left to the goal')
  assert.equal(MotivationFormulas.selfefficacy(7, 8).value, 87)
  assert.equal(MotivationFormulas.expectancy(8, 10).dst, 'psychology')
  assert.equal(hexFamiliesOf().get('motivation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'motivation', program: ['goalgradient'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `motivation.goalgradient at ${uuid}`)
  uuidReceiptOf('motivation goalgradient', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; expectancy 80, valence 60, instrumentality 90, drive 42, incentive 200, persistence 12, goalgradient 4, selfefficacy 87; crossing to psychology')
})
