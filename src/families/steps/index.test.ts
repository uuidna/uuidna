import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StepsFormulas } from './index.js'
import '../../mcp/families.js'

test('steps: progress, current, remaining, count, order, duration, depth, completion — crossing to frontend', async (t) => {
  assert.equal(StepsFormulas.progress(3, 4).value, 75, 'three of four steps done')
  assert.equal(StepsFormulas.current(2, 5).value, 40)
  assert.equal(StepsFormulas.remaining(3, 5).value, 2, 'two steps left')
  assert.equal(StepsFormulas.count(7).value, 7)
  assert.equal(StepsFormulas.order(3, 5).value, 1, 'in order')
  assert.equal(StepsFormulas.order(6, 5).value, 0)
  assert.equal(StepsFormulas.duration(5, 30).value, 150, 'five steps at half a minute')
  assert.equal(StepsFormulas.depth(3).value, 3)
  assert.equal(StepsFormulas.completion(80, 100).value, 80)
  assert.equal(StepsFormulas.progress(3, 4).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('steps')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'steps', program: ['progress'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `steps.progress at ${uuid}`)
  uuidReceiptOf('steps progress', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; progress 75, current 40, remaining 2, count 7, order 1, duration 150, depth 3, completion 80; crossing to frontend')
})
