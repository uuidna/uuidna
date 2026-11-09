// uuid-program — the falsifiers for lean/UuidProgram.lean. Each sealed fact is re-decided twice from outside the
// generator: by its battery witness on QState, and by calling the program at its UUID the way any client does.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { WITNESSES } from './drivers/quantum/index.js'
import { theoremFor } from './theorems/index.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { uuidOfCall, callOfUuid } from './hex-programs.js'
import { callTool } from './mcp.js'

const witness = (key: string): number => {
  const w = WITNESSES.find((x) => x.theorem === key)
  assert.ok(w, `${key} has a battery witness`)
  return w.run()
}

test('every UUID program fact is sealed and its witness finds no disagreement', () => {
  for (const key of ['uuidprog_address', 'uuidprog_layout', 'uuidprog_h_unitary', 'uuidprog_paulis_unitary',
    'uuidprog_cnot_swap', 'uuidprog_toffoli', 'uuidprog_bell_runs', 'uuidprog_ghz_runs']) {
    assert.ok(theoremFor(key), `${key} is sealed`)
    assert.equal(witness(key), 0, key)
  }
})

test('uuidprog_address — the program UUID resolves to uuidna_quantum and carries its derived program field', () => {
  const uuid = uuidOfCall({ handle: handleOf(toUuid('lean:UuidProgram.lean')), door: 'uuidna_quantum' })
  assert.equal(callOfUuid(uuid).door, 'uuidna_quantum')
  const program = uuid.replace(/-/g, '').slice(8, 16)
  assert.match(theoremFor('uuidprog_address')!.statement, new RegExp(`\\[${[...program].map((c) => parseInt(c, 16)).join(', ')}\\]`))
})

test('uuidprog_bell_runs, uuidprog_ghz_runs — the program called at its UUID serves the sealed weights', () => {
  const uuid = uuidOfCall({ handle: handleOf(toUuid('lean:UuidProgram.lean')), door: 'uuidna_quantum' })
  const bell = callTool(uuid, { circuit: 'bell' }) as { outcomes: Record<string, string> }
  assert.deepEqual(bell.outcomes, { '00': '1/2', '11': '1/2' })
  const ghz = callTool(uuid, { circuit: 'ghz', qubits: 3 }) as { outcomes: Record<string, string> }
  assert.deepEqual(ghz.outcomes, { '000': '1/2', '111': '1/2' })
})

test('CONTROL: a UUID whose program field names no door resolves to none', () => {
  assert.equal(callOfUuid('0000c0de-ffff-ffff-0000-000000000000').door, null)
})
