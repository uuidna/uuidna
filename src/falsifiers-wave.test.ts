// wave-falsifiers — one FALSIFIER per Wave.lean theorem named below.
//
// A falsifier is not a restatement. Each test recomputes the theorem's property from scratch in JavaScript and
// asserts it HOLDS; then it applies a deliberate mutation to that property — a plausible wrong algorithm, a
// dropped hypothesis, a swapped constant — and asserts the mutated form FAILS. The second half is what makes the
// first half worth anything: a check that cannot fail proves nothing.
//
// Every theorem key appears in executable text (the test title is a string literal, not a comment), because that
// is where the leg census looks. No claim here is a claim about the world; these tests measure only whether the
// sealed arithmetic reproduces under an independent recomputation, and whether the recomputation has teeth.
import { test } from 'node:test'
import assert from 'node:assert/strict'

// The determinism scan admits no host intrinsic anywhere in this tree, so the three shapes this file needs are
// written out. For the non-negative integers walked below, x - (x % 1) is exactly floor(x), and the comparisons
// ARE the definitions of the other two rather than approximations of them.
const trunc = (x: number): number => x - (x % 1)
const ceilOf = (x: number): number => (x % 1 === 0 ? x : x - (x % 1) + 1)
const maxOf = (...xs: number[]): number => xs.reduce((a, b) => (a > b ? a : b))
const minOf = (...xs: number[]): number => xs.reduce((a, b) => (a < b ? a : b))
const absOf = (x: number): number => (x < 0 ? -x : x)

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i)
const span = (start: number, count: number): number[] => Array.from({ length: count }, (_, i) => start + i)
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const uniq = <T>(xs: readonly T[]): T[] => [...new Set(xs)]
const pop = (n: number): number => { let c = 0, m = n; while (m) { c += m & 1; m >>>= 1 } return c }
const powMod = (a: number, k: number, n: number): number => {
  let r = 1 % n, b = a % n, e = k
  while (e > 0) { if (e & 1) r = (r * b) % n; b = (b * b) % n; e >>= 1 }
  return r
}
/** THE SECOND HALF OF EVERY FALSIFIER: the mutated law is asserted, and the test demands that assertion break. */
const mutantMustFail = (claim: () => void): void => assert.throws(claim, assert.AssertionError)

test('stride_cycle_is_modulus_over_gcd — the orbit of a stride is recomputed by enumeration and must equal n/gcd(s,n), filling the ring exactly when the stride is coprime; the mutation that reads the cycle as n/s must fail', () => {
  const orbit = (n: number, s: number): number => uniq(range(n).map((k) => (k * s) % n)).length
  for (let n = 1; n <= 24; n++) {
    for (let s = 0; s < n; s++) {
      const g = gcd(s, n)
      assert.equal(orbit(n, s), n / g)
      assert.equal(orbit(n, s) === n, g === 1)
    }
  }
  mutantMustFail(() => {
    for (let n = 1; n <= 24; n++) for (let s = 0; s < n; s++) assert.equal(orbit(n, s), trunc(n / maxOf(s, 1)))
  })
})

test('stride_first_return_is_the_cycle_length — the first k with k*s === 0 (mod n) is found by search and must equal n/gcd(s,n); the mutation that reads the first return as the stride itself must fail', () => {
  const firstReturn = (n: number, s: number): number => { for (let k = 1; k <= n; k++) if ((k * s) % n === 0) return k; return 0 }
  for (let n = 1; n <= 24; n++) {
    for (let s = 1; s < n; s++) {
      assert.equal(firstReturn(n, s), n / gcd(s, n))
      assert.equal(((n / gcd(s, n)) * s) % n, 0)
    }
  }
  mutantMustFail(() => {
    for (let n = 2; n <= 24; n++) for (let s = 1; s < n; s++) assert.equal(firstReturn(n, s), s)
  })
})

test('two_clocks_meet_at_the_lcm_and_fuse_only_when_coprime — the joint state count is enumerated and must equal a*b/gcd(a,b), equalling a*b exactly when coprime; the mutation that always uses the product must fail', () => {
  const joint = (a: number, b: number): number => uniq(range(a * b).map((k) => (k % a) * 100 + (k % b))).length
  const firstCommon = (a: number, b: number): number => { for (let k = 1; k <= a * b; k++) if (k % a === 0 && k % b === 0) return k; return 0 }
  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      const lcm = (a * b) / gcd(a, b)
      assert.equal(joint(a, b), lcm)
      assert.equal(joint(a, b) === a * b, gcd(a, b) === 1)
      assert.equal(firstCommon(a, b), lcm)
    }
  }
  mutantMustFail(() => {
    for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) assert.equal(joint(a, b), a * b)
  })
})

