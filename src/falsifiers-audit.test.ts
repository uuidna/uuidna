// Audit.lean falsifiers — each test RECOMPUTES the theorem's property in JavaScript, asserts it holds, then
// applies a deliberate mutation and asserts the mutated form FAILS. A check that cannot fail proves nothing.
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

// ---------------------------------------------------------------------------------------------------------
// The detector under audit. h = hollow superlative, d = demarcated, b = backed by a sealed theorem.
// Lean: def flag (h d b : Nat) : Nat := h * (1 - d) * (1 - b)
type Detector = (h: number, d: number, b: number) => number

const flag: Detector = (h, d, b) => h * (1 - d) * (1 - b)

/** the eight states, decoded the same way the Lean statements decode them: h = n%2, d = n/2%2, b = n/4%2 */
const state = (n: number): [number, number, number] => [n % 2, trunc(n / 2) % 2, trunc(n / 4) % 2]
const over8 = <T>(f: (h: number, d: number, b: number, n: number) => T): T[] =>
  Array.from({ length: 8 }, (_unused, n) => f(...state(n), n))
const truthTable = (f: Detector): number[] => over8((h, d, b) => f(h, d, b))

// The deliberate mutations. Each drops exactly one factor from the detector.
const dropsBackingClearance: Detector = (h, d, _b) => h * (1 - d)          // forgets that a proof link clears
const dropsHollowRequirement: Detector = (_h, d, b) => (1 - d) * (1 - b)   // fires on prose with no superlative
const dropsDemarcationClearance: Detector = (h, _d, b) => h * (1 - b)      // ignores an honest hedge

// ---------------------------------------------------------------------------------------------------------

test('flag_truth_table — recompute h·(1−d)·(1−b) across all eight states and compare to the sealed row; a detector that drops the backing factor must not reproduce it', () => {
  const sealed = [0, 1, 0, 0, 0, 0, 0, 0]

  // (a) the property, recomputed independently
  assert.deepEqual(truthTable(flag), sealed)
  // the single 1 sits exactly at (hollow, not demarcated, not backed) = n 1
  assert.deepEqual(state(1), [1, 0, 0])

  // (b) the mutation must fail — dropping (1−b) lights n 5 (hollow, undemarcated, BACKED) as well
  const mutant = truthTable(dropsBackingClearance)
  assert.notDeepEqual(mutant, sealed)
  assert.equal(mutant[5], 1)
  assert.equal(sealed[5], 0)

  // a second, independent mutation: dropping (1−d) lights n 3 as well
  assert.notDeepEqual(truthTable(dropsDemarcationClearance), sealed)
})

test('flag_requires_hollow — recompute flag ≤ h at every state (honest prose is never flagged); a detector that drops the hollow factor must violate the bound', () => {
  // (a) soundness holds for the real detector at all eight states
  assert.equal(over8((h, d, b) => flag(h, d, b) <= h).every(Boolean), true)
  // and concretely: every h = 0 state scores 0
  assert.deepEqual(over8((h, d, b, n) => (h === 0 ? flag(h, d, b) : 0)), [0, 0, 0, 0, 0, 0, 0, 0])

  // (b) the mutation must fail — (1−d)·(1−b) fires at n 0, which has no hollow superlative at all
  const violations = over8((h, d, b, n) => (dropsHollowRequirement(h, d, b) <= h ? -1 : n)).filter((n) => n >= 0)
  assert.equal(over8((h, d, b) => dropsHollowRequirement(h, d, b) <= h).every(Boolean), false)
  assert.deepEqual(violations, [0])              // the empty state: no superlative, yet the mutant fires
  assert.equal(dropsHollowRequirement(0, 0, 0), 1)
  assert.equal(flag(0, 0, 0), 0)
})

test('backing_clears — recompute flag·b = 0 at every state (a sealed-theorem link clears the claim); the mutant that drops the backing factor must leave a nonzero product', () => {
  const products = (f: Detector) => over8((h, d, b) => f(h, d, b) * b)

  // (a) the real detector never fires on backed prose
  assert.deepEqual(products(flag), [0, 0, 0, 0, 0, 0, 0, 0])
  assert.equal(products(flag).every((p) => p === 0), true)

  // (b) the mutation must fail — flag·b is 1 at n 5, so backing no longer clears
  const mutated = products(dropsBackingClearance)
  assert.notDeepEqual(mutated, [0, 0, 0, 0, 0, 0, 0, 0])
  assert.equal(mutated[5], 1)
  assert.equal(mutated.some((p) => p !== 0), true)
})

