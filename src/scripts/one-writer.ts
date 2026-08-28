#!/usr/bin/env node
// one-writer — THE ONE-WRITER LAW for the shared tree. Two heavy chains (audit, reconcile) regenerating the
// same derived layer at once is the interleaved-writers class that has killed pushes before (the mixed-dist
// self-heal exists BECAUSE of it), and on 2026-08-22 an audit and a peer session's reconcile raced until a
// human-shaped hand stopped one — a manual sensing this lock folds into the machine (manual work is the crack;
// name it, then close it). The law: a heavy writer ACQUIRES the tree before its first write and RELEASES it
// after its last; a second writer is REFUSED LOUDLY with the holder named and the cure printed — coordinate
// over messaging, or wait. Staleness is decided by PID LIVENESS (kill 0), never by a clock: a lock whose
// holder is dead is reclaimed on the next acquire; no Date, no timeout, no guess. The CLI stores the PARENT
// pid (process.ppid), because in an `a && b && c` chain each link is its own short-lived process while the
// shell running the chain lives exactly as long as the work does.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { ROOT, pauseSeconds } from './api.js'
import { childProbe, parentProbe, bornProbe } from '../os/host/index.js'
import { judge, chargeSheet, COVERED, sessionPath, type OpenManifest } from '../dirty-paths.js'

export interface Writer {
  pid: number
  purpose: string
  /** the holder process's start instant, so a REISSUED pid cannot impersonate it. Optional: a lock written by
   *  an older build has none, and is then honoured on liveness alone rather than refused. */
  born?: string
}

/** The default lock path — one file at the tree root (gitignored: a lock is state, never source). */
export const LOCK_PATH = join(ROOT, '.uuidna-writer.lock')

const alive = (pid: number): boolean => { try { process.kill(pid, 0); return true } catch { return false } }

// ── A PID IS A NUMBER THE OS REISSUES, SO IT CANNOT BE AN IDENTITY (2026-08-25) ──────────────────────────────
// `alive()` above answers "does something own this number", which is not the question the lock is asking. The
// question is "is my holder still there". Those differ exactly when a holder crashes and the operating system
// hands its number to an unrelated process: kill(pid, 0) then answers true FOREVER, the lock reads LIVE, and
// stale-reclaim — the one path that exists to release a crashed holder's grip — never fires.
//
// Measured, not supposed. Under five-session load a suite spent 10,123,473 ms inside awaitAcquire on a holder
// that was already dead, granting roughly four extensions to a corpse before failing; the same suite in a quiet
// moment finished in 22,628 ms. A deterministic defect does not vary by 449x. A pid collision under load does.
//
// So the lock now carries what only its true holder could have: the instant that process BEGAN. Two processes may
// share a number; they cannot share a number and a start instant. THIS IS NOT A CLOCK, and the difference is the
// whole reason it is admissible here — the stamp is never compared to now, no duration is computed from it, and
// nothing times out. It is read once, written beside the pid, and afterwards only ever compared for EQUALITY.
const born = new Map<number, string>()
const bornOf = (pid: number): string => {
  const hit = born.get(pid)
  if (hit !== undefined) return hit
  const probe = bornProbe()
  let stamp = ''
  try { stamp = probe.reads(execFileSync(probe.file, probe.args(pid), { encoding: 'utf8', stdio: 'pipe' })) }
  catch { stamp = '' }
  born.set(pid, stamp)
  return stamp
}

/** holds(w) → is THIS writer still the holder? Liveness first because it is free, identity second because it
 *  costs a spawn and only matters when something answers to the number at all.
 *
 *  A lock with no stamp is honoured on liveness alone. That is deliberate: a lock written by an older build is
 *  not evidence of a recycled pid, and refusing it would reclaim a tree from a holder that is genuinely working.
 *  The unstamped case degrades to exactly the previous behaviour and no further. */
const holds = (w: Writer): boolean => {
  if (!alive(w.pid)) return false
  if (!w.born) return true
  return bornOf(w.pid) === w.born
}

