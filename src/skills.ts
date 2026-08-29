// skills — THE CAPABILITY AXIS, SERVED. A theorem is meant to be a hook and hooked at once: reachable from the live
// API through the skill it carries. It was not. Measured against the served catalogue, most of the skills the sealed
// ledger carries matched no tool name and no category — sequence, involution, z9-ring, z7-rosette, clay-reflection,
// foundational, neuro and science-pairs among them. Those theorems were sealed, axiom-free, witnessed by their wings,
// and served by nothing.
//
// THE FIX IS ONE COMPUTED SURFACE. Fifty authored tools would be fifty places to forget: every
// hand-kept list in this repository has rotted the same way, and the skill set is not even authored here — it is
// carried by the wings, so it MOVES. So the axis is served as a DIMENSION. One tool takes a skill and returns its
// theorems with their handles and its ESCO mapping; one enumerates every skill with its count so the surface is
// discoverable; and `orphanedSkills` measures the intersection BY CALLING a served dispatch, so a new skill arriving
// in Lean is served the day it lands or the guard names it. Nothing below is authored per skill.
//
// WHAT THE ESCO MAPPING IS AND IS NOT. src/school-apis.ts wired ESCO — the European Commission's own taxonomy of
// skills, competences and occupations — for exactly this join, and carried the homograph rule that makes the join
// honest. The mapping here is a POINTER and a RULE, both pure: the exact URL the live fetcher would call, and the
// whole-name predicate that decides which returned concept may be kept. Nothing here reaches the network, so the
// tool is deterministic and Workers-safe; the caller fetches through uuidna_school_apis and hands the titles back
// to be judged by the same published rule, rather than the rule being re-invented at the call site.
//
// HONEST SCOPE: a skill groups theorems by the CAPABILITY they demonstrate — an axis orthogonal to `principle`. The
// ESCO leg says what a skill IS CALLED in a European vocabulary; it is never a claim that anyone recognises,
// accredits, or would employ what is sealed here. Integrity.
import { skillGroups, type Theorem } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf } from './handle.js'
import { escoSearchUrl, escoWholeName, SCHOOL_APIS } from './school-apis.js'
import { domainLab, type DomainLab } from './school/laboratory/index.js'

const HONEST =
  'A skill groups sealed theorems by the CAPABILITY they demonstrate — an axis ORTHOGONAL to principle (which groups ' +
  'by derivation file). Every theorem in a group is `by decide`, kernel-verified sorry-free, witnessed by its wing; ' +
  'the group folds order-invariantly to one receipt anyone recomputes. The ESCO leg is a MAP BETWEEN VOCABULARIES: ' +
  'it says what this capability is CALLED in the European Commission\'s own taxonomy, and NEVER that any authority ' +
  'recognises, accredits or would employ anything sealed here (theorem provenance_integrity_not_content_truth). ' +
  'No network is reached by this surface — the ESCO leg is a pure pointer plus the published whole-name rule, so the ' +
  'same call folds to the same receipt for anyone, offline. Integrity.'

/** The tool names that must serve the capability axis, on BOTH surfaces (the stdio catalogue and the hosted edge).
 *  Named here rather than in either server, so the finder holds one list against two registrations. */
export const SKILL_TOOLS: readonly string[] = ['uuidna_skill', 'uuidna_skills']

/** The searchable phrase for a skill key — the cluster names are hyphenated (`z9-ring`, `science-pairs`), and a
 *  taxonomy is asked in words. Pure and total: any string maps, nothing is looked up. */
export const escoPhrase = (skill: string): string => String(skill).replace(/-+/g, ' ').trim()

const escoSource = () => SCHOOL_APIS.find((s) => s.id === 'esco')

/** A skill's mapping onto the EU taxonomy: where to ask, and which answer may be kept. */
export interface SkillEscoMapping {
  source: 'esco'
  taxonomy: string
  phrase: string
  lookup: string        // the exact URL the live fetcher calls — derived by school-apis
  address: string       // the content-address of that lookup, so two callers cite the same query
  rule: string          // the homograph rule, stated
  fetchWith: string     // the one hop that actually reaches ESCO (a NAMED network boundary
  pairWith: string      // the walk from this skill to the occupations ESCO relates it to
  onTopic: readonly string[]     // of the titles handed in, those carrying the skill's WHOLE name
  homographs: readonly string[]  // and those that merely share its letters — returned by name
  honest: string
}

