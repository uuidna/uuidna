import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ArpeggioFormulas } from './index.js'
import '../../mcp/families.js'

test('arpeggio: notespan, cyclelength, noteduration, patternrepeats, rangeoctaves, velocitycurve, sweeprate, totalnotes — crossing to music', async (t) => {
  assert.equal(ArpeggioFormulas.notespan(60, 72).value, 12, 'an octave of semitones')
  assert.equal(ArpeggioFormulas.cyclelength(4, 3).value, 12, 'four notes over three octaves')
  assert.equal(ArpeggioFormulas.noteduration(1000, 8).value, 125)
  assert.equal(ArpeggioFormulas.patternrepeats(8, 2).value, 16)
  assert.equal(ArpeggioFormulas.rangeoctaves(36).value, 3, 'three octaves')
  assert.equal(ArpeggioFormulas.velocitycurve(64, 4, 3).value, 76)
  assert.equal(ArpeggioFormulas.sweeprate(120, 4).value, 30, 'notes per second')
  assert.equal(ArpeggioFormulas.totalnotes(4, 8).value, 32)
  assert.equal(ArpeggioFormulas.notespan(60, 72).dst, 'music')
  assert.equal(hexFamiliesOf().get('arpeggio')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'arpeggio', program: ['cyclelength'], params: [4, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `arpeggio.cyclelength at ${uuid}`)
  uuidReceiptOf('arpeggio cyclelength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; notespan 12, cyclelength 12, noteduration 125, patternrepeats 16, rangeoctaves 3, velocitycurve 76, sweeprate 30, totalnotes 32; crossing to music')
})
