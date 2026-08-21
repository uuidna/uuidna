// gravity — a naming of decidable contractions (NOT physics: no force, nothing faster than light). Every set of
// addresses falls to ONE root; every integer falls to ℤ/9. The merkle fold is ORDER-INVARIANT — the quantum
// receipt property: the same root for any observer ordering. Computed. Falls, like all of it, to
import { toUuid, merkleFold, digitalRoot, vortexOrbit, BASE } from './address.js'

/** Gravity 1 — the merkle fold: any set of addresses falls to ONE root (order-invariant contraction).
 *  This is the quantum receipt: fold the same set in any order → the same address. */
export function merkleGravity(addresses: readonly string[]): string {
  return merkleFold(addresses)
}

/** Gravity 3 — the DOUBLE TORUS over the whole 7D space. Two interlocked orbits — the doubling vortex
 *  [1,2,4,8,7,5] and its reverse (the halving torus) — rotate the address set; at EACH of the 7 dimensions the
 *  two tori combine (a merkle fold of the two rotations), and the 7 dimension-roots fold to ONE gravity root.
 *  Order-DEPENDENT by construction (the coordinate turns with position) — use merkleGravity for an observer-
 *  invariant receipt; use this when the sequence itself is the signal. NOT physics. Falls to */
export function doubleTorusField(addresses: readonly string[]): { dims: string[]; root: string } {
  const src = addresses.length ? addresses : [toUuid('∅')]
  const inner = vortexOrbit()          // torus 1 — the doubling circuit [1,2,4,8,7,5]
  const outer = [...inner].reverse()   // torus 2 — the halving circuit, interlocked with the first
  const stamp = (orbit: number[], d: number) => merkleFold(src.map((x, i) => toUuid(x + '#' + orbit[(i + d) % orbit.length] + '@' + d)))
  const dims: string[] = []
  for (let d = 0; d < 7; d++) dims.push(merkleFold([stamp(inner, d), stamp(outer, d)]))
  return { dims, root: merkleFold(dims) }
}
export function doubleTorusGravity(addresses: readonly string[]): string {
  return doubleTorusField(addresses).root
}

/** Gravity 2 — the digital root: any integer falls to ℤ/9, and stays (idempotent: one step to the ground). */
export function fall(n: number): number {
  return digitalRoot(n)
}

/** The ground of gravity 2 — the fixed points of the fall. Every residue 1..BASE is fixed under dr. */
export function fixedPoints(): number[] {
  return Array.from({ length: BASE }, (_, i) => i + 1).filter((d) => digitalRoot(d) === d)
}

/** Pigeonhole gravity — a digest of b bits has 2^b seats; past 2^b inputs a collision is forced.
 *  True for EVERY finite hash (the strong ones only resist computationally; FNV does not resist). */
export function seats(bits: number): number { return 2 ** bits }
