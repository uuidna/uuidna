// si — THE SEVEN SI BASE QUANTITIES, and a reading of whether an equation's two sides are the same KIND of
// thing. NOT src/dimensions.ts, which owns that word for the seven locale rays; this file is about metrology
// and the collision is why it is named for the system rather than for the word.
//
// WHY THIS EXISTS. A plate of equations is the easiest thing in the world to publish and the hardest to check,
// because it LOOKS checked. Dimensional analysis is the cheapest instrument that can disagree with one: it needs
// no numbers, no experiment and no solver, and it says a mass is not a volume no matter what either equals.
//
// THE SEVEN ARE COLLECTED, NOT CHOSEN. BIPM, The International System of Units, 9th edition (2019), which fixes
// exactly seven base quantities and their units. Nothing here adds an eighth for convenience.
//
// THREE VERDICTS, AND THE THIRD IS THE POINT. `consistent`, `inconsistent`, and `illegible` — a symbol this
// table does not know is REFUSED, never read as dimensionless. A checker that silently treats what it cannot
// read as "1" manufactures agreement, and would report a plate of glyph soup as sound arithmetic. The refusals
// are reported as a count, so a reader sees how much of a plate the instrument actually reached.
//
// A DEFINITION IS NOT A DISAGREEMENT. Where the left side is a single symbol this table does not carry, the
// equation DEFINES that symbol, and only the right side's internal consistency is at issue. Without this rule
// every definition on earth reads as a failure, which would make the instrument useless and flattering at once.
//
// NECESSARY, NOT SUFFICIENT — and this file ships the proof. `m = m + m'` is dimensionally perfect and
// algebraically forces m' = 0. `degenerate` is the second instrument, and neither subsumes the other; a plate
// that passes only one has not been checked.

/** The seven, in the order the SI brochure gives them. `Th` is Θ, written ASCII so it can be an object key. */
export const BASE_QUANTITIES = [
  { name: 'time', symbol: 'T', unit: 'second' },
  { name: 'length', symbol: 'L', unit: 'metre' },
  { name: 'mass', symbol: 'M', unit: 'kilogram' },
  { name: 'electric current', symbol: 'I', unit: 'ampere' },
  { name: 'thermodynamic temperature', symbol: 'Th', unit: 'kelvin' },
  { name: 'amount of substance', symbol: 'N', unit: 'mole' },
  { name: 'luminous intensity', symbol: 'J', unit: 'candela' },
] as const

export type Base = (typeof BASE_QUANTITIES)[number]['symbol']

/** A quantity dimension: one integer exponent per base quantity. All zero is dimensionless. */
export type Quantity = Readonly<Record<Base, number>>

const ZERO: Quantity = { T: 0, L: 0, M: 0, I: 0, Th: 0, N: 0, J: 0 }

export const quantity = (over: Partial<Record<Base, number>>): Quantity => ({ ...ZERO, ...over })

export const DIMENSIONLESS = ZERO
export const MASS = quantity({ M: 1 })
export const LENGTH = quantity({ L: 1 })
export const AREA = quantity({ L: 2 })
export const VOLUME = quantity({ L: 3 })
export const TIME = quantity({ T: 1 })
export const TEMPERATURE = quantity({ Th: 1 })
export const AMOUNT = quantity({ N: 1 })
/** amount concentration, mol·m⁻³ — what square brackets mean in a chemical equation. */
export const CONCENTRATION = quantity({ N: 1, L: -3 })

const SYMBOLS_OF_BASE = BASE_QUANTITIES.map((b) => b.symbol)

export const times = (a: Quantity, b: Quantity): Quantity =>
  Object.fromEntries(SYMBOLS_OF_BASE.map((s) => [s, a[s] + b[s]])) as unknown as Quantity

export const per = (a: Quantity, b: Quantity): Quantity =>
  Object.fromEntries(SYMBOLS_OF_BASE.map((s) => [s, a[s] - b[s]])) as unknown as Quantity

export const toThe = (a: Quantity, n: number): Quantity =>
  Object.fromEntries(SYMBOLS_OF_BASE.map((s) => [s, a[s] * n])) as unknown as Quantity

export const same = (a: Quantity, b: Quantity): boolean => SYMBOLS_OF_BASE.every((s) => a[s] === b[s])

const SUPERSCRIPT: Readonly<Record<string, string>> = {
  '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
}

const superscript = (n: number): string =>
  n === 1 ? '' : String(n).replace(/[-0-9]/g, (c) => SUPERSCRIPT[c] ?? c)

/** `M·L⁻³`, or `1` for dimensionless — the form a reader can compare at a glance. */
export const formatQuantity = (q: Quantity): string => {
  const parts = SYMBOLS_OF_BASE.filter((s) => q[s] !== 0).map((s) => `${s}${superscript(q[s])}`)
  return parts.length === 0 ? '1' : parts.join('·')
}

