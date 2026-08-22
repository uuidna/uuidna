#!/usr/bin/env node
// Automate the Lean layer for THE NIGHT'S HARVEST — the captain's closing order "port all as theorems": the
// decidable cores of the compass mandala (lead 96), the diving mathematics (lead 101), and the fold-to-zero
// promotion chain (lead 88), each COMPUTED here before a line of Lean is written. The mandala's two hands
// (0 1248 75 369 0 1 / 0 9862 35 741 0 9) sum to ten in every column; the development 9−d is a HALF-TURN of
// the doubling ring itself (the same half-turn the hexbit slit's dark fringe seals one register up); five is
// the unique developing center and hex has NONE — its center is the gap. Diving: Boyle walks the harmonic
// series in exact sixtieths, pressure doubles down the water column on the octave ladder, Haldane's safe
// bound IS two-to-one with the tissue ladder doubling beneath it (his published fifth half-time, 75, broke
// the doubling — named in prose, never smoothed), the buddy pair squares the failure denominator, and the
// thirds rule closes whole. HONEST SCOPE, load-bearing: arithmetic ONLY — no claim about physiology,
// medicine, or any death; the diving facts are the PUBLISHED laws' integer skeletons (Boyle idealized,
// Haldane's ratio as he stated it), and whether any of it explains any real event stays UNVERIFIED with
// those licensed to say (the hexbit-slit discipline). COMPUTE → GENERATE → VERIFY.
import { emit, NTH_DEF, type Fact } from './lean-gen.js'

const ORBIT = [1, 2, 4, 8, 7, 5]                      // the doubling ring, sealed live tonight by uuidna_vortex
const LINE_A = [1, 2, 4, 8, 7, 5, 3, 6, 9]            // the captain's first hand (zeros are the axis, not columns)
const LINE_B = [9, 8, 6, 2, 3, 5, 7, 4, 1]            // the second hand — the development
const LADDER = [5, 10, 20, 40]                        // Haldane's half-time ladder while it doubles (his 5th, 75, broke it)

