import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmbeddingFormulas } from './index.js'
import '../../mcp/families.js'

test('embedding: dimensions, dotsim, l2sq, tablesize, lookup, projection, cosine, hamming — crossing to linearalgebra', async (t) => {
  assert.equal(EmbeddingFormulas.dimensions(768, 12).value, 9216, 'a table of 768 dims across 12 heads')
  assert.equal(EmbeddingFormulas.dotsim(3, 4, 5).value, 32)
  assert.equal(EmbeddingFormulas.l2sq(3, 4).value, 25, 'the 3-4-5 right triangle')
  assert.equal(EmbeddingFormulas.tablesize(1000, 768).value, 768000)
  assert.equal(EmbeddingFormulas.lookup(10, 768).value, 7680)
  assert.equal(EmbeddingFormulas.projection(768, 256).value, 512, 'dimensions dropped')
  assert.equal(EmbeddingFormulas.cosine(7, 10).value, 70, 'per-cent cosine proxy')
  assert.equal(EmbeddingFormulas.cosine(5, 0).value, 0)
  assert.equal(EmbeddingFormulas.hamming(255, 0).value, 8)
  assert.equal(EmbeddingFormulas.dimensions(768, 12).dst, 'linearalgebra')
  assert.equal(hexFamiliesOf().get('embedding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'embedding', program: ['l2sq'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `embedding.l2sq at ${uuid}`)
  uuidReceiptOf('embedding l2sq', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dimensions 9216, dotsim 32, l2sq 25, tablesize 768000, lookup 7680, projection 512, cosine 70, hamming 8; crossing to linearalgebra')
})
