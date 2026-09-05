// tool-scope — CAN THIS TOOL BE TOLD ABOUT *YOUR* SUBJECT, OR ONLY ABOUT UUIDNA'S?
//
// The question a caller from outside actually has, and the one the served surface could not answer. An agent
// reached the hosted MCP to audit its own site, worked through the catalogue, and concluded that none of it
// applied — correctly. Of 204 tools, 143 can only describe uuidna's own sealed ledger: 46 take no parameters at
// all, and 97 take only ledger identifiers (a theorem key, a publication slug, a route). The remaining 61 are
// genuine reusable primitives — the merkle trio, the cipher suite, sanitize, content-addressing — and they are
// a coherent product. The problem was never that the surface is empty. It is that the useful third is
// undiscoverable inside the other two, and every external caller has to rediscover the split by trial.
//
// WHY THE EXISTING USABILITY METRIC CANNOT ANSWER IT. mcpBenchmark rates a tool 5/5 for needing zero REQUIRED
// keys — "maximally reusable, composes anywhere" — which is a sound measure of composition cost and exactly
// inverted for reach. `uuidna_css` has zero parameters and rates 5/5; it returns a fixed ℤ/9 palette and there is
// no entry point through which to mention your brand colour. `uuidna_edit` also rates 5/5 and accepts arbitrary
// prose. Both score at the top, and `rate()` reads only `required` while `params` sits computed and unused, so
// the headline "79 maximally reusable" silently merges 46 tools that can accept nothing with 33 that can accept
// you. Two different products, one number.
//
// COMPUTED, NEVER AUTHORED. The scope is derived from the tool's own inputSchema, so it cannot drift out of step
// with the contract the way a hand-kept list of 204 labels would. Adding a parameter changes the answer; nobody
// has to remember to relabel anything.
//
// this reports what a tool can be TOLD, never what it is good at. A `generic` tool is not thereby
// useful and a `self` tool is not thereby useless — a caller studying uuidna wants the self-scoped ones and
// should be able to ask for exactly those. Integrity, not truth.

/** What a tool can be pointed at. */
export type ToolScope =
  | 'generic'   // accepts the caller's own subject matter — works on anything
  | 'self'      // accepts only identifiers naming something inside uuidna's ledger
  | 'fixed'     // takes no parameters: one answer, about uuidna, always
  | 'unclassified' // carries a parameter NEITHER list names — unmeasured, and never quietly read as 'self'

/** Parameter names that carry the CALLER'S OWN content. Matched on the parameter NAME because that is the part
 *  of the contract a client sees; a description is prose and drifts, a name is the key you must actually pass.
 *  Plurals of these stems are admitted by `numberInvolute` — not by widening the open set of author names.
 *
 *  CLOSED AGAIN 2026-09-01, the same way the energy units closed it. Ten ported-Alpine tools arrived naming
 *  their caller inputs `entries`, `records`, `expect`, `of`, `by`, `room`, `args`, `prove`, and six of them fell
 *  into `unclassified` — which is the bucket working: an unrecognised name is measured as unknown rather than
 *  guessed into `generic`. These are caller content by inspection (a room to seal into, records to fold, a URL's
 *  expected address), so they join the roster. The bucket stays honest; the next unknown name still lands in it.
 *  Energy magnitudes use ENERGY_UNIT_STEM (suffix), not this open roster. */
const CALLER_SUPPLIED = /^(draft|before|after|text|prose|body|content|message|data|input|payload|plaintext|ciphertext|value|values|items|list|claim|statement|question|subject|html|css|json|url|password|passphrase|secret|seed|key64|nonce|salt|a|b|c|d|m|n|x|y|left|right|uuids|links|leaf|proof|root|deposit|material|candidate|fact|vote|query|title|name|word|hex|path|file|index|arg|term|sealed|bit|party|op|step|stride|length|iteration|limit|mod|branch|kind|status|state|type|filter|match|line|from|to|action|agent|session|counter|tag|ct|aad|base64|sha256|response|proposal|circuit|chain|contract|dimension|delimiter|contains|likelihood|commercial|licensee|license|output|cached|reasoning|label|author|caption|contribution|source|sourceLang|targetLang|translation|book|bookId|bookIds|scale|tempo|rung|base|bound|gate|install|repo|arch|writer|core|qubit|genesis|start|oneTimeKey|capacity|category|country|countryCode|cpv|dataset|geo|time|vacancy|perSkill|escoTitle|escoTitles|rule|formulaReceipt|formulaReceipts|recomputeOp|recomputeOps|verifyOp|verifyOps|claimedCoin|claimedCoins|expectedReceiptAll|vatNumber|seenAddress|seenAddresses|centiLoad1|memTotalMb|memFreeMb|cylinders|encoded|wave|command|spawn|fetch|messaging|run|verify|enrich|loadPayload|all|entries|records|expect|of|by|room|args|prove|tokens|purpose|theorems|tests|landed|posts|handle|checklist|slug|record|size|need|template|idea)$/i

