// Layout is one monograph template. The census is per-URL, never imported by chrome.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../theorems/index.js'
import { axisMonographs, axisForRelativePath } from '../axis-monograph.js'

const THEME = join(ROOT, 'docs/.vitepress/theme')
const DOCS = join(ROOT, 'docs')

const LAYOUT_VUE = ['ObjectPage.vue', 'ObjectCrosslinks.vue', 'ReferrerNav.vue', 'UrlAudit.vue', 'ObjectBreadcrumbs.vue', 'HexFace.vue']

test('Layout chrome does not import ledger.data or publications.data', () => {
  for (const f of LAYOUT_VUE) {
    const src = readFileSync(join(THEME, f), 'utf8')
    assert.doesNotMatch(src, /ledger\.data/, `${f} must not import the census`)
    assert.doesNotMatch(src, /publications\.data/, `${f} must not import publications.data`)
  }
  const themeIdx = readFileSync(join(THEME, 'index.ts'), 'utf8')
  assert.doesNotMatch(themeIdx, /ledger\.data/)
  assert.match(themeIdx, /Layout:\s*ObjectPage/)
})

test('axis listings are monographs of frontmatter, not ledger.data', () => {
  for (const f of ['theorems.md', 'topics.md', 'rosetta.md', 'trials.md', 'axioms.md', 'index.md']) {
    const src = readFileSync(join(DOCS, f), 'utf8')
    assert.doesNotMatch(src, /ledger\.data/, `${f} is this URL's monograph, not a live ledger query`)
    assert.match(src, /useData|frontmatter/, `${f} reads composed page data`)
  }
})

test('axisMonographs: one thin copy, no lean proofs, live totals', () => {
  const bundle = axisMonographs()
  const n = theorems().length
  assert.equal(bundle.theorems.total, n)
  assert.equal(bundle.census.theorems, n)
  assert.equal(bundle.rosetta.total, n)
  assert.equal(bundle.trials.total, n)
  assert.ok(bundle.theorems.members.length === n)
  assert.ok(!('lean' in bundle.theorems.members[0]!))
  assert.ok(bundle.theorems.order.length === bundle.census.principles)
  assert.ok(bundle.census.skills === bundle.theorems.skills.length)
  const pub = Object.values(bundle.theorems.publicationByPrinciple).find((u) => u)
  if (pub) assert.match(pub, /^\/publications\//)
  const topicsMember = bundle.topics.skills[0]?.members[0]
  assert.ok(topicsMember && !('lean' in topicsMember) && !('aura' in topicsMember))
})

test('axisForRelativePath attaches only the URL that is that axis', () => {
  const th = axisForRelativePath('theorems.md')
  assert.equal((th.axis as { objectKind: string }).objectKind, 'theorems')
  assert.equal(th.census, undefined)
  const home = axisForRelativePath('index.md')
  assert.ok(home.census)
  assert.ok(home.census.phd)
  assert.equal(home.census.phd.complete, true)
  assert.equal(home.axis, undefined)
  const other = axisForRelativePath('school.md')
  assert.deepEqual(other, {})
})

test('transformPageData bakes walkNext; ReferrerNav reads it', () => {
  const cfg = readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8')
  assert.match(cfg, /walkNext/)
  assert.match(cfg, /axisForRelativePath/)
  assert.match(cfg, /Do not stamp objectKind onto listing markdown/)
  assert.match(cfg, /monographFaceOf/)
  assert.match(cfg, /Object\.assign\(fm, monographFaceOf/)
  assert.match(cfg, /occupancyDoors = \[\]/)
  assert.match(cfg, /occupancyCites = \[\]/)
  const nav = readFileSync(join(THEME, 'ReferrerNav.vue'), 'utf8')
  assert.match(nav, /walkNext/)
  assert.doesNotMatch(nav, /principleSiblings/)
  assert.doesNotMatch(nav, /data\.next/)
})

test('theme Vue on Layout path must not grow a silent ledger.data import', () => {
  const files = readdirSync(THEME).filter((f) => f.endsWith('.vue'))
  const mounted = new Set([
    ...LAYOUT_VUE,
    'SiteFooter.vue', 'SponsorCard.vue', 'ReadAloud.vue', 'RefererCompass.vue', 'Handle.vue', 'HexFace.vue', 'HexbitPlayer.vue',
  ])
  for (const f of files) {
    if (!mounted.has(f) && f !== 'LinkAuditor.vue') continue
    if (f === 'LinkAuditor.vue') continue
    const src = readFileSync(join(THEME, f), 'utf8')
    assert.doesNotMatch(src, /from ['"].*ledger\.data['"]/, `${f} is on or beside Layout`)
  }
})
