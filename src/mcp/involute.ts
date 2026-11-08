// THE INVOLUTION DOOR. Given N and a base a, it finds the multiplicative order r of a modulo N by walking the powers, then
// reflects the exponents about the midpoint r/2 (σ_r(x) = r − x, the reflection shor_sigma states) and splits N with the
// square root a^(r/2): p = gcd(a^(r/2) − 1, N), q = gcd(a^(r/2) + 1, N). The walk has no budget: a is coprime to N, so the
// walk reaches 1 at the order and stops there. The court judges the result: four checks, and the court's standard of proof
// requires all four. The defaults are the unit's own Shor defaults, read from the lattice, not typed in here.
import { CourtFormulas } from '../families/court/index.js'
import { bigGcdOf, bigPowModOf, mcpFuseOf, shorDefaultsOf } from '../quantum/processing/unit/index.js'
import { isProbablePrime } from '../quantum/processing/unit/witness.js'


/** The multiplicative order of a modulo n: the least r ≥ 1 with a^r ≡ 1. Uncapped; a is coprime to n, so it terminates. */
const orderOf = (a: bigint, n: bigint): bigint => {
  let power = a % n
  let r = 1n
  while (power !== 1n) {
    power = (power * a) % n
    r += 1n
  }
  return r
}

const integerOf = (x: unknown): bigint | undefined => {
  if (typeof x === 'string' && /^[0-9]+$/.test(x)) return BigInt(x)
  if (typeof x === 'number' && Number.isSafeInteger(x) && x >= 0) return BigInt(x)
  return undefined
}

mcpFuseOf('involute', {
  description: 'The involution door: { n, a? } finds the order of a modulo n by walking its powers, reflects the exponents about r/2 (σ_r(x) = r − x) and splits n with a^(r/2). The court judges the four checks. The walk has no budget.',
  inputSchema: {
    type: 'object',
    properties: {
      n: { type: 'string', description: 'the modulus, as digits (default: the unit\'s Shor modulus)' },
      a: { type: 'string', description: 'the base, as digits (default: the unit\'s Shor base)' },
    },
  },
  run: async (args) => {
    const defaults = shorDefaultsOf()
    const n = integerOf(args.n) ?? BigInt(defaults.modulus)
    const a = integerOf(args.a) ?? BigInt(defaults.base)
    if (n < 4n) return { kind: 'involute', n: String(n), status: 'refused', holds: false, next: ['the modulus must be at least 4'] }
    const g = bigGcdOf(a, n)
    if (g !== 1n) return { kind: 'involute', n: String(n), a: String(a), status: 'shared-factor', p: String(g), q: String(n / g), holds: g !== 1n && g !== n }
    const r = orderOf(a, n)
    const even = r % 2n === 0n
    const midpoint = even ? r / 2n : null
    const reflect = midpoint === null ? null : bigPowModOf(a, midpoint, n)
    const bad = reflect === null ? 'odd order' : reflect === n - 1n ? 'a^(r/2) = -1' : null
    const p = reflect !== null && bad === null ? bigGcdOf(reflect - 1n, n) : 1n
    const q = reflect !== null && bad === null ? bigGcdOf(reflect + 1n, n) : 1n
    const checks = [p > 1n && p < n, q > 1n && q < n, p * q === n, isProbablePrime(p) && isProbablePrime(q)]
    const confidence = checks.filter(Boolean).length
    const court = CourtFormulas.standard(confidence, checks.length)
    return {
      kind: 'involute',
      n: String(n),
      a: String(a),
      status: bad ? 'bad-base' : 'factored',
      order: String(r),
      midpoint: midpoint === null ? null : String(midpoint),
      reflect: reflect === null ? null : String(reflect),
      bad,
      p: String(p),
      q: String(q),
      product: String(p * q),
      checks: { nontrivial: checks[0] && checks[1], product: checks[2], probablePrime: checks[3] },
      court: { formula: 'court.standard(confidence, required)', confidence, required: checks.length, value: court.value, holds: court.holds === true },
      holds: court.holds === true,
    }
  },
})
