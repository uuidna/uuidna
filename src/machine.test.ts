// quantum/context/machine — THE METAL BALANCER, TESTED FROM THE THEOREMS, NO FIXTURES (the standing rule):
// every number derives from the sealed constants — a machine keeping exactly 13/32 of its capacity spare
// sits ON the law (balanced); one ring under says FOLD and names the heaviest writer with its priced share.
// Integer-exact, deterministic, change-sensitive; degenerate reports never crash.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { balanceMachine } from './quantum/machine/index.js'
import { SAFE_HEXBITS, UUID_HEXBITS } from './index.js'

const CORES = UUID_HEXBITS                                  // a 32-core register — the machine AS the ring
const CAP = CORES * 100                                     // capacity in centi-CPU
const idiv = (a: number, b: number): number => (a - (a % b)) / b

test('keeping exactly 13/32 spare sits ON the law — balanced at the theorem\'s edge, both lanes', () => {
  const spentCenti = (UUID_HEXBITS - SAFE_HEXBITS) * 100    // 19 cores burning, 13 spare
  const b = balanceMachine({ cores: CORES, centiLoad1: spentCenti, memTotalMb: 3200, memFreeMb: idiv(3200 * SAFE_HEXBITS, UUID_HEXBITS) })
  assert.equal(b.safeFloorPermille, idiv(SAFE_HEXBITS * 1000, UUID_HEXBITS))
  assert.ok(1000 - b.loadPermille >= b.safeFloorPermille, 'exactly the law\'s spare holds the law')
  assert.equal(b.balanced, true)
  assert.match(b.verdict, /BALANCED/)
  assert.equal(b.hexbits.length, UUID_HEXBITS)
})

test('one ring under says FOLD and names the heaviest writer, priced — the control that can fail', () => {
  const spentCenti = (UUID_HEXBITS - SAFE_HEXBITS + 1) * 100   // 20 of 32 — one ring short of the spare
  const b = balanceMachine({ cores: CORES, centiLoad1: spentCenti, memTotalMb: 3200, memFreeMb: 3200,
    writers: [{ name: 'test-swarm', centiCpu: 1200 }, { name: 'walker', centiCpu: 300 }] })
  assert.equal(b.cpuBalanced, false)
  assert.equal(b.memBalanced, true)
  assert.match(b.verdict, /FOLD/)
  assert.match(b.verdict, /test-swarm/, 'the heaviest writer is named first')
  assert.equal(b.writers[0]!.sharePermille, idiv(1200 * 1000, CAP), 'the share is priced in exact permille')
})

test('deterministic, change-sensitive, degenerate-safe', () => {
  const r = { cores: CORES, centiLoad1: 900, memTotalMb: 3200, memFreeMb: 1600 }
  const a = balanceMachine(r)
  assert.deepEqual(a, balanceMachine({ ...r }))
  assert.notEqual(balanceMachine({ ...r, centiLoad1: 901 }).receipt, a.receipt, 'one centi-load moved, the receipt moved')
  assert.equal(balanceMachine({ cores: 0, centiLoad1: 0, memTotalMb: 0, memFreeMb: 0 }).loadPermille, 0, 'a zero machine never crashes')
})
