// coins-falsifiers — the FALSIFIER leg for the Coins.lean wing. Every test here recomputes its theorem's property
// independently in JavaScript, asserts the honest form HOLDS, and then feeds a DELIBERATELY MUTATED model through
// the SAME checker and asserts it FAILS. The mutation is the point: a check that cannot fail proves nothing, so a
// test that only restated the numeral would earn the leg while measuring nothing.
//
// Nothing is imported from the tree — the recomputation has to be independent to be worth anything, so the
// arithmetic, the group, the enumeration and the float behaviour are all rebuilt here from scratch.
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

// ── shared scaffolding ────────────────────────────────────────────────────────────────────────────────────────
/** 1..n inclusive — the counts the wing walks. */
const upTo = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1)
/** 0..n-1 — the widths the wing walks. */
const from0 = (n: number): number[] => Array.from({ length: n }, (_, i) => i)
/** a concrete 32-hexbit identity, so the partition tests read real bytes rather than a length. */
const UUID = 'deadbeefcafebabe0123456789abcdef'

test('minting_is_two_per_theorem — build the supply coin by coin and check it is 2n and even; a mint of 3 or 1 per theorem must fail the same build', () => {
  // recompute: seal n theorems, push `perTheorem` coins for each, and read the supply back off the pile
  const supplyOf = (n: number, perTheorem: number): number[] => {
    const pile: number[] = []
    for (let i = 0; i < n; i++) for (let c = 0; c < perTheorem; c++) pile.push(i)
    return pile
  }
  const mintsTwoPerTheorem = (perTheorem: number): boolean =>
    upTo(8).every((n) => {
      const pile = supplyOf(n, perTheorem)
      return pile.length === n + n && pile.length % 2 === 0
    })

  assert.equal(mintsTwoPerTheorem(2), true, 'two apiece: the supply is 2n and even at every count from one to eight')
  assert.equal(UUID.length, 32)

  // MUTATION — a half-coin creeping in. Odd supply, and the doubling identity breaks.
  assert.equal(mintsTwoPerTheorem(3), false, 'three apiece must fail: 3n is not n+n, and it is odd at odd counts')
  assert.equal(mintsTwoPerTheorem(1), false, 'one apiece must fail: a theorem cannot be half-sealed')
  assert.equal(supplyOf(5, 3).length % 2, 1, 'the mutated pile is odd — exactly the half-coin the theorem refuses')
})

test('billing_closes_at_every_count — the per-theorem price recomputed as a division with remainder; a bill of 2n+1 must fail to close', () => {
  const closes = (bill: (n: number) => number): boolean =>
    upTo(8).every((n) => bill(n) % n === 0 && bill(n) / n === 2)

  assert.equal(closes((n) => 2 * n), true, 'exactly two per theorem, no remainder, at every count')

  // MUTATION — a bill that is right on average but not at every count, and one that leaves a remainder.
  assert.equal(closes((n) => 2 * n + 1), false, 'a stray coin must fail: the price stops being two')
  assert.equal(closes((n) => n * n + n), false, 'an averaging bill must fail: it gives two only at n = 1')
  assert.equal(((n: number) => n * n + n)(1) / 1, 2, 'which is why the walk covers more than one count')
})

test('wallet_counts_worlds — deposits paired to collapsed worlds as an explicit bijection; three coins a deposit must break the pairing', () => {
  const depositCoins = (n: number, perDeposit: number): number[] => {
    const coins: number[] = []
    for (let i = 0; i < n; i++) for (let c = 0; c < perDeposit; c++) coins.push(i)
    return coins
  }
  // the identity: coins paid / 2 is the number of DISTINCT worlds the coins belong to
  const bijective = (perDeposit: number): boolean =>
    from0(9).every((n) => {
      const coins = depositCoins(n, perDeposit)
      return coins.length / 2 === n && new Set(coins).size === n
    })

  assert.equal(bijective(2), true, 'n deposits of two coins are exactly n collapsed worlds')

  // MUTATION — any other denomination and the count of worlds stops being the count of deposits.
  assert.equal(bijective(3), false, 'three a deposit must fail: 3n/2 is not n, and at odd n it is not even an integer')
  assert.equal(bijective(1), false, 'one a deposit must fail: n/2 undercounts the worlds')
  assert.equal(depositCoins(3, 3).length / 2, 4.5, 'the mutated wallet reports half a world')
})

