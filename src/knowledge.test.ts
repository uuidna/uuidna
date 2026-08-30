// knowledge — the merge, and the three ways it is allowed to be wrong.
//
// The tests that matter are the ones that stop this module claiming more than it measured: that absence stays
// OPEN rather than becoming a discovery, that the denominator is the text's own offer rather than the caller's
// cap, and that the computational merge can COME OUT FALSE. A merge that always succeeds has measured nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { merge, computeMerge, measureText } from './knowledge/index.js'

const EDITION = { source: 'test', licence: 'public-domain', retrieved: '2026-08-25' }
const STATES_A_SEALED_FACT = 'And the LORD said, one hundred and ten minus one hundred and eight is two.'
const STATES_A_FALSEHOOD = 'It is written that two and two make five.'

test('a book fact the ledger seals is VERIFIED, and carries the lines that crossed', () => {
  const m = merge(STATES_A_SEALED_FACT, EDITION)
  assert.equal(m.examined, 1)
  assert.equal(m.verified, 1)
  const k = m.known[0]!
  assert.equal(k.standing, 'verified')
  assert.ok(k.theorem, 'the sealed key it met is named')
  assert.ok(k.harmony && k.harmony.crossed >= 2, 'and two independent lines had to cross')
})

test('a book fact the kernel decides FALSE is REFUTED — with a witness', () => {
  const m = merge(STATES_A_FALSEHOOD, EDITION)
  assert.equal(m.refuted, 1)
  assert.equal(m.known[0]!.standing, 'refuted')
})

test('ABSENCE STAYS OPEN — `novel` is a discovery claim from a negative search', () => {
  // a true arithmetic fact that no sealed statement contains: the old status called this NOVEL
  const m = merge('The chronicler recorded that seven hundred and seventy seven plus one is seven hundred and seventy eight.', EDITION)
  for (const k of m.known) {
    assert.notEqual(k.standing, 'verified')
    if (!k.theorem) {
      assert.equal(k.standing, 'open', 'not finding prior art in ONE ledger is not discovering that none exists')
      assert.match(k.why, /OPEN, not novel/)
    }
  }
})

test('THE DENOMINATOR IS THE TEXT’S OFFER, not the caller’s cap', () => {
  const three = [STATES_A_SEALED_FACT, STATES_A_FALSEHOOD, 'And two times sixty four is one hundred and twenty eight.'].join('\n')
  const capped = merge(three, EDITION, 1)
  assert.equal(capped.examined, 1, 'the cap limits what was examined')
  assert.ok(capped.of >= 3, 'and `of` still reports what the text offered — a truncated search cannot read as thorough')
  assert.notEqual(capped.examined, capped.of)
})

test('provenance is carried, never assumed — bytes cannot testify to their own source', () => {
  assert.equal(merge(STATES_A_SEALED_FACT).provenanced, false)
  assert.equal(merge(STATES_A_SEALED_FACT, EDITION).provenanced, true)
})

test('THE COMPUTATIONAL MERGE CAN COME OUT FALSE — most instantiations do not hold', () => {
  const m = computeMerge('The quick brown fox jumps over the lazy dog.\nAnd again, twice over.', 9)
  assert.ok(m.tried > 0, 'something was tried')
  assert.ok(m.held < m.tried, 'and not everything held — a merge that always succeeds has measured nothing')
  assert.ok(m.instances.some((i) => !i.holds), 'the failing instantiations are kept, not filtered away')
})

test('HOLDING IS NOT DISCOVERY — the chance bar rides beside the count', () => {
  const m = computeMerge('Some text with several words and a few sentences. Here is another one.', 9)
  // over N instantiations of a mod-9 relation, roughly N/9 hold by arithmetic alone
  assert.equal(m.expectedByChance, (m.tried - (m.tried % 9)) / 9)
  assert.ok(m.expectedByChance > 0, 'the bar is stated, so a reader can see whether anything cleared it')
})

test('THE LIMIT OF THE MERGE: it moves with a MEASURE, and is blind to edits that preserve all six', () => {
  // I claimed "change a word and the knowledge moves". That is FALSE in general and this test is why it is
  // stated as a limit now. `the` → `teh` preserves chars, words, sentences, distinct, vowels and lines, so the
  // merge cannot see it at all. It is a six-integer fingerprint, NOT a content address — toUuid(text) is that.
  const a = computeMerge('the quick brown fox', 9)
  const b = computeMerge('teh quick brown fox', 9)
  assert.equal(a.address, b.address, 'blind to any edit preserving all six measures — the documented limit')

  // it does move when a measure moves, which is the property it actually has
  const c = computeMerge('the quick brown foxes', 9)   // chars and distinct differ
  assert.notEqual(a.address, c.address)
})

test('measureText counts the text itself, and every count is falsifiable', () => {
  const m = measureText('One two. Three four five.')
  const by = Object.fromEntries(m.map((x) => [x.name, x.value]))
  assert.equal(by.sentences, 2)
  assert.equal(by.words, 5)
  assert.ok(by.chars > 0 && by.distinct === 5)
})
