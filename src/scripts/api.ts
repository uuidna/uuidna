// api — THE SCRIPTS' QUANTUM API, declared once. 125 scripts each re-declared the same boilerplate (ROOT
// resolution, file reads, the 16-hex fold, the GAP+FIX reporter); this module is the singularity they all import
// from — standardisation and DRY use of one api, so a script is only its own logic. The `one-receipt dry` finder
// objects (GAP + exact FIX) to any script that re-declares what lives here — the duplication class cannot regrow.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/** the scripts directory (dist/scripts at runtime) — every script lives here, so one HERE serves all */
export const HERE = dirname(fileURLToPath(import.meta.url))
/** the repo root */
export const ROOT = join(HERE, '..', '..')
/** read a repo-relative file as utf8 */
export const rd = (p: string): string => readFileSync(join(ROOT, p), 'utf8')
/** write a repo-relative file */
export const wr = (p: string, s: string): void => writeFileSync(join(ROOT, p), s)
/** does a repo-relative path exist */
export const has = (p: string): boolean => existsSync(join(ROOT, p))
/** read a repo-relative JSON file */
export const jread = <T = unknown>(p: string): T => JSON.parse(rd(p)) as T
/** the 16-hex component fold */
export const h16 = (data: string): string => createHash('sha256').update(data).digest('hex').slice(0, 16)
/** the 32-hex order-invariant fold over named components */
export const foldOf = (entries: Record<string, string>): string =>
  createHash('sha256').update(Object.entries(entries).map(([k, v]) => `${k}:${v}`).sort().join('|')).digest('hex').slice(0, 32)
/** the ℤ/7 ray of a string — the same partition as /rosetta */
export const ray = (s: string): number => parseInt(createHash('sha256').update(s).digest('hex').slice(0, 8), 16) % 7

export type Gap = { what: string; fix: string }
/** the GAP+FIX reporter — every audit finding is an exact computational prompt; exits 1 on any gap */
export function report(name: string, gaps: Gap[], okMessage: string): void {
  if (gaps.length) {
    console.error(`✗ ${name} — ${gaps.length} gap(s), each with its exact fix:`)
    for (const g of gaps) { console.error(`    GAP ${g.what}`); console.error(`    FIX ${g.fix}`) }
    process.exit(1)
  }
  console.log(`✓ ${name} — ${okMessage}`)
}
