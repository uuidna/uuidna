#!/usr/bin/env node
// cli — THE uuidnaOS DOOR (hooks · audit · wave-run). All court logic lives in court.ts + exec court applet.
//   (default)     daily — hex + court + fast QA playbook
//   --court       publish — hex + court
//   --full        daily + uuidna_crypto census
//   --probe       agent sample
//   --quantum-cover  full crypto-related Alpine coverage (Layer 1 + Layer 2)
//   --msg <file>  commit-msg gate (damage · overreach · sign)
import { runCourtCli } from './court.js'
import { testQuantumAlpineCoverage, renderQuantumAlpineCoverage } from './quantum-alpine.js'

if (process.argv.includes('--quantum-cover')) {
  const sandbox = process.argv.includes('--sandbox')
  const c = testQuantumAlpineCoverage({ sandbox })
  console.log(renderQuantumAlpineCoverage(c))
  process.exit(c.complete && (!c.sandbox || c.sandbox.ok) ? 0 : 1)
}

process.exit(runCourtCli(process.argv.slice(2)))
