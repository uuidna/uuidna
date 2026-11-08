import { hexFamiliesOf, hexRegisterOf, hexRunOf, qpuHexUuidOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { DOORS } from '../../mcp/discovery.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRINITY FLOWS AND MERKABA FORMATIONS, AS CROSS FORMULAS. A trinity flow passes one value through three families:
 *  the first formula of family a takes the seed, its value is what family b's first formula takes, and its value what
 *  family c's takes — a tetrahedron's three edges from one apex. The mirror is the same three families the other way
 *  (c, b, a): the second tetrahedron, counter-rotating. A merkaba forms when the flow and its mirror meet at one value:
 *  the two tetrahedra lock at their shared centre. Nothing here is a claim about geometry; the formations are the
 *  compositions the lattice admits across three families at once, and the star counts them. The families that flow
 *  are the ones that compute without reaching outside (the doors and this family are not flowed, so no flow recurses). */

const SEED = 3 // the trinity's own number, the seed of every flow
const PROOF = 'composition across three families: f_c(f_b(f_a(3))); the mirror f_a(f_b(f_c(3)))'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'merkaba', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `merkaba.${name}`, params })

/** The families a flow may pass through: every registered family that is not a door and not this one, sorted. */
export const flowFamiliesOf = (): string[] => [...hexFamiliesOf().keys()].filter((x) => !DOORS.has(x) && x !== 'merkaba').sort()
/** A flow family's index in that ring, by name: the integer a flow takes (mirror(a, b, c), trinity, torus) for the family. */
export const flowIndexOf = (name: string): number => { const i = flowFamiliesOf().indexOf(name); if (i < 0) throw new Error(`merkaba: no flow family ${name}`); return i }
const numberOf = (r: unknown): number => (typeof r === 'object' && r !== null && 'value' in r ? Number((r as { value: unknown }).value) : typeof r === 'bigint' ? Number(r) : Number(r))
const holdsOf = (r: unknown): boolean => (typeof r === 'object' && r !== null && 'holds' in r ? (r as { holds: unknown }).holds !== false : true)
/** One edge: the family's first formula, called on its own signature. One carried value fills arity 0 or 1.
 *  A wider signature has the other amounts absent, so the formula is not called. */
const edges = new Map<string, { value: number; holds: boolean; formula: string }>() // an edge computed once per family and value: the star walks the same edges many times
// A flowed value is bounded to a hexbit window (16 bits, four hex). A step can produce a huge number — fibFusion(72) is
// ~5·10^14 — and feeding that to the next formula, which may do O(value) work, is a heat the flow must not pay. Beyond
// the window the flow stops (the step does not hold) instead of handing the next family an explosive input: cool by
// construction, split not swept. An arity-0 formula ignores the value, so it is never capped — it resets the flow.
const FLOWCAP = 2 ** 16
const callArgs = (arity: number, value: number): bigint[] | null => {
  if (!Number.isSafeInteger(value) || value < 0) return null
  if (arity <= 0) return []
  if (arity === 1) return value > FLOWCAP ? null : [BigInt(value)]
  return null
}
const stepOf = (family: string, value: number): { value: number; holds: boolean; formula: string } => {
  const key = `${family}/${value}`
  const known = edges.get(key)
  if (known) return known
  const first = hexFamiliesOf().get(family)?.[0]
  let out: { value: number; holds: boolean; formula: string }
  const args = first ? callArgs(first.arity, value) : null
  if (!first || !args) out = { value: 0, holds: false, formula: first?.name ?? '' }
  else {
    try {
      const r = first.run(args)
      const v = numberOf(r)
      out = { value: Number.isSafeInteger(v) && v >= 0 ? v : 0, holds: holdsOf(r) && Number.isSafeInteger(v) && v >= 0, formula: first.name }
    } catch { out = { value: 0, holds: false, formula: first.name } }
  }
  edges.set(key, out)
  return out
}
const flowOf = (a: number, b: number, c: number) => {
  const names = flowFamiliesOf()
  const path = [a, b, c].map((i) => names[i])
  const distinct = new Set(path).size === 3 && path.every(Boolean)
  const steps: { family: string; value: number; holds: boolean; formula: string }[] = []
  let value = SEED
  for (const family of path) { if (!family) break; const s = stepOf(family, value); steps.push({ family, ...s }); value = s.value; if (!s.holds) break }
  return { path, distinct, steps, value: steps.length === 3 && steps.every((s) => s.holds) ? value : 0, holds: distinct && steps.length === 3 && steps.every((s) => s.holds) }
}

