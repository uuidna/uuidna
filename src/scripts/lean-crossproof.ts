#!/usr/bin/env node
// THE SYMMETRIC AND THE ASYMMETRIC CROSS, AND EXACTLY WHEN THEY PROVE EACH OTHER.
//
// (the captain, 2026-09-26: "provide symmetric and asymetric cross formulas proving each other".)
//
// A cross formula is one quantity reachable by two independent routes through a closed structure, and lean/
// PlanckLattice.lean puts it one rank up: a PRODUCT adds the exponent vectors and a RATIO subtracts them, and the
// lattice's closure "is what makes these formulas prove each other rather than sit beside each other". This wing
// goes one rank DOWN, to the proportion itself, and asks the question that rank cannot: the two routes are a
// product and a ratio, so are they the same claim?
//
// THE TWO FORMS. One proportion between four quantities has two spellings:
//   SYMMETRIC  a·d = b·c   — both sides are products, and multiplication commutes, so the pairs may be swapped
//                            inside each product and the two products exchanged. Four spellings, one fact.
//   ASYMMETRIC a/b = c/d   — both sides are ratios, and division does not commute, so no swap is free. Inverting
//                            the ratios gives b/a = d/c, which is a DIFFERENT claim over ℕ.
//
// THE ANSWER IS NOT THE EXPECTED ONE, and that is why this wing is worth sealing. Over ℕ the two forms are NOT
// equivalent: truncating division throws away the remainder, so the ratio form is strictly WEAKER. 1/1 = 1 and
// 3/2 = 1 agree, while 1·2 = 2 and 1·3 = 3 do not — the asymmetric form holds where the symmetric form fails, 94
// times in a box of 625. Cross-multiplication is taught as an equivalence and over ℕ it is an implication.
//
// AND THEY DO PROVE EACH OTHER, under exactly one stated condition: when both divisions are exact. Then a = qb and
// c = rd, so a·d = b·c becomes qbd = brd, and b,d > 0 forces q = r; and conversely q = r gives a·d = qbd = b·c.
// Neither direction is assumed — the walk decides both over the whole box.
//
// WHAT MAKES THE THIRD THEOREM SUBSTANTIVE rather than vacuous, because a guarded implication is the easiest place
// in this tree to hide nothing: `exact q → (symmetric == asymmetric)` would be true of every q if nothing were
// exact, and it would also be true if the two sides were both constant. Measured, and sealed as part of the
// statement: 144 of 625 quadruples are exact, 38 of those satisfy the proportion and 106 refute it. Both outcomes
// occur, so the biconditional is carrying a real agreement in both directions.
//
// CLAIMED: the arithmetic above, decided by the Lean 4 kernel over its own finite box, axiom-free. NOT CLAIMED:
// anything about ℚ or ℝ, where cross-multiplication IS the equivalence it is taught as. The whole finding here is a
// fact about ℕ division, and it is stated as such.
import { emit, leanList } from './lean-gen.js'

const R = 5
const RANGE = [0, 1, 2, 3, 4]
const QUADS: number[][] = RANGE.flatMap((a) => RANGE.flatMap((b) => RANGE.flatMap((c) => RANGE.map((d) => [a, b, c, d]))))

// INTEGER DIVISION BY REMAINDER, because Math.floor is float arithmetic and this is a quotient of counts. The
// subtraction is exact: x - (x % y) is divisible by y, so the division that follows is integral and needs no floor.
// Math.* is a tree-wide hard reject with no exemption, and the reason is precisely that a float floor silently
// disagrees with the kernel once the operands pass 2^53 — which the span wings do.
const div = (x: number, y: number): number => (x - (x % y)) / y
// the four spellings of the symmetric form — the same fact each time, which is the point
const symm = ([a, b, c, d]: number[]): boolean => a! * d! === b! * c!
const symmSwapWithin = ([a, b, c, d]: number[]): boolean => d! * a! === c! * b!
const symmSwapSides = ([a, b, c, d]: number[]): boolean => b! * c! === a! * d!
const symmSwapBoth = ([a, b, c, d]: number[]): boolean => c! * b! === d! * a!
// the asymmetric form, and the inversion that is a different claim
const asym = ([a, b, c, d]: number[]): boolean => b !== 0 && d !== 0 && div(a!, b!) === div(c!, d!)
const asymInverted = ([a, b, c, d]: number[]): boolean => a !== 0 && c !== 0 && div(b!, a!) === div(d!, c!)
const exact = ([a, b, c, d]: number[]): boolean => b !== 0 && d !== 0 && a! % b! === 0 && c! % d! === 0

