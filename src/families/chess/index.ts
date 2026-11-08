import { foldOf, hexDecodeOf, hexFamiliesOf, hexRegisterOf, qpuHexUuidOf, latticeNamesOf, recognizeOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { KinFormulas } from '../kin/index.js'
import { LawFormulas } from '../law/index.js'
import '../court/index.js'

const L = { ...latticeNamesOf() }

/** CHESS — THE GAME TREE AS ARITHMETIC. A position is numbers: material on the board, the moves a side has, the branching
 *  factor of the search, the nodes a full tree holds, the tempo spent, the score in centipawns, the perft count at a depth,
 *  and the pressure on a king. Crosses to `combinatorics` — chess is counting over a tree. A measure. */

const PROOF = 'chess arithmetic (material, mobility, branching, tree nodes, tempo, centipawns, perft, king safety); the game tree counted exactly; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chess', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `chess.${name}`, params })

export class ChessFormulas {
  /** MATERIAL: a count of a piece at its value. value count · value. */
  static material(count: number, value: number): CrossFormula { return c('chess-material', 'material(count, value) = count · value', count * value, nat(count, value), 'material', [count, value]) }
  /** MOBILITY: the move advantage of one side over the other. value max(0, white − black). */
  static mobility(white: number, black: number): CrossFormula { return c('chess-mobility', 'mobility(white, black) = max(0, white − black)', Math.max(0, white - black), nat(white, black), 'mobility', [white, black]) }
  /** BRANCHING: the average legal moves per position searched. value ⌊moves / positions⌋. */
  static branching(moves: number, positions: number): CrossFormula { return c('chess-branching', 'branching(moves, positions) = ⌊moves / positions⌋', positions > 0 ? Math.floor(moves / positions) : 0, nat(moves, positions) && positions > 0, 'branching', [moves, positions]) }
  /** PLY TO NODES: a full tree of the given branching to the given ply. value Σ branchingⁱ, i = 0..ply. */
  static plytonodes(branching: number, ply: number): CrossFormula { return c('chess-plytonodes', 'plytonodes(branching, ply) = (branching^(ply+1) − 1) / (branching − 1)', branching - 1 > 0 ? (Math.pow(branching, ply + 1) - 1) / (branching - 1) : 0, nat(branching, ply) && branching > 1, 'plytonodes', [branching, ply]) }
  /** TEMPO: full moves from plies at a given plies-per-move. value ⌊plies / perMove⌋. */
  static tempo(plies: number, perMove: number): CrossFormula { return c('chess-tempo', 'tempo(plies, perMove) = ⌊plies / perMove⌋', perMove > 0 ? Math.floor(plies / perMove) : 0, nat(plies, perMove) && perMove > 0, 'tempo', [plies, perMove]) }
  /** CENTIPAWNS: a pawn score with its hundredths. value pawns · 100 + cents. */
  static centipawns(pawns: number, cents: number): CrossFormula { return c('chess-centipawns', 'centipawns(pawns, cents) = pawns · 100 + cents', pawns * 100 + cents, nat(pawns, cents) && cents < 100, 'centipawns', [pawns, cents]) }
  /** PERFT: the leaf count of a uniform tree at a depth. value branching^depth. */
  static perft(branching: number, depth: number): CrossFormula { return c('chess-perft', 'perft(branching, depth) = branching^depth', Math.pow(branching, depth), nat(branching, depth), 'perft', [branching, depth]) }
  /** KING SAFETY: the attackers a king faces over its defenders. value max(0, attackers − defenders). */
  static kingsafety(attackers: number, defenders: number): CrossFormula { return c('chess-kingsafety', 'kingsafety(attackers, defenders) = max(0, attackers − defenders)', Math.max(0, attackers - defenders), nat(attackers, defenders), 'kingsafety', [attackers, defenders]) }
}