test('two_coins_are_switch_and_track — entangled 2n against a chain n+1, walked to twelve; a shared track must destroy the meet-at-one', () => {
  const entangled = (n: number): number => 2 * n // switch + track, and the track CANNOT be shared
  const chain = (n: number): number => n + 1     // leaving one gateway is entering the next: the end IS shared

  const neverCheaper = (ent: (n: number) => number, ch: (n: number) => number): boolean =>
    upTo(12).every((n) => ent(n) >= ch(n))
  const agreeOnlyAtOne = (ent: (n: number) => number, ch: (n: number) => number): boolean =>
    upTo(12).every((n) => (ent(n) === ch(n)) === (n === 1))

  assert.equal(1 + 1, 2, 'one coin to switch the dimension, one to keep track')
  assert.equal(neverCheaper(entangled, chain), true, 'entanglement never costs less than a chain')
  assert.equal(agreeOnlyAtOne(entangled, chain), true, 'and the two readings agree at exactly one')

  // MUTATION A — let the track be shared, so entanglement is priced like a chain. The decomposition collapses.
  const sharedTrack = (n: number): number => n + 1
  assert.equal(agreeOnlyAtOne(sharedTrack, chain), false, 'a shared track must fail: the two readings would agree everywhere')
  // MUTATION B — a chain that charges for both ends. Entanglement is then CHEAPER at one.
  const unsharedChain = (n: number): number => n + 2
  assert.equal(neverCheaper(entangled, unsharedChain), false, 'an unshared end must fail: 2 < 3 at a single passage')
})

test('captain_computes_only_with_two_coins — search the whole coin range for what reaches the save; any per-coin rate but 32 must miss two', () => {
  const reachesSixtyFourAt = (perCoin: number): number[] =>
    from0(8).filter((c) => perCoin * c === 64)
  const iffTwo = (perCoin: number): boolean =>
    from0(8).every((c) => (perCoin * c === 64) === (c === 2))

  assert.deepEqual(reachesSixtyFourAt(32), [2], 'the conserved save of 64 is reached at exactly one coin count')
  assert.equal(iffTwo(32), true, '32·c = 64 if and only if c = 2, walked over the whole range')

  // MUTATION — retune the per-coin rate. Uniqueness may survive, but it lands somewhere other than the commission.
  assert.deepEqual(reachesSixtyFourAt(64), [1], 'a doubled rate reaches the save on one coin')
  assert.equal(iffTwo(64), false, 'a doubled rate must fail the iff: the two coins would be decorative')
  assert.deepEqual(reachesSixtyFourAt(16), [4], 'a halved rate needs four')
  assert.equal(iffTwo(16), false, 'a halved rate must fail the iff')
  assert.deepEqual(reachesSixtyFourAt(0), [], 'a rate of nothing reaches the save at no count at all')
})

test('captain_coins_respected_at_scale — find the crossover where 2^n first outruns the two-coin save; a growing save or a polynomial cost must move it off seven', () => {
  const save = 2 * 32
  const crossover = (cost: (n: number) => number, saving: (n: number) => number): number => {
    for (let n = 1; n < 40; n++) if (cost(n) > saving(n)) return n
    return -1
  }
  const stateVector = (n: number): number => 2 ** n

  assert.equal(crossover(stateVector, () => save), 7, 'exponential cost first exceeds the bounded save at seven')
  assert.equal(2 ** 6 > save, false, 'at six the cost only MEETS the save — the crossover is not earlier')
  assert.equal(upTo(6).every((i) => 2 ** (i + 6) > save), true, 'and from seven up it never comes back under')

  // MUTATION A — let the save grow with the scale. The coins stop being respected at seven.
  assert.notEqual(crossover(stateVector, (n) => save * n), 7, 'a save that grows must fail: it postpones the crossover')
  // MUTATION B — make the cost polynomial. The exponential claim is then unearned.
  assert.notEqual(crossover((n) => n * n, () => save), 7, 'a polynomial cost must fail: it crosses at nine, not seven')
})

