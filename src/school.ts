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
// GRADE LEVELS ARE MEASURED, NOT ASSIGNED, and that is the second thing this file exists to fix. A catalogue of
// wings with no levels and no order is a list, not a school: a reader cannot tell where to start. The ledger
// already holds the honest difficulty measure — lean/heartbeats.json records what each proof cost the Lean kernel
// in decide-steps — so the level is read off that and nothing else. See levelOf for why it is a DECADE of cost and
// not a percentile: a decade is a property of the course, a percentile is a property of the catalogue, and only
// the first survives the catalogue growing.
//
// ACCREDITATION IS THE SECTION THAT MATTERS MOST, and it is the one where honesty costs something. uuidna is NOT
// an accredited institution and awards no recognised qualification. Saying so plainly is not a disclaimer bolted
// on; it is the same law that governs every theorem here — UNVERIFIED means undecided, never false, and a claim
// without a witness is not made. A school page implying credentials it does not hold would be the one overclaim
// this ledger could not survive, because everything else it publishes depends on its claims being checkable.
//
// What IS true is worth more than a borrowed credential: every lesson is a `by decide` theorem the reader can
// recompute, and nothing is taken on the teacher's authority. That is a stronger guarantee than accreditation
// offers, and it is the only one uuidna can actually give.
import { readFileSync } from 'node:fs'
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'

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
}
export interface Level { level: number; band: string; courses: number; lessons: number; opens: string }
export interface Section { id: string; title: string; body: string[]; computed: boolean }
export interface School { sections: Section[]; courses: Course[]; levels: Level[]; receipt: string }

/** THE COST OF A LESSON, MEASURED — lean/heartbeats.json holds the kernel decide-steps for every theorem, keyed by
 *  its content-address and produced by re-running the proof under a rising cap until it verifies. It is the one
 *  difficulty measure in this repository that is not an opinion: it is what the kernel actually spent. */
const decideSteps = (): Record<string, number> => {
  try {
    const hb = JSON.parse(readFileSync(new URL('../lean/heartbeats.json', import.meta.url), 'utf8')) as { costs?: Record<string, number> }
    return hb.costs ?? {}
  } catch { return {} }
}

/** THE LEVEL OF A COST — the decade it falls in: 1, 10, 100, 1000 … An unmeasured or nonsensical cost has NO level
 *  (0), which is the ledger's own law applied to a curriculum: undecided here, never "beginner by default".
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
 *  actually paid for one of its lessons, never an average of costs nothing ever cost. Empty = unmeasured. */
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
export function courses(cost: Record<string, number> = decideSteps()): Course[] {
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
    }
  })
  graded.sort((a, b) => unmeasuredLast(a.level) - unmeasuredLast(b.level)
    || a.level - b.level || a.steps - b.steps || a.entry - b.entry || (a.code < b.code ? -1 : 1))
  return graded.map((c, i) => ({ ...c, rank: i + 1 }))
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

/** THE MANIFEST IS THE SOURCE, NOT MY MEMORY OF IT.
 *
 *  Eight of these eleven sections were authored strings — the licence, the Node requirement, the dependency count,
 *  every contact URL — each of which is a field in package.json that I retyped. A retyped field is a claim that
 *  cannot stay true, which is the same defect as a ledger count frozen into a comment. */
const manifest = (): Record<string, string | Record<string, string>> => {
  try { return JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as Record<string, string | Record<string, string>> }
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
    const md = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8')
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
    ] },
    { id: 'levels-courses', title: 'Levels and courses', computed: true, body: [
      'A course is a proof wing and a lesson is a theorem in it, so the catalogue is the ledger — not a syllabus',
      'anyone maintains. The LEVEL is measured, not assigned: lean/heartbeats.json records what each proof cost',
      'the Lean kernel in decide-steps, a course takes the median of its own lessons, and the level is the decade',
      'that median falls in — a level-10 course settles in tens of steps on your machine, a level-1000 course in',
      'thousands. Because the level is read off one course alone, it does not move when other courses are added or',
      'removed; a ranking would, and a level a reader learned last month would silently be wrong today.',
      line('Levels present', ls.length), line('Courses', cs.length), line('Lessons', lessons), line('Skills taught', skills),
      ...ls.map((l) => `  Level ${l.level} (${l.band}) — ${l.courses} courses, ${l.lessons} lessons, opening at ${l.opens}`),
      cs.length ? `Start here: ${cs[0].code} ${cs[0].title} — ${cs[0].lessons} lessons, its cheapest ${cs[0].entry} steps` : '',
    ].filter(Boolean) },
    { id: 'calendar', title: 'Academic calendar', computed: true, body: [
      'There are no terms and no intake dates — the ledger releases when its gate is green, not on a timetable.',
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
      'The policies are the gate, not a document — each is enforced on every change:',
      '  A claim cites a sealed theorem or it is UNVERIFIED. Unverified means undecided here, never false.',
      '  A measured quantity may be bracketed in integers; only a defined constant may seal as an equality.',
      '  A check that cannot fail is not a check, and is reported as void rather than passed.',
      '  Refutation is a result. A refuted claim establishes its negation and is recorded, never discarded.',
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
      'lesson — a refutation is recorded as a result, never treated as a complaint.',
      line('Repository', mf('repository', 'url').replace(/^git\+/, '')),
      line('Technical support', mf('bugs', 'url')),
      line('Home', mf('homepage')),
    ] },
  ]

  return { sections, courses: cs, levels: ls, receipt: merkleGravity(sections.map((s) => toUuid(s.id + '|' + s.body.join('\n')))) }
}
