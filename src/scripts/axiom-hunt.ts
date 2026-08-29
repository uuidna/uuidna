#!/usr/bin/env node
// axiom-hunt — FIND THE AXIOMS IN USE. The Lean ledger is already axiom-free (lean-axioms: trust base ∅ — no axiom
// beyond the kernel); this hunts the OTHER axioms: the constants and bounds the library ASSUMES at runtime. Each
// candidate binds a LIVE code constant (imported
// core — never a loose substring match, which "covers" by digit coincidence. Three states: PROVEN (predicate true,
// key sealed), EXPOSED AXIOM (predicate true, no sealing theorem — the research lead to seal next), REFUTED
// (predicate false — the code disagrees with its own assumption: a traitor, exit 1). Integrity.
import {
  theoremByKey, ITER, MAX_ITER, NONCE_BYTES, SALT_BYTES, TAG_BYTES, MAX_LAYERS, ADDRESS_BITS, A432_STEP, CAPACITY,
  MAX_DEPTH, MAX_STRING, MAX_ARRAY, MAX_KEYS, coins, COINS, UUID_BITS, LEVERAGE, HANDLE_HEXBITS, HEXBIT_BITS,
  vortexOrbit, TRINITY, BASE, fuseHalves, twoBoardsOf, nextCoinOf, flipCoin, toUuid, A432_HZ, SAMPLE_RATE, PRICE,
  fuseLadder, fuseWidth, capacityAt, SAFE_HEXBITS, UUID_HEXBITS, metatronOf, RING, hexPiOf, HEX_PI, HEXAGRAM_BITS,
  HEXBIT_STATES, PI_ROOF, PI_ROOF_NUM, PI_ENGINE,
  RAYS, FREE_DIMS, COMPACT_DIMS, TEN_DIMS, FREE_KEYS, COMPACT_KEYS,
  KEY_BITS, KEY_BYTES, KEY_HEXBITS, ADDRESS_BYTES, GROVER_FLOOR_BITS, occupancyTapeOf, cryptOf,
  STATION_TEN, VE_FACES, sha256IsFourSixtyfours,
} from '../index.js'
import { handleBookOf, STRIP_LINES, STRIP_CHOICES } from '../quantum/apps/categories/books/strips.js'
import { hexbitRingMassGap } from '../hexbit/index.js'
import { massGapOnBellBornField } from '../quantum/index.js'
import { REPORTED_BASELINE } from '../quantum/advantage/index.js'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

export type HuntCandidate = { theorem: string; assumes: string; where: string; live: () => boolean }
export type HuntHeld = { lead: string; status: string; owes: string }
export type HuntReport = {
  proven: string[]
  exposed: HuntHeld[]
  refuted: string[]
}

