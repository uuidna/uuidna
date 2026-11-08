import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BROADCASTING — TRANSMISSION AS ARITHMETIC (chosen by the public-API registry, not by hand). Reaching an audience is
 *  numbers: reach of a population, share of a total, stream bitrate, delivery latency, coverage of a transmitter, the
 *  rating from a sample, the bandwidth of channels, and dropout over frames. Crosses to `frontend` — broadcasting is
 *  what the frontend plays. A measure. */

const PROOF = 'broadcasting arithmetic (reach, share, bitrate, latency, coverage, rating, bandwidth, dropout); a registry-chosen measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'broadcasting', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `broadcasting.${name}`, params })

export class BroadcastingFormulas {
  /** REACH: viewers as a percentage of the population. value ⌊viewers · 100 / population⌋. */
  static reach(viewers: number, population: number): CrossFormula { return c('broadcasting-reach', 'reach(viewers, population) = ⌊viewers · 100 / population⌋', population > 0 ? Math.floor((viewers * 100) / population) : 0, nat(viewers, population) && population > 0 && viewers <= population, 'reach', [viewers, population]) }
  /** SHARE: audience as a percentage of the total watching. value ⌊audience · 100 / total⌋. */
  static share(audience: number, total: number): CrossFormula { return c('broadcasting-share', 'share(audience, total) = ⌊audience · 100 / total⌋', total > 0 ? Math.floor((audience * 100) / total) : 0, nat(audience, total) && total > 0 && audience <= total, 'share', [audience, total]) }
  /** BITRATE: bits over seconds. value ⌊bits / seconds⌋. */
  static bitrate(bits: number, seconds: number): CrossFormula { return c('broadcasting-bitrate', 'bitrate(bits, seconds) = ⌊bits / seconds⌋', seconds > 0 ? Math.floor(bits / seconds) : 0, nat(bits, seconds) && seconds > 0, 'bitrate', [bits, seconds]) }
  /** LATENCY: delivery delay in milliseconds. value milliseconds. */
  static latency(milliseconds: number): CrossFormula { return c('broadcasting-latency', 'latency(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'latency', [milliseconds]) }
  /** COVERAGE: a transmitter over its radius, as a proxy area. value transmitter · radius. */
  static coverage(transmitter: number, radius: number): CrossFormula { return c('broadcasting-coverage', 'coverage(transmitter, radius) = transmitter · radius', transmitter * radius, nat(transmitter, radius), 'coverage', [transmitter, radius]) }
  /** RATING: households as a percentage of the sampled set. value ⌊households · 100 / sampled⌋. */
  static rating(households: number, sampled: number): CrossFormula { return c('broadcasting-rating', 'rating(households, sampled) = ⌊households · 100 / sampled⌋', sampled > 0 ? Math.floor((households * 100) / sampled) : 0, nat(households, sampled) && sampled > 0 && households <= sampled, 'rating', [households, sampled]) }
  /** BANDWIDTH: channels at a width each. value channels · width. */
  static bandwidth(channels: number, width: number): CrossFormula { return c('broadcasting-bandwidth', 'bandwidth(channels, width) = channels · width', channels * width, nat(channels, width), 'bandwidth', [channels, width]) }
  /** DROPOUT: lost frames as a percentage of the frames sent. value ⌊lost · 100 / frames⌋. */
  static dropout(lost: number, frames: number): CrossFormula { return c('broadcasting-dropout', 'dropout(lost, frames) = ⌊lost · 100 / frames⌋', frames > 0 ? Math.floor((lost * 100) / frames) : 0, nat(lost, frames) && frames > 0 && lost <= frames, 'dropout', [lost, frames]) }
}

for (const name of ['bandwidth', 'bitrate', 'coverage', 'dropout', 'latency', 'rating', 'reach', 'share'] as const)
  hexRegisterOf('broadcasting', name, (BroadcastingFormulas[name] as (...x: unknown[]) => unknown).bind(BroadcastingFormulas))
