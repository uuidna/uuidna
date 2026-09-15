// leads-conservation — the pure half of lead conservation: which leads at HEAD the working record no longer holds.
// It lives outside src/scripts/leads-conserved.ts because that module imports node:fs, node:child_process and api.js
// at module scope, and laws() imports this one and is served at the edge, where no node builtin is loaded. The Gap
// import is type-only and is erased at build.
import type { Gap } from './scripts/landing-gaps.js'

type LeadList = { lead?: unknown }[]
// `held` is the name the trial list carried until 2026-09-14; a HEAD from before the rename still spells it so, and
// a lead is conserved across the rename only if both spellings are read
export type LeadsRecordShape = { trial?: LeadList; held?: LeadList; refuted?: LeadList; refused?: LeadList }

const leadsOf = (r: LeadsRecordShape | null): string[] =>
  [...(r?.trial ?? []), ...(r?.held ?? []), ...(r?.refuted ?? []), ...(r?.refused ?? [])]
    .map((x) => (typeof x?.lead === 'string' ? x.lead : ''))
    .filter((l) => l.length > 0)

/** leadsMissingFrom(head, now) → one gap per lead at HEAD that the working record no longer holds. Pure. */
export function leadsMissingFrom(head: LeadsRecordShape, now: LeadsRecordShape | null): Gap[] {
  const present = new Set(leadsOf(now))
  return leadsOf(head).filter((l) => !present.has(l)).map((l) => ({
    what: `lean/leads.json: the lead "${l.slice(0, 90)}" is at HEAD and gone from the record — a lead leaves only by a verdict`,
    fix: 'restore it from HEAD (git show HEAD:lean/leads.json); to settle it, seal involution_<handle> : ¬ lead_<handle> and let npm run x -- leads-gate move it (or --settle --refute "<exact lead>") — never delete it',
  }))
}
