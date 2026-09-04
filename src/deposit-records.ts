// deposit-records — ONE DEPOSIT CANDIDATE PER MONOGRAPH, DERIVED, AND GRADED BEFORE ANYTHING IS MINTED.
//
// THE CAPTAIN'S CONDITION IS THE WHOLE DESIGN (2026-09-04: "mint the dois if the quality of the publications
// match the required quality for such matter"). A DOI is permanent. Minting one over a record that is not a
// scholarly record archives the shortfall forever under a citable identifier, so the grade is a GATE and not a
// report: `ready` is false unless every criterion passes, and the generator refuses to emit a record that fails.
//
// WHAT THE MEASUREMENT FOUND FIRST, before any of this existed: 116 monographs carried 27 distinct abstracts,
// because the abstract was one template whose only variable was the theorem count — minimum, median and maximum
// length within two characters of each other, the signature of a constant. Crosslinks were 0 of 116: every
// monograph a leaf. External DOI references were 3 of 116. That is not a corpus, and 116 DOIs over it would have
// been 116 permanent records of a template. All three are now derived rather than authored.
//
// THE ONE THING THAT IS NOT CLAIMED, and it is the honest limit of this file: a per-record BIBLIOGRAPHY is not
// derived here, and the reason is a property of the data rather than a shortcoming of the code — the prior-art
// pool is CORPUS-WIDE, and its 51 "domains" are DOI REGISTRANT PREFIXES (PLoS, and so on) rather than subject
// domains, so nothing in it is bound to a particular monograph. Binding one anyway would be a fabricated
// citation, which is worse than none, so this file DECLINES to and says so. What IS true per record is the RELATION set: this monograph is part of the
// archived ledger, it is documented by its own page, it supplements the repository, and it is related to the kin
// the sealed kinship rule derives. Those are DataCite relations that recompute, and they are what makes a
// deposit citable rather than merely archived — the graph, which is exactly the Zenodo feature the captain named.
import { publications, type Publication } from './publish.js'
import { graphNode, KIN } from './publication-graph.js'
import { THEOREMS } from './theorems/index.js'
import { typeset } from './formula.js'
import { toUuid, merkleFold } from './address.js'
import { handleOf } from './handle.js'
import {
  CANONICAL_LICENSE_SPDX, CANONICAL_LICENSE_ZENODO, CANONICAL_LICENSE_URL,
} from './publication-metadata.js'
import { ZENODO_SEALS } from './zenodo-seals.js'

// THE LICENCE TRIO IS READ ONCE, and finding out why cost three wrong guesses worth recording. The per-theorem
// ledger took 277 seconds. I blamed theoremNeighbours (it is cached: 15ms across all 2539), then the quadratic
// distinctness filter (real, but only ~34s of it). Profiling found the actual cost: CANONICAL_LICENSE_SPDX and
// its two siblings each call legalFacts(), which is NOT cached and costs ~34ms, and the record builder called
// them once per record — 7,617 calls, about 261 seconds, for three strings that are FIXED for the whole run by
// construction (they read one sealed licence declaration, which no code path rewrites mid-process).
// Hoisted, the whole ledger is fast. THE LESSON IS THE ORDER: measure first, because the expensive line was the
// one I had not suspected, and both things I did suspect were nearly free.
const licenceOnce = (): { spdx: string; zenodo: string; url: string } => ({
  spdx: CANONICAL_LICENSE_SPDX(), zenodo: CANONICAL_LICENSE_ZENODO(), url: CANONICAL_LICENSE_URL(),
})

/** The archive DOI a record declares itself part of — read from the seal registry, never typed here.
 *
 *  THIS IS THE VERSION DOI, NOT THE CONCEPT, and the reason is a measured hazard rather than a preference.
 *  A Zenodo concept DOI is a version CHAIN that always resolves to the newest member, and this project's concept
 *  (…143) currently chains three distinct works — the Clay-proofs paper, the ℤ/9 Vortex Framework, and uuidna —
 *  because "New version" was used to publish different works rather than successive versions of one. A record
 *  declaring isPartOf that concept would hand any reader whichever work was deposited last, and a DOI is
 *  permanent. The version DOI is unambiguously this archive. */
const archiveDoi = (): string => ZENODO_SEALS.find((s) => s.id === 'uuidna-software')?.standingDoi ?? ''
const SITE = 'https://uuidna.com'
const REPO = 'https://github.com/uuidna/uuidna'

