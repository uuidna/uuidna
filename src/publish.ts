// publish — write PUBLICATIONS in lean, human prose, AUDITED before it is published. A publication is a short,
// readable note about ONE domain, composed by READING that domain's SEALED theorems and writing only what they
// settle: every load-bearing sentence LINKS the proof that backs it (/theorem/<key>), so the prose earns its
// claims exactly the way any prose on uuidna does — by pointing at a proof, or being demarcated, or being audited.
//
// Writing here descends from READING. The note is written by reading the ledger the package already sealed; a
// sentence keeps its place only if a proof backs it. auditPublication runs the SAME honesty gate the site-wide
// provenance audit runs (computes + the translation-aware overreach lexicon), BEFORE publishing — so an
// overclaiming note is REFUSED, never shipped. `publishable` is false when any sentence trips the gate unbacked;
// the generator (docs/publications/[slug].paths.js) fails the build rather than emit it. Audited before published.
//
// HONEST SCOPE (integrity, not truth): a publication proves that every claim it makes is backed by a sealed Lean
// proof and that the note itself passes the overreach gate. It does NOT claim the domain is complete, nor that the
// prose is elegant — only that it says nothing its theorems do not. Its content-address recomputes from the text;
// the member proofs fold, order-invariantly, to one receipt anyone recomputes from the same ledger.
import { THEOREMS, type Theorem, PRINCIPLES } from './theorems/index.js'
import { computes, RED, RED_INTL, rosetta } from './gate.js'
import { toUuid, merkleFold } from './address.js'

/** A finding: a sentence that leans on an overreach token without a proof to back it or a demarcation to clear it. */
export interface PubFinding { unit: string; token: string; address: string }

/** A publication — a domain note in lean human prose, each claim backed by a proof, audited before it is published. */
export interface Publication {
  slug: string
  title: string
  file: string
  theorems: string[]        // the sealed theorem keys it reads and links
  count: number
  abstract: string
  markdown: string          // the note, in lean human prose — every claim links its proof
  address: string           // content-address of the note (recomputable from the text)
  receipt: string           // the member proofs' addresses, folded order-invariantly to one receipt
  publishable: boolean      // true iff the note passes the honesty gate — audited BEFORE it is published
  findings: PubFinding[]     // why it is not publishable (empty when it is)
  honest: string
}

