import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FEEDLOT — CATTLE FINISHING, AS ARITHMETIC (chosen by the public-API registry, not by hand). Finishing cattle is
 *  numbers: the cost of a ration, average daily gain, feed conversion, dry-matter intake, the days a steer stays on
 *  feed, the break-even price, the ration's protein share, and its energy density. Crosses to `nutrition` — a feedlot
 *  is nutrition at the scale of a herd. A measure. */

const PROOF = 'feedlot arithmetic (ration cost, daily gain, feed efficiency, dry intake, days on feed, break-even, protein ratio, energy density); a herd-scale measure crossed to nutrition'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'feedlot', dst: 'nutrition', formula, value, proof: PROOF, ...extra }, holds, { name: `feedlot.${name}`, params })

export class FeedlotFormulas {
  /** RATION COST: pounds of feed at a per-pound rate. value pounds · rate. */
  static rationcost(pounds: number, rate: number): CrossFormula { return c('feedlot-rationcost', 'rationcost(pounds, rate) = pounds · rate', pounds * rate, nat(pounds, rate), 'rationcost', [pounds, rate]) }
  /** AVERAGE DAILY GAIN: pounds gained over days. value ⌊gain / days⌋. */
  static dailygain(gain: number, days: number): CrossFormula { return c('feedlot-dailygain', 'dailygain(gain, days) = ⌊gain / days⌋', days > 0 ? Math.floor(gain / days) : 0, nat(gain, days) && days > 0, 'dailygain', [gain, days]) }
  /** DAYS ON FEED: pounds still to gain at a daily rate. value ⌈(target − start) / adg⌉. */
  static daysonfeed(target: number, start: number, adg: number): CrossFormula { return c('feedlot-daysonfeed', 'daysonfeed(target, start, adg) = ⌈max(0, target − start) / adg⌉', adg > 0 ? Math.ceil(Math.max(0, target - start) / adg) : 0, nat(target, start, adg) && adg > 0, 'daysonfeed', [target, start, adg]) }
  /** DRY-MATTER INTAKE per day: total pounds over days. value ⌊total / days⌋. */
  static dryintake(total: number, days: number): CrossFormula { return c('feedlot-dryintake', 'dryintake(total, days) = ⌊total / days⌋', days > 0 ? Math.floor(total / days) : 0, nat(total, days) && days > 0, 'dryintake', [total, days]) }
  /** FEED EFFICIENCY (conversion): pounds of feed per pound of gain. value ⌊feed / gain⌋. */
  static feedefficiency(feed: number, gain: number): CrossFormula { return c('feedlot-feedefficiency', 'feedefficiency(feed, gain) = ⌊feed / gain⌋', gain > 0 ? Math.floor(feed / gain) : 0, nat(feed, gain) && gain > 0, 'feedefficiency', [feed, gain]) }
  /** ENERGY DENSITY: megacalories over pounds of feed. value ⌊energy / pounds⌋. */
  static energydensity(energy: number, pounds: number): CrossFormula { return c('feedlot-energydensity', 'energydensity(energy, pounds) = ⌊energy / pounds⌋', pounds > 0 ? Math.floor(energy / pounds) : 0, nat(energy, pounds) && pounds > 0, 'energydensity', [energy, pounds]) }
  /** PROTEIN RATIO: protein pounds as a percentage of the ration. value ⌊protein · 100 / total⌋. */
  static proteinratio(protein: number, total: number): CrossFormula { return c('feedlot-proteinratio', 'proteinratio(protein, total) = ⌊protein · 100 / total⌋', total > 0 ? Math.floor((protein * 100) / total) : 0, nat(protein, total) && total > 0 && protein <= total, 'proteinratio', [protein, total]) }
  /** BREAK-EVEN PRICE: cents per pound to cover cost at a sale weight. value ⌊cost · 100 / weight⌋. */
  static breakeven(cost: number, weight: number): CrossFormula { return c('feedlot-breakeven', 'breakeven(cost, weight) = ⌊cost · 100 / weight⌋', weight > 0 ? Math.floor((cost * 100) / weight) : 0, nat(cost, weight) && weight > 0, 'breakeven', [cost, weight]) }
}

for (const name of ['breakeven', 'dailygain', 'daysonfeed', 'dryintake', 'energydensity', 'feedefficiency', 'proteinratio', 'rationcost'] as const)
  hexRegisterOf('feedlot', name, (FeedlotFormulas[name] as (...x: unknown[]) => unknown).bind(FeedlotFormulas))
