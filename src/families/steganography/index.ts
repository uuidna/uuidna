import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STEGANOGRAPHY — HIDING ONE MESSAGE INSIDE ANOTHER, AS ARITHMETIC. The craft is numbers: how many bits a cover can
 *  carry, what fraction of it the payload fills, the distortion a change leaves, signal over noise, how much survives an
 *  attack, how often a steganalysis test fires, the bits embedded per coefficient, and the fraction recovered. Crosses to
 *  `code` — hiding is a coding of one stream inside another. A measure. */

const PROOF = 'steganography arithmetic (capacity, payload ratio, distortion, psnr, robustness, detectability, embedding rate, extraction); hiding a message inside a cover; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'steganography', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `steganography.${name}`, params })

export class SteganographyFormulas {
  /** CAPACITY: the bits a cover carries, pixels at a bits-per-pixel rate. value pixels · bitsper. */
  static capacity(pixels: number, bitsper: number): CrossFormula { return c('steganography-capacity', 'capacity(pixels, bitsper) = pixels · bitsper', pixels * bitsper, nat(pixels, bitsper), 'capacity', [pixels, bitsper]) }
  /** PAYLOAD ratio: the hidden bits as a percentage of the cover. value ⌊hidden · 100 / cover⌋. */
  static payload(hidden: number, cover: number): CrossFormula { return c('steganography-payload', 'payload(hidden, cover) = ⌊hidden · 100 / cover⌋', cover > 0 ? Math.floor((hidden * 100) / cover) : 0, nat(hidden, cover) && cover > 0 && hidden <= cover, 'payload', [hidden, cover]) }
  /** DISTORTION: the changed samples as a percentage of the total. value ⌊changed · 100 / total⌋. */
  static distortion(changed: number, total: number): CrossFormula { return c('steganography-distortion', 'distortion(changed, total) = ⌊changed · 100 / total⌋', total > 0 ? Math.floor((changed * 100) / total) : 0, nat(changed, total) && total > 0 && changed <= total, 'distortion', [changed, total]) }
  /** PSNR: signal over noise as a percentage. value ⌊signal · 100 / noise⌋. */
  static psnr(signal: number, noise: number): CrossFormula { return c('steganography-psnr', 'psnr(signal, noise) = ⌊signal · 100 / noise⌋', noise > 0 ? Math.floor((signal * 100) / noise) : 0, nat(signal, noise) && noise > 0, 'psnr', [signal, noise]) }
  /** ROBUSTNESS: the attacks survived as a percentage of those tried. value ⌊survived · 100 / attacks⌋. */
  static robustness(survived: number, attacks: number): CrossFormula { return c('steganography-robustness', 'robustness(survived, attacks) = ⌊survived · 100 / attacks⌋', attacks > 0 ? Math.floor((survived * 100) / attacks) : 0, nat(survived, attacks) && attacks > 0 && survived <= attacks, 'robustness', [survived, attacks]) }
  /** DETECTABILITY: the steganalysis tests that fired, as a percentage. value ⌊detected · 100 / tests⌋. */
  static detectability(detected: number, tests: number): CrossFormula { return c('steganography-detectability', 'detectability(detected, tests) = ⌊detected · 100 / tests⌋', tests > 0 ? Math.floor((detected * 100) / tests) : 0, nat(detected, tests) && tests > 0 && detected <= tests, 'detectability', [detected, tests]) }
  /** EMBEDDING rate: bits per coefficient as a percentage. value ⌊bits · 100 / coefficients⌋. */
  static embedding(bits: number, coefficients: number): CrossFormula { return c('steganography-embedding', 'embedding(bits, coefficients) = ⌊bits · 100 / coefficients⌋', coefficients > 0 ? Math.floor((bits * 100) / coefficients) : 0, nat(bits, coefficients) && coefficients > 0, 'embedding', [bits, coefficients]) }
  /** EXTRACTION: the recovered bits as a percentage of those embedded. value ⌊recovered · 100 / embedded⌋. */
  static extraction(recovered: number, embedded: number): CrossFormula { return c('steganography-extraction', 'extraction(recovered, embedded) = ⌊recovered · 100 / embedded⌋', embedded > 0 ? Math.floor((recovered * 100) / embedded) : 0, nat(recovered, embedded) && embedded > 0 && recovered <= embedded, 'extraction', [recovered, embedded]) }
}

for (const name of ['capacity', 'detectability', 'distortion', 'embedding', 'extraction', 'payload', 'psnr', 'robustness'] as const)
  hexRegisterOf('steganography', name, (SteganographyFormulas[name] as (...x: unknown[]) => unknown).bind(SteganographyFormulas))
