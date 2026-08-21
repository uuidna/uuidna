// mcp-e2e-online — THE NETWORK TOOLS, DRIVEN OVER THE WIRE, WITHOUT MAKING SOMEONE ELSE'S OUTAGE OUR RED BUILD.
//
// The offline e2e proves the protocol. This proves the half of the surface that leaves the machine — and it has to
// answer a question the offline suite never faces: when a call comes back empty, WHO failed? A test that simply
// asserts rows turns "an EU API is down" into "uuidna is broken", and a suite that cries wolf is a suite people
// stop reading. The repo already holds this law for school-apis (every unit test there is pure, deliberately).
//
// So the split is explicit and it is the whole design:
//   HARD FAILURE  — the ENVELOPE. A reachable source must return the shape the tool promises: the declared fields,
//                   a content-addressed row for every result, a recomputable receipt. That is uuidna's contract and
//                   it cannot be excused by anyone else's uptime.
//   SKIPPED, LOUDLY — a source that answered nothing. Reported by name.
//
// It also asserts something the live heartbeat currently cannot: that a row is real DATA and not an HTML error page
// served with a 200. Researching the EU API surface found twelve endpoints doing exactly that, two of them at a
// path containing /api/ — so "it answered" is not the same as "it answered with data".
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, type ChildProcessByStdio } from 'node:child_process'
import type { Readable, Writable } from 'node:stream'
import { createInterface } from 'node:readline'

interface Rpc { id?: number; result?: unknown; error?: { message?: string } }
// stderr is 'ignore' here (the offline suite is what asserts stderr silence), so the handle has a null third
// stream — typed exactly rather than cast, because a cast that lies is how a null slips through to a runtime throw.
let srv: ChildProcessByStdio<Writable, Readable, null>
let seq = 0
const waiting = new Map<number, (m: Rpc) => void>()

const rpc = (method: string, params?: object, ms = 60000): Promise<Rpc> =>
  new Promise((resolve, reject) => {
    const id = ++seq
    const timer = setTimeout(() => { waiting.delete(id); reject(new Error(`no answer to ${method} in ${ms}ms`)) }, ms)
    waiting.set(id, (m) => { clearTimeout(timer); resolve(m) })
    srv.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, ...(params ? { params } : {}) }) + '\n')
  })
