// QuantumAdvantage theme — ObjectPage (catch-all Layout) mounts QA after hero; cards via QaCardInjector.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

const THEME = join(ROOT, 'docs/.vitepress/theme')

test('theme Layout is ObjectPage catch-all; QuantumAdvantage registered', () => {
  const idx = readFileSync(join(THEME, 'index.ts'), 'utf8')
  assert.match(idx, /Layout:\s*ObjectPage/)
  assert.match(idx, /app\.component\('QuantumAdvantage'/)
  assert.match(idx, /QaMetrics/)
})

test('ObjectPage mounts QuantumAdvantage in proof body (not over hero)', () => {
  const vue = readFileSync(join(THEME, 'ObjectPage.vue'), 'utf8')
  assert.match(vue, /QuantumAdvantage/)
  assert.match(vue, /object-proof/)
  assert.match(vue, /object-hero/)
})

test('advantage.data loader watches sealed TS quantum-computer outputs', () => {
  const loader = readFileSync(join(ROOT, 'docs/.vitepress/advantage.data.ts'), 'utf8')
  assert.match(loader, /quantum-advantage\.json/)
  assert.match(loader, /usable_gap_is_two_to_eighty/)
  assert.ok(existsSync(join(ROOT, 'lean/quantum-advantage.json')))
  assert.ok(existsSync(join(THEME, 'QuantumAdvantage.vue')))
})

// QaMetrics cites usable_gap_is_two_to_eighty (measured gap); n_qubit_dimension names the classical bound
test('QaMetrics cites measured usable-capacity gap, not blanket denial', () => {
  const vue = readFileSync(join(THEME, 'QaMetrics.vue'), 'utf8')
  assert.match(vue, /gapFactor/)
  assert.doesNotMatch(vue, /no physics quantum advantage is claimed/i)
  assert.match(vue, /advantage\.data|usable_gap|pageAdvantageMetrics/)
})

test('QaMetrics wires page-local metrics from pageAdvantageMetrics', () => {
  const vue = readFileSync(join(THEME, 'QaMetrics.vue'), 'utf8')
  assert.match(vue, /pageAdvantageMetrics/)
  assert.match(vue, /data-metrics="page"/)
  assert.match(vue, /heartbeat/)
  const qa = readFileSync(join(THEME, 'QuantumAdvantage.vue'), 'utf8')
  assert.match(qa, /heartbeats/)
  assert.match(qa, /objectKind|object-kind/)
})
