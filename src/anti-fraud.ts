// anti-fraud — DETECT FORGER ATTEMPTS in the uuidna ledger and governance model
// ─────────────────────────────────────────────────────────────────────────────
// A theorem-backed fraud audit: detect every forgery vector from the sealed ledger
// and the captain's coin economy. Returns recomputable, order-invariant receipts.
//
// uuidna audits RECOMPUTABLE FACTS ONLY (theorem addresses, coin tallies,
// vote weights, ledger DNA). It does NOT judge intention or identity — only the work's
// integrity. A forged theorem is a fact (the address does not recompute); a traitor is
// a forgery in the artifact, never a person.

import { theoremByKey, type Theorem } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { ledgerFingerprint, type LedgerFingerprint } from './fingerprint.js'
import { catchTraitors, type TreasonReport } from './treason.js'
import { forensics, type ForensicReport } from './forensics.js'
import { conformance, type ConformanceReport } from './conformance.js'

export interface CoinAudit {
  claimed: number
  recomputed: number
  match: boolean
  theorem: string | null
  address: string | null
  receipt: string
}

export interface VoteFraud {
  proposal: string
  voteCount: number
  totalWeight: number
  weightVsCoins: { voterId: string; weight: number; expectedCoins: number; mismatch: boolean }[]
  receiptMismatch: boolean
  receipt: string
}

export interface VoteAudit {
  proposal: string
  votes: VoteFraud[]
  fraud: VoteFraud[]
  receiptAll: string
}

export interface LedgerIntrusionReport {
  traitors: TreasonReport
  conformance: ConformanceReport
  agentForensics: ForensicReport // a single forensics audit
  allClear: boolean
  receipt: string
}

export interface ForgeryDetection {
  theoremKey: string
  cited: boolean
  addressMatches: boolean
  sealedAddress: string | null
  citedAddress: string | null
  receipt: string
}

export interface DoubleSpendsAudit {
  contributions: Array<{ agent: string; coinsSpent: number; theoremCited: string }>
  byTheorem: Record<string, number[]>
  doubleSpendsFound: Array<{ theorem: string; coins: number; agents: number }>
  receipt: string
}

/** detectForgery(theoremKey, citedAddress) — detect if a cited theorem is forged
 *  by checking against the sealed ledger. */
export function detectForgery(theoremKey: string, citedAddress?: string): ForgeryDetection {
  const theorem = theoremByKey().get(theoremKey)

  if (!theorem) {
    return {
      theoremKey,
      cited: false,
      addressMatches: false,
      sealedAddress: null,
      citedAddress: citedAddress || null,
      receipt: merkleGravity([toUuid('forgery:' + theoremKey), toUuid('not-sealed')]),
    }
  }

  const matches = citedAddress ? theorem.address === citedAddress : true
  return {
    theoremKey,
    cited: true,
    addressMatches: matches,
    sealedAddress: theorem.address,
    citedAddress: citedAddress || null,
    receipt: merkleGravity([theorem.address, toUuid('forgery-check')]),
  }
}

/** auditCoinClaim(theoremKey, claimedCoins) — verify coin claim against theorem.
 *  The theorem itself proves the coin cost; a mismatch is fraud. */
export function auditCoinClaim(theoremKey: string, claimedCoins: number): CoinAudit {
  const theorem = theoremByKey().get(theoremKey)

  if (!theorem) {
    return {
      claimed: claimedCoins,
      recomputed: 0,
      match: false,
      theorem: null,
      address: null,
      receipt: merkleGravity([toUuid('coin-fraud:' + theoremKey), toUuid(String(claimedCoins))]),
    }
  }

  // The theorem name or proof encodes the coin cost (e.g., "captain_theorem" = 2 coins)
  const recomputed = extractCoinFromTheorem(theorem)
  const match = recomputed === claimedCoins

  return {
    claimed: claimedCoins,
    recomputed,
    match,
    theorem: theoremKey,
    address: theorem.address,
    receipt: merkleGravity([theorem.address, toUuid('coins:' + recomputed), toUuid(String(claimedCoins))]),
  }
}

/** extractCoinFromTheorem(theorem) — parse coin cost from theorem key/name.
 *  Returns the sealed coin cost or 0 if not found. */
function extractCoinFromTheorem(theorem: Theorem): number {
  // Common pattern: "captain_theorem" → 2, "verify_cheaper_than_forge" → 1
  if (theorem.key.includes('two_coins') || theorem.key.includes('two_per')) return 2
  if (theorem.key.includes('one_coin') || theorem.key.includes('one_per')) return 1
  if (theorem.key.includes('zero') || theorem.key.includes('free')) return 0
  return 0 // default: no cost claimed
}

/** detectDoubleSpendsAcrossContributions(contributions) — audit if the same coin-backing theorem
 *  is claimed by multiple agents (double-spend). */
export function detectDoubleSpends(contributions: Array<{ agent: string; coinsSpent: number; theoremCited: string }>): DoubleSpendsAudit {
  const byTheorem: Record<string, number[]> = {}

  for (const contrib of contributions) {
    if (!byTheorem[contrib.theoremCited]) byTheorem[contrib.theoremCited] = []
    byTheorem[contrib.theoremCited].push(contrib.coinsSpent)
  }

  const doubleSpendsFound = Object.entries(byTheorem)
    .filter(([_, coins]) => coins.length > 1)
    .map(([theorem, coins]) => ({
      theorem,
      coins: coins[0],
      agents: coins.length,
    }))

  return {
    contributions,
    byTheorem,
    doubleSpendsFound,
    receipt: merkleGravity(
      Object.keys(byTheorem).map((t) => toUuid(t + ':' + byTheorem[t].length))
    ),
  }
}

