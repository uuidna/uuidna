// rosetta-legs — THE LEG CENSUS AS A PURE FUNCTION OF ITS ROWS, so both served surfaces answer from one law.
//
// scripts/rosetta.ts DECIDES the legs by reading the tree: the wings, the emitters, the tests, the generated ledger.
// That decision needs a filesystem, which the Cloudflare Workers edge does not have. So the decision is made once,
// on device, and shipped as src/rosetta-mirror.ts; everything that INTERPRETS those rows — the distribution, the
// per-theorem answer, the floor that may only rise — lives here, where the stdio server and the hosted edge call
// exactly the same code over exactly the same rows.
//
// The stdio tool passes rows it recomputes LIVE from the tree. The hosted tool passes the shipped mirror. They are
// therefore free to disagree, which is why src/tests/rosetta-legs.test.ts recomputes the census and compares it to
// the mirror key by key, and why the stdio tool reports the comparison in its own output instead of assuming it.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { MIRROR, CLAIMS, FLOOR } from './rosetta-mirror.js'

export type Leg = 'symbol' | 'proof' | 'witness' | 'falsifier' | 'address'
export const LEGS: readonly Leg[] = ['symbol', 'proof', 'witness', 'falsifier', 'address'] as const
/** the bit each leg occupies in the shipped mirror — the mirror is a mask per key, never a repeated word list */
export const LEG_BIT: Record<Leg, number> = { symbol: 1, proof: 2, witness: 4, falsifier: 8, address: 16 }

export interface Rosetta { key: string; wing: string; legs: Leg[]; missing: Leg[]; claimedBy: string }

/** legs ← mask, in the fixed LEGS order so two surfaces never disagree about ordering either. */
export const legsOfMask = (mask: number): Leg[] => LEGS.filter((l) => (mask & LEG_BIT[l]) !== 0)
/** mask ← legs, the inverse; the round-trip is asserted in the test rather than assumed here. */
export const maskOfLegs = (legs: readonly Leg[]): number => legs.reduce((m, l) => m | LEG_BIT[l], 0)

/** The shipped rows, parsed from the mirror: `#wing` opens a section, then one `key mask` line per theorem.
 *  Pure and total — a malformed line is skipped rather than throwing at import time on the edge. */
export function mirrorRows(): Rosetta[] {
  const claims = new Map<string, string>()
  for (const line of CLAIMS.split('\n')) {
    const i = line.indexOf(' ')
    if (i > 0) claims.set(line.slice(0, i), line.slice(i + 1))
  }
  const rows: Rosetta[] = []
  let wing = ''
  for (const line of MIRROR.split('\n')) {
    if (!line) continue
    if (line.startsWith('#')) { wing = line.slice(1); continue }
    const sp = line.indexOf(' ')
    if (sp <= 0) continue
    const key = line.slice(0, sp)
    const legs = legsOfMask(Number(line.slice(sp + 1)))
    rows.push({ key, wing, legs, missing: LEGS.filter((l) => !legs.includes(l)), claimedBy: claims.get(key) ?? 'captain' })
  }
  return rows
}

/** the floor may only rise: a ledger cannot become less anchored than it already is. Moved here from the script so
 *  the hosted edge enforces the same floor the audit does — a check that runs on one surface only is half a check. */
export function floorGaps(rows: readonly Rosetta[], floor: { witness: number; falsifier: number } = FLOOR): string[] {
  const gaps: string[] = []
  const w = rows.filter((r) => r.legs.includes('witness')).length
  const f = rows.filter((r) => r.legs.includes('falsifier')).length
  if (w < floor.witness) gaps.push(`witnessed theorems fell to ${w}, below the floor of ${floor.witness} — a claim lost its external anchor`)
  if (f < floor.falsifier) gaps.push(`falsified theorems fell to ${f}, below the floor of ${floor.falsifier} — a check stopped proving it can fail`)
  return gaps
}

/** THREE LEGS LOCATE, TWO ONLY DETECT — the error-correction bound the module was built on (2t+1 witnesses to
 *  locate t faults), applied to one theorem. Stated as a computed verdict so no surface has to remember it. */
export const canLocateFault = (legs: readonly Leg[]): boolean => legs.length >= 3

export interface LegAnswer {
  key: string
  wing: string
  legs: Leg[]
  missing: Leg[]
  claimedBy: string
  canLocateFault: boolean
  verdict: string
}

