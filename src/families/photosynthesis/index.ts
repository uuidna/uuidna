import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTOSYNTHESIS — THE LIGHT REACTION AS ARITHMETIC. Making sugar from light is numbers: how much of the incident light a
 *  leaf captures, the carbon the Calvin cycle fixes, the oxygen split from water, the yield per photon, gross and net
 *  production, the pigment it holds, and how hard that pigment works. Crosses to `botany` — photosynthesis is what the plant
 *  does. A measure. */

const PROOF = 'photosynthesis arithmetic (light efficiency, carbon fixation, oxygen release, quantum yield, gross and net production, chlorophyll, assimilation); the light reaction as integers; a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photosynthesis', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `photosynthesis.${name}`, params })

export class PhotosynthesisFormulas {
  /** LIGHT EFFICIENCY: absorbed light as a percentage of incident light. value ⌊absorbed · 100 / incident⌋. */
  static lightefficiency(absorbed: number, incident: number): CrossFormula { return c('photosynthesis-lightefficiency', 'lightefficiency(absorbed, incident) = ⌊absorbed · 100 / incident⌋', incident > 0 ? Math.floor((absorbed * 100) / incident) : 0, nat(absorbed, incident) && incident > 0 && absorbed <= incident, 'lightefficiency', [absorbed, incident]) }
  /** CARBON FIXATION: CO₂ molecules the Calvin cycle fixes, cycles at a per-cycle rate. value cycles · rate. */
  static carbonfixation(cycles: number, rate: number): CrossFormula { return c('photosynthesis-carbonfixation', 'carbonfixation(cycles, rate) = cycles · rate', cycles * rate, nat(cycles, rate), 'carbonfixation', [cycles, rate]) }
  /** OXYGEN RELEASE: O₂ molecules from splitting water, two H₂O per O₂. value ⌊water / 2⌋. */
  static oxygenrelease(water: number): CrossFormula { return c('photosynthesis-oxygenrelease', 'oxygenrelease(water) = ⌊water / 2⌋', Math.floor(water / 2), nat(water), 'oxygenrelease', [water]) }
  /** QUANTUM YIELD: products made per hundred photons absorbed. value ⌊products · 100 / photons⌋. */
  static quantumyield(products: number, photons: number): CrossFormula { return c('photosynthesis-quantumyield', 'quantumyield(products, photons) = ⌊products · 100 / photons⌋', photons > 0 ? Math.floor((products * 100) / photons) : 0, nat(products, photons) && photons > 0, 'quantumyield', [products, photons]) }
  /** GROSS PRODUCTION: carbon fixed over a span, a rate for so many hours. value rate · hours. */
  static grossproduction(rate: number, hours: number): CrossFormula { return c('photosynthesis-grossproduction', 'grossproduction(rate, hours) = rate · hours', rate * hours, nat(rate, hours), 'grossproduction', [rate, hours]) }
  /** NET PRODUCTION: gross production less respiration, never below zero. value max(0, gross − respiration). */
  static netproduction(gross: number, respiration: number): CrossFormula { return c('photosynthesis-netproduction', 'netproduction(gross, respiration) = max(0, gross − respiration)', Math.max(0, gross - respiration), nat(gross, respiration), 'netproduction', [gross, respiration]) }
  /** CHLOROPHYLL: pigment concentration, amount over the volume it is in. value ⌊amount / volume⌋. */
  static chlorophyll(amount: number, volume: number): CrossFormula { return c('photosynthesis-chlorophyll', 'chlorophyll(amount, volume) = ⌊amount / volume⌋', volume > 0 ? Math.floor(amount / volume) : 0, nat(amount, volume) && volume > 0, 'chlorophyll', [amount, volume]) }
  /** ASSIMILATION: carbon fixed per unit of chlorophyll, how hard the pigment works. value ⌊carbon / chlorophyll⌋. */
  static assimilation(carbon: number, chlorophyll: number): CrossFormula { return c('photosynthesis-assimilation', 'assimilation(carbon, chlorophyll) = ⌊carbon / chlorophyll⌋', chlorophyll > 0 ? Math.floor(carbon / chlorophyll) : 0, nat(carbon, chlorophyll) && chlorophyll > 0, 'assimilation', [carbon, chlorophyll]) }
}

for (const name of ['assimilation', 'carbonfixation', 'chlorophyll', 'grossproduction', 'lightefficiency', 'netproduction', 'oxygenrelease', 'quantumyield'] as const)
  hexRegisterOf('photosynthesis', name, (PhotosynthesisFormulas[name] as (...x: unknown[]) => unknown).bind(PhotosynthesisFormulas))
