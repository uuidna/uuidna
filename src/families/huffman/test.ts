import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HuffmanFormulas } from './index.js'
import '../../mcp/families.js'

test('huffman: averagelength, codelength, compressionratio, efficiency, leafcount, savedbits, treenodes, weightedpath — crossing to signal', async (t) => {
  assert.equal(HuffmanFormulas.averagelength(100, 25).value, 4, 'four bits a symbol')
  assert.equal(HuffmanFormulas.codelength(10, 3).value, 30)
  assert.equal(HuffmanFormulas.compressionratio(800, 200).value, 400, 'four times the compressed size')
  assert.equal(HuffmanFormulas.efficiency(90, 100).value, 90)
  assert.equal(HuffmanFormulas.leafcount(15).value, 8, 'eight leaves under the tree')
  assert.equal(HuffmanFormulas.savedbits(1000, 300).value, 700)
  assert.equal(HuffmanFormulas.savedbits(300, 1000).value, 0)
  assert.equal(HuffmanFormulas.treenodes(8).value, 15, 'a full binary tree over eight leaves')
  assert.equal(HuffmanFormulas.weightedpath(12, 4).value, 48)
  assert.equal(HuffmanFormulas.averagelength(100, 25).dst, 'signal')
  assert.equal(hexFamiliesOf().get('huffman')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'huffman', program: ['treenodes'], params: [8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `huffman.treenodes at ${uuid}`)
  uuidReceiptOf('huffman treenodes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; averagelength 4, codelength 30, compressionratio 400, efficiency 90, leafcount 8, savedbits 700, treenodes 15, weightedpath 48; crossing to signal')
})
