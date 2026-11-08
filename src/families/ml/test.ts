import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MlFormulas } from './index.js'
import '../../mcp/families.js'

test('ml: parameters, accuracy, featurecombos, epochs, layersubsets, learningrate, gradientsteps, f1score — crossing to statistics', async (t) => {
  assert.equal(MlFormulas.parameters(1000, 12).value, 12000)
  assert.equal(MlFormulas.accuracy(95, 100).value, 95)
  assert.equal(MlFormulas.featurecombos(20, 3).value, 1140)
  assert.equal(MlFormulas.epochs(50, 1).value, 50)
  assert.equal(MlFormulas.layersubsets(6).value, 64)
  assert.equal(MlFormulas.learningrate(1000, 100).value, 10)
  assert.equal(MlFormulas.gradientsteps(1000, 10).value, 10000)
  assert.equal(MlFormulas.f1score(88, 100).value, 88)
  assert.equal(MlFormulas.parameters(1000, 12).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('ml')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ml', program: ['parameters'], params: [1000, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12000, `ml.parameters at ${uuid}`)
  uuidReceiptOf('ml parameters', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; parameters 12000, accuracy 95, featurecombos 1140, epochs 50, layersubsets 64, learningrate 10, gradientsteps 10000, f1score 88; crossing to statistics')
})