// `template` and `idea` joined with uuidna_cloudflare, `need` with uuidna_team (2026-09-05): the words describing an application are the
// caller's own material, exactly like `query` or `subject`. The census refused to classify it and named the
// remedy in its own text — add the name to the list it belongs to — which is what this is, rather than a
// widened rule that would absorb the next unmeasured name silently.
/** Energy / SI-magnitude unit stems — the four uuidna_energy_* tools name caller inputs with a quantity + unit
 *  suffix (wavelengthNanometres, appliedMillivolts, …). Matched as a SUFFIX so a new magnitude on the same
 *  unit closes without widening the open author-name set; abbreviations (`wavelengthNm`) stay unmeasured. */
const ENERGY_UNIT_STEM =
  /(?:Millimetres|MillimetresPerSecond|Millivolts|Milliwatts|MilliwattsPerCubicMetre|Nanometres|Kelvin|Litres|GramsPerCubicMetre|Percent|RevolutionsPerMinute|Hours|SquareMillimetres)$/i

/** Parameter names that identify something INSIDE uuidna. A tool taking only these can answer about the ledger
 *  and nothing else, however many parameters it has. `keys` involutes to `key`; bare `uuid` stays an id,
 *  while transport chains use `uuids` on the caller roster (not folded into ledger via the involution).
 *  CamelCase ledger keys (`theoremKey`, …) are listed verbatim — involution leaves them alone. */
const LEDGER_IDENTIFIER = /^(key|slug|route|address|theorem|publication|domain|handle|skill|principle|wing|resource|course|track|lane|seat|id|uuid|q|theoremKey|theoremCited|theoremProof|citedTheorem|citedTheorems|recordId|gutenbergId|cveId|workAddress|citedAddress|expectedFingerprint|education|licenseBinding|reeducation|infuse|referrer|def)$/i

/**
 * Singular ↔ plural involution on a parameter token — self-inverse on the pairs the catalogue uses
 * (`message`↔`messages`, `key`↔`keys`, `passphrase`↔`passphrases`, `leaf`↔`leaves`, `address`↔`addresses`,
 * `bookId`↔`bookIds`, `seenAddress`↔`seenAddresses`, …). Unit-bearing CamelCase keeps only a trailing-s fold
 * so numberInvolute never invents a roster stem from `appliedMillivolts`; ENERGY_UNIT_STEM reads the suffix.
 */
export function numberInvolute(name: string): readonly string[] {
  const forms = new Set<string>([name])
  // CamelCase / digit-bearing tokens: trailing-s involution only (bookIds↔bookId; Addresses↔Address via -es).
  if (/[A-Z]/.test(name) || /[0-9]/.test(name)) {
    if (/(?:sses|zzes|xes|ches|shes)$/.test(name) && name.length > 4) forms.add(name.replace(/es$/, ''))
    else if (/[a-z]s$/.test(name) && !/ss$/.test(name) && name.length > 2) forms.add(name.slice(0, -1))
    else if (/[a-z]$/.test(name) && /[A-Z]/.test(name)) {
      if (/(?:s|x|z|ch|sh)$/.test(name)) forms.add(name + 'es')
      else forms.add(name + 's')
    }
    return [...forms]
  }
  // Catalogue irregular: leaf ↔ leaves (regular -s would invent leave / leafs and miss the live stem).
  if (/^leaf$/i.test(name)) { forms.add('leaves'); return [...forms] }
  if (/^leaves$/i.test(name)) { forms.add('leaf'); return [...forms] }
  if (/ies$/i.test(name) && name.length > 3) forms.add(name.replace(/ies$/i, 'y'))
  // -es plurals of stems ending in s/x/z/ch/sh (address↔addresses). Narrower than /[sx]es$/ so
  // passphrases still strips to passphrase, not passphras.
  else if (/(?:sses|zzes|xes|ches|shes)$/i.test(name) && name.length > 4) forms.add(name.replace(/es$/i, ''))
  else if (/s$/i.test(name) && !/ss$/i.test(name) && name.length > 1) forms.add(name.slice(0, -1))
  else {
    if (/(?:s|x|z|ch|sh)$/i.test(name)) forms.add(name + 'es')
    else forms.add(name + 's')
    if (/[^aeiou]y$/i.test(name)) forms.add(name.slice(0, -1) + 'ies')
  }
  return [...forms]
}

/** Caller-content hit: exact roster, energy unit suffix, or number-involution of a roster stem. */
export const isCallerParam = (p: string): boolean =>
  CALLER_SUPPLIED.test(p) || ENERGY_UNIT_STEM.test(p)
  || numberInvolute(p).some((f) => f !== p && (CALLER_SUPPLIED.test(f) || ENERGY_UNIT_STEM.test(f)))

