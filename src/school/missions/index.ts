// missions — THE MISSION BOARD, DERIVED. Open work with an exact deliverable, one row per thing a person can close.
//
// prove2.me (Next.js on Vercel, 2026) shows a formalisation effort as MISSIONS: one card per open Lean statement
// with a status, a field, a captain (the proposer there) and a claim-and-submit flow. The question put to this
// tree on 2026-09-07 was whether to move its payload into a CMS to get that shape. Refused (lead 224): a CMS is a
// manual door into content that is derived here, and its database would be a second copy of the ledger that must
// agree with it. What was worth keeping is the SHAPE, and every part of it already exists as a record:
//
//   seal-finding  — a research finding with no `theorem` field: a read primary source whose value nothing seals yet
//   decide-bound  — a theorem whose finite bound SURVIVED one widening step (bound-perturbation): a person must
//                   decide whether the domain is the real one (name it in the prose) or decorative (restate without
//                   it); the instrument cannot, and says so
//   symbol-leg    — a theorem whose rosetta row lacks the symbol leg: no js: mirror in the wing emitter yet
//
// Findings are one mission each (28 rows is a board a person can read). Bounds and legs are one mission PER WING,
// carrying the keys — 503 and 3,952 rows would be a survey, not a board, and abundance is not failure: the count is
// the size of the unsealed structure, shown as the wing-level task it is.
//
// The captain here is the paying handle (docs/captain-claims.json's captain_authority), not a proposer: every
// mission's deliverable is a two-coin deposit through the doors this tree already serves, never a form. Nothing is
// authored: the rows recompute from the shipped mirror, the sealed bound census and the baked findings, so a
// mission leaves the board by recomputation when its record closes — the same law as open-questions.
import { handleOf } from '../../handle.js'
import { toUuid } from '../../address.js'
import type { Rosetta } from '../../rosetta-legs.js'
import type { Finding } from '../../research-ledger.js'

export type MissionKind = 'seal-finding' | 'decide-bound' | 'symbol-leg'
export const MISSION_KINDS: readonly MissionKind[] = ['seal-finding', 'decide-bound', 'symbol-leg'] as const

export interface Mission {
  /** handleOf(toUuid(kind|wing|title)) — the mission's own address, stable while its record is open */
  handle: string
  kind: MissionKind
  /** the wing (Xxx.lean) the work lands in, or `research ledger` for a finding */
  wing: string
  title: string
  /** what closes it, in one sentence a person can act on */
  deliverable: string
  /** the theorem keys the mission covers (empty for a finding — the theorem does not exist yet) */
  keys: readonly string[]
  /** the served door the deposit goes through */
  door: string
  /** how many records this row covers */
  count: number
}

/** one bounded theorem's verdict row, as sealed by scripts/gen-bound-census into lean/bound-census.json */
export interface BoundRow { key: string; wing: string; verdict: 'survived-widening' | 'load-bearing' | 'base-undecidable' | 'undecidable-widened' }
export interface BoundSlice {
  /** digest of (instrument source, every bounded statement) the rows were decided under — a lagging slice is named */
  digest: string
  rows: readonly BoundRow[]
}

export interface MissionBoard {
  total: number
  byKind: Record<MissionKind, number>
  missions: Mission[]
  captain: string
  honest: string
}

export const MISSION_DOORS: Record<MissionKind, string> = {
  'seal-finding': 'uuidna_trial the claim, then a Lean line in the wing that owns the value; set the finding\'s `theorem` field to close it',
  'decide-bound': 'uuidna_theorem <key>, widen the bound yourself; either NAME the domain in the prose (load-bearing by name) or restate the statement without List.range',
  'symbol-leg': 'add the js: mirror keyed to the theorem in the wing emitter; rosetta grants the symbol leg on the next pass',
}

export const MISSION_HONEST = 'Derived, not adjudicated: a mission is a record that is open (a finding with no theorem, a bound that survived one widening step, a rosetta row without its symbol leg). Nothing here verdicts the work; the doors do. The bound rows are a LOWER BOUND from one widening step: a survivor is one sample, and silence never refutes (theorem silence_never_refutes) — only a person restating the theorem without its bound settles that the bound was decorative. When a record closes, its mission leaves the board by recomputation.'

const missionHandle = (kind: MissionKind, wing: string, title: string): string => handleOf(toUuid(`mission|${kind}|${wing}|${title}`))

const byWing = <T extends { wing: string; key: string }>(rows: readonly T[]): Map<string, string[]> => {
  const m = new Map<string, string[]>()
  for (const r of rows) m.set(r.wing, [...(m.get(r.wing) ?? []), r.key])
  return new Map([...m.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)))
}

