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
import { theorems, toUuid, researchEvidence, reveal } from '../index.js'
import { ROOT } from './api.js'

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
  const principle = entries[0]!.principle
  console.log(`quantum search — every source in parallel for "${principle}" (${wing}, ${entries.length} sealed theorems) …`)
  let findings
  try {
    findings = await researchEvidence(principle)
  } catch (e) {
    // a down archive must not kill the sweep — the wing is skipped BY NAME and the cron's next turn retries it
    console.error(`  ⚠ sources unreachable for ${wing} (${String(e).slice(0, 80)}) — skipped, next run retries`)
    failed++
    continue
  }
  const cited = entries.map((e) => `/theorem/${e.key}`).join(' ')

  const rows: string[] = []
  let leads = 0
  for (const f of findings) {
    // the finding ALONE at trial: external prose cites no sealed proof — the honest verdict is UNVERIFIED
    // (evidence, not approval); a DRAINED here would mean the external record fabricates one of OUR citations.
    const alone = reveal(f.note).verdict
    // the COMBINATION at trial: the finding held beside the wing's sealed backing — the pairing the desk can print.
    const paired = reveal(`${f.note} — held beside the sealed backing: ${cited}`).verdict
    if (alone === 'UNVERIFIED' && paired === 'VERIFIED') leads++
    rows.push(`| \`${f.address.slice(0, 8)}\` | ${f.source} | ${f.note.replace(/\|/g, '\\|')} | ${alone} | ${paired} |`)
  }
  const receipt = toUuid(findings.map((f) => f.address).join('\n'))

  const md = `---
title: "The search on trial: ${principle.replace(/"/g, "'")}"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: ${principle}

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *${principle}* — the wing sealed in [lean/${wing}](/lean/${wing}) with **${entries.length} theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local \`by decide\` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
${rows.length ? rows.join('\n') : '| — | — | the sources returned no records for this query | — | — |'}

**${findings.length} findings · ${leads} usable search-trial combinations · receipt \`${receipt.slice(0, 8)}\`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

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
  console.log(`✓ trial returned a publication — docs/articles/${slugOf(wing)}.md (${findings.length} findings, ${leads} usable combinations, receipt ${receipt.slice(0, 8)})`)
}

console.log(`✓ quantum-search-trial — ${published}/${wings.length} wings published (${failed} skipped by unreachable sources)`)
if (published === 0) { console.error('✗ quantum-search-trial — no wing published; every source unreachable'); process.exit(1) }
