// categories/books/reader — THE READER (lead 81b, 1 of 4): a pasted public-domain text becomes a first-class
// ledger object in the visitor's browser — its provenance fingerprint, its linkage to the sealed ledger, and
// the arithmetic the text IS (counts, ranks, letters, numerals) after the literature-yield metric was refuted.
// Nothing is fetched. Vacuous-on-corpus decoder shapes are tagged, never offered as identity.
import { auditText, linkBookFacts, type BookAudit, type BookLedgerLinkage } from '../../../../books.js'
import { decode, candidates, type Decoding, type StructureFact } from './structure.js'

export interface Reading {
  audit: BookAudit
  linkage: BookLedgerLinkage
  chars: number
  structure: Decoding
  facts: StructureFact[]
}

export function readPassage(text: string, meta: { title?: string; authors?: string[] } = {}): Reading {
  const structure = decode(text)
  return {
    audit: auditText(text, meta),
    linkage: linkBookFacts(text),
    chars: text.length,
    structure,
    facts: candidates(structure),
  }
}
