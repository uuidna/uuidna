// develop answers every taught denial in one round (lead 229): the selector returns every match in table order,
// collapses two denials that share a command, and returns nothing for an output it was never taught.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { curesFor } from './develop-cures.js'

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
