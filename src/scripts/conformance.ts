#!/usr/bin/env node
// conformance — the COMMIT DNA GATE as a CLI: recompute the folded invariants and HARD-FAIL (exit 1) if any is
// broken, so no agent can sneak incompatible DNA past the pre-push. Run in the audit wave. Integrity.
import { conformance } from '../conformance.js'
const r = conformance()
for (const c of r.checks) console.log(`  ${c.pass ? '✓' : '✗'} ${c.id} — ${c.detail}`)
if (r.conforms) console.log(`✓ conformance — DNA gate clean (${r.passed}/${r.checks.length}), receipt ${r.receipt}`)
else { console.error(`✗ conformance — INCOMPATIBLE DNA: ${r.failed} check(s) failed. Commit BLOCKED.`); process.exit(1) }
