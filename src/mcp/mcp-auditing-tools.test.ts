import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { MCP_AUDITING_TOOLS, AUDITING_TOOLS, initializeAuditingTools } from './mcp-auditing-tools.js'
import { mcpOf } from '../quantum/processing/unit/mcp.js'

// Run from the repository root, as `npm run test:scripts` does.
const lean = readFileSync(resolve('src/quantum/processing/unit/index.lean'), 'utf8')
const declared = (lean.match(/^theorem\s+\S+/gm) ?? []).length

const run = (name: keyof typeof MCP_AUDITING_TOOLS) => MCP_AUDITING_TOOLS[name].handler({})

test('theorem_coverage_audit total equals the theorem declarations in index.lean', async () => {
  const r = (await run('theorem_coverage_audit')) as { total_theorems: number; proven_count: number }
  assert.equal(r.total_theorems, declared)
  assert.ok(declared > 0)
  assert.equal(r.proven_count, declared, 'every theorem recomputes to true with no sorry')
})

test('no audit returns the legacy hardcoded figures', async () => {
  const theorem = (await run('theorem_coverage_audit')) as { total_theorems: number }
  const tools = (await run('mcp_tool_audit')) as { total_tools: number }
  const blueprints = (await run('blueprint_composition_audit')) as { total_blueprints: number }
  assert.notEqual(theorem.total_theorems, 108)
  assert.notEqual(tools.total_tools, 50)
  assert.notEqual(blueprints.total_blueprints, 25)
})

test('mcp_tool_audit counts the served catalogue and reports no failing checks', async () => {
  const m = mcpOf()
  const served = m.tools.length + m.cybersecurity.tools.length
  const r = (await run('mcp_tool_audit')) as { total_tools: number; discoverable_count: number; issues: string[] }
  assert.equal(r.total_tools, served)
  assert.equal(r.discoverable_count, served)
  assert.deepEqual(r.issues, [])
})

test('unmeasured audits report null figures and measured: false, not invented values', async () => {
  const api = (await run('api_integration_audit')) as { average_accuracy: unknown; accuracy_measured: boolean }
  const auto = (await run('autonomous_validation_audit')) as { autonomy_score: unknown }
  assert.equal(api.accuracy_measured, false)
  assert.equal(api.average_accuracy, null)
  assert.equal(auto.autonomy_score, null)
  assert.equal(MCP_AUDITING_TOOLS.api_integration_audit.measured, false)
  assert.equal(MCP_AUDITING_TOOLS.autonomous_validation_audit.measured, false)
})

test('schedule_continuous_audit schedules nothing and issues no job id', async () => {
  const r = (await run('schedule_continuous_audit')) as Record<string, unknown>
  assert.equal(r.audit_scheduled, false)
  assert.equal('audit_job_id' in r, false)
})

test('end_to_end_audit status follows the figures it aggregates', async () => {
  const r = (await run('end_to_end_audit')) as { overall_status: string; critical_issues: number; issues_found: number }
  assert.ok(['HEALTHY', 'ISSUES_FOUND', 'FAILING'].includes(r.overall_status))
  if (r.critical_issues > 0) assert.equal(r.overall_status, 'FAILING')
  else if (r.issues_found > 0) assert.equal(r.overall_status, 'ISSUES_FOUND')
  else assert.equal(r.overall_status, 'HEALTHY')
})

test('initializeAuditingTools counts the tools it registers', async () => {
  const r = await initializeAuditingTools()
  assert.equal(r.tools_registered, AUDITING_TOOLS.length)
  assert.equal(r.measured + r.not_measured, r.tools_registered)
  assert.equal(r.continuous_monitoring, false)
})
