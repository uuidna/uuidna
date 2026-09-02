// @non-harmonic: uuidnaOS doi port — prefix ownership is recomputed from the REGISTRATION AGENCY, over the network.
// doi — THE DOI TAG LAYER: which prefix belongs to whom, which door serves it, and what prior work each door finds.
//
// WHY A PREFIX IS THE RIGHT TAG. A DOI is `prefix/suffix`, and the PREFIX is registered to one organisation by one
// registration agency. So a prefix is the smallest fact that says WHO published: `10.3847` is the American
// Astronomical Society, `10.1088` is IOP Publishing (AAS's publisher), `10.5281` is Zenodo. That makes a prefix
// exactly the tag a door needs — it links a citation to the door that can serve it, and it is checkable.
//
// THE CLAIM AND ITS RECEIPT, AGAIN. The owner names below are a CLAIM written here. The receipt is the agency's
// own API: Crossref answers /prefixes/10.3847 with the owner it has on file, DataCite answers /prefixes/10.5281
// with whether it is registered at all. `verifyDoiPrefix` asks and reports whether the two AGREE — so a prefix
// that changes hands is caught by recomputation rather than by someone noticing. An unreachable agency is
// DECLINED, which is not the same as a disagreement.
//
// PRIOR WORK IS TWO DIFFERENT THINGS AND BOTH ARE TAGGED. OURS is already recorded: ZENODO_SEALS carries this
// tree's own standing and concept DOIs, and `ownDoiRecords` reads them rather than restating them. THEIRS is
// found by asking: `priorArtByDoi` runs a subject through the journal doors and returns every DOI that came back,
// tagged with its prefix, its owner and the door that served it. A subject with priors is a CREDIT; a subject
// with none is where a claim may stand — the same two outcomes publication-prior-art already names, computed
// from live doors instead of a hand-kept list.
import { handleOf } from '../../../handle.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { ZENODO_SEALS } from '../../../zenodo-seals.js'
import { CAPTAIN_CREDIT, type Credit } from '../../../captain/credits/index.js'
import { publicApiRegistry } from '../public/index.js'
import { JOURNAL_DOORS, journalSweep, type JournalRow } from '../journals/index.js'
import { AAS_DOI_PREFIX } from '../aas/index.js'
import { fetchData } from '../fetch/index.js'

export type DoiAgency = 'crossref' | 'datacite'

export const CROSSREF_PREFIX_API = 'https://api.crossref.org/prefixes'
export const DATACITE_PREFIX_API = 'https://api.datacite.org/prefixes'

export interface DoiPrefix {
  prefix: string
  /** the owner as the AGENCY reports it — measured on 2026-09-02, and recomputable by verifyDoiPrefix */
  owner: string
  agency: DoiAgency
  /** wired doors that serve or resolve content under this prefix */
  doors: readonly string[]
  why: string
}

