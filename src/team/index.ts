// team — WHICH TEAM AN APPLICATION OF ANY TYPE ACTUALLY NEEDS, derived from the sealed ledger.
//
// THE QUESTION. "What skills does building this take, and how many people is that?" is normally answered by
// someone writing a list. Every hand-written list in this repository has rotted the same way, and a team list
// rots worse than most: it is read as authority by whoever is hiring or learning, and nothing in it can be
// checked. So nothing here is authored per application. The capability axis is already carried by the wings
// (a skill groups sealed theorems by what they demonstrate), and the RELATION between capabilities is already
// carried by the ledger's own names (a theorem citing another theorem's key). A team is computed from those.
//
// WHAT MAKES IT A TEAM AND NOT A LIST. Two capabilities belong to the SAME SEAT when the work in one cites the
// work in the other: the seam between them has to be held by somebody, and splitting them puts that seam
// between two people where it belongs inside one head. Capabilities with no citation path between them are
// genuinely separable, and that is what a second seat means. So the SIZE of a team is not a preference — it is
// the number of connected components of the citation graph restricted to what the application needs. An
// application whose needs all fall in one component gains nothing from a second person, because every pair of
// its capabilities has a citation path between them and the seam would land between two heads. That is a
// finding about the work, not about the people.
//
// WHAT THIS IS NOT. It is not a hiring recommendation, a competence assessment, or a claim that anyone is
// qualified for anything. A seat says: these sealed capabilities are entangled by citation, and something in
// this application needs them. It says nothing about who can fill it. The ESCO leg names what a capability is
// CALLED in the European Commission's taxonomy and never that any authority recognises or accredits it — the
// same rule the skills axis carries. And a capability the ledger cannot staff is reported as a GAP rather than
// quietly dropped, because the honest answer to "can this tree build that?" is often no.
import { SKILLS, skillGroups, type Theorem } from '../theorems/index.js'
import { skillCitationGraph, componentsOf, citersOf } from '../citations/index.js'
import { SKILL_SHELF, DEFAULT_SHELF } from '../quantum/apps/skill-shelf.js'
import { escoPhrase } from '../skills.js'
import { toUuid, merkleFold } from '../address.js'
import { handleOf } from '../handle.js'

const HONEST =
  'A TEAM here is a partition of sealed capability, not a staffing plan. A seat groups skills the ledger\'s own ' +
  'citation graph entangles — the work in one cites the work in the other, so the seam between them belongs ' +
  'inside one head. The seat COUNT is therefore a property of the work, not a choice: it is the number of ' +
  'connected components of that graph restricted to what was asked for. Nothing here judges a person, claims ' +
  'anyone is qualified, or asserts that any authority recognises these capabilities. A need with no sealed ' +
  'skill behind it is reported as a GAP, never absorbed into a neighbouring seat to make the answer look whole.'

/** normalise for matching: skill keys are hyphenated (`z9-ring`, `science-pairs`), needs arrive as words */
const words = (s: string): string[] => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean)

/** skillsFor(need) → the sealed skills a need term names. WHOLE WORDS ONLY, which is the homograph rule the
 *  ESCO leg already carries: `os` must not match `close`, and `crt` must not match `secret`. */
export function skillsFor(need: string): string[] {
  const want = words(need)
  if (want.length === 0) return []
  return SKILLS.filter((skill) => {
    const have = new Set(words(skill))
    return want.some((w) => have.has(w))
  }).sort()
}

export interface TeamSeat {
  /** the seat's name: its largest skill, which is the capability the seat is mostly about */
  seat: string
  skills: string[]
  theorems: number
  /** the learning order INSIDE the seat: most-cited first, because a foundation is what others rest on */
  learningOrder: string[]
  /** where a person practises this capability in the browser */
  shelf: { route: string; mount: string; label: string }
  /** what this capability is CALLED in the EU taxonomy — a vocabulary map, never an accreditation */
  escoPhrases: string[]
  handle: string
}

export interface TeamComposition {
  need: string[]
  seats: TeamSeat[]
  /** needs the sealed ledger carries no capability for — named, never absorbed */
  gaps: string[]
  matchedSkills: number
  /** the seat count IS the component count; stated so nobody reads it as a preference */
  seatsAreComponents: true
  receipt: string
  honest: string
}

/** teamFor(need) → the team an application of any type needs, computed from the ledger. `need` is whatever
 *  describes the application: its domain words, its features, its stack. Nothing is authored per application. */
export function teamFor(need: readonly string[] | string): TeamComposition {
  const needs = (typeof need === 'string' ? [need] : [...need]).map((n) => String(n).trim()).filter(Boolean)
  const matched = new Set<string>()
  const gaps: string[] = []
  for (const n of needs) {
    const hits = skillsFor(n)
    if (hits.length === 0) gaps.push(n)
    for (const h of hits) matched.add(h)
  }
  const groups = new Map(skillGroups().map((g) => [g.skill, g]))
  const cited = citersOf()
  const components = componentsOf([...matched], skillCitationGraph())

  const seats: TeamSeat[] = components.map((skills) => {
    const theoremsIn: Theorem[] = skills.flatMap((s) => groups.get(s)?.theorems ?? [])
    // the seat is NAMED by its largest skill — the capability it is mostly about. Ties break by name so the
    // answer does not depend on the order the components happened to be walked.
    const seat = [...skills].sort((a, b) => (groups.get(b)?.count ?? 0) - (groups.get(a)?.count ?? 0) || (a < b ? -1 : 1))[0]!
    // most-cited first: a key many others cite is what the rest rests on, so it is where a person starts
    const order = [...theoremsIn]
      .sort((a, b) => (cited.get(b.key)?.length ?? 0) - (cited.get(a.key)?.length ?? 0) || (a.key < b.key ? -1 : 1))
      .slice(0, 8)
      .map((t) => t.key)
    const receipt = merkleFold([toUuid('team-seat|' + seat), ...skills.map((s) => toUuid('skill|' + s))])
    return {
      seat,
      skills,
      theorems: theoremsIn.length,
      learningOrder: order,
      shelf: SKILL_SHELF[seat] ?? DEFAULT_SHELF,
      escoPhrases: skills.map(escoPhrase),
      handle: handleOf(receipt),
    }
  })

  return {
    need: needs,
    seats,
    gaps,
    matchedSkills: matched.size,
    seatsAreComponents: true,
    receipt: merkleFold([
      toUuid('team|' + needs.join('|')),
      ...seats.map((s) => toUuid('seat|' + s.seat + '|' + s.skills.join(','))),
      ...gaps.map((g) => toUuid('gap|' + g)),
    ]),
    honest: HONEST,
  }
}

/** teamSize(need) → just the number of seats. Kept separate because the count is the answer people want and
 *  the reason it is not a choice is the thing they most need told: it is a component count. */
export const teamSize = (need: readonly string[] | string): number => teamFor(need).seats.length