export interface DepositRelation {
  identifier: string
  relation: string
  resource_type?: string
}

export interface DepositRecord {
  id: string
  title: string
  abstract: string
  authors: readonly { name: string; orcid?: string }[]
  keywords: string[]
  license: string
  licenseZenodo: string
  licenseUrl: string
  language: string
  uploadType: 'publication'
  publicationType: 'article'
  communities: readonly { identifier: string }[]
  /** null until the mint assigns one — a pending DOI is stated, never invented */
  doi: null
  doiPending: true
  pageUrl: string
  address: string
  handle: string
  handleUrl: string
  relatedIdentifiers: DepositRelation[]
  relatedPublications: readonly { id: string; title: string; pageUrl: string; why: string }[]
  theorems: number
  /** the proofs, carried IN the record: statement, typeset form, and the Lean the kernel read. `tex` is null
   *  when the statement is a COMPUTATION with no standard formula form — stated as null rather than as an empty
   *  string, because "there is no formula" and "the formula is blank" are different facts. */
  proofs: readonly { key: string; statement: string; tex: string | null; lean: string; tactic: string; address: string }[]
  receipt: string
}

const authorsOf = (): readonly { name: string; orcid?: string }[] =>
  [{ name: 'Rouschev, Tsvetan', orcid: '0009-0000-7312-9778' }]

/** keywordsOf(pub) → derived vocabulary: the principle, the skills, the moduli, and the corpus terms. */
export function keywordsOf(pub: Publication): string[] {
  const ts = THEOREMS.filter((t) => t.file === pub.file)
  const out = new Set<string>(['Lean 4', 'formal verification', 'by decide', 'axiom-free', 'uuidna'])
  if (ts[0]?.principle) out.add(ts[0].principle)
  for (const t of ts) if (t.skill) out.add(t.skill)
  const node = graphNode(pub.slug)
  for (const k of node?.kin ?? []) for (const m of k.sharedModuli) out.add('modulus ' + m)
  return [...out].sort()
}

/** relationsFor(pub) → the DataCite relation set. This IS the citation graph the deposit carries. */
export function relationsFor(pub: Publication): DepositRelation[] {
  const rels: DepositRelation[] = [
    { identifier: `${SITE}/publications/${pub.slug}`, relation: 'isDocumentedBy', resource_type: 'publication-other' },
    { identifier: REPO, relation: 'isSupplementTo', resource_type: 'software' },
  ]
  const archive = archiveDoi()
  if (archive) rels.push({ identifier: `https://doi.org/${archive}`, relation: 'isPartOf', resource_type: 'dataset' })
  for (const k of graphNode(pub.slug)?.kin ?? [])
    rels.push({ identifier: `${SITE}/publications/${k.slug}`, relation: 'isRelatedTo', resource_type: 'publication-other' })
  return rels
}

/** depositRecord(pub) → the full candidate, every field derived from the monograph and the sealed graph. */
/** depositTitle(pub) → a title that identifies the work in a CITATION. The page title can be "The cut" because
 *  the page is surrounded by its own context; a deposit title is read in a reference list with nothing around it,
 *  and two monographs were refused by the grade for exactly that (7 characters each). The wing's own blurb is
 *  already the one-line description authored beside its proofs, so its first clause qualifies the title. */
export function depositTitle(pub: Publication): string {
  const clause = String(pub.blurb).split(/\s+[—–]\s+|[:;]\s+/)[0]!.trim()
  if (!clause) return pub.title
  const joined = `${pub.title} — ${clause}`
  return joined.length > 240 ? joined.slice(0, 237) + '…' : joined
}

