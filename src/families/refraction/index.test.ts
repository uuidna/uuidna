import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RefractionFormulas } from './index.js'
import '../../mcp/families.js'

test('refraction: index, snell, criticalangle, dispersion, opticaldensity, speedinmedium, prismdeviation, totalinternal — crossing to optics', async (t) => {
  assert.equal(RefractionFormulas.index(300, 225).value, 1333, 'water index ×1000')
  assert.equal(RefractionFormulas.snell(1000, 30, 1333).value, 22, 'refracted proxy angle')
  assert.equal(RefractionFormulas.criticalangle(1333, 1000).value, 67)
  assert.equal(RefractionFormulas.dispersion(1340, 1330).value, 10)
  assert.equal(RefractionFormulas.opticaldensity(1333, 1000).value, 133)
  assert.equal(RefractionFormulas.speedinmedium(300, 1333).value, 225, 'speed in water ×1000')
  assert.equal(RefractionFormulas.prismdeviation(40, 35, 60).value, 15)
  assert.equal(RefractionFormulas.totalinternal(50, 48).value, 1, 'TIR occurs')
  assert.equal(RefractionFormulas.totalinternal(40, 48).value, 0)
  assert.equal(RefractionFormulas.index(300, 225).dst, 'optics')
  assert.equal(hexFamiliesOf().get('refraction')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'refraction', program: ['index'], params: [300, 225] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1333, `refraction.index at ${uuid}`)
  uuidReceiptOf('refraction index', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; index 1333, snell 22, criticalangle 67, dispersion 10, opticaldensity 133, speedinmedium 225, prismdeviation 15, totalinternal 1; crossing to optics')
})
