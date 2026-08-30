// polygraph — the say-do instrument held to its own law: a kept promise passes, a broken one is NAMED with its
// commit, the empty case verifies (naming no path promises none), and the controls prove the needle can move in
// both directions — an instrument that only ever charges is as worthless as one that never does.
import { test } from 'node:test'
import assert from 'node:assert'
import { sayDoOf, chart } from './quantum/apps/categories/coding/index.js'

test('a kept promise reads clean: every path the message names, the diff contains', () => {
  const r = sayDoOf({ hash: 'a1', message: 'seal the wing in src/scripts/lean-song.ts and wire docs/song.md', touched: ['src/scripts/lean-song.ts', 'docs/song.md'] })
  assert.deepEqual(r.untouched, [])
  assert.equal(r.kept, 2)
})

test('a broken promise is named with its commit — the say-do gap, decided by set arithmetic', () => {
  const r = sayDoOf({ hash: 'b2', message: 'land src/scripts/gen-song.ts and docs/apps.md', touched: ['src/scripts/gen-song.ts'] })
  assert.deepEqual(r.untouched, ['docs/apps.md'])
  assert.equal(r.kept, 1)
})

test('the empty case verifies — a message naming no path promises no path', () => {
  const c = chart([{ hash: 'c3', message: 'Reconcile: regenerate the derived layer, backed by theorem two_coins', touched: ['README.md'] }])
  assert.equal(c.claims, 0)
  assert.equal(c.keptRate, 1, 'no promise is a kept promise, not a broken one')
  assert.deepEqual(c.gaps, [])
})

test('CONTROL — the needle moves both ways: the same chart charges the gap and clears the keeper', () => {
  const c = chart([
    { hash: 'd4', message: 'wire src/site.ts', touched: ['src/site.ts'] },
    { hash: 'e5', message: 'wire src/site.ts and lean/Song.lean', touched: ['src/site.ts'] },
  ])
  assert.equal(c.commits, 2)
  assert.equal(c.claims, 3)
  assert.equal(c.kept, 2)
  assert.equal(c.gaps.length, 1, 'exactly one commit charged')
  assert.equal(c.gaps[0]!.hash, 'e5', 'and it is the one that broke its word')
  assert.ok(c.keptRate < 1 && c.keptRate > 0, 'a rate, never a verdict — the needle reads between the poles')
})

test('prose that is not a path is never charged — the finder does not guess at nouns', () => {
  const r = sayDoOf({ hash: 'f6', message: 'the song sings, the ledger holds, the captain decides', touched: [] })
  assert.deepEqual(r.claimed, [], 'nouns are not paths and a polygraph that charged them would charge everything')
})
