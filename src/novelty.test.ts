import { test } from 'node:test'
import assert from 'node:assert/strict'

import { novelty, noveltyAnchors } from './novelty.js'
import { TOOL_NAMES } from './mcp.js'
import { ZENODO_SEALS } from './zenodo-seals.js'

/**
 * THE TWO DOIs MUST STAY TWO. The whole point of this door is that "what is this work" and "when was it first"
 * are different questions with different answers. If an anchor's cite DOI and first DOI collapse to one value
 * for a versioned deposit, the conflation this module exists to prevent is back and nothing would say so.
 */
test('a versioned deposit carries a first DOI distinct from the one it is cited by', () => {
  const clay = noveltyAnchors().find((a) => a.id === 'clay-involution')
  assert.ok(clay, 'clay carries no dated anchor')
  assert.notEqual(clay!.firstDoi, clay!.citeDoi, 'precedence and citation collapsed to one DOI')
  assert.equal(clay!.citeDoi, clay!.conceptDoi, 'the cite DOI should be the concept, which follows the series')
  assert.match(clay!.firstPublished, /^\d{4}-\d{2}-\d{2}$/)
})

/** Earliest first, because the answer to "when was this first" is the minimum and a reader takes the top row. */
test('anchors are ordered earliest first', () => {
  const dates = noveltyAnchors().map((a) => a.firstPublished)
  assert.deepEqual(dates, [...dates].sort())
})

/**
 * A SEAL WITHOUT A DATE IS OMITTED, NEVER DATED FROM WHATEVER DOI IS STANDING. Dating a deposit from its
 * current version would put a precedence claim on a DOI that moves every release — the exact fault this door
 * was built after finding.
 */
test('a seal with no recorded first deposit contributes no anchor', () => {
  const undated = ZENODO_SEALS.filter((s) => s.firstPublished === undefined).map((s) => s.id)
  const anchored = new Set(noveltyAnchors().map((a) => a.id))
  for (const id of undated) assert.equal(anchored.has(id), false, `${id} has no date and was dated anyway`)
  // and the control: the seals that DO carry a date are anchored, so the filter is not simply refusing everything
  const dated = ZENODO_SEALS.filter((s) => s.firstPublished !== undefined).map((s) => s.id)
  assert.ok(dated.length > 0)
  for (const id of dated) assert.equal(anchored.has(id), true, `${id} carries a date and was dropped`)
})

/** A theorem key resolves through its wing; an unknown subject answers "none" rather than throwing. */
test('a key resolves through its wing, and an unknown subject answers none', () => {
  const known = novelty('two_bit_conjunctions_are_four_of_sixteen')
  assert.equal(known.wing, 'Clay.lean')
  assert.ok(known.anchors.length > 0)
  assert.equal(known.earliest, known.anchors[0].firstPublished)

  const unknown = novelty('no_such_theorem_anywhere')
  assert.deepEqual(unknown.anchors, [])
  assert.equal(unknown.earliest, undefined)
})

/**
 * THE HONESTY CLAUSE TRAVELS ON EVERY ANSWER, including the empty one. A receipt read as a ruling is the
 * failure mode of this whole surface, so the sentence that refuses the reading cannot be dropped when there is
 * nothing to report.
 */
test('every answer states what it proves and what it refuses', () => {
  for (const subject of ['Clay.lean', 'no_such_theorem_anywhere', '']) {
    const n = novelty(subject)
    assert.match(n.proves, /archived by an independent party/)
    assert.match(n.refuses, /does not adjudicate priority/)
  }
})

/** The public runs it: the door is registered, so this is reachable without reading the source. */
test('the novelty door is served', () => {
  assert.ok(TOOL_NAMES.includes('uuidna_novelty'))
})