for (const name of ['branching', 'centipawns', 'kingsafety', 'material', 'mobility', 'perft', 'plytonodes', 'tempo'] as const)
  hexRegisterOf('chess', name, (ChessFormulas[name] as (...x: unknown[]) => unknown).bind(ChessFormulas))

/** How far `kin.vortex` walks before its first digit returns. The play reads that length from the formula. */
const vortexPeriodOf = (): number => {
  const origin = KinFormulas.vortex(L.n - L.n).value
  let k = L.seed
  while (KinFormulas.vortex(k).value !== origin) k += L.seed
  return k
}

/** The court address of one digit against the other: law.fidelity, minted, not written by hand. */
const courtAddressOf = (ordered: number, computed: number): string => {
  const row = LawFormulas.fidelity(ordered, computed)
  return row.hex ?? qpuHexUuidOf({ family: 'law', program: ['fidelity'], params: [ordered, computed] })
}

/** One reply of the vortex play. Side A says the digit at `at`. Side B says the digit before it. Both sides follow
 *  `kin.vortex` (1, 2, 4, 8, 7, 5, then 1). The court integers are law.fidelity of those two digits, law.redirected
 *  of the same pair, and law.lawful of the floor. The step holds when the two digits agree and the floor holds.
 *  `next` is the address of the following digit's court. Call again with the following index. */
export interface ChessCourtStep {
  a: number
  b: number
  fidelity: number
  redirected: number
  lawful: number
  holds: boolean
  hex: string
  formula: string
  value: number
  next: string
}

export const chessCourtStepOf = (at: number): ChessCourtStep => {
  const period = vortexPeriodOf()
  const a = KinFormulas.vortex(at).value
  const b = KinFormulas.vortex(at + period - L.seed).value
  const fidelity = LawFormulas.fidelity(a, b)
  const redirected = LawFormulas.redirected(a, b)
  const floor = LawFormulas.lawful(L.n - L.n)
  const nextA = KinFormulas.vortex(at + L.seed).value
  const agreed = fidelity.value === L.seed
  return {
    a,
    b,
    fidelity: fidelity.value,
    redirected: redirected.value,
    lawful: floor.value,
    holds: agreed && floor.holds,
    hex: fidelity.hex ?? courtAddressOf(a, b),
    formula: fidelity.formula,
    value: fidelity.value,
    next: courtAddressOf(nextA, a),
  }
}

/** One closed lap: call the step until its court address returns. The step function itself still returns a next address. */
const orbitOf = (): ChessCourtStep[] => {
  const first = chessCourtStepOf(L.n - L.n)
  const orbit = [first]
  let at = L.seed
  for (;;) {
    const step = chessCourtStepOf(at)
    if (step.hex === first.hex) return orbit
    orbit.push(step)
    at += L.seed
  }
}

/** The first n vortex digits, read from the formula. Here that is 1, 2, 4. */
const vortexPrefixOf = (): number[] => {
  const prefix: number[] = []
  for (let i = L.n - L.n; i < L.n; i++) prefix.push(KinFormulas.vortex(i).value)
  return prefix
}

/** Whether `prefix` sits in `row` as a contiguous run. */
const runInside = (row: number[], prefix: number[]): boolean => {
  const span = prefix.length
  for (let i = L.n - L.n; i + span <= row.length; i++) {
    let same = true
    for (let j = L.n - L.n; j < span; j++) if (row[i + j] !== prefix[j]) same = false
    if (same) return true
  }
  return false
}

export interface ChessCourtAddress {
  family: string
  name: string
  params: number[]
  value: number
  holds: boolean
  hex: string
  next?: string
}

interface FormulaReading {
  value: number
  holds: boolean
  hex?: string
  formula?: string
}

/** The next address a false hold already opens, read by recognition. One lead, one next. */
const openedLeadOf = (row: FormulaReading): string | undefined => {
  if (row.holds !== false || !row.hex) return undefined
  const led = recognizeOf(row) as { recognition?: { next?: { uuid?: string } } }
  const uuid = led.recognition?.next?.uuid
  return uuid && uuid !== row.hex ? uuid : undefined
}

