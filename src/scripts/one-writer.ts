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
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

export interface Writer { pid: number; purpose: string }

/** The default lock path — one file at the tree root (gitignored: a lock is state, never source). */
export const LOCK_PATH = join(ROOT, '.uuidna-writer.lock')

const alive = (pid: number): boolean => { try { process.kill(pid, 0); return true } catch { return false } }

// isAncestor(holder, pid) → walk pid's ppid chain (ps, macOS has no /proc) until init; the holder passing its
// OWN descendants is lead 91's reentrancy: land holds the tree, land's reconcile child may write — a stranger
// still may not. Deterministic, clockless; a failed ps reads as "not an ancestor" (refuse, never guess).
const isAncestor = (holder: number, pid: number): boolean => {
  let p = pid
  for (let hop = 0; hop < 32 && p > 1; hop++) {
    if (p === holder) return true
    try { p = Number(execSync(`ps -o ppid= -p ${p}`, { encoding: 'utf8' }).trim()) || 0 } catch { return false }
  }
  return p === holder
}

/** currentWriter(path) → the LIVE holder, or null (no lock, unreadable lock, or a holder whose pid is dead —
 *  a dead holder is stale by definition, whatever the file says). */
export function currentWriter(path = LOCK_PATH): Writer | null {
  try {
    const w = JSON.parse(readFileSync(path, 'utf8')) as Writer
    return Number.isInteger(w.pid) && alive(w.pid) ? w : null
  } catch { return null }
}

/** acquire(purpose, pid, path) → take the tree for ONE writer. Atomic-exclusive create (flag wx) so two
 *  simultaneous acquirers cannot both win; a stale lock (dead holder) is reclaimed and retried once. On
 *  refusal the LIVE holder rides the result so the caller can name it. */
export function acquire(purpose: string, pid: number, path = LOCK_PATH): { ok: true } | { ok: false; holder: Writer } {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      writeFileSync(path, JSON.stringify({ pid, purpose }), { flag: 'wx' })
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
const POLL = 'sleep 2'
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
  try { return execSync(`pgrep -P ${pid}`, { encoding: 'utf8', stdio: 'pipe' }).trim().length > 0 }
  catch { return false }   // pgrep exits nonzero when there are no children — that IS the answer
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
  // `npm run next` in its pre-push hook — busy the entire time, and the hook's own comment budgets four minutes
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
    execSync(POLL)
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
  } else {
    console.error('usage: one-writer.js acquire <purpose> | release <purpose>')
    process.exit(1)
  }
}
