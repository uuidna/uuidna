import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SMARTGRID — scaffolded integer measures crossed to energy. Every output an exact finite nonnegative integer. */

const PROOF = 'smartgrid arithmetic (nodes, loadcombos, demandresponse, selfhealingpaths, meterdata, outagereduction, renewableshare, stabilitymargin); scaffolded from the integer-op palette; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'smartgrid', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `smartgrid.${name}`, params })

export class SmartgridFormulas {
  static nodes(x: number, y: number): CrossFormula { return c('smartgrid-nodes', 'nodes(x, y) = x · y', x * y, nat(x, y), 'nodes', [x, y]) }
  static loadcombos(x: number, y: number): CrossFormula { return c('smartgrid-loadcombos', 'loadcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'loadcombos', [x, y]) }
  static demandresponse(x: number, y: number): CrossFormula { return c('smartgrid-demandresponse', 'demandresponse(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'demandresponse', [x, y]) }
  static selfhealingpaths(x: number, y: number): CrossFormula { return c('smartgrid-selfhealingpaths', 'selfhealingpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'selfhealingpaths', [x, y]) }
  static meterdata(x: number, y: number): CrossFormula { return c('smartgrid-meterdata', 'meterdata(x, y) = x · y', x * y, nat(x, y), 'meterdata', [x, y]) }
  static outagereduction(x: number, y: number): CrossFormula { return c('smartgrid-outagereduction', 'outagereduction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'outagereduction', [x, y]) }
  static renewableshare(x: number, y: number): CrossFormula { return c('smartgrid-renewableshare', 'renewableshare(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'renewableshare', [x, y]) }
  static stabilitymargin(x: number, y: number): CrossFormula { return c('smartgrid-stabilitymargin', 'stabilitymargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'stabilitymargin', [x, y]) }
}

for (const name of ['demandresponse', 'loadcombos', 'meterdata', 'nodes', 'outagereduction', 'renewableshare', 'selfhealingpaths', 'stabilitymargin'] as const)
  hexRegisterOf('smartgrid', name, (SmartgridFormulas[name] as (...x: unknown[]) => unknown).bind(SmartgridFormulas))