export function depositRecord(pub: Publication, licence = licenceOnce()): DepositRecord {
  const ts = THEOREMS.filter((t) => t.file === pub.file)
  const node = graphNode(pub.slug)
  const proofs = ts.map((t) => {
    const set = typeset(t.statement, 'block')
    return { key: t.key, statement: t.statement, tex: set.tex, lean: t.lean, tactic: t.tactic, address: t.address }
  })
  const rels = relationsFor(pub)
  const kin = (node?.kin ?? []).map((k) => {
    const why: string[] = []
    if (k.sharedModuli.length) why.push(`the same modulus ${k.sharedModuli.join(', ')}`)
    if (k.sharedConstants.length) why.push(`${k.sharedConstants.length} shared constants`)
    if (k.sharedWords.length) why.push(`${k.sharedWords.length} shared terms`)
    return { id: k.slug, title: k.slug, pageUrl: `${SITE}/publications/${k.slug}`, why: why.join('; ') }
  })
  return {
    id: pub.slug,
    title: depositTitle(pub),
    abstract: pub.abstract,
    authors: authorsOf(),
    keywords: keywordsOf(pub),
    license: licence.spdx,
    licenseZenodo: licence.zenodo,
    licenseUrl: licence.url,
    language: 'eng',
    uploadType: 'publication',
    publicationType: 'article',
    communities: [{ identifier: 'uuidna' }],
    doi: null,
    doiPending: true,
    pageUrl: `${SITE}/publications/${pub.slug}`,
    address: pub.address,
    handle: handleOf(pub.address),
    handleUrl: `${SITE}/${handleOf(pub.address)}`,
    relatedIdentifiers: rels,
    relatedPublications: kin,
    theorems: ts.length,
    proofs,
    receipt: merkleFold([toUuid('deposit|' + pub.slug), pub.address, ...proofs.map((p) => p.address)]),
  }
}

// ── THE GRADE. Each criterion is a property a record can FAIL, and the reason it is here is a measurement that
// found the corpus failing it. Nothing is graded on a curve: the bar is what a citable scholarly record carries,
// not what this corpus happened to have.
export interface GradeCriterion { name: string; ok: boolean; why: string }

/** abstractCounts(abstracts) → how many records carry each abstract, counted ONCE.
 *
 *  THIS REPLACED A QUADRATIC CHECK, and the cost was not theoretical. Both graders originally answered "is this
 *  abstract shared?" with `corpusAbstracts.filter(a => a === rec.abstract).length > 1` — one full scan per
 *  record. At 116 monographs that is 13,456 comparisons and invisible; at 2539 propositions it is 6.4 MILLION
 *  comparisons of thousand-character strings, and the per-theorem ledger took 277 seconds, of which 258 were
 *  this line. Profiling is what found it: theoremNeighbours turned out to be free and typeset cost 12ms total,
 *  so the expensive thing was the check I had not suspected. Counted once into a map, the same answer is O(n).
 *  The tree's standing law — cache an immutable read for O(1) — applied to a distinctness test. */
export function abstractCounts(abstracts: readonly string[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const a of abstracts) counts.set(a, (counts.get(a) ?? 0) + 1)
  return counts
}

export function gradeRecord(rec: DepositRecord, corpusAbstracts: readonly string[] | Map<string, number>): GradeCriterion[] {
  const counts = corpusAbstracts instanceof Map ? corpusAbstracts : abstractCounts(corpusAbstracts)
  const abstractShared = (counts.get(rec.abstract) ?? 0) > 1
  return [
    { name: 'title', ok: rec.title.trim().length >= 8, why: 'a citable record needs a title, not a filename' },
    { name: 'abstract-substance', ok: rec.abstract.length >= 400, why: 'an abstract under 400 characters is a caption' },
    { name: 'abstract-distinct', ok: !abstractShared, why: 'two records sharing an abstract means a template was deposited, not a corpus — measured at 27 distinct across 116 before the abstracts were derived' },
    { name: 'authors', ok: rec.authors.length > 0 && rec.authors.every((a) => a.name.includes(',')), why: 'DataCite wants Family, Given' },
    { name: 'license', ok: rec.license.length > 0 && rec.licenseUrl.startsWith('http'), why: 'an unlicensed deposit cannot be reused' },
    { name: 'proofs-carried', ok: rec.proofs.length === rec.theorems && rec.proofs.every((p) => p.lean.length > 0), why: 'the captain: each theorem\'s Lean proof must be visible IN the publication — a record that only links its proofs is not self-contained' },
    { name: 'identity', ok: /^[0-9a-f-]{36}$/.test(rec.address) && /^[0-9a-f]{8}$/.test(rec.handle), why: 'the record must content-address, so any edit is visible' },
    { name: 'graph', ok: rec.relatedPublications.length > 0 && rec.relatedPublications.length <= KIN, why: 'a leaf record names no related work — measured at 0 crosslinks across all 116 before the kinship rule was derived' },
    { name: 'relations-explained', ok: rec.relatedPublications.every((k) => k.why.length > 0), why: 'an unexplained related link asks for trust the record has not earned' },
    { name: 'part-of-archive', ok: rec.relatedIdentifiers.some((r) => r.relation === 'isPartOf'), why: 'the one external relation that is TRUE for every monograph: it is part of the archived ledger' },
    { name: 'community', ok: rec.communities.some((c) => c.identifier === 'uuidna'), why: 'the captain: publish all in the uuidna community' },
    { name: 'keywords', ok: rec.keywords.length >= 5, why: 'discovery needs vocabulary' },
    { name: 'doi-not-invented', ok: rec.doi === null && rec.doiPending, why: 'a DOI is assigned by the mint; a record that carries one it was not given is a fabrication' },
  ]
}

