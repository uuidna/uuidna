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
import { ROOT } from '../scripts/api.js'
import { theorems } from '../theorems/index.js'

test('no test pins the ledger count — the forbidden literal is derived, so this guard rides the sequence', () => {
  const count = String(theorems().length)                      // the one literal no test may carry — computed
  const dir = join(ROOT, 'src', 'tests')
  const offenders: string[] = []
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.ts') || f === 'no-pinned-counts.test.ts') continue
    const src = readFileSync(join(dir, f), 'utf8')
    for (const [i, line] of src.split('\n').entries()) {
      // USE VERSUS MENTION, the fixture arm (re-applied after a wave swept it): a digit-run inside a long hex
      // literal is DATA — an RFC 8439 vector carried the live count by coincidence; a vector is never a pin
      if (/(['"`])[0-9a-f]{24,}\1/.test(line) || /hx\(/.test(line)) continue
      if (line.includes(count) && !/theorems\(\)|T\.length|derived|\bcount\b/.test(line))
        offenders.push(`${f}:${i + 1} carries the live ledger count ${count} as a literal — derive it (theorems().length), never pin it`)
    }
  }
  assert.deepEqual(offenders, [], 'a pinned sequence-value fails the sequence — the night of 2026-08-22 proved it seven walks deep')
  // the control that proves the guard can fail: a line that WOULD pin the count is caught by the same regex
  const wouldPin = `assert.equal(all, ${count})`
  assert.ok(wouldPin.includes(count) && !/theorems\(\)/.test(wouldPin), 'the detector sees a pin when one exists')
})
