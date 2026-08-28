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
import { hexbitsOf, bitsOf, hexbitDoorOf, type HexbitDoor } from './hexbit/index.js'
import { coverage as monographCoverage } from './publish.js'

// the filesystem reach is the boundary's, not this module's — one layer owns it, everything else asks
const readJson = <T>(rel: string): T | null => {
  try { return JSON.parse(rdRoot(rel)) as T } catch { return null }
}

export interface ReportSection {
  title: string
  /** the artifact this section reads, or null when it computes from the ledger alone */
  source: string | null
  /** absent when the artifact has not been produced — stated, never guessed */
  present: boolean
  facts: Record<string, number | string>
  address: string
}

export interface ConsolidatedReports extends HexbitDoor {
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
 *  `total` in the artifact is the SUMMED cost, not a theorem count; subtracting one from the other would be a
 *  nonsense the report would then publish, so both are named for what they are and the shortfall is computed
 *  against the ledger instead. */
function coverage(): ReportSection {
  const h = readJson<{ measured: number; total: number }>('lean/heartbeats.json')
  if (!h) return section('Heartbeat coverage', 'lean/heartbeats.json', false, { note: 'not probed — run `npm run x -- lean-heartbeats`' })
  const keys = theorems().length
  return section('Heartbeat coverage', 'lean/heartbeats.json', true, {
    // FUSED IN HEXBITS, because the raw total is not stable and a seal cannot hold a moving number. The gate
    // re-proves every wing and re-measures, and the kernel's step counts shift with cache state: measured
    // 576,789 on one run and 576,831 on the next, 42 steps of drift on an unchanged tree. Sealing that raw
    // meant reports.json re-addressed on every pass, so git diff and spin could never agree and ten pushes
    // failed on it. At the resolution this ledger computes in, both totals ARE the same — 4 hexbits — because
    // the drift is far below the tile. Reporting the cost in hexbits is not hiding it; it is refusing to seal
    // digits finer than the unit that makes them meaningful, which is what the raw count was doing.
    theoremsMeasured: h.measured, ledgerKeys: keys, unmeasured: keys - h.measured,
    decideStepsHexbits: hexbitsOf(h.total), decideStepsBits: bitsOf(h.total),
  })
}

/** the citation audit — what the prose claims against what the ledger seals. */
function citations(): ReportSection {
  const c = readJson<{ publications: number; sealedTheorems: number; fabricated: string[]; uncited: string[]; receipt: string }>('audit-citations.json')
  if (!c) return section('Citation audit', 'audit-citations.json', false, { note: 'not run — npm run x -- audit-citations' })
  return section('Citation audit', 'audit-citations.json', true, {
    publications: c.publications, sealedTheorems: c.sealedTheorems,
    fabricated: c.fabricated.length, uncited: c.uncited.length, receipt: c.receipt,
  })
}

/** the support audit — which modules the roots actually reach; dead code is named, not hidden. */
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

function gateReceipt(): ReportSection {
  const g = readJson<{ receipt?: string; healthy?: boolean }>('gate-receipt.json')
  if (!g) return section('Gate receipt', 'gate-receipt.json', false, { note: 'not probed — a live gate writes this' })
  return section('Gate receipt', 'gate-receipt.json', true, {
    receipt: g.receipt ?? 'present', healthy: String(g.healthy ?? ''),
  })
}

function jsonCensus(): ReportSection {
  const analytics = readJson('analytics-report.json')
  const gapsFile = readJson('gaps.json')
  const claims = readJson<{ total_theorems?: number; total_claimed?: number }>('docs/captain-claims.json')
  const complete = readJson<{ total_theorems?: number; claimed?: number }>('docs/captain-claims-complete.json')
  const research = readJson<{ leads?: unknown[] }>('research-leads.json')
  const cov = monographCoverage()
  return section('JSON census (twins folded here)', null, true, {
    analyticsReport: analytics ? 'present — fold; live surface is gen-analytics' : 'absent (folded)',
    gapsJson: gapsFile ? 'present' : 'absent — count from coverage().uncoveredFiles',
    uncoveredFiles: cov.uncoveredFiles.length,
    captainClaimsTheorems: claims?.total_theorems ?? 0,
    captainClaimsComplete: complete ? 'present (twin of captain-claims.json)' : 'absent',
    researchLeads: Array.isArray(research?.leads) ? research.leads.length : 'absent',
    handleRoot: 'src/handle declared empty — chunks/seeds stay this wave',
  })
}

/** reportAll() — every report and audit in one structure, folded to one order-invariant receipt. */
export function reportAll(): ConsolidatedReports {
  const sections = [accounting(), coverage(), citations(), support(), packages(), readiness(), gateReceipt(), jsonCensus()]
  const receipt = merkleFold(sections.map((s) => s.address))
  return {
    sections,
    receipt,
    ...hexbitDoorOf(receipt),
    honest: 'Descriptive measures of what is sealed and what the gates recorded — integrity, not truth. A section whose artifact is absent says so; it does not guess. Frozen root JSON twins fold here rather than remaining unaddressed snapshots.',
  }
}
