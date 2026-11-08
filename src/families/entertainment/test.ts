import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EntertainmentFormulas } from './index.js'
import '../../mcp/families.js'

test('entertainment: rating, runtime, box office, royalty, audience, bitrate, share, completion', async (t) => {
  assert.equal(EntertainmentFormulas.rating(4200, 500).value, 84, 'an 8.4 average (×10)')
  assert.equal(EntertainmentFormulas.runtime(10, 48).value, 480)
  assert.equal(EntertainmentFormulas.boxoffice(200000, 12).value, 2400000)
  assert.equal(EntertainmentFormulas.royalty(1000000, 12).value, 120000)
  assert.equal(EntertainmentFormulas.audience(5000000, 30).value, 1500000)
  assert.equal(EntertainmentFormulas.bitrate(900, 60).value, 120, 'kbps')
  assert.equal(EntertainmentFormulas.share(300, 1000).value, 30)
  assert.equal(EntertainmentFormulas.completion(42, 48).value, 87)
  assert.equal(EntertainmentFormulas.rating(4200, 500).dst, 'cross')
  assert.equal(hexFamiliesOf().get('entertainment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'entertainment', program: ['runtime'], params: [10, 48] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 480, `entertainment.runtime at ${uuid}`)
  uuidReceiptOf('entertainment runtime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rating 84, runtime 480, boxoffice 2.4M, royalty 120000, audience 1.5M, bitrate 120, share 30, completion 87')
})
