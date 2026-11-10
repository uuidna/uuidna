import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PodcastingFormulas } from './index.js'
import '../../mcp/families.js'

test('podcasting: downloads, completion, retention, cadence, adload, bitrate, rank, growth — crossing to media', async (t) => {
  assert.equal(PodcastingFormulas.downloads(50, 2000).value, 100000, 'downloads across the run')
  assert.equal(PodcastingFormulas.completion(27, 30).value, 90)
  assert.equal(PodcastingFormulas.retention(600, 1000).value, 60, 'returning listeners')
  assert.equal(PodcastingFormulas.cadence(52, 52).value, 1, 'weekly')
  assert.equal(PodcastingFormulas.adload(90, 60).value, 150)
  assert.equal(PodcastingFormulas.bitrate(9600000, 60).value, 160000)
  assert.equal(PodcastingFormulas.rank(50000, 10000).value, 5)
  assert.equal(PodcastingFormulas.growth(1200, 1000).value, 200, 'grew')
  assert.equal(PodcastingFormulas.growth(900, 1000).value, 0)
  assert.equal(PodcastingFormulas.downloads(50, 2000).dst, 'media')
  assert.equal(hexFamiliesOf().get('podcasting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'podcasting', program: ['rank'], params: [50000, 10000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `podcasting.rank at ${uuid}`)
  uuidReceiptOf('podcasting rank', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; downloads 100000, completion 90, retention 60, cadence 1, adload 150, bitrate 160000, rank 5, growth 200; crossing to media')
})
