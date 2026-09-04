// zenodo-oai — HARVEST THE COMMUNITY FROM OUTSIDE, AND COMPARE IT TO WHAT THIS REPOSITORY CLAIMS.
//
// The captain pointed at developers.zenodo.org/#oai-pmh and asked for the layer. The question it answers is one
// no filesystem gate here can: "publish all in the uuidna community" is a claim about a remote registry, and the
// only way to check it is to ask the registry. OAI-PMH is the right door for that — it lists a SET, which is
// what a Zenodo community is (`user-<slug>`), and it needs no token.
//
// WHAT THE FIRST HARVEST FOUND, before any of this was wrapped in code. The `user-uuidna` set holds 22 records:
// seventeen successive uuidna releases, three versions of the Clay σ-involution paper, and TWO WORKS THAT ARE NOT
// OURS — "Quantum Proofs of the Clay Millennium Problems v1.0" (21787144) and "Millennium Solutions — The ℤ/9
// Vortex Framework" (21819217). Those are the same two works tangled into this project's concept DOI chain, and
// finding them in the community as well says the entanglement is membership-wide rather than a single mis-click.
//
// AND THE CLAY SEAL CITES VERSION ONE OF THREE: the registry declares 21781603 while the community also holds
// 22127378 and 22256707 of the same paper. Citing a specific version is correct scholarly practice, so this is
// REPORTED rather than corrected — a version citation is a choice, and silently advancing it would be worse.
//
// THE LIMITATION, MEASURED AND WORTH CARRYING: a Zenodo CONCEPT DOI has no OAI record at all. Asking
// `GetRecord` for one returns idDoesNotExist, so a harvesting gate reports a FALSE ABSENCE for exactly the
// identifier most likely to have moved. Concept identifiers must be followed by HTTP resolution instead, which
// is what scripts/audit-doi-harvest.ts does. Two doors, two questions: OAI lists membership, resolution proves
// identity.
//
// @non-harmonic: reads the Zenodo OAI-PMH endpoint — the harvest IS the reading, and the boundary is named here
import { ZENODO_SEALS } from './zenodo-seals.js'
import { toUuid, merkleFold } from './address.js'

export const OAI_BASE = 'https://zenodo.org/oai2d'
/** A Zenodo community is an OAI set named `user-<slug>`. */
export const communitySet = (slug: string): string => `user-${slug}`

export interface OaiRecord {
  /** the Zenodo record id, from oai:zenodo.org:<id> */
  recordId: string
  title: string
  doi: string
  datestamp: string
  /** every dc:relation the record declares — this is where a concept chain shows itself */
  relations: string[]
}

export interface CommunityHarvest {
  set: string
  /** false when the endpoint could not be read — a fact about this host, never about the community */
  read: boolean
  reason?: string
  records: OaiRecord[]
  /** records whose DOI this repository declares in its seal registry */
  declared: OaiRecord[]
  /** records in the community that this repository does not declare, PARTITIONED — because lumping them
   *  together is the exact fault this tree keeps paying for. A first run reported "20 undeclared", which read as
   *  twenty problems; eighteen were our own SUPERSEDED versions of works we do declare (seventeen uuidna
   *  releases and two earlier Clay versions), which is what a version history looks like and is not a finding.
   *  Two were works by other people. Only the second kind is worth anyone's attention. */
  superseded: OaiRecord[]
  foreign: OaiRecord[]
  /** titles grouped, so a version chain reads as one work rather than N results */
  works: { title: string; versions: string[] }[]
  receipt: string
}

