// quantum/drivers — the uuidnaOS driver-bundle provenance manifest, tested. It PINS an exact Alpine netboot bundle
// (kernel + modloop = the drivers) and VERIFIES the bytes with uuidna's OWN pure-TS SHA-256. It NEVER loads, inserts,
// or runs a module — these tests exercise integrity only (there is nothing to execute). Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { driverBundle, verifyDriverBundle } from '../drivers/driver.js'
import { sha256 } from '../../sha256.js'

const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

test('driverBundle PINS an exact netboot bundle — recomputable, Alpine filename convention', () => {
  const d = driverBundle('3.24.1', 'x86_64', 'ABC0'.repeat(16))
  assert.equal(d.flavor, 'alpine-netboot')
  assert.equal(d.file, 'alpine-netboot-3.24.1-x86_64.tar.gz')
  assert.equal(d.sha256, 'abc0'.repeat(16)) // normalised lower-case
  const again = driverBundle('3.24.1', 'x86_64', 'abc0'.repeat(16))
  assert.equal(again.address, d.address)
  assert.equal(again.receipt, d.receipt)
  assert.notEqual(driverBundle('3.24.2', 'x86_64', 'abc0'.repeat(16)).address, d.address)
})

test('verifyDriverBundle — uuidna re-hashes YOUR bytes with its own SHA-256 (exact-copy proof, no host crypto)', () => {
  const bytes = new TextEncoder().encode('a stand-in for the Alpine netboot modloop bundle')
  const trueDigest = hex(sha256(bytes))
  const pinned = driverBundle('3.24.1', 'x86_64', trueDigest)
  const good = verifyDriverBundle(bytes, pinned)
  assert.equal(good.ok, true)
  assert.equal(good.computed, trueDigest)
  const tampered = new TextEncoder().encode('a stand-in for the Alpine netboot modloop bundle!')
  assert.equal(verifyDriverBundle(tampered, pinned).ok, false)
})
