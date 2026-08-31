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

/** runUuidnaOsCli(argv) → exit code; importable from scripts/tests so support audit reaches this door. */
export function runUuidnaOsCli(argv: readonly string[]): number {
  if (argv.includes('--quantum-cover')) {
    const sandbox = argv.includes('--sandbox')
    const c = testQuantumAlpineCoverage({ sandbox })
    console.log(renderQuantumAlpineCoverage(c))
    return c.complete && (!c.sandbox || c.sandbox.ok) ? 0 : 1
  }
  return runCourtCli(argv)
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
