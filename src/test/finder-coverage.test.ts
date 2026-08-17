// finder-coverage — A FINDER THAT NOBODY CALLS IS A CLAIM NOBODY CHECKS. Every gap-finder exported by one-receipt must
// be wired into the guard as BLOCKING, declared ADVISORY with a stated reason, or listed ON_DEMAND here with why —
// and this test fails if a new one appears in none of those places.
//
// MEASURED, the day it was folded (2026-08-17): three finders — `dry`, `seo`, `vacuous` — existed and were invoked
// NOWHERE in the tree: not the guard, not an npm script, not CI, not a hook. The moment `vacuous` was first run it
// named 12 findings, all of them theorems already sealed and published whose proofs are true regardless of content
// (P ∨ ¬P, P ↔ P). The code to catch that class had been written and never executed. This is the finder for finders.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

/** Deliberately not in the guard, each with the reason it stays out — a measured cost, not an oversight. */
const ON_DEMAND: Record<string, string> = {
  crypto: 'covers every cryptographic operation against its KAT; the crypto-primitives tests already assert the vectors each pass, so the guard would pay twice',
  re: 'measures reverse-engineering cost by bounded key recovery at ~2.1s per guess on this host — a measurement, not a check, so it stays a deliberate invocation',
}

test('every finder one-receipt exports is wired: blocking in the guard, advisory with a reason, or on-demand with why', () => {
  const oneReceipt = readFileSync(join(ROOT, 'src', 'scripts', 'one-receipt.ts'), 'utf8')
  const guard = readFileSync(join(ROOT, 'src', 'scripts', 'guard.ts'), 'utf8')
  // every exported gap-finder, by its leaf name: `export function fooGaps` → 'foo'
  const finders = [...oneReceipt.matchAll(/^export (?:async )?function ([a-zA-Z]+)Gaps\b/gm)].map((m) => m[1])
  assert.ok(finders.length >= 9, `expected the finder family, found ${finders.length}`)

  // the guard's two tiers, read from its own lists rather than assumed
  const blocking = new Set([...guard.matchAll(/\{ name: '([a-z]+)', run:/g)].map((m) => m[1]))
  const advisory = new Set([...guard.matchAll(/\{ name: '([a-z]+)', run: [^\n]*\n\s*why:/g)].map((m) => m[1]))

  const unwired: string[] = []
  for (const f of finders) {
    const leaf = f === 'pipe' ? 'pipes' : f          // pipeGaps is invoked as the 'pipes' leaf
    if (blocking.has(leaf) || advisory.has(leaf) || leaf in ON_DEMAND) continue
    unwired.push(`${f}Gaps → nothing runs it`)
  }
  assert.deepEqual(unwired, [], 'wire it into the guard, declare it ADVISORY with a reason, or add it to ON_DEMAND with why')
})

test('an advisory finder must state WHY it does not block — "not blocking" is a decision, not an accident', () => {
  const guard = readFileSync(join(ROOT, 'src', 'scripts', 'guard.ts'), 'utf8')
  const advisoryBlock = guard.slice(guard.indexOf('const ADVISORY'))
  const entries = [...advisoryBlock.matchAll(/\{ name: '([a-z]+)', run: [\s\S]*?why: '([^']{40,})'/g)]
  assert.ok(entries.length >= 1, 'the advisory tier should hold at least the finders that cannot block yet')
  for (const [, name, why] of entries)
    assert.ok(why.length >= 40, `advisory finder "${name}" must state a real reason, got ${why.length} chars`)
})

test('the on-demand exemptions each carry their reason', () => {
  for (const [name, why] of Object.entries(ON_DEMAND))
    assert.ok(why.length >= 40, `on-demand finder "${name}" needs a stated reason, got: ${why}`)
})
