import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JitterFormulas } from './index.js'
import '../../mcp/families.js'

test('jitter: variation, meandeviation, bufferdepth, peaktopeak, playoutdelay, rfc3550estimate, packetspacing, absolute — crossing to networking', async (t) => {
  assert.equal(JitterFormulas.variation(50, 30).value, 20, 'the swing between two delays')
  assert.equal(JitterFormulas.meandeviation(400, 8).value, 50)
  assert.equal(JitterFormulas.bufferdepth(20, 3).value, 60, 'de-jitter buffer at 3x the jitter')
  assert.equal(JitterFormulas.peaktopeak(120, 40).value, 80)
  assert.equal(JitterFormulas.peaktopeak(40, 120).value, 0)
  assert.equal(JitterFormulas.playoutdelay(50, 10, 4).value, 90, 'base plus scaled jitter')
  assert.equal(JitterFormulas.rfc3550estimate(16, 48).value, 18)
  assert.equal(JitterFormulas.packetspacing(1000, 50).value, 20, 'milliseconds between packets')
  assert.equal(JitterFormulas.absolute(200, 150).value, 50)
  assert.equal(JitterFormulas.variation(50, 30).dst, 'networking')
  assert.equal(hexFamiliesOf().get('jitter')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'jitter', program: ['bufferdepth'], params: [20, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `jitter.bufferdepth at ${uuid}`)
  uuidReceiptOf('jitter bufferdepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; variation 20, meandeviation 50, bufferdepth 60, peaktopeak 80, playoutdelay 90, rfc3550estimate 18, packetspacing 20, absolute 50; crossing to networking')
})
