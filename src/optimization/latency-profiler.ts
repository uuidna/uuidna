/**
 * Latency Profiler
 * Continuous profiling + auto-tuning
 * Identifies bottlenecks and suggests optimizations
 */

export interface ExecutionSample {
  formulaId: string
  startTime: number
  duration: number // ms
  inputSize: number
  outputSize: number
  gcPauses: number
}

export interface LatencyBucket {
  min: number
  max: number
  count: number
  samples: number[]
}

export interface HotspotAnalysis {
  formulaId: string
  callCount: number
  totalTimeMs: number
  avgLatencyMs: number
  p50LatencyMs: number
  p99LatencyMs: number
  p99_9LatencyMs: number
  maxLatencyMs: number
  minLatencyMs: number
  stdDev: number
  isBottleneck: boolean
  suggestions: string[]
}

export interface ProfileSnapshot {
  timestamp?: number
  sampleCount: number
  totalTimeMs: number
  avgLatencyMs: number
  p50LatencyMs: number
  p99LatencyMs: number
  hotspots: HotspotAnalysis[]
  gcPauses: number
  memoryUsageMB: number
}

/**
 * Latency Profiler: Continuous measurement and analysis
 */
export class LatencyProfiler {
  private samples: ExecutionSample[] = []
  private formulaStats = new Map<string, { count: number; totalTime: number }>()
  private buckets = new Map<string, LatencyBucket[]>()
  private isEnabled = true
  private windowSizeMs = 60000 // 60 second rolling window

  /**
   * Record an execution sample
   */
  recordSample(sample: ExecutionSample): void {
    if (!this.isEnabled) return

    this.samples.push(sample)

    // Update formula stats
    const stats = this.formulaStats.get(sample.formulaId) || { count: 0, totalTime: 0 }
    stats.count++
    stats.totalTime += sample.duration
    this.formulaStats.set(sample.formulaId, stats)

    // Bucket for distribution analysis
    if (!this.buckets.has(sample.formulaId)) {
      this.buckets.set(sample.formulaId, [])
    }
    this.buckets.get(sample.formulaId)!.push({
      min: sample.duration,
      max: sample.duration,
      count: 1,
      samples: [sample.duration]
    })
  }

  /**
   * Analyze latency for a specific formula
   */
  analyzeFormula(formulaId: string): HotspotAnalysis | null {
    const stats = this.formulaStats.get(formulaId)
    if (!stats) return null

    const buckets = this.buckets.get(formulaId) || []
    const allSamples: number[] = []
    buckets.forEach(b => allSamples.push(...b.samples))

    if (allSamples.length === 0) return null

    const sorted = allSamples.sort((a, b) => a - b)
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    const avg = allSamples.reduce((a, b) => a + b, 0) / allSamples.length
    const p50 = sorted[Math.floor(sorted.length * 0.5)]
    const p99 = sorted[Math.floor(sorted.length * 0.99)]
    const p99_9 = sorted[Math.floor(sorted.length * 0.999)]

    // Calculate standard deviation
    const variance = allSamples.reduce((sum, x) => sum + (x - avg) ** 2, 0) / allSamples.length
    const stdDev = Math.sqrt(variance)

    // Determine if this is a bottleneck
    // Bottleneck: high absolute time or high variance
    const isBottleneck = avg > 1.0 || stdDev > avg * 0.5 || p99 > 5.0

    // Generate suggestions
    const suggestions: string[] = []
    if (p99 > 5.0) suggestions.push('Consider JIT compilation (high p99 latency)')
    if (allSamples.length >= 16) suggestions.push('Batch size sufficient for SIMD vectorization')
    if (stdDev > avg * 0.5) suggestions.push('High variance detected - check for cache misses')
    if (max > avg * 10) suggestions.push('Outliers present - profile memory allocation patterns')

    return {
      formulaId,
      callCount: stats.count,
      totalTimeMs: stats.totalTime,
      avgLatencyMs: avg,
      p50LatencyMs: p50,
      p99LatencyMs: p99,
      p99_9LatencyMs: p99_9,
      maxLatencyMs: max,
      minLatencyMs: min,
      stdDev,
      isBottleneck,
      suggestions
    }
  }

  /**
   * Get all hotspots (top bottlenecks)
   */
  getHotspots(limit: number = 10): HotspotAnalysis[] {
    const hotspots = Array.from(this.formulaStats.keys())
      .map(id => this.analyzeFormula(id))
      .filter((h): h is HotspotAnalysis => h !== null && h.isBottleneck)
      .sort((a, b) => b.p99LatencyMs - a.p99LatencyMs)
      .slice(0, limit)

    return hotspots
  }

  /**
   * Get a snapshot of current profiling data
   */
  getSnapshot(): ProfileSnapshot {
    const hotspots = this.getHotspots(5)
    const allSamples = this.samples.map(s => s.duration)
    const sorted = allSamples.sort((a, b) => a - b)

    const avgLatency =
      allSamples.length > 0 ? allSamples.reduce((a, b) => a + b, 0) / allSamples.length : 0

    const p50 = sorted.length > 0 ? sorted[Math.floor(sorted.length * 0.5)] : 0
    const p99 = sorted.length > 0 ? sorted[Math.floor(sorted.length * 0.99)] : 0

    // Memory estimate (rough)
    const memoryMB =
      (this.samples.length * 64 + Array.from(this.formulaStats.values()).length * 32) / 1024 / 1024

    return {
      sampleCount: this.samples.length,
      totalTimeMs: allSamples.reduce((a, b) => a + b, 0),
      avgLatencyMs: avgLatency,
      p50LatencyMs: p50,
      p99LatencyMs: p99,
      hotspots,
      gcPauses: 0, // Would need GC instrumentation to measure
      memoryUsageMB: memoryMB
    }
  }

  /**
   * Auto-tune based on profiling results
   * Returns suggested actions
   */
  autoTune(): {
    enableJIT: string[]
    enableSIMD: string[]
    enableParallel: string[]
  } {
    const suggestions = {
      enableJIT: [] as string[],
      enableSIMD: [] as string[],
      enableParallel: [] as string[]
    }

    for (const [formulaId, stats] of this.formulaStats) {
      // JIT: Enable for formulas called >100x with p99 > 1ms
      if (stats.count > 100) {
        const analysis = this.analyzeFormula(formulaId)
        if (analysis && analysis.p99LatencyMs > 1.0) {
          suggestions.enableJIT.push(formulaId)
        }
      }

      // SIMD: Enable for formulas with batch size >= 16
      if (stats.count >= 16) {
        suggestions.enableSIMD.push(formulaId)
      }

      // Parallel: Enable for formulas with >100 calls
      if (stats.count > 100) {
        suggestions.enableParallel.push(formulaId)
      }
    }

    return suggestions
  }

  /**
   * Clear old samples (rolling window), measured back from `now`: the caller's clock, so the window is reproducible
   */
  pruneOldSamples(now: number, windowMs: number = this.windowSizeMs): void {
    const cutoff = now - windowMs
    this.samples = this.samples.filter(s => s.startTime > cutoff)
  }

  /**
   * Enable/disable profiling
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
  }

  /**
   * Clear all profiling data
   */
  reset(): void {
    this.samples = []
    this.formulaStats.clear()
    this.buckets.clear()
  }

  /**
   * Export profiling data as JSON
   */
  export(): string {
    return JSON.stringify(
      {
        samples: this.samples.length,
        snapshot: this.getSnapshot()
      },
      null,
      2
    )
  }
}

// Singleton instance
export const latencyProfiler = new LatencyProfiler()
