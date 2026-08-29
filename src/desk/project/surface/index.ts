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

const posInt = (n: number): number => (n > 0 ? n | 0 : 0)

export interface OpenLeadsInput {
  items?: readonly OpenItem[]
  limit?: number
}

export interface OpenLeadsResult {
  total: number
  open: number
  verified: number
  unverified: number
  items: OpenItem[]
  receipt: string
  honest: string
  example?: string
}

/** openLeadsPublic(input) → UNVERIFIED items from YOUR backlog, or the ledger demo when items omitted. */
export function openLeadsPublic(input: OpenLeadsInput = {}): OpenLeadsResult {
  const pool: OpenItem[] = input.items?.length
    ? input.items.map((i) => ({ claim: String(i.claim ?? '').trim(), source: String(i.source ?? 'your backlog').trim() || 'your backlog', ...(i.receipt ? { receipt: i.receipt } : {}) })).filter((i) => i.claim)
    : gatherOpenLeads()
  let verified = 0
  let unverified = 0
  const open: OpenItem[] = []
  for (const item of pool) {
    const v = adjudicate(item.claim).verdict
    if (v === 'VERIFIED') verified++
    else {
      unverified++
      open.push(item)
    }
  }
  const limit = input.limit != null && input.limit > 0 ? posInt(input.limit) : undefined
  const items = limit ? open.slice(0, limit) : open
  return {
    total: pool.length,
    open: open.length,
    verified,
    unverified,
    items,
    receipt: hexbitReceipt(open.map((i) => toUuid(`${i.claim}|${i.source}`))).receipt,
    honest: input.items?.length
      ? 'YOUR project backlog — each claim is adjudicated against the public sealed ledger; UNVERIFIED is not-yet sealed here, never "false".'
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
