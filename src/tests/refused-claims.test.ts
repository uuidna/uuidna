// refused-claims — CLAIM refusals in lean/leads.json that constructors can fail.
// Hosts are refused-hosts.ts. These hold the rest without wording hunts: widths, primitives, keys.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS, SAFE_HEXBITS,
} from '../hexbit/index.js'
import { occupancyTapeOf } from '../crypt.js'
import { theoremByKey } from '../theorems/index.js'
import { gridGaps } from '../grid.js'
import { adjudicate } from '../adjudicate.js'
import { toUuid } from '../address.js'
import { ROOT } from '../scripts/api.js'

test('the four hexbit widths stay 4 / 8 / 16 / 32 — versionSeat is not a fifth collapse', () => {
  const four = [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS]
  assert.deepEqual([...four].sort((a, b) => a - b), [4, 8, 16, 32])
  assert.equal(new Set(four).size, 4)
  assert.notEqual(SAFE_HEXBITS, COIN_HEXBITS, 'safe mantissa width is not the coin row')
  assert.doesNotMatch(readFileSync(join(ROOT, 'src/hexbit/index.ts'), 'utf8'), /versionSeat/)
})

test('RFC 8439 stays the AEAD and PBKDF2 stays the entropy tape — occupancy is not the key', () => {
  const src = readFileSync(join(ROOT, 'src/crypt.ts'), 'utf8')
  const encryptSrc = src.slice(src.indexOf('export function encrypt('), src.indexOf('export function sealSequenceAcross'))
  assert.match(encryptSrc, /deriveKey/)
  assert.match(encryptSrc, /PBKDF2-SHA256/)
  assert.match(encryptSrc, /ChaCha20-Poly1305/)
  assert.doesNotMatch(encryptSrc, /occupancyTapeOf/)
  const tape = occupancyTapeOf(toUuid('key_floor_is_one_uuid'))
  assert.equal(tape.length, 32)
})

test('c9ddc617 — quantum threat overclaim splits into verifiable parts', () => {
  for (const statement of [
    'All quantum threat is gone with uuidna.',
    'Grover quantum threat is gone with uuidna.',
    'Timing sidechannel threat is gone with uuidna.',
    'Bitcoin ECDSA threat is gone with uuidna.',
  ]) assert.equal(adjudicate(statement).verdict, 'UNVERIFIED', statement)

  for (const [statement, key] of [
    ['Shor has no asymmetric target on a symmetric-only stack, proven by theorem grover_quadratic_bound', 'grover_quadratic_bound'],
    ['Grover is a quadratic speedup only, proven by theorem grover_quadratic_bound', 'grover_quadratic_bound'],
    ['Grover halves SHA-256 preimage strength to the address width, proven by theorem sha256_grover_margin_is_the_address', 'sha256_grover_margin_is_the_address'],
    ['The post-quantum cipher floor is one uuid wide, proven by theorem key_floor_is_one_uuid', 'key_floor_is_one_uuid'],
    ['Physical sidechannels are out of scope, proven by theorem oos_physical_sidechannel', 'oos_physical_sidechannel'],
  ] as const) {
    const v = adjudicate(statement)
    assert.equal(v.verdict, 'VERIFIED', statement)
    assert.ok(v.cites?.some((c) => c.key === key), statement)
  }

  assert.equal(
    adjudicate('Quantum threat is gone, proven by theorem quantum_threat_gone').verdict,
    'UNVERIFIED',
  )

  const crypt = readFileSync(join(ROOT, 'src/crypt.ts'), 'utf8')
  assert.doesNotMatch(crypt, /\b(ECDSA|secp256|elliptic)\b/i, 'Bitcoin ECDSA is out of scope — no asymmetric wire')
})

test('desk does not mint quantum_threat_gone; Grover floor and n_qubit_dimension stay sealed', () => {
  const by = theoremByKey()
  assert.equal(by.has('quantum_threat_gone'), false)
  assert.ok(by.has('grover_quadratic_bound'))
  assert.ok(by.has('sha256_grover_margin_is_the_address'))
  assert.ok(by.has('key_floor_is_one_uuid'))
  assert.ok(by.has('n_qubit_dimension'))
  assert.ok(by.has('usable_gap_is_two_to_eighty'))
})

test('no King Wen / sephirot / chakra / iching_ / tree_of_life_ / myth_ theorem keys', () => {
  const myth = /sephirot|chakra|^iching_|^tree_of_life_|^myth_/i
  for (const key of theoremByKey().keys()) assert.doesNotMatch(key, myth, key)
})

test('dual-base % 15 is not a gridGaps release block', () => {
  assert.ok(!gridGaps().some((g) => /%\s*15|mod\s*15/.test(g.what)))
})

test('uuidna keys stay snake_case — origin kebab slugs are not imported as theorems', () => {
  for (const key of theoremByKey().keys()) assert.doesNotMatch(key, /-/, key)
})
