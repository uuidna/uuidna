// crypto-apps — Alpine apps that USE crypto, through ONE MCP door (uuidna_crypto).
// Not one tool per openssl/nginx/curl. CONTROL: an ordinary package is refused; nginx (so:libssl) is admitted.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, MCP_CATALOG } from '../../../mcp.js'
import { KEY_BITS, UUID_BITS, COINS, HEXBIT_BITS, GROVER_FLOOR_BITS, UUID_HEXBITS, HEXBIT_STATES } from '../../../hexbit/index.js'
import { NONCE_BYTES, SALT_BYTES, TAG_BYTES, ITER } from '../../../crypt.js'
import { BLOCK_BYTES } from '../../../chacha.js'
import { CAPACITY, FREE_BITS } from '../../../imprint.js'
import { MCP_CRYPTO_DOORS, type CryptoAppsPort, type CryptoAppLookup } from './index.js'
import { theoremByKey } from '../../../theorems/index.js'
import { CRYPTO_THEOREM } from '../apptheorem/index.js'

test('uuidna_crypto is ONE door — no per-app Alpine crypto tools', () => {
  assert.ok(MCP_CATALOG.some((t) => t.name === 'uuidna_crypto'))
  const perApp = MCP_CATALOG.filter((t) => /^uuidna_(openssl|libssl|libcrypto|gnutls)_/.test(t.name))
  assert.equal(perApp.length, 0, `no per-app crypto MCP tools; got ${perApp.map((t) => t.name).join(', ')}`)
})

test('callTool uuidna_crypto ports Alpine apps that use crypto — census + named widths', () => {
  const r = callTool('uuidna_crypto', {}) as CryptoAppsPort
  assert.equal(r.definition, 'mcp·uuidna_crypto·alpine-apps-using-crypto')
  assert.equal(r.wireDoors, 1)
  assert.deepEqual(r.doors, [...MCP_CRYPTO_DOORS])
  assert.ok(r.total > 50, `expected a real crypto-using census, got ${r.total}`)
  assert.ok(r.origins > 0 && r.origins <= r.total)
  assert.equal(r.shown, r.packages.length)
  assert.equal(r.shown, r.total)
  assert.equal(r.via.purpose + r.via.depends + r.via.both, r.total)
  assert.ok(typeof r.receipt === 'string' && r.receipt.includes('-'))
  const w = r.widths
  assert.equal(w.digestBits, KEY_BITS)
  assert.equal(w.hmacBits, KEY_BITS)
  assert.equal(w.keyBits, KEY_BITS)
  assert.equal(w.groverFloorBits, GROVER_FLOOR_BITS)
  assert.equal(w.nonceBits, NONCE_BYTES * HEXBIT_BITS * COINS)
  assert.equal(w.saltBits, SALT_BYTES * HEXBIT_BITS * COINS)
  assert.equal(w.tagBits, TAG_BYTES * HEXBIT_BITS * COINS)
  assert.equal(w.chachaBlockBits, BLOCK_BYTES * HEXBIT_BITS * COINS)
  assert.equal(w.maxOnionLayers, HEXBIT_STATES)
  assert.equal(w.imprintFreeBits, FREE_BITS)
  assert.equal(w.imprintCapacityBits, CAPACITY)
  assert.equal(w.pbkdf2Iter, ITER)
  assert.equal(r.pqc.label, 'PQC-adjacent')
  assert.equal(r.pqc.symmetricPresent, true)
  assert.equal(r.pqc.hybridDeployable, false)
  assert.ok(r.pqc.missing.includes('ML-KEM-768'))
  assert.equal(w.addressBirthdayBits, UUID_BITS / COINS)
  assert.equal(w.digestBirthdayBits, KEY_BITS / COINS)
  assert.equal(w.full.chunkQubits, HEXBIT_BITS * HEXBIT_BITS)
  assert.equal(w.shor.encoderFitsChunk, true)
  for (const p of r.packages) {
    assert.equal(p.id, 'uuidna/' + p.name)
    assert.equal(p.hexbits.length, UUID_HEXBITS)
    assert.ok(p.hexbits.every((h) => h >= 0 && h < 16))
    assert.ok(p.via === 'purpose' || p.via === 'depends' || p.via === 'both')
    assert.ok(p.theorem, `${p.name} must carry a theorem`)
    assert.ok(theoremByKey().has(p.theorem!), p.theorem!)
  }
  assert.equal(JSON.stringify(callTool('uuidna_crypto', {})), JSON.stringify(r), 'deterministic')
})

test('openssl and nginx use crypto; perl-moose does not', () => {
  const openssl = callTool('uuidna_crypto', { name: 'openssl' }) as CryptoAppLookup
  assert.equal(openssl.uses, true)
  assert.ok(openssl.package)
  assert.equal(openssl.package!.name, 'openssl')
  assert.ok(openssl.package!.theorem)
  assert.ok(theoremByKey().has(openssl.package!.theorem!))

  const nginx = callTool('uuidna_crypto', { name: 'nginx' }) as CryptoAppLookup
  assert.equal(nginx.uses, true)
  assert.equal(nginx.package!.name, 'nginx')
  assert.equal(nginx.package!.theorem, CRYPTO_THEOREM)

  const curl = callTool('uuidna_crypto', { name: 'curl' }) as CryptoAppLookup
  assert.equal(curl.uses, true, 'curl depends on libcurl which links libssl — one hop')

  const moose = callTool('uuidna_crypto', { name: 'perl-moose' }) as CryptoAppLookup
  assert.equal(moose.uses, false)
  assert.equal(moose.package, null)
})

test('an absent package is refused, not padded', () => {
  assert.throws(() => callTool('uuidna_crypto', { name: 'not-a-real-alpine-package-xyz' }), /no such package/)
})
