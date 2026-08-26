#!/usr/bin/env node
// gen-expose — THE DISCOVERY BOARD, fused into the UI (the captain's order, 2026-08-24: "continue fusing all
// in ui"). The page IS a uuidna_expose call rendered: the coordinates where clusters expose unsealed structure
// — lonely computing principles, grid seats out of harmony, pair gaps — regenerated on every reconcile, so the
// site always shows WHERE to dig today, never where digging once happened. Zero authored data: every row is
// the tool's own answer, and the fold receipt on the page is the same one any caller of uuidna_expose gets.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { callTool } from '../mcp.js'

interface Exposed {
  lonely: { key: string; file: string; principle: string }[]
  gridGaps: { what: string; fix: string }[]
  pairsGaps: { what: string; fix: string }[]
  counts: { lonely: number; gridGaps: number; pairsGaps: number }
  receipt: string
  honest: string
}

const e = (await callTool('uuidna_expose', {})) as Exposed

const lonelyRows = e.lonely.length
  ? e.lonely.map((l) => `| [\`${l.key}\`](/theorem/${l.key}) | ${l.file} | ${l.principle} |`).join('\n')
  : '| — every principle has a neighbour today — sealed: [`vortex_one_leap`](/theorem/vortex_one_leap) · [`vortex_dz_involution_at_ten`](/theorem/vortex_dz_involution_at_ten) | OneLeap.lean | One leap |'
const gapRows = (gaps: { what: string; fix: string }[]): string => gaps.length
  ? gaps.map((g) => `- **${g.what}**\n  — fix: ${g.fix}`).join('\n')
  : '- none open today'

const page = `---
title: Expose
description: The live coordinates where clusters of theorems expose unsealed structure — lonely principles, grid seats out of harmony, pair gaps — recomputed from the ledger on every reconcile.
---

# The discovery board — where the ledger exposes itself

This page is one \`uuidna_expose\` call, rendered — coordinates rooted in the sealed neighbour relation
([\`vortex_one_leap\`](/theorem/vortex_one_leap)). It computes where the ledger's own structure points at missing
seals, and regenerates on every reconcile — a board of TODAY's digs, not a history of yesterday's. The loop it
opens is two calls: \`uuidna_expose\` finds the coordinates, and \`uuidna_wave_deposit\` saves candidates into
[the conveyor](/waves), where the kernel judges each alone.

**Counts:** ${e.counts.lonely} lonely · ${e.counts.gridGaps} grid gap(s) · ${e.counts.pairsGaps} pair gap(s) ·
fold receipt \`${e.receipt}\`

## Lonely principles — clusters of one, asking for their second

A theorem whose computing principle has no neighbour is a cluster of one: the coordinate says a second seal
belongs beside it (same principle, same wing — the reader's craft, not a script's).

| theorem | wing | principle |
|---------|------|-----------|
${lonelyRows}

## Grid gaps — the 432 grid's own report

${gapRows(e.gridGaps)}

## Pair gaps

${gapRows(e.pairsGaps)}

---

**Honest scope:** ${e.honest}.
`

writeFileSync(join(ROOT, 'docs', 'expose.md'), page)
console.log(`✓ gen-expose — discovery board: ${e.counts.lonely} lonely, ${e.counts.gridGaps} grid, ${e.counts.pairsGaps} pair gaps, receipt ${e.receipt}`)