test('merkle_depth_iff_leaf_bound — folding a level by ceil(w/2) k times is recomputed and reaches a single root exactly when n <= 2^k; the mutation that folds by floor(w/2) must fail', () => {
  const foldUp = (n: number, k: number, half: (w: number) => number): number => { let w = n; for (let i = 0; i < k; i++) w = half(w); return w }
  const ceilHalf = (w: number): number => trunc((w + 1) / 2)
  const floorHalf = (w: number): number => trunc(w / 2)
  for (let n = 1; n <= 64; n++) for (let k = 0; k < 8; k++) assert.equal(foldUp(n, k, ceilHalf) === 1, n <= 2 ** k)
  assert.equal(span(1, 64).filter((n) => foldUp(n, 3, ceilHalf) === 1).length, 8)
  mutantMustFail(() => {
    for (let n = 1; n <= 64; n++) for (let k = 0; k < 8; k++) assert.equal(foldUp(n, k, floorHalf) === 1, n <= 2 ** k)
  })
})

test('merkle_shape_moves_root_iff_nonassociative — the balanced and left-spine folds of four leaves are recomputed and agree only when the first two leaves are zero; the mutation that folds with associative addition must fail', () => {
  const pair = (x: number, y: number): number => 2 * x + y
  const balanced = (a: number, b: number, c: number, d: number): number => pair(pair(a, b), pair(c, d))
  const spine = (a: number, b: number, c: number, d: number): number => pair(pair(pair(a, b), c), d)
  for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) for (let c = 0; c < 6; c++) for (let d = 0; d < 6; d++) {
    assert.equal(balanced(a, b, c, d) === spine(a, b, c, d), a === 0 && b === 0)
    assert.equal((a + b) + (c + d), ((a + b) + c) + d)
  }
  mutantMustFail(() => {
    const add = (x: number, y: number): number => x + y
    const bal = (a: number, b: number, c: number, d: number): number => add(add(a, b), add(c, d))
    const spn = (a: number, b: number, c: number, d: number): number => add(add(add(a, b), c), d)
    for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) for (let c = 0; c < 6; c++) for (let d = 0; d < 6; d++) {
      assert.equal(bal(a, b, c, d) === spn(a, b, c, d), a === 0 && b === 0)
    }
  })
})

test('merkle_odd_level_padding_costs_above_leaf_count — the internal nodes of the fold are counted and must be at least n-1, with equality exactly at the powers of two; the mutation that claims equality for every leaf count must fail', () => {
  const internal = (n: number): number => {
    let w = n, m = 0
    for (let i = 0; i < 8; i++) { if (w === 1) break; w = trunc((w + 1) / 2); m += w }
    return m
  }
  const isPowerOfTwo = (n: number): boolean => range(6).some((k) => n === 2 ** k)
  for (let n = 1; n <= 32; n++) {
    assert.ok(n - 1 <= internal(n))
    assert.equal(internal(n) === n - 1, isPowerOfTwo(n))
  }
  mutantMustFail(() => { for (let n = 1; n <= 32; n++) assert.equal(internal(n), n - 1) })
})

test('hamming_triangle_inequality — the four-bit distance is recomputed for every triple and must obey d(a,c) <= d(a,b)+d(b,c) with a tight case at 0,5,15; the mutation that squares the distance must fail', () => {
  const d = (a: number, b: number): number => pop((a ^ b) & 15)
  for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) for (let c = 0; c < 16; c++) assert.ok(d(a, c) <= d(a, b) + d(b, c))
  assert.equal(d(0, 15), d(0, 5) + d(5, 15))
  assert.ok(d(0, 0) < d(0, 15) + d(15, 0))
  mutantMustFail(() => {
    const dd = (a: number, b: number): number => d(a, b) ** 2
    for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) for (let c = 0; c < 16; c++) assert.ok(dd(a, c) <= dd(a, b) + dd(b, c))
  })
})

