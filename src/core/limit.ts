/**
 * Rate Limiter - Minimal, DRY
 * Token bucket, sliding window, adaptive
 */

interface Quota {
  id: string
  tokens: number
  refill: number
  window: number
}

// ============================================================================
// RATE LIMITER
// ============================================================================

export class Limit {
  private quotas = new Map<string, Quota>()
  private default = { tokens: 100, refill: 10, window: 1000 }

  // BOOLEAN QUESTIONS

  allow(id: string): boolean {
    const q = this.getOrCreate(id)
    const now = Date.now()

    // Refill if window passed
    const elapsed = now - (this.quotas.get(id)?.window || now)
    if (elapsed > this.default.window) {
      q.tokens = this.default.refill
      q.window = now
    }

    if (q.tokens > 0) {
      q.tokens--
      return true
    }

    return false
  }

  isOverLimit(id: string): boolean {
    return !this.allow(id)
  }

  canBurst(id: string, n: number): boolean {
    const q = this.getOrCreate(id)
    return q.tokens >= n
  }

  // OPERATIONS

  consume(id: string, n: number = 1): boolean {
    if (!this.canBurst(id, n)) return false
    const q = this.getOrCreate(id)
    q.tokens -= n
    return true
  }

  reset(id: string): void {
    const q = this.getOrCreate(id)
    q.tokens = this.default.refill
  }

  setQuota(id: string, tokens: number, refill: number, window: number): void {
    this.quotas.set(id, { id, tokens, refill, window })
  }

  // STATUS

  quota(id: string): Quota {
    return this.getOrCreate(id)
  }

  stats(): Record<string, { tokens: number; id: string }> {
    const result: Record<string, { tokens: number; id: string }> = {}
    for (const [id, q] of this.quotas.entries()) {
      result[id] = { tokens: q.tokens, id }
    }
    return result
  }

  private getOrCreate(id: string): Quota {
    if (!this.quotas.has(id)) {
      this.quotas.set(id, {
        id,
        tokens: this.default.tokens,
        refill: this.default.refill,
        window: this.default.window
      })
    }
    return this.quotas.get(id)!
  }
}

// ============================================================================
// SLIDING WINDOW (Alternative)
// ============================================================================

export class SlidingWindow {
  private buckets = new Map<string, number[]>()
  private limit: number
  private window: number

  constructor(limit: number = 100, window: number = 60000) {
    this.limit = limit
    this.window = window
  }

  allow(id: string): boolean {
    const now = Date.now()
    let bucket = this.buckets.get(id) || []

    // Remove old entries
    bucket = bucket.filter(t => now - t < this.window)

    if (bucket.length < this.limit) {
      bucket.push(now)
      this.buckets.set(id, bucket)
      return true
    }

    return false
  }

  remaining(id: string): number {
    const bucket = this.buckets.get(id) || []
    return Math.max(0, this.limit - bucket.length)
  }

  reset(id: string): void {
    this.buckets.delete(id)
  }
}

export const limit = new Limit()
export const sliding = new SlidingWindow()