/** The pattern of one vortex lap, and every law or court address the lap's digits determine.
 *  A false hold carries the next address recognition names. reviewed is not called. */
export interface ChessCourtPattern {
  holds: boolean
  value: number
  formula: string
  hex: string
  next: string
  orbit: { a: number; b: number; fidelity: number; redirected: number; holds: boolean; hex: string; next: string }[]
  remainder: number[]
  prefix: number[]
  prefixHolds: boolean
  floor: { value: number; holds: boolean; hex: string }
  neighborhood: ChessCourtAddress[]
}

export const chessCourtPatternOf = (): ChessCourtPattern => {
  const orbit = orbitOf()
  const remainder = orbit.map((step) => step.redirected)
  const prefix = vortexPrefixOf()
  const prefixHolds = runInside(remainder, prefix)
  const floorRow = LawFormulas.lawful(L.n - L.n)
  const floorHex = floorRow.hex ?? qpuHexUuidOf({ family: 'law', program: ['lawful'], params: [L.n - L.n] })
  const neighborhood: ChessCourtAddress[] = []
  const families = ['law', 'court'] as const
  for (const family of families) {
    const formulas = hexFamiliesOf().get(family) ?? []
    for (const formula of formulas) {
      if (formula.name === 'reviewed') continue
      const calls: { params: number[]; step?: ChessCourtStep }[] = []
      if (formula.name === 'lawful') calls.push({ params: [L.n - L.n] })
      else if (formula.arity === L.seed) for (const step of orbit) calls.push({ params: [step.a], step })
      else if (formula.arity === L.coins) for (const step of orbit) calls.push({ params: [step.a, step.b], step })
      else if (formula.arity === L.n) for (let i = L.n - L.n; i < orbit.length; i++) {
        const step = orbit[i]!
        const ahead = orbit[(i + L.seed) % orbit.length]!
        calls.push({ params: [step.a, step.b, ahead.a], step })
      }
      for (let i = L.n - L.n; i < calls.length; i++) {
        const call = calls[i]!
        const raw = formula.run(call.params.map((p) => BigInt(p))) as FormulaReading
        const hex = raw.hex ?? qpuHexUuidOf({ family, program: [formula.name], params: call.params })
        const fidelity = formula.name === 'fidelity'
        const holds = fidelity ? call.step!.holds : raw.holds === true
        const value = fidelity ? call.step!.fidelity : Number(raw.value)
        const onwardParams = calls[(i + L.seed) % calls.length]!.params
        const onward = qpuHexUuidOf({ family, program: [formula.name], params: onwardParams })
        let next: string | undefined
        if (!holds) {
          if (fidelity) next = call.step!.next
          else next = openedLeadOf({ ...raw, hex, holds: false }) ?? (onward !== hex ? onward : undefined)
        }
        neighborhood.push({ family, name: formula.name, params: call.params, value, holds, hex, ...(next ? { next } : {}) })
      }
    }
  }
  const first = orbit[L.n - L.n]!
  return {
    holds: first.holds,
    value: first.fidelity,
    formula: first.formula,
    hex: first.hex,
    next: first.next,
    orbit: orbit.map((step) => ({ a: step.a, b: step.b, fidelity: step.fidelity, redirected: step.redirected, holds: step.holds, hex: step.hex, next: step.next })),
    remainder,
    prefix,
    prefixHolds,
    floor: { value: floorRow.value, holds: floorRow.holds, hex: floorHex },
    neighborhood,
  }
}

