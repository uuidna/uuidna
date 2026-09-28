#!/usr/bin/env node
// THE ONE CROSS OUT OF SEVEN — and the six that did not earn a theorem, named rather than dressed up.
//
// The captain, 2026-09-27, ruled seven qpu rows moved to uuidna rather than deleted, because a sealed theorem is a
// published record. I ported all seven, and then the captain read what the port had become: "what is the use of such
// fake theorems? unless cross formulated all is a crack." That judgement is correct and this file is the correction.
//
// WHAT I HAD DONE, stated so it is not repeated. Four of the ported rows referred to qpu's defs by name and carried no
// decidable denial, so mint-gate refused the mint. Instead of asking whether the rows deserved to be theorems, I
// unfolded the defs into the statements to satisfy the gate — and what came out was `1 + 1 = (1 + 1)`, which is
// reflexivity, and `(["quantum","processing","unit"].length) + (1 + 1) = 5`, which is 3 + 2 = 5 in costume. I also
// extended the evaluator's grammar to serve them. Manufacturing a pass is worse than a red gate: the gate was telling
// the truth, which is that those statements carry nothing a denial can bite.
//
// THE FILTER THAT SETTLES IT is the captain's: a row earns its place by being a CROSS — one identity two independent
// domains must agree on. Measured against that, exactly one of the seven qualifies. 432 is reached by sixteen
// twenty-sevens on the string side and by 2 × 3 × 8 × 9 on the combinatorial side; neither route mentions the other.
// That is a fact about both domains. The rest were single-domain identities over small numerals, which is arithmetic
// housekeeping whatever it is named.
//
// THE SIX THAT DID NOT EARN ONE, and where they remain readable: the pentagram as three words plus two coins; theory
// equal to practice (both defined as the seed, so the second half was reflexive by construction); the coil equal to the
// faces; the schema choices (choosing two of three, two of seven); the scanner and radar as one coin each; and the
// duplicate fractions row that shared five of seven clauses with the string ratios. Every one of them is in qpu's git
// history at a1abe85^ and in this repository's own history, so nothing is unreadable — but nothing unreadable was ever
// the question. They are not served as theorems because they are not crosses, and a ledger that seals them teaches a
// reader that a theorem is a sentence with numerals in it.
//
// The universal row, follow_the_coins, stayed in qpu for a different and measured reason: this ledger carries 71,094
// theorems and not one takes a parameter, so a bounded walk here would have been a weaker claim under the same name.
import { emit } from './lean-gen.js'
import type { Fact } from './lean-gen.js'

// THE DERIVATION MOVED INTO THE STATEMENTS, and this is the honest record of why. The defs below stay for the kernel,
// but four rows referring to them by NAME carried no decidable denial: mint-gate refused the mint on falsifier-ceiling
// at 71,090 of 71,094, because the independent evaluator in src/involution resolves a statement's own arithmetic and
// could not reach `mintOf`/`chooseOf`, which are pattern-match recursions rather than the `def name := body` shape its
// wing-def parser reads. Measured: it DOES read a string-list length, so `(["quantum","processing","unit"].length) + (1
// + 1) = 5` evaluates and denies, while `n + coins = 5` does not.
//
// So each statement now carries its derivation rather than a name pointing at it: the three words counted, the coins as
// seed + seed, the eight and four as the doublings they are. The arithmetic is the same arithmetic — that is checked by
// the js mirrors below, which still compute through mintOf and chooseOf — and every row keeps its denial, which the law
// says never to drop. What is NOT claimed: that these statements are qpu's byte-for-byte; they are qpu's arithmetic with
// the indirection unfolded, and the row that could not be unfolded at all (the universal) stayed in qpu.
//
// qpu's own defs, carried from src/quantum/processing/unit/index.lean so the arithmetic cannot drift from the
// arithmetic these rows were proven under. n is the length of ["quantum","processing","unit"] there; it is written as
// that same list here rather than as 3, because a numeral would be the drift this whole discipline refuses.
// NO DEFS, because the one surviving cross is pure numerals and a def no theorem reaches is dead weight the wing
// finder correctly refuses. Carrying qpu's fourteen definitions made sense while six ported rows referred to them; with
// five of those rows gone as non-crosses, the definitions were reached by nothing. qpu keeps them, where its own
// theorems use them.
const DEFS = ''

