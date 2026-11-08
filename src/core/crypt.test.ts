import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as node from 'node:crypto'
import { aeadOpen, aeadSeal, chacha20, ed25519PublicKey, ed25519Sign, ed25519Verify, fromHex, hexOf, hkdf, hmac, md5, pbkdf2Sha256, randomBytes, sha256, sha512, x25519, x25519PublicKey } from './crypt.js'

const b64 = (b: Uint8Array) => Buffer.from(b).toString('base64url')
const sizes = [0, 1, 55, 56, 63, 64, 111, 112, 127, 128, 1000]

test('known answers (FIPS 180-4, RFC 7748, RFC 8032)', () => {
  assert.equal(hexOf(sha256('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  assert.equal(hexOf(sha512('abc')), 'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f')
  assert.equal(hexOf(x25519(fromHex('a546e36bf0527c9d3b16154b82465edd62144c0ac1fc5a18506a2244ba449ac4'), fromHex('e6db6867583030db3594c1a424b15f7c726624ec26b3353b10a903a6d0ab1c4c'))), 'c3da55379de9c6908e94ea4df28d084f32eccf03491c71f754b4075577a28552')
  const seed = fromHex('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60')
  assert.equal(hexOf(ed25519PublicKey(seed)), 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a')
  assert.equal(hexOf(ed25519Sign(seed, new Uint8Array())), 'e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b')
})

test('sha256, sha512, hmac, hkdf match node:crypto', () => {
  for (const n of sizes) {
    const m = randomBytes(n), k = randomBytes(n % 200)
    assert.equal(hexOf(sha256(m)), node.createHash('sha256').update(m).digest('hex'))
    assert.equal(hexOf(sha512(m)), node.createHash('sha512').update(m).digest('hex'))
    assert.equal(hexOf(md5(m)), node.createHash('md5').update(m).digest('hex'))
    assert.equal(hexOf(hmac('sha256', k, m)), node.createHmac('sha256', k).update(m).digest('hex'))
    assert.equal(hexOf(hmac('sha512', k, m)), node.createHmac('sha512', k).update(m).digest('hex'))
    assert.equal(hexOf(hkdf('sha256', m, k, 'info', 42)), Buffer.from(node.hkdfSync('sha256', m, k, 'info', 42)).toString('hex'))
  }
})

test('pbkdf2-sha256 matches node:crypto, including Payload 600000-iteration hashes', () => {
  for (const [iterations, length] of [[1, 32], [2, 32], [4096, 32], [1000, 64], [3, 20], [25000, 512]] as const) {
    const p = randomBytes(17), s = randomBytes(32)
    assert.equal(hexOf(pbkdf2Sha256(p, s, iterations, length)), node.pbkdf2Sync(p, s, iterations, length, 'sha256').toString('hex'))
  }
  const long = randomBytes(100)
  assert.equal(hexOf(pbkdf2Sha256(long, 'salt', 10, 32)), node.pbkdf2Sync(long, 'salt', 10, 32, 'sha256').toString('hex'))
  assert.equal(hexOf(pbkdf2Sha256('password', 'salt', 600000, 32)), node.pbkdf2Sync('password', 'salt', 600000, 32, 'sha256').toString('hex'))
})

test('chacha20-poly1305 matches node:crypto and rejects tampering', () => {
  for (const n of sizes) {
    const key = randomBytes(32), nonce = randomBytes(12), m = randomBytes(n), aad = randomBytes(n % 37)
    const c = node.createCipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 })
    c.setAAD(aad, { plaintextLength: n })
    const reference = Buffer.concat([c.update(m), c.final(), c.getAuthTag()])
    const sealed = aeadSeal(key, nonce, m, aad)
    assert.equal(hexOf(sealed), reference.toString('hex'))
    assert.deepEqual(aeadOpen(key, nonce, sealed, aad), m)
    const flipped = sealed.slice()
    flipped[0]! ^= 1
    assert.equal(aeadOpen(key, nonce, flipped, aad), null)
  }
  assert.equal(chacha20(new Uint8Array(32), new Uint8Array(12), 0, new Uint8Array(0)).length, 0)
})

test('x25519 matches node:crypto', () => {
  for (let i = 0; i < 4; i++) {
    const a = randomBytes(32), b = randomBytes(32)
    const A = x25519PublicKey(a), B = x25519PublicKey(b)
    const nodeA = node.createPrivateKey({ key: { kty: 'OKP', crv: 'X25519', d: b64(a), x: b64(A) }, format: 'jwk' })
    const nodeB = node.createPublicKey({ key: { kty: 'OKP', crv: 'X25519', x: b64(B) }, format: 'jwk' })
    assert.equal(hexOf(x25519(a, B)), node.diffieHellman({ privateKey: nodeA, publicKey: nodeB }).toString('hex'))
    assert.equal(hexOf(x25519(a, B)), hexOf(x25519(b, A)))
  }
})

test('ed25519 matches node:crypto and rejects forgeries', () => {
  for (const n of [0, 1, 64, 300]) {
    const seed = randomBytes(32), m = randomBytes(n)
    const pub = ed25519PublicKey(seed)
    const nodeKey = node.createPrivateKey({ key: { kty: 'OKP', crv: 'Ed25519', d: b64(seed), x: b64(pub) }, format: 'jwk' })
    const sig = ed25519Sign(seed, m)
    assert.equal(hexOf(sig), node.sign(null, m, nodeKey).toString('hex'))
    assert.ok(ed25519Verify(pub, m, sig))
    assert.ok(node.verify(null, m, node.createPublicKey(nodeKey), sig))
    const forged = sig.slice()
    forged[5]! ^= 1
    assert.equal(ed25519Verify(pub, m, forged), false)
    assert.equal(ed25519Verify(pub, concat1(m), sig), false)
  }
})

const concat1 = (m: Uint8Array) => Uint8Array.of(...m, 1)