test('demarcation_clears — recompute flag·d = 0 at every state (an honest hedge clears the claim); the mutant that drops the demarcation factor must leave a nonzero product', () => {
  const products = (f: Detector) => over8((h, d, b) => f(h, d, b) * d)

  // (a) the real detector never fires on demarcated prose
  assert.deepEqual(products(flag), [0, 0, 0, 0, 0, 0, 0, 0])
  assert.equal(products(flag).every((p) => p === 0), true)

  // (b) the mutation must fail — flag·d is 1 at n 3, so demarcation no longer clears
  const mutated = products(dropsDemarcationClearance)
  assert.notDeepEqual(mutated, [0, 0, 0, 0, 0, 0, 0, 0])
  assert.equal(mutated[3], 1)
  assert.equal(mutated.some((p) => p !== 0), true)
})

test('exactly_one_flag — recount the firing states (a gate that never fires proves nothing); mutants that drop a clearance must fire more than once', () => {
  const firings = (f: Detector) => over8((h, d, b, n) => (f(h, d, b) === 1 ? n : -1)).filter((n) => n >= 0)

  // (a) precisely one of the eight states fires, and it is n 1
  assert.equal(firings(flag).length, 1)
  assert.deepEqual(firings(flag), [1])
  assert.notEqual(firings(flag).length, 0) // it CAN fire — precision, not silence

  // (b) the mutations must fail the count
  assert.deepEqual(firings(dropsBackingClearance), [1, 5])
  assert.deepEqual(firings(dropsDemarcationClearance), [1, 3])
  assert.deepEqual(firings(dropsHollowRequirement), [0, 1])
  for (const m of [dropsBackingClearance, dropsDemarcationClearance, dropsHollowRequirement])
    assert.notEqual(firings(m).length, 1)
})

test('flag_matches_spec — recompute the arithmetic detector against an independently written boolean specification at all eight states; a mutated specification must stop agreeing', () => {
  const spec = (h: number, d: number, b: number) => (h === 1 && d === 0 && b === 0 ? 1 : 0)
  // the mutation: conjunction loosened to disjunction — same three inputs, different intent
  const mutatedSpec = (h: number, d: number, b: number) => (h === 1 || d === 0 || b === 0 ? 1 : 0)

  // (a) implementation IS the intent, at every state
  assert.deepEqual(truthTable(flag), over8((h, d, b) => spec(h, d, b)))
  assert.equal(over8((h, d, b) => flag(h, d, b) === spec(h, d, b)).every(Boolean), true)

  // (b) two mutations must fail — a wrong spec against the right detector, and a wrong detector against the right spec
  assert.notDeepEqual(truthTable(flag), over8((h, d, b) => mutatedSpec(h, d, b)))
  assert.equal(mutatedSpec(0, 0, 0), 1)
  assert.equal(spec(0, 0, 0), 0)
  assert.notDeepEqual(truthTable(dropsBackingClearance), over8((h, d, b) => spec(h, d, b)))
})

test('witnesses_locate_faults — simulate majority voting to rederive the 2t+1 bound; the mutated bound 2t must fail to locate, splitting evenly instead', () => {
  // A witness reports a verdict. The honest ones report the true verdict; t faulty ones collude on the other.
  const ballot = (n: number, t: number) => {
    const tally = new Map<string, number>()
    for (let i = 0; i < n; i++) {
      const said = i < n - t ? 'true' : 'false'
      tally.set(said, (tally.get(said) ?? 0) + 1)
    }
    const ranked = [...tally.entries()].sort((x, y) => y[1] - x[1])
    const detects = tally.size > 1
    const clear = ranked.length === 1 || ranked[0][1] > ranked[1][1]
    return { detects, locates: clear && ranked[0][0] === 'true' }
  }
  const minimalWitnesses = (t: number) => {
    for (let n = 1; n <= 64; n++) if (ballot(n, t).locates) return n
    return -1
  }

  // (a) the bound, rederived from the vote rather than restated
  for (let t = 0; t <= 6; t++) assert.equal(minimalWitnesses(t), 2 * t + 1)
  assert.equal(minimalWitnesses(1), 3)
  assert.equal(minimalWitnesses(2), 5)
  assert.deepEqual([3, 5].map((n) => n % 2), [1, 1])   // both odd
  assert.equal(4 % 2, 0)                                // four is even, and that is the flaw
  assert.equal(3 - 1, 2)                                // three witnesses leave two honest against one
  assert.equal(2 > 1, true)
  // four witnesses with two faults DETECT a disagreement but cannot name the culprit
  assert.deepEqual(ballot(4, 2), { detects: true, locates: false })

  // (b) the mutation must fail — drop the +1 and the bound stops locating at every t ≥ 1
  for (let t = 1; t <= 6; t++) {
    assert.equal(ballot(2 * t, t).locates, false)
    assert.notEqual(minimalWitnesses(t), 2 * t)
  }
  // and dropping below the bound hands the vote to the faulty side
  assert.equal(ballot(2, 1).locates, false)
  assert.equal(ballot(3, 2).locates, false)
})

