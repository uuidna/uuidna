/**
 * MCP Auditing Tools: each audit computes its figures from the sources the unit already serves:
 * the Lean source and its per-theorem recomputation, the MCP tool catalogue and its checks, the
 * blueprint tables, the family list, and the API registry. A figure that needs a host fact this code
 * cannot reach (a live API call, runtime telemetry, a scheduler) is returned as null with
 * `measured: false`. Nothing here is a constant.
 */
import { leanSource, leanRecomputed } from '../quantum/processing/unit/lean.js'
import { mcpOf, mcpChecksOf } from '../quantum/processing/unit/mcp.js'
// families.js must stay imported here: its side effects register the hex families, and cite's
// grant.next (checked by mcpChecksOf) reads the 'graph' family. Without it the cite check fails
// depending only on load order, so the audit would report a defect the served unit does not have.
import { families } from './families.js'
import { REGISTRY_SNAPSHOT } from './registry.js'
import { ALL_BLUEPRINTS } from './blueprint-template.js'
import { ENTANGLED_BLUEPRINTS } from './blueprint-entanglement.js'

type Args = Record<string, unknown>

// ============================================================================
// SHARED READINGS
// ============================================================================

type Theorem = { name: string; domain: string; holds: boolean; sorry: boolean }

/** Every theorem declared in index.lean, with its section heading, its recomputed verdict, and whether its block says sorry. */
const theoremsOf = (): Theorem[] => {
  const out: Theorem[] = []
  let domain = 'unsectioned'
  let current: Theorem | undefined
  for (const line of leanSource.split('\n')) {
    const heading = /^\/-!\s*#\s*(.+?)\s*$/.exec(line)
    if (heading) {
      domain = heading[1]!.slice(0, 60)
      current = undefined
      continue
    }
    const decl = /^theorem\s+(\S+)/.exec(line)
    if (decl) {
      current = { name: decl[1]!, domain, holds: leanRecomputed[decl[1]!]?.holds === true, sorry: false }
      out.push(current)
    }
    if (current && /\bsorry\b/.test(line)) current.sorry = true
  }
  return out
}

const isProven = (t: Theorem): boolean => t.holds && !t.sorry

type Blueprint = { id: string; domain: string; theorem_tools: string[]; apis?: Array<{ name: string }> }
type Entangled = { id: string; blueprints: string[]; domains: string[]; composed_theorems: string[] }

const singleBlueprintsOf = (): Blueprint[] => Object.values(ALL_BLUEPRINTS).flat() as Blueprint[]
const entangledOf = (): Entangled[] => ENTANGLED_BLUEPRINTS as Entangled[]

// ============================================================================
// AUDITS
// ============================================================================

/** Theorem coverage: every theorem in index.lean, recomputed in TypeScript. The Lean kernel is not run here. */
const theoremCoverage = (_args: Args = {}) => {
  const theorems = theoremsOf()
  const proven = theorems.filter(isProven)
  const domains = new Map<string, { count: number; proven: number }>()
  for (const t of theorems) {
    const d = domains.get(t.domain) ?? { count: 0, proven: 0 }
    d.count++
    if (isProven(t)) d.proven++
    domains.set(t.domain, d)
  }
  const axioms = (leanSource.match(/^axiom\s/gm) ?? []).length
  const sorries = theorems.filter((t) => t.sorry).length
  return {
    total_theorems: theorems.length,
    proven_count: proven.length,
    coverage_percent: theorems.length === 0 ? 0 : Math.round((1000 * proven.length) / theorems.length) / 10,
    by_domain: Object.fromEntries(
      [...domains].map(([d, v]) => [d, { count: v.count, proven: v.proven, status: v.proven === v.count ? 'RECOMPUTED' : 'INCOMPLETE' }]),
    ),
    missing_proofs: theorems.filter((t) => !isProven(t)).map((t) => t.name),
    sorry_count: sorries,
    axiom_count: axioms,
    lean_kernel_checked: false,
    soundness_check: `${proven.length} of ${theorems.length} theorems recompute to true with no sorry and ${axioms} axioms; the Lean kernel is not run in the worker`,
  }
}

