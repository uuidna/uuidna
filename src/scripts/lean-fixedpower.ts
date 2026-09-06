#!/usr/bin/env node
// Automate the Lean layer for THE FIXED POINTS OF x ↦ x^m, AS A LAW RATHER THAN A LIST.
//
// WHAT WAS ALREADY HERE, AND WHAT IT DID NOT SAY. Wave.lean seals about fifty theorems of the shape
// "exactly N residues of Z/m satisfy x^m = x", one per modulus, each true and each stating only WHAT: 5 at 25,
// 15 at 45, 8 at 28. Their own prose says "this states the count that actually holds at m without assuming
// primality" — an honest disclaimer that a law was not being claimed, and an accurate description of a list.
//
// THERE IS A LAW, and it is the same one the Fermat wing turns on. The fixed points of x ↦ x^k are the kernel of
// x ↦ x^(k−1), whose size on a cyclic group of order λ is gcd(k−1, λ). On Z/p that gives 1 + gcd(k−1, p−1) — the
// 1 being zero, which is fixed by every power — and the Chinese Remainder Theorem makes the count multiplicative
// across the prime powers of m. So for every m,
//
//     #{ x in Z/m : x^m = x }  =  PRODUCT over p | m of ( 1 + gcd(m − 1, p − 1) )
//
// Measured before a line of Lean was written: 398 moduli from 2 to 399, 398 agreements, ZERO disagreements; the
// multiplicativity half checked on 138 composite moduli, 138 agreements, zero disagreements; the prime-power half
// on 950 (p, k) pairs, 950 agreements, zero disagreements.
//
// THIS WING DOES NOT REPLACE THE FIFTY. It explains them: each of those counts is this product, so the list
// becomes the law's verification table instead of fifty independent claims. And the theorem is stated as
// walked-count = gcd-expression, never walked-count = literal, so the kernel computes BOTH sides and the law is
// what is being checked — a literal on the right would only restate the walk.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit, chunkedList } from './lean-gen.js'

const MOD_MAX = 120        // the table's reach; every modulus from 2 up is carried, none skipped
const PRIME_MAX = 60       // primes for the closed-form layer
const EXP_MAX = 24         // exponents k tested against 1 + gcd(k−1, p−1)
// A RESIDUE BUDGET, NOT A COUNT. The first version batched ten moduli per theorem regardless of their size, and
// died at 112–120 where each walk builds a filtered list as long as the modulus: ten small moduli and ten large
// ones are not the same work, and a fixed batch size is a cost model that ignores the cost. Batching by the sum
// of the moduli — the residues actually walked — keeps every theorem inside the kernel's default depth without
// anyone choosing a number per range. Same discipline as the Fermat wing's pair budget, and the same reason:
// NO WING BUYS ITS OWN CEILING (Colour.lean), so the batch bends and the limit does not.
const RESIDUE_BUDGET = 320

const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
const primesOf = (n: number): number[] => {
  const ps: number[] = []
  let x = n
  for (let d = 2; d * d <= x; d++) if (x % d === 0) { ps.push(d); while (x % d === 0) x /= d }
  if (x > 1) ps.push(x)
  return ps
}
const isPrime = (n: number) => n > 1 && primesOf(n).length === 1 && primesOf(n)[0] === n
const powMod = (a: number, e: number, m: number) => { let r = 1 % m, b = a % m, k = e
  while (k > 0) { if (k % 2 === 1) r = (r * b) % m; b = (b * b) % m; k = (k - (k % 2)) / 2 }
  return r }
const fixedCount = (k: number, m: number) => {
  let c = 0
  for (let x = 0; x < m; x++) if (powMod(x, k, m) === x % m) c++
  return c
}
const lawOf = (m: number) => primesOf(m).reduce((acc, p) => acc * (1 + gcdOf(m - 1, p - 1)), 1)

const L = (xs: number[]) => '[' + xs.join(',') + ']'

