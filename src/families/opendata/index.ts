import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OPENDATA — OPEN DATASETS AND OPEN-DATA PORTALS, AS ARITHMETIC (what a catalogue of public datasets measures, not by hand). A
 *  portal is numbers: the cells in a table, how complete the fields are, how fresh a dataset is, what share is openly licensed,
 *  download volume, how much of a requested coverage is available, the bytes a dataset holds, and the formats it ships in.
 *  Crosses to `cross` — open data is a measure other domains draw on. A measure. */

const PROOF = 'opendata arithmetic (records, completeness, freshness, license, downloads, coverage, size, formats); open datasets and open-data portals as numbers; a measure crossed to cross'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const o = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'opendata', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `opendata.${name}`, params })

export class OpendataFormulas {
  /** RECORDS: the cells in a table — rows by columns. value rows · cols. */
  static records(rows: number, cols: number): CrossFormula { return o('opendata-records', 'records(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'records', [rows, cols]) }
  /** COMPLETENESS: the share of filled cells, as a percentage. value ⌊filled · 100 / total⌋. */
  static completeness(filled: number, total: number): CrossFormula { return o('opendata-completeness', 'completeness(filled, total) = ⌊filled · 100 / total⌋', total > 0 ? Math.floor((filled * 100) / total) : 0, nat(filled, total) && total > 0 && filled <= total, 'completeness', [filled, total]) }
  /** FRESHNESS: the age of a dataset since its last update. value max(0, now − updated). */
  static freshness(now: number, updated: number): CrossFormula { return o('opendata-freshness', 'freshness(now, updated) = max(0, now − updated)', Math.max(0, now - updated), nat(now, updated), 'freshness', [now, updated]) }
  /** LICENSE: the share of openly-licensed datasets, as a percentage. value ⌊open · 100 / total⌋. */
  static license(open: number, total: number): CrossFormula { return o('opendata-license', 'license(open, total) = ⌊open · 100 / total⌋', total > 0 ? Math.floor((open * 100) / total) : 0, nat(open, total) && total > 0 && open <= total, 'license', [open, total]) }
  /** DOWNLOADS: files served at a count each. value files · each. */
  static downloads(files: number, each: number): CrossFormula { return o('opendata-downloads', 'downloads(files, each) = files · each', files * each, nat(files, each), 'downloads', [files, each]) }
  /** COVERAGE: the share of a requested coverage that is available, as a percentage. value ⌊available · 100 / requested⌋. */
  static coverage(available: number, requested: number): CrossFormula { return o('opendata-coverage', 'coverage(available, requested) = ⌊available · 100 / requested⌋', requested > 0 ? Math.floor((available * 100) / requested) : 0, nat(available, requested) && requested > 0 && available <= requested, 'coverage', [available, requested]) }
  /** SIZE: the bytes a dataset holds — records at a size each. value records · bytes. */
  static size(records: number, bytes: number): CrossFormula { return o('opendata-size', 'size(records, bytes) = records · bytes', records * bytes, nat(records, bytes), 'size', [records, bytes]) }
  /** FORMATS: the formats a dataset ships in — one tally and another. value a + b. */
  static formats(a: number, b: number): CrossFormula { return o('opendata-formats', 'formats(a, b) = a + b', a + b, nat(a, b), 'formats', [a, b]) }
}

for (const name of ['completeness', 'coverage', 'downloads', 'formats', 'freshness', 'license', 'records', 'size'] as const)
  hexRegisterOf('opendata', name, (OpendataFormulas[name] as (...x: unknown[]) => unknown).bind(OpendataFormulas))
