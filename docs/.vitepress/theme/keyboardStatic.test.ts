import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkKeyboardStatic } from './keyboardStatic.ts'

const HERE = dirname(fileURLToPath(import.meta.url))

test('checkKeyboardStatic catches a positive tabindex', () => {
  const v = checkKeyboardStatic([{ path: 'fake.vue', source: '<button tabindex="3">x</button>' }])
  assert.equal(v.length, 1)
  assert.equal(v[0].rule, 'positive-tabindex')
})

test('checkKeyboardStatic catches outline:none with no :focus replacement', () => {
  const v = checkKeyboardStatic([{ path: 'fake.vue', source: '<style>.x { outline: none; }</style>' }])
  assert.equal(v.length, 1)
  assert.equal(v[0].rule, 'outline-suppressed-no-replacement')
})

test('checkKeyboardStatic allows outline:none when a :focus-visible replacement exists', () => {
  const v = checkKeyboardStatic([{ path: 'fake.vue', source: '<style>.x { outline: none; } .x:focus-visible { outline: 2px solid red; }</style>' }])
  assert.deepEqual(v, [])
})

test('checkKeyboardStatic catches aria-hidden on the interactive element itself, not a decorative child', () => {
  const bad = checkKeyboardStatic([{ path: 'fake.vue', source: '<button aria-hidden="true">x</button>' }])
  assert.equal(bad.length, 1)
  assert.equal(bad[0].rule, 'interactive-aria-hidden')
  const fine = checkKeyboardStatic([{ path: 'fake.vue', source: '<button><span aria-hidden="true">icon</span> label</button>' }])
  assert.deepEqual(fine, [])
})

// The real audit: every .vue component actually shipped in this theme, scanned live off disk — so a NEW
// component added later is covered automatically, not only the two written this session.
test('every real .vue component in this theme passes the Tier 1 keyboard checks', () => {
  const files = readdirSync(HERE, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.vue'))
    .map((e) => ({ path: e.name, source: readFileSync(join(HERE, e.name), 'utf8') }))
  assert.ok(files.length > 0, 'sanity: there should be .vue components to check')
  const violations = checkKeyboardStatic(files)
  assert.deepEqual(
    violations.map((v) => `${v.file}: ${v.rule} — ${v.detail}`),
    [],
    'a real Tier 1 keyboard-accessibility issue in a shipped component',
  )
})
