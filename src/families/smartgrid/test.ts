import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SmartgridFormulas } from './index.js'
import '../../mcp/families.js'

test('smartgrid: nodes, loadcombos, demandresponse, selfhealingpaths, meterdata, outagereduction, renewableshare, stabilitymargin — crossing to energy', async (t) => {
  assert.equal(SmartgridFormulas.nodes(1000, 2).value, 2000)
  assert.equal(SmartgridFormulas.loadcombos(12, 2).value, 66)
  assert.equal(SmartgridFormulas.demandresponse(15, 100).value, 15)
  assert.equal(SmartgridFormulas.selfhealingpaths(6, 2).value, 30)
  assert.equal(SmartgridFormulas.meterdata(1000, 24).value, 24000)
  assert.equal(SmartgridFormulas.outagereduction(40, 100).value, 40)
  assert.equal(SmartgridFormulas.renewableshare(50, 100).value, 50)
  assert.equal(SmartgridFormulas.stabilitymargin(100, 20).value, 80)
  assert.equal(SmartgridFormulas.nodes(1000, 2).dst, 'energy')
  assert.equal(hexFamiliesOf().get('smartgrid')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'smartgrid', program: ['nodes'], params: [1000, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `smartgrid.nodes at ${uuid}`)
  uuidReceiptOf('smartgrid nodes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; nodes 2000, loadcombos 66, demandresponse 15, selfhealingpaths 30, meterdata 24000, outagereduction 40, renewableshare 50, stabilitymargin 80; crossing to energy')
})
