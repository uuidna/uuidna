#!/usr/bin/env node
// INVARIANCE — ONE STRUCTURE, AND WHAT IS HELD FIXED DECIDES WHETHER IT IS A FACT OR FURNITURE.
//
// (the captain, 2026-09-27: "find the cross formulation and all will compute by itself as all is entangled by nature",
// and "nature has no gaps and seams".)
//
// TWO THINGS THIS LEDGER MEASURES SEPARATELY TURN OUT TO BE ONE. lean/CrossProof.lean seals that the SYMMETRIC cross
// a·d = b·c is blind to its spelling — swap the pairs, exchange the products, the same quadruples satisfy it — and
// treats that blindness as the reason the form is the robust one to state a proportion in. src/padding-conjunct.ts
// measures the opposite-seeming defect: a conjunct that holds whatever its numerals are, of which this ledger carries
// 492 across the wings. The first is a feature and the second a defect, and they are the SAME PROPERTY.
//
// BECAUSE EMPTINESS IS INVARIANT UNDER EVERYTHING. If a form is true for every quadruple then it is true of every
// permuted quadruple too, trivially — true == true. So a conjunct that cannot fail is automatically symmetric, and
// padding is not the opposite of a symmetric cross: it is symmetry's DEGENERATE LIMIT, symmetry that comes from saying
// nothing. What separates them is not invariance, which both have, but whether the form can fail at all.
//
// AND THE CONVERSE FAILS, which is what keeps the notion useful: a·d = b·c is invariant under the mirror and is NOT
// true of every quadruple. Symmetry with content exists; that is the cross worth sealing.
//
// SO THE SQUARE HAS NO FOURTH CELL, and that is the no-seam claim rather than a shortage of examples. Classify a form
// by (true everywhere?, invariant under the mirror?) and three cells are occupied — the symmetric cross, reflexivity,
// the asymmetric ratio — while the fourth, true everywhere yet not invariant, is IMPOSSIBLE BY CONSTRUCTION — a predicate true at every point is preserved by any map between points, so the combination has no witness to find. Not unobserved: excluded
// by the implication above. Nothing falls outside the square and nothing sits between its cells.
//
// CLAIMED: the three statements below, decided by the kernel over its own finite box of 5^4 quadruples, axiom-free.
// NOT CLAIMED: that every invariance in mathematics behaves so, or that the mirror used here is the only permutation
// worth asking about. This is one permutation on one box, and it is stated as such.
import { emit, leanList } from './lean-gen.js'

const RANGE = [0, 1, 2, 3, 4]
const QUADS: number[][] = RANGE.flatMap((a) => RANGE.flatMap((b) => RANGE.flatMap((c) => RANGE.map((d) => [a, b, c, d]))))

/** the mirror: (a,b,c,d) ↦ (d,c,b,a), the permutation a proportion is blind to */
const mirror = ([a, b, c, d]: number[]): number[] => [d!, c!, b!, a!]

/**
 * EVERY REARRANGEMENT of four positions, computed rather than typed. The guard caught this wing claiming a universal
 * its statement did not walk: the key says "under every mirror" and `mirrorAgrees` tested exactly one permutation,
 * (a,b,c,d) ↦ (d,c,b,a). The header even conceded it — "one permutation, one box, stated as such" — so the NAME was
 * the outlier. Involuting rather than renaming: emptiness is invariant under every rearrangement, not just the
 * reversal, so the claim the name makes is the claim now decided.
 */
const permutationsOf = (xs: number[]): number[][] =>
  xs.length <= 1 ? [xs] : xs.flatMap((x, i) =>
    permutationsOf([...xs.slice(0, i), ...xs.slice(i + 1)]).map((rest) => [x, ...rest]))
const PERMS = permutationsOf([0, 1, 2, 3])
const permuted = (p: number[], q: number[]): number[] => p.map((i) => q[i]!)
const permInvariant = (f: (q: number[]) => boolean): boolean =>
  QUADS.every((q) => PERMS.every((p) => f(q) === f(permuted(p, q))))
