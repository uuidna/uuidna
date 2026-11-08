import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TELECOM — THE NETWORK, AS ARITHMETIC (chosen by the registry). A link is numbers: bandwidth, propagation latency,
 *  traffic in erlangs, cell coverage, the signal-to-noise margin, packet delivery, jitter, and per-user capacity. Crosses
 *  to `obs`. A measure. */

const PROOF = 'telecom arithmetic (bandwidth, latency, erlang traffic, cell coverage, signal-to-noise, packet delivery, jitter, per-user capacity); a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const t = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'telecom', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `telecom.${name}`, params })

export class TelecomFormulas {
  /** BANDWIDTH in Mbps: data in megabytes over seconds (×8 to bits). value ⌊data · 8 / seconds⌋. */
  static bandwidth(data: number, seconds: number): CrossFormula { return t('telecom-bandwidth', 'bandwidth(data, seconds) = ⌊data · 8 / seconds⌋', seconds > 0 ? Math.floor((data * 8) / seconds) : 0, nat(data, seconds) && seconds > 0, 'bandwidth', [data, seconds]) }
  /** PROPAGATION LATENCY: distance over the signal speed. value ⌊distance / speed⌋. */
  static latency(distance: number, speed: number): CrossFormula { return t('telecom-latency', 'latency(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'latency', [distance, speed]) }
  /** TRAFFIC in erlangs: call-seconds over an hour. value ⌊calls · duration / 3600⌋. */
  static erlang(calls: number, duration: number): CrossFormula { return t('telecom-erlang', 'erlang(calls, duration) = ⌊calls · duration / 3600⌋', Math.floor((calls * duration) / 3600), nat(calls, duration), 'erlang', [calls, duration]) }
  /** CELL COVERAGE: area per cell. value ⌊area / cells⌋. */
  static coverage(area: number, cells: number): CrossFormula { return t('telecom-coverage', 'coverage(area, cells) = ⌊area / cells⌋', cells > 0 ? Math.floor(area / cells) : 0, nat(area, cells) && cells > 0, 'coverage', [area, cells]) }
  /** THE SIGNAL-TO-NOISE MARGIN in decibels (may be negative — below the noise floor). value power − noise. */
  static signal(power: number, noise: number): CrossFormula { return t('telecom-signal', 'signal(power, noise) = power − noise', power - noise, nat(power, noise), 'signal', [power, noise]) }
  /** PACKET DELIVERY as a percentage: received over sent. value ⌊received · 100 / sent⌋. */
  static packet(received: number, sent: number): CrossFormula { return t('telecom-packet', 'packet(received, sent) = ⌊received · 100 / sent⌋', sent > 0 ? Math.floor((received * 100) / sent) : 0, nat(received, sent) && sent > 0 && received <= sent, 'packet', [received, sent]) }
  /** JITTER: the spread between the longest and shortest delay. value max(0, max − min). */
  static jitter(max: number, min: number): CrossFormula { return t('telecom-jitter', 'jitter(max, min) = max(0, max − min)', Math.max(0, max - min), nat(max, min), 'jitter', [max, min]) }
  /** PER-USER CAPACITY: bandwidth shared across users. value ⌊bandwidth / users⌋. */
  static capacity(bandwidth: number, users: number): CrossFormula { return t('telecom-capacity', 'capacity(bandwidth, users) = ⌊bandwidth / users⌋', users > 0 ? Math.floor(bandwidth / users) : 0, nat(bandwidth, users) && users > 0, 'capacity', [bandwidth, users]) }
}

for (const name of ['bandwidth', 'capacity', 'coverage', 'erlang', 'jitter', 'latency', 'packet', 'signal'] as const)
  hexRegisterOf('telecom', name, (TelecomFormulas[name] as (...x: unknown[]) => unknown).bind(TelecomFormulas))
