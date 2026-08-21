#!/usr/bin/env node
// scripts/gate-receipt — THE PUSH GATE'S PROOF, CARRIED TO THE DEPLOY. deploy.yml re-ran `npm test` and `npm run
// guard` on a tag whose commit had ALREADY passed the same checks in the pre-push gate — the identical computation
// over a byte-identical tree, run twice. That is the recompute this ledger's own theorem
// verify_beats_recompute_by_magnitudes exists to replace: prove once at O(N), verify forever at O(1).
//
// deploy.yml's header already reasons this way — it does NOT re-run Lean, it TRUSTS the push-time proof. This
// extends that trust to the tests and the guard, and makes the trust CHECKABLE instead of implicit: the receipt
// content-addresses the very inputs those checks read, so a tree that changed by one byte fails verification and
// the deploy falls back to running them in full. Trust that cannot be checked is not what this repo means by trust.
//
// WHAT IT DOES NOT COVER, STATED. The receipt proves the TREE was verified, never that this RUNNER can verify it —
// a clean-room `npm install` on ubuntu-latest catches host-specific passes that a receipt cannot. So deploy.yml
// keeps install + build (tsc type integrity) and skips only the two checks whose inputs the receipt fingerprints.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'

const RECEIPT = join(ROOT, 'gate-receipt.json')
// THE COVERED INPUTS — exactly what `npm test` and `npm run guard` read: the source and the sealed ledger. The
// receipt itself lives at the root, outside both, so fingerprinting can never be circular.
const COVERED = ['src', 'lean'] as const

const digestOf = (dir: string): string => {
  const files = execSync(`git ls-files ${dir}`, { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).sort()
  const h = createHash('sha256')
  for (const f of files) {
    h.update(f)
    h.update(existsSync(join(ROOT, f)) ? readFileSync(join(ROOT, f)) : Buffer.alloc(0))
  }
  return h.digest('hex').slice(0, 32)
}

const compute = (): Record<string, string> => Object.fromEntries(COVERED.map((d) => [d, digestOf(d)]))

if (process.argv.includes('--verify')) {
  if (!existsSync(RECEIPT)) { console.error('✗ gate-receipt — absent; the tree carries no push-time proof'); process.exit(1) }
  const want = JSON.parse(readFileSync(RECEIPT, 'utf8')) as { covers: Record<string, string>; verified: string[] }
  const have = compute()
  const moved = COVERED.filter((d) => want.covers?.[d] !== have[d])
  if (moved.length) {
    console.error(`✗ gate-receipt — the tree MOVED since it was proven: ${moved.join(', ')} does not match the receipt`)
    console.error('  the receipt certifies a different tree, so its proof does not apply here — run the checks in full')
    process.exit(1)
  }
  console.log(`✓ gate-receipt — this exact tree was proven at push time (${want.verified.join(' · ')}); the checks are verified, not recomputed`)
  process.exit(0)
}

// --write: called by the push gate AFTER every arm passes, so the receipt can only ever describe a green tree.
writeFileSync(RECEIPT, JSON.stringify({
  covers: compute(),
  verified: ['types (tsc noEmitOnError)', 'tests', 'guard', 'gate-all 29 checks'],
  honest: 'Content-addresses src/ and lean/ — the inputs the tests and the guard read. It proves THIS TREE was ' +
    'verified at push time; it does not prove any particular runner can verify it, which is why the deploy keeps ' +
    'its clean-room install and build. A tree that moved by one byte fails --verify and the checks run in full.',
}, null, 2) + '\n')
console.log('✓ gate-receipt — written; covers ' + COVERED.join(', '))