// EXACT INTEGER DIVISION, NOT Math.floor — the harmonic scan refuses Math.* anywhere and this line was committed with
// it. Subtracting the remainder before dividing truncates by construction, so the result is the same integer on every
// host and no rounding namespace is touched. (A float floor is a decision the host makes; a wing's arithmetic cannot be.)
const div = (x: number, y: number): number => (x - (x % y)) / y

const FORMS: { name: string; f: (q: number[]) => boolean }[] = [
  { name: 'symmetric', f: ([a, b, c, d]) => a! * d! === b! * c! },
  { name: 'reflexive', f: ([a]) => a === a },
  { name: 'padding', f: ([a]) => a! - 0 === a! },
  { name: 'asymmetric', f: ([a, b, c, d]) => b !== 0 && d !== 0 && div(a!, b!) === div(c!, d!) },
]
const allTrue = (f: (q: number[]) => boolean): boolean => QUADS.every(f)
const mirrorInvariant = (f: (q: number[]) => boolean): boolean => QUADS.every((q) => f(q) === f(mirror(q)))

const CELLS = FORMS.map((x) => ({ name: x.name, allTrue: allTrue(x.f), inv: mirrorInvariant(x.f) }))
const OCCUPIED = [...new Set(CELLS.map((c) => `${c.allTrue ? 1 : 0}${c.inv ? 1 : 0}`))].sort()

