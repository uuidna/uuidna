// boundary-law — NO BOUNDARY UNLESS IN THEOREMS.
//
// A boundary is a claim about what is NOT proven, NOT in scope, or NOT admitted. The court holds those claims
// in lean/*.lean (theorem doc comments: HONEST SCOPE / SCOPE:) and in lean/leads.json refused[].boundary.
// Everywhere else may POINT at a sealed theorem — never restate the boundary in fresh prose.
//
// drift_is_named_or_caught (Audit.lean) is the harmony law: reach must be declared or caught; unnamed reach fails.
// legal_only_the_proven_is_admitted (Legal.lean) is the admission law: only proven or cited authority enters.
// provenance_integrity_not_content_truth (Reasoning.lean): integrity checks, not world truth.
// silence_never_refutes (Negation.lean): open is not refuted by absence.
import { theoremByKey } from './theorems/index.js'

/** The standard MCP / tool pointer — boundary declared by citation, not by restated prose. */
export const BOUNDARY_POINTER = 'Boundary declared — theorem drift_is_named_or_caught'

/** Theorem keys the gap survey and desk automation may cite — never invent scope prose. */
export const BOUNDARY_THEOREMS = {
  harmony: 'drift_is_named_or_caught',
  admission: 'legal_only_the_proven_is_admitted',
  integrity: 'provenance_integrity_not_content_truth',
  silence: 'silence_never_refutes',
  window: 'window_not_universal',
  remand: 'legal_remand_is_total_nothing_discarded',
} as const

export type BoundaryTheoremKey = (typeof BOUNDARY_THEOREMS)[keyof typeof BOUNDARY_THEOREMS]

/** boundaryCitation(key) → a lawful one-line pointer for non-Lean surfaces. */
export function boundaryCitation(key: BoundaryTheoremKey): string {
  return `Boundary declared — theorem ${key}`
}

/** isSealedBoundaryTheorem(key) → the ledger carries this key (live derive, never hardcode existence). */
export function isSealedBoundaryTheorem(key: string): boolean {
  return theoremByKey().has(key)
}

/** allBoundaryTheoremsSealed() → every law key the tree cites is in the ledger today. */
export function allBoundaryTheoremsSealed(): string[] {
  const missing: string[] = []
  for (const key of Object.values(BOUNDARY_THEOREMS)) {
    if (!isSealedBoundaryTheorem(key)) missing.push(key)
  }
  return missing
}

const sealedKeys = (): ReadonlySet<string> => new Set(theoremByKey().keys())

/** hasBoundaryPointer(text) → cites a sealed theorem instead of stating bare scope. */
export function hasBoundaryPointer(text: string, keys: ReadonlySet<string> = sealedKeys()): boolean {
  if (/Boundary declared — theorem [a-z][a-z0-9_]+/i.test(text)) return true
  if (/\/theorem\/[a-z][a-z0-9_]+/.test(text)) return true
  return [...text.matchAll(/\b([a-z][a-z0-9_]{6,})\b/g)].some((m) => keys.has(m[1]!))
}

/** stripHonestScopeProse(text) → true when text carries HONEST SCOPE / bare NOT-claims without a theorem pointer. */
export function bareBoundaryProse(text: string, keys: ReadonlySet<string> = sealedKeys()): boolean {
  if (!/\bHONEST SCOPE\b|\bNOT PROVEN\b|\bnever a (?:chip|solver|proof)\b|\bsolv(?:e[sd])?\s+none\b/i.test(text)) return false
  return !hasBoundaryPointer(text, keys)
}