export class MerkabaFormulas {
  /** The mirror flow c → b → a: the second tetrahedron. */
  static mirror(a: number, b: number, c: number): CrossFormula { const r = flowOf(c, b, a); return f('merkaba-mirror', 'f_a(f_b(f_c(3)))', r.value, nat(a, b, c) && r.holds, 'mirror', [a, b, c], { steps: r.steps.map((s) => `${s.family}.${s.formula} = ${s.value}`) }) }
  /** The flow a → b → c from the seed 3: the value the third family reaches; holds when three distinct families each hold. */
  static trinity(a: number, b: number, c: number): CrossFormula { const r = flowOf(a, b, c); return f('merkaba-trinity', 'f_c(f_b(f_a(3)))', r.value, nat(a, b, c) && r.holds, 'trinity', [a, b, c], { steps: r.steps.map((s) => `${s.family}.${s.formula} = ${s.value}`) }) }
  /** The formation: the flow and its mirror meet at one value; that value, else 0. */
  static merkaba(a: number, b: number, c: number): CrossFormula { const up = flowOf(a, b, c), down = flowOf(c, b, a); const meet = up.holds && down.holds && up.value === down.value && up.value > 0; return f('merkaba-merkaba', 'f_c∘f_b∘f_a(3) = f_a∘f_b∘f_c(3)', meet ? up.value : 0, nat(a, b, c) && meet, 'merkaba', [a, b, c], { up: up.value, down: down.value }) }
  /** The spin of a pair of flows: 1 when the flow exceeds its mirror, 2 when the mirror exceeds the flow, 0 when they meet. */
  static spin(a: number, b: number, c: number): CrossFormula { const up = flowOf(a, b, c), down = flowOf(c, b, a); return f('merkaba-spin', 'sign(up − down)', up.value > down.value ? 1 : up.value < down.value ? 2 : 0, nat(a, b, c) && up.holds && down.holds, 'spin', [a, b, c]) }
  /** How many of the three edges hold, 0 to 3. */
  static steps(a: number, b: number, c: number): CrossFormula { const r = flowOf(a, b, c); return f('merkaba-steps', '|edges that hold|', r.steps.filter((s) => s.holds).length, nat(a, b, c) && r.distinct, 'steps', [a, b, c]) }
  /** THE DOUBLE TORUS: the flow run as a hex program with its mirror's address as referrer, and the mirror run with the
   *  flow's as referrer — two handles, each loop through the other. The value the flow reaches from every referrer
   *  perspective is one value; holds when both runs answer what the direct flow computes. */
  static async torus(a: number, b: number, c: number): Promise<CrossFormula> {
    const up = flowOf(a, b, c), down = flowOf(c, b, a)
    // the flow a → b → c is mirror(c, b, a); the mirror of (a, b, c) is the flow c → b → a
    const upHex = qpuHexUuidOf({ family: 'merkaba', program: ['mirror'], params: [c, b, a] }), downHex = qpuHexUuidOf({ family: 'merkaba', program: ['mirror'], params: [a, b, c] })
    const [viaDown, viaUp] = await Promise.all([hexRunOf(upHex, downHex, undefined, { store: false }), hexRunOf(downHex, upHex, undefined, { store: false })]) as { value?: unknown; holds?: boolean }[]
    const same = Number(viaDown?.value) === up.value && Number(viaUp?.value) === down.value
    return f('merkaba-torus', 'run(flow | referrer mirror) = flow ∧ run(mirror | referrer flow) = mirror', same ? up.value : 0, nat(a, b, c) && up.holds && down.holds && same, 'torus', [a, b, c], { up: up.value, down: down.value, viaDown: Number(viaDown?.value), viaUp: Number(viaUp?.value) })
  }
  /** THE TRINITY COIL: the first n flow families on a ring (the rosetta, every family's script around one stone);
   *  each family with its two neighbours is a trinity (i − 1, i, i + 1), and the n trinities around the ring are the
   *  coil. Value how many of the n trinities flow; holds when all do. */
  static coil(n: number): CrossFormula {
    const m = Math.min(n, flowFamiliesOf().length)
    const turns = m >= 3 ? Array.from({ length: m }, (_, i) => flowOf((i + m - 1) % m, i, (i + 1) % m)) : []
    return f('merkaba-coil', 'coil(n) = |{i < n : trinity(i − 1, i, i + 1) holds}| on the ring', turns.filter((t) => t.holds).length, nat(n) && m >= 3 && turns.every((t) => t.holds), 'coil', [n], { families: m, trinities: turns.map((t) => `${t.path.join('→')} = ${t.value}`).slice(0, 14) })
  }
  /** THE ROSETTA TURNED ONCE EACH WAY AROUND ONE AXIS: the seed passed through every one of the first n families in
   *  ring order (f_{n−1} ∘ … ∘ f_0), then the other way (f_0 ∘ … ∘ f_{n−1}). One turn forward crosses every family
   *  with the next, one turn back with the one before: every adjacent cross formula at once, 2n edges, instead of the
   *  n(n − 1)(n − 2) ordered triples. Value the forward value when both turns hold; holds then. */
  static rosetta(n: number): CrossFormula {
    const names = flowFamiliesOf().slice(0, Math.min(n, flowFamiliesOf().length))
    const turn = (order: string[]) => {
      const edges: string[] = []
      let value = SEED, holds = order.length >= 3
      for (const family of order) { const s = stepOf(family, value); edges.push(`${family}.${s.formula}(${value}) = ${s.value}`); value = s.value; if (!s.holds) { holds = false; break } }
      return { value: holds ? value : 0, holds, edges }
    }
    const forward = turn(names), back = turn([...names].reverse())
    return f('merkaba-rosetta', 'rosetta(n) = f_{n−1}∘…∘f_0(3), and f_0∘…∘f_{n−1}(3) the other way: 2n edges, every adjacent cross at once', forward.holds && back.holds ? forward.value : 0, nat(n) && forward.holds && back.holds, 'rosetta', [n], { families: names.length, edges: forward.edges.length + back.edges.length, forward: forward.value, back: back.value, crossed: [...forward.edges, ...back.edges].slice(0, 14) })
  }
  /** A LEAD DEVELOPED BY ONE ROTATION OF THE ROSETTA: the j-th formula of the a-th flow family at its family's step,
   *  the ring turned from start s (s < n forward, s ≥ n backward from s − n): the lead composes when the family before
   *  it gives a value it takes and the family after takes what it gives; it meets another family when a step
   *  elsewhere in the turn gives the value it gave. 2n addresses make all perspectives; a caller fires them at once.
   *  Value 1 when the lead composes in this rotation, else 0; holds when it composes or meets. */
  static develop(a: number, j: number, s: number): CrossFormula {
    const names = flowFamiliesOf()
    const family = names[a]
    const formula = family ? hexFamiliesOf().get(family)?.[j] : undefined
    const n = names.length
    if (!family || !formula || s >= 2 * n) return f('merkaba-develop', 'develop(a, j, s)', 0, false, 'develop', [a, j, s], { rotations: 2 * n })
    const at = (fam: string, value: number): { value: number; holds: boolean; formula: string } => {
      if (fam !== family) return stepOf(fam, value)
      const args = callArgs(formula.arity, value)
      if (!args) return { value: 0, holds: false, formula: formula.name }
      try { const r = formula.run(args); const v = numberOf(r); return { value: Number.isSafeInteger(v) && v >= 0 ? v : 0, holds: holdsOf(r) && Number.isSafeInteger(v) && v >= 0, formula: formula.name } } catch { return { value: 0, holds: false, formula: formula.name } }
    }
    const dir = s < n ? 1 : -1, start = s % n
    // SPLIT, NOT A SWEEP: a rotation of the rosetta is walked over a bounded hexbit window of the ring (hexbit^n = 64),
    // not all n families — a lead composes with its neighbours locally, so its slice is a window and the cost stays cool
    // (O(window), never O(families)). The 2n addresses are unchanged; only the walk inside each one is sliced.
    const L = latticeNamesOf()
    const window = Math.min(n, L.hexbit ** L.n)
    const order = Array.from({ length: window }, (_, k) => names[(start + dir * k + n * n) % n]!)
    const familyAt = order.indexOf(family) // precomputed once, not an O(n) scan per step
    let value = SEED, before: { holds: boolean } | undefined, given: number | undefined, composed = false
    const meets: string[] = []
    const edges: string[] = []
    for (let i = 0; i < order.length; i++) {
      const fam = order[i]!
      const step = at(fam, value)
      edges.push(`${fam}.${step.formula}(${value}) = ${step.holds ? step.value : '∅'}`)
      if (fam === family) { if (before?.holds && step.holds) given = step.value } else if (given !== undefined && step.holds && i === familyAt + 1) composed = true
      if (given !== undefined && step.holds && fam !== family && step.value === given && step.value >= 3) meets.push(`${fam} at ${step.value}`)
      before = { holds: step.holds }
      value = step.holds ? step.value : SEED
    }
    return f('merkaba-develop', `develop(${family}.${formula.name}, ${dir > 0 ? '→' : '←'}${start}) = [it composes with its neighbours in this rotation of the rosetta]`, composed ? 1 : 0, nat(a, j, s) && (composed || meets.length > 0), 'develop', [a, j, s], { family, lead: formula.name, rotation: `${dir > 0 ? '→' : '←'}${start}`, rotations: 2 * n, given, meets: meets.slice(0, 6), edges: edges.slice(0, 14) })
  }
  /** Among the first n flow families, how many ordered triples of distinct families flow to the end. */
  static flows(n: number): CrossFormula {
    const m = Math.min(n, flowFamiliesOf().length)
    let count = 0
    for (let a = 0; a < m; a++) for (let b = 0; b < m; b++) for (let c = 0; c < m; c++) if (a !== b && b !== c && a !== c && flowOf(a, b, c).holds) count++
    return f('merkaba-flows', '|{(a, b, c) distinct < n : trinity holds}|', count, nat(n) && m >= 3, 'flows', [n], { families: m })
  }
  /** The star: among the first n flow families, how many unordered triples form a merkaba. */
  static star(n: number): CrossFormula {
    const m = Math.min(n, flowFamiliesOf().length)
    const formed: string[] = []
    for (let a = 0; a < m; a++) for (let b = a + 1; b < m; b++) for (let c = b + 1; c < m; c++) { const up = flowOf(a, b, c), down = flowOf(c, b, a); if (up.holds && down.holds && up.value === down.value && up.value > 0) formed.push(`${up.path.join('→')} = ${up.value}`) }
    return f('merkaba-star', '|{{a, b, c} < n : merkaba forms}|', formed.length, nat(n) && m >= 3, 'star', [n], { families: m, formed: formed.slice(0, 14) })
  }
}

for (const name of ['coil', 'develop', 'flows', 'merkaba', 'mirror', 'rosetta', 'spin', 'star', 'steps', 'torus', 'trinity'] as const)
  hexRegisterOf('merkaba', name, (MerkabaFormulas[name] as (...x: unknown[]) => unknown).bind(MerkabaFormulas))