test('superposition_outcomes_to_64 — enumerate the basis strings of n qubits and count DISTINCT ones; a linear register or a stuck wire must not produce the doubling list', () => {
  // recompute by construction, not by 2**n: grow the set of bit strings one wire at a time
  const basisStates = (n: number): string[] => {
    let out: string[] = ['']
    for (let i = 0; i < n; i++) out = out.flatMap((s) => [s + '0', s + '1'])
    return out
  }
  const counts = (enumerate: (n: number) => string[]): number[] =>
    from0(7).map((n) => new Set(enumerate(n)).size)

  assert.deepEqual(counts(basisStates), [1, 2, 4, 8, 16, 32, 64], 'n qubits give 2^n DISTINCT outcomes, reaching 64 at six')
  assert.equal(basisStates(6).every((s) => s.length === 6), true, 'and every outcome is a six-wire reading')

  // MUTATION A — the linear misreading: "n qubits give 2n outcomes".
  const linear = (n: number): string[] => Array.from({ length: 2 * n }, (_, i) => 'o' + i)
  assert.notDeepEqual(counts(linear), [1, 2, 4, 8, 16, 32, 64], 'a linear register must fail — it never reaches 64')
  // MUTATION B — a sixth wire that duplicates the fifth: the strings grow, the DISTINCT count does not.
  const stuckWire = (n: number): string[] => (n < 6 ? basisStates(n) : basisStates(5).map((s) => s + s[4]))
  assert.equal(stuckWire(6).length, 32, 'the stuck register offers only 32 distinct readings at six wires')
  assert.notDeepEqual(counts(stuckWire), [1, 2, 4, 8, 16, 32, 64], 'a stuck wire must fail the count')
})

test('bill_never_negative — the clamp recomputed against raw JavaScript subtraction, which does NOT clamp; the unclamped bill must fail', () => {
  const clamped = (r: number, v: number): number => (r < v ? 0 : r - v)
  const raw = (r: number, v: number): number => r - v

  const neverNegative = (bill: (r: number, v: number) => number): boolean => {
    for (let r = 0; r < 8; r++) for (let v = 0; v < 8; v++) if (bill(r, v) < 0) return false
    return true
  }
  const agreesWhereSolvent = (bill: (r: number, v: number) => number): boolean => {
    for (let r = 0; r < 8; r++) for (let v = 0; v <= r; v++) if (bill(r, v) !== r - v) return false
    return true
  }

  assert.equal(neverNegative(clamped), true, 'the honest schedule never charges below zero')
  assert.equal(agreesWhereSolvent(clamped), true, 'and it is exactly recompute − verify wherever that is non-negative')

  // MUTATION — drop the clamp. This is not a hypothetical: it is what the host language does by default.
  assert.equal(neverNegative(raw), false, 'unclamped subtraction must fail — the ledger would pay the verifier')
  assert.equal(agreesWhereSolvent(raw), true, 'the mutation is INVISIBLE while verify ≤ recompute, which is why the walk covers v > r')
  assert.equal(raw(3, 5), -2)
  assert.equal(clamped(3, 5), 0)
})

test('coins_unique_operation_agreement — sweep 0..12 for n+n = n·n = n^n; swapping the tower for a second product must admit zero and lose uniqueness', () => {
  const agreeingAt = (third: (n: number) => number): number[] =>
    from0(13).filter((n) => n + n === n * n && n * n === third(n))

  assert.deepEqual(agreeingAt((n) => n ** n), [2], 'two is the unique point where sum, product and tower coincide')
  assert.equal(2 + 2 === 2 * 2 && 2 * 2 === 2 ** 2, true)
  assert.equal(0 ** 0, 1, 'zero is excluded only because the empty tower is one — the reason matters')
  assert.equal(1 + 1 === 1 * 1, false, 'one fails on the sum')
  assert.equal(3 ** 3 > 3 * 3, true, 'from three up the tower outruns the product')

  // MUTATION — replace exponentiation with a second multiplication. The third algebra stops being independent,
  // zero slips in, and the "unique" claim is false.
  assert.deepEqual(agreeingAt((n) => n * n), [0, 2], 'a duplicated product admits zero')
  assert.notDeepEqual(agreeingAt((n) => n * n), [2], 'so it must fail the uniqueness the theorem seals')
  assert.notDeepEqual(agreeingAt((n) => n + n), [2], 'and a duplicated sum fails the same way')
})

test('coin_and_heart_generate_the_scales — compute the multiplicative group mod 9 and its element orders; {2,4} must fail to generate, and its scales must come out wrong', () => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const units = from0(9).filter((a) => gcd(a, 9) === 1)
  const orderOf = (g: number): number => {
    let k = 1
    let x = g % 9
    while (x !== 1) { x = (x * g) % 9; k++ }
    return k
  }
  const generators = units.filter((g) => orderOf(g) === units.length)

  assert.deepEqual(units, [1, 2, 4, 5, 7, 8], 'the units mod 9')
  assert.equal(units.length, 6, 'a group of order six')
  assert.deepEqual(generators, [2, 5], 'the generators are exactly the coin and the heart — computed, not asserted')

  const scalesFrom = (a: number, b: number): number[] => [a * b, a + b, a ** b]
  assert.deepEqual(scalesFrom(2, 5), [10, 7, 32], 'their three combinations are the three scales')
  assert.equal(new Set(scalesFrom(2, 5)).size, 3, 'and the three are distinct')
  assert.equal(32 * 2, 64, 'the exponential scale doubles to the save')

  // MUTATION — take 4 for the second generator. Its orbit closes early, so it does not generate, and the three
  // scales it mints are not the ones the system is built on.
  assert.equal(orderOf(4), 3, 'four closes at three — it is not a generator')
  assert.equal(generators.includes(4), false, 'so the computed generator set must exclude it')
  assert.notDeepEqual(scalesFrom(2, 4), [10, 7, 32], 'and the wrong generator must fail to mint the scales')
  assert.deepEqual(scalesFrom(2, 4), [8, 6, 16])
})

