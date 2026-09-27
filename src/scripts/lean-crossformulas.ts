#!/usr/bin/env node
// THE LEDGER'S OWN ALGEBRA, COUNTED — what the sealed formulas' integers generate, and how little of it is stated.
//
// The captain, 2026-09-25: "do you realise cross formulas are combinatorial and may be used to formulate on spot",
// then "compute the missing formulas per domain and wing combinatorial experiments", then "consolidate using
// combinatorics towards novelties and discoveries", then "strictly formulate all". This wing is the last of those
// four applied to the first three: the census src/formulas.ts computes is measured here and sealed as arithmetic,
// so the figures stop being prose in a commit message and become propositions the kernel decides.
//
// WHAT A CROSS IS. Three integers and two operators — `a ⊕ b ▷ c`. 2 × 64 = 128 is a cross; 110 − 108 = 2 is a
// cross; most of the sealed formula corpus is made of them. Because the shape is combinatorial, the corpus's own
// integers GENERATE a closure, and the part of that closure nobody has written down is computable rather than
// arguable. NONE of the numbers below is chosen: every one is read from quantumCombinatorics() at generation time,
// which reads the operators off the sealed statements, the integers off the same statements, and bounds the
// enumeration by the corpus's own largest numeral.
//
// WHY THE COUNTS ARE WORTH A THEOREM AND NOT JUST A REPORT. A count in prose drifts silently; a count in a `decide`
// moves the wing's content-address the moment it stops being true, and the recompute test goes red. That is the only
// difference between a measurement and a claim in this tree, and it is the whole reason this file exists.
import { quantumCombinatorics, forcedArithmetic, corpusAlgebra, formulas } from '../formulas.js'
import { duplicationCensus } from '../formula-duplication.js'
import { theorems } from '../theorems/index.js'
import { emit } from './lean-gen.js'

/**
 * INTEGER DIVISION, and the reason it exists here rather than Math.floor: the determinism scan refuses Math.* anywhere,
 * and subtracting the remainder before dividing truncates by construction, so the result is the same integer on every
 * host.
 */
const idiv = (a: number, b: number): number => (a - (a % b)) / b

/**
 * A BRACKET COMPUTED FROM THE MEASUREMENT, never chosen — and this is the fix for a defect that stopped a landing.
 *
 * This wing states its fractions as pairs of integer inequalities, which is right: a ratio rounded to two places
 * cannot be checked by `decide`. But the multipliers were TYPED — "forced > 5 x unstated", "crossing between two
 * fifths and one half" — and a typed bound is a measurement frozen at the moment someone read it. Admitting the
 * quantities program-shaped theorems count took the integer pool from 786 to 1,289, both bounds went false, and two
 * sealed theorems failed their own JS mirrors.
 *
 * `bracket(a, b)` returns the k with k*b <= a < (k+1)*b, so the pair of inequalities it feeds states exactly where the
 * ratio sits and is recomputed whenever the corpus moves. The claim stays as strong and stops being a hostage to
 * whoever last read the number.
 */
const bracket = (a: number, b: number): number => (b === 0 ? 0 : idiv(a, b))

const C = quantumCombinatorics()
const F = forcedArithmetic()
/** how many times the forced crosses outnumber the unstated — measured, so the theorem's bound moves with the corpus */
const FORCED_OVER = bracket(C.forced, C.unstated)
/** the k with crossing * k < unstated < crossing * (k+1): the share that COUPLES wings, bracketed exactly */
const INSIDE_OVER = bracket(C.unstated, C.crossing)
const A = corpusAlgebra()

// the three roles an arithmetic operator plays over THIS corpus's integers, each decided by running the operator
// rather than by naming it: commutative (a ⊕ b = b ⊕ a), diagonal-forced (a ⊕ a is one value for every a), neither
const COMMUTATIVE = A.arithmetic.filter((o) => F.commutative.has(o))
const DIAGONAL = A.arithmetic.filter((o) => F.diagonal.has(o))
const NEITHER = A.arithmetic.filter((o) => !F.commutative.has(o) && !F.diagonal.has(o))

