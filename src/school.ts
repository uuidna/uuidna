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
// ACCREDITATION IS THE SECTION THAT MATTERS MOST, and it is the one where honesty costs something. uuidna is NOT
// an accredited institution and awards no recognised qualification. Saying so plainly is not a disclaimer bolted
// on; it is the same law that governs every theorem here — UNVERIFIED means undecided, never false, and a claim
// without a witness is not made. A school page implying credentials it does not hold would be the one overclaim
// this ledger could not survive, because everything else it publishes depends on its claims being checkable.
//
// What IS true is worth more than a borrowed credential: every lesson is a `by decide` theorem the reader can
// recompute, and nothing is taken on the teacher's authority. That is a stronger guarantee than accreditation
// offers, and it is the only one uuidna can actually give.
import { theorems } from './index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'

export interface Course { code: string; title: string; wing: string; lessons: number; skills: string[] }
export interface Section { id: string; title: string; body: string[]; computed: boolean }
export interface School { sections: Section[]; courses: Course[]; receipt: string }

/** A course IS a proof wing. The lesson count is the theorems in it — not a syllabus someone maintains. */
export function courses(): Course[] {
  const T = theorems()
  const byWing = new Map<string, typeof T>()
  for (const t of T) byWing.set(t.file, [...(byWing.get(t.file) ?? []), t])
  return [...byWing.entries()].map(([wing, ts]) => ({
    code: 'UU-' + toUuid(wing).slice(0, 4).toUpperCase(),
    title: wing.replace(/\.lean$/, '').replace(/([a-z])([A-Z])/g, '$1 $2'),
    wing,
    lessons: ts.length,
    skills: [...new Set(ts.map((t) => t.skill).filter((s): s is string => !!s))].sort(),
  })).sort((a, b) => b.lessons - a.lessons)
}

const line = (label: string, value: string | number): string => `${label}: ${value}`

/** The eleven sections. `computed: false` marks a section whose content is a STANDING FACT about the project
 *  rather than a reading of the ledger — so a reader can tell which parts move on their own. */
export function school(): School {
  const cs = courses()
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
      'There is no application, no fee, and no account. Enrolment is reading.',
      'No personal data is collected, because none is needed to hand someone a proof they can check.',
      'Begin at any course below; the lessons are ordered but not gated.',
    ] },
    { id: 'levels-courses', title: 'Levels and courses', computed: true, body: [
      line('Courses', cs.length), line('Skills taught', skills),
      ...cs.slice(0, 8).map((c) => `  ${c.code}  ${c.title} — ${c.lessons} lessons`),
      cs.length > 8 ? `  … and ${cs.length - 8} more` : '',
    ].filter(Boolean) },
    { id: 'calendar', title: 'Academic calendar', computed: false, body: [
      'There are no terms and no intake dates. The ledger releases when its gate is green, not on a timetable,',
      'so a lesson appears when it is proven rather than when a semester begins.',
    ] },
    { id: 'tuition', title: 'Tuition', computed: false, body: [
      'Free. There is no tuition, no materials fee, and nothing to purchase.',
      'The licence is CC BY-NC-ND: study and share freely, commercial use reserved.',
    ] },
    { id: 'technology', title: 'Technology requirements', computed: false, body: [
      'A browser is enough to read. To verify a proof yourself you need Node and the package — no account, no cloud.',
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
    { id: 'staff', title: 'Teachers and counsellors', computed: false, body: [
      'There is no faculty. The proofs teach, and the kernel marks the work.',
      'Corrections and questions are handled in the open repository, where the reasoning is visible.',
    ] },
    { id: 'faq', title: 'Frequently asked questions', computed: false, body: [
      'Is this accredited? No — see the accreditation section, which states the position plainly.',
      'Do I get a certificate? No. You get proofs you can recompute, which is what the school actually has.',
      'What does it cost? Nothing.',
      'Can I be wrong here? Yes, and that is the point: every lesson can be checked against you.',
    ] },
    { id: 'contact', title: 'Contact and announcements', computed: false, body: [
      'Questions, corrections and news are handled in the public repository. Corrections are welcome and are the',
      'fastest way to improve a lesson — a refutation is recorded as a result, not treated as a complaint.',
    ] },
  ]

  return { sections, courses: cs, receipt: merkleGravity(sections.map((s) => toUuid(s.id + '|' + s.body.join('\n')))) }
}