test('coins_over_all_rosetta_combinations — enumerate all 2^5 anchorings and total the per-leg coins; paying per combination, or over four legs, must miss 160', () => {
  const totalOver = (legs: number, paid: (mask: number, legs: number) => number): number => {
    let sum = 0
    for (let m = 0; m < 1 << legs; m++) sum += paid(m, legs)
    return sum
  }
  const popcount = (m: number, legs: number): number => {
    let c = 0
    for (let b = 0; b < legs; b++) if ((m >> b) & 1) c++
    return c
  }
  const perLegAppearances = (legs: number): number[] =>
    from0(legs).map((b) => {
      let n = 0
      for (let m = 0; m < 1 << legs; m++) if ((m >> b) & 1) n++
      return n
    })
  const twoPerLegPresent = (m: number, legs: number): number => 2 * popcount(m, legs)

  assert.equal(1 << 5, 32, 'five legs, thirty-two anchorings')
  assert.equal(totalOver(5, twoPerLegPresent), 160, 'the coins summed over every anchoring')
  assert.equal(160, 5 * 32, 'the five legs against the thirty-two hexbits')
  assert.deepEqual(perLegAppearances(5), [16, 16, 16, 16, 16], 'each leg in exactly half — as an INDEPENDENT bit must be')

  // MUTATION A — pay per anchoring rather than per leg present. The enumeration still runs; the total is wrong.
  assert.notEqual(totalOver(5, () => 2), 160, 'a flat per-anchoring fee must fail: it totals 64')
  assert.equal(totalOver(5, () => 2), 64)
  // MUTATION B — drop a leg. Both halves of the theorem move together, which is the check that they are one fact.
  assert.notEqual(totalOver(4, twoPerLegPresent), 160, 'four legs must fail the total')
  assert.notDeepEqual(perLegAppearances(4), [16, 16, 16, 16], 'and must fail the half-of-all share')
  // MUTATION C — make one leg dependent (always present). Independence is what forces the 16.
  const forcedFirst = (m: number, legs: number): number => 2 * popcount(m | 1, legs)
  assert.notEqual(totalOver(5, forcedFirst), 160, 'a leg that cannot be absent must fail: it appears in 32, not 16')
  assert.equal(totalOver(5, forcedFirst), 192)
})

test('safe_width_is_thirteen_hexbits — round-trip 2^(4h)−1 through a double for every width to sixteen; admitting fourteen tiles must fail, because fourteen rounds SILENTLY', () => {
  // recompute the property the theorem is actually about: does a whole tile count survive a Number?
  const roundTripsAsDouble = (h: number): boolean => {
    const exact = (1n << BigInt(4 * h)) - 1n
    const asDouble = Number(exact)
    return Number.isSafeInteger(asDouble) && BigInt(asDouble) === exact
  }
  const safeExactlyTo = (pred: (h: number) => boolean, bound: number): boolean =>
    from0(17).every((h) => pred(h) === (h <= bound))

  assert.equal(safeExactlyTo(roundTripsAsDouble, 13), true, 'a tile count is safe exactly when it is at most thirteen')
  assert.equal(13 * 4, 52, 'thirteen tiles is 52 bits — inside the 53 a double carries')
  assert.equal(14 * 4, 56, 'fourteen is 56 — outside it')
  assert.equal(roundTripsAsDouble(13), true)
  assert.equal(roundTripsAsDouble(14), false)

  // THE FAILURE A LEDGER CANNOT NOTICE: at fourteen tiles two distinct integers become the same double, and the
  // wrong number arrives looking like a right one. No exception, no NaN — just a silent collapse.
  assert.equal(Number(2n ** 56n - 1n), Number(2n ** 56n), 'at 56 bits two different values collapse to one double')
  assert.notEqual(Number(2n ** 52n - 1n), Number(2n ** 52n), 'at 52 bits they still differ')

  // MUTATION — take the bound to be fourteen, which is what "4h ≤ 56" would allow. The same walk rejects it.
  assert.equal(safeExactlyTo(roundTripsAsDouble, 14), false, 'a bound of fourteen must fail the walk')
  assert.equal(safeExactlyTo((h) => 4 * h <= 56, 13), false, 'and a predicate that admits 56 bits must fail it too')
})

