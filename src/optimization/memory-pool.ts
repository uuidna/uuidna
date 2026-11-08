/**
 * Object Memory Pool
 * Pre-allocated pools to avoid GC pauses
 * Target: <1ms GC pause, zero allocations in hot paths
 */

export interface PoolStats {
  poolName: string
  totalAllocated: number
  inUse: number
  available: number
  /** operations on the pool so far: a count, not a rate (no clock is read) */
  operations: number
}

export interface PoolableObject {
  reset(): void
}

/**
 * Generic object pool for reusable objects
 */
export class ObjectPool<T extends PoolableObject> {
  private available: T[] = []
  private inUse: Set<T> = new Set()
  private factory: () => T
  private name: string
  private stats = {
    allocations: 0,
    deallocations: 0
  }

  constructor(factory: () => T, initialSize: number, name: string) {
    this.factory = factory
    this.name = name
    // Pre-allocate pool
    for (let i = 0; i < initialSize; i++) {
      this.available.push(factory())
    }
  }

  /**
   * Acquire an object from the pool
   * Returns a fresh or recycled object
   */
  acquire(): T {
    let obj: T
    if (this.available.length > 0) {
      obj = this.available.pop()!
    } else {
      // Allocate new if pool exhausted
      obj = this.factory()
    }
    this.inUse.add(obj)
    this.stats.allocations++

    return obj
  }

  /**
   * Release an object back to the pool
   */
  release(obj: T): void {
    if (this.inUse.has(obj)) {
      this.inUse.delete(obj)
      obj.reset()
      this.available.push(obj)
      this.stats.deallocations++
    }
  }

  /**
   * Get pool statistics
   */
  getStats(): PoolStats {
    return {
      poolName: this.name,
      totalAllocated: this.available.length + this.inUse.size,
      inUse: this.inUse.size,
      available: this.available.length,
      operations: this.stats.allocations + this.stats.deallocations,
    }
  }

  /**
   * Resize pool (pre-allocate or shrink)
   */
  resize(targetSize: number): void {
    const current = this.available.length
    if (targetSize > current) {
      for (let i = 0; i < targetSize - current; i++) {
        this.available.push(this.factory())
      }
    } else if (targetSize < current) {
      this.available.splice(targetSize)
    }
  }
}

/**
 * Float64Array pool for numerical computations
 */
export class Float64Pool implements PoolableObject {
  data: Float64Array
  length: number

  constructor(length: number) {
    this.length = length
    this.data = new Float64Array(length)
  }

  reset(): void {
    for (let i = 0; i < this.length; i++) {
      this.data[i] = 0
    }
  }
}

/**
 * Number Array pool
 */
export class NumberArrayPool implements PoolableObject {
  data: number[]
  length: number

  constructor(length: number) {
    this.length = length
    this.data = new Array(length)
  }

  reset(): void {
    for (let i = 0; i < this.length; i++) {
      this.data[i] = 0
    }
  }
}

/**
 * Pooled object for formula execution results
 */
export class FormulaResultPool implements PoolableObject {
  formulaId: string = ''
  inputs: number[] = []
  outputs: number[] = []
  duration: number = 0
  timestamp: number = 0

  reset(): void {
    this.formulaId = ''
    this.inputs = []
    this.outputs = []
    this.duration = 0
    this.timestamp = 0
  }
}

/**
 * Memory Pool Manager: Centralized pool coordination
 */
export class MemoryPoolManager {
  private pools = new Map<string, ObjectPool<any>>()

  /**
   * Create and register a new pool
   */
  createPool<T extends PoolableObject>(
    name: string,
    factory: () => T,
    initialSize: number
  ): ObjectPool<T> {
    if (this.pools.has(name)) {
      return this.pools.get(name)!
    }

    const pool = new ObjectPool(factory, initialSize, name)
    this.pools.set(name, pool)
    return pool
  }

  /**
   * Get existing pool by name
   */
  getPool<T extends PoolableObject>(name: string): ObjectPool<T> | null {
    return this.pools.get(name) || null
  }

  /**
   * Monitor all pools for memory pressure
   */
  getMemoryStats(): PoolStats[] {
    return Array.from(this.pools.values()).map(p => p.getStats())
  }

  /**
   * Adaptive pool sizing: grow pools under load, shrink when idle
   */
  adaptPoolSizes(): void {
    for (const pool of this.pools.values()) {
      const stats = pool.getStats()
      if (stats.inUse > stats.available * 0.8) {
        // Grow if heavily used
        pool.resize(Math.ceil(stats.totalAllocated * 1.5))
      } else if (stats.inUse < stats.totalAllocated * 0.1) {
        // Shrink if mostly idle
        pool.resize(Math.ceil(stats.totalAllocated * 0.5))
      }
    }
  }

  /**
   * Total memory footprint of all pools (estimated)
   */
  getTotalMemory(): number {
    let total = 0
    for (const pool of this.pools.values()) {
      const stats = pool.getStats()
      // Estimate: 16 bytes per object + array overhead
      total += stats.totalAllocated * 24
    }
    return total
  }

  /**
   * Clear all pools
   */
  clearAllPools(): void {
    this.pools.clear()
  }
}

// Singleton pools for common operations
export const memoryPoolManager = new MemoryPoolManager()

// Pre-create standard pools
export const float64Pool = memoryPoolManager.createPool(
  'float64',
  () => new Float64Pool(1024),
  16
)

export const numberArrayPool = memoryPoolManager.createPool(
  'numberArray',
  () => new NumberArrayPool(256),
  16
)

export const formulaResultPool = memoryPoolManager.createPool(
  'formulaResult',
  () => new FormulaResultPool(),
  32
)
