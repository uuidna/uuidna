import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DownloadFormulas } from './index.js'
import '../../mcp/families.js'

test('download: rate, eta, progress, chunks, resume, formats, checksum, size — crossing to frontend', async (t) => {
  assert.equal(DownloadFormulas.rate(1000, 10).value, 100, 'bytes per second')
  assert.equal(DownloadFormulas.eta(1000, 100).value, 10, 'seconds left')
  assert.equal(DownloadFormulas.progress(250, 1000).value, 25)
  assert.equal(DownloadFormulas.chunks(1000, 256).value, 4, 'four chunks for the file')
  assert.equal(DownloadFormulas.resume(300, 1000).value, 700)
  assert.equal(DownloadFormulas.formats(3).value, 3)
  assert.equal(DownloadFormulas.checksum(99, 100).value, 99)
  assert.equal(DownloadFormulas.size(10, 5000).value, 50000)
  assert.equal(DownloadFormulas.rate(1000, 10).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('download')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'download', program: ['chunks'], params: [1000, 256] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `download.chunks at ${uuid}`)
  uuidReceiptOf('download chunks', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 100, eta 10, progress 25, chunks 4, resume 700, formats 3, checksum 99, size 50000; crossing to frontend')
})
