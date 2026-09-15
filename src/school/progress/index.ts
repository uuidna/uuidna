// school/progress — ATTEMPTS, MASTERY AND CERTIFICATES PER HANDLE, as pure functions over one progress record.
//
// The Worker (routes/index.ts) stores one record per handle and calls these; nothing here reads a clock or storage.
// A verdict in a record is always the Worker's own re-evaluation (lesson/index.ts checkAnswer) — a client's verdict
// is compared against it and never copied in.
import { toUuid, toUuidOnce, canonicalJson } from '../../address.js'
import { receiptSealOf, receiptSealed, SEALED_BY } from '../../refusal-trials.js'
import { CHECK_LABEL, type CourseFile } from '../lesson/shape/index.js'

export * from './identity/index.js'

export type AttemptVerdict = 'correct' | 'incorrect' | 'undecided' | 'invalid'

/** one checked attempt. `answer` is a numeral — the record stores it so a certificate can be re-checked by anyone. */
export interface Attempt {
  course: string
  lesson: string
  /** the sealed address of the lesson's theorem — the answer key the verdict was computed against */
  theorem: string
  answer: string
  answerDigest: string
  verdict: AttemptVerdict
  receipt: string
}

export interface LessonState { attempts: number; passed: Attempt | null; last: Attempt }
export interface CourseState { of: number; lessons: Record<string, LessonState>; certificate: string | null }
export interface Progress {
  kind: 'school-progress'
  handle: string
  /** lockOf(key) — a digest of the learner's key, set by the first write */
  lock: string
  courses: Record<string, CourseState>
  rate: { window: number; count: number }
}

/** answerDigestOf(course, lesson, answer) → the answer's address, bound to the lesson it answers */
export const answerDigestOf = (course: string, lesson: string, answer: string): string =>
  toUuid(canonicalJson({ course, lesson, answer }))

/** attemptOf(...) → the attempt record; its receipt addresses every other field */
export function attemptOf(course: string, lesson: string, theorem: string, answer: string, verdict: AttemptVerdict): Attempt {
  const answerDigest = answerDigestOf(course, lesson, answer)
  const receipt = toUuid(canonicalJson({ course, lesson, theorem, answer, answerDigest, verdict }))
  return { course, lesson, theorem, answer, answerDigest, verdict, receipt }
}

/** attemptHolds(a) → the attempt's digest and receipt recompute from its own fields */
export const attemptHolds = (a: Attempt): boolean =>
  a.answerDigest === answerDigestOf(a.course, a.lesson, a.answer)
  && a.receipt === toUuid(canonicalJson({ course: a.course, lesson: a.lesson, theorem: a.theorem, answer: a.answer, answerDigest: a.answerDigest, verdict: a.verdict }))

export const emptyProgress = (handle: string, lock: string): Progress =>
  ({ kind: 'school-progress', handle, lock, courses: {}, rate: { window: 0, count: 0 } })

/** recordAttempt(progress, attempt, of) → the record with this attempt counted. A lesson once passed stays passed;
 *  `of` is the course's exercise count as served when the attempt was made. */
export function recordAttempt(p: Progress, a: Attempt, of: number): Progress {
  const course = p.courses[a.course] ?? { of, lessons: {}, certificate: null }
  const prior = course.lessons[a.lesson]
  const state: LessonState = {
    attempts: (prior?.attempts ?? 0) + 1,
    passed: prior?.passed ?? (a.verdict === 'correct' ? a : null),
    last: a,
  }
  return { ...p, courses: { ...p.courses, [a.course]: { ...course, of, lessons: { ...course.lessons, [a.lesson]: state } } } }
}

export interface Mastery { course: string; passed: number; of: number; mastered: boolean; certificate: string | null }

/** masteryOf(progress, course, exerciseKeys?) → lessons passed over lessons with exercises. With the course's current
 *  exercise keys, only passes on those keys count; without them, the count stored with the record is the denominator. */
export function masteryOf(p: Progress, course: string, exerciseKeys?: readonly string[]): Mastery {
  const c = p.courses[course]
  if (!c) return { course, passed: 0, of: exerciseKeys?.length ?? 0, mastered: false, certificate: null }
  const keys = exerciseKeys ?? Object.keys(c.lessons)
  const passed = keys.filter((k) => c.lessons[k]?.passed).length
  const of = exerciseKeys ? exerciseKeys.length : c.of
  return { course, passed, of, mastered: of > 0 && passed === of, certificate: c.certificate }
}

/** progressView(p) → the record as GET /school/progress serves it: per-course mastery, the lock withheld */
export const progressView = (p: Progress): { handle: string; courses: Mastery[] } =>
  ({ handle: p.handle, courses: Object.keys(p.courses).sort().map((c) => masteryOf(p, c)) })