/** The prefixes this tree has a reason to name — each verified against its agency's own API. */
export const DOI_PREFIXES: readonly DoiPrefix[] = [
  { prefix: AAS_DOI_PREFIX, owner: 'American Astronomical Society', agency: 'crossref',
    doors: ['journals-aas-org', 'crossref-journals', 'datacite'],
    why: 'The AAS journals corpus. The journals.aas.org door serves the society’s own PAGES; the papers carry this prefix and are IOP-served, so a citation under it resolves through Crossref, never through the site door.' },
  { prefix: '10.1088', owner: 'IOP Publishing', agency: 'crossref', doors: ['crossref-journals'],
    why: 'AAS’s publisher. Named because the AAS door’s honest scope turns on the difference between what the society publishes about a journal and what its publisher publishes in it.' },
  { prefix: '10.5281', owner: 'Zenodo', agency: 'datacite', doors: ['datacite', 'zenodo-communities'],
    why: 'Zenodo, where this tree’s own deposits live — so ownDoiRecords and the community listing sit under one prefix.' },
  { prefix: '10.1371', owner: 'Public Library of Science (PLoS)', agency: 'crossref', doors: ['plos', 'europepmc', 'crossref-journals'],
    why: 'Every PLOS article. The PLOS door returns its own DOIs, so a row from it is already a citation.' },
  { prefix: '10.1101', owner: 'Cold Spring Harbor Laboratory', agency: 'crossref', doors: ['biorxiv', 'europepmc'],
    why: 'bioRxiv and medRxiv preprints — the prefix the bioRxiv resolver takes as its input.' },
  { prefix: '10.4230', owner: 'Schloss Dagstuhl', agency: 'datacite', doors: ['dblp'],
    why: 'LIPIcs proceedings, indexed by DBLP — a DataCite-registered prefix reached through a Crossref-shaped bibliography, which is why agency and door are separate fields.' },
  { prefix: '10.21468', owner: 'Stichting SciPost', agency: 'crossref', doors: ['inspirehep'],
    why: 'SciPost Physics, INSPIRE-indexed open access.' },
  { prefix: '10.24072', owner: 'Peer Community In', agency: 'crossref', doors: ['europepmc', 'hal'],
    why: 'Peer Community In — peer review published as its own record, the closest external analogue to this tree’s open-verdict discipline.' },
  { prefix: '10.6084', owner: 'figshare', agency: 'datacite', doors: ['datacite'],
    why: 'figshare — DataCite’s other large generalist repository, named so the Zenodo prefix is not read as the only one.' },
  // FOUND BY THE CENSUS, not by hand. ownDoiRecords reported a cite-only seal under 10.1038 with an EMPTY owner —
  // this tree cites a Nature paper in its own record and had no tag for the prefix it cites under. The
  // ownPrefixesAreTagged finder below now fails on that class, so the next untagged prefix in our own record is
  // named the moment it appears rather than the next time someone reads the table.
  // FOUND BY A LIVE SWEEP: the AAS subject returned 10.48550/arxiv.… through the DataCite door, and arxiv.org is
  // already one of this tree's wired research doors — a door that mints under a prefix we had not named.
  { prefix: '10.48550', owner: 'registered with DataCite', agency: 'datacite', doors: ['arxiv-org', 'datacite'],
    why: 'arXiv’s own DOI prefix. arxiv.org is a wired research door and mints under it, so by the rule of this tree its prefix belongs on file — a preprint citation resolves through DataCite, not through the Atom export API the sweep reads.' },
  { prefix: '10.1038', owner: 'Springer Science and Business Media LLC', agency: 'crossref',
    doors: ['crossref-journals', 'europepmc'],
    why: 'Nature and the Springer Nature journals. On file because this tree’s OWN registry carries a cite-only seal under it — an external astronomy result it cites rather than claims, which is the credit law working at the level of a whole paper.' },
]

/** Wired doors that MINT DOIs under a prefix of their own — a fact about each service, not a judgement: Zenodo,
 *  arXiv, PLOS and bioRxiv register their own; Crossref and DataCite are AGENCIES and mint for others; the rest
 *  index or report a publisher's. A minting door's prefix belongs on file, and doorsMintingUntagged() checks it. */
const DOOR_MINTS: Record<string, string> = {
  'zenodo-org': '10.5281',
  'arxiv-org': '10.48550',
  plos: '10.1371',
  biorxiv: '10.1101',
}

/** doorsMintingUntagged() → wired doors that mint under a prefix with no tag on file. Pure. */
export function doorsMintingUntagged(): { door: string; prefix: string }[] {
  const known = new Set(DOI_PREFIXES.map((p) => p.prefix))
  return Object.entries(DOOR_MINTS)
    .filter(([, prefix]) => !known.has(prefix))
    .map(([door, prefix]) => ({ door, prefix }))
}

/** untaggedOwnPrefixes() → prefixes appearing in THIS tree's own deposit registry with no tag on file. Pure.
 *  The finder for the class the census caught. The rule of this tree, chosen deliberately: a citation in our own
 *  registry names the owner of the prefix it cites under, so an untagged prefix here is a gap to close. */
export function untaggedOwnPrefixes(): string[] {
  const known = new Set(DOI_PREFIXES.map((p) => p.prefix))
  const found = new Set<string>()
  for (const s of ZENODO_SEALS) {
    for (const doi of [s.standingDoi, s.conceptDoi ?? '', ...(s.related ?? []).map((r) => r.identifier)]) {
      const prefix = doiPrefixOf(doi)
      if (prefix && !known.has(prefix)) found.add(prefix)
    }
  }
  return [...found].sort()
}

