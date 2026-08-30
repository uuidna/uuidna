// hkdf — RFC 5869 HKDF-SHA256; cross-checked against node:crypto.hkdfSync (same bytes, pure-TS path).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hkdfSync } from 'node:crypto'
import { hkdfSha256, hkdfExtract, hkdfExpand } from './index.js'

const hx = (h: string): Uint8Array => new Uint8Array((h.match(/../g) || []).map((x) => parseInt(x, 16)))
const hex = (u: Uint8Array): string => [...u].map((b) => b.toString(16).padStart(2, '0')).join('')

test('HKDF-SHA256 matches node:crypto.hkdfSync — case 1 shape', () => {
  const ikm = new Uint8Array(22).fill(0x0b)
  const salt = hx('000102030405060708090a0b0c0d0e0f')
  const info = hx('f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff000112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f')
  const want = new Uint8Array(hkdfSync('sha256', ikm, salt, info, 42))
  assert.deepEqual([...hkdfSha256(ikm, salt, info, 42)], [...want])
})

test('HKDF-SHA256 matches node:crypto.hkdfSync — case 2 shape', () => {
  const ikm = hx('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f')
  const salt = hx('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f')
  const info = hx('b0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecf')
  const want = new Uint8Array(hkdfSync('sha256', ikm, salt, info, 82))
  assert.deepEqual([...hkdfSha256(ikm, salt, info, 82)], [...want])
})

test('extract and expand round-trip matches one-shot', () => {
  const ikm = hx('0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b')
  const salt = hx('000102030405060708090a0b0c')
  const info = new TextEncoder().encode('uuidna-test')
  const a = hkdfSha256(ikm, salt, info, 32)
  const prk = hkdfExtract(salt, ikm)
  const b = hkdfExpand(prk, info, 32)
  assert.deepEqual([...a], [...b])
})
