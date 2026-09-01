// school/refusals — EVERY REFUSAL, AND WHETHER ITS BOUNDARY SURVIVED.
//
// Two acts wear the same word and they are opposites. REFUSING WORK is declining to build something, on a stated
// boundary, recorded where anyone can argue with it — that is ordinary and often right. REFUSING THE COURT is
// bypassing the gate that judges the work, and it is the one act that makes every other claim here worthless,
// because the court's verdict is the only thing giving a sealed theorem its weight. This registry is about the
// first kind only; the second has no registry because it has no legitimate instance.
//
// THE INTERESTING COLUMN IS NOT THE REFUSAL, IT IS WHETHER THE BOUNDARY HELD. A refusal is a claim like any
// other and can be wrong in a particular way: it can rest on a limit that does not exist. One in this record
// did. I refused to build a security API over Alpine's 86 packages, having concluded uuidna "cannot confine,
// cannot scan, cannot authenticate" — and planAlpineRun('firejail') returns ok:true against a pinned rootfs
// that verifies. The refusal was withdrawn, the API was built, and the record keeps both halves rather than
// quietly replacing one with the other.
//
// A boundary that names a LAW is checkable and usually holds: the licence, the determinism hard-reject, robots
// .txt on a site that answers 418. A boundary that names an INCAPACITY is the one to distrust, because six such
// claims were written into this tree in a single session and all six were false (impossibility_claims_debt_622).
import { rd } from '../../scripts/api.js'

export interface RefusalRow {
  lead: string
  boundary: string
  /** did the boundary survive scrutiny, or was the refusal later withdrawn? */
  survived: boolean
  /** what overturned it, when it did not */
  overturnedBy: string
  /** does the boundary name a LAW (checkable) or an INCAPACITY (the class that keeps being false)? */
  kind: 'law' | 'incapacity' | 'scope'
}

export interface RefusalCensus {
  definition: 'uuidna·refusals·and·their·boundaries'
  refused: number
  withdrawn: number
  rows: RefusalRow[]
  byKind: Record<string, number>
  honest: string
}

const INCAPACITY = /\b(cannot|can't|unable|impossible|no way to|needs a physical)\b/i
const LAW = /\b(licen[cs]e|robots\.txt|determinism|hard-reject|theorem [a-z0-9_]+|first law|thermodynam|conservation)\b/i

const kindOf = (boundary: string): RefusalRow['kind'] =>
  LAW.test(boundary) ? 'law' : INCAPACITY.test(boundary) ? 'incapacity' : 'scope'

interface RawLead { lead?: unknown; boundary?: unknown; killed_by?: unknown; owes?: unknown }

/** refusalCensus() → every refusal with its boundary, classified, and the withdrawn ones kept beside them. */
export function refusalCensus(): RefusalCensus {
  const record = JSON.parse(rd('lean/leads.json')) as { refused?: RawLead[]; refuted?: RawLead[] }
  const rows: RefusalRow[] = (record.refused ?? []).map((r) => ({
    lead: String(r.lead ?? ''),
    boundary: String(r.boundary ?? ''),
    survived: true,
    overturnedBy: '',
    kind: kindOf(String(r.boundary ?? '')),
  }))
  // a refusal that was WITHDRAWN lives in refuted[] with the measurement that overturned it — it belongs in this
  // census beside the ones that held, because a registry showing only successful refusals teaches nothing
  for (const r of record.refuted ?? []) {
    const blob = JSON.stringify(r)
    if (!/REFUSAL WITHDRAWN|refusal built on|fake limit/i.test(blob)) continue
    rows.push({
      lead: String(r.lead ?? ''),
      boundary: '(withdrawn)',
      survived: false,
      overturnedBy: String(r.killed_by ?? r.owes ?? '').slice(0, 400),
      kind: 'incapacity',
    })
  }
  const byKind: Record<string, number> = {}
  for (const r of rows) byKind[r.kind] = (byKind[r.kind] ?? 0) + 1
  return {
    definition: 'uuidna·refusals·and·their·boundaries',
    refused: rows.filter((r) => r.survived).length,
    withdrawn: rows.filter((r) => !r.survived).length,
    rows,
    byKind,
    honest:
      'Refusing WORK and refusing the COURT are opposite acts; only the first is recorded here, because the ' +
      'second has no legitimate instance. A boundary naming a LAW is checkable and usually holds; a boundary ' +
      'naming an INCAPACITY is the class to distrust — six such claims were written into this tree in one ' +
      'session and all six were false. Withdrawn refusals are kept beside the ones that held, because a registry ' +
      'showing only successful refusals teaches nothing.',
  }
}

// ── THE INVOLUTION OF A REFUSAL (the captain: "involute the refusals") ────────────────────────────────────────
//
// A refusal says: we will not do X, because B. Its involution turns the statement inside out and asks the only
// question that can move it — WHAT WOULD HAVE TO BE TRUE FOR X TO BE DONE? — which converts a closed verdict
// into an open condition. σ² = id: involuting the condition returns the refusal, so nothing is lost in the turn.
//
// THE TURN SORTS THE THREE KINDS SHARPLY, and that is what makes it worth doing rather than decorative:
//
//   LAW        → the condition is "the law would not apply here", and for the laws actually cited (the licence,
//                the determinism hard-reject, robots.txt answering 418, the first law of thermodynamics) that
//                condition is not reachable by working harder. These refusals are closed, and correctly.
//   SCOPE      → the condition is "someone decides this is in scope". Reachable by a decision, not by evidence —
//                so these are not refusals at all in the interesting sense; they are unscheduled work.
//   INCAPACITY → the condition is "the capability exists after all", which is CHECKABLE, and checking it is
//                exactly what overturned the one withdrawn refusal in this record: planAlpineRun('firejail')
//                returned ok:true against a pinned rootfs, and the security API was built the same hour.
//
// So the involution predicts which refusals are load-bearing. An incapacity boundary carries a condition anyone
// can test in a minute, which is why it is the class that keeps failing — not because refusing is wrong, but
// because that particular boundary is the one nobody checks before writing it down.
export interface InvolutedRefusal {
  lead: string
  kind: RefusalRow['kind']
  /** what would have to be true for the refused work to proceed */
  condition: string
  /** can that condition be settled by MEASUREMENT, rather than by a decision or a change in the world? */
  checkable: boolean
  survived: boolean
}

export function involuteRefusals(): { rows: InvolutedRefusal[]; checkable: number; honest: string } {
  const c = refusalCensus()
  const rows: InvolutedRefusal[] = c.rows.map((r) => {
    const condition = r.kind === 'law'
      ? 'the cited law would have to not apply here — not reachable by working harder, which is what makes it a boundary'
      : r.kind === 'incapacity'
        ? 'the capability would have to exist after all — CHECKABLE in minutes, and this is the class that keeps failing'
        : 'someone would have to decide it is in scope — reachable by a decision, so this is unscheduled work rather than a refusal'
    return { lead: r.lead, kind: r.kind, condition, checkable: r.kind === 'incapacity', survived: r.survived }
  })
  return {
    rows,
    checkable: rows.filter((r) => r.checkable).length,
    honest:
      'Involuting a refusal asks what would have to be true for the work to proceed, turning a closed verdict ' +
      'into an open condition; involuting the condition returns the refusal, so nothing is lost. The turn sorts ' +
      'the kinds: a law-shaped condition is not reachable by effort, a scope-shaped one needs only a decision, ' +
      'and an incapacity-shaped one is settled by a measurement anyone can take — which is why it is the class ' +
      'that keeps failing, and why it is the one worth involuting first.',
  }
}