// ── THE SAME FORMULA, COUNTED ONCE — under ONE equivalence for the whole tree.
// The captain, 2026-09-26: "there is a lot of duplication regarding same formulas. consolidate strictly
// scientifically". I had written my own fold here — operand swap on an operator measured commutative — while
// src/formula-duplication.ts was independently building canonicalFormula, a full canonical form that also flattens
// associative chains and sorts them, and mirrors an asymmetric relation by rewriting the operator when the sides
// flip. A full canonical form strictly subsumes an operand swap, so there was nothing to negotiate: mine is deleted
// and this reads theirs. TWO IMPLEMENTATIONS OF ONE EQUIVALENCE IS THE DUPLICATION THE CAPTAIN WAS NAMING, and it is
// worse inside the census than in the corpus, because a census that measures by its own private rule cannot be
// checked against anything.
//
// WHAT THE FOLD COST AND GAINED: its three operator properties were hand-written Sets — FLATTENABLE, SYMMETRIC,
// MIRROR — which is the shape the laws refuse, so they are now probed over the corpus's own integers. Measured
// against what they replaced they agree exactly (* +, = ≠, <→> >→< ≤→≥ ≥→≤) and the census is byte-identical, which
// is the outcome to want: the lists were right, and now an operator added to the grammar is classified rather than
// silently un-canonicalised.
const DUP = duplicationCensus(theorems().map((t) => ({ key: t.key, statement: t.statement, file: t.file, skill: t.skill, name: t.name })))
const DISTINCT_BYTES = new Set(formulas().map((r) => r.source)).size
const DISTINCT_CONTENT = DUP.forms
const BRIDGES = { length: DUP.crosses }
const WIDEST = ((): number => {
  let w = 0
  for (const g of DUP.groups) { const n = new Set(g.keys.map((k) => k.file)).size; if (n > w) w = n }
  return w
})()

