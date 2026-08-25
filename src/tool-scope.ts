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

/** Parameter names that carry the CALLER'S OWN content. Matched on the parameter NAME because that is the part
 *  of the contract a client sees; a description is prose and drifts, a name is the key you must actually pass. */
const CALLER_SUPPLIED = /^(draft|before|after|text|prose|body|content|message|data|input|payload|plaintext|ciphertext|value|values|items|list|claim|statement|question|subject|html|css|json|url|password|passphrase|secret|seed|key64|nonce|salt|a|b|n|x|y|left|right)$/i

/** Parameter names that identify something INSIDE uuidna. A tool taking only these can answer about the ledger
 *  and nothing else, however many parameters it has. */
const LEDGER_IDENTIFIER = /^(key|slug|route|address|theorem|publication|domain|handle|skill|principle|wing|resource|course|track|lane|seat|id|uuid|q)$/i

/** scopeOf(schema) → what this tool can be pointed at, computed from its own parameters.
 *
 *  A name matching BOTH lists resolves to the ledger reading. `key` is the clearest case: `uuidna_seo` takes a
 *  theorem key, and treating that as caller-supplied content would classify the whole self-describing half of
 *  the catalogue as generic — which is precisely the error this module exists to correct. */
export function scopeOf(schema?: { properties?: Record<string, unknown> }): ToolScope {
  const params = Object.keys(schema?.properties ?? {})
  if (params.length === 0) return 'fixed'
  const takesCaller = params.some((p) => CALLER_SUPPLIED.test(p) && !LEDGER_IDENTIFIER.test(p))
  return takesCaller ? 'generic' : 'self'
}

export interface ScopeCensus { total: number; generic: number; self: number; fixed: number; honest: string }

/** The split, over any catalogue — so a client can show a caller how much of a surface can hear them before
 *  they spend a call finding out. */
export function scopeCensus(tools: readonly { inputSchema?: { properties?: Record<string, unknown> } }[]): ScopeCensus {
  const at = (s: ToolScope): number => tools.filter((t) => scopeOf(t.inputSchema) === s).length
  return {
    total: tools.length, generic: at('generic'), self: at('self'), fixed: at('fixed'),
    honest:
      'Scope reports what a tool can be TOLD, computed from its own inputSchema — never what it is good at, and ' +
      'never a quality judgement. A caller studying uuidna wants the self-scoped tools and should ask for those ' +
      'by name; a caller working on their own material wants the generic ones and could not previously find them.',
  }
}

/** The filter a client actually needs: hand it the catalogue and the scopes worth showing. */
export function toolsInScope<T extends { inputSchema?: { properties?: Record<string, unknown> } }>(
  tools: readonly T[], want: ToolScope | readonly ToolScope[],
): T[] {
  const wanted = Array.isArray(want) ? want : [want as ToolScope]
  return tools.filter((t) => wanted.includes(scopeOf(t.inputSchema)))
}
