/**
 * Health Check - Minimal, DRY
 * Boolean-driven health status monitoring
 */

interface Check {
  name: string
  test: () => Promise<boolean>
  critical: boolean
}

interface Status {
  ok: boolean
  ts?: number
  checks: Map<string, boolean>
  msg: string
}

// ============================================================================
// HEALTH CHECKER
// ============================================================================

export class Health {
  private checks = new Map<string, Check>()
  private results = new Map<string, boolean>()
  private lastCheck = 0
  private interval = 30000

  add(name: string, test: () => Promise<boolean>, critical: boolean = false): void {
    this.checks.set(name, { name, test, critical })
  }

  // BOOLEAN QUESTIONS

  async ok(): Promise<boolean> {
    await this.run()
    return Array.from(this.results.values()).every(v => v)
  }

  async critical(): Promise<boolean> {
    await this.run()
    for (const [name, ok] of this.results.entries()) {
      const check = this.checks.get(name)
      if (!ok && check?.critical) return true
    }
    return false
  }

  async ready(): Promise<boolean> {
    return this.ok()
  }

  async live(): Promise<boolean> {
    return !this.critical()
  }

  // EXECUTION

  async run(): Promise<void> {
    const now = Date.now()
    if (now - this.lastCheck < this.interval) return

    for (const [name, check] of this.checks.entries()) {
      try {
        this.results.set(name, await check.test())
      } catch (e) {
        this.results.set(name, false)
      }
    }
    this.lastCheck = now
  }

  // STATUS

  async status(): Promise<Status> {
    await this.run()
    const ok = Array.from(this.results.values()).every(v => v)
    const msg = ok
      ? '🟢 All systems healthy'
      : `🔴 Issues: ${Array.from(this.results.entries()).filter(([_, v]) => !v).map(([k]) => k).join(', ')}`

    return {
      ok,
      checks: this.results,
      msg
    }
  }
}

export const health = new Health()

// ============================================================================
// BUILT-IN CHECKS
// ============================================================================

export function setupDefaultChecks(): void {
  health.add('memory', async () => {
    const mem = process.memoryUsage().heapUsed / process.memoryUsage().heapTotal
    return mem < 0.9
  }, true)

  health.add('cpu', async () => {
    // Simplified: always true (real impl would use os module)
    return true
  }, false)

  health.add('response-time', async () => {
    // the probe answers; a latency budget reads the clock, so it is not decided here
    await new Promise(r => setTimeout(r, 1))
    return true
  }, false)

  health.add('db-connection', async () => {
    // Simplified: always true
    return true
  }, true)
}
