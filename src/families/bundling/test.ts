import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BundlingFormulas } from './index.js'
import '../../mcp/families.js'

test('bundling: chunks, treeshake, minifyratio, gzipratio, splitpoints, cachehash, loadtime, dedupe — crossing to compression', async (t) => {
  assert.equal(BundlingFormulas.chunks(100, 30).value, 4, 'four chunks for the modules')
  assert.equal(BundlingFormulas.treeshake(1000, 600).value, 400, 'dead bytes dropped')
  assert.equal(BundlingFormulas.minifyratio(1000, 400).value, 60)
  assert.equal(BundlingFormulas.gzipratio(1000, 250).value, 4, 'four times smaller')
  assert.equal(BundlingFormulas.splitpoints(8, 2).value, 10)
  assert.equal(BundlingFormulas.cachehash(1000, 7).value, 31007)
  assert.equal(BundlingFormulas.loadtime(10000, 100).value, 100, 'milliseconds over the wire')
  assert.equal(BundlingFormulas.dedupe(50, 20).value, 30, 'duplicate copies removed')
  assert.equal(BundlingFormulas.dedupe(20, 50).value, 0)
  assert.equal(BundlingFormulas.chunks(100, 30).dst, 'compression')
  assert.equal(hexFamiliesOf().get('bundling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bundling', program: ['chunks'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `bundling.chunks at ${uuid}`)
  uuidReceiptOf('bundling chunks', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chunks 4, treeshake 400, minifyratio 60, gzipratio 4, splitpoints 10, cachehash 31007, loadtime 100, dedupe 30; crossing to compression')
})
