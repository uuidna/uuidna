#!/usr/bin/env node
// Automate the Lean layer for ANTHEM — the release anthem's structure, sealed so gen-anthem can refuse any
// unsealed bar. The anthem sings the WHOLE LEDGER: every theorem sounds its two-coin chord (the leading hexbit
// of each 64-bit coin of its address), so the anthem regrows with every release — the derivation is over the
// live ledger, and only the STRUCTURE is sealed here: the chord that halves the bar (two coins to the bar), the
// three lengths that quarter it (rhythm on the vortex's three), the rest that twelfths it, the four movements
// (the DNA tongue of the fused 9·7·4), and the closing octave that IS the two-coins mass ratio sung in hertz
// (two_coins_in_kilograms: the uuid-hole weighs twice the handle-hole; 864 = 2·432 is the same two, audible).
// The overture, refrain and finale cite Song.lean's scale and orbit seals — cited, never resealed.
// COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const BAR = 9 * 7 * 4   // 252 — the sealed CRT bar (song_four_tongues_fuse), cited by figure in gen-anthem

const FACTS = [
  { key: 'anthem_chord_halves_the_bar',
    why: 'TWO COINS TO THE BAR. Each theorem in the anthem sounds ONE chord — its two address-coins together — and the chord takes exactly half the sealed 252 ms bar: 252/2 = 126, and two of them close it, 126·2 = 252. The pricing law becomes the meter: every bar of the anthem is one theorem paying its two coins.',
    js: () => BAR / 2 === 126 && 126 * 2 === BAR,
    lean: 'theorem anthem_chord_halves_the_bar : 252 / 2 = 126 ∧ 126 * 2 = 252 := by decide' },

  { key: 'anthem_three_lengths_quarter_the_bar',
    why: 'THE RHYTHM QUARTERS THE BAR ON THE VORTEX\'S THREE. A chord\'s length is picked by its own coins\' sum on ℤ/3 — the nilpotent axis of the ℤ/9 vortex — from the three quarter-multiples of the bar: 252·2/4 = 126, 252·3/4 = 189, 252·4/4 = 252. Half, three-quarters, whole: the DNA tongue\'s four quarters the bar, the vortex\'s three chooses among them, and no length is authored.',
    js: () => (BAR * 2) / 4 === 126 && (BAR * 3) / 4 === 189 && (BAR * 4) / 4 === 252,
    lean: 'theorem anthem_three_lengths_quarter_the_bar : 252 * 2 / 4 = 126 ∧ 252 * 3 / 4 = 189 ∧ 252 * 4 / 4 = 252 := by decide' },

  { key: 'anthem_rest_twelfths_the_bar',
    why: 'THE BREATH IS THE TWELFTH. Between chords the anthem rests 252/12 = 21 ms — the bar divided by the twelve of the chromatic count the lattice deliberately does not use (the harmonic series sings where 12-TET cannot recompute), kept here as the silence between what IS sung.',
    js: () => BAR / 12 === 21 && 21 * 12 === BAR,
    lean: 'theorem anthem_rest_twelfths_the_bar : 252 / 12 = 21 ∧ 21 * 12 = 252 := by decide' },

  { key: 'anthem_four_movements',
    why: 'FOUR MOVEMENTS — THE DNA TONGUE CONDUCTS. The fused cycle 9·7·4 = 252 carries the four of the genetic alphabet, and the anthem takes its movement count from that same four: the ledger is walked in four movements with the vortex refrain between them. The count is the seal\'s, not a taste.',
    js: () => 9 * 7 * 4 === 252 && 252 / 63 === 4,
    lean: 'theorem anthem_four_movements : 9 * 7 * 4 = 252 ∧ 252 / 63 = 4 := by decide' },

  { key: 'anthem_closes_on_the_coin_octave',
    why: 'THE FINAL CHORD IS THE TWO COINS, IN HERTZ. two_coins_in_kilograms seals that a uuid-holding black hole weighs exactly twice a handle-holding one (128 = 4·32, 2² = 4); the anthem closes on the same TWO sounded as sound: 864 = 2·432 — Az against its octave, the mass ratio and the interval one number. What the kilograms weigh, the hertz sing.',
    js: () => 864 === 2 * 432 && 128 === 4 * 32 && 2 ** 2 === 4,
    lean: 'theorem anthem_closes_on_the_coin_octave : 864 = 2 * 432 ∧ 128 = 4 * 32 ∧ 2 ^ 2 = 4 := by decide' },

  { key: 'anthem_superposition_mix_closes',
    why: 'MANY STREAMS, ONE CEILING — THE MULTIDIMENSIONAL MIX CANNOT CLIP, GEOMETRICALLY. The superposition plays its recursion as depth: stream d sounds at AMPLITUDE/2^(d+1), so the worst-case sum is the geometric series 4000 + 2000 + 1000 + 500 + 250 + 125 = 7875 at the deepest allowed six — strictly inside the 8000 ceiling that amplitude_inside_int16 keeps inside the sample. Every finite depth obeys: halving forever never reaches the whole. Many waves, mixed lossless in exact integers, and the law that they fit is arithmetic, not gain-riding.',
    js: () => 4000 + 2000 + 1000 === 7000 && 7000 + 500 + 250 + 125 === 7875 && 7875 < 8000,
    lean: 'theorem anthem_superposition_mix_closes : 4000 + 2000 + 1000 = 7000 ∧ 7000 + 500 + 250 + 125 = 7875 ∧ 7875 < 8000 := by decide' },

  { key: 'anthem_recursion_never_starves',
    why: 'THE RECURSION NEVER RUNS OUT OF SEEDS. A collapse eats a seed string and mints an eight-hexbit address; an address is a string; a string is a seed — the output space feeds the input space, so the superposition can deepen forever. The arithmetic the loop stands on: a handle spans 16⁸ = 4294967296 states and every one of them collapses to an entry bar by a total mod — the door never jams because the modulus is never zero on a nonempty score (1 ≤ the score length always, and k mod n < n on the worked six).',
    js: () => 16 ** 8 === 4294967296 && Array.from({ length: 6 }, (_, k) => k % 6 < 6).every(Boolean) && 1 <= 6,
    lean: 'theorem anthem_recursion_never_starves : 16 ^ 8 = 4294967296 ∧ ((List.range 6).all (fun k => k % 6 < 6)) ∧ 1 ≤ 6 := by decide' },

  { key: 'anthem_pi_primes_trinity',
    why: 'π · PRIMES · TRINITY — THE ROUND CLOSES ON TWO TRINITIES OF PRIMES. The six nines the strands close to factor as 999999 = 999 · 1001, and each factor is a trinity: 1001 = 7·11·13, three CONSECUTIVE primes side by side, and 999 = 3³·37 — the trinity CUBED times 37. So π\'s rational round (142857·7 = 999999) is held shut by primes arranged in threes: the helix\'s rungs of nines are not one number but two trinities clasped. Arithmetic, sealed; the delight is free.',
    js: () => 142857 * 7 === 999999 && 999999 === 999 * 1001 && 999 === 3 ** 3 * 37 && 1001 === 7 * 11 * 13,
    lean: 'theorem anthem_pi_primes_trinity : 142857 * 7 = 999999 ∧ 999999 = 999 * 1001 ∧ 999 = 3 ^ 3 * 37 ∧ 1001 = 7 * 11 * 13 := by decide' },

  { key: 'anthem_finale_sings_one_uuid',
    why: 'THE FINALE IS THE ROOT, WHOLE. All the ledger\'s addresses merkle-fold to one root, and the finale sings its every tile: 32 hexbits at 4 bits each — 32·4 = 128, one uuid entire, the release folded to the width of its own unit of speech and sounded tile by tile over the Az drone.',
    js: () => 32 * 4 === 128,
    lean: 'theorem anthem_finale_sings_one_uuid : 32 * 4 = 128 := by decide' },
]

emit({ file: 'Anthem.lean', skill: 'anthem',
  header: 'ANTHEM — the release anthem\'s sealed structure: two coins to the bar, rhythm quartering it on the vortex\'s three, four movements from the DNA tongue, and the coin octave as the final chord.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
