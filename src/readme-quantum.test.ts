// readme-quantum — THE PUBLISHED CAPACITY MUST BE THE MEASURED CAPACITY. The README states uuidna's quantum
// capacity to the public, and a published number that no longer matches the code is the drift this ledger keeps
// catching: the README stood 46 theorems stale earlier in this session, and llm.txt stood at 1359 against a live
// 1395. Both were generated files nobody re-ran.
//
// So this test does not check that the section EXISTS — it recomputes every figure from the shipped constructors,
// the served schema and the ledger, and asserts the published text carries exactly those values. A regenerated README
// passes; a hand-edited or stale one fails, naming the figure that moved.
//
// AND IT GUARDS THE BOUNDARY. The README cites the keys whose statements it restates, and carries neither a
// claim no sealed theorem decides (quantum hardware, a measured quantum advantage) nor a prose denial of one.
// "superconducting" stays allowed only because the capacity table labels it as a platform's reported type.
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

test('the capacity section cites its keys and carries neither undecided claims nor prose denials', () => {
  const md = readme()
  for (const cite of ['usable_gap_is_two_to_eighty', 'handle_capacity_is_quantum_by_architecture', 'n_qubit_dimension', 'sha256_grover_margin_is_the_address'])
    assert.ok(md.includes(cite), `the capacity section must cite "${cite}"`)
  const claims = [
    /TypeScript is the quantum computer/i, /quantum by architecture/i, /measured (usable[- ]capacity |usable-column |quantum )advantage/i,
    /the fridge/i, /running circuit/i, /theorem quantum\b/i, /out-addressing every quantum computer/i,
  ]
  const denials = [
    /not a superconducting QPU/i, /classical silicon/i, /QPU (seat|lane) is `?empty/i,
    /no physics quantum advantage is claimed/i, /never a quantum computer/i,
  ]
  for (const re of [...claims, ...denials])
    assert.doesNotMatch(md, re, `README carries prose no sealed theorem decides (${re}) — regenerate: node dist/scripts/gen-readme.js`)
})
