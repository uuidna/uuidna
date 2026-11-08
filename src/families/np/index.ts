import { bigPowModOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

export type Graph = { n: number; edges: [number, number][] }
/** CNF in DIMACS literals: variable v is v (true) or -v (false), 1-based. */
export type Cnf = number[][]

const adjacencyOf = (g: Graph): Set<number>[] => {
  const a = Array.from({ length: g.n }, () => new Set<number>())
  for (const [u, v] of g.edges) {
    a[u]!.add(v)
    a[v]!.add(u)
  }
  return a
}

/** GP(n, k): outer cycle u_i u_{i+1}, spokes u_i v_i, inner star v_i v_{i+k}. Petersen = GP(5,2), dodecahedron = GP(10,2). */
export const generalizedPetersen = (n: number, k: number): Graph => {
  const seen = new Set<string>()
  const edges: [number, number][] = []
  const add = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`
    if (!seen.has(key)) seen.add(key), edges.push([a, b])
  }
  for (let i = 0; i < n; i++) {
    add(i, (i + 1) % n)
    add(i, n + i)
    add(n + i, n + ((i + k) % n))
  }
  return { n: 2 * n, edges }
}

export const disjointUnion = (a: Graph, b: Graph): Graph => ({ n: a.n + b.n, edges: [...a.edges, ...b.edges.map(([u, v]) => [u + a.n, v + a.n] as [number, number])] })

// ---------------------------------------------------------------------------
// Certificate verifiers: each runs in time linear in the input and certificate
// ---------------------------------------------------------------------------

export const verifyColoring = (g: Graph, colors: readonly number[], k: number): boolean =>
  colors.length === g.n && colors.every((c) => Number.isInteger(c) && c >= 0 && c < k) && g.edges.every(([u, v]) => colors[u] !== colors[v])

export const verifyHamCycle = (g: Graph, cycle: readonly number[]): boolean => {
  const a = adjacencyOf(g)
  return cycle.length === g.n && new Set(cycle).size === g.n && cycle.every((v) => v >= 0 && v < g.n) && cycle.every((v, i) => a[v]!.has(cycle[(i + 1) % g.n]!))
}

export const verifySubsetSum = (set: readonly number[], mask: number, target: number): boolean =>
  set.reduce((s, x, i) => s + ((mask >> i) & 1 ? x : 0), 0) === target

export const verifySat = (cnf: Cnf, assignment: readonly boolean[]): boolean => cnf.every((clause) => clause.some((l) => assignment[Math.abs(l) - 1] === l > 0))

// ---------------------------------------------------------------------------
// Searches: produce a certificate or decide that none exists (small instances)
// ---------------------------------------------------------------------------

export const findColoring = (g: Graph, k: number): number[] | null => {
  const a = adjacencyOf(g)
  const colors = Array<number>(g.n).fill(-1)
  const place = (v: number): boolean => {
    if (v === g.n) return true
    for (let c = 0; c < k; c++) {
      if ([...a[v]!].some((u) => colors[u] === c)) continue
      colors[v] = c
      if (place(v + 1)) return true
    }
    colors[v] = -1
    return false
  }
  return place(0) ? colors : null
}

export const findHamCycle = (g: Graph): number[] | null => {
  const a = adjacencyOf(g)
  const path = [0]
  const used = new Set([0])
  const extend = (): boolean => {
    const last = path[path.length - 1]!
    if (path.length === g.n) return a[last]!.has(0)
    for (const v of a[last]!) {
      if (used.has(v)) continue
      path.push(v)
      used.add(v)
      if (extend()) return true
      path.pop()
      used.delete(v)
    }
    return false
  }
  return extend() ? path : null
}

export const findAssignment = (cnf: Cnf, vars: number): boolean[] | null => {
  for (let m = 0; m < 2 ** vars; m++) {
    const assignment = Array.from({ length: vars }, (_, i) => ((m >> i) & 1) === 1)
    if (verifySat(cnf, assignment)) return assignment
  }
  return null
}

/** Pigeonhole PHP(p, h): p pigeons in h holes, each pigeon somewhere, no hole twice. Unsatisfiable when p > h. */
export const pigeonhole = (p: number, h: number): { cnf: Cnf; vars: number } => {
  const x = (i: number, j: number) => i * h + j + 1
  const cnf: Cnf = []
  for (let i = 0; i < p; i++) cnf.push(Array.from({ length: h }, (_, j) => x(i, j)))
  for (let j = 0; j < h; j++) for (let i = 0; i < p; i++) for (let k = i + 1; k < p; k++) cnf.push([-x(i, j), -x(k, j)])
  return { cnf, vars: p * h }
}

// ---------------------------------------------------------------------------
// Immerman–Szelepcsényi: inductive counting certifies non-reachability
// ---------------------------------------------------------------------------

/** c_0 = 1, c_{i+1} = |R_i ∪ N(R_i)|, for i < n - 1: the counts the NL algorithm carries in O(log n) bits. */
export const reachCounts = (g: Graph, s: number): number[] => {
  const a = adjacencyOf(g)
  let reached = new Set([s])
  const counts = [1]
  for (let i = 0; i < g.n - 1; i++) {
    const next = new Set(reached)
    for (const u of reached) for (const v of a[u]!) next.add(v)
    reached = next
    counts.push(reached.size)
  }
  return counts
}

/** t is unreachable from s exactly when c_{n-1} vertices other than t are reachable: the count is the certificate. */
export const certifyUnreachable = (g: Graph, s: number, t: number): { count: number; others: number; unreachable: boolean } => {
  const count = reachCounts(g, s).at(-1)!
  const others = [...Array(g.n).keys()].filter((v) => v !== t && isReachable(g, s, v)).length
  return { count, others, unreachable: others === count }
}
const isReachable = (g: Graph, s: number, v: number): boolean => {
  const a = adjacencyOf(g)
  const seen = new Set([s])
  const queue = [s]
  while (queue.length) for (const w of a[queue.shift()!]!) if (!seen.has(w)) seen.add(w), queue.push(w)
  return seen.has(v)
}

// ---------------------------------------------------------------------------
// The family `np`: formulas over naturals
// ---------------------------------------------------------------------------

const nat = (...xs: number[]): boolean => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const bitsOf = (x: number): number => (x > 0 ? Math.floor(Math.log2(x)) + 1 : 1)

// square-and-multiply: 4^k mod 3 in O(log k), so a reach width of any size stays cheap

export class NpFormulas {
  /** set packed as base-16 digits, mask selects digits */
  static subsetSum(set: number, mask: number): CrossFormula {
    let s = 0
    for (let i = 0, x = set; x > 0; i++, x = Math.floor(x / 16)) if ((mask >> i) & 1) s += x % 16
    return crossFormulaOf({ id: 'np-subset-sum', src: 'np', dst: 'np', formula: 'sum = Σ bit_i(mask) · digit_i(set)', value: s, proof: 'A Subset Sum certificate is checked in one pass over the set' }, nat(set, mask), { name: 'np.subsetSum', params: [set, mask] })
  }

  static edgeBit(adjacency: number, position: number): CrossFormula {
    return crossFormulaOf({ id: 'np-edge-bit', src: 'np', dst: 'path', formula: 'edge(u, v) = floor(A / 2^(u·n + v)) mod 2', value: Math.floor(adjacency / 2 ** position) % 2, proof: 'An adjacency matrix packed into one natural; a logspace machine reads one bit' }, nat(adjacency, position), { name: 'np.edgeBit', params: [adjacency, position] })
  }

  static isTime(n: number): CrossFormula {
    return crossFormulaOf({ id: 'np-is-time', src: 'np', dst: 'enterprise', formula: 'time = n^5', value: n ** 5, proof: 'Inductive counting over an adjacency matrix: n rounds, n^2 candidates, n^2 re-checks' }, nat(n) && Number.isSafeInteger(n ** 5), { name: 'np.isTime', params: [n] })
  }

  static isSpace(n: number): CrossFormula {
    return crossFormulaOf({ id: 'np-is-space', src: 'np', dst: 'qsec', formula: 'space = bits(n)', value: bitsOf(n), proof: 'NL = co-NL: the counts c_i fit in O(log n) bits' }, nat(n) && n > 0, { name: 'np.isSpace', params: [n] })
  }

  static sparseWidth(modulus: number): CrossFormula {
    return crossFormulaOf({ id: 'np-sparse-width', src: 'quantum', dst: 'np', formula: 'qubits = bits(N) + 2', value: bitsOf(modulus) + 2, proof: 'Work register bits(N) plus the two-qubit counting register; at most 16 amplitudes are stored' }, nat(modulus) && modulus > 1, { name: 'np.sparseWidth', params: [modulus] })
  }

  static reachGcd(k: number): CrossFormula {
    return crossFormulaOf({ id: 'np-reach-gcd', src: 'np', dst: 'quantum', formula: '(2^(2k) - 1) mod 3', value: Number((bigPowModOf(4n, BigInt(k), 3n) + 2n) % 3n), proof: '4 ≡ 1 mod 3, so every reach width 2k gives N = 2^(2k) - 1 divisible by 3: the gcd step' }, nat(k), { name: 'np.reachGcd', params: [k] })
  }
}

for (const name of ['edgeBit', 'isSpace', 'isTime', 'reachGcd', 'sparseWidth', 'subsetSum'] as const)
  hexRegisterOf('np', name, (NpFormulas[name] as (...x: unknown[]) => unknown).bind(NpFormulas))
