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
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

export interface Writer { pid: number; purpose: string }

/** The default lock path — one file at the tree root (gitignored: a lock is state, never source). */
export const LOCK_PATH = join(ROOT, '.uuidna-writer.lock')

const alive = (pid: number): boolean => { try { process.kill(pid, 0); return true } catch { return false } }

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
      if (holder) return { ok: false, holder }
      try { unlinkSync(path) } catch { /* raced another reclaim — the retry decides */ }
    }
  }
  return { ok: false, holder: { pid: 0, purpose: 'contended — two acquirers raced twice; run again' } }
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
  } else if (cmd === 'release') {
    console.log(release(process.ppid)
      ? `✓ one-writer — tree released (${purpose})`
      : '· one-writer — not the holder; leaving the live lock alone (releasing another writer IS the interleaving)')
  } else {
    console.error('usage: one-writer.js acquire <purpose> | release <purpose>')
    process.exit(1)
  }
}
