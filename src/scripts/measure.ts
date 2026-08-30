#!/usr/bin/env node
// measure — A MEASUREMENT WITHOUT A RECEIPT IS A CLAIM.
//
// Nearly every number reported in the session that built this came from a `node -e` one-liner: 1250 handles
// round-tripping, 54 rows at 18/30/6, a 42-state period, 73 re-namings. Each computed correctly and then vanished.
// Nobody can re-run them, nothing folded them, and when one was WRONG — a ledger/wing drift read out of a stale
// dist/ and reported as critical — there was no artifact to check the error against, only a summary of it.
//
// That is the one class of work in this repository that leaves no trace, in a ledger that content-addresses
// everything else. A one-liner is manual work wearing computation's clothes: it computes, and it is not reusable,
// sealed, testable or citable.
//
// So a measurement is registered here, run by name, and folded. The value and the receipt are returned together,
// so "1250 handles round-trip" stops being something someone said and becomes something anyone recomputes. The
// receipt folds the NAME with the RESULT, so a changed answer changes the address — a measurement that silently
// starts returning something else cannot keep its old identity.
//
//   node dist/scripts/measure.js            list what can be measured
//   node dist/scripts/measure.js <name>     run one, with its receipt
//   node dist/scripts/measure.js --all      run every one
import { toUuid } from '../index.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts

export interface Measurement { name: string; what: string; run: () => Promise<unknown> | unknown }
export interface Receipted { name: string; what: string; value: unknown; receipt: string }

/** the fold: name with result, so a changed answer cannot keep the old address */
export const receiptOf = (name: string, value: unknown): string => toUuid(`measure:${name}:${JSON.stringify(value)}`)

export async function take(m: Measurement): Promise<Receipted> {
  const value = await m.run()
  return { name: m.name, what: m.what, value, receipt: receiptOf(m.name, value) }
}

