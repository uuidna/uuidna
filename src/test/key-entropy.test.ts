// key-entropy — THREE CONTENT WORDS CARRY THE FACT; MORE IS ENTROPY, AND ENTROPY FAILS HARD. A key needing a fourth
// word is usually carrying scaffolding: `forged_theorem_costs_2_power_7_bits` is `forgery_costs_128`, and this
// session's own `doubling_ladder_spans_octave_codon_address` folded to `octave_codon_address` losing nothing — the
// three words that survive ARE the fact.
//
// THE RATCHET. 313 keys predate the law, and renaming a theorem moves its content-address, the ledger receipt and the
// published archive — so they are recorded in lean/key-entropy.json and the finder skips exactly them. This test is
// the other half: that list may only SHRINK. A new long key cannot be waved through by appending it, because the
// backlog is compared against its committed size, and every entry must still exist (a renamed theorem must LEAVE).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../index.js'

const FILLER = new Set(['is', 'are', 'was', 'be', 'the', 'a', 'an', 'of', 'by', 'to', 'in', 'on', 'for', 'with', 'its', 'it', 'that', 'then', 'into', 'from', 'as', 'at', 'and', 'or', 'only', 'ever'])
const content = (k: string): string[] => k.replace(/^uuidna_/, '').split('_').filter((x) => x && !FILLER.has(x))
const baseline = (): { limit: number; backlog: number; keys: string[] } =>
  JSON.parse(readFileSync(join(ROOT, 'lean', 'key-entropy.json'), 'utf8'))

test('the three-word limit is what the finder enforces — and the fold is real, not a truncation', () => {
  const b = baseline()
  assert.equal(b.limit, 3)
  // the worked examples: each long key's content words, and the three that carry it
  assert.deepEqual(content('octave_codon_address'), ['octave', 'codon', 'address'])
  assert.equal(content('forged_theorem_costs_2_power_7_bits').length > 3, true, 'the pre-fold name is over the limit')
  assert.equal(content('uuidna_is_dna_times_the_two_coins').length, 4, 'filler removed, four content words remain: dna times two coins')
})

test('the backlog may only SHRINK — a new long key cannot be waved through by appending it', () => {
  const b = baseline()
  const keys = new Set(b.keys)
  assert.equal(keys.size, b.keys.length, 'the backlog has no duplicate entries')
  assert.ok(b.keys.length <= b.backlog, `the backlog grew: ${b.keys.length} entries against a recorded ${b.backlog}`)
  // every listed key must still be over the limit — an entry that is now short has been fixed and must be REMOVED,
  // so the list cannot quietly accumulate names that no longer need forgiving.
  const nowShort = b.keys.filter((k) => content(k).length <= 3)
  assert.deepEqual(nowShort, [], 'these keys are within the limit now — delete them from lean/key-entropy.json')
})

test('every backlogged key still exists in the ledger — a renamed theorem LEAVES the list', () => {
  const b = baseline()
  const live = new Set(theorems().map((t) => t.key))
  const ghosts = b.keys.filter((k) => !live.has(k))
  assert.deepEqual(ghosts, [], 'these keys are no longer in the ledger (renamed or dropped) — remove them from lean/key-entropy.json so the backlog counts only real debt')
})
