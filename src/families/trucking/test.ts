import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TruckingFormulas } from './index.js'
import '../../mcp/families.js'

test('trucking: costpermile, fuelefficiency, loadfactor, deadhead, utilization, hoursofservice, turnaround, payload — crossing to transport', async (t) => {
  assert.equal(TruckingFormulas.costpermile(2000, 500).value, 4, 'dollars per mile')
  assert.equal(TruckingFormulas.fuelefficiency(700, 100).value, 7, 'miles per gallon')
  assert.equal(TruckingFormulas.loadfactor(40000, 45000).value, 88)
  assert.equal(TruckingFormulas.deadhead(100, 500).value, 20, 'empty miles share')
  assert.equal(TruckingFormulas.utilization(600, 800).value, 75)
  assert.equal(TruckingFormulas.hoursofservice(8, 11).value, 3, 'hours left')
  assert.equal(TruckingFormulas.hoursofservice(14, 11).value, 0)
  assert.equal(TruckingFormulas.turnaround(6).value, 6)
  assert.equal(TruckingFormulas.payload(30000, 80000).value, 37)
  assert.equal(TruckingFormulas.costpermile(2000, 500).dst, 'transport')
  assert.equal(hexFamiliesOf().get('trucking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'trucking', program: ['deadhead'], params: [100, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `trucking.deadhead at ${uuid}`)
  uuidReceiptOf('trucking deadhead', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; costpermile 4, fuelefficiency 7, loadfactor 88, deadhead 20, utilization 75, hoursofservice 3, turnaround 6, payload 37; crossing to transport')
})
