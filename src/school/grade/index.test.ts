// school/grade doors — the verdict post refuses what the school-grade workflow did not sign, and records only on a
// queued submission; the queue listing serves queued work without the handle.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../boundary.js'
import { handleGrade, kernelGraded, QUEUED, SCHOOL_GRADER, submissionKey, type KvLike, type Submission } from './index.js'
import { GITHUB_ACTIONS_ISSUER, type Jwks } from '../../oidc.js'

const NOW_S = 1800000000
const NOW = NOW_S * 1000
const b64u = (b: Uint8Array): string => Buffer.from(b).toString('base64url')
const enc = (o: unknown): string => b64u(new TextEncoder().encode(JSON.stringify(o)))

async function signer(): Promise<{ jwks: Jwks; token: (over?: Record<string, unknown>) => Promise<string> }> {
  const k = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify'])
  const pub = await crypto.subtle.exportKey('jwk', k.publicKey)
  return {
    jwks: { keys: [{ kty: 'RSA', kid: 'k1', n: pub.n, e: pub.e }] },
    token: async (over = {}) => {
      const data = enc({ alg: 'RS256', kid: 'k1' }) + '.' + enc({
        iss: GITHUB_ACTIONS_ISSUER, aud: 'https://uuidna.com', repository: 'uuidna/uuidna',
        workflow_ref: 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main', sha: 'abc123', run_id: 42,
        iat: NOW_S - 5, nbf: NOW_S - 5, exp: NOW_S + 300, ...over,
      })
      return data + '.' + b64u(new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', k.privateKey, new TextEncoder().encode(data))))
    },
  }
}

function kv(subs: Submission[]): KvLike & { m: Map<string, string> } {
  const m = new Map(subs.map((s) => [submissionKey(s.submittedAddress), JSON.stringify(s)]))
  return {
    m,
    get: async (k) => m.get(k) ?? null,
    put: async (k, v) => { m.set(k, v) },
    list: async ({ prefix }) => ({ keys: [...m.keys()].filter((k) => k.startsWith(prefix)).sort().map((name) => ({ name })), list_complete: true }),
  }
}

const sub = (address: string, lean: string, status: Submission['status'] = QUEUED): Submission =>
  ({ kind: 'school-submission', handle: 'h-' + address, course: 'nat', lesson: 'plus-zero', lean, submittedAddress: address, status })

const post = (body: unknown, token?: string): Request => new Request('https://uuidna.com/school/grade', {
  method: 'POST', body: JSON.stringify(body),
  headers: { 'content-type': 'application/json', ...(token ? { authorization: 'Bearer ' + token } : {}) },
})
const call = (req: Request, env: { SCHOOL?: KvLike }, jwks: Jwks): Promise<Response | null> => handleGrade(req, new URL(req.url), env, NOW, { jwks })

test('an unsigned post, a badly signed post and another workflow\'s token are refused 401 and write nothing', async () => {
  const s = await signer(), store = kv([sub('a1', 'intro n\nrfl')])
  const before = [...store.m.entries()]
  const body = { verdicts: [{ submittedAddress: 'a1', verdict: 'kernel-accepted', reason: 'ok', axioms: [] }] }
  assert.equal((await call(post(body), { SCHOOL: store }, s.jwks))!.status, 401)
  const other = await signer()
  assert.equal((await call(post(body, await other.token()), { SCHOOL: store }, s.jwks))!.status, 401, 'a key GitHub did not publish')
  assert.equal((await call(post(body, await s.token({ workflow_ref: 'uuidna/uuidna/.github/workflows/school.yml@refs/heads/main' })), { SCHOOL: store }, s.jwks))!.status, 401)
  assert.equal((await call(post(body, await s.token({ exp: NOW_S - 1 })), { SCHOOL: store }, s.jwks))!.status, 401)
  assert.deepEqual([...store.m.entries()], before)
})

test('a signed post records verdicts on queued submissions only', async () => {
  const s = await signer()
  const graded = { ...sub('b2', 'omega', 'kernel-refused'), reason: 'earlier', axioms: null }
  const store = kv([sub('a1', 'intro n\nrfl'), graded, sub('c3', 'sorry'), sub('d4', 'simp'), sub('e5', 'decide')])
  const res = await call(post({ verdicts: [
    { submittedAddress: 'a1', verdict: 'kernel-accepted', reason: 'the kernel accepted plus_zero', axioms: [] },
    { submittedAddress: 'zz', verdict: 'kernel-accepted', reason: 'x', axioms: [] },
    { submittedAddress: 'b2', verdict: 'kernel-accepted', reason: 'regrade', axioms: [] },
    { submittedAddress: 'c3', verdict: 'kernel-accepted', reason: 'forged', axioms: [] },
    { submittedAddress: 'd4', verdict: 'kernel-accepted', reason: 'x', axioms: ['propext'] },
    { submittedAddress: 'e5', verdict: 'kernel-refused', reason: 'type mismatch', axioms: null },
    { submittedAddress: 'e5', verdict: 'kernel-accepted', reason: 'second', axioms: [] },
    { submittedAddress: 'a1', verdict: 'maybe', reason: 'x', axioms: [] },
  ] }, await s.token()), { SCHOOL: store }, s.jwks)
  assert.equal(res!.status, 200)
  const out = await res!.json() as { recorded: string[]; ignored: { submittedAddress: string | null; why: string }[] }
  assert.deepEqual(out.recorded, ['a1', 'e5'])
  const why = (a: string | null): string => out.ignored.find((i) => i.submittedAddress === a)?.why ?? ''
  assert.match(why('zz'), /no such submission/)
  assert.match(why('b2'), /not queued/)
  assert.match(why('c3'), /door refuses/)
  assert.match(why('d4'), /empty axiom list/)
  assert.match(why('e5'), /second verdict/)
  assert.match(why(null), /shape/)
  const a1 = JSON.parse(store.m.get(submissionKey('a1'))!) as Submission
  assert.equal(a1.status, 'kernel-accepted')
  assert.deepEqual(a1.gradedBy, { workflowRef: 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main', sha: 'abc123', runId: '42' })
  assert.equal(kernelGraded(a1), true)
  assert.equal(JSON.parse(store.m.get(submissionKey('b2'))!).reason, 'earlier', 'an already-graded record is untouched')
  const e5 = JSON.parse(store.m.get(submissionKey('e5'))!) as Submission
  assert.equal(e5.status, 'kernel-refused')
  assert.equal(kernelGraded(e5), false)
})

test('kernelGraded counts only a kernel acceptance with no axioms and signed provenance', () => {
  const by = { workflowRef: 'uuidna/uuidna/.github/workflows/school-grade.yml@refs/heads/main', sha: 's', runId: '1' }
  assert.equal(kernelGraded({ ...sub('x', 'rfl'), status: 'kernel-accepted', axioms: [], gradedBy: by }), true)
  assert.equal(kernelGraded({ ...sub('x', 'rfl'), status: 'kernel-accepted', axioms: [] }), false, 'no provenance')
  assert.equal(kernelGraded({ ...sub('x', 'rfl'), status: 'kernel-accepted', axioms: ['propext'], gradedBy: by }), false)
  assert.equal(kernelGraded({ ...sub('x', 'rfl'), status: 'door-refused', axioms: null, gradedBy: by }), false)
  assert.equal(kernelGraded(sub('x', 'rfl')), false, 'queued')
})

test('the queue lists queued submissions without the handle; wrong method, status or storage are named', async () => {
  const s = await signer()
  const store = kv([sub('a1', 'rfl'), { ...sub('b2', 'omega', 'kernel-accepted'), axioms: [] }])
  const res = await call(new Request('https://uuidna.com/school/submissions?status=queued'), { SCHOOL: store }, s.jwks)
  const body = await res!.json() as { submissions: Record<string, unknown>[] }
  assert.deepEqual(body.submissions, [{ submittedAddress: 'a1', course: 'nat', lesson: 'plus-zero', lean: 'rfl' }])
  assert.ok(!JSON.stringify(body).includes('h-a1'), 'the handle stays in the store')
  assert.equal((await call(new Request('https://uuidna.com/school/submissions'), { SCHOOL: store }, s.jwks))!.status, 400)
  assert.equal((await call(new Request('https://uuidna.com/school/submissions?status=queued'), {}, s.jwks))!.status, 503)
  assert.equal((await call(new Request('https://uuidna.com/school/grade'), { SCHOOL: store }, s.jwks))!.status, 405)
  assert.equal((await call(post({ verdicts: [] }, await s.token()), {}, s.jwks))!.status, 503, 'a signed post with no store is 503, never a silent drop')
  assert.equal(await call(new Request('https://uuidna.com/school/submit', { method: 'POST' }), { SCHOOL: store }, s.jwks), null, 'the learner side\'s routes fall through')
})

test('worker.js reaches both grader doors through the school routes module, with the boundary clock', () => {
  const src = readFileSync(join(ROOT, 'worker.js'), 'utf8')
  assert.match(src, /import \{ handleSchool \} from '\.\/dist\/school\/routes\/index\.js'/)
  assert.doesNotMatch(src, /dist\/school\/grade\//, 'one school import in the Worker; the routes module delegates')
  assert.match(src, /now: Date\.now\(\)/)
  const routes = readFileSync(join(ROOT, 'src', 'school', 'routes', 'index.ts'), 'utf8')
  assert.match(routes, /handleGrade\(request, url, env, ctx\.now, ctx\.grader\)/)
})

test('the workflow keeps untrusted code and the signing permission in different jobs', () => {
  const y = readFileSync(join(ROOT, '.github', 'workflows', SCHOOL_GRADER.workflowFile), 'utf8')
  assert.ok(!/\t/.test(y), 'YAML indents with spaces only')
  for (const line of y.split('\n')) assert.equal((line.length - line.trimStart().length) % 2, 0, `even indentation: ${line}`)
  assert.match(y, /^on:\n  schedule:\n    - cron: '\*\/15 \* \* \* \*'\n  workflow_dispatch:\n/m)
  assert.match(y, /^permissions: \{\}$/m, 'nothing is granted workflow-wide')
  const kernel = y.slice(y.indexOf('\n  kernel:\n'), y.indexOf('\n  post:\n'))
  const postJob = y.slice(y.indexOf('\n  post:\n'))
  assert.ok(kernel.length > 0 && postJob.length > 0)
  assert.match(kernel, /\n    permissions:\n      contents: read\n    outputs:/, 'the kernel job reads the repository and holds nothing else')
  assert.doesNotMatch(kernel, /id-token|secrets\.|write/, 'no signing permission, secret or write scope where learner code runs')
  assert.match(kernel, /persist-credentials: false/)
  assert.match(kernel, /actions\/cache\/restore@v4/)
  assert.doesNotMatch(kernel, /actions\/cache@/, 'the kernel job never saves a cache other workflows restore')
  assert.match(kernel, /node dist\/scripts\/school-grade\.js school-verdicts\.json/)
  assert.match(kernel, /actions\/upload-artifact@v7/)
  assert.match(postJob, /\n    needs: kernel\n/)
  assert.match(postJob, /\n    permissions:\n      id-token: write\n      contents: read\n    steps:/)
  assert.doesNotMatch(postJob, /actions\/checkout|npm |node |lean/, 'the post job executes nothing from the repository or the artifact')
  assert.match(postJob, /actions\/download-artifact@v7/)
  assert.match(postJob, /audience=https%3A%2F%2Fuuidna\.com/)
  assert.match(postJob, /https:\/\/uuidna\.com\/school\/grade/)
})
