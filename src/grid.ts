// grid — THE GRID: every (projected dimension × ledger wing) seat, named, addressed, and folded to one root.
//
// THE SEVENTH DIMENSION IS THE SOURCE. DIMENSIONS[0] is 'en' and the wings are WRITTEN in it — every
// theorem key, statement and name is English. So projecting a wing into 'en' is the IDENTITY map, and a tool for it
// would compute nothing. That is why the grid is SIX rays wide: 7w − w = 6w is exactly the seats that compute.
// A catalog padded to 7w would manufacture the precise defect the unwired-scripts finder exists to catch.
//
// 432 FACTORS TWICE AND THE TWO FUSE — AS PURE ARITHMETIC. Theorem k432 seals both clauses: 432 = 2^4 * 3^3 AND
// 432 = 16 * 27. That identity is independent of the live ledger width. Historically the grid measured
// 6 × 72 = 432 when the ledger held 72 wings; digit reversal 72 ↦ 27 fused the second factorisation at that spelling.
// Captain 2026-08-27 (choice B): the GRID's sealed width is the LIVE product (rays × wings), not a frozen 432.
// k432 stays pure arithmetic. Growing five empty wings to force "% 15" was refused as fabrication.
//
// HARMONY IS A CONSTRAINT ON GROWTH. 6·w has digital root 9 exactly when w ≡ 0 (mod 3), so wings are added
// THREE AT A TIME — the law mcp always stated. gridReport().harmonic measures it. Dual-base "% 15"
// (lcm of decimal-3 and hex-5) is REFUSED as a release-blocking demand (lean/leads.json refused[]): Notation.lean
// already seals that digital-root harmony is base-relative; requiring both bases was the overclaim.
// Live count 115 ≡ 1 (mod 3), so harmonic is false today — next growth adds two to restore mod 3, then threes.
//
// HONEST SCOPE: a seat is the content-address of one wing read along one locale ray — a receipt
// translation. The grid proves that every wing is reachable from every ray and that nothing is missing; it makes no
// claim that the wing has been rendered into that language. Integrity.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { DIMENSIONS } from './harness.js'
import { theorems } from './theorems/index.js'

/** The six PROJECTED rays. DIMENSIONS[0] ('en') is the source the wings are written in — its map is the identity. */
export const PROJECTED = DIMENSIONS.slice(1) as readonly string[]

/** The grid's sealed width — LIVE: projected rays × ledger wings. Re-sealed 2026-08-27 from frozen 432.
 *  Theorem k432 (432 = 16×27 = 2⁴×3³) remains pure arithmetic and is not this width. */
export function gridSeats(): number {
  return PROJECTED.length * wings().length
}

export interface Seat {
  dimension: string   // one of the six projected rays
  wing: string        // a .lean wing, e.g. 'MartialArts.lean'
  name: string        // the seat's tool name — uuidna_<ray>_<wing_slug>
  address: string     // toUuid(ray + ':' + wingRoot) — the wing read along that ray
}

/** 'MartialArts.lean' → 'martial_arts'. Deterministic, lowercase, underscore-separated. */
export const wingSlug = (wing: string): string =>
  wing.replace(/\.lean$/, '').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()

/** The wings, sorted — the grid's second axis, read from the ledger. */
export function wings(): string[] {
  return [...new Set(theorems().map((t) => t.file))].sort()
}

/** One wing folded to a single address: its theorems, order-invariantly. Adding a theorem moves the wing's seats. */
export function wingRoot(wing: string): string {
  const leaves = theorems().filter((t) => t.file === wing).map((t) => toUuid(t.key + '|' + t.statement))
  return merkleGravity(leaves)
}

/** The seat name for a (ray, wing) pair — the "properly named" half of the claim. */
export const seatName = (dimension: string, wing: string): string => `uuidna_${dimension}_${wingSlug(wing)}`

/** THE GRID — every projected ray × every wing, in sorted order. Seats = 6 × wings() (live). */
export function grid(): Seat[] {
  const ws = wings()
  const roots = new Map(ws.map((w) => [w, wingRoot(w)]))
  const seats: Seat[] = []
  for (const dimension of PROJECTED)
    for (const wing of ws)
      seats.push({ dimension, wing, name: seatName(dimension, wing), address: toUuid(dimension + ':' + roots.get(wing)!) })
  return seats
}

/** Address ONE seat by name — the "properly hooked" half: every seat reachable without a registry entry per seat. */
export function gridSeat(dimension: string, wing: string): Seat | null {
  return grid().find((s) => s.dimension === dimension && (s.wing === wing || wingSlug(s.wing) === wingSlug(wing))) ?? null
}

