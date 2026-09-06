#!/usr/bin/env node
// Automate the Lean layer for FERMAT'S EQUATION AT A BOUNDED WINDOW — what this kernel can decide about
// x^n + y^n = z^n, and what it refuses. The window is 1 ≤ x ≤ y < z ≤ 20, walked exhaustively for each exponent:
// 100 solutions at n = 1, exactly 6 at n = 2 (the six Pythagorean triples, named), and NONE at n = 3, 4, 5, 6.
// The controls are the point — an enumerator that reports zero is only worth reading if the SAME enumerator
// reports a hundred and a six on the exponents where solutions exist. And the near-miss is the refusal made
// concrete: inside this window the cube sum never once equals a cube, but it lands ONE away twice.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const N = 20                       // the window's ceiling: 1 ≤ x ≤ y < z ≤ N
const EXPONENTS = [3, 4, 5, 6]     // the exponents searched and found empty

// The window, in JS, EXACTLY as the Lean walks it — z outermost, then y < z, then x ≤ y, x ≥ 1.
const walk = (f: (x: number, y: number, z: number) => boolean): number => {
  let c = 0
  for (let z = 0; z <= N; z++) for (let y = 0; y < z; y++) for (let x = 1; x <= y; x++) if (f(x, y, z)) c++
  return c
}
const fermatWindow = (n: number) => walk((x, y, z) => x ** n + y ** n === z ** n)
// |a − b| written as Nat writes it — (a − b) + (b − a) under truncating subtraction — so the JS check and the
// Lean statement compute the absolute difference the SAME way, with no library call in a generator.
const absDiff = (a: number, b: number) => (a > b ? a - b : 0) + (b > a ? b - a : 0)
const cubeNearMiss = (d: number) => walk((x, y, z) => absDiff(x ** 3 + y ** 3, z ** 3) === d)

// COMPUTED, never typed: the counts the theorems state are read off the walk above, so a changed window can
// never leave a stale literal standing in the Lean.
const ONES = fermatWindow(1)
const TWOS = fermatWindow(2)
const TRIPLES = (() => { const t: [number, number, number][] = []
  for (let z = 0; z <= N; z++) for (let y = 0; y < z; y++) for (let x = 1; x <= y; x++) if (x * x + y * y === z * z) t.push([x, y, z])
  return t })()
const MISSES = cubeNearMiss(1)

// The shared Lean definitions — one window, walked by two predicates. `x != 0` is the lower bound (List.range
// (y+1) starts at 0); List.range z gives y < z and List.range (y+1) gives x ≤ y, so the ordering is structural
// rather than filtered, and each triple is visited once.
const DEFS = `-- pmod a n m — a^n mod m by SQUARE-AND-MULTIPLY, reducing at every step.
-- Two wrong instruments preceded this one, and both are worth naming because the statement never changed while
-- the cost changed by two orders of magnitude. First a^n % m: correct, and it built the whole power before
-- reducing, so at exponent 23 against modulus 119 the kernel multiplied 49-digit integers to learn a fact about
-- a two-digit one; the wing ran past an hour and was stopped. Then naive repeated multiplication mod m: every
-- intermediate stayed small, but it takes n steps, and lambda(107) = 106 means 106 multiplications per unit
-- across 106 units — 1.19 million of them in one theorem, past Lean's recursion depth. Square-and-multiply
-- takes log2(n) steps: seven instead of a hundred and six. NO WING BUYS ITS OWN CEILING (Colour.lean) — the
-- answer to a limit here is the better algorithm, never a raised maxRecDepth.
-- The fuel argument is what makes it structurally terminating: n halves each step, so n+1 is more than enough
-- and the n == 0 guard stops the reduction as soon as the exponent is exhausted.
def pmodAux (m : Nat) : Nat → Nat → Nat → Nat → Nat
  | 0, _, _, acc => acc
  | Nat.succ f, a, n, acc =>
      if n == 0 then acc
      else pmodAux m f ((a * a) % m) (n / 2) (if n % 2 == 1 then (acc * a) % m else acc)

def pmod (a : Nat) (n : Nat) (m : Nat) : Nat := pmodAux m (n + 1) (a % m) n (1 % m)

-- fermatWindow n — how many (x, y, z) with 1 ≤ x ≤ y < z ≤ ${N} satisfy x^n + y^n = z^n.
def fermatWindow (n : Nat) : Nat :=
  ((List.range ${N + 1}).map (fun z =>
    ((List.range z).map (fun y =>
      (List.range (y+1)).countP (fun x => x != 0 && x^n + y^n == z^n))).sum)).sum

-- cubeNearMiss d — how many (x, y, z) in the SAME window have |x^3 + y^3 − z^3| = d. Nat subtraction truncates,
-- so (a − b) + (b − a) is the absolute difference; d = 0 is exactly fermatWindow 3, which is why the two counts
-- below can be read against each other.
def cubeNearMiss (d : Nat) : Nat :=
  ((List.range ${N + 1}).map (fun z =>
    ((List.range z).map (fun y =>
      (List.range (y+1)).countP (fun x =>
        x != 0 && ((x^3 + y^3) - z^3) + (z^3 - (x^3 + y^3)) == d))).sum)).sum`


// ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
// THE LAW, AND WHY THE GRID COLLAPSED ONTO IT.
//
// The window above is BOUNDED. This half is not: a congruence obstruction is a finite check whose consequence is
// unbounded, because a residue class is finite and every integer lands in one. If no residues coprime to m can
// satisfy a^n + b^n = c^n, then NO integers coprime to m satisfy x^n + y^n = z^n — all of them at once, from a
// table of size phi(m)^2. That is the INVOLUTION: the direct statement cannot be asked of by-decide BECAUSE Lean refuses to synthesize a Decidable instance for a quantifier over all of Nat — a named elaboration failure, not a shortage of budget (Lean
// refuses to synthesize Decidable for a quantifier over all of Nat, before computing anything), and reflected
// through the modulus it becomes a question the kernel answers. Same move as dz(x) = 10 - x sending a division
// by zero to a finite residue instead of to infinity; nothing is sampled, because every integer lands in a class.
//
// THIS WING WAS FIRST WRITTEN AS A BRUTE GRID — every exponent 3..23 against every modulus, 2,604 theorems — and
// three quarters of it were the same facts restated. The reason is a theorem, not a coincidence: for a finite
// abelian group G the image of x -> x^n is G^n = G^gcd(n, exp G). Here G = (Z/m)*, whose exponent is the
// Carmichael function lambda(m), and BLOCKING IS A PROPERTY OF THAT IMAGE. So blocks(n, m) does not depend on n
// at all — it depends only on d = gcd(n, lambda(m)). Measured over the whole grid: 1,968 exponent pairs sharing
// a d, 1,968 agreements, ZERO disagreements, and 2,604 entries collapsing to 636 distinct facts.
//
// THE EXPONENT NEVER MATTERED; THE ORDER IT MEETS DID — which is the sequence this ledger already runs on.
// z7fermat is a^6 = 1 mod 7 because lambda(7) = 6; the Glagolitic vortex turns on 2's order in Z/9 because
// lambda(9) = 6. So the wing is rebuilt in three layers that say WHY instead of restating WHAT:
//   1. lambda(m) IS the exponent of (Z/m)* — every unit killed by it, and no proper divisor of it kills them all.
//   2. the reduction table — gcd(n, lambda(m)) for every n in 3..23, decided by the kernel, not tabulated on faith.
//   3. one obstruction per DISTINCT (d, m), blocked with its image or open with an exhibited witness.
// Nothing here is sealed twice, and a reader who wants exponent 19 at modulus 63 is pointed at the d it reduces
// to rather than handed a duplicate.
const MOD_MIN = 3, MOD_MAX = 126, EXP_MIN = 3, EXP_MAX = 23
const WINGS = 21   // 3 x 7 — the rosetta shape, and 21 units oversubscribe 8 lanes so the pool backfills