test('hamming_differences_are_the_code — the sixteen words are closed under difference, every word is realised as a difference, and every difference has weight 0, 3, 4 or 7; the mutation that flips one bit of one word must fail', () => {
  const W = [0, 75, 42, 97, 25, 82, 51, 120, 7, 76, 45, 102, 30, 85, 52, 127]
  const check = (code: readonly number[]): void => {
    assert.equal(code.length, 16)
    for (const a of code) for (const b of code) {
      assert.ok(code.includes(a ^ b))
      assert.ok([0, 3, 4, 7].includes(pop(a ^ b)))
    }
    for (const t of code) assert.ok(code.some((a) => code.some((b) => (a ^ b) === t)))
  }
  check(W)
  mutantMustFail(() => check(W.map((w, i) => (i === 1 ? w ^ 1 : w))))
})

test('xor_translation_is_sharply_transitive — each translate is recomputed as a bijection of the sixteen words, exactly one translation carries a to b, and translating twice returns home; the mutation that translates by conjunction must fail', () => {
  const x = (a: number, b: number): number => (a ^ b) & 15
  const sharp = (op: (a: number, b: number) => number): void => {
    for (let k = 0; k < 16; k++) assert.equal(uniq(range(16).map((a) => op(a, k))).length, 16)
    for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) assert.equal(range(16).filter((k) => op(a, k) === b).length, 1)
    for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) assert.equal(op(a, op(a, b)), b)
  }
  sharp(x)
  mutantMustFail(() => sharp((a, b) => a & b))
})

test('subtraction_game_123_grundy_is_mod4 — the Grundy values are recomputed by minimum excludant and must equal n mod 4, no move preserving the residue and every smaller residue being reachable; the mutation that adds 4 to the move set must fail', () => {
  const grundy = (moves: readonly number[], N: number): number[] => {
    const g: number[] = []
    for (let n = 0; n <= N; n++) {
      const seen = new Set(moves.filter((k) => k <= n).map((k) => g[n - k]))
      let m = 0
      while (seen.has(m)) m++
      g[n] = m
    }
    return g
  }
  const g = grundy([1, 2, 3], 40)
  for (let n = 0; n <= 40; n++) {
    assert.equal(g[n], n % 4)
    for (const k of [1, 2, 3]) if (k <= n) assert.notEqual((n - k) % 4, n % 4)
    for (let v = 0; v < n % 4; v++) assert.ok([1, 2, 3].some((k) => k <= n && (n - k) % 4 === v))
  }
  mutantMustFail(() => {
    const h = grundy([1, 2, 3, 4], 40)
    for (let n = 0; n <= 40; n++) assert.equal(h[n], n % 4)
  })
})

test('nim_bouton_three_heap_closure — the losing positions are recomputed as the zero set of the bitwise heap sum, closed under every move and escapable from every non-zero position; the mutation that sums the heaps modulo eight must fail', () => {
  const closure = (X: (a: number, b: number, c: number) => number): void => {
    for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) for (let c = 0; c < 8; c++) {
      const moves: number[][] = [
        ...range(a).map((v) => [v, b, c]),
        ...range(b).map((v) => [a, v, c]),
        ...range(c).map((v) => [a, b, v]),
      ]
      const at = (m: number[]): number => X(m[0] as number, m[1] as number, m[2] as number)
      if (X(a, b, c) === 0) assert.ok(moves.every((m) => at(m) !== 0))
      else assert.ok(moves.some((m) => at(m) === 0))
    }
  }
  closure((a, b, c) => a ^ b ^ c)
  mutantMustFail(() => closure((a, b, c) => (a + b + c) % 8))
})

test('crt21_idempotents_invert_the_pairing — the two residue channels are recombined by 7 and 15 and must rebuild every x mod 21, the coefficients being orthogonal idempotents that sum to one; the mutation that swaps the two coefficients must fail', () => {
  const rebuild = (u: number, v: number, x: number): number => (u * (x % 3) + v * (x % 7)) % 21
  for (let x = 0; x < 21; x++) assert.equal(rebuild(7, 15, x), x)
  for (let a = 0; a < 3; a++) for (let b = 0; b < 7; b++) {
    const r = (7 * a + 15 * b) % 21
    assert.equal(r % 3, a)
    assert.equal(r % 7, b)
  }
  assert.equal((7 * 7) % 21, 7)
  assert.equal((15 * 15) % 21, 15)
  assert.equal((7 * 15) % 21, 0)
  assert.equal((7 + 15) % 21, 1)
  mutantMustFail(() => { for (let x = 0; x < 21; x++) assert.equal(rebuild(15, 7, x), x) })
})

