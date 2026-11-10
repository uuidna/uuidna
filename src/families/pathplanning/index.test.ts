import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PathplanningFormulas } from './index.js'
import '../../mcp/families.js'

test('pathplanning: chebyshev, clearance, euclidsq, heuristic, manhattan, nodesexpanded, pathcost, smoothness — crossing to robotics', async (t) => {
  assert.equal(PathplanningFormulas.chebyshev(3, 4).value, 4, 'king-move distance')
  assert.equal(PathplanningFormulas.clearance(10, 3).value, 7)
  assert.equal(PathplanningFormulas.clearance(3, 10).value, 0, 'no negative clearance')
  assert.equal(PathplanningFormulas.euclidsq(3, 4).value, 25, 'a 3-4-5 triangle squared')
  assert.equal(PathplanningFormulas.heuristic(10, 5).value, 15, 'the A* f-score')
  assert.equal(PathplanningFormulas.manhattan(3, 4).value, 7)
  assert.equal(PathplanningFormulas.nodesexpanded(4, 5).value, 20)
  assert.equal(PathplanningFormulas.pathcost(10, 7).value, 70)
  assert.equal(PathplanningFormulas.smoothness(3, 12).value, 25, 'a quarter of the route turns')
  assert.equal(PathplanningFormulas.euclidsq(3, 4).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('pathplanning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pathplanning', program: ['euclidsq'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `pathplanning.euclidsq at ${uuid}`)
  uuidReceiptOf('pathplanning euclidsq', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chebyshev 4, clearance 7, euclidsq 25, heuristic 15, manhattan 7, nodesexpanded 20, pathcost 70, smoothness 25; crossing to robotics')
})
