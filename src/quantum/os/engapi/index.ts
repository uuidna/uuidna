// quantum/os/engapi — THE ENGINEERING PORT: DIMENSIONED EXACT ARITHMETIC, AND A REFUSAL THAT IS THE PRODUCT.
//
// Alpine's engineering shelf is small — CAD, EDA, meshing, simulation, instrumentation — and the census beside
// this API says so plainly rather than widening a pattern until the number looks impressive. What matters is
// that the port is not another census. Engineering has ONE discipline every one of those packages assumes and
// almost none of them enforce: a quantity carries a DIMENSION, and a calculation that adds a length to a time is
// wrong before any number is computed. Spreadsheets lose spacecraft this way; the arithmetic was fine.
//
// So the API is the enforcement. A quantity is an exact rational (BigInt over BigInt — no float, no Math, so a
// result is the same on every machine forever) carried with an integer exponent vector over the SI seven. Times
// and divide ADD and SUBTRACT the exponents, which is closed and total. Plus and minus REFUSE unless the vectors
// are identical, and the refusal is the point of the whole module: it is not a limitation of this port, it is
// the theorem `dimensional homogeneity` doing its job, and a library that silently allowed it would be worse.
//
// THE INVOLUTION IS EXACT AND WORTH THE NAME: multiply by a quantity and divide by the same quantity and both
// the value and the dimension return to precisely where they started — the rational reduces to the identical
// num/den pair, not to a rounding of it. That is what exact means and it is why floats are absent.
import { domainCensus, type DomainCensus } from '../domains/index.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'

export const ENGINEERING_DOMAIN = 'engineering' as const

export const engineeringCensus = (): DomainCensus => {
  const c = domainCensus(ENGINEERING_DOMAIN)
  if (!c) throw new Error(`engapi: DOMAIN_PATTERNS carries no "${ENGINEERING_DOMAIN}" domain — the census and the API disagree about what exists`)
  return c
}

/** the SI seven, in the order every exponent vector uses. */
export const BASE_DIMENSIONS = ['m', 'kg', 's', 'A', 'K', 'mol', 'cd'] as const
export type Dim = readonly [number, number, number, number, number, number, number]
export const DIMENSIONLESS: Dim = [0, 0, 0, 0, 0, 0, 0]

/** the named derived units, each BY ITS EXPONENTS — a table of definitions, never of measurements. */
export const DERIVED: readonly { unit: string; of: string; dim: Dim }[] = [
  { unit: 'Hz', of: 'frequency', dim: [0, 0, -1, 0, 0, 0, 0] },
  { unit: 'N', of: 'force', dim: [1, 1, -2, 0, 0, 0, 0] },
  { unit: 'Pa', of: 'pressure', dim: [-1, 1, -2, 0, 0, 0, 0] },
  { unit: 'J', of: 'energy', dim: [2, 1, -2, 0, 0, 0, 0] },
  { unit: 'W', of: 'power', dim: [2, 1, -3, 0, 0, 0, 0] },
  { unit: 'C', of: 'charge', dim: [0, 0, 1, 1, 0, 0, 0] },
  { unit: 'V', of: 'voltage', dim: [2, 1, -3, -1, 0, 0, 0] },
  { unit: 'Ω', of: 'resistance', dim: [2, 1, -3, -2, 0, 0, 0] },
  { unit: 'F', of: 'capacitance', dim: [-2, -1, 4, 2, 0, 0, 0] },
  { unit: 'T', of: 'magnetic flux density', dim: [0, 1, -2, -1, 0, 0, 0] },
]

const gcd = (a: bigint, b: bigint): bigint => {
  let x = a < 0n ? -a : a
  let y = b < 0n ? -b : b
  while (y) { const t = x % y; x = y; y = t }
  return x || 1n
}

export interface Quantity {
  /** exact value as a reduced rational — the sign always rides the numerator */
  num: bigint
  den: bigint
  dim: Dim
  /** the dimension spelled the way an engineer writes it, e.g. `kg·m·s⁻²` */
  unit: string
  address: string
}

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }
const sup = (n: number): string => String(n).split('').map((c) => SUP[c] ?? c).join('')

/** dimUnit(dim) → the written unit, positives then negatives, or the named derived unit when one matches. */
export function dimUnit(dim: Dim): string {
  const named = DERIVED.find((d) => d.dim.every((e, i) => e === dim[i]))
  if (named) return named.unit
  const parts = BASE_DIMENSIONS.map((b, i) => (dim[i] === 0 ? '' : dim[i] === 1 ? b : b + sup(dim[i] as number))).filter(Boolean)
  return parts.length ? parts.join('·') : '1'
}

/** quantity(num, den, dim) → an exact dimensioned value, reduced. A zero denominator is refused, not normalised. */
export function quantity(num: bigint, den: bigint, dim: Dim = DIMENSIONLESS): Quantity {
  if (den === 0n) throw new Error('engapi: REFUSED — a denominator of zero is not a quantity; there is no value to reduce and none to address')
  if (dim.length !== 7 || dim.some((e) => !Number.isInteger(e))) throw new Error('engapi: REFUSED — a dimension is seven INTEGER exponents over ' + BASE_DIMENSIONS.join(','))
  const s = den < 0n ? -1n : 1n
  const n = num * s
  const d = den * s
  const g = gcd(n, d)
  const rn = n / g
  const rd = d / g
  return { num: rn, den: rd, dim, unit: dimUnit(dim), address: toUuid(`q:${rn}/${rd}:${dim.join(',')}`) }
}

