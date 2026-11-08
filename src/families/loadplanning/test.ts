import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LoadplanningFormulas } from './index.js'
import '../../mcp/families.js'

test('loadplanning: utilization, cubicfill, weightlimit, stackheight, palletspertruck, axleload, voidspace, loadbalance — crossing to supplychain', async (t) => {
  assert.equal(LoadplanningFormulas.utilization(900, 1000).value, 90)
  assert.equal(LoadplanningFormulas.cubicfill(48, 60).value, 80)
  assert.equal(LoadplanningFormulas.weightlimit(20000, 18000).value, 2000)
  assert.equal(LoadplanningFormulas.stackheight(240, 40).value, 6)
  assert.equal(LoadplanningFormulas.palletspertruck(52, 2).value, 26)
  assert.equal(LoadplanningFormulas.axleload(36000, 3).value, 12000)
  assert.equal(LoadplanningFormulas.voidspace(60, 48).value, 12)
  assert.equal(LoadplanningFormulas.loadbalance(50, 50).value, 100)
  assert.equal(LoadplanningFormulas.utilization(900, 1000).dst, 'supplychain')
  assert.equal(hexFamiliesOf().get('loadplanning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'loadplanning', program: ['utilization'], params: [900, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `loadplanning.utilization at ${uuid}`)
  uuidReceiptOf('loadplanning utilization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; utilization 90, cubicfill 80, weightlimit 2000, stackheight 6, palletspertruck 26, axleload 12000, voidspace 12, loadbalance 100; crossing to supplychain')
})
