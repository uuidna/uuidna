// test-graph — the graph reads CODE, not prose, and each rule ships with the control that would catch it lying.
//
// MEASURED 2026-09-12: a stale receipt made the planner answer 372 of 402 files, because one lexical rule read a
// `src/` in a header comment, an `import(` in a doc comment, a single named file, and a success MESSAGE all as
// "reads the whole tree". These fixtures are those four shapes, plus the seeding each one is allowed to cause.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { graphPlanOf, moduleOf, stripComments, testGraphOf } from './test-graph.js'

/** a throwaway dist/ with the given compiled modules; the graph is pure over disk, so this is the whole world */
const world = (files: Record<string, string>): string => {
  const root = mkdtempSync(join(tmpdir(), 'test-graph-'))
  for (const [rel, text] of Object.entries(files)) {
    mkdirSync(join(root, rel, '..'), { recursive: true })
    writeFileSync(join(root, rel), text)
  }
  return root
}
const fs = "import { readFileSync } from 'node:fs';\n"

test('a src/ path in a COMMENT is prose, not a read', () => {
  const root = world({ 'dist/a.js': `// the ledger lives in src/theorems/generated.ts\n${fs}export const a = readFileSync('lean/x.json')` })
  const m = moduleOf(root, 'dist/a.js')
  assert.equal(m.readsSourceTree, false)
  assert.deepEqual(m.readsFiles, ['lean/x.json'], 'the read it DOES make, at file grain')
  assert.deepEqual(m.reads, [])
})

test('an import( in a doc comment is not a computed import', () => {
  const root = world({ 'dist/a.js': `/** so \`import(join(dist, 'x.js'))\` reads as correct */\nexport const a = 1` })
  assert.equal(moduleOf(root, 'dist/a.js').importsUnknown, false)
})

test('a computed import() IS a computed import, and a literal one is an import', () => {
  const root = world({ 'dist/a.js': `export const load = (p) => import(pathToFileURL(p).href)`, 'dist/b.js': `export const x = () => import('./a.js')` })
  assert.equal(moduleOf(root, 'dist/a.js').importsUnknown, true)
  const b = moduleOf(root, 'dist/b.js')
  assert.equal(b.importsUnknown, false)
  assert.deepEqual(b.imports, ['dist/a.js'])
})

test('a single named source file is a dependency on THAT file, not the tree', () => {
  const root = world({ 'dist/a.js': `${fs}export const n = readFileSync('src/theorems/generated.ts').length` })
  const m = moduleOf(root, 'dist/a.js')
  assert.deepEqual(m.readsFiles, ['src/theorems/generated.ts'])
  assert.equal(m.readsSourceTree, false)
})

test('a bare source directory literal IS a source-tree walk', () => {
  const root = world({ 'dist/a.js': `${fs}export const t = readdirSync('src/tests')` })
  assert.equal(moduleOf(root, 'dist/a.js').readsSourceTree, true)
})

test('src/ inside a message string is neither a file nor a walk', () => {
  const root = world({ 'dist/a.js': `${fs}readFileSync('lean/x.json'); export const msg = '✓ src/rosetta-mirror.ts rewritten'` })
  const m = moduleOf(root, 'dist/a.js')
  assert.equal(m.readsSourceTree, false)
  assert.deepEqual(m.readsFiles, ['lean/x.json'], 'only the real read; the message names nothing')
})

test("join(root, 'src', 'handles') names the handles data dir", () => {
  const root = world({ 'dist/a.js': `${fs}export const w = readdirSync(join(root, 'src', 'handles'))` })
  const m = moduleOf(root, 'dist/a.js')
  assert.deepEqual(m.reads, ['src/handles/'])
  assert.equal(m.readsSourceTree, false, "the 'src' segment of a handles path is not a tree walk")
})

test('stripComments leaves strings intact, including a // inside a URL', () => {
  const out = stripComments(`const u = 'https://uuidna.com' // trailing\n/* block */ const v = 2`)
  assert.match(out, /https:\/\/uuidna\.com/)
  assert.doesNotMatch(out, /trailing|block/)
})

