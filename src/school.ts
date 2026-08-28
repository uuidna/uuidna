// school — THE ELEVEN SECTIONS, COMPUTED FROM THE LEDGER RATHER THAN AUTHORED.
//
// The school was 907 lines of script and 546 of prose, and unusable: a reader could not find what it taught, what
// it cost, or how to begin. Rewriting that as better prose would reproduce the problem in a tidier shape, because
// authored sections drift from the thing they describe the moment either changes.
//
// So every section derives. Courses ARE the proof wings; skills ARE the skills those theorems carry; policies ARE
// the laws already encoded in the gate. Nothing here is a promise about the project — each field is a reading of
// it, and a reading moves when the project does.
//
// GRADE LEVELS ARE MEASURED. A catalogue of
// wings with no levels and no order is a list. The ledger
// already holds the honest difficulty measure — lean/heartbeats.json records what each proof cost the Lean kernel
// in decide-steps — so the level is read off that and nothing else. See levelOf for why it is a DECADE of cost and
// not a percentile: a decade is a property of the course, a percentile is a property of the catalogue, and only
// the first survives the catalogue growing.
//
// ACCREDITATION IS THE SECTION THAT MATTERS MOST, and it is the one where honesty costs something. uuidna is NOT
// an accredited institution and awards no recognised qualification. Saying so plainly is not a disclaimer bolted
// on; it is the same law that governs every theorem here — UNVERIFIED means undecided
// without a witness is not made. A school page implying credentials it does not hold would be the one overclaim
// this ledger could not survive, because everything else it publishes depends on its claims being checkable.
//
// What IS true is worth more than a borrowed credential: every lesson is a `by decide` theorem the reader can
// recompute, and nothing is taken on the teacher's authority. That is a stronger guarantee than accreditation
// offers, and it is the only one uuidna can actually give.
// node:fs rides LAZILY through the runtime's own registry (the mcp.ts:38 law, sync form): a top-level
// import rides every bundle that reaches this module, and the edge worker has no filesystem.
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')
import { theorems } from './theorems/index.js'
import { toUuid, merge } from './address.js'
import { merkleGravity } from './gravity/index.js'

/** One lesson in a course: the theorem, and what it cost the kernel to decide. `steps` is 0 when unmeasured. */
export interface Lesson { key: string; name: string; steps: number }
export interface Course {
  code: string; title: string; wing: string; lessons: number; skills: string[]
  steps: number     // the course's TYPICAL measured cost — the lower median of its lessons' decide-steps (0 = unmeasured)
  entry: number     // its CHEAPEST measured lesson — what it costs to open the course (0 = unmeasured)
  level: number     // the DECADE of `steps`: 1, 10, 100, 1000 … and 0 for a course nothing has measured yet
  band: string      // that decade written as the span of costs it covers
  rank: number      // 1-based place in the derived reading order — rank 1 is where a reader starts
  roll: Lesson[]    // the course's own lessons, cheapest first
  measure: 'kernel' | 'structural'  // WHICH basis graded it — a structural level is not a kernel level of the
                    // same number, so the basis rides on the course rather than being inferred from the figure
}
export interface Level { level: number; band: string; courses: number; lessons: number; opens: string }
export interface Section { id: string; title: string; body: string[]; computed: boolean }
export interface School {
  sections: Section[]; courses: Course[]; levels: Level[]; receipt: string
  /** WHICH MEASURE THE LADDER RESTS ON, and — when it is not the kernel's — why not. A school graded
   *  structurally and one graded by the kernel are different claims, and this is where they are told apart. */
  basis: { measure: Basis['measure']; reason?: string }
  /** THE DENOMINATOR. `graded` courses carry a level, `of` is how many exist. A curriculum resting on 115
   *  measurements and one resting on none rendered identically before this field: both were simply a list of
   *  courses. A reading that does not report how much it read cannot be audited. */
  covered: { graded: number; of: number }
}

/** THE COST OF A LESSON, MEASURED — lean/heartbeats.json holds the kernel decide-steps for every theorem, keyed by
 *  its content-address and produced by re-running the proof under a rising cap until it verifies. It is the one
 *  difficulty measure in this repository that is not an opinion: it is what the kernel actually spent. */
const decideSteps = (): Record<string, number> => {
  const k = kernelCosts()
  return k.ok ? k.costs : {}
}

