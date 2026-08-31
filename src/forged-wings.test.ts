// forgedAgainstWings — the witness the integrity checks were missing.
//
// `withDerived` computes address = toUuid(key ":" statement), and treason.ts:39 recomputed exactly that and
// compared it to itself. Four checks rested on that tautology, and a forged entry {key:'totally_made_up_theorem',
// statement:'2 + 2 = 5'} passed all of them — verified by running their expressions. The ledger cannot witness
// itself; the wings can, because a theorem exists only if lean/*.lean declares it and the kernel accepted it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { forgedAgainstWings } from './treason.js'
import { theorems } from './index.js'

// `../lean`, not `../../lean`: this file sits one level under the root as
// src/ and again as dist/ (rootDir src, outDir dist), so two levels up leaves
// the repository. It resolved to /lean, readdirSync threw ENOENT, and all four
// tests that call this failed before reaching an assertion — which reads as
// four broken checks rather than one wrong path. school.ts:87 has it right.
const wings = (): string =>
  readdirSync(new URL('../lean', import.meta.url))
    .filter((f) => f.endsWith('.lean'))
    .map((f) => readFileSync(new URL(`../lean/${f}`, import.meta.url), 'utf8'))
    .join('\n')

test('the real ledger is fully witnessed by the wings', () => {
  assert.deepEqual(forgedAgainstWings(theorems(), wings()), [], 'every sealed theorem must be declared in a wing')
})

// ── THE CASE THAT MOTIVATED THIS. If it ever passes silently again, the check has stopped checking.
test('an invented theorem is caught — the exact entry that passed four other checks', () => {
  const r = forgedAgainstWings([{ key: 'totally_made_up_theorem', statement: '2 + 2 = 5' }], wings())
  assert.deepEqual(r, [{ key: 'totally_made_up_theorem', kind: 'no-wing' }])
})

test('drift on a REAL key is reported separately from invention', () => {
  const real = theorems()[0].key
  assert.deepEqual(forgedAgainstWings([{ key: real, statement: '0 = 1' }], wings()),
    [{ key: real, kind: 'statement-drift' }], 'a changed statement is drift')
})

test('whitespace alone is not drift — the wings and the ledger may format differently', () => {
  const t = theorems()[0]
  assert.deepEqual(forgedAgainstWings([{ key: t.key, statement: `  ${t.statement.replace(/ /g, '  ')}  ` }], wings()), [])
})

test('an empty wing corpus condemns everything rather than passing quietly', () => {
  const r = forgedAgainstWings(theorems().slice(0, 3), '')
  assert.equal(r.length, 3, 'with no witness available, nothing may be treated as witnessed')
  assert.ok(r.every((x) => x.kind === 'no-wing'))
})