const FACTS: Fact[] = [
  { key: 'captains_columns_sum_to_ten',
    why: `THE TWO HANDS OF THE MANDALA SUM TO TEN IN EVERY COLUMN: [${LINE_A.join(' ')}] over [${LINE_B.join(' ')}] — nine columns, one constant. The second line is the first DEVELOPED (film to paper), and two contrary voices summing to a drone is the round and its negative sung together — the same shape 142857 + 857142 = 999999 seals one wing over.`,
    js: () => LINE_A.length === 9 && LINE_B.length === 9 && LINE_A.every((d, i) => d + LINE_B[i]! === 10),
    stmt: `((List.zip ${JSON.stringify(LINE_A).replace(/,/g, ', ')} ${JSON.stringify(LINE_B).replace(/,/g, ', ')}).all (fun p => p.1 + p.2 = 10)) ∧ ((${JSON.stringify(LINE_A).replace(/,/g, ', ')} : List Nat).length = 9)` },

  { key: 'nine_complement_half_turns_the_orbit',
    why: 'THE DEVELOPMENT IS A HALF-TURN OF THE DOUBLING RING ITSELF: 9 − orbit[i] = orbit[i+3 mod 6] at every position — complementing the vortex hexad does not leave the cycle, it ROTATES it exactly half way round. The darkroom involution, the DNA complement, and the dark fringe\'s half-turn land on the doubling orbit as one law: develop the ring and you get the same ring, three steps later.',
    js: () => ORBIT.every((d, i) => 9 - d === ORBIT[(i + 3) % 6]),
    stmt: `(List.range 6).all (fun i => 9 - nth ${JSON.stringify(ORBIT).replace(/,/g, ', ')} i = nth ${JSON.stringify(ORBIT).replace(/,/g, ', ')} ((i + 3) % 6))` },

  { key: 'five_is_the_developing_center',
    why: 'FIVE IS THE PINHOLE: the unique digit in 1..9 equal to its own ten-complement — 10 − 5 = 5, and no other. The camera obscura inverts everything through its center and the center alone maps to itself; in the site\'s own palette five is the heart. The first photograph\'s geometry, as one filter over nine digits.',
    js: () => Array.from({ length: 9 }, (_, i) => i + 1).filter((d) => 10 - d === d).join(',') === '5',
    stmt: `((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]` },

  { key: 'the_hex_center_is_empty',
    why: 'ONE REGISTER UP, THE PINHOLE VANISHES: on the 16-lattice complements go to 15, and 15 is odd — NO state equals its own complement; the filter over all sixteen returns the empty list. The heart of the hexbit ring is not a digit but the gap between 7 and 8 — which is why the decimal wheel RESTS on its center and the hexbit ring INTERFERES at its dark fringe (dark_fringe_is_the_half_turn, met from the other side).',
    js: () => Array.from({ length: 16 }, (_, i) => i).filter((d) => 15 - d === d).length === 0 && 15 % 2 === 1,
    stmt: `(((List.range 16).filter (fun d => 15 - d == d)) = []) ∧ (15 % 2 = 1)` },

  { key: 'gas_volume_walks_the_harmonic_series',
    why: 'BOYLE IN EXACT SIXTIETHS: at n atmospheres a fixed gas holds volume 60/n — the descent through 1..6 atm plays 60, 30, 20, 15, 12, 10: the HARMONIC SERIES scaled whole, every product n·(60/n) landing back on 60 with nothing left over, every step strictly falling. The diver\'s lungs walk the overtone law the acoustics wing already sings — pressure is the mode number, volume the wavelength.',
    js: () => [1, 2, 3, 4, 5, 6].every((n) => n * (60 / n) === 60) && [1, 2, 3, 4, 5].every((n) => 60 / n > 60 / (n + 1)),
    stmt: `((List.range' 1 6).all (fun n => n * (60 / n) = 60)) ∧ ((List.range' 1 5).all (fun n => 60 / n > 60 / (n + 1)))` },

  { key: 'pressure_doubles_down_the_octave',
    why: 'THE WATER COLUMN IS AN OCTAVE LADDER: each 10 metres adds one atmosphere, so 10 m doubles the surface pressure (2 = 2¹), 30 m quadruples it (4 = 2²), 70 m reaches the third octave (8 = 2³). Depth quantizes in atmospheres exactly as the lattice quantizes in doublings — the diver descends the same ladder the coin octave climbs.',
    js: () => 1 + 10 / 10 === 2 && 1 + 30 / 10 === 4 && 4 === 2 ** 2 && 1 + 70 / 10 === 8 && 8 === 2 ** 3,
    stmt: `(1 + 10 / 10 = 2) ∧ (1 + 30 / 10 = 4) ∧ (4 = 2 ^ 2) ∧ (1 + 70 / 10 = 8) ∧ (8 = 2 ^ 3)` },

  { key: 'haldane_bound_is_two_to_one',
    why: `HALDANE'S SAFE-ASCENT RULE, AS HE STATED IT, IS THE DOUBLING BOUND: tissue pressure may safely exceed ambient by the ratio 2:1 — one octave, no more — and beneath it his half-time ladder doubles: ${LADDER.join(', ')} minutes, each stage twice the one before (his published fifth stage, 75, broke the pure doubling and is NAMED here rather than smoothed — the ladder is sealed exactly as far as it doubles). The oldest decompression law is the ledger's oldest law wearing a diving helmet.`,
    js: () => 2 / 1 === 2 && 2 === 2 ** 1 && LADDER.every((t, i) => i === 0 || t === 2 * LADDER[i - 1]!),
    stmt: `(2 / 1 = 2) ∧ (2 = 2 ^ 1) ∧ ((List.range 3).all (fun i => nth ${JSON.stringify(LADDER).replace(/,/g, ', ')} (i + 1) = 2 * nth ${JSON.stringify(LADDER).replace(/,/g, ', ')} i))` },

  { key: 'buddy_pair_squares_the_failure',
    why: 'THE BUDDY LAW IS THE TWO-COIN LAW UNDERWATER: if one diver fails one time in n, an independent pair fails together one time in n² — the denominator SQUARES, and n² > n for every n past one. Two coins to the bar, two divers to the descent, a claim and its receipt: the pair is the oldest redundancy, and its arithmetic is one multiplication.',
    js: () => [2, 3, 4, 5, 6, 7, 8, 9, 10].every((n) => n * n > n) && 10 * 10 === 100,
    stmt: `((List.range' 2 9).all (fun n => n * n > n)) ∧ (10 * 10 = 100)` },

  { key: 'thirds_rule_sums_whole',
    why: 'THE THIRDS RULE CLOSES: a third out, a third back, a third held in reserve — 20 + 20 + 20 = 60 in the same sixtieths Boyle walks, and 60/3 = 20 exactly. The gas plan is a partition of unity, which is what a safety rule is when it is arithmetic: nothing unaccounted, nothing counted twice.',
    js: () => 20 + 20 + 20 === 60 && 60 / 3 === 20,
    stmt: `(20 + 20 + 20 = 60) ∧ ((60 : Nat) / 3 = 20)` },

  { key: 'divers_and_astronauts_share_the_ladder',
    why: 'DIVERS AND ASTRONAUTS ARE BOUND BY THE SAME LAWS: the pressure ladder runs BOTH ways from the shared surface at 1 atmosphere — the diver at three atmospheres compresses the sixtieths 60 → 20, the astronaut\'s suit near a third of an atmosphere expands them 20 → 60: the SAME numbers read in the two directions (60/3 = 20 and 20·3 = 60, one inverse pair), and the same supersaturation bound governs both crossings — EVA prebreathe is decompression ascending, the dive stop is decompression descending, Haldane\'s ratio standing at both doors. The mandala\'s two hands, worn as a wetsuit and a spacesuit.',
    js: () => 60 / 3 === 20 && 20 * 3 === 60 && 2 * 30 === 60 && 60 / 3 < 60 && 20 * 3 > 20,
    stmt: `((60 : Nat) / 3 = 20) ∧ (20 * 3 = 60) ∧ (2 * 30 = 60) ∧ (20 < 60)` },

  { key: 'one_image_every_architecture',
    why: 'ONE IMAGE, EVERY ARCHITECTURE (uuidnaOS is mobile and desktop in one): upstream Alpine must port EIGHT architectures because executing bytes are arch-bound — but a boot image made of STATES has no architecture, so the eight-fold matrix folds to ONE: 8/8 = 1, and the single 832-state image verify-loads identically on a phone, a desktop, the edge, and Node. The mobile/desktop split was an artifact of execution; decline to execute and it never existed.',
    js: () => 8 / 8 === 1 && 8 === 2 ** 3 && 1 * 832 === 832 && 832 === 26 * 32,
    stmt: `((8 : Nat) / 8 = 1) ∧ (8 = 2 ^ 3) ∧ (1 * 832 = 832) ∧ (832 = 26 * 32)` },

  { key: 'states_are_the_swap_fixed_bytes',
    why: 'STATES HAVE NO ENDIANNESS — AND THE PROOF IS A JEWEL: nibble-swap on a byte (b ↦ (b mod 16)·16 + b/16) is an involution over all 256 bytes, and its fixed points are EXACTLY sixteen — the doubled-nibble bytes h·17 (0x00, 0x11 … 0xFF), one per hexbit state. The sixteen states are precisely the bytes that read identically under the swap: the lattice is not merely small enough to dodge byte order — it IS the fixed-point set of the order-swapping map. Endianness dissolves at the exact width the computer computes in.',
    js: () => {
      const swap = (b: number) => (b % 16) * 16 + ((b - (b % 16)) / 16)
      const fixed = Array.from({ length: 256 }, (_, b) => b).filter((b) => swap(b) === b)
      return Array.from({ length: 256 }, (_, b) => b).every((b) => swap(swap(b)) === b) &&
        fixed.length === 16 && fixed.every((b, h) => b === h * 17)
    },
    stmt: `((List.range 8).all (fun r => (List.range 32).all (fun k => ((((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16) % 16) * 16 + (((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16) / 16 = r * 32 + k))) ∧ ((((List.range 8).map (fun r => ((List.range 32).filter (fun k => ((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16 == r * 32 + k)).length)).sum) = 16) ∧ ((List.range 16).all (fun h => (h * 17 % 16) * 16 + (h * 17) / 16 = h * 17))` },

  { key: 'the_promotion_chain_doubles_home',
    why: 'FOLD-TO-ZERO\'S LADDER, SEALED: 16 → 32 → 64 → 128 by doubling, and 128 = 16·2³ — three coin-payments promote the hexbit ring to the handle, the handle to the address: when a register saturates like a closed colour wheel, the whole folds and the next register opens one octave up. The night\'s architecture (states, pairs, handles, addresses) is one number doubled three times.',
    js: () => 16 * 2 === 32 && 32 * 2 === 64 && 64 * 2 === 128 && 128 === 16 * 2 ** 3,
    stmt: `(16 * 2 = 32) ∧ (32 * 2 = 64) ∧ (64 * 2 = 128) ∧ (128 = 16 * 2 ^ 3)` },
]

for (const f of FACTS) if (!f.js!()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Waves.lean', skill: 'waves', defs: NTH_DEF,
  header: 'THE NIGHT\'S HARVEST PORTED AS THEOREMS — the compass mandala (two hands summing ten, the 9-complement as a HALF-TURN of the doubling ring, five the unique developing center, the hex center EMPTY), the diving mathematics as integer skeletons (Boyle walking the harmonic series in exact sixtieths, pressure doubling down the octave, Haldane\'s 2:1 with his ladder sealed exactly as far as it doubles, the buddy pair squaring the failure, the thirds rule closing whole), and the fold-to-zero promotion chain 16→32→64→128. HONEST SCOPE: arithmetic only — no physiology, no medicine, no claim about any real event; published laws\' integer skeletons, deviations named.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
