// conformance — the COMMIT DNA GATE: one hard-enforced check so no agent can sneak INCOMPATIBLE DNA into the ledger.
// It FOLDS uuidna's core invariants into a single recomputable report + receipt, so none can be bypassed one at a
// time: the captain coins are conserved, EVERY theorem's content-address recomputes (a forged or tampered theorem is
// caught — its DNA no longer matches), the security posture is clean (zero runtime deps, defences + collision-
// resistance sealed, the honesty gate bites, Clay solves none), and the ledger is non-empty and axiom-shaped. Run in
// the audit / pre-push wave; a non-conforming commit is BLOCKED. Recomputable by anyone — integrity, not truth.
import { theorems } from './theorems/index.js'
import { coins } from './captain/billing/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { securityAudit } from './security-audit.js'

export interface ConformanceCheck { id: string; pass: boolean; detail: string }
export interface ConformanceReport { checks: ConformanceCheck[]; conforms: boolean; passed: number; failed: number; receipt: string }

/** conformance() — fold the core DNA invariants into one report. `conforms` is true iff every check passes; the
 *  report folds order-invariantly to a receipt anyone recomputes. The enforcement a commit cannot slip past. */
let CACHED: ConformanceReport | null = null
export function conformance(): ConformanceReport {
  if (CACHED) return CACHED
  const T = theorems()
  const checks: ConformanceCheck[] = []
  const mk = (id: string, pass: boolean, detail: string): void => { checks.push({ id, pass, detail }) }

  // 1) the captain coins are conserved — the anchor of every fold (coins() = 2 = 110 − 108, −χ of the double torus)
  mk('captain-coins-conserved', coins() === 2 && T.some((t) => t.statement.trim() === '110 - 108 = 2'),
    `coins() = ${coins()} and two_coins is sealed — the conserved fair-exchange invariant holds`)

  // 2) EVERY theorem's DNA recomputes — a forged/tampered theorem is incompatible DNA and is caught here
  const forged = T.filter((t) => toUuid(t.key + ':' + t.statement) !== t.address).map((t) => t.key)
  mk('ledger-dna-recomputes', forged.length === 0,
    forged.length === 0 ? `all ${T.length} theorem content-addresses recompute — no forged/incompatible DNA` : `INCOMPATIBLE DNA: ${forged.length} theorem(s) whose address does not recompute: ${forged.slice(0, 5).join(', ')}`)

  // 3) the ledger is non-empty and single-sourced (every theorem carries a lean source file)
  const orphanTheorems = T.filter((t) => !t.file || !t.file.endsWith('.lean')).map((t) => t.key)
  mk('single-source-ledger', T.length > 0 && orphanTheorems.length === 0,
    orphanTheorems.length === 0 ? `${T.length} theorems, every one sourced from a lean/*.lean file` : `${orphanTheorems.length} theorem(s) with no lean source`)

  // 4) the security posture is clean — fold in the whole security audit (zero deps, defences + collision sealed, gate bites, Clay)
  const sec = securityAudit()
  mk('security-posture-clean', sec.passed,
    sec.passed ? `security audit clean: ${sec.checks.length} checks (zero deps, defences + collision sealed, gate bites, Clay)` : `security audit FAILED: ${sec.failed.join(', ')}`)

  const failed = checks.filter((c) => !c.pass)
  const receipt = merkleGravity(checks.map((c) => toUuid(c.id + '|' + c.pass)))
  return (CACHED = { checks, conforms: failed.length === 0, passed: checks.length - failed.length, failed: failed.length, receipt })
}
