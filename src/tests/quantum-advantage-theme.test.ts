// QuantumAdvantage theme — home-only QA monitor; ObjectPage has no per-page QA chrome.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

const THEME = join(ROOT, 'docs/.vitepress/theme')

test('theme Layout is ObjectPage; QuantumAdvantage registered for home markdown', () => {
  const idx = readFileSync(join(THEME, 'index.ts'), 'utf8')
  assert.match(idx, /Layout:\s*ObjectPage/)
  assert.match(idx, /app\.component\('QuantumAdvantage'/)
  assert.doesNotMatch(idx, /QaMetrics/)
  assert.doesNotMatch(idx, /QaCardInjector/)
})

test('ObjectPage does not mount QuantumAdvantage or QaCardInjector', () => {
  const vue = readFileSync(join(THEME, 'ObjectPage.vue'), 'utf8')
  assert.doesNotMatch(vue, /QuantumAdvantage/)
  assert.doesNotMatch(vue, /QaCardInjector/)
  assert.doesNotMatch(vue, /QaMetrics/)
  assert.match(vue, /object-hero/)
  assert.match(vue, /ObjectCrosslinks/)
  assert.ok(!existsSync(join(THEME, 'QaCardInjector.vue')))
  assert.ok(!existsSync(join(THEME, 'QaMetrics.vue')))
})

test('home mounts QuantumAdvantage in markdown; advantage.data watches sealed outputs', () => {
  const home = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
  assert.match(home, /<QuantumAdvantage\s*\/>/)
  assert.doesNotMatch(home, /<CostMeter\s*\/>/)
  assert.doesNotMatch(home, /quantum-capacity:begin/)
  assert.equal((home.match(/^\s+- title:/gm) || []).length, 3, 'home features slimmed to 3')
  const loader = readFileSync(join(ROOT, 'docs/.vitepress/advantage.data.ts'), 'utf8')
  assert.match(loader, /quantum-advantage\.json/)
  assert.match(loader, /usable_gap_is_two_to_eighty/)
  assert.match(loader, /\/quantum#quantum-capacity/)
  assert.ok(existsSync(join(ROOT, 'lean/quantum-advantage.json')))
  assert.ok(existsSync(join(THEME, 'QuantumAdvantage.vue')))
  const quantum = readFileSync(join(ROOT, 'docs/quantum.md'), 'utf8')
  assert.match(quantum, /quantum-capacity:begin/)
})

test('home QuantumAdvantage is site-level usable-capacity, not page-local cards', () => {
  const vue = readFileSync(join(THEME, 'QuantumAdvantage.vue'), 'utf8')
  assert.match(vue, /usable_gap|gapFactor|usableBits/)
  assert.match(vue, /advantage\.data/)
  assert.doesNotMatch(vue, /pageAdvantageMetrics/)
  assert.doesNotMatch(vue, /no physics quantum advantage is claimed/i)
  assert.doesNotMatch(vue, /variant.*card|qa-compact/)
})
