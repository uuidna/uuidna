import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QuantumFormulas } from './index.js'
import '../../mcp/families.js'

test('quantum: qubits, states, gatecount, entanglementpairs, superposition, circuitdepth, shots, fidelity — crossing to physics', async (t) => {
  assert.equal(QuantumFormulas.qubits(5, 0).value, 5)
  assert.equal(QuantumFormulas.states(5).value, 32)
  assert.equal(QuantumFormulas.gatecount(20, 3).value, 60)
  assert.equal(QuantumFormulas.entanglementpairs(8, 2).value, 28)
  assert.equal(QuantumFormulas.superposition(4).value, 16)
  assert.equal(QuantumFormulas.circuitdepth(10, 5).value, 15)
  assert.equal(QuantumFormulas.shots(1024, 1).value, 1024)
  assert.equal(QuantumFormulas.fidelity(99, 100).value, 99)
  assert.equal(QuantumFormulas.qubits(5, 0).dst, 'physics')
  assert.equal(hexFamiliesOf().get('quantum')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'quantum', program: ['qubits'], params: [5, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `quantum.qubits at ${uuid}`)
  uuidReceiptOf('quantum qubits', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; qubits 5, states 32, gatecount 60, entanglementpairs 28, superposition 16, circuitdepth 15, shots 1024, fidelity 99; crossing to physics')
})