/** THE KERNEL READ, WITH ITS FAILURE NAMED. This was `catch { return {} }`, and an empty map is not a neutral
 *  answer here: every course then grades level 0, which `bandOf` renders as "unmeasured". A tree whose proofs
 *  were never measured and a runtime that could not OPEN heartbeats.json produced byte-identical schools —
 *  115 courses, 115 unmeasured, same keys, same order. That is a reader wearing the face of an unmeasured ledger.
 *
 *  It is not hypothetical: this module's own `fsm()` exists because THE EDGE WORKER HAS NO FILESYSTEM, so on the
 *  published site the catch fires every time and the school reports every course unmeasured while reporting no
 *  failure at all. The surrounding code is scrupulous about exactly this distinction — levelOf returns 0 rather
 *  than 1, unmeasuredLast records that "an absent measure is not a low one" — and the boundary that FEEDS it
 *  swallowed its own. Absent is now a third answer with a reason, never a zero. */
export type KernelCosts = { ok: true; costs: Record<string, number> } | { ok: false; reason: string }
export function kernelCosts(): KernelCosts {
  let raw: string
  try {
    raw = fsm().readFileSync(new URL('../lean/heartbeats.json', import.meta.url), 'utf8') as unknown as string
  } catch {
    return { ok: false, reason: 'lean/heartbeats.json could not be read in this runtime — an edge worker has no filesystem, so the kernel measure is unavailable here rather than absent from the ledger' }
  }
  try {
    const hb = JSON.parse(raw) as { costs?: Record<string, number> }
    if (!hb.costs) return { ok: false, reason: 'lean/heartbeats.json parsed but carries no `costs` map — the file exists and the measure does not' }
    return { ok: true, costs: hb.costs }
  } catch {
    return { ok: false, reason: 'lean/heartbeats.json is present but not valid JSON — the measure cannot be trusted, and a partial read is worse than none' }
  }
}

/** THE ALTERNATIVE TO LEAN — a difficulty measure that needs no kernel, no toolchain and no filesystem.
 *
 *  The kernel measure is the honest one and stays first: decide-steps are what Lean ACTUALLY SPENT, and nothing
 *  computed from the statement can replace that. But it is a SINGLE SOURCE, and tonight proved what a single
 *  source costs — the gate reported the lean arm VOID for hours on a host that had the toolchain installed the
 *  whole time, and VOID reads as "not a failure", so nobody looked. A school whose entire ladder rests on one
 *  file is a school with no levels on any host that cannot read that file, which today includes the site it
 *  publishes to.
 *
 *  So there is a second basis, computed from the sealed records themselves: `cases` — the size of the finite
 *  structure a theorem decides over — is carried by 1658 of the 1690 theorems, and the conjunct count is a
 *  property of the statement text. Both travel wherever `theorems()` travels, which is everywhere, including
 *  the worker. Cost is cases × conjuncts, integers throughout, no division and no Math.*.
 *
 *  IT IS A DIFFERENT QUANTITY AND IS NEVER PRESENTED AS THE SAME ONE. A structural level 10 is not a kernel
 *  level 10; the two measure different things and their decades do not correspond. That is why the basis is
 *  named on every course rather than inferred from the number — stability and validity are orthogonal, and a
 *  measure that is perfectly reproducible can still be evidence for a different claim than the one you meant. */
export function structuralSteps(): Record<string, number> {
  const out: Record<string, number> = {}
  for (const t of theorems()) {
    const cases = typeof t.cases === 'number' && t.cases > 0 ? t.cases : 1
    let conjuncts = 1
    for (const ch of t.statement) if (ch === '∧') conjuncts++
    out[t.address] = cases * conjuncts
  }
  return out
}

/** Which measure this school is standing on, and why. Kernel first; the alternative only when the kernel measure
 *  cannot be read, and never silently — `reason` carries the kernel's own refusal so a reader can tell a school
 *  graded structurally from one graded by the kernel, at a glance and in the data. */
export interface Basis { measure: 'kernel' | 'structural'; costs: Record<string, number>; reason?: string }
export function costBasis(): Basis {
  const k = kernelCosts()
  if (k.ok) return { measure: 'kernel', costs: k.costs }
  return { measure: 'structural', costs: structuralSteps(), reason: k.reason }
}

