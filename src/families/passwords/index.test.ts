import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PasswordsFormulas } from './index.js'
import '../../mcp/families.js'

test('passwords: entropybits, keyspacebits, lockoutwindow, rotationdays, minlengthscore, hashcost, mfabonus, reuserisk — crossing to hashing', async (t) => {
  assert.equal(PasswordsFormulas.entropybits(16, 95).value, 96, 'sixteen chars from a 95-symbol alphabet')
  assert.equal(PasswordsFormulas.keyspacebits(96, 32).value, 64)
  assert.equal(PasswordsFormulas.keyspacebits(32, 96).value, 0, 'overhead cannot push the keyspace below zero')
  assert.equal(PasswordsFormulas.lockoutwindow(100, 10).value, 10, 'ten minutes to cover the attempts')
  assert.equal(PasswordsFormulas.rotationdays(90, 3).value, 30)
  assert.equal(PasswordsFormulas.minlengthscore(16, 8).value, 8)
  assert.equal(PasswordsFormulas.hashcost(12, 50).value, 600)
  assert.equal(PasswordsFormulas.mfabonus(3, 20).value, 60)
  assert.equal(PasswordsFormulas.reuserisk(10, 3).value, 30, 'three in ten reused and breached')
  assert.equal(PasswordsFormulas.entropybits(16, 95).dst, 'hashing')
  assert.equal(hexFamiliesOf().get('passwords')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'passwords', program: ['entropybits'], params: [16, 95] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 96, `passwords.entropybits at ${uuid}`)
  uuidReceiptOf('passwords entropybits', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; entropybits 96, keyspacebits 64, lockoutwindow 10, rotationdays 30, minlengthscore 8, hashcost 600, mfabonus 60, reuserisk 30; crossing to hashing')
})
