import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENTERTAINMENT — MEDIA AND ITS AUDIENCE, AS ARITHMETIC (chosen by the registry). Content is numbers: the average rating,
 *  total runtime, box office, royalties, audience reached, the bitrate, audience share, and the completion rate. Crosses
 *  to `cross`. A measure. */

const PROOF = 'media arithmetic (average rating, runtime, box office, royalties, audience, bitrate, share, completion); a measure crossed through cross'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const n = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'entertainment', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `entertainment.${name}`, params })

export class EntertainmentFormulas {
  /** THE AVERAGE RATING (×10): the sum of scores over the votes. value ⌊sum · 10 / votes⌋. */
  static rating(sum: number, votes: number): CrossFormula { return n('entertainment-rating', 'rating(sum, votes) = ⌊sum · 10 / votes⌋', votes > 0 ? Math.floor((sum * 10) / votes) : 0, nat(sum, votes) && votes > 0, 'rating', [sum, votes]) }
  /** TOTAL RUNTIME: episodes at minutes each. value episodes · minutes. */
  static runtime(episodes: number, minutes: number): CrossFormula { return n('entertainment-runtime', 'runtime(episodes, minutes) = episodes · minutes', episodes * minutes, nat(episodes, minutes), 'runtime', [episodes, minutes]) }
  /** BOX OFFICE: tickets sold at a price. value tickets · price. */
  static boxoffice(tickets: number, price: number): CrossFormula { return n('entertainment-boxoffice', 'boxoffice(tickets, price) = tickets · price', tickets * price, nat(tickets, price), 'boxoffice', [tickets, price]) }
  /** ROYALTIES: `pct`% of revenue. value ⌊revenue · pct / 100⌋. */
  static royalty(revenue: number, pct: number): CrossFormula { return n('entertainment-royalty', 'royalty(revenue, pct) = ⌊revenue · pct / 100⌋', Math.floor((revenue * pct) / 100), nat(revenue, pct) && pct <= 100, 'royalty', [revenue, pct]) }
  /** AUDIENCE REACHED: `pct`% of the potential reach. value ⌊reach · pct / 100⌋. */
  static audience(reach: number, pct: number): CrossFormula { return n('entertainment-audience', 'audience(reach, pct) = ⌊reach · pct / 100⌋', Math.floor((reach * pct) / 100), nat(reach, pct) && pct <= 100, 'audience', [reach, pct]) }
  /** BITRATE in kbps: file size (kilobits) over duration in seconds. value ⌊size · 8 / duration⌋. */
  static bitrate(size: number, duration: number): CrossFormula { return n('entertainment-bitrate', 'bitrate(size, duration) = ⌊size · 8 / duration⌋', duration > 0 ? Math.floor((size * 8) / duration) : 0, nat(size, duration) && duration > 0, 'bitrate', [size, duration]) }
  /** AUDIENCE SHARE as a percentage: viewers over the total watching. value ⌊viewers · 100 / total⌋. */
  static share(viewers: number, total: number): CrossFormula { return n('entertainment-share', 'share(viewers, total) = ⌊viewers · 100 / total⌋', total > 0 ? Math.floor((viewers * 100) / total) : 0, nat(viewers, total) && total > 0 && viewers <= total, 'share', [viewers, total]) }
  /** COMPLETION RATE as a percentage: watched over the length. value ⌊watched · 100 / length⌋. */
  static completion(watched: number, length: number): CrossFormula { return n('entertainment-completion', 'completion(watched, length) = ⌊watched · 100 / length⌋', length > 0 ? Math.floor((watched * 100) / length) : 0, nat(watched, length) && length > 0 && watched <= length, 'completion', [watched, length]) }
}

for (const name of ['audience', 'bitrate', 'boxoffice', 'completion', 'rating', 'royalty', 'runtime', 'share'] as const)
  hexRegisterOf('entertainment', name, (EntertainmentFormulas[name] as (...x: unknown[]) => unknown).bind(EntertainmentFormulas))
