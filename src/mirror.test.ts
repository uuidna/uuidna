import { test } from 'node:test'
import assert from 'node:assert/strict'
import { diamond, involute, involutionFixed } from './diamond.js'
import {
  discoverInvolution, facetsOf, signatureOf, poleOf, axesOf,
  digitCorpus, recoveredDigitPairs, involutionGaps, DIGIT_LEXICON, type Lexicon,
} from './mirror.js'

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const sealedCycles = [...new Set(involute(DIGITS).map(([a, b]) => [a, b].sort((x, y) => x - y).join('↔')))].sort()

// ── THE GENERALISATION. A lexicon of nine magnitudes and one antonym pair — nothing the prose lexicon shares —
// recovers a reflection this tree sealed long before the matcher existed. The corpus states only how far each
// digit sits from each end; the pairing is nowhere in it.
test('discovery recovers the sealed reflection r(d) = 10 − d from an unordered corpus', () => {
  const all = recoveredDigitPairs().map(([a, b]) => `${a}↔${b}`).sort()
  assert.deepEqual([...new Set(all)].sort(), sealedCycles)
  // each 2-cycle is witnessed TWICE — once from each magnitude that names it — and the centre once, because
  // its two facts are the same digit. 4×2 + 1 = 9 is a property of the corpus, not a duplicate to swallow.
  assert.equal(all.length, 9)
  assert.equal(all.filter((c) => c === '5↔5').length, 1)
})

test('the unique fixed point 5 is RECOVERED, not assumed — a cross-side matcher reports it as a self-naming pair', () => {
  const centre = recoveredDigitPairs().filter(([a, b]) => a === b).map(([a]) => a)
  assert.deepEqual(centre, involutionFixed(DIGITS))
  assert.deepEqual(centre, [5])
  assert.equal(diamond(5), 5)
})

// ── CONTROL 1: the result is a function of the FACTS, not of their order. This is the whole difference between
// discovering a symmetry and confirming an arrangement.
test('permuting the corpus does not move the pairing', () => {
  const base = recoveredDigitPairs(digitCorpus())
  const rows = digitCorpus()
  const orders = [
    [...rows].reverse(),
    [...rows].sort((a, b) => a.text.localeCompare(b.text)),
    [...rows].sort((a, b) => a.text.length - b.text.length || b.digit - a.digit),
    [...rows.slice(7), ...rows.slice(0, 7)],
  ]
  for (const o of orders) assert.deepEqual(recoveredDigitPairs(o), base)
})

// ── CONTROL 2: it can FAIL. Skew one fact and the recovery must break rather than quietly re-pair.
test('a single skewed fact is DETECTED as a lost witness — the instrument is not green by construction', () => {
  // The skew does not erase a pair, because each 2-cycle is witnessed from both of its magnitudes. It erases a
  // WITNESS, and that is the signal: redundancy is what lets the instrument report degradation instead of
  // either shrugging or collapsing. An assertion that the pair vanishes would have been wrong about the corpus.
  const witnesses = (rows = digitCorpus()) => recoveredDigitPairs(rows).map(([a, b]) => `${a}↔${b}`)
  const intact = witnesses()
  const skewed = witnesses(digitCorpus({ digit: 3, by: 1 }))
  assert.equal(intact.length, 9)
  assert.ok(skewed.length < intact.length, `corruption must cost witnesses (${skewed.length} vs ${intact.length})`)
  const twice = (ws: string[]) => [...new Set(ws)].filter((c) => c !== '5↔5').every((c) => ws.filter((w) => w === c).length === 2)
  assert.equal(twice(intact), true, 'intact: every 2-cycle doubly witnessed')
  assert.equal(twice(skewed), false, 'skewed: at least one 2-cycle left standing on a single witness')
})

// ── the three defects found while building it, each held by the case that found it
test('negation binds to the ADJACENT token and no further', () => {
  const lex: Lexicon = { axes: ['door'], poles: [['writes', 'reads'], ['generates', 'authors']] }
  // defect 1 — "writes nothing" is not "writes"
  assert.equal(poleOf('the door writes files into your tree', lex)?.side, 0)
  assert.equal(poleOf('the door writes nothing to your tree', lex)?.side, 1)
  // defect 2 — a negator three words out negates something else, and inverting on it falsifies a true sentence
  const far = poleOf('the artifact generates from Lean, no hand-written file survives', lex)
  assert.equal(far?.side, 0, 'the "no" negates the file, not the verb')
  assert.equal(far?.negated, false)
})

test('a tie at maximum axis overlap is refused, never resolved by sort order', () => {
  const lex: Lexicon = { axes: ['code', 'consumer'], poles: [['gives', 'keeps']] }
  const facets = facetsOf([
    { side: 'a', text: 'a gives the code' },
    { side: 'b', text: 'b keeps the code' },
    { side: 'b', text: 'b keeps the code as well' },
  ], lex)
  const d = discoverInvolution(facets)
  assert.equal(d.pairs.length, 0)
  assert.match(d.orphans.map((o) => o.why).join(' '), /ambiguous/)
})

test('the recovered map is self-inverse, and its coverage is reported rather than assumed', () => {
  const d = discoverInvolution(facetsOf(digitCorpus().map((r) => ({ side: r.side, text: r.text })), DIGIT_LEXICON))
  assert.equal(d.selfInverse, true)
  assert.equal(d.covered, 18, 'every digit fact is placed')
  assert.equal(d.orphans.length, 0)
})

// ── the limit, asserted so nobody reads a zero as an answer
test('a cross-side matcher CANNOT self-match, so agreements — not pairs — carry the fixed points', () => {
  const lex: Lexicon = { axes: ['artifact'], poles: [['generates', 'authors']] }
  const d = discoverInvolution(facetsOf([
    { side: 'x', text: 'the x artifact generates from its registry' },
    { side: 'y', text: 'the y artifact generates from its kernel' },
  ], lex))
  assert.equal(d.pairs.length, 0, 'same pole is not an opposition')
  assert.equal(d.agreements.length, 1, 'same pole across sides is a candidate fixed point')
})

test('signatureOf is order-free, so two instruments can be compared at all', () => {
  const lex: Lexicon = { axes: ['code'], poles: [['gives', 'keeps']] }
  const fs = facetsOf([{ side: 'a', text: 'a gives the code' }, { side: 'b', text: 'b keeps the code' }], lex)
  assert.equal(signatureOf(discoverInvolution(fs).pairs), signatureOf(discoverInvolution([...fs].reverse()).pairs))
})

test('axesOf reports every axis a text touches — overlap is what breaks ties', () => {
  assert.deepEqual(axesOf('three above zero', DIGIT_LEXICON), ['three'])
})

// ── the finder itself
test('involutionGaps — the two instruments agree on this tree', () => {
  assert.deepEqual(involutionGaps(), [])
})
