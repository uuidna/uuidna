import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TurnaroundFormulas } from './index.js'
import '../../mcp/families.js'

test('turnaround: gatetime, dockoccupancy, loadtime, cyclecount, delayminutes, berthutilization, servicerate, idlegap — crossing to logistics', async (t) => {
  assert.equal(TurnaroundFormulas.gatetime(240, 4).value, 60)
  assert.equal(TurnaroundFormulas.dockoccupancy(18, 24).value, 75)
  assert.equal(TurnaroundFormulas.loadtime(30, 20).value, 50)
  assert.equal(TurnaroundFormulas.cyclecount(480, 60).value, 8)
  assert.equal(TurnaroundFormulas.delayminutes(90, 60).value, 30)
  assert.equal(TurnaroundFormulas.berthutilization(20, 24).value, 83)
  assert.equal(TurnaroundFormulas.servicerate(480, 60).value, 8)
  assert.equal(TurnaroundFormulas.idlegap(60, 45).value, 15)
  assert.equal(TurnaroundFormulas.gatetime(240, 4).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('turnaround')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'turnaround', program: ['gatetime'], params: [240, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `turnaround.gatetime at ${uuid}`)
  uuidReceiptOf('turnaround gatetime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gatetime 60, dockoccupancy 75, loadtime 50, cyclecount 8, delayminutes 30, berthutilization 83, servicerate 8, idlegap 15; crossing to logistics')
})
