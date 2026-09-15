// @non-harmonic: the school's Worker routes read the served course files, the Worker's KV namespace and qpu storage — a named boundary; every verdict inside is the pure evaluator's, recomputed per request.
//
// school/routes — THE LEARNER'S DOORS ON uuidna.com, as one module worker.js calls and the tests execute.
//
//   POST /school/attempt                  check one answer (always) and keep it under a handle (only with consent)
//   GET  /school/progress/<handle>        mastery per course for a handle
//   POST /school/certificate              seal and deposit a certificate once a course is mastered
//   GET  /school/certificate/<address>    the certificate, every claim in it recomputed
//   POST /school/submit                   a proof exercise, stored as "queued for the kernel"
//   GET  /school/submission/<address>     a stored submission
//
// THE VERDICT IS RECOMPUTED HERE, never taken from the client: the lesson's statement comes from the served course
// file, is pinned to the sealed address the Worker bundles (sealedAddressOf), its exercise is re-derived, and the
// learner's value is evaluated by lesson/index.ts. A client verdict is only compared, and a disagreement is reported.
// Storage follows the /trials rule: nothing persists without "consent": true, and nothing personal is asked for —
// the handle is pseudonymous and the key arrives only to be compared with the digest stored beside it.
import { sealedAddressOf } from '../../theorems/index.js'
import { checkAnswer, exerciseOf, sealedAddressOfRow, lessonIn, COURSE, LESSON, CHECK_LABEL, type CourseFile, type Lesson } from '../lesson/index.js'
import {
  attemptOf, recordAttempt, emptyProgress, masteryOf, progressView, rateStep, certificateBodyOf, sealCertificate,
  verifyCertificate, isHandle, lockOf, CERTIFICATE_TEXT, type Progress, type AttemptVerdict, type CertificateVerdict,
} from '../progress/index.js'
import { submissionOf, submissionKey, QUEUED, type KvLike } from '../submission/index.js'
import { handleGrade, type SchoolDeps } from '../grade/index.js'

/** every school record — progress, certificates' progress links, submissions and their verdicts — lives in SCHOOL */
export interface SchoolEnv { SCHOOL?: KvLike; ASSETS: { fetch(req: Request): Promise<Response> } }
export interface DepositReply { deposited: boolean; address?: string; href?: string; why?: string }
export interface SchoolCtx {
  /** the Worker's clock in milliseconds, read at its boundary — the rate limit's only time source */
  now: number
  /** deposit a body through the MCP door (uuidna_evidence {run, deposit}), which seals it with the 2×7 witnesses */
  deposit?: (run: string, body: Record<string, unknown>) => Promise<DepositReply>
  /** read one stored qpu document by href → its value, or null */
  read?: (href: string) => Promise<unknown>
  /** the grader doors' verification inputs; absent = GitHub's published JWKS, fetched on a key-id miss */
  grader?: SchoolDeps
}

export const CERTIFICATE_RUN = 'school-certificate'
export const CERTIFICATE_STORAGE = `https://qpu.uuidna.com/storage/receipts/uuidna/${CERTIFICATE_RUN}`
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const progressKey = (handle: string): string => `school/progress/${handle}`

const json = (obj: unknown, status = 200): Response =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })

type Refusal = { refused: Response }
const refuse = (error: string, status: number, extra: Record<string, unknown> = {}): Refusal => ({ refused: json({ error, ...extra }, status) })

/** courseOf(env, origin, course) → the served course file, or null for an id no wing carries */
export async function courseOf(env: SchoolEnv, origin: string, course: string): Promise<CourseFile | null> {
  if (!COURSE.test(course)) return null
  const res = await env.ASSETS.fetch(new Request(new URL(`/school/${course}.json`, origin)))
  if (!res.ok) return null
  const file = (await res.json().catch(() => null)) as CourseFile | null
  return file && file.kind === 'school-course' && file.course === course ? file : null
}

