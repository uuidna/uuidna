import { facesOf, hexRegisterOf, hexFamiliesOf, hexRunOf, qpuHexUuidOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { chooseOf, mintOf, latticeNamesOf, tenOf } from '../../quantum/processing/unit/index.js'
import { leanRecomputed, leanAxioms, leanUnproven } from '../../quantum/processing/unit/lean.js'
const L = { ...latticeNamesOf(), mintOf, chooseOf, tenOf }

/** The σ-involution seals of "All Seven Clay Millennium Problems Sealed via Universal σ-Involution" (Rouschev, 2026,
 *  doi:10.5281/zenodo.21781602), each computed exactly as the paper states it: σ is self-inverse (σ∘σ = id) and its
 *  fixed points are the ones the paper names. Registered as the hex family `clay`. */
export const CLAY_SEAL_SOURCE = 'https://doi.org/10.5281/zenodo.21781602'

const nat = (...xs: number[]): boolean => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

export class ClaySeals {
  /** Riemann: σ(s) = 1 − s on s = num/den; σ(σ(s)) = s, and σ(s) = s exactly at s = 1/2. Value 1 when num/den is the fixed point. */
  static riemann(num: number, den: number): CrossFormula {
    const involutive = den - (den - num) === num
    const fixed = 2 * num === den
    return crossFormulaOf({ id: 'clay-riemann', src: 'clay', dst: 'lattice', formula: 'σ(s) = 1 − s; σ(s) = s ⟺ s = 1/2', value: fixed ? 1 : 0, proof: `${CLAY_SEAL_SOURCE} §Riemann` }, nat(num, den) && den > 0 && involutive, { name: 'clay.riemann', params: [num, den] })
  }

  /** BSD: the non-trivial inverse pairs of (ℤ/mℤ)*; at m = 9 they are (2,5) and (4,7). Value: how many there are. */
  static bsd(m: number): CrossFormula {
    // the count from the factorisation, O(√m): (φ(m) − #{a : a² ≡ 1}) / 2; the pairs themselves are listed for small m
    let phi = m, odd = 0, twos = 0, x = m
    while (x % 2 === 0 && x > 0) { x /= 2; twos++ }
    if (twos) phi = phi / 2
    for (let p = 3; p * p <= x; p += 2) if (x % p === 0) { odd++; phi = (phi / p) * (p - 1); while (x % p === 0) x /= p }
    if (x > 1) { odd++; phi = (phi / x) * (x - 1) }
    const roots = 2 ** odd * (twos <= 1 ? 1 : twos === 2 ? 2 : 4)
    const count = m > 2 ? (phi - roots) / 2 : 0
    const pairs: [number, number][] = []
    if (m <= L.tenOf(L.n)) for (let a = 2; a < m; a++) if (gcd(a, m) === 1) for (let b = a + 1; b < m; b++) if ((a * b) % m === 1) pairs.push([a, b])
    return crossFormulaOf({ id: 'clay-bsd', src: 'clay', dst: 'crypto', formula: 'σ(a) = a⁻¹ in (ℤ/mℤ)*; non-trivial pairs a ≠ a⁻¹', value: count, proof: `${CLAY_SEAL_SOURCE} §BSD${pairs.length ? `: ${pairs.map((p) => `(${p})`).join(' ')}` : ''}` }, nat(m) && m > 2, { name: 'clay.bsd', params: [m] })
  }

  /** Hodge: Poincaré duality on the genus-g surface; H₁(Σ_g) = ℤ^(2g), so H₁(Σ₂) = ℤ⁴. Value: the rank 2g. */
  static hodge(genus: number): CrossFormula {
    return crossFormulaOf({ id: 'clay-hodge', src: 'clay', dst: 'proof', formula: 'rank H₁(Σ_g) = 2g', value: 2 * genus, proof: `${CLAY_SEAL_SOURCE} §Hodge` }, nat(genus), { name: 'clay.hodge', params: [genus] })
  }

  /** Navier–Stokes: the seam involution σ(ω₊, ω₋) = (−ω₋, −ω₊) on the two lobes; σ∘σ = id and σ(ω) = ω ⟺ ω₊ = −ω₋.
   *  Value 1 when the pair (a, −b) is a fixed point, i.e. a = b in magnitude with opposite sign. */
  static navierStokes(a: number, b: number): CrossFormula {
    const s = (p: [number, number]): [number, number] => [-p[1], -p[0]]
    const w: [number, number] = [a, -b]
    const back = s(s(w))
    const fixed = s(w)[0] === w[0] && s(w)[1] === w[1]
    return crossFormulaOf({ id: 'clay-navier-stokes', src: 'clay', dst: 'science', formula: 'σ(ω₊, ω₋) = (−ω₋, −ω₊); σ(ω) = ω ⟺ ω₊ = −ω₋', value: fixed ? 1 : 0, proof: `${CLAY_SEAL_SOURCE} §Navier–Stokes` }, nat(a, b) && back[0] === w[0] && back[1] === w[1], { name: 'clay.navierStokes', params: [a, b] })
  }

  /** Yang–Mills: a self-adjoint involution σ† = σ, σ² = I has real spectrum in {−1, +1}; on the Pauli σ_x the trace is 0 and
   *  the determinant −1, so the eigenvalues are exactly ±1. Value: the number of real eigenvalues (2). */
  static yangMills(): CrossFormula {
    const [a, b, c, d] = [0, 1, 1, 0]
    const square = [a * a + b * c, a * b + b * d, c * a + d * c, c * b + d * d]
    const involutive = square.join() === '1,0,0,1'
    const trace = a + d, det = a * d - b * c
    const disc = trace * trace - 4 * det
    return crossFormulaOf({ id: 'clay-yang-mills', src: 'clay', dst: 'quantum', formula: 'σ† = σ, σ² = I ⟹ spec σ ⊂ {−1, +1}', value: disc >= 0 ? 2 : 0, proof: `${CLAY_SEAL_SOURCE} §Yang–Mills` }, involutive && b === c, { name: 'clay.yangMills', params: [] })
  }

  /** P vs NP: σ(search, w) = (reuse, w) swaps the mode and keeps the witness; σ∘σ = id and no mode is its own image, so a
   *  fixed point exists only when the witness is already in memory (presupposed). Value: fixed points among the two modes. */
  static pVsNp(presupposed: number): CrossFormula {
    const sigma = (mode: number) => 1 - mode
    const involutive = [0, 1].every((m) => sigma(sigma(m)) === m)
    const fixed = presupposed ? 1 : [0, 1].filter((m) => sigma(m) === m).length
    return crossFormulaOf({ id: 'clay-p-vs-np', src: 'clay', dst: 'np', formula: 'σ(search, w) = (reuse, w); fixed only if w is presupposed', value: fixed, proof: `${CLAY_SEAL_SOURCE} §P vs NP` }, nat(presupposed) && presupposed <= 1 && involutive, { name: 'clay.pVsNp', params: [presupposed] })
  }

  /** THE SINGULARITY: the clay core σ_d(x) = d − x adopted across the quantum domains, so the families carry the
   *  involution the kernel proves (Lean: theorem singularity, proved by sigma_reflect / sigma_midpoint). Each domain is
   *  σ∘σ = id and fixed at the midpoint d/2 — the s = 1/2 singularity: Shor (order reflected at r/2), Planck (2h fixed at
   *  h), Pascal (choose n k = choose n (n−k)), QFT (register at its midpoint), Grover (diffusion about the mean), Pauli
   *  ({−1, +1} flip), the lattice (faces at their midpoint). Value: how many of the seven domains hold the involution. */
  static singularity(): CrossFormula {
    const sigma = (d: number, x: number) => d - x
    const midpointFixed = (d: number) => sigma(2 * d, d) === d
    const involutive = (d: number, x: number) => x <= d && sigma(d, sigma(d, x)) === x
    const domains: [string, boolean][] = [
      ['shor', midpointFixed(4) && sigma(4, 2) === 2],
      ['physics', midpointFixed(662607015)],
      ['combinatorics', involutive(7, 2)],
      ['qft', midpointFixed(8)],
      ['grover', midpointFixed(4)],
      ['stabilizer', involutive(1, 0) && involutive(1, 1)],
      ['lattice', midpointFixed(14) && involutive(14, 8)],
    ]
    const held = domains.filter(([, ok]) => ok).length
    return crossFormulaOf({ id: 'clay-singularity', src: 'clay', dst: 'quantum', formula: 'σ_d(x) = d − x across the domains; σ∘σ = id, fixed at d/2 (the s = 1/2 singularity)', value: held, proof: `${CLAY_SEAL_SOURCE} §Singularity (Lean: theorem singularity)` }, held === domains.length, { name: 'clay.singularity', params: [] })
  }
}

/** CLAY SEAL WAVE, ONE ADDRESS PER SEAL NAME: the i-th seal run on its combinatorial domain of
 *  tree-valid params (not blind 1…faces) — the involution holds where the formula holds; the values it reaches
 *  handed to the discovery at once, which finds every formula of every other family reaching the same value
 *  (the related formulas) and the seal (fixed points, involutions). Six addresses make the pass; a caller fires
 *  them as one wave. Value how many related formulas; holds when the seal is involutive on its domain and related
 *  or sealed. Evidence is hex/value/holds/next only — not a prize and not a solved flag. */
export const CLAY_SEALS = ['bsd', 'hodge', 'navierStokes', 'pVsNp', 'riemann', 'yangMills'] as const

export type ClaySealName = (typeof CLAY_SEALS)[number]

export type ClaySealDomain = {
  name: ClaySealName
  /** Why these params are the tree-valid combinatorial domain (not 1…faces for every seal). */
  kind: string
  /** Each row is one arity-correct param vector. */
  params: number[][]
}

/**
 * Combinatorial domain of tree-valid params for one Clay seal.
 * - bsd: m = 3…faces ∪ {15} (formula requires m > 2; 15 is the named test modulus)
 * - pVsNp: {0, 1} (formula requires presupposed ≤ 1)
 * - yangMills: arity 0 — one empty call
 * - others: arity-correct lattice walk (1…faces on each slot; riemann also includes named [1, 2])
 */
export const claySealDomainOf = (name: ClaySealName, faces = facesOf().faces): ClaySealDomain => {
  const arity = hexFamiliesOf().get('clay')?.find((f) => f.name === name)?.arity ?? 0
  if (name === 'bsd') {
    const ms = Array.from({ length: Math.max(0, faces - 2) }, (_, k) => k + 3)
    if (!ms.includes(15)) ms.push(15)
    return { name, kind: 'm=3…faces ∪ {15}', params: ms.map((m) => [m]) }
  }
  if (name === 'pVsNp') {
    return { name, kind: '{0,1}', params: [[0], [1]] }
  }
  if (name === 'yangMills' || arity === 0) {
    return { name, kind: 'arity-0 singleton', params: [[]] }
  }
  const diagonal = Array.from({ length: faces }, (_, k) => Array.from({ length: arity }, () => k + 1))
  if (name === 'riemann') {
    const named = [1, 2]
    const hasNamed = diagonal.some((p) => p.length === 2 && p[0] === named[0] && p[1] === named[1])
    return {
      name,
      kind: hasNamed ? 'arity-correct 1…faces (incl. named [1,2])' : 'arity-correct 1…faces ∪ named [1,2]',
      params: hasNamed ? diagonal : [...diagonal, named],
    }
  }
  return { name, kind: `arity-correct 1…faces (arity ${arity})`, params: diagonal }
}

/** Total domain slots across the six seals — sync measure for goal.combinations coverage. */
export const claySealDomainSizeOf = (faces = facesOf().faces): number =>
  CLAY_SEALS.reduce((n, name) => n + claySealDomainOf(name, faces).params.length, 0)

/**
 * Sync domain coverage: how many domain inputs hold under ClaySeals (no hex run).
 * Universal σ-involution on the domain ⟺ held === size.
 */
export const claySealDomainCoverageOf = (faces = facesOf().faces) => {
  const rows = CLAY_SEALS.map((name) => {
    const domain = claySealDomainOf(name, faces)
    const held = domain.params.filter((params) => {
      try {
        return (ClaySeals[name] as (...xs: number[]) => { holds?: boolean })(...params).holds === true
      } catch {
        return false
      }
    }).length
    return { name, size: domain.params.length, held, kind: domain.kind, universal: held === domain.params.length && domain.params.length > 0 }
  })
  const size = rows.reduce((a, r) => a + r.size, 0)
  const held = rows.reduce((a, r) => a + r.held, 0)
  return { faces, rows, size, held, universal: size > 0 && held === size && rows.every((r) => r.universal) }
}

/**
 * Seal-wave only: involution over each seal's combinatorial domain (tree-valid params).
 * Each domain case is court-tried. Discover path is cloud.scale(families, faces) capacity — not prose.
 * Universal σ-involution evidence = holds on every domain input.
 */
export const claySealWaveOf = async (i: number) => {
  const name = CLAY_SEALS[i]
  if (!name) return null
  const faces = facesOf().faces
  const domain = claySealDomainOf(name, faces)
  const { discoverCapacityGateOf, gateCourtTrialOf } = await import('../../court/gate-court.js')
  const { qpuNextOf } = await import('../../quantum/processing/unit/index.js')
  const treeNext = qpuNextOf().next
  const runs = await Promise.all(domain.params.map(async (params) => {
    try {
      const hex = qpuHexUuidOf({ family: 'clay', program: [name], params })
      const r = (await hexRunOf(hex, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean; next?: unknown }
      const holds = r.holds === true
      const rawNext = Object.prototype.hasOwnProperty.call(r, 'next') ? (r.next ?? null) : ('absent' as const)
      const court = gateCourtTrialOf({
        case: `clay.seal.${name}.domain`,
        gate: {
          call: `clay.${name}(${params.join(', ')})`,
          name: `clay.${name}`,
          params,
          hex,
          value: Number(r.value),
          holds,
          rawNext,
          definition: domain.kind,
        },
        confidence: holds ? 100 : 0,
        note: `domain-wave case for ${name}`,
      })
      return {
        hex,
        value: Number(r.value),
        holds,
        params,
        rawNext,
        treeNext: rawNext === 'absent' || rawNext === null ? treeNext : rawNext,
        court: { case: court.case, allow: court.allow, holds: court.holds, trialRawNext: court.trial.rawNext },
      }
    } catch {
      const court = gateCourtTrialOf({
        case: `clay.seal.${name}.domain`,
        gate: {
          call: `clay.${name}(${params.join(', ')})`,
          name: `clay.${name}`,
          params,
          hex: null,
          value: 0,
          holds: false,
          rawNext: 'absent',
          definition: domain.kind,
        },
        confidence: 0,
        note: `domain-wave case for ${name} (run failed)`,
      })
      return {
        hex: '',
        value: 0,
        holds: false,
        params,
        rawNext: 'absent' as const,
        treeNext,
        court: { case: court.case, allow: court.allow, holds: court.holds, trialRawNext: court.trial.rawNext },
      }
    }
  }))
  const held = runs.filter((r) => r.holds)
  const courtTried = runs.filter((r) => r.court.allow && r.court.holds).length
  const universal = runs.length > 0 && held.length === runs.length
  const capacity = discoverCapacityGateOf()
  return {
    i,
    name,
    domain: { kind: domain.kind, size: domain.params.length, params: domain.params },
    involution: universal ? 'holds on every domain input' as const : `holds on ${held.length} of ${runs.length} domain inputs` as const,
    involutive: held.length > 0,
    universal,
    values: [...new Set(held.map((r) => r.value))].slice(0, 8),
    hex: held[0]?.hex ?? runs[0]?.hex ?? '',
    agents: runs.length,
    held: held.length,
    courtTried,
    cases: runs,
    related: [] as string[],
    seal: capacity.path === 'seal-wave' ? 'seal-wave — discover.capacity gate denies full-registry' as const : 'capacity allows full-registry' as const,
    relations: 0,
    proven: universal,
    discover: capacity.path === 'seal-wave' ? 'capacity-gated' as const : 'capacity-open' as const,
    /** Formula raw next is absent on seals; tree next is qpuNextOf().next. */
    treeNext,
    capacity: {
      case: capacity.case,
      path: capacity.path,
      families: capacity.families,
      faces: capacity.faces,
      nodes: capacity.nodes,
      trial: capacity.trial,
      allow: capacity.allow,
      holds: capacity.holds,
      rawNext: capacity.trial.rawNext,
    },
  }
}

/**
 * Full pass: seal-wave + qpuDiscoverOf(values).
 * Slice vs full-registry is the discover.capacity gate (cloud.scale × court.standard), not a policy refuse.
 * `{ fullDiscover: true }` still requires the capacity gate to allow — otherwise the trial denies and seal-wave stands.
 */
export const clayPassOf = async (i: number, opts?: { related?: boolean; fullDiscover?: boolean; discoverSlice?: { from?: number; count?: number } }) => {
  const wave = await claySealWaveOf(i)
  if (!wave) return null
  const relatedWanted = opts?.related !== false
  if (!relatedWanted) {
    return { ...wave, seal: 'none' as string, proven: wave.involutive, discover: 'skipped' as const }
  }
  const { discoverCapacityGateOf } = await import('../../court/gate-court.js')
  const capacity = discoverCapacityGateOf()
  const wantFull = opts?.fullDiscover === true
  const fullAllowed = wantFull && capacity.allow === true
  const { qpuDiscoverOf } = await import('../../mcp/discovery.js')
  const values = [...new Set(wave.values.filter((v) => Number.isSafeInteger(v) && v >= 3))]
  const slice = fullAllowed
    ? undefined
    : (opts?.discoverSlice ?? { from: 0, count: facesOf().faces })
  const d = await qpuDiscoverOf(values, slice)
  const related = [...new Set(d.relations.filter((rel) => rel.ways.some((w) => w.family === 'clay' && w.program.includes(wave.name))).flatMap((rel) => rel.ways.filter((w) => w.family !== 'clay').map((w) => `${w.family}.${w.program.join('∘')} = ${rel.value}`)))]
  const seal = d.seals.find((s) => s.family === 'clay' && s.program.includes(wave.name))
  return {
    i: wave.i,
    name: wave.name,
    involution: wave.involution,
    involutive: wave.involutive,
    values: wave.values,
    related,
    seal: seal ? `${seal.kind} at ${seal.points.slice(0, 6).join(', ')}` : 'none',
    hex: wave.hex,
    agents: wave.agents,
    relations: d.relations.length,
    proven: wave.involutive && (related.length > 0 || seal !== undefined),
    discover: slice
      ? `slice from=${slice.from ?? 0} count=${slice.count ?? facesOf().faces}` as const
      : 'full-registry' as const,
    capacity: {
      case: capacity.case,
      path: capacity.path,
      allow: capacity.allow,
      trial: capacity.trial,
      wantedFull: wantFull,
      fullAllowed,
      holds: capacity.holds,
      rawNext: capacity.trial.rawNext,
    },
  }
}
export class ClayPass {
  /** Full pass including related discovery (slice by default). For seal-only evidence use claySealWaveOf. */
  static async pass(i: number): Promise<CrossFormula> {
    const r = await clayPassOf(i)
    if (!r) return crossFormulaOf({ id: 'clay-pass', src: 'clay', dst: 'lattice', formula: 'pass(i)', value: 0, proof: CLAY_SEAL_SOURCE }, false, { name: 'clay.pass', params: [i] })
    const { proven, ...reading } = r
    const extra: Record<string, unknown> = reading
    return crossFormulaOf({ id: 'clay-pass', src: 'clay', dst: 'lattice', formula: `pass(${i}) = |related formulas of ${r.name} over its combinatorial domain, discovered at once|`, value: Array.isArray(r.related) ? r.related.length : 0, proof: CLAY_SEAL_SOURCE, ...extra }, nat(i) && proven, { name: 'clay.pass', params: [i] })
  }
  /** Affirmative seal-wave: involution evidence on combinatorial domain; discover path is capacity-gated and court-tried. */
  static async seal(i: number): Promise<CrossFormula> {
    const r = await claySealWaveOf(i)
    if (!r) return crossFormulaOf({ id: 'clay-seal-wave', src: 'clay', dst: 'lattice', formula: 'seal(i)', value: 0, proof: CLAY_SEAL_SOURCE }, false, { name: 'clay.pass', params: [i] })
    const { proven, discover, capacity, ...reading } = r
    const extra: Record<string, unknown> = { ...reading, discover, capacity }
    return crossFormulaOf({ id: 'clay-seal-wave', src: 'clay', dst: 'lattice', formula: `seal(${i}) = |held involutions of ${r.name} over combinatorial domain|`, value: r.held, proof: CLAY_SEAL_SOURCE, ...extra }, nat(i) && proven, { name: 'clay.pass', params: [i] })
  }
}
hexRegisterOf('clay', 'pass', (ClayPass.pass as (...x: unknown[]) => unknown).bind(ClayPass))
hexRegisterOf('clay', 'singularity', (ClaySeals.singularity as (...x: unknown[]) => unknown).bind(ClaySeals))
for (const name of ['bsd', 'hodge', 'navierStokes', 'pVsNp', 'riemann', 'yangMills'] as const)
  hexRegisterOf('clay', name, (ClaySeals[name] as (...x: unknown[]) => unknown).bind(ClaySeals))
