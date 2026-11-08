import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEVTOOLS — SOFTWARE DELIVERY, AS ARITHMETIC (chosen by the registry: developer_tools, 168 APIs). Engineering health is
 *  numbers: test coverage, build time, cyclomatic complexity, technical debt, code churn, the test-to-code ratio, defect
 *  density, and team velocity. Crosses to `obs`. A measure. */

const PROOF = 'software-delivery arithmetic (coverage, build time, cyclomatic complexity, technical debt, churn, test ratio, defect density, velocity); a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const d = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'devtools', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `devtools.${name}`, params })

export class DevtoolsFormulas {
  /** TEST COVERAGE as a percentage: lines covered over total. value ⌊covered · 100 / total⌋. */
  static coverage(covered: number, total: number): CrossFormula { return d('devtools-coverage', 'coverage(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'coverage', [covered, total]) }
  /** BUILD TIME: files at a per-file cost. value files · perFile. */
  static build(files: number, perFile: number): CrossFormula { return d('devtools-build', 'build(files, perFile) = files · perFile', files * perFile, nat(files, perFile), 'build', [files, perFile]) }
  /** CYCLOMATIC COMPLEXITY of a control-flow graph: edges − nodes + 2. value edges − nodes + 2. */
  static complexity(edges: number, nodes: number): CrossFormula { return d('devtools-complexity', 'complexity(edges, nodes) = edges − nodes + 2', edges - nodes + 2, nat(edges, nodes) && edges >= nodes, 'complexity', [edges, nodes]) }
  /** TECHNICAL DEBT: open issues at an effort per issue. value issues · perIssue. */
  static debt(issues: number, perIssue: number): CrossFormula { return d('devtools-debt', 'debt(issues, perIssue) = issues · perIssue', issues * perIssue, nat(issues, perIssue), 'debt', [issues, perIssue]) }
  /** CODE CHURN: lines added plus deleted. value added + deleted. */
  static churn(added: number, deleted: number): CrossFormula { return d('devtools-churn', 'churn(added, deleted) = added + deleted', added + deleted, nat(added, deleted), 'churn', [added, deleted]) }
  /** THE TEST-TO-CODE RATIO as a percentage. value ⌊tests · 100 / code⌋. */
  static ratio(tests: number, code: number): CrossFormula { return d('devtools-ratio', 'ratio(tests, code) = ⌊tests · 100 / code⌋', code > 0 ? Math.floor((tests * 100) / code) : 0, nat(tests, code) && code > 0, 'ratio', [tests, code]) }
  /** DEFECT DENSITY: defects per thousand lines of code. value ⌊kloc · rate / 1000⌋. */
  static bugs(kloc: number, rate: number): CrossFormula { return d('devtools-bugs', 'bugs(kloc, rate) = ⌊kloc · rate / 1000⌋', Math.floor((kloc * rate) / 1000), nat(kloc, rate), 'bugs', [kloc, rate]) }
  /** TEAM VELOCITY: story points over sprints. value ⌊points / sprints⌋. */
  static velocity(points: number, sprints: number): CrossFormula { return d('devtools-velocity', 'velocity(points, sprints) = ⌊points / sprints⌋', sprints > 0 ? Math.floor(points / sprints) : 0, nat(points, sprints) && sprints > 0, 'velocity', [points, sprints]) }
}

for (const name of ['build', 'bugs', 'churn', 'complexity', 'coverage', 'debt', 'ratio', 'velocity'] as const)
  hexRegisterOf('devtools', name, (DevtoolsFormulas[name] as (...x: unknown[]) => unknown).bind(DevtoolsFormulas))
