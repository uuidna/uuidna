import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AudiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('audiology: threshold, loss, discrimination, gain, frequency, masking, reverberation, tinnitus — crossing to med', async (t) => {
  assert.equal(AudiologyFormulas.threshold(40).value, 40, 'the threshold in decibels')
  assert.equal(AudiologyFormulas.loss(60, 25).value, 240)
  assert.equal(AudiologyFormulas.discrimination(45, 50).value, 90, 'speech discrimination score')
  assert.equal(AudiologyFormulas.gain(120, 40).value, 300, 'hearing-aid gain')
  assert.equal(AudiologyFormulas.frequency(8000, 2).value, 4000, 'hertz')
  assert.equal(AudiologyFormulas.masking(80, 20).value, 400)
  assert.equal(AudiologyFormulas.reverberation(600, 120).value, 5)
  assert.equal(AudiologyFormulas.tinnitus(6000, 4000).value, 150)
  assert.equal(AudiologyFormulas.loss(10, 0).value, 0, 'guarded division')
  assert.equal(AudiologyFormulas.discrimination(45, 50).dst, 'med')
  assert.equal(hexFamiliesOf().get('audiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'audiology', program: ['frequency'], params: [8000, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4000, `audiology.frequency at ${uuid}`)
  uuidReceiptOf('audiology frequency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; threshold 40, loss 240, discrimination 90, gain 300, frequency 4000, masking 400, reverberation 5, tinnitus 150; crossing to med')
})
