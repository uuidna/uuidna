import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SailingFormulas } from './index.js'
import '../../mcp/families.js'

test('sailing: ballast, bearing, drift, heel, hullspeed, sailarea, tack, vmg — crossing to oceanography', async (t) => {
  assert.equal(SailingFormulas.ballast(400, 1000).value, 40, 'ballast ratio')
  assert.equal(SailingFormulas.bearing(450).value, 90)
  assert.equal(SailingFormulas.drift(3, 4).value, 12)
  assert.equal(SailingFormulas.heel(50, 200).value, 25)
  assert.equal(SailingFormulas.hullspeed(30, 2).value, 60)
  assert.equal(SailingFormulas.sailarea(10, 4).value, 20)
  assert.equal(SailingFormulas.tack(100, 4).value, 25)
  assert.equal(SailingFormulas.vmg(100, 90).value, 100)
  assert.equal(SailingFormulas.bearing(450).dst, 'oceanography')
  assert.equal(hexFamiliesOf().get('sailing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sailing', program: ['tack'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `sailing.tack at ${uuid}`)
  uuidReceiptOf('sailing tack', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ballast 40, bearing 90, drift 12, heel 25, hullspeed 60, sailarea 20, tack 25, vmg 100; crossing to oceanography')
})