test('discovery_buys_coverage_never_supply — vary coverage against a supply that must not move; a supply tied to coverage must flatten the rate', () => {
  const rate = (coverage: number, supply: number): number => trunc(coverage / supply)
  // the property: doubling what a theorem COVERS raises the rate, while what it COSTS stays put
  const risesWithCoverageAlone = (supplyOf: (coverage: number) => number): boolean =>
    upTo(8).every((n) => rate(n * 64, supplyOf(n * 64)) > rate(n * 32, supplyOf(n * 32)))
  const denominatorNeverMoves = (supplyOf: (coverage: number) => number): boolean =>
    upTo(8).every((n) => supplyOf(n * 64) === supplyOf(n * 32) && supplyOf(n * 32) === 2)

  const fixedPrice = (): number => 2
  assert.equal(risesWithCoverageAlone(fixedPrice), true, 'a wider theorem returns more per coin')
  assert.equal(denominatorNeverMoves(fixedPrice), true, 'and the coin still costs two')
  assert.equal(upTo(8).every((n) => 2 * n === n + n), true, 'supply is strictly linear in the ledger')

  // MUTATION — let the supply scale with coverage, the way a proof-of-work mint would. The rate goes flat: a
  // wider theorem buys nothing, which is precisely the claim the theorem denies.
  const supplyTiedToCoverage = (coverage: number): number => coverage / 16
  assert.equal(risesWithCoverageAlone(supplyTiedToCoverage), false, 'a supply tied to coverage must fail: the rate stops rising')
  assert.equal(denominatorNeverMoves(supplyTiedToCoverage), false, 'and the denominator must fail to hold still')
  assert.equal(rate(64, supplyTiedToCoverage(64)), rate(32, supplyTiedToCoverage(32)), 'both report 16 — no gain from a wider proof')

  // THE CEILING IS THE MACHINE'S, NOT DISCOVERY'S — and it is demonstrable rather than asserted.
  assert.equal(2 ** 53 + 1, 2 ** 53, 'above 2^53 the exact count stops incrementing')
  assert.notEqual(2 ** 52 + 1, 2 ** 52, 'below it, it still does')
})

test('heartbeat_share_resolves_at_four_hexbits — sweep the powers of sixteen for the first that gives the cheapest theorem a non-zero share; the third power, and ten thousand, must both lose it', () => {
  const CHEAPEST = 13
  const LEDGER = 579272
  const share = (cost: number, base: number): number => trunc((cost * base) / LEDGER)
  const resolves = (base: number): boolean => share(CHEAPEST, base) >= 1

  // recompute the sweep rather than restate its answer
  let k = 0
  while (!resolves(16 ** k) && k < 12) k++
  assert.equal(k, 4, 'the smallest power of sixteen that resolves the cheapest theorem is the fourth')
  assert.equal(16 ** 4, 65536)
  assert.equal(share(CHEAPEST, 65536), 1, 'four hexbits resolve it to one part')
  assert.equal(share(LEDGER, 65536), 65536, 'and the whole ledger takes the whole base — the share is a share')

  // MUTATION A — the borrowed base. Finance's ten thousand reports the cheapest theorem as costing nothing.
  assert.equal(resolves(10000), false, "a borrowed base must fail: the share is not floored, it is LOST")
  assert.equal(share(CHEAPEST, 10000), 0)
  // MUTATION B — one hexbit short. The third power still loses it, which is why the answer is four and not three.
  assert.equal(resolves(16 ** 3), false, 'the third power must fail')
  assert.equal(share(CHEAPEST, 4096), 0)
  assert.notEqual(k, 3)
})

