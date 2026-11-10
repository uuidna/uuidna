import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PilgrimageFormulas } from './index.js'
import '../../mcp/families.js'

test('pilgrimage: stagecount, routeorderings, stationpairs, distance, daysrequired, waypointsubsets, groupsize, restpoints — crossing to anthropology', async (t) => {
  assert.equal(PilgrimageFormulas.stagecount(12, 2).value, 14)
  assert.equal(PilgrimageFormulas.routeorderings(6).value, 720)
  assert.equal(PilgrimageFormulas.stationpairs(14, 2).value, 91)
  assert.equal(PilgrimageFormulas.distance(20, 30).value, 600)
  assert.equal(PilgrimageFormulas.daysrequired(600, 20).value, 30)
  assert.equal(PilgrimageFormulas.waypointsubsets(5).value, 32)
  assert.equal(PilgrimageFormulas.groupsize(40, 1).value, 40)
  assert.equal(PilgrimageFormulas.restpoints(600, 50).value, 12)
  assert.equal(PilgrimageFormulas.stagecount(12, 2).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('pilgrimage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pilgrimage', program: ['stagecount'], params: [12, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 14, `pilgrimage.stagecount at ${uuid}`)
  uuidReceiptOf('pilgrimage stagecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stagecount 14, routeorderings 720, stationpairs 91, distance 600, daysrequired 30, waypointsubsets 32, groupsize 40, restpoints 12; crossing to anthropology')
})
