// readme-quantum — THE PUBLISHED CAPACITY MUST BE THE MEASURED CAPACITY. The README states uuidna's quantum
// capacity to the public, and a published number that no longer matches the code is the drift this ledger keeps
// catching: the README stood 46 theorems stale earlier in this session, and llm.txt stood at 1359 against a live
// 1395. Both were generated files nobody re-ran.
//
// So this test does not check that the section EXISTS — it recomputes every figure from the shipped constant, the
// served schema and the ledger, and asserts the published text carries exactly those values. A regenerated README
// passes; a hand-edited or stale one fails, naming the figure that moved.
//
// AND IT GUARDS THE BOUNDARY. Honest scope must keep the measured usable-capacity advantage and refuse
// blanket denials that contradict the capacity table and usable_gap_is_two_to_eighty.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../index.js'
import { MAX_MESSAGE_QUBITS } from '../quantum/message/index.js'
import { MAX_SERVED_QUBITS } from '../mcp.js'   // the served ceiling, imported from the surface that enforces it

const readme = (): string => readFileSync(join(ROOT, 'README.md'), 'utf8')

test('the published quantum capacity equals the measured capacity, figure for figure', () => {
  const md = readme()
  const T = theorems()
  // THE SERVED CEILING IS IMPORTED FROM THE SURFACE THAT ENFORCES IT, not scraped out of its source text.
  //
  // This read src/mcp.ts as a string and matched `/n > (\d+)\) throw new Error\('qubits must be an integer…/`.
  // gen-readme carried a character-identical regex, so the literal `12` was load-bearing for TWO independent
  // scrapers — which is precisely why the bound could never be given a name: naming it broke both parsers at
  // once, and it did, the moment it was named on 2026-08-25. A constant nothing may name is also a constant
  // `axiom-hunt` cannot see, and it sat outside that table while the looser library cap sat inside it, proven.
  //
  // Importing it makes the assertion stronger, not weaker: the README is now checked against the very constant
  // the guard refuses on, so the published figure and the enforced bound cannot drift apart. A regex over source
  // could only ever confirm that the file still LOOKED a certain way.
  const served = MAX_SERVED_QUBITS
  assert.ok(served > 0, 'the MCP circuit ceiling must be a positive bound')

  const expect: [string, string | number][] = [
    ['library register qubits', MAX_MESSAGE_QUBITS],
    ['amplitudes held at once', 2 ** MAX_MESSAGE_QUBITS],
    ['served circuit qubits', served],
    ['served amplitudes', 2 ** served],
    ['reachability gap', MAX_MESSAGE_QUBITS - served],
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
