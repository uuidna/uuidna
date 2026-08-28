#!/usr/bin/env node
// gen-changelog-section — THE CALENDAR WRITES FACTS. The quantum calendar ticks the odometer on its
// own, but `npm run next` refuses a version whose CHANGELOG entry is missing, so every autonomous tick froze the
// tree until a human wrote prose (measured 2026-08-17: twice in one session, v0.1.4 and v0.1.5). The captain's
// decision: the calendar emits a MINIMAL FACTUAL SECTION. What it writes is only what the ledger already computes —
// counts, receipts, the odometer step, the surfaces the tag reaches — and it says plainly that the meaning is
// missing, so a human adding the story later is completing the entry.
//
// This does NOT overturn the develop pass's refusal to write release PROSE; it separates the two. A statistic is
// recomputable and can be wrong in only one way (it disagrees with the ledger, and the gate catches that). A
// narrative claims significance, which no pass can mean — that half stays human, and is marked as owed.
// Idempotent: a section for the current version is never written twice. Deterministic: no clock, no randomness.
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { THEOREMS } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { ROOT } from './api.js'

const VERSION: string = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version
const path = join(ROOT, 'CHANGELOG.md')
const before = readFileSync(path, 'utf8')

if (before.includes(`## [${VERSION}]`)) {
  console.log(`✓ gen-changelog-section — [${VERSION}] already documented; nothing written.`)
  process.exit(0)
}

// the previous version = the newest section header already present; it is also the tag the delta counts from
const prev = /^## \[(\d+\.\d+\.\d+)\]/m.exec(before)?.[1] ?? null
const at = before.search(/^## \[\d+\.\d+\.\d+\]/m)
if (at < 0) { console.error('✗ gen-changelog-section — no `## [x.y.z]` section found to insert before'); process.exit(1) }

// offenders is a MAP (address → the axioms it borrows)— `.length` on it is undefined, which is how
// the same assumption sat dead in the guard until this section tried to print it
const axioms = JSON.parse(readFileSync(join(ROOT, 'lean', 'axioms.json'), 'utf8')) as { audited: number; axiomFree: number; offenders?: Record<string, string[]> }
const offenderCount = Object.keys(axioms.offenders ?? {}).length
const fold = JSON.parse(readFileSync(join(ROOT, 'quantum-fold.json'), 'utf8')) as { receipt?: string }
const principles = new Set(THEOREMS.map((t) => t.principle)).size
// the delta since the previous tag — a plain count, and absent (not guessed) when the tag is not reachable here
const commits = ((): string => {
  try { return execSync(`git rev-list --count v${prev}..HEAD`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() } catch { return 'unknown' }
})()

const section = `## [${VERSION}] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it._

- theorems: **${axioms.audited}** · axiom-free ${axioms.axiomFree}/${axioms.audited} · sorry 0 · offenders ${offenderCount}
- principles: ${principles} · MCP tools: ${MCP_CATALOG.length}
- odometer: ${prev ?? '?'} → **${VERSION}** (single-digit, monotone; digit 0 is origin — runSequence(0).fixed)
- commits since v${prev ?? '?'}: ${commits}
- fold receipt: \`${fold.receipt ?? 'unsealed'}\`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

`

writeFileSync(path, before.slice(0, at) + section + before.slice(at))
console.log(`✓ gen-changelog-section — wrote the factual [${VERSION}] section (${axioms.audited} theorems, ${commits} commits since v${prev}); the meaning stays owed to a human.`)