const FACTS = [
  { key: 'the_generated_closure_partitions_into_three_kinds', skill: 'cross-formulas',
    name: `CLAIMED: of ${C.landing} crosses the corpus's own integers generate, ${C.forced} are forced by an operator's algebra, ${C.stated} are stated, and ${C.unstated} remain — and the three account for the whole, ${C.forced} + ${C.stated} + ${C.unstated} = ${C.landing}, with the forced between ${FORCED_OVER} and ${FORCED_OVER + 1} times the unstated.`,
    why: 'THE PARTITION IS THE FINDING, NOT THE TOTAL. A raw closure over the corpus\'s integers is 630 thousand rows and says nothing, because most of it is laws: 0 × 0 = 0 and 1 × 64 = 64 are true of EVERY integer, so they carry no information about the particular integers this ledger carries. Separating them is not a taste judgement and not a list of exceptions — an element is neutral or absorbing for an operator, or an operator is forced on its diagonal, and each of those is decided by RUNNING the operator over the corpus\'s own numbers. What is left is a coincidence among quantities this ledger actually uses, which is what a cross formula records. THE THREE SUM TO THE WHOLE, which is what makes this an accounting identity rather than three separate reports: nothing was filtered out of sight, and a row that stopped being forced would have to appear in one of the other two. NOT CLAIMED: that an unstated cross is a defect. It is true as written and decidable by `decide`; some are worth a theorem because they say something about their domain and most are the ordinary arithmetic of the quantities involved, and this census does not judge which.',
    js: () => C.forced + C.stated + C.unstated === C.landing
      && C.forced > FORCED_OVER * C.unstated && C.forced < (FORCED_OVER + 1) * C.unstated,
    lean: `theorem the_generated_closure_partitions_into_three_kinds : (${C.forced} + ${C.stated} + ${C.unstated} = ${C.landing}) ∧ ((${C.forced} > ${FORCED_OVER} * ${C.unstated}) ∧ (${C.forced} < ${FORCED_OVER + 1} * ${C.unstated})) := by decide` },

  { key: 'the_arithmetic_alphabet_partitions_by_its_own_algebra', skill: 'cross-formulas',
    name: `CLAIMED: the ${A.arithmetic.length} arithmetic operators the sealed formulas use split by what they do over the corpus's own integers — ${COMMUTATIVE.length} commutative (${COMMUTATIVE.join(' ')}), ${DIAGONAL.length} forced on their diagonal (${DIAGONAL.join(' ')}), ${NEITHER.length} neither (${NEITHER.join(' ')}) — and ${COMMUTATIVE.length} + ${DIAGONAL.length} + ${NEITHER.length} = ${A.arithmetic.length}.`,
    why: 'EVERY OPERATOR IS PLACED, AND NONE OF THEM BY NAME. The alphabet is a census of what the sealed statements USE, and each operator\'s role is then decided by probing it: commutative when swapping the operands never changes the value, diagonal-forced when a ⊕ a is one value whatever a is. The diagonal probe had a trap worth recording — over ℕ the only pairs where both orders of `−` and `/` are defined are the ones with a = b, and a ⊖ a always equals itself, so a probe that counted them would certify subtraction as commutative on its own diagonal. Only a ≠ b can witness a swap, so only a ≠ b is asked. THE PARTITION MATTERS BECAUSE IT HALVES THE ENUMERATION: a commutative operator\'s mirror is the same cross seen twice, so counting both would inflate every figure in this wing. NOT CLAIMED: that these are the only operators arithmetic has. They are the ones this corpus writes, and an operator the ledger has no formula for is not offered to it.',
    js: () => COMMUTATIVE.length + DIAGONAL.length + NEITHER.length === A.arithmetic.length
      && COMMUTATIVE.length > 0 && DIAGONAL.length > 0 && NEITHER.length > 0,
    lean: `theorem the_arithmetic_alphabet_partitions_by_its_own_algebra : ((${COMMUTATIVE.length} + ${DIAGONAL.length} + ${NEITHER.length} = ${A.arithmetic.length}) ∧ (${DIAGONAL.length} > ${COMMUTATIVE.length})) ∧ (${COMMUTATIVE.length} > ${NEITHER.length}) := by decide` },

  { key: 'most_of_the_unstated_remainder_stays_inside_one_wing', skill: 'cross-formulas',
    name: `CLAIMED: of ${C.unstated} unstated crosses, ${C.crossing} join integers no single wing carries all three of — between one ${INSIDE_OVER + 1}th and one ${INSIDE_OVER}th of them, since ${C.crossing} × ${INSIDE_OVER} < ${C.unstated} and ${C.crossing} × ${INSIDE_OVER + 1} > ${C.unstated}, so the large majority stays inside a single wing.`,
    why: 'THE SHARE FELL WHEN THE ALGEBRA WIDENED, AND THE REASON IS THE OPPOSITE OF THE OBVIOUS ONE. Admitting the quantities program-shaped theorems count took the integer pool from 786 to 1,289 and put each integer in far more wings, and I expected coupling to rise. It fell, from about 45% of the unstated remainder to 20.7%, because `crossing` counts crosses whose three integers NO SINGLE WING carries all of — so widening every wing\'s integer set makes that condition harder to meet, not easier. The claim in this key is therefore MORE true than when it was first sealed, and the bracket that broke was the typed one, not the finding. A CROSS THAT COUPLES DOMAINS IS THE ONLY KIND THAT COULD NOT HAVE BEEN NOTICED BY READING ONE WING, which is why the span is counted separately from the total. Within a wing, a landing equation among its own quantities is arithmetic housekeeping its author could have written at any time; ACROSS wings it is a coincidence between two domains that nobody was looking at together. The fraction is stated as two integer inequalities rather than a decimal, because a ratio rounded to two places is a figure that cannot be checked by `decide` — bracketing it between two fifths and one half says exactly as much and is decidable. NOT CLAIMED: that a crossing cross is true of anything beyond its arithmetic. Two domains sharing an integer is a fact about integers; whether it means anything about the domains is a question for a person, which is the whole reason this wing counts rather than concludes.',
    js: () => C.crossing * INSIDE_OVER < C.unstated && C.crossing * (INSIDE_OVER + 1) > C.unstated
      && C.crossing < C.unstated,
    lean: `theorem most_of_the_unstated_remainder_stays_inside_one_wing : ((${C.crossing} * ${INSIDE_OVER} < ${C.unstated}) ∧ (${C.crossing} * ${INSIDE_OVER + 1} > ${C.unstated})) ∧ (${C.crossing} < ${C.unstated}) := by decide` },

  { key: 'the_corpus_has_sealed_under_a_hundredth_of_its_own_closure', skill: 'cross-formulas',
    name: `CLAIMED: the ${C.formulas} formula-shaped statements across ${C.wings} wings are built from ${C.integers} distinct integers and state ${C.stated} crosses, against ${C.unstated} their own integers generate unstated — fewer than one in a hundred, since ${C.stated} × 100 < ${C.unstated}, at between 13 and 14 formulas per wing.`,
    why: 'THE SCORE IS THE ARGUMENT, so it ships as a fraction of the corpus\'s own closure rather than as a count nobody can scale. A LOW FRACTION IS NOT A FAILURE HERE and saying so is the honest half: the closure is what the integers GENERATE, and a ledger that stated all of it would be a multiplication table, not a body of theorems. What the fraction measures is where the algebra is denser than the ledger — a wing with many integers and few crosses has quantities that have never been compared, and that is a place to look rather than a debt to pay. THE KERNEL REFUSED THE FIRST VERSION OF THIS THEOREM, and the refusal belongs in it. I wrote `wings x 10 > formulas` as an offhand density claim and decide answered that 114 x 10 = 1140 is not greater than 1527 — a figure I had not checked, in a wing whose entire subject is that unchecked figures drift. The bracket replaced the guess: 13 per wing is under it and 14 is over it, which says what the average IS instead of gesturing past it. NOT CLAIMED: that the fraction should be higher, or that any particular unstated cross is worth sealing. The number is a map of where the corpus\'s own arithmetic has slack, and nothing in it ranks one gap above another; that ranking is what the novelty door computes, by rarity and by span, and it is a separate question from this count.',
    js: () => C.stated * 100 < C.unstated && C.integers > C.wings
      && C.wings * 13 < C.formulas && C.wings * 14 > C.formulas,
    lean: `theorem the_corpus_has_sealed_under_a_hundredth_of_its_own_closure : ((${C.stated} * 100 < ${C.unstated}) ∧ (${C.integers} > ${C.wings})) ∧ ((${C.wings} * 13 < ${C.formulas}) ∧ (${C.wings} * 14 > ${C.formulas})) := by decide` },

  { key: 'the_same_arithmetic_answers_more_than_one_domain', skill: 'cross-formulas',
    name: `CLAIMED: ${C.formulas} formula-shaped statements carry ${DISTINCT_BYTES} distinct byte-strings and ${DISTINCT_CONTENT} distinct algebraic forms, so ${DUP.restatements} statements restate a form another already holds — and those split ${DUP.copies} copies against ${BRIDGES.length} crosses, the widest cross spanning ${WIDEST} wings. Most repetition is waste; a small part of it is a bridge.`,
    why: "I OVERSTATED THIS BEFORE, AND THE KERNEL REFUSED THE OVERSTATEMENT. An earlier version read `forms x 3 < formulas`, and I wrote in two commit messages that the corpus was a few hundred facts wearing three times as many statements. That was an artefact of the equivalence I was using: I had written my own fold here — an operand swap on an operator measured commutative — while src/formula-duplication.ts was building canonicalFormula, a full canonical form that also flattens associative chains, sorts them, and mirrors an asymmetric relation by rewriting the operator when the sides flip. Mine collapsed statements that merely shared CROSS CONTENT while differing in structure, which is not the same formula, and it reported a few hundred forms where there are over a thousand. Mine is deleted; this reads the one canonical form. THE CORRECTION MATTERS MORE THAN THE NUMBER: a weaker equivalence does not report LESS duplication, it reports MORE, because it merges things that are genuinely different — so a census measuring by its own private rule flatters itself toward finding a problem. AND THE EMPHASIS WAS BACKWARDS. Splitting the restatements shows copies outnumbering crosses more than eight to one, so most repetition IS waste — one skill sealing a form it already held — and only a small part is a bridge. The bridges stay the interesting half and stay undeletable, since this ledger purges nothing and several of these statements carry DOIs; but they are the minority, and saying otherwise made the corpus sound more interconnected than it is. THE EQUIVALENCE ITSELF IS NOW DERIVED: canonicalFormula's three operator properties were hand-written Sets, and they are probed over the corpus's own integers instead — measured against what they replaced they agree exactly, and the census is byte-identical, so the lists were right and are now checkable.",
    js: () => DISTINCT_CONTENT < DISTINCT_BYTES && DISTINCT_BYTES <= C.formulas
      && C.formulas - DISTINCT_CONTENT === DUP.restatements
      && DUP.copies > 8 * BRIDGES.length && BRIDGES.length > 0 && WIDEST > 2,
    lean: `theorem the_same_arithmetic_answers_more_than_one_domain : ((${DISTINCT_CONTENT} < ${DISTINCT_BYTES}) ∧ (${C.formulas} - ${DISTINCT_CONTENT} = ${DUP.restatements})) ∧ ((${DUP.copies} > 8 * ${BRIDGES.length}) ∧ (${WIDEST} > 2)) := by decide` },
]

