// object-i18n + catch-all ObjectPage — one template, seven locale rays, hexbit fold = translation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import {
  translateObjectText,
  objectUi,
  primaryRayOf,
  OBJECT_LOCALE_RAYS,
  OBJECT_UI_KEYS,
} from '../../../object-i18n.js'
import { DIMENSIONS } from '../../../harness.js'
import { HEXBIT_WORDS } from '../../../tts/readings.js'
import { toUuid } from '../../../address.js'
import { HANDLE_HEXBITS } from '../../../hexbit/index.js'
import { handleOf } from '../../../handle.js'

test('OBJECT_LOCALE_RAYS matches DIMENSIONS and HEXBIT_WORDS keys', () => {
  assert.deepEqual([...OBJECT_LOCALE_RAYS].sort(), [...DIMENSIONS].sort())
  assert.deepEqual([...OBJECT_LOCALE_RAYS].sort(), Object.keys(HEXBIT_WORDS).sort())
})

test('translateObjectText: en is identity; other rays are hexbit readings of the handle', () => {
  const src = 'usable capacity gap is two to eighty'
  const en = translateObjectText(src, 'en')
  assert.equal(en.kind, 'identity')
  assert.equal(en.text, src)
  assert.equal(en.handle, handleOf(toUuid(src)))

  const bg = translateObjectText(src, 'bg-BG')
  assert.equal(bg.lang, 'bg')
  assert.equal(bg.kind, 'hexbit-reading')
  assert.equal(bg.handle, en.handle)
  assert.notEqual(bg.text, src)
  assert.equal(bg.text.split(' ').length, HANDLE_HEXBITS)
})

test('primaryRayOf collapses dialects; unknown → en', () => {
  assert.equal(primaryRayOf('zh-CN'), 'zh')
  assert.equal(primaryRayOf('en-GB'), 'en')
  assert.equal(primaryRayOf('xx-YY'), 'en')
})

test('objectUi covers every ray', () => {
  for (const ray of OBJECT_LOCALE_RAYS) {
    const ui = objectUi(ray)
    for (const key of OBJECT_UI_KEYS) {
      assert.ok(typeof ui[key] === 'string' && ui[key].length > 0, `${ray} missing OBJECT_UI.${key}`)
    }
  }
})

test('catch-all: sole ObjectPage layout + compose-object; no per-type path templates', () => {
  const theme = readFileSync(join(ROOT, 'docs/.vitepress/theme/index.ts'), 'utf8')
  assert.match(theme, /Layout:\s*ObjectPage/)
  assert.ok(existsSync(join(ROOT, 'docs/[kind]/[id].paths.js')))
  assert.ok(existsSync(join(ROOT, 'docs/.vitepress/compose-object.js')))
  assert.ok(!existsSync(join(ROOT, 'docs/theorem/[key].paths.js')))
  assert.ok(!existsSync(join(ROOT, 'docs/publications/[slug].paths.js')))
  const compose = readFileSync(join(ROOT, 'src/compose-object.ts'), 'utf8')
  assert.match(compose, /allObjectPaths/)
  assert.match(compose, /composeTheorem/)
  assert.match(compose, /composePublication/)
  assert.match(compose, /composeChunk/)
  assert.match(compose, /composeSequence/)
  assert.match(compose, /composeVe/)
})

test('allObjectPaths emits theorem, publication, chunk, sequence, and ve kinds', async () => {
  const { pathToFileURL } = await import('node:url')
  const { allObjectPaths } = await import(
    pathToFileURL(join(ROOT, 'dist/compose-object.js')).href
  ) as {
    allObjectPaths: () => { params: { kind: string; id: string; objectKind?: string } }[]
  }
  const paths = allObjectPaths()
  const kinds = new Set(paths.map((p) => p.params.kind))
  for (const k of ['theorem', 'publications', 'chunk', 'sequence', 've'])
    assert.ok(kinds.has(k), `allObjectPaths must emit kind ${k}`)
  const chunk = paths.find((p) => p.params.kind === 'chunk')
  assert.ok(chunk && /^[0-9a-f]{8}$/.test(chunk.params.id), 'chunk id is an 8-hex handle')
  const seq = paths.find((p) => p.params.kind === 'sequence')
  assert.ok(seq && seq.params.objectKind === 'sequence')
  const ve = paths.find((p) => p.params.kind === 've')
  assert.ok(ve && ve.params.objectKind === 've')
})

