// packages — EACH ALPINE PACKAGE BECOMES uuidna/<package>. Verifies the minting is a proper provenance identity:
// deterministic, injective (distinct release ⇒ distinct address), and that every package in an index gets a uuidna/
// <name> id. Pure and offline — mints fixed sample records, no network — so the test is a diamond, not a live probe.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaPackage } from '../os/packages.js'
import { merkleGravity } from '../index.js'

// a fixed sample of the shape Alpine's APKINDEX yields (name, version, published C: checksum)
const SAMPLE = [
  { name: 'busybox', version: '1.37.0-r12', checksum: 'Q1AAA=' },
  { name: 'curl', version: '8.21.0-r0', checksum: 'Q1BBB=' },
  { name: 'openssl', version: '3.5.0-r0', checksum: 'Q1CCC=' },
  { name: 'musl', version: '1.2.5-r10', checksum: 'Q1DDD=' },
].map((p) => ({ ...p, arch: 'x86_64', repo: 'main', branch: 'latest-stable' }))

test('each Alpine package becomes uuidna/<name> — a deterministic, injective provenance identity', () => {
  const minted = SAMPLE.map((p) => uuidnaPackage(p))

  // 1) INFUSED — every package gets a uuidna/<name> id and a 128-bit content-address
  for (const [i, m] of minted.entries()) {
    assert.equal(m.id, 'uuidna/' + SAMPLE[i].name, 'the id is uuidna/<name>')
    assert.match(m.address, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 'a 128-bit particle')
    assert.equal(m.checksum, SAMPLE[i].checksum, 'carries the PUBLISHED checksum, never faked')
  }
  assert.equal(new Set(minted.map((m) => m.id)).size, SAMPLE.length, 'all infused — one id per package')

  // 2) DETERMINISTIC — the same release mints the same address for everyone
  assert.equal(uuidnaPackage(SAMPLE[0]).address, minted[0].address)

  // 3) INJECTIVE — distinct addresses across packages, and a changed version/checksum MOVES the address
  assert.equal(new Set(minted.map((m) => m.address)).size, SAMPLE.length, 'distinct package ⇒ distinct address')
  assert.notEqual(uuidnaPackage({ ...SAMPLE[0], version: '1.37.0-r13' }).address, minted[0].address, 'a version bump moves the identity (updates track upstream)')
  assert.notEqual(uuidnaPackage({ ...SAMPLE[0], checksum: 'Q1ZZZ=' }).address, minted[0].address, 'a changed checksum moves the identity (a tampered package is a different id)')

  // 4) the catalog FOLD — order-invariant, and any change to the set moves the receipt
  const receipt = merkleGravity(minted.map((m) => m.address))
  assert.equal(merkleGravity([...minted].reverse().map((m) => m.address)), receipt, 'the catalog receipt is order-invariant')
  assert.notEqual(merkleGravity(minted.slice(1).map((m) => m.address)), receipt, 'dropping a package moves the catalog receipt')
})
