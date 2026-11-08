import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MODULATION — IMPRESSING A MESSAGE ON A CARRIER, AS ARITHMETIC. A radio link is numbers: the modulation index, the
 *  bandwidth a channel needs, the spectral lines it spreads into, the frequency deviation, the carrier power, the symbols
 *  and bits it carries each second, and how efficiently it uses its spectrum. Crosses to `signal` — modulation is how a
 *  signal is shaped onto the air. A measure. */

const PROOF = 'modulation arithmetic (index, Carson bandwidth, sidebands, deviation, carrier power, symbol rate, bit rate, spectral efficiency); impressing a message on a carrier; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'modulation', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `modulation.${name}`, params })

export class ModulationFormulas {
  /** MODULATION INDEX as a percentage: the peak against the carrier. value ⌊peak · 100 / carrier⌋. */
  static index(peak: number, carrier: number): CrossFormula { return c('modulation-index', 'index(peak, carrier) = ⌊peak · 100 / carrier⌋', carrier > 0 ? Math.floor((peak * 100) / carrier) : 0, nat(peak, carrier) && carrier > 0, 'index', [peak, carrier]) }
  /** CARSON BANDWIDTH: twice the sum of deviation and the top modulating frequency. value 2 · (dev + fmod). */
  static bandwidth(dev: number, fmod: number): CrossFormula { return c('modulation-bandwidth', 'bandwidth(dev, fmod) = 2 · (dev + fmod)', 2 * (dev + fmod), nat(dev, fmod), 'bandwidth', [dev, fmod]) }
  /** SIDEBANDS: the total spectral lines for a given number of significant pairs, carrier included. value 2 · pairs + 1. */
  static sidebands(pairs: number): CrossFormula { return c('modulation-sidebands', 'sidebands(pairs) = 2 · pairs + 1', 2 * pairs + 1, nat(pairs), 'sidebands', [pairs]) }
  /** FREQUENCY DEVIATION: the index times the modulating frequency. value index · fmod. */
  static deviation(index: number, fmod: number): CrossFormula { return c('modulation-deviation', 'deviation(index, fmod) = index · fmod', index * fmod, nat(index, fmod), 'deviation', [index, fmod]) }
  /** CARRIER POWER into a load: voltage squared over resistance. value ⌊volt² / res⌋. */
  static carrierpower(volt: number, res: number): CrossFormula { return c('modulation-carrierpower', 'carrierpower(volt, res) = ⌊volt² / res⌋', res > 0 ? Math.floor((volt * volt) / res) : 0, nat(volt, res) && res > 0, 'carrierpower', [volt, res]) }
  /** SYMBOL RATE: the bit rate divided by the bits each symbol carries. value ⌊bits / perSymbol⌋. */
  static symbolrate(bits: number, perSymbol: number): CrossFormula { return c('modulation-symbolrate', 'symbolrate(bits, perSymbol) = ⌊bits / perSymbol⌋', perSymbol > 0 ? Math.floor(bits / perSymbol) : 0, nat(bits, perSymbol) && perSymbol > 0, 'symbolrate', [bits, perSymbol]) }
  /** BIT RATE: the symbol rate times the bits each symbol carries. value baud · perSymbol. */
  static bitrate(baud: number, perSymbol: number): CrossFormula { return c('modulation-bitrate', 'bitrate(baud, perSymbol) = baud · perSymbol', baud * perSymbol, nat(baud, perSymbol), 'bitrate', [baud, perSymbol]) }
  /** SPECTRAL EFFICIENCY: the bit rate against the bandwidth, as a percentage. value ⌊bits · 100 / bw⌋. */
  static efficiency(bits: number, bw: number): CrossFormula { return c('modulation-efficiency', 'efficiency(bits, bw) = ⌊bits · 100 / bw⌋', bw > 0 ? Math.floor((bits * 100) / bw) : 0, nat(bits, bw) && bw > 0, 'efficiency', [bits, bw]) }
}

for (const name of ['bandwidth', 'bitrate', 'carrierpower', 'deviation', 'efficiency', 'index', 'sidebands', 'symbolrate'] as const)
  hexRegisterOf('modulation', name, (ModulationFormulas[name] as (...x: unknown[]) => unknown).bind(ModulationFormulas))