export const CANDIDATES: HuntCandidate[] = [
  // REMOVED — kdf_cost_bounded. The theorem it watched stated (0 < 600000) ∧ (600000 ≤ 10000000): two literal
  // comparisons, so the kernel confirmed the numerals and never the KDF. The live bound itself is still enforced,
  // by the ITER/MAX_ITER check in one-receipt.ts, which reads src/crypt.ts rather than a name.
  // THE SERVED CEILING — named 2026-08-25, sealed as served_qubit_ceiling: 12 ≤ 16 and 2^n for every served
  // width. Honesty is that algebra in all those dimensions, not an exposed lead waiting on policy prose.
  { theorem: 'served_qubit_ceiling', assumes: 'handle tiles plus hexbit width sit at or below HEXBIT_BITS × HEXBIT_BITS', where: 'src/quantum/os/index.ts',
    live: () => HANDLE_HEXBITS + HEXBIT_BITS <= HEXBIT_BITS * HEXBIT_BITS },
  // THE COMPARISON CLASS — 1000 errors per million is 10^3 per 10^6, and 100 ns is 10^2. Sealed as
  // gate_error_baseline_class. Physical-platform papers may disagree; that is not a reason to hold the decade
  // arithmetic unsealed.
  { theorem: 'gate_error_baseline_class', assumes: 'the comparison baseline is 1000 errors per million two-qubit gates (10^3 per 10^6) and 100 ns (10^2)', where: 'src/quantum/advantage/index.ts',
    live: () => REPORTED_BASELINE.errorsPerMillion === 1000 && REPORTED_BASELINE.gateNs === 100 },
  { theorem: 'aead_nonce_and_salt_bits', assumes: 'nonce is ADDRESS_BYTES − HEXBIT_BITS, salt and tag are one address, nonce bits sit strictly inside the address, and ITER sits strictly inside MAX_ITER', where: 'src/crypt.ts',
    live: () => NONCE_BYTES === ADDRESS_BYTES - HEXBIT_BITS
      && SALT_BYTES === ADDRESS_BYTES && TAG_BYTES === ADDRESS_BYTES
      && SALT_BYTES * (HEXBIT_BITS * COINS) === UUID_BITS && NONCE_BYTES * (HEXBIT_BITS * COINS) < UUID_BITS
      && ITER > 0 && ITER < MAX_ITER },
  { theorem: 'key_floor_is_one_uuid', assumes: 'KEY_BITS / HEXBIT_BITS = KEY_HEXBITS, Grover floor is UUID_HEXBITS, occupancy tape is KEY_BYTES', where: 'src/crypt.ts + src/hexbit/index.ts',
    live: () => KEY_BITS / HEXBIT_BITS === KEY_HEXBITS
      && GROVER_FLOOR_BITS / HEXBIT_BITS === UUID_HEXBITS
      && KEY_BITS === COINS * UUID_BITS
      && UUID_HEXBITS * HEXBIT_BITS === UUID_BITS
      && occupancyTapeOf(toUuid('key_floor_is_one_uuid')).length === KEY_BYTES },
  { theorem: 'digest_doubles_the_address', assumes: 'KEY_BYTES = COINS × ADDRESS_BYTES, KEY_BITS = COINS × UUID_BITS, KEY_HEXBITS = COINS × UUID_HEXBITS', where: 'src/hexbit/index.ts',
    live: () => KEY_BYTES === COINS * ADDRESS_BYTES && KEY_BITS === COINS * UUID_BITS && KEY_HEXBITS === COINS * UUID_HEXBITS },
  { theorem: 'sha256_is_four_sixtyfours', assumes: 'sha256IsFourSixtyfours() is HEXBIT_BITS × LEVERAGE = KEY_BITS, HANDLE_HEXBITS × UUID_HEXBITS = KEY_BITS, 2^HANDLE_HEXBITS = KEY_BITS', where: 'src/hexbit/index.ts',
    live: () => {
      const s = sha256IsFourSixtyfours()
      return s.bits === KEY_BITS && s.boards * s.sixtyfours === KEY_BITS
        && HANDLE_HEXBITS * UUID_HEXBITS === KEY_BITS && 2 ** HANDLE_HEXBITS === KEY_BITS
    } },
  { theorem: 'sha256_rounds_are_the_board', assumes: 'LEVERAGE = 2^HEXAGRAM_BITS, ADDRESS_BYTES × UUID_HEXBITS = KEY_BITS × COINS', where: 'src/hexbit/index.ts + src/hexagram.ts',
    live: () => LEVERAGE === 2 ** HEXAGRAM_BITS && ADDRESS_BYTES * UUID_HEXBITS === KEY_BITS * COINS },
  { theorem: 'sha256_grover_margin_is_the_address', assumes: 'KEY_BITS / COINS = UUID_BITS — Grover floor is one uuid', where: 'src/hexbit/index.ts',
    live: () => KEY_BITS / COINS === UUID_BITS && KEY_BITS % COINS === 0 && cryptOf(toUuid('sha256_grover_margin_is_the_address')).floor.bits === UUID_BITS },
  { theorem: 'rosette_quantum_fortytwo', assumes: 'crypt directions are RAYS × (RAYS − 1), aspects are RAYS, fold states 2^RAYS = UUID_BITS', where: 'src/crypt.ts',
    live: () => {
      const c = cryptOf(toUuid('rosette_quantum_fortytwo'))
      return c.directions === RAYS * (RAYS - 1) && c.aspects === RAYS && c.foldStates === UUID_BITS && c.fused
    } },
  { theorem: 'onion_layers_power_of_two', assumes: 'MAX_LAYERS = HEXBIT_STATES = 2^HEXBIT_BITS, at most the address bits', where: 'src/stream.ts', live: () => MAX_LAYERS === HEXBIT_STATES && MAX_LAYERS === 2 ** HEXBIT_BITS && MAX_LAYERS <= UUID_BITS },
  { theorem: 'imprint_capacity_within_address', assumes: 'CAPACITY = 115 < 128 — the imprint fits strictly inside its address, 13 bits of seam', where: 'src/imprint.ts', live: () => CAPACITY === 115 && CAPACITY < ADDRESS_BITS },
  { theorem: 'message_cap_is_four_hexbits', assumes: 'Hilbert 4×4 is HEXBIT_BITS × HEXBIT_BITS; crypto occupancy is sha256IsFourSixtyfours (four 64s)', where: 'src/hexbit/index.ts',
    live: () => {
      const t = theoremByKey().get('message_cap_is_four_hexbits')
      const qubits = HEXBIT_BITS * HEXBIT_BITS
      const states = HEXBIT_STATES ** HEXBIT_BITS
      return !!t && t.file === 'Hexbit.lean'
        && t.statement === `(${HEXBIT_BITS} * ${HEXBIT_BITS} = ${qubits}) ∧ ((${HEXBIT_STATES}:Nat)^${HEXBIT_BITS} = ${states}) ∧ ((2:Nat)^${qubits} = ${states})`
    } },
  { theorem: 'hexbit_ring_mass_gap', assumes: 'hexbitRingMassGap() computes Δ > 0 on the HEXBIT_STATES ring (court on Hexbit.lean)', where: 'src/hexbit/index.ts',
    live: () => { const g = hexbitRingMassGap(); return g.holds && g.delta > 0 && g.states > 0 } },
  { theorem: 'born_field_mass_gap_on_bell', assumes: 'massGapOnBellBornField() = computeMassGap(bellBornWeights()) holds (court on Hexbit.lean)', where: 'src/quantum/index.ts',
    live: () => massGapOnBellBornField().holds },
  { theorem: 'aura_step_divides_circle', assumes: 'A432_STEP = 40 and 9 · 40 = 360 — the nine residues tile the wheel with no remainder', where: 'src/aura.ts', live: () => A432_STEP === 40 && 9 * A432_STEP === 360 },
  { theorem: 'sanitize_depth_bounded', assumes: 'MAX_DEPTH = UUID_HEXBITS = 2^5', where: 'src/sanitize.ts', live: () => MAX_DEPTH === UUID_HEXBITS && MAX_DEPTH === 2 ** 5 },
  { theorem: 'sanitize_max_depth_is_two_pow_five', assumes: 'MAX_DEPTH = UUID_HEXBITS = 2^5', where: 'src/sanitize.ts', live: () => MAX_DEPTH === UUID_HEXBITS && MAX_DEPTH === 2 ** 5 },
  { theorem: 'sanitize_max_string_is_ten_pow_six', assumes: 'MAX_STRING = 10^6', where: 'src/sanitize.ts', live: () => MAX_STRING === 10 ** 6 },
  { theorem: 'sanitize_array_and_keys_are_ten_pow_five', assumes: 'MAX_ARRAY = MAX_KEYS = 10^5', where: 'src/sanitize.ts', live: () => MAX_ARRAY === MAX_KEYS && MAX_ARRAY === 10 ** 5 },

  // THE COINS WERE NOT IN THIS TABLE. coins() computes 110 − 108; hexbit COINS was a second literal 2; PRICE
  // used to follow that literal. Three books, one commission — a drift hunt cannot see. Bound to the theorems
  // that already seal the arithmetic, so a copy that moves is REFUTED rather than a silent second price.
  { theorem: 'two_coins', assumes: 'coins() = 110 − 108, and hexbit COINS and billing PRICE are that same two — the copies cannot drift', where: 'src/captain/billing/index.ts + src/hexbit/index.ts + src/billing/index.ts',
    live: () => coins() === 110 - 108 && COINS === coins() && PRICE === coins() },
  { theorem: 'rosette_quantum_doubling_is_two_coins', assumes: 'the 64-bit coin doubles to the 128-bit address only when the two coins are contributed: COINS · LEVERAGE = UUID_BITS = ADDRESS_BITS', where: 'src/hexbit/index.ts',
    live: () => COINS * LEVERAGE === UUID_BITS && UUID_BITS === ADDRESS_BITS && coins() * LEVERAGE === UUID_BITS },
  { theorem: 'the_uuid_is_two_boards', assumes: 'two 8×8 boards are the uuid: HANDLE_HEXBITS² · COINS = UUID_BITS, fuseHalves closes, twoBoardsOf concatenates to 128', where: 'src/hexagram.ts + src/fusion/reactor/index.ts',
    live: () => {
      const f = fuseHalves()
      const faces = twoBoardsOf(toUuid('two_coins'))
      const again = flipCoin(flipCoin(faces))
      return HANDLE_HEXBITS * HANDLE_HEXBITS * COINS === UUID_BITS
        && f.closes && f.coins === coins() && f.bits === UUID_BITS
        && faces[0].length === LEVERAGE && faces[1].length === LEVERAGE
        && nextCoinOf(faces).length === UUID_BITS
        && again[0].length === faces[0].length && again[1].length === faces[1].length
        && again[0].every((b, i) => b === faces[0][i]) && again[1].every((b, i) => b === faces[1][i])
    } },
  { theorem: 'sequence_and_coins_are_one', assumes: 'the vortex orbit length is the coins times the trinity — 6 = coins() · TRINITY', where: 'src/address.ts',
    live: () => vortexOrbit().length === coins() * TRINITY },

  // THE FUSE LADDER — each rung is coins × width mod ring, and without the coins the width does not move.
  { theorem: 'z9mul_2_8', assumes: '2·8 ≡ 7 (mod 9): two handle tiles fuse to the seven-ray, and 2^7 is the uuid, only when coins() is contributed', where: 'src/hexbit/index.ts',
    live: () => {
      const w = fuseWidth(HANDLE_HEXBITS, coins())
      return w === (COINS * HANDLE_HEXBITS) % RING && fuseLadder(HANDLE_HEXBITS, coins())[1] === w
        && fuseLadder(HANDLE_HEXBITS, 0).length === 1 && capacityAt(w) === UUID_BITS && RING === HANDLE_HEXBITS + 1
    } },
  { theorem: 'z9mul_2_7', assumes: '2·7 ≡ 5 (mod 9): two seven-rays fuse to the pentad, and 2^5 is the uuid in hexbits', where: 'src/hexbit/index.ts',
    live: () => {
      const seven = fuseWidth(HANDLE_HEXBITS, coins())
      const five = fuseWidth(seven, coins())
      return capacityAt(five) === UUID_HEXBITS && fuseLadder(HANDLE_HEXBITS, coins())[2] === five
    } },
  { theorem: 'z9mul_2_5', assumes: '2·5 ≡ 1 (mod 9): two pentads fuse to the unit, and 2^1 is the coins', where: 'src/hexbit/index.ts',
    live: () => {
      const unit = fuseWidth(fuseWidth(fuseWidth(HANDLE_HEXBITS, coins()), coins()), coins())
      return capacityAt(unit) === COINS
    } },
  { theorem: 'trial_computes_only_with_two_coins', assumes: 'the fuse ladder and the hero walk only when coins() is contributed at each rung — any other contribution leaves the width unfused; 32·k = 64 only for k = 2', where: 'src/hexbit/index.ts + src/render.ts',
    live: () => fuseLadder(1, coins()).length === vortexOrbit().length && fuseLadder(1, 1).length === 1 && fuseLadder(1, 0).length === 1 && UUID_HEXBITS * coins() === LEVERAGE && fuseHalves().closes },
  { theorem: 'metatron_seventyeight_lines', assumes: 'SAFE_HEXBITS centres joined as K_13 draw C(13,2) = 13×12/2 = 78 lines, live from the address tiles', where: 'src/hexagram.ts',
    live: () => {
      const m = metatronOf(toUuid('metatron_seventyeight_lines'))
      return m.centres === SAFE_HEXBITS && m.lines === (SAFE_HEXBITS * (SAFE_HEXBITS - 1)) / 2
        && m.nodes.length === SAFE_HEXBITS && m.xy.length === SAFE_HEXBITS
    } },
  { theorem: 'song_pi_roof_opens', assumes: '22/7 opens 3142857 and HEX_PI is the period 142857 — the hexagon the two handles map onto', where: 'src/hexagram.ts',
    live: () => {
      const rung = fuseWidth(HANDLE_HEXBITS, coins())
      const product = PI_ROOF_NUM * PI_ENGINE
      let n = PI_ROOF % PI_ENGINE
      for (let i = HEX_PI.length - 1; i >= 0; i--) {
        if (HEX_PI[i] !== n % 10) return false
        n = (n - (n % 10)) / 10
      }
      return PI_ROOF * rung + (product % rung) === product && n === 0 && HEX_PI.length === HEXAGRAM_BITS
    } },
  { theorem: 'door_of_the_referrer', assumes: 'each handle\'s first tile mod 6 is a door into HEX_PI, total and onto, remainder 16%6=4 named; 8 tiles on 6 vertices leave the coins', where: 'src/hexagram.ts',
    live: () => {
      const p = hexPiOf(toUuid('door_of_the_referrer'))
      return p.referrer.door === parseInt(p.referrer.handle[0]!, 16) % HEXAGRAM_BITS
        && p.superposition.door === parseInt(p.superposition.handle[0]!, 16) % HEXAGRAM_BITS
        && p.remainder === COINS && HANDLE_HEXBITS % HEXAGRAM_BITS === COINS
        && HEXBIT_STATES % HEXAGRAM_BITS === HEXBIT_BITS
        && p.referrer.handle.length === HANDLE_HEXBITS && p.superposition.handle.length === HANDLE_HEXBITS
    } },
  { theorem: 'song_verses_base_pair', assumes: 'π verses a half-turn apart digitwise sum to 9 (142857 + 857142 = 999999) — the two handles pair when their doors differ by 3', where: 'src/hexagram.ts',
    live: () => {
      const a = hexPiOf(toUuid('song_verses_base_pair'))
      const half = (a.referrer.door + TRINITY) % HEXAGRAM_BITS
      for (let i = 0; i < a.referrer.verse.length; i++) {
        const c = HEX_PI[(half + i) % HEX_PI.length]!
        if (a.referrer.verse[i]! + c !== BASE) return false
      }
      return a.referrer.verse.length === HEX_PI.length
    } },

  // HARMONIC DRIFT — the lattice the synth actually sounds, covered by the wave theorems that name the comma.
  // A440 is not a live constant here (the tree tunes A432 only); the covering theorems still watch the live
  // fork so a silent retune to concert pitch would refute rather than drift.
  { theorem: 'song_az_is_the_tuning', assumes: 'A432_HZ is Az, HEXBIT_STATES × 3^TRINITY, and folds to the vortex ceiling (A432_HZ ≡ 0 mod BASE)', where: 'src/tts/synth.ts',
    live: () => A432_HZ === HEXBIT_STATES * (TRINITY ** TRINITY) && A432_HZ % BASE === 0 },
  { theorem: 'k432', assumes: 'the live tuning is 2^HEXBIT_BITS · 3^TRINITY = HEXBIT_STATES · 3^TRINITY', where: 'src/tts/synth.ts',
    live: () => A432_HZ === HEXBIT_STATES * (TRINITY ** TRINITY) && A432_HZ === (2 ** HEXBIT_BITS) * (TRINITY ** TRINITY) },
  { theorem: 'a440_drifts_eight_from_the_lattice', assumes: 'ISO 16 concert pitch sits HANDLE_HEXBITS off the live lattice, and the 54:55 ratio closes', where: 'src/tts/synth.ts',
    live: () => 440 - A432_HZ === HANDLE_HEXBITS && (COINS * (TRINITY ** TRINITY) + 1) * A432_HZ === (COINS * (TRINITY ** TRINITY)) * 440 },
  { theorem: 'a440_not_on_the_vortex', assumes: 'A432_HZ ≡ 0 (mod BASE) while 440 ≡ HANDLE_HEXBITS — concert pitch is a different residue class', where: 'src/tts/synth.ts',
    live: () => A432_HZ % BASE === 0 && 440 % BASE === HANDLE_HEXBITS },
  { theorem: 'anthem_closes_on_the_coin_octave', assumes: 'the coin octave in hertz is coins() · A432_HZ', where: 'src/tts/synth.ts + src/captain/billing/index.ts',
    live: () => coins() * A432_HZ === COINS * HEXBIT_STATES * (TRINITY ** TRINITY) },
  { theorem: 'nyquist_clears_the_lattice', assumes: 'A432_HZ · HEXBIT_STATES sits under SAMPLE_RATE / coins(), so the hexbit tones are representable', where: 'src/tts/synth.ts',
    live: () => A432_HZ * HEXBIT_STATES < SAMPLE_RATE / coins() },
  { theorem: 'polarity_angles_are_the_system_counts', assumes: 'A432_STEP is 360/BASE and the orbit sector is 360 / vortexOrbit().length', where: 'src/address.ts',
    live: () => {
      const turn = A432_STEP * BASE
      return turn / BASE === A432_STEP && turn / vortexOrbit().length === turn / (coins() * TRINITY)
        && HANDLE_HEXBITS * HEXBIT_BITS === UUID_HEXBITS
    } },
  { theorem: 'ten_square_computes_ten_dimensions', assumes: 'FREE_DIMS + COMPACT_DIMS = TEN_DIMS, RAYS = BASE − COINS, compactified count is the rays, free count is the trinity', where: 'src/aura.ts',
    live: () => FREE_DIMS + COMPACT_DIMS === TEN_DIMS
      && FREE_DIMS === TRINITY
      && COMPACT_DIMS === RAYS
      && RAYS === BASE - COINS
      && TEN_DIMS === TRINITY + (BASE - COINS)
      && FREE_KEYS.length === FREE_DIMS
      && COMPACT_KEYS.length === COMPACT_DIMS },

  // THE COMBINATORIAL BOOK — VE faces × ten stations. Occupancy constructors, never verse.
  { theorem: 'station_ten_is_hexagram_plus_hexbit', assumes: 'STATION_TEN = HEXAGRAM_BITS + HEXBIT_BITS = 10, and STRIP_CHOICES is that ten', where: 'src/hexagram.ts + src/quantum/apps/categories/books/strips.ts',
    live: () => STATION_TEN === HEXAGRAM_BITS + HEXBIT_BITS && STATION_TEN === 10 && STRIP_CHOICES === STATION_TEN },
  { theorem: 've_faces_are_handle_hexbit_coins', assumes: 'VE_FACES = HANDLE_HEXBITS + HEXBIT_BITS + COINS = 14, and STRIP_LINES is those faces', where: 'src/hexbit/index.ts + src/quantum/apps/categories/books/strips.ts',
    live: () => VE_FACES === HANDLE_HEXBITS + HEXBIT_BITS + COINS && VE_FACES === 14 && STRIP_LINES === VE_FACES },
  { theorem: 'literature_sonnet_volume', assumes: 'handleBookOf volume is 10^14 occupancy seats from STRIP_CHOICES on STRIP_LINES', where: 'src/quantum/apps/categories/books/strips.ts',
    live: () => {
      const zero = Array.from({ length: STRIP_LINES }, () => 0)
      return handleBookOf(zero).volume === 10 ** 14 && STRIP_LINES === 14 && STRIP_CHOICES === 10
    } },
  { theorem: 'combinatorial_book_exceeds_handles', assumes: 'the combinatorial book volume strictly exceeds 16^HANDLE_HEXBITS handle doors', where: 'src/quantum/apps/categories/books/strips.ts',
    live: () => {
      const zero = Array.from({ length: STRIP_LINES }, () => 0)
      return handleBookOf(zero).volume > 16 ** HANDLE_HEXBITS
    } },
  { theorem: 'combinatorial_book_fits_the_uuid', assumes: 'the combinatorial book volume sits strictly inside 2^UUID_BITS addresses', where: 'src/quantum/apps/categories/books/strips.ts',
    live: () => {
      const zero = Array.from({ length: STRIP_LINES }, () => 0)
      return BigInt(handleBookOf(zero).volume) < (2n ** BigInt(UUID_BITS))
    } },
]

