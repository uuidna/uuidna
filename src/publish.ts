// publish — write PUBLICATIONS in lean, human prose, AUDITED before it is published. A publication is a short,
// readable note about ONE domain, composed by READING that domain's SEALED theorems and writing only what they
// settle: every load-bearing sentence LINKS the proof that backs it (/theorem/<key>), so the prose earns its
// claims exactly the way any prose on uuidna does — by pointing at a proof, or being demarcated, or being audited.
//
// Writing here descends from READING. The note is written by reading the ledger the package already sealed; a
// sentence keeps its place only if a proof backs it. auditPublication runs the SAME honesty gate the site-wide
// provenance audit runs (computes + the translation-aware overreach lexicon), BEFORE publishing — so an
// overclaiming note is REFUSED. `publishable` is false when any sentence trips the gate unbacked;
// the generator (docs/publications/[slug].paths.js) fails the build rather than emit it. Audited before published.
//
//  (integrity
// proof and that the note itself passes the overreach gate. It does NOT claim the domain is complete, nor that the
// prose is elegant — only that it says nothing its theorems do not. Its content-address recomputes from the text;
// the member proofs fold, order-invariantly, to one receipt anyone recomputes from the same ledger.
import { THEOREMS, type Theorem, PRINCIPLES } from './theorems/index.js'
import { typeset } from './formula.js'
import { graphNode, modulusOf, KIN } from './publication-graph.js'
import { computes } from './gate.js'
import { toUuid, merkleFold, gcd } from './address.js'
import { handleOf } from './handle.js'
import { CANONICAL_LICENSE_SPDX, CANONICAL_LICENSE_URL } from './publication-metadata.js'
import { ZENODO_SEALS } from './zenodo-seals.js'

/** A finding: a sentence that cites a FABRICATED theorem — the one decidably-false thing a note can do. */
export interface PubFinding { unit: string; token: string; address: string }

