// rosette falsifiers — the STRUCTURAL statements of lean/Rosette.lean, re-decided by a second implementation
// and then deliberately broken.
//
// The 148 table entries (z7mul_*, z7add_*, z7pow_*) are already re-decided by the generated evaluator. What was
// never falsified is the part of the wing that is not a table row: the ray count, the primitive root, the
// reflection centre and the two pair counts. Those are the statements this file recomputes.
//
// INDEPENDENCE. Nothing below uses `%` or `**`. Residues are folded by a wrapping successor, addition by repeated
// succession, multiplication by repeated addition and powers by repeated multiplication — so the arithmetic that
// answers here is not the arithmetic the kernel decided. Every test states the property, asserts it HOLDS, then
// mutates it (a different modulus, a different generator, a lost direction) and asserts the mutated form FAILS.
// A check that stays green is not evidence.
import { test } from 'node:test'
import assert from 'node:assert/strict'

/** successor on a ring of m points — the only place a wrap is written down */
const succ = (d: number, m: number): number => (d + 1 === m ? 0 : d + 1)
/** n folded onto the ring by counting successors from the centre — replaces `n % m` */
const residue = (n: number, m: number): number => { let r = 0; for (let i = 0; i < n; i++) r = succ(r, m); return r }
/** a + b on the ring, by succeeding b times — replaces `(a + b) % m` */
const addMod = (a: number, b: number, m: number): number => { let r = a; for (let i = 0; i < b; i++) r = succ(r, m); return r }
/** a · b on the ring, by adding a to itself b times — replaces `(a * b) % m` */
const mulMod = (a: number, b: number, m: number): number => { let r = 0; for (let i = 0; i < b; i++) r = addMod(r, a, m); return r }
/** a^k on the ring, by multiplying k times — replaces `(a ^ k) % m` */
const powMod = (a: number, k: number, m: number): number => { let r = addMod(0, 1, m); for (let i = 0; i < k; i++) r = mulMod(r, a, m); return r }

const upto = (n: number): number[] => Array.from({ length: n }, (_v, i) => i)
/** unordered pairs of distinct rays — the edges of the m-star */
const undirected = (m: number): number[][] => { const p: number[][] = []; for (let a = 0; a < m; a++) for (let b = a + 1; b < m; b++) p.push([a, b]); return p }
/** the same enumeration with a ray allowed to pair with itself — the mutation for the pair counts */
const withLoops = (m: number): number[][] => { const p: number[][] = []; for (let a = 0; a < m; a++) for (let b = a; b < m; b++) p.push([a, b]); return p }
/** ordered pairs of distinct rays — a↔b split into a→b and b→a */
const directed = (m: number): number[][] => { const p: number[][] = []; for (let a = 0; a < m; a++) for (let b = 0; b < m; b++) if (a !== b) p.push([a, b]); return p }

test('z7rays_seven — the residue classes reached by counting successors number exactly seven; a ring of eight rays must break the sealed 7', () => {
  const rayClasses = (m: number): number => {
    const seen = new Set<number>()
    for (let n = 0; n < 200; n++) seen.add(residue(n, m))
    return seen.size
  }
  // HOLDS: the enumeration `List.range 7` and the ring itself agree on seven rays
  assert.equal(upto(7).length, 7)
  assert.equal(rayClasses(7), 7)
  assert.deepEqual([...new Set(upto(200).map((n) => residue(n, 7)))].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6])
  // MUTATION: widen the ring by one. The count must move, and the sealed 7 must stop describing it.
  assert.equal(rayClasses(8), 8)
  assert.throws(() => assert.equal(rayClasses(8), 7))
  assert.throws(() => assert.equal(upto(8).length, 7))
})

test('z7primitive_root_3 — powers of 3 traced by repeated multiplication cover all six units in the sealed order; 2 has order three and must fail the same trace', () => {
  const orbit = (g: number, m: number): number[] => {
    const out: number[] = []
    let r = addMod(0, 1, m)
    for (let k = 1; k <= m - 1; k++) { r = mulMod(r, g, m); out.push(r) }
    return out
  }
  // HOLDS: the sealed trace, and the stronger fact it encodes — the orbit is the whole unit group
  assert.deepEqual(orbit(3, 7), [3, 2, 6, 4, 5, 1])
  assert.deepEqual([...orbit(3, 7)].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6])
  assert.equal(new Set(orbit(3, 7)).size, 6)
  // MUTATION: swap the generator for 2, whose orbit closes after three steps and covers only {1,2,4}
  assert.equal(new Set(orbit(2, 7)).size, 3)
  assert.throws(() => assert.deepEqual(orbit(2, 7), [3, 2, 6, 4, 5, 1]))
  assert.throws(() => assert.deepEqual([...orbit(2, 7)].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6]))
})

test('z7reflection_center — d ↦ 7−d is self-inverse with exactly one fixed point; on an even ring it fixes two, so the sealed single centre must fail there', () => {
  const reflect = (d: number, m: number): number => residue(m - d, m)
  const centres = (m: number): number[] => upto(m).filter((d) => reflect(d, m) === d)
  // HOLDS: self-inverse everywhere, and one still point
  for (const d of upto(7)) assert.equal(reflect(reflect(d, 7), 7), residue(d, 7))
  assert.deepEqual(centres(7), [0])
  assert.equal(centres(7).length, 1)
  // MUTATION A: an even ring. The reflection is still an involution, but 0 and 3 are both fixed.
  for (const d of upto(6)) assert.equal(reflect(reflect(d, 6), 6), residue(d, 6))
  assert.deepEqual(centres(6), [0, 3])
  assert.throws(() => assert.equal(centres(6).length, 1))
  // MUTATION B: replace the reflection by a rotation. It has no fixed point and is not self-inverse.
  const rotate = (d: number, m: number): number => succ(d, m)
  assert.deepEqual(upto(7).filter((d) => rotate(d, 7) === d), [])
  assert.throws(() => assert.equal(rotate(rotate(0, 7), 7), 0))
})