// ── rate limit: attempts per handle per window, the window read from a clock the Worker passes in ───────────────
export const RATE_WINDOW_MS = 60_000
export const RATE_LIMIT = 30
/** rateStep(progress, now) → whether one more attempt fits this window, and the window after it */
export function rateStep(p: Progress, now: number): { allowed: boolean; rate: Progress['rate'] } {
  const window = now - (now % RATE_WINDOW_MS)
  const count = p.rate.window === window ? p.rate.count : 0
  return count < RATE_LIMIT ? { allowed: true, rate: { window, count: count + 1 } } : { allowed: false, rate: { window, count } }
}

// ── certificates ───────────────────────────────────────────────────────────────────────────────────────────────
/** what a certificate is, in its own words — stored in the record and shown on its page */
export const CERTIFICATE_TEXT = 'A record that these answers were checked against these sealed theorems by the '
  + "repository's evaluator, sealed by 2×7 ledger theorems (receiptSealOf). It is not an accredited qualification: "
  + 'uuidna is not an accredited institution and awards no recognised credential.'

export interface CertificateBody {
  kind: 'school-certificate'
  handle: string
  course: string
  wing: string
  title: string
  lessons: number
  exercises: number
  attempts: Attempt[]
  text: string
  label: string
}

/** certificateBodyOf(progress, course) → the certificate body when every exercise of the course's CURRENT file is
 *  passed under this handle, or the lessons still missing */
export function certificateBodyOf(p: Progress, course: CourseFile): { ok: true; body: CertificateBody } | { ok: false; missing: string[] } {
  const keys = course.lessons.filter((l) => l.exercise !== null).map((l) => l.key)
  const state = p.courses[course.course]
  const missing = keys.filter((k) => !state?.lessons[k]?.passed)
  if (keys.length === 0 || missing.length > 0) return { ok: false, missing }
  return {
    ok: true,
    body: {
      kind: 'school-certificate', handle: p.handle, course: course.course, wing: course.wing, title: course.title,
      lessons: course.lessons.length, exercises: keys.length,
      attempts: keys.map((k) => state!.lessons[k]!.passed!),
      text: CERTIFICATE_TEXT, label: CHECK_LABEL,
    },
  }
}

/** sealCertificate(body) → its address and the 2×7 seal the deposit door will store beside it */
export const sealCertificate = (body: CertificateBody): ReturnType<typeof receiptSealOf> => receiptSealOf(body as unknown as Record<string, unknown>)

export interface CertificateCheck { name: string; holds: boolean; detail?: string }
export interface CertificateVerdict { holds: boolean; address: string; body: CertificateBody | null; checks: CertificateCheck[] }

/** verifyCertificate(address, stored, course, recheck) → every claim the certificate makes, recomputed:
 *  its bytes address to `address`; its 2×7 seal recomputes; each attempt's digest and receipt recompute; each attempt
 *  names the sealed address the served lesson carries; and each answer, re-checked now, is still correct. */
export function verifyCertificate(
  address: string,
  stored: Readonly<Record<string, unknown>>,
  course: CourseFile | null,
  recheck: (lesson: string, answer: string) => AttemptVerdict,
): CertificateVerdict {
  const { [SEALED_BY]: _seal, ...rest } = stored
  const body = rest as unknown as CertificateBody
  const checks: CertificateCheck[] = []
  const isCert = body.kind === 'school-certificate' && Array.isArray(body.attempts)
  checks.push({ name: 'is a school certificate', holds: isCert })
  checks.push({ name: 'its bytes address to this page', holds: toUuidOnce(canonicalJson(rest)) === address })
  checks.push({ name: 'its 2×7 seal recomputes', holds: receiptSealed(stored) })
  checks.push({ name: 'the course is served', holds: course !== null && isCert && course.course === body.course })
  if (isCert) {
    for (const a of body.attempts) {
      const lesson = course?.lessons.find((l) => l.key === a.lesson) ?? null
      const pinned = lesson !== null && lesson.address === a.theorem
      const now = pinned ? recheck(a.lesson, a.answer) : 'undecided'
      checks.push({ name: `lesson ${a.lesson}`, holds: attemptHolds(a) && pinned && a.verdict === 'correct' && now === 'correct', detail: `answer ${a.answer} re-checked: ${now}` })
    }
    checks.push({ name: 'every exercise of the course is answered', holds: course !== null && body.exercises === course.exercises && body.attempts.length === course.exercises })
  }
  return { holds: checks.every((c) => c.holds), address, body: isCert ? body : null, checks }
}
