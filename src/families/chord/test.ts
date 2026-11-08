import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChordFormulas } from './index.js'
import '../../mcp/families.js'

test('chord: notecount, intervalspan, inversioncount, triadquality, extensiondegree, voicingwidth, rootposition, stackedthirds — crossing to music', async (t) => {
  assert.equal(ChordFormulas.notecount(3, 4).value, 7, 'a triad plus four extensions')
  assert.equal(ChordFormulas.intervalspan(12, 0).value, 12, 'an octave of semitones')
  assert.equal(ChordFormulas.inversioncount(4).value, 4, 'four positions for a four-note chord')
  assert.equal(ChordFormulas.triadquality(4, 3).value, 7, 'major triad semitone sum')
  assert.equal(ChordFormulas.extensiondegree(3).value, 7, 'three thirds reach a seventh')
  assert.equal(ChordFormulas.voicingwidth(24, 3).value, 8, 'eight semitones per gap')
  assert.equal(ChordFormulas.rootposition(0, 0).value, 1, 'bass on the root')
  assert.equal(ChordFormulas.rootposition(2, 0).value, 0)
  assert.equal(ChordFormulas.stackedthirds(4).value, 3, 'four notes stack three thirds')
  assert.equal(ChordFormulas.notecount(3, 4).dst, 'music')
  assert.equal(hexFamiliesOf().get('chord')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chord', program: ['voicingwidth'], params: [24, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `chord.voicingwidth at ${uuid}`)
  uuidReceiptOf('chord voicingwidth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; notecount 7, intervalspan 12, inversioncount 4, triadquality 7, extensiondegree 7, voicingwidth 8, rootposition 1, stackedthirds 3; crossing to music')
})
