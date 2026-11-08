import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOFTWARE — the engineering arithmetic above the driver. Thousands of lines, test coverage, cyclomatic complexity,
 *  an estimate of defects, the feature-flag combinations a count opens, story-point hours, delivery velocity, and a
 *  packed semver. Each an exact integer at a hex address; develops the software leads. */

const PROOF = 'software counts: kloc = loc / 1000; coverage = covered · 100 / total; cyclomatic = max(0, edges − nodes + 2); defects = kloc · rate; flags = 2^n; hours = points · 4; velocity = items / days; semver = major·1e6 + minor·1e3 + patch; density = defects / kloc; throughput = velocity · sprints; debt = hours · rate; effort = kloc · perKloc; teamsize = ceil(hours / perPerson); builds = commits · perCommit; mttr = downtime / incidents; software crossed to driver'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const div = (a: number, b: number) => (b > 0 ? Math.floor(a / b) : 0)
const ceilDiv = (a: number, b: number) => (b > 0 ? Math.floor((a + b - 1) / b) : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'software', dst: 'driver', formula, value, proof: PROOF, ...extra }, holds, { name: `software.${name}`, params })

export class SoftwareFormulas {
  /** Thousands of lines of code in `loc`: loc / 1000. */
  static kloc(loc: number): CrossFormula { return f('software-kloc', 'kloc(loc) = loc / 1000', div(loc, 1000), nat(loc), 'kloc', [loc]) }
  /** Percent line coverage of `covered` over `total`: covered · 100 / total. */
  static coverage(covered: number, total: number): CrossFormula { return f('software-coverage', 'coverage(covered, total) = covered · 100 / total', div(covered * 100, total), nat(covered, total) && total > 0, 'coverage', [covered, total]) }
  /** McCabe cyclomatic complexity of a connected graph: max(0, edges − nodes + 2). */
  static cyclomatic(edges: number, nodes: number): CrossFormula { return f('software-cyclomatic', 'cyclomatic(edges, nodes) = max(0, edges − nodes + 2)', Math.max(0, edges - nodes + 2), nat(edges, nodes), 'cyclomatic', [edges, nodes]) }
  /** Estimated defects of `kloc` thousand lines at `rate` per kloc: kloc · rate. */
  static defects(kloc: number, rate: number): CrossFormula { return f('software-defects', 'defects(kloc, rate) = kloc · rate', kloc * rate, nat(kloc, rate), 'defects', [kloc, rate]) }
  /** Feature-flag combinations `n` independent flags open: 2^n (n ≤ 30). */
  static flags(n: number): CrossFormula { return f('software-flags', 'flags(n) = 2^n', n <= 30 ? 2 ** n : 0, nat(n) && n <= 30, 'flags', [n]) }
  /** Hours a story of `points` carries, at 4h a point: points · 4. */
  static hours(points: number): CrossFormula { return f('software-hours', 'hours(points) = points · 4', points * 4, nat(points), 'hours', [points]) }
  /** Delivery velocity: `items` closed over `days`: items / days. */
  static velocity(items: number, days: number): CrossFormula { return f('software-velocity', 'velocity(items, days) = items / days', div(items, days), nat(items, days) && days > 0, 'velocity', [items, days]) }
  /** A packed semantic version: major·1e6 + minor·1e3 + patch (minor, patch ≤ 999). */
  static semver(major: number, minor: number, patch: number): CrossFormula { return f('software-semver', 'semver(major, minor, patch) = major·1e6 + minor·1e3 + patch', major * 1000000 + minor * 1000 + patch, nat(major, minor, patch) && minor < 1000 && patch < 1000, 'semver', [major, minor, patch]) }
  /** Defect density: `defects` over `kloc` thousand lines: defects / kloc (kloc > 0). */
  static density(defects: number, kloc: number): CrossFormula { return f('software-density', 'density(defects, kloc) = defects / kloc', div(defects, kloc), nat(defects, kloc) && kloc > 0, 'density', [defects, kloc]) }
  /** Points delivered over `sprints` sprints at `velocity` each: velocity · sprints. */
  static throughput(velocity: number, sprints: number): CrossFormula { return f('software-throughput', 'throughput(velocity, sprints) = velocity · sprints', velocity * sprints, nat(velocity, sprints), 'throughput', [velocity, sprints]) }
  /** The tech-debt cost of `hours` hours at `rate` each: hours · rate. */
  static debt(hours: number, rate: number): CrossFormula { return f('software-debt', 'debt(hours, rate) = hours · rate', hours * rate, nat(hours, rate), 'debt', [hours, rate]) }
  /** The effort for `kloc` thousand lines at `perKloc` units each: kloc · perKloc. */
  static effort(kloc: number, perKloc: number): CrossFormula { return f('software-effort', 'effort(kloc, perKloc) = kloc · perKloc', kloc * perKloc, nat(kloc, perKloc), 'effort', [kloc, perKloc]) }
  /** The team size to cover `hours` hours at `perPerson` each: ceil(hours / perPerson) (perPerson > 0). */
  static teamsize(hours: number, perPerson: number): CrossFormula { return f('software-teamsize', 'teamsize(hours, perPerson) = ceil(hours / perPerson)', ceilDiv(hours, perPerson), nat(hours, perPerson) && perPerson > 0, 'teamsize', [hours, perPerson]) }
  /** The builds `commits` commits trigger at `perCommit` each: commits · perCommit. */
  static builds(commits: number, perCommit: number): CrossFormula { return f('software-builds', 'builds(commits, perCommit) = commits · perCommit', commits * perCommit, nat(commits, perCommit), 'builds', [commits, perCommit]) }
  /** Mean time to recovery: `downtime` spread over `incidents`: downtime / incidents (incidents > 0). */
  static mttr(downtime: number, incidents: number): CrossFormula { return f('software-mttr', 'mttr(downtime, incidents) = downtime / incidents', div(downtime, incidents), nat(downtime, incidents) && incidents > 0, 'mttr', [downtime, incidents]) }
}

for (const name of ['builds', 'coverage', 'cyclomatic', 'debt', 'defects', 'density', 'effort', 'flags', 'hours', 'kloc', 'mttr', 'semver', 'teamsize', 'throughput', 'velocity'] as const)
  hexRegisterOf('software', name, (SoftwareFormulas[name] as (...x: unknown[]) => unknown).bind(SoftwareFormulas))
