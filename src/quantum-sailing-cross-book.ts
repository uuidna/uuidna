// quantum-sailing-cross-book — CROSS-BOOK CORRELATION: the captain reads across the library and finds theorems that emerge only when two or more books are read together.
// When read in isolation, each book links decidable facts (numbers, arithmetic, patterns). When read together, facts RESONATE — a theorem cited in book A resonates with a fact in book B, creating NEW sealed insights. Pure and recomputable: all correlation logic is deterministic; network fetches (if needed) are application-layer responsibilities.

import { theorems, toUuid, merkleGravity } from './index.js'

export interface BookPair {
  book1Id: number
  book2Id: number
  sharedTheorems: string[]      // theorem keys both books cite
  sharedFacts: string[]         // decidable facts matching between books
  resonanceCount: number        // how many facts resonate between the pair
  resonanceAddress: string      // content-address of this resonance
}

export interface CrossBookResonance {
  pairs: BookPair[]
  totalPairs: number
  totalResonances: number
  ledgerCitations: number       // how many cross-book patterns cite sealed theorems
  novelPatterns: number         // patterns not yet in ledger (research leads)
  receipt: string               // order-invariant docket
  honest: string
}

export interface CrossBookCluster {
  theoremKey: string
  bookIds: number[]
  citationCount: number
  resonancePatterns: string[]
  address: string
}

export function correlateAcrossBooks(
  books: Array<{ id: number; text: string; facts: string[] }>
): CrossBookResonance {
  const ledger = theorems().map(t => ({
    key: t.key,
    statement: t.statement.toLowerCase(),
  }))

  const pairs: BookPair[] = []
  let totalResonances = 0
  let ledgerCitations = 0
  let novelPatterns = 0

  // Compare every pair of books
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      const book1 = books[i]
      const book2 = books[j]

      // Find shared theorems (theorems cited by both books)
      const sharedTheorems = book1.facts.filter(f => book2.facts.includes(f))

      // Find shared facts (decidable numbers/patterns both mention)
      const sharedFacts = extractSharedFacts(book1.text, book2.text)

      // Count resonances: shared theorems + shared facts
      const resonanceCount = sharedTheorems.length + sharedFacts.length

      // Check if resonances cite sealed theorems
      const citedInLedger = sharedTheorems.filter(t =>
        ledger.some(l => l.key === t || l.statement.includes(t))
      ).length

      if (resonanceCount > 0) {
        ledgerCitations += citedInLedger
        if (citedInLedger === 0) novelPatterns += resonanceCount

        totalResonances += resonanceCount

        pairs.push({
          book1Id: book1.id,
          book2Id: book2.id,
          sharedTheorems,
          sharedFacts,
          resonanceCount,
          resonanceAddress: toUuid(`cross:${book1.id}:${book2.id}:${resonanceCount}`),
        })
      }
    }
  }

  // Fold all resonances to one receipt (order-invariant)
  const receipt = merkleGravity(
    pairs.map(p => toUuid(`cross:${p.book1Id}:${p.book2Id}:${p.resonanceCount}`))
  )

  return {
    pairs,
    totalPairs: pairs.length,
    totalResonances,
    ledgerCitations,
    novelPatterns,
    receipt,
    honest:
      'Cross-book correlation: PURE, recomputable, no network calls. Books are read together to find shared theorems and decidable facts that resonate across texts. ' +
      'Shared theorems cite sealed proofs; novel patterns are research leads awaiting ledger entry. Integrity, not truth.',
  }
}

function extractSharedFacts(text1: string, text2: string): string[] {
  // Extract decidable patterns (numbers, arithmetic, specific phrases) from both texts
  const patterns1 = extractPatterns(text1)
  const patterns2 = extractPatterns(text2)

  // Return intersection (facts both texts contain)
  return patterns1.filter(p => patterns2.includes(p))
}

function extractPatterns(text: string): string[] {
  const patterns: string[] = []

  // Extract numbers
  const numbers = (text.match(/\b\d+\b/g) || []).slice(0, 20) // cap at 20
  patterns.push(...numbers)

  // Extract arithmetic operations as patterns
  const arith = (text.match(/(\d+\s*[+\-*/=]\s*\d+)/g) || []).slice(0, 10)
  patterns.push(...arith)

  // Extract key phrases (decidable topics)
  const keyPhrases = extractKeyPhrases(text)
  patterns.push(...keyPhrases)

  return [...new Set(patterns)] // deduplicate
}

function extractKeyPhrases(text: string): string[] {
  // List of decidable topics that appear in multiple texts
  const topics = [
    'navigation', 'sailing', 'wind', 'water', 'tide', 'wave', 'current',
    'distance', 'bearing', 'compass', 'heading', 'latitude', 'longitude',
    'knot', 'league', 'fathom', 'cable', 'chain', 'ell', 'foot', 'yard',
    'hour', 'day', 'night', 'dawn', 'dusk', 'moon', 'star', 'sun',
    'north', 'south', 'east', 'west', 'port', 'starboard',
    'arithmetic', 'count', 'number', 'sum', 'multiply', 'divide',
    'angle', 'degree', 'right', 'triangle', 'circle', 'straight',
  ]

  const found: string[] = []
  const lowerText = text.toLowerCase()

  for (const topic of topics) {
    if (lowerText.includes(topic)) {
      found.push(topic)
    }
  }

  return found
}

export function clusterByTheorem(
  books: Array<{ id: number; text: string; facts: string[] }>
): CrossBookCluster[] {
  const ledger = theorems()
  const clusters: Record<string, CrossBookCluster> = {}

  for (const book of books) {
    for (const fact of book.facts) {
      // Find which theorems in the ledger match this fact
      const matchingTheorems = ledger.filter(t =>
        t.statement.toLowerCase().includes(fact.toLowerCase()) ||
        t.key === fact
      )

      for (const theorem of matchingTheorems) {
        if (!clusters[theorem.key]) {
          clusters[theorem.key] = {
            theoremKey: theorem.key,
            bookIds: [],
            citationCount: 0,
            resonancePatterns: [],
            address: toUuid(`cluster:${theorem.key}`),
          }
        }

        if (!clusters[theorem.key].bookIds.includes(book.id)) {
          clusters[theorem.key].bookIds.push(book.id)
        }
        clusters[theorem.key].citationCount++
        if (!clusters[theorem.key].resonancePatterns.includes(fact)) {
          clusters[theorem.key].resonancePatterns.push(fact)
        }
      }
    }
  }

  return Object.values(clusters).filter(c => c.bookIds.length > 1) // only clusters with 2+ books
}

export function serializeCrossBookCorrelation(corr: CrossBookResonance) {
  return {
    pairs: corr.totalPairs,
    resonances: corr.totalResonances,
    ledgerCited: corr.ledgerCitations,
    novel: corr.novelPatterns,
    receipt: corr.receipt,
    pairDetails: corr.pairs.map(p => ({
      books: [p.book1Id, p.book2Id],
      sharedTheorems: p.sharedTheorems.length,
      sharedFacts: p.sharedFacts.length,
      resonance: p.resonanceCount,
    })),
  }
}

export function serializeClusters(clusters: CrossBookCluster[]) {
  return {
    count: clusters.length,
    clusters: clusters.map(c => ({
      theorem: c.theoremKey,
      books: c.bookIds,
      citations: c.citationCount,
      patterns: c.resonancePatterns.length,
    })),
  }
}
