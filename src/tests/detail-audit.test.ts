// detail-audit — the auditor of every single detail is itself on trial here, and by its own discipline: an
// instrument is only believed because it is shown able to fail. Each verdict route (decided-true, decided-false,
// relevant citation, laundered citation, fabricated citation, bare prose) gets a detail that must land on it —
// a detail landing anywhere else is the finding.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditDetails, auditDetail, splitDetails } from '../detail-audit.js'

test('the controls are pre-registered, run first, and all rejected — the instrument can fail', () => {
  const a = auditDetails('anything at all.')
  assert.equal(a.outcome, 'audited')
  assert.equal(a.controls.length, 7, 'seven controls: digit arithmetic, word arithmetic, power equation, chained sum, laundered citation, fabricated citation, cross-detail composition')
  for (const c of a.controls) assert.equal(c.rejected, true, `control accepted — the instrument cannot discriminate: ${c.control} → ${c.got}`)
})

test('every route gets a detail and every detail lands on its route', () => {
  assert.equal(auditDetail('2 + 2 = 4').verdict, 'VERIFIED_BY_DECIDE', 'true arithmetic decides true')
  assert.equal(auditDetail('2 + 2 = 5').verdict, 'REFUTED', 'false arithmetic is the one thing this can refute')
  const relevant = auditDetail('the reflection has fixed points 0 and 5, proven by theorem dz_fixed_points')
  assert.equal(relevant.verdict, 'VERIFIED', 'a relevant sealed citation verifies')
  assert.deepEqual(relevant.cites, ['dz_fixed_points'])
  const laundered = auditDetail('the moon is made of cheese, proven by theorem two_coins')
  assert.equal(laundered.verdict, 'UNVERIFIED', 'a real citation about a disjoint topic verifies nothing')
  const fabricated = auditDetail('this holds, proven by theorem no_such_theorem_exists_here')
  assert.equal(fabricated.verdict, 'DRAINED', 'a fabricated citation drains')
  assert.deepEqual(fabricated.fabricated, ['no_such_theorem_exists_here'])
  assert.equal(auditDetail('water is wet').verdict, 'UNVERIFIED', 'bare prose is not-yet, never false')
})

test('a document is audited detail by detail, counted without a silent cap, folded to one receipt', () => {
  const text = '2 + 2 = 4. 2 + 2 = 5.\nThe reflection has fixed points 0 and 5, proven by theorem dz_fixed_points.\nWater is wet.'
  const a = auditDetails(text, { title: 'the four routes' })
  assert.equal(a.details, 4)
  assert.equal(a.dropped, 0)
  assert.deepEqual(a.counts, { verified: 2, refuted: 1, unverified: 1, drained: 0 })
  const b = auditDetails(text, { title: 'the four routes' })
  assert.equal(a.receipt, b.receipt, 'the same text and ledger always fold to the same receipt')
  assert.equal(a.address, b.address)
})

test('the split is deterministic, bullet-stripping, and never eats a leading number', () => {
  assert.deepEqual(splitDetails('- 2 + 2 = 4\n• second point'), ['2 + 2 = 4', 'second point'])
  assert.deepEqual(splitDetails('One. Two! Three?'), ['One.', 'Two!', 'Three?'])
  assert.deepEqual(splitDetails(''), [])
})

test('a verdict moved is a receipt moved — altering one detail is visible in the fold', () => {
  const a = auditDetails('2 + 2 = 4.')
  const b = auditDetails('2 + 2 = 5.')
  assert.notEqual(a.receipt, b.receipt)
})

// ── lead 76's two cracks, folded. (a) the word-arithmetic deafness: the Black Whole audit heard 668 details and
// could not refute one, because prose states sums in words. (b) ASR text has no punctuation, so the sentence law
// never fires — the caller now names the boundary explicitly.
test('the tool hears word arithmetic — a false spoken sum is REFUTED, a true one decides', () => {
  const wrong = auditDetail('two and two make five')
  assert.equal(wrong.verdict, 'REFUTED', 'the deafness crack: a spoken falsehood must no longer pass as UNVERIFIED')
  assert.equal(wrong.arithmetic.length, 1)
  assert.equal(wrong.arithmetic[0].actual, 4)
  const right = auditDetail('twenty plus twenty is forty')
  assert.equal(right.verdict, 'VERIFIED_BY_DECIDE')
  assert.match(right.note, /only the decidable slice/, 'the honest scope must ride the verdict')
})

// ── lead 79a, the last remainder: the chained sum. The chain parses WHOLE — each asserted intermediate feeds
// the next step — and emits only at ≥2 steps, so it never collides with the binary extractor's compound guard.
// And the captain's law rides every verdict: REFUTED must prove in ALL dimensions; a false step among true
// ones is a partial refutation, and a partial refutation stays UNVERIFIED.
test('the chained sum parses whole — the film\'s sentence finally decides', () => {
  const film = auditDetail('the edge of the metric 20 plus 20 is 40 plus 24 brought me to 64 tetrahedron')
  assert.equal(film.verdict, 'VERIFIED_BY_DECIDE', 'both steps recompute: 20+20=40, then 40+24=64')
  assert.equal(film.arithmetic.length, 2)
  assert.deepEqual(film.arithmetic.map((f) => f.actual), [40, 64])
  const allFalse = auditDetail('10 plus 10 is 21 plus 5 brought me to 27')
  assert.equal(allFalse.verdict, 'REFUTED', 'every step false (10+10=20≠21, 21+5=26≠27) — refuted in all dimensions')
})

