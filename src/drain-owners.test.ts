// drain-owners — EVERY CONCRETE DRAIN FILE NAMES EXACTLY ONE WRITER.
//
// Lead b13fd37a: three generators sat unwired while their outputs stayed on DRAIN_PATHS, so the drain staged
// receipts nobody regenerated. drainGaps now fails on zero or two owners; this holds the live tree clean and
// bites the historical shape (a drain path with no declaration).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DRAIN_PATHS, DRAIN_WRITERS, RECONCILE_OUTPUTS, DOCS_BUILD_OUTPUTS } from './scripts/api.js'
import { drainGaps } from './scripts/one-receipt.js'

test('drainGaps is clean on the live tree — every concrete drain file has exactly one writer', () => {
  assert.deepEqual(drainGaps(), [], 'a concrete drain path with zero or two owners is the defect this exists to catch')
})

test('the ownership map covers every concrete drain file exactly once', () => {
  const owners = new Map<string, Set<string>>()
  const claim = (path: string, writer: string): void => {
    if (!owners.has(path)) owners.set(path, new Set())
    owners.get(path)!.add(writer)
  }
  for (const [g, outs] of Object.entries(RECONCILE_OUTPUTS)) for (const o of outs) claim(o, g)
  for (const [g, outs] of Object.entries(DOCS_BUILD_OUTPUTS)) for (const o of outs) claim(o, g)
  for (const [p, w] of Object.entries(DRAIN_WRITERS)) claim(p, w)

  const concrete = DRAIN_PATHS.filter((p) => p.includes('.') && !p.includes('*'))
  for (const p of concrete) {
    const who = [...(owners.get(p) ?? [])]
    assert.equal(who.length, 1, `${p} must have exactly one writer, got [${who.join(', ')}]`)
  }
  assert.ok(concrete.includes('docs/captain-claims-complete.json'),
    'the file whose frozen census motivated the lead must still be a drain path')
  assert.equal(RECONCILE_OUTPUTS['gen-captain-claims-complete']?.[0], 'docs/captain-claims-complete.json',
    'and its writer must ride the reconcile declaration, not only DRAIN_WRITERS')
})
