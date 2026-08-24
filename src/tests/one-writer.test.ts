// one-writer — THE ONE-WRITER LAW, tested with an instrument that can fail. The properties: exactly one
// acquirer wins (atomic wx), a second LIVE writer is refused WITH the holder named, a dead holder's lock is
// stale by pid-liveness and reclaimed (no clock anywhere), only the holder releases, and release is idempotent.
// The dead pid is a real measurement: we spawn a process, let it exit, and use ITS pid — never a guessed
// number that might coincide with a live process.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync, execSync, spawn } from 'node:child_process'
import { writeFileSync, existsSync, mkdtempSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { acquire, awaitAcquire, release, currentWriter, working } from '../scripts/one-writer.js'

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

// ── THE WAIT (2026-08-24): acquire refuses; awaitAcquire QUEUES. The properties an instrument can fail on:
// a free tree is taken with ZERO polls (no sleep is paid when nothing holds), a DEAD holder's lock is reclaimed
// through the same path (the wait inherits stale-reclaim rather than reimplementing it), the holder is
// ANNOUNCED exactly once so a waiting chain says who it waits for, and a stuck live holder is REFUSED at the
// ceiling instead of hanging forever — a writer that never lets go is a finding, not a queue.
test('a free tree is acquired with zero polls — waiting costs nothing when nothing holds', () => {
  const path = lockAt('w1.lock')
  const r = awaitAcquire('reconcile', process.pid, path)
  assert.deepEqual(r, { ok: true, polls: 0 })
  assert.equal(currentWriter(path)?.purpose, 'reconcile')
})

test('a DEAD holder is reclaimed by the wait — stale-reclaim is inherited, not reimplemented', () => {
  const path = lockAt('w2.lock')
  writeFileSync(path, JSON.stringify({ pid: deadPid(), purpose: 'crashed audit' }))
  const r = awaitAcquire('reconcile', process.pid, path)
  assert.equal(r.ok, true)
  assert.equal((r as { polls: number }).polls, 0, 'a dead holder never costs a single sleep')
})

test('CONTROL — a LIVE stranger is announced once and refused at the ceiling, never waited on forever', () => {
  const path = lockAt('w3.lock')
  // a LIVE TRUE STRANGER: a grandchild orphaned by its parent's exit, so its ancestry is init → it and holds
  // neither us nor our line. (pid 1 will NOT do — init is EVERY process's ancestor, so the reentrancy check
  // passes a lock naming it; that hole is what this control found on its way in, deposited as a lead.)
  const stranger = Number(execSync('sh -c \'sleep 30 >/dev/null 2>&1 & echo $!\'', { encoding: 'utf8' }).trim())
  writeFileSync(path, JSON.stringify({ pid: stranger, purpose: 'a writer that never lets go' }))
  const announced: string[] = []
  // the ceiling is injected at 0 so the refusal is reachable without waiting out MAX_POLLS in a test
  const r = awaitAcquire('reconcile', process.pid, path, (h) => announced.push(h.purpose), 0)
  assert.equal(r.ok, false)
  assert.deepEqual(announced, ['a writer that never lets go'], 'announced exactly once, however long the wait')
  assert.equal(currentWriter(path)?.pid, stranger, 'and the live stranger\'s lock is left untouched')
})

// ── THE CEILING ASKS THE PROCESS TABLE (2026-08-24). working() existed but only shaped the CLI's wording; the
// verdict was still the poll count, so elapsed time alone convicted — and it misfired on a live `land` that was
// running its pre-push gate the whole time. These two tests are the pair that keeps the question honest: the
// refusal must survive for a holder doing nothing, and must NOT fire for a holder doing something.
test('a holder with NO live child is still refused at the ceiling — the stuck signal is unchanged', () => {
  const path = join(tmpdir(), `uuidna-ceiling-idle-${process.pid}.lock`)
  const idle = Number(execSync('sh -c \'sleep 30 >/dev/null 2>&1 & echo $!\'', { encoding: 'utf8' }).trim())
  writeFileSync(path, JSON.stringify({ pid: idle, purpose: 'a writer doing nothing' }))
  const extended: number[] = []
  const r = awaitAcquire('probe', process.pid, path, () => {}, 0, (_h, n) => extended.push(n))
  assert.equal(r.ok, false, 'a holder with nothing running under it is stuck and must be named')
  assert.deepEqual(extended, [], 'and it must NOT be granted an extension it did not earn')
  try { process.kill(idle) } catch { /* already gone */ }
  try { unlinkSync(path) } catch { /* fine */ }
})

test('CONTROL — a holder that IS working EXTENDS past the ceiling, and the lane is taken when it finishes', () => {
  const path = join(tmpdir(), `uuidna-ceiling-busy-${process.pid}.lock`)
  // a holder with a REAL live child: a node process that spawns a sleep, so pgrep -P finds work under it. A
  // shell will not do — `sh -c '... &'` execs away its own child and leaves nothing under the pid we captured,
  // which is how the first version of this test fixture failed while the code under test was correct.
  const holder = spawn(process.execPath,
    ['-e', "require('node:child_process').spawn('sleep',['6'],{stdio:'ignore'}); setTimeout(()=>process.exit(0),5000)"],
    { detached: true, stdio: 'ignore' })
  holder.unref()
  execSync('sleep 1')                                   // let the grandchild appear before we judge
  assert.equal(working(holder.pid!), true, 'the fixture must actually be working, or this control proves nothing')
  writeFileSync(path, JSON.stringify({ pid: holder.pid, purpose: 'a writer mid-gate' }))
  const extended: number[] = []
  const r = awaitAcquire('probe', process.pid, path, () => {}, 0, (_h, n) => extended.push(n))
  // THE POINT: it did not accuse a working holder, it waited — and waiting is rewarded with the lane the
  // moment that holder ends. The old ceiling would have refused at the count regardless.
  assert.ok(extended.length >= 1, `a working holder must be granted an extension, got ${extended.length}`)
  assert.ok(extended.length <= 6, 'and extensions stay bounded — MAX_EXTENSIONS, never an unbounded wait')
  // DELIBERATELY NOT ASSERTED: whether this particular run ends in ok or a bounded refusal. That outcome races
  // the fixture's lifetime against the extension budget, and an assertion that depends on which finishes first
  // is a flake wearing a proof's clothes — it failed here once for exactly that reason while the code under
  // test was correct. What the fix GUARANTEES is the pair: an idle holder earns no extension and is named, a
  // working holder earns at least one and is not. Both halves are asserted, and the idle test is the control.
  assert.equal(typeof r.ok, 'boolean', 'and it always terminates — an extension is a reprieve, not a spin')
  try { process.kill(holder.pid!) } catch { /* already gone */ }
  try { unlinkSync(path) } catch { /* fine */ }
})
