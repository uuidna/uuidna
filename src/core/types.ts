/**
 * Core Type Definitions
 * Unified type system for all operations and entities
 */

// ============================================================================
// OPERATION TYPES
// ============================================================================

export interface OperationMetadata {
  domain: string
  operation: string
  version?: string
  handler: (inputs?: Record<string, unknown>) => Promise<ExecutionResult>
}

export interface ExecutionResult {
  success: boolean
  data?: Record<string, unknown>
  error?: string
  /** Programmable UUID of this execution's quantum receipt (payload + referrer). */
  receipt?: string
}

export interface CompositionRequest {
  operations: string[]
  inputs?: Record<string, unknown>
}

// ============================================================================
// CLAY PROBLEM TYPES
// ============================================================================

export interface ClayProblem {
  id: string
  name: string
  prizeAmount: number
  description: string
  proof: string
  quantum: {
    approach: string
    accelerationFactor: number
  }
}

// ============================================================================
// CITATION TYPES
// ============================================================================

export interface Citation {
  author: string
  year: number
  title: string
  work: string
  relevance: string
}

export interface ScholarlyWork {
  author: string
  period: string
  title: string
  contribution: string
  citations: Citation[]
}

export type CitationCategory = 'citation' | 'domain' | 'genealogy' | 'problem' | 'scholar' | 'philosophy' | 'theology' | 'historical'

// ============================================================================
// LEAD TRACKING TYPES
// ============================================================================

export type LeadSourceType = 'citation' | 'domain' | 'genealogy' | 'problem' | 'scholar'

export interface LeadSource {
  type: LeadSourceType
  value: string
  category: string
}

export interface Lead {
  id: string
  timestamp: Date
  source: LeadSource
  userAgent: string
  referrer: string
  intent: string
  conversionValue?: number
  metadata?: Record<string, unknown>
}

export type IntentType = 'academic' | 'research' | 'commercial' | 'educational'

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface LeadAnalytics {
  totalLeads: number
  conversionRate: number
  topProblems: Array<{ problem: string; leads: number }>
  topScholars: Array<{ name: string; leads: number }>
  bySource: Record<string, number>
  byDomain: Record<string, number>
  byIntent: Record<string, number>
}

// ============================================================================
// ENCRYPTION TYPES
// ============================================================================

export interface EncryptedData {
  ciphertext: string
  iv: string
  salt: string
  tag: string
  referrer: string
  timestamp: number
}

export interface DecryptionResult {
  plaintext: string
  verified: boolean
  referrer: string
  timestamp: number
  age: number
}

// ============================================================================
// DOMAIN TYPES
// ============================================================================

export type DomainType =
  | 'cryptography'
  | 'drug-discovery'
  | 'finance'
  | 'materials-science'
  | 'ml'
  | 'network-optimization'
  | 'quantum-sensing'
  | 'supply-chain'

export interface DomainCitation {
  domain: DomainType
  works: ScholarlyWork[]
  count: number
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface AppConfig {
  environment: 'development' | 'staging' | 'production'
  port: number
  enableAutonomous: boolean
  autonomousIntervalMs: number
  corsOrigins: string[]
  cacheEnabled: boolean
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class OperationError extends Error {
  constructor(
    public operation: string,
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'OperationError'
  }
}

export class ValidationError extends Error {
  constructor(
    public field: string,
    message: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
