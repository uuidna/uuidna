// stabilizer — the tableau answers every Clifford circuit exactly as the dense simulator does where both can run, and
// keeps answering past the dense width. The falsifier is the dense simulator itself; the control is a known answer that
// only a correct phase rule gets right.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runCircuit, distribution, label, fraction, type GateOp } from './index.js'
import { cliffordOutcomes, isClifford } from './stabilizer.js'
import { toUuid } from '../address.js'
import { callTool } from '../mcp.js'

const GATES: GateOp['gate'][] = ['h', 's', 'sdg', 'x', 'y', 'z', 'cx', 'cz', 'swap']
const TWO = new Set<GateOp['gate']>(['cx', 'cz', 'swap'])
/** a circuit read from content addresses: deterministic, different per seed, no random source */
const circuitOf = (seed: string, n: number, len: number): GateOp[] => {
  let hex = ''
  for (let i = 0; hex.length < 3 * len; i++) hex += toUuid(`${seed}:${i}`).replace(/-/g, '')
  return Array.from({ length: len }, (_, i) => {
    const gate = GATES[parseInt(hex[3 * i]!, 16) % GATES.length]!, a = parseInt(hex[3 * i + 1]!, 16) % n
    let b = parseInt(hex[3 * i + 2]!, 16) % n
    if (b === a) b = (a + 1) % n
    return TWO.has(gate) && n > 1 ? { gate, qubits: [a, b] } : { gate: TWO.has(gate) ? 'h' : gate, qubits: [a] }
  })
}
const denseOutcomes = (n: number, ops: GateOp[]): Record<string, string> => {
  const out: Record<string, string> = {}
  distribution(runCircuit(n, ops)).forEach((p, i) => { if (p.num !== 0n) out[label(i, n)] = fraction(p) })
  return out
}
const sorted = (o: Record<string, string>): [string, string][] => Object.entries(o).sort(([a], [b]) => (a < b ? -1 : 1))

test('every Clifford circuit on 1..10 qubits gets the dense simulator\'s exact outcomes', () => {
  let checked = 0
  for (let n = 1; n <= 10; n++) for (let s = 0; s < (n === 1 ? 10 : 40); s++) {
    const ops = circuitOf(`stabilizer-${n}-${s}`, n, 6 * n + 4)
    assert.ok(isClifford(ops))
    assert.deepEqual(sorted(cliffordOutcomes(n, ops).outcomes!), sorted(denseOutcomes(n, ops)), `n=${n} seed=${s}`)
    checked++
  }
  assert.equal(checked, 370)
})

test('CONTROL: a phase-sensitive known answer — H·S·S·H sends |0⟩ to |1⟩, which a dropped phase would send to |0⟩', () => {
  const ops: GateOp[] = [{ gate: 'h', qubits: [0] }, { gate: 's', qubits: [0] }, { gate: 's', qubits: [0] }, { gate: 'h', qubits: [0] }]
  assert.deepEqual(cliffordOutcomes(1, ops).outcomes, { '1': '1' })
  assert.deepEqual(denseOutcomes(1, ops), { '1': '1' })
})

test('past the dense width: GHZ on 1000 qubits is 0…0 and 1…1, half each; H on 1000 qubits is 2^1000 outcomes, described', () => {
  const ghz: GateOp[] = [{ gate: 'h', qubits: [0] }, ...Array.from({ length: 999 }, (_, i) => ({ gate: 'cx' as const, qubits: [i, i + 1] }))]
  const g = cliffordOutcomes(1000, ghz)
  assert.equal(g.randomBits, 1)
  assert.deepEqual(sorted(g.outcomes!), [['0'.repeat(1000), '1/2'], ['1'.repeat(1000), '1/2']])
  const wide = cliffordOutcomes(1000, Array.from({ length: 1000 }, (_, i) => ({ gate: 'h' as const, qubits: [i] })))
  assert.equal(wide.randomBits, 1000)
  assert.equal(wide.outcomes, null)
  assert.equal(wide.share, `1/${2n ** 1000n}`)
})

test('uuidna_quantum answers a 40-qubit GHZ through the tableau instead of handing it away, and refuses a non-Clifford wide circuit to the hop', () => {
  const r = callTool('uuidna_quantum', { circuit: 'ghz', qubits: 40 }) as { representation?: string; outcomes?: Record<string, string> }
  assert.equal(r.representation, 'stabilizer tableau')
  assert.deepEqual(sorted(r.outcomes!), [['0'.repeat(40), '1/2'], ['1'.repeat(40), '1/2']])
  const t = callTool('uuidna_quantum', { qubits: 20, ops: [{ gate: 'ccx', qubits: [0, 1, 2] }] }) as { representation?: string }
  assert.notEqual(t.representation, 'stabilizer tableau', 'a Toffoli circuit is not Clifford, so the tableau does not claim it')
})