/** axiomHunt() → proven / exposed / refuted over the live CANDIDATES table. Side-effect free so wave-supply
 *  can count remaining covering work without a second copy of the table (the dry law). */
export function axiomHunt(): HuntReport {
  const byKey = theoremByKey()
  const proven: string[] = []
  const exposed: HuntHeld[] = []
  const refuted: string[] = []
  for (const c of CANDIDATES) {
    const ok = c.live()
    const t = ok ? byKey.get(c.theorem) : undefined
    if (!ok) refuted.push(c.theorem)
    else if (!t) {
      exposed.push({
        lead: `${c.theorem} — the code assumes ${c.assumes}, and no theorem seals it (${c.where})`,
        status: 'EXPOSED AXIOM: live predicate true, no sealing theorem',
        owes: `a theorem named ${c.theorem} stating the assumption as decidable arithmetic — add the fact to its domain generator, then npm run lean`,
      })
    } else proven.push(c.theorem)
  }
  return { proven, exposed, refuted }
}

const IS_CLI = (process.argv[1] ?? '').endsWith('axiom-hunt.js')
if (IS_CLI) {
  const hunt = axiomHunt()
  console.log('axiom-hunt — the assumptions the code runs on, each bound to its sealing theorem by KEY:')
  const exposedKeys = new Set(hunt.exposed.map((e) => e.lead.split(' — ')[0]))
  const refutedKeys = new Set(hunt.refuted)
  for (const c of CANDIDATES) {
    const state = refutedKeys.has(c.theorem) ? '✗ REFUTED     ' : exposedKeys.has(c.theorem) ? '⚠ EXPOSED AXIOM' : '✓ proven      '
    console.log(`  ${state} ${c.theorem} — ${c.assumes} (${c.where})`)
  }
  if (hunt.refuted.length) {
    console.error(`✗ axiom-hunt — ${hunt.refuted.length} assumption(s) REFUTED: the code disagrees with what it assumes. Fix the source.`)
    process.exit(1)
  }
  // AN EXPOSED AXIOM IS A LEAD, AND UNTIL NOW IT WAS ONLY A PRINTED LINE.
  //
  // This file's own header calls an exposed axiom "the research lead to seal next" — and then wrote nothing. It
  // had no writeFileSync at all: the finding lived in console output, `lean/leads.json` never carried it, and
  // `next` (which tells a reader to go read exactly that file for "what is noticed and unsettled") could not
  // surface it. So a gap was found, correctly named as an axiom, and dropped on the same run. The chain from gap
  // to axiom to theorem broke at the first hop, silently, in the instrument built to walk it.
  //
  // The exposed set is now SEALED to its own file, in the {lead, status, owes} shape lean/leads.json uses, so the
  // leads surface can carry it and a reader can act on it. Written on every run — including EMPTY when nothing is
  // exposed, because "no file" and "nothing exposed" must not render alike, which is the defect this whole
  // instrument exists to catch one level down.
  const out = { why: 'Assumptions the running code makes that NO sealed theorem states. Each is a lead: seal it, and axiom-hunt reports it proven on the next run. Written by src/scripts/axiom-hunt.ts on every run, empty included — an absent file and an empty set are different facts.', exposed: hunt.exposed.length, held: hunt.exposed }
  writeFileSync(join(ROOT, 'lean', 'exposed-axioms.json'), JSON.stringify(out, null, 1) + '\n')

  if (hunt.exposed.length) {
    console.log(`⚠ axiom-hunt — ${hunt.exposed.length} axiom(s) in use with NO sealing theorem: seal each (add the fact to its domain generator, then npm run lean).`)
    console.log(`  filed to lean/exposed-axioms.json — a lead, not just a printed line.`)
  } else console.log('✓ axiom-hunt — every assumption in the table is sealed: no axioms in use, the code stands on theorems.')
}