// isAncestor(holder, pid) → walk pid's ppid chain (the host's own process table, macOS has no /proc) until init;
// the holder passing its OWN descendants is lead 91's reentrancy: land holds the tree, land's reconcile child may
// write — a stranger still may not. Deterministic, clockless; a probe that answers nothing reads as "not an
// ancestor" (refuse, never guess).
//
// THE WALK ASKS THE HOST (os/host parentProbe), it does not assume one. This was `ps -o ppid= -p`, and `-o` is
// procps rather than POSIX ps: the ps in Git for Windows answers `unknown option -- o`, the catch read that
// missing FLAG as a real "not an ancestor", and lead 91's reentrancy was silently un-made on this host — the
// holder's own children refused the tree they already held. Third time in this file for one shape (pgrep -P,
// then `sleep`, now this), which is why the cure is the same one: name the instrument in the driver.
// A PROCESS'S OWN ANCESTRY IS FIXED, SO IT IS WALKED ONCE (2026-08-24, caught by its own suite). The walk costs
// one SPAWN PER HOP, and acquire() calls it on every refusal — so awaitAcquire, which polls acquire() up to
// MAX_POLLS times, made it a spawn per hop PER POLL: 32 hops × 1000 polls of PowerShell start-up. The one-writer
// suite went from ~12 seconds to over seven minutes and the regression was MINE, introduced by fixing the flag.
// The old `ps -o` hid it perfectly: it threw on the first hop, so the loop cost one failed spawn and returned
// false. A broken instrument is cheap precisely because it does no work — repairing it is what revealed the price.
//
// Nothing about this pid's ancestors can change while this process runs (a parent that dies leaves the chain
// stale, and a stale ancestor is a DEAD one — which currentWriter already rejects by liveness before we are ever
// asked). So the chain is a constant of the process, and a constant is computed once.
const ancestry = new Map<number, readonly number[]>()

const ancestorsOf = (pid: number): readonly number[] => {
  const cached = ancestry.get(pid)
  if (cached) return cached
  const probe = parentProbe()
  const chain: number[] = []
  let p = pid
  for (let hop = 0; hop < 32 && p > 1; hop++) {
    chain.push(p)
    let next = 0
    try { next = probe.reads(execFileSync(probe.file, probe.args(p), { encoding: 'utf8', stdio: 'pipe' })) }
    catch { next = 0 }
    // no answer ends the walk exactly where the old catch ended it — the members checked are the same, so the
    // verdict is the same: a holder not found among them is not an ancestor, and we refuse rather than guess
    if (next === 0) { p = 0; break }
    p = next
  }
  chain.push(p)
  ancestry.set(pid, chain)
  return chain
}

const isAncestor = (holder: number, pid: number): boolean =>
  // the trivial ancestor answers before any spawn — the holder writing under its own lock is the common case,
  // and it must not pay for a process-table walk to learn what it already knows
  holder === pid || ancestorsOf(pid).includes(holder)

/** currentWriter(path) → the LIVE holder, or null (no lock, unreadable lock, or a holder whose pid is dead —
 *  a dead holder is stale by definition, whatever the file says). */
export function currentWriter(path = LOCK_PATH): Writer | null {
  try {
    const w = JSON.parse(readFileSync(path, 'utf8')) as Writer
    return Number.isInteger(w.pid) && holds(w) ? w : null
  } catch { return null }
}

/** acquire(purpose, pid, path) → take the tree for ONE writer. Atomic-exclusive create (flag wx) so two
 *  simultaneous acquirers cannot both win; a stale lock (dead holder) is reclaimed and retried once. On
 *  refusal the LIVE holder rides the result so the caller can name it. */
export function acquire(purpose: string, pid: number, path = LOCK_PATH): { ok: true } | { ok: false; holder: Writer } {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      writeFileSync(path, JSON.stringify({ pid, purpose, born: bornOf(pid) }), { flag: 'wx' })
      return { ok: true }
    } catch {
      const holder = currentWriter(path)
      if (holder) {
        // lead 91's reentrancy: the holder's own descendant passes (the lock stays the ANCESTOR's — nothing
        // is rewritten, and the child's release is refused by the holder check, so the parent still lets go)
        if (isAncestor(holder.pid, pid)) return { ok: true }
        return { ok: false, holder }
      }
      try { unlinkSync(path) } catch { /* raced another reclaim — the retry decides */ }
    }
  }
  return { ok: false, holder: { pid: 0, purpose: 'contended — two acquirers raced twice; run again' } }
}