/** missionsOf(records) → the board. Pure over its inputs; the same records give the same rows in the same order. */
export function missionsOf(input: {
  rows: readonly Rosetta[]
  bounds: BoundSlice
  findings: readonly Finding[]
  captain: string
  kind?: MissionKind | null
  wing?: string | null
  limit?: number | null
}): MissionBoard {
  const missions: Mission[] = []

  for (const f of input.findings) {
    if (f.theorem) continue
    const title = f.claim
    missions.push({
      handle: missionHandle('seal-finding', 'research ledger', title), kind: 'seal-finding', wing: 'research ledger', title,
      deliverable: `seal ${f.value} ${f.units} (${f.kind}, ${f.status} source: ${f.source}) as a theorem, and point the finding at it`,
      keys: [], door: MISSION_DOORS['seal-finding'], count: 1,
    })
  }

  const survived = input.bounds.rows.filter((r) => r.verdict === 'survived-widening')
  for (const [wing, keys] of byWing(survived)) {
    const title = `decide ${keys.length} surviving bound${keys.length === 1 ? '' : 's'} in ${wing}`
    missions.push({
      handle: missionHandle('decide-bound', wing, title), kind: 'decide-bound', wing, title,
      deliverable: `${keys.length} statement${keys.length === 1 ? '' : 's'} in ${wing} survived one widening step: for each, either name the finite domain in the prose or restate without the bound`,
      keys, door: MISSION_DOORS['decide-bound'], count: keys.length,
    })
  }

  const noSymbol = input.rows.filter((r) => r.missing.includes('symbol'))
  for (const [wing, keys] of byWing(noSymbol)) {
    const title = `give ${keys.length} theorem${keys.length === 1 ? '' : 's'} in ${wing} the symbol leg`
    missions.push({
      handle: missionHandle('symbol-leg', wing, title), kind: 'symbol-leg', wing, title,
      deliverable: `${keys.length} theorem${keys.length === 1 ? '' : 's'} in ${wing} ${keys.length === 1 ? 'has' : 'have'} no js: mirror in the emitter — the TypeScript computation the Lean line is checked against`,
      keys, door: MISSION_DOORS['symbol-leg'], count: keys.length,
    })
  }

  const byKind: Record<MissionKind, number> = { 'seal-finding': 0, 'decide-bound': 0, 'symbol-leg': 0 }
  for (const m of missions) byKind[m.kind]++

  let out = missions
  if (input.kind) out = out.filter((m) => m.kind === input.kind)
  if (input.wing) { const w = String(input.wing).toLowerCase(); out = out.filter((m) => m.wing.toLowerCase() === w || m.wing.toLowerCase() === `${w}.lean`) }
  if (input.limit != null && Number.isInteger(input.limit) && input.limit >= 0) out = out.slice(0, input.limit)

  return { total: missions.length, byKind, missions: out, captain: input.captain, honest: MISSION_HONEST }
}

/** A SCHOOL THAT TRAINS INNOVATORS ROUTES PRACTICE INTO OPEN WORK (the captain, 2026-09-13). The curriculum is the ledger
 *  by skill and the open work is this board; they meet at the wing a theorem lives in and a mission lands in. Derived both
 *  ways from the records, never typed: each skill's open missions, and each mission's preparing skills. A mission whose
 *  wing no skill covers (a research finding, whose theorem is the deliverable itself) is UNROUTED and named. */
export interface SkillRoute { skill: string; theorems: number; wings: number; missions: number; first: string | null }
/** receipt: one address folded from every skill→mission route, order-invariant, so the path is recomputable by anyone */
export interface InnovationPath { skills: SkillRoute[]; prepares: Record<string, string[]>; unrouted: string[]; receipt: string }

const addTo = (m: Map<string, Set<string>>, k: string, v: string): void => {
  const s = m.get(k) ?? new Set<string>()
  s.add(v)
  m.set(k, s)
}

export function innovationPathOf(missions: readonly Mission[], rows: readonly { file: string; skill: string }[]): InnovationPath {
  const skillsOfWing = new Map<string, Set<string>>()
  const wingsOfSkill = new Map<string, Set<string>>()
  const theoremsOfSkill = new Map<string, number>()
  for (const r of rows) {
    addTo(skillsOfWing, r.file, r.skill)
    addTo(wingsOfSkill, r.skill, r.file)
    theoremsOfSkill.set(r.skill, (theoremsOfSkill.get(r.skill) ?? 0) + 1)
  }
  const prepares: Record<string, string[]> = {}
  const unrouted: string[] = []
  const openOfSkill = new Map<string, Mission[]>()
  for (const m of missions) {
    const skills = [...(skillsOfWing.get(m.wing) ?? [])].sort()
    if (skills.length === 0) { unrouted.push(m.handle); continue }
    prepares[m.handle] = skills
    for (const s of skills) openOfSkill.set(s, [...(openOfSkill.get(s) ?? []), m])
  }
  const skills = [...wingsOfSkill.keys()].map((skill) => {
    const open = openOfSkill.get(skill) ?? []
    return { skill, theorems: theoremsOfSkill.get(skill) ?? 0, wings: wingsOfSkill.get(skill)!.size, missions: open.length, first: open[0]?.handle ?? null }
  }).sort((a, b) => b.missions - a.missions || (a.skill < b.skill ? -1 : 1))
  const routes = Object.entries(prepares).flatMap(([handle, ss]) => ss.map((s) => `${s}|${handle}`)).sort()
  return { skills, prepares, unrouted, receipt: toUuid(`innovation-path\n${routes.join('\n')}\nunrouted|${[...unrouted].sort().join(',')}`) }
}