/** skillEsco(skill, titles) → the pure ESCO mapping for one skill. `titles` are concept titles the caller already
 *  fetched (through uuidna_school_apis); they are judged by school-apis' OWN whole-name rule rather than by a copy
 *  of it, so the acceptance law has one implementation. Passing none returns the pointer alone. */
export function skillEsco(skill: string, titles: readonly string[] = []): SkillEscoMapping {
  const phrase = escoPhrase(skill)
  const lookup = escoSearchUrl(phrase, 'skill')
  const src = escoSource()
  const judged = titles.map(String)
  return {
    source: 'esco',
    taxonomy: src ? src.name : 'ESCO',
    phrase,
    lookup,
    address: toUuid(lookup),
    rule:
      'A lexical hit is on-topic only if the skill\'s FULL name appears as a whole token sequence in the concept ' +
      'title. A search GUARANTEES the query\'s letters come back, so a fragment hit carries no information — this is ' +
      'school-apis\' own published rule (escoWholeName), applied here.',
    fetchWith: `uuidna_school_apis { "source": "esco", "text": ${JSON.stringify(phrase)} }`,
    pairWith: `uuidna_education_jobs { "subject": ${JSON.stringify(skill)} }`,
    onTopic: judged.filter((t) => escoWholeName(phrase, t)),
    homographs: judged.filter((t) => !escoWholeName(phrase, t)),
    honest: src ? src.honest : 'the ESCO source is not in the wired registry',
  }
}

/** One sealed theorem as the skill surface serves it: its identity, its Lean line, and the handle it is stored under. */
export interface SkillTheorem {
  key: string; name: string; statement: string; tactic: string; file: string; principle: string
  lean: string; address: string; handle: string
}

const served = (t: Theorem): SkillTheorem => ({
  key: t.key, name: t.name, statement: t.statement, tactic: t.tactic, file: t.file, principle: t.principle,
  lean: t.lean, address: t.address, handle: handleOf(t.address),
})

/** Everything the live API can answer about one capability. */
export interface SkillSurface {
  skill: string
  count: number
  fold: string          // the ledger group's own order-invariant fold — the same value uuidna_skills reports
  handle: string        // the handle of that fold — the identity to cite for the whole cluster
  files: readonly string[]
  principles: readonly string[]
  theorems: readonly SkillTheorem[]
  esco: SkillEscoMapping
  /** the school lab for this domain — simulation + emulator, entangled to the head theorem and related resources */
  lab: DomainLab
  receipt: string
  honest: string
}

/** skillNames() → every skill the sealed ledger carries, in the order it first appears. Recomputed from the ledger
 *  on every call: this is the list a new wing extends, so it is never stored. */
export const skillNames = (): string[] => skillGroups().map((g) => g.skill)

/** skillSurface(skill) → the capability, served: its sealed theorems with their handles, the files and principles
 *  they were derived in, the group's order-invariant fold, and the ESCO mapping. Refuses an unknown skill BY NAME
 *  with the live list, rather than answering an empty set that reads like "this capability is unproven". */
export function skillSurface(skill: string, escoTitles: readonly string[] = []): SkillSurface {
  const want = String(skill).trim().toLowerCase()
  const group = skillGroups().find((g) => g.skill.toLowerCase() === want)
  if (!group)
    throw new Error(
      `unknown skill "${skill}" — the ledger carries: ${skillNames().join(', ')} (list them with counts via uuidna_skills)`)
  const theorems = group.theorems.map(served)
  const esco = skillEsco(group.skill, escoTitles)
  return {
    skill: group.skill,
    count: group.count,
    fold: group.fold,
    handle: handleOf(group.fold),
    files: [...new Set(group.theorems.map((t) => t.file))],
    principles: [...new Set(group.theorems.map((t) => t.principle))],
    theorems,
    esco,
    lab: domainLab(group.skill),
    receipt: merkleGravity([group.fold, esco.address, toUuid('skill:' + group.skill)]),
    honest: HONEST,
  }
}

/** One row of the discoverable index — a skill, what it carries, and how to open it. */
export interface SkillRow {
  skill: string
  theorems: number
  fold: string
  handle: string
  esco: string      // the taxonomy lookup for this skill
  open: string      // the exact call that serves it
}

