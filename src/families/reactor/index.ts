import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { HeatFormulas, heatThresholdOf } from '../heat/index.js'
import { PlasmaFormulas } from '../plasma/index.js'

/**
 * REACTOR — refactors identifiable heat into cold fusion.
 * Matches heat by CrossFormula field `kind: 'heat'` (heat.identity / every heat.* seal), cools with heat.cooling,
 * then plasma.fusion of the signal gain. Numbers are heat.* and plasma.fusion only — no invented physics.
 * Crosses to `heat`. A measure.
 */

const PROOF = 'reactor: heat.kind → heat.cooling → plasma.fusion(signal after, signal before); cold when heat.signal(cooled) > 0; tree formulas only'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const r = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ kind: 'reactor' as const, id, src: 'reactor', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `reactor.${name}`, params })

/** True when a sealed reading carries the deepest heat mark (kind field), not prose. */
export const heatIdentifiableOf = (row: { kind?: unknown; identity?: unknown; src?: unknown }): boolean =>
  row.kind === 'heat' || row.identity === 'heat' || row.src === 'heat'

export class ReactorFormulas {
  /** REFACTOR: cool identifiable heat k ways. Value = heat.cooling(mK, ways). Holds when kind heat and cooled signal is cold (S > 0). */
  static refactor(millikelvin: number, ways: number): CrossFormula {
    const id = HeatFormulas.identity(millikelvin)
    const cooled = HeatFormulas.cooling(millikelvin, ways)
    const signal = HeatFormulas.signal(cooled.value)
    const cold = signal.value > 0
    return r(
      'reactor-refactor',
      'refactor(mK, ways) = heat.cooling(mK, ways) when heat.identity(mK).kind = heat and signal(cooled) > 0',
      cooled.value,
      nat(millikelvin, ways) && ways > 0 && heatIdentifiableOf(id as { kind?: unknown }) && cooled.holds === true && cold,
      'refactor',
      [millikelvin, ways],
      { heat: id.hex, cooled: cooled.value, signal: signal.value, cold, heatKind: (id as { kind?: unknown }).kind },
    )
  }

  /** COLD FUSION: cool heat, then plasma.fusion of signal-after over signal-before (gain from cooling). Value 0 while still hot. */
  static coldfusion(millikelvin: number, ways: number): CrossFormula {
    const id = HeatFormulas.identity(millikelvin)
    const cooled = HeatFormulas.cooling(millikelvin, ways)
    const before = HeatFormulas.signal(millikelvin).value
    const after = HeatFormulas.signal(cooled.value).value
    const cold = after > 0
    const fusion = PlasmaFormulas.fusion(after, Math.max(before, 1))
    const value = cold ? fusion.value : 0
    return r(
      'reactor-coldfusion',
      'coldfusion(mK, ways) = plasma.fusion(signal(cooled), signal(mK)) when cold, else 0',
      value,
      nat(millikelvin, ways) && ways > 0 && heatIdentifiableOf(id as { kind?: unknown }) && cooled.holds === true && cold && fusion.holds === true,
      'coldfusion',
      [millikelvin, ways],
      { heat: id.hex, cooled: cooled.value, before, after, cold, fusion: fusion.value, fusionHex: fusion.hex },
    )
  }

  /** WAYS: heat.ways(mK, heatThresholdOf()) — splits the reactor applies to reach the heat family's cold threshold. */
  static ways(millikelvin: number): CrossFormula {
    const id = HeatFormulas.identity(millikelvin)
    const target = heatThresholdOf()
    const k = HeatFormulas.ways(millikelvin, target)
    return r(
      'reactor-ways',
      'ways(mK) = heat.ways(mK, heatThresholdOf()) — splits to refactor heat to cold',
      k.value,
      nat(millikelvin) && heatIdentifiableOf(id as { kind?: unknown }) && k.holds === true,
      'ways',
      [millikelvin],
      { heat: id.hex, target },
    )
  }
}

for (const name of ['coldfusion', 'refactor', 'ways'] as const)
  hexRegisterOf('reactor', name, (ReactorFormulas[name] as (...x: unknown[]) => unknown).bind(ReactorFormulas))

/**
 * Live zero / temp / time / heat / cold-fusion integers for README and homepage tables.
 * Optional heat-receipt fields supply measured temp/time/hot/cold; formulas fill the rest (no invented numbers).
 */
export const reactorStatsOf = (heat?: {
  hottestMilliKelvin?: number
  seconds?: number
  hot?: number
  cold?: number
  files?: number
  threshold?: number
}) => {
  const threshold = heat?.threshold ?? heatThresholdOf()
  const temp = typeof heat?.hottestMilliKelvin === 'number' ? heat.hottestMilliKelvin : threshold
  const ways = ReactorFormulas.ways(temp)
  const id = HeatFormulas.identity(temp)
  const zero = HeatFormulas.landauer(0, temp).value
  // Wall seconds from heat-receipt when present; otherwise 0 (unmeasured — a reading, not a folded integer).
  const time = typeof heat?.seconds === 'number' ? heat.seconds : 0
  const cf = ReactorFormulas.coldfusion(temp, ways.value)
  const refactor = ReactorFormulas.refactor(temp, ways.value)
  return {
    kind: 'reactor-stats' as const,
    zero,
    temp,
    time,
    heat: typeof heat?.hot === 'number' ? heat.hot : HeatFormulas.signal(temp).value === 0 ? 1 : 0,
    cold: typeof heat?.cold === 'number' ? heat.cold : HeatFormulas.signal(temp).value > 0 ? 1 : 0,
    coldFusion: cf.value,
    threshold,
    ways: ways.value,
    cooled: refactor.value,
    heatIdentity: id.hex ?? null,
    heatKind: (id as { kind?: unknown }).kind === 'heat',
    coldFusionHex: cf.hex ?? null,
    holds: zero === 0 && heatIdentifiableOf(id as { kind?: unknown }) && ways.holds === true,
  }
}
