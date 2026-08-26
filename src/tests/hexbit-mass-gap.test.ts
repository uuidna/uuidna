// hexbit mass gap + message cap — COMPUTED unit first; Lean seals what the computation yields.
// Court and gates cite hexbit_ring_mass_gap / message_cap_is_four_hexbits — never a Quantum twin.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  HEXBIT_BITS, HEXBIT_STATES, MESSAGE_CAP_HEXBITS, MESSAGE_CAP_QUBITS, MESSAGE_CAP_STATES,
  computeMassGap, massGap, hexbitRingMassGap, bornFieldMassGap, qubitsToHexbits,
} from '../hexbit/index.js'
import { bellBornWeights, massGapOnBellBornField } from '../quantum/index.js'
import { MAX_MESSAGE_QUBITS, MAX_MESSAGE_STATES } from '../quantum/message/index.js'
import { theorems } from '../index.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid } from '../address.js'

test('HEXBIT_STATES is the doubling of HEXBIT_BITS — the ring the mass gap walks', () => {
  let s = 1
  for (let i = 0; i < HEXBIT_BITS; i++) s = s * 2
  assert.equal(HEXBIT_STATES, s)
})

test('message cap is four hexbits of Hilbert index — derived, not a magic 16', () => {
  assert.equal(MESSAGE_CAP_QUBITS, MESSAGE_CAP_HEXBITS * HEXBIT_BITS)
  assert.equal(MESSAGE_CAP_STATES, HEXBIT_STATES ** MESSAGE_CAP_HEXBITS)
  assert.equal(MESSAGE_CAP_STATES, 2 ** MESSAGE_CAP_QUBITS)
  assert.equal(qubitsToHexbits(MESSAGE_CAP_QUBITS), MESSAGE_CAP_HEXBITS)
  assert.equal(MAX_MESSAGE_QUBITS, MESSAGE_CAP_QUBITS)
  assert.equal(MAX_MESSAGE_STATES, MESSAGE_CAP_STATES)
})

test('computeMassGap derives Δ from the field — no hardcoded delta argument', () => {
  const g = computeMassGap([0, 1, 2, 3])
  assert.equal(g.delta, 1)
  assert.equal(g.vacuum, true)
  assert.equal(g.excitation, true)
  assert.equal(g.holds, true)
  assert.equal(computeMassGap([0, 0, 0, 0]).holds, false, 'excitation required')
  assert.equal(computeMassGap([2, 2, 2, 2]).holds, false, 'vacuum required')
  assert.equal(computeMassGap([0, 2, 4]).delta, 2, 'Δ is the least positive weight')
})

test('hexbitRingMassGap / massGap walk the ring and compute Δ', () => {
  const g = hexbitRingMassGap()
  assert.equal(massGap().delta, g.delta)
  assert.equal(g.states, HEXBIT_STATES)
  assert.equal(g.field.length, HEXBIT_STATES)
  assert.equal(g.holds, true)
  assert.equal(g.delta, computeMassGap(g.field).delta)
  // Δ is least positive level on 0..states−1 — computed, not assigned
  let least = 0
  for (const n of g.field) if (n > 0 && (least === 0 || n < least)) least = n
  assert.equal(g.delta, least)
})

test('bellBornWeights come from bellState() — massGapOnBellBornField seals that yield', () => {
  const w = bellBornWeights()
  const g = massGapOnBellBornField()
  assert.deepEqual([...g.field], w)
  assert.equal(g.holds, true)
  assert.equal(g.delta, computeMassGap(w).delta)
  assert.equal(bornFieldMassGap(w).holds, true)
  assert.equal(bornFieldMassGap(w).delta, g.delta)
})

test('court seals mass gap and message cap on Hexbit.lean only — no Quantum twin', () => {
  const byKey = (k: string) => theorems().find((t) => t.key === k)
  for (const key of ['hexbit_ring_mass_gap', 'born_field_mass_gap_on_bell', 'message_cap_is_four_hexbits', 'hexbit_states_are_sixteen'] as const) {
    const t = byKey(key)
    assert.ok(t, `${key} must be sealed`)
    assert.equal(t.skill, 'hexbit', `${key} court voice is hexbit`)
    assert.equal(t.file, 'Hexbit.lean')
  }
  assert.equal(byKey('qft_mass_gap'), undefined, 'qft_mass_gap is a traitor alias — filtered')
  assert.equal(byKey('mass_gap_on_bell_born_field'), undefined, 'mass_gap_on_bell_born_field is a traitor alias — filtered')
})

test('sealed statements match the live computation (recompute equality)', () => {
  const ring = hexbitRingMassGap()
  const bell = massGapOnBellBornField()
  const weights = bellBornWeights()
  const ringThm = theorems().find((t) => t.key === 'hexbit_ring_mass_gap')
  const bellThm = theorems().find((t) => t.key === 'born_field_mass_gap_on_bell')
  assert.ok(ringThm && bellThm)

  // Statement embeds the computed Δ and window — a hardcoded drift fails here
  assert.ok(ringThm.statement.includes(`(${ring.delta}:Nat) > 0`) || ringThm.statement.includes(`((${ring.delta}:Nat) > 0`),
    `ring seal must embed live Δ=${ring.delta}`)
  assert.ok(ringThm.statement.includes(`List.range ${ring.states}`), `ring window must be live states=${ring.states}`)
  assert.ok(ringThm.statement.includes(`= ${ring.delta}`), `successive spacing must seal live Δ=${ring.delta}`)

  const list = '[' + weights.join(',') + ']'
  assert.ok(bellThm.statement.includes(list), `Bell weights in seal must equal bellBornWeights()=${list}`)
  assert.ok(bellThm.statement.includes(`${bell.delta} ≤ a`) || bellThm.statement.includes(`${bell.delta} ≤`),
    `Bell Δ=${bell.delta} must appear in seal`)
  assert.ok(bellThm.statement.includes(`${bell.delta} > 0`))

  // Receipt of the live magnitudes recomputes identically — seal inputs are the computation
  const live = merkleGravity([
    toUuid('ring|' + ring.delta + '|' + ring.states + '|' + ring.field.join(',')),
    toUuid('bell|' + bell.delta + '|' + weights.join(',')),
  ])
  const again = merkleGravity([
    toUuid('ring|' + hexbitRingMassGap().delta + '|' + hexbitRingMassGap().states + '|' + hexbitRingMassGap().field.join(',')),
    toUuid('bell|' + massGapOnBellBornField().delta + '|' + bellBornWeights().join(',')),
  ])
  assert.equal(live, again, 'mass-gap receipt recomputes')
})
