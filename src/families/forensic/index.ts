import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FORENSIC EVIDENCE MATH — the computable core the court admits. Not opinion: the numbers an examiner must defend under
 *  Daubert are arithmetic — a DNA random-match probability's order of magnitude, a likelihood ratio, the length of an
 *  unbroken chain of custody, the minutiae a fingerprint shares, a method's error rate, how many matches a frequency
 *  predicts in a population, a blood-alcohol level against the limit. Each is a formula at a hex address; the examiner's
 *  interpretation is theirs, the measure is the unit's. These develop the forensic leads: DNA, fingerprint, trace,
 *  firearms, documents, toxicology all defend one of these quantities in court. */

const PROOF = 'random-match probability (product of allele frequencies); the likelihood ratio; chain-of-custody integrity; minutiae thresholds; Daubert error rate; population rarity; the per-se blood-alcohol limit'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'forensic', dst: 'crypt', formula, value, proof: PROOF, ...extra }, holds, { name: `forensic.${name}`, params })

export class ForensicFormulas {
  /** The order of magnitude of a DNA random-match probability over `loci`, each contributing a rarity of ~1 in 10:
   *  value is n such that the profile is ~1 in 10^n. The CODIS standard is 13–20 loci. */
  static rmp(loci: number): CrossFormula { return f('forensic-rmp', 'rmp(loci) ≈ 1 in 10^loci (product of per-locus rarities)', loci, nat(loci), 'rmp', [loci], { oneIn: `10^${loci}`, codis: loci >= 13 }) }
  /** The likelihood ratio of a match, numerator over denominator, in thousandths (LR = p(E|prosecution) / p(E|defence)). */
  static likelihood(numer: number, denom: number): CrossFormula { return f('forensic-likelihood', 'likelihood(a, b) = 1000 · a / b (the likelihood ratio)', denom > 0 ? Math.round((numer * 1000) / denom) : 0, nat(numer, denom) && denom > 0, 'likelihood', [numer, denom]) }
  /** A chain of custody of `transfers` hashed handoffs: value the length; holds when at least one unbroken transfer is
   *  recorded (each handoff content-addressed, like the receipt chain). */
  static custody(transfers: number): CrossFormula { return f('forensic-custody', 'custody(transfers) = |hashed handoffs|; unbroken ⟺ ≥ 1', transfers, nat(transfers) && transfers >= 1, 'custody', [transfers]) }
  /** A fingerprint comparison of `minutiae` shared points: holds when it meets the common 12-point threshold. */
  static points(minutiae: number): CrossFormula { return f('forensic-points', 'points(minutiae) = [minutiae ≥ 12]', minutiae >= 12 ? 1 : 0, nat(minutiae), 'points', [minutiae], { minutiae }) }
  /** A method's error rate in parts per thousand: holds (admissible) when at or below 2% (20 per thousand), a Daubert factor. */
  static error(perThousand: number): CrossFormula { return f('forensic-error', 'error(perThousand) = [rate ≤ 20‰ (2%)]', perThousand <= 20 ? 1 : 0, nat(perThousand), 'error', [perThousand], { percent: perThousand / 10 }) }
  /** Expected matches of a trait of frequency 1/`freq` in a population of `pop`: pop / freq — how many others could share it. */
  static rarity(freq: number, pop: number): CrossFormula { return f('forensic-rarity', 'rarity(freq, pop) = pop / freq (expected coincidental matches)', freq > 0 ? Math.floor(pop / freq) : 0, nat(freq, pop) && freq > 0, 'rarity', [freq, pop]) }
  /** A blood-alcohol concentration in mg/dL against the per-se limit: holds (over the limit) when ≥ 80 mg/dL (0.08%). */
  static bac(mgDl: number): CrossFormula { return f('forensic-bac', 'bac(mgDl) = [mg/dL ≥ 80 (0.08% per-se limit)]', mgDl >= 80 ? 1 : 0, nat(mgDl), 'bac', [mgDl], { percent: mgDl / 1000 }) }
}

for (const name of ['bac', 'custody', 'error', 'likelihood', 'points', 'rarity', 'rmp'] as const)
  hexRegisterOf('forensic', name, (ForensicFormulas[name] as (...x: unknown[]) => unknown).bind(ForensicFormulas))
