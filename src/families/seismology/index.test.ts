import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SeismologyFormulas } from './index.js'
import '../../mcp/families.js'

test('seismology: magnitude, energy, distance, intensity, aftershocks, epicenter, frequency, moment — crossing to cern', async (t) => {
  assert.equal(SeismologyFormulas.magnitude(750).value, 7, 'Richter proxy')
  assert.equal(SeismologyFormulas.energy(7).value, 49)
  assert.equal(SeismologyFormulas.distance(10, 5).value, 50, 'S-P travel')
  assert.equal(SeismologyFormulas.intensity(7, 20).value, 35)
  assert.equal(SeismologyFormulas.intensity(7, 0).value, 0, 'depth guarded')
  assert.equal(SeismologyFormulas.aftershocks(100, 5).value, 200, 'Omori decay')
  assert.equal(SeismologyFormulas.aftershocks(100, 0).value, 0, 'days guarded')
  assert.equal(SeismologyFormulas.epicenter(30, 45).value, 75)
  assert.equal(SeismologyFormulas.frequency(500, 100).value, 5)
  assert.equal(SeismologyFormulas.frequency(500, 0).value, 0, 'years guarded')
  assert.equal(SeismologyFormulas.moment(1000, 3).value, 3000)
  assert.equal(SeismologyFormulas.distance(10, 5).dst, 'cern')
  assert.equal(hexFamiliesOf().get('seismology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'seismology', program: ['distance'], params: [10, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `seismology.distance at ${uuid}`)
  uuidReceiptOf('seismology distance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; magnitude 7, energy 49, distance 50, intensity 35, aftershocks 200, epicenter 75, frequency 5, moment 3000; crossing to cern')
})
