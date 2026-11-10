import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EtlFormulas } from './index.js'
import '../../mcp/families.js'

test('etl: throughput, rejectrate, batchwindow, transformcost, dedupe, latency, loadfactor, skew — crossing to compression', async (t) => {
  assert.equal(EtlFormulas.throughput(6000, 60).value, 100, 'records per second')
  assert.equal(EtlFormulas.rejectrate(50, 1000).value, 5)
  assert.equal(EtlFormulas.batchwindow(1000, 250).value, 4, 'four batches for the load')
  assert.equal(EtlFormulas.transformcost(1000, 5).value, 5000)
  assert.equal(EtlFormulas.dedupe(1000, 900).value, 100, 'duplicates removed')
  assert.equal(EtlFormulas.latency(5000, 100).value, 50)
  assert.equal(EtlFormulas.loadfactor(900, 1000).value, 90)
  assert.equal(EtlFormulas.skew(100, 30).value, 70, 'partition skew')
  assert.equal(EtlFormulas.skew(30, 100).value, 0)
  assert.equal(EtlFormulas.throughput(6000, 60).dst, 'compression')
  assert.equal(hexFamiliesOf().get('etl')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'etl', program: ['batchwindow'], params: [1000, 250] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `etl.batchwindow at ${uuid}`)
  uuidReceiptOf('etl batchwindow', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; throughput 100, rejectrate 5, batchwindow 4, transformcost 5000, dedupe 100, latency 50, loadfactor 90, skew 70; crossing to compression')
})