/** MCP tool catalogue: every served tool, its schema, its man page, and the catalogue's own checks. */
const toolAudit = (_args: Args = {}) => {
  const m = mcpOf()
  const doors = m.tools as unknown as Array<{ name: string; inputSchema?: { type?: string } }>
  const cyber = m.cybersecurity.tools as unknown as Array<{ name: string; man?: { holds?: boolean } }>
  const names = [...doors.map((t) => t.name), ...cyber.map((t) => t.name)]
  const schemaIssues = doors.filter((t) => t.inputSchema?.type !== 'object').map((t) => t.name)
  const issues = mcpChecksOf(m).filter(([, ok]) => !ok).map(([name]) => name)
  return {
    total_tools: names.length,
    registered_count: names.filter((n) => n.length > 0).length,
    discoverable_count: new Set(names).size,
    schema_validity: schemaIssues.length === 0 ? 'ALL_VALID' : `INVALID: ${schemaIssues.join(', ')}`,
    handler_binding_status: issues.length === 0 ? 'COMPLETE' : `FAILING: ${issues.join(', ')}`,
    issues,
  }
}

/** Blueprint composition: references from each blueprint into index.lean and between blueprints. */
const blueprintAudit = (_args: Args = {}) => {
  const single = singleBlueprintsOf()
  const entangled = entangledOf()
  const ids = new Set(single.map((b) => b.id))
  const leanNames = new Set(theoremsOf().map((t) => t.name))
  const refs = single.flatMap((b) => b.theorem_tools)
  const unresolved = [...new Set(refs.filter((r) => !leanNames.has(r)))]
  const dangling = entangled.flatMap((e) => e.blueprints.filter((id) => !ids.has(id)).map((id) => `${e.id} -> ${id}`))
  const withApis = single.filter((b) => (b.apis ?? []).length > 0)
  return {
    total_blueprints: single.length + entangled.length,
    single_domain: single.length,
    multi_domain: entangled.length,
    api_mapped: withApis.length,
    deployment_ready: withApis.filter((b) => b.theorem_tools.every((r) => leanNames.has(r))).length,
    theorem_refs_total: refs.length,
    theorem_refs_unresolved: unresolved,
    dangling_refs: dangling,
    composition_integrity:
      dangling.length === 0 && unresolved.length === 0
        ? 'VERIFIED'
        : `NOT_VERIFIED: ${dangling.length} dangling blueprint refs, ${unresolved.length} theorem names not in index.lean`,
  }
}

/** API integration: what the blueprints declare and what the registry lists. Accuracy needs live calls, so it is not measured. */
const apiAudit = (_args: Args = {}) => {
  const apiNames = new Set(singleBlueprintsOf().flatMap((b) => (b.apis ?? []).map((a) => a.name)))
  const registry = Object.values(REGISTRY_SNAPSHOT) as Array<{ versions?: Record<string, unknown> }>
  return {
    domains: Object.keys(ALL_BLUEPRINTS).length,
    apis_declared: apiNames.size,
    registry_apis: registry.length,
    registry_specs: registry.reduce((s, e) => s + Object.keys(e.versions ?? {}).length, 0),
    accuracy_measured: false,
    average_accuracy: null,
    accuracy_by_domain: null,
    cross_domain_accuracy: null,
    integration_status: 'NOT_MEASURED: accuracy needs live calls to each API, which this code does not make',
  }
}

/** Hex consolidation: duplicate entries in the family list. Code-size and lookup-cost figures are not computed here. */
const hexAudit = (_args: Args = {}) => {
  const list: readonly string[] = families
  const duplicates = list.length - new Set(list).size
  return {
    families: list.length,
    duplication_eliminated: duplicates,
    total_operations_consolidated: null,
    code_reduction_percent: null,
    indexing_levels: null,
    lookup_complexity: null,
    consolidation_integrity: duplicates === 0 ? 'VERIFIED' : `DUPLICATES: ${duplicates}`,
  }
}

