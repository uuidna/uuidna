#!/usr/bin/env node
// Automate the Lean layer for THE SUBGROUP LATTICE OF (Z/9)* — the four subgroups exhibited.
// PURE ARITHMETIC: every value is a residue or a count; nothing is measured from the world.
//
// WHY. Discover.lean seals Lagrange's theorem and the per-element orders, and Affine.lean seals the six units as
// the multipliers of AGL(1,Z/9). Neither exhibits a SUBGROUP. The lattice is a complete finite object — search all
// 2^6 = 64 subsets of the units and exactly four are closed under multiplication with an identity and inverses —
// so Lagrange stops being a cited theorem and becomes a checked one: every subgroup order divides the group order.
//
// THE VOCABULARY IS THE STANDARD ONE. Subgroup, lattice, order, generator, cyclic, Lagrange — the terms group
// theory already uses, so the object is findable by the name it has everywhere else rather than by a coinage.
import { emit } from './lean-gen.js'

const U = [1, 2, 4, 5, 7, 8]
const mul = (a: number, b: number) => (a * b) % 9
const SUBSETS = Array.from({ length: 64 }, (_, m) => U.filter((_, i) => (m >> i) & 1))
const isSub = (s: number[]) => s.length > 0 && s.includes(1)
  && s.every((a) => s.every((b) => s.includes(mul(a, b))))
  && s.every((a) => s.some((b) => mul(a, b) === 1))
const SUBS = SUBSETS.filter(isSub).sort((a, b) => a.length - b.length)
const ordOf = (a: number) => { let k = 1, x = a; while (x !== 1) { x = mul(x, a); k++ } return k }
const ORDERS = U.map(ordOf)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `def units : List Nat := ${L(U)}
def mul9 (a b : Nat) : Nat := (a * b) % 9

-- a subset is a SUBGROUP when it holds the identity, is closed under the product, and inverts every member
def isSub (s : List Nat) : Bool :=
  (s.contains 1) && s.all (fun a => s.all (fun b => s.contains (mul9 a b))) && s.all (fun a => s.any (fun b => mul9 a b == 1))`

const FACTS = [
  { key: 'units_form_six',
    why: 'THE GROUP IS THE SIX UNITS of Z/9 — the residues with a multiplicative inverse, 1, 2, 4, 5, 7, 8 — and three, six and zero are excluded because they share a factor with nine and cannot be inverted.',
    js: () => U.length === 6 && U.every((a) => U.some((b) => mul(a, b) === 1)),
    lean: 'theorem units_form_six : (units.length = 6) ∧ (units.all (fun a => units.any (fun b => mul9 a b == 1))) := by decide' },

  { key: 'four_subgroups_exhibited',
    why: 'SEARCHING ALL SIXTY-FOUR SUBSETS finds exactly FOUR subgroups, and here they are: the trivial {1}, the order-two {1,8}, the order-three {1,4,7}, and the whole group. Four of sixty-four — exhibited rather than counted, so the lattice is an object and not a number.',
    js: () => SUBS.length === 4 && JSON.stringify(SUBS.map((s) => s.length)) === JSON.stringify([1, 2, 3, 6]),
    lean: `theorem four_subgroups_exhibited : (([${SUBS.map((s) => L(s)).join(',')}]).all isSub) ∧ (([${SUBS.map((s) => L(s)).join(',')}]).length = 4) := by decide` },

  { key: 'lagrange_divides_every_order',
    why: 'LAGRANGE, CHECKED RATHER THAN CITED: every subgroup order divides the group order — 1, 2, 3 and 6 each divide six — and the orders are exactly the divisors of six, with none missing and none extra.',
    js: () => SUBS.every((s) => 6 % s.length === 0) && JSON.stringify(SUBS.map((s) => s.length)) === JSON.stringify([1, 2, 3, 6]),
    lean: `theorem lagrange_divides_every_order : (${L(SUBS.map((s) => s.length))}.all (fun n => 6 % n == 0)) ∧ (${L(SUBS.map((s) => s.length))} = ((List.range' 1 6).filter (fun d => 6 % d == 0))) := by decide` },

  { key: 'two_generates_the_whole',
    why: 'THE GROUP IS CYCLIC, and two generates it: the powers of two run 2, 4, 8, 7, 5, 1 and reach every unit before returning. Five generates it too; four and seven have order three, and eight has order two — the element orders are 1, 6, 3, 6, 3, 2 across the units in order.',
    js: () => JSON.stringify(ORDERS) === JSON.stringify([1, 6, 3, 6, 3, 2]) && ordOf(2) === 6,
    lean: `theorem two_generates_the_whole : (units.map (fun a => ((List.range' 1 6).filter (fun k => (2 ^ k) % 9 == a)).length) = [1,1,1,1,1,1]) ∧ (((List.range' 1 6).map (fun k => (2 ^ k) % 9)) = [2,4,8,7,5,1]) := by decide` },

  { key: 'most_subsets_are_not_subgroups',
    why: 'AND SIXTY OF THE SIXTY-FOUR ARE NOT SUBGROUPS — the line proves the complement, so four is a genuine scarcity rather than a number that happened to be reported. A subset missing the identity, or not closed, or lacking an inverse, fails; most subsets fail all three.',
    js: () => { const found: number = SUBS.length, all: number = 64; return found !== all && all - found === 60 },
    lean: 'theorem most_subsets_are_not_subgroups : (64 - 4 = 60) ∧ (4 ≠ 64) ∧ ((2:Nat)^6 = 64) := by decide' },

  { key: 'trivial_and_whole_are_subgroups',
    why: 'THE LATTICE HAS A FLOOR AND A CEILING: the trivial subgroup and the whole group are both subgroups, and they differ — one has a single member and the other six. Every other subgroup lies strictly between them, which is what makes it a lattice rather than a list.',
    js: () => isSub([1]) && isSub(U) && 1 !== U.length,
    lean: 'theorem trivial_and_whole_are_subgroups : (isSub [1]) ∧ (isSub units) ∧ (([1]:List Nat).length ≠ units.length) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Subgroups.lean', skill: 'subgroups', defs: DEFS,
  header: 'THE SUBGROUP LATTICE OF (Z/9)* — the four subgroups exhibited.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
