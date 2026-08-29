// school/open/questions/springs — THE SIX RECORDS THAT FEED OPEN LEADS. Pure over JSON the caller names;
// gen-open-questions and gap-survey both read the same springs so a gap counted is a lead rendered.
//
// THE LAW: desk gaps are open leads; every open lead adjudicates UNVERIFIED (not VERIFIED — the trial's
// only negative). held, refuted, and refused from lean/leads.json all map to UNVERIFIED — a school refutation
// or refusal is a result, not a seal. Only adjudicate VERIFIED (a sealed citation) drops out.
import { adjudicate } from '../../../adjudicate.js'
import { readRepoJson } from '../../../desk/index.js'
import type { OpenItem } from './index.js'

const rawOpenItems = (): OpenItem[] => {
  const items: OpenItem[] = []
  const leads = readRepoJson('lean/leads.json') as {
    held?: { lead: string }[]
    refuted?: { lead: string }[]
    refused?: { lead: string }[]
  } | null
  for (const h of leads?.held ?? []) {
    const claim = String(h.lead ?? '').trim()
    if (claim) items.push({ claim, source: 'the held leads' })
  }
  for (const r of leads?.refuted ?? []) {
    const claim = String(r.lead ?? '').trim()
    if (claim) items.push({ claim, source: 'the refuted leads' })
  }
  for (const r of leads?.refused ?? []) {
    const claim = String(r.lead ?? '').trim()
    if (claim) items.push({ claim, source: 'the refused leads' })
  }
  const research = readRepoJson('lean/research-ledger.json') as {
    findings?: { claim: string; status?: string; value?: string }[]
  } | null
  for (const f of research?.findings ?? []) {
    if (f.status && /^(sealed|anchored|verified)/i.test(f.status)) continue
    const claim = f.claim + (f.value ? ` (recorded value: ${f.value})` : '')
    if (!f.claim?.trim()) continue
    items.push({ claim, source: 'the research ledger' })
  }
  const prose = readRepoJson('prose-trials.json') as {
    develop?: { surface: string; fragment: string; receipt: string }[]
  } | null
  for (const d of prose?.develop ?? []) {
    items.push({ claim: d.fragment, source: `the prose trials · ${d.surface}`, receipt: d.receipt })
  }
  const feed = readRepoJson('lean/search-feed.json') as { leads?: { what: string; query?: string }[] } | null
  for (const l of feed?.leads ?? []) {
    items.push({ claim: l.what, source: `the search feed · ${l.query ?? 'query'}` })
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

/** gatherOpenLeads(_root?) → every open lead: spring record that adjudicates UNVERIFIED. Root ignored — records read via repo-json (host disk or edge bundle). */
export function gatherOpenLeads(_root?: string): OpenItem[] {
  return rawOpenItems().filter((item) => adjudicate(item.claim).verdict === 'UNVERIFIED')
}

/** @deprecated name — prefer gatherOpenLeads; same filter, same law. */
export const gatherOpenItems = gatherOpenLeads
