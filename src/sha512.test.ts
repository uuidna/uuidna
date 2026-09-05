import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sha512, sha384, sha224, hex, K512, IV512, IV384, IV224 } from './sha512.js'
import { sha256, IV256 } from './sha256.js'

const e = (s: string): Uint8Array => new TextEncoder().encode(s)

// THE DERIVATION IS CHECKED AGAINST THE PUBLISHED TABLE. Deriving the constants removes the risk of a
// mistyped digit and introduces a different one: a derivation can be wrong in the same way for every entry.
// So the first and last of each vector are checked against FIPS 180-4's own printed values.
test('the derived round constants and initial values equal the published ones', () => {
  assert.equal(K512[0]!.toString(16), '428a2f98d728ae22', 'K512[0] is the cube root of 2')
  assert.equal(K512[79]!.toString(16), '6c44198c4a475817', 'K512[79] is the cube root of the eightieth prime')
  assert.equal(K512.length, 80)
  assert.equal(IV512[0]!.toString(16), '6a09e667f3bcc908')
  assert.equal(IV512[7]!.toString(16), '5be0cd19137e2179')
  assert.equal(IV384[0]!.toString(16), 'cbbb9d5dc1059ed8')
  assert.equal(IV384[7]!.toString(16), '47b5481dbefa4fa4')
  assert.equal(IV224[0]!.toString(16), 'c1059ed8', 'SHA-224 reads the SECOND 32 bits of the same fractions')
  assert.equal(IV224[7]!.toString(16), 'befa4fa4')
  // and the two halves of the SAME 64 bits: SHA-384's high word and SHA-224's low word come from one number
  assert.equal(Number(IV384[0]! >> 32n).toString(16), 'cbbb9d5d')
  assert.equal(Number(IV384[0]! & 0xffffffffn).toString(16), IV224[0]!.toString(16))
})

test('SHA-512 matches the standard test vectors, including the million-character one', () => {
  assert.equal(hex(sha512(e('abc'))),
    'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f')
  assert.equal(hex(sha512(e(''))),
    'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e')
  assert.equal(hex(sha512(e('abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu'))),
    '8e959b75dae313da8cf4f72814fc143f8f7779c6eb9f7fa17299aeadb6889018501d289e4900f7e4331b99dec4b5433ac7d329eeb6dd26545e96e55b874be909')
  // the multi-block boundary case: exactly one block of padding overflow
  assert.equal(hex(sha512(e('a'.repeat(1_000_000)))).slice(0, 32), 'e718483d0ce769644e2e42c7bc15b463')
})

test('SHA-384 and SHA-224 match their vectors, and are truncations of the right compression', () => {
  assert.equal(hex(sha384(e('abc'))),
    'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7')
  assert.equal(hex(sha384(e(''))),
    '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b')
  assert.equal(hex(sha224(e('abc'))), '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7')
  assert.equal(hex(sha224(e(''))), 'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f')
  assert.equal(sha384(e('x')).length, 48)
  assert.equal(sha224(e('x')).length, 28)
})

test('the iv parameter did not move SHA-256: every existing caller walks the identical path', () => {
  assert.equal(hex(sha256(e('abc'))), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  assert.deepEqual(sha256(e('anything')), sha256(e('anything'), IV256), 'the default must BE the SHA-256 vector')
  assert.notDeepEqual(sha256(e('abc')), sha256(e('abc'), IV224), 'and a different vector must give a different hash')
})

test('SHA-224 is NOT a truncated SHA-256 — the initial value is what differs', () => {
  assert.notEqual(hex(sha224(e('abc'))), hex(sha256(e('abc'))).slice(0, 56),
    'truncating sha256 would be the classic wrong implementation; this must not equal it')
})
