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
import { anchors, type Finding } from '../../research-ledger.js'
import { forensics } from '../../forensics.js'
import { merkleGravity } from '../../gravity/index.js'

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
  /** ONE CLOSED INSTANCE OF THE SAME KIND — the proof that this kind of work closes, cited so it can be opened.
   *
   *  The captain, 2026-09-27: "Proof of concept and work formulas in mcp and ui is enough to train any intelligence
   *  no matter artificial or not." A mission carried the work formula — an exact deliverable and the door it deposits
   *  through — and no proof that the formula has ever produced anything. `keys` is empty on a finding BY CONSTRUCTION,
   *  because the theorem does not exist yet, so a learner met the instruction with nothing to compare it against and
   *  no way to tell a task that closes from one nobody has ever closed.
   *
   *  So every row now carries a WORKED precedent: an instance of its own kind that is already closed, derived from the
   *  same inputs this board is built from and costing no new read. seal-finding shows a finding that points at a sealed
   *  theorem — the rows the loop above skips; decide-bound shows a bound the census judged load-bearing, which is what
   *  naming the domain looks like once it is done; symbol-leg shows a theorem whose symbol leg is present. Null where
   *  the tree holds no closed instance yet, WITH the reason, because "none exists" and "none was looked for" are
   *  different facts and a learner must not read the second as the first. */
  worked: { how: string; cite: string } | null
  /** NO LEAD REMAINS UNTAGGED (the captain, 2026-10-03): "leads that do not cross check after all possible effort to
   *  involute perspective appear to be lies or manipulations, and there are cross formulas for them." Every row
   *  carries the verdict of its own cross formula — the doors this tree already serves, fused to one receipt:
   *    crossed    — every leg of the formula holds: the lead reads the same from the other side
   *    uncrossed  — a leg fails after the effort the record shows: the primary could not be read, the claim is
   *                 REFUTED or forensics finds a violation, or the theorem's own address does not recompute. The
   *                 class to distrust, by the captain's law — tagged, never deleted, so the distrust is visible
   *    open       — the formula's second leg is owed and nothing has failed: the work the mission names IS the cross
   *  The field is REQUIRED on the type, which is what makes "no lead untagged" a compile error and not a wish. */
  tag: 'crossed' | 'uncrossed' | 'open'
  /** the cross formula that decided the tag: its legs, each with what it asked and whether it held, FUSED by
   *  merkleGravity to one order-invariant receipt anyone recomputes from the same records */
  cross: { formula: string; legs: readonly { leg: string; holds: boolean; why: string }[]; receipt: string }
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
  /** the tag census — sums to total by construction, which the test asserts rather than assumes */
  byTag: Record<Mission['tag'], number>
  missions: Mission[]
  captain: string
  honest: string
}

const MISSION_DOORS: Record<MissionKind, string> = {
  'seal-finding': 'uuidna_trial the claim, then a Lean line in the wing that owns the value; set the finding\'s `theorem` field to close it',
  'decide-bound': 'uuidna_theorem <key>, widen the bound yourself; either NAME the domain in the prose (load-bearing by name) or restate the statement without List.range',
  'symbol-leg': 'add the js: mirror keyed to the theorem in the wing emitter; rosetta grants the symbol leg on the next pass',
}

// ── THE CROSS FORMULAS, ONE PER KIND, USING THE DOORS THIS TREE SERVES ──────────────────────────────────────────
// A finding is crossed by two legs that can each FAIL: its PRIMARY source was read (anchors — the research ledger's
// own law), and FORENSICS finds no violation in the claim (a fabricated citation, an overreach). A theorem-backed lead (a bound,
// a missing leg) is crossed on one leg every theorem has: its content-address RECOMPUTES from key and statement
// (ledgerFacts().forged is the list of those that do not — tampered or forged DNA, the manipulation the conformance
// gate exists for). Its second perspective — naming the finite domain, writing the symbol leg — is the mission
// itself, so with the address sound the lead is OPEN, not uncrossed; with the address unsound nothing it says can be
// crossed, and it is tagged. The legs are fused with merkleGravity: the same legs in any order give one receipt.
type Leg = { leg: string; holds: boolean; why: string }
const fuse = (formula: string, legs: readonly Leg[]): Mission['cross'] =>
  ({ formula, legs, receipt: merkleGravity(legs.map((l) => toUuid(`${l.leg}|${l.holds}|${l.why}`))) })