/** A publication — a domain note in lean human prose, each claim backed by a proof, audited before it is published. */
export interface Publication {
  /** the wing's one-line demarcation, authored beside the proofs — exposed because a DEPOSIT TITLE needs it:
   *  "The cut" does not identify a work in a citation, and "The cut — video and film editing as decidable
   *  arithmetic" does. Parsing it back out of the markdown this function just wrote would be reading our own
   *  output, so it is a field. */
  blurb: string
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
// same whether it sits in a heading, a bullet or a paragraph — the marker is layout.
const units = (text: string): string[] =>
  text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/).map((s) => s.replace(/^[\s>#*-]+/, '').trim()).filter((s) => s.length > 0 && s.length < 2000)

// The tripwire, folded to the theorems: a sentence blocks publishing only when it CITES A FABRICATED theorem — a
// key that is not sealed in the ledger (computes → binary 0). No lexicon, no demarcation guessing: a note that
// links a real proof is SEALED and passes; a note that makes an unbacked claim is REVEALED (held open);
// only a fabricated citation — the one decidably-false thing — is drained. A quoted phrase is a citation of a word,
// so de-quote before matching. This is the same theorem-fold the site-wide provenance audit now runs.
const tripped = (u: string): string | null => {
  const cited = u.replace(/'[^']*'|"[^"]*"|“[^”]*”|«[^»]*»/g, ' ')
  const g = computes(cited)
  return g.binary === 0 ? g.hit : null
}

/** auditPublication(markdown[, sealed]) → the findings that block publishing: every sentence that cites a FABRICATED
 *  theorem. Empty ⇒ the note is publishable. The same theorem-fold the site-wide provenance audit runs, applied to a
 *  note BEFORE it is written to the site — so a note that invents a proof is refused. `sealed` pre-clears
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
  // THE ABSTRACT IS DERIVED, and it had to become so: measured across the corpus, the previous abstract was one
  // fixed template whose only variable was the theorem count, so 116 monographs carried just 27 distinct
  // abstracts (one per distinct count) at a median length of 353 characters — min and median identical, the
  // signature of a constant. A deposit of 116 near-duplicate abstracts is not a corpus, and a DOI minted over
  // one is a permanent record of a template. Every quantity below is read from this wing's own theorems, so the
  // abstract distinguishes the monograph exactly as far as the ledger distinguishes it.
  const cases = ts.reduce((a, t) => a + (typeof t.cases === 'number' ? t.cases : 0), 0)
  // WHAT "CASES" IS, EXACTLY, because the lead claim rests on it. lean-gen instruments the JS mirror's actual
  // iteration and records what it visited — a real measurement, not a numeral scraped off the statement. But a
  // fact that ITERATES NOTHING (`5260 * 17 = 89420`) is recorded as 1 by a floor, and a floor is a convention.
  // Measured across the ledger: 98% of all cases come from genuine walks, yet nineteen wings consist
  // ENTIRELY of closed identities — and in those the sentence "N theorems closing N enumerated cases" states one
  // quantity twice while sounding like two. A peer published exactly that shape today and corrected it
  // (millennium-solutions, 2026-09-04: a page told all 336 theorems the kernel had walked their whole domain
  // when 112 walk none). So the claim SPLITS: cases actually walked, and identities that enumerate nothing.
  // Both are decided by the kernel and both are axiom-free; only one of them is an enumeration.
  const walkers = ts.filter((t) => (typeof t.cases === 'number' ? t.cases : 1) > 1)
  const walked = walkers.reduce((a, t) => a + (t.cases ?? 0), 0)
  const identities = ts.length - walkers.length
  const moduli = [...new Set(ts.map((t) => modulusOf(String(t.statement))).filter((m): m is string => m !== null))].sort()
  const formed = ts.filter((t) => typeset(t.statement, 'block').mathml !== '').length
  const tactics = [...new Set(ts.map((t) => t.tactic))].sort()
  const node = graphNode(slug)
  // A congruence wing says which ring it computes in; a wing of mixed statements says what it enumerates instead.
  const structure = moduli.length === 1
    ? `Every congruence here is taken modulo ${moduli[0]}, so the wing computes inside one finite ring and its statements close under that modulus.`
    : moduli.length > 1
      ? `Its congruences are taken modulo ${moduli.join(' and ')} — more than one finite ring meets in this wing.`
      : 'Its statements are not congruences in a single modulus; what they share is the structure named above rather than one ring.'
  const form = formed === ts.length
    ? `All ${ts.length} have a standard formula form, typeset below in MathML and available as TeX.`
    : formed === 0
      ? `None reduces to a standard formula: each is a computation, so the Lean the kernel read is shown instead of a formula it does not have.`
      : `Of these, ${formed} have a standard formula form and ${ts.length - formed} are computations rather than formulas — the second group shows its Lean instead of a formula it does not have.`
  const kinLine = node && node.kin.length
    ? `It is nearest, by shared structure, to ${node.kin.slice(0, 3).map((k) => k.slug).join(', ')}; the related monographs are listed below with the terms each shares.`
    : 'No other monograph in this corpus shares its rare terms or its modulus.'
  const settles = identities === 0
    ? `${walked} enumerated ${walked === 1 ? 'case' : 'cases'}`
    : walkers.length === 0
      ? `${ts.length} closed ${ts.length === 1 ? 'identity' : 'identities'}`
      : `${walked} enumerated ${walked === 1 ? 'case' : 'cases'} together with ${identities} closed `
        + `${identities === 1 ? 'identity' : 'identities'} that enumerate none`
  const abstract =
    `${title} seals ${ts.length} ${ts.length === 1 ? 'theorem' : 'theorems'} settling ${settles}, `
    + `each closed by the ${tactics.join(' and ')} tactic in Lean 4 — no Mathlib, `
    + `sorry-free, and axiom-free: the kernel evaluates rather than searching for a proof. ${structure} `
    + `${form} ${kinLine} This note claims nothing beyond what its theorems settle: not that the domain is `
    + `complete, only that the prose says nothing the proofs do not. It was written by reading the sealed ledger; `
    + `read the proofs.`
  // The body — each sealed theorem's own human sentence, BACKED by a link to its proof. The theorem name IS the
  // honest claim (it is authored beside the proof and audited on every theorem page), so the note reads as prose
  // while every load-bearing sentence points at the proof that earns it.
  // THE PROOF IS SHOWN, NOT ONLY LINKED (the captain, 2026-09-04: "each theorem lean latex proof need to be
  // visible in publication"). It used to be a name and a link, so a reader had to leave the monograph to see what
  // sealed it — and a citing reader could not check the claim in the document that made it.
  //
  // AT TOP LEVEL, NOT NESTED IN THE LIST, and that is not a style choice: the first attempt put a `details` block
  // inside each list item, indented two spaces, and markdown-it then handed Vue 116 pages of unbalanced tags —
  // "Element is missing end tag", every publication. A block-level HTML element inside a markdown list item is
  // not reliably a block. So the facts stay a clean list of names and links, and the proofs follow as their own
  // section, one un-indented `details` each.
  //
  // COLLAPSED, and the reason is measured: inlining every proof adds 9 KB to the mean monograph and 349 KB to
  // `wave`, which seals 906 theorems. Flat, that page is 906 proofs deep. Collapsed, the proof is in the HTML —
  // a crawler and a citation resolver both see it — and the page still reads as prose. No page-count exception.
  const body = ts.map((t) => `- ${t.name} — [proof](/theorem/${t.key}).`).join('\n')
  const proofs = ts.map((t) => {
    const set = typeset(t.statement, 'block')
    const shown = set.mathml
      ? `${set.mathml}\n\nFor a manuscript: \`${set.tex}\``
      : 'A computation rather than a formula — no standard formula form, so the Lean the kernel read stands alone.'
    return `<details>\n<summary><code>${t.key}</code> — ${t.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').slice(0, 120)}</summary>\n\n`
      + `${shown}\n\n`
      + '```lean\n' + t.lean + '\n```\n\n'
      + `Sealed by \`${t.tactic}\`, axiom-free. Content-address \`${t.address}\`.\n\n</details>`
  }).join('\n\n')
  const receipt = merkleFold(ts.map((t) => t.address))
  // WHAT IT RESTS ON — the principle is the wing's own axiom-shaped commitment, and naming it in the monograph is
  // what lets a reader see the foundation rather than infer it from 234 congruences.
  const rests =
    `Every theorem here is filed under the principle **${ts[0]!.principle}**, and that is the whole of what this `
    + `monograph assumes: there is no axiom beneath it. The ledger is axiom-free — not even propext or Quot.sound `
    + `is permitted — so every statement is closed by evaluation (${settles}) and nothing is taken on trust.`
  // RELATED MONOGRAPHS — the crosslinks. Measured at 0 of 116 before this section existed: every publication was
  // a leaf, so a reader who arrived at one had nowhere to go and a deposit naming no related work was a row with
  // a DOI. The kin are DERIVED (src/publication-graph.ts) and each link SAYS WHY it is a link — the shared
  // modulus, the shared rare constants, the shared vocabulary — because an unexplained "related" link asks for
  // trust the page has not earned. Naming the shared terms makes it CHECKABLE by construction: the reader can
  // open both monographs and look for the constant, which is the whole difference between a citation and a hint.
  //
  // A TABLE, NOT BULLETS, and the audit is what decided it. audit-citations counts every "- " line as a CLAIM, so
  // the first version of this section added one claim per graph EDGE — 0 uncited once each carried a link, but
  // the claim-to-theorem bijection broke: the corpus gained claims that were not theorems, and audit-citations'
  // harmonic check said so by digital root. (No count is written here on purpose: a ledger total in a comment is
  // drift with a timestamp, and the guard refuses one.)
  // The bijection was right and the section was wrong. A kinship row is NAVIGATION derived by a sealed rule, not
  // a new assertion about the world, and the same convention already holds elsewhere in this file — the title,
  // the abstract and the provenance are not per-fact claims either. So the rule is cited ONCE in the section
  // heading, where it belongs, and the rows stay structure.
  // THE CLAIM LEADS, IN BOLD, and it is the strongest true sentence this wing can say. The captain, 2026-09-04:
  // "claim bold all reachable" and "ensure no under claims or under reach". A monograph that opens with its scope
  // note reads as a hedge, and a proof hedged is a proof wasted — every statement here was EVALUATED over every
  // case by the Lean 4 kernel with no axiom beneath it, which is a stronger guarantee than most published
  // mathematics carries, so it is stated first and stated outright. The scope note keeps its place further down:
  // claiming what is proven and disclaiming what is not are the same discipline, not opposite ones.
  const thm = ts.length === 1 ? 'theorem' : 'theorems'
  const claim =
    (identities === 0
      ? `**${ts.length} ${thm}, ${walked} cases evaluated by the Lean 4 kernel — every case, not a sample, and axiom-free.**`
      : walkers.length === 0
        ? `**${ts.length} ${thm}, each a closed identity the Lean 4 kernel evaluates outright — decided, not assumed, and axiom-free.**`
        : `**${ts.length} ${thm}, decided by the Lean 4 kernel and axiom-free: ${walked} cases walked across `
          + `${walkers.length} of them, and ${identities} closed ${identities === 1 ? 'identity' : 'identities'} `
          + `that enumerate none.**`)
    + `${moduli.length === 1 ? ` **Closed under modulus ${moduli[0]}.**` : ''}`
  const related = node && node.kin.length
    ? '| monograph | what it shares |\n| --- | --- |\n' + node.kin.map((k) => {
        const why: string[] = []
        if (k.sharedModuli.length) why.push(`the same modulus ${k.sharedModuli.join(', ')}`)
        if (k.sharedConstants.length) why.push(`${k.sharedConstants.length} shared constant${k.sharedConstants.length === 1 ? '' : 's'} (${k.sharedConstants.slice(0, 6).join(', ')}${k.sharedConstants.length > 6 ? ', …' : ''})`)
        if (k.sharedWords.length) why.push(`${k.sharedWords.length} shared term${k.sharedWords.length === 1 ? '' : 's'} (${k.sharedWords.slice(0, 4).join(', ')}${k.sharedWords.length > 4 ? ', …' : ''})`)
        return `| [${k.slug}](/publications/${k.slug}) | ${why.join('; ')} |`
      }).join('\n')
    : 'No monograph in this corpus shares this wing\u2019s modulus or its rare terms. That is a fact about the corpus, not a gap in the page.'
  // ── CREDIT AND CITATION, IN THE TEXT AND NOT ONLY IN THE HEAD. Measured 2026-09-04: the BUILT page carried the
  // author, the archive DOI and the licence — the theme injects them, and the JSON-LD carries them for a crawler —
  // while the monograph's own words named an author in 11 of 116 and a licence in 2. So a printed page, a copied
  // excerpt or a PDF lost its attribution entirely, which is precisely the form a research record gets read in.
  // Derived from the same primitives the deposit record uses, so the page and the deposit cannot drift apart.
  //
  // THE CONTENT-ADDRESS IS DELIBERATELY ABSENT FROM THIS BLOCK, and the reason is arithmetic rather than
  // preference: the address IS the fold of this markdown, so printing it inside the markdown would change the
  // text it addresses and no fixed point exists. The RECEIPT is safe — it folds the theorem addresses, not the
  // prose — so the citation carries the receipt and says how the address is obtained instead of asserting it.
  const concept = ZENODO_SEALS.find((z) => z.id === 'uuidna-software')?.conceptDoi ?? ''
  const cite =
    `Rouschev, Tsvetan (ORCID [0009-0000-7312-9778](https://orcid.org/0009-0000-7312-9778)). `
    + `*${title}* — ${blurb}. uuidna, handle \`${handleOf(receipt)}\`.`
    + `${concept ? ` Archived in the uuidna ledger, [doi:${concept}](https://doi.org/${concept}).` : ''}`
    + ` Page: https://uuidna.com/publications/${slug}. Licence: ${CANONICAL_LICENSE_SPDX()} `
    + `(${CANONICAL_LICENSE_URL()}).\n\n`
    + `The ${ts.length} ${ts.length === 1 ? 'proof' : 'proofs'} cited above fold, order-invariant, to the receipt `
    + `\`${receipt}\` — recompute it from the same ledger and it returns. This note also content-addresses to a `
    + `uuid computed from its own text, so any edit to it is visible; the address is printed beside the page `
    + `rather than inside it, because a text cannot state the fold of itself.`
  const markdown =
    `# ${title}\n\n` +
    `> ${blurb}\n\n` +
    `${claim}\n\n` +
    `${abstract}\n\n` +
    `## What it rests on\n\n${rests}\n\n` +
    `## The facts, each backed by its proof\n\n${body}\n\n` +
    `## The proofs\n\nEach statement as the kernel decided it — typeset where it is mathematics, and the exact Lean beneath it.\n\n${proofs}\n\n` +
    `## Related monographs\n\nDerived, not curated, by the [ranked kinship rule](/theorem/a_shared_modulus_outranks_a_shared_word) — a shared modulus outranks a shared constant, which outranks a shared term in the theorem names — ranked and cut at ${KIN}, with [every degree accounted for](/theorem/the_kin_shortlist_accounts_for_every_edge). Each row names the terms it rests on, so the kinship recomputes from the ledger.\n\n${related}\n\n` +
    `## How to cite\n\n${cite}\n\n` +
    `## Provenance\n\n` +
    `These ${ts.length} proofs fold, order-invariant, to the receipt \`${receipt}\` — recompute it from the same ` +
    `ledger and it returns. The note itself content-addresses to a uuid, so any edit is visible. Writing descends ` +
    `from reading: this note holds only what the proofs it links already sealed, and it was audited by uuidna's own ` +
    `honesty gate before it was published — a sentence that overreached a proof would have been refused.\n\n` +
    `Source · [lean/${file}](https://github.com/uuidna/uuidna/blob/main/lean/${file}) · [all theorems](/theorems)\n`
  // Pre-clear the SEALED, committed, already-audited artifacts woven into the note — the domain title, its blurb,
  // and each theorem's own name (each backed by its proof and audited on its own page, exactly as the site audit
  // clears a theorem's words by its key). Only the note's OWN framing prose (abstract, provenance) is then held to
  // the strict gate — writing that overreaches a proof is refused, but reading a sealed claim aloud is not.
  const sealed = new Set<string>([...units(title), ...units(blurb), ...ts.flatMap((t) => units(t.name))])
  const findings = auditPublication(markdown, sealed)
  return {
    slug, title, blurb, file, theorems: ts.map((t) => t.key), count: ts.length,
    abstract, markdown, address: toUuid(markdown), receipt,
    publishable: findings.length === 0, findings,
    honest:
      'A publication proves that every claim it makes links a sealed Lean proof and that the note passes the ' +
      'overreach gate — audited BEFORE publishing, refused if it overreaches. It does NOT claim the domain is ' +
      'complete or the prose elegant, only that the note says nothing its theorems do not. Integrity.',
  }
}

/** A revision — the editor primitive. Editing is RE-ADDRESSING: a draft edited to a new draft re-fingerprints, so
 *  the change is visible (the address moves), re-audits (the new draft must still earn every claim before it ships),
 *  and binds to the draft it descends from by a directional receipt (before → after, order-sensitive). The honest
 *  unit of editing on uuidna — a diff you can prove. */
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
      'edited draft is audited before it publishes — an edit that overreaches a proof is refused. ' +
      'Integrity — the record recomputes for anyone: this proves the edit and its provenance, never that the new prose reads better.',
  }
}

/** A comparison — pattern recognition by examining differences. Two texts are partitioned into what is ONLY in
 *  each and what is SHARED; the similarity is DERIVED from that difference (shared over the union), and the shared
 *  tokens fold to one receipt — the recognized pattern. Inclusion–exclusion holds exactly (|A|+|B|−shared = union),
 *  so the count is a proof. The editor's eye: a similarity is only ever seen against a difference. */
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
      'inclusion–exclusion (|A| + |B| − shared = union) holds exactly, so the similarity is a proof. ' +
      'The shared tokens fold to one order-invariant receipt — the recognised pattern. It compares word sets' +
      'meaning: a shared vocabulary is not a shared claim. Integrity.',
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
 *  power to reject a Lean-verified theorem was withdrawn, so this reports what is unpublished. */
export interface Coverage {
  total: number                 // theorems in the ledger
  covered: number               // theorems shown in some monograph
  uncovered: string[]           // theorem KEYS in no monograph — DIAGNOSTIC ONLY; no longer blocks any push
  uncoveredFiles: string[]      // ledger FILES with no publication — the ROOT fix: author a PRINCIPLE [file,title,blurb]
  ready: boolean                // true iff nothing is uncovered — a presentation signal
  receipt: string               // the order-invariant fold of the coverage state, recomputable by anyone from the ledger
}

/** COVERAGE — is every sealed theorem shown in a monograph? The manual diagnosis (which domain no note covers, the gap
 *  the pre-push gate blocks on) as ONE pure, recomputable call: an agent adding a domain runs this instead of tracing
 *  the gate by hand. A theorem is COVERED iff its key appears in some publication; a FILE is uncovered iff it carries
 *  theorems but has no publication (the root cause — it needs a PRINCIPLE [file,title,blurb] entry in lean-ledger). The
 *  member facts fold, order-invariantly, to one receipt anyone recomputes from the same ledger. Integrity. */
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
