import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CogenerationFormulas } from './index.js'
import '../../mcp/families.js'

test('cogeneration: totalefficiency, powertoheat, electricaloutput, heatoutput, fuelinput, primaryenergysaving, heatrecovery, carnotlimit — crossing to thermodynamics', async (t) => {
  assert.equal(CogenerationFormulas.totalefficiency(85, 100).value, 85)
  assert.equal(CogenerationFormulas.powertoheat(400, 600).value, 66)
  assert.equal(CogenerationFormulas.electricaloutput(500, 1).value, 500)
  assert.equal(CogenerationFormulas.heatoutput(700, 1).value, 700)
  assert.equal(CogenerationFormulas.fuelinput(500, 700).value, 1200)
  assert.equal(CogenerationFormulas.primaryenergysaving(20, 100).value, 20)
  assert.equal(CogenerationFormulas.heatrecovery(80, 100).value, 80)
  assert.equal(CogenerationFormulas.carnotlimit(100, 40).value, 60)
  assert.equal(CogenerationFormulas.totalefficiency(85, 100).dst, 'thermodynamics')
  assert.equal(hexFamiliesOf().get('cogeneration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cogeneration', program: ['totalefficiency'], params: [85, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `cogeneration.totalefficiency at ${uuid}`)
  uuidReceiptOf('cogeneration totalefficiency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; totalefficiency 85, powertoheat 66, electricaloutput 500, heatoutput 700, fuelinput 1200, primaryenergysaving 20, heatrecovery 80, carnotlimit 60; crossing to thermodynamics')
})