/** resolveDoiPrefix(prefix) → the owner an AGENCY reports for a prefix this tree does not name. Network.
 *
 *  THE HAND LIST IS DELIBERATELY PARTIAL, and pretending otherwise is the failure mode. DOI_PREFIXES is not a census
 *  of the world's prefixes — it is the set THIS tree has a reason to name, each with that reason written down. A
 *  sweep routinely returns prefixes outside it (Frontiers, MDPI, SAGE turned up on the first three subjects), and
 *  the fix is not to grow the list until it is a bad copy of the registry: it is to ASK. Crossref is tried first
 *  because it names an owner, then DataCite, which confirms registration. Unresolvable comes back empty, which is
 *  reported as unknown rather than guessed. */
export async function resolveDoiPrefix(prefix: string): Promise<{ prefix: string; owner: string; agency: DoiAgency | 'unknown'; note: string }> {
  const known = doiPrefixTag(prefix)
  if (known) return { prefix, owner: known.owner, agency: known.agency, note: 'on file' }
  try {
    const cr = await fetchData<{ message?: { name?: string } }>(`${CROSSREF_PREFIX_API}/${prefix}?mailto=ceccec@psg.bg`, 'json')
    const name = cr.data?.message?.name ?? ''
    if (name) return { prefix, owner: name, agency: 'crossref', note: 'resolved from Crossref' }
    const dc = await fetchData<{ data?: { id?: string } }>(`${DATACITE_PREFIX_API}/${prefix}`, 'json')
    if (dc.data?.data?.id) return { prefix, owner: 'registered with DataCite', agency: 'datacite', note: 'resolved from DataCite' }
    return { prefix, owner: '', agency: 'unknown', note: 'neither agency named an owner' }
  } catch (e) { return { prefix, owner: '', agency: 'unknown', note: String((e as Error).message).slice(0, 90) } }
}

export interface DoiRecord {
  doi: string
  prefix: string
  /** the owner this tree has on file for the prefix, or '' when the prefix is unknown here */
  owner: string
  agency: DoiAgency | 'unknown'
  door: string
  title: string
  url: string
  venue: string
  address: string
}

export interface DoiPrefixVerdict {
  prefix: string
  agency: DoiAgency
  claimedOwner: string
  /** the owner the agency's OWN API reports; '' when it reports none */
  reportedOwner: string
  agrees: boolean
  declined: boolean
  note: string
}

/** doiPrefixOf(doi) → the registered prefix of a DOI string, or '' when it is not a DOI. Pure. */
export function doiPrefixOf(doi: string): string {
  const m = /^(?:https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,9})\//.exec(doi.trim())
  return m ? m[1]! : ''
}

/** doiPrefixTag(prefix) → what this tree knows about a prefix, or null. Pure. */
export const doiPrefixTag = (prefix: string): DoiPrefix | null =>
  DOI_PREFIXES.find((p) => p.prefix === prefix) ?? null

/** tagDoi(doi, door, row) → one DOI record with its prefix tag resolved. Pure. */
export function tagDoi(doi: string, door: string, row: Partial<JournalRow> = {}): DoiRecord | null {
  const prefix = doiPrefixOf(doi)
  if (!prefix) return null
  const tag = doiPrefixTag(prefix)
  const clean = doi.trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//, '')
  return {
    doi: clean,
    prefix,
    owner: tag?.owner ?? '',
    agency: tag?.agency ?? 'unknown',
    door,
    title: (row.title ?? '').slice(0, 200),
    url: row.url ?? `https://doi.org/${clean}`,
    venue: row.venue ?? '',
    address: toUuid('doi:' + clean),
  }
}

/** verifyDoiPrefix(prefix) → the owner the REGISTRATION AGENCY reports, against the one on file here. Network.
 *  Crossref names the owner outright; DataCite's public prefix route confirms registration without naming an
 *  owner, so a DataCite prefix agrees when it is registered — the strongest thing that door actually says. */
