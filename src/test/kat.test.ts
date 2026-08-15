// KAT — the crypto Known-Answer Tests. Restored from ceccec/millennium-solutions (scripts/discover.ts), the
// upstream where these vectors were authored; uuidna's crypto comments cited them but the test never shipped.
// Every case asserts a pure-TS primitive against a STANDARD's own published vector (FIPS 180-4 / RFC 2104 /
// RFC 4231 / RFC 8018 / RFC 8439) — the independent evidence that makes "KAT-verified" a true claim, not prose.
// A round-trip proves invertibility; only a published vector proves CONFORMANCE. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sha256, hmacSha256, pbkdf2Sha256, chachaBlock, chacha20, poly1305, aeadEncrypt, aeadDecrypt } from '../index.js'
import { hex } from './api.js'

const toh = hex
const hx = (h: string): Uint8Array => new Uint8Array((h.match(/../g) || []).map((x) => parseInt(x, 16)))
const en = (s: string): Uint8Array => new TextEncoder().encode(s)
const kat = (name: string, got: Uint8Array, want: string) => test(name, () => assert.equal(toh(got), want))

// ── SHA-256 (FIPS 180-4 + widely-published vectors) ───────────────────────────────────────────────────────────
kat('sha256 "abc" (FIPS 180-4)', sha256(en('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
kat('sha256 "" (empty)', sha256(en('')), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
kat('sha256 "a"', sha256(en('a')), 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb')
kat('sha256 448-bit multi-block', sha256(en('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq')), '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1')
kat('sha256 896-bit multi-block', sha256(en('abcdefghbcdefghicdefghijdefghijkefghijklfghijklmghijklmnhijklmnoijklmnopjklmnopqklmnopqrlmnopqrsmnopqrstnopqrstu')), 'cf5b16a778af8380036ce59e7b0492370b249b11e8f07a51afac45037afee9d1')
kat('sha256 quick-brown-fox', sha256(en('The quick brown fox jumps over the lazy dog')), 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592')
kat('sha256 quick-brown-fox.', sha256(en('The quick brown fox jumps over the lazy dog.')), 'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c')
kat('sha256 "hello"', sha256(en('hello')), '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
kat('sha256 55-byte block boundary', sha256(en('a'.repeat(55))), '9f4390f8d30c2dd92ec9f095b65e2b9ae9b0a925a5258e241c9f1e910f734318')
kat('sha256 56-byte forces 2nd block', sha256(en('a'.repeat(56))), 'b35439a4ac6f0948b6d6f9e3c6af0f5f590ce20f1bde7090ef7970686ec6738a')
kat('sha256 64-byte block spill', sha256(en('a'.repeat(64))), 'ffe054fe7ae0cb6dc65c3af9b61d5209f439851db43d0ba5997337df154668eb')

// ── HMAC-SHA256 (RFC 4231) ────────────────────────────────────────────────────────────────────────────────────
kat('hmac RFC 4231 case 1', hmacSha256(new Uint8Array(20).fill(0x0b), en('Hi There')), 'b0344c61d8db38535ca8afceaf0bf12b881dc200c9833da726e9376c2e32cff7')
kat('hmac RFC 4231 case 2 (Jefe)', hmacSha256(en('Jefe'), en('what do ya want for nothing?')), '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843')
kat('hmac RFC 4231 case 3', hmacSha256(new Uint8Array(20).fill(0xaa), new Uint8Array(50).fill(0xdd)), '773ea91e36800e46854db8ebd09181a72959098b3ef8c122d9635514ced565fe')
kat('hmac RFC 4231 case 4', hmacSha256(hx('0102030405060708090a0b0c0d0e0f10111213141516171819'), new Uint8Array(50).fill(0xcd)), '82558a389a443c0ea4cc819899f2083a85f0faa3e578f8077a2e3ff46729665b')
kat('hmac RFC 4231 case 6 (key > block)', hmacSha256(new Uint8Array(131).fill(0xaa), en('Test Using Larger Than Block-Size Key - Hash Key First')), '60e431591ee0b67f0d8a26aacbf5b77f8e0bc6213728c5140546040f0ee37f54')

// ── PBKDF2-HMAC-SHA256 (RFC 8018 / published vectors) ─────────────────────────────────────────────────────────
kat('pbkdf2 c=1 dk=32', pbkdf2Sha256(en('password'), en('salt'), 1, 32), '120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b')
kat('pbkdf2 c=2 dk=32', pbkdf2Sha256(en('password'), en('salt'), 2, 32), 'ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43')
kat('pbkdf2 c=4096 dk=32', pbkdf2Sha256(en('password'), en('salt'), 4096, 32), 'c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a')
kat('pbkdf2 c=4096 dk=40 multi-block', pbkdf2Sha256(en('passwordPASSWORDpassword'), en('saltSALTsaltSALTsaltSALTsaltSALTsalt'), 4096, 40), '348c89dbcbd32b2f32d814b8116e84cf2b17347ebc1800181c4e2a1fb8dd53e1c635518c7dac47e9')
test('pbkdf2 prefix-consistent across dkLen', () => assert.equal(toh(pbkdf2Sha256(en('password'), en('salt'), 1, 16)), toh(pbkdf2Sha256(en('password'), en('salt'), 1, 32)).slice(0, 32)))

// ── ChaCha20 (RFC 8439) ───────────────────────────────────────────────────────────────────────────────────────
const k32 = hx('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'), n242 = hx('000000000000004a00000000')
kat('chacha20 §2.4.2 keystream[0:16]', chacha20(k32, 1, n242, en("Ladies and Gentlemen of the class of '99: If I could offer you only one tip for the future, sunscreen would be it.")).slice(0, 16), '6e2e359a2568f98041ba0728dd0d6981')
kat('chachaBlock A.1 vector 1 (all-zero)[0:16]', chachaBlock(new Uint8Array(32), 0, new Uint8Array(12)).slice(0, 16), '76b8e0ada0f13d90405d6ae55386bd28')
test('chachaBlock is 64 bytes', () => assert.equal(chachaBlock(k32, 1, n242).length, 64))
test('chacha20 is its own inverse', () => assert.equal(toh(chacha20(k32, 1, n242, chacha20(k32, 1, n242, en('beat to windward')))), toh(en('beat to windward'))))

// ── Poly1305 (RFC 8439) ───────────────────────────────────────────────────────────────────────────────────────
const pk = hx('85d6be7857556d337f4452fe42d506a80103808afb0db2fd4abff6af4149f51b')
kat('poly1305 §2.5.2 tag', poly1305(en('Cryptographic Forum Research Group'), pk), 'a8061dc1305136c6c22b8baf0c0127a9')
kat('poly1305 all-zero key+msg → zero tag', poly1305(new Uint8Array(64), new Uint8Array(32)), '00000000000000000000000000000000')
kat('poly1305 A.3 #1 (r=0 → s)', poly1305(en('Any submission to the IETF intended by the Contributor for publication as all or part of an IETF Internet-Draft or RFC and any statement made within the context of an IETF activity is considered an "IETF Contribution". Such statements include oral statements in IETF sessions, as well as written and electronic communications made at any time or place, which are addressed to'), hx('0000000000000000000000000000000036e5f6b5c5e06070f0efca96227a863e')), '36e5f6b5c5e06070f0efca96227a863e')

// ── ChaCha20-Poly1305 AEAD (RFC 8439 §2.8.2) ──────────────────────────────────────────────────────────────────
const aeadKey = hx('808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9f')
const aeadNonce = hx('070000004041424344454647')
const aeadAad = hx('50515253c0c1c2c3c4c5c6c7')
const aeadPt = hx('4c616469657320616e642047656e746c656d656e206f662074686520636c617373206f66202739393a204966204920636f756c64206f6666657220796f75206f6e6c79206f6e652074697020666f7220746865206675747572652c2073756e73637265656e20776f756c642062652069742e')
test('aead §2.8.2 ciphertext[0:16]', () => assert.equal(toh(aeadEncrypt(aeadKey, aeadNonce, aeadPt, aeadAad).ct).slice(0, 32), 'd31a8d34648e60db7b86afbc53ef7ec2'))
kat('aead §2.8.2 tag', aeadEncrypt(aeadKey, aeadNonce, aeadPt, aeadAad).tag, '1ae10b594f09e26a7e902ecbd0600691')

// ── AEAD authentication properties (RFC 8439 §2.8) ────────────────────────────────────────────────────────────
test('aead round-trips', () => {
  const k = new Uint8Array(32).fill(7), n = new Uint8Array(12).fill(3), p = en('beat to windward')
  const { ct, tag } = aeadEncrypt(k, n, p)
  assert.equal(toh(aeadDecrypt(k, n, ct, tag)), toh(p))
})
test('aead rejects a tampered tag', () => {
  const k = new Uint8Array(32).fill(7), n = new Uint8Array(12).fill(3)
  const { ct, tag } = aeadEncrypt(k, n, en('x')); tag[0] ^= 1
  assert.throws(() => aeadDecrypt(k, n, ct, tag))
})
test('aead rejects tampered associated data', () => {
  const k = new Uint8Array(32).fill(7), n = new Uint8Array(12).fill(3)
  const { ct, tag } = aeadEncrypt(k, n, en('x'), en('aad'))
  assert.throws(() => aeadDecrypt(k, n, ct, tag, en('AAD')))
})
test('aead round-trips an empty plaintext', () => {
  const k = new Uint8Array(32).fill(7), n = new Uint8Array(12).fill(3)
  const { ct, tag } = aeadEncrypt(k, n, new Uint8Array(0))
  assert.equal(aeadDecrypt(k, n, ct, tag).length, 0)
})
