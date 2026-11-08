import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RoutingFormulas } from './index.js'
import '../../mcp/families.js'

test('routing: depth, params, redirect, match, nested, lazy, catchall, prefetch — crossing to frontend', async (t) => {
  assert.equal(RoutingFormulas.depth(5).value, 5, 'five segments deep')
  assert.equal(RoutingFormulas.params(3, 12).value, 25)
  assert.equal(RoutingFormulas.redirect(1).value, 1, 'one hop settles')
  assert.equal(RoutingFormulas.redirect(3).value, 0)
  assert.equal(RoutingFormulas.match(50, 100).value, 50)
  assert.equal(RoutingFormulas.nested(10, 3).value, 3, 'children per parent')
  assert.equal(RoutingFormulas.lazy(8, 40).value, 20)
  assert.equal(RoutingFormulas.catchall(2).value, 2)
  assert.equal(RoutingFormulas.prefetch(75, 100).value, 75)
  assert.equal(RoutingFormulas.depth(5).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('routing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'routing', program: ['match'], params: [50, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `routing.match at ${uuid}`)
  uuidReceiptOf('routing match', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 5, params 25, redirect 1, match 50, nested 3, lazy 20, catchall 2, prefetch 75; crossing to frontend')
})