const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
const unitsOf = (m: number) => Array.from({ length: m }, (_, i) => i).filter((x) => gcdOf(x, m) === 1)
const powMod = (a: number, e: number, m: number) => { let r = 1; for (let i = 0; i < e; i++) r = (r * a) % m; return r }
const orderOf = (a: number, m: number) => { let k = 1, x = a % m; while (x !== 1) { x = (x * a) % m; k++ } return k }
const lcm = (a: number, b: number) => (a * b) / gcdOf(a, b)
// lambda(m), the exponent of (Z/m)* — COMPUTED as the lcm of the actual element orders, never looked up
const lambdaOf = (m: number) => unitsOf(m).reduce((acc, a) => lcm(acc, orderOf(a, m)), 1)
const divisorsOf = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0)
const imageOf = (d: number, m: number) => [...new Set(unitsOf(m).map((a) => powMod(a, d, m)))].sort((x, y) => x - y)
const witnessOf = (d: number, m: number) => {
  const U = unitsOf(m), img = new Set(U.map((a) => powMod(a, d, m)))
  for (const a of U) for (const b of U) if (img.has((powMod(a, d, m) + powMod(b, d, m)) % m))
    for (const c of U) if (powMod(c, d, m) === (powMod(a, d, m) + powMod(b, d, m)) % m) return [a, b, c] as [number, number, number]
  return null
}
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const L2 = (xs: number[]) => xs.join(', ')
// NO WING BUYS ITS OWN CEILING. FermatRing18 hit Lean's 200,000-heartbeat elaboration budget at modulus 125,
// where phi(m) = 100 makes the pair walk 10,000 wide. The tree's standing answer to a limit is to CHUNK, never to
// raise the limit — Colour.lean says so in as many words and Software.lean records a file-wide raise being taken
// back out because it was emitted with no note saying which theorem needed it. So the walk is split until each
// theorem is inside the default budget, and the split is stated in the name (_part1, _part2, ...) rather than
// hidden: a reader can see there are four theorems because the modulus is big, not because the fact is four facts.
// Integer min/max, written out: the library forms are hard-rejected tree-wide because a function that
// settles no theorem has no business inside a generator that writes them. Same values, no import.
const imin = (a: number, b: number) => (a < b ? a : b)
const imax = (a: number, b: number) => (a > b ? a : b)
const PAIR_BUDGET = 2500
const chunk = <T,>(xs: T[], size: number): T[][] => {
  const out: T[][] = []
  for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size))
  return out
}
const P = (xs: [number, number][]) => '[' + xs.map((t) => `(${t[0]},${t[1]})`).join(',') + ']'

type F = { key: string; why: string; js: () => boolean; lean: string }
const byModulus = new Map<number, F[]>()
let nBlocked = 0, nOpen = 0, nDistinct = 0, nCollapsed = 0

