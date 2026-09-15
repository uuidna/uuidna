// develop answers every taught denial in one round (lead 229): the selector returns every match in table order,
// collapses two denials that share a command, and returns nothing for an output it was never taught. The real table
// is held too: each cure taught on 2026-09-15 fires on the objection that stopped a landing, and not on its near miss.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { curesFor, verdictOf, generatorsOf, barePages, regenerateBarePages, denialLines, CURES } from './develop-cures.js'

const table = [
  { name: 'specific', when: /stamped ledger slot/, cmd: 'node dist/scripts/stamp.js', because: 'a' },
  { name: 'witness', when: /"messaging_total":false/, cmd: 'node dist/scripts/one-receipt.js messaging', because: 'b' },
  { name: 'axioms', when: /AXIOM WITNESS|kernel-only-witness-shipped/, cmd: 'npm run axioms', because: 'c' },
  { name: 'axioms-alias', when: /kernel-only-witness-shipped/, cmd: 'npm run axioms', because: 'd' },
]

test('every denial the output carries is answered, in table order, once per distinct command', () => {
  const out = 'kernel-only-witness-shipped\n"messaging_total":false\ndocs/x.md carries stamped ledger slot(s)\n'
  assert.deepEqual(curesFor(out, table).map((c) => c.name), ['specific', 'witness', 'axioms'])
})

test('one denial is one cure, and an untaught output is an empty answer (the honest end of a round)', () => {
  assert.deepEqual(curesFor('carries stamped ledger slot(s)', table).map((c) => c.name), ['specific'])
  assert.deepEqual(curesFor('something nobody taught', table), [])
})

test('CONTROL — a signature is a denial, never a word: a green receipt line must not summon a cure', () => {
  const anchored = [{ name: 'package surface drift', when: /(?:✗|GAP)[^\n]*(?:packages? (?:receipt|surface)|gen:packages)/, cmd: 'node dist/scripts/gen-packages.js', because: 'e' }]
  assert.deepEqual(curesFor('gen-packages — 6 packages computed from the one surface; packages receipt c047c416', anchored), [])
  assert.equal(curesFor('✗ gen-packages — packages surface drifted from src/index.ts', anchored).length, 1)
})

// ── spin --verify: the drift names its files and their moved JSON fields. audit-citations.json keys every entry
// `fabricated`, so the field line carried NO_CURE's honesty word and the landing stopped before the re-derive ran.
const SPIN = [
  '✗ spin --verify — NON-QUANTUM DRIFT: 2 derived file(s) moved since the last seal (receipt 1a2b ≠ sealed 3c4d):',
  '    audit-citations.json: coin aaaa → bbbb',
  '      differs from HEAD at: entries[3].fabricated, entries[7].fabricated',
  '    support-audit.json: coin cccc → dddd',
  '  Fix: npm run reconcile -- --derive-only   (re-derive from the ledger + re-seal, publishes NOTHING)',
  '       or restore the file. Spin hard-rejects drift.',
].join('\n')

test('spin drift is cured by the re-derive, re-asked at once, and by that cure alone', () => {
  const v = verdictOf(SPIN)
  assert.equal(v.kind, 'cures', 'a quoted field named `fabricated` is evidence, not an honesty refusal')
  if (v.kind !== 'cures') return
  assert.deepEqual(v.cures.map((c) => c.name), ['derived layer drift (spin)'],
    'the filename cures the drift names (support-audit.json) would rewrite a file after the seal; the re-derive already wrote it')
  assert.equal(v.cures[0]!.cmd, 'node dist/scripts/reconcile.js --derive-only && node dist/scripts/spin.js --verify')
})

test('NEAR MISS — spin with no manifest is not drift, and an honesty refusal on a denial line still stops for a human', () => {
  assert.equal(verdictOf('✗ spin --verify — no spin-manifest.json; run `node dist/scripts/spin.js --seal` first').kind, 'untaught')
  const honest = verdictOf('✗ one-receipt citations — 1 gap(s)\n    GAP docs/x.md cites `theorem nope`, which is not sealed in the ledger — a fabricated citation\n    support-audit.json')
  assert.equal(honest.kind, 'blocked', 'the honesty word on a GAP line is a verdict, and no cure may answer it')
  assert.equal(denialLines('no markers here\nfabricated'), 'no markers here\nfabricated', 'an unmarked output is read whole')
})

// ── a bare negation on a GENERATED page: the page's writer is read from RECONCILE_OUTPUTS, never a hand list.
const negation = (page: string): string => `✗ negation — 1 gap(s)\n    GAP ${page}: the boundary "not a proof" is stated bare — no sealed theorem within reach\n    FIX name the proof`

test('a generated page\'s bare negation re-runs its declared generator, then asks the negation finder again', () => {
  assert.deepEqual(generatorsOf('docs/mcp.md'), ['gen-mcp'])
  assert.deepEqual(generatorsOf('docs/articles/audit.md'), ['gen-articles'], 'a directory output owns the pages beneath it')
  const v = verdictOf(negation('docs/leads.md') + '\n' + negation('docs/mcp.md').split('\n')[1])
  assert.equal(v.kind, 'cures')
  if (v.kind !== 'cures') return
  const cure = v.cures.find((c) => c.name === 'generated page states a boundary bare')
  assert.equal(cure?.cmd, 'node dist/scripts/gen-leads.js && node dist/scripts/gen-mcp.js && node dist/scripts/one-receipt.js negation')
})

test('NEAR MISS — a hand-written page\'s bare negation has no cure, and stops for its author', () => {
  assert.deepEqual(generatorsOf('docs/doctrine.md'), [], 'stamp fills slots on a hand-written page; it is no reconcile generator of it')
  assert.equal(regenerateBarePages(negation('docs/doctrine.md')), null)
  assert.equal(verdictOf(negation('docs/doctrine.md')).kind, 'untaught')
  // one hand-written page among generated ones keeps the whole objection the author's
  assert.equal(regenerateBarePages(negation('docs/leads.md') + '\n' + negation('docs/doctrine.md')), null)
  assert.deepEqual(barePages('GAP docs/x.md: the boundary is stated bare'), [], 'the quoted boundary is part of the signature')
})

// ── the court record: two spellings of one stale seal, and the absent record is a different state.
test('a stale court record is recomputed under either spelling; an absent one is not this cure', () => {
  const guard = '    GAP lean/refusal-trials.json is not what the court computes now (seal 1234567890abc… ≠ abcdef1234567…) — edited by hand, or stale against its inputs'
  const gate = '✗ leads — the trial record is not what the court computes now (stale, or edited) — run `npm run x -- trial-refusals`'
  for (const out of [guard, gate]) {
    const v = verdictOf(out)
    assert.equal(v.kind, 'cures', out.slice(0, 60))
    if (v.kind === 'cures') assert.deepEqual(v.cures.map((c) => c.cmd), ['node dist/scripts/trial-refusals.js'])
  }
  assert.equal(verdictOf('✗ leads — lean/refusal-trials.json is absent — no lead has been tried, so every lead is open').kind, 'untaught')
})

test('CONTROL — the real table carries each signature once, and no row is summoned by an empty output', () => {
  const names = CURES.map((c) => c.name)
  assert.equal(new Set(names).size, names.length)
  assert.equal(verdictOf('').kind, 'cures', 'the measurement row is the one row an empty output names')
})
