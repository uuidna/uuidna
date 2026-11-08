import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CrossdockFormulas } from './index.js'
import '../../mcp/families.js'

test('crossdock: throughput, dwelltime, doorsneeded, touchcount, flowrate, stagingarea, sortaccuracy, transferlag — crossing to supplychain', async (t) => {
  assert.equal(CrossdockFormulas.throughput(6000, 60).value, 100)
  assert.equal(CrossdockFormulas.dwelltime(480, 8).value, 60)
  assert.equal(CrossdockFormulas.doorsneeded(100, 30).value, 4)
  assert.equal(CrossdockFormulas.touchcount(50, 2).value, 100)
  assert.equal(CrossdockFormulas.flowrate(1200, 12).value, 100)
  assert.equal(CrossdockFormulas.stagingarea(40, 50).value, 2000)
  assert.equal(CrossdockFormulas.sortaccuracy(990, 1000).value, 99)
  assert.equal(CrossdockFormulas.transferlag(60, 45).value, 15)
  assert.equal(CrossdockFormulas.throughput(6000, 60).dst, 'supplychain')
  assert.equal(hexFamiliesOf().get('crossdock')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'crossdock', program: ['throughput'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `crossdock.throughput at ${uuid}`)
  uuidReceiptOf('crossdock throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; throughput 100, dwelltime 60, doorsneeded 4, touchcount 100, flowrate 100, stagingarea 2000, sortaccuracy 99, transferlag 15; crossing to supplychain')
})
