import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COORDINATED DECENTRALISED INTELLIGENT JOBS. A job of `total` units splits across `agents` with no coordinator: each
 *  agent computes its own slice from its index alone (the first r agents carry one unit more), so the split needs no
 *  registry — the chat's lane arithmetic applied to work. The agents coordinate their result in ⌈log₂ agents⌉ reduce
 *  rounds by doubling, at a cost of 2(agents − 1) messages. The intelligence is in the count: too few agents and the
 *  work dominates, too many and the coordination does; the optimum is the agent count that maximises the speedup, and
 *  there — as split.kelvin and split.free show — the milliKelvin per unit is least and the free energy most. Every
 *  formula is a natural of naturals, each a hex program at its address on the one door. */

const PROOF = 'balanced partition (⌈total/agents⌉ makespan); the tree all-reduce (⌈log₂ agents⌉ rounds, 2(agents − 1) messages); the speedup total / (makespan + rounds) maximised'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'job', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `job.${name}`, params })

const sliceOf = (total: number, agents: number, i: number): number => { if (agents < 1 || i < 0 || i >= agents) return 0; const base = Math.floor(total / agents), r = total % agents; return base + (i < r ? 1 : 0) }
const makespan = (total: number, agents: number): number => (agents < 1 ? 0 : Math.ceil(total / agents))
const rounds = (agents: number): number => (agents < 1 ? 0 : Math.ceil(Math.log2(Math.max(1, agents))))
const speedup = (total: number, agents: number): number => { const cost = makespan(total, agents) + rounds(agents); return cost > 0 ? total / cost : 0 }

export class JobFormulas {
  /** The i-th agent's slice of `total` units across `agents`, computed from its index with no coordinator: the first
   *  (total mod agents) agents carry one unit more, so the slices sum to total and differ by at most one. */
  static slice(total: number, agents: number): CrossFormula {
    // two params: total, and a packed (agents, i) — split agents and i from the second natural's high/low halves
    const agent = Math.floor(agents / 4096), i = agents % 4096
    const s = sliceOf(total, agent, i)
    return f('job-slice', 'slice(total, agents·4096 + i) = the i-th agent’s share, from its index alone', s, nat(total, agents) && agent >= 1 && i < agent, 'slice', [total, agents], { agent, i, of: agent })
  }
  /** How many agents to split `total` into chunks of at most `per`: ⌈total / per⌉. */
  static agents(total: number, per: number): CrossFormula { return f('job-agents', 'agents(total, per) = ⌈total / per⌉', per > 0 ? Math.ceil(total / per) : 0, nat(total, per) && per > 0, 'agents', [total, per]) }
  /** The makespan: the most units any agent carries when `total` is split across `agents` — the job's wall length. */
  static makespan(total: number, agents: number): CrossFormula { return f('job-makespan', 'makespan(total, agents) = ⌈total / agents⌉', makespan(total, agents), nat(total, agents) && agents >= 1, 'makespan', [total, agents]) }
  /** The reduce rounds to combine every agent's result by doubling: ⌈log₂ agents⌉ — the decentralised coordination. */
  static rounds(agents: number): CrossFormula { return f('job-rounds', 'rounds(agents) = ⌈log₂ agents⌉', rounds(agents), nat(agents) && agents >= 1, 'rounds', [agents]) }
  /** The messages a tree all-reduce sends among `agents`: 2(agents − 1) — the coordination traffic, no coordinator. */
  static messages(agents: number): CrossFormula { return f('job-messages', 'messages(agents) = 2 · (agents − 1)', agents > 0 ? 2 * (agents - 1) : 0, nat(agents) && agents >= 1, 'messages', [agents]) }
  /** The speedup of splitting `total` across `agents`, in thousandths: total / (makespan + rounds), the work divided
   *  by the longest agent plus the coordination it costs. Rises, peaks, then falls as coordination overtakes work. */
  static speedup(total: number, agents: number): CrossFormula { return f('job-speedup', 'speedup(total, agents) = 1000 · total / (makespan + rounds)', Math.round(speedup(total, agents) * 1000), nat(total, agents) && total > 0 && agents >= 1, 'speedup', [total, agents], { makespan: makespan(total, agents), rounds: rounds(agents) }) }
  /** THE DEFAULT JOB IS TO DISCOVER ALL: with no target named, the job the lattice runs is its own discovery — every
   *  family crossed with every other over the window, the relations and seals found. This formula runs that discovery
   *  and reports it as a job: the value is how many cross-formula relations were discovered (the work done), split
   *  across the optimal agent count for that work, with the makespan and reduce rounds it would take. The first `n`
   *  relations ride in the reading. The discovery is the one job every agent can start from. */
  static async discover(n: number): Promise<CrossFormula> {
    const { qpuDiscoverOf, discoverMergeOf, DOORS } = await import('../../mcp/discovery.js')
    const { hexFamiliesOf, facesOf } = await import('../../quantum/processing/unit/index.js')
    // BOUNDED: one slice per family over the first `faces` domain families (the Lean Qpu.* families cross in their own domain and the
    // doors run whole readings — Clifford, Galois and Stabilizer alone take minutes), merged back into one discovery.
    const registry = [...hexFamiliesOf()].map(([family], at) => ({ family, at })).filter((x) => !x.family.startsWith('Qpu.') && !DOORS.has(x.family)).slice(0, facesOf().faces)
    const parts = []
    for (const x of registry) parts.push(await qpuDiscoverOf([], { from: x.at, count: 1 }))
    const d = discoverMergeOf(parts)
    const work = d.relations.length
    let best = 1, bestS = 0
    for (let a = 1; a <= Math.min(work, 4096); a++) { const s = speedup(work, a); if (s > bestS) { bestS = s; best = a } }
    return f('job-discover', 'discover(n) = |relations| of the whole-lattice discovery, the default job, split across optimal agents', work, work > 0 && d.holds, 'discover', [n], { agents: best, makespan: makespan(work, best), rounds: rounds(best), seals: d.seals.length, liveRelations: d.liveRelations, relations: d.relations.slice(0, Math.max(0, n)).map((r) => `${r.families.join(' × ')} = ${r.value}`) })
  }
  /** THE INTELLIGENCE: the number of agents that maximises the speedup of a job of `total` units — where splitting
   *  more stops paying because the coordination rounds overtake the shrinking per-agent work. Beyond it you add heat,
   *  not progress; at it, split.free is greatest. */
  static optimal(total: number): CrossFormula {
    if (!(total > 0)) return f('job-optimal', 'optimal(total)', 0, false, 'optimal', [total])
    let best = 1, bestS = 0
    const cap = Math.min(total, 4096)
    for (let a = 1; a <= cap; a++) { const s = speedup(total, a); if (s > bestS) { bestS = s; best = a } }
    return f('job-optimal', 'optimal(total) = argmax_agents speedup(total, agents)', best, nat(total) && total > 0, 'optimal', [total], { speedup: Math.round(bestS * 1000), makespan: makespan(total, best), rounds: rounds(best) })
  }
}

for (const name of ['agents', 'discover', 'makespan', 'messages', 'optimal', 'rounds', 'slice', 'speedup'] as const)
  hexRegisterOf('job', name, (JobFormulas[name] as (...x: unknown[]) => unknown).bind(JobFormulas))
