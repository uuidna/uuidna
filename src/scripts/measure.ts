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
import { timingCensus } from '../os/timing/index.js'
import { packagePage, renderPackagePage } from '../quantum/os/pkgpage/index.js'
import { valueOf } from '../hexbit/index.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid } from '../index.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts
import { benchHexbit, benchLattice } from './bench-hexbit.js'

export interface Measurement { name: string; what: string; run: () => Promise<unknown> | unknown }
export interface Receipted { name: string; what: string; value: unknown; receipt: string }

/** the fold: name with result, so a changed answer cannot keep the old address */
export const receiptOf = (name: string, value: unknown): string => toUuid(`measure:${name}:${JSON.stringify(value)}`)

export async function take(m: Measurement): Promise<Receipted> {
  const value = await m.run()
  return { name: m.name, what: m.what, value, receipt: receiptOf(m.name, value) }
}

export const MEASUREMENTS: readonly Measurement[] = [
  // TIME, MEASURED WHERE MEASUREMENT BELONGS. The captain's standard is that uuidnaOS computes in nanoseconds
  // and anything slower is a crack — so time has to be checked somewhere, and the somewhere is NOT the guard.
  // The advisory tier below it was emptied on the reasoning that a finder which cannot refuse a proof is custom
  // logic over presentation, and a timing census cannot refuse a proof: it reports what a machine did, not what
  // the kernel decided. Prediction was moved out of the gate to `npm run audit` for exactly this reason, and
  // this rides the same chain. Reporting is not gating, and a crack that costs time is still a crack — named
  // here, on every audit, with a receipt anyone can recompute.
  { name: 'timing', what: 'the lattice ops and the data-parallel ops against per-host calibrated budgets — verdicts sealed, durations reported',
    run: () => {
      // the page ops only measure where the catalogue is present — a host without it measures the rest rather
      // than reporting a zero, and says which by simply not listing them.
      const pkg = packagePage('busybox')
      const pkgReady = pkg !== null
      const TOOL_SAMPLE = [{ name: 'uuidna_port' }, { name: 'uuidna_exec' }]
      const handles = Array.from({ length: 10_000 }, (_, i) => ((i * 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, 8))
      const addrs = Array.from({ length: 1024 }, (_, i) => toUuid('a' + i))
      const c = timingCensus([
        { op: 'handle.valueOf', run: () => valueOf('deadbeef').value },
        { op: 'parallel.valueOf', run: () => handles.map((h) => valueOf(h).value), elements: handles.length },
        { op: 'parallel.merkleGravity', run: () => merkleGravity(addrs), elements: addrs.length, iterations: 30 },
        ...(pkgReady ? [
          { op: 'page.packagePage', run: () => packagePage('busybox'), iterations: 200 },
          { op: 'page.render', run: () => renderPackagePage(pkg!, TOOL_SAMPLE), iterations: 200 },
        ] : []),
      ])
      // NO DURATIONS IN THE VALUE. receiptOf folds the whole value, so a nanosecond count here moves the
      // address on every run while nothing has changed — which is precisely the contract the timing module was
      // built to protect, undone at the integration point. Caught by running it three times and reading three
      // receipts: 4544e2db, 9402a62c, 7259ecde. The verdicts and the host are what recompute; the durations are
      // a live reading, available from timingCensus to anyone who asks, and are not a record.
      return {
        arch: `${c.arch.platform}/${c.arch.arch}/${c.arch.cpus}`,
        accelerator: c.accelerator.webgpu ? 'webgpu present, no dispatch' : 'none',
        within: c.within,
        cracks: c.cracks,
        verdicts: c.timings.map((t) => ({ op: t.op, budget: t.budget, within: t.within })),
      }
    } },
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

  // THE HEXBIT AND THE 64-HEXAGRAM LATTICE. Registered here rather than given its own npm entry point, and the
  // tree refused both alternatives on the way: left standing alone the benchmark was a DORMANT script (built,
  // run by nothing), and wrapped in an npm script it was a THIN WRAPPER nothing outside package.json calls. Both
  // refusals were right — a measurement nobody takes is a claim nobody checks — and `measure --all` is already
  // in the audit chain, which is exactly where a performance regression should surface.
  //
  // WHAT IT ANSWERS: the captain's claim that hexbits compute faster than all else. They do, at the UNIT. The
  // composite door did not, and fixing that made it 4.9x faster; the hex FACE did not, and caching an
  // address-independent index made it 7x faster. The value recorded is the RATIO the face turns on — computing
  // every page's face costs milliseconds while shipping them costs hundreds of megabytes.
  { name: 'hexbit-lattice', what: 'the hexbit unit, the door, and the 64-hexagram lattice — with the face\'s compute-vs-ship ratio', run: () => {
    const b = benchHexbit(20_000)
    const l = benchLattice(2_000)
    return {
      fastest: b.fastest,
      slowest: b.slowest,
      unitIsFastest: b.unitIsFastest,
      latticeStates: l.states,
      faceMicroseconds: l.faceNs / 1000,
      faceShippedBytes: l.faceShippedBytes,
      shippedMegabytes: l.shippedMegabytes,
      computeAllMilliseconds: l.computeAllMilliseconds,
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