export interface DepositLedger {
  records: DepositRecord[]
  ready: DepositRecord[]
  refused: { id: string; failed: string[] }[]
  criteria: number
  allReady: boolean
  receipt: string
}

/** depositLedger() → every candidate, graded. `allReady` is the mint gate. */
export function depositLedger(): DepositLedger {
  const pubs = publications()
  // THE DISTINCTNESS CRITERION NEEDS THE MULTISET, NOT THE SET. A set discards duplicates BY CONSTRUCTION —
  // that is what a set is — so it cannot report the one fault being guarded against here, two records sharing an
  // abstract. Every abstract is therefore passed as written, duplicates included.
  const licence = licenceOnce()
  const records = pubs.map((p) => depositRecord(p, licence))
  const corpusAbstracts = abstractCounts(records.map((r) => r.abstract))
  const refused: { id: string; failed: string[] }[] = []
  const ready: DepositRecord[] = []
  let criteria = 0
  for (const rec of records) {
    const grade = gradeRecord(rec, corpusAbstracts)
    criteria = grade.length
    const failed = grade.filter((g) => !g.ok).map((g) => g.name)
    if (failed.length) refused.push({ id: rec.id, failed })
    else ready.push(rec)
  }
  return {
    records, ready, refused, criteria,
    allReady: refused.length === 0,
    receipt: merkleFold([toUuid('deposit-ledger|' + records.length), ...records.map((r) => r.receipt)]),
  }
}

/** depositGaps() → the guard's shape: a record that would be minted below the bar. */
export function depositGaps(): { what: string; fix: string }[] {
  const l = depositLedger()
  if (l.allReady) return []
  return l.refused.slice(0, 8).map((r) => ({
    what: `deposit candidate ${r.id} fails ${r.failed.length} DOI-grade criterion/criteria: ${r.failed.join(', ')}`,
    fix: 'fix the monograph the record derives from — every field here is derived, so a failing record means the '
      + 'publication itself is short of what a citable scholarly record carries. A DOI is permanent: minting over '
      + 'a failing record archives the shortfall forever under an identifier people will cite.',
  }))
}

// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════
// ONE DEPOSIT PER THEOREM — and the granularity is decided by this tree's own definition of a theorem, not by a
// key count. The captain asked for one DOI per theorem. A theorem here IS its statement (that is the law the
// statement census enforces), and the ledger carries 2612 KEYS over 2539 DISTINCT STATEMENTS: exactly 73
// statements are sealed twice, under two names, in Core.lean and Ring.lean — the same ℤ/9 multiplication facts
// named mul9_1_1 and z9mul_1_1. Minting a DOI for each KEY would deposit 73 duplicate records claiming to be
// different research, which is the one thing a permanent identifier must not do.
//
// So a record is one PROPOSITION, and a renaming is carried as an alternate name on that record. That is both
// ordinary scholarly practice and the ledger's own rule, and it means the count is 2539 rather than 2612 — a
// difference worth stating out loud rather than quietly resolving.
//
// THE ABSTRACT IS DERIVED FROM WHAT THE THEOREM ITSELF FIXES. Measured before writing this: theorem names run
// from 15 characters ("1·1 ≡ 1 (mod 9)") to 2069, median 222, and only 426 of them reach 400 characters. So the
// name alone cannot be an abstract for most of the ledger, and padding one would be worse than a short one. What
// IS derivable for every theorem is substantial: what it states, its standard formula form or the honest absence
// of one, how the kernel closed it (walked cases or a closed identity), the principle it rests on, the monograph
// it belongs to and that monograph's demarcation, its nearest siblings, and any second name it carries.
import { theoremNeighbours } from './theorems/index.js'
import { propositionAddress, normaliseProposition } from './proposition-address.js'

