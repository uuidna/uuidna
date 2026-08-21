// crypto-primitives — THE STANDARDS' OWN VECTORS, one test per primitive, every vector kept as DATA. Folded from
// kat.test.ts + pq.test.ts (33 declarations → 7) by table
// a published vector proves CONFORMANCE, so each vector below is still asserted — it simply no longer needs its own
// test declaration. Sources: FIPS 180-4, RFC 4231, RFC 8018, RFC 8439. These carry no PBKDF2 work factor (the KAT
// counts are the standards' own c=1..4096), so this whole file is milliseconds — it parallelises against the two
// heavy crypto files as its own process. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sha256, hmacSha256, pbkdf2Sha256, chachaBlock, chacha20, poly1305, aeadEncrypt, aeadDecrypt,
  encrypt, cryptoAddress, toUuid, type Sealed } from '../index.js'
import { hex } from './api.js'

const toh = hex
const hx = (h: string): Uint8Array => new Uint8Array((h.match(/../g) || []).map((x) => parseInt(x, 16)))
const en = (s: string): Uint8Array => new TextEncoder().encode(s)
/** assert a table of [label, computed, expected-hex] — the failure names the exact vector that moved */
const vectors = (table: [string, Uint8Array, string][]): void => {
  const failures: string[] = []
  for (const [label, got, want] of table) if (toh(got) !== want) failures.push(`${label}: got ${toh(got)}, want ${want}`)
  assert.deepEqual(failures, [])
}