/** THE LEVEL OF A COST — the decade it falls in: 1, 10, 100, 1000 … An unmeasured or nonsensical cost has NO level
 *  (0), which is the ledger's own law applied to a curriculum: undecided here"beginner by default".
 *
 *  Why a decade and not a percentile. A percentile level is a RANKING: the same course changes level when a
 *  different course is added, removed or re-measured, so a reader who learned "level 2" last month is holding a
 *  stale fact today, and nothing announces it. A decade is read off THIS course alone, so a course keeps its level
 *  no matter what else enters the ledger — the property the test asserts and the reason this derivation is the
 *  defensible one. It also says something a reader can act on: a level-10 course settles in tens of kernel steps
 *  on their machine, a level-1000 course in thousands. */
export function levelOf(steps: number): number {
  if (!Number.isInteger(steps) || steps < 1) return 0
  let decade = 1
  while (decade * 10 <= steps) decade = decade * 10
  return decade
}
/** The decade written as the span it covers — a level names its own boundaries, so nobody has to look them up. */
export const bandOf = (level: number): string => level === 0 ? 'unmeasured' : `${level}–${level * 10 - 1} steps`

/** The LOWER median of a sorted list — an element of the list, so the course's cost stays an integer the kernel
 *  actually paid for one of its lessons. Empty = unmeasured. */
const lowerMedian = (sorted: number[]): number => sorted.length === 0 ? 0 : sorted[(sorted.length - 1) >> 1]

/** unmeasured courses and levels sort LAST — an absent measure is not a low one. */
const unmeasuredLast = (level: number): number => level === 0 ? 1 : 0

/** A course IS a proof wing. The lesson count is the theorems in it — not a syllabus someone maintains. Its LEVEL
 *  and its place in the reading order are read from the measured kernel cost of its own lessons; see levelOf.
 *
 *  `cost` is the measured-cost map, defaulting to the recorded one — grading is a PURE FUNCTION of what has been
 *  measured, and injecting the map is what makes that claim checkable. It is not a convenience: the heartbeats
 *  currently cover the ledger exactly, so every unmeasured branch below is unreachable from live data, and a
 *  branch no test can reach is a check that cannot fail. Two real mutations (grading an unmeasured course as
 *  level 1, and sorting an absent measure to the FRONT of the reading order) survived the whole suite until this
 *  parameter existed; both are caught now. */
export function courses(cost?: Record<string, number>, measure: Basis['measure'] = 'kernel'): Course[] {
  // no map injected → resolve the basis, which falls to the structural measure only when the kernel one refuses
  const resolved: Basis = cost ? { measure, costs: cost } : costBasis()
  const basisMeasure = resolved.measure
  cost = resolved.costs
  const T = theorems()
  const byWing = new Map<string, typeof T>()
  for (const t of T) byWing.set(t.file, [...(byWing.get(t.file) ?? []), t])
  const graded: Course[] = [...byWing.entries()].map(([wing, ts]) => {
    const roll: Lesson[] = ts
      .map((t) => ({ key: t.key, name: t.name, steps: cost[t.address] ?? 0 }))
      .sort((a, b) => a.steps - b.steps || (a.key < b.key ? -1 : 1))
    const measured = roll.map((l) => l.steps).filter((n) => n > 0).sort((a, b) => a - b)
    const steps = lowerMedian(measured)
    const level = levelOf(steps)
    return {
      code: 'UU-' + toUuid(wing).slice(0, 4).toUpperCase(),
      title: wing.replace(/\.lean$/, '').replace(/([a-z])([A-Z])/g, '$1 $2'),
      wing,
      lessons: ts.length,
      skills: [...new Set(ts.map((t) => t.skill).filter((s): s is string => !!s))].sort(),
      steps, entry: measured.length ? measured[0] : 0, level, band: bandOf(level), rank: 0, roll,
      measure: basisMeasure,
    }
  })
  graded.sort((a, b) => unmeasuredLast(a.level) - unmeasuredLast(b.level)
    || a.level - b.level || a.steps - b.steps || a.entry - b.entry || (a.code < b.code ? -1 : 1))
  return graded.map((c, i) => ({ ...c, rank: i + 1 }))
}