/** An equation's right side, as structure rather than as a string. */
export type Term =
  | { kind: 'symbol'; name: string }
  /** a pure number, including a percentage — dimensionless by construction */
  | { kind: 'number' }
  | { kind: 'sum'; terms: readonly Term[] }
  | { kind: 'product'; terms: readonly Term[] }
  | { kind: 'quotient'; over: Term; by: Term }
  | { kind: 'power'; base: Term; by: number }
  /** ∫ f d(x) — carries dim(f)·dim(x), which is why an undeclared integrand cannot be checked */
  | { kind: 'integral'; of: Term; by: Term }

export type Reading =
  | { verdict: 'consistent'; dimension: Quantity }
  | { verdict: 'inconsistent'; because: string }
  | { verdict: 'illegible'; because: string }

/** Values may be absent: a table that types every string as known makes the `illegible` path unreachable. */
export type SymbolTable = Readonly<Record<string, Quantity | undefined>>

/** The dimension a term carries, or the first reason it has none. */
export function dimensionOf(term: Term, symbols: SymbolTable): Reading {
  switch (term.kind) {
    case 'number':
      return { verdict: 'consistent', dimension: DIMENSIONLESS }

    case 'symbol': {
      const known = symbols[term.name]
      return known === undefined
        ? {
            verdict: 'illegible',
            because: `${term.name} is not in the symbol table, and an unread symbol is refused rather than taken for a pure number`,
          }
        : { verdict: 'consistent', dimension: known }
    }

    case 'sum': {
      let carried: Quantity | undefined
      for (const addend of term.terms) {
        const read = dimensionOf(addend, symbols)
        if (read.verdict !== 'consistent') return read
        if (carried === undefined) carried = read.dimension
        else if (!same(carried, read.dimension)) {
          return {
            verdict: 'inconsistent',
            because: `a sum adds ${formatQuantity(carried)} to ${formatQuantity(read.dimension)}; only like quantities add`,
          }
        }
      }
      return carried === undefined
        ? { verdict: 'illegible', because: 'an empty sum has no dimension to read' }
        : { verdict: 'consistent', dimension: carried }
    }

    case 'product': {
      let carried = DIMENSIONLESS
      for (const factor of term.terms) {
        const read = dimensionOf(factor, symbols)
        if (read.verdict !== 'consistent') return read
        carried = times(carried, read.dimension)
      }
      return { verdict: 'consistent', dimension: carried }
    }

    case 'quotient': {
      const above = dimensionOf(term.over, symbols)
      if (above.verdict !== 'consistent') return above
      const below = dimensionOf(term.by, symbols)
      if (below.verdict !== 'consistent') return below
      return { verdict: 'consistent', dimension: per(above.dimension, below.dimension) }
    }

    case 'power': {
      const base = dimensionOf(term.base, symbols)
      if (base.verdict !== 'consistent') return base
      return { verdict: 'consistent', dimension: toThe(base.dimension, term.by) }
    }

    case 'integral': {
      const of = dimensionOf(term.of, symbols)
      if (of.verdict !== 'consistent') return of
      const by = dimensionOf(term.by, symbols)
      if (by.verdict !== 'consistent') return by
      return { verdict: 'consistent', dimension: times(of.dimension, by.dimension) }
    }
  }
}

export interface Equation {
  /** the left side as the plate writes it */
  left: string
  right: Term
}

/**
 * Read one equation.
 *
 * Where `left` is a symbol the table does not carry, the equation DEFINES it and only the right side is at
 * issue — see the header. Where the table does carry it, both sides must agree.
 */
export function readEquation(equation: Equation, symbols: SymbolTable): Reading {
  const right = dimensionOf(equation.right, symbols)
  if (right.verdict !== 'consistent') return right

  const left = symbols[equation.left]
  if (left === undefined) return right
  if (same(left, right.dimension)) return right

  return {
    verdict: 'inconsistent',
    because: `${equation.left} is ${formatQuantity(left)} and its right side is ${formatQuantity(right.dimension)}`,
  }
}

/**
 * The second instrument: an equation whose left symbol is a direct addend of its own right side.
 *
 * `m = m + m'` forces m' = 0 — every other addend must vanish. This is a DIFFERENT defect from a dimensional
 * one and is invisible to `readEquation`, which passes it cleanly. Stated narrowly, to exactly what follows:
 * only a top-level sum containing the left symbol is claimed, because that is the case where the conclusion is
 * arithmetic rather than a guess about what the author meant.
 */
export function degenerate(equation: Equation): string | undefined {
  if (equation.right.kind !== 'sum') return undefined
  const others = equation.right.terms.filter(
    (t) => !(t.kind === 'symbol' && t.name === equation.left),
  )
  if (others.length === equation.right.terms.length) return undefined
  return `${equation.left} appears on both sides of its own sum, so the remaining ${String(others.length)} addend(s) are forced to zero`
}
