// object-i18n + catch-all ObjectPage — one template, seven locale rays, hexbit fold = translation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  translateObjectText,
  objectUi,
  primaryRayOf,
  OBJECT_LOCALE_RAYS,
  DIMENSIONS,
  HEXBIT_WORDS,
  toUuid,
} from '../index.js'
import { handleOf } from '../handle.js'

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
  assert.equal(bg.text.split(' ').length, 8)
})

test('primaryRayOf collapses dialects; unknown → en', () => {
  assert.equal(primaryRayOf('zh-CN'), 'zh')
  assert.equal(primaryRayOf('en-GB'), 'en')
  assert.equal(primaryRayOf('xx-YY'), 'en')
})

test('objectUi covers every ray', () => {
  for (const ray of OBJECT_LOCALE_RAYS) {
    const ui = objectUi(ray)
    assert.ok(ui.proves.length > 0)
    assert.ok(ui.hexbitDoor.length > 0)
  }
})

test('catch-all: sole ObjectPage layout + compose-object; no per-type path templates', () => {
  const theme = readFileSync(join(ROOT, 'docs/.vitepress/theme/index.ts'), 'utf8')
  assert.match(theme, /Layout:\s*ObjectPage/)
  assert.ok(existsSync(join(ROOT, 'docs/[kind]/[id].paths.js')))
  assert.ok(existsSync(join(ROOT, 'docs/.vitepress/compose-object.js')))
  assert.ok(!existsSync(join(ROOT, 'docs/theorem/[key].paths.js')))
  assert.ok(!existsSync(join(ROOT, 'docs/publications/[slug].paths.js')))
  const compose = readFileSync(join(ROOT, 'docs/.vitepress/compose-object.js'), 'utf8')
  assert.match(compose, /allObjectPaths/)
  assert.match(compose, /composeTheorem/)
  assert.match(compose, /composePublication/)
})

test('compose-object: hero fields in params, never YAML-in-content (no bag leak)', async () => {
  // VitePress injects path content at <!-- @content -->, which sits after any template preamble.
  // gray-matter only parses leading ---, so YAML-in-content dumps title/heroTitle/abstract into the body.
  const composeSrc = readFileSync(join(ROOT, 'docs/.vitepress/compose-object.js'), 'utf8')
  assert.doesNotMatch(composeSrc, /content:\s*`---/)
  assert.match(composeSrc, /heroTitle/)
  assert.match(composeSrc, /depositReferrer/)
  assert.match(
    readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8'),
    /fm\.heroTitle\s*\?\?=/,
  )

  const { theorems } = await import('../index.js')
  const { pathToFileURL } = await import('node:url')
  const { composeTheorem } = await import(
    pathToFileURL(join(ROOT, 'docs/.vitepress/compose-object.js')).href
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
  assert.ok(page.params.handleUrl?.startsWith('https://uuidna.com/'))
  assert.ok('heartbeats' in page.params, 'theorem params carry measured heartbeats for page metrics')
  assert.ok(!page.content.startsWith('---'), 'content must not open with YAML frontmatter')
  assert.doesNotMatch(page.content, /^title:\s/m)
  assert.doesNotMatch(page.content, /^heroTitle:\s/m)
  assert.doesNotMatch(page.content, /^objectKind:\s/m)
})

test('ObjectPage wires i18n translateObjectText + locale rays', () => {
  const vue = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectPage.vue'), 'utf8')
  assert.match(vue, /translateObjectText/)
  assert.match(vue, /OBJECT_LOCALE_RAYS/)
  assert.match(vue, /object-hero/)
})