test('crt21_units_have_exponent_six — the twelve units mod 21 are enumerated and every one is killed by the sixth power although the group has order twelve; the mutation that claims the third power suffices must fail', () => {
  const units = range(21).filter((a) => gcd(a, 21) === 1)
  assert.equal(units.length, 12)
  for (const a of units) assert.equal(powMod(a, 6, 21), 1)
  assert.equal(powMod(5, 6, 21), 1)
  assert.notEqual(powMod(5, 2, 21), 1)
  assert.notEqual(powMod(5, 3, 21), 1)
  assert.ok(6 < 12)
  assert.equal(range(9).filter((a) => gcd(a, 9) === 1).length, 6)
  assert.equal(range(7).filter((a) => gcd(a, 7) === 1).length, 6)
  mutantMustFail(() => { for (const a of units) assert.equal(powMod(a, 3, 21), 1) })
})

test('z7_quadratic_residues_euler — the squares mod 7 are enumerated to {1,2,4} and the cube of a residue is recomputed as the exact test for being a square; the mutation that tests with the square instead of the cube must fail', () => {
  const squares = span(1, 6).filter((a) => span(1, 6).some((x) => (x * x) % 7 === a))
  assert.deepEqual(squares, [1, 2, 4])
  for (const a of span(1, 6)) {
    assert.equal(powMod(a, 3, 7) === 1, squares.includes(a))
    assert.ok(powMod(a, 3, 7) === 1 || powMod(a, 3, 7) === 6)
  }
  mutantMustFail(() => { for (const a of span(1, 6)) assert.equal(powMod(a, 2, 7) === 1, squares.includes(a)) })
})

test('z7_primitive_roots_are_three_and_five — the order of each unit is recomputed as the number of DISTINCT powers, giving [1,3,6,3,6,2] and exactly two generators; the mutation that counts powers without discarding repeats must fail', () => {
  const orders = span(1, 6).map((g) => uniq(span(1, 6).map((k) => powMod(g, k, 7))).length)
  assert.deepEqual(orders, [1, 3, 6, 3, 6, 2])
  assert.deepEqual(span(1, 6).filter((_g, i) => orders[i] === 6), [3, 5])
  for (const o of orders) assert.equal(6 % o, 0)
  mutantMustFail(() => {
    const naive = span(1, 6).map((g) => span(1, 6).map((k) => powMod(g, k, 7)).length)
    assert.deepEqual(span(1, 6).filter((_g, i) => naive[i] === 6), [3, 5])
  })
})

test('z7_inverse_table_and_wilson — every non-zero residue mod 7 is given its inverse by search, only 1 and 6 are their own, and the product of all six is 6; the mutation that runs the same census at the composite modulus 8 must fail', () => {
  const table = (n: number): number[][] => span(1, n - 1).map((a) => span(1, n - 1).filter((b) => (a * b) % n === 1))
  const factorial = (n: number): number => span(1, n - 1).reduce((p, a) => (p * a) % n, 1)
  assert.deepEqual(table(7), [[1], [4], [5], [2], [3], [6]])
  assert.deepEqual(span(1, 6).filter((a) => (a * a) % 7 === 1), [1, 6])
  assert.equal(factorial(7), 6)
  mutantMustFail(() => {
    for (const row of table(8)) assert.equal(row.length, 1)
    assert.equal(factorial(8), 7)
  })
})

test('grid_rectangle_euler_is_one — the vertices, edges and faces of every m by n grid are counted and V - E + F must be 1; the mutation that counts only the 2mn interior-style edges must fail', () => {
  const V = (m: number, n: number): number => (m + 1) * (n + 1)
  const E = (m: number, n: number): number => m * (n + 1) + n * (m + 1)
  const F = (m: number, n: number): number => m * n
  for (let m = 1; m <= 8; m++) for (let n = 1; n <= 8; n++) assert.equal(V(m, n) - E(m, n) + F(m, n), 1)
  assert.equal(V(3, 3), 16)
  assert.equal(E(3, 3), 24)
  assert.equal(16 + 9, 24 + 1)
  mutantMustFail(() => { for (let m = 1; m <= 8; m++) for (let n = 1; n <= 8; n++) assert.equal(V(m, n) - 2 * m * n + F(m, n), 1) })
})

