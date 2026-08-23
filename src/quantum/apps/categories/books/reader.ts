// categories/books/reader — THE READER (lead 81b, 1 of 4): a pasted public-domain text becomes a first-class
// ledger object in the visitor's browser — its provenance fingerprint (auditText: the recomputable identity any
// two readers derive alike), and its linkage to the sealed ledger (linkBookFacts: which of the text's own
// decidable facts the ledger already holds, matched fact to theorem). Nothing is fetched: the reader reads what
// the visitor brings, which is what makes the fingerprint theirs to verify. Pure hexbit-app law throughout.
// HONEST SCOPE: identity and linkage, never interpretation — the reader says what the text IS (its address) and
// where it touches the ledger, and stays silent on what it means.
import { auditText, linkBookFacts, type BookAudit, type BookLedgerLinkage } from '../../../../books.js'

export interface Reading { audit: BookAudit; linkage: BookLedgerLinkage; chars: number }

export function readPassage(text: string, meta: { title?: string; authors?: string[] } = {}): Reading {
  return { audit: auditText(text, meta), linkage: linkBookFacts(text), chars: text.length }
}
