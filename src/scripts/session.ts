#!/usr/bin/env node
// session — THE ROSTER'S CLI: announce this crew, read who else is working, depart when done. The transport is
// origin (every device has it); the file is a drain path (the janitor carries it); the clock is the ledger's own
// height (no device's wall-clock is consulted or trusted). One word each way — the coordination that took a
// weekend of hand-typed socket relays is now three verbs any session on any machine can speak.
//
//   node dist/scripts/session.js announce "porting the terminal"   → take my line in the roster
//   node dist/scripts/session.js roster                            → who is working, and on what
//   node dist/scripts/session.js depart                            → give my line back
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { hostname } from 'node:os'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { theorems } from '../theorems/index.js'
import { announce, live, stale, depart, sessionHandle, rosterReceipt, DRIFT, type SessionEntry } from '../sessions.js'

const FILE = join(ROOT, 'lean', 'sessions.json')
const out = (cmd: string): string => { try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' }).trim() } catch { return '' } }
const read = (): SessionEntry[] => { try { return existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) as SessionEntry[] : [] } catch { return [] } }
const write = (r: SessionEntry[]): void => writeFileSync(FILE, JSON.stringify(r, null, 2) + '\n')

// THE SESSION'S BIRTH COMMIT identifies it across its life: re-announcing updates one line instead of adding one.
const bornAt = out('git rev-list --max-parents=0 HEAD | head -1').slice(0, 8) + ':' + (process.env.UUIDNA_SESSION ?? String(process.ppid))
const me = (purpose: string): SessionEntry => ({
  handle: sessionHandle(hostname(), purpose, bornAt),
  host: hostname(), purpose,
  head: out('git rev-parse --short HEAD'),
  ledger: theorems().length,
})

const [cmd, ...rest] = process.argv.slice(2)
const purpose = rest.join(' ') || 'working'
const now = theorems().length

if (cmd === 'announce') {
  const entry = me(purpose)
  write(announce(read(), entry))
  console.log(`✓ session — announced ${entry.handle} on ${entry.host} at ledger ${entry.ledger} (${entry.purpose})`)
  console.log('  the roster rides the next landing; every device that fetches origin has it — no socket, no server.')
} else if (cmd === 'depart') {
  const entry = me(purpose)
  write(depart(read(), entry.handle))
  console.log(`✓ session — ${entry.handle} departed; its line is given back rather than left to age out.`)
} else {
  const roster = read()
  const here = live(roster, now), gone = stale(roster, now)
  console.log(`session roster — ledger ${now}; a line is live while the ledger has moved no more than ${DRIFT} past it`)
  for (const e of here) console.log(`  ● ${e.handle}  ${e.host}  @${e.head}  ledger ${e.ledger}  — ${e.purpose}`)
  for (const e of gone) console.log(`  ○ ${e.handle}  ${e.host}  ledger ${e.ledger} (${now - e.ledger} behind) — presumed departed: ${e.purpose}`)
  if (!roster.length) console.log('  (empty — no session has announced yet)')
  console.log(`  receipt ${rosterReceipt(roster)} — two devices holding this receipt hold the same roster.`)
}