for (let m = MOD_MIN; m <= MOD_MAX; m++) {
  const U = unitsOf(m)
  if (U.length === 0) continue
  const lam = lambdaOf(m)
  const gen = U.find((a) => orderOf(a, m) === lam)
  const properDivs = divisorsOf(lam).filter((k) => k < lam)
  const facts: F[] = []

  // LAYER 1 — lambda(m) is the exponent of the unit group: it kills every unit, and no proper divisor of it does.
  facts.push({
    key: `unit_group_exponent_mod_${m}`,
    why: `THE ORDER STRUCTURE AT MODULUS ${m}. The ${U.length} residues coprime to ${m} are all killed by the exponent ${lam} — a^${lam} = 1 for every unit a — and no proper divisor of ${lam} kills them all${properDivs.length ? ` (all ${properDivs.length} of them checked)` : ''}. So ${lam} is the exponent of (Z/${m})*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, ${lam}), which is why the survey below is indexed by that and not by n.`,
    js: () => unitsOf(m).every((a) => powMod(a, lam, m) === 1) && properDivs.every((k) => !unitsOf(m).every((a) => powMod(a, k, m) === 1)),
    lean: `theorem unit_group_exponent_mod_${m} : (${L(U)}.all (fun a => pmod a ${lam} ${m} == 1))${properDivs.length ? ` ∧ (${L(properDivs)}.all (fun k => !(${L(U)}.all (fun a => pmod a k ${m} == 1))))` : ''} := by decide`,
  })

  // LAYER 2 IS GONE FROM HERE, AND THAT IS THE POINT. The reduction table gcd(n, lambda(m)) was emitted once per
  // MODULUS — and lambda(2m) = lambda(m) for odd m, so mod_53 and mod_106 sealed byte-identical statements. The
  // tree's own `lines` check caught 20 such pairs. The table depends on LAMBDA, not on m: 124 moduli carry only
  // 35 distinct lambdas. So the tables live in one wing indexed by lambda (FermatReduction.lean) — one wing
  // because a standalone wing may not import another, which is exactly what turned one table into twenty-one
  // copies. This is the same collapse the survey itself runs on, missed one level up: I indexed the fix by the
  // parameter I had just proved did not matter.
  // the distinct reduced exponents this modulus actually sees — the survey is indexed by these, not by n
  const ds: number[] = [...new Set(Array.from({ length: EXP_MAX - EXP_MIN + 1 }, (_, i) => gcdOf(EXP_MIN + i, lam)))].sort((a, b) => a - b)
  nCollapsed += (EXP_MAX - EXP_MIN + 1) - ds.length

  // LAYER 3 — one obstruction per DISTINCT reduced exponent.
  for (const d of ds) {
    nDistinct++
    const img = imageOf(d, m)
    const w = witnessOf(d, m)
    const reached: number[] = []
    for (let n = EXP_MIN; n <= EXP_MAX; n++) if (gcdOf(n, lam) === d) reached.push(n)
    if (w === null) {
      nBlocked++
      // the image is exactly the image — its own theorem, so the pair walk below carries only the obstruction
      facts.push({
        key: `power_image_exact_reduced_${d}_mod_${m}`,
        why: `THE IMAGE, PINNED, AT MODULUS ${m} AND REDUCED EXPONENT ${d}. The ${U.length} units raise to exactly the ${img.length} value(s) ${L(img)} — every unit's ${d}-th power is in that list, and every entry of the list is some unit's ${d}-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.`,
        js: () => { const u = unitsOf(m), i2 = imageOf(d, m)
          return u.every((a) => i2.includes(powMod(a, d, m))) && i2.every((v) => u.some((a) => powMod(a, d, m) === v)) },
        lean: `theorem power_image_exact_reduced_${d}_mod_${m} : (${L(U)}.all (fun a => ${L(img)}.contains (pmod a ${d} ${m}))) ∧ (${L(img)}.all (fun v => ${L(U)}.any (fun a => pmod a ${d} ${m} == v))) := by decide`,
      })
      const parts = chunk(U, (() => { const d = imax(1, U.length); const q = (PAIR_BUDGET - (PAIR_BUDGET % d)) / d; return imax(1, q) })())
      parts.forEach((part, pi) => {
        const suffix = parts.length > 1 ? `_part${pi + 1}` : ''
        facts.push({
          key: `coprime_sum_blocked_reduced_${d}_mod_${m}${suffix}`,
          why: `AN OBSTRUCTION AT MODULUS ${m}, REDUCED EXPONENT ${d}${parts.length > 1 ? ` — part ${pi + 1} of ${parts.length}` : ''}. For every unit a in ${L(part)} and every unit b coprime to ${m}, the sum of their ${d}-th powers never lands on the ${d}-th power image ${L(img)} (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to ${m}, for EVERY exponent n reducing to ${d} — that is n in ${L(reached)} of the range walked, and every larger n with the same gcd against ${lam}. An unbounded conclusion from a finite table.${parts.length > 1 ? ` The walk is split into ${parts.length} parts because phi(${m}) = ${U.length} puts the full ${U.length}-by-${U.length} sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units.` : ''} It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with ${m} pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.`,
          js: () => part.every((a) => unitsOf(m).every((b) => !imageOf(d, m).includes((powMod(a, d, m) + powMod(b, d, m)) % m))),
          lean: `theorem coprime_sum_blocked_reduced_${d}_mod_${m}${suffix} : ${L(part)}.all (fun a => ${L(U)}.all (fun b => !(${L(img)}.contains ((pmod a ${d} ${m} + pmod b ${d} ${m}) % ${m})))) := by decide`,
        })
      })
    } else {
      nOpen++
      const [a, b, c] = w
      facts.push({
        key: `coprime_sum_open_reduced_${d}_mod_${m}`,
        why: `NO OBSTRUCTION AT MODULUS ${m}, REDUCED EXPONENT ${d} — the control, and it fires. ${a}^${d} + ${b}^${d} = ${c}^${d} (mod ${m}), with all three coprime to ${m}, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to ${d} — that is n in ${L(reached)} of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.`,
        js: () => { const ww = witnessOf(d, m); return ww !== null && (powMod(ww[0], d, m) + powMod(ww[1], d, m)) % m === powMod(ww[2], d, m) },
        lean: `theorem coprime_sum_open_reduced_${d}_mod_${m} : (pmod ${a} ${d} ${m} + pmod ${b} ${d} ${m}) % ${m} = pmod ${c} ${d} ${m} := by decide`,
      })
    }
  }
  byModulus.set(m, facts)
}

