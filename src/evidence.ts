// evidence — deliver the EVIDENCE for a statement, so a court (or any auditor) accepts a uuidna trial by RECOMPUTING
// it, not by trusting it. A verdict on its own is testimony; evidence is a self-contained bundle that reproduces:
// the statement and its content-address, the trial verdict, the forensic audit against the receipts, every cited
// proof in full (its Lean text, its address, its source file), the ledger receipt the evidence is bound to, and the
// exact steps to recompute every number. Anyone re-runs the steps and lands on the same evidence receipt — or they
// do not, and the evidence is void. uuidna delivers what recomputes; the court rules. It proves INTEGRITY (the claim
// was made, the proofs are these, nothing was quietly changed), NEVER legal correctness — that is the court's, not a
// fold's. Deterministic and offline. Integrity, not truth.
import { THEOREMS } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { runTrial } from './theorems/index.js'
import { adjudicate, type VerdictKind } from './adjudicate.js'
import { forensics, type ForensicReport } from './forensics.js'

const GH = 'https://github.com/uuidna/uuidna/blob/main/lean/'

/** One piece of cited proof, delivered in full so it recomputes without the ledger at hand. */
export interface ProofExhibit { key: string; statement: string; lean: string; tactic: string; file: string; address: string; source: string }

export interface Evidence {
  statement: string
  address: string          // toUuid(statement) — recompute it to confirm the exhibit is this exact statement
  verdict: VerdictKind     // the trial's verdict on the statement
  forensics: ForensicReport // the audit against the receipts (fabricated citations, false addresses, overclaims, …)
  exhibits: ProofExhibit[] // every real theorem the statement cites, delivered in full
  citedButMissing: string[] // keys the statement cites that are NOT in the ledger — fabricated, no exhibit exists
  ledger: { count: number; receipt: string } // the ledger state this evidence is bound to (a changed ledger → a new receipt)
  recompute: string[]      // the exact, ordered steps anyone runs to reproduce every number above
  evidenceReceipt: string  // the whole bundle folded, order-invariant — the one address a court rechecks
  honest: string
}

/** evidence(statement) → the recomputable evidence bundle for a statement. Same statement + same ledger → same bundle
 *  and same evidenceReceipt, reproducible by anyone. Delivers integrity, never a legal ruling. */
export function evidence(statement: string): Evidence {
  const report = forensics(statement)
  const verdict = adjudicate(statement).verdict
  // exhibits — every theorem key the statement cites (/theorem/<key> or "theorem <key>") that really is sealed.
  const cited = new Set<string>()
  for (const m of statement.matchAll(/\/theorem\/([a-z0-9_]+)/gi)) cited.add(m[1])
  for (const m of statement.matchAll(/\btheorem\s+([a-z][a-z0-9_]{3,})/gi)) cited.add(m[1])
  const exhibits: ProofExhibit[] = []
  const citedButMissing: string[] = []
  for (const k of cited) {
    const t = THEOREMS.find((x) => x.key === k)
    if (t) exhibits.push({ key: t.key, statement: t.statement, lean: t.lean, tactic: t.tactic, file: t.file, address: t.address, source: GH + t.file })
    else citedButMissing.push(k)
  }
  const trial = runTrial()
  const ledger = { count: trial.count, receipt: trial.receipt }
  const recompute = [
    `1. The statement is this exact text; recompute its address: toUuid(statement) must equal ${toUuid(statement)}.`,
    `2. The trial verdict recomputes: adjudicate(statement).verdict = ${verdict} (the honesty gate is a pure function).`,
    `3. Each exhibit's address recomputes from its Lean text: toUuid(key + ':' + statement) must equal the address shown.`,
    `4. Every exhibit re-verifies sorry-free: run \`npm run lean\` — it regenerates lean/*.lean and re-proves each \`by ${'decide'}\`.`,
    `5. The ledger receipt recomputes: runTrial().receipt must equal ${ledger.receipt} (an order-invariant fold of all ${ledger.count} addresses).`,
    `6. This bundle's evidenceReceipt is the fold of the above; recompute it and it returns, or the evidence has been altered.`,
  ]
  const evidenceReceipt = merkleFold([
    toUuid('statement:' + statement),
    toUuid('verdict:' + verdict),
    report.receipt,
    ...exhibits.map((e) => e.address),
    toUuid('ledger:' + ledger.receipt),
  ])
  return {
    statement,
    address: toUuid(statement),
    verdict,
    forensics: report,
    exhibits,
    citedButMissing,
    ledger,
    recompute,
    evidenceReceipt,
    honest:
      'This delivers RECOMPUTABLE evidence: the statement, its verdict, the forensic audit, every cited proof in full, ' +
      'and the ledger receipt — each reproducible offline by anyone, folding to one evidenceReceipt. It proves the ' +
      'claim was made and the proofs are exactly these, with nothing quietly changed. It does NOT prove the claim is ' +
      'legally correct or admissible — that is a court\'s ruling. uuidna delivers what recomputes; the court rules.',
  }
}