/** Autonomy needs runtime telemetry the unit does not record, so none of its figures are claimed. */
const autonomyAudit = (_args: Args = {}) => ({
  autonomy_score: null,
  manual_operations: null,
  systems_autonomous: null,
  deployment_readiness: 'NOT_MEASURED',
  operational_status: 'NOT_MEASURED: no runtime telemetry is recorded by the unit',
})

/** Cross-domain compositions: pair counts from the blueprint domains, and whether each composition's references resolve. */
const crossDomainAudit = (_args: Args = {}) => {
  const domains = Object.keys(ALL_BLUEPRINTS)
  const entangled = entangledOf()
  const ids = new Set(singleBlueprintsOf().map((b) => b.id))
  const leanNames = new Set(theoremsOf().map((t) => t.name))
  const byDomains: Record<string, number> = {}
  for (const e of entangled) {
    const key = e.domains.length === domains.length ? 'all_domains' : [...e.domains].sort().join('_')
    byDomains[key] = (byDomains[key] ?? 0) + 1
  }
  const verified = entangled.filter(
    (e) => e.blueprints.every((id) => ids.has(id)) && e.composed_theorems.every((t) => leanNames.has(t)),
  ).length
  const status = verified === entangled.length ? 'VERIFIED' : `NOT_VERIFIED: ${entangled.length - verified} compositions cite unresolved theorems`
  return {
    domains: domains.length,
    domain_pairs: (domains.length * (domains.length - 1)) / 2,
    compositions_total: entangled.length,
    compositions_verified: verified,
    compositions_by_domains: byDomains,
    composition_safety: status,
    invariant_status: status,
  }
}

/** Involute closure: the theorems whose names carry "involut", recomputed. Spiral counts are not in the source, so they are null. */
const involuteAudit = (_args: Args = {}) => {
  const inv = theoremsOf().filter((t) => /involut/i.test(t.name))
  const held = inv.filter(isProven)
  return {
    involution_theorems: inv.length,
    recomputed_holding: held.length,
    involute_closure_complete: inv.length > 0 && held.length === inv.length,
    names: inv.map((t) => t.name),
    involute_spirals: null,
    scope: 'theorems whose names contain "involut" in index.lean; spiral counts are not computed by this code',
  }
}

/** End to end: every computed audit above, with issues counted from their own figures. */
const endToEndAudit = (args: Args = {}) => {
  const depth = typeof args.audit_depth === 'string' ? args.audit_depth : 'standard'
  const theorem = theoremCoverage()
  const tool = toolAudit()
  const blueprint = blueprintAudit()
  const hex = hexAudit()
  const cross = crossDomainAudit()
  const critical = theorem.missing_proofs.length + theorem.sorry_count + tool.issues.length
  const issues =
    critical +
    blueprint.theorem_refs_unresolved.length +
    blueprint.dangling_refs.length +
    hex.duplication_eliminated +
    (cross.compositions_total - cross.compositions_verified)
  const overall = critical > 0 ? 'FAILING' : issues > 0 ? 'ISSUES_FOUND' : 'HEALTHY'
  const recommendation = [
    theorem.missing_proofs.length > 0 ? `Theorems that do not recompute: ${theorem.missing_proofs.join(', ')}.` : null,
    tool.issues.length > 0 ? `MCP checks failing: ${tool.issues.join(', ')}.` : null,
    blueprint.theorem_refs_unresolved.length > 0
      ? `${blueprint.theorem_refs_unresolved.length} blueprint theorem names are not in index.lean.`
      : null,
    cross.compositions_verified < cross.compositions_total
      ? `${cross.compositions_total - cross.compositions_verified} cross-domain compositions do not resolve.`
      : null,
    'Not measured by this code: API accuracy, autonomy, involute spirals.',
  ]
    .filter((s): s is string => s !== null)
    .join(' ')
  return {
    audit_type: depth,
    components_audited: 7,
    issues_found: issues,
    critical_issues: critical,
    overall_status: overall,
    readiness_level: overall === 'HEALTHY' ? 'CLEAN_ON_MEASURED_CHECKS' : 'NOT_READY',
    recommendation,
  }
}

