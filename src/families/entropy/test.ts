import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EntropyFormulas } from './index.js'
import '../../mcp/families.js'

test('entropy: shannon, maxentropy, jointentropy, conditionalentropy, mutualinformation, relativeentropy, informationgain, perplexity — crossing to statistics', async (t) => {
  assert.equal(EntropyFormulas.shannon(1000).value, 9, 'bits for a thousand symbols')
  assert.equal(EntropyFormulas.maxentropy(1000).value, 10, 'ceiling bits')
  assert.equal(EntropyFormulas.jointentropy(1000, 1000).value, 18, 'independent sources add')
  assert.equal(EntropyFormulas.conditionalentropy(18, 9).value, 9, 'what remains once x is known')
  assert.equal(EntropyFormulas.mutualinformation(10, 8, 15).value, 3, 'bits shared')
  assert.equal(EntropyFormulas.relativeentropy(2000, 500).value, 2, 'excess coding bits')
  assert.equal(EntropyFormulas.informationgain(16, 10).value, 6, 'bits a measurement buys')
  assert.equal(EntropyFormulas.perplexity(5).value, 32, 'branching factor of five bits')
  assert.equal(EntropyFormulas.shannon(1000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('entropy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'entropy', program: ['shannon'], params: [1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `entropy.shannon at ${uuid}`)
  uuidReceiptOf('entropy shannon', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shannon 9, maxentropy 10, jointentropy 18, conditionalentropy 9, mutualinformation 3, relativeentropy 2, informationgain 6, perplexity 32; crossing to statistics')
})
