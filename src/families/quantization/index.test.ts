import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QuantizationFormulas } from './index.js'
import '../../mcp/families.js'

test('quantization: levels, stepsize, snr, bits, dynamicrange, quantizationerror, coderate, resolution — crossing to signal', async (t) => {
  assert.equal(QuantizationFormulas.levels(8).value, 256, '8 bits give 256 codes')
  assert.equal(QuantizationFormulas.stepsize(1000, 8).value, 125)
  assert.equal(QuantizationFormulas.stepsize(1000, 0).value, 0)
  assert.equal(QuantizationFormulas.snr(16).value, 96, '6 dB per bit')
  assert.equal(QuantizationFormulas.bits(1024).value, 10)
  assert.equal(QuantizationFormulas.dynamicrange(8).value, 255)
  assert.equal(QuantizationFormulas.quantizationerror(125).value, 62, 'half a step')
  assert.equal(QuantizationFormulas.coderate(16, 1000).value, 16000)
  assert.equal(QuantizationFormulas.resolution(2560, 8).value, 10)
  assert.equal(QuantizationFormulas.levels(8).dst, 'signal')
  assert.equal(hexFamiliesOf().get('quantization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'quantization', program: ['levels'], params: [8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 256, `quantization.levels at ${uuid}`)
  uuidReceiptOf('quantization levels', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; levels 256, stepsize 125, snr 96, bits 10, dynamicrange 255, quantizationerror 62, coderate 16000, resolution 10; crossing to signal')
})
