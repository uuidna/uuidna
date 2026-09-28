// receipted — THE DOOR SIDE OF A RECEIPT: the filesystem store, and the two things every census door depends on.
//
// Kept separate from src/receipt.ts so the rule stays pure and testable while the reading and writing sit at the
// boundary — the same split leads-gate states for itself, "spawning and file reading are the boundary's job, the law is
// the library's".

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import type { ReceiptStore } from '../receipt.js'

export const fsStore: ReceiptStore = {
  read: (path) => {
    const full = join(ROOT, path)
    return existsSync(full) ? readFileSync(full, 'utf8') : null
  },
  write: (path, body) => { writeFileSync(join(ROOT, path), body) },
}

/**
 * What a census door's answer depends on: the LEDGER it reads and the RULE that reads it.
 *
 * The ledger part is the content of src/theorems/generated.ts, which is the single source every census walks. Hashing
 * forty megabytes costs about a tenth of a second, against walks measured in minutes, so the trade is not close.
 *
 * The rule part is the door's own compiled source plus any library modules named — and it is NOT optional. A receipt
 * keyed on the ledger alone would serve a stale answer after a corrected rule, which is precisely the defect
 * audit-citations was measured committing on 2026-09-03: cache hit, publications unmoved, scan corrected, wrong answer
 * served. Every caller lists the modules whose logic it depends on.
 */
export function ledgerAndRule(ruleFiles: readonly string[]): string[] {
  const parts: string[] = []
  const ledger = join(ROOT, 'src', 'theorems', 'generated.ts')
  parts.push(existsSync(ledger) ? readFileSync(ledger, 'utf8') : '')
  for (const f of ruleFiles) {
    const full = join(ROOT, f)
    parts.push(existsSync(full) ? readFileSync(full, 'utf8') : '')
  }
  return parts
}
