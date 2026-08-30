// quantum-audit-ratios — decode Sequence and Rosetta first; ratios, angles, and polarities live on the decode.
//
// Nothing here is authored. runSequence reads polarities off each address; decodeVortexDashAngles reads the ±60°
// walk; rosettaRayOf reads the seven rays at 360/7° steps. Genesis, axiom balance, and wing parity fold in last.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { sha256 } from './sha256.js'
import { existsRoot, lsRoot, rdRoot } from './boundary.js'
import { runSequence, type SequenceRun, type DigitPolarity } from './sequence-run.js'
import { THEOREMS, axiomBalance, axiomIndex, type Theorem } from './theorems/index.js'
import { axiomWitness } from './axiom-witness.js'
import { mirrorRows, legCensus, type Leg, type Rosetta } from './rosetta-legs.js'
import { decodeVortexDashAngles, VORTEX_DASH_ANGLE_DEG } from './sequence-field.js'
import { bootOS } from './quantum/os/index.js'
import { growLife } from './grow.js'

/** Rosetta ray — seven locale dimensions (same law as rosettaIndex). */
export const rosettaRayOf = (address: string): number =>
  Number(BigInt('0x' + address.replace(/-/g, '')) % 7n)

/** Integer degrees per ray — 360/7 = 51 (fourth_ray_is_green). */
export const rosettaRayDegrees = (ray: number): number => (ray * (360 / 7)) | 0

export interface BidirectionalRatio {
  id: string
  labelA: string
  labelB: string
  a: number
  b: number
  forward: number
  reverse: number
  balanced: boolean
}

/** Both-direction ratio: forward = a/b, reverse = b/a; balanced when a = b. */
export const bidirectionalRatio = (
  id: string,
  a: number,
  b: number,
  labelA: string,
  labelB: string,
): BidirectionalRatio => {
  const forward = b ? a / b : (a ? Infinity : 0)
  const reverse = a ? b / a : (b ? Infinity : 0)
  return {
    id,
    labelA,
    labelB,
    a,
    b,
    forward: +forward.toFixed(3),
    reverse: +reverse.toFixed(3),
    balanced: a === b,
  }
}

export interface DecodedTheorem {
  key: string
  address: string
  sequence: SequenceRun
  ray: number
  rayDegrees: number
  legs: readonly Leg[]
  legCount: number
}

/** decodeTheorem — one row through Sequence (polarity + walk) and Rosetta (ray + legs). */
export const decodeTheorem = (t: Theorem, rows: readonly Rosetta[]): DecodedTheorem => {
  const row = rows.find((r) => r.key === t.key)
  const ray = rosettaRayOf(t.address)
  return {
    key: t.key,
    address: t.address,
    sequence: runSequence(t.address),
    ray,
    rayDegrees: rosettaRayDegrees(ray),
    legs: row?.legs ?? [],
    legCount: row?.legs.length ?? 0,
  }
}

const h16 = (data: string): string => {
  const d = sha256(new TextEncoder().encode(data))
  return [...d].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
}

export interface GenesisDecode {
  deposits: number
  tip: string
  chainIntact: boolean
}

/** genesisDecode — order-sealed chain: imprint = h16(prev|id), genesis first. */
export const genesisDecode = (): GenesisDecode => {
  if (!existsRoot('trials-receipts.json')) return { deposits: 0, tip: toUuid('genesis-empty'), chainIntact: true }
  try {
    const raw = JSON.parse(rdRoot('trials-receipts.json')) as { receipts?: { id: string; imprint?: string }[] }
    const receipts = raw.receipts ?? []
    let prev = 'genesis'
    let intact = true
    for (const r of receipts) {
      const expect = h16(`${prev}|${r.id}`)
      if (r.imprint !== expect) intact = false
      prev = expect
    }
    return { deposits: receipts.length, tip: prev, chainIntact: intact }
  } catch {
    return { deposits: 0, tip: toUuid('genesis-unreadable'), chainIntact: false }
  }
}

export interface AnglesDecode {
  dashStepDegrees: number
  weightedBearing: number
  closes: boolean
  steps: number
  rosettaRayStep: number
  ratios: readonly BidirectionalRatio[]
  receipt: string
}

