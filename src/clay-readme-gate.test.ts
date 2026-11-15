// clay-readme-gate — the README carries every Clay theorem verified and linked: each one in the Clay block, linked to
// its own theorem page, sealed in the ledger and kernel-only. The theorems are gen-clay's own selection.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './scripts/api.js'
import { clayGaps } from './scripts/gen-clay.js'

const README = readFileSync(join(ROOT, 'README.md'), 'utf8')

test('every Clay theorem is in the README, linked to its page, sealed and axiom-free', () => {
  assert.deepEqual(clayGaps(README), [])
})

test('CONTROL: a Clay theorem whose link is removed is named by the gate', () => {
  const m = /- \[`([a-z0-9_]+)`\]\(https:\/\/uuidna\.com\/theorem\/\1\)/.exec(README)
  assert.ok(m, 'the README links at least one Clay theorem')
  const unlinked = README.replace(m[0], `- \`${m[1]}\``)
  assert.ok(clayGaps(unlinked).some((g) => g.startsWith(`${m[1]}: in the block but not linked`)))
})
