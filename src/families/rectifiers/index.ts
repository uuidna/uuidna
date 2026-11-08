import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** RECTIFIERS — TURNING ALTERNATING CURRENT INTO DIRECT, AS ARITHMETIC. A rectifier is numbers: the average (DC) level it
 *  delivers, the ripple left on it, how efficiently AC power becomes DC, the peak inverse voltage a diode must stand, the
 *  form factor, the ripple factor, the load regulation, and the angle each cycle conducts. Crosses to `electrical` —
 *  rectification is an electrical measure. A measure. */

const PROOF = 'rectifier arithmetic (average DC, ripple, efficiency, peak inverse voltage, form factor, ripple factor, regulation, conduction angle); turning AC into DC as integer measure; a measure crossed to electrical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rectifiers', dst: 'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `rectifiers.${name}`, params })

export class RectifiersFormulas {
  /** AVERAGE (DC) LEVEL: summed rectified samples over their count. value ⌊sum / samples⌋. */
  static average(sum: number, samples: number): CrossFormula { return c('rectifiers-average', 'average(sum, samples) = ⌊sum / samples⌋', samples > 0 ? Math.floor(sum / samples) : 0, nat(sum, samples) && samples > 0, 'average', [sum, samples]) }
  /** RIPPLE: peak-to-peak ripple voltage left on the output. value max(0, vmax − vmin). */
  static ripple(vmax: number, vmin: number): CrossFormula { return c('rectifiers-ripple', 'ripple(vmax, vmin) = max(0, vmax − vmin)', Math.max(0, vmax - vmin), nat(vmax, vmin), 'ripple', [vmax, vmin]) }
  /** EFFICIENCY: DC power delivered over AC power drawn, as a percentage. value ⌊dc · 100 / ac⌋. */
  static efficiency(dc: number, ac: number): CrossFormula { return c('rectifiers-efficiency', 'efficiency(dc, ac) = ⌊dc · 100 / ac⌋', ac > 0 ? Math.floor((dc * 100) / ac) : 0, nat(dc, ac) && ac > 0, 'efficiency', [dc, ac]) }
  /** PEAK INVERSE VOLTAGE: the peak voltage times the topology factor (1 bridge, 2 centre-tap). value vm · factor. */
  static pivrating(vm: number, factor: number): CrossFormula { return c('rectifiers-pivrating', 'pivrating(vm, factor) = vm · factor', vm * factor, nat(vm, factor), 'pivrating', [vm, factor]) }
  /** FORM FACTOR: RMS over average, as a percentage. value ⌊rms · 100 / avg⌋. */
  static formfactor(rms: number, avg: number): CrossFormula { return c('rectifiers-formfactor', 'formfactor(rms, avg) = ⌊rms · 100 / avg⌋', avg > 0 ? Math.floor((rms * 100) / avg) : 0, nat(rms, avg) && avg > 0, 'formfactor', [rms, avg]) }
  /** RIPPLE FACTOR: the ripple (rms above DC) over the DC level, as a percentage. value ⌊max(0, rms − dc) · 100 / dc⌋. */
  static ripplefactor(rms: number, dc: number): CrossFormula { return c('rectifiers-ripplefactor', 'ripplefactor(rms, dc) = ⌊max(0, rms − dc) · 100 / dc⌋', dc > 0 ? Math.floor((Math.max(0, rms - dc) * 100) / dc) : 0, nat(rms, dc) && dc > 0, 'ripplefactor', [rms, dc]) }
  /** REGULATION: the no-load to full-load droop over full-load voltage, as a percentage. value ⌊max(0, vnl − vfl) · 100 / vfl⌋. */
  static regulation(vnl: number, vfl: number): CrossFormula { return c('rectifiers-regulation', 'regulation(vnl, vfl) = ⌊max(0, vnl − vfl) · 100 / vfl⌋', vfl > 0 ? Math.floor((Math.max(0, vnl - vfl) * 100) / vfl) : 0, nat(vnl, vfl) && vfl > 0, 'regulation', [vnl, vfl]) }
  /** CONDUCTION ANGLE: the degrees each cycle conducts, from the conducting fraction. value ⌊on · 360 / total⌋. */
  static conductionangle(on: number, total: number): CrossFormula { return c('rectifiers-conductionangle', 'conductionangle(on, total) = ⌊on · 360 / total⌋', total > 0 ? Math.floor((on * fullTurn) / total) : 0, nat(on, total) && total > 0 && on <= total, 'conductionangle', [on, total]) }
}

for (const name of ['average', 'conductionangle', 'efficiency', 'formfactor', 'pivrating', 'regulation', 'ripple', 'ripplefactor'] as const)
  hexRegisterOf('rectifiers', name, (RectifiersFormulas[name] as (...x: unknown[]) => unknown).bind(RectifiersFormulas))
