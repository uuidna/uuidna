// quantum/stabilizer — EXACT OUTCOMES FOR CLIFFORD CIRCUITS AT ANY WIDTH, without a state vector. The dense simulator
// in ./index.ts holds 2^n Gaussian-integer amplitudes, so its cost doubles with every qubit (measured 2026-11-10: 145 MiB
// and 293 ms per gate layer at 18 qubits) and uuidna_quantum stops at 16. Circuits built only from Clifford gates
// (h, s, sdg, x, y, z, cx, cz, swap — every gate the door takes except ccx and ccz) keep a stabilizer state, which a
// 2n × 2n tableau over GF(2) carries exactly (Aaronson & Gottesman, "Improved simulation of stabilizer circuits",
// Phys. Rev. A 70, 052328 (2004), doi:10.1103/PhysRevA.70.052328; the Gottesman–Knill theorem). Measuring all qubits of
// a stabilizer state gives outcomes spread evenly over an affine subspace of 2^k bit strings, read off by elimination.
// A classical simulation, exact, in polynomial time; the tableau's local rules are sealed in lean/UuidProgram.lean.
import type { GateOp } from './index.js'

/** the gates this path carries — the Clifford subset of GateOp */
export const CLIFFORD_GATES: ReadonlySet<GateOp['gate']> = new Set(['h', 's', 'sdg', 'x', 'y', 'z', 'cx', 'cz', 'swap'])
export const isClifford = (ops: readonly GateOp[]): boolean => ops.every((o) => CLIFFORD_GATES.has(o.gate))

interface Tableau { n: number; x: Uint8Array[]; z: Uint8Array[]; r: Uint8Array }

/** |0…0⟩: destabilizer i is X_i, stabilizer i is Z_i, every phase +1 */
const tableauOf = (n: number): Tableau => {
  const x = Array.from({ length: 2 * n }, () => new Uint8Array(n)), z = Array.from({ length: 2 * n }, () => new Uint8Array(n))
  for (let i = 0; i < n; i++) { x[i]![i] = 1; z[n + i]![i] = 1 }
  return { n, x, z, r: new Uint8Array(2 * n) }
}
const H = (t: Tableau, a: number): void => { for (let i = 0; i < 2 * t.n; i++) { t.r[i]! ^= t.x[i]![a]! & t.z[i]![a]!; const s = t.x[i]![a]!; t.x[i]![a] = t.z[i]![a]!; t.z[i]![a] = s } }
const S = (t: Tableau, a: number): void => { for (let i = 0; i < 2 * t.n; i++) { t.r[i]! ^= t.x[i]![a]! & t.z[i]![a]!; t.z[i]![a]! ^= t.x[i]![a]! } }
const CX = (t: Tableau, a: number, b: number): void => {
  for (let i = 0; i < 2 * t.n; i++) { t.r[i]! ^= t.x[i]![a]! & t.z[i]![b]! & (t.x[i]![b]! ^ t.z[i]![a]! ^ 1); t.x[i]![b]! ^= t.x[i]![a]!; t.z[i]![a]! ^= t.z[i]![b]! }
}
const PX = (t: Tableau, a: number): void => { for (let i = 0; i < 2 * t.n; i++) t.r[i]! ^= t.z[i]![a]! }
const PZ = (t: Tableau, a: number): void => { for (let i = 0; i < 2 * t.n; i++) t.r[i]! ^= t.x[i]![a]! }

const apply = (t: Tableau, op: GateOp): void => {
  const [a, b] = op.qubits as [number, number]
  for (const q of op.qubits) if (!Number.isInteger(q) || q < 0 || q >= t.n) throw new Error(`stabilizer: qubit ${q} is outside 0..${t.n - 1}`)
  switch (op.gate) {
    case 'h': return H(t, a)
    case 's': return S(t, a)
    case 'sdg': S(t, a); S(t, a); return S(t, a)
    case 'x': return PX(t, a)
    case 'z': return PZ(t, a)
    case 'y': PX(t, a); return PZ(t, a)
    case 'cx': return CX(t, a, b)
    case 'cz': H(t, b); CX(t, a, b); return H(t, b)
    case 'swap': CX(t, a, b); CX(t, b, a); return CX(t, a, b)
    default: throw new Error(`stabilizer: ${op.gate} is not a Clifford gate — this path carries ${[...CLIFFORD_GATES].join(', ')}`)
  }
}

/** the power of i when two single-qubit Pauli factors multiply (Aaronson–Gottesman's g) */
const g = (x1: number, z1: number, x2: number, z2: number): number =>
  x1 === 0 && z1 === 0 ? 0 : x1 === 1 && z1 === 1 ? z2 - x2 : x1 === 1 ? z2 * (2 * x2 - 1) : x2 * (1 - 2 * z2)
