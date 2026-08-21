// src/reports.ts — THE ONE REPORT SURFACE. Every report and every audit, consolidated, computed, quantum-usable.
//
// WHY. reports.json sat tracked for three days stating 1195 theorems and 66 principles, with no writer and no
// reader — a frozen snapshot of five reports that five LIVE gates already compute. analytics-report.json is the
// same shape from a different day. Each was true once. A report that is stored rather than computed is a claim
// nothing recomputes, which is the one thing this ledger refuses everywhere else.
//
// So the reports are not files any more; they are a FUNCTION of the sealed ledger and the gate artifacts, folded
// order-invariantly to one receipt. The file becomes an output. The MCP tool becomes the interface — usable in
// quantum: any harness asks for the report and recomputes the same numbers, in the same order-independent fold,
// without trusting the file or the machine that wrote it.
//
// HONEST SCOPE: these are DESCRIPTIVE measures of what is sealed and what the gates recorded — integrity, not
// truth. A section whose input artifact is absent reports itself absent rather than guessing, because a report
// that fills its own gaps is the failure this file exists to end.
import { theorems, PRINCIPLES, runTrial } from './theorems/index.js'
import { rdRoot } from './boundary.js'
import { statementCensus } from './editorial.js'
import { coins } from './captain/billing/index.js'
import { toUuid, merkleFold } from './address.js'

// the filesystem reach is the boundary's's — one layer owns it, everything else asks
const readJson = <T>(rel: string): T | null => {
  try { return JSON.parse(rdRoot(rel)) as T } catch { return null }
}

export interface ReportSection {
  title: string
  /** the artifact this section reads, or null when it computes from the ledger alone */
  source: string | null
  /** absent when the artifact has not been produced — stated
  present: boolean
  facts: Record<string, number | string>
  address: string
}

export interface ConsolidatedReports {
  sections: ReportSection[]
  /** the order-invariant fold of every section address — the same receipt for every observer */
  receipt: string
  honest: string
}

const section = (title: string, source: string | null, present: boolean, facts: Record<string, number | string>): ReportSection =>
  ({ title, source, present, facts, address: toUuid(JSON.stringify({ title, facts })) })

/** theoremAccounting — assets and equity: theorems by principle, both ledger sizes, the conserved coins. */
function accounting(): ReportSection {
  const T = theorems()
  const census = statementCensus()
  const bySize = [...new Set(T.map((t) => t.principle))]
    .map((p) => [p, T.filter((t) => t.principle === p).length] as const)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  return section('Theorem accounting (ledger balance)', null, true, {
    distinct: census.distinct,
    keys: T.length,
    renamings: census.renamings,
    principles: (PRINCIPLES as unknown[]).length,
    skills: new Set(T.map((t) => t.skill)).size,
    coins: coins(),
    largestPrinciple: bySize[0] ? `${bySize[0][0]} (${bySize[0][1]})` : 'none',
    smallestPrinciple: bySize[bySize.length - 1] ? `${bySize[bySize.length - 1][0]} (${bySize[bySize.length - 1][1]})` : 'none',
    ledgerReceipt: runTrial().receipt,
  })
}

/** Heartbeat coverage — how many theorems carry a measured decide-step cost, and what those steps sum to.
 *  `total` in the artifact is the SUMMED cost; subtracting one from the other would be a
 *  nonsense the report would then publish, so both are named for what they are and the shortfall is computed
 *  against the ledger instead. */
