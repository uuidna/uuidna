// school/refusals/slice — THE ONE DERIVATION of the refusals register from lean/leads.json, pure.
//
// Three readers need the same rows: the census (served on stdio AND at the hosted edge), the generator that
// bakes them into generated.ts for the edge (which has no filesystem), and the test that holds generated.ts to
// the live record. One function, no imports, so the three cannot disagree about what a refusal row is — the
// census used to read the JSON through scripts/api.ts, whose lazy node builtins throw the moment a Worker calls
// them, and that is how uuidna_refusals crashed at uuidna.com/mcp while every local test stayed green.

export interface RefusedSlice { lead: string; boundary: string }
export interface WithdrawnSlice { lead: string; overturnedBy: string }
export interface RefusalSlice { refused: RefusedSlice[]; withdrawn: WithdrawnSlice[] }

interface RawLead { lead?: unknown; boundary?: unknown; killed_by?: unknown; owes?: unknown }
export interface LeadsRecord { refused?: RawLead[]; refuted?: RawLead[] }

/** a refusal that was WITHDRAWN lives in refuted[] with the measurement that overturned it */
const WITHDRAWN = /REFUSAL WITHDRAWN|refusal built on|fake limit/i

/** refusalSliceOf(record) → the refused rows and the withdrawn ones, in record order, nothing else carried */
export function refusalSliceOf(record: LeadsRecord): RefusalSlice {
  const refused = (record.refused ?? []).map((r) => ({ lead: String(r.lead ?? ''), boundary: String(r.boundary ?? '') }))
  const withdrawn = (record.refuted ?? [])
    .filter((r) => WITHDRAWN.test(JSON.stringify(r)))
    .map((r) => ({ lead: String(r.lead ?? ''), overturnedBy: String(r.killed_by ?? r.owes ?? '').slice(0, 400) }))
  return { refused, withdrawn }
}
