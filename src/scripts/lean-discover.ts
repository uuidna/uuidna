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

// ── the discovery set — each fact COMPUTED from the functions above; its Lean recomputes the same property ──
const DISCOVERED = [
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
]

// which are NEW? compare against the existing lean/*.lean files before regenerating this one
const existing = readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean') && f !== 'Discover.lean')
  .map((f) => readFileSync(join(ROOT, 'lean', f), 'utf8')).join('\n')
const isNew = (key: string) => !new RegExp('\\b' + key + '\\b').test(existing)
const news = DISCOVERED.filter((f) => isNew(f.key))
console.log('missing (new) theorems not in the other lean files: ' + (news.length ? news.map((f) => f.key).join(', ') : 'none'))

// compute → generate → verify: invB DERIVES the units, every theorem RECOMPUTES its property (no static lists)
emit({ file: 'Discover.lean',
  header: 'Self-discovery; all computes by itself. No hardcoded structure: `invB a` DERIVES whether a is a unit (it has an inverse), and every theorem RECOMPUTES its property by filter/any/all over the ring — nothing typed as a static list.',
  defs: 'def invB (a : Nat) : Bool := (List.range 9).any (fun e => (a * e) % 9 == 1)   -- a is a unit iff it has an inverse',
  facts: DISCOVERED.map((f) => ({ ...f, name: f.why })) })
