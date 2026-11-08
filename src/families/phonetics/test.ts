import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhoneticsFormulas } from './index.js'
import '../../mcp/families.js'

test('phonetics: formant, pitch, rate, voicing, duration, intensity, sonority, vowels — crossing to linguistics', async (t) => {
  assert.equal(PhoneticsFormulas.formant(2400, 3).value, 800, 'a formant over its harmonic')
  assert.equal(PhoneticsFormulas.pitch(2200, 10).value, 220, 'the fundamental in hertz')
  assert.equal(PhoneticsFormulas.rate(15, 3).value, 5, 'syllables per second')
  assert.equal(PhoneticsFormulas.voicing(6, 10).value, 60)
  assert.equal(PhoneticsFormulas.duration(120).value, 120)
  assert.equal(PhoneticsFormulas.intensity(70, 100).value, 70)
  assert.equal(PhoneticsFormulas.sonority(7).value, 7)
  assert.equal(PhoneticsFormulas.vowels(4, 10).value, 40)
  assert.equal(PhoneticsFormulas.formant(2400, 3).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('phonetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'phonetics', program: ['rate'], params: [15, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `phonetics.rate at ${uuid}`)
  uuidReceiptOf('phonetics rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; formant 800, pitch 220, rate 5, voicing 60, duration 120, intensity 70, sonority 7, vowels 40; crossing to linguistics')
})
