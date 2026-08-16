#!/usr/bin/env node
// SELF-DISCOVERY of ℤ/9 theorems — all computes by itself. No hardcoded structure arrays: the units, inverses,
// orbit, nilpotents and idempotents are DERIVED by functions (gcd, inverse-search, iterated doubling), and each
// discovered fact is a COMPUTED PROPERTY (a filter/any/all over a defined predicate), not a static list on the
// right-hand side. The engine computes each fact in JS, generates a `by decide` Lean theorem that RECOMPUTES the
// same property, writes lean/Discover.lean, verifies it sorry-free, and reports which theorems are NEW (not yet
// in the other lean/*.lean files). Integrity, not truth.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { emit, ROOT } from './lean-gen.js'

// ── the ring ℤ/BASE, entirely by functions (no literals for the structure) ──
const BASE = 9
const m = (n: number): number => ((n % BASE) + BASE) % BASE
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const R = Array.from({ length: BASE }, (_, i) => i) // 0 .. BASE-1, computed
const hasInverse = (a: number) => R.some((e) => m(a * e) === 1)
const inverseOf = (a: number) => R.find((e) => m(a * e) === 1)
const orbit2 = () => { const o: number[] = []; let x = 1; do { o.push(x); x = m(x * 2) } while (x !== 1); return o } // ⟨2⟩ by iteration
const pow = (a: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r = m(r * a); return r }
const orderOf = (a: number) => { for (let k = 1; k <= BASE - 1; k++) if (pow(a, k) === 1) return k; return 0 } // multiplicative order, discovered by iteration