test('the captain\'s bilateral law: both stamps are earned in all dimensions or not at all', () => {
  const mixed = auditDetail('10 plus 10 is 20 plus 5 brought me to 26')
  assert.equal(mixed.verdict, 'UNVERIFIED', 'step one holds (10+10=20), step two fails (20+5=25≠26) — a partial refutation stays UNVERIFIED')
  assert.match(mixed.note, /dimensions disagree/)
  assert.equal(auditDetail('two and two make five').verdict, 'REFUTED', 'a sole false fact IS total — its one dimension refutes')
  const laundered = auditDetail('the moon is cheese and 2 plus 2 is 4, proven by theorem two_coins')
  assert.equal(laundered.verdict, 'UNVERIFIED', 'true arithmetic beside a laundered citation — VERIFIED must lean in all dimensions at once')
  const falseBesideCite = auditDetail('the moon is cheese and 2 plus 2 is 5, proven by theorem two_coins')
  assert.equal(falseBesideCite.verdict, 'UNVERIFIED', 'a false fact beside an unverifying citation is partial — REFUTED must prove in all dimensions')
})

test('a fabricated citation outranks true arithmetic — draining is the gate\'s law', () => {
  const v = auditDetail('two and two make four, proven by theorem detail_audit_no_such_seal')
  assert.equal(v.verdict, 'DRAINED')
})

// ── lead 79's remainder (b): powers-of-ten speech, the Black Whole film's dominant number shape, was entirely
// unhearable. Now: an equation decides, an orders-of-magnitude relation decides, a bare magnitude is RECORDED
// but never verdicted (a value is not a claim), a negative exponent is recorded and refused (not a Nat).
test('the powers-of-ten grammar: equations and orders decide, magnitudes only speak', () => {
  assert.equal(auditDetail('10 to the 3 is 1000').verdict, 'VERIFIED_BY_DECIDE')
  assert.equal(auditDetail('10 to the 3 is 999').verdict, 'REFUTED')
  const orders = auditDetail('10 to the 93 is 38 orders of magnitude larger than 10 to the 55')
  assert.equal(orders.verdict, 'VERIFIED_BY_DECIDE', 'the film\'s own claim shape: |93 − 55| = 38 decides')
  assert.equal(auditDetail('10 to the 93 is 39 orders of magnitude larger than 10 to the 55').verdict, 'REFUTED')
  const bare = auditDetail('the result is 10 to the 93 grams per centimeter cube that is an enormous number')
  assert.equal(bare.verdict, 'UNVERIFIED', 'a magnitude is a VALUE, not a claim — recorded, never verdicted')
  assert.deepEqual(bare.magnitudes, [{ base: 10, exp: 93, negative: false }])
  const neg = auditDetail('the standard proton with the mass of 10 to the minus 24 didn\'t even come close')
  assert.equal(neg.verdict, 'UNVERIFIED')
  assert.deepEqual(neg.magnitudes, [{ base: 10, exp: 24, negative: true }], 'a negative exponent is not a Nat — heard, refused')
})

// ── lead 79's remainder (c): the film's "39 orders of magnitude" sits captions away from its 10⁵⁵/10⁹³
// operands — and 93 − 55 = 38, a refutable claim only cross-detail composition can reach. Exactly two distinct
// same-base exponents in the window = unambiguous; anything else is refused rather than mis-verdicted.
test('cross-detail composition reaches the film\'s distant-operand claim', () => {
  const filmShaped = 'the result is 10 to the 93 grams per centimeter cube\nan enormous number indeed\nthe universe is approximately 10 to the 55th grams\nsqueezed into that cube it is still some 39 orders of magnitude smaller than the vacuum'
  const a = auditDetails(filmShaped)
  assert.equal(a.composed.length, 1)
  assert.equal(a.composed[0].verdict, 'REFUTED', '93 − 55 = 38, the film says 39 — the composition refutes it')
  assert.equal(a.composed[0].actual, 38)
  assert.deepEqual(a.composed[0].operandsAt, [0, 2], 'provenance: which details supplied the operands')
  assert.equal(a.verdicts[3].verdict, 'REFUTED', 'the asserting detail carries the composed verdict')
  assert.equal(a.counts.refuted, 1)
  const trueVersion = auditDetails(filmShaped.replace('39 orders', '38 orders'))
  assert.equal(trueVersion.composed[0].verdict, 'VERIFIED')
  assert.equal(trueVersion.verdicts[3].verdict, 'VERIFIED_BY_DECIDE')
})

test('ambiguous operands are refused, not guessed', () => {
  const three = 'first 10 to the 9\nthen 10 to the 5\nalso 10 to the 3\nthat is 4 orders of magnitude apart'
  const a = auditDetails(three)
  assert.equal(a.composed.length, 0, 'three distinct exponents in the window — ambiguity refuses composition')
  assert.equal(a.verdicts[3].verdict, 'UNVERIFIED')
})

test('an explicit delimiter is the split law for unpunctuated text', () => {
  const asr = auditDetails('what unifies everything|two and two make five|the vacuum is infinitely dense', { delimiter: '|' })
  assert.equal(asr.details, 3)
  assert.deepEqual(asr.counts, { verified: 0, refuted: 1, unverified: 2, drained: 0 })
  assert.equal(splitDetails('a.b|c. d', '|').length, 2, 'an explicit delimiter suppresses the sentence heuristic')
})
