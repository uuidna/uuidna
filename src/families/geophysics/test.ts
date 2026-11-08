import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeophysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('geophysics: seismicvelocity, gravity, magnetic, heatflow, density, resistivity, magnitude, isostasy — crossing to geology', async (t) => {
  assert.equal(GeophysicsFormulas.seismicvelocity(6000, 2).value, 3000, 'seismic velocity')
  assert.equal(GeophysicsFormulas.gravity(1000, 10).value, 10)
  assert.equal(GeophysicsFormulas.magnetic(8000, 2).value, 1000)
  assert.equal(GeophysicsFormulas.heatflow(30, 3).value, 90)
  assert.equal(GeophysicsFormulas.density(6000, 2).value, 3000)
  assert.equal(GeophysicsFormulas.resistivity(240, 4).value, 60)
  assert.equal(GeophysicsFormulas.magnitude(7).value, 7, 'the amplitude itself')
  assert.equal(GeophysicsFormulas.isostasy(33, 100).value, 33)
  assert.equal(GeophysicsFormulas.seismicvelocity(6000, 2).dst, 'geology')
  assert.equal(hexFamiliesOf().get('geophysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geophysics', program: ['seismicvelocity'], params: [6000, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3000, `geophysics.seismicvelocity at ${uuid}`)
  uuidReceiptOf('geophysics seismicvelocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; seismicvelocity 3000, gravity 10, magnetic 1000, heatflow 90, density 3000, resistivity 60, magnitude 7, isostasy 33; crossing to geology')
})
