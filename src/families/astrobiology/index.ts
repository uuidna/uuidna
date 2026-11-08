import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASTROBIOLOGY — THE SEARCH FOR LIFE, AS ARITHMETIC. Where life can sit (the habitable zone), how many worlds might
 *  host it (Drake), how clear its traces are (biosignatures), how a cell spends energy (metabolism), how far past the
 *  edge it survives (extremophiles), how it rides between worlds (panspermia), how an atmosphere fills with oxygen, and
 *  how often the first chemistry runs (abiogenesis). Crosses to `chemistry` — life is chemistry that persists. A measure. */

const PROOF = 'astrobiology arithmetic (habitable zone, Drake, biosignature, metabolism, extremophile, panspermia, oxygenation, abiogenesis); integer proxies for the search for life; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'astrobiology', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `astrobiology.${name}`, params })

export class AstrobiologyFormulas {
  /** HABITABLE ZONE: the orbital radius proxy at a stellar luminosity and scale factor. value luminosity · factor. */
  static habitablezone(luminosity: number, factor: number): CrossFormula { return c('astrobiology-habitablezone', 'habitablezone(luminosity, factor) = luminosity · factor', luminosity * factor, nat(luminosity, factor), 'habitablezone', [luminosity, factor]) }
  /** DRAKE: communicating civilisations as a product of rate, life-fraction, and lifetime. value rate · fraction · lifetime. */
  static drake(rate: number, fraction: number, lifetime: number): CrossFormula { return c('astrobiology-drake', 'drake(rate, fraction, lifetime) = rate · fraction · lifetime', rate * fraction * lifetime, nat(rate, fraction, lifetime), 'drake', [rate, fraction, lifetime]) }
  /** BIOSIGNATURE: markers detected out of those sought, as a percentage. value ⌊detected · 100 / total⌋. */
  static biosignature(detected: number, total: number): CrossFormula { return c('astrobiology-biosignature', 'biosignature(detected, total) = ⌊detected · 100 / total⌋', total > 0 ? Math.floor((detected * 100) / total) : 0, nat(detected, total) && total > 0 && detected <= total, 'biosignature', [detected, total]) }
  /** METABOLISM: energy budget spread over the cells it feeds. value ⌊energy / cells⌋. */
  static metabolism(energy: number, cells: number): CrossFormula { return c('astrobiology-metabolism', 'metabolism(energy, cells) = ⌊energy / cells⌋', cells > 0 ? Math.floor(energy / cells) : 0, nat(energy, cells) && cells > 0, 'metabolism', [energy, cells]) }
  /** EXTREMOPHILE: the survival margin below a thermal limit. value max(0, limit − temp). */
  static extremophile(temp: number, limit: number): CrossFormula { return c('astrobiology-extremophile', 'extremophile(temp, limit) = max(0, limit − temp)', Math.max(0, limit - temp), nat(temp, limit), 'extremophile', [temp, limit]) }
  /** PANSPERMIA: seeds surviving a transit, scaled by survival rate over distance. value ⌊seeds · survival / distance⌋. */
  static panspermia(seeds: number, survival: number, distance: number): CrossFormula { return c('astrobiology-panspermia', 'panspermia(seeds, survival, distance) = ⌊seeds · survival / distance⌋', distance > 0 ? Math.floor((seeds * survival) / distance) : 0, nat(seeds, survival, distance) && distance > 0 && survival <= 100, 'panspermia', [seeds, survival, distance]) }
  /** OXYGENATION: atmospheric oxygen as a percentage of the whole. value ⌊oxygen · 100 / total⌋. */
  static oxygenation(oxygen: number, total: number): CrossFormula { return c('astrobiology-oxygenation', 'oxygenation(oxygen, total) = ⌊oxygen · 100 / total⌋', total > 0 ? Math.floor((oxygen * 100) / total) : 0, nat(oxygen, total) && total > 0 && oxygen <= total, 'oxygenation', [oxygen, total]) }
  /** ABIOGENESIS: cumulative prebiotic reactions over elapsed time. value reactions · time. */
  static abiogenesis(reactions: number, time: number): CrossFormula { return c('astrobiology-abiogenesis', 'abiogenesis(reactions, time) = reactions · time', reactions * time, nat(reactions, time), 'abiogenesis', [reactions, time]) }
}

for (const name of ['abiogenesis', 'biosignature', 'drake', 'extremophile', 'habitablezone', 'metabolism', 'oxygenation', 'panspermia'] as const)
  hexRegisterOf('astrobiology', name, (AstrobiologyFormulas[name] as (...x: unknown[]) => unknown).bind(AstrobiologyFormulas))
