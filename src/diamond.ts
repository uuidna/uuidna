// the diamond — the ten's-complement reflection r(d) = 10 − d on the nine non-zero digits: an involution
// (r∘r = id) whose UNIQUE fixed point is 5. The SAME structure lifts to any ordered set by mirroring the index
// (i ↦ (n−1)−i): `involute` pairs every element with its mirror — self-inverse, CLOSED on the set, leaving no
// element an island; an odd set has exactly ONE fixed centre (the 5-analogue). This is how singleton families
// are inverted to complete the involution: each lone family, entangled with its mirror, ceases to be an island.
export const diamond = (d: number): number => 10 - d
export const DIAMOND_FIXED = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => diamond(d) === d) // → [5]

export const involute = <T>(xs: readonly T[]): Array<[T, T]> => xs.map((x, i) => [x, xs[xs.length - 1 - i]] as [T, T])
export const involutionFixed = <T>(xs: readonly T[]): T[] => xs.filter((_x, i) => i === xs.length - 1 - i)
