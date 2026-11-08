import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AuthorizationFormulas } from './index.js'
import '../../mcp/families.js'

test('authorization: rolecount, permissionmatrix, leastprivilege, policyeval, grantratio, scopebreadth, separationofduty, accessreviewlag — crossing to networking', async (t) => {
  assert.equal(AuthorizationFormulas.rolecount(50, 4).value, 200, 'roles across the user base')
  assert.equal(AuthorizationFormulas.permissionmatrix(20, 30).value, 600, 'cells of the subject×object grid')
  assert.equal(AuthorizationFormulas.leastprivilege(10, 7).value, 3, 'permissions granted beyond need')
  assert.equal(AuthorizationFormulas.leastprivilege(5, 8).value, 0)
  assert.equal(AuthorizationFormulas.policyeval(90, 10).value, 1, 'policy allows at least as much as it denies')
  assert.equal(AuthorizationFormulas.policyeval(10, 90).value, 0)
  assert.equal(AuthorizationFormulas.grantratio(450, 500).value, 90, 'percent of requests granted')
  assert.equal(AuthorizationFormulas.scopebreadth(12, 8).value, 96)
  assert.equal(AuthorizationFormulas.separationofduty(3, 60).value, 5, 'percent of duty pairs in conflict')
  assert.equal(AuthorizationFormulas.accessreviewlag(100, 40).value, 60, 'reviews left overdue')
  assert.equal(AuthorizationFormulas.accessreviewlag(30, 50).value, 0)
  assert.equal(AuthorizationFormulas.rolecount(50, 4).dst, 'networking')
  assert.equal(hexFamiliesOf().get('authorization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'authorization', program: ['rolecount'], params: [50, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `authorization.rolecount at ${uuid}`)
  uuidReceiptOf('authorization rolecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rolecount 200, permissionmatrix 600, leastprivilege 3, policyeval 1, grantratio 90, scopebreadth 96, separationofduty 5, accessreviewlag 60; crossing to networking')
})
