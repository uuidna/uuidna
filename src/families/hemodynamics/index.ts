import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HEMODYNAMICS — THE CIRCULATION, AS ARITHMETIC. Moving blood is numbers: the output of the heart per minute, the volume
 *  each beat ejects, the mean pressure that drives flow, the fraction the ventricle empties, the swing between systole and
 *  diastole, the resistance the vessels oppose, the rate the pulse keeps, and the pressure that perfuses an organ. Crosses
 *  to `cardiology` — hemodynamics is what the cardiologist reads. A measure. */

const PROOF = 'hemodynamics arithmetic (cardiac output, stroke volume, mean arterial pressure, ejection fraction, pulse pressure, vascular resistance, pulse rate, perfusion pressure); the circulation as integers; a measure crossed to cardiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hemodynamics', dst: 'cardiology', formula, value, proof: PROOF, ...extra }, holds, { name: `hemodynamics.${name}`, params })

export class HemodynamicsFormulas {
  /** CARDIAC OUTPUT: heart rate times the volume each beat ejects. value hr · sv. */
  static cardiacoutput(hr: number, sv: number): CrossFormula { return c('hemodynamics-cardiacoutput', 'cardiacoutput(hr, sv) = hr · sv', hr * sv, nat(hr, sv), 'cardiacoutput', [hr, sv]) }
  /** STROKE VOLUME: what the ventricle ejects, end-diastolic less end-systolic. value max(0, edv − esv). */
  static strokevolume(edv: number, esv: number): CrossFormula { return c('hemodynamics-strokevolume', 'strokevolume(edv, esv) = max(0, edv − esv)', Math.max(0, edv - esv), nat(edv, esv) && esv <= edv, 'strokevolume', [edv, esv]) }
  /** MEAN ARTERIAL PRESSURE: diastole plus a third of the swing. value ⌊(sys + 2·dia) / 3⌋. */
  static meanarterialpressure(sys: number, dia: number): CrossFormula { return c('hemodynamics-meanarterialpressure', 'meanarterialpressure(sys, dia) = ⌊(sys + 2·dia) / 3⌋', Math.floor((sys + 2 * dia) / 3), nat(sys, dia) && dia <= sys, 'meanarterialpressure', [sys, dia]) }
  /** EJECTION FRACTION: the percent of the filled ventricle it ejects. value ⌊sv · 100 / edv⌋. */
  static ejectionfraction(sv: number, edv: number): CrossFormula { return c('hemodynamics-ejectionfraction', 'ejectionfraction(sv, edv) = ⌊sv · 100 / edv⌋', edv > 0 ? Math.floor((sv * 100) / edv) : 0, nat(sv, edv) && edv > 0 && sv <= edv, 'ejectionfraction', [sv, edv]) }
  /** PULSE PRESSURE: the swing between systole and diastole. value max(0, sys − dia). */
  static pulsepressure(sys: number, dia: number): CrossFormula { return c('hemodynamics-pulsepressure', 'pulsepressure(sys, dia) = max(0, sys − dia)', Math.max(0, sys - dia), nat(sys, dia) && dia <= sys, 'pulsepressure', [sys, dia]) }
  /** VASCULAR RESISTANCE: the pressure the vessels oppose to the output. value ⌊map · 80 / co⌋. */
  static vascularresistance(map: number, co: number): CrossFormula { return c('hemodynamics-vascularresistance', 'vascularresistance(map, co) = ⌊map · 80 / co⌋', co > 0 ? Math.floor((map * 80) / co) : 0, nat(map, co) && co > 0, 'vascularresistance', [map, co]) }
  /** PULSE RATE: beats over the minutes counted. value ⌊beats / minutes⌋. */
  static pulserate(beats: number, minutes: number): CrossFormula { return c('hemodynamics-pulserate', 'pulserate(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'pulserate', [beats, minutes]) }
  /** PERFUSION PRESSURE: the mean pressure left to perfuse past the resisting pressure. value max(0, map − icp). */
  static perfusionpressure(map: number, icp: number): CrossFormula { return c('hemodynamics-perfusionpressure', 'perfusionpressure(map, icp) = max(0, map − icp)', Math.max(0, map - icp), nat(map, icp) && icp <= map, 'perfusionpressure', [map, icp]) }
}

for (const name of ['cardiacoutput', 'ejectionfraction', 'meanarterialpressure', 'perfusionpressure', 'pulsepressure', 'pulserate', 'strokevolume', 'vascularresistance'] as const)
  hexRegisterOf('hemodynamics', name, (HemodynamicsFormulas[name] as (...x: unknown[]) => unknown).bind(HemodynamicsFormulas))
