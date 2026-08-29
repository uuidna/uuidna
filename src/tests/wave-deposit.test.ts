// wave-deposit — the wire's door into the conveyor on trial. The door laws live in ONE declaration
// (validateCandidate, shared with queue-wave.ts), so this file tries the DOOR: every refusal class gets a
// candidate that must land on it, a lawful candidate must pass and be written, and the refused are never
// written (the queue file's refused[] belongs to the KERNEL, not the doorman). The deposit runs against a
// scratch queue file — the real lean/wave-queue.json is the janitor's, and a test that touches it is a test
// that can race a live wave.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { validateCandidate, depositCandidates, waveQueueInFlightKeys } from '../wave-deposit.js'
import { theoremByKey } from '../theorems/index.js'

const scratch = (): string => {
  const p = join(mkdtempSync(join(tmpdir(), 'wave-deposit-')), 'wave-queue.json')
  writeFileSync(p, JSON.stringify({ pending: [], accepted: [], refused: [] }, null, 2))
  return p
}
const lawful = { key: 'wave_deposit_probe_seven_elevens', why: 'THE DOOR\'S OWN PROBE — a lawful candidate that must pass validation: 7 · 11 = 77, two primes and their product, stated by decide.', lean: 'theorem wave_deposit_probe_seven_elevens : 7 * 11 = 77 := by decide' }

test('every refusal class refuses, and the lawful candidate passes — the door can fail', () => {
  const sealed = theoremByKey()
  assert.equal(validateCandidate(lawful, sealed), null, 'the lawful candidate passes')
  assert.match(String(validateCandidate({ ...lawful, key: 'BadKey' }, sealed)), /lawful theorem key/)
  assert.match(String(validateCandidate({ ...lawful, why: 'too short' }, sealed)), /why is missing/)
  assert.match(String(validateCandidate({ ...lawful, lean: 'theorem other_key : 1 = 1 := by decide' }, sealed)), /exactly/)
  assert.match(String(validateCandidate({ ...lawful, lean: `theorem ${lawful.key} : 1 = 1 := by simp` }, sealed)), /by decide/)
  assert.match(String(validateCandidate({ ...lawful, lean: `theorem ${lawful.key} : 1 = 1 := by decide -- axiom` }, sealed)), /sorry\/axiom|by decide/)
  assert.match(String(validateCandidate({ ...lawful, key: 'two_coins', lean: 'theorem two_coins : 110 - 108 = 2 := by decide' }, sealed)), /already sealed/)
})

test('a deposit lands only the lawful, returns refusals with reasons, and never writes a refusal', () => {
  const p = scratch()
  const r = depositCandidates([lawful, { key: 'two_coins', why: 'a dupe of a sealed theorem, long enough to pass the why floor.', lean: 'theorem two_coins : 110 - 108 = 2 := by decide' }], p)
  assert.deepEqual(r.deposited, [lawful.key])
  assert.equal(r.refused.length, 1)
  assert.match(r.refused[0]!.reason, /already sealed/)
  const q = JSON.parse(readFileSync(p, 'utf8')) as { pending: { key: string }[]; refused: unknown[] }
  assert.deepEqual(q.pending.map((c) => c.key), [lawful.key], 'only the lawful candidate is written')
  assert.equal(q.refused.length, 0, 'the file\'s refused[] belongs to the kernel — the doorman never writes it')
  // a re-deposit of the same key refuses as already queued — the wire cannot double-park a candidate
  const again = depositCandidates([lawful], p)
  assert.equal(again.deposited.length, 0)
  assert.match(again.refused[0]!.reason, /already pending/)
})

test('waveQueueInFlightKeys — pending and accepted keys, not refused', () => {
  const p = scratch()
  writeFileSync(p, JSON.stringify({
    pending: [{ key: 'pending_key', why: 'x'.repeat(20), lean: 'theorem pending_key : 1 = 1 := by decide' }],
    accepted: [{ key: 'accepted_key', why: 'y'.repeat(20), lean: 'theorem accepted_key : 1 = 1 := by decide', receipt: 'r' }],
    refused: [{ key: 'refused_key', why: 'z'.repeat(20), lean: 'theorem refused_key : 1 = 1 := by decide', reason: 'no' }],
  }, null, 2))
  const keys = waveQueueInFlightKeys(p)
  assert.ok(keys.has('pending_key'))
  assert.ok(keys.has('accepted_key'))
  assert.equal(keys.has('refused_key'), false)
})