test('involution_walks_home_in_two — the maps on four points that undo themselves are enumerated to 10, splitting as 1 + 6 + 3 by cycle type; the mutation that asks for maps of order dividing three must fail', () => {
  const digits = (c: number, n: number): number[] => range(n).map((x) => trunc(c / n ** x) % n)
  const returnsAfter = (c: number, n: number, times: number): boolean => {
    const f = digits(c, n)
    return range(n).every((x) => { let y = x; for (let i = 0; i < times; i++) y = f[y] as number; return y === x })
  }
  const twos = range(256).filter((c) => returnsAfter(c, 4, 2))
  assert.equal(twos.length, 10)
  const fixedCounts = twos.map((c) => range(4).filter((x) => digits(c, 4)[x] === x).length)
  assert.equal(fixedCounts.filter((k) => k === 4).length, 1)
  assert.equal(fixedCounts.filter((k) => k === 2).length, 6)
  assert.equal(fixedCounts.filter((k) => k === 0).length, 3)
  assert.equal(1 + 6 + 3, 10)
  mutantMustFail(() => assert.equal(range(256).filter((c) => returnsAfter(c, 4, 3)).length, 10))
})

test('involution_counts_obey_their_recurrence — the self-inverse maps on 1..5 points are counted by brute force to 1,2,4,10,26 and must satisfy I(n) = I(n-1) + (n-1)*I(n-2); the mutation that uses n instead of n-1 must fail', () => {
  const involutions = (n: number): number => {
    let total = 0
    for (let c = 0; c < n ** n; c++) {
      const f = range(n).map((x) => trunc(c / n ** x) % n)
      if (range(n).every((x) => f[f[x] as number] === x)) total++
    }
    return total
  }
  const I: number[] = [1, ...span(1, 5).map(involutions)]
  assert.deepEqual(I, [1, 1, 2, 4, 10, 26])
  for (let n = 2; n <= 5; n++) assert.equal(I[n], (I[n - 1] as number) + (n - 1) * (I[n - 2] as number))
  mutantMustFail(() => { for (let n = 2; n <= 5; n++) assert.equal(I[n], (I[n - 1] as number) + n * (I[n - 2] as number)) })
})

test('s4_fixed_point_and_cycle_census — the 24 permutations of four points are enumerated and their fixed-point census is [9,8,6,0,1] carrying 24 fixed points in total; the mutation that drops the surjectivity requirement must fail', () => {
  const f = (c: number): number[] => range(4).map((x) => trunc(c / 4 ** x) % 4)
  const isPerm = (c: number): boolean => range(4).every((y) => f(c).includes(y))
  const perms = range(256).filter(isPerm)
  assert.equal(perms.length, 24)
  const census = range(5).map((k) => perms.filter((c) => range(4).filter((x) => f(c)[x] === x).length === k).length)
  assert.deepEqual(census, [9, 8, 6, 0, 1])
  assert.equal(census.reduce((s, n, k) => s + k * n, 0), 24)
  assert.equal(census.reduce((s, n) => s + n, 0), 24)
  mutantMustFail(() => {
    const all = range(256)
    assert.deepEqual(range(5).map((k) => all.filter((c) => range(4).filter((x) => f(c)[x] === x).length === k).length), [9, 8, 6, 0, 1])
  })
})

test('s4_parity_splits_evenly_its_involutions_do_not — inversions are counted to split the 24 permutations 12/12 while the 10 self-inverse ones split 4/6; the mutation that claims the involutions split evenly must fail', () => {
  const f = (c: number): number[] => range(4).map((x) => trunc(c / 4 ** x) % 4)
  const isPerm = (c: number): boolean => range(4).every((y) => f(c).includes(y))
  const sign = (c: number): number => {
    const p = f(c)
    return range(4).map((i) => range(4).filter((j) => i < j && (p[j] as number) < (p[i] as number)).length).reduce((a, b) => a + b, 0) % 2
  }
  const isInv = (c: number): boolean => { const p = f(c); return range(4).every((x) => p[p[x] as number] === x) }
  assert.equal(range(256).filter((c) => isPerm(c) && sign(c) === 0).length, 12)
  assert.equal(range(256).filter((c) => isPerm(c) && sign(c) === 1).length, 12)
  const even = range(256).filter((c) => isInv(c) && sign(c) === 0).length
  const odd = range(256).filter((c) => isInv(c) && sign(c) === 1).length
  assert.equal(even, 4)
  assert.equal(odd, 6)
  assert.equal(even + odd, 10)
  assert.notEqual(even, odd)
  assert.equal(range(256).filter((c) => isInv(c) && !isPerm(c)).length, 0)
  mutantMustFail(() => assert.equal(even, odd))
})

