// grid — THE 432 GRID: every (projected dimension × ledger wing) seat, named, addressed, and folded to one root.
//
// THE SEVENTH DIMENSION IS THE SOURCE, NOT A SEAT. DIMENSIONS[0] is 'en' and the wings are WRITTEN in it — every
// theorem key, statement and name is English. So projecting a wing into 'en' is the IDENTITY map, and a tool for it
// would compute nothing. That is why the grid is SIX rays wide, not seven: 7 × 72 = 504 counts 72 seats that do no
// work, and 504 − 72 = 432 is exactly the count of seats that compute. A catalog padded to 504 would manufacture the
// precise defect the unwired-scripts finder exists to catch.
//
// 432 FACTORS TWICE AND THE TWO FUSE. k432 seals both clauses: 432 = 2^4 * 3^3 AND 432 = 16 * 27. The grid's own
// axes give the first reading, 6 × 72 = rays × wings. The second arrives by INVOLUTION — reverse the digits of the
// wing count, 72 ↦ 27, and 16 × 27 is the same 432. Digit reversal is an involution (applying it twice is the
// identity), and both counts carry digital root 9, as does their sum, 72 + 27 = 99. Two independent factorisations
// meeting at one number is the grid's whole claim to being a NATURAL size rather than a chosen one.
//
// HARMONY IS A CONSTRAINT ON GROWTH, NOT A ONE-TIME FACT. 6·w has digital root 9 exactly when w ≡ 0 (mod 3), so the
// ledger stays harmonic only if wings are added THREE AT A TIME. 72 → 73 would give 438 (digital root 6): a broken
// grid. gridGaps() reports this, which makes the grid a live gate rather than a frozen number.
//
// HONEST SCOPE: a seat is the content-address of one wing read along one locale ray — a receipt, never a
// translation. The grid proves that every wing is reachable from every ray and that nothing is missing; it makes no
// claim that the wing has been rendered into that language. Integrity, not truth.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { DIMENSIONS } from './harness.js'
import { theorems } from './theorems/index.js'

/** The six PROJECTED rays. DIMENSIONS[0] ('en') is the source the wings are written in — its map is the identity. */
export const PROJECTED = DIMENSIONS.slice(1) as readonly string[]

/** The grid's sealed width: 432 = 6 rays × 72 wings = 16 × 27 (k432). */
export const GRID_SEATS = 432

export interface Seat {
  dimension: string   // one of the six projected rays
  wing: string        // a .lean wing, e.g. 'MartialArts.lean'
  name: string        // the seat's tool name — uuidna_<ray>_<wing_slug>
  address: string     // toUuid(ray + ':' + wingRoot) — the wing read along that ray
}

/** 'MartialArts.lean' → 'martial_arts'. Deterministic, lowercase, underscore-separated. */
export const wingSlug = (wing: string): string =>
  wing.replace(/\.lean$/, '').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()

/** The wings, sorted — the grid's second axis, read from the ledger, never hardcoded. */
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

/** THE GRID — every projected ray × every wing, in sorted order. 432 seats while the ledger holds 72 wings. */
export function grid(): Seat[] {
  const ws = wings()
  const roots = new Map(ws.map((w) => [w, wingRoot(w)]))
  const seats: Seat[] = []
  for (const dimension of PROJECTED)
    for (const wing of ws)
      seats.push({ dimension, wing, name: seatName(dimension, wing), address: toUuid(dimension + ':' + roots.get(wing)!) })
  return seats
}

/** Address ONE seat by name — the "properly hooked" half: every seat reachable without 432 registry entries. */
export function gridSeat(dimension: string, wing: string): Seat | null {
  return grid().find((s) => s.dimension === dimension && (s.wing === wing || wingSlug(s.wing) === wingSlug(wing))) ?? null
}

/** The grid's one receipt — order-invariant over all 432 seat addresses. */
export function gridRoot(): string {
  return merkleGravity(grid().map((s) => s.address))
}

/** ℤ/9 digital root, the ledger's harmonic marker (digital_root seals 432 % 9 = 0). */
const digitalRoot = (n: number): number => (n === 0 ? 0 : 1 + ((n - 1) % 9))

export interface GridGap { what:string; fix: string }

/** THE FINDER — a seat that cannot be named or addressed, a duplicate name, a drifted count, a broken harmony.
 *  Folded into the guard so the grid fails loudly instead of quietly becoming 438. */
export function gridGaps(): GridGap[] {
  const gaps: GridGap[] = []
  const ws = wings()
  const seats = grid()
  const expected = PROJECTED.length * ws.length

  if (seats.length !== expected)
    gaps.push({ what:`the grid built ${seats.length} seats but ${PROJECTED.length} rays × ${ws.length} wings = ${expected}`,
                fix: 'grid() must emit exactly one seat per (ray, wing) pair — check the nested loop' })

  if (ws.length % 3 !== 0)
    gaps.push({ what:`${ws.length} wings breaks harmony — 6 × ${ws.length} = ${6 * ws.length}, digital root ${digitalRoot(6 * ws.length)}, not 9`,
                fix: `add or remove wings THREE at a time: ${ws.length - (ws.length % 3)} or ${ws.length + (3 - (ws.length % 3))} wings keeps the grid harmonic` })

  if (expected !== GRID_SEATS)
    gaps.push({ what:`the grid is ${expected} seats, not the sealed ${GRID_SEATS} — the ledger moved to ${ws.length} wings`,
                fix: `either restore 72 wings, or re-seal the width: k432's 16 × 27 no longer reads as ${PROJECTED.length} × ${ws.length}` })

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
    sealed: GRID_SEATS,
    factorisations: [`${PROJECTED.length} × ${ws.length} = ${seats}`, `16 × 27 = ${16 * 27}  (k432)`, `2^4 × 3^3 = ${2 ** 4 * 3 ** 3}  (k432)`],
    involution: `rev(${ws.length}) = ${reversed}${reversed === 27 ? ' — and 16 × 27 = 432, the same singularity from the other side' : ''}`,
    root: gridRoot(),
    harmonic: digitalRoot(seats) === 9,
    gaps: gridGaps(),
  }
}
