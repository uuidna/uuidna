import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MusicFormulas } from './index.js'
import '../../mcp/families.js'

test('music: interval, octave, bpm, beats, frequency, transpose, bars, tempo — crossing to tune', async (t) => {
  assert.equal(MusicFormulas.interval(7).value, 7, 'a perfect fifth')
  assert.equal(MusicFormulas.octave(60).value, 5, 'middle C sits in octave five')
  assert.equal(MusicFormulas.bpm(240, 4).value, 60, 'beats per minute')
  assert.equal(MusicFormulas.beats(4, 4).value, 16, 'four bars of common time')
  assert.equal(MusicFormulas.frequency(440, 12).value, 751, 'an octave up, equal-temperament approx')
  assert.equal(MusicFormulas.transpose(60, 7).value, 67)
  assert.equal(MusicFormulas.bars(16, 4).value, 4, 'bars from beats')
  assert.equal(MusicFormulas.tempo(500, 1).value, 120, '500 ms a beat is 120 BPM')
  assert.equal(MusicFormulas.interval(7).dst, 'tune')
  assert.equal(hexFamiliesOf().get('music')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'music', program: ['bpm'], params: [240, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `music.bpm at ${uuid}`)
  uuidReceiptOf('music bpm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; interval 7, octave 5, bpm 60, beats 16, frequency 751, transpose 67, bars 4, tempo 120; crossing to tune')
})
