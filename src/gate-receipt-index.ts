// gate-receipt-index — FILE-LEVEL FINGERPRINTS for verify-don't-recompute (verify_beats_recompute_by_magnitudes).
// Coarse src/lean digests gate deploy; per-file manifest lets green run only the tests whose inputs moved.
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './scripts/api.js'
import { deltaTestFiles, isTestSource } from './test-paths.js'

export { deltaTestFiles } from './test-paths.js'

export const COVERED = ['src', 'lean'] as const
export const EXCLUDED = /^src\/(seeds|chunks)\//

/** Paths whose change forces the full suite — ledger, served surface, or fold invariants. */
export const FULL_SUITE_PREFIXES = [
  'lean/',
  'src/theorems/',
  'src/mcp.ts',
  'src/mcp-http.ts',
  'src/guard',
  'src/index.ts',
  'src/gate-engine.ts',
  'src/hexbit/',
  'src/crypt.ts',
  'src/wave-deposit.ts',
] as const

export const listCoveredFiles = (root: string = ROOT): string[] =>
  COVERED.flatMap((dir) =>
    execSync(`git ls-files ${dir}`, { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .filter((f) => !EXCLUDED.test(f)),
  ).sort()

const digestFile = (root: string, rel: string): string => {
  const h = createHash('sha256')
  h.update(rel)
  h.update(existsSync(join(root, rel)) ? readFileSync(join(root, rel)) : Buffer.alloc(0))
  return h.digest('hex').slice(0, 16)
}

/** fileManifest() → every covered path → content digest (order-invariant map). */
export function fileManifest(root: string = ROOT): Record<string, string> {
  const out: Record<string, string> = {}
  for (const f of listCoveredFiles(root)) out[f] = digestFile(root, f)
  return out
}

/** treeCovers() → coarse src/ and lean/ digests (deploy gate). */
export function treeCovers(root: string = ROOT): Record<string, string> {
  const files = listCoveredFiles(root)
  const out: Record<string, string> = {}
  for (const dir of COVERED) {
    const h = createHash('sha256')
    for (const f of files.filter((p) => p.startsWith(dir + '/'))) {
      h.update(f)
      h.update(digestFile(root, f))
    }
    out[dir] = h.digest('hex').slice(0, 32)
  }
  return out
}

/** changedFiles(want, have) → paths that moved between two manifests. */
export function changedFiles(want: Record<string, string>, have: Record<string, string>): string[] {
  const keys = new Set([...Object.keys(want), ...Object.keys(have)])
  return [...keys].filter((k) => want[k] !== have[k]).sort()
}

export function needsFullSuite(changed: readonly string[]): boolean {
  return changed.some((f) => FULL_SUITE_PREFIXES.some((p) => f.startsWith(p)))
}

export type TestRunPlan =
  | { mode: 'skip'; why: string }
  | { mode: 'full'; why: string }
  | { mode: 'delta'; files: string[]; why: string }

const RECEIPT = join(ROOT, 'gate-receipt.json')

/** planTestRun() → skip (O(1)), delta (subset), or full suite. Pure over disk + gate-receipt.json. */
export function planTestRun(root: string = ROOT): TestRunPlan {
  if (!existsSync(RECEIPT)) {
    return { mode: 'full', why: 'gate-receipt absent — no push-time proof to verify' }
  }
  const want = JSON.parse(readFileSync(RECEIPT, 'utf8')) as {
    covers?: Record<string, string>
    files?: Record<string, string>
  }
  const haveCovers = treeCovers(root)
  if (want.covers?.src === haveCovers.src && want.covers?.lean === haveCovers.lean) {
    return { mode: 'skip', why: 'gate-receipt covers this tree — verified O(1), suite not recomputed' }
  }
  const haveFiles = fileManifest(root)
  const prior = want.files ?? {}
  if (!Object.keys(prior).length) {
    return { mode: 'full', why: 'gate-receipt has no per-file manifest — re-prove once to enable delta runs' }
  }
  const moved = changedFiles(prior, haveFiles)
  if (!moved.length) {
    return { mode: 'skip', why: 'per-file manifest matches — coarse digest drift without file drift' }
  }
  if (needsFullSuite(moved)) {
    return { mode: 'full', why: `ledger or served surface moved (${moved.slice(0, 4).join(', ')}${moved.length > 4 ? '…' : ''})` }
  }
  const onlyTests = moved.every((f) => isTestSource(f))
  if (!onlyTests) {
    return { mode: 'full', why: `non-test src moved (${moved.slice(0, 4).join(', ')}${moved.length > 4 ? '…' : ''})` }
  }
  const files = deltaTestFiles(moved)
  if (!files.length) {
    return { mode: 'full', why: 'test sources moved but no dist test files resolved' }
  }
  return {
    mode: 'delta',
    files,
    why: `${files.length} test file(s) for ${moved.length} changed path(s)`,
  }
}
