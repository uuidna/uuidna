import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConvolutionFormulas } from './index.js'
import '../../mcp/families.js'

test('convolution: outputsize, receptivefield, padding, stride, kernelparams, featuremap, pooling, dilation — crossing to linearalgebra', async (t) => {
  assert.equal(ConvolutionFormulas.outputsize(28, 5, 1).value, 24, 'a 5×5 kernel over 28 at stride 1')
  assert.equal(ConvolutionFormulas.receptivefield(3, 5).value, 11, 'five stacked 3×3 kernels')
  assert.equal(ConvolutionFormulas.padding(7).value, 3)
  assert.equal(ConvolutionFormulas.stride(28, 14).value, 2)
  assert.equal(ConvolutionFormulas.kernelparams(3, 3, 16).value, 432, '3×3×3×16 weights')
  assert.equal(ConvolutionFormulas.featuremap(24, 16).value, 9216)
  assert.equal(ConvolutionFormulas.pooling(24, 2).value, 12)
  assert.equal(ConvolutionFormulas.dilation(3, 2).value, 5, 'a dilated 3×3 reaches 5')
  assert.equal(ConvolutionFormulas.outputsize(28, 5, 1).dst, 'linearalgebra')
  assert.equal(hexFamiliesOf().get('convolution')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'convolution', program: ['outputsize'], params: [28, 5, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `convolution.outputsize at ${uuid}`)
  uuidReceiptOf('convolution outputsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; outputsize 24, receptivefield 11, padding 3, stride 2, kernelparams 432, featuremap 9216, pooling 12, dilation 5; crossing to linearalgebra')
})
