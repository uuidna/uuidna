import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RouteFormulas } from './index.js'
import '../../mcp/families.js'

test('route: hopcount, pathcombos, shortestpath, bandwidthsum, routingtable, hoporderings, redundantpaths, latencysum — crossing to networking', async (t) => {
  assert.equal(RouteFormulas.hopcount(5, 3).value, 8)
  assert.equal(RouteFormulas.pathcombos(10, 2).value, 45)
  assert.equal(RouteFormulas.shortestpath(100, 4).value, 25)
  assert.equal(RouteFormulas.bandwidthsum(100, 4).value, 400)
  assert.equal(RouteFormulas.routingtable(50, 3).value, 150)
  assert.equal(RouteFormulas.hoporderings(5).value, 120)
  assert.equal(RouteFormulas.redundantpaths(3).value, 8)
  assert.equal(RouteFormulas.latencysum(10, 20, 30).value, 60)
  assert.equal(RouteFormulas.hopcount(5, 3).dst, 'networking')
  assert.equal(hexFamiliesOf().get('route')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'route', program: ['hopcount'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `route.hopcount at ${uuid}`)
  uuidReceiptOf('route hopcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hopcount 8, pathcombos 45, shortestpath 25, bandwidthsum 400, routingtable 150, hoporderings 120, redundantpaths 8, latencysum 60; crossing to networking')
})
