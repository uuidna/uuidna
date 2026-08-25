// @non-harmonic: async/await, because resolving a DOI crosses the network and an answer from another party is not recomputable from this tree — a NAMED boundary; the fetch itself is INJECTED, so nothing here puts a network call on the import graph and every pure part is tested offline.
// crossref — A CITATION THAT CAN BE CHECKED, not merely spelled.
//
// The witness leg is the scarcest in this ledger and the easiest to fake. rosetta.ts grants it when a theorem's
// note matches a roster of external anchors — NIST, CODATA, ISO, RFC, DOI, a named author — and a roster over
// text is a KEYWORD test: writing "DOI 10.1234/nothing" earns the scarcest leg in the tree without opening a
// source. rosetta.ts names the consequence itself, calling it the vacuity trap: score every theorem as witnessed
// and destroy the only measurement that located today's errors.
//
// So a DOI is resolved rather than trusted. api.crossref.org is the registration agency's own public metadata
// service: it answers with the record the publisher deposited, so a DOI that resolves is a citation a stranger
// can consult, and one that does not is a string that looks like one.
//
// PURE PARTS AND THE ONE IMPURE PART ARE SEPARATED ON PURPOSE. Extracting DOIs, building the request URL and
// reading a response body are total functions over their inputs and are tested without a network. The fetch is
// INJECTED, never imported: this module must not put a network call on the library's import graph, the edge
// bundles what it can reach, and a test that needs the internet to run is a test that fails on a train.
//
// HONEST SCOPE: resolving a DOI proves the RECORD EXISTS and says what the publisher deposited. It does not read
// the paper, and it cannot tell whether the cited work supports the claim citing it — that is the same gap the
// citation gate has, and no metadata service closes it. Integrity, not truth.

/** What Crossref deposits about a work, reduced to the fields a citation is checked against. */
export interface Citation {
  doi: string
  title: string
  authors: string[]
  journal: string
  volume: string
  page: string
  year: number
}

/** Every DOI in a piece of text. The syntax is the registry's own: `10.` then a registrant code, a slash, and a
 *  suffix. Trailing sentence punctuation is trimmed, because a DOI at the end of a prose clause collects the
 *  full stop and a resolver would then ask for a work that was never registered. */
export function doisIn(text: string): string[] {
  const hits = String(text).match(/\b10\.\d{4,9}\/[^\s"'<>,;)\]]+/g) ?? []
  return [...new Set(hits.map((d) => d.replace(/[.,;:]+$/, '')))]
}

/** The metadata endpoint for one DOI, built the way Crossref's own specification asks.
 *
 *  THE DOI IS URL-ENCODED, and that is not cosmetic: a DOI always contains a slash, so an unencoded suffix would
 *  be read as extra path segments and the request would ask for a work nobody registered. Crossref's spec gives
 *  the encoded form in its own example (`/works/10.5555%2F12345678`), which is what encodeURIComponent produces.
 *
 *  `mailto` IS A PARAMETER AND IS NEVER HARDCODED. Crossref describes it as "the email address to identify
 *  yourself and access the 'polite pool'", and identifying an automated client is the courteous thing to do to a
 *  free public service that answers on someone else's budget. But an address is a caller's to give: baking one
 *  into a library sends a third party an identity the library's user never chose to disclose. Omitted, the
 *  request still works and simply lands in the anonymous pool.
 *
 *  Crossref also states that a 429 or 403 means the client has been throttled or blocked. A caller's `get` should
 *  treat those as "unresolved and back off", never as "this DOI is not registered" — the two are different
 *  answers and only one of them is about the citation. */
export const crossrefUrl = (doi: string, mailto?: string): string =>
  'https://api.crossref.org/works/' + encodeURIComponent(doi) +
  (mailto ? '?mailto=' + encodeURIComponent(mailto) : '')

/** Read Crossref's envelope into a Citation. Missing fields become empty rather than throwing: a record that is
 *  thin is still a record, and refusing to parse it would report "unregistered" for a work that IS registered. */
export function parseCrossref(body: unknown): Citation | null {
  const m = (body as { message?: Record<string, unknown> })?.message
  if (!m || typeof m !== 'object') return null
  const first = (v: unknown): string => (Array.isArray(v) ? String(v[0] ?? '') : String(v ?? ''))
  const parts = (m['published-print'] ?? m['published-online'] ?? m['issued']) as { 'date-parts'?: number[][] } | undefined
  return {
    doi: String(m['DOI'] ?? ''),
    title: first(m['title']),
    authors: Array.isArray(m['author'])
      ? (m['author'] as { given?: string; family?: string }[]).map((a) => [a.given, a.family].filter(Boolean).join(' '))
      : [],
    journal: first(m['container-title']),
    volume: String(m['volume'] ?? ''),
    page: String(m['page'] ?? ''),
    year: Number(parts?.['date-parts']?.[0]?.[0] ?? 0),
  }
}

export interface CitationCheck {
  doi: string
  resolved: boolean
  citation: Citation | null
  why: string
}

export interface CitationReport {
  checks: CitationCheck[]
  found: number
  resolved: number
  /** no DOI at all — the text was never checkable, which is NOT the same as checked and clean */
  checkable: boolean
  honest: string
}

/** verifyCitations(text, get) → every DOI in the text, resolved against Crossref.
 *
 *  `get` is injected so this is testable offline and so no network call rides the library's import graph. It is
 *  given a URL and returns the parsed JSON body, or null when the work is not registered. */
export async function verifyCitations(
  text: string,
  get: (url: string) => Promise<unknown | null>,
  mailto?: string,
): Promise<CitationReport> {
  const dois = doisIn(text)
  const checks: CitationCheck[] = []
  for (const doi of dois) {
    let body: unknown | null = null
    try { body = await get(crossrefUrl(doi, mailto)) } catch { body = null }
    const citation = body ? parseCrossref(body) : null
    checks.push({
      doi,
      resolved: citation !== null && citation.doi.toLowerCase() === doi.toLowerCase(),
      citation,
      why: citation === null
        ? 'not registered at Crossref, or unreachable — a string shaped like a DOI is not a citation'
        : citation.doi.toLowerCase() === doi.toLowerCase()
          ? 'registered: ' + citation.title + ' — ' + citation.journal + ' ' + citation.volume + ':' + citation.page + ' (' + citation.year + ')'
          : 'Crossref answered for ' + citation.doi + ', which is not the DOI that was asked for',
    })
  }
  const resolved = checks.filter((c) => c.resolved).length
  return {
    checks, found: dois.length, resolved, checkable: dois.length > 0,
    honest: dois.length === 0
      ? 'NOT CHECKABLE: the text carries no DOI, so nothing could be resolved. An empty result over an absent ' +
        'citation is the absence of a question, never evidence that the claim is witnessed.'
      : `resolved ${resolved} of ${dois.length} DOI(s). Resolving proves the RECORD exists and says what the ` +
        'publisher deposited; it does not read the paper and cannot tell whether the cited work supports the ' +
        'claim citing it.',
  }
}
