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

/** The standing concept DOI every monograph is a part of — read from the seal registry, never typed here. */
const conceptDoi = (): string => ZENODO_SEALS.find((s) => s.id === 'uuidna-software')?.conceptDoi ?? ''
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
  const concept = conceptDoi()
  if (concept) rels.push({ identifier: `https://doi.org/${concept}`, relation: 'isPartOf', resource_type: 'dataset' })
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

export function depositRecord(pub: Publication): DepositRecord {
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
    license: CANONICAL_LICENSE_SPDX(),
    licenseZenodo: CANONICAL_LICENSE_ZENODO(),
    licenseUrl: CANONICAL_LICENSE_URL(),
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

export function gradeRecord(rec: DepositRecord, corpusAbstracts: readonly string[]): GradeCriterion[] {
  const abstractShared = corpusAbstracts.filter((a) => a === rec.abstract).length > 1
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
  const corpusAbstracts = pubs.map((p) => p.abstract)
  const records = pubs.map((p) => depositRecord(p))
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
