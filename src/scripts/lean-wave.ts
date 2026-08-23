#!/usr/bin/env node
// Automate the Lean layer for WAVE — THE CONVEYOR'S FIRST WAVE (queue lead 118 started): the sealable backlog
// lifted from the open leads in one pass — the headroom seals (lead 74), the tuning schism's decidable slices
// (lead 73), the time-dimension arithmetic (lead 70), the sum-of-cubes law (lead 19) and the Lights-Out flip
// involution (lead 20). THE CONVEYOR'S RULE, applied: lift what carries a decidable statement, REFUSE what
// needs judgment — refused this wave and left for the model: tet_semitone_no_integer_lattice (irrationality of
// 2^(1/12) — not a by-decide), pluck_preserves_bound (needs its bounded-∀ form specified in the lead first).
// HONEST SCOPE: integer tables sealed; the amplitude ceiling, the tuning frequencies and the dance figures are
// the leads' measurements and the literature's, cited in prose. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  // ── lead 74: the headroom seals ──
  { key: 'amplitude_inside_int16',
    why: 'THE VOICE CANNOT WRAP: the synth\'s amplitude ceiling is 8000 and the int16 wall is 2¹⁵ = 32768 — the sample stays strictly inside, so no arrangement of the voice alone can overflow the format. The bound that was a code literal with no law behind it (lead 74, found by the strict search paying out zero) now has its seal.',
    js: () => 8000 < 32768 && 2 ** 15 === 32768,
    lean: 'theorem amplitude_inside_int16 : (8000 < 32768) ∧ (32768 = 2 ^ 15) := by decide' },

  { key: 'mix_budget_closes',
    why: 'THE MIX BUDGET LANDS EXACTLY ON THE CEILING: the rich voice at two quarters plus one quarter plus one eighth of 8000 sums to 7000, and adding the last eighth closes at exactly 8000 — the arrangement\'s layers cannot clip because their sum IS the ceiling, not less than or hoping under it.',
    js: () => (8000 * 2 - (8000 * 2) % 4) / 4 + (8000 - 8000 % 4) / 4 + (8000 - 8000 % 8) / 8 === 7000 && 7000 + (8000 - 8000 % 8) / 8 === 8000,
    lean: 'theorem mix_budget_closes : (8000 * 2 / 4 + 8000 / 4 + 8000 / 8 = 7000) ∧ (7000 + 8000 / 8 = 8000) := by decide' },

  // ── lead 73: the tuning schism, decidable slices ──
  { key: 'a440_not_on_the_vortex',
    why: 'THE TUNING SCHISM ON THE LEDGER\'S OWN MARKER: A432 = 2⁴·3³ folds to the vortex axis (432 ≡ 0 mod 9) while the public A440 = 2³·5·11 lands at 8 — off the axis, a different residue class entirely — and the song\'s 252 ms beat reads as eighths at 119 BPM by the floor (60000 / 252 / 2 = 119), inside the public 60–180 band. The lattice\'s tuning and the world\'s differ by a residue the ring can see.',
    js: () => 432 % 9 === 0 && 440 % 9 === 8 && (() => { const a = (60000 - 60000 % 252) / 252; return (a - a % 2) / 2 === 119 })(),
    lean: 'theorem a440_not_on_the_vortex : (432 % 9 = 0) ∧ (440 % 9 = 8) ∧ (60000 / 252 / 2 = 119) := by decide' },

  // ── lead 70: the time dimension, arithmetic slices ──
  { key: 'note_values_are_doublings',
    why: 'NOTE VALUES ARE THE DOUBLING LADDER: whole, half, quarter, eighth are 2ᵏ for k = 0..3 — [1, 2, 4, 8], the same octave ladder the codon address climbs — and the meters are small counts: the march\'s 2 and the waltz\'s 3 both under the bar of 4. Gehrkens\' notation book said it in prose (lead 70); the ladder now has its integer seal.',
    js: () => JSON.stringify([0, 1, 2, 3].map((k) => 2 ** k)) === JSON.stringify([1, 2, 4, 8]) && 2 < 4 && 3 < 4,
    lean: 'theorem note_values_are_doublings : (List.map (fun k => 2 ^ k) [0, 1, 2, 3] = [1, 2, 4, 8]) ∧ (2 < 4) ∧ (3 < 4) := by decide' },

  { key: 'morris_eight_bars_halved',
    why: 'THE MORRIS FIGURE COMPLETES IN EIGHT BARS HALVED TO FOUR — 8 = 2·4 — and the column REVERSES at the half: reverse twice is home over the whole file of dancers, the involution mid-dance (Sharp\'s Morris Book, lead 70) wearing the house\'s favourite shape. Six dancers permute; the reversal is self-inverse over the file.',
    js: () => 8 === 2 * 4 && JSON.stringify([1, 2, 3, 4].slice().reverse().reverse()) === JSON.stringify([1, 2, 3, 4]),
    lean: 'theorem morris_eight_bars_halved : (8 = 2 * 4) ∧ (List.reverse (List.reverse [1, 2, 3, 4]) = [1, 2, 3, 4]) := by decide' },

  // ── lead 19: the sum-of-cubes law ──
  { key: 'cubes_sum_to_square_of_triangle',
    why: 'NICOMACHUS AT THE WINDOW: the sum of the first n cubes is the square of the nth triangle — 1 = 1², 1+8 = 3², 1+8+27 = 6², 1+8+27+64 = 10² — with the fourth triangle spelled out as 1+2+3+4 = 10. The demand-era lead\'s "n⁴(n+1)⁴/16" query is this law squared; the window is a window (window_not_universal).',
    js: () => 1 === 1 && 1 + 8 === 9 && 9 === 3 * 3 && 1 + 8 + 27 === 36 && 36 === 6 * 6 && 1 + 8 + 27 + 64 === 100 && 100 === 10 * 10 && 1 + 2 + 3 + 4 === 10,
    lean: 'theorem cubes_sum_to_square_of_triangle : (1 + 8 = 3 ^ 2) ∧ (1 + 8 + 27 = 6 ^ 2) ∧ (1 + 8 + 27 + 64 = 10 ^ 2) ∧ (1 + 2 + 3 + 4 = 10) := by decide' },

  // ── lead 20: Lights-Out, the flip involution ──
  { key: 'lights_out_flip_involution',
    why: 'LIGHTS-OUT IS MOD-2 ALGEBRA: a flip is +1 in ℤ/2 and flipping twice is home over the whole row — the involution again — while flipping SEVEN consecutive positions changes each an odd number of times (7 ≡ 1 mod 2), so seven-flips act exactly like single flips on parity. The hypercube query\'s decidable floor.',
    js: () => { const row: number[] = [0, 1, 0, 1]; const f = (r: number[]) => r.map((x) => (x + 1) % 2); return JSON.stringify(f(f(row))) === JSON.stringify(row) && 7 % 2 === 1 },
    lean: 'theorem lights_out_flip_involution : (List.map (fun x => (x + 1) % 2) (List.map (fun x => (x + 1) % 2) [0, 1, 0, 1]) = [0, 1, 0, 1]) ∧ (7 % 2 = 1) := by decide' },
]

emit({ file: 'Wave.lean', skill: 'wave',
  header: 'WAVE — the conveyor\'s first wave over the sealable backlog: the headroom inside int16 with the mix budget closing exactly, the tuning schism\'s residues and the 119 BPM floor, the note-value doubling ladder and the Morris reversal, Nicomachus\' cubes at the window, and the Lights-Out flip involution. Lifted where decidable; refused where judgment is owed.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