/** pinnedExercise(course, key) → the lesson and its exercise, re-derived and pinned to the seal — or a refusal */
export function pinnedExercise(course: CourseFile, key: string): { lesson: Lesson; exercise: NonNullable<Lesson['exercise']> } | Refusal {
  if (!LESSON.test(key)) return refuse('a lesson id is a theorem key', 400)
  const lesson = lessonIn(course, key)
  if (!lesson) return refuse(`course ${course.course} serves no lesson ${key}`, 404)
  const sealed = sealedAddressOf(key)
  if (!sealed) return refuse(`${key} is not a sealed theorem`, 409)
  if (sealedAddressOfRow(key, lesson.statement) !== sealed) return refuse(`the served statement of ${key} does not address to its seal`, 409)
  const exercise = exerciseOf(lesson.statement)
  if (!exercise) return refuse(`lesson ${key} carries no instantly checked exercise`, 409)
  if (!lesson.exercise || lesson.exercise.at !== exercise.at || lesson.exercise.length !== exercise.length)
    return refuse(`the served exercise of ${key} disagrees with the one recomputed here`, 409)
  return { lesson, exercise }
}

/** recheckIn(course) → the certificate verifier's re-check: pinned to the seal, re-derived, re-evaluated */
const recheckIn = (course: CourseFile | null) => (key: string, answer: string): AttemptVerdict => {
  if (!course) return 'undecided'
  const p = pinnedExercise(course, key)
  return 'refused' in p ? 'undecided' : checkAnswer(p.lesson.statement, p.exercise, answer).verdict
}

const readBody = async (request: Request): Promise<Record<string, unknown>> => {
  try {
    const b = await request.json()
    return b && typeof b === 'object' && !Array.isArray(b) ? b as Record<string, unknown> : {}
  } catch { return {} }
}
const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : typeof v === 'number' && Number.isSafeInteger(v) ? String(v) : '')

/** unlock(env, body) → the handle's progress record, created on first use, when the key opens it */
async function unlock(env: SchoolEnv, body: Record<string, unknown>, create: boolean): Promise<{ progress: Progress; handle: string } | Refusal> {
  const handle = str(body.handle), key = str(body.key)
  if (!isHandle(handle)) return refuse('handle must be eight lowercase hex characters — the one your passphrase derives', 400)
  if (!UUID.test(key)) return refuse('key must be the uuid your passphrase derives (learnerKeyOf)', 400)
  if (!env.SCHOOL) return refuse('storage unavailable (no SCHOOL KV namespace bound)', 503)
  const raw = await env.SCHOOL.get(progressKey(handle))
  if (!raw && !create) return refuse('no progress is stored under this handle', 404)
  const progress = raw ? JSON.parse(raw) as Progress : emptyProgress(handle, lockOf(key))
  if (progress.lock !== lockOf(key)) return refuse('this handle is held by a different passphrase — choose another passphrase', 403)
  return { progress, handle }
}

