// quantum/os — the uuidnaOS provenance manifest, tested. It PINS an exact Alpine release and VERIFIES rootfs bytes with
// uuidna's OWN pure-TS SHA-256. It NEVER boots, runs, or ports Alpine — these tests only exercise integrity, not
// execution (there is nothing to execute). Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { alpineRelease, verifyAlpineRootfs } from '../os/alpine.js'
import { sha256 } from '../sha256.js'

const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

test('alpineRelease PINS an exact release — recomputable, and the filename follows Alpine convention', () => {
  const r = alpineRelease('3.21.2', 'x86_64', 'ABCDEF0123456789'.repeat(4))
  assert.equal(r.file, 'alpine-minirootfs-3.21.2-x86_64.tar.gz')
  assert.equal(r.rootfsSha256, 'abcdef0123456789'.repeat(4)) // normalised lower-case
  // deterministic: the same release folds to the same address and receipt for every observer
  const again = alpineRelease('3.21.2', 'x86_64', 'abcdef0123456789'.repeat(4))
  assert.equal(again.address, r.address)
  assert.equal(again.receipt, r.receipt)
  // a different version is a different content-address (change-sensitive)
  assert.notEqual(alpineRelease('3.21.3', 'x86_64', 'abcdef0123456789'.repeat(4)).address, r.address)
})

test('verifyAlpineRootfs — uuidna re-hashes YOUR bytes with its own SHA-256 (exact-copy proof, no host crypto)', () => {
  const bytes = new TextEncoder().encode('a stand-in for the Alpine minirootfs tarball')
  const trueDigest = hex(sha256(bytes))
  const pinned = alpineRelease('3.21.2', 'x86_64', trueDigest)
  const good = verifyAlpineRootfs(bytes, pinned)
  assert.equal(good.ok, true)
  assert.equal(good.computed, trueDigest)
  // tamper one byte → the exact-copy proof fails (integrity is change-sensitive)
  const tampered = new TextEncoder().encode('a stand-in for the Alpine minirootfs tarball!')
  assert.equal(verifyAlpineRootfs(tampered, pinned).ok, false)
})
