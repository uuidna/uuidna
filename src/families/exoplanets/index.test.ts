import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ExoplanetsFormulas } from './index.js'
import '../../mcp/families.js'

test('exoplanets: transitdepth, period, semimajor, radius, transitduration, radialvelocity, insolation, density — crossing to astronomy', async (t) => {
  assert.equal(ExoplanetsFormulas.transitdepth(2, 100).value, 400, 'a small planet dips its star by 400 ppm')
  assert.equal(ExoplanetsFormulas.transitdepth(2, 0).value, 0)
  assert.equal(ExoplanetsFormulas.period(6283, 10).value, 628, 'the orbital year')
  assert.equal(ExoplanetsFormulas.semimajor(150, 50).value, 100)
  assert.equal(ExoplanetsFormulas.radius(12742).value, 6371, 'half the diameter')
  assert.equal(ExoplanetsFormulas.transitduration(365, 100, 50).value, 730)
  assert.equal(ExoplanetsFormulas.radialvelocity(1, 100).value, 10, 'the stellar wobble')
  assert.equal(ExoplanetsFormulas.insolation(10000, 10).value, 100)
  assert.equal(ExoplanetsFormulas.density(5000, 1000).value, 5)
  assert.equal(ExoplanetsFormulas.transitdepth(2, 100).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('exoplanets')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'exoplanets', program: ['transitdepth'], params: [2, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `exoplanets.transitdepth at ${uuid}`)
  uuidReceiptOf('exoplanets transitdepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; transitdepth 400, period 628, semimajor 100, radius 6371, transitduration 730, radialvelocity 10, insolation 100, density 5; crossing to astronomy')
})