// ── the quantum theorems: valid in every dimension ─────────────────────────────────────────────────────────
//
// A THEOREM CAN BE TRUE AND STILL NOT BE VALID IN ALL DIMENSIONS. `(1 * 7) % 9 = 7` holds in every language,
// every runtime, every year, and on any host that ever runs it: nothing about the tree it lives in can move it.
// A prose census — the per-wing doc-comment counts folded to a ℤ/9 digit — is also true, and is true of THIS
// repository at THIS moment —
// add a wing and it is false, and the ledger has to reseal it. Both pass `decide`; only the first is a fact
// about arithmetic rather than a census of the tree taking a photograph of itself.
//
// That distinction is what the run of mutually-undoing Reconcile commits was made of. The nine statements that
// drifted when a 1690th theorem landed — prose_coverage_total, cubes_partition_ledger, reach_all_decide and
// six siblings — are exactly the contingent class, and they moved for the honest reason that the thing they
// count had changed. A curriculum built from them teaches a reader the size of a directory.
//
// THE TEST IS A PROXY AND IS NAMED AS ONE. `dimensionInvariant` asks whether the statement carries any language
// content once Lean's own vocabulary is set aside — no locale literal, no word, no corpus. A statement made of
// numbers and operators cannot be about the tree, so it is invariant; that direction is sound. The converse is
// not: a statement mentioning `List` might still be perfectly invariant, so the residue is "not established
// invariant by this test", never "contingent". An instrument that reported the second would be claiming a
// verdict it never reached — which is the whole discipline this file has been acquiring all night.
const LEAN_VOCAB = /List|Nat|Bool|Int|foldl|foldr|filter|all|any|map|range|length|fun|let|if|then|else|true|false|decide|Prop|Type|sorry|by|rfl|And|Or|Not/g

export function dimensionInvariant(statement: string): boolean {
  const bare = statement.replace(LEAN_VOCAB, '')
  return !/[\p{L}]/u.test(bare)
}

/** The ledger split by dimension-validity, with BOTH sides counted — a filter that reported only what it kept
 *  would be a reading with no denominator. */
export function quantumSplit(): { invariant: string[]; unestablished: string[] } {
  const invariant: string[] = [], unestablished: string[] = []
  for (const t of theorems()) (dimensionInvariant(t.statement) ? invariant : unestablished).push(t.key)
  return { invariant, unestablished }
}

/** quantumCourses() → the school taught ONLY from theorems valid in every dimension. Wings keep their identity
 *  and lose their contingent lessons; a wing left with no invariant lesson is DROPPED rather than shown empty,
 *  and the count of dropped wings rides in the census so the loss is visible rather than silent. */
export function quantumCourses(cost?: Record<string, number>): { courses: Course[]; droppedWings: number; keptLessons: number; ofLessons: number } {
  const keep = new Set(quantumSplit().invariant)
  const all = courses(cost)
  const out: Course[] = []
  let keptLessons = 0, ofLessons = 0
  for (const c of all) {
    ofLessons += c.roll.length
    const roll = c.roll.filter((l) => keep.has(l.key))
    if (!roll.length) continue
    keptLessons += roll.length
    const measured = roll.map((l) => l.steps).filter((n) => n > 0).sort((a, b) => a - b)
    const steps = lowerMedian(measured)
    const level = levelOf(steps)
    out.push({ ...c, lessons: roll.length, roll, steps, entry: measured.length ? measured[0]! : 0, level, band: bandOf(level) })
  }
  out.sort((a, b) => unmeasuredLast(a.level) - unmeasuredLast(b.level) || a.level - b.level || (a.code < b.code ? -1 : 1))
  return { courses: out.map((c, i) => ({ ...c, rank: i + 1 })), droppedWings: all.length - out.length, keptLessons, ofLessons }
}

// ── recursive paths ────────────────────────────────────────────────────────────────────────────────────────
//
// MINIMUM PAGES, MAXIMUM CROSSLINKS. A school of 115 courses and 1690 lessons has two obvious renderings and
// both are wrong. One page per course is 115 pages that each say a little and link to nothing, and a reader who
// wants the shape has to hold it in their head. One flat page is what exists today: everything present, nothing
// addressable, so a course cannot be linked to, cited, or arrived at — and a thing with no address cannot be
// crosslinked at all. The count of pages and the density of links are not in tension; a low page count is what
// MAKES dense linking possible, because every target is one document away and every anchor resolves locally.
//
// SO THE STRUCTURE IS RECURSIVE AND THE TYPOGRAPHY CARRIES IT. One node type, four depths — school, level,
// course, lesson — each rendered at a heading depth equal to its depth in the tree, each carrying an anchor
// derived from its own address rather than from its title. Typography is not decoration here: the heading level
// IS the recursion depth, so the page's shape and the data's shape are the same object, and a reader scanning
// headings is reading the tree.
//
// EVERY NODE CARRIES ITS OWN CROSSLINKS, and they are derived, never authored: a lesson links to the theorem it
// is, a course links to its wing and to the courses that share a skill with it, a level links to the courses at
// that level. Nothing is a promise about the project — a link exists because two nodes share something the
// ledger already records, and it disappears when they stop sharing it.

