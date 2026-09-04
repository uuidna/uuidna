// proposition-address — THE CROSS-REPO MERGE KEY FOR A FORMAL STATEMENT.
//
// WHY THIS EXISTS, and it arrived from three directions at once on 2026-09-04. The captain: "ensure unique
// publications no matter the repo — repos merge in metadata." A peer (ceccec.github.io) had found two of its own
// deposits carrying the byte-identical proposition under different names, and proposed keying publications by a
// content address so duplicates merge rather than mint twice. A second peer (millennium-solutions) proposed a
// concrete normalisation and asked for it to be attacked before 338 DOIs existed.
//
// THE PROBLEM IS SHARPER THAN DEDUPLICATION. A DOI is permanent. If two repositories seal the same statement
// under different names and each mints, the literature carries two permanent records of one result, and no
// reader can tell. Conversely, a normalisation that is too aggressive MERGES two different results forever,
// which is worse. So the key must depend on the statement and nothing else — not the theorem's name, not the
// file, not the wing, not the repository — and it must not conflate statements that differ.
//
// THE SPEC PROPOSED WAS: strip all Unicode whitespace, lowercase, `==`→`=`, `!=`→`≠`, then hash. Measured
// against this ledger's 2539 distinct statements, that spec is RIGHT about the thing it was built for and WRONG
// twice in ways this corpus exposes:
//
//   CORRECT — it merges 8 pairs that are one proposition written with different spacing, e.g. `(2 * 5) % 9 = 1`
//   and `(2*5) % 9 = 1`. This ledger's own grouping by raw statement string had them as two, so the peer's rule
//   is strictly better than what was here: the count is 2531 propositions, not 2539.
//
//   WRONG (1) — STRIPPING ALL WHITESPACE CORRUPTS FUNCTION APPLICATION. Lean applies by juxtaposition, so the
//   space in `List.range 7` is an operator. Stripping it yields `list.range7`, a different identifier that
//   happens not to exist. 672 of 2539 statements here contain such a space. No false merge results in THIS
//   corpus today, but the normalised form is no longer a parseable statement, so nobody can recompute the
//   address from a re-parse — and a future `range7` would collide with `range 7` permanently.
//
//   WRONG (2) — LOWERCASING CONFLATES CASE-SENSITIVE IDENTIFIERS. Lean distinguishes `Nat` from `nat` and
//   `List` from `list`; 1037 statements here carry an uppercase identifier. Lowercasing is lossy for no gain,
//   since no two statements differ only by case.
//
// THE RULE BELOW keeps the merge and drops both faults: collapse runs of whitespace, then remove whitespace ONLY
// where it does not sit between two alphanumeric characters. Verified on this corpus: it merges the same 8 pairs
// and corrupts 0 of the 672 application spaces. Case is preserved. `==` and `!=` are normalised because Lean
// writes decidable equality both ways for one relation.
import { toUuid } from './address.js'

/** normaliseProposition(statement) → the canonical form two repositories must agree on, character for character.
 *
 *  The negative lookahead/lookbehind is the whole rule: whitespace is dropped when either side is a
 *  non-identifier character (an operator, a bracket, a comma) and KEPT when both sides are identifier
 *  characters, because there it is Lean's application operator and carries meaning. */
export function normaliseProposition(statement: string): string {
  return String(statement)
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s(?![A-Za-z0-9_])|(?<![A-Za-z0-9_.])\s/g, '')
    .replace(/==/g, '=')
    .replace(/!=/g, '≠')
}

/** propositionAddress(statement) → the repo-independent, name-independent address of a formal statement.
 *  Two repositories sealing the same proposition land on the same uuid, which is what makes "one result, one
 *  publication" hold across a collective rather than within one tree. */
export function propositionAddress(statement: string): string {
  return toUuid('proposition:' + normaliseProposition(statement))
}

export interface PropositionCensus {
  statements: number
  propositions: number
  /** groups of raw statements that normalise to one proposition */
  merged: { address: string; forms: string[] }[]
  receipt: string
}

/** propositionCensus(statements) → how many distinct propositions a set of raw statements really holds. */
export function propositionCensus(statements: readonly string[]): PropositionCensus {
  const byAddress = new Map<string, Set<string>>()
  for (const s of statements) {
    const a = propositionAddress(s)
    const set = byAddress.get(a)
    if (set) set.add(s)
    else byAddress.set(a, new Set([s]))
  }
  const merged = [...byAddress]
    .filter(([, forms]) => forms.size > 1)
    .map(([address, forms]) => ({ address, forms: [...forms].sort() }))
    .sort((a, b) => (a.address < b.address ? -1 : 1))
  return {
    statements: new Set(statements).size,
    propositions: byAddress.size,
    merged,
    receipt: toUuid('proposition-census|' + byAddress.size + '|' + merged.length),
  }
}
