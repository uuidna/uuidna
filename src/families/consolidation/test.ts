import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConsolidationFormulas } from './index.js'
import '../../mcp/families.js'

test('consolidation: shipmentsmerged, fillimprovement, costsavings, ordersperload, freightclass, densitygain, splitcount, poolingratio — crossing to supplychain', async (t) => {
  assert.equal(ConsolidationFormulas.shipmentsmerged(100, 40).value, 60)
  assert.equal(ConsolidationFormulas.fillimprovement(90, 70).value, 20)
  assert.equal(ConsolidationFormulas.costsavings(300, 1000).value, 30)
  assert.equal(ConsolidationFormulas.ordersperload(120, 4).value, 30)
  assert.equal(ConsolidationFormulas.freightclass(500, 100).value, 5)
  assert.equal(ConsolidationFormulas.densitygain(120, 100).value, 120)
  assert.equal(ConsolidationFormulas.splitcount(100, 30).value, 4)
  assert.equal(ConsolidationFormulas.poolingratio(8, 10).value, 80)
  assert.equal(ConsolidationFormulas.shipmentsmerged(100, 40).dst, 'supplychain')
  assert.equal(hexFamiliesOf().get('consolidation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'consolidation', program: ['shipmentsmerged'], params: [100, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `consolidation.shipmentsmerged at ${uuid}`)
  uuidReceiptOf('consolidation shipmentsmerged', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shipmentsmerged 60, fillimprovement 20, costsavings 30, ordersperload 30, freightclass 5, densitygain 120, splitcount 4, poolingratio 80; crossing to supplychain')
})
