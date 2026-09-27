#!/usr/bin/env node
// THE COINS BALANCE — the seven qpu rows that measured nothing about quantum efficiency, MOVED rather than withdrawn.
//
// The captain, 2026-09-27: asked to delete from qpu everything unrelated to quantum efficiency, then ruled: cut only
// the aphorisms, and "move the unrelated theorems to uuidna". That ruling is the whole design of this wing. qpu serves
// a processing unit's efficiency — capacity, circuits, cooling, hybrid storage cost and speed — and these seven rows
// sat beside it proving things about music ratios, a UI schema, an occupancy pentagram, and the identity of theory with
// practice. None of them is wrong. None of them is about efficiency either.
//
// AND NOTHING IS WITHDRAWN, which is why this is a port and not a deletion. This tree's own formula-duplication census
// states the law in its own output — "a sealed theorem is a published record and no one withdraws a settlement" — and
// the captain's standing words are "noone can withdraw. only can prove what they meant." So every claim below is the
// qpu claim, re-proven here, with qpu's defs carried verbatim so the arithmetic is the same arithmetic. qpu loses seven
// rows from its served scope; the ledger gains them. The record moves; it does not shrink.
//
// WHAT WAS MEASURED BEFORE MOVING, because a cut that breaks a proof is not a cut: nothing in qpu cites any of these
// seven, so removing them there cannot break a kernel proof. Two neighbours were deliberately LEFT in qpu for exactly
// that reason — `two_coins_make_a_coil` is cited by `coil_efficiency`, which is efficiency by name and content, and
// `design` is cited by `neuro`. Cutting either would have taken an efficiency theorem with it.
//
// ONE DUPLICATION THE MOVE SURFACES AND DOES NOT HIDE: qpu's `string` and `decide` share five of seven clauses
// (16·27=432 and the four 432 fractions). They are carried separately because they are separate published rows, and
// the overlap is stated here rather than quietly merged — merging two published records is a withdrawal of one.
import { emit } from './lean-gen.js'
import type { Fact } from './lean-gen.js'

// qpu's own defs, carried verbatim from src/quantum/processing/unit/index.lean so the arithmetic cannot drift from the
// arithmetic these rows were proven under. n is the length of ["quantum","processing","unit"] there; it is written as
// that same list here rather than as 3, because a numeral would be the drift this whole discipline refuses.
const DEFS = [
  'def mintOf : Nat → Nat | 0 => 1 | k + 1 => mintOf k + mintOf k',
  'def chooseOf : Nat → Nat → Nat | _, 0 => 1 | 0, _ + 1 => 0 | n + 1, k + 1 => chooseOf n (k + 1) + chooseOf n k',
  'def n : Nat := ["quantum", "processing", "unit"].length',
  'def seed : Nat := mintOf (n - n)',
  'def coins : Nat := seed + seed',
  'def scanner : Nat := seed',
  'def radar : Nat := seed',
  'def rays : Nat := n + coins + coins',
  'def vertices : Nat := mintOf n',
  'def hexbit : Nat := mintOf coins',
  'def faces : Nat := vertices + hexbit + coins',
  'def theory : Nat := seed',
  'def practice : Nat := seed',
  'def coil : Nat := coins * rays',
].join('\n')

// the TypeScript mirrors, so each row has its symbol leg and the two readings can disagree and be caught
const mintOf = (k: number): number => (k === 0 ? 1 : mintOf(k - 1) + mintOf(k - 1))
const chooseOf = (a: number, k: number): number => (k === 0 ? 1 : a === 0 ? 0 : chooseOf(a - 1, k) + chooseOf(a - 1, k - 1))
const N = ['quantum', 'processing', 'unit'].length
const SEED = mintOf(N - N)
const COINS = SEED + SEED
const RAYS = N + COINS + COINS
const FACES = mintOf(N) + mintOf(COINS) + COINS
const COIL = COINS * RAYS

