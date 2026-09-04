// underreach — THE OPPOSITE FAULT TO OVERREACH, and until now only one of the two had a finder.
//
// src/gate.ts refuses a sentence that claims MORE than its proofs earn. That is the dangerous direction and it
// is guarded. The captain named the other one (2026-09-04, "ensure no under claims or under reach", "claim bold
// all reachable"): a sentence that claims LESS than its proofs earn is also a false statement about the ledger,
// and it costs something real — a theorem decided over every case, described as though it were a sample, tells a
// reader to trust it less than the kernel does. A proof hedged is a proof wasted.
//
// THE RULE IS NARROW ON PURPOSE, because the loose version is useless. Hedge words are not faults by themselves:
//   - "the court MAY NOT refute" is a prohibition, not a hedge
//   - "MAY safely exceed by 2:1" is Haldane's permission, quoted
//   - "ROUGHLY 365.2422 days" is a correctly-scoped empirical quantity, and saying so is honesty, not timidity
// All three appear in the sealed ledger and all three are right. So under-reach is NOT "a hedge near a proof". It
// is a hedge APPLIED TO THE ACT OF PROVING — "may be proven", "appears to be decided", "possibly sealed" — and
// never in a sentence that declares its quantity measured, because a measurement's uncertainty is a fact about
// the measurement. Measured before it was written: 0 in 696 publication-abstract sentences, and 3 in 5747
// theorem names, all three of the legitimate forms above and none of them matched by the rule below.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { THEOREMS } from './theorems/index.js'
import { publications } from './publish.js'
import { toUuid, merkleFold } from './address.js'
import { ROOT } from './boundary.js'

/** A hedge, immediately applied to the act of proving. This is the whole fault. */
// `hold` EARNED A QUALIFIER, and the corpus is what taught it: "nothing about what a payload should hold" is
// containment, not truth, and the first version of this rule flagged it. English overloads the word, so the
// proving sense has to be established by what follows — "holds for", "hold true", "hold in every", "hold over" —
// and the containment sense is left alone. A finder that cries wolf on correct prose gets switched off, and then
// the real under-claim walks through.
export const UNDERREACH_RE =
  /\b(may|might|could|should|possibly|perhaps|probably|arguably|apparently|seems?|appears?)\s+(?:well\s+|be\s+|to\s+be\s+|have\s+been\s+)?(?:prov(?:en|ed|able)|decid(?:ed|able)|seal(?:ed)?|verified|follows?|be\s+true|be\s+correct|holds?\s+(?:true|for\b|in\s+every|over\b))/i

/** A sentence that declares its quantity empirical is CORRECTLY scoped — an uncertainty there is a fact. */
export const MEASURED_RE = /\b(measur\w+|empirical\w*|observ\w+|reading|readings|estimate\w*|sampled?)\b/i

export interface UnderreachFinding {
  where: string
  sentence: string
  hedge: string
}

const sentencesOf = (text: string): string[] => String(text).split(/(?<=[.!?])\s+/)

/** underreachIn(label, text) → every sentence that hedges the act of proving. */
export function underreachIn(where: string, text: string): UnderreachFinding[] {
  const out: UnderreachFinding[] = []
  for (const s of sentencesOf(text)) {
    const m = UNDERREACH_RE.exec(s)
    if (!m) continue
    if (MEASURED_RE.test(s)) continue
    out.push({ where, sentence: s.trim().slice(0, 200), hedge: m[0] })
  }
  return out
}

export interface UnderreachCensus {
  scanned: number
  findings: UnderreachFinding[]
  /** how many sentences each surface contributed — a surface at 0 is a surface that was not read */
  bySurface: Record<string, number>
  clean: boolean
  receipt: string
}

// THE DOMAIN MUST BE AS WIDE AS THE DEFECT, and a peer paid for that lesson twice in one day
// (millennium-solutions, 2026-09-04): their prose sweep walked `md|ts|vue`, they added `.lean`, and the count did
// not move — because the extractor knew markdown fences and `//` while Lean opens comments with `--`. It read
// zero lines from 19,519 published words and reported green, and an empty list looks exactly like a clean one.
// So this census covers every surface an under-claim could live on, and `bySurface` publishes the sentence count
// per surface: a surface reporting 0 SENTENCES is a blind extractor, which is a different fault from a clean one
// and is now visible in the answer rather than hidden behind a total. The test file plants a defect on each
// surface to prove the reader reaches it.
const MD_SKIP = new Set(['.vitepress', 'node_modules', 'public'])

function docSources(): { label: string; text: string }[] {
  const out: { label: string; text: string }[] = []
  const walk = (dir: string): void => {
    for (const n of readdirSync(dir)) {
      if (MD_SKIP.has(n)) continue
      const q = join(dir, n)
      if (statSync(q).isDirectory()) { walk(q); continue }
      if (n.endsWith('.md')) out.push({ label: 'doc/' + q.slice(ROOT.length + 1), text: readFileSync(q, 'utf8') })
    }
  }
  walk(join(ROOT, 'docs'))
  return out
}

/** leanProse() → the `--` comment prose of every wing. Lean's comment marker is NOT `//`; that is the whole
 *  reason this function exists as its own reader rather than a file-extension added to a markdown sweep. */
function leanProse(): { label: string; text: string }[] {
  return readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean')).map((f) => ({
    label: 'lean/' + f,
    text: readFileSync(join(ROOT, 'lean', f), 'utf8')
      .split('\n').filter((l) => l.trim().startsWith('--')).join(' '),
  }))
}

/** underreachCensus() → the whole sealed corpus, scanned. Deterministic; folds to one receipt. */
export function underreachCensus(): UnderreachCensus {
  const findings: UnderreachFinding[] = []
  const bySurface: Record<string, number> = { publication: 0, theorem: 0, doc: 0, lean: 0 }
  const take = (surface: string, label: string, text: string): void => {
    bySurface[surface] = (bySurface[surface] ?? 0) + sentencesOf(text).length
    findings.push(...underreachIn(label, text))
  }
  // The FULL monograph, not only its abstract: the proofs section, the provenance and the related rows are
  // published prose too, and an under-claim in any of them understates the ledger just as much.
  for (const p of publications()) take('publication', 'publication/' + p.slug, p.markdown)
  for (const t of THEOREMS) if (t.name) take('theorem', 'theorem/' + t.key, String(t.name))
  for (const d of docSources()) take('doc', d.label, d.text)
  for (const l of leanProse()) take('lean', l.label, l.text)
  const scanned = Object.values(bySurface).reduce((a, n) => a + n, 0)
  return {
    scanned,
    findings,
    bySurface,
    clean: findings.length === 0,
    receipt: merkleFold([toUuid('underreach|' + scanned), ...findings.map((f) => toUuid(f.where + '|' + f.hedge))]),
  }
}

/** gaps() → the guard's shape: what and the exact fix. */
export function underreachGaps(): { what: string; fix: string }[] {
  const c = underreachCensus()
  if (c.clean) return []
  return c.findings.slice(0, 12).map((f) => ({
    what: `${f.where} hedges the act of proving ("${f.hedge}"): ${f.sentence}`,
    fix: 'state it at full strength — the proof is sealed, so the sentence may claim it outright; if the quantity really is empirical, say measured and the scope is honest rather than timid',
  }))
}
