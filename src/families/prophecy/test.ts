import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProphecyFormulas } from './index.js'
import '../../mcp/families.js'

test('prophecy: fulfillmentratio, symbolcount, timecycles, interpretationcombos, numbersum, sequencepaths, subsetreadings, intervalspan — crossing to statistics', async (t) => {
  assert.equal(ProphecyFormulas.fulfillmentratio(8, 10).value, 80)
  assert.equal(ProphecyFormulas.symbolcount(7, 3).value, 21)
  assert.equal(ProphecyFormulas.timecycles(7, 70).value, 490)
  assert.equal(ProphecyFormulas.interpretationcombos(10, 3).value, 120)
  assert.equal(ProphecyFormulas.numbersum(12, 12, 12).value, 36)
  assert.equal(ProphecyFormulas.sequencepaths(6, 2).value, 30)
  assert.equal(ProphecyFormulas.subsetreadings(5).value, 32)
  assert.equal(ProphecyFormulas.intervalspan(490, 70).value, 420)
  assert.equal(ProphecyFormulas.fulfillmentratio(8, 10).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('prophecy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'prophecy', program: ['fulfillmentratio'], params: [8, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `prophecy.fulfillmentratio at ${uuid}`)
  uuidReceiptOf('prophecy fulfillmentratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fulfillmentratio 80, symbolcount 21, timecycles 490, interpretationcombos 120, numbersum 36, sequencepaths 30, subsetreadings 32, intervalspan 420; crossing to statistics')
})
