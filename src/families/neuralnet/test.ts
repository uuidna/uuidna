import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NeuralnetFormulas } from './index.js'
import '../../mcp/families.js'

test('neuralnet: parameters, layers, neurons, weights, relu, fanin, flops, capacity — crossing to neuroscience', async (t) => {
  assert.equal(NeuralnetFormulas.parameters(100, 10).value, 1010, 'weights plus biases of a dense layer')
  assert.equal(NeuralnetFormulas.layers(3).value, 5)
  assert.equal(NeuralnetFormulas.neurons(4, 128).value, 512, 'units across the depth')
  assert.equal(NeuralnetFormulas.weights(128, 64).value, 8192)
  assert.equal(NeuralnetFormulas.relu(42).value, 42, 'positive passes through')
  assert.equal(NeuralnetFormulas.relu(-5).value, 0)
  assert.equal(NeuralnetFormulas.fanin(8192, 64).value, 128, 'average incoming edges')
  assert.equal(NeuralnetFormulas.flops(8192, 512).value, 16896)
  assert.equal(NeuralnetFormulas.capacity(512, 32).value, 16384)
  assert.equal(NeuralnetFormulas.parameters(100, 10).dst, 'neuroscience')
  assert.equal(hexFamiliesOf().get('neuralnet')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'neuralnet', program: ['neurons'], params: [4, 128] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 512, `neuralnet.neurons at ${uuid}`)
  uuidReceiptOf('neuralnet neurons', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; parameters 1010, layers 5, neurons 512, weights 8192, relu 42, fanin 128, flops 16896, capacity 16384; crossing to neuroscience')
})
