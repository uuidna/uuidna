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
// resolving a DOI proves the RECORD EXISTS and says what the publisher deposited. It does not read
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
const DOI_STOP = new Set([' ', '\t', '\n', '\r', '"', "'", '<', '>', ',', ';', ')', ']'])

export function doisIn(text: string): string[] {
  const s = String(text)
  const seen = new Set<string>()
  const out: string[] = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '1' || s[i + 1] !== '0' || s[i + 2] !== '.') continue
    const prev = s[i - 1]
    if (prev !== undefined && /[A-Za-z0-9_]/.test(prev)) continue
    let j = i + 3
    let digits = 0
    while (j < s.length && s[j]! >= '0' && s[j]! <= '9') { digits++; j++ }
    if (digits < 4 || digits > 9 || s[j] !== '/') continue
    j++
    const suffixStart = j
    while (j < s.length && !DOI_STOP.has(s[j]!)) j++
    if (j === suffixStart) continue
    let doi = s.slice(i, j)
    while (doi.endsWith('.') || doi.endsWith(',') || doi.endsWith(';') || doi.endsWith(':')) doi = doi.slice(0, -1)
    if (!seen.has(doi)) { seen.add(doi); out.push(doi) }
    i = j - 1
  }
  return out
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

/** The search endpoint for a subject, asking only for the fields a candidate is judged on. Crossref indexes on
 *  the order of a hundred million works, so a bibliographic query over a theorem's subject reaches real primary
 *  sources — a query for Landauer's principle returns Landauer's own 1984 and 1989 papers. */
export const crossrefSearchUrl = (subject: string, rows = 5, mailto?: string): string =>
  'https://api.crossref.org/works?query.bibliographic=' + encodeURIComponent(subject) +
  '&rows=' + String(rows) +
  '&select=' + encodeURIComponent('DOI,title,container-title,issued,author') +
  (mailto ? '&mailto=' + encodeURIComponent(mailto) : '')

/** A source Crossref OFFERS for a subject. It is a candidate and the type says so: nothing here has been read,
 *  and nothing here has been judged to support anything. */
export interface CandidateSource { citation: Citation; judged: false }

/** searchSources(subject, get) → what Crossref offers for a subject, as CANDIDATES.
 *
 *  WHY THIS RETURNS CANDIDATES AND NEVER ATTACHES ONE. The witness leg is granted by a keyword roster, so a script
 *  that took the first hit for every unwitnessed theorem would score every one of them by tomorrow — and the leg
 *  would then measure nothing at all. rosetta.ts calls that the vacuity trap and names the cost: destroy the only
 *  measurement that located today's errors. Scarcity is not this leg's weakness, it is what it MEASURES.
 *
 *  And the deeper reason is one this tree has already paid for. Citation-existence cannot tell a source that
 *  SUPPORTS a claim from one that DENIES it — the gate stamped "uuidna achieves quantum advantage" VERIFIED
 *  against theorem n_qubit_dimension — whose own name ends "it is NOT a speedup or a quantum advantage".
 *  WHAT THAT THEOREM STATES is a dimension and a COST, not an advantage: [1,2,3,4,5] qubits span [2,4,8,16,32]
 *  amplitudes, which is precisely why simulating such a register classically is expensive. The bound is on the
 *  SIMULATION. Crossref has exactly that gap: it reports
 *  what a publisher deposited, never whether the work bears on the claim citing it. Automating the attachment
 *  would reproduce that defect once per theorem instead of once.
 *
 *  So this finds; a person reads and decides. That division is the whole design. */
export async function searchSources(
  subject: string,
  get: (url: string) => Promise<unknown | null>,
  rows = 5,
  mailto?: string,
): Promise<{ subject: string; candidates: CandidateSource[]; honest: string }> {
  let body: unknown | null = null
  try { body = await get(crossrefSearchUrl(subject, rows, mailto)) } catch { body = null }
  const items = (body as { message?: { items?: unknown[] } })?.message?.items ?? []
  const candidates = items
    .map((it) => parseCrossref({ message: it as Record<string, unknown> }))
    .filter((c): c is Citation => c !== null)
    .map((citation) => ({ citation, judged: false as const }))
  return {
    subject, candidates,
    honest:
      'CANDIDATES, NOT WITNESSES. Crossref reports what publishers deposited about works matching a subject; it ' +
      'has not read them and neither has this function. A candidate becomes a witness when a person retrieves the ' +
      'source and judges that it bears on the claim — attaching one automatically would score the ledger\'s ' +
      'scarcest leg without anyone reading anything, which is the vacuity trap rosetta.ts names.',
  }
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