// ── THE WAIT, FOLDED IN (2026-08-24: the crack this lock still left open). acquire() REFUSES and names the
// holder — correct, and every session that met the refusal then hand-wrote the same shell:
// `while kill -0 <pid>; do sleep 10; done`. Seven sessions, seven copies, one law: a queue that every caller
// re-invents is a queue the machine owes them. awaitAcquire polls the same acquire() — so reentrancy, stale
// reclaim and atomicity are inherited, not re-implemented — and the poll is a SUBPROCESS sleep, never a clock:
// staleness is still decided by pid liveness alone.
// the poll waits through the HOST's shell (api.pauseSeconds): `sleep` is a program on a POSIX host and nothing
// at all on Windows, where execSync reached cmd.exe and the wait threw instead of waiting — the control test that
// proves a working holder EARNS an extension died on its own instrument rather than on the property.
const POLL_SECONDS = 2
/** the ceiling is a FINDING, not a queue: a writer that has stopped WORKING must be named to a human rather
 *  than waited on forever. Reaching this count is not itself the finding — see awaitAcquire, which asks
 *  working() before it refuses. Elapsed polls open the question; the process table answers it. */
export const MAX_POLLS = 1000

/** how many times a still-WORKING holder may extend past the ceiling before it is named anyway. Bounded on
 *  purpose: "wait forever while a child exists" is not a queue either — a runner wedged on a child that itself
 *  never finishes would hold the tree silently and no caller would ever return. Each extension announces. */
export const MAX_EXTENSIONS = 6

/** working(pid) → does this holder have a LIVE CHILD? (queue lead 123: the ceiling was a CLOCK, and a clock
 *  cannot tell busy from stuck — a legitimate land round runs develop, lean, tsc and a full gate, so a holder
 *  can be forty minutes old and perfectly busy. Proven live 2026-08-24: a holder the ceiling called STUCK had
 *  `npm run lean` and `tsc` running as its children, mid-cure. Children are the WORK made observable; time is
 *  data, never a verdict.) No child means nothing is running under it — the honest stuck signal. */
export function working(pid: number): boolean {
  // THE PROBE IS THE HOST'S, NOT ONE HOST'S (os/host). This asked `pgrep -P` everywhere; where pgrep does not
  // exist the catch read the missing PROGRAM exactly as it reads a real "no children", so every holder answered
  // not-working and the stuck signal fired on precisely the busy landings it exists to protect. A verdict that
  // cannot distinguish "no children" from "no instrument" is not a verdict.
  const probe = childProbe()
  try {
    return probe.reads(execFileSync(probe.file, probe.args(pid), { encoding: 'utf8', stdio: 'pipe' }), 0)
  } catch (e) {
    // A nonzero exit is still an ANSWER for a probe that says "none" that way (pgrep does), so its own stdout is
    // read rather than discarded. Only a probe that produced nothing at all falls through to false.
    return probe.reads(String((e as { stdout?: string }).stdout ?? ''), 1)
  }
}

export function awaitAcquire(
  purpose: string,
  pid: number,
  path = LOCK_PATH,
  announce: (holder: Writer) => void = () => {},
  maxPolls = MAX_POLLS,   // injectable ONLY so the control test can reach the refusal without waiting it out
  onExtend: (holder: Writer, extension: number) => void = () => {},
): { ok: true; polls: number } | { ok: false; holder: Writer; polls: number; extensions: number } {
  // THE CEILING ASKS THE PROCESS TABLE BEFORE IT ACCUSES (2026-08-24). working() existed and only shaped the
  // CLI's wording; the VERDICT was still `polls >= maxPolls`, so elapsed time alone convicted. It misfired live
  // that same day: a deposit here declared pid 83657 STUCK after 1000 polls while that land was running
  // `npm run next:full` on release — busy the entire time, and the hook's own comment budgets under 60s for push
  // a gate across up to four rounds. A count cannot tell busy from stuck; a live child can. So the count now
  // only opens the question, and a holder still working EXTENDS instead of being accused.
  let extensions = 0
  for (let polls = 0; ; polls++) {
    const r = acquire(purpose, pid, path)
    if (r.ok) return { ok: true, polls }
    if (polls === 0) announce(r.holder)
    if (polls >= maxPolls) {
      // not working = nothing is running under it = the honest stuck signal, and the refusal it always was
      if (!working(r.holder.pid) || extensions >= MAX_EXTENSIONS) return { ok: false, holder: r.holder, polls, extensions }
      extensions++
      onExtend(r.holder, extensions)
      polls = 0   // it is working; the clock it outran was never the evidence
    }
    pauseSeconds(POLL_SECONDS)
  }
}

