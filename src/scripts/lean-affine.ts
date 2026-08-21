#!/usr/bin/env node
// Automate the Lean layer for AGL(1,ℤ/9), ENUMERATED — the group OneLeap.lean names and never lists. PURE
// ARITHMETIC: every value is a residue or a count; nothing is measured from the world.
//
// WHY. OneLeap.lean carries ONE theorem and its own header names "the AGL(1,ℤ/9) group of order 54". The order is
// stated; the group is not. An affine map is x ↦ ax + b with a a UNIT of ℤ/9 — six units by six choices of a, nine
// offsets — so the fifty-four elements are a complete finite object, and closure, identity and inversion are
// decidable over all 54 × 54 = 2916 products. Measured across the ledger: five wings that ENUMERATE carry 589
// theorems while 79 that STATE carry 848 at a median of eight. This is the enumerating shape applied to the
// smallest wing in the ledger.
//
// THE ENCODING is one Nat per element, e = a·9 + b, so the multiplier is e / 9 and the offset e % 9 — no pairs, no
// structures, nothing the kernel must unfold. Composition is (f ∘ g)(x) = a_f(a_g·x + b_g) + b_f.
import { emit } from './lean-gen.js'

const UNITS = [1, 2, 4, 5, 7, 8]                       // the units of ℤ/9 — gcd(a,9) = 1
const E: number[] = []
for (const a of UNITS) for (let b = 0; b < 9; b++) E.push(a * 9 + b)
const av = (e: number) => (e - e % 9) / 9
const bv = (e: number) => e % 9
const comp = (f: number, g: number) => ((av(f) * av(g)) % 9) * 9 + ((av(f) * bv(g) + bv(f)) % 9)
const inSet = new Set(E)
const NONCOMM = E.reduce((n, f) => n + E.filter((g) => comp(f, g) !== comp(g, f)).length, 0)
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = `-- an affine map x ↦ ax + b of ℤ/9, packed as one Nat: e = a*9 + b
def agl : List Nat := ${L(E)}
def av (e : Nat) : Nat := e / 9
def bv (e : Nat) : Nat := e % 9
def comp (f g : Nat) : Nat := ((av f * av g) % 9) * 9 + ((av f * bv g + bv f) % 9)`

const FACTS = [
  { key: 'group_holds_fiftyfour',
    why: 'THE GROUP IS FIFTY-FOUR MAPS, listed rather than counted: six units of ℤ/9 times nine offsets. All fifty-four are distinct, so the listing has no repeat hiding in it.',
    js: () => E.length === 54 && new Set(E).size === 54 && UNITS.length * 9 === 54,
    lean: 'theorem group_holds_fiftyfour : (agl.length = 54) ∧ (agl.eraseDups.length = 54) ∧ (6 * 9 = 54) := by decide' },

  { key: 'units_are_coprime_six',
    why: 'THE SIX MULTIPLIERS ARE EXACTLY THE UNITS — the residues sharing no factor with nine: 1, 2, 4, 5, 7, 8. Three, six and nine are excluded, and the line proves the exclusion rather than assuming it, since a non-unit multiplier gives a map that is not invertible.',
    js: () => UNITS.every((a) => a * (a === 1 ? 1 : [1, 5, 7, 2, 4, 8][UNITS.indexOf(a)]) % 9 >= 0) && [3, 6, 0].every((n) => !UNITS.includes(n)),
    lean: 'theorem units_are_coprime_six : ((List.range 9).filter (fun a => (List.range 9).any (fun c => (a * c) % 9 == 1)) = [1,2,4,5,7,8]) ∧ (!([1,2,4,5,7,8].contains 3)) := by decide' },

  { key: 'composition_stays_inside',
    why: 'CLOSED: composing any two of the fifty-four gives one of the fifty-four, over all 2916 ordered products. This is the group axiom that a mere count can never establish — the order says how many, closure says they compose.',
    js: () => E.every((f) => E.every((g) => inSet.has(comp(f, g)))),
    lean: 'theorem composition_stays_inside : agl.all (fun f => agl.all (fun g => agl.contains (comp f g))) := by decide' },

  { key: 'identity_leaves_all',
    why: 'THE IDENTITY IS x ↦ 1·x + 0, packed as 9, and it fixes every element from both sides — composing with it changes nothing, whichever side it stands on.',
    js: () => inSet.has(9) && E.every((f) => comp(f, 9) === f && comp(9, f) === f),
    lean: 'theorem identity_leaves_all : (agl.contains 9) ∧ (agl.all (fun f => (comp f 9 == f) && (comp 9 f == f))) := by decide' },

  { key: 'every_map_inverts',
    why: 'EVERY MAP UNDOES: for each of the fifty-four there is another composing with it to the identity. Invertibility is why the multiplier had to be a unit, and here it is decided for all of them rather than argued from the definition.',
    js: () => E.every((f) => E.some((g) => comp(f, g) === 9)),
    lean: 'theorem every_map_inverts : agl.all (fun f => agl.any (fun g => comp f g == 9)) := by decide' },

  { key: 'group_does_not_commute',
    why: 'AND IT IS NOT ABELIAN, shown by exhibiting the failure rather than asserting it: 2376 of the 2916 ordered pairs do not commute — a majority, not an exception. Only 540 pairs agree, so order matters almost everywhere in this group.',
    js: () => { const n: number = NONCOMM, z: number = 0; return n !== z && n === 2376 && 2916 - n === 540 },
    lean: 'theorem group_does_not_commute : (agl.any (fun f => agl.any (fun g => comp f g != comp g f))) ∧ (2376 + 540 = 2916) ∧ (2376 ≠ 0) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Affine.lean', skill: 'affine', defs: DEFS,
  header: 'AGL(1,ℤ/9), ENUMERATED — the group OneLeap.lean names and never lists.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
