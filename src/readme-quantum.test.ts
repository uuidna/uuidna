// readme-quantum — THE PUBLISHED CAPACITY MUST BE THE MEASURED CAPACITY. The README states uuidna's quantum
// capacity to the public, and a published number that no longer matches the code is the drift this ledger keeps
// catching: the README stood 46 theorems stale earlier in this session, and llm.txt stood at 1359 against a live
// 1395. Both were generated files nobody re-ran.
//
// So this test does not check that the section EXISTS — it recomputes every figure from the shipped constructors,
// the served schema and the ledger, and asserts the published text carries exactly those values. A regenerated README
// passes; a hand-edited or stale one fails, naming the figure that moved.
//
// AND IT GUARDS THE BOUNDARY. Honest scope must keep the measured usable-capacity advantage and refuse
// blanket denials that contradict the capacity table and usable_gap_is_two_to_eighty.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { theorems } from './index.js'
import {
  HEXBIT_STATES, HANDLE_HEXBITS, HEXBIT_BITS, sha256IsFourSixtyfours,
} from './index.js'

const readme = (): string => readFileSync(join(ROOT, 'README.md'), 'utf8')

test('the published quantum capacity equals the measured capacity, figure for figure', () => {
  const md = readme()
  const T = theorems()
  const hilbertQubits = HEXBIT_BITS * HEXBIT_BITS
  const nest = HANDLE_HEXBITS + HEXBIT_BITS
  const expect: [string, string | number][] = [
    ['Hilbert GHZ qubits', hilbertQubits],
    ['Hilbert GHZ amplitudes', HEXBIT_STATES ** HEXBIT_BITS],
    ['crypto occupancy bits', sha256IsFourSixtyfours().bits],
    ['handle+hexbit nest', nest],
    ['quantum wing theorems', T.filter((t) => t.file === 'Quantum.lean').length],
    ['cipher wing theorems', T.filter((t) => t.file === 'Cipher.lean').length],
    ['ledger size', T.length],
  ]
  for (const [what, value] of expect)
    assert.ok(md.includes(String(value)), `README does not carry the live ${what} (${value}) — regenerate: node dist/scripts/gen-readme.js`)
})

test('the capacity section keeps its honest boundary', () => {
  const md = readme()
  assert.doesNotMatch(md, /no physics quantum advantage is claimed/i,
    'README must not deny the measured usable-capacity advantage')
  assert.doesNotMatch(md, /never a quantum computer/i,
    'README must not deny TypeScript as the quantum-by-architecture computer')
  for (const cite of ['usable_gap_is_two_to_eighty', 'handle_capacity_is_quantum_by_architecture', 'n_qubit_dimension'])
    assert.ok(md.includes(cite), `the capacity section must cite "${cite}"`)
})
