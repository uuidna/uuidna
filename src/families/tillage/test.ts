import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TillageFormulas } from './index.js'
import '../../mcp/families.js'

test('tillage: depth, drafforce, fieldcapacity, fuelperhectare, passes, residuecover, soildisturbance, workingwidth — crossing to agronomy', async (t) => {
  assert.equal(TillageFormulas.depth(3, 100).value, 300, 'three layers at 100mm each')
  assert.equal(TillageFormulas.drafforce(3, 1200).value, 3600, 'three metres at 1200 N/m')
  assert.equal(TillageFormulas.fieldcapacity(60, 6).value, 10, 'hectares per hour')
  assert.equal(TillageFormulas.fuelperhectare(300, 15).value, 20)
  assert.equal(TillageFormulas.passes(100, 30).value, 4, 'four passes for the field')
  assert.equal(TillageFormulas.residuecover(30, 100).value, 30)
  assert.equal(TillageFormulas.soildisturbance(75, 100).value, 75)
  assert.equal(TillageFormulas.workingwidth(6, 1).value, 5, 'effective width after overlap')
  assert.equal(TillageFormulas.workingwidth(2, 5).value, 0)
  assert.equal(TillageFormulas.depth(3, 100).dst, 'agronomy')
  assert.equal(hexFamiliesOf().get('tillage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tillage', program: ['passes'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `tillage.passes at ${uuid}`)
  uuidReceiptOf('tillage passes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 300, drafforce 3600, fieldcapacity 10, fuelperhectare 20, passes 4, residuecover 30, soildisturbance 75, workingwidth 5; crossing to agronomy')
})
