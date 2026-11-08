import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ETYMOLOGY — THE HISTORY OF WORDS, AS ARITHMETIC (chosen by the comparative registry, not by hand). The descent of words is
 *  numbers: the cognate rate across a pair, the borrowed share of a vocabulary, the depth of a reconstructed root, the pace of
 *  sound change, the age of the earliest attestation, the length of a derivation chain, the loanword ratio, and whether a
 *  reconstruction clears its confidence target. Crosses to `linguistics` — etymology is linguistics turned back through time. A measure. */

const PROOF = 'etymology arithmetic (cognate rate, borrowing share, root depth, sound change, attestation age, derivation chain, loan ratio, reconstruction score); the comparative registry\'s uncovered domain; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'etymology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `etymology.${name}`, params })

export class EtymologyFormulas {
  /** COGNATE RATE: the shared cognates as a percentage of the compared words. value ⌊shared · 100 / total⌋. */
  static cognaterate(shared: number, total: number): CrossFormula { return c('etymology-cognaterate', 'cognaterate(shared, total) = ⌊shared · 100 / total⌋', total > 0 ? Math.floor((shared * 100) / total) : 0, nat(shared, total) && total > 0 && shared <= total, 'cognaterate', [shared, total]) }
  /** BORROWING SHARE: the borrowed words as a percentage of the vocabulary. value ⌊borrowed · 100 / total⌋. */
  static borrowingshare(borrowed: number, total: number): CrossFormula { return c('etymology-borrowingshare', 'borrowingshare(borrowed, total) = ⌊borrowed · 100 / total⌋', total > 0 ? Math.floor((borrowed * 100) / total) : 0, nat(borrowed, total) && total > 0 && borrowed <= total, 'borrowingshare', [borrowed, total]) }
  /** ROOT DEPTH: the reconstructed forms across the layers of a tree. value layers · perLayer. */
  static rootdepth(layers: number, perLayer: number): CrossFormula { return c('etymology-rootdepth', 'rootdepth(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers, perLayer), 'rootdepth', [layers, perLayer]) }
  /** SOUND CHANGE: the years per attested sound shift. value ⌊years / shifts⌋. */
  static soundchange(years: number, shifts: number): CrossFormula { return c('etymology-soundchange', 'soundchange(years, shifts) = ⌊years / shifts⌋', shifts > 0 ? Math.floor(years / shifts) : 0, nat(years, shifts) && shifts > 0, 'soundchange', [years, shifts]) }
  /** ATTESTATION AGE: the years since the earliest attestation. value max(0, now − first). */
  static attestationage(now: number, first: number): CrossFormula { return c('etymology-attestationage', 'attestationage(now, first) = max(0, now − first)', Math.max(0, now - first), nat(now, first) && now >= first, 'attestationage', [now, first]) }
  /** DERIVATION CHAIN: the length of a derivation, roots plus affixes. value roots + affixes. */
  static derivationchain(roots: number, affixes: number): CrossFormula { return c('etymology-derivationchain', 'derivationchain(roots, affixes) = roots + affixes', roots + affixes, nat(roots, affixes), 'derivationchain', [roots, affixes]) }
  /** LOAN RATIO: loanwords at a rate per thousand. value ⌊loans · rate / 1000⌋. */
  static loanratio(loans: number, rate: number): CrossFormula { return c('etymology-loanratio', 'loanratio(loans, rate) = ⌊loans · rate / 1000⌋', Math.floor((loans * rate) / 1000), nat(loans, rate), 'loanratio', [loans, rate]) }
  /** THE RECONSTRUCTION: 1 when the reconstruction score clears its target. value [score ≥ target]. */
  static reconstructionscore(score: number, target: number): CrossFormula { return c('etymology-reconstructionscore', 'reconstructionscore(score, target) = [score ≥ target]', score >= target ? 1 : 0, nat(score, target) && score <= 100 && target <= 100, 'reconstructionscore', [score, target]) }
}

for (const name of ['attestationage', 'borrowingshare', 'cognaterate', 'derivationchain', 'loanratio', 'reconstructionscore', 'rootdepth', 'soundchange'] as const)
  hexRegisterOf('etymology', name, (EtymologyFormulas[name] as (...x: unknown[]) => unknown).bind(EtymologyFormulas))
