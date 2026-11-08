import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KINSHIP — BLOOD RELATION AS ARITHMETIC (the genealogy of a pedigree reduced to exact counts). How close two people are is
 *  numbers: the coefficient of relatedness that halves each generation, the generations between them, the degree a cousin is
 *  removed, the coefficient of inbreeding over a loop, the descendants a line produces, the ancestors a generation holds, the
 *  degree of cousinhood, and the depth of a lineage in years. Crosses to `sociology` — kinship is the atom society is built on.
 *  A measure. */

const PROOF = 'kinship arithmetic (relatedness per-mille, generation distance, degree removed, consanguinity, descendants, ancestors, cousin degree, lineage depth); blood relation reduced to exact counts; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'kinship', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `kinship.${name}`, params })

export class KinshipFormulas {
  /** COEFFICIENT OF RELATEDNESS in per-mille, halving once per meiosis (generation). value ⌊1000 / 2^gen⌋. */
  static coefficientrelatedness(gen: number): CrossFormula { return c('kinship-coefficientrelatedness', 'coefficientrelatedness(gen) = ⌊1000 / 2^gen⌋', Math.floor(1000 / Math.pow(2, gen)), nat(gen), 'coefficientrelatedness', [gen]) }
  /** GENERATION DISTANCE: the generations from an ancestor down to a descendant. value max(0, descendant − ancestor). */
  static generationdistance(ancestor: number, descendant: number): CrossFormula { return c('kinship-generationdistance', 'generationdistance(ancestor, descendant) = max(0, descendant − ancestor)', Math.max(0, descendant - ancestor), nat(ancestor, descendant), 'generationdistance', [ancestor, descendant]) }
  /** DEGREE OF REMOVAL between two cousins: the gap in their generations from the common ancestor. value max − min. */
  static degreeremoval(genA: number, genB: number): CrossFormula { return c('kinship-degreeremoval', 'degreeremoval(genA, genB) = max(genA, genB) − min(genA, genB)', Math.max(genA, genB) - Math.min(genA, genB), nat(genA, genB), 'degreeremoval', [genA, genB]) }
  /** CONSANGUINITY: the coefficient of inbreeding in per-mille over `loops` ancestral loops of a path of length `pathlen`. value loops · ⌊1000 / 2^pathlen⌋. */
  static consanguinity(pathlen: number, loops: number): CrossFormula { return c('kinship-consanguinity', 'consanguinity(pathlen, loops) = loops · ⌊1000 / 2^pathlen⌋', loops * Math.floor(1000 / Math.pow(2, pathlen)), nat(pathlen, loops), 'consanguinity', [pathlen, loops]) }
  /** DESCENDANTS at a generation with a fixed branching factor. value children^gens. */
  static descendants(children: number, gens: number): CrossFormula { return c('kinship-descendants', 'descendants(children, gens) = children^gens', Math.pow(children, gens), nat(children, gens), 'descendants', [children, gens]) }
  /** ANCESTORS a generation back: two parents per person, doubling. value 2^gen. */
  static ancestorcount(gen: number): CrossFormula { return c('kinship-ancestorcount', 'ancestorcount(gen) = 2^gen', Math.pow(2, gen), nat(gen), 'ancestorcount', [gen]) }
  /** COUSIN DEGREE: first cousins share grandparents (gen 2), so the degree is one less than the shared generation. value max(0, gen − 1). */
  static cousindegree(gen: number): CrossFormula { return c('kinship-cousindegree', 'cousindegree(gen) = max(0, gen − 1)', Math.max(0, gen - 1), nat(gen), 'cousindegree', [gen]) }
  /** LINEAGE DEPTH: the generations a lineage spans in years, at a fixed generation span. value ⌊max(0, end − start) / span⌋. */
  static lineagedepth(start: number, end: number, span: number): CrossFormula { return c('kinship-lineagedepth', 'lineagedepth(start, end, span) = ⌊max(0, end − start) / span⌋', span > 0 ? Math.floor(Math.max(0, end - start) / span) : 0, nat(start, end, span) && span > 0, 'lineagedepth', [start, end, span]) }
}

for (const name of ['ancestorcount', 'coefficientrelatedness', 'consanguinity', 'cousindegree', 'degreeremoval', 'descendants', 'generationdistance', 'lineagedepth'] as const)
  hexRegisterOf('kinship', name, (KinshipFormulas[name] as (...x: unknown[]) => unknown).bind(KinshipFormulas))
