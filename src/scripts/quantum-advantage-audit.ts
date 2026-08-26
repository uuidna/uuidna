#!/usr/bin/env node
// quantum-advantage-audit — PUSH-PATH VERIFY of the sealed advantage report (<60s by construction).
// Does NOT remeasure. Full remeasure: npm run x -- gen-quantum-advantage
// Wall-clock lives HERE (scripts boundary), not in the harmonic core.
import { quantumAdvantageAudit } from '../quantum/advantage/audit/index.js'

const t0 = process.hrtime.bigint()
const a = quantumAdvantageAudit()
const ms = Number((process.hrtime.bigint() - t0) / 1_000_000n)
console.log('quantum-advantage-audit — VERIFY (not recompute)')
console.log(`  mode=${a.mode} levels=${a.levels} witnesses=${a.witnesses} core-ms=${a.ms} wall-ms=${ms} (budget <60000)`)
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
if (ms >= 60_000) {
  console.error(`✗ quantum-advantage-audit — wall-clock ${ms}ms ≥ 60s`)
  process.exit(1)
}
console.log(`✓ quantum-advantage-audit — sealed advantage verified in ${ms}ms (<60s)`)
