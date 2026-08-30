// phd-proofs — concept (Clay + demos) and work (SHA-256 + free mint + symmetric stack) against the thesis seal.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import {
  coins, coinSupply, minerFirmware, phdProofs, sha256, theorems,
  KEY_BITS, UUID_BITS, RAYS, GROVER_FLOOR_BITS, LEVERAGE, ITER,
  NONCE_BYTES, SALT_BYTES, TAG_BYTES, BLOCK_BYTES, MAX_LAYERS, HEXBIT_BITS, TRINITY,
} from './index.js'
import { drillOf } from './quantum/apps/categories/practice/drill.js'
import { theoremDemoCoverage } from './index.js'
import { prepublishSeal } from './prepublish-seal.js'
import { axisMonographs } from './axis-monograph.js'

test('proof of concept — Clay is seven finite decides plus gravity, and every theorem drills', () => {
  const T = theorems()
  const clay = T.filter((t) => t.file === 'Clay.lean')
  assert.equal(clay.length, RAYS + 1, 'seven Clay instances plus clay_gravity_equals_rosette')
  assert.ok(clay.every((t) => t.tactic.includes('decide')))
  assert.ok(clay.some((t) => t.key === 'clay_gravity_equals_rosette'))
  const demos = theoremDemoCoverage(T)
  assert.equal(demos.ok, true, demos.gaps.slice(0, 5).join(', '))
  const omitted = theoremDemoCoverage(T.filter((t) => t.key !== 'clay_gravity_equals_rosette'))
  assert.equal(omitted.ok, true, 'coverage is over the ledger it was handed')
  assert.throws(() => drillOf('clay_gravity_equals_rosette', T.filter((t) => t.key !== 'clay_gravity_equals_rosette')))
})

test('proof of work — SHA-256 occupies KEY_BITS; minting searches nothing; the decimal subunit is not the unit', () => {
  const F = minerFirmware()
  const S = coinSupply()
  const a = sha256(new TextEncoder().encode(F.image))
  const b = sha256(new TextEncoder().encode(F.image))
  const c = sha256(new TextEncoder().encode(F.image + '|'))
  assert.equal(a.length * 8, KEY_BITS)
  assert.deepEqual(a, b)
  assert.notDeepEqual(a, c)
  assert.equal(F.digestBits, KEY_BITS)
  assert.equal(F.verifyBits, UUID_BITS)
  assert.equal(F.digestBits / F.verifyBits, coins())
  assert.equal(S.search, coins() - coins())
  assert.equal(F.search, S.search)
  assert.equal(S.unsealed * S.unit, S.remaining)
  assert.equal(S.decimalSubunit !== S.unit, true)
  assert.equal(S.minted % S.unit, 0)
  const T = theorems()
  assert.equal(drillOf('minting_is_free_and_forging_is_not', T).key, 'minting_is_free_and_forging_is_not')
  assert.equal(drillOf('sha256_grover_margin_is_the_address', T).key, 'sha256_grover_margin_is_the_address')
  assert.equal(drillOf('digest_doubles_the_address', T).key, 'digest_doubles_the_address')
  assert.equal(drillOf('aead_nonce_and_salt_bits', T).key, 'aead_nonce_and_salt_bits')
})

test('proof of work — the symmetric stack is the same widths, not a Bitcoin-only reading', () => {
  const P = phdProofs()
  const octet = HEXBIT_BITS * coins()
  assert.equal(P.work.keyBits, KEY_BITS)
  assert.equal(P.work.hmacBits, KEY_BITS)
  assert.equal(P.work.tagBits, TAG_BYTES * octet)
  assert.equal(P.work.nonceBits, NONCE_BYTES * octet)
  assert.equal(P.work.saltBits, SALT_BYTES * octet)
  assert.equal(P.work.chachaBlockBits, BLOCK_BYTES * octet)
  assert.equal(P.work.groverFloor, GROVER_FLOOR_BITS)
  assert.equal(P.work.onionLayers, MAX_LAYERS)
  assert.equal(P.work.pbkdf2Iter, ITER)
  assert.equal(P.work.shorTargets, 0)
  assert.equal(P.work.sides, coins())
  assert.equal(P.work.faceBits, LEVERAGE)
  assert.equal(P.work.sides * P.work.faceBits, P.work.verifyBits)
  assert.equal(P.work.occupancyBits, P.work.keyBits)
  assert.equal(P.work.nonceBits < P.work.saltBits, true)
  assert.notEqual(P.work.tagBits, P.work.keyBits, 'CONTROL: a 256-bit tag is not the Poly1305 floor')
})