const crossFinding = (f: Finding): { tag: Mission['tag']; cross: Mission['cross'] } => {
  // NOT adjudicate(): its verdict is VERIFIED | UNVERIFIED and UNVERIFIED means unproven, never false — a leg on it
  // could never fail honestly and would tag every open finding uncrossed, which is the vacuity this tree refuses. The
  // signal adjudicate carries that CAN fail is a fabricated citation, and forensics asks exactly that, plus overreach.
  const fx = forensics(f.claim)
  const legs: Leg[] = [
    { leg: 'primary-read', holds: anchors(f), why: `status ${f.status}: ${anchors(f) ? 'the primary source was retrieved and the figure read from its own text' : 'the primary was not read after the develop steps the record shows — secondary or unread'}` },
    { leg: 'forensics-clean', holds: fx.violations.length === 0, why: fx.violations.length === 0 ? 'no violation' : fx.violations.map((x) => x.kind).join(', ') },
  ]
  return { tag: legs.every((l) => l.holds) ? 'crossed' : 'uncrossed', cross: fuse('primary-read ∧ forensics-clean', legs) }
}

const crossTheorems = (keys: readonly string[], forged: ReadonlySet<string>, owed: string): { tag: Mission['tag']; cross: Mission['cross'] } => {
  const bad = keys.filter((k) => forged.has(k))
  const legs: Leg[] = [
    { leg: 'address-recomputes', holds: bad.length === 0, why: bad.length === 0 ? `every one of ${keys.length} address(es) recomputes from key and statement` : `${bad.length} address(es) do not recompute: ${bad.slice(0, 3).join(', ')}` },
    { leg: owed, holds: false, why: 'owed — this is the mission; it is not a failure until the record shows the effort was made and it did not cross' },
  ]
  return { tag: bad.length ? 'uncrossed' : 'open', cross: fuse(`address-recomputes ∧ ${owed}`, legs) }
}

const MISSION_HONEST = 'Every lead carries its tag — crossed, uncrossed or open — decided by the cross formula fused in its own `cross` field, from the doors this tree serves (anchors, adjudicate, forensics, the address that recomputes); an uncrossed lead is kept and marked, never deleted, because the distrust has to be visible to be checked. Derived, not adjudicated: a mission is a record that is open (a finding with no theorem, a bound that survived one widening step, a rosetta row without its symbol leg). Nothing here verdicts the work; the doors do. The bound rows are a LOWER BOUND from one widening step: a survivor is one sample, and silence never refutes (theorem silence_never_refutes) — only a person restating the theorem without its bound settles that the bound was decorative. When a record closes, its mission leaves the board by recomputation.'

const missionHandle = (kind: MissionKind, wing: string, title: string): string => handleOf(toUuid(`mission|${kind}|${wing}|${title}`))

const byWing = <T extends { wing: string; key: string }>(rows: readonly T[]): Map<string, string[]> => {
  const m = new Map<string, string[]>()
  for (const r of rows) m.set(r.wing, [...(m.get(r.wing) ?? []), r.key])
  return new Map([...m.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)))
}

/** missionsOf(records) → the board. Pure over its inputs; the same records give the same rows in the same order. */
/** workedOf(input) → one closed instance per kind, read off the very inputs the board is built from.
 *
 *  Derived rather than authored, so a precedent cannot go stale against the tree it is drawn from: each is the FIRST
 *  row of its own kind that is already in the state its mission asks for. Sorted by key or claim so the answer is the
 *  same for anyone who recomputes it — a precedent that changed between two readers would teach two different lessons. */
