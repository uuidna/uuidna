// worker wiring — worker.js is outside the TS graph (see quantum/os/harness/worker.test.ts), so the school's wiring is
// read as TEXT: it can prove the routes are declared and delegated, never that the edge serves them. The routes
// themselves are executed in index.test.ts.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../boundary.js'

const worker = (): string => readFileSync(join(ROOT, 'worker.js'), 'utf8')

test('worker.js delegates /school/ to the routes module before the trials and the assets', () => {
  const src = worker()
  assert.match(src, /import \{ handleSchool \} from '\.\/dist\/school\/routes\/index\.js'/)
  const school = src.indexOf("url.pathname.startsWith('/school/')")
  assert.ok(school > 0, 'the school doors are routed')
  assert.ok(school < src.indexOf('// Trial CRUD.'), 'before the trials')
  // anchored on the fallthrough CALL, not on the line that once declared it: the declaration was refactored into
  // servedAsset and indexOf then returned -1, so the assertion passed a check it was no longer making
  assert.ok(school < src.indexOf('env.ASSETS.fetch(assetReq)'), 'before the assets')
})

test('the rate limit reads the Worker\'s clock at the boundary, and certificates deposit through the MCP door', () => {
  const src = worker()
  assert.match(src, /const schoolCtxOf = \(url, env\) => \(\{\s*now: Date\.now\(\)/)
  assert.match(src, /name: 'uuidna_evidence', arguments: \{ run, deposit: body \}/, 'the certificate is sealed by the door, not by a second writer')
  assert.equal(src.match(/const depositOf = /g)?.length, 1, 'the deposit binding is declared once')
  assert.match(src, /deposit: depositOf\(env\),/, '/mcp deposits through the same declaration')
})

test('the school modules the Worker bundles import no Node builtin, and the browser-side modules reach no ledger', () => {
  for (const rel of ['src/school/routes/index.ts', 'src/school/lesson/index.ts', 'src/school/lesson/shape/index.ts', 'src/school/progress/index.ts', 'src/school/progress/identity/index.ts', 'src/school/submission/index.ts', 'src/school/grade/index.ts']) {
    const src = readFileSync(join(ROOT, rel), 'utf8')
    assert.doesNotMatch(src, /(?:^|\n)import [^;\n]* from ['"]node:/, rel)
  }
  const shape = readFileSync(join(ROOT, 'src/school/lesson/shape/index.ts'), 'utf8')
  assert.doesNotMatch(shape, /(?:^|\n)import /, 'lesson/shape is imported by the browser and imports nothing')
  const identity = readFileSync(join(ROOT, 'src/school/progress/identity/index.ts'), 'utf8')
  const imports = [...identity.matchAll(/(?:^|\n)import [^\n]* from '([^']+)'/g)].map((m) => m[1])
  assert.deepEqual(imports.sort(), ['../../../address.js', '../../../handle.js'], 'progress/identity reaches the handle derivation and nothing that loads the ledger')
})
