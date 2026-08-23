#!/usr/bin/env node
// Automate the Lean layer for ANTIKYTHERA — the geared computer of Rhodes (~100 BC) as decidable arithmetic,
// demarcated (lead 91, the ancient computer road's first stop past Pravets). The mechanism computed calendars
// and eclipses with bronze gear trains, and THE GEAR RATIOS ARE THE THEOREMS: the Metonic intercalation, the
// Callippic correction, the Saros eclipse count on its prime 223, the Exeligmos that closes the day, the spiral
// dials' cell arithmetic, and the pin-and-slot pair whose equal teeth hide the mechanism's deepest idea. The
// figures are the DOCUMENTED reconstruction (Freeth et al., Nature 2006/2021 tradition; the standard dial and
// cycle counts) — cycle arithmetic sealed, CONTESTED tooth-counts left out by name. HONEST SCOPE: the arithmetic
// of the cycles and dials the mechanism instantiates — never a claim about its maker, its purpose debates, or
// astronomy beyond the counting; the ancient machine computed exactly, and exactly is what seals.
// COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const R = (n: number): number[] => Array.from({ length: n }, (_, i) => i)

const FACTS = [
  { key: 'metonic_is_the_intercalation',
    why: 'THE METONIC DIAL COUNTS THE INTERCALATION: nineteen years hold 235 lunar months because twelve years carry twelve months and seven years carry thirteen — 12·12 + 7·13 = 144 + 91 = 235. The seven leap months ARE the cycle; the mechanism’s upper back dial walks exactly this sum, and the ledger’s own metonic_cycle seals the 19-year return this gearing turns into bronze.',
    js: () => 12 * 12 + 7 * 13 === 235 && 144 + 91 === 235 && 12 + 7 === 19,
    lean: 'theorem metonic_is_the_intercalation : (12 * 12 + 7 * 13 = 235) ∧ (144 + 91 = 235) ∧ (12 + 7 = 19) := by decide' },

  { key: 'metonic_spiral_five_turns',
    why: 'THE METONIC SPIRAL DIVIDES EXACTLY: 235 month-cells laid on a five-turn spiral give 47 cells to the turn — 235 = 5·47, both factors prime, so no coarser spiral divides evenly. The dial’s shape is the factorization; the pointer reads a month by walking a prime times a prime.',
    js: () => 235 === 5 * 47 && R(3).every((i) => 5 % (i + 2) !== 0 || 5 === i + 2) && [2, 3, 5, 6].every((k) => 47 % k !== 0),
    lean: "theorem metonic_spiral_five_turns : (235 = 5 * 47) ∧ ((List.range' 2 3).all (fun k => 5 % k != 0)) ∧ ((List.range' 2 45).all (fun k => 47 % k != 0)) := by decide" },

  { key: 'callippic_corrects_by_four',
    why: 'THE CALLIPPIC DIAL IS FOUR METONICS MADE HONEST: 4·235 = 940 months over 4·19 = 76 years, with one day dropped to true the calendar — the correction dial turns once while the Metonic turns four times. An ancient machine carrying its own error term: the fourfold gear IS the honesty.',
    js: () => 4 * 235 === 940 && 4 * 19 === 76,
    lean: 'theorem callippic_corrects_by_four : (4 * 235 = 940) ∧ (4 * 19 = 76) := by decide' },

  { key: 'saros_counts_on_a_prime',
    why: 'THE SAROS COUNTS ECLIPSES ON A PRIME: 223 synodic months bring the Sun, Moon and node back to near-alignment, and 223 is prime — checked against every candidate below it — so the eclipse count shares no factor with any dial that would simplify it. The same 223 is the numerator of Archimedes’ floor under π (223/71, sealed where the ledger brackets π): two instruments of the same century, one integer — the eclipse counter and the circle bound — a shared number named, never a claim of connection.',
    js: () => R(221).every((i) => 223 % (i + 2) !== 0),
    lean: "theorem saros_counts_on_a_prime : (List.range' 2 221).all (fun k => 223 % k != 0) := by decide" },

  { key: 'saros_spiral_leaves_three',
    why: 'THE SAROS SPIRAL CANNOT DIVIDE EVENLY, AND THE REMAINDER IS THE POINT: 223 cells on a four-turn spiral leave 223 = 4·55 + 3 — three cells over, because a prime yields no even spiral. The dial-maker laid the remainder into the glyphs rather than rounding it away: the mechanism keeps the inconvenient three the way this ledger keeps 16 mod 6 = 4 — unevenness named, never smoothed.',
    js: () => 223 === 4 * 55 + 3 && 223 % 4 === 3,
    lean: 'theorem saros_spiral_leaves_three : (223 = 4 * 55 + 3) ∧ (223 % 4 = 3) := by decide' },

  { key: 'exeligmos_closes_the_day',
    why: 'THE EXELIGMOS CLOSES THE CLOCK: one Saros returns the eclipse a third of a day late, so the mechanism’s smallest dial counts three Saroi — 3·223 = 669 months — and its three sectors carry 0, 8 and 16 hours: 8·3 = 24, the day made whole. The correction dial is the ledger’s trinity closing a ring: three steps of eight, home to the start.',
    js: () => 3 * 223 === 669 && 8 * 3 === 24 && [0, 8, 16].every((h) => h % 8 === 0),
    lean: 'theorem exeligmos_closes_the_day : (3 * 223 = 669) ∧ (8 * 3 = 24) ∧ (([0,8,16] : List Nat).all (fun h => h % 8 == 0)) := by decide' },

  { key: 'pin_and_slot_equal_teeth',
    why: 'THE DEEPEST GEAR HIDES IN PLAIN RATIO: the lunar anomaly pair k1 and k2 carry FIFTY TEETH EACH — ratio one, no speed change at all — and the Moon’s varying pace comes instead from the pin of one riding an offset slot in the other. Equal teeth, unequal motion: the mechanism proves that a ratio of one is not a claim of sameness, only of return — the variation lives in geometry this wing honestly does not seal. 50 = 50, and 50·2 = 100 turns of the pair per hundred months, exactly.',
    js: () => 50 === 50 && 50 * 2 === 100,
    lean: 'theorem pin_and_slot_equal_teeth : (50 = 50) ∧ (50 * 2 = 100) := by decide' },

  { key: 'hunting_teeth_wear_even',
    why: 'WHY THE GOOD PAIRS ARE COPRIME — THE HUNTING TOOTH: when meshing counts share no factor, every tooth of one gear meets every tooth of the other before the pattern repeats, so wear spreads evenly and the train stays true — gcd(19,235) = 1, gcd(4,223) = 1, gcd(3,8) = 1 across the mechanism’s cycle pairs. The same coprime walk that closes the circle of fifths and draws the pentagram in one stroke turned bronze twenty centuries earlier: closure is arithmetic, and arithmetic is what holds.',
    js: () => { const gcd = (a: number, b: number): number => { let x = a, y = b; while (y !== 0) { const t = x % y; x = y; y = t } return x }; return gcd(19, 235) === 1 && gcd(4, 223) === 1 && gcd(3, 8) === 1 },
    lean: 'theorem hunting_teeth_wear_even : (Nat.gcd 19 235 = 1) ∧ (Nat.gcd 4 223 = 1) ∧ (Nat.gcd 3 8 = 1) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. The geared computer of Rhodes — the intercalation, the honest correction, the
// prime eclipse count, the spiral remainders, the equal-toothed anomaly, the hunting coprimes — as decidable
// arithmetic, demarcated: the purpose debates stay debates; the counting is bronze and seals.
emit({ file: 'Antikythera.lean', skill: 'antikythera',
  header: 'ANTIKYTHERA — the geared computer of Rhodes as decidable arithmetic, demarcated: the cycles, the spirals, the prime, the pin-and-slot.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