/** decodeAngles — the living-field ±60° dash and the seven-ray hue wheel at 360/7. */
export const decodeAngles = (): AnglesDecode => {
  const dash = decodeVortexDashAngles()
  const rosettaRayStep = (360 / 7) | 0
  const ratios = [
    bidirectionalRatio('angles.dash-rosetta', VORTEX_DASH_ANGLE_DEG, rosettaRayStep, 'dash step °', 'ray step °'),
    bidirectionalRatio('angles.steps-rays', dash.steps.length, 7, 'dash steps', 'rosetta rays'),
    bidirectionalRatio('angles.full-circle', dash.weightedBearing, 360 - dash.weightedBearing, 'bearing', 'complement'),
  ]
  return {
    dashStepDegrees: VORTEX_DASH_ANGLE_DEG,
    weightedBearing: dash.weightedBearing,
    closes: dash.closes,
    steps: dash.steps.length,
    rosettaRayStep,
    ratios,
    receipt: merkleGravity([dash.root, toUuid(`angles|${dash.closes}|${dash.weightedBearing}|${rosettaRayStep}`)]),
  }
}

export interface PolaritiesDecode {
  minus: number
  neutral: number
  plus: number
  /** structural digit capacity 4 : 2 : 4 on the ten-digit strip */
  capacity: { minus: number; neutral: number; plus: number }
  byRay: readonly { ray: number; minus: number; neutral: number; plus: number }[]
  bySeed: readonly { seed: number; theorems: number }[]
  ratios: readonly BidirectionalRatio[]
  receipt: string
}

/** decodePolarities — every theorem's polarity and seed, crossed with the seven rays. */
export const decodePolarities = (ts: readonly Theorem[] = THEOREMS): PolaritiesDecode => {
  const counts = { minus: 0, neutral: 0, plus: 0 }
  const byRay = Array.from({ length: 7 }, (_, ray) => ({ ray, minus: 0, neutral: 0, plus: 0 }))
  const bySeed = Array.from({ length: 10 }, (_, seed) => ({ seed, theorems: 0 }))
  for (const t of ts) {
    const s = runSequence(t.address)
    counts[s.polarity]++
    byRay[rosettaRayOf(t.address)]![s.polarity]++
    bySeed[s.seed]!.theorems++
  }
  const ratios = [
    bidirectionalRatio('polarity.minus-plus', counts.minus, counts.plus, 'minus theorems', 'plus theorems'),
    bidirectionalRatio('polarity.neutral-rest', counts.neutral, ts.length - counts.neutral, 'neutral', 'non-neutral'),
    bidirectionalRatio('polarity.capacity.minus', counts.minus, 4, 'minus load', 'minus digits'),
    bidirectionalRatio('polarity.capacity.plus', counts.plus, 4, 'plus load', 'plus digits'),
  ]
  const leafs = [
    toUuid(`polarity|${counts.minus}|${counts.neutral}|${counts.plus}`),
    ...byRay.map((r) => toUuid(`polarity-ray|${r.ray}|${r.minus}|${r.neutral}|${r.plus}`)),
  ]
  return {
    ...counts,
    capacity: { minus: 4, neutral: 2, plus: 4 },
    byRay,
    bySeed,
    ratios,
    receipt: merkleGravity(leafs),
  }
}

export interface SequenceLedgerDecode {
  bySeed: readonly { seed: number; theorems: number }[]
  fixed: number
  nonFixed: number
  canonical: readonly { seed: number; period: number; visited: number }[]
  receipt: string
}

export const decodeSequenceLedger = (ts: readonly Theorem[] = THEOREMS): SequenceLedgerDecode => {
  const bySeed = Array.from({ length: 10 }, (_, seed) => ({ seed, theorems: 0 }))
  let fixed = 0
  let nonFixed = 0
  for (const t of ts) {
    const s = runSequence(t.address)
    bySeed[s.seed]!.theorems++
    if (s.fixed) fixed++
    else nonFixed++
  }
  const canonical = bySeed.map(({ seed }) => {
    const s = runSequence(seed)
    return { seed, period: s.period, visited: s.visited.length }
  })
  return {
    bySeed,
    fixed,
    nonFixed,
    canonical,
    receipt: merkleGravity(bySeed.map((x) => toUuid(`seq-seed|${x.seed}|${x.theorems}`))),
  }
}

export interface RosettaLedgerDecode {
  rays: readonly { ray: number; degrees: number; theorems: number }[]
  census: ReturnType<typeof legCensus>
  maskCoins: number
  ratios: readonly BidirectionalRatio[]
  receipt: string
}