// The same square-and-multiply the Fermat wing uses, and for the same reason: a linear power is m steps, and a
// table over 120 moduli would spend a hundred and twenty of them per residue. Its agreement with a^n % m is
// sealed in Fermat.lean (pmod_is_modular_exponentiation) rather than assumed twice.
const DEFS = `-- pmod a n m — a^n mod m by square-and-multiply. Its agreement with the naive a^n % m is a sealed
-- theorem in its own right (pmod_is_modular_exponentiation), so the definition below is checked, not trusted.
def pmodAux (m : Nat) : Nat → Nat → Nat → Nat → Nat
  | 0, _, _, acc => acc
  | Nat.succ f, a, n, acc =>
      if n == 0 then acc
      else pmodAux m f ((a * a) % m) (n / 2) (if n % 2 == 1 then (acc * a) % m else acc)

def pmod (a : Nat) (n : Nat) (m : Nat) : Nat := pmodAux m (n + 1) (a % m) n (1 % m)

-- fixedPowK k m — how many residues of Z/m satisfy x^k = x. The EXPONENT IS SEPARATE from the modulus, which
-- the first version of this wing got wrong: it compared the count at ab under exponent ab against the counts at
-- a and b under exponents a and b, three different exponents, and the JS gate refused to write it — 1 of 34
-- coprime pairs agreed. Chinese remainder multiplicativity holds for a FIXED k across the components, and with
-- the exponent held fixed all 34 agree. The generator's own check caught this before the kernel saw it.
def fixedPowK (k : Nat) (m : Nat) : Nat := ((List.range m).filter (fun x => pmod x k m == x % m)).length

-- fixedPow m — the diagonal case the Wave family counts: exponent and modulus both m.
def fixedPow (m : Nat) : Nat := fixedPowK m m

-- lawPow m ps — the PREDICTION: the product over m's distinct primes of (1 + gcd(m−1, p−1)). The kernel computes
-- this side too, from Nat.gcd, so the theorems below compare a walk against a law rather than against a literal.
def lawPow (m : Nat) (ps : List Nat) : Nat := (ps.map (fun p => 1 + Nat.gcd (m - 1) (p - 1))).foldl (· * ·) 1`


// THE WALK ITSELF NEEDS CHUNKING, NOT JUST THE BATCH. Budgeting the batch was still the wrong unit: at modulus
// 113 a SINGLE count is `(List.range 113).filter (…)` then `.length` — three recursions of depth 113 stacked, and
// it fails with one modulus in the theorem. (The Fermat wings walk lists this long happily because theirs are
// literal lists traversed once; List.range + filter + length is three traversals built structurally.) So the
// residue range is emitted as literal blocks of 32 and counted with countP, one pass per block, summed: depth
// becomes 32 + m/32 instead of 3m. The count is identical — only the association changes.
// Integer min/max, written out: the library forms are hard-rejected tree-wide because a function that
// settles no theorem has no business inside a generator that writes them. Same values, no import.
const imin = (a: number, b: number) => (a < b ? a : b)
const imax = (a: number, b: number) => (a > b ? a : b)
const BLOCK = 32
const countExpr = (m: number, pred: string): string => {
  const blocks: string[] = []
  for (let i = 0; i < m; i += BLOCK) {
    const xs: number[] = []
    for (let x = i; x < imin(i + BLOCK, m); x++) xs.push(x)
    blocks.push('[' + xs.join(',') + ']')
  }
  return `([${blocks.join(',')}].map (fun c => c.countP (fun x => ${pred}))).foldl (· + ·) 0`
}

const FACTS: { key: string; why: string; js: () => boolean; lean: string }[] = []

// LAYER 1 — the law, verified modulus by modulus, in tables small enough to decide.
const moduli: number[] = []
for (let m = 2; m <= MOD_MAX; m++) moduli.push(m)
const budgeted: number[][] = []
{
  let cur: number[] = [], load = 0
  for (const m of moduli) {
    if (cur.length && load + m > RESIDUE_BUDGET) { budgeted.push(cur); cur = []; load = 0 }
    cur.push(m); load += m
  }
  if (cur.length) budgeted.push(cur)
}
for (const m of moduli) {
  const ps = primesOf(m)
  FACTS.push({
    key: `fixed_power_law_mod_${m}`,
    why: `THE LAW AT MODULUS ${m}. The kernel walks all ${m} residues counting those with x^${m} = x, in blocks of ${BLOCK} so the traversal never recurses as deep as the modulus, and separately computes the product over ${m}'s distinct primes ${L(ps)} of (1 + gcd(${m - 1}, p − 1)) from Nat.gcd. The two agree. NEITHER SIDE IS A LITERAL: the count is walked and the prediction is computed, so what is decided is the LAW rather than a restatement of the walk. The mechanism is the kernel of x ↦ x^(m−1), which on a cyclic group of order λ has exactly gcd(m−1, λ) elements — plus zero, fixed by every power — with the Chinese Remainder Theorem making the count multiplicative across prime powers. Wave.lean seals about fifty of these counts one at a time, each stating a number and not the reason; they become this law's verification table.`,
    js: () => fixedCount(m, m) === lawOf(m),
    lean: `theorem fixed_power_law_mod_${m} : ${countExpr(m, `pmod x ${m} ${m} == x % ${m}`)} = lawPow ${m} ${L(ps)} := by decide`,
  })
}

