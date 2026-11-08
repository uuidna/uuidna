import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROJECT — PROJECT MANAGEMENT AS ARITHMETIC (chosen by the public-API registry, not by hand). Running a project is
 *  numbers: how much is done, how much is spent, how much time has gone, the velocity of the team, open risk, the
 *  burndown, milestones reached, and schedule overrun. Crosses to `collaboration` — a project is what a team works on
 *  together. A measure. */

const PROOF = 'project management arithmetic (progress, budget, schedule, velocity, risk, burndown, milestone, overrun); a public-API domain; a measure crossed to collaboration'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'project', dst: 'collaboration', formula, value, proof: PROOF, ...extra }, holds, { name: `project.${name}`, params })

export class ProjectFormulas {
  /** PROGRESS as a percentage. value ⌊done · 100 / total⌋. */
  static progress(done: number, total: number): CrossFormula { return c('project-progress', 'progress(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'progress', [done, total]) }
  /** BUDGET spent as a percentage. value ⌊spent · 100 / total⌋. */
  static budget(spent: number, total: number): CrossFormula { return c('project-budget', 'budget(spent, total) = ⌊spent · 100 / total⌋', total > 0 ? Math.floor((spent * 100) / total) : 0, nat(spent, total) && total > 0, 'budget', [spent, total]) }
  /** SCHEDULE elapsed as a percentage. value ⌊elapsed · 100 / planned⌋. */
  static schedule(elapsed: number, planned: number): CrossFormula { return c('project-schedule', 'schedule(elapsed, planned) = ⌊elapsed · 100 / planned⌋', planned > 0 ? Math.floor((elapsed * 100) / planned) : 0, nat(elapsed, planned) && planned > 0, 'schedule', [elapsed, planned]) }
  /** VELOCITY: story points per sprint. value ⌊points / sprints⌋. */
  static velocity(points: number, sprints: number): CrossFormula { return c('project-velocity', 'velocity(points, sprints) = ⌊points / sprints⌋', sprints > 0 ? Math.floor(points / sprints) : 0, nat(points, sprints) && sprints > 0, 'velocity', [points, sprints]) }
  /** RISK: open items as a percentage of all. value ⌊open · 100 / total⌋. */
  static risk(open: number, total: number): CrossFormula { return c('project-risk', 'risk(open, total) = ⌊open · 100 / total⌋', total > 0 ? Math.floor((open * 100) / total) : 0, nat(open, total) && total > 0 && open <= total, 'risk', [open, total]) }
  /** BURNDOWN: work remaining as a percentage. value ⌊remaining · 100 / total⌋. */
  static burndown(remaining: number, total: number): CrossFormula { return c('project-burndown', 'burndown(remaining, total) = ⌊remaining · 100 / total⌋', total > 0 ? Math.floor((remaining * 100) / total) : 0, nat(remaining, total) && total > 0 && remaining <= total, 'burndown', [remaining, total]) }
  /** MILESTONE: milestones reached as a percentage. value ⌊reached · 100 / total⌋. */
  static milestone(reached: number, total: number): CrossFormula { return c('project-milestone', 'milestone(reached, total) = ⌊reached · 100 / total⌋', total > 0 ? Math.floor((reached * 100) / total) : 0, nat(reached, total) && total > 0 && reached <= total, 'milestone', [reached, total]) }
  /** OVERRUN: schedule slip, never below zero. value max(0, actual − planned). */
  static overrun(actual: number, planned: number): CrossFormula { return c('project-overrun', 'overrun(actual, planned) = max(0, actual − planned)', Math.max(0, actual - planned), nat(actual, planned), 'overrun', [actual, planned]) }
}

for (const name of ['budget', 'burndown', 'milestone', 'overrun', 'progress', 'risk', 'schedule', 'velocity'] as const)
  hexRegisterOf('project', name, (ProjectFormulas[name] as (...x: unknown[]) => unknown).bind(ProjectFormulas))