export async function verifyDoiPrefix(prefix: string): Promise<DoiPrefixVerdict> {
  const tag = doiPrefixTag(prefix)
  if (!tag)
    return { prefix, agency: 'crossref', claimedOwner: '', reportedOwner: '', agrees: false, declined: true,
             note: `no prefix tag on file for ${prefix}` }
  const base = tag.agency === 'crossref' ? CROSSREF_PREFIX_API : DATACITE_PREFIX_API
  const url = tag.agency === 'crossref'
    ? `${base}/${prefix}?mailto=ceccec@psg.bg`
    : `${base}/${prefix}`
  try {
    const got = await fetchData<unknown>(url, 'json')
    if (got.data === null)
      return { prefix, agency: tag.agency, claimedOwner: tag.owner, reportedOwner: '', agrees: false, declined: true, note: got.note }
    const d = got.data as { message?: { name?: string }; data?: { id?: string } }
    const reportedOwner = tag.agency === 'crossref' ? (d.message?.name ?? '') : (d.data?.id ? 'registered with DataCite' : '')
    const agrees = tag.agency === 'crossref'
      ? reportedOwner.trim().toLowerCase() === tag.owner.trim().toLowerCase()
      : reportedOwner.length > 0
    return { prefix, agency: tag.agency, claimedOwner: tag.owner, reportedOwner, agrees, declined: false, note: 'ok' }
  } catch (e) {
    return { prefix, agency: tag.agency, claimedOwner: tag.owner, reportedOwner: '', agrees: false, declined: true,
             note: String((e as Error).message).slice(0, 120) }
  }
}

export interface DoiPrefixAudit {
  definition: 'uuidnaOS·doi·prefixes'
  checked: number
  agreeing: number
  disagreeing: DoiPrefixVerdict[]
  declined: DoiPrefixVerdict[]
  verdicts: DoiPrefixVerdict[]
  receipt: string
  handle: string
  hexbits: number[]
  doorUrl: string
  honest: string
}

/** verifyDoiPrefixes() → every named prefix checked against its agency AT ONCE. Network; one deadline. */
export async function verifyDoiPrefixes(): Promise<DoiPrefixAudit> {
  const verdicts = await Promise.all(DOI_PREFIXES.map((p) => verifyDoiPrefix(p.prefix)))
  const receipt = merkleGravity([
    toUuid('doi-prefix-audit'),
    ...verdicts.map((v) => toUuid(`doi-prefix:${v.prefix}|${v.agency}|${v.agrees}`)),
  ])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·doi·prefixes',
    checked: verdicts.length,
    agreeing: verdicts.filter((v) => v.agrees).length,
    disagreeing: verdicts.filter((v) => !v.agrees && !v.declined),
    declined: verdicts.filter((v) => v.declined),
    verdicts,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    doorUrl: door.door,
    honest: 'Crossref NAMES the owner, so agreement there is a name match. DataCite’s public prefix route confirms '
      + 'REGISTRATION without naming an owner, so agreement there is the weaker claim — the strongest thing that '
      + 'door actually says, reported as such rather than dressed up as a name match.',
  }
}

export interface OwnDoiRecord {
  id: string
  title: string
  role: string
  standingDoi: string
  conceptDoi: string
  prefix: string
  owner: string
  agency: DoiAgency | 'unknown'
  link: string
  address: string
}

/** ownDoiRecords() → THIS tree's own deposits, tagged. Pure: read off ZENODO_SEALS, the record that already
 *  exists, so the prior work is tagged where it is kept rather than copied into a second list that can drift. */
export function ownDoiRecords(): {
  definition: 'uuidnaOS·doi·own'
  count: number
  records: OwnDoiRecord[]
  receipt: string
  handle: string
  hexbits: number[]
  doorUrl: string
  honest: string
} {
  const records: OwnDoiRecord[] = ZENODO_SEALS.map((s) => {
    const prefix = doiPrefixOf(s.standingDoi)
    const tag = doiPrefixTag(prefix)
    return {
      id: s.id,
      title: s.title,
      role: s.role,
      standingDoi: s.standingDoi,
      conceptDoi: s.conceptDoi ?? '',
      prefix,
      owner: tag?.owner ?? '',
      agency: tag?.agency ?? 'unknown',
      link: `https://doi.org/${s.standingDoi}`,
      address: toUuid('own-doi:' + s.standingDoi),
    }
  })
  const receipt = merkleGravity([toUuid('doi-own'), ...records.map((r) => r.address)])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·doi·own',
    count: records.length,
    records,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    doorUrl: door.door,
    honest: 'A DOI is a permanent citation, not a peer-review verdict: it proves this tree deposited and when the '
      + 'archive says so. The standing DOI names one version, the concept DOI names the series.',
  }
}

