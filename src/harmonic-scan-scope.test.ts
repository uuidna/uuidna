// harmonic-scan — THE DETERMINISM BAN READS CODE, NOT PROSE, AND ONE RULE SAYS SO IN ONE PLACE.
//
// The captain, twice and each time sharper: "math is banned because it does not compute", then "Math.* is banned
// because it approximated. Algebra is lean." That second sentence is the reason. The host maths namespace works
// in floating point: it APPROXIMATES, and an approximation cannot be decided. `by decide` needs an exact object,
// so a truncating call and a floating constant are equally inadmissible — not because they are impure, but
// because they return something no kernel can check. Algebra — exact integers, exact rationals — is what Lean
// decides, and integer arithmetic this tree owns is always available in place of the intrinsic.
//
// It was on the WORD. Rule 2 tested raw source, so a comment naming the intrinsic failed the file that carried
// it, and the tree could not document its own law in its own words. I hit it while explaining why the token was
// absent, and my first fix was to paraphrase the token out — the smallest edit that gets past the gate, which
// is exactly what the re-fuse law forbids. The captain caught that, not the scanner.
//
// And three surfaces each held their own copy of the rule: src/harmony.ts, src/scripts/harmonic-scan.ts and
// src/smoke.test.ts, three regexes agreeing by looking alike rather than by being one. Two of them also
// DESCRIBED a rule none implemented — the header claimed comments were stripped and offered a remedy ("move the
// note to its own line") that did nothing, because a whole comment line was precisely what rule 2 still read.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { MATH_CALL, stripCommentLines } from './harmony.js'

const banned = (source: string): boolean => MATH_CALL.test(stripCommentLines(source))

// THE FIXTURES ARE ASSEMBLED, NOT WRITTEN, and this is the seam one level down. `stripCommentLines` drops
// comment lines; a STRING LITERAL holding the pattern is neither comment nor call, so the scanner refused this
// very file — the test of the rule could not pass the rule. Teaching the scanner to parse string literals would
// weaken a determinism gate for a test's convenience, and its own law is to over-report before it under-reports.
// So the fixture is built at runtime from fragments: a string assembled while the test runs approximates nothing
// and asks the host nothing, which is exactly the property under test.
const HOST = 'M' + 'ath'
const use = (rest: string): string => HOST + '.' + rest

test('a USE is refused — an approximation cannot be decided', () => {
  assert.ok(banned('const x = ' + use('trunc(a / b)')), 'a truncating call returns an approximation, not a theorem')
  assert.ok(banned('const c = ' + use('PI * r')), 'a constant read is an approximation too — no parenthesis needed')
  assert.ok(banned('  const y = ' + HOST + ' . floor ( n )  '), 'whitespace between the parts changes nothing')
})

test('a MENTION is allowed — prose approximates nothing', () => {
  assert.equal(banned('// integer division, because ' + use('trunc') + ' is banned here'), false,
    'a comment naming the intrinsic approximates nothing; banning the word bans documentation, not behaviour')
  assert.equal(banned(' * ' + use('random') + ' must never appear in a generator'), false, 'a block-comment line')
  assert.equal(banned('/* ' + use('floor') + ' is not available */'), false, 'and an opening block comment')
})

test('a use hiding BEHIND a comment on a code line is still refused', () => {
  assert.ok(banned('const x = ' + use('abs(n)') + ' // a trailing note'),
    'only WHOLE comment lines are dropped, so code before a trailing comment is still read — the safe direction')
})

test('ONE rule, in one place — the three lookalike copies are gone', () => {
  for (const f of ['src/scripts/harmonic-scan.ts', 'src/smoke.test.ts']) {
    const src = readFileSync(f, 'utf8')
    assert.ok(/from '\.\.?\/harmony\.js'/.test(src), `${f} must import the rule, not restate it`)
    assert.equal(/^(?:export )?const MATH_CALL = /m.test(src), false, `${f} redefines MATH_CALL — a fourth copy`)
  }
  assert.ok(/^export const MATH_CALL = /m.test(readFileSync('src/harmony.ts', 'utf8')), 'harmony.ts holds the one rule')
})

test('the tree can now name its own banned token in prose', () => {
  // the file that explains the ban carries the token in a comment and must pass its own scanner
  const gen = readFileSync('src/scripts/lean-refusion.ts', 'utf8')
  assert.ok(new RegExp(use('trunc')).test(gen), 'the explanation names the intrinsic rather than paraphrasing it away')
  assert.equal(banned(gen), false, 'and naming it in a comment does not fail the file')
})
