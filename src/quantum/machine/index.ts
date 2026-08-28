// quantum/machine — RESOURCE BALANCING FOR THE DEVELOPMENT MACHINE, BY THE LEDGER'S LAWS (the
// captain's order, 2026-08-23: "create tools to handle resource balancing on development machine usable in
// mcp also"). The window balancer's sibling at the metal: a machine is a register too — cores as capacity,
// load as spend, memory as the second lane, the writers (walkers, test swarms, wranglers) as the cargo — and
// the SAME spare law judges it: SAFE_HEXBITS/UUID_HEXBITS = 13/32 free, the spare the uuid keeps, kept by
// the machine that minted it. ALL INTEGER (no floats: loads arrive ×100 as centi-load, memory in MB), all
// SELF-REPORT (the same honesty as the window balancer: an MCP tool cannot read your machine and never
// pretends to — the local gatherer measures at the scripts boundary and feeds the same pure function),
// verdict + fold order (heaviest writer first, priced) + receipt + 32-state compile. The night's own use
// case sealed the need: a walker judged "inactive" by eye was at full burn — this tool answers with permille
// instead of impressions (lead 113: probe, never assume).
import { toUuid } from '../../address.js'
import { hexbitDoorOf, SAFE_HEXBITS, UUID_HEXBITS } from '../../hexbit/index.js'

/** One running writer/process, as reported: name and centi-CPU (pcpu × 100, integer). */
export interface MachineWriter { name: string; centiCpu: number }

/** The machine's self-report — every figure an integer the caller measured (the gatherer script does this
 *  locally; over MCP the caller pastes their own numbers, the tool's honesty being that it asks). */
export interface MachineReport {
  cores: number            // logical cores
  centiLoad1: number       // 1-minute load average × 100
  memTotalMb: number
  memFreeMb: number
  writers?: MachineWriter[]
}

export interface WriterBalance extends MachineWriter { sharePermille: number }

export interface MachineBalance {
  cores: number
  loadPermille: number         // of total core capacity, ‰ (100 cores·centi = capacity)
  memFreePermille: number
  safeFloorPermille: number    // 13/32 in ‰ — the same spare law as the window
  cpuBalanced: boolean         // spare capacity ≥ the floor
  memBalanced: boolean
  balanced: boolean
  writers: WriterBalance[]     // heaviest first — the pause order if FOLD is the verdict
  verdict: string
  receipt: string
  hexbits: number[]
  honest: string
}

const idiv = (a: number, b: number): number => (a - (a % b)) / b
const permille = (part: number, whole: number): number => (whole > 0 ? idiv(part * 1000, whole) : 0)

/** balanceMachine(report) → the machine judged by the spare law: CPU spare and memory free each held to the
 *  sealed 13/32 floor; the writers ranked heaviest first so an over-budget machine knows exactly what to
 *  pause. Deterministic, integer-exact, receipt-addressed — the same report for the same numbers, anywhere. */
export function balanceMachine(r: MachineReport): MachineBalance {
  const capacityCenti = r.cores * 100
  const loadPermille = permille(r.centiLoad1, capacityCenti)
  const memFreePermille = permille(r.memFreeMb, r.memTotalMb)
  const safeFloorPermille = idiv(SAFE_HEXBITS * 1000, UUID_HEXBITS)
  const cpuBalanced = 1000 - loadPermille >= safeFloorPermille
  const memBalanced = memFreePermille >= safeFloorPermille
  const writers = (r.writers ?? [])
    .map((w) => ({ ...w, sharePermille: permille(w.centiCpu, capacityCenti) }))
    .sort((a, b) => b.centiCpu - a.centiCpu || (a.name < b.name ? -1 : 1))
  const heaviest = writers[0]
  const balanced = cpuBalanced && memBalanced
  const verdict = balanced
    ? `BALANCED — CPU spare ${1000 - loadPermille}‰ and memory free ${memFreePermille}‰ both hold the unit's spare law (${SAFE_HEXBITS}/${UUID_HEXBITS} = ${safeFloorPermille}‰): the machine keeps the same spare the uuid keeps`
    : `FOLD — ${cpuBalanced ? '' : `CPU spare ${1000 - loadPermille}‰ under the ${safeFloorPermille}‰ floor`}${!cpuBalanced && !memBalanced ? '; ' : ''}${memBalanced ? '' : `memory free ${memFreePermille}‰ under the floor`}${heaviest ? ` — pause heaviest first: ${heaviest.name} (${heaviest.sharePermille}‰ of the machine)` : ''} — one writer at a time is the whole point`
  const receipt = toUuid('machine-balance|' + r.cores + '|' + r.centiLoad1 + '|' + r.memTotalMb + '|' + r.memFreeMb + '|' + writers.map((w) => `${w.name}:${w.centiCpu}`).join(','))
  return {
    cores: r.cores, loadPermille, memFreePermille, safeFloorPermille, cpuBalanced, memBalanced, balanced,
    writers, verdict, receipt, ...hexbitDoorOf(receipt),
    honest: 'The figures are the caller\'s self-report — over MCP this tool cannot read a machine and never pretends to; locally the gatherer measures at the scripts boundary and feeds this same pure function. The arithmetic on the report is exact: integer permille, the sealed ' + SAFE_HEXBITS + '/' + UUID_HEXBITS + ' spare floor on both lanes, the pause order deterministic.',
  }
}