/** skillIndex() → every skill with its theorem count, fold, handle and the call that opens it. The whole surface is
 *  discoverable from this one zero-argument call, and it is computed from the ledger, so a skill cannot arrive
 *  unlisted. */
export function skillIndex(): SkillRow[] {
  return skillGroups().map((g) => ({
    skill: g.skill,
    theorems: g.count,
    fold: g.fold,
    handle: handleOf(g.fold),
    esco: escoSearchUrl(escoPhrase(g.skill), 'skill'),
    open: `uuidna_skill { "skill": ${JSON.stringify(g.skill)} }`,
  }))
}

/** A skill the sealed ledger carries that a served surface does not answer for, and exactly how it failed. */
export interface SkillOrphan { skill: string; theorems: number; why: string }

/** orphanedSkills(answer) → THE INTERSECTION, MEASURED BY CALLING. `answer(skill)` must be a real served dispatch
 *  (callTool over stdio, or the edge's tools/call)
 *  whose handler answers for something else, and that is precisely the drift this measures. A skill counts as SERVED
 *  only when the surface returns THAT skill's own, complete, correctly-folded theorem set with its ESCO mapping —
 *  so a surface that answers with a truncated set, a different skill, or no mapping is an orphan with the reason.
 *  Empty is the law. Whatever it returns is a list of capabilities that are proven and unreachable. */
export function orphanedSkills(answer: (skill: string) => unknown): SkillOrphan[] {
  const out: SkillOrphan[] = []
  for (const g of skillGroups()) {
    const orphan = (why: string): void => { out.push({ skill: g.skill, theorems: g.count, why }) }
    let raw: unknown
    try { raw = answer(g.skill) } catch (e) { orphan('the surface refused it: ' + String((e as Error)?.message ?? e).slice(0, 160)); continue }
    if (!raw || typeof raw !== 'object') { orphan('the surface returned ' + (raw === undefined ? 'nothing' : typeof raw) + ''); continue }
    const s = raw as Partial<SkillSurface>
    if (s.skill !== g.skill) { orphan(`the surface answered for "${String(s.skill)}" instead`); continue }
    if (!Array.isArray(s.theorems)) { orphan('the surface carried no theorems array'); continue }
    if (s.theorems.length !== g.count) { orphan(`the surface returned ${s.theorems.length} theorem(s); the ledger group carries ${g.count}`); continue }
    const wrong = s.theorems.filter((t) => !g.theorems.some((x) => x.key === t.key && x.address === t.address))
    if (wrong.length) { orphan(`${wrong.length} returned theorem(s) are not in this skill's sealed group (first: ${String(wrong[0]?.key)})`); continue }
    if (merkleGravity(s.theorems.map((t) => t.address)) !== g.fold) { orphan('the returned set does not fold to the sealed group fold'); continue }
    if (!s.esco || typeof s.esco.lookup !== 'string' || !s.esco.lookup) { orphan('the surface served no ESCO mapping — the skill is reachable but unmapped'); continue }
  }
  return out
}

/** The reachability verdict over one served surface, folded to a receipt anyone recomputes. */
export interface SkillReach {
  surface: string
  skills: number
  served: number
  orphaned: readonly SkillOrphan[]
  tools: readonly string[]
  receipt: string
  honest: string
}

/** skillReach(surface, answer) → the finding's own measurement, as a served answer: how many of the ledger's skills
 *  the named surface actually answers for, and every one it does not. */
export function skillReach(surface: string, answer: (skill: string) => unknown): SkillReach {
  const names = skillNames()
  const orphaned = orphanedSkills(answer)
  return {
    surface,
    skills: names.length,
    served: names.length - orphaned.length,
    orphaned,
    tools: SKILL_TOOLS,
    receipt: merkleGravity([toUuid('skill-reach:' + surface), ...names.map((n) => toUuid('served:' + n + ':' + String(!orphaned.some((o) => o.skill === n))))]),
    honest:
      'REACHABILITY, measured by CALLING the surface — not by reading its catalogue. It reports whether a sealed ' +
      'capability can be OPENED through the live API; it says nothing about whether the capability is useful, and an ' +
      'orphan is never a claim that its theorems are false. Integrity.',
  }
}
