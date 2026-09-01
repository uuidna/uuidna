#!/usr/bin/env node
// cli — THE uuidnaOS DOOR (hooks · audit · wave-run). All court logic lives in court.ts + exec court applet.
//   (default)     daily — hex + court + fast QA playbook
//   --court       publish — hex + court
//   --full        daily + uuidna_crypto census
//   --probe       agent sample
//   --quantum-cover  full crypto-related Alpine coverage (Layer 1 + Layer 2)
//   --msg <file>  commit-msg gate (damage · overreach · sign)
import { runCourtCli } from '../court/index.js'
import { testQuantumAlpineCoverage, renderQuantumAlpineCoverage } from '../alpine/index.js'
import { treeCovers } from '../../../gate-receipt-index.js'
import { nodeBuiltin } from '../../../boundary.js'

// ── THE PUSH DOOR'S PROOF ARM LIVES HERE, NOT IN THE COURT, and a browser told me why.
//
// "No push unless all green" (the captain, 2026-09-01) is enforced by checking that gate-receipt.json — written
// only after the guard and the suite pass — still covers this exact tree. I put that check inside runCourtCli,
// which was the wrong floor: the court is SHARED logic that also runs in a tab, and gate-receipt-index reaches
// node:crypto, node:fs, node:child_process and node:path EAGERLY — not because the check needs a host, but
// because of how that module happens to be written. So the import travelled
// exec → court → gate-receipt-index and dropped `path.join` into the browser bundle, where the page died with
// "(0, m_.join) is not a function" and took every ported API on it down.
//
// The CLI is the door the hooks call and nothing else imports it, so the arm sits here for now and the court
// stays runnable anywhere. THIS IS A PLACEMENT, NOT A CEILING (the captain, 2026-09-01: "all runs in uuidnaOS
// without limits"): the receipt check is a hash comparison over bytes, and bytes can be handed in the same way
// primeCatalogue takes the catalogue — inject them and the same check decides in a tab. What blocks it today is
// one module's eager imports, which is a thing to fix rather than a boundary to respect. Deposited as a lead.
//
// Nothing but a browser was ever going to catch the bug itself: tsc was happy, the guard was happy, and the
// deploy would have been happy right up until a visitor loaded the page.
function receiptCoversTree(): { ok: boolean; why: string } {
  const fs = nodeBuiltin<typeof import('node:fs')>('node:fs')
  if (!fs) return { ok: false, why: 'no filesystem on this host — the receipt cannot be read' }
  try {
    const want = JSON.parse(fs.readFileSync(process.cwd() + '/gate-receipt.json', 'utf8')) as { covers?: Record<string, string> }
    const have = treeCovers()
    const moved = Object.keys(have).filter((k) => want.covers?.[k] !== have[k])
    return moved.length
      ? { ok: false, why: `the tree MOVED since it was proven green (${moved.join(', ')}) — the receipt certifies different bytes` }
      : { ok: true, why: 'receipt covers this tree' }
  } catch (e) {
    // an unreadable receipt and a missing one are the same verdict — NOT PROVEN
    return { ok: false, why: `gate-receipt.json unreadable or absent (${e instanceof Error ? e.message : String(e)})` }
  }
}

/** runUuidnaOsCli(argv) → exit code; importable from scripts/tests so support audit reaches this door. */
export function runUuidnaOsCli(argv: readonly string[]): number {
  if (argv.includes('--quantum-cover')) {
    const sandbox = argv.includes('--sandbox')
    const c = testQuantumAlpineCoverage({ sandbox })
    console.log(renderQuantumAlpineCoverage(c))
    return c.complete && (!c.sandbox || c.sandbox.ok) ? 0 : 1
  }
  const code = runCourtCli(argv)
  if (code !== 0) return code
  // --proven is the PUSH door only. The wave phase calls --court mid-arc right after sealing theorems, when the
  // receipt correctly no longer covers a tree the arc just changed; "has this been proven green?" is a question
  // for the moment work LEAVES, never for every court that sits during it.
  if (argv.includes('--proven')) {
    const proven = receiptCoversTree()
    if (!proven.ok) {
      console.error(`\n✗ court — BLOCKED: ${proven.why}`)
      console.error('  FIX npm run guard && npm test   (a green run writes the receipt; the court reads it)')
      return 1
    }
  }
  return 0
}

// THE ENTRY CHECK COMPARES THIS MODULE TO THE ENTRY, not a filename it hopes still matches. It used to read
// `endsWith('cli.js')`, and when cli.ts became cli/index.ts the guard stopped matching its own file: every hook
// runs `node dist/quantum/os/cli/index.js`, which ends in index.js, so the condition was false and the process
// exited 0 having done NOTHING. pre-commit, commit-msg and pre-push all route through here, so three HARD gates
// were passing everything silently — the shell echoed "uuidnaOS court" and no court sat. A gate that cannot fail
// is not a gate, and this one could not even report its absence. Comparing against import.meta.url survives the
// next move, which is the only guarantee worth having: the file may be renamed again, the check may not care.
const isEntry = ((): boolean => {
  const entry = process.argv[1]
  if (!entry) return false
  const norm = (s: string): string => s.replace(/\\/g, '/').replace(/^file:\/\//, '')
  return norm(import.meta.url).endsWith(norm(entry))
})()
if (isEntry) {
  process.exit(runUuidnaOsCli(process.argv.slice(2)))
}
