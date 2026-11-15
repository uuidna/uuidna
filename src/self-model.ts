// self-model — no system holds a complete model of itself: Cantor's diagonal, as Lawvere generalised it. A self-model
// of n states is a table whose row i is the predicate state i assigns to every state. The diagonal predicate negates
// each state's own entry, d(i) = ¬ f(i)(i), so it differs from row j at column j and no row equals it. This module
// enumerates every table for a small n so the claim is checked over all of them, and every checker takes the
// diagonal it judges as an argument, so a test can hand it one without the negation and watch it fail.

export type Row = readonly boolean[]
export type Table = readonly Row[]

const range = (n: number): number[] => [...Array(n).keys()]

/** every row of n booleans, 2^n of them */
export const rows = (n: number): Row[] => range(n).reduce<Row[]>((acc) => acc.flatMap((r) => [[false, ...r], [true, ...r]]), [[]])

/** every self-model of n states: n rows each drawn from rows(n), 2^(n·n) of them */
export const models = (n: number): Table[] => { const rs = rows(n); return range(n).reduce<Table[]>((acc) => acc.flatMap((t) => rs.map((r) => [r, ...t])), [[]]) }

/** the diagonal predicate: state i holds of itself exactly when its own row says it does not */
export const diagonal = (t: Table): Row => t.map((row, i) => !row[i])

const same = (a: Row, b: Row): boolean => a.length === b.length && a.every((x, i) => x === b[i])

/** does some row of the table equal the predicate */
export const represented = (t: Table, p: Row): boolean => t.some((row) => same(row, p))

/** the count of tables of n states in which the given diagonal escapes every row */
export function escapes(n: number, diag: (t: Table) => Row = diagonal): { tables: number; escaped: number } {
  const all = models(n)
  return { tables: all.length, escaped: all.filter((t) => !represented(t, diag(t))).length }
}

/** the points of Bool a map leaves where they were — Lawvere: a surjection onto the predicates would give every map
 *  on Bool a fixed point, and negation has none */
export const boolFixed = (g: (b: boolean) => boolean): boolean[] => [false, true].filter((b) => g(b) === b)