export const decodeRosettaLedger = (ts: readonly Theorem[] = THEOREMS, rows: readonly Rosetta[] = mirrorRows()): RosettaLedgerDecode => {
  const rays = Array.from({ length: 7 }, (_, ray) => ({ ray, degrees: rosettaRayDegrees(ray), theorems: 0 }))
  for (const t of ts) rays[rosettaRayOf(t.address)]!.theorems++
  const census = legCensus(rows)
  let maskCoins = 0
  for (let m = 0; m < 32; m++) {
    let pop = 0
    for (let i = 0; i < 5; i++) if (m & (1 << i)) pop++
    maskCoins += 2 * pop
  }
  let minRay = rays[0]?.theorems ?? 0
  let maxRay = minRay
  for (const r of rays) {
    if (r.theorems < minRay) minRay = r.theorems
    if (r.theorems > maxRay) maxRay = r.theorems
  }
  const witness = census.perLeg.find((p) => p.leg === 'witness')?.theorems ?? 0
  const falsifier = census.perLeg.find((p) => p.leg === 'falsifier')?.theorems ?? 0
  const ratios = [
    bidirectionalRatio('rosetta.rays.spread', minRay, maxRay, 'sparsest ray', 'densest ray'),
    bidirectionalRatio('rosetta.legs.witness-falsifier', witness, falsifier, 'witness', 'falsifier'),
    bidirectionalRatio('rosetta.coins.walk', maskCoins, 32, 'coin sum', 'masks'),
  ]
  return {
    rays,
    census,
    maskCoins,
    ratios,
    receipt: merkleGravity([...rays.map((r) => toUuid(`rosetta-ray|${r.ray}|${r.theorems}`)), census.receipt]),
  }
}

function wingTheoremCount(): number {
  if (!existsRoot('lean')) return 0
  let n = 0
  for (const e of lsRoot('lean')) {
    if (!e.name.endsWith('.lean')) continue
    for (const _ of rdRoot(`lean/${e.name}`).matchAll(/^theorem\s+/gm)) n++
  }
  return n
}

export interface LatentAxiom {
  file: string
  def: string
  principle: string
}

export interface LifeDecode {
  os: {
    receipt: string
    bootStates: number
    packages: number
    floor: string
    fourWidths: readonly [number, number, number, number]
  }
  living: { count: number; target: number; toGo: number; monotone: boolean }
  latent: { count: number; sample: readonly LatentAxiom[] }
  balance: {
    active: number
    balanced: number
    open: number
    revealGap: number
    worst: readonly { dimension: string; id: string; delta: number; balanced: boolean }[]
  }
  ratios: readonly BidirectionalRatio[]
  receipt: string
}

/** decodeLife — uuidnaOS boot ground, living ledger, latent axioms, and balance gap (what remains to reveal). */
export const decodeLife = (): LifeDecode => {
  const os = bootOS()
  const grow = growLife()
  const idx = axiomIndex()
  const bal = axiomBalance()
  const latentEntries = idx.entries.filter((e) => e.unused)
    .sort((a, b) => a.file.localeCompare(b.file) || a.def.localeCompare(b.def))
  const sample = latentEntries.slice(0, 12).map((e) => ({ file: e.file, def: e.def, principle: e.principle }))
  let revealGap = latentEntries.length
  for (const s of bal.worst) {
    if (!s.balanced) revealGap += s.citedDefs >= s.bound ? s.citedDefs - s.bound : s.bound - s.citedDefs
  }
  const cap = os.capacity
  const fourWidths: [number, number, number, number] = [
    cap.messageHexbits,
    cap.handleHexbits,
    cap.coinHexbits,
    cap.uuidHexbits,
  ]
  const living = {
    count: grow.life.living,
    target: grow.grow.target,
    toGo: grow.grow.toGo,
    monotone: grow.life.monotone,
  }
  const balance = {
    active: bal.active,
    balanced: bal.balanced,
    open: bal.active - bal.balanced,
    revealGap,
    worst: bal.worst.map((s) => ({ dimension: s.dimension, id: s.id, delta: s.delta, balanced: s.balanced })),
  }
  const ratios = [
    bidirectionalRatio('life.os-living', os.boot.count, living.count, 'boot states', 'living theorems'),
    bidirectionalRatio('life.latent-cited', latentEntries.length, idx.citedDefs, 'latent axioms', 'cited axioms'),
    bidirectionalRatio('life.milestone', living.toGo, living.count, 'to next 2^n', 'living now'),
    bidirectionalRatio('life.balance', balance.balanced, balance.open, 'balanced slices', 'open slices'),
    bidirectionalRatio('life.wing-ledger', wingTheoremCount(), living.count, 'wing theorems', 'ledger keys'),
  ]
  const receipt = merkleGravity([
    os.receipt,
    grow.receipt,
    toUuid(`life-latent|${latentEntries.length}|${revealGap}`),
    bal.fused,
    merkleGravity(ratios.map((r) => toUuid(`${r.id}|${r.a}|${r.b}|${r.balanced}`))),
  ])
  return {
    os: {
      receipt: os.receipt,
      bootStates: os.boot.count,
      packages: os.port.count,
      floor: os.floor,
      fourWidths,
    },
    living,
    latent: { count: latentEntries.length, sample },
    balance,
    ratios,
    receipt,
  }
}

