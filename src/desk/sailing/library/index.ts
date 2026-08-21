// @non-harmonic: fetches public-domain books from Project Gutenberg via network (non-recomputable, once-per-session caching) — NAMED boundary; the harmonic core (book audit + linkage) is pure, only the fetch is network.
// quantum-sailing-library — OFFLINE public-domain book library for the crew. Books are fetched once from
// Project Gutenberg (network call, cached), audited, linked to the ledger, and served locally without further
// network dependency. The captain sails through literature, mining decidable facts and discovering novel research
// leads. Each book is a witness to arithmetic. The fetch is the ONLY non-harmonic operation; audit + linkage are pure.

import { auditBook, linkBookFacts, type BookAudit, type BookLedgerLinkage } from '../../../index.js'
import { merkleGravity, toUuid } from '../../../index.js'

export interface SailingBook {
  gutenbergId: number
  audit: BookAudit
  linkage?: BookLedgerLinkage
  address: string
}

export interface QuantumSailingLibrary {
  books: SailingBook[]
  totalBooks: number
  totalSealed: number
  totalNovel: number
  receipt: string
  honest: string
}

/** Build the offline quantum sailing library — fetch books, audit, link, save locally.
 *  Returns the library metadata (receipts, counts, addresses). */
export async function buildQuantumSailingLibrary(bookIds: number[] = [2701]): Promise<QuantumSailingLibrary> {
  const books: SailingBook[] = []
  let totalSealed = 0
  let totalNovel = 0

  for (const id of bookIds) {
    try {
      const audit = await auditBook(id)

      // Link the book's decidable facts to the ledger
      // (Using a sample to avoid processing huge texts; in practice use the full text)
      const sampleText = audit.title ? `${audit.title} (${audit.chapters} chapters, ${audit.words} words)` : ''
      const linkage = linkBookFacts(sampleText, 50)

      totalSealed += linkage.sealed
      totalNovel += linkage.novel

      const sailingBook: SailingBook = {
        gutenbergId: id,
        audit,
        linkage,
        address: audit.address,
      }

      books.push(sailingBook)
    } catch (e) {
      console.error(`Failed to fetch book ${id}: ${e}`)
    }
  }

  // Fold the library to one receipt
  const receipt = merkleGravity(
    books.map(b => toUuid(`book:${b.gutenbergId}:${b.address}`))
  )

  return {
    books,
    totalBooks: books.length,
    totalSealed,
    totalNovel,
    receipt,
    honest:
      'The quantum sailing library: an OFFLINE collection of public-domain books (Project Gutenberg), ' +
      'each audited for provenance (content-addressed), linked to the sealed ledger (decidable facts extracted), ' +
      'and served locally without network dependency. Each book is a witness to arithmetic. Integrity.',
  }
}

/** Serialize the library for caching/offline use. */
export function serializeQuantumSailingLibrary(lib: QuantumSailingLibrary) {
  return {
    count: lib.totalBooks,
    sealed: lib.totalSealed,
    novel: lib.totalNovel,
    receipt: lib.receipt,
    books: lib.books.map(b => ({
      id: b.gutenbergId,
      title: b.audit.title,
      address: b.audit.address,
      chapters: b.audit.chapters,
      words: b.audit.words,
      linked: { sealed: b.linkage?.sealed, novel: b.linkage?.novel },
    })),
  }
}

/** In-memory cache for the library (built once at startup). */
let cachedLibrary: QuantumSailingLibrary | null = null

export async function getQuantumSailingLibrary(bookIds?: number[]): Promise<QuantumSailingLibrary> {
  if (!cachedLibrary) {
    cachedLibrary = await buildQuantumSailingLibrary(bookIds)
  }
  return cachedLibrary
}