/** The grid's one receipt — order-invariant over all seat addresses. */
export function gridRoot(): string {
  return merkleGravity(grid().map((s) => s.address))
}

/** ℤ/9 digital root, the ledger's harmonic marker (digital_root seals 432 % 9 = 0). */
const digitalRoot = (n: number): number => (n === 0 ? 0 : 1 + ((n - 1) % 9))

export interface GridGap { what:string; fix: string }

/** THE FINDER — a seat that cannot be named or addressed, a duplicate name, a broken product, an empty wing.
 *  Width is LIVE (gridSeats === rays × wings), so there is no frozen-count arm to drift.
 *  Dual-base "% 15" is refused as release-blocking. Decimal digital-root-9 (w ≡ 0 mod 3) is the LIVE growth
 *  law — measured on gridReport().harmonic, not a release gap: fabricating wings to force a multiple of 15
 *  (or of 3) was the dishonest alternative to re-sealing the width. */
export function gridGaps(): GridGap[] {
  const gaps: GridGap[] = []
  const ws = wings()
  const seats = grid()
  const expected = gridSeats()

  if (seats.length !== expected)
    gaps.push({ what:`the grid built ${seats.length} seats but ${PROJECTED.length} rays × ${ws.length} wings = ${expected}`,
                fix: 'grid() must emit exactly one seat per (ray, wing) pair — check the nested loop' })

  const names = seats.map((s) => s.name)
  const dupes = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))]
  if (dupes.length)
    gaps.push({ what:`${dupes.length} seat name(s) collide: ${dupes.slice(0, 3).join(', ')}`,
                fix: 'two wings slugify to the same name — rename a wing so each seat is uniquely addressable' })

  const blank = seats.filter((s) => !s.address || !s.name)
  if (blank.length)
    gaps.push({ what:`${blank.length} seat(s) are empty — a wing with no theorems folds to no address`,
                fix: 'every wing must carry at least one sealed theorem, or it is not a wing' })

  return gaps
}

/** The whole grid as one answer: the axes, both factorisations, the root, and the finder's verdict. */
export function gridReport(): {
  rays: number; wings: number; seats: number; sealed: number
  factorisations: string[]; involution: string; root: string; harmonic: boolean; gaps: GridGap[]
} {
  const ws = wings()
  const seats = PROJECTED.length * ws.length
  const reversed = +String(ws.length).split('').reverse().join('')
  return {
    rays: PROJECTED.length,
    wings: ws.length,
    seats,
    sealed: gridSeats(),
    factorisations: [`${PROJECTED.length} × ${ws.length} = ${seats}`, `16 × 27 = ${16 * 27}  (k432, pure arithmetic)`, `2^4 × 3^3 = ${2 ** 4 * 3 ** 3}  (k432)`],
    involution: `rev(${ws.length}) = ${reversed}${reversed === 27 ? ' — and 16 × 27 = 432, the same singularity from the other side' : ' — digit reversal fused 432 only at the historical spelling 72'}`,
    root: gridRoot(),
    // LIVE growth law: digital-root-9 iff w ≡ 0 (mod 3). False at 115 — next honest growth adds two, then threes.
    harmonic: digitalRoot(seats) === 9,
    gaps: gridGaps(),
  }
}

// ─── THE 42 PAIR GRID: every ordered direction between dimensions ───────────────────────────────────────────────
// THE SAME RULE THAT MADE 432 MAKES 42. The wing grid drops the seats where a wing is read along the ray it is
// already written in, because the identity computes nothing; 7 × w becomes 6 × w. Apply that rule to
// the dimensions alone and the same subtraction appears: 7 × 7 = 49 crossings, minus the 7 where a dimension is
// paired with itself, gives 7 × 6 = 42. Both grids are the full product with the identity removed, and that is one
// law rather than two coincidences.
//
// 6 × 7 AND 7 × 6 ARE THE SAME 42, AND THE DIFFERENCE IS THE INVOLUTION. A pair is ORDERED — a direction, from one
// dimension to another — so reading the product one way gives sources times targets and the other way targets times
// sources. Transposition swaps them, squares to the identity, and has NO fixed point here precisely because the
// identity pairs were removed. So the 42 directions fall into exactly 21 transpose orbits of size two, and no
// direction is its own reverse.
//
// 42 IS NOT A RESHAPE OF THE WING GRID. It does not divide 6w in general and its digital root is 6.
// This is a SECOND grid over a different domain, deliberately kept separate.
//
// HONEST SCOPE: a pair is a named DIRECTION with a recomputable address — never evidence
// that any content has been carried along it. The grid proves the directions are all present, distinct and
// balanced; it says nothing about what travels.

