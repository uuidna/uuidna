// quantum-advantage traitors — A FORGERY IN THE WAY OF THE USABLE-COLUMN GAP MUST BE CAUGHT.
//
// The battery decides sealed algebra on this host. These tests decide the OTHER question: can a smuggled
// duplicate, a laundered witness, a mutated gap (128−70 instead of 128−48), or a drifted uuidnaOS image sit
// in the path and still look EXACT? A suite that only ever runs the real witnesses cannot answer it.
//
// A traitor here is a forgery in the artifact (catchTraitors), never a person. Numbers and addresses —
// not a wording hunt.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { catchTraitors } from './index.js'
import { axiomWitness } from './index.js'
import { theoremByKey, theorems } from './index.js'
import { toUuid } from './index.js'
import { dispatch, dispatchAll } from './quantum/dispatch/index.js'
import { QA_REQUIRED_THEOREMS } from './index.js'
import { REPORTED_BASELINE } from './quantum/advantage/index.js'
import { HEXBIT_BITS, HEXBIT_STATES, HANDLE_HEXBITS, UUID_BITS, COIN_HEXBITS, UUID_HEXBITS } from './index.js'
import { callTool } from './mcp.js'
import type { ServedOS } from './quantum/os/index.js'
import { proveHardwareQuantum } from './index.js'

const GAP = 'usable_gap_is_two_to_eighty'
const GAP_Q = 'usable_gap_eighty_bits'
const DIM = 'n_qubit_dimension'
const OS = 'the_os_is_bootable_quantum'

test('no forgery sits on the usable-column path — DNA, collisions, seals, hexbit court', () => {
  const t = catchTraitors()
  const onPath = t.traitors.filter((v) => v.kind !== 'conformance')
  assert.deepEqual(onPath, [], onPath.map((v) => `[${v.kind}] ${v.detail}`).join('\n'))
  assert.ok(t.scanned > 100)
  // A lagging kernel-only census (audited < live ledger) is a freshness gap, not a smuggled advantage key.
  // A borrowed axiom would be a spy. Offenders must stay empty either way.
  const w = axiomWitness()
  assert.equal(Object.keys(w.offenders).length, 0, 'a borrowed axiom is a spy in the ledger')
  const conf = t.traitors.filter((v) => v.kind === 'conformance')
  if (!w.holds) {
    assert.equal(w.shipped, true)
    assert.ok(w.audited < w.ledger, `stale census must lag the live ledger, not disagree (${w.audited}/${w.ledger})`)
    for (const c of conf) assert.match(c.detail, /kernel-only-witness-shipped/, `unexpected conformance traitor: ${c.detail}`)
  } else {
    assert.deepEqual(conf, [], conf.map((v) => v.detail).join('\n'))
  }
})

test('every required advantage theorem is sealed, DNA-recomputes, and binds by decide', () => {
  const byKey = theoremByKey()
  for (const key of [...QA_REQUIRED_THEOREMS, GAP_Q, OS]) {
    const t = byKey.get(key)
    assert.ok(t, `${key} missing — a gap in the path`)
    assert.equal(toUuid(t.key + ':' + t.statement), t.address, `${key} DNA does not recompute — a forgery`)
    assert.ok(t.lean.startsWith('theorem ' + key), `${key} lean does not bind to its key`)
    assert.ok(t.lean.includes(':= by decide'), `${key} is not by decide`)
  }
})

