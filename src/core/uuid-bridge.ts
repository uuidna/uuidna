/**
 * UUID-Core Bridge
 * Connects the UUID-programmable MCP layer with the core operation registry
 * Allows operations to be addressed by UUID, name, or domain
 */

import { operationRegistry, listOperations, getOperation, executeOperation } from './operations.js'
import { ExecutionResult } from './types.js'
import { uuid as registry } from './uuid.js'
import { addressReferrerOf, uuidReceiptOf } from '../quantum/processing/unit/index.js'

// ============================================================================
// UUID OPERATION INDEX
// ============================================================================

interface UUIDIndexEntry {
  uuid: string
  domain: string
  operation: string
  registered?: Date
}

const referrerOf = (inputs?: Record<string, unknown>): string | undefined =>
  addressReferrerOf(typeof inputs?.referrer === 'string' ? inputs.referrer : undefined)

/**
 * Addresses every core operation by its content UUID (registered in the UUID registry) and executes it by UUID, with a quantum receipt per execution.
 * @wing receipts
 * @kind class
 */
export class UUIDBridge {
  private uuidToOperation: Map<string, string> = new Map() // uuid -> operation name
  private operationToUUID: Map<string, string> = new Map() // operation name -> uuid
  private domainUUIDs: Map<string, string[]> = new Map() // domain -> [uuids]

  constructor() {
    this.indexAllOperations()
  }

  /**
   * Index all operations from core registry with UUIDs
   */
  private indexAllOperations(): void {
    const operations = listOperations()

    for (const operationName of operations) {
      const operation = getOperation(operationName)
      if (!operation) continue

      // Generate deterministic UUID from domain + operation
      const uuid = registry.deterministic(operation.domain, operationName)
      if (!registry.has(uuid)) registry.register(uuid, 'operation', operation.domain, operationName)

      this.uuidToOperation.set(uuid, operationName)
      this.operationToUUID.set(operationName, uuid)

      // Index by domain
      const domainOps = this.domainUUIDs.get(operation.domain) || []
      if (!domainOps.includes(uuid)) {
        domainOps.push(uuid)
        this.domainUUIDs.set(operation.domain, domainOps)
      }
    }
  }

  /**
   * Execute operation by UUID
   */
  async executeByUUID(uuid: string, inputs?: Record<string, unknown>): Promise<ExecutionResult> {
    const operationName = this.uuidToOperation.get(uuid)
    if (!operationName) {
      const result = { success: false, error: `Operation not found for UUID: ${uuid}` }
      return { ...result, receipt: uuidReceiptOf('op missing', uuid, result, referrerOf(inputs)).uuid }
    }

    const result = await executeOperation(operationName, inputs)
    return { ...result, receipt: uuidReceiptOf(`op ${operationName}`, uuid, result, referrerOf(inputs)).uuid }
  }

  /**
   * Execute operation by name
   */
  async executeByName(name: string, inputs?: Record<string, unknown>): Promise<ExecutionResult> {
    return executeOperation(name, inputs)
  }

  /**
   * Get UUID for operation
   */
  getUUID(operationName: string): string | undefined {
    return this.operationToUUID.get(operationName)
  }

  /**
   * Get operation name for UUID
   */
  getOperationName(uuid: string): string | undefined {
    return this.uuidToOperation.get(uuid)
  }

  /**
   * List all UUIDs in domain
   */
  listDomain(domain: string): string[] {
    return this.domainUUIDs.get(domain) || []
  }

  /**
   * List all operations with their UUIDs
   */
  listAll(): UUIDIndexEntry[] {
    const entries: UUIDIndexEntry[] = []

    for (const [uuid, operationName] of this.uuidToOperation.entries()) {
      const operation = getOperation(operationName)
      if (operation) {
        entries.push({
          uuid,
          domain: operation.domain,
          operation: operationName
        })
      }
    }

    return entries
  }

  /**
   * Get all operations
   */
  getAll() {
    return this.listAll()
  }
}

// ============================================================================
// GLOBAL BRIDGE INSTANCE
// ============================================================================

/**
 * The UUIDBridge singleton.
 * @wing receipts
 * @kind function
 */
export const uuidBridge = new UUIDBridge()

/**
 * Execute operation by UUID (global)
  * @wing receipts
  * @kind function
 */
export async function executeByUUID(uuid: string, inputs?: Record<string, unknown>): Promise<ExecutionResult> {
  return uuidBridge.executeByUUID(uuid, inputs)
}

/**
 * Execute operation by name (global)
  * @wing receipts
  * @kind function
 */
export async function executeByName(name: string, inputs?: Record<string, unknown>): Promise<ExecutionResult> {
  return uuidBridge.executeByName(name, inputs)
}

export default UUIDBridge
