import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElevatorFormulas } from './index.js'
import '../../mcp/families.js'

test('elevator: capacity, speed, floors, traveltime, waittime, dispatchcombos, accelrate, dutyload — crossing to kinematics', async (t) => {
  assert.equal(ElevatorFormulas.capacity(10, 80).value, 800)
  assert.equal(ElevatorFormulas.speed(1000, 100).value, 10)
  assert.equal(ElevatorFormulas.floors(40, 0).value, 40)
  assert.equal(ElevatorFormulas.traveltime(160, 10).value, 16)
  assert.equal(ElevatorFormulas.waittime(120, 4).value, 30)
  assert.equal(ElevatorFormulas.dispatchcombos(8, 2).value, 28)
  assert.equal(ElevatorFormulas.accelrate(100, 10).value, 10)
  assert.equal(ElevatorFormulas.dutyload(80, 100).value, 80)
  assert.equal(ElevatorFormulas.capacity(10, 80).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('elevator')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'elevator', program: ['capacity'], params: [10, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `elevator.capacity at ${uuid}`)
  uuidReceiptOf('elevator capacity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 800, speed 10, floors 40, traveltime 16, waittime 30, dispatchcombos 28, accelrate 10, dutyload 80; crossing to kinematics')
})
