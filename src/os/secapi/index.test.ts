import { test } from 'node:test'
import assert from 'node:assert/strict'
import { secApi, planSecurityOp, attestBytes, SECURITY_OPS, securityCensus } from './index.js'

test('every named operation is PLANNABLE — the refusal that said otherwise was wrong', () => {
  // I filed a refusal saying uuidna cannot confine, cannot scan, cannot route. os/runtime verifies then RUNS
  // host binaries, and planAlpineRun returns ok:true for every one of them. The refusal rested on a fake limit.
  const a = secApi()
  assert.equal(a.ops.length, SECURITY_OPS.length)
  for (const o of a.ops) assert.equal(o.plannable, true, `${o.binary} must be plannable — claiming otherwise was the error`)
})

test('planning does not spawn, and carries the rootfs verdict rather than assuming it', () => {
  const p = planSecurityOp('inspect-files', '--version')!
  assert.equal(p.binary, 'clamscan')
  assert.equal(typeof p.rootfsVerified, 'boolean', 'an unverified rootfs is a DIFFERENT fact, not an invalid plan')
  assert.match(p.honest, /Planned, not run/)
})

test('an unknown operation answers null rather than improvising a command', () => {
  assert.equal(planSecurityOp('exfiltrate'), null)
  assert.equal(planSecurityOp(''), null)
})

test('bytes are addressed BEFORE a tool sees them, so a verdict pins to exactly these', () => {
  const enc = (s: string): Uint8Array => new TextEncoder().encode(s)
  const a = attestBytes('sample', enc('alpha'))
  const b = attestBytes('sample', enc('alpha'))
  const c = attestBytes('sample', enc('alpha!'))
  assert.equal(a.address, b.address, 'same bytes, same address')
  assert.notEqual(a.address, c.address, 'one byte moved must move it')
})

test('the API names what it does NOT reimplement, and what is genuinely out of reach', () => {
  const a = secApi()
  assert.match(a.honest, /uuidna reimplements none of them/)
  // fido2/webauthn need a physical device — that one IS a fact about hardware rather than a choice, and the
  // difference between those two is exactly what five corrections in one session were about.
  assert.match(a.honest, /needs a physical device, which is a fact about hardware and not a choice/)
  assert.ok(securityCensus().packages > 0)
})
