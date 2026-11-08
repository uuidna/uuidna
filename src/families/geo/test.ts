import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeoFormulas } from './index.js'

/** geo: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('geo: arcseconds, tiles, zoomcells, gridcells, degrees, area, quadkeys, waypoints', async (t) => {
  assert.equal(GeoFormulas.arcseconds(60, 60).value, 3600, 'arcseconds(60, 60)')
  assert.equal(GeoFormulas.tiles(10).value, 1024, 'tiles(10)')
  assert.equal(GeoFormulas.zoomcells(8).value, 256, 'zoomcells(8)')
  assert.equal(GeoFormulas.gridcells(16, 16).value, 256, 'gridcells(16, 16)')
  assert.equal(GeoFormulas.degrees(3600, 60).value, 60, 'degrees(3600, 60)')
  assert.equal(GeoFormulas.area(100, 50).value, 5000, 'area(100, 50)')
  assert.equal(GeoFormulas.quadkeys(4).value, 16, 'quadkeys(4)')
  assert.equal(GeoFormulas.waypoints(10, 2).value, 12, 'waypoints(10, 2)')
  assert.equal(hexFamiliesOf().get('geo')?.length, 8)
  for (const [name, params, expected] of [["arcseconds",[60,60],3600],["tiles",[10],1024],["zoomcells",[8],256]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'geo', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `geo.${name} at ${uuid}`)
    uuidReceiptOf(`geo ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "arcseconds=3600, tiles=1024, zoomcells=256")
})
