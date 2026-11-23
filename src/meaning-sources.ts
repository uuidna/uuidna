// meaning-sources — EVERY WING'S MEANING NAMES WHERE IT COMES FROM.
//
// WHAT THE KERNEL CHECKS AND WHAT IT DOES NOT. A wing's theorems are closed arithmetic, and the Lean kernel decides
// each one: `64 - 128 + 64 = 0` is true whoever wrote it. What the kernel never sees is the sentence beside it — that
// 64 is a chessboard, that 128 is its edges on a torus, that the zero is an Euler characteristic. That reading is
// prose in a doc comment, written by an emitter, and it is where a wrong assumption enters without breaking a single
// proof: the arithmetic stays green while the meaning attached to it is anyone's.
//
// THE DECIDABLE QUESTION (the captain, 2026-11-23: "gate the meaning to be always coming from sources and not manual
// editing ... all lean meaning comes from mathlib and textbooks"). For each wing, does its text NAME A SOURCE a reader
// can open — a DOI, an ISBN, a standard, an arXiv or OEIS number, or the Mathlib declaration it restates? A wing that
// names none carries meaning on its author's word alone, and that is the gap.
//
// MATHLIB IS NAMED, NOT IMPORTED. Every wing is kernel-only by design, so a wing takes a definition's meaning from
// Mathlib by naming the declaration it restates (`Mathlib.Combinatorics.SimpleGraph.Basic`), which a reader can open
// and compare, and the proof still depends on nothing but the kernel.
//
// this reports whether a source is NAMED, never whether the wing reads it correctly. A named source is the
// precondition for checking a meaning; it is not the check. Integrity, not truth.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { toUuid, merkleFold } from './address.js'
import { REFERENCES_BY_WING } from './references-resolved.js'

/** A SOURCE, IN THE FORMS A READER CAN OPEN. Each is an identifier a registry resolves, never a bare name: "Wikipedia"
 *  or "the official rules" names no edition and no page, so it is not a source here. */
export const SOURCE_FORMS: readonly { kind: string; form: RegExp }[] = [
  { kind: 'doi', form: /\b10\.\d{4,9}\/[^\s"'<>)\]]+/ },
  { kind: 'mathlib', form: /\bMathlib\.[A-Z][A-Za-z0-9_]*(?:\.[A-Z][A-Za-z0-9_]*)*/ },
  { kind: 'isbn', form: /\bISBN(?:-1[03])?:?\s*(?:97[89][- ]?)?\d[\d -]{7,14}[\dXx]\b/ },
  { kind: 'rfc', form: /\bRFC\s?\d{3,5}\b/ },
  { kind: 'standard', form: /\b(?:ISO\/IEC|ISO|IEC|IEEE|FIPS|ITU-T)\s?[A-Z]{0,3}\.?\d[\d.:-]*/ },
  { kind: 'arxiv', form: /\barXiv:\s?(?:\d{4}\.\d{4,5}|[a-z-]+\/\d{7})\b/ },
  { kind: 'oeis', form: /\bOEIS\s+A\d{6}\b/ },
]

export interface WingSource {
  wing: string
  /** the kinds of source the wing names, in SOURCE_FORMS order; empty when it names none */
  kinds: string[]
}

/** sourceKindsOf(text) → the kinds of source a text names. Pure, so a control can be decided without a tree. */
export const sourceKindsOf = (text: string): string[] =>
  SOURCE_FORMS.filter(({ form }) => form.test(text)).map(({ kind }) => kind)

/** wingSources() → every wing under lean/ with the kinds of source it names. A wing whose DOIs the resolved
 *  bibliography already carries counts as 'doi' from that record, the registry's answer rather than a pattern's. */
export function wingSources(dir: string = join(ROOT, 'lean')): WingSource[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((name) => name.endsWith('.lean')).sort().map((wing) => {
    const kinds = sourceKindsOf(readFileSync(join(dir, wing), 'utf8'))
    const resolved = (REFERENCES_BY_WING[wing]?.length ?? 0) > 0
    return { wing, kinds: resolved && !kinds.includes('doi') ? ['doi', ...kinds] : kinds }
  })
}

export interface MeaningCensus {
  wings: number
  sourced: number
  /** wings by the kind of source they name; a wing naming two kinds is counted under each */
  byKind: Record<string, number>
  unsourced: string[]
  receipt: string
  honest: string
}

const HONEST =
  'This census establishes that a wing NAMES a source a reader can open. It does not establish that the wing reads ' +
  'the source correctly, and no pattern could: that comparison is a person\'s, or a trial\'s. The arithmetic in every ' +
  'wing is decided by the kernel either way; what is counted here is whether the meaning beside it has an origin ' +
  'other than its author.'

export function meaningCensus(rows: WingSource[] = wingSources()): MeaningCensus {
  const unsourced = rows.filter((r) => r.kinds.length === 0).map((r) => r.wing)
  const byKind: Record<string, number> = {}
  for (const r of rows) for (const k of r.kinds) byKind[k] = (byKind[k] ?? 0) + 1
  return {
    wings: rows.length,
    sourced: rows.length - unsourced.length,
    byKind,
    unsourced,
    receipt: merkleFold([toUuid('meaning-sources|' + rows.length), ...unsourced.map((w) => toUuid('unsourced|' + w))]),
    honest: HONEST,
  }
}

/** the gaps, in the guard's shape: one row for the wings whose meaning names no source */
export const meaningSourceGaps = (rows: WingSource[] = wingSources()): { what: string; fix: string }[] => {
  const c = meaningCensus(rows)
  if (c.unsourced.length === 0) return []
  const shown = 6
  return [{
    what: `${c.unsourced.length} of ${c.wings} wing(s) name NO source for their meaning — the kernel decides their arithmetic, and what the numbers stand for rests on the emitter's word: ${c.unsourced.slice(0, shown).join(', ')}${c.unsourced.length > shown ? ` …and ${c.unsourced.length - shown} more` : ''}`,
    fix: 'have the wing\'s emitter name the source in the module header or the doc comment: a DOI, an ISBN, a standard number, an arXiv or OEIS id, or the Mathlib declaration the definition restates (the forms are SOURCE_FORMS). Edit the emitter, never the generated .lean — a source typed into generated output is lost on the next regeneration.',
  }]
}
