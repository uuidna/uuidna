import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CounterpointFormulas } from './index.js'
import '../../mcp/families.js'

test('counterpoint: voicecount, parallelfifths, motioncontrary, intervalconsonance, speciesratio, dissonancecount, cantusspan, imitationdelay — crossing to music', async (t) => {
  assert.equal(CounterpointFormulas.voicecount(2, 2).value, 4, 'four voices sounding')
  assert.equal(CounterpointFormulas.parallelfifths(3, 10).value, 30)
  assert.equal(CounterpointFormulas.motioncontrary(10, 4).value, 6, 'six contrary motions')
  assert.equal(CounterpointFormulas.intervalconsonance(7, 12).value, 1, 'a fifth within the octave is consonant')
  assert.equal(CounterpointFormulas.intervalconsonance(13, 12).value, 0)
  assert.equal(CounterpointFormulas.speciesratio(8, 4).value, 2, 'second species, two to one')
  assert.equal(CounterpointFormulas.dissonancecount(10, 7).value, 3)
  assert.equal(CounterpointFormulas.cantusspan(24, 12).value, 12, 'an octave of span')
  assert.equal(CounterpointFormulas.imitationdelay(8, 2).value, 4)
  assert.equal(CounterpointFormulas.voicecount(2, 2).dst, 'music')
  assert.equal(hexFamiliesOf().get('counterpoint')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'counterpoint', program: ['speciesratio'], params: [8, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `counterpoint.speciesratio at ${uuid}`)
  uuidReceiptOf('counterpoint speciesratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; voicecount 4, parallelfifths 30, motioncontrary 6, intervalconsonance 1, speciesratio 2, dissonancecount 3, cantusspan 12, imitationdelay 4; crossing to music')
})