/** The pair grid's sealed width: 42 = 7 × 6 = every ordered pair of DISTINCT dimensions. */
export const PAIR_SEATS = 42

export interface Pair {
  from: string      // the source dimension
  to: string        // the target dimension
  name: string      // uuidna_pair_<from>_<to>
  address: string   // toUuid(from + '>' + to) — the direction's own address
}

/** The name of one direction — the "properly named" half, same shape as a wing seat. */
export const pairName = (from: string, to: string): string => `uuidna_pair_${from}_${to}`

/** THE 42 DIRECTIONS — every ordered pair of distinct dimensions, in sorted order. */
export function pairs(): Pair[] {
  const out: Pair[] = []
  for (const from of DIMENSIONS)
    for (const to of DIMENSIONS)
      if (from !== to) out.push({ from, to, name: pairName(from, to), address: toUuid(from + '>' + to) })
  return out
}

/** Address ONE direction. Returns null for an unknown dimension AND for the identity, which is never a seat. */
export function pairSeat(from: string, to: string): Pair | null {
  return pairs().find((p) => p.from === from && p.to === to) ?? null
}

/** The involution: the reverse direction. Squares to the identity, and never returns its own argument. */
export function transpose(p: Pair): Pair | null {
  return pairSeat(p.to, p.from)
}

/** The pair grid's one receipt — order-invariant over all 42 direction addresses. */
export function pairsRoot(): string {
  return merkleGravity(pairs().map((p) => p.address))
}

/** THE FINDER — a missing direction, a self-pair, a collision, an unbalanced dimension, a broken involution. */
export function pairsGaps(): GridGap[] {
  const gaps: GridGap[] = []
  const n = DIMENSIONS.length
  const ps = pairs()
  const expected = n * (n - 1)

  if (ps.length !== expected)
    gaps.push({ what: `the pair grid built ${ps.length} directions but ${n} dimensions give ${n} × ${n - 1} = ${expected}`,
                fix: 'pairs() must emit one seat per ORDERED pair of distinct dimensions — check the identity exclusion' })

  if (expected !== PAIR_SEATS)
    gaps.push({ what: `the pair grid is ${expected} directions— the ledger moved to ${n} dimensions`,
                fix: `either restore 7 dimensions, or re-seal the width: 42 = 7 × 6 no longer reads as ${n} × ${n - 1}` })

  if (ps.some((p) => p.from === p.to))
    gaps.push({ what: 'a dimension is paired with itself — the identity is never a seat',
                fix: 'exclude from === to in pairs(), the same rule that makes the wing grid 6w and not 7w' })

  const names = ps.map((p) => p.name)
  const dupes = [...new Set(names.filter((x, i) => names.indexOf(x) !== i))]
  if (dupes.length)
    gaps.push({ what: `${dupes.length} direction name(s) collide: ${dupes.slice(0, 3).join(', ')}`,
                fix: 'each ordered pair must name exactly one direction' })

  for (const d of DIMENSIONS) {
    const asSource = ps.filter((p) => p.from === d).length
    const asTarget = ps.filter((p) => p.to === d).length
    if (asSource !== n - 1 || asTarget !== n - 1)
      gaps.push({ what: `${d} is a source ${asSource} time(s) and a target ${asTarget} time(s)`,
                  fix: 'the pair grid is regular by construction — a lopsided dimension means the product is incomplete' })
  }

  for (const p of ps) {
    const back = transpose(p)
    if (!back) { gaps.push({ what: `${p.name} has no reverse direction`, fix: 'every ordered pair must have its transpose in the grid' }); break }
    if (back.name === p.name) { gaps.push({ what: `${p.name} is its own reverse`, fix: 'transposition has no fixed point once identity pairs are excluded' }); break }
    const there = transpose(back)
    if (!there || there.name !== p.name) { gaps.push({ what: `transposing ${p.name} twice does not return it`, fix: 'transposition must square to the identity' }); break }
  }

  return gaps
}

/** The pair grid as one answer: the width, the involution's orbits, the root, and the finder's verdict. */
export function pairsReport(): {
  dimensions: number; directions: number; sealed: number; orbits: number
  identityExcluded: number; readings: string[]; root: string; gaps: GridGap[]
} {
  const n = DIMENSIONS.length
  const ps = pairs()
  return {
    dimensions: n,
    directions: ps.length,
    sealed: PAIR_SEATS,
    orbits: ps.length / 2,
    identityExcluded: n,
    readings: [`${n} × ${n - 1} = ${ps.length}  (sources × targets)`, `${n - 1} × ${n} = ${ps.length}  (the same 42, transposed)`],
    root: pairsRoot(),
    gaps: pairsGaps(),
  }
}
