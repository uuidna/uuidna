import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StateFormulas } from './index.js'
import '../../mcp/families.js'

test('state: actions, depth, diff, hydration, memoized, rerenders, selectors, stores — crossing to frontend', async (t) => {
  assert.equal(StateFormulas.actions(600, 60).value, 10, 'actions per second')
  assert.equal(StateFormulas.depth(3).value, 3)
  assert.equal(StateFormulas.diff(1, 8).value, 12)
  assert.equal(StateFormulas.hydration(9, 10).value, 90)
  assert.equal(StateFormulas.memoized(950, 1000).value, 95)
  assert.equal(StateFormulas.rerenders(50, 200).value, 25, 'a quarter of components rerender')
  assert.equal(StateFormulas.selectors(42).value, 42)
  assert.equal(StateFormulas.stores(4).value, 4)
  assert.equal(StateFormulas.rerenders(50, 200).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('state')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'state', program: ['rerenders'], params: [50, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `state.rerenders at ${uuid}`)
  uuidReceiptOf('state rerenders', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; actions 10, depth 3, diff 12, hydration 90, memoized 95, rerenders 25, selectors 42, stores 4; crossing to frontend')
})
