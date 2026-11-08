import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TESTING — THE DISCIPLINE OF VERIFICATION, AS ARITHMETIC. A test suite is numbers: how much of the code it covers, how
 *  many of its runs pass, how often it flakes, the defect density per KLOC, how much a change regresses, assertions per
 *  test, the mutants it kills, and how long it takes. Crosses to `code` — testing is what proves code. A measure. */

const PROOF = 'testing arithmetic (coverage, pass rate, flakiness, defect density, regression, assertions, mutation score, duration); the discipline of verification as numbers; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'testing', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `testing.${name}`, params })

export class TestingFormulas {
  /** COVERAGE: the covered lines as a percentage of the total. value ⌊covered · 100 / total⌋. */
  static coverage(covered: number, total: number): CrossFormula { return c('testing-coverage', 'coverage(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'coverage', [covered, total]) }
  /** PASS RATE: the passed runs as a percentage of the total. value ⌊passed · 100 / total⌋. */
  static passrate(passed: number, total: number): CrossFormula { return c('testing-passrate', 'passrate(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'passrate', [passed, total]) }
  /** FLAKINESS: the flaky runs as a percentage of all runs. value ⌊flaky · 100 / runs⌋. */
  static flakiness(flaky: number, runs: number): CrossFormula { return c('testing-flakiness', 'flakiness(flaky, runs) = ⌊flaky · 100 / runs⌋', runs > 0 ? Math.floor((flaky * 100) / runs) : 0, nat(flaky, runs) && runs > 0 && flaky <= runs, 'flakiness', [flaky, runs]) }
  /** DEFECT DENSITY: the defects found per KLOC. value ⌊found · 1000 / size⌋. */
  static defects(found: number, size: number): CrossFormula { return c('testing-defects', 'defects(found, size) = ⌊found · 1000 / size⌋', size > 0 ? Math.floor((found * 1000) / size) : 0, nat(found, size) && size > 0, 'defects', [found, size]) }
  /** REGRESSION: the broken cases as a percentage of the changed. value ⌊broken · 100 / changed⌋. */
  static regression(broken: number, changed: number): CrossFormula { return c('testing-regression', 'regression(broken, changed) = ⌊broken · 100 / changed⌋', changed > 0 ? Math.floor((broken * 100) / changed) : 0, nat(broken, changed) && changed > 0 && broken <= changed, 'regression', [broken, changed]) }
  /** ASSERTIONS: the assertions per test. value ⌊count / tests⌋. */
  static assertions(count: number, tests: number): CrossFormula { return c('testing-assertions', 'assertions(count, tests) = ⌊count / tests⌋', tests > 0 ? Math.floor(count / tests) : 0, nat(count, tests) && tests > 0, 'assertions', [count, tests]) }
  /** MUTATION SCORE: the killed mutants as a percentage of all mutants. value ⌊killed · 100 / mutants⌋. */
  static mutation(killed: number, mutants: number): CrossFormula { return c('testing-mutation', 'mutation(killed, mutants) = ⌊killed · 100 / mutants⌋', mutants > 0 ? Math.floor((killed * 100) / mutants) : 0, nat(killed, mutants) && mutants > 0 && killed <= mutants, 'mutation', [killed, mutants]) }
  /** DURATION: the suite's wall-clock milliseconds. value milliseconds. */
  static duration(milliseconds: number): CrossFormula { return c('testing-duration', 'duration(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'duration', [milliseconds]) }
}

for (const name of ['assertions', 'coverage', 'defects', 'duration', 'flakiness', 'mutation', 'passrate', 'regression'] as const)
  hexRegisterOf('testing', name, (TestingFormulas[name] as (...x: unknown[]) => unknown).bind(TestingFormulas))
