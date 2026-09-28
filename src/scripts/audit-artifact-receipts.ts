#!/usr/bin/env node
// audit-artifact-receipts — EVERY DERIVED ARTIFACT CARRIES A CROSS, OR IT IS AN ARRAY NOBODY CAN CHECK.
//
// The captain, 2026-09-28: "why arrays and hashes are not result of cross formulas?!? formulate all!" then "no manual
// work whatsoever. all is possible in uuidna qpu os".
//
// MEASURED THE DAY THIS WAS WRITTEN: 19 of 327 files in lean/ carried a receipt. The other 308 are enumerations — a
// reader holding one has nothing to compare it to, and a writer that quietly dropped a row would leave no trace. That
// is not a documentation gap, it is the difference between a record and a claim.
//
// WHY A FINDER AND NOT 308 EDITS. Hand-stamping the artifacts would fix today and schedule tomorrow: the next generator
// would write the 309th without a receipt, because nothing would ask. So the stamp lives in the write door
// (src/artifact.ts, wrArtifact) and this finder asks the question on every gate pass. What it reports is the DEBT, and
// the debt is a ratchet: it may only shrink, which converts "remember to seal it" into "the gate will not let it grow".
//
// TWO QUESTIONS, NEVER ONE. A file may lack a receipt, or carry one that no longer recomputes — and those are
// different faults with different cures. A missing receipt is a writer that has not moved to the door yet. A STALE
// receipt is worse: it is an artifact whose content changed under an address that still claims to cover it, which is
// precisely the lie a receipt exists to refuse BY CONSTRUCTION, since a receipt that matched a changed input would not be a receipt. Stale is therefore never folded into missing, and a stale one
// FAILS rather than counting against the ratchet.
//
// AND A FILE THAT CANNOT BE PARSED IS UNMEASURED, never clean — the third answer this tree has paid for twice.
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, wrRoot, rdRoot } from '../boundary.js'
import { sealOf } from '../artifact.js'

/** read, or null — a file that could not be read is UNMEASURED and must never reach the clean count */
const readOrNull = (rel: string): string | null => { try { return rdRoot(rel) } catch { return null } }

const LEAN = join(ROOT, 'lean')

export interface ArtifactRow { file: string; state: 'sealed' | 'missing' | 'STALE' | 'UNMEASURED'; why?: string }

/** every lean/*.json, judged. Exported so the test can hand it a controlled set instead of the live tree. */
export function judgeArtifacts(files: readonly string[]): ArtifactRow[] {
  const rows: ArtifactRow[] = []
  for (const file of files) {
    const raw = readOrNull('lean/' + file)
    if (raw === null) { rows.push({ file, state: 'UNMEASURED', why: 'could not be read' }); continue }
    let held: unknown
    try { held = JSON.parse(raw) } catch (e) { rows.push({ file, state: 'UNMEASURED', why: 'not JSON: ' + String(e).slice(0, 80) }); continue }
    if (held === null || typeof held !== 'object' || Array.isArray(held)) {
      // a top-level array or scalar has nowhere to carry a seal; that is a shape fact, not a missing receipt
      rows.push({ file, state: 'UNMEASURED', why: 'top level is not an object, so it has nowhere to carry a seal' })
      continue
    }
    const o = held as Record<string, unknown>
    if (typeof o.receipt !== 'string') { rows.push({ file, state: 'missing' }); continue }
    const fresh = sealOf(o)
    if (fresh.receipt !== o.receipt) {
      rows.push({ file, state: 'STALE', why: `carries ${String(o.receipt).slice(0, 12)} but its own content folds to ${fresh.receipt.slice(0, 12)}` })
      continue
    }
    rows.push({ file, state: 'sealed' })
  }
  return rows
}

export const leanArtifacts = (): string[] => readdirSync(LEAN).filter((f) => f.endsWith('.json')).sort()

if (process.argv[1]?.endsWith('audit-artifact-receipts.js')) {
  const files = leanArtifacts()
  const rows = judgeArtifacts(files)
  const by = (s: ArtifactRow['state']): ArtifactRow[] => rows.filter((r) => r.state === s)
  const sealed = by('sealed'), missing = by('missing'), stale = by('STALE'), unmeasured = by('UNMEASURED')

  console.log(`audit-artifact-receipts — ${files.length} artifact(s) in lean/: ${sealed.length} sealed, ${missing.length} unsealed, ${stale.length} STALE, ${unmeasured.length} unmeasured`)
  for (const r of stale) console.log(`  ✗ STALE       ${r.file} — ${r.why}`)
  for (const r of unmeasured) console.log(`  ?             ${r.file} — ${r.why}`)
  if (missing.length > 0) console.log(`  · unsealed    ${missing.slice(0, 8).map((r) => r.file).join(', ')}${missing.length > 8 ? ` … and ${missing.length - 8} more` : ''}`)

  const held = (() => {
    const raw = readOrNull('lean/artifact-receipts.json')
    if (raw === null) return null
    try { return JSON.parse(raw) as { unsealed?: number } } catch { return null }
  })()

  wrRoot('lean/artifact-receipts.json', JSON.stringify({
    kind: 'artifact-receipts',
    why: 'Every derived artifact should carry a cross: a content address its own leaves fold to, by two routes that '
      + 'must agree (src/crossfold.ts), stamped by the one write door (src/artifact.ts) rather than by each writer. '
      + 'An artifact without one is an array a reader can compare to nothing. UNSEALED is a debt and may only shrink; '
      + 'STALE is a fault and fails now, because an address that no longer covers its content is worse than none.',
    artifacts: files.length,
    sealed: sealed.length,
    unsealed: missing.length,
    stale: stale.length,
    unmeasured: unmeasured.length,
    staleRows: stale,
    unmeasuredRows: unmeasured,
    fix: 'write it through wrArtifact(path, value) from src/artifact.ts instead of writeFileSync or a bare wrRoot — '
      + 'the seal is then computed from what was actually written, and no writer has to remember it.',
  }, null, 1) + '\n')

  const rose = held !== null && typeof held.unsealed === 'number' && missing.length > held.unsealed
  if (rose) console.error(`\n✗ audit-artifact-receipts — the unsealed debt ROSE from ${held.unsealed} to ${missing.length}: a new artifact was written without going through the door`)
  else if (held !== null && typeof held.unsealed === 'number' && missing.length < held.unsealed) console.log(`\n✓ audit-artifact-receipts — unsealed fell from ${held.unsealed} to ${missing.length}`)
  if (stale.length > 0) console.error(`✗ audit-artifact-receipts — ${stale.length} artifact(s) carry an address their content no longer folds to`)
  process.exit(rose || stale.length > 0 ? 1 : 0)
}
