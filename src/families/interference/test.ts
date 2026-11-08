import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InterferenceFormulas } from './index.js'
import '../../mcp/families.js'

test('interference: beatfrequency, constructive, destructive, fringecount, opticalpath, phasedifference, thinfilm, visibility — crossing to electromagnetism', async (t) => {
  assert.equal(InterferenceFormulas.beatfrequency(440, 435).value, 5, 'two tones five apart')
  assert.equal(InterferenceFormulas.constructive(3, 4).value, 7, 'amplitudes add in phase')
  assert.equal(InterferenceFormulas.destructive(7, 2).value, 5, 'amplitudes subtract out of phase')
  assert.equal(InterferenceFormulas.fringecount(1000, 25).value, 40, 'forty fringes in the region')
  assert.equal(InterferenceFormulas.opticalpath(2, 500).value, 1000)
  assert.equal(InterferenceFormulas.phasedifference(250, 500).value, 180, 'half a wavelength is 180°')
  assert.equal(InterferenceFormulas.thinfilm(2, 150).value, 600)
  assert.equal(InterferenceFormulas.visibility(80, 20).value, 60, 'sixty percent visibility')
  assert.equal(InterferenceFormulas.constructive(3, 4).dst, 'electromagnetism')
  assert.equal(hexFamiliesOf().get('interference')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'interference', program: ['fringecount'], params: [1000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `interference.fringecount at ${uuid}`)
  uuidReceiptOf('interference fringecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; beatfrequency 5, constructive 7, destructive 5, fringecount 40, opticalpath 1000, phasedifference 180, thinfilm 600, visibility 60; crossing to electromagnetism')
})
