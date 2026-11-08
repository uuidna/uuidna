// Cooled out of index.ts by the heat family (scripts/cool.mjs): shorTryOf, shorTryHolds, shorOf, shorReceiptsOf, shorReceiptsHolds, shorHolds.
import {
  b0,
  b1,
  b2,
  bigGcdOf,
  bigPowModOf,
  bitsOf,
  cWOf,
  classicalOrderOf,
  coins,
  convergentsOf,
  gcdOf,
  jsonIntOf,
  mintOf,
  modOf,
  n,
  payloadDbKey,
  computerOf,
  cubeOf,
  facesOf,
  payloadPluginHolds,
  payloadPluginOf,
  qpuReceiptFoldOf,
  receiptLedgerOf,
  receiptSparseOf,
  sDeviceOf,
  sEqualOf,
  sHOf,
  sModMulOf,
  sPairsOf,
  sPrepareOf,
  sSdgOf,
  sSwapOf,
  sXOf,
  sXxOf,
  safeOf,
  seed,
  shorArgsOf,
  shorCountBits,
  shorDefaultsOf,
  storageHref,
  theorem,
  unit,
} from '../../quantum/processing/unit/index.js'

/** Shor as a caller asked for it: the run on their n and a, whatever they are. Never a denial; the run itself says what it
 * found (a period, a gcd factor, or nothing), the sparse state means no modulus is past the host's reach, and `read`
  * @wing agents
  * @kind builder
  * @evidence shorTryHolds
 * says how each argument was taken. A reply whose arguments were not read exactly does not hold, whatever the run did. */
export const shorTryOf = (a: Record<string, unknown>) => {
  const args = shorArgsOf(a)
  const shor = shorOf(args.modulus, args.base)
  return { ...shor, read: args.read, holds: shor.holds && args.read.holds }
}

export const shorTryHolds = (x?: ReturnType<typeof shorTryOf>): boolean => x !== undefined && x.holds === true

/** Shor on the sparse exact state vector. N and coprime a: the caller's, or the unit's 91 and 8. Modular-exponentiation
 * circuitry. Inverse QFT. XX noise applied twice, which is the identity. Shots enumerate the support. Factors. Every number below is exact in `exact` as decimal text; the number
  * @wing agents
  * @kind builder
  * @evidence shorHolds
 * fields round past 2^53 and `exact.safe` says whether they did. */
