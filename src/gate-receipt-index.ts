// gate-receipt-index — FILE-LEVEL FINGERPRINTS for verify-don't-recompute (verify_beats_recompute_by_magnitudes).
// Coarse src/lean digests gate deploy; per-file manifest lets green run only the tests whose inputs moved.
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './scripts/api.js'

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

export function testDistForSource(srcPath: string): string | null {
  const m = srcPath.match(/^src\/tests\/(.+)\.ts$/)
  if (!m) return null
  const base = m[1]!.endsWith('.test') ? m[1]! : `${m[1]}.test`
  return `dist/tests/${base}.js`
}

/** deltaTestFiles(changed) → dist test paths to rerun when only non-critical src moved. */
export function deltaTestFiles(changed: readonly string[]): string[] {
  const tests = new Set<string>()
  for (const f of changed) {
    const direct = testDistForSource(f)
    if (direct) tests.add(direct)
    if (f.startsWith('src/') && !f.startsWith('src/tests/')) {
      const base = f.replace(/^src\//, '').replace(/\.ts$/, '')
      tests.add(`dist/tests/${base}.test.js`)
    }
  }
  return [...tests].filter((t) => existsSync(join(ROOT, t))).sort()
}
