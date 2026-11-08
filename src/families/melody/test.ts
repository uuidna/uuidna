import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MelodyFormulas } from './index.js'
import '../../mcp/families.js'

test('melody: range, contour, stepleap, phraselength, motifrepeat, pitchclass, transposition, density — crossing to music', async (t) => {
  assert.equal(MelodyFormulas.range(60, 48).value, 12, 'an octave of range')
  assert.equal(MelodyFormulas.contour(20, 8).value, 12, 'net upward motion')
  assert.equal(MelodyFormulas.stepleap(80, 20).value, 80, 'four-fifths stepwise')
  assert.equal(MelodyFormulas.phraselength(64, 8).value, 8)
  assert.equal(MelodyFormulas.motifrepeat(48, 4).value, 12, 'the motif twelve times')
  assert.equal(MelodyFormulas.pitchclass(64).value, 4)
  assert.equal(MelodyFormulas.transposition(60, 7).value, 7, 'up a fifth, into the octave')
  assert.equal(MelodyFormulas.density(100, 50).value, 200)
  assert.equal(MelodyFormulas.phraselength(64, 0).value, 0)
  assert.equal(MelodyFormulas.range(60, 48).dst, 'music')
  assert.equal(hexFamiliesOf().get('melody')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'melody', program: ['range'], params: [60, 48] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `melody.range at ${uuid}`)
  uuidReceiptOf('melody range', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; range 12, contour 12, stepleap 80, phraselength 8, motifrepeat 12, pitchclass 4, transposition 7, density 200; crossing to music')
})
