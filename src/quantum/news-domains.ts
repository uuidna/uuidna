// news-domains — Domain-specific portal implementations
// Each domain has its own fact-extraction patterns and sealing rules

import { NewsArticle, NewsPortal, FactJudgment, JudgmentVote } from './news-portal.js'
import { buildNewsPortal, renderPortalSummary, tallyJudgmentVotes, shouldSealFact } from './news-portal.js'

// POLITICS PORTAL
export interface PoliticsArticle extends NewsArticle {
  domain: 'politics'
  politicians?: string[]
  votes?: { yea: number; nay: number }
  election?: string
}

export function buildPoliticsPortal(articles: PoliticsArticle[]): NewsPortal {
  // Politics facts: voting records, election dates, bill numbers
  return buildNewsPortal('politics', articles)
}

// Extract politics-specific facts
export function extractPoliticsFacts(article: PoliticsArticle): string[] {
  const facts: string[] = []

  // Voting records (bill X passed with N votes)
  const voteRegex = /bill\s+\w+\s+passed\s+(?:with\s+)?(\d+)\s+(?:to\s+)?(\d+)/gi
  let match
  while ((match = voteRegex.exec(article.body)) !== null) {
    facts.push(`vote:${match[1]}:${match[2]}`)
  }

  // Election dates (YYYY election)
  const electionRegex = /(\d{4})\s+(?:presidential\s+)?election/gi
  while ((match = electionRegex.exec(article.body)) !== null) {
    facts.push(`election:${match[1]}`)
  }

  return facts
}

// MEDICINE PORTAL
export interface MedicineArticle extends NewsArticle {
  domain: 'medicine'
  condition?: string
  treatment?: string
  studyN?: number
}

export function buildMedicinePortal(articles: MedicineArticle[]): NewsPortal {
  // Medicine facts: clinical trial results, dosages, mortality rates
  return buildNewsPortal('medicine', articles)
}

// Extract medicine-specific facts
export function extractMedicineFacts(article: MedicineArticle): string[] {
  const facts: string[] = []

  // Clinical trial results (N patients, X% efficacy)
  const trialRegex = /(\d+)\s+patients?.*?(\d+)%\s+efficacy/gi
  let match
  while ((match = trialRegex.exec(article.body)) !== null) {
    facts.push(`trial:${match[1]}:${match[2]}`)
  }

  // Dosages (mg, ml)
  const dosageRegex = /(\d+)\s*(mg|ml|µg|ng)/gi
  while ((match = dosageRegex.exec(article.body)) !== null) {
    facts.push(`dosage:${match[1]}:${match[2]}`)
  }

  return facts
}

// CLIMATE PORTAL
export interface ClimateArticle extends NewsArticle {
  domain: 'climate'
  temperature?: number
  co2Level?: number
  year?: number
}

export function buildClimatePortal(articles: ClimateArticle[]): NewsPortal {
  // Climate facts: temperature records, CO2 levels, weather events
  return buildNewsPortal('climate', articles)
}

// Extract climate-specific facts
export function extractClimateFacts(article: ClimateArticle): string[] {
  const facts: string[] = []

  // Temperature records (±X.X°C, 32°F)
  const tempRegex = /([-+]?\d+\.?\d*)\s*°?[CF]/gi
  let match
  while ((match = tempRegex.exec(article.body)) !== null) {
    facts.push(`temperature:${match[1]}`)
  }

  // CO2 levels (ppm)
  const co2Regex = /(\d+)\s*ppm/gi
  while ((match = co2Regex.exec(article.body)) !== null) {
    facts.push(`co2:${match[1]}`)
  }

  return facts
}

// HISTORY PORTAL
export interface HistoryArticle extends NewsArticle {
  domain: 'history'
  event?: string
  era?: string
  figures?: string[]
}

export function buildHistoryPortal(articles: HistoryArticle[]): NewsPortal {
  // History facts: dates, names of historical figures, documented events
  return buildNewsPortal('history', articles)
}

// Extract history-specific facts
export function extractHistoryFacts(article: HistoryArticle): string[] {
  const facts: string[] = []

  // Historical dates (year, decade, century)
  const dateRegex = /(\d{4})\s+(BCE|CE|AD|BC)?/gi
  let match
  while ((match = dateRegex.exec(article.body)) !== null) {
    facts.push(`year:${match[1]}`)
  }

  // Historical figures and events
  const eventRegex = /(battle of|treaty of|fall of|rise of)\s+([A-Za-z\s]+)/gi
  while ((match = eventRegex.exec(article.body)) !== null) {
    facts.push(`event:${match[1]}:${match[2]}`)
  }

  return facts
}

// ECONOMICS PORTAL
export interface EconomicsArticle extends NewsArticle {
  domain: 'economics'
  gdp?: number
  inflation?: number
  unemployment?: number
}

export function buildEconomicsPortal(articles: EconomicsArticle[]): NewsPortal {
  // Economics facts: GDP, inflation rate, employment, stock indices
  return buildNewsPortal('economics', articles)
}

// Extract economics-specific facts
export function extractEconomicsFacts(article: EconomicsArticle): string[] {
  const facts: string[] = []

  // Economic indicators (GDP, inflation, unemployment)
  const gdpRegex = /GDP.*?(\$[\d.]+\s*(?:trillion|billion|million))/gi
  let match
  while ((match = gdpRegex.exec(article.body)) !== null) {
    facts.push(`gdp:${match[1]}`)
  }

  // Inflation rate
  const inflationRegex = /inflation.*?(\d+\.?\d*)%/gi
  while ((match = inflationRegex.exec(article.body)) !== null) {
    facts.push(`inflation:${match[1]}`)
  }

  // Stock indices
  const indexRegex = /(S&P|Dow|Nasdaq)\s+(\d+)/gi
  while ((match = indexRegex.exec(article.body)) !== null) {
    facts.push(`index:${match[1]}:${match[2]}`)
  }

  return facts
}

// Multi-domain reader judgment
export function processMultiDomainJudgment(
  portals: NewsPortal[],
  votes: JudgmentVote[]
): {
  domain: string
  shouldSeal: string[]
  shouldDispute: string[]
  receipt: string
}[] {
  return portals.map(portal => {
    const domainVotes = votes.filter(v =>
      portal.judgments.some(j => j.fact.address === v.factAddress)
    )
    const tally = tallyJudgmentVotes(domainVotes)

    const shouldSeal = Array.from(tally.entries())
      .filter(([addr, _]) => shouldSealFact(addr, tally))
      .map(([addr, _]) => addr)

    const shouldDispute = Array.from(tally.entries())
      .filter(([addr, votes]) => votes.dispute > votes.seal)
      .map(([addr, _]) => addr)

    return {
      domain: portal.domain,
      shouldSeal,
      shouldDispute,
      receipt: portal.receipt
    }
  })
}