export function legsFor(rows: readonly Rosetta[], key: string): LegAnswer {
  const r = rows.find((x) => x.key === key)
  if (!r) throw new Error(`uuidna_rosetta_legs: no sealed theorem named "${key}" — the census only speaks about theorems that exist (nothing was computed)`)
  return {
    key: r.key, wing: r.wing, legs: r.legs, missing: r.missing, claimedBy: r.claimedBy,
    canLocateFault: canLocateFault(r.legs),
    verdict: canLocateFault(r.legs)
      ? `${r.legs.length} of ${LEGS.length} independent witnesses — enough to LOCATE a fault, not merely detect one`
      : `${r.legs.length} of ${LEGS.length} independent witnesses — enough only to DETECT a disagreement, never to locate it; symbol and proof are written by one hand and share that hand's errors`,
  }
}

export interface LegCensus {
  total: number
  perLeg: { leg: Leg; theorems: number; share: string }[]
  scarcest: Leg
  byLegCount: { legs: number; theorems: number; verdict: string }[]
  detectOnly: number                       // carrying exactly the correlated pair — the count that motivated the module
  fullyAnchored: string[]
  claimedBy: { who: string; theorems: number }[]
  floor: { witness: number; falsifier: number }
  floorGaps: string[]
  receipt: string
  honest: string
}

const HONEST_LEGS =
  'The leg census MEASURES how many INDEPENDENT witnesses each sealed theorem carries; it does not certify any of ' +
  'them. PROOF is the kernel verdict and ADDRESS is the content fold, so both are near-universal by construction and ' +
  'neither is evidence about the world. SYMBOL is the js mirror the emitter cross-checks. WITNESS (a source outside ' +
  'this repository) and FALSIFIER (a test that must fail on a deliberate mutation) are the scarce ones, and a low ' +
  'count is reported as it stands rather than smoothed: two legs can DETECT a disagreement and never locate it. ' +
  'A missing leg is never a claim that the theorem is false. Integrity, not truth.'

export function legCensus(rows: readonly Rosetta[], floor: { witness: number; falsifier: number } = FLOOR): LegCensus {
  const perLeg = LEGS.map((leg) => {
    const n = rows.filter((r) => r.legs.includes(leg)).length
    return { leg, theorems: n, share: `${n} of ${rows.length}` }
  })
  const byCount = new Map<number, number>()
  for (const r of rows) byCount.set(r.legs.length, (byCount.get(r.legs.length) ?? 0) + 1)
  const byClaim = new Map<string, number>()
  for (const r of rows) byClaim.set(r.claimedBy, (byClaim.get(r.claimedBy) ?? 0) + 1)
  const scarcest = [...perLeg].sort((a, b) => a.theorems - b.theorems || a.leg.localeCompare(b.leg))[0]
  return {
    total: rows.length,
    perLeg,
    scarcest: scarcest ? scarcest.leg : 'witness',
    byLegCount: [...byCount.keys()].sort((a, b) => b - a).map((n) => ({
      legs: n, theorems: byCount.get(n) ?? 0,
      verdict: n >= 3 ? 'can locate a fault' : n === 2 ? 'can only DETECT — the correlated pair' : 'below the pair',
    })),
    detectOnly: rows.filter((r) => r.legs.length === 2).length,
    fullyAnchored: rows.filter((r) => r.legs.length === LEGS.length).map((r) => r.key).sort(),
    claimedBy: [...byClaim.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([who, theorems]) => ({ who, theorems })),
    floor,
    floorGaps: floorGaps(rows, floor),
    receipt: merkleGravity(rows.map((r) => toUuid(`${r.key}:${r.legs.join('+')}`))),
    honest: HONEST_LEGS,
  }
}

/** THE DRIFT CHECK, RUNNABLE AT RUNTIME. The stdio tool holds live rows; this compares them to the shipped mirror
 *  the hosted edge answers from, and NAMES every key that disagrees. A surface that can drift should say so in its
 *  own output, not in a comment nobody runs. */
export interface MirrorAgreement { agrees: boolean; live: number; mirrored: number; disagreeing: string[]; fix: string }
export function mirrorAgreement(live: readonly Rosetta[]): MirrorAgreement {
  const mine = new Map(mirrorRows().map((r) => [r.key, maskOfLegs(r.legs)]))
  const disagreeing: string[] = []
  for (const r of live) if (mine.get(r.key) !== maskOfLegs(r.legs)) disagreeing.push(r.key)
  for (const k of mine.keys()) if (!live.some((r) => r.key === k)) disagreeing.push(k)
  return {
    agrees: disagreeing.length === 0,
    live: live.length,
    mirrored: mine.size,
    disagreeing: [...new Set(disagreeing)].sort().slice(0, 24),
    fix: disagreeing.length
      ? 'the hosted edge is answering from a stale census — run `node dist/scripts/rosetta.js` to rewrite src/rosetta-mirror.ts, then `npm run build`'
      : 'the shipped mirror and the live census agree key for key',
  }
}