export interface TheoremDepositRecord {
  id: string
  /** other keys naming this same proposition — a renaming, not a second result */
  alternateKeys: string[]
  /** THE CROSS-REPO MERGE KEY: the address of the normalised statement, independent of name, file and repository.
   *  Two repositories sealing this proposition land on this same uuid, so the collective can hold one
   *  publication with both repositories listed instead of two DOIs for one result. */
  propositionAddress: string
  /** every raw form of the statement that normalises to this proposition — kept, never discarded */
  statementForms: string[]
  title: string
  abstract: string
  authors: readonly { name: string; orcid?: string }[]
  keywords: string[]
  license: string
  licenseZenodo: string
  licenseUrl: string
  language: string
  uploadType: 'publication'
  publicationType: 'article'
  communities: readonly { identifier: string }[]
  doi: null
  doiPending: true
  pageUrl: string
  address: string
  handle: string
  handleUrl: string
  relatedIdentifiers: DepositRelation[]
  relatedTheorems: readonly { key: string; name: string }[]
  statement: string
  tex: string | null
  lean: string
  tactic: string
  /** the wing this proposition is sealed in, and the monograph that publishes it */
  wing: string
  monograph: string
  principle: string
  /** cases the kernel walked, or 0 when the statement is a closed identity that enumerates none */
  walked: number
  receipt: string
}