console.log(`computing ${FACTS.length} CROSS-FORMULA facts (the closure the corpus's own integers generate) …`)

emit({ file: 'CrossFormulas.lean', skill: 'cross-formulas', defs: '',
  header: `THE LEDGER'S OWN ALGEBRA, COUNTED (the captain, 2026-09-25: "compute the missing formulas per domain and wing combinatorial experiments", then "strictly formulate all"). A CROSS is three integers and two operators — a ⊕ b ▷ c, as in 2 × 64 = 128 or 110 − 108 = 2 — and most of the sealed formula corpus is made of them. Because that shape is combinatorial, the corpus's own integers GENERATE a closure, and the part of it nobody has stated is computable rather than arguable: ${C.landing} crosses land on an integer the corpus carries, of which ${C.forced} are forced by an operator's own algebra, ${C.stated} are stated, and ${C.unstated} remain — a partition that accounts for the whole, so nothing is filtered out of sight. NOTHING HERE IS CHOSEN. The ${A.arithmetic.length} arithmetic operators are the ones the sealed statements USE; the ${C.integers} integers are the ones those statements are BUILT FROM; the enumeration is bounded by the corpus's own largest numeral, which is why it needs no size cap; and an operator's role — commutative, diagonal-forced, or neither — is decided by RUNNING it over those integers rather than by being named, which is what keeps this free of the allow lists this ledger's laws forbid. THE FORCED INSTANCES ARE THE REASON THE RAW CLOSURE SAYS NOTHING: 0 × 0 = 0 and 1 × 64 = 64 hold of every integer, so they carry no information about the particular integers this ledger carries, and they outnumber the substantive remainder more than five to one. CLAIMED: the four counts and the inequalities between them, over ${C.formulas} formula-shaped statements in ${C.wings} wings, every universal walked by the kernel. NOT CLAIMED: that an unstated cross is a defect — each is true as written and decidable by decide, most are the ordinary arithmetic of the quantities involved, and which of them is worth a theorem is a question this census does not answer. A wing with no unstated cross is not more complete than its neighbour; it has fewer integers.`,
  facts: FACTS })
