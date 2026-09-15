// project-surface — AGNOSTIC MCP OVER ANY PROJECT'S BACKLOG. Pure: the caller hands claims or lead-source
// readings; uuidna adjudicates against the public sealed ledger and folds one receipt. No filesystem, no spawn,
// no uuidna-repo assumption — omit items on uuidna.com to see the ledger's own open leads as a worked example.
import { adjudicate } from '../../../adjudicate.js'
import { toUuid } from '../../../address.js'
import { hexbitReceipt } from '../../../hexbit/index.js'
import { leadCensus, type SourceReading } from '../../../leads.js'
import { gatherOpenLeads } from '../../../school/open/questions/springs.js'
import { openQuestions, type OpenItem } from '../../../school/open/questions/index.js'
import { theorems } from '../../../theorems/index.js'
import { verifyProposition } from '../../../verify-statement.js'
import { leadVerdictOf, ledgerStatements, type SealedStatement } from '../../../refusal-trials.js'
import { handleOf } from '../../../handle.js'

const posInt = (n: number): number => (n > 0 ? n | 0 : 0)

export interface OpenLeadsInput {
  items?: readonly OpenItem[]
  limit?: number
}

/** an open claim, with the sealed theorems it cites shown as evidence — a citation never decides it */
export interface OpenLeadItem extends OpenItem { cites?: string[] }
export type OpenLeadVerdict = 'VERIFIED' | 'REFUTED' | 'OPEN'

export interface OpenLeadsResult {
  total: number
  open: number
  verified: number
  refuted: number
  unverified: number
  items: OpenLeadItem[]
  /** each claim the ledger decided, with the theorem that decided it */
  decided: { claim: string; source: string; verdict: Exclude<OpenLeadVerdict, 'OPEN'>; key: string }[]
  receipt: string
  honest: string
  example?: string
}

/** the statements a lead's handle can be decided by: `involution_<h>` keys and statements naming `lead_<h>` — the only
 *  shapes leadVerdictOf matches, so the per-claim lookup scans these and not the whole ledger */
const leadStatements = (): SealedStatement[] =>
  ledgerStatements().filter((s) => s.key.startsWith('involution_') || /\blead_[0-9a-f]{8}\b/.test(s.statement))

/** openLeadVerdict(claim, sealed?) → VERIFIED only when the claim, normalised, IS a sealed theorem's statement
 *  (verifyProposition) or the ledger proves `lead_<h>` for its handle; REFUTED only by `involution_<h> : ¬ lead_<h>`;
 *  OPEN otherwise, with the real sealed theorems it cites returned as evidence. adjudicate is read for those citations
 *  only, so its own verdict contract is unchanged for its other callers. Pure. */
export function openLeadVerdict(claim: string, sealed: readonly SealedStatement[] = leadStatements()): { verdict: OpenLeadVerdict; key: string | null; cites: string[] } {
  const exact = verifyProposition(claim)
  if (exact.verdict === 'VERIFIED' && exact.key) return { verdict: 'VERIFIED', key: exact.key, cites: [] }
  const lead = leadVerdictOf(handleOf(toUuid(claim.trim())), sealed)
  if (lead.disposition !== 'open' && lead.key) return { verdict: lead.disposition === 'refuted' ? 'REFUTED' : 'VERIFIED', key: lead.key, cites: [] }
  return { verdict: 'OPEN', key: null, cites: (adjudicate(claim).cites ?? []).map((c) => c.key) }
}

/** openLeadsPublic(input) → the OPEN items from YOUR backlog, or the ledger demo when items omitted. */
export function openLeadsPublic(input: OpenLeadsInput = {}): OpenLeadsResult {
  const pool: OpenItem[] = input.items?.length
    ? input.items.map((i) => ({ claim: String(i.claim ?? '').trim(), source: String(i.source ?? 'your backlog').trim() || 'your backlog', ...(i.receipt ? { receipt: i.receipt } : {}) })).filter((i) => i.claim)
    : gatherOpenLeads()
  const sealed = leadStatements()
  const decided: OpenLeadsResult['decided'] = []
  const open: OpenLeadItem[] = []
  for (const item of pool) {
    const v = openLeadVerdict(item.claim, sealed)
    if (v.verdict !== 'OPEN' && v.key) decided.push({ claim: item.claim, source: item.source, verdict: v.verdict, key: v.key })
    else open.push(v.cites.length ? { ...item, cites: v.cites } : item)
  }
  const verified = decided.filter((d) => d.verdict === 'VERIFIED').length
  const limit = input.limit != null && input.limit > 0 ? posInt(input.limit) : undefined
  const items = limit ? open.slice(0, limit) : open
  return {
    total: pool.length,
    open: open.length,
    verified,
    refuted: decided.length - verified,
    unverified: pool.length - verified,
    items,
    decided,
    receipt: hexbitReceipt(open.map((i) => toUuid(`${i.claim}|${i.source}`))).receipt,
    honest: input.items?.length
      ? 'YOUR project backlog — VERIFIED only when a claim IS a sealed theorem\'s statement (normalised) or the ledger proves lead_<handle> for it; REFUTED only by involution_<handle> : ¬ lead_<handle>. A citation alone leaves a claim OPEN, the citation shown as evidence (cites); OPEN is not-yet-decided here, never "false".'
      : 'Example: the uuidna ledger\'s own open leads. Pass {items:[{claim,source}]} for your project.',
    ...(!input.items?.length ? { example: 'https://uuidna.com/open-questions' } : {}),
  }
}

export interface LeadsGateInput {
  sources: readonly SourceReading[]
}

/** leadsGatePublic(input) → release readiness for ANY project whose sources you name. Pure. */
export function leadsGatePublic(input: LeadsGateInput) {
  const census = leadCensus(input.sources)
  return {
    ...census,
    honest: 'YOUR release gate — ready is true only when every source answered and none holds a lead; unmeasured sources block (three-state law).',
  }
}

export interface OpenQuestionsInput {
  items: readonly OpenItem[]
  limit?: number
}

/** openQuestionsPublic(input) → organise YOUR open claims by topic against the public sealed theorems. Pure. */
export function openQuestionsPublic(input: OpenQuestionsInput) {
  const items = input.items.map((i) => ({ claim: String(i.claim ?? '').trim(), source: String(i.source ?? 'your backlog').trim() || 'your backlog' })).filter((i) => i.claim)
  const open = items.filter((i) => adjudicate(i.claim).verdict === 'UNVERIFIED')
  const topics = openQuestions(open, theorems())
  const limit = input.limit != null && input.limit > 0 ? posInt(input.limit) : undefined
  const trimmed = limit
    ? topics.map((t) => ({ ...t, items: t.items.slice(0, limit) }))
    : topics
  return {
    topics: trimmed.length,
    open: open.length,
    total: items.length,
    curriculum: trimmed,
    receipt: hexbitReceipt(open.map((i) => toUuid(`${i.claim}|${i.source}`))).receipt,
    honest: 'YOUR open questions organised by word overlap with the public ledger — placement is a heuristic, not a verdict.',
  }
}
