import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CompressFormulas } from './index.js'
import '../../mcp/families.js'

test('compress: ratio, savedbits, dictionarysize, codelength, entropybits, blockcombos, huffmandepth, throughput — crossing to signal', async (t) => {
  assert.equal(CompressFormulas.ratio(800, 200).value, 400)
  assert.equal(CompressFormulas.savedbits(1000, 250).value, 750)
  assert.equal(CompressFormulas.dictionarysize(12).value, 4096)
  assert.equal(CompressFormulas.codelength(1000, 8).value, 125)
  assert.equal(CompressFormulas.entropybits(8, 100).value, 800)
  assert.equal(CompressFormulas.blockcombos(16, 2).value, 120)
  assert.equal(CompressFormulas.huffmandepth(4, 3).value, 7)
  assert.equal(CompressFormulas.throughput(6000, 60).value, 100)
  assert.equal(CompressFormulas.ratio(800, 200).dst, 'signal')
  assert.equal(hexFamiliesOf().get('compress')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'compress', program: ['ratio'], params: [800, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `compress.ratio at ${uuid}`)
  uuidReceiptOf('compress ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratio 400, savedbits 750, dictionarysize 4096, codelength 125, entropybits 800, blockcombos 120, huffmandepth 7, throughput 100; crossing to signal')
})
