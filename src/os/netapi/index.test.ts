import { test } from 'node:test'
import assert from 'node:assert/strict'
import { netApi, netRead, netVerify, networkCensus } from './index.js'

test('the port is provenance and the census counts it', () => {
  const c = networkCensus()
  assert.equal(c.domain, 'network')
  assert.ok(c.packages > 0 && c.origins > 0)
})

test('a read that did not happen returns a NULL address, never an empty one', async () => {
  // THE CONTROL THAT MATTERS, and it needs no live host — an unroutable name fails the same way on a train and
  // in CI. Returning '' for unreachable bytes would address the empty string and hand back a receipt that looks
  // exactly like a successful read: the green-over-absent shape, wearing a content-address.
  const r = await netRead('https://this-host-does-not-exist.invalid/x')
  assert.equal(r.reached, false)
  assert.equal(r.address, null, 'an unreached URL must have NO address — a receipt for bytes that never arrived is a lie')
  assert.equal(r.body, null)
  assert.equal(r.digest, null)
})

test('verify refuses when the read did not happen', async () => {
  const v = await netVerify('https://this-host-does-not-exist.invalid/x', '00000000-0000-8000-8000-000000000000')
  assert.equal(v.ok, false, 'unreachable must never verify — silence is not agreement')
})

test('the API declares the boundary it sits at', () => {
  const a = netApi()
  assert.match(a.boundary, /src\/os/, 'a non-deterministic reach must declare the boundary it sits at')
  assert.match(a.honest, /reached:false and a null address/)
})
