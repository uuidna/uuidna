import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEDUP — CONTENT-ADDRESSED STORAGE, AS ARITHMETIC. The RAID array fingerprints what it carries: identical bytes share
 *  one physical block, so a file uploaded any number of times is stored once (the fingerprint is its address). A block is
 *  held by its reference count — the live links to it — and when the last link drops it is released from the load
 *  (garbage-collected at zero references), releasable only when no legal hold stands: a measure in compliance with
 *  regulation, never counsel. Deterministic integer identities — fingerprint match, physical vs logical bytes, the dedup
 *  ratio, content-defined chunks, refcount up and down, pin, release. Crosses to `raid`. A measure, not advice. */

const PROOF = 'content-addressed storage arithmetic: a fingerprint stores identical bytes once however many times uploaded (deduped, hit, saved), logical vs physical bytes and the dedup ratio, content-defined chunking, and reference counting (refcount, incref, decref, pinned) that releases a block from the load when the last link drops — releasable only with no legal hold, a measure in compliance with regulation; deterministic integer identities crossed to raid; a measure, never counsel'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const d = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dedup', dst: 'raid', formula, value, proof: PROOF, ...extra }, holds, { name: `dedup.${name}`, params })

export class DedupFormulas {
  /** FINGERPRINT — the content address: two contents share one physical block iff their fingerprints match. value [a = b]. */
  static fingerprint(a: number, b: number): CrossFormula { return d('dedup-fingerprint', 'fingerprint(a, b) = [a = b] — equal content, one block', a === b ? 1 : 0, nat(a, b), 'fingerprint', [a, b]) }
  /** DEDUPED — however many times identical content is uploaded, one physical copy is kept. value 1; holds uploads ≥ 1. */
  static deduped(uploads: number): CrossFormula { return d('dedup-deduped', 'deduped(uploads) = 1 physical copy for any number of identical uploads', uploads >= 1 ? 1 : 0, nat(uploads) && uploads >= 1, 'deduped', [uploads]) }
  /** HIT — the dedup hits: uploads that matched an existing block and stored nothing. value uploads − 1; holds uploads ≥ 1. */
  static hit(uploads: number): CrossFormula { return d('dedup-hit', 'hit(uploads) = uploads − 1 (uploads that matched an existing block)', Math.max(uploads, 1) - 1, nat(uploads) && uploads >= 1, 'hit', [uploads]) }
  /** SAVED — the useless redundancy dedup removes: every upload past the first costs no storage. value (uploads − 1) · size; holds uploads ≥ 1. */
  static saved(uploads: number, size: number): CrossFormula { return d('dedup-saved', 'saved(uploads, size) = (uploads − 1) · size (useless redundancy not stored)', (Math.max(uploads, 1) - 1) * size, nat(uploads, size) && uploads >= 1, 'saved', [uploads, size]) }
  /** LOGICAL — the bytes the uploads claim, before dedup. value uploads · size. */
  static logical(uploads: number, size: number): CrossFormula { return d('dedup-logical', 'logical(uploads, size) = uploads · size (bytes claimed before dedup)', uploads * size, nat(uploads, size), 'logical', [uploads, size]) }
  /** PHYSICAL — the bytes actually stored: one copy per distinct content. value unique · size. */
  static physical(unique: number, size: number): CrossFormula { return d('dedup-physical', 'physical(unique, size) = unique · size (one copy per distinct content)', unique * size, nat(unique, size), 'physical', [unique, size]) }
  /** RATIO — the dedup ratio, logical over physical as an integer percentage. value ⌊logical · 100 / physical⌋; holds physical > 0. */
  static ratio(logical: number, physical: number): CrossFormula { return d('dedup-ratio', 'ratio(logical, physical) = ⌊logical · 100 / physical⌋', physical > 0 ? Math.floor((logical * 100) / physical) : 0, nat(logical, physical) && physical > 0, 'ratio', [logical, physical]) }
  /** BLOCKS — the physical blocks kept: the number of distinct contents. value unique. */
  static blocks(unique: number): CrossFormula { return d('dedup-blocks', 'blocks(unique) = unique (physical blocks = distinct contents)', unique, nat(unique), 'blocks', [unique]) }
  /** CHUNK — a file split into content-defined chunks of a fixed size, each separately fingerprinted. value ⌈size / chunksize⌉; holds chunksize > 0. */
  static chunk(size: number, chunksize: number): CrossFormula { return d('dedup-chunk', 'chunk(size, chunksize) = ⌈size / chunksize⌉ (content-defined chunks)', chunksize > 0 ? Math.ceil(size / chunksize) : 0, nat(size, chunksize) && chunksize > 0, 'chunk', [size, chunksize]) }
  /** REFCOUNT — the live links to a block: the references holding it in storage. value links. */
  static refcount(links: number): CrossFormula { return d('dedup-refcount', 'refcount(links) = links referencing the block', links, nat(links), 'refcount', [links]) }
  /** INCREF — a new link taken on a block. value links + 1. */
  static incref(links: number): CrossFormula { return d('dedup-incref', 'incref(links) = links + 1 (a new reference)', links + 1, nat(links), 'incref', [links]) }
  /** DECREF — a link dropped; the count never falls below zero. value max(0, links − 1). */
  static decref(links: number): CrossFormula { return d('dedup-decref', 'decref(links) = max(0, links − 1) (a reference dropped)', Math.max(0, links - 1), nat(links), 'decref', [links]) }
  /** PINNED — a block stays pinned in storage while any link references it. value [links > 0]. */
  static pinned(links: number): CrossFormula { return d('dedup-pinned', 'pinned(links) = [links > 0] — held while referenced', links > 0 ? 1 : 0, nat(links), 'pinned', [links]) }
  /** RELEASED — when the last link drops the block is released from the load: garbage-collected at zero references. value [links = 0]. */
  static released(links: number): CrossFormula { return d('dedup-released', 'released(links) = [links = 0] — released when no link remains', links === 0 ? 1 : 0, nat(links), 'released', [links]) }
  /** RELEASABLE — releasable only with no links AND no legal hold: release measured against retention, in compliance with
   *  regulation — a measure, never counsel. value [links = 0 ∧ hold = 0]. */
  static releasable(links: number, hold: number): CrossFormula { return d('dedup-releasable', 'releasable(links, hold) = [links = 0 ∧ hold = 0] — released only when unreferenced and no legal hold stands', links === 0 && hold === 0 ? 1 : 0, nat(links, hold), 'releasable', [links, hold]) }
}

for (const name of ['blocks', 'chunk', 'decref', 'deduped', 'fingerprint', 'hit', 'incref', 'logical', 'physical', 'pinned', 'ratio', 'refcount', 'releasable', 'released', 'saved'] as const)
  hexRegisterOf('dedup', name, (DedupFormulas[name] as (...x: unknown[]) => unknown).bind(DedupFormulas))
