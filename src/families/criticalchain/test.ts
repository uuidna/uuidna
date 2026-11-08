import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CriticalchainFormulas } from './index.js'
import '../../mcp/families.js'

test('criticalchain: projectbuffer, feedingbuffer, resourcebuffer, bufferconsumption, chainlength, aggregation, fevermargin, safetyremoved — crossing to logistics', async (t) => {
  assert.equal(CriticalchainFormulas.projectbuffer(1000, 50).value, 500, 'half the aggregated safety')
  assert.equal(CriticalchainFormulas.feedingbuffer(200, 50).value, 100)
  assert.equal(CriticalchainFormulas.resourcebuffer(8, 3).value, 24, 'wake-ups across the tasks')
  assert.equal(CriticalchainFormulas.bufferconsumption(30, 120).value, 25)
  assert.equal(CriticalchainFormulas.chainlength(12, 5).value, 60, 'the critical chain length')
  assert.equal(CriticalchainFormulas.aggregation(10, 30).value, 20)
  assert.equal(CriticalchainFormulas.fevermargin(500, 180).value, 320, 'buffer still in the green')
  assert.equal(CriticalchainFormulas.safetyremoved(40, 25).value, 15)
  assert.equal(CriticalchainFormulas.safetyremoved(25, 40).value, 0)
  assert.equal(CriticalchainFormulas.projectbuffer(1000, 50).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('criticalchain')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'criticalchain', program: ['chainlength'], params: [12, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `criticalchain.chainlength at ${uuid}`)
  uuidReceiptOf('criticalchain chainlength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; projectbuffer 500, feedingbuffer 100, resourcebuffer 24, bufferconsumption 25, chainlength 60, aggregation 20, fevermargin 320, safetyremoved 15; crossing to logistics')
})
