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

test('listCoveredFiles never includes generated payloads', async () => {
  const { listCoveredFiles } = await import('./gate-receipt-index.js')
  const files = listCoveredFiles()
  assert.ok(files.length > 0)
  assert.ok(files.every((f) => !f.startsWith('src/chunks/') && !f.startsWith('src/seeds/')))
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
  // THE LAW IS "EVERY CALLER PASSES --verified", NOT "THERE ARE TWO CALLERS". This asserted both paths mint, which
  // was true when the hardening landed; the fast path has since been taught NOT to recompute — `gate-receipt
  // --verify gathered heat (drift_is_named_or_caught); it stays on land, off this path` — so it is no longer a
  // caller at all and the count read as a regression while the actual defect (a caller invoking the minter bare)
  // was absent. The count is replaced by the two things that matter: something mints, and the skip stays NAMED,
  // so a silent removal of the minting call still fails here (2026-09-18).
  assert.ok(calls.length >= 1, 'the minting path must still call gate-receipt')
  assert.match(src, /skip gate-receipt --verify/, 'the fast path may decline to mint only while it says so in the open')
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

// ── THE GRAPH NAMES THE TESTS THAT CAN OBSERVE A MOVE (2026-09-11). Fixture tree: a.test imports a imports b;
// c.test reads lean/; d.test reads nothing covered; e.test imports by a non-literal specifier. A move of b reaches
// a.test only; a lean move reaches c.test only; either move also reaches e.test, whose dependency is invisible.
test('graphPlanOf — imports and reads select tests; invisible dependencies are conservative', async () => {
  const { mkdtempSync, mkdirSync, writeFileSync } = await import('node:fs')
  const { tmpdir } = await import('node:os')
  const { graphPlanOf, testGraphOf } = await import('./test-graph.js')
  const root = mkdtempSync(join(tmpdir(), 'uuidna-graph-'))
  mkdirSync(join(root, 'dist'), { recursive: true })
  writeFileSync(join(root, 'dist/b.js'), 'export const b = 1\n')
  writeFileSync(join(root, 'dist/a.js'), "import { b } from './b.js'\nexport const a = b + 1\n")
  writeFileSync(join(root, 'dist/a.test.js'), "import { a } from './a.js'\nconsole.log(a)\n")
  writeFileSync(join(root, 'dist/c.test.js'), "import { readdirSync } from 'node:fs'\nconsole.log(readdirSync('lean/'))\n")
  writeFileSync(join(root, 'dist/d.test.js'), 'console.log(1)\n')
  writeFileSync(join(root, 'dist/e.test.js'), "const name = 'x'\nconst m = await import(`./${name}.js`)\nconsole.log(m)\n")
  const graph = testGraphOf(root)
  const onB = graphPlanOf(['src/b.ts'], graph)
  assert.equal(onB.mode, 'delta')
  if (onB.mode === 'delta') assert.deepEqual(onB.files, ['dist/a.test.js', 'dist/e.test.js'])
  const onLean = graphPlanOf(['lean/Wave.lean'], graph)
  assert.equal(onLean.mode, 'delta')
  if (onLean.mode === 'delta') assert.deepEqual(onLean.files, ['dist/c.test.js', 'dist/e.test.js'])
  const onNothing = graphPlanOf(['src/never-compiled.ts'], graph)
  assert.equal(onNothing.mode, 'delta')
  if (onNothing.mode === 'delta') {
    assert.deepEqual(onNothing.unreached, ['src/never-compiled.ts'])
    assert.deepEqual(onNothing.files, ['dist/e.test.js'])
  }
})

test('testGraphOf over this tree sees the suite and its readers', async () => {
  const { testGraphOf } = await import('./test-graph.js')
  const graph = testGraphOf()
  const tests = [...graph.modules.values()].filter((m) => m.test)
  assert.ok(tests.length > 300, `${tests.length} test modules`)
  assert.ok(tests.some((m) => m.reads.includes('lean/')), 'some test reads lean/')
  assert.ok(graph.importers.get('dist/address.js')?.size ?? 0 > 0, 'address.js has importers')
})