// COST — the DISTRIBUTION of what verification actually costs. coverage()
// above reports the totals; this reports the shape, which is where the information is: a median beside a maximum
// three orders of magnitude larger says the ledger is cheap everywhere except in a few places, and names them.
// The unit is DECIDE-STEPS, counted by the kernel — the repository cannot time itself (harmonic-scan hard-rejects
// wall-clock reads with no exemption anywhere in src), so cost is measured in the work the kernel performs rather
// than in seconds, which also makes it machine-independent: the same theorem costs the same steps on any host.
// All arithmetic here is exact integer division — no host intrinsic settles a statistic in this ledger.
function cost(): ReportSection {
  const h = readJson<{ costs: Record<string, number> }>('lean/heartbeats.json')
  if (!h?.costs) return section('Verification cost', 'lean/heartbeats.json', false, { note: 'not probed — run npm run heartbeats' })
  const entries = Object.entries(h.costs).sort((a, b) => a[1] - b[1])
  const v = entries.map((e) => e[1])
  const n = v.length
  if (n === 0) return section('Verification cost', 'lean/heartbeats.json', false, { note: 'no costs recorded' })
  const at = (num: number, den: number): number => v[(num * n - (num * n) % den) / den < n ? (num * n - (num * n) % den) / den : n - 1]
  const total = v.reduce((a, b) => a + b, 0)
  return section('Verification cost', 'lean/heartbeats.json', true, {
    unit: 'decide-steps counted by the kernel — machine-independent, since the repository may not time itself',
    theorems: n,
    cheapest: v[0], quartile1: at(1, 4), median: at(1, 2), quartile3: at(3, 4), dearest: v[n - 1],
    total,
    mean: (total - total % n) / n,
    // the tail is the whole story: name what the ledger actually spends its verification on
    dearestFive: entries.slice(-5).reverse().map(([key, steps]) => key + ' ' + steps).join(' · '),
    concentration: 'the five dearest against the total, as an exact pair — never a percentage, which would round',
    dearestFiveSteps: entries.slice(-5).reduce((a, e) => a + e[1], 0),
    honest: 'DESCRIPTIVE: this measures what the kernel spent deciding.',
  })
}

function coverage(): ReportSection {
  const h = readJson<{ measured: number; total: number }>('lean/heartbeats.json')
  if (!h) return section('Heartbeat coverage', 'lean/heartbeats.json', false, { note: 'not probed — run npm run heartbeats' })
  const keys = theorems().length
  return section('Heartbeat coverage', 'lean/heartbeats.json', true, {
    theoremsMeasured: h.measured, ledgerKeys: keys, unmeasured: keys - h.measured, summedDecideSteps: h.total,
  })
}

/** the citation audit — what the prose claims against what the ledger seals. */
function citations(): ReportSection {
  const c = readJson<{ publications: number; sealedTheorems: number; fabricated: string[]; uncited: string[]; receipt: string }>('audit-citations.json')
  if (!c) return section('Citation audit', 'audit-citations.json', false, { note: 'not run — npm run audit:citations' })
  return section('Citation audit', 'audit-citations.json', true, {
    publications: c.publications, sealedTheorems: c.sealedTheorems,
    fabricated: c.fabricated.length, uncited: c.uncited.length, receipt: c.receipt,
  })
}

/** the support audit — which modules the roots actually reach; dead code is named. */
function support(): ReportSection {
  const s = readJson<{ modules: number; roots: number; supported: number; dead: string[]; receipt: string }>('support-audit.json')
  if (!s) return section('Support audit', 'support-audit.json', false, { note: 'not run — npm run audit' })
  return section('Support audit', 'support-audit.json', true, {
    modules: s.modules, roots: s.roots, supported: s.supported, dead: s.dead.length, receipt: s.receipt,
  })
}

/** packageInventory — the workspaces, read from their own manifests rather than remembered. */
function packages(): ReportSection {
  const root = readJson<{ workspaces?: string[]; version: string }>('package.json')
  const names: string[] = []
  for (const dir of ['crypto', 'edge', 'ledger', 'mcp', 'quantum', 'research']) {
    const p = readJson<{ name: string }>(`packages/${dir}/package.json`)
    if (p) names.push(p.name)
  }
  return section('Package inventory', 'packages/*/package.json', names.length > 0, {
    workspaces: names.length, version: root?.version ?? 'unknown', names: names.join(', '),
  })
}

/** deploymentReadiness — the fold the guard sealed, which is the only readiness anyone can recompute. */
function readiness(): ReportSection {
  const q = readJson<{ receipt: string; unified_fold: string; zero_entropy?: unknown }>('quantum-fold.json')
  if (!q) return section('Deployment readiness', 'quantum-fold.json', false, { note: 'not sealed — npm run guard' })
  return section('Deployment readiness', 'quantum-fold.json', true, {
    foldReceipt: q.receipt, unifiedFold: q.unified_fold,
  })
}

/** reportAll() — every report and audit in one structure, folded to one order-invariant receipt. */
export function reportAll(): ConsolidatedReports {
  const sections = [accounting(), coverage(), cost(), citations(), support(), packages(), readiness()]
  return {
    sections,
    receipt: merkleFold(sections.map((s) => s.address)),
    honest: 'Descriptive measures of what is sealed and what the gates recorded — integrity. A section whose artifact is absent says so; it does not guess.',
  }
}