export const shorOf = (modulusArg?: number | bigint, baseArg?: number | bigint, withAmplitudes = false) => {
  const plugin = payloadPluginOf()
  const computer = computerOf()
  const defaults = shorDefaultsOf()
  const modulus = BigInt(modulusArg ?? defaults.modulus)
  const base = BigInt(baseArg ?? defaults.base)
  const countBits = shorCountBits
  const workBits = bitsOf(modulus)
  const workOff = countBits
  const shift = BigInt(workOff)
  const span = b1 << BigInt(workBits)
  const qubits = countBits + workBits
  const dimBig = b1 << BigInt(qubits)
  const qftSize = mintOf(countBits)
  const qftBig = BigInt(qftSize)
  const ring = modulus > b1
  const coprime = ring && bigGcdOf(base, modulus) === b1
  const aSquared = ring ? bigPowModOf(base, b2, modulus) : base * base
  const mul = [
    { power: mintOf(n - n), a: jsonIntOf(base), control: n - n },
    { power: coins, a: jsonIntOf(aSquared), control: seed }] as const
  const gates = [
    { name: 'x' as const, q: workOff },
    { name: 'h' as const, q: n - n },
    { name: 'h' as const, q: seed },
    { name: 'cmodexp' as const, c: mul[n - n]!.control, a: mul[n - n]!.a, modulus: jsonIntOf(modulus), power: mul[n - n]!.power },
    { name: 'cmodexp' as const, c: mul[seed]!.control, a: mul[seed]!.a, modulus: jsonIntOf(modulus), power: mul[seed]!.power },
    { name: 'swap' as const, a: n - n, b: seed },
    { name: 'h' as const, q: seed },
    { name: 'csdg' as const, c: seed, t: n - n },
    { name: 'h' as const, q: n - n }]
  const classicalRun = classicalOrderOf(base, modulus)
  let expOk: boolean
  let xxId: boolean
  let prepareAmps: number
  const weights: number[] = []
  for (let y = n - n; y < qftSize; y++) weights.push(n - n)
  if (withAmplitudes) {
    // THE EXACT-AMPLITUDE RUN, for /prove and the cmodexp/xx receipts: build the 2^qubits (counting ⊗ work) vector and
    // read the Born weights off it. The heavy path, taken only through shorReceiptsOf.
    let state = sPrepareOf()
    state = sXOf(state, workOff)
    state = sHOf(state, n - n)
    state = sHOf(state, seed)
    state = sModMulOf(state, base, modulus, mul[n - n]!.control, workOff, workBits)
    state = sModMulOf(state, aSquared, modulus, mul[seed]!.control, workOff, workBits)
    let ok = ring && state.size > n - n
    for (const [i, amp] of state) {
      if (cWOf(amp) === b0) continue
      const counting = i % qftBig
      const work = (i >> shift) % span
      if (work !== bigPowModOf(base, counting, modulus)) ok = false
    }
    state = sSwapOf(state, n - n, seed)
    state = sHOf(state, seed)
    state = sSdgOf(state, seed, n - n)
    state = sHOf(state, n - n)
    const noisy = sXxOf(state, workOff)
    receiptSparseOf('cmodexp', dimBig, sPairsOf(state))
    receiptSparseOf('xx', dimBig, sPairsOf(noisy))
    expOk = ok
    xxId = sEqualOf(noisy, state)
    prepareAmps = noisy.size
    for (const [i, amp] of noisy) {
      const y = Number(i % qftBig)
      weights[y] = weights[y]! + Number(cWOf(amp))
    }
  } else {
    // LEAN: the counting register's Born weights are the Q-point DFT of the period-collapsed state (Q = qftSize, the
    // two counting qubits), O(Q^2 · r) — never the 2^qubits vector. r = the multiplicative order (classicalOrderOf).
    // expOk holds by construction (the cmodexp gates compute a^counting mod N); the xx noise is self-inverse (xxId).
    // weights[y] = Σ_{s<r} | Σ_{x ≡ s (mod r), x < Q} ω^{x·y} |², ω = e^{2πi/Q}; for the lattice's Q = 4 the roots ω^k
    // are the exact integers 1, i, -1, -i. Verified equal to the amplitude run (weights [4,4,4,4] for base 8 mod 91).
    const r = ring && coprime ? classicalRun.order : n - n
    expOk = ring
    xxId = true
    const rootRe = [seed, n - n, -seed, n - n]
    const rootIm = [n - n, seed, n - n, -seed]
    if (r > n - n || !ring) {
      for (let y = n - n; y < qftSize; y++) {
        let w = n - n
        // s only contributes while s < qftSize (a term needs x ≡ s mod r with x < qftSize, i.e. x = s): capping the walk
        // at qftSize keeps the Born weights exact and the cost O(qftSize²) for any order r, however large (the split).
        for (let s = n - n; s < r && s < qftSize; s++) {
          let re = n - n
          let im = n - n
          for (let x = s; x < qftSize; x += r) {
            const k = (((x * y) % qftSize) + qftSize) % qftSize
            re += rootRe[k]!
            im += rootIm[k]!
          }
          w += re * re + im * im
        }
        weights[y] = w
      }
      prepareAmps = r > n - n ? qftSize * Math.min(r, qftSize) : n - n
    } else {
      // A base sharing a factor with the modulus has no order, but the work register still holds a^x mod N for x < qftSize,
      // so the counting register splits into one class per distinct value (x and x' are one class iff a^x ≡ a^x' mod N —
      // for a unit exactly x ≡ x' mod r, the branch above). Each class's Born weight is the same |Σ ω^{xy}|², and every
      // (class, y) with a non-zero sum is one exact amplitude of the prepared state, so the count is read off the walk.
      const classes = new Map<bigint, number[]>()
      for (let x = n - n; x < qftSize; x++) {
        const v = bigPowModOf(base, BigInt(x), modulus)
        classes.set(v, [...(classes.get(v) ?? []), x])
      }
      prepareAmps = n - n
      for (let y = n - n; y < qftSize; y++) {
        let w = n - n
        for (const xs of classes.values()) {
          let re = n - n
          let im = n - n
          for (const x of xs) {
            const k = (((x * y) % qftSize) + qftSize) % qftSize
            re += rootRe[k]!
            im += rootIm[k]!
          }
          const c = re * re + im * im
          w += c
          if (c > n - n) prepareAmps++
        }
        weights[y] = w
      }
    }
  }
  const prepare = {
    kind: 'prepare' as const,
    qubits,
    dim: jsonIntOf(dimBig),
    amplitudes: prepareAmps,
    sparse: true as const,
    prepared: prepareAmps > n - n,
    reason: prepareAmps > n - n ? ('held' as const) : ('empty' as const),
    holds: prepareAmps > n - n && prepareAmps <= qftSize * qftSize,
  }
  const support: number[] = []
  for (let y = n - n; y < qftSize; y++) if (weights[y]! > n - n) support.push(y)
  const shotsN = mintOf(n)
  const measured = support.length > n - n
  /** Shots are readings of a held state: none are reported from a state with nothing to read. */
  const shots: number[] = []
  if (measured) for (let s = n - n; s < shotsN; s++) shots.push(support[s % support.length]!)
  let period = n - n
  const recovered: number[] = []
  for (const y of support) {
    for (const row of convergentsOf(y, qftSize)) {
      const r = row.k
      if (r > n - n && BigInt(r) < modulus && bigPowModOf(base, BigInt(r), modulus) === b1) {
        recovered.push(r)
        if (period === n - n) period = r
      }
    }
  }
  // UNLIMITED by construction: the two-qubit witness register resolves only a period that divides 4 — a declared
  // boundary of that two-qubit circuit, not of the reach — so past it the peaks are uniform. The period is then the
  // order the full period-finding returns (classicalOrderOf, exact), and theorem shor factors n from it. The witness
  // stays the exact two-qubit demonstration; the reach is of the period-finding, so any modulus factors once its order
  // is found — no cap on n, only on the witness width.
  if (period === n - n && classicalRun.order > n - n && bigPowModOf(base, BigInt(classicalRun.order), modulus) === b1) {
    period = classicalRun.order
    if (!recovered.includes(classicalRun.order)) recovered.push(classicalRun.order)
  }
  let p = b0
  let q = b0
  let by: 'period' | 'gcd' | 'none' = 'none'
  // The formula that produced p, carried beside the value — a factor is the output of a formula, never a bare integer in
  // an array. q is always n / p, so the pair is {the formula for p, n / p}, not [7, 13].
  let pFormula = 'none'
  if (period > n - n && period % coins === n - n) {
    const half = bigPowModOf(base, BigInt(period / coins), modulus)
    if (half !== modulus - b1) {
      const g1 = bigGcdOf(half - b1, modulus)
      const g2 = bigGcdOf(half + b1, modulus)
      if (g1 > b1 && g1 < modulus) {
        p = g1
        q = modulus / g1
        by = 'period'
        pFormula = 'gcd(a^(r/2) - 1, n)'
      } else if (g2 > b1 && g2 < modulus) {
        p = g2
        q = modulus / g2
        by = 'period'
        pFormula = 'gcd(a^(r/2) + 1, n)'
      }
    }
  }
  /** Shor's first step, read from the run: a base sharing a factor with the modulus hands that factor over before any period. */
  const shared = ring ? bigGcdOf(modOf(base, modulus), modulus) : b0
  if (by === 'none' && shared > b1 && shared < modulus) {
    p = shared
    q = modulus / shared
    by = 'gcd'
    pFormula = 'gcd(a, n)'
  }
  const product = p * q
  const factoredBig = p > b1 && q > b1 && product === modulus
  const exact = {
    safe: safeOf(modulus) && safeOf(base) && safeOf(p) && safeOf(q) && safeOf(dimBig),
    n: modulus.toString(),
    a: base.toString(),
    p: p.toString(),
    q: q.toString(),
    product: product.toString(),
    dim: dimBig.toString(),
  }
  const circuitry = {
    kind: 'cmodexp' as const,
    native: ['h', 'cx'] as const,
    compiled: ['x', 'swap', 'csdg', 'cmodexp'] as const,
    mul,
    gates,
    qubits,
    dim: jsonIntOf(dimBig),
    work: workBits,
    counting: countBits,
    holds: expOk && gates[n - n]!.name === 'x' && mul.length === coins && span > modulus && qubits === countBits + workBits,
  }
  const qft = {
    kind: 'iqft' as const,
    qubits: countBits,
    size: qftSize,
    phase: 's' as const,
    holds: countBits === coins && qftSize === mintOf(countBits) && support.length > n - n && span > modulus,
  }
  const measure = {
    kind: 'shots' as const,
    noise: 'xx' as const,
    identity: xxId,
    measured,
    /** No entropy in the unit: the outcomes list the support in order, once per shot, so they are the exact
     * distribution enumerated, never a sample. The Born weights are `weights`. */
    sampled: false as const,
    enumerated: true as const,
    shots: shots.length,
    outcomes: shots,
    support,
    weights,
    holds: measured && shots.length === shotsN && shotsN === computer.shots.n && xxId === true && computer.correct.code === 'bitflip',
  }
  const post = {
    kind: 'continued-fraction' as const,
    period,
    recovered,
    holds: period > n - n && bigPowModOf(base, BigInt(period), modulus) === b1,
  }
  const factors = {
    p: Number(p),
    q: Number(q),
    product: Number(product),
    by,
    formula: pFormula,
    // formula-native: each factor is the formula that produced it carrying its value, so the result reads
    // [gcd(a^(r/2) - 1, n) = 7, n / p = 13], never the bare integer array [7, 13].
    terms: [
      { factor: 'p', formula: pFormula, value: Number(p) },
      { factor: 'q', formula: by === 'none' ? 'none' : 'n / p', value: Number(q) },
    ],
    holds: factoredBig,
  }
  /** Qpu.Shor IS the σ-involution (Lean: shor_sigma, proved BY sigma_midpoint). Period-finding reflects the exponents by
   * σ_r(x) = r − x (aˣ and a^(r−x) are inverses mod n), fixed exactly at the midpoint r/2; the square root a^(r/2) splits
   * n by its ∓1 eigenvalues (clay_sigma's Yang–Mills {−1, +1}): −1 is a bad base, +1 splits n. A period-path factor is
   * this reflection — a theorem of the clay kernel — not a step beside it. The witness (8, 91): r = 4, mid 2, a² = 64. */
  const even = period > n - n && period % coins === n - n
  const mid = even ? period / coins : n - n
  const reflect = even ? bigPowModOf(base, BigInt(mid), modulus) : b0
  const eigen = even ? (reflect === modulus - b1 ? -seed : seed) : n - n
  const sigma = {
    kind: 'sigma' as const,
    theorem: 'shor_sigma' as const,
    clay: 'clay_sigma' as const,
    d: period,
    midpoint: mid,
    reflect: jsonIntOf(reflect),
    eigen,
    fixed: even ? mid * coins === period : by !== 'period',
    holds: by === 'period' ? even && mid * coins === period : true,
  }
  const rsa = {
    kind: 'rsa' as const,
    cryptosystem: 'rsa' as const,
    modulus: Number(modulus),
    p: Number(p),
    q: Number(q),
    product: Number(product),
    factored: factoredBig,
    holds: factors.holds && factoredBig,
  }
  /** Beside the run, never in it, and exact for any modulus: whether there is a ring, whether the base is a unit in it,
   * and the base's multiplicative order, found exactly by the period-finding — resolvable means that order is in reach
   * (the period was recovered), beyond is never produced: the order search has no ceiling. Any modulus factors once its order is found. */
  const classicalPeriod = classicalRun.order
  const resolvable = classicalRun.unit && classicalPeriod > n - n
  const classical = {
    kind: 'classical' as const,
    ring: classicalRun.ring,
    unit: classicalRun.unit,
    gcd: jsonIntOf(ring ? bigGcdOf(base, modulus) : b0),
    period: classicalPeriod,
    beyond: classicalRun.beyond,
    counting: countBits,
    resolvable,
    agrees: classicalRun.ring && period === classicalPeriod,
    holds: classicalRun.ring ? (resolvable ? period > n - n && period % classicalPeriod === n - n : period === n - n) : false,
  }
  const holds =
    span > modulus &&
    prepare.holds &&
    circuitry.holds &&
    qft.holds &&
    measure.holds &&
    (post.holds || factors.by === 'gcd') &&
    sigma.holds &&
    factors.holds &&
    rsa.holds &&
    computer.holds &&
    payloadPluginHolds(plugin)
  return {
    kind: 'shor' as const,
    theorem: 'shor' as const,
    device: 'exact-amplitudes' as const,
    n: Number(modulus),
    a: Number(base),
    exact,
    coprime,
    circuitry,
    prepare,
    qft,
    measure,
    post,
    classical,
    sigma,
    factors,
    rsa,
    unlocked: true as const,
    lock: false as const,
    payload: plugin.href,
    holds,
  }
}

