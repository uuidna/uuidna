#!/usr/bin/env node
// gen-mcp-gaps — FOLD THE SESSION-LOCAL DOOR REQUESTS INTO A COMMITTED CENSUS THE RELEASE GATE CAN READ.
//
// The captain, 2026-09-28: "cross all leads adding more leads on the way of improving self sufficiency of mcp".
//
// WHAT WAS MEASURED FIRST. mcp-bypass records every missing door: the one lawful escape from the MCP-only rule states
// UUIDNA_MCP_GAP="<what is missing>" and the hook appends the request to dist/evidence/mcp-gaps.jsonl — "never a silent
// bypass", as that module puts it. That half works: 1,354 records, 1,139 distinct gaps. The other half does not exist.
// No lead source reads the file, so leads-gate — THE RELEASE GATE — has never once been held by a missing door. A
// mechanism wired to nothing is the same defect src/api-leads.ts was written to fix on the API side, and here it is
// again on the tool side: the requests arrived, were written down, and stopped.
//
// AND THE RECORD CANNOT SURVIVE A CHECKOUT. dist/ is gitignored, so the census is session-local: CI has never seen a
// single gap, and a clean clone reads zero. That is why this door exists rather than a reader pointed straight at the
// jsonl — the gate must read a COMMITTED artefact, the way it reads lean/doi-harvest.json.
//
// WHICH GAPS BECOME LEADS, and the criterion is computed rather than chosen. 1,031 of the 1,139 were recorded exactly
// once, which is consistent with a one-off escape nobody needed again. 108 were recorded MORE THAN ONCE: the session
// escaped, and then the tree needed that same absent door again. Repetition is the tree stating that the door is load-
// bearing, so "recorded more than once" is what opens a lead, and the single escapes stay in the census as evidence
// without holding the release. Opening all 1,139 would block every release indefinitely, which would make the gate
// useless rather than strict — and a gate nobody can ever satisfy stops being read.

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

const SOURCE = join(ROOT, 'dist', 'evidence', 'mcp-gaps.jsonl')
const OUT = join(ROOT, 'lean', 'mcp-gaps.json')

interface Row { gap?: unknown; form?: unknown; identifiers?: unknown }

const lines = existsSync(SOURCE) ? readFileSync(SOURCE, 'utf8').split('\n').filter((l) => l.trim() !== '') : []
const counted = new Map<string, { gap: string; hits: number; forms: Set<string> }>()
for (const line of lines) {
  let row: Row
  try { row = JSON.parse(line) as Row } catch { continue }
  const gap = String(row.gap ?? '').trim()
  if (gap === '') continue
  const c = counted.get(gap) ?? { gap, hits: 0, forms: new Set<string>() }
  c.hits += 1
  c.forms.add(String(row.form ?? '?'))
  counted.set(gap, c)
}

const all = [...counted.values()].sort((a, b) => b.hits - a.hits || a.gap.localeCompare(b.gap))
const repeated = all.filter((g) => g.hits > 1)

// THE PREVIOUS CENSUS IS CARRIED FORWARD, because dist/ is wiped by a clean build and the committed record may only
// grow. A door that replaced the census with whatever this session happened to see would delete every gap another
// session recorded — the same shape as settling a lead by deletion, which this tree refuses outright.
let carried: { gap: string; hits: number; forms: string[] }[] = []
if (existsSync(OUT)) {
  try {
    const prev = JSON.parse(readFileSync(OUT, 'utf8')) as { gaps?: { gap?: unknown; hits?: unknown; forms?: unknown }[] }
    carried = (prev.gaps ?? []).map((g) => ({
      gap: String(g.gap ?? ''),
      hits: Number(g.hits ?? 0),
      forms: Array.isArray(g.forms) ? g.forms.map(String) : [],
    })).filter((g) => g.gap !== '')
  } catch { carried = [] }
}
const merged = new Map(carried.map((g) => [g.gap, g]))
for (const g of all) {
  const prev = merged.get(g.gap)
  const hits = prev ? (prev.hits > g.hits ? prev.hits : g.hits) : g.hits
  const forms = [...new Set([...(prev?.forms ?? []), ...g.forms])].sort()
  merged.set(g.gap, { gap: g.gap, hits, forms })
}
const gaps = [...merged.values()].sort((a, b) => b.hits - a.hits || a.gap.localeCompare(b.gap))
const loadBearing = gaps.filter((g) => g.hits > 1)

writeFileSync(OUT, JSON.stringify({
  kind: 'mcp-gap-census',
  records: lines.length,
  distinct: gaps.length,
  loadBearing: loadBearing.length,
  honest: 'a gap recorded once is an escape nobody needed again; recorded more than once, the tree has stated the door is load-bearing. Only the repeated ones open a lead.',
  gaps,
}, null, 2) + '\n')

console.log(`✓ gen-mcp-gaps — lean/mcp-gaps.json: ${lines.length} record(s) read, ${gaps.length} distinct, ${loadBearing.length} load-bearing (recorded more than once)`)
for (const g of loadBearing.slice(0, 8)) console.log(`   ${String(g.hits).padStart(3)}x  ${g.gap.slice(0, 96)}`)
if (lines.length === 0) {
  console.log('   dist/evidence/mcp-gaps.jsonl is absent — this session added nothing; the committed census is unchanged')
}
