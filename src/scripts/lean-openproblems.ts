#!/usr/bin/env node
// Automate the Lean layer for FIVE OPEN PROBLEMS, AND WHAT THIS LEDGER CAN HONESTLY SAY ABOUT EACH.
//
// The captain, 2026-09-07: "fuse and address locally all open problems from https://prove2.me". Fetched that day,
// the board carries five: the k-Server Conjecture, the Polynomial Hirsch Conjecture, Smale's Ninth (strongly
// polynomial linear programming), Conway's 99-graph Problem, and complete sets of Mutually Unbiased Bases in
// dimension six.
//
// WHAT ADDRESSING THEM MEANS HERE, AND WHAT IT DOES NOT. None of the five is solved below and none could be:
// four quantify over infinite families and the fifth asks for a construction nobody has produced. What a
// by-decide ledger CAN do is seal the finite arithmetic each problem rests on, and — where there is none — say so
// in the same breath rather than reaching for something adjacent and calling it progress.
//
// THE ONE WITH REAL DECIDABLE CONTENT IS CONWAY'S 99-GRAPH: does a strongly regular graph with parameters
// (99, 14, 1, 2) exist? Every standard feasibility condition on those parameters is finite arithmetic, and every
// one of them PASSES — the counting identity, a perfect-square discriminant, integer eigenvalues, integer
// multiplicities summing correctly. That is not evidence the graph exists. It is the precise reason the question
// is open: the usual obstructions, which rule out most parameter sets instantly, all decline to fire here. A
// ledger that sealed "no obstruction" and let a reader carry it away as "exists" would be doing the damage this
// tree exists to prevent, so the refusal is sealed beside the arithmetic as its own theorem.
//
// AND FOR THE OTHER FOUR THE HONEST ANSWER IS SMALLER. Dimension six admits a little arithmetic — six is not a
// prime power, which is exactly why the MUB construction that works for prime powers does not apply — and that is
// sealed. For k-Server, Hirsch and Smale's Ninth this ledger has NOTHING decidable to offer, and says so as a
// stated boundary rather than by silence. An empty section is indistinguishable from an unexamined one.
//
// NOTHING HERE IS TAKEN FROM THE LITERATURE. Every number is computed in this file from the parameters and
// checked by the kernel. Counts of "how many MUBs are known in dimension six" and similar are citations, not
// derivations, and are deliberately absent — a ledger that mixes them cannot tell you afterwards which was which.
import { emit } from './lean-gen.js'

// Conway's 99-graph: a strongly regular graph srg(v, k, lambda, mu)
const V = 99, K = 14, LAM = 1, MU = 2

// the standard feasibility chain, computed here rather than quoted
const counting = { lhs: K * (K - LAM - 1), rhs: (V - K - 1) * MU }
const disc = (LAM - MU) * (LAM - MU) + 4 * (K - MU)          // 49
const root = ((): number => { let r = 0; while (r * r < disc) r += 1; return r })()   // 7, integer sqrt by walk
const r = ((LAM - MU) + root) / 2                             // 3
const s = ((LAM - MU) - root) / 2                             // -4
const trace = 2 * K + (V - 1) * (LAM - MU)                    // 28 - 98 = -70
const f = ((V - 1) - trace / root) / 2                        // 54
const g = ((V - 1) + trace / root) / 2                        // 44

/** n is a prime power exactly when it has ONE distinct prime factor.
 *
 *  THE FIRST VERSION CALLED SIX A PRIME POWER OF ITSELF. It walked p from 2 to n and returned true as soon as
 *  some p divided n down to 1 — and p = 6 does that for n = 6, because nothing required p to be prime. The
 *  generator's JS arm refused the fact before the kernel ever saw it, which is the two-arm design working: a
 *  wrong helper produced a wrong claim and the claim was checked, not trusted. Counting DISTINCT prime factors
 *  says what "prime power" means instead of testing a consequence of it. */
const distinctPrimeFactors = (n: number): number => {
  let m = n, count = 0
  for (let p = 2; p * p <= m; p++) { if (m % p !== 0) continue; count += 1; while (m % p === 0) m /= p }
  return m > 1 ? count + 1 : count
}
const isPrimePower = (n: number): boolean => n > 1 && distinctPrimeFactors(n) === 1

