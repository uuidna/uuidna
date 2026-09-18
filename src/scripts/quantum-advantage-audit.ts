#!/usr/bin/env node
// quantum-advantage-audit — PUSH-PATH VERIFY of the sealed advantage report (a440_not_on_the_vortex; DON'T RECOMPUTE).
// Does NOT remeasure. Full remeasure: npm run x -- gen-quantum-advantage
// Wall-clock lives HERE (scripts boundary), not in the harmonic core.
import { quantumAdvantageAudit } from '../quantum/advantage/audit/index.js'
import { DEPLOY_BUDGET_MS } from './deploy-verify.js'

const t0 = process.hrtime.bigint()
const a = quantumAdvantageAudit()
const ms = Number((process.hrtime.bigint() - t0) / 1_000_000n)
console.log('quantum-advantage-audit — VERIFY (not recompute)')
console.log(`  mode=${a.mode} levels=${a.levels} witnesses=${a.witnesses} core-ms=${a.ms} wall-ms=${ms} (budget <${DEPLOY_BUDGET_MS})`)
console.log(`  receipt ${a.receipt}`)
console.log(`  sealDigest ${a.sealDigest}`)
console.log(`  ${a.honest}`)
if (!a.ok) {
  console.error('✗ quantum-advantage-audit — REFUSED:')
  for (const g of a.gaps) {
    console.error(`  GAP ${g.what}`)
    console.error(`  FIX ${g.fix}`)
  }
  process.exit(1)
}
if (ms >= DEPLOY_BUDGET_MS) {
  console.error(`✗ quantum-advantage-audit — wall-clock ${ms}ms ≥ ${DEPLOY_BUDGET_MS / 1000}s (a440_not_on_the_vortex)`)
  process.exit(1)
}
console.log(`✓ quantum-advantage-audit — sealed advantage verified in ${ms}ms (PUSH-PATH VERIFY; DON'T RECOMPUTE)`)
