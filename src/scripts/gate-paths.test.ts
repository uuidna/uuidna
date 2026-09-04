// gate-paths — A GATE MUST ASSERT THE PROPERTY. Folded after the 2026-08-17 sweep, which found
// three drifted path references and one dangerous one:
//   · security-audit backed the "KAT-verified" claim with existsSync('src/tests/kat.test.ts') — a rename broke it and
//     an EMPTY file of that name would have passed it. It now locates the suite by the standards' own vectors.
//   · audit.ts audited the built site through a hardcoded two-page list, and one page
//     ('docs/.vitepress/dist/theorems/index.html') stopped existing when cleanUrls began emitting 'theorems.html'.
//     It skipped that page silently for as long as nobody looked — a gate quietly covering half of its claim is
//     worse than a gate that fails. The page list is now DISCOVERED from the directory.
//   · predict-and-fill reported the axiom-leak gap at 'lean/theorems/generated.ts', a path that does not exist
//     (the ledger is src/theorems/generated.ts) — and that string is published to humans in the registrar's issue.
// SCOPE, stated honestly: this audits the GATE and AUDIT scripts only. Curriculum generators (quantum-school.ts) name
// paths that are DELIVERABLES — files a student is meant to create — so an unresolved path there is a specification,
// not a defect, and flagging it would teach the wrong lesson.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

const GATE = /^(audit|guard|next|conformance|security-audit|spin|provenance|predict-and-fill|support|one-receipt|seal-claims-audit|account|harmonic-scan|axiom-hunt|audit-.*)\.ts$/
const LITERAL_PATH = /'((?:src|lean|docs|packages|extension)\/[A-Za-z0-9_./-]+)'/g
/** the VitePress outDir is gitignored build output — absent means "not built yet", which is not a drifted reference */
const isBuildOutput = (p: string): boolean => p.startsWith('docs/.vitepress/dist')

const gateFiles = (): string[] => [
  ...readdirSync(join(ROOT, 'src', 'scripts')).filter((f) => GATE.test(f)).map((f) => join('src', 'scripts', f)),
  join('src', 'spin.ts'), join('src', 'security-audit.ts'),
].filter((f) => existsSync(join(ROOT, f)))

/** a root-level file READ by a gate — the class the directory-prefixed regex above misses. The first version of this
 *  finder scanned only paths containing a '/', so it walked straight past `rd('mcp.mjs')` in audit.ts: a root-level
 *  file that had ceased to exist, throwing ENOENT and killing that entire audit before any arm ran. */
const ROOT_READ = /\b(?:rd|readFileSync)\(\s*'([A-Za-z0-9_.-]+\.(?:mjs|md|json|ts|js|lean|html|txt|yml|yaml))'/g

test('every literal path a gate script names resolves — a drifted reference makes a check inert', () => {
  const unresolved: string[] = []
  for (const f of gateFiles()) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    for (const m of src.matchAll(LITERAL_PATH)) {
      const p = m[1]
      if (isBuildOutput(p)) continue
      if (!existsSync(join(ROOT, p))) unresolved.push(`${f} → ${p}`)
    }
    for (const m of src.matchAll(ROOT_READ))
      if (!existsSync(join(ROOT, m[1]))) unresolved.push(`${f} → ${m[1]} (root-level read)`)
  }
  assert.deepEqual(unresolved, [], 'a gate names a path that does not exist — fix the path, or assert the property instead')
})

test('the finder bites — the historical offenders are exactly what the rule flags', () => {
  // proof by the real bugs: had these still been present, the sweep above would have named them
  for (const offender of ['lean/theorems/generated.ts', 'src/tests/kat.test.ts'])
    assert.equal(existsSync(join(ROOT, offender)), false, `${offender} must stay absent — it is the drifted path`)
  assert.ok(existsSync(join(ROOT, 'src/theorems/generated.ts')), 'the real ledger path')
  assert.ok(existsSync(join(ROOT, 'src/crypto-primitives.test.ts')), 'the real KAT suite')
})

