import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LastmileFormulas } from './index.js'
import '../../mcp/families.js'

test('lastmile: stopspermile, deliverydensity, costperstop, successrate, routetime, failedratio, packagespervehicle, detourfactor — crossing to logistics', async (t) => {
  assert.equal(LastmileFormulas.stopspermile(40, 10).value, 4)
  assert.equal(LastmileFormulas.deliverydensity(200, 50).value, 4)
  assert.equal(LastmileFormulas.costperstop(1000, 40).value, 25)
  assert.equal(LastmileFormulas.successrate(95, 100).value, 95)
  assert.equal(LastmileFormulas.routetime(40, 6).value, 240)
  assert.equal(LastmileFormulas.failedratio(5, 100).value, 5)
  assert.equal(LastmileFormulas.packagespervehicle(600, 10).value, 60)
  assert.equal(LastmileFormulas.detourfactor(120, 100).value, 120)
  assert.equal(LastmileFormulas.stopspermile(40, 10).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('lastmile')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lastmile', program: ['stopspermile'], params: [40, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `lastmile.stopspermile at ${uuid}`)
  uuidReceiptOf('lastmile stopspermile', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stopspermile 4, deliverydensity 4, costperstop 25, successrate 95, routetime 240, failedratio 5, packagespervehicle 60, detourfactor 120; crossing to logistics')
})
