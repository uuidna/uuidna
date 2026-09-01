import { test } from 'node:test'
import assert from 'node:assert/strict'
import { driverState, driverPin, driverCheck, driverCensus } from './index.js'

test('the port is provenance and the census counts it', () => {
  const c = driverCensus()
  assert.equal(c.domain, 'driver')
  assert.ok(c.packages > 0 && c.origins > 0)
})

test('measured and published are kept apart, and both are present', () => {
  const s = driverState()
  assert.ok(s.device.logical > 0 && s.device.platform.length > 0, 'the device half is MEASURED on this host')
  assert.ok(s.ported.packages > 0, 'the ported half is PUBLISHED and measured on no host at all')
})

test('the receipt folds the SEALED half only — it must not move between machines', () => {
  // A receipt that included the device would differ on every host, which would make it useless as the port's
  // identity: two people verifying the same catalogue would disagree because their laptops differ. The device
  // carries deviceAddress for that job. Asserted by construction — the receipt cannot contain what it never saw.
  const s = driverState()
  assert.equal(s.receipt, driverState().receipt, 'same catalogue, same receipt')
  assert.notEqual(s.receipt, s.device.address, 'the port receipt and the machine address are different facts')
})

test('a bundle check refuses bytes that are not the bundle', () => {
  const bundle = driverPin('3.24.1', 'x86_64', 'a'.repeat(64))
  const r = driverCheck(new TextEncoder().encode('not the modloop'), bundle)
  assert.equal(r.ok, false, 'the whole point of pinning a published digest is that wrong bytes fail')
})

test('the boundary is declared as a boundary, not as an incapacity', () => {
  const s = driverState()
  // The refusal LIST is gone (the captain's call, 2026-09-01): it enumerated things os/runtime can actually do —
  // verify then run a host binary, and a spawned modprobe inserts a module — so naming them as limits dressed a
  // choice as a law of nature. What remains is the boundary this module sits at, which is a fact.
  assert.match(s.boundary, /src\/drivers/)
  assert.match(s.honest, /by choice, not by incapacity/)
})