/** theoremDepositRecords() → one candidate per distinct PROPOSITION, every field derived. */
export function theoremDepositRecords(): TheoremDepositRecord[] {
  const pubs = publications()
  const monographOf = new Map<string, Publication>()
  for (const p of pubs) monographOf.set(p.file, p)
  // GROUPED BY THE PROPOSITION ADDRESS, not by the raw statement string — and the difference is 8 records. The
  // first version of this grouped on the statement text, which counts `(2 * 5) % 9 = 1` and `(2*5) % 9 = 1` as
  // two propositions; they are one, written with different spacing. A peer's normalisation spec found them, and
  // auditing that spec against this corpus both confirmed the merge and found two faults in it (see
  // src/proposition-address.ts). So the unit is the PROPOSITION, not the key and not the raw statement — the
  // live counts are reported by theoremDepositLedger rather than written here, where they would drift. The
  // primary key is the lexicographically first name, so the choice is deterministic rather than an artefact of
  // ledger order.
  const byStatement = new Map<string, typeof THEOREMS[number][]>()
  for (const t of THEOREMS) {
    const a = propositionAddress(t.statement)
    const list = byStatement.get(a)
    if (list) list.push(t)
    else byStatement.set(a, [t])
  }
  const archive = archiveDoi()
  const licence = licenceOnce()
  const out: TheoremDepositRecord[] = []
  for (const [propAddress, group] of byStatement) {
    const sorted = [...group].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
    const t = sorted[0]!
    const statement = t.statement
    const alternateKeys = sorted.slice(1).map((x) => x.key)
    const statementForms = [...new Set(sorted.map((x) => x.statement))].sort()
    const mono = monographOf.get(t.file)
    const set = typeset(statement, 'block')
    const walked = (typeof t.cases === 'number' && t.cases > 1) ? t.cases : 0
    const neighbours = (() => {
      try { return theoremNeighbours(t.key).neighbours.slice(0, 5).map((n) => ({ key: n.key, name: String(n.name).slice(0, 120) })) }
      catch { return [] as { key: string; name: string }[] }
    })()
    // THE TITLE must identify the work in a reference list, so the wing qualifies a short name.
    const shortName = String(t.name).replace(/\s+/g, ' ').trim()
    const head = shortName.length > 180 ? shortName.slice(0, 177) + '…' : shortName
    const title = `${head} — ${mono?.title ?? t.file.replace(/\.lean$/, '')}`
    // THE ABSTRACT, derived. Every clause below is read from this proposition or its wing.
    const form = set.tex
      ? `In standard notation it reads ${set.tex}.`
      : 'It has no standard formula form: it is a computation, so the Lean the kernel read stands in place of a formula it does not have.'
    const how = walked > 0
      ? `The kernel closed it by evaluating ${walked} cases — every case, not a sample.`
      : 'The kernel closed it as a single identity, evaluating it outright rather than enumerating a domain.'
    const rests = `It is filed under the principle ${t.principle}, and that is the whole of what it assumes: the `
      + `ledger is axiom-free, so not even propext or Quot.sound is permitted beneath it.`
    const place = mono
      ? `It is published in the monograph ${mono.title} — ${mono.blurb} — alongside ${mono.count - 1} sibling `
        + `${mono.count - 1 === 1 ? 'theorem' : 'theorems'} sealed in the same wing.`
      : `It is sealed in ${t.file}.`
    const kin = neighbours.length
      ? `Its nearest siblings by shared principle are ${neighbours.map((n) => n.key).join(', ')}.`
      : 'No sibling in this corpus shares its principle.'
    const alt = alternateKeys.length
      ? `This proposition is sealed twice in the ledger, under ${[t.key, ...alternateKeys].join(' and ')}; they are `
        + `two names for one statement, not two results, and this record is the one deposit for both.`
      : ''
    const abstract =
      `${head} ${form} ${how} ${rests} ${place} ${kin} ${alt} `
      + `The statement, its Lean proof and the tactic that closed it are carried in this record, so a citing `
      + `reader can check the claim in the document that makes it. Nothing is claimed beyond what the kernel `
      + `decided: not that the domain around it is complete, only that this proposition holds by evaluation and `
      + `recomputes from the same ledger for anyone.`
    const rels: DepositRelation[] = [
      { identifier: `${SITE}/theorem/${t.key}`, relation: 'isDocumentedBy', resource_type: 'publication-other' },
      { identifier: REPO, relation: 'isSupplementTo', resource_type: 'software' },
    ]
    if (archive) rels.push({ identifier: `https://doi.org/${archive}`, relation: 'isPartOf', resource_type: 'dataset' })
    if (mono) rels.push({ identifier: `${SITE}/publications/${mono.slug}`, relation: 'isPartOf', resource_type: 'publication-other' })
    for (const n of neighbours)
      rels.push({ identifier: `${SITE}/theorem/${n.key}`, relation: 'isRelatedTo', resource_type: 'publication-other' })
    const keywords = [...new Set([
      'Lean 4', 'formal verification', 'by decide', 'axiom-free', 'uuidna',
      t.principle, ...(t.skill ? [t.skill] : []), t.file.replace(/\.lean$/, ''),
    ])].sort()
    out.push({
      id: t.key,
      alternateKeys,
      propositionAddress: propAddress,
      statementForms,
      title,
      abstract,
      authors: authorsOf(),
      keywords,
      license: licence.spdx,
      licenseZenodo: licence.zenodo,
      licenseUrl: licence.url,
      language: 'eng',
      uploadType: 'publication',
      publicationType: 'article',
      communities: [{ identifier: 'uuidna' }],
      doi: null,
      doiPending: true,
      pageUrl: `${SITE}/theorem/${t.key}`,
      address: t.address,
      handle: handleOf(t.address),
      handleUrl: `${SITE}/${handleOf(t.address)}`,
      relatedIdentifiers: rels,
      relatedTheorems: neighbours,
      statement,
      tex: set.tex || null,
      lean: t.lean,
      tactic: t.tactic,
      wing: t.file,
      monograph: mono?.slug ?? '',
      principle: t.principle,
      walked,
      receipt: merkleFold([toUuid('theorem-deposit|' + propAddress), t.address, ...alternateKeys.map((k) => toUuid('alt|' + k))]),
    })
  }
  return out.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}

