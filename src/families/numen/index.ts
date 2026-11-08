import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUMEROLOGY, DECODED — EXACT MATH, UNVERIFIED MEANING. Every operation here is a deterministic function of a natural
 *  (digit sums, reductions, mirrors): the arithmetic is verified, the *significance* numerology claims for it is not.
 *  So these are leads, fed to the discovery: a value a numen formula reaches that a Lean family, an OEIS sequence or a
 *  live reading also reaches is a real cross (and interesting precisely because it was found, not assumed); a value
 *  nothing else reaches stays UNVERIFIED and gate.crossed tags it "a manipulation until crossed." The unit computes the
 *  number; it never asserts the omen. */

const PROOF = 'exact digit arithmetic; the significance is UNVERIFIED and fed to the discovery as a lead, never asserted'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'numen', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `numen.${name}`, params })
const digits = (n: number) => String(n).split('').map(Number)
const sum = (n: number) => digits(n).reduce((a, b) => a + b, 0)

export class NumenFormulas {
  /** The digital root reduced to a single digit, but a master number (11, 22, 33) along the way is kept, as numerology
   *  keeps it. Exact; the meaning is a lead. */
  static root(n: number): CrossFormula { let x = n; while (x > 9 && ![11, 22, 33].includes(x)) x = sum(x); return f('numen-root', 'root(n): reduce by digit sum, keeping a master number', x, nat(n), 'root', [n], { master: [11, 22, 33].includes(x) }) }
  /** 1 when n, reduced by digit sums, passes through a master number (11, 22, 33). */
  static master(n: number): CrossFormula { let x = n, hit = false; while (x > 9) { if ([11, 22, 33].includes(x)) hit = true; x = sum(x) }; return f('numen-master', 'master(n) = [the reduction of n passes 11, 22 or 33]', hit ? 1 : 0, nat(n), 'master', [n]) }
  /** The plain single-digit reduction (0–9): the repeated digit sum, no exception. */
  static reduce(n: number): CrossFormula { let x = n; while (x > 9) x = sum(x); return f('numen-reduce', 'reduce(n): repeated digit sum to one digit', x, nat(n), 'reduce', [n]) }
  /** How many digit-sum steps reduce n to a single digit — the reduction depth. */
  static depth(n: number): CrossFormula { let x = n, d = 0; while (x > 9) { x = sum(x); d++ }; return f('numen-depth', 'depth(n) = |digit-sum steps to one digit|', d, nat(n), 'depth', [n]) }
  /** n with its digits reversed. */
  static mirror(n: number): CrossFormula { return f('numen-mirror', 'mirror(n) = n’s digits reversed', Number(digits(n).reverse().join('')), nat(n), 'mirror', [n]) }
  /** 1 when n reads the same reversed — a palindrome. */
  static palindrome(n: number): CrossFormula { return f('numen-palindrome', 'palindrome(n) = [n = mirror(n)]', String(n) === digits(n).reverse().join('') ? 1 : 0, nat(n), 'palindrome', [n]) }
  /** n mod 9 mapped to the 1–9 wheel (9 for multiples of 9, n>0): the enneadic cycle numerology and the 3-6-9 reading use. */
  static nine(n: number): CrossFormula { return f('numen-nine', 'nine(n) = ((n − 1) mod 9) + 1', n > 0 ? ((n - 1) % 9) + 1 : 0, nat(n), 'nine', [n]) }
}

for (const name of ['depth', 'master', 'mirror', 'nine', 'palindrome', 'reduce', 'root'] as const)
  hexRegisterOf('numen', name, (NumenFormulas[name] as (...x: unknown[]) => unknown).bind(NumenFormulas))