export interface Path {
  id: string           // anchor, derived from the node's own address — stable across retitling
  title: string
  kind: 'school' | 'level' | 'course' | 'lesson'
  depth: number        // 0..3 — and the heading depth it renders at, which is the same number
  links: string[]      // crosslinks OUT of this node, as anchors or /theorem/<key> routes
  children: Path[]
}

/** paths(cost?) → the whole school as one recursive tree. The only structure-producing function here: levels,
 *  courses and lessons are the SAME node type at different depths, which is what lets one renderer walk it and
 *  one reader learn one shape. */
export function paths(cost?: Record<string, number>): Path {
  const cs = courses(cost)
  // a skill index, so a course can link to the courses it shares a skill with — derived, not curated
  const bySkill = new Map<string, string[]>()
  for (const c of cs) for (const s of c.skills) bySkill.set(s, [...(bySkill.get(s) ?? []), c.code])

  const levelsPresent = [...new Set(cs.map((c) => c.level))].sort((a, b) => unmeasuredLast(a) - unmeasuredLast(b) || a - b)
  const levelNodes: Path[] = levelsPresent.map((lv) => {
    const at = cs.filter((c) => c.level === lv)
    return {
      id: 'level-' + lv, title: `Level ${lv} — ${bandOf(lv)}`, kind: 'level' as const, depth: 1,
      links: at.map((c) => '#' + c.code.toLowerCase()),
      children: at.map((c) => ({
        id: c.code.toLowerCase(), title: `${c.code} · ${c.title}`, kind: 'course' as const, depth: 2,
        links: [
          ...c.skills.map((s) => '#skill-' + s),
          // sibling courses sharing a skill, each named once, never itself
          ...[...new Set(c.skills.flatMap((s) => bySkill.get(s) ?? []))].filter((x) => x !== c.code).map((x) => '#' + x.toLowerCase()),
        ],
        children: c.roll.map((l) => ({
          id: 'lesson-' + l.key, title: l.name, kind: 'lesson' as const, depth: 3,
          links: ['/theorem/' + l.key],
          children: [],
        })),
      })),
    }
  })
  return {
    id: 'school', title: 'School', kind: 'school', depth: 0,
    links: levelNodes.map((n) => '#' + n.id),
    children: levelNodes,
  }
}

/** Walk the tree and count it — a renderer that cannot say how much it rendered is the reader-without-a-
 *  denominator again, one level up. */
export function pathCensus(root: Path): { nodes: number; links: number; byKind: Record<string, number> } {
  let nodes = 0, links = 0
  const byKind: Record<string, number> = {}
  const walk = (p: Path): void => {
    nodes++; links += p.links.length; byKind[p.kind] = (byKind[p.kind] ?? 0) + 1
    for (const c of p.children) walk(c)
  }
  walk(root)
  return { nodes, links, byKind }
}

/** renderPath(node) → markdown whose HEADING DEPTH IS THE NODE DEPTH. One function, called on itself, so the
 *  page is generated by the same recursion the data has — there is no separate layout to drift from the tree. */
export function renderPath(p: Path, maxDepth = 2): string[] {
  const out: string[] = []
  const hashes = '#'.repeat(p.depth + 1)
  out.push(`${hashes} ${p.title} {#${p.id}}`)
  if (p.links.length) out.push(p.links.map((l) => `[${l.replace(/^#|^\/theorem\//, '')}](${l})`).join(' · '))
  if (p.depth < maxDepth) for (const c of p.children) out.push(...renderPath(c, maxDepth))
  else if (p.children.length) out.push(`_${p.children.length} below this node, addressable at its own anchors._`)
  return out
}

