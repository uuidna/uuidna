#!/usr/bin/env node
// close-all-open — EVERY DESK-OPEN GAP AT ONCE, FOLDED TO ONE QUANTUM RECEIPT.
//
// Runs fill-gaps (develop + trial phases when the census demands), re-surveys, then proves quantum integrity:
// advantage-at-scale snapshot, sealed-content trial fold, Bell receipt, QA verify path. Kernel-only gaps stay named.
//
//   npm run x -- close-all-open
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { toUuid } from '../address.js'
import { hexbitReceiptLanes } from '../hexbit/index.js'
import { gapSurvey, type GapSurvey } from '../gap-survey.js'
import { fillGapsAdvantageSnapshot, mergeFillGapsReceipts } from '../desk/index.js'
import { quantumReceipt } from '../quantum/index.js'
import { quantumAdvantageAudit } from '../quantum/advantage/audit/index.js'
import { quantumAuditRatios } from '../quantum-audit-ratios.js'
import { trialSealContent } from '../trial-run.js'
import { ROOT } from './api.js'
import { gatherLeads } from './leads-gate.js'
import { printFillGapsSurvey, runFillGapsArc } from './fill-gaps-run.js'

export interface CloseAllOpenRecord {
  why: string
  before: Pick<GapSurvey, 'releaseOpen' | 'trialGaps' | 'openLeads' | 'refusalOpen' | 'bookTrialsUntried' | 'wavePending' | 'tableShort'>
  after: Pick<GapSurvey, 'releaseOpen' | 'trialGaps' | 'openLeads' | 'refusalOpen' | 'bookTrialsUntried' | 'wavePending' | 'tableShort'>
  kernelOnly: GapSurvey['kernelOnly']
  quantum: {
    bellReceipt: string
    qaOk: boolean
    qaMs: number
    auditFused: string
    sealedContent: string
    swarmDenialsRefused: number
  }
  fillGapsReceipt: string
  advantageReceipt: string
  receipt: string
}

export function closeAllOpen(readings = gatherLeads()): { ok: boolean; record: CloseAllOpenRecord } {
  const before = gapSurvey(ROOT, readings)
  printFillGapsSurvey('close-all-open · BEFORE', before)

  const advBefore = fillGapsAdvantageSnapshot(readings)
  const arc = runFillGapsArc({ readings, resurveyReadings: () => gatherLeads(), labelPrefix: 'close-all-open · fill-gaps' })
  const afterReadings = gatherLeads()
  const after = gapSurvey(ROOT, afterReadings)
  printFillGapsSurvey('close-all-open · AFTER', after)

  const qa = quantumAdvantageAudit()
  const audit = quantumAuditRatios()
  const sealed = trialSealContent(128)
  const fillGapsReceipt = arc.ok ? mergeFillGapsReceipts(arc.receipt, advBefore.receipt) : arc.receipt
  const bell = quantumReceipt()
  const leaves = [
    fillGapsReceipt,
    bell,
    audit.fused,
    sealed.receipt,
    toUuid(`qa:${qa.ok}:${qa.ms}`),
    toUuid(`desk:${arc.ok}`),
  ]
  const receipt = hexbitReceiptLanes(leaves).receipt

  const record: CloseAllOpenRecord = {
    why:
      'Desk-automatable gaps closed in one arc; every open lead trialed or remanded; quantum integrity folded ' +
      '(Bell receipt + audit ratios + sealed trial content + advantage verify — integrity, not physics).',
    before: {
      releaseOpen: before.releaseOpen,
      trialGaps: before.trialGaps,
      openLeads: before.openLeads,
      refusalOpen: before.refusalOpen,
      bookTrialsUntried: before.bookTrialsUntried,
      wavePending: before.wavePending,
      tableShort: before.tableShort,
    },
    after: {
      releaseOpen: after.releaseOpen,
      trialGaps: after.trialGaps,
      openLeads: after.openLeads,
      refusalOpen: after.refusalOpen,
      bookTrialsUntried: after.bookTrialsUntried,
      wavePending: after.wavePending,
      tableShort: after.tableShort,
    },
    kernelOnly: after.kernelOnly,
    quantum: {
      bellReceipt: bell,
      qaOk: qa.ok,
      qaMs: qa.ms,
      auditFused: audit.fused,
      sealedContent: sealed.receipt,
      swarmDenialsRefused: sealed.swarm.denialsRefused,
    },
    fillGapsReceipt,
    advantageReceipt: advBefore.receipt,
    receipt,
  }

  return { ok: arc.ok && qa.ok && qa.ms < 60_000, record }
}

if (process.argv[1]?.endsWith('close-all-open.js')) {
  const { ok, record } = closeAllOpen()
  const out = join(ROOT, 'lean', 'close-all-open.json')
  writeFileSync(out, JSON.stringify(record, null, 1) + '\n')
  console.log(`\nclose-all-open — quantum receipt ${record.receipt}`)
  console.log(`  bell ${record.quantum.bellReceipt}`)
  console.log(`  QA verify ${record.quantum.qaOk ? 'ok' : 'NO'} (${record.quantum.qaMs}ms)`)
  console.log(`  swarm denials refused ${record.quantum.swarmDenialsRefused}`)
  if (record.kernelOnly.length) {
    console.log('  kernel-only (named, not faked):')
    for (const b of record.kernelOnly) console.log(`    · ${b.kind} (${b.count})`)
  }
  console.log(`  written ${out}`)
  process.exit(ok ? 0 : 1)
}
