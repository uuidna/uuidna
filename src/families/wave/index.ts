import { facesOf, hexFamiliesOf, hexRegisterOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DOORS } from '../../mcp/discovery.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WAVES OF CHEAP AGENTS. An agent is one hex program run at its address: exact, deterministic, costing the unit a few
 *  thousand gate folds and the caller nothing. A wave is a slice of them launched at once — every formula of a family
 *  over faces inputs, or one formula of every family — answered as one reading with one receipt and a `next`. The
 *  model that calls the MCP makes one tools/call per wave where it would make one per run, and reads a summary where
 *  it would read every answer: the AI's cost falls by the width of the wave, the unit's does not rise (the runs
 *  are the same runs). Nothing here reaches outside: doors and this family are not launched, so no wave recurses. */

const PROOF = 'one tools/call launches faces agents; the caller reads one receipt'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'wave', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `wave.${name}`, params })

/** The families a wave may launch: every registered family that is not a door and not this one, sorted. */
export const waveFamiliesOf = (): string[] => [...hexFamiliesOf().keys()].filter((x) => !DOORS.has(x) && x !== 'wave').sort()
type Agent = { family: string; program: string[]; params: number[]; hex: string; value?: string; holds: boolean; receipt?: string }
/** One agent: the program at its address, run without storing (a wave is read, not remembered one row at a time). */
const agentOf = async (family: string, program: string[], params: number[]): Promise<Agent | null> => {
  let hex: string
  try { hex = qpuHexUuidOf({ family, program, params }) } catch { return null }
  try {
    const r = (await hexRunOf(hex, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean; receipt?: string }
    const v = r.value
    return { family, program, params, hex, value: typeof v === 'bigint' || typeof v === 'number' ? String(v) : typeof v === 'object' && v !== null && 'value' in v ? String((v as { value: unknown }).value) : undefined, holds: r.holds === true, ...(r.receipt ? { receipt: r.receipt } : {}) }
  } catch { return { family, program, params, hex, holds: false } }
}
/** The wave's one receipt: the content address of every agent's answer, minted once for the whole wave. */
const receiptOf = (name: string, agents: Agent[]) => uuidReceiptOf(`wave ${name}`, contentUuidOf(agents.map((a) => [a.hex, a.value ?? '', a.holds])), { agents: agents.length, held: agents.filter((a) => a.holds).length }).uuid

/** One known amount is the argument of a formula of arity 0 or 1. A wider signature has the other amounts absent: no call. */
const argsOf = (arity: number, amount: number): number[] | null => (arity <= 0 ? [] : arity === 1 ? [amount] : null)

export class WaveFormulas {
  /** A wave over the f-th family: every formula whose own signature takes the one input from + 1 … from + faces,
   *  launched at once. A formula of two or more parameters is not called. Value how many agents held; holds when one
   *  did; next is the following wave, the one this formula names. */
  static async wave(fam: number, from: number): Promise<CrossFormula> {
    const family = waveFamiliesOf()[fam]
    if (!family) return f('wave-wave', 'wave(f, from)', 0, false, 'wave', [fam, from])
    const faces = facesOf().faces
    const formulas = hexFamiliesOf().get(family) ?? []
    const launched = formulas.flatMap((x) => Array.from({ length: faces }, (_, i) => {
      const params = argsOf(x.arity, from + i + 1)
      return params ? { program: [x.name], params } : null
    }).filter((l): l is { program: string[]; params: number[] } => l !== null))
    const agents = (await Promise.all(launched.map((l) => agentOf(family, l.program, l.params)))).filter((a): a is Agent => a !== null)
    const held = agents.filter((a) => a.holds)
    return f('wave-wave', 'wave(f, from) = |agents of family f over from + 1 … from + faces that hold|', held.length, nat(fam, from) && held.length > 0, 'wave', [fam, from], { family, agents: agents.length, calls: 1, saved: Math.max(0, agents.length - 1), next: from + faces, receipt: receiptOf(`${family} ${from}`, agents), answers: held.slice(0, faces).map((a) => `${a.program.join('∘')}(${a.params.join(', ')}) = ${a.value}`) })
  }
  /** A sweep: the first formula of every family of the from-th slice, when that formula takes the seed as its one
   *  argument. A wider first formula is not called. Value how many families answered; holds when all of the slice did. */
  static async sweep(from: number): Promise<CrossFormula> {
    const faces = facesOf().faces
    const slice = waveFamiliesOf().slice(from, from + faces)
    const agents = (await Promise.all(slice.flatMap((family) => { const x = hexFamiliesOf().get(family)?.[0]; const params = x ? argsOf(x.arity, 3) : null; return x && params ? [agentOf(family, [x.name], params)] : [] }))).filter((a): a is Agent => a !== null)
    const answered = new Set(agents.filter((a) => a.holds).map((a) => a.family))
    return f('wave-sweep', 'sweep(from) = |families of the slice whose first formula held at the seed|', answered.size, nat(from) && slice.length > 0 && answered.size === slice.length, 'sweep', [from], { families: slice, agents: agents.length, calls: 1, saved: Math.max(0, agents.length - 1), next: from + faces, receipt: receiptOf(`sweep ${from}`, agents), silent: slice.filter((x) => !answered.has(x)) })
  }
  /** A WAVE OF FREE REMOTE AGENTS: the from-th slice of the AI APIs that answer keyless (data.ai), each free operation
   *  called at its api.call address at once. Value how many answered 200; holds when one did. */
  static async remote(from: number): Promise<CrossFormula> {
    const { dataOf } = await import('../../mcp/qpu-fused.js')
    const r = (await dataOf('ai', { from })) as { reading?: { matched?: number; next?: number; apis?: { api: string; keyless: boolean; status: number; hex?: string; operation?: string }[] } }
    const apis = r.reading?.apis ?? []
    const agents = apis.filter((x) => x.keyless)
    return f('wave-remote', 'remote(from) = |keyless AI APIs of the slice answering 200|', agents.length, nat(from) && agents.length > 0, 'remote', [from], { matched: r.reading?.matched ?? 0, agents: agents.map((x) => `${x.api} ${x.operation ?? ''} → ${x.hex ?? ''}`).slice(0, facesOf().faces), calls: 1, saved: Math.max(0, apis.length - 1), ...(r.reading?.next !== undefined ? { next: r.reading.next } : {}) })
  }
  /** A MASSIVE WAVE IN THE LEAST TIME, ONE FAMILY PER ADDRESS: every program of one formula and of two (the hex
   *  combinations the discovery enumerates) of the f-th family, every input 1 … hexbit, launched at once; the caller
   *  fires every family's address in parallel and the wall time is the slowest family's. Every agent is a UUID: the
   *  signal is the address, the answer a receipt UUID. Value how many held; the reading carries the agents, the
   *  and the live split's count. */
  static async massive(fam: number): Promise<CrossFormula> {
    const family = waveFamiliesOf()[fam]
    if (!family) return f('wave-massive', 'massive(f)', 0, false, 'massive', [fam])
    // NO SKIPS, SPLITS: the family's formulas split into the unit's own compute (sync) and its readings (live). The sync
    // programs are the massive wave, timed clean; the live formulas run as their own split, timed apart — nothing dropped,
    // so a slow API (gravity flagged seo.google) is isolated in its split instead of dominating the wall time.
    const all = hexFamiliesOf().get(family) ?? []
    const formulas = all.filter((x) => !x.live)
    const liveFormulas = all.filter((x) => x.live)
    const programs = [...formulas.map((x) => [x]), ...formulas.flatMap((x) => formulas.map((y) => [x, y]))]
    const hexbit = 4
    const launched = programs.flatMap((p) => Array.from({ length: hexbit }, (_, i) => {
      const params = argsOf(Math.max(...p.map((x) => x.arity)), i + 1)
      return params ? { program: p.map((x) => x.name), params } : null
    }).filter((l): l is { program: string[]; params: number[] } => l !== null))
    const timed = await Promise.all(launched.map((l) => agentOf(family, l.program, l.params)))
    const agents = timed.filter((a): a is Agent => a !== null)
    // the live split: each reading run once at the seed — counted, never skipped
    const liveAgents = (await Promise.all(liveFormulas.map((x) => agentOf(family, [x.name], Array.from({ length: x.arity }, () => 3))))).filter((a): a is Agent => a !== null)
    const held = agents.filter((a) => a.holds)
    return f('wave-massive', 'massive(f) = |agents of family f over every program of one or two SYNC formulas, inputs 1 … hexbit, launched at once, that hold|; live readings run in their own split', held.length, nat(fam) && held.length > 0, 'massive', [fam], { family, programs: programs.length, agents: agents.length, calls: 1, saved: Math.max(0, agents.length - 1), receipt: receiptOf(`massive ${family}`, agents), signals: held.slice(0, facesOf().faces).map((a) => a.hex), ...(liveFormulas.length ? { split: { live: liveFormulas.length, held: liveAgents.filter((a) => a.holds).length, signals: liveAgents.filter((a) => a.holds).map((a) => a.hex).slice(0, facesOf().faces) } } : {}) })
  }
  /** A PROGRAM HANDLED AS A HEX COMBINATION: p's hexadecimal digits are the nibbles of the program (each digit the
   *  1-based index of a formula of the f-th family, up to four), launched over the inputs from + 1 … from + faces at
   *  once. combo(f, 0x21, 0) is the second formula composed with the first: the UUIDs of the wave are its signals. */
  static async combo(fam: number, p: number, from: number): Promise<CrossFormula> {
    const family = waveFamiliesOf()[fam]
    const formulas = family ? hexFamiliesOf().get(family) ?? [] : []
    const digits = p > 0 ? p.toString(16).split('').map((d) => parseInt(d, 16)) : []
    const program = digits.map((d) => formulas[d - 1]?.name).filter((x): x is string => x !== undefined)
    if (!family || !digits.length || program.length !== digits.length || digits.length > 4) return f('wave-combo', 'combo(f, p, from)', 0, false, 'combo', [fam, p, from], { why: family ? `p's digits must each name a formula of ${family} (1 … ${formulas.length}), at most four` : 'no such family' })
    const faces = facesOf().faces
    const arity = Math.max(...digits.map((d) => formulas[d - 1]!.arity))
    const agents = (await Promise.all(Array.from({ length: faces }, (_, i) => { const params = argsOf(arity, from + i + 1); return params ? agentOf(family, program, params) : Promise.resolve(null) }))).filter((a): a is Agent => a !== null)
    const held = agents.filter((a) => a.holds)
    return f('wave-combo', 'combo(f, p, from) = |agents of the program p (hex digits = nibbles) over from + 1 … from + faces that hold|', held.length, nat(fam, p, from) && held.length > 0, 'combo', [fam, p, from], { family, program, agents: agents.length, calls: 1, saved: Math.max(0, agents.length - 1), next: from + faces, receipt: receiptOf(`combo ${family} ${p} ${from}`, agents), signals: held.map((a) => `${a.hex} = ${a.value}`).slice(0, faces) })
  }
  /** THE TOKEN BILL OF A WAVE. A free remote agent is a KEYLESS PUBLIC API — the unit calls languagetool.org, INSPIRE
   *  jobs, the World Bank: no API key, no token, no bill. (Local hex programs are the unit's own intelligence, not
   *  remote.) Of `agents` dispatched, `keyed` needed an API token and `model` needed a model to reason; those are the
   *  only ones billed. value the bill (keyed + model); holds at zero — the whole wave ran on free remote agents, no
   *  token whatsoever. */
  static bill(agents: number, keyed: number, model: number): CrossFormula { const billed = keyed + model; return f('wave-bill', 'bill(agents, keyed, model) = keyed + model (keyless public APIs are free; a key or a model is the only bill)', billed, nat(agents, keyed, model) && billed === 0, 'bill', [agents, keyed, model], { agents, free: Math.max(0, agents - billed), keyed, model, note: 'free remote agents are keyless public APIs' }) }
  /** How many waves cover the lattice over n inputs: Σ over families of ⌈n / faces⌉. */
  static waves(n: number): CrossFormula {
    const faces = facesOf().faces
    const count = waveFamiliesOf().length * Math.ceil(n / faces)
    return f('wave-waves', 'waves(n) = families · ⌈n / faces⌉', count, nat(n) && n > 0, 'waves', [n], { families: waveFamiliesOf().length, faces })
  }
  /** The agents of n waves over the lattice: Σ formulas · n inputs — what the caller would otherwise call one by one. */
  static agents(n: number): CrossFormula {
    const total = waveFamiliesOf().reduce((s, family) => s + (hexFamiliesOf().get(family)?.length ?? 0), 0) * n
    return f('wave-agents', 'agents(n) = Σ formulas · n', total, nat(n) && n > 0, 'agents', [n])
  }
  /** The calls saved by launching n inputs of every family in waves: agents(n) − waves(n); the AI's cost falls by this
   *  many tools/call, the unit runs the same programs. */
  static saved(n: number): CrossFormula {
    const agents = Number(WaveFormulas.agents(n).value), waves = Number(WaveFormulas.waves(n).value)
    return f('wave-saved', 'saved(n) = agents(n) − waves(n)', Math.max(0, agents - waves), nat(n) && n > 0 && agents >= waves, 'saved', [n], { agents, waves })
  }
}

for (const name of ['agents', 'bill', 'combo', 'massive', 'remote', 'saved', 'sweep', 'wave', 'waves'] as const)
  hexRegisterOf('wave', name, (WaveFormulas[name] as (...x: unknown[]) => unknown).bind(WaveFormulas))