// ============================================================================
// MCP AUDIT TOOLS
// ============================================================================

const NO_INPUT = { type: 'object', properties: {} } as const

export const MCP_AUDITING_TOOLS = {
  theorem_coverage_audit: {
    name: 'theorem_coverage_audit',
    description: 'Recompute every theorem in index.lean: count, proofs, sorry, axioms, and coverage by section',
    inputSchema: NO_INPUT,
    measured: true,
    handler: theoremCoverage,
  },
  mcp_tool_audit: {
    name: 'mcp_tool_audit',
    description: 'Audit the served MCP tool catalogue: schemas, discoverability, and the catalogue checks',
    inputSchema: NO_INPUT,
    measured: true,
    handler: toolAudit,
  },
  blueprint_composition_audit: {
    name: 'blueprint_composition_audit',
    description: 'Audit blueprint counts, API mapping, and whether blueprint theorem references resolve in index.lean',
    inputSchema: NO_INPUT,
    measured: true,
    handler: blueprintAudit,
  },
  api_integration_audit: {
    name: 'api_integration_audit',
    description: 'Count declared and registered APIs; accuracy is reported as not measured',
    inputSchema: NO_INPUT,
    measured: false,
    handler: apiAudit,
  },
  hex_consolidation_audit: {
    name: 'hex_consolidation_audit',
    description: 'Check the family list for duplicate entries',
    inputSchema: NO_INPUT,
    measured: true,
    handler: hexAudit,
  },
  autonomous_validation_audit: {
    name: 'autonomous_validation_audit',
    description: 'Report autonomy; not measured, because the unit records no runtime telemetry',
    inputSchema: NO_INPUT,
    measured: false,
    handler: autonomyAudit,
  },
  cross_domain_invariants_audit: {
    name: 'cross_domain_invariants_audit',
    description: 'Count cross-domain compositions and check that their references resolve',
    inputSchema: NO_INPUT,
    measured: true,
    handler: crossDomainAudit,
  },
  involute_closure_audit: {
    name: 'involute_closure_audit',
    description: 'Recompute the involution theorems in index.lean',
    inputSchema: NO_INPUT,
    measured: true,
    handler: involuteAudit,
  },
  end_to_end_audit: {
    name: 'end_to_end_audit',
    description: 'Run the computed audits and count their issues; overall status follows the figures',
    inputSchema: {
      type: 'object',
      properties: { audit_depth: { type: 'string', enum: ['quick', 'standard', 'comprehensive'] } },
    },
    measured: true,
    handler: endToEndAudit,
  },
  schedule_continuous_audit: {
    name: 'schedule_continuous_audit',
    description: 'Scheduling is not implemented: the worker keeps no state and no scheduler is configured',
    inputSchema: {
      type: 'object',
      properties: { audit_interval_minutes: { type: 'number' } },
    },
    measured: false,
    handler: async (args: Args = {}) => ({
      audit_scheduled: false,
      requested_interval_minutes: typeof args.audit_interval_minutes === 'number' ? args.audit_interval_minutes : null,
      reason: 'Not implemented: nothing was scheduled and no job id was issued.',
    }),
  },
}

// ============================================================================
// EXPORT
// ============================================================================

export const AUDITING_TOOLS = Object.values(MCP_AUDITING_TOOLS)

export async function initializeAuditingTools(): Promise<{
  tools_registered: number
  measured: number
  not_measured: number
  continuous_monitoring: boolean
}> {
  const measured = AUDITING_TOOLS.filter((t) => t.measured).length
  return {
    tools_registered: AUDITING_TOOLS.length,
    measured,
    not_measured: AUDITING_TOOLS.length - measured,
    continuous_monitoring: false,
  }
}

export default MCP_AUDITING_TOOLS
