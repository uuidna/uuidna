// odometer — the npm string is linear 0..9; digit 0 is origin (runSequence(0).fixed).
// The tick is odometerNext, shared by the calendar and this test. Sequence is printed, not indexed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { odometerNext } from './index.js'
import { runSequence } from './index.js'

test('odometerNext rolls patch then minor; major stays locked at 0', () => {
  assert.equal(odometerNext('0.1.8'), '0.1.9')
  assert.equal(odometerNext('0.1.9'), '0.2.0')
  assert.equal(odometerNext('0.2.9'), '0.3.0')
  const [ma, , pa] = odometerNext('0.4.4').split('.').map(Number)
  assert.equal(ma, 0)
  assert.ok(pa !== undefined && pa <= 9)
})

test('digit 0 is origin — runSequence of the patch, not SEQ[patch]', () => {
  const origin = runSequence(0)
  assert.equal(origin.fixed, true)
  assert.equal(origin.seed, 0)
  const next = odometerNext('0.2.9')
  const patch = Number(next.split('.')[2])
  const walked = runSequence(patch)
  assert.equal(walked.seed, patch)
  assert.equal(walked.fixed, runSequence(0).fixed)
})

test('the research calendar prints runSequence(patch), not a hand-built SEQ index', () => {
  const yml = readFileSync(join(ROOT, '.github/workflows/research.yml'), 'utf8')
  assert.doesNotMatch(yml, /SEQ\s*=\s*\[0/)
  assert.match(yml, /runSequence/)
  assert.match(yml, /odometerNext/)
})
