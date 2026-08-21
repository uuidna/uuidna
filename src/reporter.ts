// reporter — reflect the REPORTER'S METHOD (Report.lean, sealed) as a LIVE check: a report of a PROVEN discovery
// ships only when it is AUDITED (passes the honesty gate — no fabricated theorem citation) AND CORROBORATED (≥ 2
// independent sources), the AND the ledger seals as `publish_gate_is_conjunction`. HONEST SCOPE, stated first because
// it is the whole point: uuidna does NOT verify world events — no `by decide` settles whether something happened out
// there. The reporter reports uuidna's OWN proven discoveries; this tool checks the DECIDABLE discipline (the gate +
// the source count), and leaves the completeness (the 5 W's + 1 H) and the trinity edit to human passes. The report
// content-addresses, so any edit is visible. Integrity, not truth.
import { auditPublication, type PubFinding } from './publish.js'
import { toUuid } from './address.js'

export interface FiledReport {
  sources: string[]
  audited: boolean       // passes the honesty gate — no fabricated theorem citation (the "verified" arm)
  corroborated: boolean  // ≥ 2 independent sources; the threshold lives here, not in a theorem that only compared 1 to 2
  publishable: boolean   // AUDITED ∧ CORROBORATED — the publish gate (publish_gate_is_conjunction)
  findings: PubFinding[] // what blocks publication (a sentence citing a fabricated theorem)
  receipt: string        // content-address of the filing (draft + sources + verdict)
  honest: string
}

const HONEST =
  'The reporter\'s method, live: a report of a PROVEN discovery PUBLISHES only when AUDITED (the honesty gate clears — ' +
  'no fabricated theorem citation) AND CORROBORATED (≥ 2 independent sources) — the AND sealed as ' +
  'publish_gate_is_conjunction. HONEST SCOPE: uuidna does NOT verify world events; the reporter reports uuidna\'s OWN ' +
  'proven discoveries. Completeness (the 5 W\'s + 1 H) and the trinity edit are HUMAN passes, not decided here. ' +
  'Integrity, not truth.'

/** fileReport(draft, sources) → apply the reporter's method to a report of a PROVEN discovery. It PUBLISHES only when
 *  AUDITED (the honesty gate clears — no fabricated citation) AND CORROBORATED (≥ 2 sources). uuidna checks the
 *  decidable discipline; completeness (5 W's + 1 H) and the trinity edit remain human passes. */
export function fileReport(draft: string, sources: string[] = []): FiledReport {
  const findings = auditPublication(draft)
  const audited = findings.length === 0
  const corroborated = sources.length >= 2
  const publishable = audited && corroborated
  return {
    sources,
    audited,
    corroborated,
    publishable,
    findings,
    receipt: toUuid(`report|${draft}|sources=${sources.join(',')}|publishable=${publishable}`),
    honest: HONEST,
  }
}