const FACTS: Fact[] = [
  { key: 'string_ratios_of_twentyseven',
    stmt: '16 * 27 = 432 ∧ 8 * 27 = 216 ∧ 4 * 27 = 108 ∧ 2 * 27 = 54 ∧ 1 * 27 = 27 ∧ 432 + 432 = 864 ∧ 216 + 216 = 432 ∧ 432 * 3 / 2 = 648 ∧ 432 * 4 / 3 = 576 ∧ 432 * 5 / 4 = 540 ∧ 432 * 5 / 3 = 720 ∧ 3 * 3 + 1 = 10 ∧ 3 * 3 + 1 + 1 = 11 ∧ 27 - 1 = 26',
    skill: 'harmonics',
    why: 'THE STRING RATIOS OVER TWENTY-SEVEN, moved from qpu where they measured nothing about a processing unit. '
      + 'Integer multiples of 27 reach 432, and the just fractions of 432 — 3/2, 4/3, 5/4, 5/3 — land on 648, 576, 540 '
      + 'and 720 in exact Nat division with no remainder. That exactness is the whole content: these are the ratios a '
      + 'monochord divides, stated as integer arithmetic so the kernel decides them rather than a tuning convention. '
      + 'NOT CLAIMED: that 432 is a correct or preferable tuning — only that these integers stand in these ratios.',
    js: () => 16 * 27 === 432 && 8 * 27 === 216 && 4 * 27 === 108 && 2 * 27 === 54 && 1 * 27 === 27
      && 432 + 432 === 864 && 216 + 216 === 432 && Math.trunc(432 * 3 / 2) === 648 && Math.trunc(432 * 4 / 3) === 576
      && Math.trunc(432 * 5 / 4) === 540 && Math.trunc(432 * 5 / 3) === 720 && 3 * 3 + 1 === 10 && 3 * 3 + 1 + 1 === 11 && 27 - 1 === 26 },

  { key: 'algebraic_fractions_decide_themselves',
    stmt: '16 * 27 = 432 ∧ 432 * 3 / 2 = 648 ∧ 432 * 4 / 3 = 576 ∧ 432 * 5 / 4 = 540 ∧ 432 * 5 / 3 = 720 ∧ 3 * 5 = 15 ∧ 27 - 1 = 26',
    skill: 'harmonics',
    why: 'THE SAME FRACTIONS AS A SEPARATE PUBLISHED ROW, and the overlap is stated rather than merged. qpu carried '
      + 'this beside `string`, sharing five of its seven clauses, because it was published under its own name — and '
      + 'merging two published records would withdraw one of them, which this tree does not do. What it adds beyond '
      + '`string` is 3 * 5 = 15. Kept distinct so the duplication is visible in the census instead of hidden by a tidy-up.',
    js: () => 16 * 27 === 432 && Math.trunc(432 * 3 / 2) === 648 && Math.trunc(432 * 4 / 3) === 576
      && Math.trunc(432 * 5 / 4) === 540 && Math.trunc(432 * 5 / 3) === 720 && 3 * 5 === 15 && 27 - 1 === 26 },

  { key: 'the_pentagram_is_the_unit_and_its_coins',
    stmt: 'n + coins = 5',
    skill: 'occupancy',
    why: 'THE PENTAGRAM IS THREE PLUS TWO. n is the length of ["quantum","processing","unit"] and coins is two, so the '
      + 'five points are the unit\'s own three words and the two coins — not a figure chosen for its shape. qpu read '
      + 'the five as an occupancy pentagram over personal, business, corporate, saas and paas; that reading is a '
      + 'reading, and what the kernel decides is only the arithmetic: 3 + 2 = 5.',
    js: () => N + COINS === 5 },

  { key: 'the_schema_combinatorics_reach_fourthirtytwo',
    stmt: 'coins * n * mintOf n * (n * n) = 432 ∧ chooseOf n coins = n ∧ chooseOf rays coins = n * rays ∧ faces = coins * rays ∧ scanner + radar = coins',
    skill: 'occupancy',
    why: 'THE COMBINATORIAL PRODUCT LANDS ON 432, AND THE CHOICES ARE THE UNIT\'S OWN. coins × n × mintOf n × n² is '
      + '2 × 3 × 8 × 9 = 432, the same integer the string ratios reach from the other side — which is why the two rows '
      + 'are worth reading together and why neither proves the other. Choosing two of three is three; choosing two of '
      + 'seven rays is three sevens; the fourteen faces are two coins of seven; and the two instruments, scanner and '
      + 'radar, are one coin each. NOT CLAIMED: that any UI framework must be built this way — qpu read these integers '
      + 'onto a component schema, and the reading is not the theorem.',
    js: () => COINS * N * mintOf(N) * (N * N) === 432 && chooseOf(N, COINS) === N
      && chooseOf(RAYS, COINS) === N * RAYS && FACES === COINS * RAYS && SEED + SEED === COINS },

  { key: 'theory_and_practice_are_the_two_coins',
    stmt: 'theory + practice = coins ∧ theory = practice',
    skill: 'occupancy',
    why: 'THEORY AND PRACTICE ARE ONE COIN EACH, AND EQUAL. Both are the seed, so their sum is the two coins and '
      + 'neither outweighs the other — the balance is an identity rather than an aspiration. This is the row that '
      + 'reads as an aphorism and decides as arithmetic: 1 + 1 = 2 and 1 = 1, over defs that name which side is which.',
    js: () => SEED + SEED === COINS && SEED === SEED },

  { key: 'the_coins_follow_any_application',
    // THE UNIVERSAL IS CARRIED, NOT SAMPLED. qpu proves this for EVERY app by rewriting the defs, and a bounded walk
    // here would be a weaker claim wearing the same name — the mistake this session already made once and had refused.
    // So the proof line is qpu's own rewrite, carried verbatim, and the wing keeps a quantifier the kernel discharges.
    lean: 'theorem the_coins_follow_any_application (app : Nat) : app + coins = app + theory + practice := by rw [theory, practice, coins, ← Nat.add_assoc]',
    stmt: '∀ app : Nat, app + coins = app + theory + practice',
    skill: 'occupancy',
    why: 'THE TWO COINS FOLLOW EVERY APPLICATION, for every Nat and not for a sample. Adding the two coins to any '
      + 'application is adding theory and then practice — the same total, arrived at in two steps instead of one. The '
      + 'proof rewrites the definitions and re-associates, so it holds for all app rather than for a bounded range: a '
      + 'universal in the name needs a quantifier in the statement, and this one has it.',
    js: () => [0, 1, 2, 7, 14, 432, 71085].every((app) => app + COINS === app + SEED + SEED) },

  { key: 'the_coil_is_the_faces_and_the_halves_are_equal',
    stmt: 'coil = faces ∧ theory = practice',
    skill: 'occupancy',
    why: 'THE COIL IS THE FOURTEEN FACES, AND THE TWO HALVES ARE EQUAL. Two coins of seven rays is fourteen, and the '
      + 'faces are eight vertices plus four hexbit plus two coins — also fourteen, reached by a different route. In qpu '
      + 'this row leaned on two_coins_make_a_coil, which STAYS there because coil_efficiency cites it; here the '
      + 'equality is decided directly from the defs, so the move took nothing qpu still needs.',
    js: () => COIL === FACES && SEED === SEED },
]

