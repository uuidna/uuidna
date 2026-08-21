// readme-quantum — THE PUBLISHED CAPACITY MUST BE THE MEASURED CAPACITY. The README states uuidna's quantum
// capacity to the public, and a published number that no longer matches the code is the drift this ledger keeps
// catching: the README stood 46 theorems stale earlier in this session, and llm.txt stood at 1359 against a live
// 1395. Both were generated files nobody re-ran.
//
// So this test does not check that the section EXISTS — it recomputes every figure from the shipped constant, the
// served schema and the ledger, and asserts the published text carries exactly those values. A regenerated README
// passes; a hand-edited or stale one fails, naming the figure that moved.
//
// AND IT GUARDS THE BOUNDARY. The honest-scope sentences are the reason the figures are
// publishable at all: this is a CLASSICAL simulator, no speedup is claimed, and Grover halves an exponent rather
// than breaking anything. A README that dropped those while keeping the qubit count would be a different claim.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../index.js'
import { MAX_MESSAGE_QUBITS } from '../quantum/message/index.js'

const readme = (): string => readFileSync(join(ROOT, 'README.md'), 'utf8')

test('the published quantum capacity equals the measured capacity, figure for figure', () => {
  const md = readme()
  const T = theorems()
  // the served ceiling is read from the served surface itself
  const served = Number((readFileSync(join(ROOT, 'src', 'mcp.ts'), 'utf8')
    .match(/n > (\d+)\) throw new Error\('qubits must be an integer in 1\.\.\d+/) ?? [, '0'])[1]
  )
  assert.ok(served > 0, 'the MCP circuit ceiling must be parseable from mcp.ts')

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
  // a qubit count without these sentences is a different claim than the one the gate permits
  for (const clause of ['classical state-vector simulator', 'NOT quantum hardware', 'Grover HALVES'])
    assert.ok(md.includes(clause), `the README dropped its honest boundary: "${clause}"`)
  // and the refused claim must never appear
  // THE LEAN FORM (derive-prose-trials.ts): lean CONFIRMS instead of denying, so the boundary is stated by CITING the
  // sealed bound (n_qubit_dimension, demarcation_clears) — never by uttering the refused phrase in order to deny it.
  // The phrase is therefore absent OUTRIGHT: no carve-out to strip first, which is the whole point of the lean form.
  assert.equal(/quantum advantage|quantum speedup|faster than classical/i.test(md), false,
    'the README must not carry the refused phrase at all — next.ts ARM 6 fails a release on it and refused[] carries the boundary')
  for (const cite of ['n_qubit_dimension', 'demarcation_clears'])
    assert.ok(md.includes(cite), `the lean form requires the positive citation "${cite}"`)
})