test('hexbit_bit_hook_is_linear — expand real hex strings to bit strings and invert; a hook that pads to three, or offsets by one, must fail the round trip', () => {
  // recompute the hook by actually widening characters into bits, not by multiplying by four
  // `padTo` is the claimed bit-width of one hexbit: pad short readings up to it and cut long ones down to it,
  // so a mutated width really is that width rather than whatever the digit happened to need.
  const expand = (hex: string, padTo: number): string =>
    [...hex].map((c) => parseInt(c, 16).toString(2).padStart(padTo, '0').slice(-padTo)).join('')
  const hexOfWidth = (h: number): string => 'a3f0'.repeat(9).slice(0, h)

  const hook = (padTo: number) => (h: number): number => expand(hexOfWidth(h), padTo).length
  const roundTrips = (padTo: number): boolean =>
    from0(33).every((h) => {
      const bits = hook(padTo)(h)
      return bits % 4 === 0 && bits / 4 === h
    })
  const strictlyIncreasing = (padTo: number): boolean =>
    from0(32).every((h) => hook(padTo)(h) < hook(padTo)(h + 1))

  assert.equal(roundTrips(4), true, 'a hexbit is four bits exactly — (4h)/4 = h with no remainder anywhere')
  assert.equal(strictlyIncreasing(4), true, 'and the order in hexbits is the order in bits')
  assert.equal(hook(4)(32), 128, '32 hexbits IS 128 bits, not an approximation of it')
  assert.equal(hook(4)(8), 32, 'and 8 hexbits IS 32 bits')

  // MUTATION A — a lossy hook. Pad to three and the round trip stops returning the width it was given.
  assert.equal(roundTrips(3), false, 'a three-bit hexbit must fail the round trip')
  assert.equal(hook(3)(8), 24, 'it reports 24 bits for a handle, so the two readings could not both be true')
  // MUTATION B — an offset hook, linear but not a multiple. The remainder is non-zero, so nothing inverts cleanly.
  const offset = (h: number): number => 4 * h + 1
  assert.equal(from0(33).every((h) => offset(h) % 4 === 0 && offset(h) / 4 === h), false, 'an offset hook must fail')
  // MUTATION C — a wrapping hook, which round-trips nowhere and is not even monotone.
  const wrapping = (h: number): number => 4 * (h % 8)
  assert.equal(from0(32).every((h) => wrapping(h) < wrapping(h + 1)), false, 'a wrapping hook must fail monotonicity')
})

test('handle_carries_hexbits_and_coins — cut a real 32-hexbit identity into handles and reassemble it; any width but eight must fail to cover it evenly', () => {
  const cut = (s: string, width: number): string[] => {
    const out: string[] = []
    for (let i = 0; i < s.length; i += width) out.push(s.slice(i, i + width))
    return out
  }
  const coversEvenly = (width: number): boolean => {
    const parts = cut(UUID, width)
    return parts.join('') === UUID && parts.every((p) => p.length === width) && parts.length === 32 / width
  }

  assert.equal(UUID.length, 32, 'the identity is 32 hexbits')
  assert.equal(coversEvenly(8), true, 'four handles of eight cover it exactly')
  assert.equal(cut(UUID, 8).length, 4, 'so a handle is a QUARTER of an identity: 128/32 = 4 to the whole')
  assert.equal(8 * 4, 32, 'eight hexbits is 32 bits')
  assert.equal(cut(UUID, 8).length * 8 * 4, 128, 'and the four handles carry the full 128')

  // the commission divides the handle into its own unit: 8 hexbits over the two coins is 4, the width of a hexbit
  const perCoin = (coinCount: number): number => 8 / coinCount
  assert.equal(perCoin(2), 4, 'eight hexbits over the two coins is four — the bit-width of a hexbit itself')

  // MUTATION A — any other handle width. The last piece is short, so the cover is not even.
  assert.equal(coversEvenly(7), false, 'seven must fail: five pieces, the last of them four wide')
  assert.equal(coversEvenly(6), false, 'six must fail: the identity does not divide by six')
  const ragged = cut(UUID, 7)
  assert.equal(ragged[ragged.length - 1].length, 4, 'the mutated cut leaves a ragged tail')
  // MUTATION B — any other commission. The handle stops dividing into the hexbit's own unit.
  assert.notEqual(perCoin(3), 4, 'three coins must fail: 8/3 is not the width of a hexbit')
  assert.notEqual(perCoin(4), 4, 'four coins must fail too')
})

