import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CostingFormulas } from './index.js'
import '../../mcp/families.js'

test('costing: unitcost, markup, margin, breakeven, overhead, absorption, contribution, target — crossing to accounting', async (t) => {
  assert.equal(CostingFormulas.unitcost(1000, 40).value, 25, 'cost per unit')
  assert.equal(CostingFormulas.markup(150, 100).value, 50, 'half again over cost')
  assert.equal(CostingFormulas.margin(200, 150).value, 25)
  assert.equal(CostingFormulas.breakeven(5000, 25).value, 200, 'units to break even')
  assert.equal(CostingFormulas.overhead(3000, 10000).value, 30)
  assert.equal(CostingFormulas.absorption(900, 1000).value, 90)
  assert.equal(CostingFormulas.contribution(50, 30).value, 20, 'per-unit contribution')
  assert.equal(CostingFormulas.contribution(30, 50).value, 0, 'never negative')
  assert.equal(CostingFormulas.target(100, 40).value, 60, 'target cost for a 40% margin')
  assert.equal(CostingFormulas.unitcost(1000, 40).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('costing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'costing', program: ['target'], params: [100, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `costing.target at ${uuid}`)
  uuidReceiptOf('costing target', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; unitcost 25, markup 50, margin 25, breakeven 200, overhead 30, absorption 90, contribution 20, target 60; crossing to accounting')
})