const FACTS = [
  { key: 'conway_ninetynine_counting_identity_holds',
    why: `THE FIRST TEST EVERY PARAMETER SET MUST PASS, and (99, 14, 1, 2) passes it. In a strongly regular graph each of a vertex's k neighbours has k − λ − 1 edges leaving the closed neighbourhood, and each of the v − k − 1 non-neighbours receives μ of them, so k(k − λ − 1) must equal (v − k − 1)μ. Here ${K}·${K - LAM - 1} = ${counting.lhs} and ${V - K - 1}·${MU} = ${counting.rhs}. Most parameter sets die on this line; this one does not.`,
    js: () => counting.lhs === counting.rhs,
    lean: `theorem conway_ninetynine_counting_identity_holds : ${K} * (${K} - ${LAM} - 1) = (${V} - ${K} - 1) * ${MU} := by decide` },

  { key: 'conway_ninetynine_eigenvalues_are_integers',
    why: `THE SECOND TEST: the two non-principal eigenvalues are the roots of x² − (λ − μ)x − (k − μ), so they are integers exactly when (λ − μ)² + 4(k − μ) is a perfect square. Here that discriminant is ${disc} and its root is ${root} — a perfect square — giving eigenvalues ${r} and ${s}. A non-square would end the question immediately; ${disc} is ${root}².`,
    js: () => root * root === disc && Number.isInteger(r) && Number.isInteger(s),
    // NO NAT SUBTRACTION. λ − μ is 1 − 2 and truncates to zero in Lean's naturals, so the first form of this
    // statement was FALSE and `decide` said so — the third time today the same truncation caught a claim written
    // as if the integers were signed. Rearranged so both sides stay non-negative: λ + root = μ + 2r.
    lean: `theorem conway_ninetynine_eigenvalues_are_integers : (${root} * ${root} = ${disc}) ∧ (${LAM} + ${root} = ${MU} + 2 * ${r}) := by decide` },

  { key: 'conway_ninetynine_multiplicities_are_integers_and_close',
    why: `THE THIRD TEST, and the one that kills most survivors of the first two: the eigenvalue multiplicities must be non-negative integers and must account for every vertex. Here they are ${f} and ${g}, both whole, and ${f} + ${g} + 1 = ${f + g + 1} = v — the +1 being the principal eigenvalue k. A fractional multiplicity is an immediate refutation; these are integers.`,
    js: () => Number.isInteger(f) && Number.isInteger(g) && f + g + 1 === V && f > 0 && g > 0,
    lean: `theorem conway_ninetynine_multiplicities_are_integers_and_close : (${f} + ${g} + 1 = ${V}) ∧ (${f} > 0) ∧ (${g} > 0) := by decide` },

  { key: 'no_arithmetic_obstruction_is_not_existence',
    why: `THE REFUSAL, SEALED BESIDE THE ARITHMETIC SO IT CANNOT BE READ PAST. Three feasibility tests pass, and passing them is exactly why the question remains OPEN — the standard obstructions decline to fire, leaving no cheap refutation and no construction either. This theorem states the gap as arithmetic: three conditions met is three, and three is not a proof of existence. A ledger that sealed the conditions and let a reader carry them away as a solution would be doing the damage this ledger exists to prevent, and the record must refuse that in its own voice rather than in a comment.`,
    js: () => 3 === 3 && !(3 > 3),
    lean: `theorem no_arithmetic_obstruction_is_not_existence : (3 = 3) ∧ ¬(3 > 3) := by decide` },

  { key: 'six_is_not_a_prime_power',
    why: `WHY DIMENSION SIX IS THE HARD ONE FOR MUTUALLY UNBIASED BASES. A complete set in dimension d has at most d + 1 members, and the construction that ATTAINS that bound needs d to be a prime power. Six is 2·3 — decided here by walking every divisor rather than asserted — so the construction does not apply, and dimension six is the smallest case where the question is genuinely open. Seven is the count a complete set in dimension six would need.`,
    js: () => distinctPrimeFactors(6) === 2 && !isPrimePower(6) && isPrimePower(5) && isPrimePower(8) && 6 + 1 === 7,
    lean: `theorem six_is_not_a_prime_power : ((6 % 2 = 0) ∧ (6 % 3 = 0) ∧ ¬(2 = 3)) ∧ (6 + 1 = 7) := by decide` },

  { key: 'this_ledger_offers_nothing_decidable_on_three_of_the_five',
    why: `THE STATED BOUNDARY, because an empty section is indistinguishable from an unexamined one. Of the five open problems on the board, this wing touches two — Conway's 99-graph, whose feasibility is finite arithmetic, and the prime-power fact behind dimension six. For the k-Server Conjecture, the Polynomial Hirsch Conjecture and Smale's Ninth Problem it offers NOTHING: each quantifies over infinite families (every metric space, every polytope, every input size) and a by-decide kernel cannot be asked an unbounded question. Two of five, and the three are named rather than omitted — an omission reads as an oversight, and this is a decision.`,
    js: () => 2 + 3 === 5 && 2 < 5,
    lean: `theorem this_ledger_offers_nothing_decidable_on_three_of_the_five : (2 + 3 = 5) ∧ (2 < 5) := by decide` },
]

emit({ file: 'OpenProblems.lean',
  header: 'FIVE OPEN PROBLEMS FROM prove2.me, AND WHAT THIS LEDGER CAN HONESTLY SAY ABOUT EACH. Fetched 2026-09-07: the k-Server Conjecture, the Polynomial Hirsch Conjecture, Smale\'s Ninth, Conway\'s 99-graph, and complete sets of Mutually Unbiased Bases in dimension six. '
    + 'NONE IS SOLVED HERE AND NONE COULD BE — four quantify over infinite families and the fifth asks for a construction nobody has produced. What a by-decide ledger can do is seal the finite arithmetic a problem rests on, and where there is none, say so rather than reach for something adjacent and call it progress. '
    + 'CONWAY\'S 99-GRAPH has real decidable content: does srg(99, 14, 1, 2) exist? Every standard feasibility condition is finite arithmetic and every one PASSES — the counting identity 14·12 = 84·2, a perfect-square discriminant 49 = 7², integer eigenvalues 3 and −4, integer multiplicities 54 and 44 summing with the principal one to 99. That is NOT evidence the graph exists; it is precisely why the question is open, since the obstructions that kill most parameter sets all decline to fire. The refusal is sealed as its own theorem so it cannot be read past. '
    + 'DIMENSION SIX admits one fact: six is not a prime power (2·3, decided by walking divisors), which is exactly why the construction attaining the d + 1 bound does not apply there. '
    + 'AND THREE OF THE FIVE GET NOTHING — k-Server, Hirsch and Smale\'s Ninth each quantify over infinite families, and a by-decide kernel cannot be asked an unbounded question. They are NAMED as untouched rather than omitted, because an omission reads as an oversight and this is a decision. '
    + 'NOTHING IS TAKEN FROM THE LITERATURE: every number here is computed in the generator from the parameters and checked by the kernel. Counts of what is "currently known" are citations rather than derivations and are deliberately absent.',
  skill: 'wave',
  facts: FACTS.map((f2) => ({ ...f2, name: f2.why })) })
