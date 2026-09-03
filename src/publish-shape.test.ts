import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'

// WHAT SHIPS TO SOMEONE WHO TYPES `npm install`. Measured 2026-09-03: the tarball was 7.1 MB packed, 22.8 MB
// unpacked, 2124 files — and 3.3 MB of it was `packages/mcp/.uuidna-books/`, a GITIGNORED, UNTRACKED runtime
// cache of Gutenberg texts that `files: ["packages"]` swept in anyway. That is worse than weight: the tarball
// then depends on whether the packing machine happened to have fetched books, so two people packing the same
// commit publish different bytes — in a tree whose entire discipline is that anyone can recompute the same
// thing. 201 compiled test files and .tsbuildinfo rode along too. With the four negations below: 5.0 MB packed,
// 16.9 MB unpacked, 1484 files, and the contents are a function of the commit alone.
//
// A pack-based assertion would be the stronger instrument and takes four minutes, which is why this holds the
// DECLARATION instead — and holds it against .gitignore, so the cache cannot quietly stop being a cache.

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
  files: string[]
  bin?: Record<string, string>
  dependencies?: Record<string, string>
  exports?: Record<string, unknown>
}

test('the published tarball is a function of the commit — no machine state rides along', () => {
  for (const negation of ['!**/.uuidna-books', '!dist/**/*.test.js', '!dist/.tsbuildinfo']) {
    assert.ok(pkg.files.includes(negation), `package.json files must exclude ${negation}`)
  }
  // and the book directory must still BE a cache; if it ever becomes tracked content the negation is wrong
  const ignore = readFileSync(join(ROOT, '.gitignore'), 'utf8')
  assert.match(ignore, /\.uuidna-books\//, '.uuidna-books is a runtime cache and .gitignore must say so')
})

test('the install path a reader is told to use actually exists', () => {
  assert.ok(pkg.bin && pkg.bin['uuidna-mcp'], 'npx uuidna-mcp is the documented entry point')
  const binPath = join(ROOT, pkg.bin!['uuidna-mcp']!.replace(/^\.\//, ''))
  assert.ok(existsSync(binPath), `${pkg.bin!['uuidna-mcp']} must exist in a built tree`)
  assert.equal(Object.keys(pkg.dependencies ?? {}).length, 0, 'a zero-dependency install is the promise; keep it')
})

test('every workspace package the surface advertises is declared publishable', () => {
  // NOT that they are PUBLISHED — measured 2026-09-03, all six answer 404 on the registry, which is a decision
  // for whoever holds the npm credential and not something a test can take. This holds that they are READY:
  // a package advertised in the root exports and missing its own manifest would be a broken promise either way.
  for (const name of ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']) {
    const p = join(ROOT, 'packages', name, 'package.json')
    assert.ok(existsSync(p), `packages/${name}/package.json`)
    const j = JSON.parse(readFileSync(p, 'utf8')) as { name: string; version: string; private?: boolean; files?: string[]; repository?: unknown }
    assert.equal(j.name, `@uuidna/${name}`)
    assert.notEqual(j.private, true, `@uuidna/${name} is advertised, so it must not be private`)
    assert.ok(j.files?.length, `@uuidna/${name} must declare what it ships`)
    assert.ok(j.repository, `@uuidna/${name} must name where it came from`)
    assert.ok(existsSync(join(ROOT, 'packages', name, 'README.md')), `@uuidna/${name} needs a README`)
    assert.ok(pkg.exports?.[`./${name}`], `the root must export ./${name} too, or the two surfaces disagree`)
  }
})