test('SHA-256 conforms to its published vectors (FIPS 180-4 and the widely-published set)', () => {
  vectors([
    ['"abc"', sha256(en('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'],
    ['"" (empty)', sha256(en('')), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
    ['"a"', sha256(en('a')), 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'],
    ['448-bit multi-block', sha256(en('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq')), '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1'],
    ['896-bit multi-block', sha256(en('abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu')), 'cf5b16a778af8380036ce59e7b0492370b249b11e8f07a51afac45037afee9d1'],
    ['quick-brown-fox', sha256(en('The quick brown fox jumps over the lazy dog')), 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592'],
    ['quick-brown-fox.', sha256(en('The quick brown fox jumps over the lazy dog.')), 'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c'],
    ['"hello"', sha256(en('hello')), '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'],
    ['55-byte block boundary', sha256(en('a'.repeat(55))), '9f4390f8d30c2dd92ec9f095b65e2b9ae9b0a925a5258e241c9f1e910f734318'],
    ['56-byte forces 2nd block', sha256(en('a'.repeat(56))), 'b35439a4ac6f0948b6d6f9e3c6af0f5f590ce20f1bde7090ef7970686ec6738a'],
    ['64-byte block spill', sha256(en('a'.repeat(64))), 'ffe054fe7ae0cb6dc65c3af9b61d5209f439851db43d0ba5997337df154668eb'],
  ])
})

test('HMAC-SHA256 conforms to RFC 4231 — all seven cases, truncation included', () => {
  vectors([
    ['case 1', hmacSha256(new Uint8Array(20).fill(0x0b), en('Hi There')), 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7'],
    ['case 2 (Jefe)', hmacSha256(en('Jefe'), en('what do ya want for nothing?')), '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843'],
    ['case 3', hmacSha256(new Uint8Array(20).fill(0xaa), new Uint8Array(50).fill(0xdd)), '773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe'],
    ['case 4', hmacSha256(hx('0102030405060708090a0b0c0d0e0f10111213141516171819'), new Uint8Array(50).fill(0xcd)), '82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b'],
    // case 5 is HMAC-SHA-256-*128*: the standard's own truncation case, asserted on the first 16 bytes. uuidna's
    // hmacSha256 returns the full 32 and never truncates for you — a caller that needs RFC-5 output slices it, as here.
    ['case 5 (truncated to 128 bits)', hmacSha256(new Uint8Array(20).fill(0x0c), en('Test With Truncation')).slice(0, 16), 'a3b6167473100ee06e0c796c2955552b'],
    ['case 6 (key > block)', hmacSha256(new Uint8Array(131).fill(0xaa), en('Test Using Larger Than Block-Size Key - Hash Key First')), '60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54'],
    // case 7 — key AND data both larger than the block: the key is hashed first, and the 152-byte message spans blocks
    ['case 7 (key and data > block)', hmacSha256(new Uint8Array(131).fill(0xaa), en('This is a test using a larger than block-size key and a larger than block-size data. The key needs to be hashed before being used by the HMAC algorithm.')), '9b09ffa71b942fcb27635fbcd5b0e944bfdc63644f0713938a7f51535c3a35e2'],
  ])
})

test('PBKDF2-HMAC-SHA256 conforms to RFC 8018 and is prefix-consistent across dkLen', () => {
  vectors([
    ['c=1 dk=32', pbkdf2Sha256(en('password'), en('salt'), 1, 32), '120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b'],
    ['c=2 dk=32', pbkdf2Sha256(en('password'), en('salt'), 2, 32), 'ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43'],
    ['c=4096 dk=32', pbkdf2Sha256(en('password'), en('salt'), 4096, 32), 'c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a'],
    ['c=4096 dk=40 multi-block', pbkdf2Sha256(en('passwordPASSWORDpassword'), en('saltSALTsaltSALTsaltSALTsaltSALTsalt'), 4096, 40), '348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c4e2a1fb8dd53e1c635518c7dac47e9'],
  ])
  assert.equal(toh(pbkdf2Sha256(en('password'), en('salt'), 1, 16)), toh(pbkdf2Sha256(en('password'), en('salt'), 1, 32)).slice(0, 32))
  assert.equal(pbkdf2Sha256(en('p'), en('salt'), 1, 32).length, 32)  // 256-bit derived key — Grover only halves it
})

test('ChaCha20 conforms to RFC 8439, blocks at 64 bytes, and is its own inverse', () => {
  const k32 = hx('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), n242 = hx('000000000000004a00000000')
  vectors([
    ['§2.4.2 keystream[0:16]', chacha20(k32, 1, n242, en("Ladies and Gentlemen of the class of '99: If I could offer you only one tip for the future, sunscreen would be it.")).slice(0, 16), '6e2e359a2568f98041ba0728dd0d6981'],
    ['A.1 vector 1 (all-zero)[0:16]', chachaBlock(new Uint8Array(32), 0, new Uint8Array(12)).slice(0, 16), '76b8e0ada0f13d90405d6ae55386bd28'],
  ])
  assert.equal(chachaBlock(k32, 1, n242).length, 64)
  assert.equal(toh(chacha20(k32, 1, n242, chacha20(k32, 1, n242, en('beat to windward')))), toh(en('beat to windward')))
})

test('Poly1305 conforms to RFC 8439', () => {
  vectors([
    ['§2.5.2 tag', poly1305(en('Cryptographic Forum Research Group'), hx('85d6be7857556d337f4452fe42d506a80103808afb0db2fd4abff6af4149f51b')), 'a8061dc1305136c6c22b8baf0c0127a9'],
    ['all-zero key+msg → zero tag', poly1305(new Uint8Array(64), new Uint8Array(32)), '00000000000000000000000000000000'],
    ['A.3 #1 (r=0 → s)', poly1305(en('Any submission to the IETF intended by the Contributor for publication as all or part of an IETF Internet-Draft or RFC and any statement made within the context of an IETF activity is considered an "IETF Contribution". Such statements include oral statements in IETF sessions, as well as written and electronic communications made at any time or place, which are addressed to'), hx('0000000000000000000000000000000036e5f6b5c5e06070f0efca96227a863e')), '36e5f6b5c5e06070f0efca96227a863e'],
  ])
})

test('ChaCha20-Poly1305 AEAD conforms to RFC 8439 §2.8.2 and authenticates what it carries', () => {
  const key = hx('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f')
  const nonce = hx('070000004041424344454647'), aad = hx('50515253c0c1c2c3c4c5c6c7')
  const pt = hx('4c616469657320616e642047656e746c656d656e206f662074686520636c617373206f66202739393a204966204920636f756c64206f6666657220796f75206f6e6c79206f6e652074697020666f7220746865206675747572652c2073756e73637265656e20776f756c642062652069742e')
  const sealed = aeadEncrypt(key, nonce, pt, aad)
  assert.equal(toh(sealed.ct).slice(0, 32), 'd31a8d34648e60db7b86afbc53ef7ec2')  // §2.8.2 ciphertext[0:16]
  assert.equal(toh(sealed.tag), '1ae10b594f09e26a7e902ecbd0600691')             // §2.8.2 tag
  // the authentication properties (§2.8): round-trip, a tampered tag, tampered associated data, an empty plaintext
  const k = new Uint8Array(32).fill(7), n = new Uint8Array(12).fill(3), p = en('beat to windward')
  const ok = aeadEncrypt(k, n, p)
  assert.equal(toh(aeadDecrypt(k, n, ok.ct, ok.tag)), toh(p))
  const bad = aeadEncrypt(k, n, en('x')); bad.tag[0] ^= 1
  assert.throws(() => aeadDecrypt(k, n, bad.ct, bad.tag))
  const withAad = aeadEncrypt(k, n, en('x'), en('aad'))
  assert.throws(() => aeadDecrypt(k, n, withAad.ct, withAad.tag, en('AAD')))
  const empty = aeadEncrypt(k, n, new Uint8Array(0))
  assert.equal(aeadDecrypt(k, n, empty.ct, empty.tag).length, 0)
})

test('the address layer is SHA-256-anchored, and the envelope is symmetric-only — nothing for Shor to break', () => {
  const a = cryptoAddress('abc')
  assert.match(a, /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)  // v8 version + RFC variant
  const h = toh(sha256(en('uuidna:abc'))).slice(0, 32), bytes = a.replace(/-/g, '')
  assert.equal(bytes.slice(0, 12), h.slice(0, 12))    // bytes 0–5 are the hash, untouched
  assert.equal(bytes.slice(14, 16), h.slice(14, 16))  // byte 7 is the hash (byte 6 holds the version nibble)
  assert.equal(bytes.slice(18), h.slice(18))          // bytes 9–15 are the hash (byte 8 holds the variant)
  assert.equal(cryptoAddress('x'), cryptoAddress('x'))
  assert.notEqual(cryptoAddress('a'), cryptoAddress('b'))
  assert.notEqual(cryptoAddress('x'), toUuid('x'))    // the SHA-256 address is not the fast non-crypto FNV address
  const s: Sealed = encrypt('m', 'p')                 // the one work-factor derivation in this file
  assert.equal(s.alg, 'ChaCha20-Poly1305')
  assert.equal(s.kdf, 'PBKDF2-SHA256')
  const o = s as unknown as Record<string, unknown>
  for (const k of ['publicKey', 'signature', 'rsa', 'ecdh', 'privateKey']) assert.ok(!(k in o), `no ${k} on the envelope`)
})
