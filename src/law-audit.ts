// law-audit — ONE CALL AUDITS AN AGENT'S ACTION AGAINST EVERY LAW AND EVERY LEGAL GATE (the captain, 2026-09-14: "fuse
// all law apis as well so legal audit of all agent actions is in realtime"). The legal doors each judged one thing —
// adjudicate the statement, the honesty gate its citations, the forensic audit the agent's cited theorems, laws() the
// standing rules. Fused here, an action is judged by all of them at once and answered with one content address, so a
// hook can save and deposit every audit as a receipt the moment it is made.
//
// A BREACH is what the gates refuse: a fabricated citation, a forensic violation, or a standing law that does not hold.
// An action that cites no theorem is UNVERIFIED — reported, not a breach: a plain act makes no sealed claim.
import { laws, type Laws } from './laws.js'
import { adjudicate } from './adjudicate.js'
import { computes } from './gate.js'
import { auditAgentStatement } from './anti-fraud.js'
import { toUuid } from './address.js'

export interface AgentAction { agent: string; tool: string; statement: string; cited?: string[] }

// the laws recompute from the ledger, which does not move inside a process, so they are computed once per process
let lawsNow: Laws | null = null
const standing = (): Laws => (lawsNow ??= laws())

/** auditAction(action) → every legal gate's verdict on one agent action, its breaches, and one receipt over all of it */
export function auditAction(a: AgentAction) {
  const L = standing()
  const cited = a.cited ?? []
  const verdict = adjudicate(a.statement)
  const honesty = computes(a.statement)
  const forensic = auditAgentStatement(a.agent, a.statement, cited)
  const breaches = [
    ...L.laws.filter((l) => !l.holds).map((l) => `law does not hold: ${l.law}`),
    ...(honesty.binary === 0 ? [`fabricated citation: ${honesty.hit}`] : []),
    ...forensic.violations,
  ]
  const answer = {
    action: { agent: a.agent, tool: a.tool, statement: a.statement, cited },
    clean: breaches.length === 0,
    breaches,
    verdict: { verdict: verdict.verdict, note: verdict.note, cites: (verdict.cites ?? []).map((c) => c.key) },
    honesty,
    forensic: { violations: forensic.violations, forgeries: forensic.forgeries.length, receipt: forensic.receipt },
    laws: { of: L.laws.length, holding: L.laws.filter((l) => l.holds).length, receipt: L.receipt },
  }
  return { ...answer, receipt: toUuid(JSON.stringify(answer)) }
}
