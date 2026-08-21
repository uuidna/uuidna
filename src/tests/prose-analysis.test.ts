// Prose analysis — the honest scope of READ / UNDERSTAND / COMPUTE, as regression tests (was scratchpad prose-test).
// uuidna READS any prose (content-address), COMPUTES the binary integer arithmetic it finds to a by-decide verdict
// (uuidna's TOTAL Nat semantics — it computes even division by zero), UNDERSTANDS by RESONANCE (amplitude-ranked
// reflection onto the sealed math — not meaning), and DRAINS a fabricated theorem citation. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractDecidable, reflects, computes } from '../index.js'

test('COMPUTE — binary arithmetic in prose is settled by decide (VERIFIED / REFUTED)', () => {
  const facts = extractDecidable('and 7 plus 5 equals 12; but 8 times 8 makes 65 in the fabricated version.')
  const byClaim = Object.fromEntries(facts.map((f) => [f.claim.replace(/\s+/g, ' '), f.verdict]))
  assert.equal(byClaim['7 plus 5 equals 12'], 'VERIFIED')
  assert.equal(byClaim['8 times 8 makes 65'], 'REFUTED')
})

test('COMPUTE — the compound guard refuses a fragment (no false REFUTED)', () => {
  // "5 times 5 minus 3 times 8 is 1" is TRUE compound arithmetic (25 − 24 = 1). The binary grammar cannot evaluate it
  // whole, so it must extract NOTHING rather than mis-scope to "3 times 8 is 1" and emit a false REFUTED.
  const facts = extractDecidable('The Fibonacci page: 5 times 5 minus 3 times 8 is 1, Cassini within one unit.')
  assert.equal(facts.some((f) => /3 times 8/.test(f.claim)), false, 'must not mis-scope the compound to a fragment')
})

test('COMPUTE — uuidna computes division with TOTAL Nat semantics, including division by zero', () => {
  const div = (s: string) => extractDecidable(s)[0]
  assert.equal(div('10 divided by 2 is 5').verdict, 'VERIFIED')      // exact
  assert.equal(div('7 divided by 2 is 3').verdict, 'VERIFIED')       // FLOOR division (Lean Nat).5
  assert.equal(div('10 divided by 0 is 0').verdict, 'VERIFIED')      // n / 0 = 0 — uuidna COMPUTES it; a calculator faults
  assert.equal(div('12 / 3 is 4').verdict, 'VERIFIED')              // the / symbol, uuidna semantics
  // the emitted proof is a real by-decide theorem in uuidna's arithmetic
  assert.match(div('10 divided by 0 is 0').lean, /10 \/ 0 = 0 := by decide/)
})

test('UNDERSTAND — resonance ranks by amplitude, so the reflection is legible', () => {
  const r = reflects('The lay of the land remembers the river long after the water has gone.')
  assert.ok(r.peak > 0, 'a non-empty query has a peak resonance')
  // the loudest reflections must be the geography domain the prose rings — NOT the stopword-matched ℤ/9 head that the
  // old first-concept matcher returned for every input.
  assert.ok(r.matches.slice(0, 5).some((m) => /lay of the land/i.test(m.principle)), 'top resonators reflect the query')
  assert.equal(r.matches[0].key === 'mul9_1_1', false, 'the ℤ/9 head is no longer the top for unrelated prose')
})

test('GATE — a fabricated theorem citation DRAINS; honest prose clears', () => {
  const bad = computes('By the theorem faster_than_light_proven, uuidna transmits information instantly.')
  assert.equal(bad.binary, 0)
  assert.equal(bad.hit, 'faster_than_light_proven')
  const ok = computes('The lay of the land remembers the river long after the water has gone.')
  assert.equal(ok.binary, 1)
  assert.equal(ok.hit, null)
})
