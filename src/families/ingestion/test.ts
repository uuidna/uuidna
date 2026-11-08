import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IngestionFormulas } from './index.js'
import '../../mcp/families.js'

test('ingestion: eventrate, backpressure, bufferfill, watermark, lag, batchsize, retrybudget, checkpoint — crossing to caching', async (t) => {
  assert.equal(IngestionFormulas.eventrate(6000, 60).value, 100, 'events per second')
  assert.equal(IngestionFormulas.backpressure(1200, 1000).value, 200, 'overflow past capacity')
  assert.equal(IngestionFormulas.bufferfill(750, 1000).value, 75)
  assert.equal(IngestionFormulas.watermark(1000, 30).value, 34, 'windows for the stream')
  assert.equal(IngestionFormulas.lag(10000, 9500).value, 500)
  assert.equal(IngestionFormulas.batchsize(1000, 8).value, 125)
  assert.equal(IngestionFormulas.retrybudget(2, 5).value, 3)
  assert.equal(IngestionFormulas.checkpoint(1050, 100).value, 1000)
  assert.equal(IngestionFormulas.backpressure(800, 1000).value, 0)
  assert.equal(IngestionFormulas.eventrate(6000, 60).dst, 'caching')
  assert.equal(hexFamiliesOf().get('ingestion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ingestion', program: ['batchsize'], params: [1000, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `ingestion.batchsize at ${uuid}`)
  uuidReceiptOf('ingestion batchsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; eventrate 100, backpressure 200, bufferfill 75, watermark 34, lag 500, batchsize 125, retrybudget 3, checkpoint 1000; crossing to caching')
})
