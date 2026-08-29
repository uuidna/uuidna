// Quantum capacity theme — home doors to /quantum; README + /quantum keep the capacity table.
// No QuantumAdvantage card chrome; ObjectPage has no per-page QA.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

const THEME = join(ROOT, 'docs/.vitepress/theme')

test('theme Layout is ObjectPage; no QuantumAdvantage registration', () => {
  const idx = readFileSync(join(THEME, 'index.ts'), 'utf8')
  assert.match(idx, /Layout:\s*ObjectPage/)
  assert.doesNotMatch(idx, /QuantumAdvantage/)
  assert.doesNotMatch(idx, /QaMetrics/)
  assert.doesNotMatch(idx, /QaCardInjector/)
  assert.doesNotMatch(idx, /loadDimensions/)
})

test('ObjectPage does not mount QuantumAdvantage, Dimensions FAB, or QaCardInjector', () => {
  const vue = readFileSync(join(THEME, 'ObjectPage.vue'), 'utf8')
  assert.doesNotMatch(vue, /QuantumAdvantage/)
  assert.doesNotMatch(vue, /QaCardInjector/)
  assert.doesNotMatch(vue, /QaMetrics/)
  assert.doesNotMatch(vue, /Dimensions/)
  assert.doesNotMatch(vue, /object-h1|object-hero/)
  assert.doesNotMatch(vue, /display:\s*none\s*!important/)
  assert.match(vue, /ObjectCrosslinks/)
  assert.match(vue, /ObjectBreadcrumbs/)
  assert.ok(!existsSync(join(THEME, 'QaCardInjector.vue')))
  assert.ok(!existsSync(join(THEME, 'QaMetrics.vue')))
  assert.ok(!existsSync(join(THEME, 'QuantumAdvantage.vue')))
})

test('home doors to /quantum; capacity table on /quantum and README only', () => {
  const home = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
  assert.doesNotMatch(home, /<QuantumAdvantage\s*\/>/)
  assert.doesNotMatch(home, /<CostMeter\s*\/>/)
  assert.doesNotMatch(home, /quantum-capacity:begin/)
  assert.match(home, /\/quantum/)
  assert.equal((home.match(/^\s+- title:/gm) || []).length, 3, 'home features slimmed to 3')
  const fmEnd = home.indexOf('\n---\n', 4)
  assert.ok(fmEnd > 0, 'homepage opens with YAML frontmatter')
  const details = home.slice(4, fmEnd).split('\n').filter((l) => /^\s+details:/.test(l))
  assert.equal(details.length, 3)
  for (const line of details) {
    assert.match(line, /^\s+details:\s+".*"\s*$/, `quote feature details — unquoted Doors: splits VitePress YAML: ${line.slice(0, 96)}`)
  }
  assert.ok(!existsSync(join(ROOT, 'docs/.vitepress/advantage.data.ts')))
  const quantum = readFileSync(join(ROOT, 'docs/quantum.md'), 'utf8')
  assert.match(quantum, /quantum-capacity:begin/)
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  assert.match(readme, /quantum-capacity:begin/)
})

test('Clay is the visible test POC on home and README — computationally claimed', () => {
  const home = readFileSync(join(ROOT, 'docs/index.md'), 'utf8')
  assert.match(home, /^\s+- title:\s*Clay\s*$/m)
  assert.match(home, /link:\s*\/articles\/clay/)
  assert.match(home, /computationally claimed|clay_gravity_equals_rosette/)
  assert.match(home, /clay_gravity_equals_rosette/)
  assert.doesNotMatch(home, /seal\s*≠\s*solution|not a solution claim/i)
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  assert.match(readme, /## Test proof of concept — Clay/)
  assert.match(readme, /computational claim/)
  assert.match(readme, /clay_gravity_equals_rosette/)
  assert.match(readme, /zenodo\.org\/records\/21781603|10\.5281\/zenodo\.21781603/)
  assert.doesNotMatch(readme, /solves none of the seven|seal\s*≠\s*solution/i)
})

test('compose-object emits stock markdown H1 + lead under it', async () => {
  const { composeTheorem, composePublication } = await import(join(ROOT, 'docs/.vitepress/compose-object.js'))
  const { theorems, publications } = await import(join(ROOT, 'dist/index.js'))
  const t = theorems()[0]
  const page = composeTheorem(t)
  assert.match(page.content, /^# /m)
  assert.doesNotMatch(page.content, /^heroTitle:\s/m)
  const pubs = publications().filter((p: { publishable?: boolean }) => p.publishable)
  assert.ok(pubs.length > 0)
  const pub = composePublication(pubs[0])
  assert.match(pub.content, /^# /m)
})

test('docs:build raises the VitePress heap and skips MiniSearch on dynamic object pages', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  assert.match(pkg.scripts['docs:build'] ?? '', /max-old-space-size=8192/)
  assert.match(readFileSync(join(ROOT, 'wrangler.toml'), 'utf8'), /NODE_OPTIONS=--max-old-space-size=8192/)
  const cfg = readFileSync(join(ROOT, 'docs/.vitepress/config.ts'), 'utf8')
  assert.match(cfg, /fm\.search = false/)
  assert.match(cfg, /\[id\]/)
})