const EXACT = QUADS.filter(exact).length
const EXACT_HOLD = QUADS.filter((q) => exact(q) && symm(q)).length
const EXACT_FAIL = QUADS.filter((q) => exact(q) && !symm(q)).length
const WEAKER = QUADS.filter((q) => asym(q) && !symm(q)).length
const NOT_INVARIANT = QUADS.filter((q) => asym(q) !== asymInverted(q)).length

const FACTS = [
  { key: 'the_symmetric_cross_is_blind_to_its_spelling', skill: 'cross-proof',
    name: `CLAIMED: over all ${QUADS.length} quadruples in the box, the symmetric cross a·d = b·c agrees with all FOUR of its spellings — swapping inside each product, exchanging the two products, and both at once — so the four are one fact; and the asymmetric cross a/b = c/d is NOT invariant, disagreeing with its own inversion b/a = d/c on ${NOT_INVARIANT} of them.`,
    why: 'THE SYMMETRY IS THE DIFFERENCE BETWEEN THE TWO FORMS, and it is walked rather than asserted. Multiplication commutes, so the symmetric form cannot tell its four spellings apart: whichever way the pairs are written the same quadruples satisfy it, and that is checked on every quadruple rather than argued from the law. Division does not commute, and inverting both ratios is therefore a genuinely different claim — which is shown by exhibiting the quadruples where the two disagree rather than by saying so. NOT CLAIMED: that one form is better. The symmetric form is spelling-blind, which makes it the robust one to state a proportion in; the asymmetric form carries the direction, which is what makes it the one that says which quantity is per which.',
    js: () => QUADS.every((q) => symm(q) === symmSwapWithin(q) && symm(q) === symmSwapSides(q) && symm(q) === symmSwapBoth(q))
      && QUADS.some((q) => asym(q) !== asymInverted(q)),
    lean: 'theorem the_symmetric_cross_is_blind_to_its_spelling : (allQ (fun a b c d => ((symm a b c d) == (symmSwapWithin a b c d)) && ((symm a b c d) == (symmSwapSides a b c d)) && ((symm a b c d) == (symmSwapBoth a b c d))) = true) ∧ (anyQ (fun a b c d => (asym a b c d) != (asymInverted a b c d)) = true) := by decide' },

  { key: 'the_asymmetric_cross_is_strictly_weaker_over_naturals', skill: 'cross-proof',
    name: `CLAIMED: over ℕ the ratio form is STRICTLY WEAKER than the product form — on ${WEAKER} of ${QUADS.length} quadruples a/b = c/d holds while a·d = b·c fails, the smallest being 1/1 = 3/2 = 1 against 1·2 = 2 ≠ 3 = 1·3 — so cross-multiplication, which is taught as an equivalence, is an implication here.`,
    why: 'TRUNCATION IS WHERE THE INFORMATION GOES. ℕ division discards the remainder, so two ratios can collapse onto the same floor from different rationals, and the ratio form then reports an agreement the products refute. The direction that DOES hold is the other one: if a·d = b·c then a/b and c/d are the same rational and therefore the same floor, so the product form implies the ratio form and never the reverse. This is sealed as an existence over the box rather than as a single counterexample, so it is the shape of the failure and not one unlucky quadruple. NOT CLAIMED: that this is true in ℚ or ℝ. There cross-multiplication is exactly the equivalence it is taught as, and the whole content of this theorem is that ℕ division is not division.',
    js: () => QUADS.filter((q) => asym(q) && !symm(q)).length === WEAKER && WEAKER > 0 && div(1, 1) === div(3, 2) && 1 * 2 !== 1 * 3,
    lean: `theorem the_asymmetric_cross_is_strictly_weaker_over_naturals : (anyQ (fun a b c d => (asym a b c d) && !(symm a b c d)) = true) ∧ ((1 / 1 = 3 / 2) ∧ (1 * 2 ≠ 1 * 3)) := by decide` },

  { key: 'exact_division_makes_the_two_crosses_prove_each_other', skill: 'cross-proof',
    name: `CLAIMED: when both divisions are EXACT the two forms are equivalent — over the box the symmetric and asymmetric crosses agree on every one of the ${EXACT} exact quadruples, walked in both directions; and the agreement is substantive rather than vacuous, because ${EXACT_HOLD} of those satisfy the proportion and ${EXACT_FAIL} refute it, so both outcomes occur.`,
    why: 'THIS IS THE CROSS: two routes to one proportion, each proving the other, and the condition under which that holds stated rather than assumed. With a = qb and c = rd the product form reads qbd = brd, which forces q = r because b and d are non-zero — and q = r gives a·d = qbd = b·c back again. Neither direction is taken on faith; the walk decides both over every exact quadruple. AND THE VACUITY IS CLOSED IN THE STATEMENT, which is why the second and third conjuncts are there. A guarded implication is the easiest place in this ledger to prove nothing: `exact q → agreement` is true of every quadruple if none is exact, and true again if the two sides are both constant. So the statement also carries that exact quadruples EXIST and that the proportion both holds and fails among them. A gate that cannot fail is not a gate, and neither is a theorem.',
    js: () => QUADS.filter(exact).every((q) => symm(q) === asym(q)) && EXACT > 0 && EXACT_HOLD > 0 && EXACT_FAIL > 0,
    lean: 'theorem exact_division_makes_the_two_crosses_prove_each_other : (allQ (fun a b c d => !(exact a b c d) || ((symm a b c d) == (asym a b c d))) = true) ∧ (anyQ (fun a b c d => exact a b c d) = true) ∧ (anyQ (fun a b c d => (exact a b c d) && (symm a b c d)) = true) ∧ (anyQ (fun a b c d => (exact a b c d) && !(symm a b c d)) = true) := by decide' },
]