export interface QuantumAuditRatios {
  polarities: PolaritiesDecode
  angles: AnglesDecode
  sequence: SequenceLedgerDecode
  rosetta: RosettaLedgerDecode
  life: LifeDecode
  axiom: { global: ReturnType<typeof axiomBalance>['global']; active: number; balanced: number; fused: string }
  kernel: BidirectionalRatio
  wing: BidirectionalRatio
  genesis: GenesisDecode
  ratios: readonly BidirectionalRatio[]
  fused: string
  honest: string
}

/** uuidnaDecode — one door: Sequence, Rosetta, angles, polarities, life, genesis, axiom balance, fused. */
export interface UuidnaDecode {
  polarities: PolaritiesDecode
  angles: AnglesDecode
  sequence: SequenceLedgerDecode
  rosetta: RosettaLedgerDecode
  life: LifeDecode
  genesis: GenesisDecode
  audit: QuantumAuditRatios
  fused: string
}

let _decode: UuidnaDecode | null = null

export function uuidnaDecode(): UuidnaDecode {
  if (_decode) return _decode
  const audit = quantumAuditRatios()
  const fused = merkleGravity([audit.fused, audit.life.receipt])
  _decode = {
    polarities: audit.polarities,
    angles: audit.angles,
    sequence: audit.sequence,
    rosetta: audit.rosetta,
    life: audit.life,
    genesis: audit.genesis,
    audit,
    fused,
  }
  return _decode
}

let _cache: QuantumAuditRatios | null = null

/** quantumAuditRatios() — ratios, angles, polarities decoded from Sequence + Rosetta, fused to one receipt. */
export function quantumAuditRatios(): QuantumAuditRatios {
  if (_cache) return _cache
  const polarities = decodePolarities()
  const angles = decodeAngles()
  const seq = decodeSequenceLedger()
  const ros = decodeRosettaLedger()
  const life = decodeLife()
  const ax = axiomBalance()
  const wit = axiomWitness()
  const gen = genesisDecode()
  const inWings = wingTheoremCount()
  const inLedger = THEOREMS.length

  const kernel = bidirectionalRatio('kernel.axiom', wit.audited, wit.ledger, 'audited', 'ledger')
  const wing = bidirectionalRatio('wing.parity', inWings, inLedger, 'wing theorems', 'ledger keys')
  const axiomRatio = bidirectionalRatio(
    'axiom.vocabulary',
    ax.global.citedDefs,
    ax.global.bound,
    'cited defs',
    'bound theorems',
  )

  const ratios: BidirectionalRatio[] = [
    ...polarities.ratios,
    ...angles.ratios,
    ...ros.ratios,
    ...life.ratios,
    kernel,
    wing,
    axiomRatio,
    bidirectionalRatio('sequence.fixed', seq.fixed, seq.nonFixed, 'fixed', 'non-fixed'),
    bidirectionalRatio('genesis.deposits-theorems', gen.deposits, inLedger, 'deposits', 'theorems'),
  ]

  const fused = merkleGravity([
    polarities.receipt,
    angles.receipt,
    seq.receipt,
    ros.receipt,
    life.receipt,
    ax.fused,
    wit.receipt,
    toUuid(`genesis|${gen.deposits}|${gen.tip}|${gen.chainIntact}`),
    merkleGravity(ratios.map((r) => toUuid(`${r.id}|${r.a}|${r.b}|${r.balanced}`))),
  ])

  _cache = {
    polarities,
    angles,
    sequence: seq,
    rosetta: ros,
    life,
    axiom: { global: ax.global, active: ax.active, balanced: ax.balanced, fused: ax.fused },
    kernel,
    wing,
    genesis: gen,
    ratios,
    fused,
    honest:
      'Ratios, angles, polarities, and life DECODED — runSequence on every address, ±60° dash, 360/7° rosetta rays, ' +
      'uuidnaOS boot ground, living ledger, latent axioms, genesis chain. Folded order-invariant. Descriptive only.',
  }
  return _cache
}
