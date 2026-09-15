// Layout is one monograph template. The census is per-URL, never imported by chrome.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems } from './index.js'
import { axisMonographs, axisForRelativePath, homeHeroOf } from './axis-monograph.js'
import { SITE } from './site/index.js'

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
  assert.equal(bundle.theorems.members.length + bundle.theorems.span.count, n)
  assert.ok(bundle.theorems.span.count > 0, 'four-hex span is counted, not listed as a row each')
  assert.equal(bundle.theorems.span.fill.occupied + bundle.theorems.span.fill.vacant, bundle.theorems.span.count)
  assert.equal(bundle.theorems.span.fill.problemsSeated, 18)
  assert.equal(bundle.theorems.span.fill.involutionPairs, 9)
  assert.ok(bundle.theorems.members.every((m) => !m.key.startsWith('enumeration_hex4_')))
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

type Hero = ReturnType<typeof homeHeroOf>
type Census = NonNullable<ReturnType<typeof axisForRelativePath>['census']>

// VitePress's heading slug: specials become '-', runs of '-' collapse, ends trimmed.
const slugOf = (h: string): string => h.trim().toLowerCase()
  .replace(/<[^>]*>/g, '').replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, '-').replace(/^-+|-+$/g, '')

/** Every digit run the hero shows must be a census figure, and every link a built docs route with a real heading. */
function homeHeroGaps(hero: Hero, census: Census): string[] {
  const gaps: string[] = []
  const figures = new Set(Object.values(census).filter((v): v is number => typeof v === 'number').map(String))
  const shown = [hero.text, hero.tagline, ...hero.actions.map((a) => a.text), ...hero.features.flatMap((f) => [f.title, f.details])]
  for (const s of shown) {
    for (const m of s.matchAll(/\d[\d,]*/g)) {
      const digits = m[0].replace(/,+$/, '').replace(/,/g, '')
      if (!figures.has(digits)) gaps.push(`typed figure ${m[0]} in "${s}"`)
    }
  }
  const keys = new Set(theorems().map((t) => t.key))
  for (const link of [...hero.actions.map((a) => a.link), ...hero.features.map((f) => f.link)]) {
    const [path, hash] = link.split('#')
    const theorem = /^\/theorem\/([a-z0-9_]+)$/.exec(path)
    if (theorem) { if (!keys.has(theorem[1])) gaps.push(`dead link ${link}`); continue }
    const file = join(DOCS, path === '/' ? 'index.md' : `${path.slice(1)}.md`)
    let md = ''
    try { md = readFileSync(file, 'utf8') } catch { gaps.push(`dead link ${link}`); continue }
    if (hash && ![...md.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)].some((h) => slugOf(h[1]) === hash)) gaps.push(`dead anchor ${link}`)
  }
  return gaps
}

test('home hero speaks to a newcomer — every figure from the census, every link a built page', () => {
  const src = readFileSync(join(DOCS, 'index.md'), 'utf8')
  const fmEnd = src.indexOf('\n---\n', 4)
  const fm = src.slice(0, fmEnd)
  assert.match(fm, /layout:\s*home/)
  assert.doesNotMatch(fm, /^hero:/m)
  assert.doesNotMatch(fm, /^features:/m)
  assert.doesNotMatch(fm, /^description:/m)
  const census = axisForRelativePath('index.md').census
  assert.ok(census)
  const hero = homeHeroOf(census)
  assert.equal(hero.name, SITE.name)
  assert.ok(hero.text.includes(census.theorems.toLocaleString('en-US')), 'the hero sentence carries the live count')
  assert.equal(census.decided + census.otherTactics, census.theorems)
  assert.deepEqual(hero.actions.map((a) => a.link.split('#')[0]), ['/school', '/trials', '/guides'])
  assert.equal(hero.actions[0]?.theme, 'brand')
  assert.ok(hero.features.length >= 4 && hero.features.length <= 6)
  assert.deepEqual(homeHeroGaps(hero, census), [])
  // raw Lean keys and statements stay off the cards
  for (const f of hero.features) assert.doesNotMatch(`${f.title} ${f.details}`, /[a-z]+_[a-z0-9_]+|∧|\s=\s/)
  assert.doesNotMatch(JSON.stringify(hero.features), /Test POC|Rosette · Glagolitic/)
  // controls: the instrument fails a typed figure, a dead route and a dead anchor
  const withCard = (card: Hero['features'][number]): Hero => ({ ...hero, features: [...hero.features, card] })
  assert.ok(homeHeroGaps(withCard({ title: 'Proofs', details: '71000 proofs', link: '/school' }), census).some((g) => g.includes('71000')))
  assert.ok(homeHeroGaps(withCard({ title: 'Gone', details: 'x', link: '/no-such-page' }), census).some((g) => g.includes('/no-such-page')))
  assert.ok(homeHeroGaps(withCard({ title: 'Gone', details: 'x', link: '/guides#no-such-heading' }), census).some((g) => g.includes('no-such-heading')))
  assert.ok(homeHeroGaps(withCard({ title: 'Gone', details: 'x', link: '/theorem/no_such_key' }), census).some((g) => g.includes('no_such_key')))
  // the axiom-free sentence narrows when the audit does not cover every statement
  const partial = homeHeroOf({ ...census, axiomFree: census.theorems - 1 })
  assert.ok(partial.text.includes(' of '), partial.text)
})

test('transformPageData bakes walkNext; ReferrerNav reads it', () => {
  const cfg = readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8')
  assert.match(cfg, /walkNext/)
  assert.match(cfg, /axisForRelativePath/)
  assert.match(cfg, /homeHeroOf/)
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
