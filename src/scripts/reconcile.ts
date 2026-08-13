#!/usr/bin/env node
// reconcile — regenerate the WHOLE derived layer to match the current Lean source, sync the heartbeats, then commit
// and push. The one command that gets a ledger change past the pre-push readiness gate: the gate git-diffs
// generated.ts, PRINCIPLE.md, CHANGELOG.md, docs/mcp.md, audit-citations.json and lean/, so every one must be
// regenerated first or the push is blocked. Add a domain (a lean-<x>.ts generator or a hand-written .lean), then:
//
//   npm run reconcile                       → default commit message
//   npm run reconcile "Add the nim domain"  → your own message
//
// Nothing is committed if the reconcile leaves the tree unchanged (the derived layer already matched). account.js
// fails loudly if the ledger does not reconcile, aborting before any commit/push. Integrity, not truth.
import { execSync } from 'node:child_process'

const run = (cmd: string): void => { console.log('  · ' + cmd); execSync(cmd, { stdio: 'inherit' }) }
const out = (cmd: string): string => execSync(cmd).toString().trim()
const msg = process.argv.slice(2).join(' ') || 'Reconcile: regenerate the derived layer + sync heartbeats to the ledger'

console.log('reconcile — regenerating the derived layer to match the Lean source …')
run('npm run lean')                                   // generated.ts + PRINCIPLE.md + CHANGELOG — verifies every proof
run('npm run build')                                  // REBUILD dist from the fresh generated.ts, so the downstream generators (gen-mcp/gen-readme/heartbeats/account) read the CURRENT ledger, not the stale pre-lean dist — else a new domain's theorems are missing from heartbeats and accounting fails at the pre-push gate
run('node dist/scripts/gen-mcp.js')                   // docs/mcp.md — the MCP catalog, built from the tool keys
run('node dist/scripts/gen-readme.js')                // README.md seal block — theorem/axiom/tool counts, derived from the ledger
run('node dist/scripts/gen-llm.js')                   // llm.txt — the agent RULE (captain coins, abstract-0 fold, 64→128, 7 dimensions), generated from the sealed ledger
run('node dist/scripts/lean-heartbeats.js --sync')    // heartbeats.json — prune stale, measure the new, 100% coverage
run('node dist/scripts/support.js')                   // support-audit.json + research-leads.json — code reachability, dead → R&D
run('node dist/scripts/audit-citations.js')           // audit-citations.json — the publication citation audit
run('node dist/scripts/account.js')                   // ABORTS here (non-zero) if the ledger does NOT reconcile

if (out('git status --porcelain').length === 0) {
  console.log('✓ nothing to reconcile — the derived layer already matches the source.')
} else {
  run('git add -A')
  run('git commit -m ' + JSON.stringify(msg))
  console.log('  committed: ' + msg)
}
run('git push origin HEAD')                            // the pre-push readiness gate re-verifies; passes if reconciled
console.log('✓ reconciled and pushed.')