export const MEASUREMENTS: readonly Measurement[] = [
  { name: 'ledger', what: 'keys, distinct statements, and the re-namings between them',
    run: async () => {
      const { theorems } = await import('../index.js')
      const T = theorems()
      const distinct = new Set(T.map((t) => t.statement)).size
      return { keys: T.length, distinct, renames: T.length - distinct }
    } },
  { name: 'wing-parity', what: 'every wing theorem reaches the ledger, and every ledger entry has a wing',
    run: async () => {
      const { readdirSync, readFileSync } = await import('node:fs')
      const { join } = await import('node:path')
      const { ROOT } = await import('./api.js')
      const { theorems } = await import('../index.js')
      const inLedger = new Set(theorems().map((t) => t.key))
      const dir = join(ROOT, 'lean')
      let inWings = 0
      const missing: string[] = []
      for (const f of readdirSync(dir).filter((x) => x.endsWith('.lean'))) {
        for (const m of readFileSync(join(dir, f), 'utf8').matchAll(/^theorem\s+([A-Za-z0-9_]+)/gm)) {
          inWings++
          if (!inLedger.has(m[1])) missing.push(m[1])
        }
      }
      return { inWings, inLedger: inLedger.size, wingNotInLedger: missing }
    } },
  { name: 'handle-roundtrip', what: 'every live handle recovers itself from its path',
    run: async () => {
      const { handlePath, handleOfPath } = await import('../handle.js')
      const { chunkHandleOf } = await import('../handle-chunks.js')
      const { theorems } = await import('../index.js')
      const hs = [...new Set(theorems().map((t) => chunkHandleOf(t.key)).filter((h): h is string => !!h))]
      return { handles: hs.length, broken: hs.filter((h) => handleOfPath(handlePath(h)) !== h).length }
    } },
  { name: 'rosetta', what: 'how many independent witnesses each theorem carries',
    run: async () => {
      const { census } = await import('./rosetta.js')
      const rows = census()
      const by: Record<number, number> = {}
      for (const r of rows) by[r.legs.length] = (by[r.legs.length] ?? 0) + 1
      return { total: rows.length, byLegCount: by, witnessed: rows.filter((r) => r.legs.includes('witness')).length }
    } },
  { name: 'research', what: 'findings by verification status — only READ may anchor a theorem',
    run: async () => {
      const { readFileSync } = await import('node:fs')
      const { join } = await import('node:path')
      const { ROOT } = await import('./api.js')
      const { census } = await import('../research-ledger.js')
      const f = JSON.parse(readFileSync(join(ROOT, 'lean', 'research-ledger.json'), 'utf8')).findings
      return census(f)
    } },
  { name: 'findings', what: 'open defects by severity, from the queue',
    run: async () => {
      const { readFileSync } = await import('node:fs')
      const { join } = await import('node:path')
      const { ROOT } = await import('./api.js')
      const j = JSON.parse(readFileSync(join(ROOT, 'lean', 'findings.json'), 'utf8'))
      const by: Record<string, number> = {}
      for (const x of j.open) by[x.severity] = (by[x.severity] ?? 0) + 1
      return { open: j.open.length, fixed: j.fixed.length, bySeverity: by }
    } },
  { name: 'axiom-balance', what: 'wing axioms ↔ theorems balanced in both directions across ledger, wing, principle, skill, and ray — fused',
    run: async () => {
      const { axiomBalance } = await import('../theorems/index.js')
      const b = axiomBalance()
      return {
        active: b.active,
        balanced: b.balanced,
        global: b.global,
        worst: b.worst,
        fused: b.fused,
      }
    } },
  { name: 'quantum-audit-ratios', what: 'ratios, angles, polarities, and life decoded from Sequence, Rosetta, uuidnaOS — fused',
    run: async () => {
      const { quantumAuditRatios } = await import('../quantum-audit-ratios.js')
      const q = quantumAuditRatios()
      return {
        polarities: q.polarities,
        angles: q.angles,
        life: q.life,
        ratios: q.ratios.length,
        balanced: q.ratios.filter((r) => r.balanced).length,
        maskCoins: q.rosetta.maskCoins,
        revealGap: q.life.balance.revealGap,
        fused: q.fused,
      }
    } },
  { name: 'uuidna-decode', what: 'one door — Sequence, Rosetta, angles, polarities, life, genesis, axiom balance',
    run: async () => {
      const { uuidnaDecode } = await import('../quantum-audit-ratios.js')
      const d = uuidnaDecode()
      return {
        living: d.life.living.count,
        latent: d.life.latent.count,
        revealGap: d.life.balance.revealGap,
        polarities: { minus: d.polarities.minus, neutral: d.polarities.neutral, plus: d.polarities.plus },
        angles: { closes: d.angles.closes, rosettaRayStep: d.angles.rosettaRayStep },
        ratios: d.audit.ratios.length,
        fused: d.fused,
      }
    } },
  { name: 'trial-sequence', what: 'trial as living sequence — polarity, spin, angle on every theorem',
    run: async () => {
      const { runTrial } = await import('../trial-run.js')
      const t = runTrial()
      return {
        count: t.count,
        polarities: t.sequence.polarities,
        dash: t.sequence.dash,
        angles: t.sequence.angles,
        receipt: t.sequence.receipt,
      }
    } },
  { name: 'trial-sealed-content', what: 'verified trial imprint + swarm refusal receipts fused',
    run: async () => {
      const { trialSealContent } = await import('../trial-run.js')
      const s = trialSealContent(128)
      return {
        theorems: s.trial.count,
        swarmVerified: s.swarm.verified,
        swarmDenialsRefused: s.swarm.denialsRefused,
        swarmDenialsFixed: s.swarm.denialsFixed,
        involutions: s.swarm.involutions,
        kinds: s.swarm.kinds,
        imprintLinks: s.imprint.length,
        refusalCarriers: s.refused.length,
        address: s.address,
        receipt: s.receipt,
      }
    } },
]

if (process.argv[1] && /measure\.(js|ts)$/.test(process.argv[1])) {
  const arg = process.argv[2]
  if (!arg) {
    console.log('measure — a measurement without a receipt is a claim. Registered:\n')
    for (const m of MEASUREMENTS) console.log(`  ${m.name.padEnd(18)} ${m.what}`)
    console.log('\n  measure.js <name> | --all')
    process.exit(0)
  }
  const chosen = arg === '--all' ? MEASUREMENTS : MEASUREMENTS.filter((m) => m.name === arg)
  if (!chosen.length) { console.error(`measure — no measurement named '${arg}'`); process.exit(1) }
  for (const m of chosen) {
    const r = await take(m)
    console.log(`${handleOf(r.receipt)}  ${r.name.padEnd(18)} ${JSON.stringify(r.value)}`)
  }
}