/** release(pid, path) → let the tree go — only the holder (or a dead lock) releases; releasing someone
 *  else's LIVE lock is exactly the interleaving the law exists to stop, so it is refused. */
export function release(pid: number, path = LOCK_PATH): boolean {
  const holder = currentWriter(path)
  if (holder && holder.pid !== pid) return false
  try { unlinkSync(path) } catch { /* already gone — released is released */ }
  return true
}

// ── CLI — the audit/reconcile chains speak these two words; the shell's own pid is the holder ────────────────
const isMain = process.argv[1]?.endsWith('one-writer.js') ?? false
if (isMain) {
  const [cmd, purpose = 'write'] = process.argv.slice(2)
  if (cmd === 'acquire') {
    const r = acquire(purpose, process.ppid)
    if (!r.ok) {
      console.error(`✗ one-writer — the tree is HELD by pid ${r.holder.pid} (${r.holder.purpose}); a second ${purpose} would interleave the derived layer.`)
      console.error('  CURE: wait for the holder to finish (the lock lifts itself — a dead holder is reclaimed automatically), or coordinate over messaging. Never delete the lock of a live pid.')
      process.exit(1)
    }
    console.log(`✓ one-writer — tree acquired for ${purpose} (holder pid ${process.ppid}; stale-proof by pid liveness, no clock)`)
  } else if (cmd === 'await') {
    // the QUEUE the callers were writing by hand — one word instead of a shell loop each
    const r = awaitAcquire(purpose, process.ppid, LOCK_PATH, (h) =>
      console.error(`· one-writer — the tree is HELD by pid ${h.pid} (${h.purpose}); WAITING (polling liveness, no clock — the lock lifts itself when the holder ends)`))
    if (!r.ok) {
      console.error(working(r.holder.pid)
        ? `✗ one-writer — pid ${r.holder.pid} (${r.holder.purpose}) still holds the tree after ${r.polls} polls and ${r.extensions} extension(s), and it IS WORKING (live children under it). Busy, not stuck — this refusal is the EXTENSION BUDGET running out, never the clock: wait longer or coordinate, do NOT end it.`
        : `✗ one-writer — pid ${r.holder.pid} (${r.holder.purpose}) still holds the tree after ${r.polls} polls (${r.extensions} extension(s)) with NO live child: nothing is running under it, which is the honest stuck signal. Name it to a human, or end it knowingly. Never delete a live pid's lock.`)
      process.exit(1)
    }
    console.log(`✓ one-writer — tree acquired for ${purpose} after ${r.polls} poll(s) (holder pid ${process.ppid})`)
  } else if (cmd === 'release') {
    console.log(release(process.ppid)
      ? `✓ one-writer — tree released (${purpose})`
      : '· one-writer — not the holder; leaving the live lock alone (releasing another writer IS the interleaving)')
  } else if (cmd === 'open') {
    // ── THE SAME LAW ONE SCOPE IN. The lock answers "who holds the TREE"; these two answer "whose is this FILE".
    // They live here rather than in a script of their own for the reason a peer put plainly: a new top-level
    // script needs wiring, and its three doors are a package.json entry the scripts law refuses as a thin
    // wrapper, a 33rd line on a list whose own header says it MAY ONLY SHRINK, or a chain step that always
    // exits 0 — which is an instrument that cannot fail, the exact thing this tree spent the day removing.
    // A verb on an already-wired dispatcher needs none of the three, and this dispatcher already owns the
    // subject: it is the shared-checkout coordination tool, and this is shared-checkout coordination.
    const sid = process.env.UUIDNA_SESSION ?? ''
    if (!sid) {
      console.error('✗ one-writer open — no UUIDNA_SESSION, so this session cannot name itself and a manifest')
      console.error('  written now could not be found again. Refusing rather than writing one nobody can read.')
      // The placeholder names the session plainly instead of opening with the two characters that begin an anchor
      // tag: the markup guard reads those as an element and demands a closing tag a shell usage placeholder will
      // never have. Use versus mention, in a string that is prose to a human and markup to a scanner.
      //
      // THIS NOTE IS DELIBERATELY WRITTEN WITHOUT THE OFFENDING SPELLINGS, and the first draft was not. It
      // explained the class by quoting the host's maximum intrinsic by name — and the determinism scan, which
      // bans that token in prose as firmly as in code, refused the commit. A comment about a finder tripping the
      // finder it was explaining, which is the same trap gate-all.ts records falling into and climbing out of the
      // same way. The rule the tree already states: if a token is banned, it is banned in prose too.
      console.error('  FIX export UUIDNA_SESSION=<session-name>, then open again.')
      process.exit(1)
    }
    const m = openSession(sid)
    console.log(`✓ one-writer open — session ${sid} found ${m.dirtyAtOpen.length} path(s) already dirty at HEAD ${m.head.slice(0, 8)}`)
    console.log('  a path outside what this scan covered reads UNKNOWN, which is NOT the same as clean')
  } else if (cmd === 'mine') {
    const rest = process.argv.slice(3)
    const cut = rest.indexOf('--also')
    const paths = (cut === -1 ? rest : rest.slice(0, cut)).filter(Boolean)
    const allowed = cut === -1 ? [] : rest.slice(cut + 1).filter((a) => a !== '--also')
    if (!paths.length) {
      console.error('usage: one-writer.js mine <path>… [--also <path>…]')
      process.exit(1)
    }
    const { verdicts, ok, blocking } = judge(paths, readSession(process.env.UUIDNA_SESSION ?? ''), allowed)
    for (const v of verdicts) console.log(`  ${v.ownership.padEnd(8)} ${v.path}`)
    if (ok) {
      console.log(`✓ one-writer mine — ${verdicts.length} path(s), none carrying work this session did not start`)
    } else {
      console.error(`\n✗ one-writer mine — ${blocking.length} path(s) carry work this session did not start:\n`)
      for (const line of chargeSheet(blocking)) console.error(line)
      console.error('\n  A file is not a unit of authorship when several sessions share one checkout, and')
      console.error('  `git commit -- <path>` takes the whole file\'s WORKING TREE, not just your hunks.')
      process.exit(1)
    }
  } else {
    console.error('usage: one-writer.js acquire <purpose> | await <purpose> | release <purpose>')
    console.error('       one-writer.js open                      record what this session found on arrival')
    console.error('       one-writer.js mine <path>… [--also …]   whose work is in these paths')
    process.exit(1)
  }
}

