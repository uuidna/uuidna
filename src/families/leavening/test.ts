import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LeaveningFormulas } from './index.js'
import '../../mcp/families.js'

test('leavening: riseratio, co2volume, fermentationrate, yeastactivity, doublingtime, gasretention, acidityph, ovenspring — crossing to biochemistry', async (t) => {
  assert.equal(LeaveningFormulas.riseratio(200, 100).value, 200)
  assert.equal(LeaveningFormulas.co2volume(5, 40).value, 200)
  assert.equal(LeaveningFormulas.fermentationrate(600, 30).value, 20)
  assert.equal(LeaveningFormulas.yeastactivity(90, 100).value, 90)
  assert.equal(LeaveningFormulas.doublingtime(120, 2).value, 60)
  assert.equal(LeaveningFormulas.gasretention(80, 100).value, 80)
  assert.equal(LeaveningFormulas.acidityph(50, 10).value, 5)
  assert.equal(LeaveningFormulas.ovenspring(120, 100).value, 20)
  assert.equal(LeaveningFormulas.riseratio(200, 100).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('leavening')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'leavening', program: ['riseratio'], params: [200, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `leavening.riseratio at ${uuid}`)
  uuidReceiptOf('leavening riseratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; riseratio 200, co2volume 200, fermentationrate 20, yeastactivity 90, doublingtime 60, gasretention 80, acidityph 5, ovenspring 20; crossing to biochemistry')
})
