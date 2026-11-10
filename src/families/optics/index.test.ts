import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OpticsFormulas } from './index.js'

/** optics: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('optics: magnify, fnumber, dpi, megapixels, resolution, aperturesteps, fov, elements', async (t) => {
  assert.equal(OpticsFormulas.magnify(10, 5).value, 50, 'magnify(10, 5)')
  assert.equal(OpticsFormulas.fnumber(200, 50).value, 4, 'fnumber(200, 50)')
  assert.equal(OpticsFormulas.dpi(3000, 10).value, 300, 'dpi(3000, 10)')
  assert.equal(OpticsFormulas.megapixels(4000, 3000).value, 12000000, 'megapixels(4000, 3000)')
  assert.equal(OpticsFormulas.resolution(1920, 1080).value, 2073600, 'resolution(1920, 1080)')
  assert.equal(OpticsFormulas.aperturesteps(6).value, 64, 'aperturesteps(6)')
  assert.equal(OpticsFormulas.fov(180, 40).value, 140, 'fov(180, 40)')
  assert.equal(OpticsFormulas.elements(6, 2).value, 8, 'elements(6, 2)')
  assert.equal(hexFamiliesOf().get('optics')?.length, 8)
  for (const [name, params, expected] of [["magnify",[10,5],50],["fnumber",[200,50],4],["dpi",[3000,10],300]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'optics', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `optics.${name} at ${uuid}`)
    uuidReceiptOf(`optics ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "magnify=50, fnumber=4, dpi=300")
})