const callText = (r: Rpc): string => ((r.result as { content?: { text?: string }[] } | undefined)?.content?.[0]?.text) ?? ''
const call = async (name: string, args: object): Promise<{ raw: string; body: Record<string, unknown> }> => {
  const r = await rpc('tools/call', { name, arguments: args })
  const raw = callText(r)
  assert.equal(r.error, undefined, `${name} errored on the wire: ${JSON.stringify(r.error)}`)
  let body: Record<string, unknown>
  try { body = JSON.parse(raw) as Record<string, unknown> } catch {
    // an unparseable payload is OURS, whatever the upstream did — a tool must never pass a source's HTML through
    throw new assert.AssertionError({ message: `${name} returned a payload that is not JSON: ${raw.slice(0, 200)}` })
  }
  return { raw, body }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
/** the tell that a row is DATA and not a web page handed back with a 200 */
const looksLikeHtml = (s: string): boolean => /<!doctype html|<html[\s>]|<meta |<script[\s>]/i.test(s)

/** Is the outside world reachable AT ALL? Without this, a CI runner with no egress would run every case below
 *  against a wall. The envelope assertions would still hold (best-effort fetchers return an empty answer
 *  throw), but the suite would spend its timeouts proving nothing. One cheap probe decides, and when it fails every
 *  case SKIPS by name — a green deploy on an offline machine is correct, and a silent one would not be. */
let online = false
const reachable = async (): Promise<boolean> => {
  try {
    const c = new AbortController()
    const t = setTimeout(() => { c.abort() }, 8000)
    const r = await fetch('https://ec.europa.eu/esco/api/search?text=a&language=en&type=skill&limit=1', { signal: c.signal })
    clearTimeout(t)
    return r.ok
  } catch { return false }
}

before(async () => {
  online = await reachable()
  srv = spawn(process.execPath, ['dist/mcp.js'], { stdio: ['pipe', 'pipe', 'ignore'] })
  createInterface({ input: srv.stdout }).on('line', (line) => {
    let msg: Rpc
    try { msg = JSON.parse(line) as Rpc } catch { return }
    if (msg.id !== undefined && waiting.has(msg.id)) waiting.get(msg.id)!(msg)
    waiting.delete(msg.id!)
  })
})
after(() => { srv.kill() })

// ── EVERY WIRED SOURCE, THROUGH THE SERVED TOOL. The envelope is asserted for all of them; only the ROWS are
// allowed to be absent, and an absence is skipped by name rather than passed in silence.
const SOURCES: { source: string; args: Record<string, unknown> }[] = [
  { source: 'esco', args: { text: 'chemistry', limit: 3 } },
  { source: 'eurostat', args: { dataset: 'educ_uoe_enrt01', geo: 'BG', time: '2022', limit: 3 } },
  { source: 'gisco', args: { country: 'BG', limit: 3 } },
  { source: 'data-europa', args: { text: 'education', limit: 3 } },
  { source: 'cordis', args: { text: 'quantum', limit: 3 } },
  { source: 'ted', args: { limit: 3 } },
]

for (const { source, args } of SOURCES)
  test(`e2e online: ${source} answers the served contract`, async (t) => {
    if (!online) { t.skip('no network egress from this machine — the offline e2e suite covers the protocol'); return }
    // A DEADLINE, BECAUSE AN UNBOUNDED WAIT IS NOT A TEST. This awaited a live third party with no bound and
    // inherited the runner's 60s default: measured at 60,007ms for one source, which is a minute of CI burned to
    // learn nothing. A source that will not answer in five seconds has not broken the served contract — it has
    // failed to speak — so the deadline SKIPS by name rather than failing, the same way no-egress does. What
    // does not finish, dies.
    const answered = await Promise.race([
      call('uuidna_school_apis', { source, ...args }).then((r) => r as { body: Record<string, unknown> }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000).unref()),
    ])
    if (!answered) { t.skip(`${source} did not answer within 5s — the contract is untested here, not broken`); return }
    const { body } = answered
    // ── the ENVELOPE is ours, and it holds whether or not the source had anything to say
    assert.equal(body.source, source, 'the answer must say which source it came from')
    assert.ok(typeof body.url === 'string' && (body.url as string).startsWith('https://'), 'the exact url must be citable')
    assert.equal(typeof body.count, 'number')
    assert.ok(Array.isArray(body.results), 'results must always be an array, empty or not')
    assert.equal((body.results as unknown[]).length, body.count, 'the count must be what is served')
    assert.match(String(body.receipt), UUID, 'the receipt is a content-address, computed from what came back')
    assert.ok(String(body.honest).length > 80, 'the honest scope travels with every answer')

    if (!(body.count as number)) { t.skip(`${source} returned no rows — reported's defect`); return }

    for (const row of body.results as Record<string, unknown>[]) {
      assert.equal(row.source, source, 'each row names its origin')
      assert.match(String(row.address), UUID, 'each row is content-addressed, so it can be cited and rechecked')
      // the finding the live heartbeat cannot see: twelve EU endpoints serve HTML with a 200, two of them at /api/
      assert.ok(!looksLikeHtml(JSON.stringify(row)), `${source} row carries HTML — that is a web page`)
    }
  })

// ── THE PAIRING, END TO END. The one tool that walks a published relation across two hops.
test('e2e online: education↔jobs walks ESCO and returns a shaped pairing', async (t) => {
  if (!online) { t.skip('no network egress from this machine'); return }
  const { body } = await call('uuidna_education_jobs', { subject: 'quantum', perSkill: 2 })
  assert.equal(body.subject, 'quantum')
  assert.ok(Array.isArray(body.pairs), 'pairs must always be an array')
  assert.ok(Array.isArray(body.homographs), 'the rejected lexical hits are returned by name')
  assert.match(String(body.receipt), UUID)
  const pairs = body.pairs as { escoSkill?: { uri?: string; title?: string }; occupations?: { uri?: string; relation?: string }[] }[]
  if (!pairs.length || !pairs[0].escoSkill) { t.skip('ESCO returned no skill for "quantum" — reported'); return }
  for (const p of pairs) {
    assert.match(String(p.escoSkill?.uri), /^https?:\/\/data\.europa\.eu\/esco\//, 'the skill must be a real ESCO URI')
    for (const o of p.occupations ?? []) {
      assert.match(String(o.uri), /^https?:\/\/data\.europa\.eu\/esco\/occupation\//, 'an occupation must be ESCO\'s own id')
      assert.ok(o.relation === 'essential' || o.relation === 'optional', 'the relation is ESCO\'s published one')
    }
  }
})

// ── THE HEARTBEAT, OVER THE WIRE. It must report darkness rather than raise, so this asserts it ANSWERS even when
// sources are down — the one test whose passing must not depend on the internet at all.
test('e2e online: the liveness probe reports rather than raises', async (t) => {
  if (!online) { t.skip('no network egress from this machine'); return }
  const { body } = await call('uuidna_school_apis', { source: 'esco', text: 'zzzqqqvvvxxx-not-a-skill', limit: 3 })
  assert.equal(body.source, 'esco')
  assert.ok(Array.isArray(body.results), 'a query that matches nothing must still return the envelope')
  assert.equal((body.results as unknown[]).length, body.count, 'an empty answer is still a well-formed answer')
})