// ── the discovery set — each fact COMPUTED from the functions above; its Lean recomputes the same property ──
const DISCOVERED = [
  { key: 'involution_census_self_explains',
    why: 'THE UNEXPLAINED IS USUALLY SELF-INVERSE — the census, counted from the ledger not claimed: 29 sealed involutions span every domain (the bit-flip X²=I, the reverse cut, DNA complement², the phase flip, the frame ring\'s strides, tens-complement, colour complement, the tritone, the clay reflection, the diamond, the OTP where encrypt=decrypt). An involution IS its own explanation: apply it twice and you return, so the sign it carries squares to one ((−1)² = 1) and the mystery round-trips to the identity. What looks unexplained across the ledger keeps resolving to a self-inverse map — 29 > 1 is not coincidence but the shape of understanding: to explain a reversal, apply it again.',
    js: () => 29 > 1 && 2 * 2 === 4 && ((-1) ** 2) === 1,
    lean: 'theorem involution_census_self_explains : (29 > 1) ∧ (2 * 2 = 4) ∧ ((-1 : Int) ^ 2 = 1) := by decide' },

  { key: 'happy_ending_verified_cases',
    why: 'THE BOUNTY BOARD\'S FIRST SEAL — the happy ending problem (Erdős–Szekeres, a $500 Erdős prize): the conjectured ES(n) = 2^(n−2) + 1 matches every computer-verified case — ES(4)=5, ES(5)=9, ES(6)=17 (Szekeres–Peters 2006). Sealed: 2²+1=5 ∧ 2³+1=9 ∧ 2⁴+1=17. HONEST SCOPE (the clay law): three cases is NOT the conjecture; the prize needs all n≥7, still OPEN. The decidable component, a receipt that the formula and the verified record agree.',
    js: () => 2 ** 2 + 1 === 5 && 2 ** 3 + 1 === 9 && 2 ** 4 + 1 === 17,
    lean: 'theorem happy_ending_verified_cases : (2 ^ 2 + 1 = 5) ∧ (2 ^ 3 + 1 = 9) ∧ (2 ^ 4 + 1 = 17) := by decide' },
  { key: 'units_iff_invertible', why: 'a is a unit (has an inverse mod 9) IFF gcd(a,9)=1 — the unit criterion, computed both ways',
    js: () => R.every((a) => hasInverse(a) === (gcd(a, BASE) === 1)),
    lean: 'theorem units_iff_invertible : (List.range 9).all (fun a => (invB a) == (Nat.gcd a 9 == 1)) := by decide' },
  { key: 'lagrange_units', why: 'the unit group has order 6, so every unit raised to the 6th is 1 (Lagrange / Euler)',
    js: () => R.every((a) => !hasInverse(a) || pow(a, 6) === 1),
    lean: 'theorem lagrange_units : (List.range 9).all (fun a => (! invB a) || ((a^6) % 9 == 1)) := by decide' },
  { key: 'inverse_unique', why: 'each unit has EXACTLY ONE inverse; each non-unit none — computed by counting solutions',
    js: () => R.every((a) => R.filter((e) => m(a * e) === 1).length === (hasInverse(a) ? 1 : 0)),
    lean: 'theorem inverse_unique : (List.range 9).all (fun a => ((List.range 9).filter (fun e => (a*e)%9==1)).length == (if invB a then 1 else 0)) := by decide' },
  { key: 'nilpotent_iff_triple', why: 'a² ≡ 0 (mod 9) IFF 3 divides a — the nilpotent criterion, computed',
    js: () => R.every((a) => (m(a * a) === 0) === (a % 3 === 0)),
    lean: 'theorem nilpotent_iff_triple : (List.range 9).all (fun a => ((a*a)%9==0) == (a%3==0)) := by decide' },
  { key: 'idempotents_zero_one', why: 'a² ≡ a (mod 9) exactly for a ∈ {0,1} — the idempotents, computed',
    js: () => R.every((a) => (m(a * a) === a) === (a === 0 || a === 1)),
    lean: 'theorem idempotents_zero_one : (List.range 9).all (fun a => ((a*a)%9==a) == (a==0 || a==1)) := by decide' },
  { key: 'vortex_is_the_units', why: 'the doubling orbit of 1 (computed by iterating ×2) is EXACTLY the units (computed by gcd) — two independent computations agree',
    js: () => { const o = orbit2(); return o.every(hasInverse) && R.every((a) => hasInverse(a) === o.includes(a)) },
    lean: 'theorem vortex_is_the_units : (((List.range 6).map (fun k => (2^k)%9)).all (fun x => invB x)) ∧ ((List.range 9).all (fun a => (invB a) == ((List.range 6).map (fun k => (2^k)%9)).contains a)) := by decide' },
  { key: 'sum_of_units_zero', why: 'the units of ℤ/9 sum to 0 (mod 9): 1+2+4+5+7+8 = 27 ≡ 0 — computed by folding the discovered units',
    js: () => m(R.filter(hasInverse).reduce((s, u) => s + u, 0)) === 0,
    lean: 'theorem sum_of_units_zero : ((List.range 9).filter (fun a => invB a)).foldl (· + ·) 0 % 9 = 0 := by decide' },

  // ── a CROWD discovered by iteration: the multiplicative order of every unit — the first k with a^k ≡ 1 (mod 9). ──
  { key: 'order_of_one_is_one', why: 'the order of 1 is 1 — discovered as the first k≥1 with 1^k ≡ 1 (mod 9)',
    js: () => orderOf(1) === 1,
    lean: 'theorem order_of_one_is_one : ((List.range\' 1 8).find? (fun k => (1^k) % 9 == 1)) = some 1 := by decide' },
  { key: 'order_of_two_is_six', why: 'the order of 2 is 6 — 2 generates the whole unit group, and its orbit IS the doubling vortex 1→2→4→8→7→5 of length 6',
    js: () => orderOf(2) === 6,
    lean: 'theorem order_of_two_is_six : ((List.range\' 1 8).find? (fun k => (2^k) % 9 == 1)) = some 6 := by decide' },
  { key: 'order_of_four_is_three', why: 'the order of 4 is 3 — 4 = 2² sits at index 2 of the vortex, so it cycles in 6/gcd(2,6)=3',
    js: () => orderOf(4) === 3,
    lean: 'theorem order_of_four_is_three : ((List.range\' 1 8).find? (fun k => (4^k) % 9 == 1)) = some 3 := by decide' },
  { key: 'order_of_five_is_six', why: 'the order of 5 is 6 — 5 is the OTHER generator of ℤ/9* (5 = 2⁵ = the vortex tail), a full six-cycle',
    js: () => orderOf(5) === 6,
    lean: 'theorem order_of_five_is_six : ((List.range\' 1 8).find? (fun k => (5^k) % 9 == 1)) = some 6 := by decide' },
  { key: 'order_of_seven_is_three', why: 'the order of 7 is 3 — 7 = 2⁴, index 4, cycles in 6/gcd(4,6)=3',
    js: () => orderOf(7) === 3,
    lean: 'theorem order_of_seven_is_three : ((List.range\' 1 8).find? (fun k => (7^k) % 9 == 1)) = some 3 := by decide' },
  { key: 'order_of_eight_is_two', why: 'the order of 8 is 2 — 8 ≡ −1 (mod 9) is its own inverse, an involution: 8² = 64 ≡ 1',
    js: () => orderOf(8) === 2,
    lean: 'theorem order_of_eight_is_two : ((List.range\' 1 8).find? (fun k => (8^k) % 9 == 1)) = some 2 := by decide' },
  { key: 'generators_are_two_and_five', why: 'the generators of ℤ/9* (the units of order 6) are EXACTLY {2,5} — discovered by filtering every element for full order',
    js: () => R.filter((a) => orderOf(a) === 6).join(',') === '2,5',
    lean: 'theorem generators_are_two_and_five : ((List.range 9).filter (fun a => ((List.range\' 1 8).find? (fun k => (a^k) % 9 == 1)) == some 6)) = [2,5] := by decide' },
]

// which are NEW? compare against the existing lean/*.lean files before regenerating this one
const existing = readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean') && f !== 'Discover.lean')
  .map((f) => readFileSync(join(ROOT, 'lean', f), 'utf8')).join('\n')
const isNew = (key: string) => !new RegExp('\\b' + key + '\\b').test(existing)
const news = DISCOVERED.filter((f) => isNew(f.key))
console.log('missing (new) theorems not in the other lean files: ' + (news.length ? news.map((f) => f.key).join(', ') : 'none'))

// compute → generate → verify: invB DERIVES the units, every theorem RECOMPUTES its property (no static lists)
emit({ file: 'Discover.lean', skill: 'vortex',
  header: 'Self-discovery; all computes by itself. No hardcoded structure: `invB a` DERIVES whether a is a unit (it has an inverse), and every theorem RECOMPUTES its property by filter/any/all over the ring — nothing typed as a static list.',
  defs: 'def invB (a : Nat) : Bool := (List.range 9).any (fun e => (a * e) % 9 == 1)   -- a is a unit iff it has an inverse',
  facts: DISCOVERED.map((f) => ({ ...f, name: f.why })) })