test('CONTROL — a mutated usable-column (128 − 70) is NOT the sealed gap', () => {
  const t = theoremByKey().get(GAP)!
  const m = /(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/.exec(t.statement)
  assert.ok(m, `${GAP} must state bits − logical = gap`)
  const bits = Number(m[1]), logical = Number(m[2]), gap = Number(m[3])
  assert.equal(UUID_BITS, bits)
  assert.equal(bits - logical, gap)
  assert.equal(logical, 48, 'the reported column in the seal is 48, not a harvest 70')
  assert.equal(gap, 80)
  assert.notEqual(bits - 70, gap, 'IBM 128 − 70 = 58 is a mint candidate, never this seal')
  assert.notEqual(toUuid(t.key + ':' + t.statement.replace('48', '70')), t.address, 'mutating 48→70 forges DNA')
  const q = theoremByKey().get(GAP_Q)!
  assert.equal(toUuid(q.key + ':' + q.statement), q.address)
  assert.equal(q.statement.includes('128 - 48 = 80') || /\(128 - 48 = 80\)/.test(q.statement), true)
})

test('CONTROL — laundering n_qubit_dimension onto the usable-gap claim is REFUSED', () => {
  const d = dispatch({
    claim: `The usable-column gap is 2^80 by theorem ${GAP}.`,
    witness: DIM,
  })
  assert.equal(d.passed, false, 'an existence check passes this; dispatch must not')
  assert.match(d.reason, /WITNESS NOT CITED/)
  assert.equal(d.message, null)
})

test('CONTROL — a fabricated Shor-class key is drained, not published', () => {
  const d = dispatch({
    claim: 'This is a Shor-class physics speedup by theorem shor_class_physics_speedup.',
    witness: 'shor_class_physics_speedup',
  })
  assert.equal(d.passed, false)
  assert.equal(d.verdict, 'DRAINED')
  assert.deepEqual(d.fabricated, ['shor_class_physics_speedup'])
  assert.equal(theoremByKey().has('shor_class_physics_speedup'), false)
})

test('CONTROL — one refusal shuts a write that mixes a sealed gap with a traitor alias', () => {
  const run = dispatchAll([
    { claim: `Usable-column gap by theorem ${GAP}.`, witness: GAP },
    { claim: 'Shor-class by theorem shor_class_physics_speedup.', witness: 'shor_class_physics_speedup' },
  ])
  assert.equal(run.clear, false)
  assert.equal(run.passed, 1)
  assert.equal(run.refused.length, 1)
})

test('encoder, nest, and four hexbit widths stay distinct — collapsing any two is a traitor', () => {
  const os = callTool('uuidna_os', {}) as ServedOS
  const nest = HANDLE_HEXBITS + HEXBIT_BITS
  assert.equal(os.capacity.nestQubits, nest)
  assert.ok(nest < HEXBIT_BITS * HEXBIT_BITS, 'register_exceeds_served: Hilbert 4×4 is strictly above handle+hexbit nest')
  const four = [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS]
  assert.equal(new Set(four).size, 4, 'the four hexbit widths stay four — collapsing any two fails v0.3.0')
  assert.equal(UUID_HEXBITS, 32)
  assert.equal(UUID_BITS, UUID_HEXBITS * HEXBIT_BITS)
})

test('gate-error class on the live baseline matches the seal — a drifted 1000 is a traitor', () => {
  const t = theoremByKey().get('gate_error_baseline_class')!
  assert.match(t.statement, /1000/)
  assert.equal(REPORTED_BASELINE.errorsPerMillion, 1000)
  assert.equal(REPORTED_BASELINE.gateNs, 100)
  let thou = 1
  for (let i = 0; i < 3; i++) thou = thou * 10
  assert.equal(REPORTED_BASELINE.errorsPerMillion, thou)
})

test('uuidnaOS boot image matches the_os_is_bootable_quantum — an off-lattice state cannot load', () => {
  const t = theoremByKey().get(OS)!
  const os = callTool('uuidna_os', {}) as ServedOS
  const pagesM = /bootPages\.length = (\d+)/.exec(t.statement)
  const tilesM = /(\d+) \* (\d+) = (\d+)/.exec(t.statement)
  assert.ok(pagesM && tilesM, `${OS} must state pages × tiles`)
  const pages = Number(pagesM[1]), tiles = Number(tilesM[2]), states = Number(tilesM[3])
  assert.equal(os.boot.count, states)
  assert.equal(os.boot.states.length, pages * tiles)
  assert.ok(os.boot.states.every((h) => Number.isInteger(h) && h >= 0 && h < HEXBIT_STATES), 'off-lattice is a boot fault')
  assert.equal(os.portCount + 1, pages, 'specs plus the receipt page')
  assert.doesNotThrow(() => callTool('uuidna_os', {}))
})

test('chsh_beats_classical and ym_quantum stay sealed with clean DNA — and are now DECIDED, not merely unforged', () => {
  // The DNA half of this test is unchanged and is the part that must never move: a theorem the battery cannot
  // decide is still properly sealed, and that was the whole point while these two sat outside it.
  for (const key of ['chsh_beats_classical', 'ym_quantum']) {
    const t = theoremByKey().get(key)
    assert.ok(t, `${key} must remain sealed`)
    assert.equal(toUuid(t.key + ':' + t.statement), t.address)
    assert.ok(t.lean.includes(':= by decide'))
  }
  // What changed: both are now decided on this host, so the assertion is strengthened from "named as a gap" to
  // "run, with the disagreement count that makes naming it worth anything". Asserting they stay UNWITNESSED
  // would now be a test defending a gap instead of measuring one.
  const p = proveHardwareQuantum(1)
  const decided = new Map(p.results.map((r) => [r.theorem, r]))
  for (const key of ['chsh_beats_classical', 'ym_quantum']) {
    const r = decided.get(key)
    assert.ok(r, `${key} must now be decided by the battery`)
    assert.equal(r.disagreements, 0, `${key}: this silicon disagreed with the sealed value`)
    assert.ok(r.executed > 0, `${key}: decided with zero executions is a claim with no run behind it`)
    assert.ok(!p.coverage.unwitnessed.includes(key))
  }
  assert.deepEqual(p.coverage.unwitnessed, [], 'the quantum wing is fully covered by the battery')
  assert.equal(p.coverage.witnessed, p.coverage.wing)
  assert.equal(p.disagreements, 0)
  assert.equal(p.refused.length, 0)
})

test('hexbit-court traitor aliases still do not admit — architecture filter holds', () => {
  const keys = new Set(theorems().map((t) => t.key))
  assert.equal(keys.has('qft_mass_gap'), false)
  assert.equal(keys.has('mass_gap_on_bell_born_field'), false)
  assert.equal(keys.has('shor_class_physics_speedup'), false)
})
