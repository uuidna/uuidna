import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RhythmFormulas } from './index.js'
import '../../mcp/families.js'

test('rhythm: beatduration, measurelength, notespermeasure, polyrhythm, subdivision, swingratio, syncopation, tupletduration — crossing to music', async (t) => {
  assert.equal(RhythmFormulas.beatduration(120).value, 500, 'milliseconds per beat at 120 bpm')
  assert.equal(RhythmFormulas.measurelength(4, 500).value, 2000, 'four beats of a measure')
  assert.equal(RhythmFormulas.notespermeasure(4, 4).value, 16)
  assert.equal(RhythmFormulas.polyrhythm(3, 2).value, 6, 'three against two')
  assert.equal(RhythmFormulas.subdivision(500, 4).value, 125)
  assert.equal(RhythmFormulas.swingratio(2, 1).value, 200, 'a 2:1 swing')
  assert.equal(RhythmFormulas.syncopation(3, 8).value, 37)
  assert.equal(RhythmFormulas.tupletduration(1, 500, 3).value, 166, 'a triplet in one beat')
  assert.equal(RhythmFormulas.beatduration(120).dst, 'music')
  assert.equal(hexFamiliesOf().get('rhythm')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rhythm', program: ['polyrhythm'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6, `rhythm.polyrhythm at ${uuid}`)
  uuidReceiptOf('rhythm polyrhythm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; beatduration 500, measurelength 2000, notespermeasure 16, polyrhythm 6, subdivision 125, swingratio 200, syncopation 37, tupletduration 166; crossing to music')
})
