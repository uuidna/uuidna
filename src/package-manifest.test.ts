// package-manifest — WHAT A CONSUMER HITS FIRST, held as a finder with its controls. Measured 2026-09-15: the root's
// two bins (uuidna-mcp, uuidna-install), neither named "uuidna", made the documented `npx @uuidna/uuidna` answer
// "could not determine executable to run"; every exports entry carried only "import", so require() through the map
// threw ERR_PACKAGE_PATH_NOT_EXPORTED on a node that can require the same file directly; and no manifest exported
// ./package.json. manifestGaps names each, and the controls below prove it fires on exactly those shapes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { manifestGaps } from './scripts/audit-packages.js'
import { workspacePackages } from './npm-pack.js'

const read = (rel: string) => JSON.parse(readFileSync(join(ROOT, rel), 'utf8'))

test('CONTROL — two bins, neither named after the package, is the npx failure', () => {
  const gaps = manifestGaps({ name: '@x/tool', publishConfig: { access: 'public' }, bin: { 'tool-a': 'a.js', 'tool-b': 'b.js' }, exports: { './package.json': './package.json' } })
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!, /npx @x\/tool/)
  assert.deepEqual(manifestGaps({ name: '@x/tool', publishConfig: { access: 'public' }, bin: { tool: 't.js', 'tool-b': 'b.js' }, exports: { './package.json': './package.json' } }), [])
  assert.deepEqual(manifestGaps({ name: '@x/tool', publishConfig: { access: 'public' }, bin: { anything: 'a.js' }, exports: { './package.json': './package.json' } }), [])
})

test('CONTROL — an "import"-only entry, a late "types", a missing ./package.json and a restricted scope are each named', () => {
  const gaps = manifestGaps({ name: '@x/lib', exports: { '.': { import: './i.js', types: './i.d.ts' } } })
  assert.ok(gaps.some((g) => /"types" must be the first/.test(g)))
  assert.ok(gaps.some((g) => /"default" must be the last/.test(g)))
  assert.ok(gaps.some((g) => /\.\/package\.json/.test(g)))
  assert.ok(gaps.some((g) => /publishConfig\.access/.test(g)))
})

test('the root and every workspace manifest answer the consumer rules', () => {
  assert.deepEqual(manifestGaps(read('package.json')), [])
  for (const p of workspacePackages()) assert.deepEqual(manifestGaps(read(`packages/${p.dir}/package.json`)), [], p.name)
})

// SHIPPING WHAT IT IMPORTS, which the manifest did not guarantee and a
// deployment discovered instead. `dist/hologram-lattice.js` imports
// `../lean/alpine-hexbit-monitor.json`; `files` listed six lean/*.json entries
// and not that one. So `import('@uuidna/uuidna')` threw ERR_MODULE_NOT_FOUND in
// every consumer — the school deployment could not even generate its import
// map — while every test here passed, because nothing in this tree imports the
// package the way a consumer does.
//
// The manifest is a promise about a tarball, and this is the part of it nobody
// was computing: a data file the code reaches for at import time is as load-
// bearing as the code, and leaving it out ships a package whose import fails
// at once — a host fact, not a policy: the file is absent from the tarball, so
// the module that reads it at import time throws before any code of ours runs.
test('every lean/*.json that dist imports is a file the package ships', () => {
  const files: string[] = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { files: string[] }).files
  const shipped = new Set(files.filter((f) => f.startsWith('lean/')))

  const needed = new Set<string>()
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) { walk(path); continue }
      if (!path.endsWith('.js')) continue
      for (const m of readFileSync(path, 'utf8').matchAll(/from\s+['"]\.\.\/(lean\/[A-Za-z0-9._-]+\.json)['"]/g)) {
        needed.add(m[1]!)
      }
    }
  }
  walk(join(ROOT, 'dist'))

  const missing = [...needed].filter((n) => !shipped.has(n)).sort()
  assert.deepEqual(missing, [], 'dist imports a lean/*.json the tarball does not carry — add it to `files`, or the package cannot be imported')

  // CONTROL: the reader must be able to see an import at all, or an empty
  // `missing` proves only that the scan found nothing.
  assert.ok(needed.size > 0, 'the scan found no lean/*.json imports in dist — the reader is broken, not the manifest')
})
