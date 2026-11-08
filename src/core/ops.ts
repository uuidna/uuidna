/**
 * Operations Registry - Minimal, DRY
 * All operation handlers unified, no duplication
 */

type Result = { success: boolean; result?: any; error?: string }

interface Op {
  domain: string
  name: string
  handler: () => Promise<any>
}

// ============================================================================
// DRY HELPERS
// ============================================================================

function ok(result: any): Result {
  return { success: true, result }
}

function fail(error: string): Result {
  return { success: false, error }
}

function op(domain: string, name: string, handler: () => Promise<any>): Op {
  return { domain, name, handler }
}

async function exec(op: Op): Promise<Result> {
  try {
    const result = await op.handler()
    return ok(result)
  } catch (e) {
    return fail((e as Error).message)
  }
}

// ============================================================================
// OPERATIONS: Boolean-driven, minimal
// ============================================================================

const ops = {
  // Clay names (naming scheme — no solved flag; seal evidence is clay.* hex/value/holds/next)
  'clay.p-vs-np': op('clay', 'P vs NP', async () => ({ problem: 'P vs NP' })),
  'clay.riemann': op('clay', 'Riemann', async () => ({ problem: 'Riemann Hypothesis' })),
  'clay.navier': op('clay', 'Navier-Stokes', async () => ({ problem: 'Navier-Stokes' })),
  'clay.yang-mills': op('clay', 'Yang-Mills', async () => ({ problem: 'Yang-Mills' })),
  'clay.hodge': op('clay', 'Hodge', async () => ({ problem: 'Hodge Conjecture' })),
  'clay.xyz': op('clay', 'XYZ', async () => ({ problem: 'XYZ Problem' })),
  'clay.abc': op('clay', 'ABC', async () => ({ problem: 'ABC Conjecture' })),

  // Health (4)
  'health.equity': op('health', 'Equity', async () => ({ domain: 'health', metric: 'equity', value: 0.95 })),
  'health.access': op('health', 'Access', async () => ({ domain: 'health', metric: 'access', value: 0.88 })),
  'health.quality': op('health', 'Quality', async () => ({ domain: 'health', metric: 'quality', value: 0.92 })),
  'health.cost': op('health', 'Cost', async () => ({ domain: 'health', metric: 'cost', value: 0.76 })),

  // Climate (5)
  'climate.temp': op('climate', 'Temp', async () => ({ domain: 'climate', metric: 'temp', value: 1.5 })),
  'climate.carbon': op('climate', 'Carbon', async () => ({ domain: 'climate', metric: 'carbon', value: 410 })),
  'climate.methane': op('climate', 'Methane', async () => ({ domain: 'climate', metric: 'methane', value: 1800 })),
  'climate.ice': op('climate', 'Ice', async () => ({ domain: 'climate', metric: 'ice', value: 3.8 })),
  'climate.sea': op('climate', 'Sea', async () => ({ domain: 'climate', metric: 'sea', value: 8.4 })),

  // Water (4)
  'water.access': op('water', 'Access', async () => ({ domain: 'water', metric: 'access', value: 0.71 })),
  'water.safety': op('water', 'Safety', async () => ({ domain: 'water', metric: 'safety', value: 0.65 })),
  'water.quality': op('water', 'Quality', async () => ({ domain: 'water', metric: 'quality', value: 0.58 })),
  'water.stress': op('water', 'Stress', async () => ({ domain: 'water', metric: 'stress', value: 0.45 })),

  // Food (3)
  'food.nutrition': op('food', 'Nutrition', async () => ({ domain: 'food', metric: 'nutrition', value: 0.82 })),
  'food.security': op('food', 'Security', async () => ({ domain: 'food', metric: 'security', value: 0.78 })),
  'food.waste': op('food', 'Waste', async () => ({ domain: 'food', metric: 'waste', value: 0.33 })),

  // Energy (3)
  'energy.renewable': op('energy', 'Renewable', async () => ({ domain: 'energy', metric: 'renewable', value: 0.29 })),
  'energy.access': op('energy', 'Access', async () => ({ domain: 'energy', metric: 'access', value: 0.84 })),
  'energy.cost': op('energy', 'Cost', async () => ({ domain: 'energy', metric: 'cost', value: 0.12 })),

  // Governance (2)
  'gov.corruption': op('gov', 'Corruption', async () => ({ domain: 'gov', metric: 'corruption', value: 0.62 })),
  'gov.participation': op('gov', 'Participation', async () => ({ domain: 'gov', metric: 'participation', value: 0.55 })),
}

// ============================================================================
// REGISTRY
// ============================================================================

class Registry {
  get(id: string): Op | undefined {
    return (ops as Record<string, Op>)[id]
  }

  has(id: string): boolean {
    return id in ops
  }

  async run(id: string): Promise<Result> {
    const operation = this.get(id)
    if (!operation) return fail(`Operation not found: ${id}`)
    return exec(operation)
  }

  list(): Array<{ id: string; domain: string; name: string }> {
    return Object.entries(ops).map(([id, o]) => ({
      id,
      domain: o.domain,
      name: o.name
    }))
  }

  byDomain(domain: string): Array<{ id: string; name: string }> {
    return Object.entries(ops)
      .filter(([_, o]) => o.domain === domain)
      .map(([id, o]) => ({ id, name: o.name }))
  }

  stats() {
    const list = this.list()
    const domains = new Set(list.map(o => o.domain))
    return {
      total: list.length,
      domains: domains.size,
      byDomain: Object.fromEntries(
        Array.from(domains).map(d => [d, this.byDomain(d).length])
      )
    }
  }
}

export const registry = new Registry()

// Export helpers
export { ok, fail, op, exec }
export type { Op, Result }