test('compose-object: hero fields in params, never YAML-in-content (no bag leak)', async () => {
  // VitePress injects path content at <!-- @content -->, which sits after any template preamble.
  // gray-matter only parses leading ---, so YAML-in-content dumps title/heroTitle/abstract into the body.
  const composeSrc = readFileSync(join(ROOT, 'src/compose-object.ts'), 'utf8')
  assert.doesNotMatch(composeSrc, /content:\s*`---/)
  assert.match(composeSrc, /heroTitle/)
  assert.match(composeSrc, /monographFaceOf/)
  assert.match(
    readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8'),
    /pageData\.title\s*=\s*p\.title/,
  )
  assert.match(
    readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8'),
    /titleTemplate:\s*':title · uuidna'/,
  )

  const { theorems } = await import('../../../index.js')
  const { pathToFileURL } = await import('node:url')
  const { composeTheorem } = await import(
    pathToFileURL(join(ROOT, 'dist/compose-object.js')).href
  ) as {
    composeTheorem: (t: { address: string; key: string; name: string; principle: string; skill: string; statement: string; tactic: string; lean: string; file: string }) => {
      params: { title: string; heroTitle: string; abstract: string; handleUrl: string }
      content: string
    }
  }
  const t = theorems()[0]
  assert.ok(t, 'ledger has at least one theorem')
  const page = composeTheorem(t)
  assert.equal(page.params.heroTitle, page.params.title)
  assert.equal(page.params.abstract, t.statement)
  assert.equal(page.params.handleUrl, (await import('../../../hexbit/index.js')).hexbitDoorOf(t.address).door)
  assert.match(page.content, new RegExp(page.params.handleUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.ok('heartbeats' in page.params, 'theorem params carry measured heartbeats for page metrics')
  assert.ok(!page.content.startsWith('---'), 'content must not open with YAML frontmatter')
  assert.match(page.content, /^# /m, 'stock markdown H1 is the handle')
  assert.doesNotMatch(page.content, /^title:\s/m)
  assert.doesNotMatch(page.content, /^heroTitle:\s/m)
  assert.doesNotMatch(page.content, /^objectKind:\s/m)
  assert.doesNotMatch(page.content, /## Cross-links/)
  assert.doesNotMatch(page.content, /## The rotation/)
  assert.doesNotMatch(page.content, /## The neighbour fold/)
  assert.doesNotMatch(page.content, /object-deposit-btn/)
  assert.doesNotMatch(page.content, /RefererCompass/)
})

test('ObjectPage has no hero deposit CTA; donate is SponsorCard + SiteFooter only', () => {
  const vue = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectPage.vue'), 'utf8')
  assert.doesNotMatch(vue, /object-deposit/)
  assert.doesNotMatch(vue, /depositHref/)
})

test('ObjectCrosslinks wires full related-object graph via VPLink/VPButton (no capacity/OS QA cards)', () => {
  const vue = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectCrosslinks.vue'), 'utf8')
  assert.doesNotMatch(vue, /usable_gap_is_two_to_eighty/)
  assert.doesNotMatch(vue, /href="\/os"/)
  assert.doesNotMatch(vue, /ox-grid|ox-card/)
  assert.match(vue, /ox-row/)
  assert.match(vue, /ox-group/)
  assert.match(vue, /groupAxes|groupRelated|groupAxioms/)
  assert.match(vue, /VPButton/)
  assert.match(vue, /VPLink/)
  assert.match(vue, /rotation/)
  assert.match(vue, /falsifier/)
  assert.match(vue, /axiom-free|axiomHolds/)
  assert.match(vue, /dependsOn|groupAxioms|unbound/)
  assert.match(vue, /RefererCompass/)
  assert.match(vue, /relatedPubs|relatedPublications/)
  assert.match(vue, /keywords|priorArt/)
  assert.match(vue, /unlocks/)
  assert.doesNotMatch(vue, /ledger\.data/)
  assert.doesNotMatch(vue, /publications\.data/)
  assert.doesNotMatch(vue, /theoremGraph|theoremDemoOf/)
})

test('ObjectBreadcrumbs: Layout doc-before + VPLink; Home → kind → id/handle (not the related graph)', async () => {
  const page = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectPage.vue'), 'utf8')
  assert.match(page, /ObjectBreadcrumbs/)
  assert.match(page, /#doc-before/)
  assert.match(page, /ObjectCrosslinks/, 'crosslinks must remain wired')
  const crumbsVue = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectBreadcrumbs.vue'), 'utf8')
  assert.match(crumbsVue, /VPLink/)
  assert.match(crumbsVue, /objectBreadcrumbs|docsBreadcrumbs/)
  assert.match(crumbsVue, /aria-label="Breadcrumb"/)
  // Crumbs must not import related-graph chrome (that stays on ObjectCrosslinks).
  assert.match(crumbsVue, /from ['"]\.\.\/object-graph\.js['"]/)
  assert.doesNotMatch(crumbsVue, /import\s+.*ObjectCrosslinks/)
  assert.doesNotMatch(crumbsVue, /graph\.rotation|skill\.prev|hasLeg\(/)

  const { pathToFileURL } = await import('node:url')
  const { objectBreadcrumbs, docsBreadcrumbs } = await import(
    pathToFileURL(join(ROOT, 'dist/object-graph.js')).href
  ) as {
    objectBreadcrumbs: (o: { objectKind?: string; id?: string; handle?: string }) => { text: string; link?: string; handle?: string }[]
    docsBreadcrumbs: (rel: string, title?: string) => { text: string; link?: string }[]
  }
  const th = objectBreadcrumbs({ objectKind: 'theorem', id: 'usable_gap_is_two_to_eighty', handle: 'abcd1234' })
  assert.deepEqual(th.map((c) => c.text), ['Home', 'Theorems', 'usable_gap_is_two_to_eighty'])
  assert.equal(th[0]!.link, '/')
  assert.equal(th[1]!.link, '/theorems')
  assert.equal(th[2]!.handle, 'abcd1234')
  const ax = objectBreadcrumbs({ objectKind: 'axiom', id: 'kernel', handle: 'deadbeef' })
  assert.deepEqual(ax.map((c) => c.text), ['Home', 'Axioms', 'kernel'])
  assert.equal(ax[1]!.link, '/tests')
  const pub = objectBreadcrumbs({ objectKind: 'publication', id: 'some-note', handle: 'cafef00d' })
  assert.deepEqual(pub.map((c) => c.text), ['Home', 'Publications', 'some-note'])
  assert.equal(pub[1]!.link, '/publications')

  const nested = docsBreadcrumbs('articles/search-hexbit.md', 'Search hexbit')
  assert.deepEqual(nested.map((c) => c.text), ['Home', 'Articles', 'Search hexbit'])
  assert.equal(nested[1]!.link, '/articles')
  const top = docsBreadcrumbs('doctrine.md', 'The doctrine')
  assert.deepEqual(top.map((c) => c.text), ['Home', 'The doctrine'])
  assert.deepEqual(docsBreadcrumbs('theorems.md', 'Theorems'), [{ text: 'Home', link: '/' }, { text: 'Theorems' }])
  assert.deepEqual(docsBreadcrumbs('index.md'), [])
})

test('compose-object stamps breadcrumbs with prev/next + crosslinks (no essay bag)', async () => {
  const { pathToFileURL } = await import('node:url')
  const { theorems } = await import('../../../index.js')
  const { composeTheorem } = await import(
    pathToFileURL(join(ROOT, 'dist/compose-object.js')).href
  ) as {
    composeTheorem: (t: { address: string; key: string; name: string; principle: string; skill: string; statement: string; tactic: string; lean: string; file: string }) => {
      params: {
        breadcrumbs: { text: string; link?: string; handle?: string }[]
        prev: false | { text: string; link: string }
        next: false | { text: string; link: string }
        crosslinks: { rotation: { discovery: { key: string } } }
      }
      content: string
    }
  }
  const t = theorems().find((x) => x.key === 'usable_gap_is_two_to_eighty') || theorems()[1]
  const page = composeTheorem(t)
  assert.ok(page.params.breadcrumbs?.length >= 3)
  assert.equal(page.params.breadcrumbs[0]!.link, '/')
  assert.equal(page.params.breadcrumbs[1]!.link, '/theorems')
  assert.equal(page.params.breadcrumbs[2]!.text, t.key)
  assert.ok(page.params.crosslinks?.rotation?.discovery?.key)
  assert.ok('dependsOn' in (page.params.crosslinks || {}), 'crosslinks carry wing-def axioms')
  assert.match(page.content, /\| kernel \|/)
  assert.match(
    readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8'),
    /fm\.breadcrumbs\s*=\s*p\.breadcrumbs/,
  )
})

test('compose-object stamps stock VPDocFooter prev/next + crosslinks graph (no essay bag)', async () => {
  const { pathToFileURL } = await import('node:url')
  const { theorems } = await import('../../../index.js')
  const { composeTheorem } = await import(
    pathToFileURL(join(ROOT, 'dist/compose-object.js')).href
  ) as {
    composeTheorem: (t: { address: string; key: string; name: string; principle: string; skill: string; statement: string; tactic: string; lean: string; file: string }) => {
      params: {
        prev: false | { text: string; link: string }
        next: false | { text: string; link: string }
        crosslinks: {
          rotation: { discovery: { key: string }; reflect: { key: string } }
          legs: string[]
          sequence: { prev: { key: string } | null; next: { key: string } | null }
          keywords: string[]
          unlocks: { link: string; text: string }
        }
      }
      content: string
    }
  }
  const t = theorems().find((x) => x.key === 'usable_gap_is_two_to_eighty') || theorems()[1]
  const page = composeTheorem(t)
  assert.ok(page.params.crosslinks?.rotation?.discovery?.key)
  assert.ok(page.params.crosslinks?.rotation?.reflect?.key)
  assert.ok(Array.isArray(page.params.crosslinks?.legs))
  assert.ok(Array.isArray(page.params.crosslinks?.keywords))
  assert.ok(page.params.crosslinks?.unlocks?.link === '/unlocks')
  assert.ok(page.params.prev === false || (page.params.prev && page.params.prev.link.startsWith('/theorem/')))
  assert.ok(page.params.next === false || (page.params.next && page.params.next.link.startsWith('/theorem/')))
  assert.equal((page.params as { principleSiblings?: string[] }).principleSiblings, undefined)
  assert.doesNotMatch(page.content, /## Cross-links|## The rotation|## The neighbour fold/)
})

test('ObjectPage wires locale rays for crosslinks; stock markdown H1 is the handle', () => {
  const vue = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectPage.vue'), 'utf8')
  assert.doesNotMatch(vue, /translateObjectText/)
  assert.doesNotMatch(vue, /object-hero|object-h1/)
  assert.match(vue, /OBJECT_LOCALE_RAYS/)
  assert.match(vue, /object-locale/)
  const compose = readFileSync(join(ROOT, 'src/compose-object.ts'), 'utf8')
  assert.match(compose, /# \$\{mdSafe\(handle\)\}/)
  assert.match(compose, /Every URL is a monograph/)
  assert.doesNotMatch(compose, /principleSiblings/)
})

test('TheoremUse / ExecShell / PortPanel are composed in — one constructor, not a second template', () => {
  const compose = readFileSync(join(ROOT, 'src/compose-object.ts'), 'utf8')
  assert.match(compose, /<ClientOnly><TheoremUse \/>/)
  assert.match(compose, /monographFaceOf/)
  const theme = readFileSync(join(ROOT, 'docs/.vitepress/theme/index.ts'), 'utf8')
  assert.match(theme, /TheoremUse/)
  assert.match(theme, /ExecShell/)
  assert.match(theme, /PortPanel/)
  assert.ok(existsSync(join(ROOT, 'docs/.vitepress/theme/TheoremUse.vue')))
  // ExecShell has NO file of its own and must not grow one: theme/index.ts binds the name to Terminal.vue, which
  // is this test's title stated as code — one constructor, not a second template. Asserting the alias is strictly
  // stronger than asserting a file existed, and it is what d1688563 deliberately left in place.
  assert.match(theme, /app\.component\('ExecShell',.*Terminal\.vue/)
  assert.ok(!existsSync(join(ROOT, 'docs/.vitepress/theme/ExecShell.vue')), 'ExecShell must stay an alias, never a second template')
  assert.ok(existsSync(join(ROOT, 'docs/.vitepress/theme/PortPanel.vue')))
})
