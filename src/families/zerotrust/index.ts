import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ZEROTRUST — DEFENSIVE POSTURE, AS ARITHMETIC (never trust, always verify). A posture is numbers: the trust score from
 *  passing signals, the microsegments an asset count needs, the verification rate, the blast radius of one breach, the
 *  continuous re-auth count, device-posture compliance, policy coverage, and the attack surface. Crosses to `networking`
 *  — zero trust is the discipline imposed on the network. A measure. */

const PROOF = 'zerotrust arithmetic (trust score, microsegments, verification rate, blast radius, continuous auth, device posture, policy coverage, attack surface); never trust always verify; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'zerotrust', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `zerotrust.${name}`, params })

export class ZerotrustFormulas {
  /** TRUST SCORE: passing signals as a percentage of the signals weighed. value ⌊signals · 100 / maxsignals⌋. */
  static trustscore(signals: number, maxsignals: number): CrossFormula { return c('zerotrust-trustscore', 'trustscore(signals, maxsignals) = ⌊signals · 100 / maxsignals⌋', maxsignals > 0 ? Math.floor((signals * 100) / maxsignals) : 0, nat(signals, maxsignals) && maxsignals > 0 && signals <= maxsignals, 'trustscore', [signals, maxsignals]) }
  /** MICROSEGMENTS: the segments an asset count needs at a per-segment capacity. value ⌈assets / perSegment⌉. */
  static microsegments(assets: number, perSegment: number): CrossFormula { return c('zerotrust-microsegments', 'microsegments(assets, perSegment) = ⌈assets / perSegment⌉', perSegment > 0 ? Math.ceil(assets / perSegment) : 0, nat(assets, perSegment) && perSegment > 0, 'microsegments', [assets, perSegment]) }
  /** VERIFICATION RATE: verified requests as a percentage of requests. value ⌊verified · 100 / requests⌋. */
  static verificationrate(verified: number, requests: number): CrossFormula { return c('zerotrust-verificationrate', 'verificationrate(verified, requests) = ⌊verified · 100 / requests⌋', requests > 0 ? Math.floor((verified * 100) / requests) : 0, nat(verified, requests) && requests > 0 && verified <= requests, 'verificationrate', [verified, requests]) }
  /** BLAST RADIUS: assets reachable when one segment is breached. value ⌊assets / segments⌋. */
  static blastradius(assets: number, segments: number): CrossFormula { return c('zerotrust-blastradius', 'blastradius(assets, segments) = ⌊assets / segments⌋', segments > 0 ? Math.floor(assets / segments) : 0, nat(assets, segments) && segments > 0, 'blastradius', [assets, segments]) }
  /** CONTINUOUS AUTH: the re-auth events across a window at a fixed interval. value ⌊window / interval⌋. */
  static continuousauth(window: number, interval: number): CrossFormula { return c('zerotrust-continuousauth', 'continuousauth(window, interval) = ⌊window / interval⌋', interval > 0 ? Math.floor(window / interval) : 0, nat(window, interval) && interval > 0, 'continuousauth', [window, interval]) }
  /** DEVICE POSTURE: compliant devices as a percentage of the fleet. value ⌊compliant · 100 / total⌋. */
  static deviceposture(compliant: number, total: number): CrossFormula { return c('zerotrust-deviceposture', 'deviceposture(compliant, total) = ⌊compliant · 100 / total⌋', total > 0 ? Math.floor((compliant * 100) / total) : 0, nat(compliant, total) && total > 0 && compliant <= total, 'deviceposture', [compliant, total]) }
  /** POLICY COVERAGE: resources under an enforced policy as a percentage. value ⌊enforced · 100 / resources⌋. */
  static policycoverage(enforced: number, resources: number): CrossFormula { return c('zerotrust-policycoverage', 'policycoverage(enforced, resources) = ⌊enforced · 100 / resources⌋', resources > 0 ? Math.floor((enforced * 100) / resources) : 0, nat(enforced, resources) && resources > 0 && enforced <= resources, 'policycoverage', [enforced, resources]) }
  /** ATTACK SURFACE: exposed endpoints across the services each runs. value endpoints · services. */
  static attacksurface(endpoints: number, services: number): CrossFormula { return c('zerotrust-attacksurface', 'attacksurface(endpoints, services) = endpoints · services', endpoints * services, nat(endpoints, services), 'attacksurface', [endpoints, services]) }
}

for (const name of ['attacksurface', 'blastradius', 'continuousauth', 'deviceposture', 'microsegments', 'policycoverage', 'trustscore', 'verificationrate'] as const)
  hexRegisterOf('zerotrust', name, (ZerotrustFormulas[name] as (...x: unknown[]) => unknown).bind(ZerotrustFormulas))
