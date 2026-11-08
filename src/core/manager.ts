/**
 * Core Manager
 * OperationManager: composition, routing, execution, state management
 */

import { executeOperation, executeComposition, listOperations } from './operations.js'
import { ExecutionResult, CompositionRequest } from './types.js'

// ============================================================================
// OPERATION MANAGER
// ============================================================================

export class OperationManager {
  private executionHistory: Array<{
    operation: string
    success: boolean
  }> = []

  private cache: Map<string, ExecutionResult> = new Map()
  private cacheEnabled: boolean = true

  constructor(cacheEnabled: boolean = true) {
    this.cacheEnabled = cacheEnabled
  }

  /**
   * Execute single operation
   */
  async execute(
    operation: string,
    inputs?: Record<string, unknown>
  ): Promise<ExecutionResult> {
    const cacheKey = `${operation}:${JSON.stringify(inputs || {})}`

    // Check cache
    if (this.cacheEnabled && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      const result = await executeOperation(operation, inputs)

      // Log to history
      this.executionHistory.push({
        operation,
        success: result.success
      })

      // Cache result
      if (this.cacheEnabled && result.success) {
        this.cache.set(cacheKey, result)
      }

      return result
    } catch (error) {
      this.executionHistory.push({
        operation,
        success: false
      })

      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  /**
   * Execute composition (sequence of operations)
   */
  async executeComposition(request: CompositionRequest): Promise<ExecutionResult> {
    try {
      const result = await executeComposition(request.operations, request.inputs)

      // Log each operation
      for (const op of request.operations) {
        this.executionHistory.push({
          operation: op,
          success: result.success
        })
      }

      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  /**
   * Get execution history
   */
  getHistory(limit: number = 100) {
    return this.executionHistory.slice(-limit)
  }

  /**
   * Get execution statistics
   */
  getStats() {
    const history = this.executionHistory
    const total = history.length
    const successful = history.filter(h => h.success).length
    const failed = total - successful

    return {
      totalExecutions: total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      operationCount: new Set(history.map(h => h.operation)).size
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Enable/disable caching
   */
  setCacheEnabled(enabled: boolean) {
    this.cacheEnabled = enabled
    if (!enabled) {
      this.clearCache()
    }
  }

  /**
   * List all available operations
   */
  listOperations() {
    return listOperations()
  }

  /**
   * Get operation count
   */
  getOperationCount() {
    return this.listOperations().length
  }
}

// ============================================================================
// GLOBAL INSTANCE
// ============================================================================

export const defaultManager = new OperationManager(true)

/**
 * Execute operation via global manager
 */
export async function executeGlobal(
  operation: string,
  inputs?: Record<string, unknown>
): Promise<ExecutionResult> {
  return defaultManager.execute(operation, inputs)
}

/**
 * Execute composition via global manager
 */
export async function executeCompositionGlobal(
  request: CompositionRequest
): Promise<ExecutionResult> {
  return defaultManager.executeComposition(request)
}

export default OperationManager
