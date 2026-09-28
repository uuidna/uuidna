import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  artefactOf,
  baseCensus,
  baseVerdictOf,
  inBase,
  restate,
} from './base-invariance.js'

test('artefactOf — recognises nines, powers and cyclic numbers, and nothing else', () => {
  assert.deepEqual(artefactOf('999999'), { kind: 'nines', numeral: '999999', at: 6 })
  assert.deepEqual(artefactOf('1000'), { kind: 'power', numeral: '1000', at: 3 })
  assert.deepEqual(artefactOf('142857'), { kind: 'cyclic', numeral: '142857', at: 7 })
  assert.equal(artefactOf('432'), null, '432 is not a function of ten')
  assert.equal(artefactOf('340'), null)
  assert.equal(artefactOf('7'), null)
})

test('artefactOf — 17 is a full reptend prime and its cyclic number is recognised', () => {
  // (10^16 - 1)/17
  assert.deepEqual(artefactOf('588235294117647'), { kind: 'cyclic', numeral: '588235294117647', at: 17 })
})

test('inBase — a power and a repdigit always have an analogue', () => {
  assert.equal(inBase({ kind: 'power', numeral: '1000', at: 3 }, 8), '512')
  assert.equal(inBase({ kind: 'nines', numeral: '999999', at: 6 }, 8), '262143')
  assert.equal(inBase({ kind: 'nines', numeral: '9', at: 1 }, 8), '7', 'casting out nines becomes casting out sevens')
})

// THE DECISIVE CASE: ord_8(7) = 1, so 1/7 in base eight has period one and there IS no cyclic analogue.
test('inBase — a cyclic number has NO analogue where the base is not a primitive root', () => {
  assert.equal(inBase({ kind: 'cyclic', numeral: '142857', at: 7 }, 8), null, 'base 8: 1/7 = 0.111…')
  // computed, not guessed: ord_12(7) = 6, so base twelve HAS a cyclic number, (12^6 - 1)/7 = 426569
  assert.equal(inBase({ kind: 'cyclic', numeral: '142857', at: 7 }, 12), '426569')
  assert.equal(inBase({ kind: 'cyclic', numeral: '142857', at: 7 }, 16), null, 'ord_16(7) = 3, so base 16 has none')
})

// LONGEST FIRST, or rewriting 999999 gets corrupted by an earlier rewrite of the 9 inside it — and the nonsense would
// then fail in the new base for the wrong reason, manufacturing a finding.
test('restate — rewrites the longest numerals first so nested ones are not corrupted', () => {
  const r = restate('142857 * 7 = 999999', 12)
  assert.equal(r.statement, '426569 * 7 = 2985983')
  assert.deepEqual(r.swapped.map((s) => s.from).sort(), ['142857', '999999'])
})

test('restate — an artefact with no analogue is reported ABSENT rather than dropped', () => {
  const r = restate('142857 * 7 = 999999', 8)
  assert.equal(r.absent.length, 1)
  assert.equal(r.absent[0]!.numeral, '142857')
})

// ── the verdicts ────────────────────────────────────────────────────────────────────────────────────────────────

const arithmetic = (s: string): boolean | null => {
  // a deliberately tiny decider for the tests: exact integer arithmetic on `a * b = c` and `a = b`
  const m = /^(\d+) \* (\d+) = (\d+)$/.exec(s.trim())
  if (m) return BigInt(m[1]!) * BigInt(m[2]!) === BigInt(m[3]!)
  const e = /^(\d+) = (\d+)$/.exec(s.trim())
  if (e) return BigInt(e[1]!) === BigInt(e[2]!)
  return null
}

test('baseVerdictOf — 142857 * 7 = 999999 is NOTATIONAL, which is the whole point of the guard', () => {
  const v = baseVerdictOf({ key: 'cyclic_seven', file: 'Song.lean', statement: '142857 * 7 = 999999' }, arithmetic)
  assert.equal(v.verdict, 'notational')
  assert.ok(v.failedIn.length > 0)
  assert.match(v.why, /decimal/)
})

test('baseVerdictOf — a statement with no base-ten artefact is not judged at all', () => {
  const v = baseVerdictOf({ key: 'plain', file: 'x.lean', statement: '16 * 27 = 432' }, arithmetic)
  assert.equal(v.verdict, 'no-artefact')
  assert.deepEqual(v.failedIn, [])
})

// A POWER OF THE BASE SURVIVES, because the claim is about the power and not about ten.
test('baseVerdictOf — a claim true of any base survives the substitution', () => {
  const v = baseVerdictOf({ key: 'power', file: 'x.lean', statement: '10 * 10 = 100' }, arithmetic)
  assert.equal(v.verdict, 'invariant')
})

// UNDECIDED IS NOT SURVIVAL. Reporting an unreadable restatement as invariant is the vacuous pass this tree refuses.
test('baseVerdictOf — an undecidable statement is unread, never invariant', () => {
  const v = baseVerdictOf({ key: 'opaque', file: 'x.lean', statement: 'foldl over 1000 things' }, arithmetic)
  assert.equal(v.verdict, 'unread')
})

test('baseVerdictOf — a sealed statement the evaluator refuses is unread, not notational', () => {
  const v = baseVerdictOf({ key: 'false', file: 'x.lean', statement: '142857 * 7 = 999998' },
    () => false)
  assert.equal(v.verdict, 'unread')
  assert.match(v.why, /cannot decide/)
})

// A ONE-DIGIT ARTEFACT CANNOT CONVICT: 9 is both ten-less-one and the number nine.
test('baseVerdictOf — failing only on a one-digit artefact is SUSPECT, not notational', () => {
  const v = baseVerdictOf({ key: 'nine', file: 'x.lean', statement: '3 * 3 = 9' }, arithmetic)
  assert.equal(v.verdict, 'suspect')
  assert.match(v.why, /ambiguous/)
})

test('baseVerdictOf — a multi-digit artefact still convicts', () => {
  const v = baseVerdictOf({ key: 'nines', file: 'x.lean', statement: '111 * 9 = 999' }, arithmetic)
  assert.equal(v.verdict, 'notational')
  assert.match(v.why, /multi-digit/)
})

test('baseCensus — counts every verdict and names the work list', () => {
  const c = baseCensus([
    baseVerdictOf({ key: 'a', file: 'x', statement: '142857 * 7 = 999999' }, arithmetic),
    baseVerdictOf({ key: 'b', file: 'x', statement: '10 * 10 = 100' }, arithmetic),
    baseVerdictOf({ key: 'c', file: 'x', statement: '16 * 27 = 432' }, arithmetic),
  ])
  assert.equal(c.asked, 3)
  assert.equal(c.notational, 1)
  assert.equal(c.invariant, 1)
  assert.equal(c.noArtefact, 1)
  assert.equal(c.suspect, 0)
  assert.deepEqual(c.notationalKeys, ['a'])
})

test('baseCensus — an empty census reports emptiness, not health', () => {
  const c = baseCensus([])
  assert.equal(c.asked, 0)
  assert.equal(c.notational, 0)
  assert.equal(c.suspect, 0)
  assert.deepEqual(c.notationalKeys, [])
})
