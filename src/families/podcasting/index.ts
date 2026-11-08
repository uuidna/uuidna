import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PODCASTING — RELEASING AUDIO, AS ARITHMETIC (chosen by the public-API registry, not by hand). A show is numbers:
 *  downloads across episodes, how much of a run listeners finish, how many come back, the release cadence, the ad load,
 *  the encoded bitrate, chart rank, and growth over the last window. Crosses to `media` — podcasting is media released.
 *  A measure. */

const PROOF = 'podcasting arithmetic (downloads, completion, retention, cadence, ad load, bitrate, rank, growth); audio released on a schedule; a measure crossed to media'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'podcasting', dst: 'media', formula, value, proof: PROOF, ...extra }, holds, { name: `podcasting.${name}`, params })

export class PodcastingFormulas {
  /** DOWNLOADS: episodes at an average per episode. value episodes · average. */
  static downloads(episodes: number, average: number): CrossFormula { return c('podcasting-downloads', 'downloads(episodes, average) = episodes · average', episodes * average, nat(episodes, average), 'downloads', [episodes, average]) }
  /** COMPLETION as a percentage of the episode. value ⌊listened · 100 / duration⌋. */
  static completion(listened: number, duration: number): CrossFormula { return c('podcasting-completion', 'completion(listened, duration) = ⌊listened · 100 / duration⌋', duration > 0 ? Math.floor((listened * 100) / duration) : 0, nat(listened, duration) && duration > 0 && listened <= duration, 'completion', [listened, duration]) }
  /** RETENTION: returning listeners as a percentage of subscribers. value ⌊returning · 100 / subscribers⌋. */
  static retention(returning: number, subscribers: number): CrossFormula { return c('podcasting-retention', 'retention(returning, subscribers) = ⌊returning · 100 / subscribers⌋', subscribers > 0 ? Math.floor((returning * 100) / subscribers) : 0, nat(returning, subscribers) && subscribers > 0 && returning <= subscribers, 'retention', [returning, subscribers]) }
  /** CADENCE: episodes released per week over the window. value ⌊episodes / weeks⌋. */
  static cadence(episodes: number, weeks: number): CrossFormula { return c('podcasting-cadence', 'cadence(episodes, weeks) = ⌊episodes / weeks⌋', weeks > 0 ? Math.floor(episodes / weeks) : 0, nat(episodes, weeks) && weeks > 0, 'cadence', [episodes, weeks]) }
  /** AD LOAD: ad seconds as a percentage of the run minutes. value ⌊ads · 100 / minutes⌋. */
  static adload(ads: number, minutes: number): CrossFormula { return c('podcasting-adload', 'adload(ads, minutes) = ⌊ads · 100 / minutes⌋', minutes > 0 ? Math.floor((ads * 100) / minutes) : 0, nat(ads, minutes) && minutes > 0, 'adload', [ads, minutes]) }
  /** BITRATE: encoded size over the seconds. value ⌊size / seconds⌋. */
  static bitrate(size: number, seconds: number): CrossFormula { return c('podcasting-bitrate', 'bitrate(size, seconds) = ⌊size / seconds⌋', seconds > 0 ? Math.floor(size / seconds) : 0, nat(size, seconds) && seconds > 0, 'bitrate', [size, seconds]) }
  /** RANK: downloads against the chart threshold. value ⌊downloads / chart⌋. */
  static rank(downloads_: number, chart: number): CrossFormula { return c('podcasting-rank', 'rank(downloads_, chart) = ⌊downloads_ / chart⌋', chart > 0 ? Math.floor(downloads_ / chart) : 0, nat(downloads_, chart) && chart > 0, 'rank', [downloads_, chart]) }
  /** GROWTH over the last window, never negative. value max(0, current − previous). */
  static growth(current: number, previous: number): CrossFormula { return c('podcasting-growth', 'growth(current, previous) = max(0, current − previous)', Math.max(0, current - previous), nat(current, previous), 'growth', [current, previous]) }
}

for (const name of ['adload', 'bitrate', 'cadence', 'completion', 'downloads', 'growth', 'rank', 'retention'] as const)
  hexRegisterOf('podcasting', name, (PodcastingFormulas[name] as (...x: unknown[]) => unknown).bind(PodcastingFormulas))
