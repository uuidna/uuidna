#!/usr/bin/env node
// src/scripts/latex-crosscheck — print what the paper and the wings say about each other. The comparison itself
// lives in src/latex-crosscheck.ts so the MCP door and this script cannot drift into two different answers.
import { ROOT } from './api.js'
import { latexCrosscheck } from '../latex-crosscheck.js'

const c = latexCrosscheck(ROOT)
console.log(`\u00b7 latex-crosscheck \u2014 wings ${c.surfaces.wings} \u00b7 ledger ${c.surfaces.ledger} \u00b7 paper ${c.surfaces.paper}`)
if (c.unmeasured !== undefined) {
  console.log(`\u2299 latex-crosscheck \u2014 ${c.unmeasured}`)
  process.exit(0)
}
if (c.agree) {
  console.log('\u2713 latex-crosscheck \u2014 the three surfaces agree: every kernel line is served and published, every published address recomputes, and no key carries two statements')
  process.exit(0)
}
console.log(`\u2717 latex-crosscheck \u2014 ${c.leads.length} disagreement(s), each a LEAD for the trial door; nothing is settled here`)
for (const [kind, n] of Object.entries(c.byKind).sort((a, b) => b[1] - a[1])) console.log(`    ${String(n).padStart(6)}  ${kind}`)
for (const l of c.leads.slice(0, 12)) console.log(`    \u00b7 ${l.kind} \u2014 ${l.key}: ${l.why}`)
if (c.leads.length > 12) console.log(`    \u2026 and ${c.leads.length - 12} more`)
console.log(`  receipt ${c.receipt}`)
