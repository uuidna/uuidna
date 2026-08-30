// Hilbert 4×4 is HEXBIT_BITS × HEXBIT_BITS. Cross-crypto occupancy is sha256IsFourSixtyfours (four 64s).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, HEXBIT_BITS, HEXBIT_STATES } from './index.js'
import { sha256IsFourSixtyfours } from './index.js'

test('message_cap_is_four_hexbits seals Hilbert 4×4, not crypto occupancy', () => {
  const t = theorems().find((x) => x.key === 'message_cap_is_four_hexbits')
  assert.ok(t, 'theorem message_cap_is_four_hexbits must be sealed')
  assert.equal(t.file, 'Hexbit.lean')
  const qubits = HEXBIT_BITS * HEXBIT_BITS
  const states = HEXBIT_STATES ** HEXBIT_BITS
  assert.equal(t.statement, `(${HEXBIT_BITS} * ${HEXBIT_BITS} = ${qubits}) ∧ ((${HEXBIT_STATES}:Nat)^${HEXBIT_BITS} = ${states}) ∧ ((2:Nat)^${qubits} = ${states})`)
})

test('sha256_is_four_sixtyfours is the crypto-fused occupancy — four 64s, not four hexbits', () => {
  const t = theorems().find((x) => x.key === 'sha256_is_four_sixtyfours')
  assert.ok(t, 'theorem sha256_is_four_sixtyfours must be sealed')
  const s = sha256IsFourSixtyfours()
  assert.equal(t.statement, `(${s.boards} * ${s.sixtyfours} = ${s.bits}) ∧ (8 * 32 = ${s.bits}) ∧ ((2:Nat) ^ 8 = ${s.bits})`)
})

test('message_qubit_cap_states remains a Quantum consumer mirror of Hilbert 4×4', () => {
  const t = theorems().find((x) => x.key === 'message_qubit_cap_states')
  assert.ok(t, 'theorem message_qubit_cap_states must remain sealed as consumer mirror')
  const m = t.statement.match(/^2\^(\d+) = (\d+)$/)
  assert.ok(m, `theorem statement should be of the form "2^n = 2**n", got: ${t.statement}`)
  const qubits = HEXBIT_BITS * HEXBIT_BITS
  assert.equal(Number(m[1]), qubits)
  assert.equal(2 ** qubits, Number(m[2]))
})