test('fold_reads_by_handle_not_by_tile — both readings partition the same identity; a handle width that does not divide 32 must fail to cover it, and the read-count ratio must move', () => {
  const readsOf = (unit: number): string[] => {
    const out: string[] = []
    for (let i = 0; i < UUID.length; i += unit) out.push(UUID.slice(i, i + unit))
    return out
  }
  const coversExactly = (unit: number): boolean => {
    const r = readsOf(unit)
    return r.join('') === UUID && r.every((p) => p.length === unit)
  }

  assert.equal(coversExactly(1), true, 'reading tile by tile covers the uuid')
  assert.equal(coversExactly(8), true, 'reading handle by handle covers the same uuid — this is never about correctness')
  assert.equal(readsOf(1).length, 32, '32 tiles')
  assert.equal(readsOf(8).length, 4, '4 handles')
  assert.equal(readsOf(1).length / readsOf(8).length, 8, '32/4 = 8 fewer reads for the same 128 bits')
  assert.equal(readsOf(8).length * 8, 32, '4·8 = 32 hexbits')
  assert.equal(readsOf(8).length * 32, 128, '4·32 = 128 bits')

  // MUTATION A — a handle width that does not divide the identity. The partition breaks.
  assert.equal(coversExactly(5), false, 'a five-wide handle must fail to cover the uuid')
  assert.equal(coversExactly(12), false, 'and so must a twelve-wide one')
  // MUTATION B — claim the smaller unit is the cheaper reading by count. It is the opposite: eight times MORE reads.
  assert.equal(readsOf(1).length > readsOf(8).length, true, 'the tile reading takes strictly more reads')
  assert.notEqual(readsOf(1).length / readsOf(8).length, 1, 'so a claim that the two cost the same number of reads must fail')
})

test('captain_singularity — factor every quantity in the ladder and search for a second origin; a quantity with any odd factor, or an anchor of three, must fail', () => {
  const stripTwos = (n: number): number => {
    let m = n
    while (m % 2 === 0) m /= 2
    return m
  }
  // two is the ONLY prime left standing after the twos are stripped away (1 remains, i.e. nothing else divides it)
  const solePrimeIsTwo = (n: number): boolean => n >= 1 && stripTwos(n) === 1
  const oneLadder = (chain: number[]): boolean => chain.every(solePrimeIsTwo)
  // and: is there any anchor other than 2 that reaches 128 by pure doubling?
  const anchorsReaching128 = from0(200).filter((a) => {
    for (let k = 0; k < 12; k++) if (a * 2 ** k === 128) return true
    return false
  })

  assert.equal(oneLadder([2, 4, 32, 64, 128]), true, 'the whole chain 2 → 4 → 32 → 64 → 128 divides back to two and nothing else')
  assert.equal(128 / 64, 2)
  assert.equal(64 / 32, 2)
  assert.equal(4 / 2, 2)
  assert.equal(2 * 2 ** 6, 128, 'the uuid is the coins doubled six times')
  assert.equal(128 / 2, 64, 'the leverage is the uuid over the coins')
  assert.equal(32 * 4, 128, 'and the walked ledger returns the uuid again from 32 superpositions per coin')
  assert.deepEqual(anchorsReaching128, [1, 2, 4, 8, 16, 32, 64, 128], 'only powers of two reach the uuid by doubling')
  assert.equal(anchorsReaching128.every(solePrimeIsTwo), true, 'so every anchor has two as its only prime factor — there is no second origin')

  // MUTATION A — smuggle a quantity with another prime into the ladder. There would then be a second origin.
  assert.equal(oneLadder([2, 4, 32, 64, 96, 128]), false, '96 = 2^5·3 must fail: three is a second origin')
  assert.equal(stripTwos(96), 3)
  assert.equal(oneLadder([2, 4, 32, 54, 128]), false, '54 must fail as well')
  // MUTATION B — anchor the ladder somewhere other than the commission.
  assert.equal(anchorsReaching128.includes(3), false, 'three must fail: no doubling of it lands on the uuid')
  assert.equal(anchorsReaching128.includes(2), true, 'the commission does')
})

