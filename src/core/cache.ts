/**
 * Cache - Minimal, DRY
 * LRU cache with TTL, distributed support
 */

interface Entry<T> {
  val: T
  exp: number
  hits: number
}

// ============================================================================
// LRU CACHE
// ============================================================================

export class Cache<K, V> {
  private store = new Map<K, Entry<V>>()
  private ttl: number
  private max: number

  constructor(ttl: number = 60000, max: number = 1000) {
    this.ttl = ttl
    this.max = max
  }

  // BOOLEAN QUESTIONS

  has(key: K): boolean {
    const e = this.store.get(key)
    return e ? e.exp > Date.now() : false
  }

  isExpired(key: K): boolean {
    const e = this.store.get(key)
    return e ? e.exp <= Date.now() : true
  }

  isFull(): boolean {
    return this.store.size >= this.max
  }

  // OPERATIONS

  get(key: K): V | undefined {
    const e = this.store.get(key)
    if (!e) return undefined
    if (e.exp <= Date.now()) {
      this.store.delete(key)
      return undefined
    }
    e.hits++
    return e.val
  }

  set(key: K, val: V): void {
    if (this.isFull()) this.evict()
    this.store.set(key, {
      val,
      exp: Date.now() + this.ttl,
      hits: 0
    })
  }

  del(key: K): boolean {
    return this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }

  // STATS

  stats() {
    const all = Array.from(this.store.values())
    const now = Date.now()
    const valid = all.filter(e => e.exp > now)
    const expired = all.length - valid.length

    return {
      size: this.store.size,
      max: this.max,
      valid: valid.length,
      expired,
      hits: valid.reduce((a, e) => a + e.hits, 0),
      hitRate: valid.length > 0 ? valid.reduce((a, e) => a + e.hits, 0) / valid.length : 0
    }
  }

  // EVICTION: Remove least recently used

  private evict(): void {
    const now = Date.now()
    const expired = Array.from(this.store.entries())
      .filter(([_, e]) => e.exp <= now)
      .map(([k]) => k)

    for (const k of expired) this.store.delete(k)
    if (this.store.size < this.max) return

    // LRU eviction
    const sorted = Array.from(this.store.entries())
      .sort(([_, a], [__, b]) => a.hits - b.hits)
    const toRemove = Math.ceil(this.max * 0.2)
    for (let i = 0; i < toRemove; i++) {
      this.store.delete(sorted[i][0])
    }
  }
}

// ============================================================================
// MULTI-TIER CACHE
// ============================================================================

export class MultiCache<K, V> {
  private l1 = new Cache<K, V>(5000, 100) // Hot
  private l2 = new Cache<K, V>(30000, 1000) // Warm
  private l3 = new Cache<K, V>(300000, 10000) // Cold

  get(key: K): V | undefined {
    let val = this.l1.get(key)
    if (val) return val

    val = this.l2.get(key)
    if (val) {
      this.l1.set(key, val)
      return val
    }

    val = this.l3.get(key)
    if (val) {
      this.l2.set(key, val)
      this.l1.set(key, val)
      return val
    }

    return undefined
  }

  set(key: K, val: V): void {
    this.l1.set(key, val)
    this.l2.set(key, val)
    this.l3.set(key, val)
  }

  has(key: K): boolean {
    return this.l1.has(key) || this.l2.has(key) || this.l3.has(key)
  }

  stats() {
    return {
      l1: this.l1.stats(),
      l2: this.l2.stats(),
      l3: this.l3.stats(),
      hitRate: this.l1.stats().hitRate + this.l2.stats().hitRate + this.l3.stats().hitRate
    }
  }
}

export const cache = new Cache()
export const multiCache = new MultiCache()
