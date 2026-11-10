import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SteganographyFormulas } from './index.js'
import '../../mcp/families.js'

test('steganography: capacity, payload, distortion, psnr, robustness, detectability, embedding, extraction — crossing to code', async (t) => {
  assert.equal(SteganographyFormulas.capacity(1024, 3).value, 3072, 'three bits per pixel')
  assert.equal(SteganographyFormulas.payload(250, 1000).value, 25)
  assert.equal(SteganographyFormulas.distortion(50, 1000).value, 5)
  assert.equal(SteganographyFormulas.psnr(9000, 100).value, 9000)
  assert.equal(SteganographyFormulas.robustness(7, 10).value, 70, 'survived seven of ten attacks')
  assert.equal(SteganographyFormulas.detectability(2, 100).value, 2)
  assert.equal(SteganographyFormulas.embedding(50, 200).value, 25)
  assert.equal(SteganographyFormulas.extraction(990, 1000).value, 99, 'nearly all bits recovered')
  assert.equal(SteganographyFormulas.capacity(1024, 3).dst, 'code')
  assert.equal(hexFamiliesOf().get('steganography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'steganography', program: ['payload'], params: [250, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `steganography.payload at ${uuid}`)
  uuidReceiptOf('steganography payload', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 3072, payload 25, distortion 5, psnr 9000, robustness 70, detectability 2, embedding 25, extraction 99; crossing to code')
})