test('agl9_exponent_is_eighteen_with_no_element_of_that_order — the 54 affine maps on nine points have their orders recomputed to a multiset whose least common multiple is 18 while no element reaches it; the mutation that reads the exponent off the largest order must fail', () => {
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
  const maps = range(81).filter((e) => [1, 2, 4, 5, 7, 8].includes(trunc(e / 9)))
  assert.equal(maps.length, 54)
  const order = (e: number): number => {
    const u = trunc(e / 9), v = e % 9
    let acc = 9
    for (let k = 1; k <= 18; k++) {
      acc = ((u * trunc(acc / 9)) % 9) * 9 + ((u * (acc % 9) + v) % 9)
      if (acc === 9) return k
    }
    return 0
  }
  const orders = maps.map(order)
  const exponent = orders.reduce((a, b) => lcm(a, b), 1)
  assert.equal(exponent, 18)
  assert.equal(maxOf(...orders), 9)
  assert.equal(orders.filter((o) => o === 18).length, 0)
  for (const o of orders) assert.equal(54 % o, 0)
  assert.deepEqual([1, 2, 3, 6, 9, 18, 27, 54].map((d) => orders.filter((o) => o === d).length), [1, 9, 8, 18, 18, 0, 0, 0])
  mutantMustFail(() => assert.equal(maxOf(...orders), exponent))
})

test('entanglement_completes_one_at_a_time — the pair count is recomputed as n(n-1)/2 and each new party must add exactly n-1 pairs; the mutation that credits the newcomer with n pairs must fail', () => {
  const pairs = (n: number): number => (n * (n - 1)) / 2
  for (const n of span(2, 20)) {
    assert.equal(pairs(n) - pairs(n - 1), n - 1)
    assert.equal(2 * pairs(n), n * (n - 1))
    assert.equal((n * (n - 1)) % 2, 0)
  }
  assert.equal(pairs(1690), 1427205)
  assert.equal(1690 * 1689, 2854410)
  mutantMustFail(() => { for (const n of span(2, 20)) assert.equal(pairs(n) - pairs(n - 1), n) })
})

test('tet_semitone_no_integer_lattice — the whole window of p and q is searched for p^12 = 2*q^12 and none exists; the mutation that drops the exponent to one must fail, proving the search can find a solution when there is one', () => {
  const found = (exp: number): number[] | null => {
    for (let q = 1; q <= 24; q++) for (let p = 1; p <= 30; p++) if (BigInt(p) ** BigInt(exp) === 2n * BigInt(q) ** BigInt(exp)) return [p, q]
    return null
  }
  assert.equal(found(12), null)
  for (let q = 1; q <= 24; q++) for (let p = 1; p <= 30; p++) assert.notEqual(BigInt(p) ** 12n, 2n * BigInt(q) ** 12n)
  mutantMustFail(() => assert.equal(found(1), null))
})

test('z9_digit_sum_folds_to_the_residue_in_three — the decimal digit sum is folded three times and must land on (n-1) mod 9 + 1, hitting 9 exactly on the multiples of 9 and respecting products; the mutation that reads the fold as n mod 9 must fail', () => {
  const foldOnce = (n: number): number => String(n).split('').reduce((s, d) => s + Number(d), 0)
  const root = (n: number): number => foldOnce(foldOnce(foldOnce(n)))
  for (let n = 1; n <= 1000; n++) {
    assert.equal(root(n), ((n - 1) % 9) + 1)
    assert.equal(root(n) === 9, n % 9 === 0)
  }
  assert.ok(span(1, 200).some((n) => foldOnce(foldOnce(n)) > 9))
  assert.ok(span(1, 1000).some((n) => foldOnce(n) > 9))
  assert.equal(span(1, 1000).filter((n) => foldOnce(foldOnce(foldOnce(n))) > 9).length, 0)
  for (const a of span(1, 30)) for (const b of span(1, 30)) assert.equal(root(a * b), root(root(a) * root(b)))
  mutantMustFail(() => { for (let n = 1; n <= 1000; n++) assert.equal(root(n), n % 9) })
})

