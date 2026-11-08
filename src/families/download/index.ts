import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DOWNLOAD — THE DOWNLOAD BLOCK USE CASE FROM payloadcms/website, AS ARITHMETIC. A file served to a browser is numbers:
 *  the transfer rate, the time left, how far it has come, the chunks it splits into, what remains to resume, the formats
 *  offered, the checksum that validated, and the total size of a set. Crosses to `frontend` — download is what the browser
 *  renders. A measure. */

const PROOF = 'download arithmetic (rate, eta, progress, chunks, resume, formats, checksum, size); the Download block use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'download', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `download.${name}`, params })

export class DownloadFormulas {
  /** TRANSFER RATE: bytes over seconds. value ⌊bytes / seconds⌋. */
  static rate(bytes: number, seconds: number): CrossFormula { return c('download-rate', 'rate(bytes, seconds) = ⌊bytes / seconds⌋', seconds > 0 ? Math.floor(bytes / seconds) : 0, nat(bytes, seconds) && seconds > 0, 'rate', [bytes, seconds]) }
  /** ETA: the seconds left for the remaining bytes at a rate. value ⌈bytes / rate⌉. */
  static eta(bytes: number, rate: number): CrossFormula { return c('download-eta', 'eta(bytes, rate) = ⌈bytes / rate⌉', rate > 0 ? Math.ceil(bytes / rate) : 0, nat(bytes, rate) && rate > 0, 'eta', [bytes, rate]) }
  /** PROGRESS as a percentage. value ⌊done · 100 / total⌋. */
  static progress(done: number, total: number): CrossFormula { return c('download-progress', 'progress(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'progress', [done, total]) }
  /** CHUNKS: the pieces a file splits into at a size each. value ⌈bytes / per⌉. */
  static chunks(bytes: number, per: number): CrossFormula { return c('download-chunks', 'chunks(bytes, per) = ⌈bytes / per⌉', per > 0 ? Math.ceil(bytes / per) : 0, nat(bytes, per) && per > 0, 'chunks', [bytes, per]) }
  /** RESUME: the bytes that remain after an interruption. value max(0, total − done). */
  static resume(done: number, total: number): CrossFormula { return c('download-resume', 'resume(done, total) = max(0, total − done)', Math.max(0, total - done), nat(done, total), 'resume', [done, total]) }
  /** FORMATS: the count of formats offered. value count. */
  static formats(count: number): CrossFormula { return c('download-formats', 'formats(count) = count', count, nat(count), 'formats', [count]) }
  /** CHECKSUM: the share of blocks that validated, as a percentage. value ⌊valid · 100 / total⌋. */
  static checksum(valid: number, total: number): CrossFormula { return c('download-checksum', 'checksum(valid, total) = ⌊valid · 100 / total⌋', total > 0 ? Math.floor((valid * 100) / total) : 0, nat(valid, total) && total > 0 && valid <= total, 'checksum', [valid, total]) }
  /** SIZE: files at a size each. value files · each. */
  static size(files: number, each: number): CrossFormula { return c('download-size', 'size(files, each) = files · each', files * each, nat(files, each), 'size', [files, each]) }
}

for (const name of ['checksum', 'chunks', 'eta', 'formats', 'progress', 'rate', 'resume', 'size'] as const)
  hexRegisterOf('download', name, (DownloadFormulas[name] as (...x: unknown[]) => unknown).bind(DownloadFormulas))
