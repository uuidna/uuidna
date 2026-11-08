import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REHABILITATION — RECOVERY AS ARITHMETIC. Getting a body back to work is numbers: range of motion regained, progress to a
 *  goal, strength volume lifted, how much function has returned, how faithfully the plan is kept, progressive overload, the
 *  drop on the pain scale, and the sessions a course runs. Crosses to `physiology` — rehabilitation acts on the body physiology
 *  measures. A measure. */

const PROOF = 'rehabilitation arithmetic (range of motion, progress to goal, strength volume, recovery, adherence, load progression, pain reduction, sessions); recovery acting on the body; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rehabilitation', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `rehabilitation.${name}`, params })

export class RehabilitationFormulas {
  /** RANGE OF MOTION as a percentage of normal. value ⌊current · 100 / max⌋. */
  static rangeofmotion(current: number, max: number): CrossFormula { return c('rehabilitation-rangeofmotion', 'rangeofmotion(current, max) = ⌊current · 100 / max⌋', max > 0 ? Math.floor((current * 100) / max) : 0, nat(current, max) && max > 0, 'rangeofmotion', [current, max]) }
  /** PROGRESS from a start toward a goal, as a percentage. value ⌊max(0, current − start) · 100 / (goal − start)⌋. */
  static progress(start: number, current: number, goal: number): CrossFormula { return c('rehabilitation-progress', 'progress(start, current, goal) = ⌊max(0, current − start) · 100 / (goal − start)⌋', goal > start ? Math.floor((Math.max(0, current - start) * 100) / (goal - start)) : 0, nat(start, current, goal) && goal > start, 'progress', [start, current, goal]) }
  /** STRENGTH volume lifted: reps at a weight. value reps · weight. */
  static strength(reps: number, weight: number): CrossFormula { return c('rehabilitation-strength', 'strength(reps, weight) = reps · weight', reps * weight, nat(reps, weight), 'strength', [reps, weight]) }
  /** RECOVERY: function returned, as a percentage. value ⌊max(0, total − injured) · 100 / total⌋. */
  static recovery(injured: number, total: number): CrossFormula { return c('rehabilitation-recovery', 'recovery(injured, total) = ⌊max(0, total − injured) · 100 / total⌋', total > 0 ? Math.floor((Math.max(0, total - injured) * 100) / total) : 0, nat(injured, total) && total > 0 && injured <= total, 'recovery', [injured, total]) }
  /** ADHERENCE: sessions attended over scheduled, as a percentage. value ⌊attended · 100 / scheduled⌋. */
  static adherence(attended: number, scheduled: number): CrossFormula { return c('rehabilitation-adherence', 'adherence(attended, scheduled) = ⌊attended · 100 / scheduled⌋', scheduled > 0 ? Math.floor((attended * 100) / scheduled) : 0, nat(attended, scheduled) && scheduled > 0, 'adherence', [attended, scheduled]) }
  /** LOAD PROGRESSION: progressive overload on a base by a percentage. value base + ⌊base · pct / 100⌋. */
  static loadprogression(base: number, pct: number): CrossFormula { return c('rehabilitation-loadprogression', 'loadprogression(base, pct) = base + ⌊base · pct / 100⌋', base + Math.floor((base * pct) / 100), nat(base, pct), 'loadprogression', [base, pct]) }
  /** PAIN SCALE drop: reported pain before minus after. value max(0, before − after). */
  static painscale(before: number, after: number): CrossFormula { return c('rehabilitation-painscale', 'painscale(before, after) = max(0, before − after)', Math.max(0, before - after), nat(before, after) && before <= 10 && after <= 10, 'painscale', [before, after]) }
  /** SESSIONS a course runs: weeks at a weekly cadence. value weeks · perweek. */
  static sessions(weeks: number, perweek: number): CrossFormula { return c('rehabilitation-sessions', 'sessions(weeks, perweek) = weeks · perweek', weeks * perweek, nat(weeks, perweek), 'sessions', [weeks, perweek]) }
}

for (const name of ['adherence', 'loadprogression', 'painscale', 'progress', 'rangeofmotion', 'recovery', 'sessions', 'strength'] as const)
  hexRegisterOf('rehabilitation', name, (RehabilitationFormulas[name] as (...x: unknown[]) => unknown).bind(RehabilitationFormulas))