/** handleSchool(request, url, env, ctx) → a Response for a school API request, or null to fall through to the assets */
export async function handleSchool(request: Request, url: URL, env: SchoolEnv, ctx: SchoolCtx): Promise<Response | null> {
  const path = url.pathname, method = request.method
  const graded = await handleGrade(request, url, env, ctx.now, ctx.grader)
  if (graded) return graded

  if (path === '/school/attempt' && method === 'POST') {
    const body = await readBody(request)
    const courseId = str(body.course), key = str(body.lesson), answer = str(body.answer)
    const course = await courseOf(env, url.origin, courseId)
    if (!course) return json({ error: `no course ${courseId || '(none given)'} is served — see /school/index.json` }, 404)
    const pinned = pinnedExercise(course, key)
    if ('refused' in pinned) return pinned.refused
    const check = checkAnswer(pinned.lesson.statement, pinned.exercise, answer)
    if (check.verdict === 'invalid') return json({ error: check.why, verdict: 'invalid' }, 400)
    const attempt = attemptOf(course.course, key, pinned.lesson.address, answer, check.verdict)
    if (typeof body.answerDigest === 'string' && body.answerDigest !== attempt.answerDigest)
      return json({ error: 'answerDigest does not address this answer to this lesson', expected: attempt.answerDigest }, 400)
    const clientVerdict = typeof body.verdict === 'string' ? body.verdict : undefined
    const out: Record<string, unknown> = {
      course: course.course, lesson: key, theorem: pinned.lesson.address, verdict: check.verdict,
      passed: check.verdict === 'correct', label: CHECK_LABEL, attempt,
      ...(clientVerdict !== undefined && clientVerdict !== check.verdict ? { overridden: true, clientVerdict } : {}),
    }
    if (body.handle === undefined) return json({ ...out, stored: false, note: 'checked, not stored. To keep progress, send your handle, key and "consent": true.' })
    if (body.consent !== true) return json({ ...out, stored: false, note: 'checked, not stored — no consent. Send "consent": true to keep this attempt under your handle.' })
    const u = await unlock(env, body, true)
    if ('refused' in u) return u.refused
    const rate = rateStep(u.progress, ctx.now)
    if (!rate.allowed) return json({ ...out, stored: false, error: 'too many attempts under this handle this minute — the check above still stands; try storing again shortly' }, 429)
    const next = recordAttempt({ ...u.progress, rate: rate.rate }, attempt, course.exercises)
    await env.SCHOOL!.put(progressKey(u.handle), JSON.stringify(next))
    const keys = course.lessons.filter((l) => l.exercise).map((l) => l.key)
    return json({ ...out, stored: true, mastery: masteryOf(next, course.course, keys) })
  }

  const prog = path.match(/^\/school\/progress\/([0-9a-f]{8})$/)
  if (prog && method === 'GET') {
    if (!env.SCHOOL) return json({ error: 'storage unavailable (no SCHOOL KV namespace bound)' }, 503)
    const raw = await env.SCHOOL.get(progressKey(prog[1]!))
    if (!raw) return json({ handle: prog[1], courses: [], note: 'no progress is stored under this handle' }, 404)
    return json(progressView(JSON.parse(raw) as Progress))
  }

  if (path === '/school/certificate' && method === 'POST') {
    const body = await readBody(request)
    const u = await unlock(env, body, false)
    if ('refused' in u) return u.refused
    const course = await courseOf(env, url.origin, str(body.course))
    if (!course) return json({ error: 'no such course is served' }, 404)
    const cb = certificateBodyOf(u.progress, course)
    if (!cb.ok) return json({ error: 'the course is not mastered under this handle yet', missing: cb.missing.length, next: cb.missing.slice(0, 5) }, 409)
    const seal = sealCertificate(cb.body)
    if (!seal.legal) return json({ error: `the certificate was not signed by the 2×7 theorems (${seal.signed} of ${seal.of} faces)` }, 500)
    const signed = { address: seal.address, href: `/school/certificate/${seal.address}`, seal: seal.seal, signed: seal.signed, of: seal.of }
    if (!ctx.deposit) return json({ ...signed, deposited: false, why: 'this surface has no binding to the deposit door' }, 503)
    const r = await ctx.deposit(CERTIFICATE_RUN, cb.body as unknown as Record<string, unknown>)
    if (!r.deposited) return json({ ...signed, deposited: false, why: r.why ?? 'the deposit door declined' }, 502)
    const state = u.progress.courses[course.course]!
    const next: Progress = { ...u.progress, courses: { ...u.progress.courses, [course.course]: { ...state, certificate: seal.address } } }
    await env.SCHOOL!.put(progressKey(u.handle), JSON.stringify(next))
    return json({ ...signed, deposited: true, stored: r.href ?? null, text: CERTIFICATE_TEXT }, 201)
  }

  const cert = path.match(/^\/school\/certificate\/([0-9a-f-]{36})$/)
  if (cert && method === 'GET' && UUID.test(cert[1]!)) {
    const address = cert[1]!
    if (!ctx.read) return json({ error: 'this surface has no reader for qpu storage' }, 503)
    const value = await ctx.read(`${CERTIFICATE_STORAGE}/${address}`)
    const wantsJson = url.searchParams.get('format') === 'json' || (request.headers.get('accept') ?? '').includes('application/json')
    if (!value || typeof value !== 'object') {
      return wantsJson ? json({ address, holds: false, error: 'no certificate is stored at this address' }, 404)
        : new Response(certificatePage({ holds: false, address, body: null, checks: [{ name: 'a certificate is stored at this address', holds: false }] }), { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } })
    }
    const stored = value as Record<string, unknown>
    const course = await courseOf(env, url.origin, typeof stored.course === 'string' ? stored.course : '')
    const verdict = verifyCertificate(address, stored, course, recheckIn(course))
    return wantsJson ? json(verdict)
      : new Response(certificatePage(verdict), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  }

  if (path === '/school/submit' && method === 'POST') {
    const body = await readBody(request)
    const course = await courseOf(env, url.origin, str(body.course))
    if (!course) return json({ error: 'no such course is served' }, 404)
    const lesson = lessonIn(course, str(body.lesson))
    if (!lesson) return json({ error: 'no such lesson in this course' }, 404)
    const sealed = sealedAddressOf(lesson.key)
    if (!sealed || sealedAddressOfRow(lesson.key, lesson.statement) !== sealed) return json({ error: `the served statement of ${lesson.key} does not address to its seal` }, 409)
    const lean = typeof body.lean === 'string' ? body.lean : ''
    const s = submissionOf(str(body.handle), course.course, lesson, lean)
    if (!s.ok) return json({ error: s.why }, 400)
    if (body.consent !== true) return json({ submittedAddress: s.submission.submittedAddress, status: QUEUED, stored: false, note: 'not stored — no consent. Send "consent": true to queue it for the kernel.' })
    const u = await unlock(env, body, true)
    if ('refused' in u) return u.refused
    await env.SCHOOL!.put(progressKey(u.handle), JSON.stringify(u.progress))
    await env.SCHOOL!.put(submissionKey(s.submission.submittedAddress), JSON.stringify(s.submission))
    return json({ submittedAddress: s.submission.submittedAddress, status: QUEUED, stored: true, href: `/school/submission/${s.submission.submittedAddress}` }, 201)
  }

  const sub = path.match(/^\/school\/submission\/([0-9a-f-]{36})(\/verdict)?$/)
  if (sub && UUID.test(sub[1]!)) {
    if (sub[2] && method === 'POST') return json({ error: 'verdicts are posted by the kernel grader to POST /school/grade, signed by the school-grade workflow' }, 404)
    if (!sub[2] && method === 'GET') {
      if (!env.SCHOOL) return json({ error: 'storage unavailable (no SCHOOL KV namespace bound)' }, 503)
      const raw = await env.SCHOOL.get(submissionKey(sub[1]!))
      return raw ? new Response(raw, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })
        : json({ error: 'no submission is stored at this address' }, 404)
    }
  }

  return null
}

