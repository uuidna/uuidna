import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { disagreements, crossSurfaceCensus, type Probe } from './cross-surface.js'
import { MIRROR } from './rosetta-mirror.js'
import claims from '../docs/captain-claims.json' with { type: 'json' }

// THE PROBES ARE THE POINT. cross-surface.ts is arithmetic over pairs; this file is where the pairs are named,
// and naming them is the whole instrument. Each pair below is two censuses of the SAME quantity reached by
// different mechanisms — the Lean source read directly, a generated mirror, a generated claims ledger. Any one
// of them can be wrong while reading clean. What they cannot do is be wrong TOGETHER and still agree — cannot,
// because agreement here is on a number neither surface takes from the other: the mirror is rendered from the
// wings, the claims ledger is indexed from the parsed lines, and this file counts the .lean text itself. Two
// derivations that never read each other have no channel to make the same mistake through.

/** The ledger, counted from the Lean source itself — the one reading that no generator produced. */
function leanSourceKeys(): Set<string> {
  const keys = new Set<string>()
  const dir = join(ROOT, 'lean')
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.lean'))) {
    for (const line of readFileSync(join(dir, f), 'utf8').split('\n')) {
      const m = /^(theorem|lemma)\s+([A-Za-z0-9_']+)/.exec(line)
      if (m) keys.add(m[2]!)
    }
  }
  return keys
}

/** The ledger as the shipped rosetta mirror records it. */
function mirrorKeys(): Set<string> {
  return new Set(
    MIRROR.split('\n')
      .filter((l) => l.trim() && !l.startsWith('#'))
      .map((l) => l.trim().split(/\s+/)[0]!),
  )
}

test('cross-surface — the probe pairs agree, or each disagreement is a lead', () => {
  const lean = leanSourceKeys(), mirror = mirrorKeys()
  const claimed = new Set(claims.claims_list.map((c) => c.key))
  const probes: Probe[] = [
    {
      what: 'ledger size',
      a: { surface: 'lean/*.lean (source, ungenerated)', value: lean.size },
      b: { surface: 'src/rosetta-mirror.ts MIRROR', value: mirror.size },
      why: 'the mirror is shipped to an edge with no filesystem; if it drifts from the source, the edge answers a ledger that does not exist',
    },
    {
      what: 'ledger size',
      a: { surface: 'lean/*.lean (source, ungenerated)', value: lean.size },
      b: { surface: 'docs/captain-claims.json', value: claimed.size },
      why: 'a claim for a theorem not in the source is a claim on nothing; a theorem absent from the claims is unclaimed work',
    },
    {
      what: 'claims partition into discovery and formalisation',
      a: { surface: 'total_claimed', value: claims.total_claimed },
      b: { surface: 'novelty_claimed + formalisation_only', value: claims.novelty_claimed + claims.formalisation_only },
      why: 'the two parts must exhaust the whole, or a row is claimed twice or not at all',
    },
    {
      what: 'attributed facts recorded',
      a: { surface: 'captain-claims.attributed_facts', value: claims.attributed_facts.length },
      b: { surface: 'captain-claims.formalisation_only', value: claims.formalisation_only },
      why: 'the count and the list are written by one generator from one census; if they part, one of them is stale',
    },
  ]

  // A DISAGREEMENT MUST NAME ITS CURE, or it gets read as flakiness and waved through. The first pair has a
  // LEGITIMATE window in which to part — between sealing a theorem and regenerating the derived layer the
  // mirror is honestly behind the source — and a reader who hits that mid-reconcile and sees a bare number
  // learns nothing except that this test is noisy. The other three are written by one generator from one census
  // and have no such window: if they part, something is stale or a row is counted twice.
  const found = disagreements(probes)
  const cure = (what: string): string =>
    what === 'ledger size'
      ? 'the derived layer is behind the source — run the reconcile (generate → heartbeats --sync → messaging → rosetta → spin --seal); if it persists AFTER a reconcile, a generator is dropping rows'
      : 'no reconcile can fix this — these are written by ONE generator from ONE census, so a row is counted twice, or not at all, or a count and its list have parted'
  assert.deepEqual(
    found.map((d) => `${d.what}: ${d.a.surface}=${d.a.value} vs ${d.b.surface}=${d.b.value} (delta ${d.delta}) — ${d.why}. FIX: ${cure(d.what)}`),
    [],
  )
  assert.equal(crossSurfaceCensus(probes).asked, 4)
})

// THE CONTROL. Every assertion above passes if disagreements() simply never reports — which is also what a
// broken comparator looks like. Handed a pair that differs by one it must say so, and it must say so about the
// LARGER gap first, because a planner reads the top of the list.
test('cross-surface — the comparator REPORTS a difference when one exists', () => {
  const probes: Probe[] = [
    { what: 'small', a: { surface: 'a', value: 10 }, b: { surface: 'b', value: 11 }, why: 'w' },
    { what: 'large', a: { surface: 'a', value: 10 }, b: { surface: 'b', value: 4 }, why: 'w' },
    { what: 'none', a: { surface: 'a', value: 7 }, b: { surface: 'b', value: 7 }, why: 'w' },
  ]
  const d = disagreements(probes)
  assert.equal(d.length, 2, 'the comparator missed a differing pair, or reported an agreeing one')
  assert.equal(d[0]!.what, 'large', 'the widest gap must be reported first — a negative delta is still a big gap')
  assert.equal(d[0]!.delta, -6)
  assert.deepEqual(crossSurfaceCensus(probes), { asked: 3, disagreed: 2, agreed: 1 })
})
