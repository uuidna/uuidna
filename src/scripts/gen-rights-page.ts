#!/usr/bin/env node
// gen-rights-page — docs/rights.md, GENERATED: the public's door to the right to land and to access. The page is the
// instrument table (src/rights/land-instruments.json) and the land-rights wing as the served ledger holds it,
// rendered; nothing on it is written per instrument, so a row added to the table, or a theorem added to the wing,
// reaches the page on the next generate. The door itself (RightsDoor) calls uuidna_land_rights on the hosted edge.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { THEOREMS } from '../theorems/index.js'

interface Row {
  id: string; title: string; body: string; kind: string; adopted: number | null; inForce: number | null
  articles: { n: string; topic: string }[]; url: string; verified: boolean; qualifications: string
}

const rows = JSON.parse(readFileSync(join(ROOT, 'src', 'rights', 'land-instruments.json'), 'utf8')) as Row[]
const wing = THEOREMS.filter((t) => String(t.file ?? '').endsWith('LandRights.lean'))
if (wing.length === 0) throw new Error('gen-rights-page: the land-rights wing is not in the served ledger — run lean-one land-rights and lean-ledger first')

const QUALIFIED = 'every_access_instrument_is_qualified'
const INTEGRITY = 'provenance_integrity_not_content_truth'
for (const k of [QUALIFIED, INTEGRITY]) if (!THEOREMS.some((t) => t.key === k)) throw new Error(`gen-rights-page: the page cites ${k}, which the served ledger does not hold`)

const cell = (s: string): string => s.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
const year = (y: number | null): string => (y === null ? '—' : String(y))
const verified = rows.filter((r) => r.verified)
const unverified = rows.filter((r) => !r.verified)
const kinds = [...new Set(verified.map((r) => r.kind))]

const table = (rs: readonly Row[]): string => [
  '| Instrument | Adopted | In force | Articles | Qualified by | Source |',
  '|---|---|---|---|---|---|',
  ...rs.map((r) => `| ${cell(r.title)} | ${year(r.adopted)} | ${year(r.inForce)} | ${cell(r.articles.map((a) => a.n).join('; '))} | ${cell(r.qualifications)} | [official text](${r.url}) |`),
].join('\n')

const page = `---
title: The right to land and the public's access to it
description: "Check a land-rights citation, or read a link: ${verified.length} instruments on the natural use of land and on public access, each read from its official source, and the kernel's theorems over them."
---

# The right to land and the public's access to it

Paste a claim that cites an instrument and an article — or a link to any page — and the door checks it against the
instruments below, each read from its official source. Every answer carries a receipt signed by 2×7 theorems, so
anyone can re-verify it. It checks the citation, and what it says of a law is the table's reading, never a legal
opinion ([theorem ${INTEGRITY}](/theorem/${INTEGRITY})).

<RightsDoor />

## What the table shows

International instruments speak of peoples' natural resources and of collective and customary tenure; physical
public access to land is set by national law, and every access instrument here sets conditions on it — seasons,
gardens and crops, mapped land, closures ([theorem ${QUALIFIED}](/theorem/${QUALIFIED})). The Aarhus Convention's
access is to information, participation and justice.

## What the kernel decides over the table

${wing.map((t) => `- [${t.key}](/theorem/${t.key})`).join('\n')}

Each is decided over the table's own integers — years, recorded votes, days, the order of adoption — and is
axiom-free.

${kinds.map((k) => `## ${k[0]!.toUpperCase()}${k.slice(1)}\n\n${table(verified.filter((r) => r.kind === k))}`).join('\n\n')}
${unverified.length ? `\n## Awaiting verification\n\nThese rows could not be read from their official source, so the door answers from none of them:\n\n${unverified.map((r) => `- ${cell(r.title)} — [source](${r.url})`).join('\n')}\n` : ''}`

writeFileSync(join(ROOT, 'docs', 'rights.md'), page)
console.log(`✓ gen-rights-page — docs/rights.md: ${verified.length} verified instruments in ${kinds.length} kinds, ${wing.length} theorems, ${unverified.length} awaiting verification`)
