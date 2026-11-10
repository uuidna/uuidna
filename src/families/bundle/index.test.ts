import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BundleFormulas } from './index.js'
import '../../mcp/families.js'

test('bundle: chunks, treeshake, gzip, split, budget, dedupe, entry, overhead — crossing to frontend', async (t) => {
  assert.equal(BundleFormulas.chunks(100, 30).value, 4, 'four chunks for the modules')
  assert.equal(BundleFormulas.treeshake(300, 1000).value, 30)
  assert.equal(BundleFormulas.gzip(1000, 300).value, 30, 'gzip ratio')
  assert.equal(BundleFormulas.split(8, 10).value, 80, 'percent of routes lazy')
  assert.equal(BundleFormulas.budget(900, 1000).value, 1, 'within budget')
  assert.equal(BundleFormulas.budget(1100, 1000).value, 0)
  assert.equal(BundleFormulas.dedupe(12).value, 12)
  assert.equal(BundleFormulas.entry(5000, 10).value, 500, 'average chunk weight')
  assert.equal(BundleFormulas.overhead(50, 1000).value, 5)
  assert.equal(BundleFormulas.chunks(100, 30).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('bundle')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bundle', program: ['chunks'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `bundle.chunks at ${uuid}`)
  uuidReceiptOf('bundle chunks', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chunks 4, treeshake 30, gzip 30, split 80, budget 1, dedupe 12, entry 500, overhead 5; crossing to frontend')
})