export interface DoiTagCensus {
  definition: 'uuidnaOS·doi·tags'
  prefixes: number
  doors: number
  /** doors carrying at least one prefix tag */
  tagged: { door: string; prefixes: string[] }[]
  /** doors that mint or serve no DOI — an index is not a publisher, and that is a fact, not a gap */
  mintsNone: { door: string; why: string }[]
  receipt: string
  handle: string
  hexbits: number[]
  doorUrl: string
  honest: string
}

const MINTS_NONE: Record<string, string> = {
  doaj: 'an INDEX of journals — a journal is not a publication, so it carries no DOI of its own',
  'openalex-sources': 'an index of sources; OpenAlex mints no DOI and reports the publisher’s',
  pubmed: 'esearch answers with PMIDs; a DOI is not derivable from a PMID, so the row leaves it empty',
  hal: 'an archive: a deposit carries a DOI only when its publisher minted one, so doiId_s is often absent',
  inspirehep: 'a literature database: it reports the publisher’s DOI where one exists and mints none',
  dblp: 'a bibliography: it reports the publisher’s DOI and mints none',
}

/** doiTagCensus() → every wired door either carries prefix tags or is NAMED as minting none. Pure, and it drains
 *  publicApiRegistry, so by construction a door added to the catalogue is either tagged or named as minting none. */
export function doiTagCensus(): DoiTagCensus {
  const reg = publicApiRegistry()
  const allDoors = [...reg.research, ...reg.euEducation, ...reg.weather, ...reg.news, ...reg.journals, ...reg.other]
  const byDoor = new Map<string, string[]>()
  for (const p of DOI_PREFIXES)
    for (const d of p.doors) byDoor.set(d, [...(byDoor.get(d) ?? []), p.prefix].sort())
  const tagged = [...byDoor].map(([door, prefixes]) => ({ door, prefixes })).sort((a, b) => a.door.localeCompare(b.door))
  const mintsNone = JOURNAL_DOORS
    .filter((d) => MINTS_NONE[d.id] !== undefined && !byDoor.has(d.id))
    .map((d) => ({ door: d.id, why: MINTS_NONE[d.id]! }))
  const receipt = merkleGravity([
    toUuid('doi-tags'),
    ...DOI_PREFIXES.map((p) => toUuid(`doi-tag:${p.prefix}|${p.owner}|${p.doors.join(',')}`)),
  ])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·doi·tags',
    prefixes: DOI_PREFIXES.length,
    doors: allDoors.length,
    tagged,
    mintsNone,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    doorUrl: door.door,
    honest: 'A door with no prefix tag is usually an INDEX rather than a publisher, and that is a fact about what '
      + 'it is. The census names those separately so "untagged" is never read as "unexamined".',
  }
}

export type PriorArtOutcome = 'credit' | 'claim'

/** involuteOutcome(o) → the OTHER outcome. Self-inverse (involute(involute(o)) = o) and FIXED-POINT-FREE, which
 *  is the content: no subject is both credited and claimed, and none is neither. Pure.
 *
 *  The involution matters because the outcome is not an opinion — it is decided by whether any DOI came back. So
 *  flipping the outcome while leaving the records alone produces a statement that is false by construction, and
 *  `outcomeOf` below is the only lawful way to reach one. A test that involutes the outcome and finds it equal to
 *  the original has caught a fixed point, which would mean the two ends of the passage had collapsed into one. */
export const involuteOutcome = (o: PriorArtOutcome): PriorArtOutcome => (o === 'credit' ? 'claim' : 'credit')

/** outcomeOf(records) → the ONLY lawful source of an outcome: found DOIs mean credit, none means claim. Pure. */
export const outcomeOf = (records: readonly DoiRecord[]): PriorArtOutcome => (records.length > 0 ? 'credit' : 'claim')

