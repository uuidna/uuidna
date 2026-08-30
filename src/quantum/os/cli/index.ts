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

if (process.argv[1]?.endsWith('cli.js') || process.argv[1]?.endsWith('cli.ts')) {
  process.exit(runUuidnaOsCli(process.argv.slice(2)))
}
