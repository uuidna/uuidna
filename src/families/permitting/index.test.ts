import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PermittingFormulas } from './index.js'
import '../../mcp/families.js'

test('permitting: approval, backlog, cycletime, expiry, fee, inspections, queue, throughput — crossing to governance', async (t) => {
  assert.equal(PermittingFormulas.approval(900, 1000).value, 90, 'nine in ten approved')
  assert.equal(PermittingFormulas.backlog(500, 320).value, 180, 'filed minus processed')
  assert.equal(PermittingFormulas.backlog(100, 200).value, 0, 'no negative backlog')
  assert.equal(PermittingFormulas.cycletime(3600, 120).value, 30, 'average days per permit')
  assert.equal(PermittingFormulas.expiry(100, 365).value, 465)
  assert.equal(PermittingFormulas.fee(200, 75).value, 15000)
  assert.equal(PermittingFormulas.inspections(150, 3).value, 450)
  assert.equal(PermittingFormulas.queue(100, 8).value, 13, 'windows for the day\'s arrivals')
  assert.equal(PermittingFormulas.throughput(600, 30).value, 20, 'permits per day')
  assert.equal(PermittingFormulas.approval(900, 1000).dst, 'governance')
  assert.equal(hexFamiliesOf().get('permitting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'permitting', program: ['queue'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13, `permitting.queue at ${uuid}`)
  uuidReceiptOf('permitting queue', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; approval 90, backlog 180, cycletime 30, expiry 465, fee 15000, inspections 450, queue 13, throughput 20; crossing to governance')
})
