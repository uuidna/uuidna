import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AuthFormulas } from './index.js'
import '../../mcp/families.js'

test('auth: lockout, token, apikeys, verified, strength, sessions, expiry, failratio — crossing to payload', async (t) => {
  assert.equal(AuthFormulas.lockout(5, 5).value, 1, 'lockout trips at the max')
  assert.equal(AuthFormulas.lockout(3, 5).value, 0)
  assert.equal(AuthFormulas.token(1000, 4600).value, 3600, 'an hour of JWT life')
  assert.equal(AuthFormulas.apikeys(3, 4).value, 75)
  assert.equal(AuthFormulas.verified(900, 1000).value, 90)
  assert.equal(AuthFormulas.strength(12, 4).value, 48)
  assert.equal(AuthFormulas.sessions(10, 3).value, 3, 'capped at the max')
  assert.equal(AuthFormulas.expiry(1000, 4600).value, 3600)
  assert.equal(AuthFormulas.failratio(25, 100).value, 25)
  assert.equal(AuthFormulas.lockout(5, 5).dst, 'payload')
  assert.equal(hexFamiliesOf().get('auth')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'auth', program: ['token'], params: [1000, 4600] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3600, `auth.token at ${uuid}`)
  uuidReceiptOf('auth token', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lockout 1, token 3600, apikeys 75, verified 90, strength 48, sessions 3, expiry 3600, failratio 25; crossing to payload')
})
