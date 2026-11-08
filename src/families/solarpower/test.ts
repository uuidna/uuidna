import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SolarpowerFormulas } from './index.js'
import '../../mcp/families.js'

test('solarpower: paneloutput, efficiency, irradiance, dailyyield, arraysize, degradation, inverterloss, capacityfactor — crossing to energy', async (t) => {
  assert.equal(SolarpowerFormulas.paneloutput(300, 20).value, 6000)
  assert.equal(SolarpowerFormulas.efficiency(22, 100).value, 22)
  assert.equal(SolarpowerFormulas.irradiance(1000, 1).value, 1000)
  assert.equal(SolarpowerFormulas.dailyyield(300, 5).value, 1500)
  assert.equal(SolarpowerFormulas.arraysize(20, 2).value, 40)
  assert.equal(SolarpowerFormulas.degradation(80, 100).value, 80)
  assert.equal(SolarpowerFormulas.inverterloss(6000, 300).value, 5700)
  assert.equal(SolarpowerFormulas.capacityfactor(20, 100).value, 20)
  assert.equal(SolarpowerFormulas.paneloutput(300, 20).dst, 'energy')
  assert.equal(hexFamiliesOf().get('solarpower')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'solarpower', program: ['paneloutput'], params: [300, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `solarpower.paneloutput at ${uuid}`)
  uuidReceiptOf('solarpower paneloutput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; paneloutput 6000, efficiency 22, irradiance 1000, dailyyield 1500, arraysize 40, degradation 80, inverterloss 5700, capacityfactor 20; crossing to energy')
})