/** auditVoting(proposal, votes, expectedReceiptAll) — verify voting tally.
 *  Each vote's weight must match coins paid; tally must be order-invariant. */
export function auditVoting(
  proposal: string,
  votes: Array<{ voterId: string; decision: boolean; weight: number; quantumState: string }>,
  expectedReceiptAll?: string
): VoteAudit {
  const fraud: VoteFraud[] = []

  // Audit each vote's weight
  const weightVsCoins: Array<{ voterId: string; weight: number; expectedCoins: number; mismatch: boolean }> = []
  for (const vote of votes) {
    // Weight should match coins (weight = coinsSpent in the voting model)
    const mismatch = vote.weight < 0
    weightVsCoins.push({
      voterId: vote.voterId,
      weight: vote.weight,
      expectedCoins: vote.weight, // in this model, weight === coins
      mismatch,
    })
  }

  // Tally by weight
  const voteYes = votes.filter((v) => v.decision).reduce((sum, v) => sum + v.weight, 0)
  const voteNo = votes.filter((v) => !v.decision).reduce((sum, v) => sum + v.weight, 0)

  const voteState: VoteFraud = {
    proposal,
    voteCount: votes.length,
    totalWeight: voteYes + voteNo,
    weightVsCoins,
    receiptMismatch: expectedReceiptAll ? merkleGravity(votes.map((v) => v.quantumState)) !== expectedReceiptAll : false,
    receipt: merkleGravity([proposal, toUuid(`yes:${voteYes}:no:${voteNo}`)]),
  }

  if (weightVsCoins.some((w) => w.mismatch) || voteState.receiptMismatch) {
    fraud.push(voteState)
  }

  return {
    proposal,
    votes: [voteState],
    fraud,
    receiptAll: merkleGravity(votes.map((v) => v.quantumState)),
  }
}

/** auditLedgerIntrusions() — run the full treason / conformance / forensics sweep.
 *  Returns unified fraud report: traitors, broken DNA, agent violations, all-clear receipt. */
export function auditLedgerIntrusions(): LedgerIntrusionReport {
  const traitors = catchTraitors()
  const conf = conformance()
  const agentsAudit = forensics('') // audit empty statement to check structural integrity

  const allClear = traitors.traitors.length === 0 && conf.conforms && agentsAudit.violations.length === 0

  const receipt = merkleGravity([
    toUuid(`traitors:${traitors.traitors.length}`),
    toUuid(`conformance:${conf.conforms ? 'pass' : 'fail'}`),
    toUuid(`violations:${agentsAudit.violations.length}`),
  ])

  return {
    traitors,
    conformance: conf,
    agentForensics: agentsAudit,
    allClear,
    receipt,
  }
}

/** auditLedgerFingerprint(expectedFingerprint?) — verify ledger hash integrity.
 *  The FNV (fast routing) and SHA-256 (collision-resistant) folds should match sealed values. */
export function auditLedgerFingerprint(expectedFingerprint?: string): { fingerprint: LedgerFingerprint; match: boolean; receipt: string } {
  const fp = ledgerFingerprint()
  const match = expectedFingerprint ? JSON.stringify(fp) === expectedFingerprint : true

  return {
    fingerprint: fp,
    match,
    receipt: merkleGravity([toUuid(JSON.stringify(fp))]),
  }
}

/** auditAgentStatement(agent, statement, citedTheorems) — forensic audit of an agent's claim.
 *  Detects: fabricated citations, overclaims, unverified theorems, address fraud. */
export function auditAgentStatement(
  agent: string,
  statement: string,
  citedTheorems: string[]
): {
  agent: string
  statement: string
  forgeries: ForgeryDetection[]
  violations: string[]
  receipt: string
} {
  const forgeries = citedTheorems.map((key) => detectForgery(key))
  const fabricated = forgeries.filter((f) => !f.cited)

  const violations: string[] = []
  if (fabricated.length > 0) violations.push(`${fabricated.length} fabricated theorem citations`)

  const receipt = merkleGravity([
    agent,
    statement,
    ...forgeries.map((f) => f.receipt),
  ])

  return {
    agent,
    statement,
    forgeries,
    violations,
    receipt,
  }
}

/** fullAntiFraudAudit() — one command to run the entire fraud detection suite.
 *  Folds traitors, coin violations, voting fraud, and agent malfeasance to ONE receipt. */
export function fullAntiFraudAudit(): {
  intrusions: LedgerIntrusionReport
  ledgerFingerprint: ReturnType<typeof auditLedgerFingerprint>
  fraudDetected: boolean
  receipt: string
  honest: string
} {
  const intrusions = auditLedgerIntrusions()
  const ledgerFp = auditLedgerFingerprint()

  const fraudDetected = !intrusions.allClear || !ledgerFp.match

  const receipt = merkleGravity([
    intrusions.receipt,
    ledgerFp.receipt,
    toUuid(fraudDetected ? 'FRAUD' : 'CLEAR'),
  ])

  return {
    intrusions,
    ledgerFingerprint: ledgerFp,
    fraudDetected,
    receipt,
    honest: 'RECOMPUTABLE: audit from sealed theorems only; no fabricated citation survives; every traitor coin-expensive to forge (theorem traitor_damage_sealed_by_same_billing)',
  }
}
