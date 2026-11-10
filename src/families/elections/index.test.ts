import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectionsFormulas } from './index.js'
import '../../mcp/families.js'

test('elections: turnout, margin, seats, swing, threshold, apportionment, spoilage, proportionality — crossing to demographics', async (t) => {
  assert.equal(ElectionsFormulas.turnout(750, 1000).value, 75, 'three in four voted')
  assert.equal(ElectionsFormulas.margin(5200, 4800).value, 400)
  assert.equal(ElectionsFormulas.seats(12000, 1000).value, 12, 'twelve quotas')
  assert.equal(ElectionsFormulas.swing(55, 40).value, 15)
  assert.equal(ElectionsFormulas.threshold(300, 6000).value, 5, 'a five-percent share')
  assert.equal(ElectionsFormulas.apportionment(100000, 25000).value, 4, 'four seats')
  assert.equal(ElectionsFormulas.spoilage(20, 1000).value, 2)
  assert.equal(ElectionsFormulas.proportionality(50, 100).value, 50)
  assert.equal(ElectionsFormulas.turnout(750, 1000).dst, 'demographics')
  assert.equal(hexFamiliesOf().get('elections')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'elections', program: ['seats'], params: [12000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `elections.seats at ${uuid}`)
  uuidReceiptOf('elections seats', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; turnout 75, margin 400, seats 12, swing 15, threshold 5, apportionment 4, spoilage 2, proportionality 50; crossing to demographics')
})