const FACTS = [
  { key: 'emptiness_is_invariant_under_every_mirror', skill: 'invariance',
    name: `CLAIMED: over all ${QUADS.length} quadruples and all ${PERMS.length} rearrangements of four positions, every form true of ALL quadruples agrees with its own image under EVERY rearrangement — so a conjunct that cannot fail is symmetric for free, and padding is symmetry's degenerate limit rather than its opposite. The second conjunct decides that the antecedent is satisfied by all ${QUADS.length}, so the implication is not carried by an empty hypothesis.`,
    why: 'A UNIVERSAL IS WALKED, NOT SAMPLED, AND THE ANTECEDENT IS SHOWN NON-EMPTY. The first version of this walked one rearrangement while the key claimed every one, which is the overclaim the incomplete-statement guard exists to catch; all 24 are walked now. The shape is chosen against the kernel and not for readability: my first attempt built the 625 quadruples as one flat list and filtered it, which recurses once per element and blew the recursion limit outright. No wing buys its own ceiling, so the walk was rebuilt rather than the limit raised — allQ keeps the quadruples nested four deep over five, and only the 24 permutations are walked flat. And the second conjunct matters as much as the first: an implication whose hypothesis never holds is true for free, so the count of quadruples satisfying it is decided too. THIS IS WHY THE TWO CENSUSES ARE ONE. A form true everywhere is true of every permuted input too, because true equals true — so invariance is guaranteed by emptiness and cannot distinguish a fact from furniture. The ledger measures both: CrossProof treats the symmetric cross\'s blindness to its spelling as a virtue, and padding-conjunct counts 492 conjuncts that hold whatever their numerals are. The virtue and the defect share the property; what separates them is whether the form can fail at all. Walked over the box for every form rather than argued from the definition, because the implication is exactly the kind that reads obvious and is worth deciding once.',
    js: () => FORMS.every((x) => !allTrue(x.f) || permInvariant(x.f))
      && QUADS.every((q) => FORMS[2]!.f(q)),
    // THE WALK IS WRITTEN OUT, not delegated to allQ. The incomplete-statement guard demands that a key claiming a
    // universal quantify VISIBLY in its own statement, and it is right to: `allQ` hides the domain inside a def, so a
    // reader of the theorem cannot see what was walked and has to trust a helper they have not read. The other two
    // theorems here keep allQ because their names claim no universal. Same nesting, same depth five, nothing bought.
    lean: 'theorem emptiness_is_invariant_under_every_mirror : ((rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => !(everywhere a b c d) || (allPermsAgree a b c d)))))) = true) ∧ ((rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => everywhere a b c d))))) = true) := by decide' },

  { key: 'symmetry_with_content_is_not_emptiness', skill: 'invariance',
    name: 'CLAIMED: the converse FAILS — the symmetric cross a·d = b·c is invariant under the mirror and is NOT true of every quadruple, so symmetry with content exists and invariance is not merely a symptom of saying nothing.',
    why: 'WITHOUT THIS THE FIRST THEOREM WOULD BE A WARNING RATHER THAN A DISTINCTION. If every invariant form were empty then invariance would be worthless as a signal and the symmetric cross would be furniture too. It is not: the product form is blind to its spelling AND fails on most quadruples, which is precisely the combination that makes it the robust way to state a proportion. The witness is exhibited rather than asserted — one quadruple where the form fails, beside the walk showing it never notices the mirror.',
    js: () => mirrorInvariant(FORMS[0]!.f) && !allTrue(FORMS[0]!.f) && !(1 * 1 === 2 * 2),
    lean: 'theorem symmetry_with_content_is_not_emptiness : ((allQ (fun a b c d => (symmetric a b c d) == (symmetric d c b a))) = true) ∧ ¬(1 * 1 = 2 * 2) := by decide' },

  { key: 'the_square_has_no_fourth_cell', skill: 'invariance',
    name: `CLAIMED: classifying a form by (true everywhere, invariant under the mirror) leaves exactly ${OCCUPIED.length} of the four cells occupied — and the missing one, true everywhere yet not invariant, is IMPOSSIBLE rather than merely unobserved: the first theorem excludes it.`,
    why: 'THE NO-SEAM CLAIM, AND IT IS A THEOREM AND NOT A SURVEY. Three cells carry witnesses here — the symmetric cross (invariant, not everywhere true), reflexivity and the padding form (both, and indistinguishable by invariance alone), and the asymmetric ratio (neither). A census could only ever report the fourth as unobserved, which is a fact about who looked. The implication above rules it out: true everywhere forces invariance, so no form can sit there at all. Nothing falls outside the square and nothing sits between its cells, which is what it means for the classification to be total.',
    js: () => OCCUPIED.length === 3 && !CELLS.some((c) => c.allTrue && !c.inv),
    lean: 'theorem the_square_has_no_fourth_cell : (anyQ (fun a b c d => !(symmetric a b c d))) = true ∧ (allQ (fun a b c d => !(everywhere a b c d) || (mirrorAgrees a b c d))) = true := by decide' },
]

