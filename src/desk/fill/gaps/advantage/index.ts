// @non-harmonic: awaits MCP wire probes (uuidna_open_leads, uuidna_registry) for fill-gaps-at-scale verify
// fill-gaps-advantage — FILL GAPS AT SCALE AT ONCE via the same quantum-advantage law: one merkle fold over the
// whole gap census + open-leads + playbook (verify O(log N) over re-survey O(N), theorem verify_beats_recompute_by_magnitudes).
import { toUuid } from '../../../../address.js'
import { hexbitReceipt, hexbitReceiptLanes, type HexbitReceipt } from '../../../../hexbit/index.js'
import { gapSurvey, type GapSurvey } from '../../../../gap-survey.js'
import type { SourceReading } from '../../../../leads.js'
import { hookAdvantageMcp, type AdvantageMcpHook } from '../../../../quantum/advantage/mcp/curriculum/index.js'
import { quantumAdvantagePlaybook } from '../../../../quantum/advantage/mcp/agent/playbook/index.js'
import {
  fillGapsPlan,
  gapSurveyReceipt,
  hasDeskAutomatableWork,
  type FillGapsPhase,
} from '../../../../scripts/fill-gaps-plan.js'
import { ROOT } from '../../../../boundary.js'
import { openLeadsPublic } from '../../../project/surface/index.js'

export interface FillGapsAdvantageSnapshot extends HexbitReceipt {
  survey: GapSurvey
  plan: FillGapsPhase[]
  openLeads: ReturnType<typeof openLeadsPublic>
  playbook?: ReturnType<typeof quantumAdvantagePlaybook>
  deskWork: boolean
  honest: string
}

/** fillGapsAdvantageSnapshot(readings?, limit?, opts?) → whole-tree gap census folded to one receipt. Pure. */
export function fillGapsAdvantageSnapshot(
  readings: readonly SourceReading[] = [],
  limit = 32,
  opts?: { includePlaybook?: boolean },
): FillGapsAdvantageSnapshot {
  const survey = gapSurvey(ROOT, readings)
  const plan = fillGapsPlan(survey)
  const openLeads = openLeadsPublic({ limit })
  const playbook = opts?.includePlaybook === false ? null : quantumAdvantagePlaybook()
  const leaves = [gapSurveyReceipt(survey), openLeads.receipt, toUuid('fill-gaps-advantage-at-scale')]
  if (playbook) leaves.push(playbook.receipt)
  return {
    ...hexbitReceiptLanes(leaves),
    survey,
    plan,
    openLeads,
    ...(playbook ? { playbook } : {}),
    deskWork: hasDeskAutomatableWork(survey),
    honest: 'One fold over every gap bucket + open-leads sample + quantum playbook — verify the receipt instead of re-running each class. Host desk writes: npm run x -- fill-gaps.',
  }
}

export interface FillGapsAtScaleHook extends AdvantageMcpHook {
  snapshot: FillGapsAdvantageSnapshot
  scaleReceipt: string
}

/** hookFillGapsAtScale(call) → quantum advantage hook plus gap-specific MCP probes, one scale receipt. */
export async function hookFillGapsAtScale(
  call: (name: string, args: Record<string, unknown>) => unknown | Promise<unknown>,
  readings: readonly SourceReading[] = [],
  limit = 32,
): Promise<FillGapsAtScaleHook> {
  const snapshot = fillGapsAdvantageSnapshot(readings, limit)
  const advantage = await hookAdvantageMcp(call)
  if (snapshot.survey.openLeads > 0) await call('uuidna_open_leads', { limit })
  if (snapshot.deskWork) await call('uuidna_registry', {})
  const scale = hexbitReceipt([snapshot.receipt, advantage.receipt, toUuid('fill-gaps-at-scale')])
  return { ...advantage, snapshot, scaleReceipt: scale.receipt }
}

/** mergeFillGapsReceipts(arcReceipt, advantageReceipt) → one readiness leaf after host arc + advantage verify. */
export function mergeFillGapsReceipts(arcReceipt: string, advantageReceipt: string): string {
  return hexbitReceipt([arcReceipt, advantageReceipt, toUuid('fill-gaps-merged')]).receipt
}
