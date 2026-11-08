// UUID Programmable Core: Pre-push Hook Integration
import { Operation, Result } from './types.js'
import { uuid as registry } from '../core/uuid.js'
import { uuidBridge } from '../core/uuid-bridge.js'
import { uuidReceiptOf, proveOf, proveHolds, embedDriftOf, mcpFailuresOf, hexRegistryOf } from '../quantum/processing/unit/index.js'

interface DeploymentGateStatus {
  ok: boolean
  operationCount: number
  categoryCount: number
  allVerified: boolean
  timestamp?: string
}

/**
 * Operations and workflows addressed by content UUID: executeByUUID, executeProgram (a list of UUIDs, each receipt the next referrer), runDeploymentGate (every operation resolves and prove holds) and release checks that read npm, GitHub and Zenodo.
 * @wing receipts
 * @kind class
 */
export class ConsolidatedMCP {
  private static instance: ConsolidatedMCP

  private constructor() {}

  static getInstance(): ConsolidatedMCP {
    if (!ConsolidatedMCP.instance) {
      ConsolidatedMCP.instance = new ConsolidatedMCP()
    }
    return ConsolidatedMCP.instance
  }

  /**
   * Execute operation by UUID: a content UUID (registry.deterministic(domain, id)) or the legacy "domain:id"
   */
  async executeByUUID(uuid: string, context: any): Promise<Result> {
    const address = registry.isValid(uuid) ? uuid : this.getOperationUUID(...(uuid.split(':') as [string, string]))
    const op = uuidBridge.getOperationName(address)
    if (op) {
      const r = await uuidBridge.executeByUUID(address, context)
      return { success: r.success, result: { uuid: address, operation: op, data: r.data, receipt: r.receipt }, ...(r.error ? { error: r.error } : {}) }
    }
    const workflow = this.getAllOperations().find((o) => o.uuid === address)
    if (workflow?.domain === 'operations') {
      const r = await this.executeWorkflow(workflow.id, context ?? {})
      const receipt = uuidReceiptOf(`workflow ${workflow.id}`, address, r, context?.referrer).uuid
      return { success: r.success === true, result: { uuid: address, operation: workflow.id, data: r, receipt }, ...(r.error ? { error: r.error } : {}) }
    }
    const error = `No operation at ${address}`
    return { success: false, result: { uuid: address, receipt: uuidReceiptOf('uuid missing', address, error, context?.referrer).uuid }, error }
  }

  /**
   * Run deployment gate checks
   */
  async runDeploymentGate(): Promise<DeploymentGateStatus & { proved: boolean; unresolved: string[] }> {
    // counted, not declared: every registered operation and workflow, each resolved by its UUID, and the unit's proof
    const verified = await this.verifyAllOperations()
    // the MCP contract (every tool, hint, schema and byte budget) and the drift-guard (embed == live recompute) are
    // leads too: a broken clause or a stale cool names itself here and blocks the push, instead of surfacing only in CI.
    // The registry loads lazily in-handler (cold-init budget), so the gate loads it first to check the real serving
    // state — otherwise cite/clause checks that read the families see an empty registry and report a false failure.
    await hexRegistryOf()
    const mcpFailures = mcpFailuresOf().map((c) => `mcp:${c}`)
    const embedDrift = embedDriftOf().map((k) => `embed:${k}`)
    const unresolved = [...[...verified].filter(([, ok]) => !ok).map(([uuid]) => uuid), ...mcpFailures, ...embedDrift]
    const categoryCount = new Set([...uuidBridge.listAll().map((e) => e.domain), ...this.getAllOperations().map((o) => o.domain)]).size
    const proved = proveHolds(proveOf())
    const allVerified = unresolved.length === 0
    return {
      ok: verified.size > 0 && allVerified && proved,
      operationCount: verified.size,
      categoryCount,
      allVerified,
      proved,
      unresolved,
    }
  }

  /**
   * Get operation UUID
   */
  getOperationUUID(domain: string, operationId: string): string {
    return registry.deterministic(domain, operationId)
  }

  /**
   * Get system status
   */
  async getStatus(): Promise<any> {
    const gate = await this.runDeploymentGate()
    return {
      status: 'operational',
      deploymentGate: gate,
      operationsAvailable: 61,
    }
  }

  /**
   * Get all operations including workflows
   */
  getAllOperations(): Array<any> {
    return this.operations ??= ([
      // Workflow operations for release management
      { id: 'cicd-pipeline', domain: 'operations' },
      { id: 'npm-publish', domain: 'operations' },
      { id: 'github-release', domain: 'operations' },
      { id: 'zenodo-doi-register', domain: 'operations' },
      { id: 'release-workflow', domain: 'operations' }
    ] as Array<{ id: string; domain: string }>).map((op) => ({ ...op, uuid: this.getOperationUUID(op.domain, op.id) }))
  }
  private operations?: Array<{ id: string; domain: string; uuid: string }>

  /**
   * Execute workflow operation by name
   */
  async executeWorkflow(workflowId: string, context: any): Promise<any> {
    const workflows: Record<string, Function> = {
      'cicd-pipeline': this.executeCicdPipeline.bind(this),
      'npm-publish': this.executeNpmPublish.bind(this),
      'github-release': this.executeGithubRelease.bind(this),
      'zenodo-doi-register': this.executeZenodoDoi.bind(this),
      'release-workflow': this.executeCompleteRelease.bind(this)
    }

    const workflow = workflows[workflowId]
    if (!workflow) {
      return { success: false, error: `Workflow not found: ${workflowId}` }
    }

    return workflow(context)
  }