// ── each course leads to new courses, without end ──────────────────────────────────────────────────────────
//
// THE CATALOGUE IS FINITE AND THE SCHOOL IS NOT. The wing count — courses().length, read from the ledger and
// never restated here — is what the catalogue holds, and a curriculum that
// stopped there would be a reading list: finish the last course and the school has nothing further to say. But
// a course here is not a page, it is an ADDRESS — and this repository's own arithmetic closes addresses under
// folding, `merge(a, b) = toUuid(a:b)`, into a space of 2^128. So two courses compose into a third that is a
// real course and not a placeholder: its lessons are the union of both rolls, its cost is measured from those
// same lessons, and its address is the fold of the two it came from. Composition is closed, so the set of
// courses reachable from any starting course is UNBOUNDED, and every one of them is derived, addressable and
// recomputable by anyone holding the same ledger.
//
// THIS IS GENERATION, NOT INVENTION, and the distinction is the whole honesty of it. A composed course asserts
// nothing that its parents did not already prove — it teaches their lessons together, and the only new fact is
// that they CAN be taken together, which the shared skill is the evidence for. Nothing is sealed by composing,
// no theorem is created, and `composed: true` rides on every one so a reader can never mistake a generated path
// for a sealed wing. The infinity is in the ROUTES through the ledger, never in claims about the world.
//
// IT TERMINATES ONLY WHEN THE READER STOPS ASKING. Every function below takes a budget, because an unbounded
// structure with no budget is a hang, and a hang is what an instrument that cannot say "I am still going" looks
// like from outside. The budget is the caller's, and it is always reported back.

export interface Composed extends Course { composed: true; parents: [string, string] }

/** composeCourse(a, b) → the course you take when you take both. Lessons are the union by key, cost is the
 *  lower median of the measured union — recomputed, never averaged from the parents' summaries, because an
 *  average of two medians is a number no kernel ever spent. */
export function composeCourse(a: Course, b: Course): Composed {
  const roll: Lesson[] = [...new Map([...a.roll, ...b.roll].map((l) => [l.key, l])).values()]
    .sort((x, y) => x.steps - y.steps || (x.key < y.key ? -1 : 1))
  const measured = roll.map((l) => l.steps).filter((n) => n > 0).sort((x, y) => x - y)
  const steps = lowerMedian(measured)
  const level = levelOf(steps)
  const address = merge(toUuid(a.wing), toUuid(b.wing))
  return {
    code: 'UU-' + address.replace(/-/g, '').slice(0, 4).toUpperCase(),
    title: `${a.title} with ${b.title}`,
    wing: `${a.wing}+${b.wing}`,
    lessons: roll.length,
    skills: [...new Set([...a.skills, ...b.skills])].sort(),
    steps, entry: measured.length ? measured[0]! : 0, level, band: bandOf(level), rank: 0, roll,
    measure: a.measure,
    composed: true, parents: [a.code, b.code],
  }
}

/** nextFrom(code, budget) → the courses this one LEADS TO: catalogue courses composed with it, by rank.
 *
 *
 *  A SHARED SKILL WAS THE FIRST EDGE RULE HERE AND IT WAS MY INVENTION, NOT THE LEDGER'S. Every one of the 115
 *  wings carries exactly one skill and no two wings share it, so the skill graph has no edges whatever and this
 *  function returned nothing from every starting point — a curation criterion imposed on data that does not
 *  carry it, which is the same manual intrusion the theorem-name audit just measured. Composition needs no
 *  licence: any two courses can be studied together, that is what taking two courses IS, and the ledger already
 *  says so by holding both. The order is by rank, so the walk is deterministic and the same reader gets the
 *  same route twice. */
export function nextFrom(code: string, budget = 8, cs: Course[] = courses()): Composed[] {
  const here = cs.find((c) => c.code === code)
  if (!here) return []
  const out: Composed[] = []
  for (const other of cs) {
    if (out.length >= budget) break
    if (other.code === here.code) continue
    out.push(composeCourse(here, other))
  }
  return out
}

/** expand(code, depth, breadth) → walk the unbounded structure to a stated budget, returning every DISTINCT
 *  course address reached. The return carries `frontier`: how many nodes were reachable and not visited, so a
 *  truncated walk can never be mistaken for an exhausted one. That is the denominator rule applied to an
 *  infinite object — the only honest way to report a walk that could always have gone further. */
export function expand(code: string, depth = 2, breadth = 4): { visited: string[]; frontier: number; depth: number; breadth: number } {
  const cs = courses()
  const seen = new Set<string>([code])
  let layer: Course[] = cs.filter((c) => c.code === code)
  let frontier = 0
  for (let d = 0; d < depth; d++) {
    const next: Course[] = []
    for (const c of layer) {
      // the walker must be able to FIND the node it is standing on: a composed course is not in the catalogue,
      // so the lookup list has to carry the current layer too. Without this the second layer looked up codes
      // that existed nowhere, returned nothing, and the unbounded structure reported itself exhausted at depth 1
      // — an instrument answering "there is no more" when it meant "I could not find where I was".
      const kids = nextFrom(c.code, breadth, [...cs, ...layer])
      for (const k of kids) {
        if (seen.has(k.code)) { continue }
        if (d === depth - 1) { frontier++; seen.add(k.code); continue }
        seen.add(k.code); next.push(k)
      }
    }
    layer = next
    if (!layer.length) break
  }
  return { visited: [...seen], frontier, depth, breadth }
}