const DEFS = [
  // NO WING BUYS ITS OWN CEILING. The first version of this wing walked ONE list of 625 quadruples and the kernel
  // answered `maximum recursion depth has been reached` — List.all recurses once per element, and 625 is past the
  // 512 default. The fix is not `set_option maxRecDepth`; that buys the ceiling instead of earning it, and
  // lean/Colour.lean records the rule. Nesting the walk over a FIVE-element list does the same 625 evaluations at
  // recursion depth five, so the limit is not approached rather than raised. The quadruple is passed as four Nats,
  // which also retires the list indexing the flat version needed.
  `def rng : List Nat := ${leanList(RANGE)}`,
  'def allQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=',
  '  rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => f a b c d))))',
  'def anyQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=',
  '  rng.any (fun a => rng.any (fun b => rng.any (fun c => rng.any (fun d => f a b c d))))',
  '',
  '-- the four spellings of the SYMMETRIC cross: products, which commute',
  'def symm (a b c d : Nat) : Bool := a * d == b * c',
  'def symmSwapWithin (a b c d : Nat) : Bool := d * a == c * b',
  'def symmSwapSides (a b c d : Nat) : Bool := b * c == a * d',
  'def symmSwapBoth (a b c d : Nat) : Bool := c * b == d * a',
  '',
  '-- the ASYMMETRIC cross: ratios, which do not commute — and its inversion, which is a different claim',
  'def asym (a b c d : Nat) : Bool := b != 0 && d != 0 && (a / b == c / d)',
  'def asymInverted (a b c d : Nat) : Bool := a != 0 && c != 0 && (b / a == d / c)',
  '',
  '-- both divisions exact: the condition under which the two forms prove each other',
  'def exact (a b c d : Nat) : Bool := b != 0 && d != 0 && a % b == 0 && c % d == 0',
].join('\n')

console.log(`computing ${FACTS.length} CROSS PROOF facts (symmetric and asymmetric crosses, and when they prove each other) …`)

emit({
  file: 'CrossProof.lean', skill: 'cross-proof', defs: DEFS,
  header: `THE SYMMETRIC AND THE ASYMMETRIC CROSS. One proportion between four quantities has two spellings: the SYMMETRIC a·d = b·c, whose sides are products and therefore commute, so its four spellings are one fact; and the ASYMMETRIC a/b = c/d, whose sides are ratios and do not, so inverting them is a different claim. lean/PlanckLattice.lean works one rank up, where a product ADDS exponent vectors and a ratio SUBTRACTS them and the lattice's closure makes its formulas prove each other; this wing asks at the rank of the proportion itself whether the product route and the ratio route are the same claim. THEY ARE NOT, over ℕ. Truncating division discards the remainder, so the ratio form is STRICTLY WEAKER: on ${WEAKER} of ${QUADS.length} quadruples a/b = c/d holds while a·d = b·c fails, the smallest being 1/1 = 3/2 = 1 against 1·2 ≠ 1·3. Cross-multiplication is taught as an equivalence and over ℕ it is an implication, product to ratio and never back. AND THEY DO PROVE EACH OTHER under exactly one condition, stated rather than assumed: when both divisions are exact. Then a = qb and c = rd, the product form reads qbd = brd, non-zero b and d force q = r, and q = r returns a·d = b·c — both directions decided by the walk over all ${EXACT} exact quadruples. THE VACUITY IS CLOSED INSIDE THE STATEMENT, because a guarded implication is where a ledger proves nothing most easily: the theorem also carries that exact quadruples exist and that the proportion both HOLDS on ${EXACT_HOLD} of them and FAILS on ${EXACT_FAIL}, so the agreement is not an artefact of one side being constant. CLAIMED: the arithmetic, decided by the kernel over its own finite box of ${R}^4 quadruples, axiom-free. NOT CLAIMED: anything about ℚ or ℝ, where cross-multiplication is the equivalence it is taught as — the entire finding is that ℕ division is not division.`,
  facts: FACTS,
})