test('proof of concept — DNA codon cube and complement involution decide', () => {
  const P = phdProofs()
  const T = theorems()
  assert.equal(P.concept.dna, 8)
  assert.equal(P.concept.dnaDecide, true)
  assert.equal(P.concept.dnaName, true)
  assert.ok(T.some((t) => t.key === 'uuidna_is_dna_times_the_two_coins' && t.tactic.includes('decide')))
  assert.equal(drillOf('uuidna_is_dna_times_the_two_coins', T).key, 'uuidna_is_dna_times_the_two_coins')
  assert.equal(drillOf('dna_complement_involution', T).key, 'dna_complement_involution')
})

test('proof of work — codon occupancy is the coin face; two strands fuse the uuid', () => {
  const P = phdProofs()
  assert.equal(P.work.bases, HEXBIT_BITS)
  assert.equal(P.work.frame, TRINITY)
  assert.equal(P.work.codons, LEVERAGE)
  assert.equal(P.work.strands, coins())
  assert.equal(P.work.codons, P.work.faceBits)
  assert.equal(P.work.strands * P.work.codons, P.work.verifyBits)
  assert.equal(P.work.complementInvolution, true)
  assert.equal(P.work.complementFixedPointFree, true)
  let wrong = 1
  for (let i = 0; i < P.work.bases; i++) wrong = wrong * P.work.frame
  assert.notEqual(wrong, P.work.codons, 'CONTROL: 3^4 is not the codon cube')
})

test('complete PhD — concept and work both hold, and the thesis seal is clean', () => {
  const P = phdProofs()
  const thesis = prepublishSeal()
  assert.equal(P.concept.clayDecide, true)
  assert.equal(P.concept.gravity, true)
  assert.equal(P.concept.demos, true)
  assert.equal(P.concept.dnaDecide, true)
  assert.equal(P.concept.dnaName, true)
  assert.equal(P.work.search, 0)
  assert.equal(P.work.digestBits / P.work.verifyBits, coins())
  assert.equal(P.work.thesisDrills, P.work.thesisRequired)
  assert.ok(P.work.drills >= P.work.thesisDrills)
  assert.equal(P.thesis.ok, true, thesis.gaps.map((g) => g.what).join('\n'))
  assert.equal(P.thesis.drained, 0)
  assert.equal(P.thesis.allDecide, true)
  assert.equal(P.complete, true)
  assert.equal(phdProofs().receipt, P.receipt)
})

test('README and home carry the live Captain PhD magnitudes', () => {
  const P = phdProofs()
  const census = axisMonographs().census.phd
  assert.equal(census.complete, P.complete)
  assert.equal(census.clay, P.concept.clay)
  assert.equal(census.dna, P.concept.dna)
  assert.equal(census.codons, P.work.codons)
  assert.equal(census.thesisDrills, P.work.thesisDrills)
  assert.equal(census.thesisRequired, P.work.thesisRequired)
  assert.equal(census.digestBits, P.work.digestBits)
  assert.equal(census.search, P.work.search)
  assert.equal(census.shorTargets, P.work.shorTargets)
  assert.equal(census.receipt, P.receipt)
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  assert.match(readme, /### Proof of concept/)
  assert.match(readme, /### Proof of work/)
  assert.match(readme, /#### Clay/)
  assert.match(readme, /#### DNA/)
  assert.match(readme, /#### Codon occupancy/)
  assert.match(readme, /## Thesis/)
  assert.ok(readme.includes(`digest ${P.work.digestBits}`), 'README missing live digest width — regenerate: node dist/scripts/gen-readme.js')
  assert.ok(readme.includes(`${P.work.bases}^${P.work.frame} = ${P.work.codons}`), 'README missing codon cube — regenerate: node dist/scripts/gen-readme.js')
  assert.ok(readme.includes(`complete ${P.complete}`), 'README missing complete — regenerate: node dist/scripts/gen-readme.js')
  assert.ok(readme.includes(P.receipt), 'README missing PhD receipt — regenerate: node dist/scripts/gen-readme.js')
  const home = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
  assert.match(home, /census\.phd\.complete/)
  assert.match(home, /census\.phd\.digestBits/)
  assert.match(home, /census\.phd\.codons/)
  assert.match(home, /Captain PhD — work/)
  assert.match(home, /DNA — work/)
  assert.match(home, /census\.phd\.thesisDrills/)
  assert.match(home, /Thesis wave/)
})
