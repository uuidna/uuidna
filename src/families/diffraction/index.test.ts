import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DiffractionFormulas } from './index.js'
import '../../mcp/families.js'

test('diffraction: gratingorder, slitspacing, resolvingpower, fringespacing, braggangle, aperture, rayleighcriterion, pathdifference — crossing to electromagnetism', async (t) => {
  assert.equal(DiffractionFormulas.gratingorder(3, 500).value, 1500, 'third-order path')
  assert.equal(DiffractionFormulas.slitspacing(10000, 500).value, 20, 'line spacing')
  assert.equal(DiffractionFormulas.resolvingpower(2, 600).value, 1200)
  assert.equal(DiffractionFormulas.fringespacing(500, 2000, 100).value, 10000, 'two-slit fringe spacing')
  assert.equal(DiffractionFormulas.braggangle(2, 600, 300).value, 2)
  assert.equal(DiffractionFormulas.aperture(10000, 500).value, 20, 'diameter in wavelengths')
  assert.equal(DiffractionFormulas.rayleighcriterion(500, 1000).value, 61)
  assert.equal(DiffractionFormulas.pathdifference(300, 4).value, 1200)
  assert.equal(DiffractionFormulas.slitspacing(10000, 0).value, 0)
  assert.equal(DiffractionFormulas.gratingorder(3, 500).dst, 'electromagnetism')
  assert.equal(hexFamiliesOf().get('diffraction')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'diffraction', program: ['gratingorder'], params: [3, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1500, `diffraction.gratingorder at ${uuid}`)
  uuidReceiptOf('diffraction gratingorder', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gratingorder 1500, slitspacing 20, resolvingpower 1200, fringespacing 10000, braggangle 2, aperture 20, rayleighcriterion 61, pathdifference 1200; crossing to electromagnetism')
})
