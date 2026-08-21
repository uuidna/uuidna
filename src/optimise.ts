// optimise — THE EXACT LINEAR OPTIMISER on the quantum API's honest terms: small integer linear programs solved
// by TOTAL enumeration of the lattice — every candidate checked, nothing sampled, the optimum exact and the
// receipt recomputable. The search space is the qubit basis made literal: bounding each of n variables to
// {0..bound} walks (bound+1)^n candidates exactly as the classical simulator walks its 2^n basis states —
// EXPONENTIAL, honestly (theorem optimisation_space_is_qubit_dimension); the work is capped so the honesty is
// structural, not aspirational. Backed by the Optimisation.lean wing: the optimum sits at a vertex, strong
// duality holds exact on the sealed instance, Grover only halves the exponent. Integrity— an exact
// optimum of the STATED instance. Deterministic: no wall-clock, no RNG, no Math.*.
import { toUuid } from './address.js'

export interface LinearProgram {
  /** objective coefficients — maximise c·x */
  c: number[]
  /** constraint matrix rows — A[i]·x ≤ b[i] */
  A: number[][]
  b: number[]
  /** each variable ranges over integers 0..bound (default 16, max 64) */
  bound?: number
}
export interface LinearOptimum {
  optimum: number | null
  argmax: number[] | null
  candidates: number
  feasible: number
  /** every feasible candidate re-checkable: the fold of (argmax, optimum, counts) */
  receipt: string
  honest: string
}

const MAX_VARS = 4
const MAX_BOUND = 64
const MAX_CANDIDATES = 1_000_000

/** exact maximum of an integer LP by total enumeration — every candidate checked, nothing sampled */
export function optimiseLinear(lp: LinearProgram): LinearOptimum {
  const n = lp.c.length
  if (n < 1 || n > MAX_VARS) throw new Error(`optimiseLinear: 1..${MAX_VARS} variables (got ${n}) — exact enumeration, honestly bounded`)
  if (lp.A.length !== lp.b.length) throw new Error('optimiseLinear: A and b must have the same number of rows')
  for (const row of lp.A) if (row.length !== n) throw new Error('optimiseLinear: every A row needs one coefficient per variable')
  const bound = lp.bound ?? 16
  if (bound < 1 || bound > MAX_BOUND) throw new Error(`optimiseLinear: bound 1..${MAX_BOUND} (got ${bound})`)
  const candidates = (bound + 1) ** n
  if (candidates > MAX_CANDIDATES) throw new Error(`optimiseLinear: ${candidates} candidates exceeds the ${MAX_CANDIDATES} cap — the exponential is the honest cost (theorem optimisation_space_is_qubit_dimension); shrink bound or variables`)

  let optimum: number | null = null
  let argmax: number[] | null = null
  let feasible = 0
  const x = new Array<number>(n).fill(0)
  // odometer walk over the lattice — the basis states in lexicographic order, deterministic
  for (let k = 0; k < candidates; k++) {
    let r = k
    for (let i = 0; i < n; i++) { x[i] = r % (bound + 1); r = (r - x[i]!) / (bound + 1) }
    let ok = true
    for (let i = 0; ok && i < lp.A.length; i++) {
      let s = 0
      for (let j = 0; j < n; j++) s += lp.A[i]![j]! * x[j]!
      if (s > lp.b[i]!) ok = false
    }
    if (!ok) continue
    feasible++
    let v = 0
    for (let j = 0; j < n; j++) v += lp.c[j]! * x[j]!
    if (optimum === null || v > optimum) { optimum = v; argmax = [...x] }
  }
  return {
    optimum, argmax, candidates, feasible,
    receipt: toUuid(JSON.stringify({ c: lp.c, A: lp.A, b: lp.b, bound, optimum, argmax, feasible })),
    honest: `exact optimum of THIS instance by total enumeration of ${candidates} candidates (${feasible} feasible) — not a solver at scale; the exponential walk is the honest cost and Grover would only halve its exponent`,
  }
}
