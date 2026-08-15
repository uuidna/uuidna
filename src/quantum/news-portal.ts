// quantum-news-portal — The honest news engine
// Read articles on disputed topics → extract decidable facts → audit through anti-fraud MCP
// → coin-backed judgment → display: provable | open | overclaimed | narrative gap

import { toUuid, theorems } from '../index.js'

export interface NewsArticle {
  title: string
  body: string
  source: string
  domain: 'politics' | 'medicine' | 'climate' | 'history' | 'economics'
  date: string
}

export interface NewsExtractedFact {
  text: string
  type: 'date' | 'number' | 'logical_claim'
  address: string
  confidence: number
}

export interface FactJudgment {
  fact: NewsExtractedFact
  status: 'provable' | 'open' | 'overclaimed' | 'narrative_gap'
  linkedTheorem?: string
  fraudScore: number
  coinWeight: number
  readerCount: number
}

export interface NewsPortal {
  domain: 'politics' | 'medicine' | 'climate' | 'history' | 'economics'
  articles: NewsArticle[]
  judgments: FactJudgment[]
  receipt: string
}

// Extract decidable facts from an article (dates, numbers, logical claims)
export function extractFactsFromArticle(article: NewsArticle): NewsExtractedFact[] {
  const facts: NewsExtractedFact[] = []

  // Extract dates (YYYY-MM-DD or similar)
  const dateRegex = /\b(\d{4})-(\d{2})-(\d{2})\b|\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g
  let match
  while ((match = dateRegex.exec(article.body)) !== null) {
    const dateStr = match[0]
    facts.push({
      text: dateStr,
      type: 'date',
      address: toUuid(`date:${dateStr}`),
      confidence: 1.0
    })
  }

  // Extract numbers (percentages, currencies, counts)
  const numberRegex = /(\d+(?:,\d{3})*(?:\.\d+)?)\s*(%|M|B|trillion|billion|million|thousand)?/g
  while ((match = numberRegex.exec(article.body)) !== null) {
    const numStr = match[0]
    facts.push({
      text: numStr,
      type: 'number',
      address: toUuid(`number:${numStr}`),
      confidence: 0.8
    })
  }

  return facts
}

// Audit extracted facts through anti-fraud MCP
export function auditFactAgainstLedger(fact: NewsExtractedFact): FactJudgment {
  // Check if fact address matches any sealed theorem
  const matchedTheorem = theorems().find(t => t.key === fact.address)

  let status: 'provable' | 'open' | 'overclaimed' | 'narrative_gap'
  if (matchedTheorem) {
    status = 'provable'
  } else {
    // Check if fact contradicts any sealed theorem (overclaim)
    const contradicts = theorems().some(t =>
      t.statement.includes('¬') && t.statement.includes(fact.text)
    )
    status = contradicts ? 'overclaimed' : 'open'
  }

  return {
    fact,
    status,
    linkedTheorem: matchedTheorem?.key,
    fraudScore: status === 'overclaimed' ? 1.0 : 0.0,
    coinWeight: status === 'provable' ? 10 : status === 'overclaimed' ? -10 : 1,
    readerCount: 1
  }
}

// Build a domain-specific portal
export function buildNewsPortal(
  domain: 'politics' | 'medicine' | 'climate' | 'history' | 'economics',
  articles: NewsArticle[]
): NewsPortal {
  const judgments: FactJudgment[] = []

  for (const article of articles) {
    const facts = extractFactsFromArticle(article)
    for (const fact of facts) {
      const judgment = auditFactAgainstLedger(fact)
      judgments.push(judgment)
    }
  }

  // Fold all judgments to an order-invariant receipt
  const allFacts = judgments.map(j => j.fact.address).sort().join('|')
  const receipt = toUuid(`portal:${domain}:${allFacts}`)

  return {
    domain,
    articles,
    judgments,
    receipt
  }
}

// Render portal judgment summary
export function renderPortalSummary(portal: NewsPortal): {
  provable: number
  open: number
  overclaimed: number
  narrativeGap: number
  receipt: string
} {
  const provable = portal.judgments.filter(j => j.status === 'provable').length
  const open = portal.judgments.filter(j => j.status === 'open').length
  const overclaimed = portal.judgments.filter(j => j.status === 'overclaimed').length
  const narrativeGap = portal.judgments.filter(j => j.status === 'narrative_gap').length

  return {
    provable,
    open,
    overclaimed,
    narrativeGap,
    receipt: portal.receipt
  }
}

// Coin-backed judgment: readers vote on which facts to seal next
export interface JudgmentVote {
  factAddress: string
  voteType: 'seal' | 'dispute' | 'agree'
  coinsContributed: number
  readerId: string
}

export function tallyJudgmentVotes(votes: JudgmentVote[]): Map<string, { seal: number; dispute: number; agree: number }> {
  const tally = new Map<string, { seal: number; dispute: number; agree: number }>()

  for (const vote of votes) {
    const current = tally.get(vote.factAddress) || { seal: 0, dispute: 0, agree: 0 }
    current[vote.voteType] += vote.coinsContributed
    tally.set(vote.factAddress, current)
  }

  return tally
}

// Determine if a fact should be sealed based on coin-backed consensus
export function shouldSealFact(factAddress: string, tally: Map<string, { seal: number; dispute: number; agree: number }>): boolean {
  const votes = tally.get(factAddress)
  if (!votes) return false

  // Seal if seal votes exceed 2x the dispute votes (coin-weighted majority)
  return votes.seal > votes.dispute * 2
}