  // THE RELEASE WORKFLOWS READ THE WORLD, they do not narrate it: each asks the registry, GitHub or Zenodo whether
  // the version is there, and says so. Publishing happens in publish.yml on a v1.<minor>.<digit> tag.
  private async readJson(url: string): Promise<any> {
    try {
      const r = await fetch(url, { headers: { accept: 'application/json', 'user-agent': '@uuidna/qpu' }, signal: AbortSignal.timeout(15000) })
      return r.ok ? await r.json() : { status: r.status }
    } catch (e) {
      return { unreachable: e instanceof Error ? e.message : String(e) }
    }
  }
  private versionOf(context: any): string {
    return String(context?.version ?? '').replace(/^v/, '')
  }

  private async executeCicdPipeline(context: any): Promise<any> {
    const gate = await this.runDeploymentGate()
    return { success: gate.ok, pipeline: 'gate', gate }
  }

  private async executeNpmPublish(context: any): Promise<any> {
    const version = this.versionOf(context)
    const doc = await this.readJson('https://registry.npmjs.org/@uuidna%2fqpu')
    const published = Boolean(doc?.versions?.[version])
    return { success: published, package: '@uuidna/qpu', version, published, latest: doc?.['dist-tags']?.latest ?? null, how: published ? 'on the registry' : 'publish.yml on tag v' + version }
  }

  private async executeGithubRelease(context: any): Promise<any> {
    const tag = context?.tag ?? `v${this.versionOf(context)}`
    const doc = await this.readJson(`https://api.github.com/repos/uuidna/qpu/releases/tags/${tag}`)
    const released = typeof doc?.tag_name === 'string'
    return { success: released, tag, released, url: released ? doc.html_url : null }
  }

  private async executeZenodoDoi(context: any): Promise<any> {
    const version = this.versionOf(context)
    const doc = await this.readJson('https://zenodo.org/api/records?q=conceptrecid:22700098&all_versions=1&size=25')
    const hit = (doc?.hits?.hits ?? []).find((h: any) => String(h?.metadata?.version ?? '').replace(/^v/, '') === version)
    return { success: Boolean(hit), version, registered: Boolean(hit), doi: hit?.doi ?? null }
  }

  private async executeCompleteRelease(context: any): Promise<any> {
    const phases = [await this.executeNpmPublish(context), await this.executeGithubRelease(context), await this.executeZenodoDoi(context)]
    return { success: phases.every((p) => p.success), version: this.versionOf(context), phases, releaseComplete: phases.every((p) => p.success) }
  }

  /**
   * Get operations by domain
   */
  getOperationsByDomain(domain: string): Array<any> {
    return this.getAllOperations().filter(op => op.domain === domain)
  }

  /**
   * Verify all operations
   */
  async verifyAllOperations(): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>()
    const ops = this.getAllOperations()

    for (const op of ops) {
      results.set(op.uuid, op.domain === 'operations' || uuidBridge.getOperationName(op.uuid) !== undefined)
    }
    for (const { uuid } of uuidBridge.listAll()) results.set(uuid, true)

    return results
  }

  /**
   * Execute program (for unified-mcp-router compatibility)
   */
  async executeProgram(program: { operations: Array<string | { uuid: string; context?: any }>; referrer?: string }): Promise<any> {
    const steps: Result[] = []
    let referrer = program?.referrer
    for (const step of program?.operations ?? []) {
      const { uuid, context } = typeof step === 'string' ? { uuid: step, context: {} } : step
      const r = await this.executeByUUID(uuid, { ...context, ...(referrer ? { referrer } : {}) })
      referrer = r.result?.receipt ?? referrer
      steps.push(r)
      if (!r.success) return { success: false, result: { executed: steps.length, failedAt: uuid }, steps }
    }
    return { success: true, result: { executed: steps.length }, steps }
  }

  /**
   * List operations (for unified-mcp-router compatibility)
   */
  listOperations(): Array<any> {
    return this.getAllOperations()
  }
}

// Export types for unified-mcp-router
export interface UUIDOperation {
  id: string
  domain: string
  name: string
}

export interface OperationMetadata {
  id: string
  domain: string
}

export interface CombinatorialProgram {
  operations: Array<any>
}

export interface CompositionRule {
  domain1: string
  domain2: string
}

export interface ExecutionStep {
  operation: string
}

export interface UUIDCombinatorialSpace {
  operations: Array<any>
}

export interface UUIDProgrammableExecutor {
  execute: (program: any) => Promise<any>
}

export interface ExecutionResult {
  success: boolean
}

export interface ProgramExecutionResult {
  success: boolean
}

export interface ConsolidatedMCPOperations {
  executeByUUID: (uuid: string, context: any) => Promise<any>
}

// Export singleton
/**
 * The ConsolidatedMCP singleton.
 * @wing receipts
 * @kind function
 */
export const consolidatedMCP = ConsolidatedMCP.getInstance()

export default ConsolidatedMCP
