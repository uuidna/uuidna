import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MtbfFormulas } from './index.js'
import '../../mcp/families.js'

test('mtbf: meantime, failurerate, mttr, uptime, hazardrate, cumulativehours, fits, operatinglife — crossing to statistics', async (t) => {
  assert.equal(MtbfFormulas.meantime(8760, 3).value, 2920, 'a year of hours over three failures')
  assert.equal(MtbfFormulas.failurerate(5, 1000000).value, 5, 'failures per million hours')
  assert.equal(MtbfFormulas.mttr(48, 6).value, 8)
  assert.equal(MtbfFormulas.uptime(990, 10).value, 99, 'availability percent')
  assert.equal(MtbfFormulas.hazardrate(2, 100, 10000).value, 2)
  assert.equal(MtbfFormulas.cumulativehours(100, 500).value, 50000)
  assert.equal(MtbfFormulas.fits(1, 1000000).value, 1000, 'failures in time')
  assert.equal(MtbfFormulas.operatinglife(50000, 12000).value, 38000, 'hours of life left')
  assert.equal(MtbfFormulas.operatinglife(10000, 12000).value, 0)
  assert.equal(MtbfFormulas.meantime(8760, 3).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('mtbf')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mtbf', program: ['meantime'], params: [8760, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2920, `mtbf.meantime at ${uuid}`)
  uuidReceiptOf('mtbf meantime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; meantime 2920, failurerate 5, mttr 8, uptime 99, hazardrate 2, cumulativehours 50000, fits 1000, operatinglife 38000; crossing to statistics')
})
