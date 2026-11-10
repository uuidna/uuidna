import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GearFormulas } from './index.js'

/** gear: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('gear: ratio, torque, rpm, teeth, mesh, stages, backlash, pairs', async (t) => {
  assert.equal(GearFormulas.ratio(60, 20).value, 3, 'ratio(60, 20)')
  assert.equal(GearFormulas.torque(100, 3).value, 300, 'torque(100, 3)')
  assert.equal(GearFormulas.rpm(3600, 3).value, 1200, 'rpm(3600, 3)')
  assert.equal(GearFormulas.teeth(20, 40).value, 60, 'teeth(20, 40)')
  assert.equal(GearFormulas.mesh(20, 3).value, 60, 'mesh(20, 3)')
  assert.equal(GearFormulas.stages(3).value, 8, 'stages(3)')
  assert.equal(GearFormulas.backlash(100, 5).value, 95, 'backlash(100, 5)')
  assert.equal(GearFormulas.pairs(6, 2).value, 15, 'pairs(6, 2)')
  assert.equal(hexFamiliesOf().get('gear')?.length, 8)
  for (const [name, params, expected] of [["ratio",[60,20],3],["torque",[100,3],300],["rpm",[3600,3],1200]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'gear', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `gear.${name} at ${uuid}`)
    uuidReceiptOf(`gear ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "ratio=3, torque=300, rpm=1200")
})
