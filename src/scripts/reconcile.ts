#!/usr/bin/env node
// reconcile — regenerate the WHOLE derived layer to match the current Lean source, sync the heartbeats, then commit
// and push. The one command that gets a ledger change past the pre-push readiness gate: the gate git-diffs
// generated.ts, PRINCIPLE.md, CHANGELOG.md, lean/ (incl. lean/axioms.json), docs/mcp.md, audit-citations.json,
// support-audit.json and research-leads.json — so EVERY one must be regenerated here or the push is blocked. Each
// derived file must equal its own recomputation from the one audited ledger (a fixed point); a file left
// un-rotated is the "non-quantum" drift the gate hard-rejects. Add a domain (a lean-<x>.ts generator or a .lean), then:
//
//   npm run reconcile                       → default commit message
//   npm run reconcile "Add the nim domain"  → your own message
//
// Nothing is committed if the reconcile leaves the tree unchanged (the derived layer already matched). account.js
// fails loudly if the ledger does not reconcile, aborting before any commit/push. Integrity, not truth.
import { execSync } from 'node:child_process'

const run = (cmd: string): void => { console.log('  · ' + cmd); execSync(cmd, { stdio: 'inherit' }) }
const out = (cmd: string): string => execSync(cmd).toString().trim()
const msg = process.argv.slice(2).join(' ') || 'Reconcile: regenerate the derived layer + sync heartbeats to the ledger, backed by theorem two_coins'

console.log('reconcile — regenerating the derived layer to match the Lean source …')
run('npm run lean')                                   // generated.ts + PRINCIPLE.md + CHANGELOG — verifies every proof
run('node dist/scripts/one-receipt.js coherent || { rm -rf dist; npm run build; node dist/scripts/one-receipt.js coherent; }') // SELF-HEAL the mixed-dist class (interleaved writers on the shared tree): probe every dist import against dist/index.js; on drift, one clean emit — the known total cure — then re-probe. The wrapper no longer dies mid-chain on a stale export.
run('npm run build')                                  // REBUILD dist from the fresh generated.ts, so the downstream generators (gen-mcp/gen-readme/heartbeats/account) read the CURRENT ledger, not the stale pre-lean dist — else a new domain's theorems are missing from heartbeats and accounting fails at the pre-push gate
run('node dist/scripts/sync-changelog.js')            // RE-STAMP CHANGELOG from the FRESH dist. `npm run lean` above stamps it during its OWN pre-lean-all build, so it reads the STALE (pre-new-theorem) count; without this re-stamp the committed CHANGELOG lags by the just-added theorems, and the pre-push gate (`npm run next`) recomputes the true count and BLOCKS on the drift — forcing a manual second reconcile. Re-stamping here makes reconcile ONE-SHOT (the measured cost of manual work, sealed as manipulation_never_faster / guard-before-reconcile).
run('node dist/scripts/lean-axioms.js')               // lean/axioms.json — re-derive the axiom-free audit from the CURRENT ledger (gated under lean/; the pre-push gate regenerates it, so reconcile must too or the git-diff blocks the push)
run('node dist/scripts/gen-mcp.js')                   // docs/mcp.md — the MCP catalog, built from the tool keys
run('node dist/scripts/gen-readme.js')                // README.md seal block — theorem/axiom/tool counts, derived from the ledger
run('node dist/scripts/gen-llm.js')                   // llm.txt — the agent RULE (captain coins, abstract-0 fold, 64→128, 7 dimensions), generated from the sealed ledger
run('node dist/scripts/lean-heartbeats.js --sync')    // heartbeats.json — prune stale, measure the new, 100% coverage
run('node dist/scripts/support.js')                   // support-audit.json + research-leads.json — code reachability, dead → R&D
run('node dist/scripts/audit-citations.js')           // audit-citations.json — the publication citation audit
run('node dist/scripts/account.js')                   // ABORTS here (non-zero) if the ledger does NOT reconcile
run('node dist/scripts/spin.js --seal')               // spin-manifest.json — SEAL the coins of the freshly-rotated derived layer LAST (after every generator); once sealed, the gate re-spins them by itself (verify O(1))

if (out('git status --porcelain').length === 0) {
  console.log('✓ nothing to reconcile — the derived layer already matches the source.')
} else {
  // SIGN the commit as TRUE before it is made — FAIL unless the message cites a real sealed theorem (none fabricated).
  // Loaded from the FRESH dist rebuilt above, so a message may cite a theorem sealed in THIS run. The signature folds
  // the message + its cited theorems to one gravity root through the abstract-0. A message that overclaims cannot commit.
  const { signCommit } = await import('../index.js')
  const sig = signCommit(msg)
  if (!sig.signed) {
    console.error('✗ reconcile — commit NOT signed true: ' + sig.reason)
    console.error('  A commit must cite a real sealed theorem — add `theorem <key>` or `/theorem/<key>` (see uuidna_theorems). Nothing committed.')
    process.exit(1)
  }
  console.log('  ✓ commit signed true — ' + sig.reason)
  run('git add -A')
  run('git commit -m ' + JSON.stringify(msg))
  console.log('  committed: ' + msg)
}
run('git push origin HEAD')                            // the pre-push readiness gate re-verifies; passes if reconciled
console.log('✓ reconciled and pushed.')