// ── SEEDING: what a move is allowed to reach ─────────────────────────────────────────────────────────────────
const seededWorld = () => world({
  'dist/api.js': `export const load = (p) => import(pathToFileURL(p).href)`,           // computed import
  'dist/walk.js': `${fs}export const t = readdirSync('src/tests')`,                   // source-tree walk
  'dist/one.js': `${fs}export const n = readFileSync('src/theorems/generated.ts')`,   // one named file
  'dist/lean.js': `${fs}export const l = readFileSync('lean/x.json')`,                // data dir
  'dist/api.test.js': `import './api.js'`,
  'dist/walk.test.js': `import './walk.js'`,
  'dist/one.test.js': `import './one.js'`,
  'dist/lean.test.js': `import './lean.js'`,
})

test('a moved lean/ json seeds the lean reader and the computed import (invisible), never the tree walk', () => {
  const root = seededWorld()
  const plan = graphPlanOf(['lean/x.json'], testGraphOf(root))
  assert.equal(plan.mode, 'delta')
  if (plan.mode === 'delta') assert.deepEqual(plan.files, ['dist/api.test.js', 'dist/lean.test.js'])
})

test('a moved compiled source seeds the tree walk AND the computed import, and its own importers', () => {
  const root = seededWorld()
  const plan = graphPlanOf(['src/one.ts'], testGraphOf(root))
  if (plan.mode === 'delta') assert.deepEqual(plan.files, ['dist/api.test.js', 'dist/one.test.js', 'dist/walk.test.js'])
  else assert.fail('expected delta')
})

test('a moved named file seeds exactly the module that reads it', () => {
  const root = seededWorld()
  // a seeded reader may be what the computed import loads, so the invisible dependency runs too
  const plan = graphPlanOf(['src/theorems/generated.ts'], testGraphOf(root))
  if (plan.mode === 'delta') assert.deepEqual(plan.files, ['dist/api.test.js', 'dist/one.test.js', 'dist/walk.test.js'])
  else assert.fail('expected delta')
})

// THE CONTROL — excluded data under src/ that tsc never compiles must not flip the source-tree walk.
test('a moved src/seeds json seeds nothing and is reported unreached', () => {
  const root = seededWorld()
  const plan = graphPlanOf(['src/seeds/abc/page.json'], testGraphOf(root))
  if (plan.mode === 'delta') { assert.deepEqual(plan.files, []); assert.deepEqual(plan.unreached, ['src/seeds/abc/page.json']) }
  else assert.fail('expected delta')
})

// ── DATA FILES AT FILE GRAIN: one moved json reaches only the modules that name it ───────────────────────────
test("a module naming 'lean/heartbeats.json' depends on that file, not on all of lean/", () => {
  const root = world({
    'dist/hb.js': `${fs}export const h = readFileSync('lean/heartbeats.json')`,
    'dist/all.js': `${fs}export const a = readdirSync('lean/')`,
    'dist/hb.test.js': `import './hb.js'`,
    'dist/all.test.js': `import './all.js'`,
  })
  assert.deepEqual(moduleOf(root, 'dist/hb.js').readsFiles, ['lean/heartbeats.json'])
  assert.deepEqual(moduleOf(root, 'dist/hb.js').reads, [])
  assert.deepEqual(moduleOf(root, 'dist/all.js').reads, ['lean/'])
  const moved = graphPlanOf(['lean/heartbeats.json'], testGraphOf(root))
  if (moved.mode === 'delta') assert.deepEqual(moved.files, ['dist/all.test.js', 'dist/hb.test.js'], 'the named reader AND the dir walker')
  else assert.fail('expected delta')
  const other = graphPlanOf(['lean/proof-cache.json'], testGraphOf(root))
  if (other.mode === 'delta') assert.deepEqual(other.files, ['dist/all.test.js'], 'a different lean file reaches only the dir walker — the control')
  else assert.fail('expected delta')
})
