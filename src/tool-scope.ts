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
// HONEST SCOPE: this reports what a tool can be TOLD, never what it is good at. A `generic` tool is not thereby
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
 *  Plurals of these stems are admitted by `numberInvolute` — not by widening the open set of author names. */
const CALLER_SUPPLIED = /^(draft|before|after|text|prose|body|content|message|data|input|payload|plaintext|ciphertext|value|values|items|list|claim|statement|question|subject|html|css|json|url|password|passphrase|secret|seed|key64|nonce|salt|a|b|n|x|y|left|right|uuids|links)$/i

/** Parameter names that identify something INSIDE uuidna. A tool taking only these can answer about the ledger
 *  and nothing else, however many parameters it has. `keys` involutes to `key`; bare `uuid` stays an id,
 *  while transport chains use `uuids` on the caller roster (not folded into ledger via the involution). */
const LEDGER_IDENTIFIER = /^(key|slug|route|address|theorem|publication|domain|handle|skill|principle|wing|resource|course|track|lane|seat|id|uuid|q)$/i

/**
 * Singular ↔ plural involution on a parameter token — self-inverse on the pairs the catalogue uses
 * (`message`↔`messages`, `key`↔`keys`, `passphrase`↔`passphrases`, …). CamelCase and unit suffixes are
 * left alone: involuting `appliedMillivolts` would invent a false stem.
 */
export function numberInvolute(name: string): readonly string[] {
  if (/[A-Z]/.test(name) || /[0-9]/.test(name)) return [name]
  const forms = new Set<string>([name])
  if (/ies$/i.test(name) && name.length > 3) forms.add(name.replace(/ies$/i, 'y'))
  else if (/s$/i.test(name) && !/ss$/i.test(name) && name.length > 1) forms.add(name.slice(0, -1))
  else {
    forms.add(name + 's')
    if (/[^aeiou]y$/i.test(name)) forms.add(name.slice(0, -1) + 'ies')
  }
  return [...forms]
}

/** Caller-content hit: exact roster, or number-involution of a roster stem. */
export const isCallerParam = (p: string): boolean =>
  CALLER_SUPPLIED.test(p) || numberInvolute(p).some((f) => f !== p && CALLER_SUPPLIED.test(f))

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
  // `passphrases`, `uuids`) were not — a tool taking `passphrases` read as ledger-only. `numberInvolute`
  // closes singular↔plural on the existing stems (self-inverse); `uuids` stays caller transport and does not
  // fold into ledger `uuid`. The open set of author names is still open — unrecognised names still stop.
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