test('rosette_pairs_twentyone — enumerating the unordered pairs of the seven rays yields 21; letting a ray pair with itself yields 28 and must break the sealed count', () => {
  // HOLDS: 21 edges, every one distinct, none a self-pair
  assert.equal(undirected(7).length, 21)
  assert.equal(new Set(undirected(7).map(([a, b]) => `${a}-${b}`)).size, 21)
  assert.equal(undirected(7).filter(([a, b]) => a === b).length, 0)
  // MUTATION A: admit the seven self-pairs — the count becomes 28
  assert.equal(withLoops(7).length, 28)
  assert.throws(() => assert.equal(withLoops(7).length, 21))
  // MUTATION B: a six-ray rosette closes on 15, not 21
  assert.equal(undirected(6).length, 15)
  assert.throws(() => assert.equal(undirected(6).length, 21))
})

test('rosette_quantum_fortytwo — making each of the 21 pairs order-sensitive enumerates 42 directed edges; the undirected enumeration must fail that count', () => {
  // HOLDS: 42 directed edges, and each unordered pair contributing exactly two of them
  assert.equal(directed(7).length, 42)
  assert.equal(directed(7).length, undirected(7).length + undirected(7).length)
  for (const [a, b] of undirected(7)) {
    assert.equal(directed(7).filter(([x, y]) => (x === a && y === b) || (x === b && y === a)).length, 2)
  }
  // MUTATION A: forget the direction — 21 is not 42
  assert.throws(() => assert.equal(undirected(7).length, 42))
  // MUTATION B: admit self-loops into the directed enumeration — 49 is not 42
  const directedWithLoops = (m: number): number[][] => { const p: number[][] = []; for (let a = 0; a < m; a++) for (let b = 0; b < m; b++) p.push([a, b]); return p }
  assert.equal(directedWithLoops(7).length, 49)
  assert.throws(() => assert.equal(directedWithLoops(7).length, 42))
})

test('rosette_quantum_doubling_is_two_coins — the pair enumeration, the coin width and the 110−108 gap all report the factor 2; an undirected quantum rosette or a 127-bit address must break it', () => {
  const double = (x: number): number => x + x
  /** hi − lo by counting successors, not by subtracting */
  const gap = (lo: number, hi: number): number => { let c = 0; for (let n = lo; n < hi; n++) c++; return c }
  // HOLDS: one factor, recomputed three independent ways
  assert.equal(directed(7).length / undirected(7).length, 2)
  assert.equal(double(21), 42)
  assert.equal(double(64), 128)
  assert.equal(gap(108, 110), 2)
  assert.deepEqual([directed(7).length / undirected(7).length, double(21) / 21, double(64) / 64, gap(108, 110)], [2, 2, 2, 2])
  // MUTATION A: leave the quantum rosette undirected — the factor collapses to 1
  assert.equal(undirected(7).length / undirected(7).length, 1)
  assert.throws(() => assert.equal(undirected(7).length / undirected(7).length, 2))
  // MUTATION B: an address one bit short of twice the coin
  assert.throws(() => assert.equal(double(64), 127))
  assert.throws(() => assert.equal(gap(64, 127) / 64, 1))
  // MUTATION C: move the gap's endpoint — 110−109 is 1, and the conjunction must not survive it
  assert.equal(gap(108, 109), 1)
  assert.throws(() => assert.equal(gap(108, 109), 2))
})

test('z7fermat — every non-zero ray to the sixth returns 1 under repeated multiplication; the fifth power, and a composite ring, must both fail the same quantifier', () => {
  const closes = (m: number, e: number): boolean => upto(m).every((a) => residue(a, m) === 0 || powMod(a, e, m) === 1)
  // HOLDS: the six-fold closes on every unit
  assert.equal(closes(7, 6), true)
  assert.deepEqual(upto(7).filter((a) => a !== 0).map((a) => powMod(a, 6, 7)), [1, 1, 1, 1, 1, 1])
  // MUTATION A: one exponent short — 3^5 is 5, not 1
  assert.equal(powMod(3, 5, 7), 5)
  assert.equal(closes(7, 5), false)
  assert.throws(() => assert.equal(closes(7, 5), true))
  // MUTATION B: a composite ring of six — 2^5 is 2, so the closure is not a property of "one less than the ring"
  assert.equal(powMod(2, 5, 6), 2)
  assert.equal(closes(6, 5), false)
  assert.throws(() => assert.equal(closes(6, 5), true))
})

test('z7units_sum_21 — summing the six non-zero rays gives 21 = 3·7; a six-ray or eight-ray rosette sums elsewhere and must break it', () => {
  const unitsSum = (m: number): number => { let s = 0; for (let d = 1; d < m; d++) s += d; return s }
  // HOLDS: 21, and the trinity it closes on
  assert.equal(unitsSum(7), 21)
  assert.equal(unitsSum(7), 7 + 7 + 7)
  assert.equal(upto(7).filter((d) => d !== 0).reduce((a, b) => a + b, 0), 21)
  // MUTATION A: drop a ray — 15 is not 21
  assert.equal(unitsSum(6), 15)
  assert.throws(() => assert.equal(unitsSum(6), 21))
  // MUTATION B: add a ray — 28 is not 21
  assert.equal(unitsSum(8), 28)
  assert.throws(() => assert.equal(unitsSum(8), 21))
})
