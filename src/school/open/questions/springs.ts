// school/open/questions/springs — THE SIX RECORDS THAT FEED OPEN DOORS. Pure over JSON the caller names;
// gen-open-questions and gap-survey both read the same springs so a door counted is a door rendered.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import type { OpenItem } from './index.js'

const readJson = (root: string, p: string): unknown =>
  (existsSync(join(root, p)) ? JSON.parse(readFileSync(join(root, p), 'utf8')) : null)

/** gatherOpenItems(root) → every unverified claim the open-questions page derives (held + five springs). */
export function gatherOpenItems(root: string): OpenItem[] {
  const items: OpenItem[] = []
  const leads = readJson(root, 'lean/leads.json') as {
    held?: { lead: string }[]
    refuted?: { lead: string }[]
    refused?: { lead: string }[]
  } | null
  const settled = new Set([
    ...(leads?.refuted ?? []).map((r) => r.lead),
    ...(leads?.refused ?? []).map((r) => r.lead),
  ])
  const closed = (claim: string): boolean => {
    if (settled.has(claim)) return true
    for (const s of settled) if (s && claim.includes(s.slice(0, 40))) return true
    return false
  }
  for (const h of leads?.held ?? []) if (!closed(h.lead)) items.push({ claim: h.lead, source: 'the held leads' })
  const research = readJson(root, 'lean/research-ledger.json') as {
    findings?: { claim: string; status?: string; value?: string }[]
  } | null
  for (const f of research?.findings ?? []) {
    if (f.status && /^(sealed|anchored|verified|refuted|refused)/i.test(f.status)) continue
    const claim = f.claim + (f.value ? ` (recorded value: ${f.value})` : '')
    if (closed(claim) || closed(f.claim)) continue
    items.push({ claim, source: 'the research ledger' })
  }
  const prose = readJson(root, 'prose-trials.json') as {
    develop?: { surface: string; fragment: string; receipt: string }[]
  } | null
  for (const d of prose?.develop ?? []) {
    if (closed(d.fragment)) continue
    items.push({ claim: d.fragment, source: `the prose trials · ${d.surface}`, receipt: d.receipt })
  }
  const feed = readJson(root, 'lean/search-feed.json') as { leads?: { what: string; query?: string }[] } | null
  for (const l of feed?.leads ?? []) {
    if (closed(l.what)) continue
    items.push({ claim: l.what, source: `the search feed · ${l.query ?? 'query'}` })
  }
  const support = readJson(root, 'research-leads.json') as { leads?: { what?: string; fix?: string }[] } | null
  for (const l of support?.leads ?? []) {
    const claim = String(l.what ?? '')
    if (!claim || closed(claim)) continue
    items.push({ claim, source: 'the support wave · research-leads' })
  }
  const exposed = readJson(root, 'lean/exposed-axioms.json') as { held?: { lead?: string }[] } | null
  for (const h of exposed?.held ?? []) {
    const claim = String(h.lead ?? '')
    if (!claim || closed(claim)) continue
    items.push({ claim, source: 'the axiom hunt · exposed' })
  }
  return items
}