/** The levels PRESENT in the ledger — never a fixed ladder of four names. A level exists here because some course
 *  costs that much, and it disappears when no course does; the school does not advertise a grade it cannot fill. */
export function levels(cost?: Record<string, number>): Level[] {
  const cs = courses(cost ?? decideSteps())
  const present = [...new Set(cs.map((c) => c.level))]
    .sort((a, b) => unmeasuredLast(a) - unmeasuredLast(b) || a - b)
  return present.map((level) => {
    const inLevel = cs.filter((c) => c.level === level)
    return {
      level, band: bandOf(level),
      courses: inLevel.length,
      lessons: inLevel.reduce((n, c) => n + c.lessons, 0),
      opens: `${inLevel[0].code} ${inLevel[0].title}`,
    }
  })
}

const line = (label: string, value: string | number): string => `${label}: ${value}`

/** THE MANIFEST IS THE SOURCE.
 *
 *  Eight of these eleven sections were authored strings — the licence, the Node requirement, the dependency count,
 *  every contact URL — each of which is a field in package.json that I retyped. A retyped field is a claim that
 *  cannot stay true, which is the same defect as a ledger count frozen into a comment. */
const manifest = (): Record<string, string | Record<string, string>> => {
  try { return JSON.parse(fsm().readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as Record<string, string | Record<string, string>> }
  catch { return {} }
}
const mf = (k: string, sub?: string): string => {
  const m = manifest()[k]
  if (sub && m && typeof m === 'object') return String((m as Record<string, string>)[sub] ?? '')
  return typeof m === 'string' ? m : ''
}
const runtimeDeps = (): number => Object.keys((manifest().dependencies as Record<string, string>) ?? {}).length

/** Releases ARE the calendar. Each is a dated event with a receipt; I wrote "no dates" rather than read them. */
const releases = (): string[] => {
  try {
    const md = fsm().readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8')
    return [...md.matchAll(/^##\s*\[?(\d+\.\d+\.\d+)\]?\s*[-–—]?\s*(\d{4}-\d{2}-\d{2})?/gm)]
      .map((m) => m[2] ? `${m[1]} — ${m[2]}` : m[1])
  } catch { return [] }
}

/** The eleven sections. `computed: false` marks a section whose content is a STANDING FACT about the project
 *  rather than a reading of the ledger — so a reader can tell which parts move on their own. */
export function school(): School {
  const cs = courses()
  const ls = levels()
  const T = theorems()
  const lessons = T.length
  const skills = [...new Set(T.map((t) => t.skill).filter(Boolean))].length

  const sections: Section[] = [
    { id: 'name-mission', title: 'Name and mission', computed: true, body: [
      'uuidna — a school whose every lesson is a theorem you can recompute.',
      'Mission: teach claims that carry their own proof. Nothing is taken on the teacher\'s authority.',
      line('Lessons currently sealed', lessons),
      line('Subject areas', cs.length),
    ] },
    { id: 'accreditation', title: 'Accreditation', computed: false, body: [
      'uuidna is NOT an accredited institution. It awards no diploma, degree, credit or recognised qualification,',
      'and it is not registered with any educational authority. If you need an accredited credential, this is not',
      'the place to obtain one, and nothing here should be presented to an employer or registrar as though it were.',
      'What is offered instead: every lesson is a machine-checked proof you can verify yourself, without trusting',
      'this institution or any other. That is a narrower promise than accreditation and a fully checkable one.',
    ] },
    { id: 'enrollment', title: 'Enrolment', computed: false, body: [
      'There is no application, no fee, no form and no account. Enrolment is reading.',
      'No personal data is collected, because none is needed to hand someone a proof they can check.',
      'Begin at any course below; the lessons are ordered but not gated.',
      'What CAN decide (a finite structure, an exact predicate) deposits two coins and waits for the kernel — never auto-sealed.',
      'What CANNOT decide self-develops: taught cures from report() GAP+FIX, the law-school roster of refused wave candidates (/waves),',
      'and open-question develop fragments. Reason\'s exits are VERIFIED, REFUTED, REFUSED. Not-proven is not false.',
    ] },
    { id: 'levels-courses', title: 'Levels and courses', computed: true, body: [
      'A course is a proof wing and a lesson is a theorem in it, so the catalogue is the ledger — not a syllabus',
      'anyone maintains. The LEVEL is measured, never assigned: lean/heartbeats.json records what each proof cost',
      'the Lean kernel in decide-steps, a course takes the median of its own lessons, and the level is the decade',
      'that median falls in — a level-10 course settles in tens of steps on your machine, a level-1000 course in',
      'thousands. Because the level is read off one course alone, it does not move when other courses are added or',
      'removed; a ranking would, and a level a reader learned last month would silently be wrong today.',
      line('Levels present', ls.length), line('Courses', cs.length), line('Lessons', lessons), line('Skills taught', skills),
      ...ls.map((l) => `  Level ${l.level} (${l.band}) — ${l.courses} courses, ${l.lessons} lessons, opening at ${l.opens}`),
      cs.length ? `Start here: ${cs[0].code} ${cs[0].title} — ${cs[0].lessons} lessons, its cheapest ${cs[0].entry} steps` : '',
    ].filter(Boolean) },
    { id: 'calendar', title: 'Academic calendar', computed: true, body: [
      'There are no terms and no intake dates — the ledger releases when its gate is green.',
      'But releases ARE the dated events, and they are recorded rather than announced:',
      line('Releases to date', releases().length),
      ...releases().slice(0, 5).map((r) => '  ' + r),
      releases().length > 5 ? `  … and ${releases().length - 5} earlier` : '',
      line('Current', mf('version')),
    ].filter(Boolean) },
    { id: 'tuition', title: 'Tuition', computed: true, body: [
      'Free. There is no tuition, no materials fee, and nothing to purchase.',
      line('Licence', mf('license') + ' — study and share freely; commercial use reserved'),
    ] },
    { id: 'technology', title: 'Technology requirements', computed: true, body: [
      'A browser is enough to read. To verify a proof yourself you need Node and the package — no account, no cloud.',
      line('Node', mf('engines', 'node')),
      line('Runtime dependencies', runtimeDeps() === 0 ? 'none — nothing is fetched at run time' : String(runtimeDeps())),
      'To check the proofs at their source you need the Lean toolchain; the kernel-only witness ships so you can',
      'recompute offline.',
    ] },
    { id: 'handbook', title: 'Handbook and policies', computed: true, body: [
      'The policies are the gate— each is enforced on every change:',
      '  A claim cites a sealed theorem or it is UNVERIFIED. Unverified means undecided here.',
      '  A measured quantity may be bracketed in integers; only a defined constant may seal as an equality.',
      '  A check that cannot fail is not a check, and is reported as void rather than passed.',
      '  Refutation is a result. A refuted claim establishes its negation and is recorded.',
      line('Laws currently sealed as theorems', lessons),
    ] },
    { id: 'staff', title: 'Teachers and counsellors', computed: true, body: [
      'There is no faculty. The proofs teach, and the kernel marks the work.',
      line('Maintainer', mf('author')),
      line('Marking authority', 'the Lean kernel — every lesson is checked, none is graded by opinion'),
    ] },
    { id: 'faq', title: 'Frequently asked questions', computed: false, body: [
      'Is this accredited? No — see the accreditation section, which states the position plainly.',
      'Do I get a certificate? No. You get proofs you can recompute, which is what the school actually has.',
      'What does it cost? Nothing.',
      'Can I be wrong here? Yes, and that is the point: every lesson can be checked against you.',
    ] },
    { id: 'contact', title: 'Contact, support and announcements', computed: true, body: [
      'Questions, corrections and news are handled in the open. Corrections are the fastest way to improve a',
      'lesson — a refutation is recorded as a result.',
      line('Repository', mf('repository', 'url').replace(/^git\+/, '')),
      line('Technical support', mf('bugs', 'url')),
      line('Home', mf('homepage')),
    ] },
  ]

  const b = costBasis()
  return {
    sections, courses: cs, levels: ls,
    basis: b.reason ? { measure: b.measure, reason: b.reason } : { measure: b.measure },
    covered: { graded: cs.filter((c) => c.level > 0).length, of: cs.length },
    receipt: merkleGravity(sections.map((s) => toUuid(s.id + '|' + s.body.join('\n')))),
  }
}
