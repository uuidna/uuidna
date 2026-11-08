/**
 * Google Benchmark I, fusion 1/√x (Kaggle "Verifiable Quantum Circuit Compilation", arXiv:2610.23832). The Lean section
 * Qpu.Fusion in index.lean holds the register, the domain and the quoted baseline; this module computes what those name.
 *
 * The target is |x⟩|0⟩ ↦ exp(2πi·β/√x)|x⟩|0⟩ on the register x, for x in [1, max x]. The score is S = Q × C, with
 * C = Toffolis + T/4 per shot. Lower is better. No circuit is built here and no kickmix verifier is run, so no entry is scored.
 */

/** The quoted baseline. The paper does not itemise its C, so C is kept as quoted. */
export const baseline = { Q: 260, toffoli: 7735, T: 1, rotations: 37, C: 7988 } as const

/**
 * The theorems the fusion check rests on. Every agnostic case a client of MCP receives is computed through these, never
 * by the client: a verdict is the theorem's holds, and a reference is accepted only when fusion_floor holds for it.
 * Lean: Qpu.Fusion, fusion_tolerance (2^80 = 2^128 / 2^48) and the fusionFloor and fusionAccepts predicates.
 */
export const theorem = {
  /** theorem fusion_tolerance : 2^80 = 2^128 / 2^48. The squared tolerance, scaled by x. */
  fusion_tolerance: (): boolean => 1n << 80n === (1n << 128n) / (1n << 48n),
  /** theorem fusion_floor : r·r·x ≤ 2^128 < (r+1)·(r+1)·x, so r = ⌊2^64/√x⌋. */
  fusion_floor: (r: bigint, x: bigint): boolean => x >= 1n && r * r * x <= 1n << 128n && 1n << 128n < (r + 1n) * (r + 1n) * x,
  /**
   * theorem fusion_accepts : e·e·x ≤ 2^80·den², where e/den is the phase error in units of 2^-64 turns. With den = 1
   * this is e·e·x ≤ 2^80.
   */
  fusion_accepts: (e: bigint, x: bigint, den = 1n): boolean => e * e * x <= (1n << 80n) * den * den,
}

/** Integer square root by Newton's method: the largest r with r² ≤ n. Exact, no floats. */
export const isqrt = (n: bigint): bigint => {
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) >> 1n
  while (y < x) {
    x = y
    y = (x + n / x) >> 1n
  }
  return x
}

/**
 * The reference phase ⌊2^65·β/√x⌋ in units of 2^-64 turns, as the paper states it. The paper's stated convention,
 * exp(2πiβ/√x), gives 2^64 rather than 2^65 at this resolution; the spec's expression is kept verbatim and the discrepancy
 * stays open until the verifier's source is read.
 */
export const reference = (x: bigint, beta = 1n): bigint => isqrt((1n << 130n) * beta * beta / x)

/** A shot passes when its phase error is within tol(x) = 2^-24·β/√x turns: error²·x ≤ 2^80·β² in units of 2^-64. */
export const shotPasses = (x: bigint, measured: bigint, beta = 1n): boolean => {
  const turn = 1n << 64n
  const d = (((measured - reference(x, beta)) % turn) + turn) % turn
  const e = d < turn - d ? d : turn - d
  return e * e * x <= (1n << 80n) * beta * beta
}

/**
 * The target θ(x) = 1/√x turns, as r = ⌊2^64/√x⌋ in units of 2^-64 turns (β = 1). Accepted only when theorem fusion_floor
 * holds for it, so no value leaves this function that the theorem does not hold for.
 */
export const targetOf = (x: bigint): bigint => {
  const r = isqrt((1n << 128n) / x)
  if (!theorem.fusion_floor(r, x)) throw new Error(`fusion_floor fails at x=${x}`)
  return r
}

/** A phase as an exact rational number of half-turns, the form the simulator reports: num/den. */
export type Phase = { num: bigint; den: bigint }

/** Parses "a" or "a/b" as an exact phase in half-turns. */
export const phaseOf = (text: string): Phase => {
  const [a, b] = text.split('/')
  const den = b === undefined ? 1n : BigInt(b)
  if (den === 0n) throw new Error('phase denominator is zero')
  return { num: BigInt(a), den }
}

/**
 * One shot passes when its turn error from θ(x), on the circle, is within tol(x) = 2^-24/√x: the error e in units of
 * 2^-64 turns satisfies theorem fusion_accepts. The phase is exact, so no float enters the comparison.
 */
export const shotAcceptsOf = (x: bigint, phase: Phase): boolean => {
  const turn = 1n << 64n
  const { num, den } = phase
  // measured turns = num/(2·den); in units of 2^-64 turns that is num·2^63/den, kept over den so it stays exact
  const scale = turn * den
  const measured = num * (1n << 63n)
  const target = targetOf(x) * den
  const d = (((measured - target) % scale) + scale) % scale
  const e = d < scale - d ? d : scale - d
  // e/den is the error in units of 2^-64 turns; fusion_accepts checks (e/den)²·x ≤ 2^80 exactly, as e²·x ≤ 2^80·den²
  return theorem.fusion_accepts(e, x, den) === true
}

/** S = Q × C with C = Toffolis + (T + n_rot·(0.56·log₂(1/ε) + 5.3)) / 4, per shot. */
export const cost = (c: { Q: number; toffoli: number; T: number; rotations: number; epsilon: number }) => {
  const C = c.toffoli + (c.T + c.rotations * (0.56 * Math.log2(1 / c.epsilon) + 5.3)) / 4
  return { C, S: c.Q * C }
}

/** The quoted baseline score, Q × C as the paper quotes them. */
export const baselineScore = (): number => baseline.Q * baseline.C
