// gravity — WHAT BINDS, AND WHAT ESCAPES.
//
// Two things wear this name here and they are the same idea at two scales.
//
// THE FOLD. Any set of addresses falls to ONE root, and the fall is ORDER-INVARIANT: fold the same set in any
// order and the same address comes back. That is the receipt property — every observer, any ordering, one root.
//
// THE BINDING. A citation is a gravity well and a claim is what it must hold. A sealed theorem has MASS: the
// superposition space its `by decide` actually settled, measured while the generator walked it. A claim that
// names a magnitude inside that mass is CAPTURED — the citation holds it. One that names a magnitude beyond it
// reaches escape velocity and is unbound, which is overreach stated as arithmetic rather than as a lexicon.
//
// AND A CLAIM THAT NAMES NO MAGNITUDE HAS NO ORBIT. It is not heavy — it has no position in the field at all,
// so no finite mass can ever bind it, and every arithmetic test passes it for want of anything to weigh. This is
// why "faster than every classical machine" survives a real citation: it was never in the well. Every theorem in
// this ledger is `by decide`, a FINITE enumeration, so none of them can bind an unbounded claim — which is what
// Infinity.lean already seals, that a predicate can hold on every element of a window and fail at the very next,
// and no amount of widening converts the one into the other. The gate has always said so in its own advice:
// name the finite structure the claim lives in.
//
// THE EXCEPTION IS A PROPORTION. `two_coins` is 110/108 = 55/54 by exact cross-multiplication, and a proportion
// does not run out of mass at scale: it holds at every magnitude, leans on nothing, and so binds what no
// enumeration can. That is why it scores one case on every finite measure and is still the heaviest thing here.
//
// NOT PHYSICS: no force, nothing faster than light, no claim about the world. A naming of decidable contractions
// and of what a citation can carry. Integrity, not truth.
import { toUuid, merkleFold, digitalRoot, vortexOrbit, BASE } from '../address.js'

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

/** the mass a citation carries: the superposition space its proof settled, and that space in hexbits. */
export interface Mass { cases: number; hexbits: number }

/** BINDING — can this citation hold this claim?
 *
 *  `named` are the magnitudes the claim asserts; `own` are the magnitudes the theorem itself states; `mass` is
 *  what it decided. A named magnitude is bound when the theorem states it outright or when it fits inside the
 *  decided space. A claim naming nothing is UNBOUND — not refuted, unbindable: there is no magnitude to weigh,
 *  so no finite enumeration can capture it, and calling that "verified" is how a real citation launders a claim
 *  it never supported. Measured against the ledger's own sealed doc comments, `unbound` is 4% of them (36 of
 *  991) and each of those 36 is a claim that should name its structure and does not. */
export interface Binding { bound: boolean; unbound: boolean; escaped: readonly number[] }

export const binds = (named: readonly number[], own: readonly number[], mass: Mass, hexbitsOf: (n: number) => number): Binding => {
  if (named.length === 0) return { bound: false, unbound: true, escaped: [] }
  const has = new Set(own)
  const escaped = named.filter((n) => !has.has(n) && hexbitsOf(n) > mass.hexbits)
  return { bound: escaped.length === 0, unbound: false, escaped }
}
