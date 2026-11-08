import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTROCARDIOGRAPHY — THE SURFACE ECG AS ARITHMETIC. The trace is numbers: the heart rate from the R-R interval, the
 *  QT, PR and QRS durations read off the waveform, the average cycle length, a crude axis deviation, the rate-corrected QT,
 *  and the ratio of one interval to another. Crosses to `cardiology` — the ECG is what the cardiologist reads. A measure. */

const PROOF = 'electrocardiography arithmetic (heart rate, QT/PR/QRS durations, average R-R, axis deviation, corrected QT, interval ratio); the surface trace as integers; a measure crossed to cardiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'electrocardiography', dst: 'cardiology', formula, value, proof: PROOF, ...extra }, holds, { name: `electrocardiography.${name}`, params })

export class ElectrocardiographyFormulas {
  /** HEART RATE: beats per minute from the R-R interval in milliseconds. value ⌊60000 / rr⌋. */
  static heartrate(rr: number): CrossFormula { return c('ecg-heartrate', 'heartrate(rr) = ⌊60000 / rr⌋', rr > 0 ? Math.floor(60000 / rr) : 0, nat(rr) && rr > 0, 'heartrate', [rr]) }
  /** QT INTERVAL: from the Q onset to the T offset. value max(0, qend − qstart). */
  static qtinterval(qend: number, qstart: number): CrossFormula { return c('ecg-qtinterval', 'qtinterval(qend, qstart) = max(0, qend − qstart)', Math.max(0, qend - qstart), nat(qend, qstart), 'qtinterval', [qend, qstart]) }
  /** PR INTERVAL: from the P onset to the Q onset. value max(0, qstart − pstart). */
  static printerval(pstart: number, qstart: number): CrossFormula { return c('ecg-printerval', 'printerval(pstart, qstart) = max(0, qstart − pstart)', Math.max(0, qstart - pstart), nat(pstart, qstart), 'printerval', [pstart, qstart]) }
  /** QRS DURATION: the width of the QRS complex. value max(0, send − qstart). */
  static qrsduration(send: number, qstart: number): CrossFormula { return c('ecg-qrsduration', 'qrsduration(send, qstart) = max(0, send − qstart)', Math.max(0, send - qstart), nat(send, qstart), 'qrsduration', [send, qstart]) }
  /** AVERAGE R-R: total cycle milliseconds over the beats counted. value ⌊total / beats⌋. */
  static rraverage(total: number, beats: number): CrossFormula { return c('ecg-rraverage', 'rraverage(total, beats) = ⌊total / beats⌋', beats > 0 ? Math.floor(total / beats) : 0, nat(total, beats) && beats > 0, 'rraverage', [total, beats]) }
  /** AXIS DEVIATION: the net amplitude of lead I over aVF. value max(0, lead1 − avf). */
  static axisdeviation(lead1: number, avf: number): CrossFormula { return c('ecg-axisdeviation', 'axisdeviation(lead1, avf) = max(0, lead1 − avf)', Math.max(0, lead1 - avf), nat(lead1, avf), 'axisdeviation', [lead1, avf]) }
  /** CORRECTED QT: the QT normalised to a 1000 ms cycle. value ⌊qt · 1000 / rr⌋. */
  static correctedqt(qt: number, rr: number): CrossFormula { return c('ecg-correctedqt', 'correctedqt(qt, rr) = ⌊qt · 1000 / rr⌋', rr > 0 ? Math.floor((qt * 1000) / rr) : 0, nat(qt, rr) && rr > 0, 'correctedqt', [qt, rr]) }
  /** INTERVAL RATIO: one interval over another, as a percentage. value ⌊a · 100 / b⌋. */
  static intervalratio(a: number, b: number): CrossFormula { return c('ecg-intervalratio', 'intervalratio(a, b) = ⌊a · 100 / b⌋', b > 0 ? Math.floor((a * 100) / b) : 0, nat(a, b) && b > 0, 'intervalratio', [a, b]) }
}

for (const name of ['axisdeviation', 'correctedqt', 'heartrate', 'intervalratio', 'printerval', 'qrsduration', 'qtinterval', 'rraverage'] as const)
  hexRegisterOf('electrocardiography', name, (ElectrocardiographyFormulas[name] as (...x: unknown[]) => unknown).bind(ElectrocardiographyFormulas))