test('the drain stages EXPLICIT paths — no unattended commit may sweep a sibling session\'s work with git add -A', () => {
  // Four times in one day, work landed inside a commit whose message described something else, because the drain
  // staged everything in a shared tree. A commit message here is a signed artifact that must cite a sealed theorem,
  // so the record has to mean what it says. Comments are stripped first — searching raw text would trip on the very
  // comments that explain this rule, which is exactly how the unwired-script detector hid its own case.
  const strip = (s: string): string => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|\s)\/\/[^\n]*/g, ' ').replace(/(^|\s)#[^\n]*/g, ' ')
  const drains = [
    join('src', 'scripts', 'one-receipt.ts'), join('src', 'scripts', 'reconcile.ts'), join('src', 'scripts', 'develop.ts'),
    join('.github', 'workflows', 'school.yml'), join('.github', 'workflows', 'research.yml'),
  ].filter((f) => existsSync(join(ROOT, f)))
  const offenders: string[] = []
  for (const f of drains) {
    const src = strip(readFileSync(join(ROOT, f), 'utf8'))
    if (/git\s+add\s+(-A|--all|\.)\b/.test(src)) offenders.push(f)
  }
  assert.deepEqual(offenders, [], 'stage the drain\'s own paths (see DRAIN_PATHS / stageDerived in scripts/api.ts)')
})

test('the built-site audit DISCOVERS its pages — no gate hardcodes a page of the generated site', () => {
  const offenders: string[] = []
  for (const f of gateFiles()) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    for (const m of src.matchAll(/'docs\/\.vitepress\/dist\/[A-Za-z0-9_./-]*\.html'/g)) offenders.push(`${f} → ${m[0]}`)
  }
  assert.deepEqual(offenders, [], 'a hardcoded built page silently stops being audited the moment the site’s output shape changes')
})

