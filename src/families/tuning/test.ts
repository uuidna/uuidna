import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TuningFormulas } from './index.js'
import '../../mcp/families.js'

test('tuning: beatfrequency, centsoffset, equaltempered, frequencyratio, octaveratio, pythagoreancomma, referencepitch, semitoneratio — crossing to music', async (t) => {
  assert.equal(TuningFormulas.beatfrequency(440, 438).value, 2, 'two beats a second')
  assert.equal(TuningFormulas.centsoffset(12).value, 1200, 'an octave in cents')
  assert.equal(TuningFormulas.equaltempered(3, 12).value, 36, 'semitones in three octaves')
  assert.equal(TuningFormulas.frequencyratio(880, 440).value, 2000, 'the octave as 2.000')
  assert.equal(TuningFormulas.octaveratio(4).value, 16)
  assert.equal(TuningFormulas.pythagoreancomma(12).value, 84, 'twelve fifths in semitones')
  assert.equal(TuningFormulas.referencepitch(1, 440).value, 880, 'A4 up an octave')
  assert.equal(TuningFormulas.semitoneratio(1200).value, 12, 'twelve semitones in an octave')
  assert.equal(TuningFormulas.beatfrequency(440, 438).dst, 'music')
  assert.equal(hexFamiliesOf().get('tuning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tuning', program: ['octaveratio'], params: [4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `tuning.octaveratio at ${uuid}`)
  uuidReceiptOf('tuning octaveratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; beatfrequency 2, centsoffset 1200, equaltempered 36, frequencyratio 2000, octaveratio 16, pythagoreancomma 84, referencepitch 880, semitoneratio 12; crossing to music')
})
