import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TsunamiFormulas } from './index.js'
import '../../mcp/families.js'

test('tsunami: wavespeed, wavelength, runup, traveltime, amplitude, inundationdistance, energyindex, warningtime — crossing to oceanography', async (t) => {
  assert.equal(TsunamiFormulas.wavespeed(40000, 20).value, 2000)
  assert.equal(TsunamiFormulas.wavelength(200, 1).value, 200)
  assert.equal(TsunamiFormulas.runup(10, 3).value, 30)
  assert.equal(TsunamiFormulas.traveltime(6000, 200).value, 30)
  assert.equal(TsunamiFormulas.amplitude(500, 50).value, 450)
  assert.equal(TsunamiFormulas.inundationdistance(30, 100).value, 3000)
  assert.equal(TsunamiFormulas.energyindex(8, 1000).value, 8000)
  assert.equal(TsunamiFormulas.warningtime(3600, 60).value, 60)
  assert.equal(TsunamiFormulas.wavespeed(40000, 20).dst, 'oceanography')
  assert.equal(hexFamiliesOf().get('tsunami')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tsunami', program: ['wavespeed'], params: [40000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `tsunami.wavespeed at ${uuid}`)
  uuidReceiptOf('tsunami wavespeed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wavespeed 2000, wavelength 200, runup 30, traveltime 30, amplitude 450, inundationdistance 3000, energyindex 8000, warningtime 60; crossing to oceanography')
})
