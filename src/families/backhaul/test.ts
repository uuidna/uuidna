import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BackhaulFormulas } from './index.js'
import '../../mcp/families.js'

test('backhaul: emptymiles, utilization, revenuemiles, matchrate, deadheadratio, savings, payloadratio, cycledistance — crossing to logistics', async (t) => {
  assert.equal(BackhaulFormulas.emptymiles(1000, 700).value, 300)
  assert.equal(BackhaulFormulas.utilization(700, 1000).value, 70)
  assert.equal(BackhaulFormulas.revenuemiles(700, 2).value, 1400)
  assert.equal(BackhaulFormulas.matchrate(80, 100).value, 80)
  assert.equal(BackhaulFormulas.deadheadratio(300, 1000).value, 30)
  assert.equal(BackhaulFormulas.savings(300, 2).value, 600)
  assert.equal(BackhaulFormulas.payloadratio(18000, 20000).value, 90)
  assert.equal(BackhaulFormulas.cycledistance(700, 300).value, 1000)
  assert.equal(BackhaulFormulas.emptymiles(1000, 700).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('backhaul')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'backhaul', program: ['emptymiles'], params: [1000, 700] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `backhaul.emptymiles at ${uuid}`)
  uuidReceiptOf('backhaul emptymiles', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; emptymiles 300, utilization 70, revenuemiles 1400, matchrate 80, deadheadratio 30, savings 600, payloadratio 90, cycledistance 1000; crossing to logistics')
})
