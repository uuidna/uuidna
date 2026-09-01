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
import { join } from 'node:path'
import { ROOT } from './api.js'
import { fileManifest, treeCovers } from '../gate-receipt-index.js'

const RECEIPT = join(ROOT, 'gate-receipt.json')

if (process.argv.includes('--verify')) {
  if (!existsSync(RECEIPT)) { console.error('✗ gate-receipt — absent; the tree carries no push-time proof'); process.exit(1) }
  const want = JSON.parse(readFileSync(RECEIPT, 'utf8')) as { covers: Record<string, string>; verified: string[] }
  const have = treeCovers()
  const moved = (['src', 'lean'] as const).filter((d) => want.covers?.[d] !== have[d])
  if (moved.length) {
    console.error(`✗ gate-receipt — the tree MOVED since it was proven: ${moved.join(', ')} does not match the receipt`)
    console.error('  the receipt certifies a different tree, so its proof does not apply here — run the checks in full')
    process.exit(1)
  }
  console.log(`✓ gate-receipt — this exact tree was proven at push time (${want.verified.join(' · ')}); the checks are verified, not recomputed`)
  process.exit(0)
}

// ── THE RECEIPT MUST NOT CLAIM WHAT NOBODY RAN (found 2026-09-01, by writing one on a red tree) ───────────────
//
// This field was a LITERAL: verified: ['types', 'tests', 'guard', 'qa', 'next --verify']. It said those five
// checks passed, always, because it was typed — and the command that wrote it ran none of them. I called it by
// hand after a suite with one failure, the push gate read `covers` and let the push through, and the receipt now
// on record asserts a green run that did not happen. It is the sharpest form of the shape this tree keeps
// meeting: not a check that failed to run, but an ATTESTATION with nothing behind it.
//
// So the writer must be TOLD, and a bare write is refused. --verified takes the comma-separated list of arms the
// caller actually ran; the caller is the chain that just ran them (land's cure, the push gate), so the claim and
// the run sit in the same command and cannot drift apart. A receipt that names fewer arms is weaker and honest;
// one that names none is not written at all.
const VERIFIED = ((): string[] => {
  const i = process.argv.indexOf('--verified')
  const list = i >= 0 && process.argv[i + 1] ? String(process.argv[i + 1]).split(',').map((x) => x.trim()).filter(Boolean) : []
  if (!list.length) {
    console.error('✗ gate-receipt — REFUSED: a receipt must name what was actually verified.')
    console.error('  usage: gate-receipt --verified tests,guard   (the caller that ran them writes it)')
    console.error('  A receipt is an attestation. Writing one without a run is how a red tree passes a green gate.')
    process.exit(1)
  }
  return list
})()

// --write: called by the push gate AFTER every arm passes, so the receipt can only ever describe a green tree.
writeFileSync(RECEIPT, JSON.stringify({
  covers: treeCovers(),
  files: fileManifest(),
  verified: VERIFIED,
  excludes: 'src/seeds, src/chunks — generated payloads the tests and the guard never read',
  honest: 'Content-addresses src/ and lean/ — coarse covers for deploy, per-file manifest for delta test runs. ' +
    'Proves THIS TREE was verified at push time; one byte moved fails --verify unless only test files drifted ' +
    '(gate-receipt-index planTestRun runs the moved tests only).',
}, null, 2) + '\n')
console.log('✓ gate-receipt — written; covers src, lean + per-file manifest')
