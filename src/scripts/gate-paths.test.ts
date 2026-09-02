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
    'the fallback cure remains for the race this pre-check cannot see')
  // AND NO CODE PATH WEAKENS THE GATE. The check reads the CODE, not the prose: land's header promises
  // "--no-verify does not appear in this file", which is the mention case — a file that names a bypass in order
  // to disclaim it would fail a naive scan, and the first run of this assertion did exactly that.
  const code = src.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')
  assert.doesNotMatch(code, /--no-verify/, 'no code path bypasses the hooks')
  assert.doesNotMatch(code, /--force(?!-)/, 'land integrates, it does not force')
  assert.match(src, /--no-verify does not appear in this file/, 'and the file still says so, which is why the scan reads code only')
})