test('parity_bit_rejects_half_the_byte_tamper_set — every single-bit tamper of every byte is recomputed and must move the parity, splitting the non-zero bytes 128 against 127; the mutation that tampers with two bits must fail, because parity is blind to it', () => {
  const parity = (b: number): number => pop(b) % 2
  for (let b = 0; b < 256; b++) for (let i = 0; i < 8; i++) {
    const t = b ^ (1 << i)
    assert.notEqual(parity(t), parity(b))
    assert.notEqual(t, b)
    assert.ok(t < 256)
  }
  assert.equal(span(1, 255).filter((b) => parity(b) === 1).length, 128)
  assert.equal(span(1, 255).filter((b) => parity(b) === 0).length, 127)
  assert.equal(128 + 127, 255)
  mutantMustFail(() => {
    for (let b = 0; b < 256; b++) for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
      if (i === j) continue
      assert.notEqual(parity(b ^ (1 << i) ^ (1 << j)), parity(b))
    }
  })
})

test('byte_weight_splits_across_its_two_tiles — the weight of a byte is recomputed as the sum of its two nibble weights, giving the census [1,8,28,56,70,56,28,8,1]; the mutation that combines the nibble weights by exclusive-or must fail', () => {
  const combine = (op: (a: number, b: number) => number): void => {
    for (let hi = 0; hi < 16; hi++) for (let lo = 0; lo < 16; lo++) {
      const b = hi * 16 + lo
      assert.equal(b >> 4, hi)
      assert.equal(b & 15, lo)
      assert.equal(pop(b), op(pop(hi), pop(lo)))
      assert.ok(pop(b) <= 8)
    }
  }
  combine((a, b) => a + b)
  const census = range(9).map((k) => range(256).filter((b) => pop(b) === k).length)
  assert.deepEqual(census, [1, 8, 28, 56, 70, 56, 28, 8, 1])
  assert.equal(census.reduce((s, n) => s + n, 0), 256)
  mutantMustFail(() => combine((a, b) => a ^ b))
})

test('tile_tamper_distance_census_is_binomial — the nibble-to-nibble distances are recomputed by exclusive-or and censused to [16,64,96,64,16]; the mutation that measures distance by arithmetic difference must fail', () => {
  const censusOf = (dist: (a: number, b: number) => number): number[] => range(5).map((k) => {
    let n = 0
    for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) if (dist(a, b) === k) n++
    return n
  })
  const xorDist = (a: number, b: number): number => pop(a ^ b)
  assert.deepEqual(censusOf(xorDist), [16, 64, 96, 64, 16])
  assert.equal(censusOf(xorDist).reduce((s, n) => s + n, 0), 256)
  for (let a = 0; a < 16; a++) {
    for (let b = 0; b < 16; b++) {
      assert.ok(xorDist(a, b) <= 4)
      assert.equal(xorDist(a, b) % 2, (pop(a) + pop(b)) % 2)
    }
    assert.equal(xorDist(a, 15 - a), 4)
  }
  mutantMustFail(() => assert.deepEqual(censusOf((a, b) => absOf(a - b)), [16, 64, 96, 64, 16]))
})

test('monotone_two_bit_gates_are_threshold — the sixteen two-input gates are sieved for monotonicity to [0,8,10,12,14,15] and each monotone one is matched to a weight-threshold form; the mutation that declares exclusive-or monotone must fail', () => {
  const bit = (m: number, i: number): number => (m >> i) & 1
  const monotone = (m: number): boolean => {
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) for (let d = 0; d < 2; d++) {
      if (a <= c && b <= d && !(bit(m, 2 * a + b) <= bit(m, 2 * c + d))) return false
    }
    return true
  }
  const threshold = (m: number): boolean => {
    for (let w = 0; w < 3; w++) for (let v = 0; v < 3; v++) for (let t = 0; t < 6; t++) {
      let ok = true
      for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) if (bit(m, 2 * a + b) !== (t <= w * a + v * b ? 1 : 0)) ok = false
      if (ok) return true
    }
    return false
  }
  assert.deepEqual(range(16).filter(monotone), [0, 8, 10, 12, 14, 15])
  for (let m = 0; m < 16; m++) assert.equal(monotone(m), threshold(m))
  assert.equal(monotone(6), false)
  mutantMustFail(() => assert.deepEqual(range(16).filter((m) => monotone(m) || m === 6), [0, 8, 10, 12, 14, 15]))
})