function workedOf(input: { rows: readonly Rosetta[]; bounds: BoundSlice; findings: readonly Finding[] }): Record<MissionKind, Mission['worked']> {
  const sealed = input.findings.filter((f) => f.theorem).sort((a, b) => a.claim.localeCompare(b.claim))[0]
  const bearing = input.bounds.rows.filter((r) => r.verdict === 'load-bearing').sort((a, b) => a.key.localeCompare(b.key))[0]
  const symbolled = input.rows.filter((r) => r.legs.includes('symbol')).sort((a, b) => a.key.localeCompare(b.key))[0]
  return {
    'seal-finding': sealed
      ? { how: 'a research finding closed by sealing its value as a theorem and pointing the finding at it', cite: `theorem ${String(sealed.theorem)} anchors "${sealed.claim.slice(0, 90)}"` }
      : null,
    'decide-bound': bearing
      ? { how: 'a bounded statement whose bound the census judged LOAD-BEARING — the domain is named and the bound carries the claim, which is what closing this kind looks like', cite: `theorem ${bearing.key} in ${bearing.wing}` }
      : null,
    'symbol-leg': symbolled
      ? { how: 'a theorem whose symbol leg is present — the Lean line has its TypeScript mirror, so the two can disagree and be caught', cite: `theorem ${symbolled.key} in ${symbolled.wing}` }
      : null,
  }
}

export function missionsOf(input: {
  rows: readonly Rosetta[]
  bounds: BoundSlice
  findings: readonly Finding[]
  captain: string
  /** the keys whose address does not recompute — ledgerFacts().forged; the one leg every theorem-backed lead has */
  forged?: readonly string[]
  kind?: MissionKind | null
  wing?: string | null
  limit?: number | null
}): MissionBoard {
  const forged = new Set(input.forged ?? [])
  const missions: Mission[] = []
  // one precedent per kind, computed once from these same inputs — every row of a kind cites the same closed instance,
  // because the lesson is the KIND's own proof of concept and not a per-row curiosity
  const worked = workedOf(input)

  for (const f of input.findings) {
    if (f.theorem) continue
    const title = f.claim
    missions.push({
      handle: missionHandle('seal-finding', 'research ledger', title), kind: 'seal-finding', wing: 'research ledger', title,
      deliverable: `seal ${f.value} ${f.units} (${f.kind}, ${f.status} source: ${f.source}) as a theorem, and point the finding at it`,
      keys: [], door: MISSION_DOORS['seal-finding'], count: 1, worked: worked['seal-finding'],
      ...crossFinding(f),
    })
  }

  const survived = input.bounds.rows.filter((r) => r.verdict === 'survived-widening')
  for (const [wing, keys] of byWing(survived)) {
    const title = `decide ${keys.length} surviving bound${keys.length === 1 ? '' : 's'} in ${wing}`
    missions.push({
      handle: missionHandle('decide-bound', wing, title), kind: 'decide-bound', wing, title,
      deliverable: `${keys.length} statement${keys.length === 1 ? '' : 's'} in ${wing} survived one widening step: for each, either name the finite domain in the prose or restate without the bound`,
      keys, door: MISSION_DOORS['decide-bound'], count: keys.length, worked: worked['decide-bound'],
      ...crossTheorems(keys, forged, 'domain-named'),
    })
  }

  const noSymbol = input.rows.filter((r) => r.missing.includes('symbol'))
  for (const [wing, keys] of byWing(noSymbol)) {
    const title = `give ${keys.length} theorem${keys.length === 1 ? '' : 's'} in ${wing} the symbol leg`
    missions.push({
      handle: missionHandle('symbol-leg', wing, title), kind: 'symbol-leg', wing, title,
      deliverable: `${keys.length} theorem${keys.length === 1 ? '' : 's'} in ${wing} ${keys.length === 1 ? 'has' : 'have'} no js: mirror in the emitter — the TypeScript computation the Lean line is checked against`,
      keys, door: MISSION_DOORS['symbol-leg'], count: keys.length, worked: worked['symbol-leg'],
      ...crossTheorems(keys, forged, 'symbol-leg-written'),
    })
  }

  const byKind: Record<MissionKind, number> = { 'seal-finding': 0, 'decide-bound': 0, 'symbol-leg': 0 }
  const byTag: Record<Mission['tag'], number> = { crossed: 0, uncrossed: 0, open: 0 }
  for (const m of missions) { byKind[m.kind]++; byTag[m.tag]++ }

  let out = missions
  if (input.kind) out = out.filter((m) => m.kind === input.kind)
  if (input.wing) { const w = String(input.wing).toLowerCase(); out = out.filter((m) => m.wing.toLowerCase() === w || m.wing.toLowerCase() === `${w}.lean`) }
  if (input.limit != null && Number.isInteger(input.limit) && input.limit >= 0) out = out.slice(0, input.limit)

  return { total: missions.length, byKind, byTag, missions: out, captain: input.captain, honest: MISSION_HONEST }
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
