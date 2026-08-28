// aspects — COMPUTE STRUCTURE ACROSS NAMED ASPECTS. Meaning stays the reader's (`meaning` is null, as
// deepResearch already states). What computes: resonance (reflects — rare concepts loud, stopwords silent),
// harvest (decide() on arithmetic the aspect states), and whether loud theorem keys name the OPERATION last
// (the Glagolitic law, a person-writing-a-wing rule, not a kernel gate).
//
// One receipt over the set of aspect reflections + harvest receipts — order-invariant. Integrity, not semantics.
import { reflects, type Reflected } from './reflects.js'
import { harvestFragments, mintLeadsFromText, type MintLead } from './harvest.js'
import { merkleFold, toUuid } from './address.js'
import { hexbitDoorOf, type HexbitDoor } from './hexbit/index.js'

export interface Aspect {
  id: string
  text: string
}

export interface AspectNaming {
  key: string
  last: string
  operationLast: boolean
}

export interface AspectRow {
  id: string
  peak: number
  rung: number
  receipt: string
  spectrum: { concept: string; reach: number; weight: number }[]
  loud: Reflected[]
  harvest: MintLead[]
  naming: AspectNaming[]
}

export interface AspectCensus extends HexbitDoor {
  meaning: null
  aspects: AspectRow[]
  silent: string[]
  receipt: string
  honest: string
}

/** Last-token operations the Glagolitic law names — the verb, never the object. Not a closed unlock set. */
const OPERATION_LAST = new Set([
  'additive', 'subtracts', 'ignores', 'forces', 'prime', 'involution', 'invariant',
  'equals', 'folds', 'doubles', 'reflects', 'verifies', 'seals', 'costs', 'beats',
  'spans', 'splits', 'meets', 'closes', 'holds', 'reads', 'caught', 'named', 'dimension',
  'add', 'conserved', 'finite', 'linear', 'empty', 'free',
])

const operationLast = (key: string): boolean => {
  const last = key.split('_').pop() ?? ''
  return OPERATION_LAST.has(last)
}

const LOUD_FRAC = 35  // keep matches at ≥ 35/100 of peak — integer, no float

/** loudOf(matches, peak) → the aspect's own loud band. Pure. */
export function loudOf(matches: readonly Reflected[], peak: number, take = 5): Reflected[] {
  const computed = (peak * LOUD_FRAC - ((peak * LOUD_FRAC) % 100)) / 100
  const floor = peak <= 0 ? 1 : (computed < 1 ? 1 : computed)
  return matches.filter((m) => m.resonance >= floor).slice(0, take)
}

/** aspectCensus(aspects) → structure across every named aspect, meaning null. Deterministic. */
export function aspectCensus(aspects: readonly Aspect[]): AspectCensus {
  const rows: AspectRow[] = aspects.map((a) => {
    const r = reflects(a.text)
    const loud = loudOf(r.matches, r.peak)
    const harvest = mintLeadsFromText(a.id, r.receipt, a.text)
    const naming: AspectNaming[] = loud.map((m) => {
      const last = m.key.split('_').pop() ?? ''
      return { key: m.key, last, operationLast: operationLast(m.key) }
    })
    return {
      id: a.id,
      peak: r.peak,
      rung: r.count,
      receipt: r.receipt,
      spectrum: r.spectrum.filter((s) => s.weight > 0).slice(0, 8),
      loud,
      harvest,
      naming,
    }
  })
  const silent = rows.filter((row) => row.loud.length === 0).map((row) => row.id)
  const folded = [...rows].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  const receipt = folded.length
    ? merkleFold(folded.map((row) => toUuid([row.id, row.receipt, ...row.harvest.map((h) => h.receipt)].join('|'))))
    : toUuid('aspects:empty')
  return {
    meaning: null,
    aspects: rows,
    silent,
    receipt,
    ...hexbitDoorOf(receipt),
    honest:
      'Meaning is null — uuidna fingerprints structure, never hidden sense. Each aspect rings sealed theorems by ' +
      'resonance amplitude (rare words loud), harvests arithmetic decide() can smelt, and notes whether loud keys ' +
      'name the operation last (Glagolitic). A silent aspect has no loud neighbour; silence never refutes. ' +
      'Harvest is a candidate, never a seal. Recomputable. Integrity.',
  }
}
