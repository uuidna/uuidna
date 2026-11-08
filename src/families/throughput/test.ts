import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ThroughputFormulas } from './index.js'
import '../../mcp/families.js'

test('throughput: goodput, utilization, bandwidthdelay, effectiverate, overheadratio, windowsize, saturation, efficiency — crossing to networking', async (t) => {
  assert.equal(ThroughputFormulas.goodput(6000, 60).value, 100, 'useful bits per second')
  assert.equal(ThroughputFormulas.utilization(750, 1000).value, 75)
  assert.equal(ThroughputFormulas.bandwidthdelay(100, 50).value, 5000, 'bits in flight')
  assert.equal(ThroughputFormulas.effectiverate(1000, 50).value, 950)
  assert.equal(ThroughputFormulas.overheadratio(40, 1000).value, 4)
  assert.equal(ThroughputFormulas.windowsize(5000, 1000).value, 5, 'segments across the path')
  assert.equal(ThroughputFormulas.saturation(100, 100).value, 1, 'link saturated')
  assert.equal(ThroughputFormulas.saturation(90, 100).value, 0)
  assert.equal(ThroughputFormulas.efficiency(90, 100).value, 90)
  assert.equal(ThroughputFormulas.goodput(6000, 60).dst, 'networking')
  assert.equal(hexFamiliesOf().get('throughput')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'throughput', program: ['windowsize'], params: [5000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `throughput.windowsize at ${uuid}`)
  uuidReceiptOf('throughput windowsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; goodput 100, utilization 75, bandwidthdelay 5000, effectiverate 950, overheadratio 4, windowsize 5, saturation 1, efficiency 90; crossing to networking')
})
