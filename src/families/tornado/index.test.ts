import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TornadoFormulas } from './index.js'
import '../../mcp/families.js'

test('tornado: efscale, windspeed, pathlength, width, durationmin, damageindex, pressuredeficit, vorticity — crossing to meteorology', async (t) => {
  assert.equal(TornadoFormulas.efscale(3, 5).value, 5)
  assert.equal(TornadoFormulas.windspeed(200, 1).value, 200)
  assert.equal(TornadoFormulas.pathlength(20, 1).value, 20)
  assert.equal(TornadoFormulas.width(800, 2).value, 400)
  assert.equal(TornadoFormulas.durationmin(60, 2).value, 30)
  assert.equal(TornadoFormulas.damageindex(80, 100).value, 80)
  assert.equal(TornadoFormulas.pressuredeficit(1013, 900).value, 113)
  assert.equal(TornadoFormulas.vorticity(30, 3).value, 90)
  assert.equal(TornadoFormulas.efscale(3, 5).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('tornado')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tornado', program: ['efscale'], params: [3, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `tornado.efscale at ${uuid}`)
  uuidReceiptOf('tornado efscale', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; efscale 5, windspeed 200, pathlength 20, width 400, durationmin 30, damageindex 80, pressuredeficit 113, vorticity 90; crossing to meteorology')
})
