// test-delta — WHICH TESTS MOVED? verify_beats_recompute_by_magnitudes for the Node suite.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './scripts/api.js'
import {
  changedFiles,
  deltaTestFiles,
  fileManifest,
  needsFullSuite,
  treeCovers,
} from './gate-receipt-index.js'

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
  const onlyTests = moved.every((f) => f.startsWith('src/tests/'))
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
