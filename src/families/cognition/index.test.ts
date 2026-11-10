import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CognitionFormulas } from './index.js'
import '../../mcp/families.js'

test('cognition: load, reaction, accuracy, span, fluency, bias, workingmemory, processing — crossing to psychology', async (t) => {
  assert.equal(CognitionFormulas.load(7, 4).value, 175, 'elements over capacity')
  assert.equal(CognitionFormulas.reaction(5000, 20).value, 250, 'mean reaction time')
  assert.equal(CognitionFormulas.accuracy(45, 50).value, 90)
  assert.equal(CognitionFormulas.span(6, 7).value, 85)
  assert.equal(CognitionFormulas.fluency(60, 2).value, 30, 'items per minute')
  assert.equal(CognitionFormulas.bias(30, 100).value, 30)
  assert.equal(CognitionFormulas.workingmemory(7).value, 7, 'chunks held')
  assert.equal(CognitionFormulas.processing(1000, 4).value, 250, 'operations per second')
  assert.equal(CognitionFormulas.load(7, 4).dst, 'psychology')
  assert.equal(hexFamiliesOf().get('cognition')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cognition', program: ['reaction'], params: [5000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `cognition.reaction at ${uuid}`)
  uuidReceiptOf('cognition reaction', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; load 175, reaction 250, accuracy 90, span 85, fluency 30, bias 30, workingmemory 7, processing 250; crossing to psychology')
})
