import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RelativityFormulas } from './index.js'
import '../../mcp/families.js'

test('relativity: energy, dilation, lorentz, momentum, redshift, curvature, horizon, interval — crossing to gravity', async (t) => {
  assert.equal(RelativityFormulas.energy(2, 300).value, 600, 'E = mc² proxy')
  assert.equal(RelativityFormulas.dilation(10, 3).value, 30, 'time stretched')
  assert.equal(RelativityFormulas.lorentz(50, 100).value, 50, 'half light speed')
  assert.equal(RelativityFormulas.lorentz(10, 0).value, 0, 'guarded c = 0')
  assert.equal(RelativityFormulas.momentum(5, 20).value, 100)
  assert.equal(RelativityFormulas.redshift(1000, 900).value, 100, 'per mille shift')
  assert.equal(RelativityFormulas.redshift(0, 5).value, 0, 'guarded emitted = 0')
  assert.equal(RelativityFormulas.curvature(100, 4).value, 25)
  assert.equal(RelativityFormulas.curvature(100, 0).value, 0, 'guarded radius = 0')
  assert.equal(RelativityFormulas.horizon(7).value, 21, 'Schwarzschild proxy')
  assert.equal(RelativityFormulas.interval(50, 20).value, 30, 'space above time')
  assert.equal(RelativityFormulas.interval(20, 50).value, 0, 'folded to 0')
  assert.equal(RelativityFormulas.energy(2, 300).dst, 'gravity')
  assert.equal(hexFamiliesOf().get('relativity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'relativity', program: ['curvature'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `relativity.curvature at ${uuid}`)
  uuidReceiptOf('relativity curvature', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; energy 600, dilation 30, lorentz 50, momentum 100, redshift 100, curvature 25, horizon 21, interval 30; crossing to gravity')
})