/** Ledger-id hit. `uuids` is transport (caller) — do not fold it to ledger `uuid`. */
export const isLedgerParam = (p: string): boolean => {
  if (/^uuids$/i.test(p)) return false
  return LEDGER_IDENTIFIER.test(p) || numberInvolute(p).some((f) => f !== p && LEDGER_IDENTIFIER.test(f))
}

/** scopeOf(schema) → what this tool can be pointed at, computed from its own parameters.
 *
 *  A name matching BOTH lists resolves to the ledger reading. `key` is the clearest case: `uuidna_seo` takes a
 *  theorem key, and treating that as caller-supplied content would classify the whole self-describing half of
 *  the catalogue as generic — which is precisely the error this module exists to correct. */
/** Parameter names on NEITHER list. The scope question cannot be decided over these, and naming them is the
 *  remedy: add the name to whichever list it belongs to, or rename the parameter. */
export const unrecognisedParams = (schema?: { properties?: Record<string, unknown> }): string[] =>
  Object.keys(schema?.properties ?? {}).filter((p) => !isCallerParam(p) && !isLedgerParam(p))

export function scopeOf(schema?: { properties?: Record<string, unknown> }): ToolScope {
  const params = Object.keys(schema?.properties ?? {})
  if (params.length === 0) return 'fixed'
  // THE UNMEASURED CASE IS ITS OWN ANSWER (2026-08-25). This read `takesCaller ? generic : self`, so a parameter
  // matching NEITHER list fell through to 'self' — the STRONGER claim, that the tool can only be pointed at
  // uuidna's own ledger. Measured over the live catalogue: 204 tools, 46 fixed, 43 whose every parameter one of
  // the lists actually names, and 115 carrying at least one name neither list has heard of. Those 115 were
  // reported as ledger-only by a rule that never looked at them, and the error ran in the ADMITTING direction —
  // a caller filtering for 'self' received tools that take the caller's own material.
  //
  // THE SEAM, NOW INVOLUTED: singular stems were listed while live plurals (`claims`, `keys`, `messages`,
  // `passphrases`, `uuids`, `leaves`, `deposits`, `addresses`) were not — a tool taking `passphrases` read as
  // ledger-only. `numberInvolute` closes singular↔plural on the existing stems (self-inverse), including the
  // catalogue irregulars leaf↔leaves and address↔addresses; `uuids` stays caller transport and does not fold
  // into ledger `uuid`. The open set of author names is still open — unrecognised names still stop.
  if (unrecognisedParams(schema).length > 0) return 'unclassified'
  const takesCaller = params.some((p) => isCallerParam(p) && !isLedgerParam(p))
  return takesCaller ? 'generic' : 'self'
}

export interface ScopeCensus {
  total: number; generic: number; self: number; fixed: number
  /** tools carrying a parameter neither list names — counted, never folded into the other three */
  unclassified: number
  /** every unrecognised parameter name in the catalogue, so the gap is ACTIONABLE and not merely counted */
  unrecognised: string[]
  honest: string
}

/** The split, over any catalogue — so a client can show a caller how much of a surface can hear them before
 *  they spend a call finding out. */
export function scopeCensus(tools: readonly { inputSchema?: { properties?: Record<string, unknown> } }[]): ScopeCensus {
  const at = (s: ToolScope): number => tools.filter((t) => scopeOf(t.inputSchema) === s).length
  return {
    total: tools.length, generic: at('generic'), self: at('self'), fixed: at('fixed'),
    unclassified: at('unclassified'),
    unrecognised: [...new Set(tools.flatMap((t) => unrecognisedParams(t.inputSchema)))].sort(),
    honest:
      'Scope reports what a tool can be TOLD, computed from its own inputSchema — never what it is good at, and ' +
      'never a quality judgement. A caller studying uuidna wants the self-scoped tools and should ask for those ' +
      'by name; a caller working on their own material wants the generic ones and could not previously find them. ' +
      'UNCLASSIFIED IS NOT A FOURTH KIND OF TOOL, it is the absence of a reading: the tool carries a parameter ' +
      'name neither list holds, so nothing here has measured it and it is reported as unmeasured rather than ' +
      'assumed. Every name in `unrecognised` is the whole remedy — list it or rename it, and the tool leaves ' +
      'this bucket. Counting them apart is the point: a scope census that silently absorbed them read 97 ' +
      'ledger-only tools where the lists could actually vouch for 43.',
  }
}

/** The filter a client actually needs: hand it the catalogue and the scopes worth showing. */
export function toolsInScope<T extends { inputSchema?: { properties?: Record<string, unknown> } }>(
  tools: readonly T[], want: ToolScope | readonly ToolScope[],
): T[] {
  const wanted = Array.isArray(want) ? want : [want as ToolScope]
  return tools.filter((t) => wanted.includes(scopeOf(t.inputSchema)))
}
