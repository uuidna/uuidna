// axiom-hunt coins & harmonic drift — the covering theorems that were missing from the table.
// coins() computed 110 − 108 while hexbit COINS and billing PRICE were a second literal; A432_HZ sounded
// the lattice while a440_drifts_* sat unwatched. Each test names the keys so a dropped candidate is a failure.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CANDIDATES, axiomHunt } from '../scripts/axiom-hunt.js'
import { theoremByKey, coins, COINS, PRICE, UUID_BITS, LEVERAGE, A432_HZ, fuseLadder, fuseWidth, HANDLE_HEXBITS, capacityAt, HEXBIT_STATES, TRINITY } from '../index.js'

const COIN_KEYS = [
  'two_coins',
  'rosette_quantum_doubling_is_two_coins',
  'the_uuid_is_two_boards',
  'sequence_and_coins_are_one',
] as const

const FUSE_KEYS = [
  'z9mul_2_8',
  'z9mul_2_7',
  'z9mul_2_5',
  'trial_computes_only_with_two_coins',
  'metatron_seventyeight_lines',
  'song_pi_roof_opens',
  'door_of_the_referrer',
  'song_verses_base_pair',
] as const

const DRIFT_KEYS = [
  'song_az_is_the_tuning',
  'k432',
  'a440_drifts_eight_from_the_lattice',
  'a440_not_on_the_vortex',
  'anthem_closes_on_the_coin_octave',
  'nyquist_clears_the_lattice',
  'polarity_angles_are_the_system_counts',
] as const

const TEN_KEYS = [
  'ten_square_computes_ten_dimensions',
] as const

const BOOK_KEYS = [
  'station_ten_is_hexagram_plus_hexbit',
  've_faces_are_handle_hexbit_coins',
  'literature_sonnet_volume',
  'combinatorial_book_exceeds_handles',
  'combinatorial_book_fits_the_uuid',
] as const

const CIPHER_KEYS = [
  'aead_nonce_and_salt_bits',
  'key_floor_is_one_uuid',
  'digest_doubles_the_address',
  'sha256_is_four_sixtyfours',
  'sha256_rounds_are_the_board',
  'sha256_grover_margin_is_the_address',
  'rosette_quantum_fortytwo',
  'onion_layers_power_of_two',
] as const

test('axiom-hunt covers the coin copies, fuse ladder, metatron, and the harmonic-drift fork, each key sealed', () => {
  const keys = new Set(CANDIDATES.map((c) => c.key))
  const byKey = theoremByKey()
  for (const k of [...COIN_KEYS, ...FUSE_KEYS, ...DRIFT_KEYS, ...TEN_KEYS, ...CIPHER_KEYS, ...BOOK_KEYS]) {
    assert.ok(keys.has(k), `${k} must sit in CANDIDATES — an unwatched copy is the drift`)
    assert.ok(byKey.has(k), `${k} must already be sealed — this hunt covers, it does not mint`)
  }
  const hunt = axiomHunt()
  assert.deepEqual(hunt.refuted, [], hunt.refuted.join(','))
  assert.equal(hunt.exposed.length, 0, hunt.exposed.map((e) => e.lead).join('; '))
  for (const k of [...COIN_KEYS, ...FUSE_KEYS, ...DRIFT_KEYS, ...TEN_KEYS, ...CIPHER_KEYS, ...BOOK_KEYS]) {
    assert.ok(hunt.proven.includes(k), `${k} live predicate must hold and match its theorem`)
  }
})

test('the three coin books recompute to one price; doubling holds only if they contribute', () => {
  assert.equal(coins(), 110 - 108)
  assert.equal(COINS, coins())
  assert.equal(PRICE, coins())
  assert.equal(COINS * LEVERAGE, UUID_BITS)
  assert.equal(coins() * A432_HZ, coins() * HEXBIT_STATES * (TRINITY ** TRINITY))
  assert.equal(440 - A432_HZ, HANDLE_HEXBITS)
})

test('fuse ladder walks only when captain coins are contributed at each rung', () => {
  const paid = [...fuseLadder(HANDLE_HEXBITS, coins())]
  assert.equal(paid[0], HANDLE_HEXBITS)
  let w = HANDLE_HEXBITS
  for (let i = 1; i < paid.length; i++) {
    w = fuseWidth(w, coins())
    assert.equal(paid[i], w)
  }
  const fromUnit = [...fuseLadder(1, coins())]
  assert.equal(fromUnit[0], 1)
  w = 1
  for (let i = 1; i < fromUnit.length; i++) {
    w = fuseWidth(w, coins())
    assert.equal(fromUnit[i], w)
  }
  assert.deepEqual([...fuseLadder(HANDLE_HEXBITS, 0)], [HANDLE_HEXBITS])
  assert.deepEqual([...fuseLadder(HANDLE_HEXBITS, 1)], [HANDLE_HEXBITS])
  assert.equal(fuseWidth(HANDLE_HEXBITS, 1), HANDLE_HEXBITS)
  assert.equal(capacityAt(fuseWidth(HANDLE_HEXBITS, coins())), UUID_BITS)
})

test('CONTROL — dropping two_coins from the table would hide the unaccounted copy', () => {
  const without = CANDIDATES.filter((c) => c.key !== 'two_coins')
  assert.ok(without.length === CANDIDATES.length - 1)
  assert.equal(without.some((c) => c.key === 'two_coins'), false)
})