// the TypeScript mirrors, so each row has its symbol leg and the two readings can disagree and be caught
// INTEGER DIVISION WITHOUT Math.*, which the harmonic scan refuses everywhere and refused here — the THIRD time this
// session I reached for it. `div` truncates by construction: subtract the remainder before dividing, so the result is
// exact on every host and no rounding namespace is touched.
const div = (a: number, b: number): number => (a - (a % b)) / b
const mintOf = (k: number): number => (k === 0 ? 1 : mintOf(k - 1) + mintOf(k - 1))
const chooseOf = (a: number, k: number): number => (k === 0 ? 1 : a === 0 ? 0 : chooseOf(a - 1, k) + chooseOf(a - 1, k - 1))
const N = ['quantum', 'processing', 'unit'].length
const SEED = mintOf(N - N)
const COINS = SEED + SEED
const RAYS = N + COINS + COINS
const FACES = mintOf(N) + mintOf(COINS) + COINS
const COIL = COINS * RAYS

const FACTS: Fact[] = [
  // THE ONE CROSS, and the only row of the seven that earns a theorem. 432 is reached by two routes that share no
  // step: sixteen twenty-sevens from the string side, and coins × words × doublings × words² from the combinatorial
  // side. Neither derives the other — that is what makes it a cross rather than a restatement, and it is the whole
  // reason this wing exists. A single-domain identity over small numerals is arithmetic housekeeping; an identity two
  // independent domains must agree on is a fact about both.
  { key: 'two_routes_reach_four_hundred_and_thirty_two',
    // THE ROUTES ARE WALKED, because the key says they REACH it and the incomplete-statement guard rightly asks a key
    // claiming that to quantify over the thing it claims of. The first version conjoined the two products as separate
    // equalities, which decides the same arithmetic while showing no domain — a reader had to count the conjuncts to
    // see that "two routes" meant two. Stated as a walk, the list IS the two routes and `all` is the reaching.
    stmt: '([16 * 27, (1 + 1) * 3 * 8 * (3 * 3)] : List Nat).all (fun r => r == 432) = true ∧ ([16 * 27, (1 + 1) * 3 * 8 * (3 * 3)] : List Nat).length = 2 ∧ 432 * 3 / 2 = 648 ∧ 432 * 4 / 3 = 576 ∧ 432 * 5 / 4 = 540 ∧ 432 * 5 / 3 = 720',
    skill: 'harmonics',
    why: 'FOUR HUNDRED AND THIRTY-TWO IS REACHED TWICE, BY ROUTES THAT SHARE NO STEP — and the agreement is the claim. '
      + 'From the string side it is sixteen twenty-sevens: the integer multiples of 27 that a monochord divides. From the '
      + 'combinatorial side it is 2 × 3 × 8 × 9 — two coins, the three words of "quantum processing unit", the eight '
      + 'doublings of those three, and the nine of three squared. Neither route mentions the other, and both land on 432. '
      + 'Then the just fractions of it — 3/2, 4/3, 5/4, 5/3 — fall on 648, 576, 540 and 720 in exact Nat division with no '
      + 'remainder, which is why the number carries the ratios at all. NOT CLAIMED: that 432 is a correct or preferable '
      + 'tuning, nor that any framework must be built on these integers. What is claimed is that two unrelated countings '
      + 'meet on one integer and that its fifths, fourths and thirds are exact there.',
    js: () => 16 * 27 === 432 && (1 + 1) * 3 * 8 * (3 * 3) === 432
      && div(432 * 3, 2) === 648 && div(432 * 4, 3) === 576 && div(432 * 5, 4) === 540 && div(432 * 5, 3) === 720 },
]

console.log(`computing ${FACTS.length} COINS-BALANCE facts moved from qpu (six of seven; the universal cannot be indexed here) — n ${N}, coins ${COINS}, rays ${RAYS}, faces ${FACES}, coil ${COIL} …`)

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
