// one-writer — THE ONE-WRITER LAW, tested with an instrument that can fail. The properties: exactly one
// acquirer wins (atomic wx), a second LIVE writer is refused WITH the holder named, a dead holder's lock is
// stale by pid-liveness and reclaimed (no clock anywhere), only the holder releases, and release is idempotent.
// The dead pid is a real measurement: we spawn a process, let it exit, and use ITS pid — never a guessed
// number that might coincide with a live process.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync, execFileSync, spawn } from 'node:child_process'
import { writeFileSync, existsSync, mkdtempSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { acquire, awaitAcquire, release, currentWriter, working } from '../../../scripts/one-writer.js'
import { resolveShell, type PosixShell } from '../../../os/host/index.js'

// THE INSTRUMENT NEEDS A SHELL, AND THE SHELL IS RESOLVED, NOT ASSUMED (os/host). These are the two places the
// suite spawns a REAL process to get a real pid — a dead one and a live stranger — and both did it through bare
// POSIX names (`true`, `sh`) that a Windows host does not have on PATH. The spawn then failed rather than the
// property, so the control that exists to prove this test CAN say no was the thing that broke.
const SHELL: PosixShell = ((): PosixShell => {
  const s = resolveShell()
  if (s.ok) return s
  throw new Error(`one-writer.test needs a shell to spawn a real pid: ${s.reason} — ${s.remedy}`)
})()
const inShell = (cmd: string): string => execFileSync(SHELL.file, SHELL.argv(cmd), { encoding: 'utf8', env: SHELL.env(process.env) })

const lockAt = (name: string): string => join(mkdtempSync(join(tmpdir(), 'one-writer-')), name)

// a pid that is REALLY dead: a child that already exited (its pid was ours to observe, and it is gone)
const deadPid = (): number => {
  const child = spawnSync(SHELL.file, SHELL.argv('exit 0'), { env: SHELL.env(process.env) })
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

test('reentrancy is the WALK, not just the holder: a descendant a REAL HOP away passes', () => {
  // WHY THIS EXISTS AS A SEPARATE TEST. The case above passes at hop ZERO — `p === holder` returns true before
  // the process table is ever consulted — so it holds identically whether the ppid walk works or is broken. And
  // it was broken: `ps -o ppid= -p` used a procps flag that the ps in Git for Windows does not have, the catch
  // read the missing FLAG as a real "not an ancestor", and every descendant of a holder was refused the tree its
  // own parent held. The suite was green throughout, because the only reentrancy assertion never took a step.
  //
  // One real hop is all it takes to notice, and it needs no fixture: this process HAS a live parent, and the OS
  // agrees about who it is. Holding the lock as our parent makes us a genuine descendant one hop down, so the
  // acquire can only succeed by walking — hop 0 is us and is not the holder; hop 1 must find the ppid.
  const path = lockAt('e.lock')
  assert.notEqual(process.ppid, process.pid, 'a process is not its own parent — the hop must be real')
  writeFileSync(path, JSON.stringify({ pid: process.ppid, purpose: 'land (our actual parent)' }))
  assert.deepEqual(acquire('reconcile', process.pid, path), { ok: true },
    'the holder\'s child must pass — refusing it IS lead 91, and it is what a broken ppid walk does')
  assert.equal(currentWriter(path)?.pid, process.ppid, 'and the lock stays the ANCESTOR\'s — a descendant never rewrites it')

  // the control, so a run that simply never refuses fails here: pid 1 is alive and is NOT our descendant.
  writeFileSync(path, JSON.stringify({ pid: process.pid, purpose: 'audit' }))
  assert.equal(acquire('reconcile', 1, path).ok, false, 'a stranger is still refused — the walk did not become a yes-machine')
})

test('the ppid walk is paid for ONCE — a refusal loop must not spawn a process table per poll', () => {
  // THE REGRESSION THIS EXISTS FOR, because correctness alone could not see it. Fixing `ps -o` made the walk
  // actually WORK, and a working walk costs one spawn per hop — so acquire(), which walks on every refusal,
  // turned awaitAcquire's poll loop into hops × polls PowerShell start-ups. This suite went from ~12 seconds to
  // over seven minutes, and every assertion in it still passed: the lock was correct and unusable at the same
  // time. A broken instrument is cheap because it does no work, so repairing one can only ever make things
  // slower — which means the repair has to be measured, not just proven right.
  const path = lockAt('f.lock')
  // the holder must be a LIVE STRANGER, so acquire actually refuses and actually walks. pid 1 will not do — as
  // the ceiling test above already records, init is every process's ancestor, so the walk correctly finds it and
  // the refusal never happens. Using it here cost this test its first run: it asserted a refusal against a holder
  // the lock was right to admit, which is the test being wrong about the world rather than the code being wrong.
  const stranger = Number(inShell('sleep 30 >/dev/null 2>&1 & cat /proc/$!/winpid 2>/dev/null || echo $!').trim())
  writeFileSync(path, JSON.stringify({ pid: stranger, purpose: 'a live stranger' }))
  // THE COLD WALK IS PAID OUTSIDE THE TIMER, and that is the claim rather than a concession to it. The property
  // under test is that the walk is paid ONCE, so what has to be cheap is every call AFTER the first — timing the
  // cold spawn alongside them measures the price of the first walk, which nobody disputes. It also made this test
  // flake: run under the full suite's parallel load the single uncached walk can cost seconds, and averaged over
  // 40 calls it alone crossed the bound while the cache was working perfectly. Passing in isolation and failing
  // beside its neighbours is the instrument moving, not the lock.
  assert.equal(acquire('reconcile', process.pid, path).ok, false)   // the one walk, untimed
  const t0 = process.hrtime.bigint()
  for (let i = 0; i < 40; i++) assert.equal(acquire('reconcile', process.pid, path).ok, false)
  const perCallMs = Number((process.hrtime.bigint() - t0) / 1000000n) / 40
  // A CEILING, NOT A BENCHMARK — and excluding the cold walk makes it STRICTER, not looser: these 40 calls must
  // now all hit the cache, where before one uncached spawn had 2000 ms of the budget to hide in. The regression
  // this catches is a spawn per hop per call, which would put several hundred ms of process start-up into every
  // one of the 40; the bound stays loose enough that a slow, loaded host passes.
  assert.ok(perCallMs < 50, `a repeated refusal must reuse the walk, not redo it: ${perCallMs} ms per acquire`)
  try { process.kill(stranger) } catch { /* already gone */ }
})

test('a RECYCLED pid does not inherit the lock — the holder is identified, not merely counted', () => {
  // THE 2.82-HOUR FAILURE THIS EXISTS FOR. A pid is a number the OS reissues. When a holder crashed and its
  // number was handed to an unrelated process, kill(pid, 0) answered true forever, the lock read LIVE, and
  // stale-reclaim never fired — so awaitAcquire waited on a corpse. Measured under five-session load: 10,123,473
  // ms inside the wait, roughly four extensions granted to a dead holder, then failure; the same suite in a quiet
  // moment ran in 22,628 ms. A deterministic defect does not vary by 449x; a pid collision under load does.
  //
  // The impersonation is staged rather than waited for, because waiting for a real collision is waiting for load.
  // OUR OWN pid is unquestionably alive, so writing a lock that claims our number with somebody else's birth
  // instant is exactly the state a recycled pid produces: the number answers, the process is not the one recorded.
  const path = lockAt('g.lock')
  writeFileSync(path, JSON.stringify({ pid: process.pid, purpose: 'a holder that died and whose number was reissued', born: 'not-when-this-process-began' }))
  assert.equal(currentWriter(path), null,
    'a live number wearing the wrong birth instant is NOT the holder — this is the whole fix')
  assert.deepEqual(acquire('audit', process.pid, path), { ok: true },
    'and the tree is reclaimed, rather than held forever by a process that no longer exists')

  // THE CONTROL, so a run that simply calls every holder stale fails here: the same pid with the RIGHT stamp is
  // still the holder, and a stranger is still refused. acquire has just written the true stamp for us.
  const real = currentWriter(path)
  assert.equal(real?.pid, process.pid, 'a genuine holder survives the identity check')
  assert.ok(real?.born, 'and the lock now CARRIES the stamp — an unstamped lock proves nothing')
  assert.equal(acquire('reconcile', 1, path).ok, false, 'a stranger is still refused')
})

test('a lock with NO birth stamp is honoured on liveness alone — an older build is not evidence of a corpse', () => {
  // Refusing an unstamped lock would reclaim the tree from a holder that is genuinely working, merely because it
  // was started by a build that predates the stamp. The unstamped case must degrade to the PREVIOUS behaviour
  // exactly, and no further — so this pins the compatibility rather than leaving it to be discovered.
  const path = lockAt('h.lock')
  writeFileSync(path, JSON.stringify({ pid: process.pid, purpose: 'a holder from an older build' }))
  assert.equal(currentWriter(path)?.pid, process.pid, 'no stamp, live pid — still the holder')
  assert.equal(acquire('audit', 1, path).ok, false, 'and it still refuses a stranger')
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
  // THE PID MUST BE THE ONE THE OS KILLS BY, NOT THE ONE THE SHELL COUNTS BY. `$!` is the OS pid on a POSIX host
  // and an MSYS pid under Git for Windows — a different namespace entirely, so `process.kill(pid, 0)` found
  // nothing, called the live stranger dead, reclaimed its lock and let the acquire SUCCEED. The control that
  // exists to prove this test can say no was quietly saying yes. MSYS publishes the real one at
  // /proc/<pid>/winpid; where that file does not exist (every POSIX host), `$!` was already right.
  const stranger = Number(inShell('sleep 30 >/dev/null 2>&1 & cat /proc/$!/winpid 2>/dev/null || echo $!').trim())
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
  const idle = Number(inShell('sleep 30 >/dev/null 2>&1 & cat /proc/$!/winpid 2>/dev/null || echo $!').trim())
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
  // the grandchild is another NODE process, not `sleep`: the fixture must exist on every host, and a `sleep` that
  // is not a program leaves nothing under the holder — the control would then read not-working and prove nothing,
  // which is the same way its first version failed while the code under test was correct.
  const holder = spawn(process.execPath,
    ['-e', "require('node:child_process').spawn(process.execPath,['-e','setTimeout(()=>{},6000)'],{stdio:'ignore'}); setTimeout(()=>process.exit(0),5000)"],
    { detached: true, stdio: 'ignore' })
  holder.unref()
  inShell('sleep 1')                                    // let the grandchild appear before we judge
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
