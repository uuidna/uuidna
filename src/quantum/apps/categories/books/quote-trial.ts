// categories/books/quote-trial — THE QUOTE-TRIAL (lead 81b, 4 of 4): a quoted sentence stands trial in the
// visitor's browser — controls first (the instrument proves it can fail before it speaks), then the citation
// trial the ledger runs on itself: a quote citing a sealed theorem verifies only on-topic (the relevance floor),
// arithmetic in the quote decides, and everything else stays honestly OPEN. The quote leaves addressed: its
// content-address makes it citable whatever the verdict — an UNVERIFIED quote with an address is a door on the
// open-questions page waiting to happen. Pure hexbit-app law. verdicts settle arithmetic and
// citations, never attribution (who really said it is provenance work, not this tool's), and never meaning.
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'
import { testClaim, type ClaimTest } from '../coding/claim-tester.js'

export interface QuoteVerdict extends ClaimTest { quote: string; attribution?: string; address: string; handle: string }

export function tryQuote(quote: string, attribution?: string): QuoteVerdict {
  const t = testClaim(quote)
  const address = toUuid(`quote|${attribution ?? ''}|${quote}`)
  return { ...t, quote, attribution, address, handle: handleOf(address) }
}
