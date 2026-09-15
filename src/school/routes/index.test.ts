// school/routes — the Worker's learner doors EXECUTED against a fake KV, fake assets and a fake deposit door that
// seals exactly as the MCP door does (receiptSealOf, stored under SEALED_BY). worker.js itself is outside the TS graph
// and is checked as text in worker-wiring.test.ts; the routes it delegates to run here for real.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems } from '../../theorems/index.js'
import { receiptSealOf, SEALED_BY } from '../../refusal-trials.js'
import { composeCourse, type CourseFile } from '../lesson/index.js'
import { learnerHandleOf, learnerKeyOf, RATE_LIMIT, answerDigestOf } from '../progress/index.js'
import { handleSchool, CERTIFICATE_STORAGE, type SchoolCtx } from './index.js'
import { QUEUED, type KvLike } from '../submission/index.js'

const rows = theorems().filter((t) => t.file === 'Core.lean').slice(0, 3)
const fresh = (): CourseFile => composeCourse({ wing: 'Core.lean', title: 'Core', principle: rows[0]!.principle, skills: [], level: 0, band: '', rank: 1 }, rows, () => null)
const sealedOf = (c: CourseFile, i: number): string => { const l = c.lessons[i]!; return l.statement.slice(l.exercise!.at, l.exercise!.at + l.exercise!.length) }
const wrongOf = (c: CourseFile, i: number): string => String(BigInt(sealedOf(c, i)) + 1n)

class MemKV implements KvLike {
  map = new Map<string, string>()
  puts = 0
  async get(k: string): Promise<string | null> { return this.map.get(k) ?? null }
  async put(k: string, v: string): Promise<void> { this.puts++; this.map.set(k, v) }
  async list({ prefix }: { prefix: string }): Promise<{ keys: { name: string }[]; list_complete: boolean }> {
    return { keys: [...this.map.keys()].filter((k) => k.startsWith(prefix)).sort().map((name) => ({ name })), list_complete: true }
  }
}

const world = (served: CourseFile = fresh()) => {
  const kv = new MemKV()
  const store = new Map<string, Record<string, unknown>>()
  const env = {
    SCHOOL: kv,
    ASSETS: { fetch: async (req: Request): Promise<Response> => new URL(req.url).pathname === '/school/Core.json' ? new Response(JSON.stringify(served)) : new Response('not found', { status: 404 }) },
  }
  const ctx: SchoolCtx = {
    now: 1_000_000,
    // the door's fold, reproduced: seal with the 2×7 witnesses, refuse unsealed, store under the content address
    deposit: async (_run, body) => {
      const s = receiptSealOf(body)
      if (!s.legal) return { deposited: false, why: 'unsigned' }
      store.set(s.address, { ...body, [SEALED_BY]: { signed: s.signed, of: s.of, seal: s.seal, witnesses: s.witnesses } })
      return { deposited: true, address: s.address, href: `${CERTIFICATE_STORAGE}/${s.address}` }
    },
    read: async (href) => store.get(href.slice(href.lastIndexOf('/') + 1)) ?? null,
  }
  const call = async (method: string, path: string, body?: unknown, accept = 'application/json') => {
    const url = new URL('https://uuidna.com' + path)
    const init: RequestInit = { method, headers: { 'content-type': 'application/json', accept }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) }
    const res = await handleSchool(new Request(url, init), url, env, ctx)
    return res ? { status: res.status, text: await res.clone().text(), json: (await res.json().catch(() => null)) as Record<string, any> } : null
  }
  return { kv, store, env, ctx, call, served }
}
const P = 'a learner passphrase for the tests'
const who = { handle: learnerHandleOf(P), key: learnerKeyOf(P) }

test('an attempt is checked without a handle and stores nothing', async () => {
  const w = world()
  const right = await w.call('POST', '/school/attempt', { course: 'Core', lesson: w.served.lessons[0]!.key, answer: sealedOf(w.served, 0) })
  assert.equal(right!.status, 200)
  assert.equal(right!.json.verdict, 'correct')
  assert.equal(right!.json.stored, false)
  assert.match(right!.json.label, /not a proof by the Lean kernel/)
  const wrong = await w.call('POST', '/school/attempt', { course: 'Core', lesson: w.served.lessons[0]!.key, answer: wrongOf(w.served, 0) })
  assert.equal(wrong!.json.verdict, 'incorrect')
  assert.equal(w.kv.puts, 0)
})

