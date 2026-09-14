// conformance — the COMMIT DNA GATE: one hard-enforced check so no agent can sneak INCOMPATIBLE DNA into the ledger.
// It FOLDS uuidna's core invariants into a single recomputable report + receipt, so none can be bypassed one at a
// time: the captain coins are conserved, EVERY theorem's content-address recomputes (a forged or tampered theorem is
// caught — its DNA no longer matches), the security posture is clean (zero runtime deps, defences + collision-
// resistance sealed, the honesty gate bites, Clay solves none), and the ledger is non-empty and axiom-shaped. Run in
// the audit / pre-push wave; a non-conforming commit is BLOCKED. Recomputable by anyone — integrity, not truth.
import { theorems } from './theorems/index.js'
import { coins } from './captain/billing/index.js'
import { toUuid, toUuidOnce } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { securityAudit } from './security-audit.js'
import { axiomWitness } from './axiom-witness.js'

/** `unmeasured` names why a check could not be measured on this surface; such a check never passes */
export interface ConformanceCheck { id: string; pass: boolean; detail: string; unmeasured?: string }
export interface ConformanceReport { checks: ConformanceCheck[]; conforms: boolean; passed: number; failed: number; receipt: string }

/** conformance() — fold the core DNA invariants into one report. `conforms` is true iff every check passes; the
 *  report folds order-invariantly to a receipt anyone recomputes. The enforcement a commit cannot slip past. */
let CACHED: ConformanceReport | null = null
export function conformance(): ConformanceReport {
  if (CACHED) return CACHED
  const T = theorems()
  const checks: ConformanceCheck[] = []
  const mk = (id: string, pass: boolean, detail: string, unmeasured?: string): void => { checks.push({ id, pass, detail, ...(unmeasured ? { unmeasured } : {}) }) }

  // 1) the captain coins are conserved — the anchor of every fold (coins() = 2 = 110 − 108, −χ of the double torus)
  mk('captain-coins-conserved', coins() === 2 && T.some((t) => t.statement.trim() === '110 - 108 = 2'),
    `coins() = ${coins()} and two_coins is sealed — the conserved fair-exchange invariant holds`)

  // 2) EVERY theorem's DNA recomputes — a forged/tampered theorem is incompatible DNA and is caught here
  const forged = T.filter((t) => toUuidOnce(t.key + ':' + t.statement) !== t.address).map((t) => t.key)
  mk('ledger-dna-recomputes', forged.length === 0,
    forged.length === 0 ? `all ${T.length} theorem content-addresses recompute — no forged/incompatible DNA` : `INCOMPATIBLE DNA: ${forged.length} theorem(s) whose address does not recompute: ${forged.slice(0, 5).join(', ')}`)

  // 3) the ledger is non-empty and single-sourced (every theorem carries a lean source file)
  const orphanTheorems = T.filter((t) => !t.file || !t.file.endsWith('.lean')).map((t) => t.key)
  mk('single-source-ledger', T.length > 0 && orphanTheorems.length === 0,
    orphanTheorems.length === 0 ? `${T.length} theorems, every one sourced from a lean/*.lean file` : `${orphanTheorems.length} theorem(s) with no lean source`)

  // 4) the security posture is clean — fold in the whole security audit (zero deps, defences + collision sealed, gate bites, Clay)
  // The audit folds in the kernel-only witness, which reads a file. Where the surface has no filesystem the witness
  // is not measured, so the posture is not measured either — unless another check failed, which is a measured failure.
  const sec = securityAudit()
  const witness = axiomWitness()
  const measuredFailures = sec.failed.filter((id) => id !== 'kernel-only-witness-shipped')
  const unmeasured = !sec.passed && !witness.measured && measuredFailures.length === 0 ? witness.why : undefined
  mk('security-posture-clean', sec.passed,
    sec.passed ? `security audit clean: ${sec.checks.length} checks (zero deps, defences + collision sealed, gate bites, Clay)`
      : unmeasured ? `not measured on this surface: the other ${sec.checks.length - 1} security checks pass; the kernel-only witness was not read — ${unmeasured}`
        : `security audit FAILED: ${sec.failed.join(', ')}`,
    unmeasured)

  const failed = checks.filter((c) => !c.pass)
  const receipt = merkleGravity(checks.map((c) => toUuid(c.id + '|' + c.pass)))
  return (CACHED = { checks, conforms: failed.length === 0, passed: checks.length - failed.length, failed: failed.length, receipt })
}