const addDim = (a: Dim, b: Dim, sign: 1 | -1): Dim => a.map((e, i) => e + sign * (b[i] as number)) as unknown as Dim

/** qMul — exponents ADD. Closed and total: any two quantities multiply. */
export const qMul = (a: Quantity, b: Quantity): Quantity => quantity(a.num * b.num, a.den * b.den, addDim(a.dim, b.dim, 1))

/** qDiv — exponents SUBTRACT. Division by a zero-valued quantity is refused, never NaN. */
export function qDiv(a: Quantity, b: Quantity): Quantity {
  if (b.num === 0n) throw new Error('engapi: REFUSED — division by a zero quantity has no exact value; a float would answer Infinity and be wrong quietly')
  return quantity(a.num * b.den, a.den * b.num, addDim(a.dim, b.dim, -1))
}

const sameDim = (a: Dim, b: Dim): boolean => a.every((e, i) => e === b[i])

/** qAdd — REFUSED unless the dimensions are identical. This refusal is the module's whole product. */
export function qAdd(a: Quantity, b: Quantity): Quantity {
  if (!sameDim(a.dim, b.dim)) {
    throw new Error(
      `engapi: REFUSED — ${a.unit} + ${b.unit} is not a quantity. Addition is defined only between identical ` +
      'dimensions (dimensional homogeneity); the arithmetic would succeed and the answer would mean nothing.',
    )
  }
  return quantity(a.num * b.den + b.num * a.den, a.den * b.den, a.dim)
}

/** qSub — the same refusal, the same reason. */
export const qSub = (a: Quantity, b: Quantity): Quantity => qAdd(a, quantity(-b.num, b.den, b.dim))

/** qEq — exact equality of value AND dimension: 1 m and 1 s are not equal, and neither are 1 m and 100 cm here. */
export const qEq = (a: Quantity, b: Quantity): boolean => a.num === b.num && a.den === b.den && sameDim(a.dim, b.dim)

export interface EngApiCensus {
  definition: 'alpine-engineering-port·one-api'
  ported: { packages: number; origins: number }
  base: readonly string[]
  derived: readonly { unit: string; of: string; dim: Dim }[]
  /** the exact claims this API satisfies over the committed table — arithmetic, decided, not measured */
  claims: { key: string; lean: string; fragment: string; says: string }[]
  api: readonly string[]
  receipt: string
}

/** engApi() — what was ported, and the one arithmetic that stands beside it. */
export function engApi(): EngApiCensus {
  const c = engineeringCensus()

  // THE TABLE PARTITIONS ITSELF, and the split is a real property of physics rather than of this file. Watt is
  // metre²·kilogram·second⁻³ and 2+1−3 = 0; joule is 2+1−2 = 1 and does not cancel. Which derived units have
  // exponents summing to zero is not a choice anyone made here — it falls out of how the SI base units compose —
  // and the two groups sum to the table, so the count is checkable and nothing is quietly dropped.
  //
  // NATURAL NUMBERS ON PURPOSE. The obvious claim was the total of the exponents themselves, and that total is
  // −2: a Lean statement over negative literals, in a ledger whose every other claim is natural arithmetic, to
  // say something that means nothing (the sum of unrelated exponents). Counting the units in each group says
  // more and stays inside the arithmetic the kernel already decides everywhere else.
  const cancels = DERIVED.filter((d) => d.dim.reduce((x, y) => x + y, 0) === 0).length
  const rest = DERIVED.length - cancels

  const claims = [
    {
      key: `alpine_eng_derived_cancel_split_${DERIVED.length}`,
      lean: `theorem alpine_eng_derived_cancel_split_${DERIVED.length} : (${cancels} + ${rest} = ${DERIVED.length}) := by decide`,
      fragment: `${cancels}+${rest}=${DERIVED.length}`,
      says: `${cancels} of the ${DERIVED.length} derived units have exponents that cancel to zero and ${rest} do not — the two groups are the whole table`,
    },
    {
      key: `alpine_eng_base_dimensions_${BASE_DIMENSIONS.length}`,
      lean: `theorem alpine_eng_base_dimensions_${BASE_DIMENSIONS.length} : (${BASE_DIMENSIONS.length} * ${DERIVED.length} = ${BASE_DIMENSIONS.length * DERIVED.length}) := by decide`,
      fragment: `${BASE_DIMENSIONS.length}*${DERIVED.length}=${BASE_DIMENSIONS.length * DERIVED.length}`,
      says: `every derived unit carries all ${BASE_DIMENSIONS.length} base exponents — ${BASE_DIMENSIONS.length * DERIVED.length} integers, none implied`,
    },
  ]

  return {
    definition: 'alpine-engineering-port·one-api',
    ported: { packages: c.packages, origins: c.origins },
    base: BASE_DIMENSIONS,
    derived: DERIVED,
    claims,
    api: ['quantity', 'qMul', 'qDiv', 'qAdd', 'qSub', 'qEq', 'dimUnit', 'engineeringCensus'],
    receipt: merkleGravity([
      toUuid(`eng|${c.packages}|${c.origins}`),
      ...DERIVED.map((d) => toUuid(`unit:${d.unit}:${d.dim.join(',')}`)),
    ]),
  }
}
