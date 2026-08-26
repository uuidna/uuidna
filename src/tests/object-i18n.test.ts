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

test('ObjectPage wires i18n translateObjectText + locale rays', () => {
  const vue = readFileSync(join(ROOT, 'docs/.vitepress/theme/ObjectPage.vue'), 'utf8')
  assert.match(vue, /translateObjectText/)
  assert.match(vue, /OBJECT_LOCALE_RAYS/)
  assert.match(vue, /object-hero/)
})