/** row h := row h · row i, the phase carried exactly */
const rowsum = (X: Uint8Array[], Z: Uint8Array[], R: Uint8Array, h: number, i: number, n: number): void => {
  let e = 2 * R[h]! + 2 * R[i]!
  for (let j = 0; j < n; j++) e += g(X[i]![j]!, Z[i]![j]!, X[h]![j]!, Z[h]![j]!)
  R[h] = ((e % 4) + 4) % 4 === 0 ? 0 : 1
  for (let j = 0; j < n; j++) { X[h]![j]! ^= X[i]![j]!; Z[h]![j]! ^= Z[i]![j]! }
}

export interface CliffordOutcomes {
  qubits: number
  /** k: the outcomes are 2^k bit strings, each with probability 1/2^k */
  randomBits: number
  /** each outcome's exact probability, as a fraction */
  share: string
  /** every outcome (labelled like ./index.ts label: qubit n-1 first) when 2^k is at most 2^enumerateUpTo; otherwise null */
  outcomes: Record<string, string> | null
  /** the affine subspace itself: one outcome and the qubits that range freely over it */
  affine: { offset: string; free: number[] }
}

/** cliffordOutcomes(n, ops) → the exact measurement distribution of all n qubits after a Clifford circuit on |0…0⟩ */
export function cliffordOutcomes(n: number, ops: readonly GateOp[], enumerateUpTo = 12): CliffordOutcomes {
  if (!Number.isInteger(n) || n < 1) throw new Error('stabilizer: qubits must be a positive integer')
  const t = tableauOf(n)
  for (const op of ops) apply(t, op)
  const X = t.x.slice(n).map((row) => Uint8Array.from(row)), Z = t.z.slice(n).map((row) => Uint8Array.from(row)), R = Uint8Array.from(t.r.slice(n))
  // eliminate the X part: each stabilizer left with an X component makes one bit random; the rest are pure Z
  let rank = 0
  for (let col = 0; col < n && rank < n; col++) {
    let p = -1
    for (let i = rank; i < n; i++) if (X[i]![col]) { p = i; break }
    if (p < 0) continue
    ;[X[rank], X[p]] = [X[p]!, X[rank]!]; [Z[rank], Z[p]] = [Z[p]!, Z[rank]!]; [R[rank], R[p]] = [R[p]!, R[rank]!]
    for (let i = 0; i < n; i++) if (i !== rank && X[i]![col]) rowsum(X, Z, R, i, rank, n)
    rank++
  }
  // each pure-Z stabilizer says: the parity of the outcome bits on its support equals its phase
  const cons = Array.from({ length: n - rank }, (_, i) => ({ z: Uint8Array.from(Z[rank + i]!), r: R[rank + i]! }))
  const pivots: number[] = []
  let row = 0
  for (let col = 0; col < n && row < cons.length; col++) {
    let p = -1
    for (let i = row; i < cons.length; i++) if (cons[i]!.z[col]) { p = i; break }
    if (p < 0) continue
    ;[cons[row], cons[p]] = [cons[p]!, cons[row]!]
    for (let i = 0; i < cons.length; i++) if (i !== row && cons[i]!.z[col]) { for (let j = 0; j < n; j++) cons[i]!.z[j]! ^= cons[row]!.z[j]!; cons[i]!.r ^= cons[row]!.r }
    pivots.push(col); row++
  }
  const free = [...Array(n).keys()].filter((c) => !pivots.includes(c))
  if (free.length !== rank) throw new Error(`stabilizer: ${free.length} free bits against ${rank} random stabilizers — the tableau is inconsistent`)
  const label = (bits: Uint8Array): string => { let s = ''; for (let q = n - 1; q >= 0; q--) s += bits[q]; return s }
  const solve = (assign: bigint): string => {
    const bits = new Uint8Array(n)
    free.forEach((c, i) => { bits[c] = Number((assign >> BigInt(i)) & 1n) })
    for (let i = pivots.length - 1; i >= 0; i--) {
      let v = cons[i]!.r
      for (let j = 0; j < n; j++) if (j !== pivots[i] && cons[i]!.z[j]) v ^= bits[j]!
      bits[pivots[i]!] = v
    }
    return label(bits)
  }
  const k = rank
  const share = k === 0 ? '1' : `1/${2n ** BigInt(k)}`
  let outcomes: Record<string, string> | null = null
  if (k <= enumerateUpTo) {
    outcomes = {}
    for (let a = 0n; a < 2n ** BigInt(k); a++) outcomes[solve(a)] = share
  }
  return { qubits: n, randomBits: k, share, outcomes, affine: { offset: solve(0n), free } }
}