// ── THE PUSH PATH REPORTS THE FINDING, AND MINTS BEFORE IT PUSHES. Two defects measured on live runs on
// 2026-09-02, both in the loop whose whole purpose is to remove hand-work:
//   · develop printed a TAIL WINDOW of the gate's log as the GAP. Guard's log ends with the rosette receipt, the
//     unified fold and the aura line, so a real finding twenty lines up was replaced by guard's closing ceremony
//     and the report read as though the fold were the objection.
//   · land pushed with a receipt its own heal had just invalidated, waited for the court to refuse, then healed
//     and re-derived the WHOLE tree again in round 2 to reach the same push — 281s of reconcile and 147s of
//     develop across a sampled run, most of it the second pass repeating a clean first one.
test('develop prints the finder’s NAMED gap, never a tail slice of its log', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'develop.ts'), 'utf8')
  assert.match(src, /const namedGap = /, 'one helper owns how a finding is shown')
  // every refusal path must go through it — a tail slice anywhere reintroduces the ceremony-as-gap report
  const gapPrints = [...src.matchAll(/console\.error\(`\s*GAP [^`]*`\)/g)].map((m) => m[0])
  assert.ok(gapPrints.length >= 3, 'develop refuses in three places: blocked, no-cure, and cure-did-not-cure')
  for (const p of gapPrints)
    assert.match(p, /namedGap\(/, `this GAP print still slices a tail: ${p.slice(0, 80)}`)
  // and the helper prefers the finders' own shape, with the tail only as a declared fallback
  const helper = /const namedGap[\s\S]*?\n}/.exec(src)?.[0] ?? ''
  assert.match(helper, /GAP\|FIX/, 'the named lines are what guard and the finders actually emit')
  assert.match(helper, /slice\(-tail\)/, 'a gate that named nothing is still shown, as a fallback')
})

test('land earns the receipt for the tree it healed BEFORE pushing, and keeps the cure as fallback', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'land.ts'), 'utf8')
  const verifyAt = src.indexOf("gate-receipt.js --verify'")
  // THE NEEDLE IS ASSEMBLED, NOT SPELLED. The landing finder flags any file that contains the push command and
  // never reads a ref back — correctly, and this file only SEARCHES for it. Same use/mention collision the
  // impossibility finder carries a SELF set for; here the mention can simply be avoided.
  const pushAt = src.indexOf(['git', 'push', 'origin', 'main'].join(' '))
  assert.ok(verifyAt > 0, 'land must ASK whether its receipt still covers the tree — the same O(1) check the court runs')
  assert.ok(verifyAt < pushAt, 'and it must ask BEFORE the push, or it pays a denial to learn what it already knew')
  assert.match(src, /--verified guard,tests/, 'the mint names what ran, as gate-receipt requires of every caller')
  // the taught cure stays: a neighbour can still move the tree between the mint and the push
  assert.match(src, /receipt no longer covers the tree|receipt certifies different bytes/,
    'the fallback cure remains for the race this pre-check does not reach')
  // AND A CURED DENIAL STILL REPORTS THE VERDICT. Printing only the cure's name discards the court's per-file
  // manifest, which is the one thing that says WHICH files moved — measured by needing it and not having it.
  // AND EVERY FAILURE PRINTER IS ANCHORED. The first mint-failure printer filtered on /GAP|FIX/ anywhere in a
  // line and printed six PASSING test titles while the real failure sat in the discarded remainder — the same
  // use/mention collision, this time inside the reporter meant to end it.
  for (const m of src.matchAll(/\.filter\(\(l\) => \/([^/]+)\/\.test\(l/g)) {
    const pattern = m[1]!
    assert.match(pattern, /\^/, `an unanchored failure filter matches test NAMES: /${pattern}/`)
  }
  const cureAt = src.indexOf('CURES.find')
  const denialAt = src.indexOf('the gate said, verbatim')
  assert.ok(denialAt > 0, 'a cured denial must print the gate’s own verdict, not just the cure’s name')
  assert.ok(denialAt < cureAt, 'and print it BEFORE choosing the cure, so the reason survives the choice')
  // AND NO CODE PATH WEAKENS THE GATE. The check reads the CODE, not the prose: land's header promises
  // "--no-verify does not appear in this file", which is the mention case — a file that names a bypass in order
  // to disclaim it would fail a naive scan, and the first run of this assertion did exactly that.
  const code = src.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')
  assert.doesNotMatch(code, /--no-verify/, 'no code path bypasses the hooks')
  assert.doesNotMatch(code, /--force(?!-)/, 'land integrates, it does not force')
  assert.match(src, /--no-verify does not appear in this file/, 'and the file still says so, which is why the scan reads code only')
})

// ── A LEAD MUST NAME THE COMMAND THAT ACTS ON IT. Measured 2026-09-03: seven table wings were enumerated by
// running the whole `npm run lean` chain — ~5 minutes each, 66 other generators re-proved to sign one wing —
// because the single-wing dispatcher (`lean-one`, 0.087s measured) is invisible unless you read lean-all's SKIP
// set. The tree had the fast loop the whole time. A lead that says "enumerate the table" without naming the
// command costs magnitudes to act on, so the finder below holds the naming by construction.
test('the table-enumeration lead names the single-wing loop, not just the goal', () => {
  const survey = readFileSync(join(ROOT, 'src', 'gap-survey.ts'), 'utf8')
  assert.match(survey, /lean-one \$\{row\.wing\.toLowerCase\(\)\}/, 'the owes line must name the exact command for THAT wing')
  const next = readFileSync(join(ROOT, 'src', 'scripts', 'next.ts'), 'utf8')
  assert.match(next, /lean-one/, 'next’s leverage list must name it too — it is where a reader looks first')
  // and the dispatcher it names must exist, or the lead points at nothing
  assert.ok(existsSync(join(ROOT, 'src', 'scripts', 'lean-one.ts')), 'the named dispatcher must exist')
})

// ── THE DISPATCHER MUST SAY WHAT IT CAN RUN. Measured 2026-09-03: 299 runnable scripts, 227 of them reachable
// ONLY through `npm run x -- <name>`, listed as bare filenames with no purpose and no search. Finding `lean-one`
// — the single-wing Lean loop, 0.087s against ~5 minutes for the whole chain — required already knowing it
// existed, and seven wings were enumerated the slow way for exactly that reason. The purposes were already
// written in every script's own header; the listing simply never read them.
test('the dispatcher drains each script’s own purpose, and can be searched by it', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'run.ts'), 'utf8')
  assert.match(src, /export function purposeOf/, 'the purpose is DRAINED from the header, never authored here')
  // both comment shapes, because reading only `//` manufactured a gap on a script with a /** */ block
  assert.ok(src.includes("'/**'") || /\/\*\*/.test(src.replace('/**', '')) || src.includes('\\/\\*\\*'),
    'block comments count too — reading only // manufactured a gap on a script whose header is a /** … */ block')
  assert.match(src, /--find/, 'a 299-item list needs a search, and it must cover purposes as well as names')
  assert.match(src, /--all/, 'the full list stays available for whoever wants it')
  // a compiled test is not a runnable script — `all-run.test` sat in the list and could not be run
  assert.match(src, /\.test\.js/, 'runnable() must exclude compiled tests')
})

