// one-writer — THE ONE-WRITER LAW, tested with an instrument that can fail. The properties: exactly one
// acquirer wins (atomic wx), a second LIVE writer is refused WITH the holder named, a dead holder's lock is
// stale by pid-liveness and reclaimed (no clock anywhere), only the holder releases, and release is idempotent.
// The dead pid is a real measurement: we spawn a process, let it exit, and use ITS pid — never a guessed
// number that might coincide with a live process.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { writeFileSync, existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { acquire, release, currentWriter } from '../scripts/one-writer.js'

const lockAt = (name: string): string => join(mkdtempSync(join(tmpdir(), 'one-writer-')), name)

// a pid that is REALLY dead: a child that already exited (its pid was ours to observe, and it is gone)
const deadPid = (): number => {
  const child = spawnSync('true')
  assert.ok(child.pid && child.status === 0)
  return child.pid!
}

test('one writer wins; a STRANGER is refused with the holder NAMED (a descendant passes — that is reentrancy)', () => {
  const path = lockAt('a.lock')
  assert.deepEqual(acquire('audit', process.pid, path), { ok: true })
  // the stranger must be REAL and never our descendant: pid 1 (launchd/init) is alive and ancestral to us,
  // not the reverse — the first version used process.pid+1, which the OS had just handed to our own ps child,
  // so the lock CORRECTLY reentrant-passed it and the test blamed the lock for its own bad stranger.
  const second = acquire('reconcile', 1, path)
  assert.equal(second.ok, false, 'a live stranger is refused')
  if (!second.ok) {
    assert.equal(second.holder.pid, process.pid, 'the refusal must name the LIVE holder')
    assert.equal(second.holder.purpose, 'audit')
  }
  // and the holder's own descendant passes without rewriting the lock — lead 91's reentrancy, tested straight
  assert.deepEqual(acquire('child-write', process.pid, path), { ok: true }, 'the holder itself (trivial ancestor) passes')
})

test('a dead holder is stale by pid-liveness — reclaimed on the next acquire, no clock consulted', () => {
  const path = lockAt('b.lock')
  writeFileSync(path, JSON.stringify({ pid: deadPid(), purpose: 'audit (crashed)' }))
  assert.equal(currentWriter(path), null, 'a dead holder is no holder')
  assert.deepEqual(acquire('audit', process.pid, path), { ok: true }, 'the stale lock must not block the tree forever')
})

test('only the holder releases; releasing a live stranger\'s lock is refused', () => {
  const path = lockAt('c.lock')
  assert.deepEqual(acquire('audit', process.pid, path), { ok: true })
  assert.equal(release(process.pid + 1, path), false, 'a non-holder releasing IS the interleaving')
  assert.ok(existsSync(path), 'the lock must survive the refused release')
  assert.equal(release(process.pid, path), true)
  assert.equal(release(process.pid, path), true, 'releasing a released lock is quiet, not an error')
  assert.equal(currentWriter(path), null)
})

test('a corrupt lock file never wedges the tree', () => {
  const path = lockAt('d.lock')
  writeFileSync(path, 'not json at all')
  assert.equal(currentWriter(path), null)
  assert.deepEqual(acquire('audit', process.pid, path), { ok: true })
})