/** One address, run. Fidelity holds only when the two digits agree. reviewed is never called. */
const runAddressOf = (uuid: string): ChessCourtAddress => {
  const decoded = hexDecodeOf(uuid)
  if (!decoded.holds || !('family' in decoded) || !decoded.family) throw new Error(`no court at ${uuid}`)
  const name = decoded.program[L.n - L.n]
  if (!name || name === 'reviewed') throw new Error(`reviewed is not run at ${uuid}`)
  const formula = hexFamiliesOf().get(decoded.family)?.find((row) => row.name === name)
  if (!formula) throw new Error(`no formula ${decoded.family}.${name}`)
  const raw = formula.run(decoded.params.map((p) => BigInt(p))) as FormulaReading
  const value = Number(raw.value)
  const holds = name === 'fidelity' ? value === L.seed : raw.holds === true
  return { family: decoded.family, name, params: decoded.params, value, holds, hex: raw.hex ?? uuid }
}

/** The next formula of the same arity that does not hold, same digits. reviewed is skipped, not run. */
const familyLeadOf = (family: string, name: string, params: number[]): string | undefined => {
  const formulas = hexFamiliesOf().get(family)
  if (!formulas) return undefined
  const at = formulas.findIndex((row) => row.name === name)
  if (at < L.n - L.n) return undefined
  const here = qpuHexUuidOf({ family, program: [name], params })
  for (let step = L.seed; step < formulas.length; step++) {
    const formula = formulas[(at + step) % formulas.length]!
    if (formula.name === 'reviewed' || formula.arity !== params.length) continue
    const raw = formula.run(params.map((p) => BigInt(p))) as FormulaReading
    if (raw.holds !== false) continue
    const hex = raw.hex ?? qpuHexUuidOf({ family, program: [formula.name], params })
    if (hex !== here) return hex
  }
  return undefined
}

const digitAtOf = (digit: number): number => {
  const period = vortexPeriodOf()
  for (let i = L.n - L.n; i < period; i++) if (KinFormulas.vortex(i).value === digit) return i
  return L.n - L.n - L.seed
}

/** Same formula, next vortex step, when no other formula of these digits fails. */
const onwardAddressOf = (run: ChessCourtAddress): string => {
  const at = digitAtOf(run.params[L.n - L.n]!)
  if (at < L.n - L.n) return run.hex
  const nextA = KinFormulas.vortex(at + L.seed).value
  if (run.params.length === L.seed) return qpuHexUuidOf({ family: run.family, program: [run.name], params: [nextA] })
  if (run.params.length === L.coins) return qpuHexUuidOf({ family: run.family, program: [run.name], params: [nextA, run.params[L.n - L.n]!] })
  const ahead = KinFormulas.vortex(at + L.seed + L.seed).value
  return qpuHexUuidOf({ family: run.family, program: [run.name], params: [run.params[L.coins]!, run.params[L.n - L.n]!, ahead] })
}

/** Where a false hold goes next. One address. */
const followOf = (run: ChessCourtAddress): string | undefined => {
  if (run.holds) return undefined
  if (run.name === 'fidelity') return courtAddressOf(KinFormulas.vortex(digitAtOf(run.params[L.n - L.n]!) + L.seed).value, run.params[L.n - L.n]!)
  const opened = familyLeadOf(run.family, run.name, run.params)
  if (opened && opened !== run.hex) return opened
  const onward = onwardAddressOf(run)
  return onward !== run.hex ? onward : undefined
}

/** One further step for every lead's next address. Each row is that address, run, and the single address after it when it does not hold. */
export const chessCourtWaveOf = (pattern: ChessCourtPattern = chessCourtPatternOf()): ChessCourtAddress[] =>
  pattern.neighborhood.filter((row) => row.holds === false && row.next).map((row) => {
    const run = runAddressOf(row.next!)
    const next = followOf(run)
    return { ...run, ...(next ? { next } : {}) }
  })

/** One reply. Recognition leads, and its fold is the whole neighborhood. */
export const chessCourtSeenOf = (): unknown => recognizeOf(chessCourtPatternOf())

/** The fold of the pattern, so the addresses are one document. */
export const chessCourtFoldOf = (pattern: ChessCourtPattern = chessCourtPatternOf()): string => foldOf(JSON.stringify(pattern))