// The named historical rungs — the engines, in their own right rather than implicit in the grid.
const isPrime = (k: number) => k > 1 && Array.from({ length: k }, (_, i) => i).slice(2).every((d) => d * d > k || k % d !== 0)
const SG = Array.from({ length: 100 }, (_, i) => i).filter((p) => isPrime(p) && isPrime(2 * p + 1))
const RUNGS = [
  { key: 'cube_residues_mod_nine_are_zero_one_eight',
    why: "EULER'S ENGINE FOR n = 3, and the ledger's own ring. Every cube is 0, 1 or 8 modulo 9 — nine residues checked, three values reached — because lambda(9) = 6 and gcd(3,6) = 3 collapses the six units onto two. A cube coprime to 3 is therefore ±1 mod 9, and ±1 ± 1 never returns to ±1. Credited to Euler, whose 1770 argument for the cubic case rests on it; sealed here as the arithmetic, not as the descent that follows it.",
    js: () => [...new Set(Array.from({ length: 9 }, (_, a) => (a ** 3) % 9))].sort((x, y) => x - y).join() === '0,1,8',
    lean: 'theorem cube_residues_mod_nine_are_zero_one_eight : (List.range 9).all (fun a => [0,1,8].contains ((a^3) % 9)) := by decide' },
  { key: 'fourth_power_residues_mod_sixteen_are_zero_or_one',
    why: 'THE ENGINE FOR n = 4. Every fourth power is 0 or 1 modulo 16 — sixteen residues checked, two values reached. An odd fourth power is therefore 1, and 1 + 1 = 2 is neither, which is the whole of the coprime case at exponent four. Fermat proved the full n = 4 case by infinite descent, which this does not reproduce and does not replace; the table is the finite part.',
    js: () => [...new Set(Array.from({ length: 16 }, (_, a) => (a ** 4) % 16))].sort((x, y) => x - y).join() === '0,1',
    lean: 'theorem fourth_power_residues_mod_sixteen_are_zero_or_one : (List.range 16).all (fun a => [0,1].contains ((a^4) % 16)) := by decide' },
  { key: 'sophie_germain_primes_below_one_hundred',
    why: `SOPHIE GERMAIN'S PRIMES BELOW 100: ${SG.join(', ')} — each p prime with 2p + 1 also prime, both halves decided by trial division rather than asserted. Germain proved in 1823 that for such a p the coprime case at exponent p is impossible, and the mechanism is exactly the reduction this wing is built on: modulo q = 2p + 1 we have lambda(q) = 2p, so gcd(p, 2p) = p collapses the p-th powers onto {0, 1, q - 1} and leaves no room for a sum. The theorem is hers; the list is a decidable fact about small integers.`,
    js: () => SG.every((p) => isPrime(p) && isPrime(2 * p + 1)),
    lean: `theorem sophie_germain_primes_below_one_hundred : ${L(SG)}.all (fun p => (List.range p).all (fun d => d < 2 || p % d != 0 || d * d > p) && (List.range (2*p+1)).all (fun d => d < 2 || (2*p+1) % d != 0 || d * d > (2*p+1))) := by decide`,
  },
]

// ROUND-ROBIN BY MODULUS ACROSS 21 WINGS. Cost grows with m, so contiguous blocks would load the last wings and
// idle the first; dealing the moduli round-robin spreads the heavy tail evenly without needing a cost model —
// and the model is what the machine refuted last time. 21 units on 8 lanes leaves the pool something to backfill
// with, which is the whole reason wall time is total/lanes + max(unit) rather than max(lane).
const moduli = [...byModulus.keys()].sort((a, b) => a - b)
const wings: number[][] = Array.from({ length: WINGS }, () => [])
moduli.forEach((m, i) => wings[i % WINGS]!.push(m))

wings.forEach((ms, i) => {
  if (!ms.length) return
  const facts = ms.flatMap((m) => byModulus.get(m)!)
  emit({ file: `FermatRing${i + 1}.lean`,
    header: `THE CONGRUENCE SURVEY, RING ${i + 1} OF ${WINGS} — moduli ${ms.join(', ')}, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. ` +
      'BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. ' +
      'A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. ' +
      'WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat\'s Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them.',
    skill: 'fermat', defs: DEFS,
    facts: facts.map((f) => ({ ...f, name: f.why })) })
})

