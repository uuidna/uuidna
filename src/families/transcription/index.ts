import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRANSCRIPTION — READING DNA INTO RNA INTO PROTEIN, AS ARITHMETIC. The central dogma is numbers: codons per transcript,
 *  elongation time, GC content, mRNA length, promoter strength, the alternative splice variants, ribosome readthrough, and
 *  the expression level. Crosses to `genetics` — transcription is what genetics encodes. A measure. */

const PROOF = 'transcription arithmetic (codons, elongation time, GC content, mRNA length, promoter strength, splice variants, readthrough, expression level); the central dogma as integers; a measure crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'transcription', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `transcription.${name}`, params })

export class TranscriptionFormulas {
  /** CODONS: a coding sequence is read three bases at a time. value ⌊bases / 3⌋. */
  static codons(bases: number): CrossFormula { return c('transcription-codons', 'codons(bases) = ⌊bases / 3⌋', Math.floor(bases / 3), nat(bases), 'codons', [bases]) }
  /** ELONGATION TIME: the codons a ribosome walks at a per-second rate. value ⌈codons / rate⌉. */
  static elongationtime(codons: number, rate: number): CrossFormula { return c('transcription-elongationtime', 'elongationtime(codons, rate) = ⌈codons / rate⌉', rate > 0 ? Math.ceil(codons / rate) : 0, nat(codons, rate) && rate > 0, 'elongationtime', [codons, rate]) }
  /** EXPRESSION LEVEL: transcripts over seconds of observation. value ⌊transcripts / seconds⌋. */
  static expressionlevel(transcripts: number, seconds: number): CrossFormula { return c('transcription-expressionlevel', 'expressionlevel(transcripts, seconds) = ⌊transcripts / seconds⌋', seconds > 0 ? Math.floor(transcripts / seconds) : 0, nat(transcripts, seconds) && seconds > 0, 'expressionlevel', [transcripts, seconds]) }
  /** GC CONTENT as a percentage of the sequence. value ⌊gc · 100 / total⌋. */
  static gcontent(gc: number, total: number): CrossFormula { return c('transcription-gcontent', 'gcontent(gc, total) = ⌊gc · 100 / total⌋', total > 0 ? Math.floor((gc * 100) / total) : 0, nat(gc, total) && total > 0 && gc <= total, 'gcontent', [gc, total]) }
  /** mRNA LENGTH: exons at a size each. value exons · size. */
  static mrnalength(exons: number, size: number): CrossFormula { return c('transcription-mrnalength', 'mrnalength(exons, size) = exons · size', exons * size, nat(exons, size), 'mrnalength', [exons, size]) }
  /** PROMOTER STRENGTH: binding sites at an affinity each. value sites · affinity. */
  static promoterstrength(sites: number, affinity: number): CrossFormula { return c('transcription-promoterstrength', 'promoterstrength(sites, affinity) = sites · affinity', sites * affinity, nat(sites, affinity), 'promoterstrength', [sites, affinity]) }
  /** READTHROUGH: 1 when ribosome readthrough efficiency meets the target. value [efficiency ≥ target]. */
  static readthrough(efficiency: number, target: number): CrossFormula { return c('transcription-readthrough', 'readthrough(efficiency, target) = [efficiency ≥ target]', efficiency >= target ? 1 : 0, nat(efficiency, target) && efficiency <= 100 && target <= 100, 'readthrough', [efficiency, target]) }
  /** SPLICE VARIANTS: exons each with a number of cassette choices. value exons · cassettes. */
  static splicevariants(exons: number, cassettes: number): CrossFormula { return c('transcription-splicevariants', 'splicevariants(exons, cassettes) = exons · cassettes', exons * cassettes, nat(exons, cassettes), 'splicevariants', [exons, cassettes]) }
}

for (const name of ['codons', 'elongationtime', 'expressionlevel', 'gcontent', 'mrnalength', 'promoterstrength', 'readthrough', 'splicevariants'] as const)
  hexRegisterOf('transcription', name, (TranscriptionFormulas[name] as (...x: unknown[]) => unknown).bind(TranscriptionFormulas))