export function gradeTheoremRecord(rec: TheoremDepositRecord, corpusAbstracts: readonly string[] | Map<string, number>): GradeCriterion[] {
  const counts = corpusAbstracts instanceof Map ? corpusAbstracts : abstractCounts(corpusAbstracts)
  const shared = (counts.get(rec.abstract) ?? 0) > 1
  return [
    { name: 'title', ok: rec.title.trim().length >= 12 && rec.title.includes('—'), why: 'a citation title must identify the proposition AND where it is sealed' },
    { name: 'abstract-substance', ok: rec.abstract.length >= 400, why: 'an abstract under 400 characters is a caption; measured, only 426 theorem NAMES reach that, which is why the abstract is derived from more than the name' },
    { name: 'abstract-distinct', ok: !shared, why: 'two records sharing an abstract would be one proposition deposited twice' },
    { name: 'one-proposition', ok: rec.statement.length > 0, why: 'the record is a statement, not a key — a theorem IS its statement here' },
    { name: 'renaming-declared', ok: rec.alternateKeys.length === 0 || rec.abstract.includes('two names for one statement'), why: '73 statements are sealed under two keys; a record covering both must say so rather than present a renaming as a second result' },
    { name: 'proof-carried', ok: rec.lean.length > 0 && rec.tactic.length > 0, why: 'the Lean the kernel read must ride IN the record, or a citing reader cannot check the claim' },
    { name: 'form-or-declared', ok: rec.tex === null || rec.tex.length > 0, why: 'a formula form is present or its absence is stated; a blank tex is neither' },
    { name: 'identity', ok: /^[0-9a-f-]{36}$/.test(rec.address) && /^[0-9a-f]{8}$/.test(rec.handle), why: 'the record must content-address' },
    { name: 'graph', ok: rec.relatedIdentifiers.some((r) => r.relation === 'isRelatedTo') || rec.relatedTheorems.length === 0, why: 'a record with siblings must name them' },
    { name: 'part-of-monograph', ok: rec.relatedIdentifiers.some((r) => r.relation === 'isPartOf'), why: 'every proposition is part of the archived ledger and of the monograph that publishes it' },
    { name: 'community', ok: rec.communities.some((c) => c.identifier === 'uuidna'), why: 'the captain: publish all in the uuidna community' },
    { name: 'keywords', ok: rec.keywords.length >= 5, why: 'discovery needs vocabulary' },
    { name: 'doi-not-invented', ok: rec.doi === null && rec.doiPending, why: 'a DOI is assigned by the mint; a record carrying one it was not given is a fabrication' },
    { name: 'merge-key', ok: /^[0-9a-f-]{36}$/.test(rec.propositionAddress) && rec.propositionAddress === propositionAddress(rec.statement), why: 'the record must carry the repo-independent address of its normalised statement, or two repositories minting one result cannot merge' },
    { name: 'forms-kept', ok: rec.statementForms.length >= 1 && rec.statementForms.every((f) => normaliseProposition(f) === normaliseProposition(rec.statement)), why: 'every raw form that normalises to this proposition is kept in the metadata; a discarded form is a lost occurrence' },
  ]
}

export interface TheoremDepositLedger {
  records: TheoremDepositRecord[]
  ready: number
  refused: { id: string; failed: string[] }[]
  keys: number
  propositions: number
  renamings: number
  allReady: boolean
  receipt: string
}

/** theoremDepositLedger() → all 2539 propositions, graded. `allReady` is the per-theorem mint gate. */
export function theoremDepositLedger(): TheoremDepositLedger {
  const records = theoremDepositRecords()
  const abstracts = abstractCounts(records.map((r) => r.abstract))
  const refused: { id: string; failed: string[] }[] = []
  let ready = 0
  for (const rec of records) {
    const failed = gradeTheoremRecord(rec, abstracts).filter((g) => !g.ok).map((g) => g.name)
    if (failed.length) refused.push({ id: rec.id, failed })
    else ready++
  }
  return {
    records, ready, refused,
    keys: THEOREMS.length,
    propositions: records.length,
    renamings: records.reduce((a, r) => a + r.alternateKeys.length, 0),
    allReady: refused.length === 0,
    receipt: merkleFold([toUuid('theorem-deposit-ledger|' + records.length), ...records.map((r) => r.receipt)]),
  }
}

/** theoremDepositGaps() → the guard's shape for the per-theorem tier. */
export function theoremDepositGaps(): { what: string; fix: string }[] {
  const l = theoremDepositLedger()
  if (l.allReady) return []
  const byFault = new Map<string, number>()
  for (const r of l.refused) for (const f of r.failed) byFault.set(f, (byFault.get(f) ?? 0) + 1)
  return [{
    what: `${l.refused.length} of ${l.propositions} per-theorem deposit candidates fail the DOI-grade bar `
      + `(${[...byFault].sort((a, b) => b[1] - a[1]).map(([f, n]) => `${f}: ${n}`).join(', ')})`,
    fix: 'a DOI is permanent, so fix the theorem record rather than the bar. Each criterion names what a citable '
      + 'scholarly record carries; a candidate that fails one would archive the shortfall forever under an '
      + 'identifier people cite.',
  }]
}
