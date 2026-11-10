import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CivilFormulas } from './index.js'
import '../../mcp/families.js'

test('civil: beamload, bearing, concrete, deflection, runoff, settlement, slope, trafficflow — crossing to construction', async (t) => {
  assert.equal(CivilFormulas.beamload(1000, 5).value, 200, 'load per span')
  assert.equal(CivilFormulas.bearing(6000, 3).value, 2000, 'pressure under the footing')
  assert.equal(CivilFormulas.concrete(50, 7).value, 350, 'mix yield')
  assert.equal(CivilFormulas.deflection(800, 4).value, 200)
  assert.equal(CivilFormulas.runoff(2, 1500).value, 3000)
  assert.equal(CivilFormulas.settlement(900, 30).value, 30)
  assert.equal(CivilFormulas.slope(3, 100).value, 3, 'a three-percent grade')
  assert.equal(CivilFormulas.trafficflow(6000, 24).value, 250, 'vehicles per hour')
  assert.equal(CivilFormulas.beamload(1000, 0).value, 0, 'zero span guarded')
  assert.equal(CivilFormulas.beamload(1000, 5).dst, 'construction')
  assert.equal(hexFamiliesOf().get('civil')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'civil', program: ['beamload'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `civil.beamload at ${uuid}`)
  uuidReceiptOf('civil beamload', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; beamload 200, bearing 2000, concrete 350, deflection 200, runoff 3000, settlement 30, slope 3, trafficflow 250; crossing to construction')
})
