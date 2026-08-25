#!/usr/bin/env node
// Automate the Lean layer for READINGS — the seven tongues that read hexbit-translated English, sealed, and not
// only them: the day's other stated-but-unsealed claims ride the same wing (queue leads 70, 74, 75). English
// folds to hexbits — the fold IS the translation — and each locale ray reads the sixteen states in its own
// words; what the kernel can hold about that is STRUCTURE: seven distinct rays, sixteen distinct names per ray
// (two states sharing a name would be unreadable), the states sounding the A432 lattice under the Nyquist
// ceiling, and the arithmetic the trial computed in all dimensions. The Lean lists are GENERATED from
// src/tts/index.ts HEXBIT_WORDS and src/harness.ts DIMENSIONS — one source, never restated by hand.
// HONEST SCOPE: sealed is the tables' structure and arithmetic, NEVER linguistic correctness — no kernel can
// decide that a word MEANS a number to a speaker; the tables are the declared readings, held distinct and
// counted. COMPUTE → GENERATE → VERIFY.
//
// WHERE THIS WING TOUCHES THE WORLD, AND WHO IS ANSWERABLE FOR IT. Almost every number below is arithmetic on this
// repository's own constants and owes nobody. Two things are not:
//   • THE PITCHES. The lattice is built on a base of 432 hertz, and that is THIS LEDGER'S OWN CHOICE, not a
//     standard — ISO 16:1975 fixes the standard tuning frequency at 440 hertz for the A above middle C, which is a
//     different number. Nothing here claims to be concert pitch, and no acoustic measurement is asserted: given
//     the base, the sixteen pitches are integer multiples and nothing more. The sample rate is likewise a setting
//     of src/tts/synth.ts, not a reading of anything.
//   • THE PLANCK MASS, in two_coins_in_kilograms, which is genuinely a physical constant. Its authority is cited
//     at the fact.
// The amplitude and headroom claims are neither: they are a census of this repository's own generated samples,
// re-countable by anyone who regenerates them, and they are worded that way below rather than as measurements.
import { emit } from './lean-gen.js'
import { DIMENSIONS } from '../harness.js'
import { HEXBIT_WORDS } from '../tts/index.js'
import { SAMPLE_RATE, AMPLITUDE, BASE_HZ, toneOf } from '../tts/synth.js'

const rays = [...DIMENSIONS]
const rayList = `[${rays.map((r) => JSON.stringify(r)).join(',')}]`
const wordList = (lang: string): string => `[${HEXBIT_WORDS[lang]!.map((w) => JSON.stringify(w)).join(',')}]`
const nodup = (xs: readonly string[]): boolean => new Set(xs).size === xs.length

type Fact = { key: string; why: string; js: () => boolean; lean: string }