// TESTED AS A CLI, BECAUSE IT IS ONE. The first version of this test imported `./run.js` to call purposeOf
// directly — and importing a script entry point RUNS it: the dispatcher printed its whole listing and exited,
// collapsing this file to a single test that asserted nothing. A CLI is exercised by running it.
test('the listing names lean-one with its purpose, and every runnable script can say what it does', () => {
  const out = execFileSync('node', [join(ROOT, 'dist', 'scripts', 'run.js'), '--all'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  assert.match(out, /lean-one\s+run exactly ONE lean-<domain> generator/, 'the slow-loop trap is now findable by name')
  assert.match(out, /crypto-measure\s+the EMPIRICAL companion/, 'a /** … */ header reads like a // one')
  assert.doesNotMatch(out, /carry no header purpose/, 'every runnable script says what it does — a new silent one is the gap')
  // a NAME ending in .test, not the substring anywhere: `repair-test-imports` and `index-test-imports` are real
  // scripts, and a purpose sentence may say "TEST" — the first version of this assertion caught those and was wrong
  assert.doesNotMatch(out, /^\s+\S+\.test\s/m, 'a compiled test is not a runnable script')
  const found = execFileSync('node', [join(ROOT, 'dist', 'scripts', 'run.js'), '--find', 'single-domain'], { encoding: 'utf8' })
  assert.match(found, /lean-one/, '--find must search PURPOSES, not only names')
})

// ── A CACHE MUST BE KEYED ON THE RULE, NOT ONLY THE INPUTS. Measured 2026-09-03: audit-citations keyed its cache
// on the publication set alone, the SCAN was corrected, the publications had not moved, and the run reported
// `cache HIT … 1 uncited` from the stale answer. A cache keyed on inputs but not on the function is a proxy for
// the computation — the healthy case and the never-re-ran case print the same line.
test('audit-citations keys its cache on its own source as well as its inputs', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'audit-citations.ts'), 'utf8')
  const key = /const key = merkleFold\(\[[\s\S]*?\]\)/.exec(src)?.[0] ?? ''
  assert.ok(key, 'the cache key must be a fold of more than one thing')
  assert.match(key, /import\.meta\.url/, 'the auditor’s OWN bytes ride the key, or a corrected rule cannot be seen')
  assert.match(key, /p\.address/, 'and the publications still do')
})

// ── PROSE THAT IS A THEOREM IS NOT UNCITED. The auditor asked "does this point AT a proof?" and reported the
// answer as "is this backed BY one?" — two different questions. The div-by-zero publication read 12 of 13 cited,
// and the thirteenth was the_six_motions_connect_the_whole_ring, sealed with 9 cases, whose name IS that claim.
test('a claim that IS a sealed theorem’s own prose counts as backed, and stays distinguishable from a pointer', () => {
  const report = JSON.parse(readFileSync(join(ROOT, 'audit-citations.json'), 'utf8')) as {
    uncited: number; fabricated: number
    perPublication: { slug: string; claims: number; cited: number; isTheorem: number; uncited: string[] }[]
  }
  assert.equal(report.fabricated, 0, 'a citation to a key not in the ledger is the one decidably-false thing')
  assert.equal(report.uncited, 0, 'every claim either points at a proof or IS one')
  for (const p of report.perPublication)
    assert.equal(p.cited + p.isTheorem + p.uncited.length, p.claims, `${p.slug}: the three classes must partition its claims`)
  // and the two backed kinds are NOT merged — pointing at a proof and being one are different facts
  const dz = report.perPublication.find((p) => p.slug === 'div-by-zero')!
  assert.ok(dz.isTheorem >= 1, 'the drained-theorem claim is counted as such, not as a pointer')
  assert.ok(dz.cited >= 1, 'and the pointers are still counted separately')
})

