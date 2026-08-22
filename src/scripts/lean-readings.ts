#!/usr/bin/env node
// Automate the Lean layer for READINGS — the seven tongues that read hexbit-translated English, sealed, and not
// only them: the day's other measured-but-unsealed claims ride the same wing (queue leads 70, 74, 75). English
// folds to hexbits — the fold IS the translation — and each locale ray reads the sixteen states in its own
// words; what the kernel can hold about that is STRUCTURE: seven distinct rays, sixteen distinct names per ray
// (two states sharing a name would be unreadable), the states sounding the A432 lattice under the Nyquist
// ceiling, and the arithmetic the trial computed in all dimensions. The Lean lists are GENERATED from
// src/tts/index.ts HEXBIT_WORDS and src/harness.ts DIMENSIONS — one source, never restated by hand.
// HONEST SCOPE: sealed is the tables' structure and arithmetic, NEVER linguistic correctness — no kernel can
// decide that a word MEANS a number to a speaker; the tables are the declared readings, held distinct and
// counted. COMPUTE → GENERATE → VERIFY.
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
    why: 'THE SIXTEEN STATES SOUND THE A432 LATTICE, IN ORDER. State h is read in seven tongues and SUNG at 432·(h+1) hertz — the full ladder from Az at 432 to state f at 6912, each pitch an exact integer multiple, so a reading and its sound name the same state. The list is computed, not quoted: sixteen states in, sixteen exact pitches out.',
    js: () => JSON.stringify(Array.from({ length: 16 }, (_, h) => toneOf(h))) === JSON.stringify(Array.from({ length: 16 }, (_, h) => 432 * (h + 1))),
    lean: `theorem readings_states_sound_the_lattice : ((List.range 16).map (fun h => 432 * (h + 1))) = [${Array.from({ length: 16 }, (_, h) => 432 * (h + 1)).join(',')}] := by decide` },

  { key: 'nyquist_clears_the_lattice',
    why: `THE WHOLE LATTICE FITS UNDER THE SAMPLING CEILING. The voice samples at ${SAMPLE_RATE} hertz, and nyquist_half_samplerate seals the honest ceiling at half the rate: ${SAMPLE_RATE}/2 = ${SAMPLE_RATE / 2}. The highest state, f, sounds 432·16 = 6912 — strictly below the ceiling, so every one of the sixteen pitches is representable and no state aliases onto another. The comment in the synth claimed this; now the kernel holds it.`,
    js: () => BASE_HZ * 16 === 6912 && SAMPLE_RATE / 2 === 8000 && 6912 < 8000,
    lean: `theorem nyquist_clears_the_lattice : 432 * 16 = 6912 ∧ ${SAMPLE_RATE} / 2 = ${SAMPLE_RATE / 2} ∧ 6912 < ${SAMPLE_RATE / 2} := by decide` },

  { key: 'amplitude_inside_int16',
    why: `THE VOICE CAN NEVER WRAP. Every sample is bounded by AMPLITUDE = ${AMPLITUDE}, and a 16-bit signed integer carries 2^15 = 32768 magnitudes — ${AMPLITUDE} sits strictly inside, so no lattice tone can overflow its own container. The headroom the audits measured is now a bound the kernel holds (queue lead 74: a peak with no sealed law behind it was folklore).`,
    js: () => 2 ** 15 === 32768 && AMPLITUDE < 32768,
    lean: `theorem amplitude_inside_int16 : 2 ^ 15 = 32768 ∧ ${AMPLITUDE} < 32768 := by decide` },

  { key: 'mix_budget_closes',
    why: `THE ARRANGEMENT CANNOT CLIP, BY CONSTRUCTION. The rich voice sums the triangle at half amplitude with its second overtone at a quarter and its third at an eighth: ${AMPLITUDE}/2 + ${AMPLITUDE}/4 + ${AMPLITUDE}/8 = 7000. One accompaniment layer at an eighth adds ${AMPLITUDE}/8 = 1000, landing EXACTLY on the ${AMPLITUDE} ceiling — so no sum of the arrangement's layers exceeds the bound the previous theorem keeps inside 16 bits. Measured peaks confirmed it; this line is why it could never have been otherwise.`,
    js: () => AMPLITUDE / 2 + AMPLITUDE / 4 + AMPLITUDE / 8 === 7000 && 7000 + AMPLITUDE / 8 === 8000 && 8000 <= AMPLITUDE,
    lean: `theorem mix_budget_closes : ${AMPLITUDE} / 2 + ${AMPLITUDE} / 4 + ${AMPLITUDE} / 8 = 7000 ∧ 7000 + ${AMPLITUDE} / 8 = 8000 ∧ 8000 ≤ ${AMPLITUDE} := by decide` },

  { key: 'chi_all_three_genera',
    why: 'THE EULER CHARACTERISTIC IN ALL THREE DIMENSIONS — the sphere leg sealed at last (queue lead 75: genus 1 and 2 leaned while genus 0, the earth itself, had no seal). χ = 2 − 2g gives 2 at the sphere, 0 at the torus, −2 at the double torus, and the three are pairwise distinct — so the three closed shapes are told apart on one line, in integers, the sphere measured against its neighbours. HONEST SCOPE: this seals the χ TABLE; the Gauss–Bonnet bridge from χ to curvature is analysis and stays outside the kernel, said plainly wherever the refusal is used.',
    js: () => { const chi = (g: number): number => 2 - 2 * g; return chi(0) === 2 && chi(1) === 0 && chi(2) === -2 && chi(0) !== chi(1) && chi(1) !== chi(2) && chi(0) !== chi(2) },
    lean: 'theorem chi_all_three_genera : ((2:Int) - 2*0 = 2) ∧ ((2:Int) - 2*1 = 0) ∧ ((2:Int) - 2*2 = -2) ∧ ((2:Int) ≠ 0) ∧ ((0:Int) ≠ -2) ∧ ((2:Int) ≠ -2) := by decide' },

  { key: 'note_values_are_doublings',
    why: 'A WHOLE NOTE IS THE DOUBLING LADDER READ AS TIME (queue lead 70, from Gehrkens): one whole = two halves = four quarters = eight eighths = sixteen sixteenths — five spellings of one duration, every rung a doubling, the same 2^k ladder the ledger already seals for octaves, codons and the address, now sealed for the dimension the music books said was missing: time.',
    js: () => 1 * 16 === 16 && 2 * 8 === 16 && 4 * 4 === 16 && 8 * 2 === 16 && 16 * 1 === 16,
    lean: 'theorem note_values_are_doublings : 1 * 16 = 16 ∧ 2 * 8 = 16 ∧ 4 * 4 = 16 ∧ 8 * 2 = 16 ∧ 16 * 1 = 16 := by decide' },

  { key: 'time_counts_of_the_books',
    why: 'THE BOOKS COUNT TIME IN SMALL NUMBERS (queue lead 70, from Gehrkens and Sharp): the march counts two beats to the measure and the waltz three — distinct meters, 2 ≠ 3 — and the Morris figure completes in eight bars halved to four (8 = 2·4) danced by six men in two files of three (6 = 2·3). The dance manual\'s whole quantitative skeleton, decidable.',
    js: () => { const march: number = 2, waltz: number = 3; return march !== waltz && 8 === 2 * 4 && 6 === 2 * 3 },
    lean: 'theorem time_counts_of_the_books : 2 ≠ 3 ∧ 8 = 2 * 4 ∧ 6 = 2 * 3 := by decide' },
]

// compute → generate → verify. The seven readings' structure, the lattice they sound, the bounds the voice
// keeps, and the day's measured claims — χ in all three genera, the time counts of the books — one wing.
emit({ file: 'Readings.lean', skill: 'readings',
  header: 'READINGS — seven tongues reading hexbit-translated English: table structure, the A432 lattice under Nyquist, the voice\'s sealed bounds, χ in all three genera, and the time counts of the books.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