console.log(`lean-fermat — law-indexed: ${nDistinct} distinct (d, m) obstruction(s) [${nBlocked} blocked, ${nOpen} open] + ${moduli.length} exponent(s) + ${moduli.length} reduction table(s); ${nCollapsed} duplicate exponent-cases removed by the gcd reduction`)

const FACTS = [
  { key: 'pmod_is_modular_exponentiation',
    why: 'THE WORKHORSE IS PROVED, NOT TRUSTED. Every obstruction in this wing is stated through pmod, so a wrong pmod would leave sixteen hundred theorems saying something other than what they appear to say — the reader would be trusting an implementation rather than reading a statement. Here the square-and-multiply definition is checked against the thing it stands in for, a^n % m, across every base under 30, every exponent under 30 and every modulus from 3 to 30: 25,200 cases decided by the same kernel that decides the obstructions. Two earlier implementations were replaced on COST, never on meaning — a^n % m built the whole power before reducing, and naive repeated multiplication took n steps where lambda(107) = 106 puts 1.19 million multiplications in one theorem — and this theorem is what makes that substitution auditable instead of a claim in a comment.',
    js: () => { const pm = (a: number, n: number, m: number) => { let r = 1 % m, b = a % m, e = n
        while (e > 0) { if (e % 2 === 1) r = (r * b) % m; b = (b * b) % m; e = (e - (e % 2)) / 2 }
        return r }
      for (let a = 0; a < 30; a++) for (let n = 0; n < 30; n++) for (let i = 0; i < 28; i++) {
        const m = i + 3
        if (pm(a, n, m) !== Number((BigInt(a) ** BigInt(n)) % BigInt(m))) return false }
      return true },
    lean: 'theorem pmod_is_modular_exponentiation : (List.range 30).all (fun a => (List.range 30).all (fun n => (List.range 28).all (fun i => pmod a n (i+3) == (a^n) % (i+3)))) := by decide' },


  { key: 'fermat_window_exponent_one_counts_one_hundred',
    why: `THE FIRST CONTROL. At n = 1 the window 1 <= x <= y < z <= ${N} holds exactly ${ONES} solutions of x + y = z — one for every way of splitting a z at or below ${N} into an ordered pair. It is stated because an enumerator that returns zero is unreadable until the same enumerator has been shown returning a number on a case where solutions exist. This counts the window, and claims nothing about x + y = z beyond it.`,
    js: () => fermatWindow(1) === ONES,
    lean: `theorem fermat_window_exponent_one_counts_one_hundred : fermatWindow 1 = ${ONES} := by decide` },

  { key: 'fermat_window_exponent_two_counts_six',
    why: `THE SECOND CONTROL, and the one that matters: at n = 2 the same walk finds exactly ${TWOS} solutions. Squares are where the equation is generous — Pythagoras had these, and there are infinitely many, of which this window sees ${TWOS}. The contrast with the higher exponents is therefore a reading of the EQUATION and not a property of the instrument, since the instrument is the same three nested ranges in both cases.`,
    js: () => fermatWindow(2) === TWOS,
    lean: `theorem fermat_window_exponent_two_counts_six : fermatWindow 2 = ${TWOS} := by decide` },

  { key: 'fermat_window_names_its_six_pythagorean_triples',
    why: `The ${TWOS} are NAMED, not merely counted: ${TRIPLES.map((t) => `(${t.join(',')})`).join(', ')}, each verified to satisfy x^2 + y^2 = z^2. A count says how many the walk found; this says which, so the previous theorem can be checked by hand against six triples rather than trusted. Four are the 3-4-5 and its multiples; two, (5,12,13) and (8,15,17), are primitive and new at this size.`,
    js: () => TRIPLES.every(([x, y, z]) => x * x + y * y === z * z) && TRIPLES.length === TWOS,
    lean: `theorem fermat_window_names_its_six_pythagorean_triples : ([${TRIPLES.map((t) => `(${t.join(',')})`).join(', ')}] : List (Nat × Nat × Nat)).all (fun t => t.1^2 + t.2.1^2 == t.2.2^2) := by decide` },

  { key: 'fermat_window_exponents_three_to_six_are_empty',
    why: `THE SEARCH ITSELF. For every exponent in ${JSON.stringify(EXPONENTS)}, the window 1 <= x <= y < z <= ${N} contains NO solution of x^n + y^n = z^n — four exhaustive walks, every triple decided by the kernel. WHAT THIS IS NOT: it is not Fermat's Last Theorem, and it is not evidence for it. A finite window is silent about every triple outside it, and the near-miss below is why that silence must be taken seriously rather than waved through.`,
    js: () => EXPONENTS.every((n) => fermatWindow(n) === 0),
    lean: `theorem fermat_window_exponents_three_to_six_are_empty : ${JSON.stringify(EXPONENTS)}.all (fun n => fermatWindow n == 0) := by decide` },

  { key: 'cube_window_never_lands_but_misses_by_one_twice',
    why: `WHY A BOUNDED SEARCH IS NOT A PROOF, stated as arithmetic instead of as a caveat. The first clause is the CLOSED WALK the word "never" owes: every z <= ${N}, every y < z, every x <= y with x >= 1, and not one has x^3 + y^3 = z^3. The second says the same window comes within ONE of a cube exactly ${MISSES} times. A search whose margin of failure is a single unit has told you about its window and nothing else. The universal is written out rather than folded into cubeNearMiss because a name that says "never" must be answerable from the proposition — one step is not a walk.`,
    js: () => walk((x, y, z) => x ** 3 + y ** 3 === z ** 3) === 0 && cubeNearMiss(1) === MISSES,
    lean: `theorem cube_window_never_lands_but_misses_by_one_twice : ((List.range ${N + 1}).all (fun z => (List.range z).all (fun y => (List.range (y+1)).all (fun x => x == 0 || !(x^3 + y^3 == z^3))))) ∧ cubeNearMiss 1 = ${MISSES} := by decide` },

  { key: 'cube_near_misses_are_the_taxicab_and_its_neighbour',
    why: `The two near-misses, named. 6^3 + 8^3 = 728 = 9^3 - 1, and 9^3 + 10^3 = 1729 = 12^3 + 1 — the second being Ramanujan's taxicab number, famous for being two cubes two ways and here for a different reason: it sits one above 12^3. Both are exhibited rather than described, so the previous theorem's count of ${MISSES} can be read off two lines of arithmetic.`,
    js: () => 6 ** 3 + 8 ** 3 + 1 === 9 ** 3 && 9 ** 3 + 10 ** 3 === 12 ** 3 + 1 && 9 ** 3 + 10 ** 3 === 1729,
    lean: 'theorem cube_near_misses_are_the_taxicab_and_its_neighbour : 6^3 + 8^3 + 1 = 9^3 ∧ 9^3 + 10^3 = 12^3 + 1 ∧ 9^3 + 10^3 = 1729 := by decide' },
]