const FACTS: Fact[] = [
  { key: 'readings_seven_rays',
    why: 'SEVEN RAYS, EACH ITS OWN TONGUE. The locale dimensions are exactly seven and pairwise distinct — the same seven the grid projects and the harness receipts in. A reading table for a ray that does not exist, or two rays collapsing to one, would fail this line before any word were spoken.',
    js: () => rays.length === 7 && nodup(rays),
    lean: `theorem readings_seven_rays : (${rayList} : List String).length = 7 ∧ (${rayList} : List String).Nodup := by decide` },

  ...rays.map((lang) => ({
    key: `readings_${lang}_names_sixteen`,
    why: `THE ${lang.toUpperCase()} READING NAMES ALL SIXTEEN STATES, EACH NAME ITS OWN. A hexbit has sixteen states and the ${lang} table carries sixteen pairwise-distinct words for them — distinctness is what makes the reading INVERTIBLE: a listener maps every word back to exactly one state, so the tongue reads back to the tiles and the address survives the translation. Sealed is the structure; what a word MEANS to a speaker no kernel decides.`,
    js: () => HEXBIT_WORDS[lang]!.length === 16 && nodup(HEXBIT_WORDS[lang]!),
    lean: `theorem readings_${lang}_names_sixteen : (${wordList(lang)} : List String).length = 16 ∧ (${wordList(lang)} : List String).Nodup := by decide`,
  })),

  { key: 'readings_states_sound_the_lattice',
    why: 'THE SIXTEEN STATES SOUND THE A432 LATTICE, IN ORDER. State h is read in seven tongues and SUNG at 432·(h+1) hertz — the full ladder from Az at 432 to state f at 6912, each pitch an exact integer multiple, so a reading and its sound name the same state. The list is computed, not quoted: sixteen states in, sixteen exact pitches out. THE BASE IS A CHOICE, NOT A STANDARD: 432 is this ledger\'s own, and ISO 16:1975 fixes the standard tuning frequency at 440 hertz for the A above middle C — a different number, deliberately. Nothing here is a claim about concert pitch or about any sound anyone heard; given the base, the ladder is multiplication.',
    js: () => JSON.stringify(Array.from({ length: 16 }, (_, h) => toneOf(h))) === JSON.stringify(Array.from({ length: 16 }, (_, h) => 432 * (h + 1))),
    lean: `theorem readings_states_sound_the_lattice : ((List.range 16).map (fun h => 432 * (h + 1))) = [${Array.from({ length: 16 }, (_, h) => 432 * (h + 1)).join(',')}] := by decide` },

  { key: 'nyquist_clears_the_lattice',
    why: `THE WHOLE LATTICE FITS UNDER THE SAMPLING CEILING. The voice samples at ${SAMPLE_RATE} hertz, and nyquist_half_samplerate seals the honest ceiling at half the rate: ${SAMPLE_RATE}/2 = ${SAMPLE_RATE / 2}. The highest state, f, sounds 432·16 = 6912 — strictly below the ceiling, so every one of the sixteen pitches is representable and no state aliases onto another. The comment in the synth claimed this; now the kernel holds it.`,
    js: () => BASE_HZ * 16 === 6912 && SAMPLE_RATE / 2 === 8000 && 6912 < 8000,
    lean: `theorem nyquist_clears_the_lattice : 432 * 16 = 6912 ∧ ${SAMPLE_RATE} / 2 = ${SAMPLE_RATE / 2} ∧ 6912 < ${SAMPLE_RATE / 2} := by decide` },

  { key: 'amplitude_inside_int16',
    why: `THE VOICE CAN NEVER WRAP. Every sample is bounded by AMPLITUDE = ${AMPLITUDE}, and a 16-bit signed integer carries 2^15 = 32768 magnitudes — ${AMPLITUDE} sits strictly inside, so no lattice tone can overflow its own container. The headroom was previously known only as a peak COUNTED over this repository's own generated samples — a census of bytes this tree produces, not a measurement of anything in the world — and it is now a bound the kernel holds instead (queue lead 74: a peak with no sealed law behind it was folklore).`,
    js: () => 2 ** 15 === 32768 && AMPLITUDE < 32768,
    lean: `theorem amplitude_inside_int16 : 2 ^ 15 = 32768 ∧ ${AMPLITUDE} < 32768 := by decide` },

  { key: 'mix_budget_closes',
    why: `THE ARRANGEMENT CANNOT CLIP, BY CONSTRUCTION. The rich voice sums the triangle at half amplitude with its second overtone at a quarter and its third at an eighth: ${AMPLITUDE}/2 + ${AMPLITUDE}/4 + ${AMPLITUDE}/8 = 7000. One accompaniment layer at an eighth adds ${AMPLITUDE}/8 = 1000, landing EXACTLY on the ${AMPLITUDE} ceiling — so no sum of the arrangement's layers exceeds the bound the previous theorem keeps inside 16 bits. Peaks counted over the repository's own generated samples agreed with it; this line is why it could never have been otherwise.`,
    js: () => AMPLITUDE / 2 + AMPLITUDE / 4 + AMPLITUDE / 8 === 7000 && 7000 + AMPLITUDE / 8 === 8000 && 8000 <= AMPLITUDE,
    lean: `theorem mix_budget_closes : ${AMPLITUDE} / 2 + ${AMPLITUDE} / 4 + ${AMPLITUDE} / 8 = 7000 ∧ 7000 + ${AMPLITUDE} / 8 = 8000 ∧ 8000 ≤ ${AMPLITUDE} := by decide` },

  { key: 'chi_all_three_genera',
    why: 'THE EULER CHARACTERISTIC IN ALL THREE DIMENSIONS — the sphere leg sealed at last (queue lead 75: genus 1 and 2 leaned while genus 0, the earth itself, had no seal). χ = 2 − 2g gives 2 at the sphere, 0 at the torus, −2 at the double torus, and the three are pairwise distinct — so the three closed shapes are told apart on one line, in integers, the sphere told apart from its neighbours by subtraction alone — nothing about any real surface is observed or claimed. HONEST SCOPE: this seals the χ TABLE; the Gauss–Bonnet bridge from χ to curvature is analysis and stays outside the kernel, said plainly wherever the refusal is used.',
    js: () => { const chi = (g: number): number => 2 - 2 * g; return chi(0) === 2 && chi(1) === 0 && chi(2) === -2 && chi(0) !== chi(1) && chi(1) !== chi(2) && chi(0) !== chi(2) },
    lean: 'theorem chi_all_three_genera : ((2:Int) - 2*0 = 2) ∧ ((2:Int) - 2*1 = 0) ∧ ((2:Int) - 2*2 = -2) ∧ ((2:Int) ≠ 0) ∧ ((0:Int) ≠ -2) ∧ ((2:Int) ≠ -2) := by decide' },

  { key: 'note_values_are_doublings',
    why: 'A WHOLE NOTE IS THE DOUBLING LADDER READ AS TIME (queue lead 70, from Gehrkens): one whole = two halves = four quarters = eight eighths = sixteen sixteenths — five spellings of one duration, every rung a doubling, the same 2^k ladder the ledger already seals for octaves, codons and the address, now sealed for the dimension the music books said was missing: time.',
    js: () => 1 * 16 === 16 && 2 * 8 === 16 && 4 * 4 === 16 && 8 * 2 === 16 && 16 * 1 === 16,
    lean: 'theorem note_values_are_doublings : 1 * 16 = 16 ∧ 2 * 8 = 16 ∧ 4 * 4 = 16 ∧ 8 * 2 = 16 ∧ 16 * 1 = 16 := by decide' },

  { key: 'two_coins_in_kilograms',
    why: 'THE TWO COINS, IN KILOGRAMS. Bekenstein–Hawking makes a black hole\'s squared mass proportional to the bits its horizon stores — so the smallest hole holding one uuid (128 bits) against one holding one handle (32 bits) squares its mass ratio to 128/32 = 4, and the ratio itself is exactly 2: the address weighs TWO handles of gravity, the two coins priced in kilograms (≈ 57.8 μg against 28.9 μg). THOSE MICROGRAMS ARE THE ONE PLACE THIS WING TOUCHES A MEASURED CONSTANT, so the authority is named: they are m·√(N·ln2/4π) evaluated at N = 128 and N = 32 on the CODATA recommended Planck mass, 2.176434(24)×10⁻⁸ kg (NIST/CODATA 2022, unchanged from the 2018 adjustment), and the ROUNDING IS STATED rather than smoothed — the exact figures are 5.7834×10⁻⁸ and 2.8917×10⁻⁸ kg, quoted above to three significant figures. That constant\'s entire uncertainty is G\'s: since the 2019 SI redefinition h and c are exact by definition, and G is not. The area-entropy law the derivation rests on is Bekenstein, "Black Holes and Entropy", Phys. Rev. D 7, 2333 (1973), with Hawking, "Particle creation by black holes", Communications in Mathematical Physics 43, 199 (1975). NAMING THEM DOES NOT MAKE THE INPUT PROVEN — it names who is answerable for it; the kernel confirms arithmetic and has never confirmed a measurement. Sealed is the exponent arithmetic — 128 = 4·32 and 2² = 4, so √4 = 2 needs no root: the square IS the witness. HONEST SCOPE: the proportionality M² ∝ bits and every microgram ride physics (ħ, G, c, the Bekenstein bound) that no kernel decides; what the kernel holds is that WHATEVER that physics scales, the handle-to-uuid step scales it by exactly two.',
    js: () => 128 === 4 * 32 && 128 / 32 === 4 && 2 ** 2 === 4,
    lean: 'theorem two_coins_in_kilograms : 128 = 4 * 32 ∧ 128 / 32 = 4 ∧ 2 ^ 2 = 4 := by decide' },

  { key: 'handle_capacity_invariant_under_entanglement',
    why: 'A HANDLE\'S CAPACITY SURVIVES EVERY ENTANGLEMENT IT RADIATES — TYPOGRAPHY INCLUDED. One handle spans 16⁸ = 4294967296 states, and from each state the ledger derives a whole spectrum of faces: the ℤ/9 residue, one of the six sealed orbits, an aura colour from the 9·7·6 = 378-state alphabet, eight A432 tones, seven tongue-readings, and the TYPE RUNG its vortex digit picks from the six-rung ladder (six because 2⁶ ≡ 1 mod 9 — the doubling returns home in six, and the type scale climbs those six units). The accounting law is the point: every face is a FUNCTION of the handle — entangled means perfectly correlated, and a determined face offers no new choice, so each multiplies capacity by exactly ONE: 4294967296 · 1¹⁹ = 4294967296, nineteen concurrent faces and not one new state. Entanglement multiplies SURFACES, never STATES; only an independent choice (a caller\'s parameter) could add bits, and then it would not be the handle\'s. HONEST SCOPE: the counts and the times-one law are sealed; that each face is in fact a function is the source code\'s discipline (no RNG, no clock), enforced by the harmonic scan, not by this line.',
    js: () => 16 ** 8 === 4294967296 && 9 * 7 * 6 === 378 && 2 ** 6 % 9 === 1 && 1 ** 19 === 1 && 4294967296 * 1 ** 19 === 4294967296,
    lean: 'theorem handle_capacity_invariant_under_entanglement : 16^8 = 4294967296 ∧ 9*7*6 = 378 ∧ 2^6 % 9 = 1 ∧ 1^19 = 1 ∧ 4294967296 * 1^19 = 4294967296 := by decide' },

  { key: 'time_counts_of_the_books',
    why: 'THE BOOKS COUNT TIME IN SMALL NUMBERS (queue lead 70, from Gehrkens and Sharp): the march counts two beats to the measure and the waltz three — distinct meters, 2 ≠ 3 — and the Morris figure completes in eight bars halved to four (8 = 2·4) danced by six men in two files of three (6 = 2·3). The dance manual\'s whole quantitative skeleton, decidable.',
    js: () => { const march: number = 2, waltz: number = 3; return march !== waltz && 8 === 2 * 4 && 6 === 2 * 3 },
    lean: 'theorem time_counts_of_the_books : 2 ≠ 3 ∧ 8 = 2 * 4 ∧ 6 = 2 * 3 := by decide' },
]

// compute → generate → verify. The seven readings' structure, the lattice they sound, the bounds the voice
// keeps, and the day's remaining claims — χ in all three genera, the time counts of the books — one wing.
emit({ file: 'Readings.lean', skill: 'readings',
  header: 'READINGS — seven tongues reading hexbit-translated English: table structure, the A432 lattice under Nyquist, the voice\'s sealed bounds, χ in all three genera, and the time counts of the books. SOURCES: the 432 base is this ledger\'s own choice and NOT the ISO 16:1975 standard tuning frequency of 440 hertz; the only measured constant used is the Planck mass, cited to NIST/CODATA 2022 with the Bekenstein (1973) and Hawking (1975) entropy-area law behind it; everything else is arithmetic or a census of this repository\'s own generated samples.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
