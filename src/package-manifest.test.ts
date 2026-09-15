// package-manifest — WHAT A CONSUMER HITS FIRST, held as a finder with its controls. Measured 2026-09-15: the root's
// two bins (uuidna-mcp, uuidna-install), neither named "uuidna", made the documented `npx @uuidna/uuidna` answer
// "could not determine executable to run"; every exports entry carried only "import", so require() through the map
// threw ERR_PACKAGE_PATH_NOT_EXPORTED on a node that can require the same file directly; and no manifest exported
// ./package.json. manifestGaps names each, and the controls below prove it fires on exactly those shapes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
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
