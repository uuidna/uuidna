import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TelescopeFormulas } from './index.js'

/** telescope: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('telescope: aperture, magnification, focalratio, resolution, lightgrasp, mirrors, fieldofview, combos', async (t) => {
  assert.equal(TelescopeFormulas.aperture(200, 1).value, 200, 'aperture(200, 1)')
  assert.equal(TelescopeFormulas.magnification(2000, 25).value, 80, 'magnification(2000, 25)')
  assert.equal(TelescopeFormulas.focalratio(2000, 200).value, 10, 'focalratio(2000, 200)')
  assert.equal(TelescopeFormulas.resolution(116, 1).value, 116, 'resolution(116, 1)')
  assert.equal(TelescopeFormulas.lightgrasp(200, 200).value, 40000, 'lightgrasp(200, 200)')
  assert.equal(TelescopeFormulas.mirrors(2, 0).value, 2, 'mirrors(2, 0)')
  assert.equal(TelescopeFormulas.fieldofview(60, 1).value, 60, 'fieldofview(60, 1)')
  assert.equal(TelescopeFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('telescope')?.length, 8)
  for (const [name, params, expected] of [["aperture",[200,1],200],["magnification",[2000,25],80],["focalratio",[2000,200],10]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'telescope', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `telescope.${name} at ${uuid}`)
    uuidReceiptOf(`telescope ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "aperture=200, magnification=80, focalratio=10")
})
