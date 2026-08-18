// quantum-message — the encoder's tractability cap is a named export (MAX_MESSAGE_QUBITS), not an inline literal,
// and this file is what makes that naming load-bearing: it cross-checks the constant against the sealed theorem
// message_qubit_cap_states' own Lean statement, so a changed cap without a re-sealed theorem is CAUGHT here —
// node --test dist/tests/*.test.js runs inside `npm run audit`, the release gate — not left to drift silently.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems } from '../index.js'
import { MAX_MESSAGE_QUBITS } from '../quantum/message/index.js'

test('MAX_MESSAGE_QUBITS matches the sealed theorem message_qubit_cap_states', () => {
  const t = theorems().find((x) => x.key === 'message_qubit_cap_states')
  assert.ok(t, 'theorem message_qubit_cap_states must be sealed in the ledger')

  const m = t.statement.match(/^2\^(\d+) = (\d+)$/)
  assert.ok(m, `theorem statement should be of the form "2^n = 2**n", got: ${t.statement}`)

  const [, exponent, total] = m
  assert.equal(Number(exponent), MAX_MESSAGE_QUBITS, 'sealed exponent must equal the code cap')
  assert.equal(2 ** MAX_MESSAGE_QUBITS, Number(total), 'sealed total must equal 2^MAX_MESSAGE_QUBITS')
})
