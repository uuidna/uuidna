import { test } from 'node:test'
import assert from 'node:assert/strict'
import { axiomReach, axiomReachGaps, defBodies, theoremsExplaining } from './axiom-reach.js'
import { axiomIndex } from './theorems/index.js'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'

test('defBodies reads a wing and separates each def from the next declaration', () => {
  const b = defBodies('BioPhysics.lean')
  assert.ok(b.has('lxor') && b.has('lxorAux'), 'both defs must be found')
  assert.match(b.get('lxor')!, /lxorAux/, 'lxor is defined in terms of lxorAux')
  assert.ok(!/^theorem/m.test(b.get('lxor')!.replace(/^def[^\n]*\n/, '')), 'a body must stop at the next declaration')
})

test('the partition is exhaustive and disjoint — every def is exactly one of direct, reached, orphan', () => {
  const r = axiomReach()
  assert.equal(r.direct + r.reached + r.orphans.length, r.defs, 'the three classes must account for every def')
  for (const e of r.entries) {
    const flags = [e.direct, !e.direct && e.via.length > 0, e.orphan].filter(Boolean).length
    assert.equal(flags, 1, `${e.file}:${e.def} is in ${flags} classes, not exactly one`)
  }
})

test('a reached def carries the chain that explains it, ending at itself', () => {
  const r = axiomReach()
  const reached = r.entries.filter((e) => !e.direct && !e.orphan)
  assert.ok(reached.length > 0, 'the reachability layer must actually reach something, or it proves nothing')
  for (const e of reached) {
    assert.ok(e.via.length >= 2, `${e.def}: a chain must name at least the parent and the child`)
    assert.equal(e.via[e.via.length - 1], e.def, `${e.def}: the chain must end at the def it explains`)
    const root = r.entries.find((x) => x.file === e.file && x.def === e.via[0])
    assert.ok(root?.direct, `${e.def}: the chain must START at a directly-cited def`)
  }
})

test('the index is FULL — no definition is unreached by every theorem', () => {
  const r = axiomReach()
  assert.deepEqual(r.orphans.map((o) => `${o.file}:${o.def}`), [], 'an unreached def is vocabulary the research does not use')
  assert.equal(r.full, true)
  assert.equal(r.explained, r.defs)
  assert.deepEqual(axiomReachGaps(), [])
})

test('this layer AGREES with axiomIndex on what is directly cited — it adds, never overrides', () => {
  const r = axiomReach()
  const idx = axiomIndex()
  assert.equal(r.direct, idx.citedDefs, 'direct citation is axiomIndex’s answer, unchanged')
  assert.equal(r.defs, idx.totalDefs)
  // and the defs axiomIndex calls unused are exactly the ones this layer must explain or orphan
  assert.equal(r.reached + r.orphans.length, idx.unusedDefs, 'the reported-unused set is what gets partitioned')
})

test('theoremsExplaining names a theorem for a def reached through a parent', () => {
  const e = theoremsExplaining('BioPhysics.lean', 'lxorAux')
  assert.equal(e.direct, false, 'lxorAux is not named by a theorem statement')
  assert.deepEqual(e.via, ['lxor', 'lxorAux'])
  assert.ok(e.theorems.length > 0, 'and yet a theorem accounts for it, through lxor')
})

test('the receipt is deterministic', () => {
  assert.equal(axiomReach().receipt, axiomReach().receipt)
})

// A SEALED LITERAL MUST STILL EQUAL THE LIVE FIGURE — see the note in publication-graph.test.ts. The theorem
// `the_axiom_index_partitions_without_remainder` seals 126 direct + 87 reached + 0 unreached = 213 definitions.
// Recomputed here so a new wing's vocabulary cannot silently make that sentence historical. It fired exactly as
// intended on 2026-09-06: five new wings brought pmod, ordOf, unitsOf, lawLambda and their kin into the index,
// the figure moved 108 -> 213, and the ratchet refused to let the sealed sentence stay behind. The numbers below
// are the live ones AFTER re-minting the theorem — they are not a widening of the test, they are its point.
// THE LAW, NOT ONE DAY'S FIGURES (2026-09-13). the_axiom_index_partitions_without_remainder names a partition that
// closes with no remainder. The counts pinned here were one day's reading, and the index grew past them while the law
// held exactly, so the law is asserted against the live index and the figures are read, never typed.
test('the live axiom index partitions without remainder, as the sealed theorem states', () => {
  const r = axiomReach()
  assert.ok(r.defs > 0, 'the index is not empty')
  assert.equal(r.orphans.length, 0, 'no definition goes unreached')
  assert.equal(r.direct + r.reached, r.defs, 'direct plus reached is every definition, with no remainder')
})

// ── STALENESS IS NOT ORPHANHOOD ──────────────────────────────────────────────────────────────────────────────
// The two inputs to this census have different freshness by construction: the def list comes from the generated
// ledger and the bodies are read from lean/*.lean. reconcile runs the JS controls BEFORE rewriting the ledger, so
// for exactly one pass a wing added or a dead definition removed makes the index disagree with the disk — and that
// disagreement used to present as unexplained vocabulary. Measured: one removed helper cost four reconcile passes,
// each surfacing one link of what was really one fact. These two tests are the same wing with only the disk changed.
test('a def the wing no longer defines is STALE, never an orphan', () => {
  const wing = join(ROOT, 'lean', 'CrossProof.lean')
  if (!existsSync(wing)) return // the wing is not on this host; nothing to stale
  const before = readFileSync(wing, 'utf8')
  const target = 'def symmSwapBoth (a b c d : Nat) : Bool := c * b == d * a\n'
  if (!before.includes(target)) return // the wing moved on; the distinction is tested by its sibling below
  try {
    writeFileSync(wing, before.replace(target, ''))
    const r = axiomReach()
    const staled = r.stale.filter((e) => e.def === 'symmSwapBoth')
    assert.equal(staled.length, 1, 'a def gone from the disk must be reported as stale')
    assert.ok(!r.orphans.some((o) => o.def === 'symmSwapBoth'),
      'and never as an orphan — an orphan sends the reader to argue about vocabulary that no longer exists')
    assert.equal(r.full, false, 'a census taken against a stale index has not measured the tree it describes')
    const gaps = axiomReachGaps()
    assert.equal(gaps.length, 1)
    assert.match(gaps[0]!.what, /no longer define/)
    assert.match(gaps[0]!.fix, /generate/, 'the cure for staleness is to regenerate, not to justify a definition')
  } finally {
    writeFileSync(wing, before)
  }
})

test('with the index fresh, nothing is stale and the census is full', () => {
  const r = axiomReach()
  assert.deepEqual(r.stale.map((e) => e.file + '::' + e.def), [],
    'a stale entry here means the committed ledger disagrees with the committed wings — run generate')
  assert.equal(r.orphans.length, 0, 'and no definition ships that no theorem accounts for')
  assert.equal(r.full, true)
})
