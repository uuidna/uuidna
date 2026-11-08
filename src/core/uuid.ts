/**
 * UUID Core - Minimal, DRY, Native
 * Boolean-driven problem decomposition
 * All complexity handled natively
 */

import { randomUUID as uuidv4 } from 'node:crypto'
import { shapeUuidOf } from '../quantum/processing/unit/index.js'

// ============================================================================
// TYPES
// ============================================================================

type ResourceType = 'operation' | 'theorem' | 'formula' | 'domain' | 'mcp'

interface Entry {
  uuid: string
  type: ResourceType
  domain: string
  resource: string
  metadata: Record<string, any>
  createdAt?: Date
  verified: boolean
}

interface Index {
  uuid: Map<string, Entry>
  domain: Map<string, Set<string>>
  resource: Map<string, Entry>
  type: Map<string, Set<string>>
}

// ============================================================================
// CORE ENGINE
// ============================================================================

/**
 * The UUID registry: register resources by UUID and index them by domain, resource and type; deterministic() gives content UUIDs (shapeUuidOf).
 * @wing receipts
 * @kind class
 */
export class UUID {
  private index: Index = {
    uuid: new Map(),
    domain: new Map(),
    resource: new Map(),
    type: new Map()
  }

  // BOOLEAN QUESTIONS: Is this UUID...?

  has(uuid: string): boolean {
    return this.index.uuid.has(uuid)
  }

  isValid(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)
  }

  isInDomain(uuid: string, domain: string): boolean {
    const entry = this.index.uuid.get(uuid)
    return entry ? entry.domain === domain : false
  }

  isType(uuid: string, type: ResourceType): boolean {
    const entry = this.index.uuid.get(uuid)
    return entry ? entry.type === type : false
  }

  isVerified(uuid: string): boolean {
    const entry = this.index.uuid.get(uuid)
    return entry ? entry.verified : false
  }

  // REGISTRATION: Add resource with automatic indexing

  register(
    uuid: string,
    type: ResourceType,
    domain: string,
    resource: string,
    metadata: Record<string, any> = {}
  ): Entry {
    const entry: Entry = {
      uuid,
      type,
      domain,
      resource,
      metadata,
      verified: false
    }

    // Index by UUID
    this.index.uuid.set(uuid, entry)

    // Index by domain
    this.getOrCreateSet(this.index.domain, domain).add(uuid)

    // Index by resource key
    this.index.resource.set(`${domain}::${resource}`, entry)

    // Index by type
    this.getOrCreateSet(this.index.type, type).add(uuid)

    return entry
  }

  // LOOKUP: Retrieve by any key

  byUUID(uuid: string): Entry | undefined {
    return this.index.uuid.get(uuid)
  }

  byResource(domain: string, resource: string): Entry | undefined {
    return this.index.resource.get(`${domain}::${resource}`)
  }

  byDomain(domain: string): string[] {
    return Array.from(this.index.domain.get(domain) || new Set())
  }

  byType(type: ResourceType): string[] {
    return Array.from(this.index.type.get(type) || new Set())
  }

  // GENERATION: Deterministic and random

  deterministic(domain: string, resource: string): string {
    return shapeUuidOf(`${domain}::${resource}`)
  }

  random(): string {
    return uuidv4()
  }

  // STATS: Analytics

  stats() {
    return {
      total: this.index.uuid.size,
      domains: this.index.domain.size,
      types: Object.fromEntries(
        Array.from(this.index.type.entries()).map(([type, set]) => [type, set.size])
      ),
      verified: Array.from(this.index.uuid.values()).filter(e => e.verified).length
    }
  }

  // EXPORT/IMPORT: Persistence

  export(): string {
    return JSON.stringify(
      Array.from(this.index.uuid.values()).map(e => ({
        ...e,
        createdAt: e.createdAt?.toISOString()
      })),
      null,
      2
    )
  }

  import(json: string): void {
    const entries = JSON.parse(json)
    for (const e of entries) {
      this.register(e.uuid, e.type, e.domain, e.resource, e.metadata)
    }
  }

  // HELPER: Get or create set

  private getOrCreateSet<K>(map: Map<K, Set<string>>, key: K): Set<string> {
    if (!map.has(key)) {
      map.set(key, new Set())
    }
    return map.get(key)!
  }
}

// ============================================================================
// GLOBAL INSTANCE
// ============================================================================

/**
 * The process-wide UUID registry.
 * @wing receipts
 * @kind function
 */
export const uuid = new UUID()

// ============================================================================
// HELPER FUNCTIONS: High-level API
// ============================================================================

/**
 * Register a resource under a UUID with its type, domain and metadata.
 * @wing receipts
 * @kind function
 */
export function register(
  id: string,
  type: ResourceType,
  domain: string,
  resource: string,
  meta?: Record<string, any>
): Entry {
  return uuid.register(id, type, domain, resource, meta)
}

/**
 * The registry entry for a UUID.
 * @wing receipts
 * @kind function
 */
export function get(id: string): Entry | undefined {
  return uuid.byUUID(id)
}

/**
 * The registry entry for a domain and resource.
 * @wing receipts
 * @kind function
 */
export function find(domain: string, resource: string): Entry | undefined {
  return uuid.byResource(domain, resource)
}

/**
 * A UUID for a domain and resource: content-derived, or random when asked.
 * @wing receipts
 * @kind function
 */
export function gen(domain: string, resource: string, random?: boolean): string {
  return random ? uuid.random() : uuid.deterministic(domain, resource)
}

/**
 * Whether a string has RFC 9562 UUID shape.
 * @wing receipts
 * @kind function
 */
export function verify(id: string): boolean {
  return uuid.has(id) && uuid.isVerified(id)
}

/**
 * Whether a UUID is registered in a domain.
 * @wing receipts
 * @kind function
 */
export function inDomain(id: string, domain: string): boolean {
  return uuid.isInDomain(id, domain)
}

/**
 * Whether a UUID is registered with a type.
 * @wing receipts
 * @kind function
 */
export function ofType(id: string, type: ResourceType): boolean {
  return uuid.isType(id, type)
}

/**
 * Every UUID registered in a domain.
 * @wing receipts
 * @kind function
 */
export function allInDomain(domain: string): string[] {
  return uuid.byDomain(domain)
}

/**
 * Every UUID registered with a type.
 * @wing receipts
 * @kind function
 */
export function allOfType(type: ResourceType): string[] {
  return uuid.byType(type)
}

/**
 * Registry counts: total, domains, per type, verified.
 * @wing receipts
 * @kind function
 */
export function summary() {
  return uuid.stats()
}

export default UUID
