// book-trials — EVERY BOOK LEAD STANDS TRIAL (development trial — remand, not mint).
// Numeric claims mined from public texts are testClaim'd against the sealed ledger; verdicts fold to one receipt.
// Nothing here seals a theorem — desk proposes, captain disposes (silence_never_refutes, legal_remand_is_total).
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf } from './handle.js'
import { type VerdictKind } from './adjudicate.js'
import { testClaim } from './quantum/apps/categories/coding/claim-tester.js'
import { type BookLeadInput } from './refusal-trials.js'

export interface BookTrialRow {
  claim: string
  sentence: string
  address: string
  handle: string
  bookId: number
  bookTitle: string
  bookAddress: string
  verdict: VerdictKind
  instrumentValid: boolean
  receipt: string
}

export interface BookTrialsRecord {
  why: string
  count: number
  verified: number
  unverified: number
  receipt: string
  trials: BookTrialRow[]
}

/** trialBookLead(lead) → instrument + subject verdict; remanded unless byte-identical to a sealed row. */
export function trialBookLead(lead: BookLeadInput & { address?: string }): BookTrialRow {
  const t = testClaim(lead.claim)
  const address = String(lead.address ?? toUuid(lead.claim))
  const verdict = t.subject?.verdict ?? 'UNVERIFIED'
  return {
    claim: lead.claim,
    sentence: lead.sentence,
    address,
    handle: handleOf(address),
    bookId: lead.book.id,
    bookTitle: lead.book.title,
    bookAddress: lead.book.address,
    verdict,
    instrumentValid: t.instrumentValid,
    receipt: merkleGravity([address, toUuid(`book-trial|${verdict}|${lead.book.id}|${lead.claim.length}`)]),
  }
}

/** trialAllBookLeads(leads) → every mined claim trialed; open doors stay remanded. */
export function trialAllBookLeads(leads: readonly (BookLeadInput & { address?: string })[]): BookTrialsRecord {
  const trials = leads.map(trialBookLead)
  const verified = trials.filter((t) => t.verdict === 'VERIFIED').length
  const unverified = trials.filter((t) => t.verdict === 'UNVERIFIED').length
  const receipt = merkleGravity(trials.map((t) => t.receipt))
  return {
    why:
      'Each book-leads.json candidate trialed with testClaim — controls first, then the claim. VERIFIED only when ' +
      'byte-identical to a sealed by-decide row; else UNVERIFIED (remanded to school). Desk proposes; captain seals.',
    count: trials.length,
    verified,
    unverified,
    receipt,
    trials,
  }
}

/** bookTrialsUntried(corpusSize, record?) → leads not yet folded into lean/book-trials.json. */
export function bookTrialsUntried(corpusSize: number, record: BookTrialsRecord | null | undefined): number {
  if (corpusSize <= 0) return 0
  if (!record) return corpusSize
  return corpusSize > record.count ? corpusSize - record.count : 0
}