// ── THE SESSION MANIFEST — the host side of src/dirty-paths.ts, which stays pure so it can be tested without a
// git checkout. Reading and writing live here for the same reason acquire() lives here rather than in a library:
// spawning is the scripts boundary's job, and the law it enforces is the library's.
export function openSession(sid: string): OpenManifest {
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' }).trim()
  // tracked modifications AND untracked files: a peer's half-written NEW file is exactly as much theirs as a
  // peer's edit to an existing one, and the sweep that caused this took both kinds
  const dirtyAtOpen = execFileSync('git', ['status', '--porcelain', '-z', '--untracked-files=all'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' })
    .split('\0').filter(Boolean).map((e) => e.slice(3)).filter(Boolean)
  const manifest: OpenManifest = { dirtyAtOpen, covered: [...COVERED], head }
  const p = sessionPath(ROOT, sid)
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, JSON.stringify(manifest, null, 2) + '\n')
  return manifest
}

/** null when there is no manifest, and null means UNKNOWN rather than clean — see the three-answers note in
 *  src/dirty-paths.ts. An unreadable manifest is the same: it cannot speak, so it does not. */
export function readSession(sid: string): OpenManifest | null {
  if (!sid) return null
  try { return JSON.parse(readFileSync(sessionPath(ROOT, sid), 'utf8')) as OpenManifest } catch { return null }
}
