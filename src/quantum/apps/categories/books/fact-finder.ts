// categories/books/fact-finder — THE FACT-FINDER (lead 81b, 2 of 4): the word-arithmetic ear as a hand tool.
// Paste any passage and every decidable fact it states — in digits or in words ("two and two make four") — is
// extracted and DECIDED in the visitor's browser, truth and falsehood wearing different verdicts, while the
// prose claims that carry numbers without arithmetic are surfaced as claims, never verdicted. The instrument
// validates itself first: the standard three controls run before any extraction is trusted (an instrument that
// cannot fail proves nothing — the same discipline every trial in this tree keeps). Pure hexbit-app law.
// HONEST SCOPE: the ear hears ARITHMETIC; a sentence whose sums it cannot hear excludes nothing (lead 71's
// family names what stays deaf — unit-wearing compounds wait at 71b), and a beautiful sentence with no numbers
// is not this tool's business.
import { extractClaims, type TextClaim } from '../../../../books.js'
import { splitDetails, auditDetail, type DetailVerdict } from '../../../../detail-audit.js'
import { testClaim, type ControlRun } from '../coding/claim-tester.js'

export interface FactFinding {
  controls: ControlRun[]
  instrumentValid: boolean
  details: DetailVerdict[]      // every sentence adjudicated — the ear that can REFUSE (the extractor that only
                                // affirms cannot fail, so the finder hears through the detail auditor instead)
  verified: number
  refuted: number
  claims: TextClaim[]           // number-bearing prose the ear heard but could not decide — surfaced, not verdicted
}

export function findFacts(text: string): FactFinding {
  const probe = testClaim('the fact-finder validates its instrument first')
  if (!probe.instrumentValid) return { controls: probe.controls, instrumentValid: false, details: [], verified: 0, refuted: 0, claims: [] }
  const details = splitDetails(text).map(auditDetail)
  return {
    controls: probe.controls,
    instrumentValid: true,
    details,
    verified: details.filter((d) => /^VERIFIED/.test(d.verdict)).length,
    refuted: details.filter((d) => d.verdict === 'REFUTED').length,
    claims: extractClaims(text),
  }
}