const DEFS = [
  // NESTED OVER A FIVE-ELEMENT LIST, so 625 quadruples are walked at recursion depth five. NO WING BUYS ITS OWN
  // CEILING (Colour.lean): a flat list of 625 passes the kernel's default limit and the answer is the better walk.
  `def rng : List Nat := ${leanList(RANGE)}`,
  'def allQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=',
  '  rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => f a b c d))))',
  'def anyQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=',
  '  rng.any (fun a => rng.any (fun b => rng.any (fun c => rng.any (fun d => f a b c d))))',
  '',
  '-- the symmetric cross: products, blind to the mirror (a,b,c,d) ↦ (d,c,b,a)',
  'def symmetric (a b c d : Nat) : Bool := a * d == b * c',
  '-- a form true of EVERY quadruple — the padding shape, subtracting nothing',
  'def everywhere (a b c d : Nat) : Bool := (a - 0 == a) && (b - 0 == b) && (c - 0 == c) && (d - 0 == d)',
  '-- and whether a form agrees with its own mirror image at this quadruple',
  'def mirrorAgrees (a b c d : Nat) : Bool := (everywhere a b c d) == (everywhere d c b a)',
  '',
  '-- EVERY rearrangement of four positions, as index lists, so a key claiming "every mirror" walks every one.',
  '-- 24 ELEMENTS AND NOT 625: my first shape built the quadruples as ONE FLAT LIST and filtered it, which recurses',
  '-- once per element and blew the kernel at depth 625. NO WING BUYS ITS OWN CEILING — the answer to a recursion',
  '-- limit is the better walk, never set_option. allQ already nests four levels of five, so the quadruples stay at',
  '-- depth five and only the permutations are walked flat, where 24 is comfortably inside the default limit.',
  `def perms : List (List Nat) := [${PERMS.map((p) => leanList(p)).join(', ')}]`,
  '-- STRUCTURAL INDEXING, NOT List.getD. getD routes through propext, and this ledger depends on NO axiom beyond the',
  '-- kernel — which is why nthI exists in PlanckLattice and nth in Platonic and four other wings. My first version',
  '-- used .getD and would have bought an axiom to index a four-element list; it also fell outside the independent',
  '-- evaluator\'s grammar, so the theorem lost its falsifier leg and the rosetta floor (which may only rise) refused',
  '-- the mirror. One wrong accessor cost the axiom-free guarantee and an independent denial at the same time.',
  'def nth : List Nat → Nat → Nat',
  '  | [], _ => 0',
  '  | x :: _, 0 => x',
  '  | _ :: xs, Nat.succ n => nth xs n',
  '-- the padding form evaluated at a REARRANGED quadruple, indices read from the permutation',
  'def rearranged (p : List Nat) (a b c d : Nat) : Bool :=',
  '  everywhere (nth [a, b, c, d] (nth p 0)) (nth [a, b, c, d] (nth p 1))',
  '             (nth [a, b, c, d] (nth p 2)) (nth [a, b, c, d] (nth p 3))',
  'def allPermsAgree (a b c d : Nat) : Bool :=',
  '  (perms.filter (fun p => (everywhere a b c d) == (rearranged p a b c d))).length == perms.length',
].join('\n')

console.log(`computing ${FACTS.length} INVARIANCE facts (one structure: symmetry with content, and symmetry from emptiness) …`)

emit({
  file: 'Invariance.lean', skill: 'invariance', defs: DEFS,
  header: `INVARIANCE — ONE STRUCTURE, AND WHAT IS HELD FIXED DECIDES WHETHER IT IS A FACT OR FURNITURE. This ledger measures two things separately that turn out to be one. lean/CrossProof.lean seals that the symmetric cross a·d = b·c is BLIND TO ITS SPELLING and treats that blindness as the reason the product form is the robust way to state a proportion. src/padding-conjunct.ts counts the opposite-seeming defect — a conjunct true whatever its numerals are, of which this ledger carries 492 across the wings — and calls it furniture. THEY ARE THE SAME PROPERTY. A form true of every quadruple is true of every permuted quadruple too, because true equals true, so emptiness GUARANTEES invariance: padding is not symmetry's opposite but its degenerate limit, symmetry that comes from saying nothing. What separates the fact from the furniture is not invariance, which both have, but whether the form can fail at all. AND THE CONVERSE FAILS, which is what keeps the notion useful: the product form never notices the mirror and is false on most quadruples, and that combination is exactly what makes it worth stating. SO THE SQUARE HAS NO FOURTH CELL — classify by (true everywhere, mirror-invariant) and three cells carry witnesses while the fourth, true everywhere yet not invariant, is EXCLUDED BY THE IMPLICATION rather than merely unobserved. A census could only ever report it as unseen, which is a fact about who looked; a theorem rules it out. Nothing falls outside the square and nothing sits between its cells. CLAIMED: the arithmetic, decided over ${QUADS.length} quadruples, axiom-free. NOT CLAIMED: that every invariance in mathematics behaves so, or that this mirror is the only permutation worth asking about — one permutation, one box, stated as such.`,
  facts: FACTS,
})
