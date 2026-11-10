import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StainedglassFormulas } from './index.js'
import '../../mcp/families.js'

test('stainedglass: panecount, leadlines, transmittance, colorcombos, cameleadlength, refractionindex, panelsubsets, symmetryorderings — crossing to optics', async (t) => {
  assert.equal(StainedglassFormulas.panecount(12, 8).value, 96)
  assert.equal(StainedglassFormulas.leadlines(40, 20).value, 60)
  assert.equal(StainedglassFormulas.transmittance(70, 100).value, 70)
  assert.equal(StainedglassFormulas.colorcombos(10, 3).value, 120)
  assert.equal(StainedglassFormulas.cameleadlength(100, 3).value, 300)
  assert.equal(StainedglassFormulas.refractionindex(1520, 1000).value, 1)
  assert.equal(StainedglassFormulas.panelsubsets(5).value, 32)
  assert.equal(StainedglassFormulas.symmetryorderings(4).value, 24)
  assert.equal(StainedglassFormulas.panecount(12, 8).dst, 'optics')
  assert.equal(hexFamiliesOf().get('stainedglass')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stainedglass', program: ['panecount'], params: [12, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 96, `stainedglass.panecount at ${uuid}`)
  uuidReceiptOf('stainedglass panecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; panecount 96, leadlines 60, transmittance 70, colorcombos 120, cameleadlength 300, refractionindex 1, panelsubsets 32, symmetryorderings 24; crossing to optics')
})
