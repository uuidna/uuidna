import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRANSFORMER — THE IRON-CORE MACHINE, AS ARITHMETIC. A transformer is a ratio: the turns ratio sets how primary and
 *  secondary voltages relate, the volt-amperes carried, the efficiency of the transfer, the impedance seen, the voltage
 *  regulation between no load and full load, and the turns a winding needs. Crosses to `electrical` — a transformer is
 *  electrical apparatus. A measure. */

const PROOF = 'transformer arithmetic (turns ratio, secondary/primary voltage, power VA, efficiency, impedance, regulation, winding turns); the iron-core machine as a ratio; a measure crossed to electrical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'transformer', dst: 'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `transformer.${name}`, params })

export class TransformerFormulas {
  /** TURNS RATIO: primary turns over secondary turns. value ⌊np / ns⌋. */
  static ratio(np: number, ns: number): CrossFormula { return c('transformer-ratio', 'ratio(np, ns) = ⌊np / ns⌋', ns > 0 ? Math.floor(np / ns) : 0, nat(np, ns) && ns > 0, 'ratio', [np, ns]) }
  /** SECONDARY VOLTAGE: primary voltage scaled by the turns. value ⌊vp · ns / np⌋. */
  static secondary(vp: number, np: number, ns: number): CrossFormula { return c('transformer-secondary', 'secondary(vp, np, ns) = ⌊vp · ns / np⌋', np > 0 ? Math.floor((vp * ns) / np) : 0, nat(vp, np, ns) && np > 0, 'secondary', [vp, np, ns]) }
  /** PRIMARY VOLTAGE: secondary voltage scaled by the turns. value ⌊vs · np / ns⌋. */
  static primary(vs: number, ns: number, np: number): CrossFormula { return c('transformer-primary', 'primary(vs, ns, np) = ⌊vs · np / ns⌋', ns > 0 ? Math.floor((vs * np) / ns) : 0, nat(vs, ns, np) && ns > 0, 'primary', [vs, ns, np]) }
  /** POWER: volt-amperes carried. value volts · amps. */
  static power(volts: number, amps: number): CrossFormula { return c('transformer-power', 'power(volts, amps) = volts · amps', volts * amps, nat(volts, amps), 'power', [volts, amps]) }
  /** EFFICIENCY as a percentage: output power over input power. value ⌊pout · 100 / pin⌋. */
  static efficiency(pout: number, pin: number): CrossFormula { return c('transformer-efficiency', 'efficiency(pout, pin) = ⌊pout · 100 / pin⌋', pin > 0 ? Math.floor((pout * 100) / pin) : 0, nat(pout, pin) && pin > 0 && pout <= pin, 'efficiency', [pout, pin]) }
  /** IMPEDANCE: voltage over current. value ⌊volts / amps⌋. */
  static impedance(volts: number, amps: number): CrossFormula { return c('transformer-impedance', 'impedance(volts, amps) = ⌊volts / amps⌋', amps > 0 ? Math.floor(volts / amps) : 0, nat(volts, amps) && amps > 0, 'impedance', [volts, amps]) }
  /** VOLTAGE REGULATION as a percentage: the drop from no load to full load. value ⌊max(0, vnl − vfl) · 100 / vfl⌋. */
  static regulation(vnl: number, vfl: number): CrossFormula { return c('transformer-regulation', 'regulation(vnl, vfl) = ⌊max(0, vnl − vfl) · 100 / vfl⌋', vfl > 0 ? Math.floor((Math.max(0, vnl - vfl) * 100) / vfl) : 0, nat(vnl, vfl) && vfl > 0 && vnl >= vfl, 'regulation', [vnl, vfl]) }
  /** WINDING TURNS: the turns a winding needs at a volts-per-turn. value ⌊volts / voltsPerTurn⌋. */
  static turns(volts: number, voltsPerTurn: number): CrossFormula { return c('transformer-turns', 'turns(volts, voltsPerTurn) = ⌊volts / voltsPerTurn⌋', voltsPerTurn > 0 ? Math.floor(volts / voltsPerTurn) : 0, nat(volts, voltsPerTurn) && voltsPerTurn > 0, 'turns', [volts, voltsPerTurn]) }
}

for (const name of ['efficiency', 'impedance', 'power', 'primary', 'ratio', 'regulation', 'secondary', 'turns'] as const)
  hexRegisterOf('transformer', name, (TransformerFormulas[name] as (...x: unknown[]) => unknown).bind(TransformerFormulas))
