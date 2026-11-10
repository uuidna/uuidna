import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TextFormulas } from './index.js'

/** text: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('text: bytes, words, base64, lines, tokens, entropybits, chunks, pairs', async (t) => {
  assert.equal(TextFormulas.bytes(1000, 2).value, 2000, 'bytes(1000, 2)')
  assert.equal(TextFormulas.words(5000, 5).value, 1000, 'words(5000, 5)')
  assert.equal(TextFormulas.base64(1000, 3).value, 334, 'base64(1000, 3)')
  assert.equal(TextFormulas.lines(8000, 80).value, 100, 'lines(8000, 80)')
  assert.equal(TextFormulas.tokens(4000, 4).value, 1000, 'tokens(4000, 4)')
  assert.equal(TextFormulas.entropybits(16, 8).value, 128, 'entropybits(16, 8)')
  assert.equal(TextFormulas.chunks(10000, 512).value, 20, 'chunks(10000, 512)')
  assert.equal(TextFormulas.pairs(10, 2).value, 45, 'pairs(10, 2)')
  assert.equal(hexFamiliesOf().get('text')?.length, 8)
  for (const [name, params, expected] of [["bytes",[1000,2],2000],["words",[5000,5],1000],["base64",[1000,3],334]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'text', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `text.${name} at ${uuid}`)
    uuidReceiptOf(`text ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bytes=2000, words=1000, base64=334")
})
