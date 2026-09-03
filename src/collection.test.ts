// collection — the schema half VitePress leaves open, and the two properties that make it worth having.
//
// Every test here asserts that the validator CAN FAIL, and fail by name. A schema that only ever passes is the
// same artefact as the uniformity it is supposed to guarantee: correct today, unenforced, and indistinguishable
// from luck. The last two tests are the ones that matter most — the denominator, and the rule that never fired.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  defineCollection, validate, verdictOf, text, optionalText, oneOf, reference,
} from './collection/index.js'

const article = defineCollection('articles', [text('title'), text('description')])
const ok = [{ id: 'a.md', data: { title: 'T', description: 'D' } }]

test('a conforming corpus passes, and the verdict names its denominator', () => {
  const v = validate(article, ok)
  assert.equal(v.gaps.length, 0)
  assert.equal(v.checked, 1)
  assert.match(verdictOf(v), /1 entries carry every required field/)
})

test('A MISSING REQUIRED FIELD IS A NAMED GAP, not a page without a description', () => {
  const v = validate(article, [{ id: 'b.md', data: { title: 'T' } }])
  assert.equal(v.gaps.length, 1)
  assert.match(v.gaps[0]!.what, /b\.md/)
  assert.match(v.gaps[0]!.what, /description/)
  assert.match(v.gaps[0]!.what, /absent/)
  assert.ok(v.gaps[0]!.fix.length > 0, 'every charge carries its cure')
})

test('present-and-empty is a different claim from absent, and only one is a gap for an optional field', () => {
  const c = defineCollection('c', [optionalText('subtitle')])
  assert.equal(validate(c, [{ id: 'x.md', data: {} }]).gaps.length, 0, 'absent is fine')
  assert.equal(validate(c, [{ id: 'x.md', data: { subtitle: '   ' } }]).gaps.length, 1, 'empty is not')
})

test('oneOf names the whole allowed set in the charge, so nobody has to go looking', () => {
  const c = defineCollection('c', [oneOf('kind', ['proof', 'essay'])])
  const v = validate(c, [{ id: 'y.md', data: { kind: 'blog' } }])
  assert.equal(v.gaps.length, 1)
  assert.match(v.gaps[0]!.what, /"blog"/)
  assert.match(v.gaps[0]!.fix, /proof, essay/)
})

test("REFERENCE IS deadkey ARRIVING AT CONTENT — a citation that does not resolve fails", () => {
  const sealed = new Set(['two_coins', 'division_by_zero'])
  const c = defineCollection('c', [reference('cites', sealed)])
  assert.equal(validate(c, [{ id: 'p.md', data: { cites: 'two_coins' } }]).gaps.length, 0)
  assert.equal(validate(c, [{ id: 'p.md', data: { cites: ['two_coins', 'division_by_zero'] } }]).gaps.length, 0)
  const dead = validate(c, [{ id: 'p.md', data: { cites: ['two_coins', 'corroboration_needs_two'] } }])
  assert.equal(dead.gaps.length, 1)
  assert.match(dead.gaps[0]!.what, /corroboration_needs_two/)
  assert.match(dead.gaps[0]!.what, /seals no such key/)
})

test('THE DENOMINATOR — a validator that ran over nothing must not look like a clean corpus', () => {
  const empty = validate(article, [])
  assert.equal(empty.gaps.length, 0, 'no entries, so no gaps — trivially')
  assert.equal(empty.checked, 0, 'and the count says so, which is the only thing separating it from a pass')
  assert.match(verdictOf(empty), /0 entries/)
})

test('AN OPTIONAL RULE NO ENTRY EXERCISES IS REPORTED — a check that never fired is not evidence', () => {
  const sealed = new Set(['two_coins'])
  const c = defineCollection('c', [text('title'), optionalText('subtitle'), reference('cites', sealed)])
  const v = validate(c, [{ id: 'z.md', data: { title: 'T' } }])
  assert.equal(v.gaps.length, 0, 'nothing is wrong')
  assert.deepEqual(v.unexercised.sort(), ['cites', 'subtitle'],
    'and two rules have never once run, which the corpus being clean does not tell you')
  // a required field is never listed: it fails loudly on every entry, so a dead one shows loudly rather than lying dead
  const req = validate(article, [{ id: 'z.md', data: { title: 'T', description: 'D' } }])
  assert.deepEqual(req.unexercised, [])
})
