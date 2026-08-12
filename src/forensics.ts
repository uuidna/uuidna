// forensics — audit an agent's STATEMENTS against the RECEIPTS. When an agent (or a chat message) claims a proof, it
// must cite a real one; when it claims an address, the text must recompute to it. Forensics recomputes and compares,
// so a FALSE TRIAL — a claim dressed as sealed that the ledger does not back — cannot stand. Every violation is on
// the CLAIM, never on a person: it names a fabricated citation or a mismatched address, not a "traitor". The flag is
// a recomputable fact anyone rechecks, which is exactly why it needs no accusation. Integrity, not truth.
//
// It detects four kinds, each content-addressed and folded to one receipt:
//   · overreach          — the statement drains a named overclaim (the honesty gate, unbacked/undemarcated).
//   · fabricated-citation — it cites a /theorem/<key> or "theorem <key>" that is NOT in the sealed ledger.
//   · false-address       — it presents a uuid AS a ledger/theorem address that is not one of the real ones.
//   · address-mismatch    — an explicit {text → address} claim that does not recompute (a tamper or a forgery).
import { THEOREMS } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { overreachOf } from './prose-gate.js'
import { adjudicate, type VerdictKind } from './adjudicate.js'

const SEALED_KEYS = new Set(THEOREMS.map((t) => t.key))
const SEALED_ADDRS = new Set(THEOREMS.map((t) => t.address))

export interface Violation { kind: 'overreach' | 'fabricated-citation' | 'false-address' | 'address-mismatch' | 'unbacked-law'; detail: string; address: string }
export interface ForensicReport {
  statement: string
  address: string          // the statement's own content-address
  verdict: VerdictKind     // the trial's verdict on the statement itself (what the receipts say, recomputed)
  violations: Violation[]
  clean: boolean
  receipt: string          // the violations folded, order-invariant — recomputable by anyone from the same ledger
  honest: string
}

const UUID_RE = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi

/** forensics(statement[, {claims}]) → audit ONE agent statement against the receipts. Deterministic and recomputable:
 *  the same statement and ledger yield the same violations and the same receipt, so a dispute is settled by rechecking,
 *  not by authority. `claims` are explicit {text, address} assertions the agent made, verified by recomputation. */
export function forensics(statement: string, opts: { claims?: { text: string; address: string }[] } = {}): ForensicReport {
  const V: Violation[] = []
  const add = (kind: Violation['kind'], detail: string): void => { V.push({ kind, detail, address: toUuid(kind + '|' + detail) }) }

  // 1) overreach — the honesty gate on the statement's own prose.
  const drained = overreachOf(statement)
  if (drained) add('overreach', `drains the overclaim "${drained}" (back it with a sealed /theorem/<key> or demarcate it)`)

  // 2) fabricated citations — a theorem cited by key that the sealed ledger does not contain.
  const cited = new Set<string>()
  for (const m of statement.matchAll(/\/theorem\/([a-z0-9_]+)/gi)) cited.add(m[1])
  for (const m of statement.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,})/gi)) cited.add(m[1])
  for (const k of cited) if (!SEALED_KEYS.has(k)) add('fabricated-citation', `cites theorem "${k}" — no such sealed theorem in the ledger`)

  // 3) false addresses — a uuid presented AS a ledger/theorem address (a nearby "address / sealed / theorem /
  //    receipt / proof" word) that is not one of the real sealed addresses. A plain uuid with no such framing is fine.
  const FRAME = /(address|sealed|theorem|receipt|proof)/i
  for (const m of statement.matchAll(UUID_RE)) {
    const uuid = m[0].toLowerCase()
    const at = m.index ?? 0
    const before = statement.slice(at < 32 ? 0 : at - 32, at)
    if (FRAME.test(before) && !SEALED_ADDRS.has(uuid)) add('false-address', `presents ${uuid} as a sealed address — not among the ledger's ${SEALED_ADDRS.size} addresses`)
  }

  // 4) explicit {text → address} claims — recompute and compare (a keyless tamper/forgery check).
  for (const c of opts.claims || []) {
    const real = toUuid(c.text)
    if (real !== c.address) add('address-mismatch', `claims "${c.text.slice(0, 48)}${c.text.length > 48 ? '…' : ''}" → ${c.address}, but it recomputes to ${real}`)
  }

  // 5) unbacked law — a claim of legality/lawfulness/compliance must CARRY A RECEIPT: the specific statement, content-
  //    addressed. If the agent says it knows the law but cites no receipt (no /theorem/, no uuid, no {text→address}
  //    claim), the claim is unbacked. The receipt proves you made THIS exact claim, recomputably — NEVER that the
  //    claim is legally correct (that is a court's ruling, not a fold). "Say you know the law → carry its receipt."
  const LAW = /\b(lawful(ly)?|legal(ly)?|complian\w+|complies|according to (the )?law|knows? the law|by law|licen[sc]ed)\b/i
  const carriesReceipt = /\/theorem\//.test(statement) || UUID_RE.test(statement) || (opts.claims || []).length > 0
  UUID_RE.lastIndex = 0 // reset the global regex after .test above
  if (LAW.test(statement) && !carriesReceipt) add('unbacked-law', 'claims lawful/legal/compliant but carries no receipt — cite the specific statement and its content-address (a receipt proves the claim was made, not that it is legally correct)')

  return {
    statement,
    address: toUuid(statement),
    verdict: adjudicate(statement).verdict,
    violations: V,
    clean: V.length === 0,
    receipt: V.length ? merkleFold(V.map((v) => v.address)) : toUuid('forensics-clean'),
    honest:
      'Every violation is a recomputable fact about the CLAIM — a fabricated citation, a false address, a drained ' +
      'overclaim — never an accusation of a person. Recheck it from the same ledger and get the same result; a false ' +
      'trial cannot survive recomputation. The flag is cleared by fixing the claim (cite a real proof, correct the ' +
      'address, demarcate the prose), not by appeal. Integrity, not truth.',
  }
}

/** auditAgents(statements) → forensics on each, plus the aggregate: how many statements, how many carried a violation,
 *  the violations by kind, and one folded receipt over all of them. For monitoring a chat/message stream. */
export function auditAgents(statements: string[]): {
  count: number; withViolations: number; byKind: Record<string, number>; reports: ForensicReport[]; receipt: string
} {
  const reports = statements.map((s) => forensics(s))
  const byKind: Record<string, number> = {}
  for (const r of reports) for (const v of r.violations) byKind[v.kind] = (byKind[v.kind] || 0) + 1
  return {
    count: reports.length,
    withViolations: reports.filter((r) => !r.clean).length,
    byKind,
    reports,
    receipt: merkleFold(reports.map((r) => r.receipt)),
  }
}