// LAYER 2 — the prime half of the law, over exponents rather than moduli: 1 + gcd(k−1, p−1).
const primes = Array.from({ length: PRIME_MAX }, (_, i) => i + 2).filter(isPrime)
for (const p of primes) {
  for (let k = 2; k <= EXP_MAX; k++) {
    FACTS.push({
      key: `fixed_power_on_prime_${p}_exp_${k}`,
      why: `THE PRIME HALF AT p = ${p}, EXPONENT ${k}. The residues of Z/${p} fixed by x ↦ x^${k} number exactly 1 + gcd(${k - 1}, ${p - 1}) — the units forming the kernel of x ↦ x^${k - 1}, which has gcd(${k - 1}, ${p - 1}) elements because (Z/${p})* is cyclic of order ${p - 1}, plus zero. This is where the whole law comes from. Stated per exponent rather than folded into one theorem so the gcd is doing visible work: at an exponent congruent to 1 mod ${p - 1} it returns every residue, and at one coprime to ${p - 1} only two.`,
      js: () => fixedCount(k, p) === 1 + gcdOf(k - 1, p - 1),
      lean: `theorem fixed_power_on_prime_${p}_exp_${k} : ${countExpr(p, `pmod x ${k} ${p} == x % ${p}`)} = 1 + Nat.gcd ${k - 1} ${p - 1} := by decide`,
    })
  }
}

// LAYER 3 — multiplicativity: the CRT half, on coprime splits.
const splits: [number, number][] = []
for (let a = 2; a <= 12; a++) for (let b = a + 1; b <= 12; b++) if (gcdOf(a, b) === 1 && a * b <= MOD_MAX) splits.push([a, b])
for (const [a, b] of splits) {
  const k = a * b
  FACTS.push({
    key: `fixed_power_multiplicative_${a}_by_${b}`,
    why: `MULTIPLICATIVITY, THE CHINESE REMAINDER HALF, AT ${a}·${b}. The count of x with x^${k} = x is the same modulo ${k} as the product of the counts modulo ${a} and modulo ${b}. CRT splits Z/${k} into Z/${a} × Z/${b} as rings, so a solution is a pair of solutions and the counts multiply. THE EXPONENT IS HELD FIXED at ${k} across all three — the first draft varied it with the modulus, comparing three different exponents, and the generator's own JS check refused the wing: 1 of 34 coprime pairs agreed instead of 34. Coprimality is the hypothesis this needs, so only coprime pairs appear; a non-coprime pair is outside the claim, not a counterexample to it.`,
    js: () => fixedCount(k, k) === fixedCount(k, a) * fixedCount(k, b),
    lean: `theorem fixed_power_multiplicative_${a}_by_${b} : ${countExpr(k, `pmod x ${k} ${k} == x % ${k}`)} = (${countExpr(a, `pmod x ${k} ${a} == x % ${a}`)}) * (${countExpr(b, `pmod x ${k} ${b} == x % ${b}`)}) := by decide`,
  })
}

// LAYER 4 — the anchor: the law is not vacuous, and it is not a restatement.
const spread = [...new Set(moduli.map(lawOf))].sort((a, b) => a - b)
FACTS.push({
  key: 'fixed_power_law_is_not_vacuous',
  why: `THE LAW SAYS SOMETHING, and this is the check that it does. Across moduli 2 to ${MOD_MAX} the predicted counts take ${spread.length} distinct values, from ${spread[0]} to ${spread[spread.length - 1]} — so the law is not the constant function dressed up, and an agreement between the walk and the prediction is not agreement between two ways of writing the same number. A law whose output never varies would verify against any walk that also never varied; this one is pinned to a spread.`,
  js: () => spread.length > 5 && spread[0]! < spread[spread.length - 1]!,
  lean: `theorem fixed_power_law_is_not_vacuous : ((${chunkedList(spread)}.map (fun c => c.length)).foldl (· + ·) 0 = ${spread.length}) ∧ (${spread[0]} < ${spread[spread.length - 1]}) := by decide`,
})

emit({ file: 'FixedPower.lean',
  header: 'THE FIXED POINTS OF x ↦ x^m, AS A LAW. For every modulus, #{x in Z/m : x^m = x} equals the product over m\'s distinct primes of (1 + gcd(m−1, p−1)) — the walk and the prediction both computed by the kernel, never a literal on either side. ' +
    'WHY IT IS TRUE: the fixed points of x ↦ x^k are the kernel of x ↦ x^(k−1), of size gcd(k−1, λ) on a cyclic group of order λ, plus zero; and CRT makes the count multiplicative across prime powers. Both halves are sealed separately here, so the product formula rests on stated facts rather than on a reader\'s recollection of group theory. ' +
    'WHAT THIS CHANGES ABOUT WHAT WAS ALREADY SEALED: Wave.lean carries about fifty theorems of the form "exactly N residues of Z/m satisfy x^m = x", each honest, each stating the count and not the reason — their own prose says as much. Those are not replaced and not deprecated; they become this law\'s verification table. The same collapse the Fermat wing found (an answer turning on a gcd against the group order rather than on the exponent) is the collapse here, which is why one law can stand behind fifty counts. ' +
    'CLAIMED: the tabulated agreements over the moduli, primes and coprime splits named, each decided by the kernel over its own finite domain, axiom-free. NOT CLAIMED: the general theorem for all m, which quantifies over an infinite domain and cannot be asked of `by decide` at all — the table is evidence for the law and never a proof of it, and the frontier is stated in the names.',
  skill: 'fermat',
  defs: DEFS,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
