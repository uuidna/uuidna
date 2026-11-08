import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LATINSQUARE — THE LATIN SQUARE, AS ARITHMETIC. A Latin square of order n is an n×n array on n symbols, each symbol
 *  once per row and once per column (van Lint & Wilson). Deterministic integer identities: its n² cells, the n symbols,
 *  its n rows and n columns, the n-1 mutually orthogonal mates a complete set admits and the C(n-1, 2) orthogonal pairs
 *  among them, the n cells of a transversal, the six conjugates obtained by permuting the (row, column, symbol) triples,
 *  the n!·(n-1)! factor by which the Latin squares of order n exceed the reduced ones, the n! fillings of the first row,
 *  the (n!)³ isotopy group and the 6·(n!)³ paratopy (main-class) group, the k² cells of a k-subsquare, and the C(n, 2)
 *  intercalate row-pairs. Exact integer identities crossed to `combinatorics`. A measure, not advice. */

const PROOF = 'Latin square arithmetic by the book (van Lint & Wilson): n² cells, n symbols, n rows and columns, n-1 mutually orthogonal mates and C(n-1,2) orthogonal pairs, n transversal cells, the six (row,column,symbol) conjugates, the n!·(n-1)! reduced-to-total factor, n! first-row fillings, the (n!)³ isotopy and 6·(n!)³ paratopy groups, k² subsquare cells, C(n,2) intercalate row-pairs; deterministic integer identities crossed to combinatorics; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const fact = (n: number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r }
const l = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'latinsquare', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `latinsquare.${name}`, params })

export class LatinSquareFormulas {
  /** CELLS — the cells of an order-n Latin square, the n×n array. value n². */
  static cells(n: number): CrossFormula { return l('latinsquare-cells', 'cells(n) = n²', n * n, nat(n), 'cells', [n]) }
  /** SYMBOLS — the distinct symbols, one appearing once per row and column. value n. */
  static symbols(n: number): CrossFormula { return l('latinsquare-symbols', 'symbols(n) = n', n, nat(n), 'symbols', [n]) }
  /** ROWS — the rows of the square, each a permutation of the n symbols. value n. */
  static rows(n: number): CrossFormula { return l('latinsquare-rows', 'rows(n) = n', n, nat(n), 'rows', [n]) }
  /** COLS — the columns of the square, each a permutation of the n symbols. value n. */
  static cols(n: number): CrossFormula { return l('latinsquare-cols', 'cols(n) = n', n, nat(n), 'cols', [n]) }
  /** MOLS — the mutually orthogonal mates a complete set of order n admits. value n − 1; holds n ≥ 2. */
  static mols(n: number): CrossFormula { return l('latinsquare-mols', 'mols(n) = n − 1 (maximum mutually orthogonal mates)', n - 1, nat(n) && n >= 2, 'mols', [n]) }
  /** ORTHOGONALPAIRS — the orthogonal pairs among the n−1 mates of a complete set. value C(n−1, 2) = (n−1)(n−2)/2; holds n ≥ 2. */
  static orthogonalpairs(n: number): CrossFormula { return l('latinsquare-orthogonalpairs', 'orthogonalpairs(n) = C(n−1, 2) = (n−1)(n−2)/2', ((n - 1) * (n - 2)) / 2, nat(n) && n >= 2, 'orthogonalpairs', [n]) }
  /** TRANSVERSAL — the cells of a transversal, one per row, column and symbol. value n. */
  static transversal(n: number): CrossFormula { return l('latinsquare-transversal', 'transversal(n) = n (one cell per row, column and symbol)', n, nat(n), 'transversal', [n]) }
  /** CONJUGATES — the conjugates, the 3! permutations of the (row, column, symbol) triples. value 6. */
  static conjugates(): CrossFormula { return l('latinsquare-conjugates', 'conjugates() = 3! = 6 (permutations of the (row, column, symbol) triples)', 6, true, 'conjugates', []) }
  /** REDUCED — the factor by which the Latin squares of order n exceed the reduced ones, L(n) = n!·(n−1)!·R(n). value n!·(n−1)!; holds n ≥ 1 and fits. */
  static reduced(n: number): CrossFormula { const v = fact(n) * fact(n - 1); return l('latinsquare-reduced', 'reduced(n) = n!·(n−1)! (L(n) = n!·(n−1)!·R(n))', v, nat(n) && n >= 1 && Number.isSafeInteger(v), 'reduced', [n]) }
  /** ORDER — the order of the square, the side of the array. value n. */
  static order(n: number): CrossFormula { return l('latinsquare-order', 'order(n) = n', n, nat(n), 'order', [n]) }
  /** FIRSTROW — the fillings of the first row, a permutation of the n symbols. value n!; holds fits. */
  static firstrow(n: number): CrossFormula { const v = fact(n); return l('latinsquare-firstrow', 'firstrow(n) = n! (permutations of the n symbols)', v, nat(n) && Number.isSafeInteger(v), 'firstrow', [n]) }
  /** ISOTOPY — the isotopy group acting on Latin squares: independent row, column and symbol permutations. value (n!)³; holds fits. */
  static isotopy(n: number): CrossFormula { const v = fact(n) ** 3; return l('latinsquare-isotopy', 'isotopy(n) = (n!)³ (row, column and symbol permutations)', v, nat(n) && Number.isSafeInteger(v), 'isotopy', [n]) }
  /** PARATOPY — the paratopy (main-class) group: the isotopy group times the six conjugates. value 6·(n!)³; holds fits. */
  static paratopy(n: number): CrossFormula { const v = 6 * fact(n) ** 3; return l('latinsquare-paratopy', 'paratopy(n) = 6·(n!)³ (isotopy group × the six conjugates)', v, nat(n) && Number.isSafeInteger(v), 'paratopy', [n]) }
  /** SUBSQUARE — the cells of a k-subsquare, a k×k Latin square inside the array. value k². */
  static subsquare(k: number): CrossFormula { return l('latinsquare-subsquare', 'subsquare(k) = k² (cells of a k×k Latin subsquare)', k * k, nat(k), 'subsquare', [k]) }
  /** INTERCALATE — the row-pairs that can host an intercalate, a 2×2 Latin subsquare. value C(n, 2) = n(n−1)/2. */
  static intercalate(n: number): CrossFormula { return l('latinsquare-intercalate', 'intercalate(n) = C(n, 2) = n(n−1)/2 (row-pairs)', (n * (n - 1)) / 2, nat(n), 'intercalate', [n]) }
}

for (const name of ['cells', 'cols', 'conjugates', 'firstrow', 'intercalate', 'isotopy', 'mols', 'order', 'orthogonalpairs', 'paratopy', 'reduced', 'rows', 'subsquare', 'symbols', 'transversal'] as const)
  hexRegisterOf('latinsquare', name, (LatinSquareFormulas[name] as (...x: unknown[]) => unknown).bind(LatinSquareFormulas))