test('post_classes_leave_only_nor_and_nand — the five closed classes are recomputed as sieves over the sixteen gates and only 1 and 7 survive all five; the mutation that stops requiring the gate to break one must fail', () => {
  const bit = (m: number, i: number): number => (m >> i) & 1
  const monotone = (m: number): boolean => {
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) for (let d = 0; d < 2; d++) {
      if (a <= c && b <= d && !(bit(m, 2 * a + b) <= bit(m, 2 * c + d))) return false
    }
    return true
  }
  const selfDual = (m: number): boolean => {
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) if (bit(m, 2 * (1 - a) + (1 - b)) !== 1 - bit(m, 2 * a + b)) return false
    return true
  }
  const affine = (m: number): boolean => {
    for (let k = 0; k < 2; k++) for (let w = 0; w < 2; w++) for (let z = 0; z < 2; z++) {
      let ok = true
      for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) if (bit(m, 2 * a + b) !== (k + w * a + z * b) % 2) ok = false
      if (ok) return true
    }
    return false
  }
  const sieve = (keepOnePreserving: boolean): number[] => range(16).filter((m) =>
    bit(m, 0) === 1 && (keepOnePreserving ? bit(m, 3) === 0 : true) && !monotone(m) && !selfDual(m) && !affine(m))
  assert.deepEqual(sieve(true), [1, 7])
  assert.equal(affine(6), true)
  assert.equal(selfDual(3), true)
  assert.equal(monotone(15), true)
  mutantMustFail(() => assert.deepEqual(sieve(false), [1, 7]))
})

test('three_cell_vote_majority — the majority of three bits is recomputed as floor of the half-sum and matched against the full truth table; the mutation that divides the sum by three must fail', () => {
  const vote = (div: number): number[] => {
    const rows: number[] = []
    for (const a of [0, 1]) for (const b of [0, 1]) for (const c of [0, 1]) rows.push(trunc((a + b + c) / div))
    return rows
  }
  assert.deepEqual(vote(2), [0, 0, 0, 1, 0, 1, 1, 1])
  assert.equal(trunc((0 + 0 + 0) / 2), 0)
  assert.equal(trunc((1 + 0 + 0) / 2), 0)
  assert.equal(trunc((1 + 1 + 0) / 2), 1)
  assert.equal(trunc((1 + 1 + 1) / 2), 1)
  mutantMustFail(() => assert.deepEqual(vote(3), [0, 0, 0, 1, 0, 1, 1, 1]))
})

test('correlated_failure_defeats_the_vote — the vote is recomputed on two cells that fail together and returns the wrong answer, so agreement is shown not to be evidence; the mutation that claims the vote survives any two agreeing cells must fail', () => {
  const majority = (a: number, b: number, c: number): number => trunc((a + b + c) / 2)
  assert.equal(majority(0, 0, 1), 0)
  assert.equal(majority(1, 1, 0), 1)
  assert.notEqual(majority(0, 0, 1), 1)
  assert.notEqual(majority(1, 1, 0), 0)
  mutantMustFail(() => {
    for (const t of [0, 1]) for (const wrong of [0, 1]) if (wrong !== t) assert.equal(majority(wrong, wrong, t), t)
  })
})

test('pilgrims_walk_must_cycle — every four-digit base-three walk is enumerated and can never show four distinct digits; the mutation that widens the alphabet to base four must fail', () => {
  const distinct = (base: number, v: number): number => uniq(range(4).map((i) => trunc(v / base ** i) % base)).length
  for (let v = 0; v < 81; v++) assert.ok(distinct(3, v) <= 3)
  assert.equal(16 ** 8, 4294967296)
  mutantMustFail(() => { for (let v = 0; v < 256; v++) assert.ok(distinct(4, v) <= 3) })
})
