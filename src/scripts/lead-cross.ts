#!/usr/bin/env node
// lead-cross — CROSS THE OPEN LEADS: how many capabilities they amount to, and which may already be served.
//
// The captain, 2026-09-28: "Develop all leads purging fake ones" and "Cross the leads to find the cross formulas and
// applications". One computation answers both. Crossing shows which leads are ONE capability restated many times — the
// cluster names the cross formula — and checking each against the 248 tools the server serves shows which may name
// something that already exists.
//
// NOTHING IS SETTLED HERE. A refutation candidate is a question put to a reader, with the tool and the matching words
// named so it can be argued with. leads-gate settles a lead only by the kernel's evidence or an explicit
// `--settle --refute` with a stated reason, and a wrongly closed lead is worse than an open one: an open lead is a
// question, a wrongly closed one is a false answer carrying a receipt.

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { gatherLeads } from './leads-gate.js'
import { leadCensus } from '../leads.js'
import { MCP_CATALOG } from '../mcp.js'
import { commonWords, crossLeads, type LeadRow } from '../lead-cross.js'

const census = leadCensus(gatherLeads())
const leads: LeadRow[] = census.open.map((l) => ({ source: l.source, what: l.what, owes: l.owes }))
const tools = MCP_CATALOG.map((t) => ({ name: t.name, description: String(t.description ?? '') }))

const { clusters, alone } = crossLeads(leads)
// REFUTATION CANDIDATES ARE NOT REPORTED, because they were measured not to work: 163 of 174 leads matched some tool,
// and the four strongest matches were inspected and are all coincidences on generic words. See src/lead-cross.ts. The
// defect this was chasing is the tool SEARCH — uuidna_theorem exists and ranks ninth of eighteen for "theorem" — and
// fixing that prevents the fake lead being recorded rather than detecting it afterwards.

console.log(`open leads ${leads.length} · tools served ${tools.length}`)
console.log(`CROSSED INTO ${clusters.length} cluster(s) + ${alone.length} standing alone`)
console.log('refutation by word overlap: MEASURED NOT TO WORK and not reported — 163 of 174 leads matched some tool,')
console.log('  and the four strongest matches are coincidences on generic words. The fake leads come from the tool')
console.log('  SEARCH failing to surface doors that exist, which is the thing to fix.')
console.log()
console.log('clusters by COHERENCE — how much the leads share besides the naming word. A low score means the word')
console.log('identifies nothing, which is how "from" and "still" named clusters in the first run:')
for (const c of clusters.slice(0, 14)) {
  const coh = (c.coherence * 100).toFixed(0)
  console.log(`  ${String(c.leads.length).padStart(3)} leads on "${c.on}" — coherence ${coh}/100`)
  console.log(`        e.g. ${c.leads[0]!.what.slice(0, 92)}`)
}
if (clusters.length > 14) console.log(`  … and ${clusters.length - 14} smaller clusters`)
console.log()


writeFileSync(join(ROOT, 'lean', 'lead-cross.json'), JSON.stringify({
  kind: 'lead-cross',
  openLeads: leads.length,
  clusters: clusters.map((c) => ({ on: c.on, count: c.leads.length, coherence: c.coherence, leads: c.leads.map((l) => l.what) })),
  alone: alone.map((l) => l.what),
  refutationByWordOverlap: 'measured not to work: 163 of 174 leads matched some tool, and the four strongest matches '
    + 'are coincidences on generic words. Not reported and not used to settle anything.',
  commonWords: [...commonWords(leads)].sort(),
  honest: 'a cluster is leads sharing a distinctive word, which is evidence they ask for one capability. The NAME of a '
    + 'cluster is whichever shared word ranks first, with ties broken alphabetically, so the grouping is the claim and '
    + 'the name is not. A refutation candidate is NOT a settled refutation: nothing here closes a lead, because a '
    + 'wrongly closed lead is a false answer carrying a receipt.',
}, null, 2) + '\n')
console.log()
console.log('✓ lean/lead-cross.json written')
