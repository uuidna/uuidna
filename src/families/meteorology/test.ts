import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MeteorologyFormulas } from './index.js'
import '../../mcp/families.js'

test('meteorology: humidity, dewpoint, heatindex, windchill, pressure, lapse, precipitation, visibility — crossing to climate', async (t) => {
  assert.equal(MeteorologyFormulas.humidity(75, 100).value, 75, 'relative humidity %')
  assert.equal(MeteorologyFormulas.dewpoint(20, 5).value, 15)
  assert.equal(MeteorologyFormulas.heatindex(30, 10).value, 40, 'heat-index proxy')
  assert.equal(MeteorologyFormulas.windchill(10, 4).value, 6)
  assert.equal(MeteorologyFormulas.pressure(1013, 13).value, 1000)
  assert.equal(MeteorologyFormulas.lapse(25, 6).value, 19)
  assert.equal(MeteorologyFormulas.precipitation(1000, 50).value, 20, 'depth over area')
  assert.equal(MeteorologyFormulas.visibility(80, 40).value, 200)
  assert.equal(MeteorologyFormulas.humidity(75, 100).dst, 'climate')
  assert.equal(hexFamiliesOf().get('meteorology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'meteorology', program: ['dewpoint'], params: [20, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `meteorology.dewpoint at ${uuid}`)
  uuidReceiptOf('meteorology dewpoint', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; humidity 75, dewpoint 15, heatindex 40, windchill 6, pressure 1000, lapse 19, precipitation 20, visibility 200; crossing to climate')
})
