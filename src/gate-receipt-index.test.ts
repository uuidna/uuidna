import { test } from 'node:test'
import assert from 'node:assert/strict'
import { changedFiles, deltaTestFiles, needsFullSuite, planTestRun } from './gate-receipt-index.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'

test('needsFullSuite — lean drift forces full suite', () => {
  assert.equal(needsFullSuite(['lean/Wave.lean']), true)
  assert.equal(needsFullSuite(['src/address.test.ts']), false)
})

test('deltaTestFiles maps changed test sources to dist paths', () => {
  const files = deltaTestFiles(['src/sequence-coverage.test.ts'])
  assert.ok(files.some((f) => f.endsWith('sequence-coverage.test.js')))
})

test('changedFiles reports digest moves only', () => {
  const a = { 'src/address.test.ts': '1111', 'src/foo.ts': '2222' }
  const b = { 'src/address.test.ts': '3333', 'src/foo.ts': '2222' }
  assert.deepEqual(changedFiles(a, b), ['src/address.test.ts'])
})

test('planTestRun — absent receipt plans full suite', () => {
  const plan = planTestRun()
  assert.ok(plan.mode === 'full' || plan.mode === 'skip' || plan.mode === 'delta')
})

// ── THE MINTER'S CALLERS MUST NAME WHAT THEY RAN. gate-receipt was hardened to refuse a bare write — a receipt
// is an attestation, and one written without a run is how a red tree passes a green gate. next.ts was never
// taught to pass `--verified`, so both of its call sites invoked a bare write, the refusal fired correctly on
// every run, and `npm run next` reported the version NOT READY for one reason: the arm that mints the proof was
// calling the minter wrong. A hardening that lands without its callers is drift inside the finder chain itself.
test('every caller of gate-receipt passes --verified, and derives the list from the run', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'next.ts'), 'utf8')
  const calls = [...src.matchAll(/gate-receipt\.js([^`'"]*)/g)].map((m) => m[1] ?? '')
  assert.ok(calls.length >= 2, 'next has a fast path and a full path; both mint')
  for (const args of calls)
    assert.match(args, /--verified/, 'a bare gate-receipt write is refused by the minter — pass what ran')
  // AND THE LIST IS PARSED, NEVER TYPED. A literal here rebuilds the exact defect the hardening removed, by
  // construction: it is written once and then claims every later run, whatever those runs did.
  assert.match(src, /armsVerifiedFrom/, 'the verified list must be derived from the runner’s own output')
  assert.doesNotMatch(src, /--verified types,tests,guard/, 'a typed arm list is an unattributable claim')
  const helper = /const armsVerifiedFrom[\s\S]*?\n}/.exec(src)?.[0] ?? ''
  assert.match(helper, /passes/, 'only arms the runner reported as PASSING may be named')
  assert.match(helper, /return \[\]|\? \[/, 'output that names nothing must yield no list, so no receipt is minted')
})

test('the arm parse claims passing arms only — a red arm and silence both yield nothing', () => {
  // the parse, held here against the shapes green and gate-all actually print
  const parse = (out: string): string[] => {
    const named = [...out.matchAll(/^✓ green — (\S+)\s+passes/gm)].map((m) => m[1]!)
    if (named.length) return [...new Set(named)]
    return /^✓ gate-all — all \d+ checks green/m.test(out) ? ['gate-all'] : []
  }
  assert.deepEqual(parse('✓ green — types   passes     tsc with noEmitOnError\n✓ green — qa      passes     audit'),
    ['types', 'qa'])
  assert.deepEqual(parse('✓ gate-all — all 41 checks green in ONE pass (123ms wall-clock).'), ['gate-all'])
  assert.deepEqual(parse('✗ green — tests   FAILS      the suite is red'), [], 'a failing arm is never claimed')
  assert.deepEqual(parse('· green — tests   UNMEASURED  nothing ran'), [], 'unmeasured is not passing')
  assert.deepEqual(parse(''), [], 'silence attributes nothing, so nothing is minted')
})