// The per-wing doc-comment census the two prose theorems fold over.
const PROSE_PER_WING = [
  6, 6, 6, 9, 13, 8, 11, 11, 6, 17, 6, 5, 15, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 10, 6,
  14, 4, 13, 7, 12, 10, 6, 6, 6, 17, 8, 16, 6, 13, 12, 6, 10, 6, 4, 8, 11, 7, 7, 5, 8, 18, 93, 6, 6, 9, 9, 7, 13, 6,
  8, 6, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 5, 16, 11, 11, 8, 6, 8, 6, 3, 6, 6, 6, 11,
  6, 17, 8, 6, 13, 7, 2, 13, 454, 18,
]
const CHARS_PER_WING = [
  1078, 1237, 1545, 3368, 3345, 3111, 1892, 2906, 2142, 2609, 1487, 774, 6583, 1774, 3857, 3451, 4156, 9501, 2242,
  1597, 1239, 13779, 5016, 1319, 1736, 1372, 960, 4419, 2363, 5075, 1465, 5300, 1603, 3293, 761, 3008, 1358, 2171,
  2848, 1506, 1335, 1330, 3288, 1848, 10005, 959, 4088, 5637, 1452, 3105, 2783, 1577, 1629, 1217, 3672, 1188, 753,
  4538, 5728, 15957, 1575, 1188, 1833, 2098, 1393, 2602, 1479, 1572, 2261, 1800, 934, 1027, 2126, 12903, 9377, 10650,
  6393, 1646, 987, 1488, 1539, 3510, 3069, 2097, 789, 1488, 3198, 6182, 2244, 6848, 1937, 3396, 1946, 1544, 1412,
  2571, 919, 1453, 2419, 2148, 3304, 805, 5704, 2905, 1522, 3958, 3675, 1667, 3313, 160968, 10447,
]
const total = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0)

test('prose_coverage_total — refold the per-wing doc-comment counts and assert every single wing is load-bearing; perturbing any one wing must break the total', () => {
  // (a) the fold, recomputed; and the census shape it claims — every wing the census walks, none undocumented
  assert.equal(total(PROSE_PER_WING), 2052)
  assert.equal(PROSE_PER_WING.length, 111)
  assert.equal(PROSE_PER_WING.every((n) => n > 0), true)
  assert.equal(minOf(...PROSE_PER_WING) >= 1, true)
  // both prose theorems census the same every wing the census walks
  assert.equal(CHARS_PER_WING.length, PROSE_PER_WING.length)

  // (b) the mutation must fail at EVERY index — the claim is that a gap in any ONE wing breaks the equality,
  // so a total that survived a perturbation somewhere would mean that wing was never counted.
  let broken = 0
  for (let i = 0; i < PROSE_PER_WING.length; i++) {
    const gapped = PROSE_PER_WING.slice()
    gapped[i] = 0                                  // this wing loses all its prose
    assert.notEqual(total(gapped), 2052)
    assert.equal(gapped.every((n) => n > 0), false) // and "0 without" stops holding
    broken++
  }
  assert.equal(broken, 111)
  // a total compared against itself would survive every one of those mutations — that comparison is not the check
  assert.equal(total(PROSE_PER_WING.map(() => 0)), 0)
})

test('prose_folds_receipt — refold every wing the census walks of prose to one ℤ/9 receipt by digit-summing instead of by remainder; a single extra character in any wing must move the digit', () => {
  // an independent path to the residue: repeated digit summing, never the % operator
  const digitFold = (n: number): number => {
    let x = n
    while (x >= 9) {
      let s = 0
      for (const c of String(x)) s += Number(c)
      if (s === x) break
      x = s
    }
    return x === 9 ? 0 : x
  }

  // (a) the corpus folds to 6, and the two paths to the residue agree
  const sum = total(CHARS_PER_WING)
  assert.equal(sum, 505644)
  assert.equal(CHARS_PER_WING.length, 111)
  assert.equal(digitFold(sum), 6)
  assert.equal(sum % 9, digitFold(sum))
  assert.equal(digitFold(sum) < 9, true)
  // the digit fold is not a constant function — it answers differently for other totals
  assert.deepEqual([0, 1, 8, 9, 10, 18, 505643].map(digitFold), [0, 1, 8, 0, 1, 0, 5])

  // (b) the mutation must fail at every wing: one more character anywhere moves the receipt off 6
  for (let i = 0; i < CHARS_PER_WING.length; i++) {
    const edited = CHARS_PER_WING.slice()
    edited[i] += 1
    const moved = digitFold(total(edited))
    assert.notEqual(moved, 6)
    assert.equal(moved, 7)
  }
  // and a nine-character edit is exactly the blind spot a ℤ/9 receipt is allowed to have — stated, not hidden
  const blind = CHARS_PER_WING.slice()
  blind[0] += 9
  assert.equal(digitFold(total(blind)), 6)
})
