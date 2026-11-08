import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WatershedFormulas } from './index.js'
import '../../mcp/families.js'

test('watershed: runoff, drainagedensity, timeofconcentration, peakflow, infiltration, catchmentarea, streamorder, basinrelief — crossing to hydrology', async (t) => {
  assert.equal(WatershedFormulas.runoff(200, 60).value, 120, 'the depth a storm sheds')
  assert.equal(WatershedFormulas.drainagedensity(1500, 30).value, 50)
  assert.equal(WatershedFormulas.timeofconcentration(3600, 2).value, 1800)
  assert.equal(WatershedFormulas.peakflow(50, 20, 100).value, 1000, 'the rational-method peak')
  assert.equal(WatershedFormulas.infiltration(200, 120).value, 80)
  assert.equal(WatershedFormulas.catchmentarea(500, 300).value, 150000)
  assert.equal(WatershedFormulas.streamorder(3, 3).value, 4, 'two third-order reaches make a fourth')
  assert.equal(WatershedFormulas.streamorder(3, 2).value, 3)
  assert.equal(WatershedFormulas.basinrelief(1200, 300).value, 900)
  assert.equal(WatershedFormulas.runoff(200, 60).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('watershed')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'watershed', program: ['runoff'], params: [200, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `watershed.runoff at ${uuid}`)
  uuidReceiptOf('watershed runoff', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; runoff 120, drainagedensity 50, timeofconcentration 1800, peakflow 1000, infiltration 80, catchmentarea 150000, streamorder 4, basinrelief 900; crossing to hydrology')
})
