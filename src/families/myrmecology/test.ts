import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MyrmecologyFormulas } from './index.js'
import '../../mcp/families.js'

test('myrmecology: colonysize, castecount, foragingpaths, pheromonetrails, nestchambers, tandempairs, workerratio, broodstages — crossing to zoology', async (t) => {
  assert.equal(MyrmecologyFormulas.colonysize(10000, 5).value, 50000)
  assert.equal(MyrmecologyFormulas.castecount(3, 1).value, 4)
  assert.equal(MyrmecologyFormulas.foragingpaths(5).value, 120)
  assert.equal(MyrmecologyFormulas.pheromonetrails(12, 4).value, 48)
  assert.equal(MyrmecologyFormulas.nestchambers(40, 20).value, 60)
  assert.equal(MyrmecologyFormulas.tandempairs(20, 2).value, 190)
  assert.equal(MyrmecologyFormulas.workerratio(95, 100).value, 95)
  assert.equal(MyrmecologyFormulas.broodstages(4, 0).value, 4)
  assert.equal(MyrmecologyFormulas.colonysize(10000, 5).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('myrmecology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'myrmecology', program: ['colonysize'], params: [10000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `myrmecology.colonysize at ${uuid}`)
  uuidReceiptOf('myrmecology colonysize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; colonysize 50000, castecount 4, foragingpaths 120, pheromonetrails 48, nestchambers 60, tandempairs 190, workerratio 95, broodstages 4; crossing to zoology')
})
