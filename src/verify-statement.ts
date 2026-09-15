// verify-statement — the FAST verification path of the framework: is this exact statement a SEALED theorem? uuidna
// is a verification framework, so it should verify a THEOREM directly, not only a prose claim that cites one. A
// statement byte-identical to a sealed theorem's statement VERIFIES in O(1) — a single content-address lookup against
// the ledger index — returning the sealing theorem, its tactic and address. No citation needed, no fuzzy matching:
// exact seal or nothing (never "false", only UNVERIFIED). This is complementary to the honesty gate (slimGate judges
// PROSE claims by citation); this judges whether a STATEMENT is itself sealed. Integrity, not truth.
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { normaliseProposition } from './proposition-address.js'

export interface StatementVerdict {
  verdict: 'VERIFIED' | 'UNVERIFIED'
  key?: string
  address?: string
  tactic?: string
  file?: string
  /** the sealed Lean line itself — the caller RECHECKS this against the kernel instead of trusting the verdict */
  lean?: string
  note: string
}

// the statement → theorem index, content-addressed. Built once, O(1) lookups thereafter (the fast path).
let INDEX: Map<string, { key: string; address: string; tactic: string; file: string; lean: string }> | null = null
const index = (): Map<string, { key: string; address: string; tactic: string; file: string; lean: string }> => {
  if (INDEX) return INDEX
  INDEX = new Map()
  for (const t of theorems()) INDEX.set(t.statement.trim(), { key: t.key, address: t.address, tactic: t.tactic, file: t.file, lean: t.lean })
  return INDEX
}

// the same index keyed by normaliseProposition — the cross-repo merge key, which collapses only spacing and ==/!= spelling
let NORMAL: Map<string, { key: string; address: string; tactic: string; file: string; lean: string; statement: string }> | null = null
const normalIndex = (): NonNullable<typeof NORMAL> => {
  if (NORMAL) return NORMAL
  NORMAL = new Map()
  for (const t of theorems()) {
    const n = normaliseProposition(t.statement)
    if (!NORMAL.has(n)) NORMAL.set(n, { key: t.key, address: t.address, tactic: t.tactic, file: t.file, lean: t.lean, statement: t.statement.trim() })
  }
  return NORMAL
}

/** verifyProposition(statement) → VERIFIED iff the statement, normalised by normaliseProposition, equals a sealed
 *  theorem's normalised statement and that theorem's content-address recomputes; UNVERIFIED otherwise. The exact
 *  byte match (verifyStatement) answers first. A prose sentence that cites a theorem is not its statement. */
export function verifyProposition(statement: string): StatementVerdict {
  const exact = verifyStatement(statement)
  if (exact.verdict === 'VERIFIED') return exact
  const n = normaliseProposition(statement)
  const hit = n ? normalIndex().get(n) : undefined
  if (!hit) return exact
  const intact = toUuid(hit.key + ':' + hit.statement) === hit.address
  return {
    verdict: intact ? 'VERIFIED' : 'UNVERIFIED',
    key: hit.key, address: hit.address, tactic: hit.tactic, file: hit.file, lean: hit.lean,
    note: intact
      ? `VERIFIED: this statement, normalised, IS the sealed theorem ${hit.key} (${hit.tactic}, ${hit.file}); its content-address recomputes to ${hit.address}`
      : 'address mismatch on recompute — the ledger entry does not verify (tamper or drift)',
  }
}

/** Verify a STATEMENT against the sealed ledger in O(1): VERIFIED iff it is byte-identical to a sealed theorem
 *  (recompute its address to confirm), else UNVERIFIED (not false — just not sealed). The framework's fast path. */
export function verifyStatement(statement: string): StatementVerdict {
  const s = String(statement).trim()
  const hit = index().get(s)
  if (!hit) return { verdict: 'UNVERIFIED', note: 'this exact statement is not a sealed theorem — cite a sealed proof or supply a decidable test (never called false, only not-yet-verified)' }
  // recompute the content-address to confirm the seal (a skeptic rechecks; the address is toUuid(key + ":" + statement))
  const recomputed = toUuid(hit.key + ':' + s)
  const intact = recomputed === hit.address
  return {
    verdict: intact ? 'VERIFIED' : 'UNVERIFIED',
    key: hit.key, address: hit.address, tactic: hit.tactic, file: hit.file, lean: hit.lean,
    note: intact
      ? `VERIFIED in O(1): this statement IS the sealed theorem ${hit.key} (${hit.tactic}, ${hit.file}); its content-address recomputes to ${hit.address}`
      : 'address mismatch on recompute — the ledger entry does not verify (tamper or drift)',
  }
}