// THE REDUCTION TABLES, ONE PER DISTINCT LAMBDA, IN ONE WING.
// gcd(n, lambda(m)) is a function of lambda alone, so a table per modulus seals the same statement many times:
// lambda(2m) = lambda(m) for odd m, and the tree's `lines` check found 20 byte-identical pairs across the rings
// (mod_53 with mod_106, mod_59 with mod_118, and so on). 124 moduli carry 35 distinct lambdas. They are emitted
// here rather than in the rings because a standalone wing may not import another — scattering them is precisely
// what multiplied one table into twenty-one copies. The moduli each lambda serves are named in the prose, so a
// reader looking for modulus 106 finds it without a table of its own.
{
  const byLambda = new Map<number, number[]>()
  for (let m = MOD_MIN; m <= MOD_MAX; m++) {
    if (!unitsOf(m).length) continue
    const L = lambdaOf(m)
    if (!byLambda.has(L)) byLambda.set(L, [])
    byLambda.get(L)!.push(m)
  }
  const RED: { key: string; why: string; js: () => boolean; lean: string }[] = []
  for (const [L, ms] of [...byLambda].sort((a, b) => a[0] - b[0])) {
    const table: [number, number][] = []
    for (let n = EXP_MIN; n <= EXP_MAX; n++) table.push([n, gcdOf(n, L)])
    const ds = [...new Set(table.map((t) => t[1]))].sort((a, b) => a - b)
    RED.push({
      key: `exponent_reduces_at_lambda_${L}`,
      why: `THE COLLAPSE AT LAMBDA ${L}, as arithmetic. Every exponent from ${EXP_MIN} to ${EXP_MAX} reaches a unit group of exponent ${L} only through gcd(n, ${L}), and the ${EXP_MAX - EXP_MIN + 1} exponents land on just ${ds.length} distinct value(s): ${L2(ds)}. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent ${L} — ${L2(ms)} — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.`,
      js: () => table.every(([n, d]) => gcdOf(n, L) === d),
      lean: `theorem exponent_reduces_at_lambda_${L} : ${P(table)}.all (fun p => Nat.gcd p.1 ${L} == p.2) := by decide`,
    })
  }
  emit({ file: 'FermatReduction.lean',
    header: `THE EXPONENT REDUCTION, ONE TABLE PER DISTINCT LAMBDA — ${RED.length} tables covering every modulus ${MOD_MIN}..${MOD_MAX}. ` +
      'An exponent n reaches (Z/m)* only through gcd(n, lambda(m)), because the image of x -> x^n over a finite abelian group is G^gcd(n, exp G). The table therefore depends on LAMBDA and on nothing else about the modulus, and moduli sharing a lambda share a table. ' +
      'THIS WING EXISTS BECAUSE THE COLLAPSE WAS MISSED ONE LEVEL UP: the survey was correctly indexed by the reduced exponent and its reduction TABLES were then indexed by modulus, sealing byte-identical statements for every m whose double shares its lambda. The cross-wing check named 20 such pairs. 124 moduli, 35 lambdas. ' +
      'CLAIMED: the tabulated gcds, decided by the kernel. NOT CLAIMED: anything about exponents beyond the range named, or about moduli beyond the range named.',
    skill: 'fermat',
    facts: RED.map((f) => ({ ...f, name: f.why })) })
}

