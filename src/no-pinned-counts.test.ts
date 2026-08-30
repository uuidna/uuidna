// THE CONSTANTS-TO-DERIVATIONS SWEEP, LANDED AS ITS OWN GUARD (lead 104; the captain: "see how all constants
// fail the sequence?" → "sweep all constants to derivations and land"). The sweep's census found the test
// layer ALREADY clean — zero ledger-count literals, fourteen files deriving live — so what lands is the law
// that keeps it so: NO test may pin the current ledger count as a literal. The forbidden value is DERIVED
// (theorems().length at run time), so this guard is sequence-proof by construction — the ledger grows and the
// forbidden literal grows with it, forever, with no maintenance. A constant is a bet; a derivation is a
// receipt; this test is the receipt that the tests hold no bets.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems } from './index.js'

test('no test pins the ledger count — the forbidden literal is derived, so this guard rides the sequence', () => {
  const count = String(theorems().length)                      // the one literal no test may carry — computed
  const pinned = new RegExp(String.raw`(?<![0-9])` + count + String.raw`(?![0-9])`)  // ...as a NUMBER, not as digits inside a longer one
  const dir = join(ROOT, 'src', 'tests')
  const offenders: string[] = []
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.ts') || f === 'no-pinned-counts.test.ts') continue
    const src = readFileSync(join(dir, f), 'utf8')
    for (const [i, line] of src.split('\n').entries()) {
      // USE VERSUS MENTION, the fixture arm (re-applied after a wave swept it): a digit-run inside a long hex
      // literal is DATA — an RFC 8439 vector carried the live count by coincidence; a vector is never a pin
      if (/(['"`])[0-9a-f]{24,}\1/.test(line) || /hx\(/.test(line)) continue
      // ...AND THE SAME RULE FOR A DECIMAL DATA ROW. A line that is nothing but numbers and separators is a
      // measurement table, not an assertion: falsifiers-audit.test.ts carries per-wing character counts a
      // hundred values wide, and several of them (2098, 2126, 2142) sit just above where the ledger stands
      // today — so this guard was going to accuse that file within weeks, for holding data it was written to
      // hold. A pin is a count written into a CLAIM; a row of measurements makes no claim about the ledger.
      if (/^[ 0-9,]+$/.test(line)) continue
      // THE SAME ARM, ONE LITERAL-TYPE WIDER — AND THE WORD "COINCIDENCE" ABOVE IS WRONG, WHICH IS THE POINT.
      // The hex arm was added when an RFC 8439 vector was found carrying the live count, and it was recorded as a
      // coincidence. It was not one. This guard derives the forbidden value so that it MOVES, and calls that
      // sequence-proof; but a moving needle swept across a fixed haystack does not avoid collisions, it
      // GUARANTEES them, and then repeats them forever. The corpus holds a fixed multiset of digit-runs; an
      // incrementing count must eventually land inside every one of them.
      //
      // MEASURED rather than argued, over this tree on 2026-08-26: sweeping every candidate count from 1500 to
      // 5000 against the 18,938 test lines that survive the exemptions above, the substring rule fires on 282 of
      // 3,501 values — 8.1%, about one ledger count in twelve. Not a fluke to be patched once per sighting; a
      // recurring false accusation whose ONLY moving part is which innocent file it names that week.
      //
      // On 2026-08-26 it named falsifiers-chessgames.test.ts:108, which asserts the UUID space, two to the 128th.
      // That 39-digit expansion is the corpus's longest numeral and therefore its largest sink: 17 distinct
      // counts land inside it. includes() read four digits out of the middle of a constant that has nothing to do
      // with the ledger and reported a pin. falsifiers-chessgames.test.ts:108
      // asserts the UUID space, two to the 128th, whose 39-digit expansion contains the four digits of the
      // ledger count of that day. includes() is a SUBSTRING test, so it read those digits out of the middle of a
      // constant that has nothing to do with the ledger and reported a pin. It fired for the first time when the
      // count reached that value and would have stopped when the count moved on, landing next on whatever
      // unrelated file happened to contain the new digits. A false positive that MIGRATES with the thing it
      // measures is worse than a fixed one: each landing looks like a fresh finding about a different file, and
      // the file it accuses is innocent.
      //
      // The question was never "do these digits appear on the line", it was "is the count written as a NUMBER
      // here" — an instrument narrower than its own question, which is this tree's most-repeated fault. A pin
      // always writes the count as its own numeral, so digit boundaries answer the real question at no cost in
      // true positives; the two controls below prove both directions.
      //
      // HONEST SCOPE — this HALVES the problem, it does not end it. The same sweep puts the boundary rule at 144
      // of 3,501 counts, 4.1%. What it removes completely is the DIGIT class: a count found inside a longer
      // numeral, which is never a pin under any reading. What remains is a collision of VALUE — a line legitimately
      // writing the number that today happens to equal the ledger count. No textual rule can separate that from a
      // real pin, because the two are the same characters in the same position; only knowing what the number MEANS
      // separates them. So the residue is named here rather than papered over, and a file wrongly accused by it
      // should be exempted by NAME with a reason, never by widening this rule until it detects nothing.
      if (pinned.test(line) && !/theorems\(\)|T\.length|derived|\bcount\b/.test(line))
        offenders.push(`${f}:${i + 1} carries the live ledger count ${count} as a literal — derive it (theorems().length), never pin it`)
    }
  }
  assert.deepEqual(offenders, [], 'a pinned sequence-value fails the sequence — the night of 2026-08-22 proved it seven walks deep')
  // the control that proves the guard can fail: a line that WOULD pin the count is caught by the same regex
  const wouldPin = `assert.equal(all, ${count})`
  assert.ok(pinned.test(wouldPin) && !/theorems\(\)/.test(wouldPin), 'the detector sees a pin when one exists')
  // The second control: the count buried inside a LONGER numeral is not a pin. This is the whole correction
  // above, and without it the guard could quietly regress to a substring test and still look green. Built by
  // construction rather than by quoting the constant that exposed it, so it keeps testing the property after
  // the ledger moves past today digits.
  const buried = `assert.equal(space, 9${count}9n)`
  assert.ok(buried.includes(count), 'the digits really are present — otherwise this control proves nothing')
  assert.ok(!pinned.test(buried), 'digits inside a longer numeral are DATA, not a pinned count')
})