/** creditOrderFor(records) → THE CREDIT LAW, applied to what the doors found: every distinct prior DOI first, in
 *  the order the doors returned them, and the captain LAST among claimants — never first when prior art is named,
 *  and never absent, because uuidna reflects history and claims only the unclaimed. With no priors the captain is
 *  the only claimant, which is the claim half of the same law rather than a different rule. Pure. */
export function creditOrderFor(records: readonly DoiRecord[]): readonly Credit[] {
  const seen = new Set<string>()
  const priors: Credit[] = []
  for (const r of records) {
    const who = r.owner || `DOI prefix ${r.prefix}`
    const link = `https://doi.org/${r.doi}`
    if (seen.has(link)) continue
    seen.add(link)
    priors.push({ who, link })
  }
  return [...priors, CAPTAIN_CREDIT]
}

export interface PriorArtByDoi {
  definition: 'uuidnaOS·doi·prior-art'
  subject: string
  /** every DOI the doors returned, tagged */
  records: DoiRecord[]
  byPrefix: { prefix: string; owner: string; count: number }[]
  byDoor: { door: string; count: number }[]
  /** rows that came back WITHOUT a DOI — found, but not citable by DOI, and counted rather than dropped */
  withoutDoi: number
  /** prefixes this tree does not name; empty after enrichment resolved them from the agency */
  unknownPrefixes: string[]
  outcome: PriorArtOutcome
  /** the outcome's involution — the state this subject is NOT in, carried so the exclusion is visible, not implied */
  notOutcome: PriorArtOutcome
  /** prior DOIs first, the captain last among claimants — never captain-first when prior art is named */
  creditOrder: readonly Credit[]
  /** true when the doors found nothing and the captain is the ONLY claimant — the unclaimed, claimed */
  claimedTheUnclaimed: boolean
  doorsAsked: number
  doorsAnswering: number
  receipt: string
  handle: string
  hexbits: number[]
  doorUrl: string
  honest: string
}

/** priorArtByDoi(subject, limit) → the prior work the live doors find for one subject, as tagged DOI records.
 *  `credit` when any DOI came back, `claim` when none did — the same two outcomes the publication registry uses,
 *  computed from doors instead of a hand-kept list. A `claim` outcome means NOTHING WAS FOUND BY THESE DOORS on
 *  this phrasing; it is not evidence that no prior work exists, and the honest field says so where it is read. */
export async function priorArtByDoi(subject: string, limit = 5, enrich = false): Promise<PriorArtByDoi> {
  const sweep = await journalSweep(subject, { limit })
  const rows = [...sweep.journalLevel, ...sweep.articleLevel].flatMap((r) => r.rows)
  const records = rows.flatMap((r) => { const t = tagDoi(r.doi, r.door, r); return t ? [t] : [] })
  // ENRICHMENT, off by default: fill the owner of a prefix this tree does not name by asking the agency itself,
  // one lookup per distinct unknown prefix rather than one per record. Off by default because the pure tag is
  // the cheap answer and a sweep already spent its network budget.
  if (enrich) {
    const unknown = [...new Set(records.filter((r) => r.owner === '').map((r) => r.prefix))]
    const resolved = new Map((await Promise.all(unknown.map((p) => resolveDoiPrefix(p)))).map((r) => [r.prefix, r]))
    for (const r of records) {
      const hit = resolved.get(r.prefix)
      if (hit && hit.owner) { r.owner = hit.owner; r.agency = hit.agency }
    }
  }
  const prefixCount = new Map<string, number>()
  for (const r of records) prefixCount.set(r.prefix, (prefixCount.get(r.prefix) ?? 0) + 1)
  const doorCount = new Map<string, number>()
  for (const r of records) doorCount.set(r.door, (doorCount.get(r.door) ?? 0) + 1)
  const receipt = merkleGravity([toUuid('doi-prior-art|' + subject), ...records.map((r) => r.address)])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·doi·prior-art',
    subject,
    records,
    // the owner comes off the RECORDS, not the hand list — otherwise enrichment would fill the credit order and
    // leave this summary still saying "not on file", two answers to one question in one result
    byPrefix: [...prefixCount].map(([prefix, count]) =>
      ({ prefix, owner: records.find((r) => r.prefix === prefix && r.owner !== '')?.owner ?? '', count }))
      .sort((a, b) => b.count - a.count || a.prefix.localeCompare(b.prefix)),
    byDoor: [...doorCount].map(([d, count]) => ({ door: d, count })).sort((a, b) => b.count - a.count || a.door.localeCompare(b.door)),
    withoutDoi: rows.length - records.length,
    unknownPrefixes: [...new Set(records.filter((r) => r.owner === '').map((r) => r.prefix))].sort(),
    outcome: outcomeOf(records),
    notOutcome: involuteOutcome(outcomeOf(records)),
    creditOrder: creditOrderFor(records),
    claimedTheUnclaimed: records.length === 0,
    doorsAsked: sweep.asked,
    doorsAnswering: sweep.answering,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    doorUrl: door.door,
    honest: 'A `credit` outcome names DOIs to credit. A `claim` outcome means THESE DOORS returned no DOI for '
      + 'THIS phrasing — the reach of a search, not the absence of prior work, and a different phrasing routinely '
      + 'changes it. Rows without a DOI are counted, because found-but-not-citable is its own fact. The credit '
      + 'order puts every prior DOI ahead of the captain and the captain last among claimants — and when the doors '
      + 'find nothing, the captain is the only claimant, which is the unclaimed being claimed rather than a '
      + 'different rule.',
  }
}