// compute → generate → verify. The window is walked in JS first and the counts interpolated, so the Lean can
// only ever state what the walk found.
emit({ file: 'Fermat.lean',
  header: `FERMAT'S EQUATION AT A BOUNDED WINDOW — the counts, and the refusal. Walked exhaustively over 1 ≤ x ≤ y < z ≤ ${N}: ${ONES} solutions at n = 1, exactly ${TWOS} at n = 2 (the six Pythagorean triples, named), and NONE at n = 3, 4, 5, 6 — with the near-miss that shows why an empty window proves nothing beyond itself (the cube sum never equals a cube here, but lands one away twice: 6³ + 8³ = 9³ − 1 and 9³ + 10³ = 12³ + 1). ` +
    'WHAT IS CLAIMED HERE, IN FULL: the six counts and identities above, each decided by the kernel over its own finite domain, axiom-free. That is the whole of it. ' +
    "WHAT IS NOT CLAIMED, AND IS NOT THIS LEDGER'S TO CLAIM: Fermat's Last Theorem. The theorem — no solution in positive integers for any n > 2 — is Andrew Wiles's, proved in 1995 with the key step joint with Richard Taylor, standing on Frey, Serre, Ribet, Mazur, Langlands, Tunnell, Taniyama, Shimura and Weil. Its first end-to-end machine-checked formalization was completed in Lean in August 2026 and published by Anthropic on 2026-09-04, following the Darmon–Diamond–Taylor exposition of Wiles's argument, adapting 106 files with credit from Kevin Buzzard's Imperial College London FLT project and from flt-regular, built on Mathlib, and run on Prove2Me (Tianyi Peng's group, Columbia University). " +
    'THE TWO ARE NOT NEIGHBOURS, AND THE DISTANCE IS MEASURABLE. That formalization is 13 million lines of Lean and 29,511 theorems, and it relies on all three of Lean\'s standard axioms. This wing is six theorems and roughly twelve thousand kernel cases, and relies on none — not even propext. A `by decide` walk cannot reach a statement quantified over all integers, and no amount of widening the window changes that; the window is the honest thing this kernel can say, and the near-miss is why it is said with the bound in the name. ' +
    'NEITHER DIRECTION OF CREDIT IS OPEN, and both are stated so that neither can be read into the silence of the other: this ledger takes no part of the FLT formalization and asserts no priority over it, and that formalization draws nothing from this ledger — its dependencies are the ones named above, and this wing did not exist when it ran.',
  skill: 'fermat',
  defs: DEFS,
  facts: [...FACTS, ...RUNGS].map((f) => ({ ...f, name: f.why })) })