const tag = (xml: string, name: string): string => {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`).exec(xml)
  return m ? m[1]!.trim() : ''
}
const allTags = (xml: string, name: string): string[] =>
  [...xml.matchAll(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'g'))].map((m) => m[1]!.trim())

/** parseListRecords(xml) → the records, and the resumption token when the set is longer than one page. */
export function parseListRecords(xml: string): { records: OaiRecord[]; token: string | null } {
  const records: OaiRecord[] = []
  for (const m of xml.matchAll(/<record>([\s\S]*?)<\/record>/g)) {
    const r = m[1]!
    const idm = /<identifier>oai:zenodo\.org:(\d+)</.exec(r)
    const dois = allTags(r, 'dc:identifier').filter((d) => d.includes('doi.org/'))
    records.push({
      recordId: idm ? idm[1]! : '',
      title: tag(r, 'dc:title'),
      doi: (dois[0] ?? '').replace('https://doi.org/', ''),
      datestamp: tag(r, 'datestamp'),
      relations: allTags(r, 'dc:relation'),
    })
  }
  const t = /<resumptionToken[^>]*>([^<]*)</.exec(xml)
  const token = t && t[1]!.trim().length > 0 ? t[1]!.trim() : null
  return { records, token }
}

export type FetchText = (url: string) => Promise<{ status: number; body: string }>

export const defaultFetchText: FetchText = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': 'uuidna-zenodo-oai/1' } })
  return { status: res.status, body: res.status === 200 ? await res.text() : '' }
}

/** harvestCommunity(slug, fetchText) → every record in a community, paged through its resumption tokens. */
export async function harvestCommunity(
  slug = 'uuidna',
  fetchText: FetchText = defaultFetchText,
  maxPages = 20,
): Promise<CommunityHarvest> {
  const set = communitySet(slug)
  const empty = { set, read: false, records: [], declared: [], superseded: [], foreign: [], works: [] }
  const all: OaiRecord[] = []
  let url = `${OAI_BASE}?verb=ListRecords&metadataPrefix=oai_dc&set=${encodeURIComponent(set)}`
  try {
    for (let page = 0; page < maxPages; page++) {
      const { status, body } = await fetchText(url)
      if (status !== 200 || !body) {
        return { ...empty, reason: `the OAI endpoint answered ${status} — the community is UNREAD here, not empty`, receipt: toUuid('oai-unread|' + set) }
      }
      const { records, token } = parseListRecords(body)
      all.push(...records)
      if (!token) break
      url = `${OAI_BASE}?verb=ListRecords&resumptionToken=${encodeURIComponent(token)}`
    }
  } catch (e) {
    return { ...empty, reason: e instanceof Error ? e.message : String(e), receipt: toUuid('oai-threw|' + set) }
  }
  // WHAT THIS REPOSITORY DECLARES — every DOI in the seal registry, in any role.
  const mine = new Set<string>()
  for (const s of ZENODO_SEALS) {
    if (s.standingDoi) mine.add(s.standingDoi.toLowerCase())
    if (s.conceptDoi) mine.add(s.conceptDoi.toLowerCase())
  }
  const declared = all.filter((r) => mine.has(r.doi.toLowerCase()))
  // A WORK IS OURS IF ITS TITLE MATCHES A DECLARED SEAL'S TITLE. Version titles carry an appended census, so the
  // comparison is on the part before the colon — the work's name, not the release's description.
  const stem = (t: string): string => t.split(':')[0]!.trim().toLowerCase()
  const ourTitles = new Set(ZENODO_SEALS.filter((z) => z.owned).map((z) => stem(z.title)))
  const rest = all.filter((r) => !mine.has(r.doi.toLowerCase()))
  const superseded = rest.filter((r) => ourTitles.has(stem(r.title)))
  const foreign = rest.filter((r) => !ourTitles.has(stem(r.title)))
  // GROUP BY TITLE, so seventeen releases of one work read as one work with seventeen versions.
  const byTitle = new Map<string, string[]>()
  for (const r of all) {
    const key = r.title.split(':')[0]!.trim() || r.title
    const list = byTitle.get(key)
    if (list) list.push(r.recordId)
    else byTitle.set(key, [r.recordId])
  }
  return {
    set,
    read: true,
    records: all.sort((a, b) => (a.recordId < b.recordId ? -1 : 1)),
    declared,
    superseded,
    foreign,
    works: [...byTitle].map(([title, versions]) => ({ title, versions: versions.sort() }))
      .sort((a, b) => b.versions.length - a.versions.length),
    receipt: merkleFold([toUuid('oai|' + set + '|' + all.length), ...all.map((r) => toUuid(r.recordId + '|' + r.doi))]),
  }
}

/** THE KNOWN LIMITATION, as a function rather than a comment: a concept DOI has no OAI record. */
export async function oaiRecordExists(recordId: string, fetchText: FetchText = defaultFetchText): Promise<{ exists: boolean; reason: string }> {
  const url = `${OAI_BASE}?verb=GetRecord&metadataPrefix=oai_dc&identifier=oai:zenodo.org:${recordId}`
  try {
    const { status, body } = await fetchText(url)
    // OBSERVED 2026-09-04: asking for the CONCEPT id 21787143 returns 422, not a 200 carrying idDoesNotExist.
    // Either way the answer is UNREAD rather than absent — a concept simply is not an OAI record — and the
    // distinction matters, because a gate reading this as "the work is gone" would raise a false alarm about the
    // one identifier most likely to have moved.
    if (status !== 200) return { exists: false, reason: `endpoint answered ${status} — unread, not absent (a CONCEPT identifier is not an OAI record; resolve it over HTTP instead)` }
    if (/idDoesNotExist/.test(body))
      return { exists: false, reason: 'idDoesNotExist — for a CONCEPT identifier this is expected and is NOT evidence the work is missing; resolve it over HTTP instead' }
    return { exists: /<record>/.test(body), reason: 'record returned' }
  } catch (e) {
    return { exists: false, reason: e instanceof Error ? e.message : String(e) }
  }
}
