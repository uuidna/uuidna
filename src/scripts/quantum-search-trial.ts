#!/usr/bin/env node
// quantum-search-trial — SEARCH FINDS, THE TRIAL DECIDES, AND EACH TRIAL RETURNS A PUBLICATION. For each named
// wing of the ledger: the quantum search (every research source in parallel — NIST, Zenodo, CrossRef) FINDS the
// external record; each finding is held at trial beside the wing's own sealed theorems — and the trial's output
// is not a log line but a PUBLICATION: a computed page recording the findings (each content-addressed), their
// verdicts, the sealed backing, and the receipt. The law of the trial holds throughout: external evidence is
// CORROBORATION, never approval — only a local by-decide seal approves (corroborate.approve, the hard gate) —
// and a finding with NO sealed counterpart is not a failure but a NOVELTY LEAD, remanded to development.
// ONLINE WAVE: this script fetches (the named network boundary, like corroborate.ts it rides on). Its OUTPUT is
// then edited OFFLINE by the same desk as everything else (npm run editorial tries docs/articles/*). Deterministic
// given the same responses: ledger order, content-addresses, no wall-clock, no RNG.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { theorems, searchTrialFor } from '../index.js'
import { ROOT } from './api.js'
import { handleOf } from '../handle.js'   // THE one derivation — see handle.ts

interface Entry { key: string; name: string; statement: string; file: string; principle: string; skill: string }

const T = theorems() as Entry[]
// --all = QUANTUM SCALE: every wing of the ledger, each searched across every source. Wings run serially
// (the sources within a wing in parallel) — deep, and gentle on the archives' rate limits.
const args = process.argv.slice(2)
const allFiles = [...new Set(T.map((t) => t.file))].sort()
const wings = args.includes('--all') ? allFiles : args.length ? args : ['MoMBHStar1.lean']
const OUT = join(ROOT, 'docs', 'articles')
mkdirSync(OUT, { recursive: true })
let published = 0, failed = 0

const slugOf = (file: string): string => 'search-' + file.replace('.lean', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

for (const wing of wings) {
  const entries = T.filter((t) => t.file === wing)
  if (!entries.length) { console.error('✗ quantum-search-trial — no theorems in ledger for wing ' + wing); process.exit(1) }
  console.log(`quantum search — every source in parallel for "${entries[0]!.principle}" (${wing}, ${entries.length} sealed theorems) …`)
  // ONE implementation: the library's searchTrialFor (the same function the MCP serves as uuidna_search_trial)
  // finds, tries, and harvests; this script only RENDERS the trial's return as its publication.
  let s
  try {
    s = await searchTrialFor(wing)
  } catch (e) {
    // a down archive must not kill the sweep — the wing is skipped BY NAME and the cron's next turn retries it
    console.error(`  ⚠ sources unreachable for ${wing} (${String(e).slice(0, 80)}) — skipped, next run retries`)
    failed++
    continue
  }
  const { principle, findings, receipt } = s
  const leads = s.usable
  const rows = findings.map((f) =>
    `| \`${handleOf(f.address)}\` | ${f.source} | ${f.note.replace(/\|/g, '\\|')} | ${f.alone} | ${f.withBacking} |`)

  const md = `---
title: "The search on trial: ${principle.replace(/"/g, "'")}"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated; only a Lean seal approves."
---

# The search on trial: ${principle}

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *${principle}* — the wing sealed in [lean/${wing}](/lean/${wing}) with **${entries.length} theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local \`by decide\` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
${rows.length ? rows.join('\n') : '| — | — | the sources returned no records for this query | — | — |'}

**${findings.length} findings · ${leads} usable search-trial combinations · receipt \`${handleOf(receipt)}\`** (fold of every finding's address — recompute by re-running the search).

${s.novel.length ? `## The novelty harvest

**${s.novel.length} candidate fact(s)** the web asserts, the calculator confirms (decided TRUE by total arithmetic —
division by zero is the reflection. Each is REMANDED for
admission — the paying handle decides what becomes a wing; the cron never seals judgment.

${s.novel.map((n) => `- \`${n.fragment}\` — from finding \`${handleOf(n.from)}\`, decision receipt \`${handleOf(n.receipt)}\``).join('\n')}
` : ''}The sealed backing this trial held the findings beside:

${entries.map((e) => `- [${e.key}](/theorem/${e.key}) — \`${e.statement.slice(0, 90)}\``).join('\n')}

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven \`by decide\` in the ledger.
:::

*Computed by \`npm run search:trial\` (the online wave); edited by the same desk as every page (\`npm run editorial\`).*
`
  writeFileSync(join(OUT, slugOf(wing) + '.md'), md)
  published++
  console.log(`✓ trial returned a publication — docs/articles/${slugOf(wing)}.md (${findings.length} findings, ${leads} usable combinations, receipt ${handleOf(receipt)})`)
}

console.log(`✓ quantum-search-trial — ${published}/${wings.length} wings published (${failed} skipped by unreachable sources)`)
if (published === 0) { console.error('✗ quantum-search-trial — no wing published; every source unreachable'); process.exit(1) }
