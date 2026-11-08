import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LoggingFormulas } from './index.js'
import '../../mcp/families.js'

test('logging: ingestrate, retention, samplingrate, storagecost, errorratio, indexsize, rotationcount, compressionsavings — crossing to observability', async (t) => {
  assert.equal(LoggingFormulas.ingestrate(60000, 60).value, 1000, 'events per second')
  assert.equal(LoggingFormulas.retention(500, 30).value, 15000, 'a month of daily bytes')
  assert.equal(LoggingFormulas.samplingrate(10, 100).value, 10)
  assert.equal(LoggingFormulas.storagecost(1000, 5).value, 5000)
  assert.equal(LoggingFormulas.errorratio(50, 1000).value, 5)
  assert.equal(LoggingFormulas.indexsize(1000, 50).value, 50000)
  assert.equal(LoggingFormulas.rotationcount(1000, 300).value, 4, 'four files for the byte total')
  assert.equal(LoggingFormulas.compressionsavings(1000, 400).value, 600, 'bytes saved')
  assert.equal(LoggingFormulas.compressionsavings(400, 1000).value, 0)
  assert.equal(LoggingFormulas.ingestrate(60000, 60).dst, 'observability')
  assert.equal(hexFamiliesOf().get('logging')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'logging', program: ['rotationcount'], params: [1000, 300] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `logging.rotationcount at ${uuid}`)
  uuidReceiptOf('logging rotationcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ingestrate 1000, retention 15000, samplingrate 10, storagecost 5000, errorratio 5, indexsize 50000, rotationcount 4, compressionsavings 600; crossing to observability')
})
