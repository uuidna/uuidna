import { test } from 'node:test'
import assert from 'node:assert/strict'
import { merkleFold, toUuid } from './address.js'
import { rebuildCost, merklePath, verifyCost, costLadder, countedAdvantage, COST_LADDER } from './merkle-cost.js'
import { callTool } from './mcp.js'

const leavesFor = (n: number): string[] =>
  Array.from({ length: 2 ** n }, (_, i) => toUuid('cost-leaf|' + n + '|' + i))

test('the counted rebuild agrees with merkleFold, and its tally is the closed form — CHECKED, not used', () => {
  for (const n of [1, 2, 3, 6]) {
    const set = leavesFor(n)
    const built = rebuildCost(set)
    assert.equal(built.root, merkleFold(set), `n=${n}: the counter must fold to the same root as the real fold`)
    assert.equal(built.merges, set.length - 1,
      `n=${n}: 2^n − 1 is checked against the tally; if these part, the counter or the formula is wrong`)
  }
})

// BOTH PARITIES. Leaf 0 is always even, so a ladder that probes only leaf 0 never exercises merge(sib, acc) and
// passes a verifier that hashes siblings in the wrong order. A peer found exactly that by widening their own.
test('a path verifies to the root from an EVEN and an ODD leaf', () => {
  for (const n of [2, 3, 6]) {
    const set = leavesFor(n)
    const sorted = [...set].sort()
    const root = merkleFold(set)
    for (const [i, leaf] of [sorted[0]!, sorted[1]!].entries()) {
      const replay = verifyCost(leaf, merklePath(set, leaf), set)
      assert.equal(replay.root, root, `n=${n}: the ${i === 0 ? 'even' : 'odd'} leaf must replay to the root`)
      assert.equal(replay.merges, n, `n=${n}: verifying costs exactly n merges`)
    }
  }
})

// THE CONTROL. If the parity line is wrong, an odd leaf must FAIL — otherwise the both-parity test above proves
// nothing, because a verifier that always hashes one way would pass it too.
test('hashing the siblings the wrong way round BREAKS the odd leaf — so the parity line is load-bearing', () => {
  const n = 3, set = leavesFor(n), sorted = [...set].sort(), root = merkleFold(set)
  const odd = sorted[1]!
  const siblings = merklePath(set, odd)
  // the wrong verifier: always merge(acc, sib), never the odd-index form
  let acc = odd
  for (const sib of siblings) acc = toUuid('merge|' + acc + '|' + sib)
  assert.notEqual(acc, root, 'a one-sided verifier must not reach the root from an odd leaf')
  assert.equal(verifyCost(odd, siblings, set).root, root, 'and the parity-aware one must')
})

// THE COUNTEREXAMPLE, COMPUTED. The claim names the rung where it starts being true rather than assuming it is
// always true — and this is the rung the old asserted form got wrong.
test('at one line there is NO advantage: both cost one merge, and the ratio is exactly 1', () => {
  const rungs = costLadder([1])
  const r = rungs[0]!
  assert.equal(r.rebuild, 1)
  assert.equal(r.verify, 1)
  assert.equal(r.rebuild / r.verify, 1, 'exactly 1x — no advantage')
  assert.deepEqual(countedAdvantage().noAdvantageAt, [1], 'the claim carries its own lower bound')
})

// THE DENOMINATOR THE ASSERTED FORM GOT WRONG. leaves/verify and rebuild/verify differ by an amount that is
// invisible at 2^10 and is the entire answer at 2^1. This holds the correct one.
test('the ratio is merges over merges, never leaves over merges', () => {
  const a = countedAdvantage()
  assert.equal(a.ratioIsMergesOverMerges, true)
  const one = a.ladder.find((r) => r.lines === 1)!
  assert.equal(one.rebuild / one.verify, 1, 'merges/merges reads 1x at n=1')
  assert.equal(one.leaves / one.verify, 2, 'leaves/merges would read 2x — the claim the old strings made')
  const ten = a.ladder.find((r) => r.lines === 6)!
  assert.equal(ten.rebuild, ten.leaves - 1, 'and at every rung the two differ by exactly one merge')
})

test('the disclaimer is COMPUTED: every ratio equals (2^n − 1)/n exactly, on any host', () => {
  for (const r of countedAdvantage().ladder) {
    assert.equal(r.rebuild / r.verify, (2 ** r.lines - 1) / r.lines,
      `n=${r.lines}: a physical speedup would drift between runs; this cannot`)
  }
})

test('the ladder is DERIVED from the hexagram, not typed', () => {
  assert.deepEqual([...COST_LADDER], [1, 2, 3, 4, 5, 6, 9, 12],
    'six lines, then one trigram further, then one hexagram further — a typed ladder stops where it flatters')
  assert.equal(countedAdvantage().ladder.length, COST_LADDER.length)
})

test('uuidna_quantum_advantage serves the counted form, and the asserted strings are gone', () => {
  const m = (callTool('uuidna_quantum_advantage') as { magnitudes: Record<string, unknown> }).magnitudes
  assert.equal(m.at2_10, undefined, 'the asserted string must not survive alongside the measurement')
  assert.equal(m.at2_20, undefined)
  assert.equal(m.closedFormHolds, true)
  assert.equal(m.rootsAgree, true)
  assert.deepEqual(m.noAdvantageAt, [1])
  assert.match(String(m.honest), /Merkle/, 'the cost identity is attributed where a reader of the output sees it')
  assert.match(String(m.honest), /NOT A HARDWARE SPEEDUP/i)
})