test('minting_is_free_and_forging_is_not — recompute the verify/forge ratio at full width in BigInt; a polynomial forge, or a mint that charges, must fail the asymmetry', () => {
  const verifyCost = (width: number): bigint => BigInt(width)          // read the address
  const forgeCost = (width: number): bigint => 1n << BigInt(width)     // search it
  const ratioAt = (forge: (w: number) => bigint, width: number): bigint => forge(width) / verifyCost(width)

  assert.equal(ratioAt(forgeCost, 128), 1n << 121n, '2^128 forgeries per 128-bit read — the ratio is 2^121')
  assert.equal(1n << 7n, 128n, 'and the width is the same 2^7 the captain theorem seals')
  assert.equal(32 * 4, 128, '32 hexbits')
  assert.equal(verifyCost(16) < forgeCost(16), true, 'the shape already held at demonstration width: 16 < 2^16')
  assert.equal(verifyCost(128) < forgeCost(128), true)
  // the asymmetry is the WIDTH, not a policy — it cannot be tuned down while the width stands
  assert.equal([16, 32, 64, 128].every((w) => ratioAt(forgeCost, w) > 1n), true)

  // MUTATION A — a forge that is merely polynomial in the width. It is still more than a read, and still fails.
  const polynomial = (w: number): bigint => BigInt(w) ** 2n
  assert.equal(polynomial(128) > verifyCost(128), true, 'a squared forge does cost more than a read')
  assert.notEqual(ratioAt(polynomial, 128), 1n << 121n, 'but it must fail the ratio — the asymmetry would be tunable')
  assert.equal(ratioAt(polynomial, 128), 128n)
  // MUTATION B — a forge searching only half the address. Exponential, and still not the sealed ratio.
  const halfWidth = (w: number): bigint => 1n << BigInt(w / 2)
  assert.notEqual(ratioAt(halfWidth, 128), 1n << 121n, 'half the width must fail: 2^57 is not 2^121')

  // MUTATION C — minting that charges. The cost of a coin must not grow with the ledger, or the coin becomes a
  // receipt for burned work rather than a record of a settled proposition.
  const mintCost = (ledgerSize: number): number => ledgerSize * 0 // no search, however large the ledger already is
  const growingMint = (ledgerSize: number): number => ledgerSize
  const mintIsFlat = (mint: (n: number) => number): boolean => upTo(8).every((n) => mint(n) === mint(1))
  assert.equal(mintIsFlat(mintCost), true, 'no search is run to bring a coin into existence')
  assert.equal(mintIsFlat(growingMint), false, 'a mint that charges must fail: that is the inverted cost model, uninverted')
})

test('fold_compresses_without_bound_and_never_recovers — a real fixed-width fold walked for a pigeonhole collision; a lossless growing fold must fail BOTH halves', () => {
  // a fold: fixed 128-bit root however much goes in
  const foldFixed = (items: string[]): string => {
    let h = 0n
    for (const s of items) for (const ch of s) h = (h * 1000003n + BigInt(ch.charCodeAt(0))) % (1n << 128n)
    return h.toString(16).padStart(32, '0')
  }
  // the mutation: a "fold" that is really a join — lossless, invertible, and unbounded in width
  const foldGrowing = (items: string[]): string => items.join('|')

  const inputs = (k: number): string[] => Array.from({ length: k }, (_, i) => 'address-' + i)
  const rootIsFixedWidth = (fold: (items: string[]) => string): boolean =>
    upTo(8).every((k) => fold(inputs(k)).length === 32)

  // the pigeonhole, at a width small enough to walk exhaustively: 2^8 + 1 distinct inputs into 2^8 outputs
  const narrow = (s: string): string => {
    let h = 0n
    for (const ch of s) h = (h * 1000003n + BigInt(ch.charCodeAt(0))) % 256n
    return h.toString(16)
  }
  const identityNarrow = (s: string): string => s
  const collidesWithin257 = (f: (s: string) => string): boolean => {
    const seen = new Map<string, number>()
    for (let i = 0; i <= 256; i++) {
      const out = f('key-' + i)
      if (seen.has(out)) return true
      seen.set(out, i)
    }
    return false
  }

  assert.equal(rootIsFixedWidth(foldFixed), true, 'the root is 32 hexbits whether four go in or four million')
  assert.equal(32 * 4, 128, 'which is 128 bits')
  assert.equal(upTo(8).every((k) => (128 * k) / k === 128), true, 'so the ratio of input to root grows without limit')
  assert.equal(collidesWithin257(narrow), true, 'more inputs than outputs FORCES a collision — so no fold inverts')
  assert.equal(2n ** 129n, 2n * 2n ** 128n, '2^129 inputs into 2^128 outputs')
  assert.equal(2n ** 129n > 2n ** 128n, true, 'strictly more, which is the whole of the argument')

  // MUTATION — a lossless fold. It fails the fixed width, and — being invertible — it fails the pigeonhole too,
  // which is exactly the pairing the theorem refuses to let anyone have: unbounded ratio AND recovery.
  assert.equal(rootIsFixedWidth(foldGrowing), false, 'a lossless fold must fail the fixed root width')
  assert.equal(collidesWithin257(identityNarrow), false, 'and an invertible map must fail to collide')
  assert.equal(foldGrowing(inputs(4)).length > 32, true, 'its output grows with its input, which is why it can be undone')
  assert.equal(foldFixed(inputs(4)), foldFixed(inputs(4)), 'the honest fold IDENTIFIES: same bytes, same root, forever')
  assert.notEqual(foldFixed(inputs(4)), foldFixed(inputs(5)), 'and it distinguishes what it can')
})
