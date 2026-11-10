import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AmplifiersFormulas } from './index.js'
import '../../mcp/families.js'

test('amplifiers: gain, decibels, bandwidth, slewrate, inputimpedance, outputpower, efficiency, cmrr — crossing to electronics', async (t) => {
  assert.equal(AmplifiersFormulas.gain(1000, 5).value, 200, 'voltage gain')
  assert.equal(AmplifiersFormulas.decibels(50, 5).value, 100)
  assert.equal(AmplifiersFormulas.bandwidth(20000, 20).value, 19980, 'the passband span')
  assert.equal(AmplifiersFormulas.slewrate(1000, 20).value, 50)
  assert.equal(AmplifiersFormulas.inputimpedance(10000, 2).value, 5000)
  assert.equal(AmplifiersFormulas.outputpower(120, 5).value, 600)
  assert.equal(AmplifiersFormulas.efficiency(80, 100).value, 80, 'percent efficient')
  assert.equal(AmplifiersFormulas.efficiency(50, 0).value, 0)
  assert.equal(AmplifiersFormulas.cmrr(10000, 10).value, 1000)
  assert.equal(AmplifiersFormulas.gain(1000, 5).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('amplifiers')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'amplifiers', program: ['gain'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `amplifiers.gain at ${uuid}`)
  uuidReceiptOf('amplifiers gain', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gain 200, decibels 100, bandwidth 19980, slewrate 50, inputimpedance 5000, outputpower 600, efficiency 80, cmrr 1000; crossing to electronics')
})
