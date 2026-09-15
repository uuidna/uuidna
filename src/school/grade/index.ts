// @non-harmonic: async/await, because the grader's doors read and write the SCHOOL KV namespace and verify the OIDC token with WebCrypto, both Promise-returning at the Worker boundary; the verdict logic they call (verdict/, door/, proof/) is pure.
//
// school/grade — the Worker's two grader doors, reached through src/school/routes. Runs at the edge: no Node builtins
// in this module's graph.
//   GET  /school/submissions?status=queued  the public queue the school-grade workflow's kernel job reads (no handle)
//   POST /school/grade                      verdicts, accepted only under an OIDC token minted for the school-grade
//                                           workflow on uuidna/uuidna's main branch, recorded only on queued submissions
import { verifyActionsToken, verifyActionsTokenFetching, type Jwks, type OidcExpectation } from '../../oidc.js'
import { applyVerdict, verdictOf } from './verdict/index.js'
import { QUEUED, SUBMISSION_PREFIX, submissionKey, type GradedBy, type KvLike, type QueuedSubmission, type Submission } from '../submission/index.js'

export { kernelGraded } from './verdict/index.js'
export type { Exercise } from './proof/index.js'
export type { Submission, Verdict, KernelVerdict, QueuedSubmission, GradedBy, KvLike } from '../submission/index.js'
export { QUEUED, submissionKey, SUBMISSION_PREFIX } from '../submission/index.js'

/** the one workflow whose token may post verdicts */
export const SCHOOL_GRADER: OidcExpectation = {
  audience: 'https://uuidna.com', repository: 'uuidna/uuidna', workflowFile: 'school-grade.yml', ref: 'refs/heads/main',
}

export interface GradeEnv { SCHOOL?: KvLike }
/** jwks given = verify against it without fetching (tests); absent = GitHub's JWKS, fetched on a kid miss */
export interface SchoolDeps { jwks?: Jwks; fetch?: typeof fetch }

/** a post carries at most this many verdicts */
export const MAX_VERDICTS = 200
/** the queue listing serves at most this many; the kernel job's 60 s budget per proof bounds its run by it */
export const QUEUE_LIMIT = 25
const LIST_PAGES = 10

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } })

async function readSubmission(store: KvLike, address: string): Promise<Submission | null> {
  const raw = await store.get(submissionKey(address))
  if (!raw) return null
  try { return JSON.parse(raw) as Submission } catch { return null }
}

async function queue(url: URL, store: KvLike): Promise<Response> {
  if (url.searchParams.get('status') !== 'queued') return json({ error: 'GET /school/submissions needs ?status=queued' }, 400)
  const asked = Number(url.searchParams.get('limit'))
  const limit = asked >= 1 && asked <= QUEUE_LIMIT ? asked - (asked % 1) : QUEUE_LIMIT
  const submissions: QueuedSubmission[] = []
  let cursor: string | undefined
  for (let page = 0; page < LIST_PAGES && submissions.length < limit; page++) {
    const listed = await store.list({ prefix: SUBMISSION_PREFIX, cursor })
    for (const k of listed.keys) {
      if (submissions.length >= limit) break
      const s = await readSubmission(store, k.name.slice(SUBMISSION_PREFIX.length))
      if (s && s.status === QUEUED && typeof s.lean === 'string')
        submissions.push({ submittedAddress: s.submittedAddress, course: s.course, lesson: s.lesson, lean: s.lean })
    }
    if (listed.list_complete || !listed.cursor) break
    cursor = listed.cursor
  }
  return json({ status: QUEUED, submissions })
}

async function grade(request: Request, store: KvLike | undefined, nowMs: number, deps: SchoolDeps): Promise<Response> {
  const auth = /^Bearer\s+(\S+)$/i.exec(request.headers.get('authorization') ?? '')
  if (!auth) return json({ error: 'POST /school/grade needs the school-grade workflow\'s GitHub Actions OIDC token as a Bearer credential' }, 401)
  const verified = deps.jwks
    ? await verifyActionsToken(auth[1]!, deps.jwks, SCHOOL_GRADER, nowMs)
    : await verifyActionsTokenFetching(auth[1]!, SCHOOL_GRADER, nowMs, deps.fetch ?? fetch)
  if (!verified.ok) return json({ error: 'the OIDC token is refused: ' + verified.reason }, 401)
  if (!store) return json({ error: 'storage unavailable (no SCHOOL KV namespace bound)' }, 503)
  let body: unknown
  try { body = await request.json() } catch { return json({ error: 'POST /school/grade needs a JSON body { "verdicts": [...] }' }, 400) }
  const list = (body as { verdicts?: unknown } | null)?.verdicts
  if (!Array.isArray(list)) return json({ error: 'POST /school/grade needs { "verdicts": [...] }' }, 400)
  if (list.length > MAX_VERDICTS) return json({ error: `at most ${MAX_VERDICTS} verdicts per post` }, 413)
  const by: GradedBy = { workflowRef: verified.claims.workflow_ref, sha: String(verified.claims.sha ?? ''), runId: String(verified.claims.run_id ?? '') }
  const recorded: string[] = [], ignored: { submittedAddress: string | null; why: string }[] = []
  const seen = new Set<string>()
  for (const raw of list) {
    const v = verdictOf(raw)
    if (!v) { ignored.push({ submittedAddress: null, why: 'not a verdict of the kernel job\'s shape' }); continue }
    if (seen.has(v.submittedAddress)) { ignored.push({ submittedAddress: v.submittedAddress, why: 'a second verdict for the same submission in one post' }); continue }
    seen.add(v.submittedAddress)
    const sub = await readSubmission(store, v.submittedAddress)
    if (!sub) { ignored.push({ submittedAddress: v.submittedAddress, why: 'no such submission' }); continue }
    const applied = applyVerdict(sub, v, by)
    if ('ignored' in applied) { ignored.push({ submittedAddress: v.submittedAddress, why: applied.ignored }); continue }
    await store.put(submissionKey(v.submittedAddress), JSON.stringify(applied.record))
    recorded.push(v.submittedAddress)
  }
  return json({ recorded, ignored })
}

/** handleGrade(request, url, env, nowMs, deps) → the response for a grader door, or null to fall through */
export async function handleGrade(request: Request, url: URL, env: GradeEnv, nowMs: number, deps: SchoolDeps = {}): Promise<Response | null> {
  if (url.pathname === '/school/grade') {
    if (request.method !== 'POST') return json({ error: 'POST /school/grade' }, 405)
    return grade(request, env.SCHOOL, nowMs, deps)
  }
  if (url.pathname === '/school/submissions') {
    if (request.method !== 'GET') return json({ error: 'GET /school/submissions?status=queued' }, 405)
    if (!env.SCHOOL) return json({ error: 'storage unavailable (no SCHOOL KV namespace bound)' }, 503)
    return queue(url, env.SCHOOL)
  }
  return null
}
