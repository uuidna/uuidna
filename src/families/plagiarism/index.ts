import { chooseOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PLAGIARISM — the pair count C(a, b) on two naturals. A count. It names no work. */

const PROOF = 'binomial pair count C(a, b); a measure crossed to lattice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'plagiarism', dst: 'lattice', formula, value, proof: PROOF }, holds, { name: `plagiarism.${name}`, params })

export class PlagiarismFormulas {
  /** Pairs among a naturals taken b at a time. value C(a, b). */
  static plagiarism(a: number, b: number): CrossFormula {
    const count = chooseOf(a, b)
    return c('plagiarism-plagiarism', 'plagiarism(a, b) = C(a, b)', count, nat(a, b) && b <= a, 'plagiarism', [a, b])
  }
}

hexRegisterOf('plagiarism', 'plagiarism', (PlagiarismFormulas.plagiarism as (...x: unknown[]) => unknown).bind(PlagiarismFormulas))
