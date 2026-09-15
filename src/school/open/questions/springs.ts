// school/open/questions/springs — THE SPRINGS THAT FEED OPEN LEADS. Pure over JSON the caller names;
// gen-open-questions and gap-survey both read the same springs so a gap counted is a lead rendered.
//
// THE LAW: only leads IN TRIAL and prose develop fragments the calculator has NOT yet decided feed open-questions.
// Refuted (killed_by) and refused (boundary) are CLOSED — recorded on docs/leads.md, not homework here.
// Research findings, search-feed leads, support-wave, and axiom-hunt exposed live on their own surfaces
// (uuidna_research_ledger, search-feed page, …). Every open lead adjudicates UNVERIFIED until a seal verifies.
import { adjudicate } from '../../../adjudicate.js'
import { decide } from '../../../decide.js'
import { readRepoJson } from '../../../desk/repo/json/index.js'
import type { OpenItem } from './index.js'

const rawOpenItems = (): OpenItem[] => {
  const items: OpenItem[] = []
  const leads = readRepoJson('lean/leads.json') as { trial?: { lead: string }[] } | null
  for (const h of leads?.trial ?? []) {
    const claim = String(h.lead ?? '').trim()
    if (claim) items.push({ claim, source: 'the leads in trial' })
  }
  const prose = readRepoJson('prose-trials.json') as {
    develop?: { surface: string; fragment: string; receipt: string }[]
  } | null
  for (const d of prose?.develop ?? []) {
    if (decide(d.fragment).verdict === 'EVALUATED_TRUE') continue
    items.push({ claim: d.fragment, source: `the prose trials · ${d.surface}`, receipt: d.receipt })
  }
  const support = readRepoJson('research-leads.json') as { leads?: { what?: string; fix?: string }[] } | null
  for (const l of support?.leads ?? []) {
    const claim = String(l.what ?? '').trim()
    if (claim) items.push({ claim, source: 'the support wave · research-leads' })
  }
  const exposed = readRepoJson('lean/exposed-axioms.json') as { held?: { lead?: string }[] } | null
  for (const h of exposed?.held ?? []) {
    const claim = String(h.lead ?? '').trim()
    if (claim) items.push({ claim, source: 'the axiom hunt · exposed' })
  }
  return items
}

/** gatherOpenLeads(_root?) → every open lead the springs hold. None is dropped for how its wording adjudicates: a lead
 *  whose words happen to match a sealed statement is still a lead until its trial verifies it (Lean decides — the
 *  captain, 2026-09-14). Root ignored — records read via repo-json (host disk or edge bundle). */
export function gatherOpenLeads(_root?: string): OpenItem[] {
  return rawOpenItems()
}

/** @deprecated name — prefer gatherOpenLeads; same filter, same law. */
export const gatherOpenItems = gatherOpenLeads
