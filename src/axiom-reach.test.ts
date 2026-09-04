import { test } from 'node:test'
import assert from 'node:assert/strict'
import { axiomReach, axiomReachGaps, defBodies, theoremsExplaining } from './axiom-reach.js'
import { axiomIndex } from './theorems/index.js'

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
// `the_axiom_index_partitions_without_remainder` seals 93 direct + 15 reached + 0 unreached = 108 definitions.
// Recomputed here so a new wing's vocabulary cannot silently make that sentence historical.
test('the sealed partition figures still ARE the live index', () => {
  const r = axiomReach()
  assert.equal(r.defs, 108, 'the theorem seals 108 definitions')
  assert.equal(r.direct, 93, 'the theorem seals 93 directly cited')
  assert.equal(r.reached, 15, 'the theorem seals 15 reached through a parent')
  assert.equal(r.orphans.length, 0, 'the theorem seals 0 unreached')
  assert.equal(r.direct + r.reached + r.orphans.length, r.defs)
})