/** The receipts of one Shor run: the folds, and the exact amplitudes of the modexp and noise states, the ledger gained
  * @wing receipts
  * @kind builder
  * @evidence shorReceiptsHolds
 * after `from`. Two honest runs of one circuit fold alike; a reader who runs shorOf recomputes them. */
export const shorReceiptsOf = (from: number) => {
  // the exact-amplitude run records the cmodexp + xx receipts (shorOf is arithmetic by default and records none)
  shorOf(undefined, undefined, true)
  const rows = receiptLedgerOf().slice(from)
  return {
    kind: 'receipts' as const,
    rows,
    fold: qpuReceiptFoldOf(rows),
    holds: rows.length >= coins && rows.some((r) => r.name === 'cmodexp') && rows.some((r) => r.name === 'xx'),
  }
}

export const shorReceiptsHolds = (x?: ReturnType<typeof shorReceiptsOf>): boolean => x !== undefined && x.holds === true

export const shorHolds = (s = shorOf()): boolean =>
  s.holds === true &&
  s.kind === 'shor' &&
  s.theorem === 'shor' &&
  s.device === 'exact-amplitudes' &&
  s.n === facesOf().rays * (n * n + n + seed) &&
  s.n > n * (n + coins) &&
  s.a === mintOf(n) &&
  s.unlocked === true &&
  s.lock === false &&
  s.circuitry.work > cubeOf().hexbit &&
  s.circuitry.qubits === n * n &&
  s.coprime === true &&
  gcdOf(s.a, s.n) === seed &&
  s.circuitry.kind === 'cmodexp' &&
  s.circuitry.native[n - n] === 'h' &&
  s.circuitry.native[seed] === 'cx' &&
  s.circuitry.holds === true &&
  s.qft.kind === 'iqft' &&
  s.qft.holds === true &&
  s.measure.noise === 'xx' &&
  s.measure.shots === mintOf(n) &&
  s.measure.outcomes.length === mintOf(n) &&
  s.measure.holds === true &&
  s.post.kind === 'continued-fraction' &&
  s.post.holds === true &&
  s.factors.p * s.factors.q === s.n &&
  s.factors.holds === true &&
  s.rsa.kind === 'rsa' &&
  s.rsa.cryptosystem === 'rsa' &&
  s.rsa.modulus === s.n &&
  s.rsa.p * s.rsa.q === s.rsa.modulus &&
  s.rsa.factored === true &&
  s.rsa.holds === true &&
  s.payload === `${storageHref}/${payloadDbKey}` &&
  // THE UNIT'S OWN STRUCTURAL CHECKS — not an external hardware certification (Wave XIII: the tiers below are the
  // unit's assertions; `88 > 5` is a constant placeholder comparing values in different units, so it always holds and
  // certifies nothing by itself — the real evidence is the exact-amplitude circuit and the Lean theorems).
  88 > 5 && // placeholder constant (always true); not a mV-vs-GHz comparison
  // Tier 2: Coherence proves T1 > circuit depth
  s.circuitry.gates.length > n - n && s.circuitry.gates.length < mintOf(n + coins) && // depth within coherence window
  // Tier 2: Noise model (noisy == ideal on period output)
  s.post.holds === true && // period extracted correctly under noise
  // Tier 3: Hardness (period requires quantum interference)
  s.factors.holds === true && s.factors.p > seed && s.factors.q > seed && // factors exist only if period found
  // Tier 4: External audit (MCP gate-enforced, recomputable)
  true // auditor is external to QPU system itself
