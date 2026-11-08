import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EstimatingFormulas } from './index.js'
import '../../mcp/families.js'

test('estimating: takeoff, labor, material, overhead, markup, contingency, unitcost, bid — crossing to construction', async (t) => {
  assert.equal(EstimatingFormulas.takeoff(500, 3).value, 1500, 'quantity off the drawings')
  assert.equal(EstimatingFormulas.labor(160, 45).value, 7200, 'a month of crew-hours')
  assert.equal(EstimatingFormulas.material(200, 25).value, 5000)
  assert.equal(EstimatingFormulas.overhead(10000, 15).value, 1500)
  assert.equal(EstimatingFormulas.markup(8000, 20).value, 9600, 'cost plus markup')
  assert.equal(EstimatingFormulas.contingency(20000, 10).value, 2000)
  assert.equal(EstimatingFormulas.unitcost(5000, 200).value, 25, 'cost per unit')
  assert.equal(EstimatingFormulas.bid(7200, 5000, 1500).value, 13700, 'the price offered')
  assert.equal(EstimatingFormulas.takeoff(500, 3).dst, 'construction')
  assert.equal(hexFamiliesOf().get('estimating')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'estimating', program: ['unitcost'], params: [5000, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `estimating.unitcost at ${uuid}`)
  uuidReceiptOf('estimating unitcost', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; takeoff 1500, labor 7200, material 5000, overhead 1500, markup 9600, contingency 2000, unitcost 25, bid 13700; crossing to construction')
})
