import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AuthenticationFormulas } from './index.js'
import '../../mcp/families.js'

test('authentication: entropy, falsereject, falseaccept, sessions, lockout, tokenlife, strength, mfa — crossing to code', async (t) => {
  assert.equal(AuthenticationFormulas.entropy(62, 8).value, 496, 'bits proxy for an 8-char secret')
  assert.equal(AuthenticationFormulas.falsereject(2, 100).value, 2)
  assert.equal(AuthenticationFormulas.falseaccept(1, 100).value, 1)
  assert.equal(AuthenticationFormulas.sessions(100, 25).value, 4, 'sessions per user')
  assert.equal(AuthenticationFormulas.lockout(8, 5).value, 3, 'attempts beyond the threshold')
  assert.equal(AuthenticationFormulas.lockout(3, 5).value, 0)
  assert.equal(AuthenticationFormulas.tokenlife(3600).value, 3600)
  assert.equal(AuthenticationFormulas.strength(4, 12).value, 48)
  assert.equal(AuthenticationFormulas.mfa(3).value, 3)
  assert.equal(AuthenticationFormulas.entropy(62, 8).dst, 'code')
  assert.equal(hexFamiliesOf().get('authentication')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'authentication', program: ['sessions'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `authentication.sessions at ${uuid}`)
  uuidReceiptOf('authentication sessions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; entropy 496, falsereject 2, falseaccept 1, sessions 4, lockout 3, tokenlife 3600, strength 48, mfa 3; crossing to code')
})
