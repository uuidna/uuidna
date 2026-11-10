import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScalesFormulas } from './index.js'
import '../../mcp/families.js'

test('scales: degrees, modeshift, tetrachord, intervalpattern, transposition, pentatonicnotes, chromaticfill, keydistance — crossing to music', async (t) => {
  assert.equal(ScalesFormulas.degrees(7, 2).value, 14, 'a diatonic scale across two octaves')
  assert.equal(ScalesFormulas.modeshift(5, 10).value, 3)
  assert.equal(ScalesFormulas.tetrachord(2).value, 10, 'two perfect-fourth spans')
  assert.equal(ScalesFormulas.intervalpattern(12, 2).value, 6)
  assert.equal(ScalesFormulas.transposition(9, 5).value, 2, 'a note up a perfect fourth')
  assert.equal(ScalesFormulas.pentatonicnotes(3).value, 15)
  assert.equal(ScalesFormulas.chromaticfill(60, 72).value, 12, 'an octave of semitones')
  assert.equal(ScalesFormulas.keydistance(1).value, 7, 'one step of fifths is a fifth')
  assert.equal(ScalesFormulas.degrees(7, 2).dst, 'music')
  assert.equal(hexFamiliesOf().get('scales')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'scales', program: ['degrees'], params: [7, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 14, `scales.degrees at ${uuid}`)
  uuidReceiptOf('scales degrees', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; degrees 14, modeshift 3, tetrachord 10, intervalpattern 6, transposition 2, pentatonicnotes 15, chromaticfill 12, keydistance 7; crossing to music')
})