test('a forged client verdict is overridden by the recomputed one', async () => {
  const w = world()
  const r = await w.call('POST', '/school/attempt', { course: 'Core', lesson: w.served.lessons[1]!.key, answer: wrongOf(w.served, 1), verdict: 'correct', ...who, consent: true })
  assert.equal(r!.json.verdict, 'incorrect')
  assert.equal(r!.json.passed, false)
  assert.equal(r!.json.overridden, true)
  assert.equal(r!.json.clientVerdict, 'correct')
  assert.equal(r!.json.mastery.passed, 0, 'the forged verdict never reaches the record')
  const agree = await w.call('POST', '/school/attempt', { course: 'Core', lesson: w.served.lessons[1]!.key, answer: sealedOf(w.served, 1), verdict: 'correct' })
  assert.equal(agree!.json.overridden, undefined, 'an agreeing client verdict is not flagged')
})

test('an answerDigest that does not address the answer is refused', async () => {
  const w = world()
  const key = w.served.lessons[0]!.key
  const bad = await w.call('POST', '/school/attempt', { course: 'Core', lesson: key, answer: sealedOf(w.served, 0), answerDigest: answerDigestOf('Core', key, '9') })
  assert.equal(bad!.status, 400)
  const good = await w.call('POST', '/school/attempt', { course: 'Core', lesson: key, answer: sealedOf(w.served, 0), answerDigest: answerDigestOf('Core', key, sealedOf(w.served, 0)) })
  assert.equal(good!.status, 200)
})

test('a served statement that does not address to its seal, or an exercise that disagrees, is refused', async () => {
  const tampered = fresh()
  tampered.lessons[0] = { ...tampered.lessons[0]!, statement: tampered.lessons[0]!.statement.replace(/= (\d+)$/, '= 7') }
  const t = await world(tampered).call('POST', '/school/attempt', { course: 'Core', lesson: tampered.lessons[0]!.key, answer: '7' })
  assert.equal(t!.status, 409)
  const shifted = fresh()
  shifted.lessons[0] = { ...shifted.lessons[0]!, exercise: { ...shifted.lessons[0]!.exercise!, at: 1 } }
  const s = await world(shifted).call('POST', '/school/attempt', { course: 'Core', lesson: shifted.lessons[0]!.key, answer: '1' })
  assert.equal(s!.status, 409)
  const none = await world().call('POST', '/school/attempt', { course: 'NoSuchWing', lesson: 'x', answer: '1' })
  assert.equal(none!.status, 404)
})

test('progress is stored only with consent, under the passphrase that first claimed the handle', async () => {
  const w = world()
  const lesson = w.served.lessons[0]!.key
  const noConsent = await w.call('POST', '/school/attempt', { course: 'Core', lesson, answer: sealedOf(w.served, 0), ...who })
  assert.equal(noConsent!.json.stored, false)
  assert.equal(w.kv.puts, 0)
  const kept = await w.call('POST', '/school/attempt', { course: 'Core', lesson, answer: sealedOf(w.served, 0), ...who, consent: true })
  assert.equal(kept!.json.stored, true)
  assert.deepEqual(kept!.json.mastery, { course: 'Core', passed: 1, of: 3, mastered: false, certificate: null })
  const stolen = await w.call('POST', '/school/attempt', { course: 'Core', lesson, answer: sealedOf(w.served, 0), handle: who.handle, key: learnerKeyOf('someone else entirely'), consent: true })
  assert.equal(stolen!.status, 403)
  const view = await w.call('GET', `/school/progress/${who.handle}`)
  assert.equal(view!.json.courses[0].passed, 1)
  const raw = [...w.kv.map.values()].join('')
  assert.equal(raw.includes(who.key), false, 'the key itself is never stored')
  assert.equal(raw.includes(P), false, 'the passphrase never reaches the Worker')
  assert.equal((await w.call('GET', '/school/progress/00000000'))!.status, 404)
})

