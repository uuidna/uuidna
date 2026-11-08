import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RecoveryFormulas } from './index.js'
import '../../mcp/families.js'

test('recovery: resttime, heartratedrop, sleepdebt, recoveryrate, musclerepair, readiness, overtrainingindex, hydrationgap — crossing to physiology', async (t) => {
  assert.equal(RecoveryFormulas.resttime(48, 2).value, 96)
  assert.equal(RecoveryFormulas.heartratedrop(180, 120).value, 60)
  assert.equal(RecoveryFormulas.sleepdebt(56, 40).value, 16)
  assert.equal(RecoveryFormulas.recoveryrate(80, 100).value, 80)
  assert.equal(RecoveryFormulas.musclerepair(4800, 48).value, 100)
  assert.equal(RecoveryFormulas.readiness(85, 100).value, 85)
  assert.equal(RecoveryFormulas.overtrainingindex(120, 100).value, 120)
  assert.equal(RecoveryFormulas.hydrationgap(3000, 2500).value, 500)
  assert.equal(RecoveryFormulas.resttime(48, 2).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('recovery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'recovery', program: ['resttime'], params: [48, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 96, `recovery.resttime at ${uuid}`)
  uuidReceiptOf('recovery resttime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; resttime 96, heartratedrop 60, sleepdebt 16, recoveryrate 80, musclerepair 100, readiness 85, overtrainingindex 120, hydrationgap 500; crossing to physiology')
})
