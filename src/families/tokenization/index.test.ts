import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TokenizationFormulas } from './index.js'
import '../../mcp/families.js'

test('tokenization: tokencount, avgtokenlength, vocabsize, subwordratio, compressionratio, oovrate, charspertoken, fertility — crossing to linguistics', async (t) => {
  assert.equal(TokenizationFormulas.tokencount(1000, 4).value, 250, 'a thousand chars at four per token')
  assert.equal(TokenizationFormulas.avgtokenlength(1000, 250).value, 4)
  assert.equal(TokenizationFormulas.vocabsize(256, 50000).value, 50256, 'byte alphabet plus BPE merges')
  assert.equal(TokenizationFormulas.subwordratio(130, 100).value, 130)
  assert.equal(TokenizationFormulas.compressionratio(1000, 250).value, 400)
  assert.equal(TokenizationFormulas.oovrate(50, 1000).value, 5, 'five percent out of vocabulary')
  assert.equal(TokenizationFormulas.charspertoken(1200, 300).value, 4)
  assert.equal(TokenizationFormulas.fertility(130, 100).value, 130, 'tokens per word, scaled')
  assert.equal(TokenizationFormulas.tokencount(1000, 0).value, 0)
  assert.equal(TokenizationFormulas.tokencount(1000, 4).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('tokenization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tokenization', program: ['tokencount'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `tokenization.tokencount at ${uuid}`)
  uuidReceiptOf('tokenization tokencount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tokencount 250, avgtokenlength 4, vocabsize 50256, subwordratio 130, compressionratio 400, oovrate 5, charspertoken 4, fertility 130; crossing to linguistics')
})