test('the rate limit refuses to store past RATE_LIMIT attempts per handle per window', async () => {
  const w = world()
  const body = { course: 'Core', lesson: w.served.lessons[0]!.key, answer: wrongOf(w.served, 0), ...who, consent: true }
  for (let i = 0; i < RATE_LIMIT; i++) assert.equal((await w.call('POST', '/school/attempt', body))!.status, 200)
  const over = await w.call('POST', '/school/attempt', body)
  assert.equal(over!.status, 429)
  assert.equal(over!.json.verdict, 'incorrect', 'the check itself still answers')
})

test('mastery earns a certificate whose page recomputes every claim, and a tampered one fails', async () => {
  const w = world()
  const early = await w.call('POST', '/school/certificate', { course: 'Core', ...who })
  assert.equal(early!.status, 404, 'no progress yet under this handle')
  for (let i = 0; i < 3; i++) await w.call('POST', '/school/attempt', { course: 'Core', lesson: w.served.lessons[i]!.key, answer: i === 2 ? wrongOf(w.served, i) : sealedOf(w.served, i), ...who, consent: true })
  const partial = await w.call('POST', '/school/certificate', { course: 'Core', ...who })
  assert.equal(partial!.status, 409, 'two of three is not mastery')
  await w.call('POST', '/school/attempt', { course: 'Core', lesson: w.served.lessons[2]!.key, answer: sealedOf(w.served, 2), ...who, consent: true })
  const issued = await w.call('POST', '/school/certificate', { course: 'Core', ...who })
  assert.equal(issued!.status, 201, issued!.text)
  assert.equal(issued!.json.deposited, true)
  assert.equal(issued!.json.signed, 14)
  const address = issued!.json.address as string
  const page = await w.call('GET', `/school/certificate/${address}?format=json`)
  assert.equal(page!.json.holds, true, JSON.stringify(page!.json.checks))
  const html = await w.call('GET', `/school/certificate/${address}`, undefined, 'text/html')
  assert.match(html!.text, /not an accredited qualification/)
  assert.match(html!.text, /Verified: every check below recomputed and holds/)
  assert.equal((await w.call('GET', `/school/progress/${who.handle}`))!.json.courses[0].certificate, address)

  const doc = w.store.get(address)!
  w.store.set(address, { ...doc, handle: '00000000' })
  assert.equal((await w.call('GET', `/school/certificate/${address}?format=json`))!.json.holds, false, 'a changed field fails the page')
  assert.equal((await w.call('GET', '/school/certificate/00000000-0000-8000-8000-000000000000?format=json'))!.status, 404)
})

test('a proof submission is queued for the kernel in SCHOOL, and the grader\'s doors see it', async () => {
  const w = world()
  const t = w.served.lessons[0]!
  const proof = `theorem ${t.key} : ${t.statement} := by decide`
  const withSorry = await w.call('POST', '/school/submit', { course: 'Core', lesson: t.key, lean: `theorem ${t.key} : ${t.statement} := by\n  sorry`, ...who, consent: true })
  assert.equal(withSorry!.status, 400)
  const queued = await w.call('POST', '/school/submit', { course: 'Core', lesson: t.key, lean: proof, ...who, consent: true })
  assert.equal(queued!.status, 201)
  assert.equal(queued!.json.status, 'queued for the kernel')
  const read = await w.call('GET', `/school/submission/${queued!.json.submittedAddress}`)
  assert.equal(read!.json.status, 'queued for the kernel')
  assert.equal(read!.json.lean, proof)
  const listed = await w.call('GET', '/school/submissions?status=queued')
  assert.deepEqual(listed!.json.submissions, [{ submittedAddress: queued!.json.submittedAddress, course: 'Core', lesson: t.key, lean: proof }], 'the grader\'s queue lists it, without the handle')
  assert.equal(read!.json.status, QUEUED)
  assert.equal((await w.call('POST', '/school/grade', { verdicts: [] }))!.status, 401, 'a verdict post without the workflow\'s token is refused')
  const door = await w.call('POST', '/school/submit', { course: 'Core', lesson: t.key, lean: `theorem ${t.key} : ${t.statement} := by\n  native_decide`, ...who, consent: true })
  assert.equal(door!.status, 400, 'a proof the grader\'s door refuses is never queued')
})

test('paths that are not learner doors fall through to the assets', async () => {
  const w = world()
  assert.equal(await w.call('GET', '/school/learn'), null)
  assert.equal(await w.call('GET', '/school/Core.json'), null)
})