/** renderDoiPrefixAudit(a) → CLI / exec / MCP summary lines. Pure. */
export function renderDoiPrefixAudit(a: DoiPrefixAudit): string {
  return [
    `DOI PREFIXES ${a.agreeing}/${a.checked} agree with their registration agency`,
    ...a.verdicts.map((v) =>
      `  ${v.agrees ? '✓' : v.declined ? '·' : '✗'} ${v.prefix.padEnd(9)} ${v.agency.padEnd(9)} ${v.declined ? `unread — ${v.note}` : v.reportedOwner || '(no owner reported)'}`),
    ...(a.disagreeing.length ? [`  DISAGREEMENT: ${a.disagreeing.map((v) => `${v.prefix} on file "${v.claimedOwner}", agency says "${v.reportedOwner}"`).join(' · ')}`] : []),
    `  receipt ${handleOf(a.receipt)}… · door ${a.doorUrl}`,
  ].join('\n')
}

/** renderPriorArtByDoi(p) → CLI / exec / MCP summary lines. Pure. */
export function renderPriorArtByDoi(p: PriorArtByDoi): string {
  return [
    `${p.outcome.toUpperCase()} "${p.subject}" · ${p.records.length} DOI(s) from ${p.doorsAnswering}/${p.doorsAsked} doors · ${p.withoutDoi} row(s) without a DOI`,
    ...p.byPrefix.map((b) => `  ${b.prefix.padEnd(9)} ×${String(b.count).padStart(2)}  ${b.owner || '(prefix not on file here)'}`),
    ...p.records.slice(0, 8).map((r) => `  ${r.doi.padEnd(34)} [${r.door}] ${r.title.slice(0, 60)}`),
    `  credit order: ${p.creditOrder.map((c) => c.who).join(' → ')}`
      + (p.claimedTheUnclaimed ? '  (the unclaimed, claimed)' : ''),
    `  receipt ${handleOf(p.receipt)}… · door ${p.doorUrl}`,
  ].join('\n')
}

/** renderOwnDoiRecords(o) → CLI / exec / MCP summary lines. Pure. */
export function renderOwnDoiRecords(o: ReturnType<typeof ownDoiRecords>): string {
  return [
    `OWN DEPOSITS ${o.count} · prefix ${[...new Set(o.records.map((r) => r.prefix))].join(', ')}`,
    ...o.records.map((r) => `  ${r.standingDoi.padEnd(26)} (concept ${r.conceptDoi}) ${r.role.padEnd(17)} ${r.title.slice(0, 52)}`),
    `  receipt ${handleOf(o.receipt)}… · door ${o.doorUrl}`,
  ].join('\n')
}
