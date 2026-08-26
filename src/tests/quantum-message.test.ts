// Cap IS hexbit MESSAGE_CAP_* — court seals message_cap_is_four_hexbits (Hexbit.lean).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems } from '../index.js'
import { MESSAGE_CAP_QUBITS, MESSAGE_CAP_STATES } from '../hexbit/index.js'
import { MAX_MESSAGE_QUBITS, MAX_MESSAGE_STATES } from '../quantum/message/index.js'

test('MAX_MESSAGE_* is hexbit MESSAGE_CAP_* — message consumes, does not own the court seal', () => {
  assert.equal(MAX_MESSAGE_QUBITS, MESSAGE_CAP_QUBITS)
  assert.equal(MAX_MESSAGE_STATES, MESSAGE_CAP_STATES)
})

test('message_cap_is_four_hexbits is the court seal on Hexbit.lean', () => {
  const t = theorems().find((x) => x.key === 'message_cap_is_four_hexbits')
  assert.ok(t, 'theorem message_cap_is_four_hexbits must be sealed')
  assert.equal(t.file, 'Hexbit.lean')
  assert.equal(MESSAGE_CAP_QUBITS, 16)
  assert.equal(MESSAGE_CAP_STATES, 65536)
})

test('message_qubit_cap_states remains a Quantum consumer mirror of the same ceiling', () => {
  const t = theorems().find((x) => x.key === 'message_qubit_cap_states')
  assert.ok(t, 'theorem message_qubit_cap_states must remain sealed as consumer mirror')
  const m = t.statement.match(/^2\^(\d+) = (\d+)$/)
  assert.ok(m, `theorem statement should be of the form "2^n = 2**n", got: ${t.statement}`)
  assert.equal(Number(m[1]), MAX_MESSAGE_QUBITS)
  assert.equal(2 ** MAX_MESSAGE_QUBITS, Number(m[2]))
})
