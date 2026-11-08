import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NoisepollutionFormulas } from './index.js'
import '../../mcp/families.js'

test('noisepollution: leq, daynight, exceedance, exposuredose, distanceattenuation, barrierloss, limitmargin, annoyanceindex — crossing to acoustics', async (t) => {
  assert.equal(NoisepollutionFormulas.leq(3600, 60).value, 60, 'equivalent level over the window')
  assert.equal(NoisepollutionFormulas.daynight(60, 50).value, 60, 'day-night average with the night penalty')
  assert.equal(NoisepollutionFormulas.exceedance(75, 65).value, 10, 'ten over the limit')
  assert.equal(NoisepollutionFormulas.exceedance(60, 65).value, 0)
  assert.equal(NoisepollutionFormulas.exposuredose(85, 8).value, 680, 'a shift at the level')
  assert.equal(NoisepollutionFormulas.distanceattenuation(100, 3).value, 82, 'three doublings away')
  assert.equal(NoisepollutionFormulas.barrierloss(12, 8).value, 18)
  assert.equal(NoisepollutionFormulas.limitmargin(65, 50).value, 15, 'headroom under the limit')
  assert.equal(NoisepollutionFormulas.annoyanceindex(70, 1000).value, 700)
  assert.equal(NoisepollutionFormulas.leq(3600, 60).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('noisepollution')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'noisepollution', program: ['leq'], params: [3600, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `noisepollution.leq at ${uuid}`)
  uuidReceiptOf('noisepollution leq', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; leq 60, daynight 60, exceedance 10, exposuredose 680, distanceattenuation 82, barrierloss 18, limitmargin 15, annoyanceindex 700; crossing to acoustics')
})
