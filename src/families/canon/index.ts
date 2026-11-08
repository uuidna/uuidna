import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE HOLY BOOKS, NUMBERED — EXACT COUNTS AND EXACT WAYS, UNVERIFIED MEANING. A canon is a count: the books it holds,
 *  the chapters, the testaments. The numbering is a fact — the Protestant Bible holds 66 books in 1189 chapters, the
 *  Quran 114 suras, the Psalter 150 psalms, the Gospels 4 — but the significance a tradition reads into 66, 114, 150, 7
 *  or 2 is not. And a canon is READ in many ways: n books fall into n! sequences and 2^n − 1 non-empty selections, so
 *  the ways to read a canon are themselves combinatorics. Every value here is therefore a lead fed to the discovery: a
 *  canon's number — or a number of ways to read it — that a Lean family, an OEIS sequence or a live reading also
 *  reaches is a real cross, interesting because it was found; one nothing else reaches stays UNVERIFIED and gate.crossed
 *  tags it a manipulation until crossed. The unit counts the books and the ways; it never asserts the omen. */

const PROOF = 'the canon counts are facts and the ways to read are exact combinatorics; the significance is UNVERIFIED and fed to the discovery as a lead, never asserted'
// a canon is { books, chapters }; chapters is 0 where no fixed count is asserted here
const CANONS: Record<number, { name: string; books: number; chapters: number }> = {
  0: { name: 'tanakh', books: 24, chapters: 0 },
  1: { name: 'torah', books: 5, chapters: 187 }, // Genesis 50 + Exodus 40 + Leviticus 27 + Numbers 36 + Deuteronomy 34
  2: { name: 'bible', books: 66, chapters: 1189 }, // Protestant: 39 Old Testament + 27 New
  3: { name: 'newtestament', books: 27, chapters: 260 },
  4: { name: 'quran', books: 114, chapters: 0 }, // 114 suras
  5: { name: 'psalter', books: 1, chapters: 150 }, // one book, 150 psalms
  6: { name: 'gospels', books: 4, chapters: 0 },
}
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'canon', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `canon.${name}`, params })

export class CanonFormulas {
  /** The books a canon holds: 0 Tanakh 24, 1 Torah 5, 2 Bible 66, 3 New Testament 27, 4 Quran 114 suras, 5 Psalter 1, 6 Gospels 4. */
  static books(c: number): CrossFormula { const k = CANONS[c]; return f('canon-books', 'books(c): the books of canon c', k ? k.books : 0, nat(c) && c in CANONS, 'books', [c]) }
  /** The chapters of a canon where the count is fixed: Torah 187, Bible 1189, New Testament 260, Psalter 150. */
  static chapters(c: number): CrossFormula { const k = CANONS[c]; return f('canon-chapters', 'chapters(c): the chapters of canon c', k ? k.chapters : 0, nat(c) && c in CANONS && (k?.chapters ?? 0) > 0, 'chapters', [c]) }
  /** The orders n books can be read in: n! — the sequences a canon is read in. Exact to 18!; beyond, the count is
   *  astronomical and holds false, a lead for the split machinery rather than a value. */
  static orderings(n: number): CrossFormula { let p = 1; for (let i = 2; i <= n; i++) p *= i; return f('canon-orderings', 'orderings(n) = n! — the sequences n books are read in', p, nat(n) && n <= 18, 'orderings', [n]) }
  /** The non-empty selections of n books: 2^n − 1 — which books one reads. Exact to n = 52. */
  static selections(n: number): CrossFormula { return f('canon-selections', 'selections(n) = 2^n − 1 — the non-empty sets of n books', n <= 52 ? 2 ** n - 1 : 0, nat(n) && n <= 52, 'selections', [n]) }
  /** The suras of the Quran: 114. */
  static suras(): CrossFormula { return f('canon-suras', 'suras = 114', 114, true, 'suras', []) }
  /** The psalms of the Psalter: 150. */
  static psalms(): CrossFormula { return f('canon-psalms', 'psalms = 150', 150, true, 'psalms', []) }
  /** The Gospels: 4. */
  static gospels(): CrossFormula { return f('canon-gospels', 'gospels = 4', 4, true, 'gospels', []) }
  /** The testaments of the Bible: 2 — a coin. */
  static testaments(): CrossFormula { return f('canon-testaments', 'testaments = 2', 2, true, 'testaments', []) }
}

for (const name of ['books', 'chapters', 'gospels', 'orderings', 'psalms', 'selections', 'suras', 'testaments'] as const)
  hexRegisterOf('canon', name, (CanonFormulas[name] as (...x: unknown[]) => unknown).bind(CanonFormulas))
