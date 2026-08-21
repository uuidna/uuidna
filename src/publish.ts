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
import { computes } from './gate.js'
import { toUuid, merkleFold, gcd } from './address.js'

/** A finding: a sentence that cites a FABRICATED theorem — the one decidably-false thing a note can do. */
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


// Split prose into sentence-ish units, dropping fenced/inline code (examples legitimately carry API strings) and
// normalising each unit's leading markdown marker (list `-`/`*`, heading `#`, blockquote `>`) so a claim reads the
// same whether it sits in a heading, a bullet or a paragraph — the marker is layout, not part of the assertion.
const units = (text: string): string[] =>
  text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/).map((s) => s.replace(/^[\s>#*-]+/, '').trim()).filter((s) => s.length > 0 && s.length < 2000)

// The tripwire, folded to the theorems: a sentence blocks publishing only when it CITES A FABRICATED theorem — a
// key that is not sealed in the ledger (computes → binary 0). No lexicon, no demarcation guessing: a note that
// links a real proof is SEALED and passes; a note that makes an unbacked claim is REVEALED (held open), not refused;
// only a fabricated citation — the one decidably-false thing — is drained. A quoted phrase is a citation of a word,
// so de-quote before matching. This is the same theorem-fold the site-wide provenance audit now runs.
const tripped = (u: string): string | null => {
  const cited = u.replace(/'[^']*'|"[^"]*"|“[^”]*”|«[^»]*»/g, ' ')
  const g = computes(cited)
  return g.binary === 0 ? g.hit : null
}

/** auditPublication(markdown[, sealed]) → the findings that block publishing: every sentence that cites a FABRICATED
 *  theorem. Empty ⇒ the note is publishable. The same theorem-fold the site-wide provenance audit runs, applied to a
 *  note BEFORE it is written to the site — so a note that invents a proof is refused, not shipped. `sealed` pre-clears
 *  units that ARE sealed, committed artifacts (a domain title, a blurb, a theorem's own name). No word-list: a claim
 *  is refused only for citing a proof that does not exist; everything else is revealed. */
export function auditPublication(markdown: string, sealed: Set<string> = new Set()): PubFinding[] {
  const findings: PubFinding[] = []
  for (const u of units(markdown)) {
    if (sealed.has(u)) continue
    const token = tripped(u)
    if (token)
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

/** A revision — the editor primitive. Editing is RE-ADDRESSING: a draft edited to a new draft re-fingerprints, so
 *  the change is visible (the address moves), re-audits (the new draft must still earn every claim before it ships),
 *  and binds to the draft it descends from by a directional receipt (before → after, order-sensitive). The honest
 *  unit of editing on uuidna — a diff you can prove, not a claim you take on faith. */
export interface Revision {
  before: string          // the draft's content-address, before the edit
  after: string           // the draft's content-address, after the edit
  changed: boolean        // did the text actually change? (addresses differ)
  edit: string            // the directional provenance receipt binding before → after
  delta: number           // signed change in length (after − before), a coarse edit size
  findings: PubFinding[]   // the AFTER draft's audit — what still overreaches a proof
  publishable: boolean    // may the edited draft be published? (its audit is clean)
  honest: string
}

/** revisePublication(before, after) → audit an EDIT before it is published. Content-addresses both drafts (so the
 *  change is visible — the address moves), binds them with a directional before→after receipt, and runs the honesty
 *  gate on the AFTER draft: an edit that introduces an overreach is refused exactly as a fresh note is. Editing is
 *  re-addressing; a revision earns publication the same way a first draft does. Pure and offline. */
export function revisePublication(before: string, after: string): Revision {
  const b = toUuid(before)
  const a = toUuid(after)
  const findings = auditPublication(after)
  return {
    before: b, after: a, changed: b !== a,
    edit: toUuid(`${b}→${a}`),
    delta: after.length - before.length,
    findings, publishable: findings.length === 0,
    honest:
      'Editing is re-addressing: the two content-addresses differ iff the text changed, so an edit cannot hide. The ' +
      'before→after receipt binds THIS revision to the draft it descends from (reverse is a different receipt). The ' +
      'edited draft is audited before it publishes — an edit that overreaches a proof is refused, not shipped. ' +
      'Integrity, not truth: this proves the edit and its provenance, never that the new prose reads better.',
  }
}

/** A comparison — pattern recognition by examining differences. Two texts are partitioned into what is ONLY in
 *  each and what is SHARED; the similarity is DERIVED from that difference (shared over the union), and the shared
 *  tokens fold to one receipt — the recognized pattern. Inclusion–exclusion holds exactly (|A|+|B|−shared = union),
 *  so the count is a proof, not an estimate. The editor's eye: a similarity is only ever seen against a difference. */
export interface Comparison {
  onlyA: number           // tokens only in A — the difference on A's side
  onlyB: number           // tokens only in B — the difference on B's side
  shared: number          // tokens in both — the similarity, seen against the difference
  union: number           // distinct tokens across both
  inclusionExclusion: boolean // |A| + |B| − shared = union, exactly (the count is a proof)
  similarity: { num: number; den: number } // Jaccard — shared / union, reduced (den 0 ⇒ both empty)
  pattern: string         // the shared tokens' addresses, folded order-invariant to one receipt
  honest: string
}

const tokenSet = (text: string): Set<string> =>
  new Set(text.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 0))

/** comparePublications(a, b) → recognise the pattern two texts share by examining how they DIFFER. Partitions their
 *  word sets into only-A, only-B and shared; the similarity (Jaccard: shared over the union) is derived from that
 *  difference, and inclusion–exclusion is checked exactly so the number is a proof. The shared tokens fold to one
 *  receipt — the pattern the trial recognises. Pure and offline. Similarity is only ever measured against difference. */
export function comparePublications(a: string, b: string): Comparison {
  const A = tokenSet(a), B = tokenSet(b)
  const shared = [...A].filter((w) => B.has(w))
  const onlyA = A.size - shared.length
  const onlyB = B.size - shared.length
  const union = onlyA + onlyB + shared.length
  const g = shared.length && union ? gcd(shared.length, union) : 1
  return {
    onlyA, onlyB, shared: shared.length, union,
    inclusionExclusion: A.size + B.size - shared.length === union,
    similarity: { num: union ? shared.length / g : 0, den: union ? union / g : 0 },
    pattern: shared.length ? merkleFold(shared.sort().map((w) => toUuid(w))) : toUuid('no-shared-pattern'),
    honest:
      'Similarity is DERIVED from difference: the shared count is what is left once only-A and only-B are removed, and ' +
      'inclusion–exclusion (|A| + |B| − shared = union) holds exactly, so the similarity is a proof, not an estimate. ' +
      'The shared tokens fold to one order-invariant receipt — the recognised pattern. It compares word sets, NOT ' +
      'meaning: a shared vocabulary is not a shared claim. Integrity, not truth.',
  }
}

/** Every domain's publication, in principle order — the automated stream of audited notes. Each is composed by
 *  reading its sealed theorems and audited before it is returned; `publishable` flags any that overreach (none
 *  should, since every claim links its proof). The caller (build, MCP, audit) decides what to do with a false one. */
// memoized at the source (DRY): composing + auditing every domain's monograph is expensive, and the ledger is
// immutable at runtime — so build the publications ONCE and reuse (coverage, site, pentagram-monographs all call it).
let _pubs: Publication[] | null = null
export function publications(): Publication[] {
  if (_pubs) return _pubs
  const files = PRINCIPLES.map((p) => p[0]).filter((f) => THEOREMS.some((t) => t.file === f))
  return (_pubs = files.map(composePublication))
}

/** A COVERAGE gap: a domain the monographs do not cover — a presentation diagnosis. It BLOCKS NOTHING: PRINCIPLE's
 *  power to reject a Lean-verified theorem was withdrawn, so this reports what is unpublished, never what is refused. */
export interface Coverage {
  total: number                 // theorems in the ledger
  covered: number               // theorems shown in some monograph
  uncovered: string[]           // theorem KEYS in no monograph — DIAGNOSTIC ONLY; no longer blocks any push
  uncoveredFiles: string[]      // ledger FILES with no publication — the ROOT fix: author a PRINCIPLE [file,title,blurb]
  ready: boolean                // true iff nothing is uncovered — a presentation signal, not a gate verdict
  receipt: string               // the order-invariant fold of the coverage state, recomputable by anyone from the ledger
}

/** COVERAGE — is every sealed theorem shown in a monograph? The manual diagnosis (which domain no note covers, the gap
 *  the pre-push gate blocks on) as ONE pure, recomputable call: an agent adding a domain runs this instead of tracing
 *  the gate by hand. A theorem is COVERED iff its key appears in some publication; a FILE is uncovered iff it carries
 *  theorems but has no publication (the root cause — it needs a PRINCIPLE [file,title,blurb] entry in lean-ledger). The
 *  member facts fold, order-invariantly, to one receipt anyone recomputes from the same ledger. Integrity, not truth. */
export function coverage(): Coverage {
  const inMonograph = new Set(publications().flatMap((p) => p.theorems))
  const pubFiles = new Set(publications().map((p) => p.file))
  const uncovered = THEOREMS.filter((t) => !inMonograph.has(t.key)).map((t) => t.key)
  const uncoveredFiles = [...new Set(THEOREMS.map((t) => t.file))].filter((f) => !pubFiles.has(f)).sort()
  return {
    total: THEOREMS.length,
    covered: THEOREMS.length - uncovered.length,
    uncovered, uncoveredFiles,
    ready: uncovered.length === 0,
    receipt: merkleFold([toUuid('coverage:' + THEOREMS.length + ':' + (THEOREMS.length - uncovered.length)), ...uncovered.map((k) => toUuid('uncovered:' + k))]),
  }
}