// A sentence is BACKED when it links a proof (/theorem/<key>) or names a sealed theorem key — the provenance rule.
const SEALED = new Set(THEOREMS.map((t) => t.key))
const backed = (u: string): boolean => /\/theorem\//.test(u) || [...SEALED].some((k) => u.includes(k))
// A demarcation/negation clears an overreach token — honest prose ("never infinite", "bounded", "simulation") is
// the CORRECT use of these words, not a boast. Mirrors the site-wide provenance gate so the rule is one rule.
const DEMARCATED = /\b(not|never|no|non|isn'?t|aren'?t|cannot|can'?t|without|honest|honestly|simulation|integrity|finite|bounded|refus\w*|forbid\w*|impossible|reject\w*|prohibit\w*|ruled out|demarcat)\b/i

// Split prose into sentence-ish units, dropping fenced/inline code (examples legitimately carry API strings) and
// normalising each unit's leading markdown marker (list `-`/`*`, heading `#`, blockquote `>`) so a claim reads the
// same whether it sits in a heading, a bullet or a paragraph — the marker is layout, not part of the assertion.
const units = (text: string): string[] =>
  text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/).map((s) => s.replace(/^[\s>#*-]+/, '').trim()).filter((s) => s.length > 0 && s.length < 2000)

// The overreach tripwire: the canonical honesty gate (computes) OR a proof-boast in any of the RED lexicons —
// English and 20+ languages, checked against the text AND its Glagolitic→Cyrillic fold, so a boast cannot hide in
// another script. A quoted phrase is a CITATION, not a claim, so de-quote before matching.
const tripped = (u: string): string | null => {
  const cited = u.replace(/'[^']*'|"[^"]*"|“[^”]*”|«[^»]*»/g, ' ')
  const g = computes(cited)
  if (g.binary === 0 && g.hit) return g.hit
  if (RED.test(cited) || RED.test(rosetta(cited))) return (cited.match(RED) || rosetta(cited).match(RED))![0]
  if (RED_INTL.test(cited) || RED_INTL.test(rosetta(cited))) return (cited.match(RED_INTL) || rosetta(cited).match(RED_INTL))![0]
  return null
}

/** auditPublication(markdown[, sealed]) → the findings that block publishing: every sentence that trips the
 *  overreach gate UNBACKED by a proof and UNDEMARCATED. Empty ⇒ the note is publishable. The same gate the site-wide
 *  provenance audit runs, applied to a note BEFORE it is written to the site — so an overclaiming note is refused,
 *  not shipped. `sealed` pre-clears units that ARE sealed, committed, already-audited artifacts (a domain title, a
 *  blurb, a theorem's own name) — exactly as the site audit clears a theorem's words by its proof; only the note's
 *  OWN framing prose is then held to the strict gate. Called with no `sealed` set it audits any prose strictly. */
export function auditPublication(markdown: string, sealed: Set<string> = new Set()): PubFinding[] {
  const findings: PubFinding[] = []
  for (const u of units(markdown)) {
    if (sealed.has(u)) continue
    const token = tripped(u)
    if (token && !backed(u) && !DEMARCATED.test(u.replace(token, ' ')))
      findings.push({ unit: u.length > 160 ? u.slice(0, 157) + '…' : u, token, address: toUuid(u) })
  }
  return findings
}

const slugOf = (file: string): string => file.replace(/\.lean$/i, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
const blurbOf = Object.fromEntries(PRINCIPLES.map((p) => [p[0], p[2]]))
const titleOf = Object.fromEntries(PRINCIPLES.map((p) => [p[0], p[1]]))

/** composePublication(file) → a domain note in lean human prose, read from the SEALED theorems of one lean/*.lean
 *  file and audited before it is returned. Every claim links its proof; the note is content-addressed and its member
 *  proofs fold to one receipt. `publishable` reports the gate verdict — the generator refuses to ship a false one. */
export function composePublication(file: string): Publication {
  const ts: Theorem[] = THEOREMS.filter((t) => t.file === file)
  if (ts.length === 0) throw new Error(`publish: no sealed theorems for ${file}`)
  const title = titleOf[file] || file
  const slug = slugOf(file)
  const blurb = blurbOf[file] || ''
  // The lead — lean, honest, and bounded: it says what a publication proves and, plainly, what it does not. It does
  // not re-assert the domain's name as a bare noun (that is the title's job, demarcated by the blurb above it).
  const abstract =
    `These ${ts.length} facts hold by decision. Each was proven in Lean 4 — no Mathlib, ` +
    `checked sorry-free — and every sentence below links the proof that seals it. This note claims nothing beyond ` +
    `what its theorems settle: not that the domain is complete, only that the prose says nothing the proofs do not. ` +
    `It was written by reading the sealed ledger; read the proofs, not the prose.`
  // The body — each sealed theorem's own human sentence, BACKED by a link to its proof. The theorem name IS the
  // honest claim (it is authored beside the proof and audited on every theorem page), so the note reads as prose
  // while every load-bearing sentence points at the proof that earns it.
  const body = ts.map((t) => `- ${t.name} — [proof](/theorem/${t.key}).`).join('\n')
  const receipt = merkleFold(ts.map((t) => t.address))
  const markdown =
    `# ${title}\n\n` +
    `> ${blurb}\n\n` +
    `${abstract}\n\n` +
    `## The facts, each backed by its proof\n\n${body}\n\n` +
    `## Provenance\n\n` +
    `These ${ts.length} proofs fold, order-invariant, to the receipt \`${receipt}\` — recompute it from the same ` +
    `ledger and it returns. The note itself content-addresses to a uuid, so any edit is visible. Writing descends ` +
    `from reading: this note holds only what the proofs it links already sealed, and it was audited by uuidna's own ` +
    `honesty gate before it was published — a sentence that overreached a proof would have been refused, not shipped.\n\n` +
    `Source · [lean/${file}](https://github.com/uuidna/uuidna/blob/main/lean/${file}) · [all theorems](/theorems)\n`
  // Pre-clear the SEALED, committed, already-audited artifacts woven into the note — the domain title, its blurb,
  // and each theorem's own name (each backed by its proof and audited on its own page, exactly as the site audit
  // clears a theorem's words by its key). Only the note's OWN framing prose (abstract, provenance) is then held to
  // the strict gate — writing that overreaches a proof is refused, but reading a sealed claim aloud is not.
  const sealed = new Set<string>([...units(title), ...units(blurb), ...ts.flatMap((t) => units(t.name))])
  const findings = auditPublication(markdown, sealed)
  return {
    slug, title, file, theorems: ts.map((t) => t.key), count: ts.length,
    abstract, markdown, address: toUuid(markdown), receipt,
    publishable: findings.length === 0, findings,
    honest:
      'A publication proves that every claim it makes links a sealed Lean proof and that the note passes the ' +
      'overreach gate — audited BEFORE publishing, refused if it overreaches. It does NOT claim the domain is ' +
      'complete or the prose elegant, only that the note says nothing its theorems do not. Integrity, not truth.',
  }
}

/** Every domain's publication, in principle order — the automated stream of audited notes. Each is composed by
 *  reading its sealed theorems and audited before it is returned; `publishable` flags any that overreach (none
 *  should, since every claim links its proof). The caller (build, MCP, audit) decides what to do with a false one. */
export function publications(): Publication[] {
  const files = PRINCIPLES.map((p) => p[0]).filter((f) => THEOREMS.some((t) => t.file === f))
  return files.map(composePublication)
}
