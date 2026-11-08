/** The combinatorics of a family of n formulas: ordered programs of up to ten formulas, ordered pairs, unordered pairs.
 *  Pure arithmetic with no imports, so a client component and a collection hook can both read it. */
export const countsOf = (n: number) => {
  let programs = 0n
  for (let k = 1n, p = 1n; k <= 10n; k++) programs += p *= BigInt(n)
  return { formulas: n, programs, compositions: n * n, pairs: (n * (n - 1)) / 2 }
}
