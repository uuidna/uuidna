// pairs — THE 42 DIRECTIONS. Ordered pairs of distinct locale rays. No theorems: the mill is the wing grid.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { DIMENSIONS } from './dimensions.js'

export { DIMENSIONS }

/** The pair grid's sealed width: 42 = 7 × 6 = every ordered pair of DISTINCT dimensions. */
export const PAIR_SEATS = 42

export interface Pair {
  from: string
  to: string
  name: string
  address: string
}

export const pairName = (from: string, to: string): string => `uuidna_pair_${from}_${to}`

/** THE 42 DIRECTIONS — every ordered pair of distinct dimensions, in sorted order. */
export function pairs(): Pair[] {
  const out: Pair[] = []
  for (const from of DIMENSIONS)
    for (const to of DIMENSIONS)
      if (from !== to) out.push({ from, to, name: pairName(from, to), address: toUuid(from + '>' + to) })
  return out
}

export function pairSeat(from: string, to: string): Pair | null {
  return pairs().find((p) => p.from === from && p.to === to) ?? null
}

export function transpose(p: Pair): Pair | null {
  return pairSeat(p.to, p.from)
}

export function pairsRoot(): string {
  return merkleGravity(pairs().map((p) => p.address))
}
