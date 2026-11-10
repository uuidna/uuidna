import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AccessFormulas } from './index.js'

/** Access is a formula: who reads, who writes, the role lattice, tenant isolation; and the security screen flags any
 *  request that fails a check — each a hex program at its address. */
test('access: read/write/role/tenant formulated, and the security screen names every violation', async (t) => {
  // published reads to all; drafts only to a signed-in user
  assert.equal(AccessFormulas.read(2, 0).value, 1, 'public reads published')
  assert.equal(AccessFormulas.read(1, 0).value, 0, 'public cannot read a draft')
  assert.equal(AccessFormulas.read(1, 1).value, 1, 'a user reads a draft')
  // write: admin anywhere, else only the owner
  assert.equal(AccessFormulas.write(2, 0, 0).value, 1, 'admin writes')
  assert.equal(AccessFormulas.write(1, 7, 7).value, 1, 'the owner writes their own')
  assert.equal(AccessFormulas.write(1, 7, 9).value, 0, 'a user cannot write another’s')
  // role lattice and tenant isolation
  assert.equal(AccessFormulas.role(3, 2).value, 1, 'super ≥ admin')
  assert.equal(AccessFormulas.role(1, 2).value, 0, 'user < admin')
  assert.equal(AccessFormulas.tenant(5, 5, 1).value, 1, 'same tenant')
  assert.equal(AccessFormulas.tenant(5, 6, 1).value, 0, 'cross-tenant blocked')
  assert.equal(AccessFormulas.tenant(5, 6, 3).value, 1, 'super crosses tenants')
  // the security screen: all five checks must pass (0b11111 = 31)
  assert.equal(AccessFormulas.screen(0b11111).value, 5, 'every check passes')
  assert.equal(AccessFormulas.screen(0b11111).holds, true)
  assert.equal(AccessFormulas.screen(0b10111).value, 4, 'one check fails')
  assert.equal(AccessFormulas.screen(0b10111).holds, false, 'a failed check is a violation')
  assert.deepEqual((AccessFormulas.screen(0b10111) as unknown as { failed: string[] }).failed, ['input-clean'])
  assert.equal(AccessFormulas.token(256).holds, true, '256-bit token is strong')
  assert.equal(AccessFormulas.token(128).holds, false, '128-bit token is below the floor')
  // the registry serves exactly the formulas the class states: none implemented and left unaddressable, none addressed that is not stated
  assert.deepEqual((hexFamiliesOf().get('access') ?? []).map((f) => f.name).sort(), Object.getOwnPropertyNames(AccessFormulas).filter((k) => typeof (AccessFormulas as unknown as Record<string, unknown>)[k] === 'function').sort())
  for (const [name, params, expected] of [['read', [2, 0], 1], ['screen', [0b11111], 5], ['tenant', [5, 6, 1], 0]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'access', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `access.${name} at ${uuid}`)
    uuidReceiptOf(`access ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('10 formulas; published reads to all, drafts to users; admin or owner writes; super crosses tenants; the screen names every failed check; root, rank, grant, sudo')
})
