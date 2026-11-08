/**
 * Core Module - Unified, DRY, Extensible
 * All types, operations, and management in one consolidated module
 */

// Types
export * from './types.js'

// Operations
export {
  operationRegistry,
  getOperation,
  listOperations,
  countByDomain,
  executeOperation,
  executeComposition
} from './operations.js'

// Manager
export {
  OperationManager,
  defaultManager,
  executeGlobal,
  executeCompositionGlobal
} from './manager.js'

// UUID Bridge (connects to UUID-programmable MCP layer)
export {
  UUIDBridge,
  uuidBridge,
  executeByUUID,
  executeByName
} from './uuid-bridge.js'

// Convenience exports
export type { OperationMetadata, ExecutionResult, CompositionRequest } from './types.js'