// THE MINT MUST FOLLOW THE STAGING, or round 1 is denied on every landing that adds a file. gate-receipt's
// per-file manifest is built from the TRACKED set, so a brand-new source is invisible to a mint taken while it
// is untracked and then registers as drift the moment `git add` tracks it — the court's own words were "the
// drift is only files appearing or disappearing", and three landings in a row named the newly-added sources as
// MOVED. Holding the ORDER rather than the presence: both calls existed before and the bug was which came first.
test('land mints the receipt AFTER staging, so it covers the set the commit carries', () => {
  const land = readFileSync(join(ROOT, 'src', 'scripts', 'land.ts'), 'utf8')
  const stage = land.indexOf("run('git add -A')")
  const mint = land.indexOf("gate-receipt.js --verify'")
  const commit = land.indexOf("run('git commit -m '")
  assert.ok(stage > 0 && mint > 0 && commit > 0, 'land must stage, mint and commit')
  assert.ok(stage < mint, 'the staging must come FIRST — an untracked file is not in the manifest yet')
  assert.ok(mint < commit, 'and the mint must precede the commit, so the fresh receipt rides with its work')
  assert.ok(land.includes("run('git add gate-receipt.json')"), 'the minted receipt must itself be staged')
})

// ── THE RENDER MARGIN IS A PAGE COUNT. I raised an alarm off peak resident memory — 8460 climbing to 8997 MB
// against an 8192 MB heap cap — and it was the wrong comparison twice over: a resident set includes native
// memory and collector semispaces so it exceeds the cap by nature, and re-measuring the SAME cap gave 7580 then
// 9069, a 1489 MB swing that makes any two-sample trend noise. The reproducible quantity is the threshold: 5260
// pages fail at a 4096 cap and build at 4352. theorem the_page_budget_is_twice_the_ledger seals what follows —
// 3840 MB of the cap unused, and a fitted line reaching 12037 pages. This checks the count against that budget
// in milliseconds, so nobody has to run a 100-second build to learn whether the site is near breaking.
test('the dynamic page count sits inside the sealed render budget', async () => {
  // the TYPED source, not the docs shim: the shim is plain JS with no declaration file, so importing it made tsc
  // refuse to emit this whole test file — and the run that "passed" was the previous dist. A silent skip.
  const { allObjectPaths, objectPageCount } = await import('../compose-object.js')
  // COUNT, do not compose. allObjectPaths builds 5282 param objects to return them (915 ms, 119 MB); five array
  // lengths answer the same question in 38 µs and 26 MB — theorem counting_beats_composing_by_six_magnitudes.
  const pages = objectPageCount().total
  // AND THE CHEAP PATH MAY NOT DRIFT FROM THE DEAR ONE. A fast answer that disagrees with the slow one it
  // replaced is worse than the slow one, so the expensive path still runs HERE, once, purely as the control.
  assert.equal(pages, allObjectPaths().length, 'objectPageCount must equal what composing every page returns')
  const BUDGET = 12037 // theorem the_page_budget_is_twice_the_ledger, at the pinned 8192 cap
  assert.ok(pages < BUDGET, `${pages} dynamic pages against a sealed budget of ${BUDGET} — the render breaks above it`)
  // and the margin must stay a MAJORITY of the budget: below that, the next wing is the one that finds out
  assert.ok(pages * 2 < BUDGET, `${pages} pages is over half the ${BUDGET} budget — trim the page set or re-measure the threshold before the next wing lands`)
})