const esc = (s: unknown): string => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

/** certificatePage(verdict) → the certificate as a page a person can read, every check listed with its outcome */
export function certificatePage(v: CertificateVerdict): string {
  const b = v.body
  const rows = v.checks.map((c) => `<tr><th scope="row">${esc(c.name)}</th><td>${c.holds ? 'holds' : 'FAILS'}</td><td>${esc(c.detail ?? '')}</td></tr>`).join('')
  const head = b
    ? `<p>Handle <code>${esc(b.handle)}</code> answered all ${esc(b.exercises)} checked exercises of the course <a href="/school/learn?course=${encodeURIComponent(b.course)}">${esc(b.title)}</a> (${esc(b.lessons)} lessons, wing <code>${esc(b.wing)}</code>).</p><p>${esc(b.text)}</p>`
    : '<p>No certificate could be read at this address.</p>'
  const lessons = b ? `<h2>Answers</h2><ul>${b.attempts.map((a) => `<li><a href="/theorem/${encodeURIComponent(a.lesson)}">${esc(a.lesson)}</a>: ${esc(a.answer)}</li>`).join('')}</ul>` : ''
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>School certificate ${esc(v.address.slice(0, 8))} · uuidna</title>
<style>:root{--bg:#ffffff;--fg:#3c3c43;--dim:#67676c;--line:#e2e2e3;--acc:#6b46e5}@media(prefers-color-scheme:dark){:root{--bg:#1b1b1f;--fg:#dfdfd6;--dim:#98989f;--line:#2e2e32;--acc:#a78bfa}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.55 ui-sans-serif,system-ui,sans-serif}main{max-width:820px;margin:0 auto;padding:24px 16px}h1{font-size:24px}a{color:var(--acc)}a:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
.v{font-weight:700}.wrap{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:6px 10px;border-bottom:1px solid var(--line);vertical-align:top}caption{text-align:left;color:var(--dim);padding-bottom:6px}code{word-break:break-all}</style></head>
<body><main><h1>School certificate</h1><p class="v" role="status">${v.holds ? 'Verified: every check below recomputed and holds.' : 'Not verified: at least one check below fails.'}</p>
${head}<div class="wrap"><table><caption>Each claim of the certificate, recomputed by this page just now</caption><thead><tr><th scope="col">check</th><th scope="col">outcome</th><th scope="col">detail</th></tr></thead><tbody>${rows}</tbody></table></div>
${lessons}<p>Address <code>${esc(v.address)}</code> · stored at <a href="${esc(CERTIFICATE_STORAGE)}/${esc(v.address)}">qpu storage</a> · <a href="/school/learn">the school</a></p></main></body></html>`
}