console.log(`computing ${FACTS.length} COINS-BALANCE facts moved from qpu — n ${N}, coins ${COINS}, rays ${RAYS}, faces ${FACES}, coil ${COIL} …`)

emit({ file: 'CoinsBalance.lean', skill: 'occupancy', defs: DEFS, facts: FACTS,
  header: 'THE COINS BALANCE — seven rows MOVED from qpu (src/quantum/processing/unit/index.lean), where they sat beside '
    + 'a processing unit\'s efficiency while measuring something else: the string ratios over 27, the same fractions as a '
    + 'separate published row, the pentagram as three words plus two coins, the schema combinatorics that reach 432, '
    + 'theory and practice as one coin each, the two coins following every application, and the coil as the fourteen '
    + 'faces. THE CAPTAIN RULED MOVE, NOT DELETE (2026-09-27), and that ruling is the design: a sealed theorem is a '
    + 'published record and no one withdraws a settlement, so qpu\'s defs are carried verbatim and every claim is the '
    + 'claim it was, re-proven here. Measured before the move: nothing in qpu cites any of these seven, so removing them '
    + 'there breaks no kernel proof — while two_coins_make_a_coil and design were LEFT because coil_efficiency and neuro '
    + 'cite them. CLAIMED: this arithmetic, decided by the kernel over its own finite domain, axiom-free, with the '
    + 'universal row carrying its quantifier rather than a sample. NOT CLAIMED: that 432 is a correct tuning, that any '
    + 'framework must be built on these integers, or that an aphorism becomes true by being decidable — each row proves '
    + 'its arithmetic and the reading beside it stays a reading.' })
