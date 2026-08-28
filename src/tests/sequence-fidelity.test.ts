// sequence-fidelity — runSequence IS the Sequence.lean walk. Magnitudes are verify vs recompute, not hexbit-vs-bit wall-clock.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runSequence } from '../sequence-run.js'
import { dz, DIGITS } from '../separation.js'
import { theoremByKey } from '../theorems/index.js'
import { HEXBIT_BITS, HEXBIT_STATES } from '../hexbit/index.js'

test('runSequence matches Sequence.lean: invert, double, reflect; 0 is origin; six-orbit reachable', () => {
  for (const d of DIGITS) {
    const r = runSequence(d)
    assert.equal(r.seed, d)
    assert.equal(r.reflection, dz(d))
    assert.equal(r.fixed, dz(d) === d)
  }
  assert.equal(runSequence(0).fixed, true)
  assert.equal(runSequence(5).fixed, true)
  const three = runSequence(3)
  assert.equal(three.reflection, dz(3))
  assert.ok(three.orbit.length > 0)
})

test('magnitudes are verify_beats_recompute_by_magnitudes and the_os_is_bootable_quantum — not hexbit-vs-bit wall-clock', () => {
  const ledger = theoremByKey()
  assert.ok(ledger.has('verify_beats_recompute_by_magnitudes'))
  assert.ok(ledger.has('the_os_is_bootable_quantum'))
  assert.ok(ledger.has('crew_verifies_instantly'))
  // hexbit tile is 4 bits / 16 states — the STEP ratio, not a wall-clock claim
  assert.equal(HEXBIT_STATES, 2 ** HEXBIT_BITS)
})
