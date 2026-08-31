#!/usr/bin/env node
// audit-tool-exercise — WHICH MCP TOOLS HAVE A DEDICATED TEST, decided WITHOUT an agent. support.ts proves a
// module is REACHABLE (some import reaches it); mcp-coverage proves the catalogue covers every THEOREM. Neither
// answers the question a maintainer actually asks: does THIS tool have a test that names it and checks its
// answer? A tool covered only by an aggregate fold (mcp-coverage walks all of them at once) has no dedicated
// guard — a regression in its handler can pass every suite while the fold's receipt still matches, because the
// fold measures the catalogue's shape, not each handler's behaviour.
//
// THE CENSUS, pure and static: parse the tool names the registry declares (src/mcp.ts), scan the test tree for
// each name, and split the tools into DIRECTLY-EXERCISED (a test names it) and AGGREGATE-ONLY (covered by the
// folds but by no dedicated check). HONEST SCOPE: "directly exercised" is a LOWER BOUND on real coverage — an
// aggregate-only tool is not untested, it is under-tested; the census names the under-tested set so it can only
// shrink, never a claim that 165 tools are unchecked. Deterministic; folds to one receipt anyone recomputes.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { merkleFold } from '../address.js'
import { listTestSources } from '../test-paths.js'

const TOOL_RE = /\{ name: '([a-z0-9_]+)'/g
const REF_RE = /uuidna_[a-z0-9_]+/g

/** toolExercise() → the census: every declared tool split into directly-exercised and aggregate-only. */
export function toolExercise(): {
  tools: number
  directlyExercised: string[]
  aggregateOnly: string[]
  receipt: string
} {
  const mcp = readFileSync(join(ROOT, 'src', 'mcp.ts'), 'utf8')
  const tools = [...new Set([...mcp.matchAll(TOOL_RE)].map((m) => m[1]!))].sort()
  const referenced = new Set<string>()
  for (const rel of listTestSources()) {
    for (const m of readFileSync(join(ROOT, rel), 'utf8').matchAll(REF_RE)) referenced.add(m[0])
  }
  const directlyExercised = tools.filter((t) => referenced.has(t))
  const aggregateOnly = tools.filter((t) => !referenced.has(t))
  return {
    tools: tools.length,
    directlyExercised,
    aggregateOnly,
    receipt: merkleFold([toUuid('tool-exercise|' + tools.length), ...aggregateOnly.map((t) => toUuid('under|' + t))]),
  }
}

// THE BASELINE — the aggregate-only set as it stands, declared in lean/tool-exercise-baseline.json (like the
// dormant-scripts and mcp-surface-divergence lists): the census may only SHRINK. A tool that GAINS a dedicated
// test drops off the list; a NEW tool with no dedicated test must be added deliberately (with the intent that it
// will earn one), never appear silently. That makes under-coverage a debt that is paid down, never accrued blind.
const BASELINE = join(ROOT, 'lean', 'tool-exercise-baseline.json')

export function baselineGaps(): { what: string; fix: string }[] {
  const census = toolExercise()
  const gaps: { what: string; fix: string }[] = []
  if (!existsSync(BASELINE)) {
    gaps.push({
      what: `no tool-exercise baseline sealed — ${census.aggregateOnly.length} of ${census.tools} tools are aggregate-only (no dedicated test)`,
      fix: `write lean/tool-exercise-baseline.json as {"note":"MCP tools covered only by aggregate folds, never a dedicated test — this list may only SHRINK","aggregateOnly":${JSON.stringify(census.aggregateOnly)}}`,
    })
    return gaps
  }
  const sealed = JSON.parse(readFileSync(BASELINE, 'utf8')) as { aggregateOnly?: string[] }
  const declared = new Set(sealed.aggregateOnly ?? [])
  // GROWTH is the fault: a tool aggregate-only NOW that the baseline did not declare = new under-coverage.
  const grown = census.aggregateOnly.filter((t) => !declared.has(t))
  if (grown.length) gaps.push({
    what: `${grown.length} tool(s) newly aggregate-only (no dedicated test), not in the baseline: ${grown.join(', ')}`,
    fix: 'give each a dedicated test that names it and checks its answer, OR (if genuinely deferred) add it to lean/tool-exercise-baseline.json aggregateOnly — the list may only shrink, so adding is a deliberate debt, not a silent one',
  })
  // A baseline entry that is now directly exercised should be REMOVED (a stale excuse is drift with paperwork).
  const stale = [...declared].filter((t) => !census.aggregateOnly.includes(t))
  if (stale.length) gaps.push({
    what: `${stale.length} baseline entr(y/ies) now have a dedicated test — the list must shrink: ${stale.slice(0, 8).join(', ')}${stale.length > 8 ? '…' : ''}`,
    fix: 'remove them from lean/tool-exercise-baseline.json aggregateOnly — a repaired gap keeps no paperwork',
  })
  return gaps
}

// CLI: report the census and any baseline gaps; exit non-zero on a gap so the audit chain and land can see it.
const isMain = process.argv[1]?.endsWith('audit-tool-exercise.js') ?? false
if (isMain) {
  const c = toolExercise()
  console.log(`audit-tool-exercise — ${c.tools} tools · ${c.directlyExercised.length} directly exercised · ${c.aggregateOnly.length} aggregate-only · receipt ${c.receipt}`)
  const gaps = baselineGaps()
  if (gaps.length) {
    console.log('✗ audit-tool-exercise — ' + gaps.length + ' gap(s), each with its exact fix:')
    for (const g of gaps) console.log('    GAP ' + g.what + '\n    FIX ' + g.fix)
    process.exit(1)
  }
  console.log('✓ audit-tool-exercise — the under-tested set is declared and did not grow; the debt only shrinks.')
}
