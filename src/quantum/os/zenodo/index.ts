// @non-harmonic: uuidnaOS zenodo-communities port — zenodo.org answers on its own uptime; the fold is ours.
// zenodo — THE COMMUNITIES DOOR (zenodo.org/api/communities). The records door already existed: the research
// sweep asks /api/records for papers. Communities are the OTHER half of that API and were unwired, which mattered
// because a deposit's community membership is the one part of a Zenodo claim that is checkable from outside.
//
// THE CLAIM AND ITS RECEIPT. A deposit's own metadata declares `communities: [{id: "uuidna"}]`. That is the CLAIM,
// written by whoever deposited. The community's own record listing is the RECEIPT, written by the community's
// curators — a record can name a community that does not exist, or name one that never accepted it, and the
// deposit's own metadata cannot tell the two apart, by construction: it is written by the depositor alone, so it
// carries no signal from the curators who would have to accept it. verifyZenodoCommunityClaim asks both doors and reports which
// of the three states holds: the community is absent, the community exists but does not list the record, or the
// listing carries it. An unreachable door is DECLINED, never a verdict.
import { handleOf } from '../../../handle.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { fetchData } from '../fetch/index.js'

export const ZENODO_API = 'https://zenodo.org/api'
export const ZENODO_COMMUNITIES = `${ZENODO_API}/communities`
export const ZENODO_PROBE_QUERY = 'astronomy'
/** this repository's own community — the standing deposit target the two-chain law mints into */
export const UUIDNA_COMMUNITY = 'uuidna'

export interface ZenodoCommunity {
  id: string          // the community's UUID as Zenodo assigns it
  slug: string        // the human door: zenodo.org/communities/<slug>
  title: string
  type: string        // organization, project, event, topic — Zenodo's own classification
  url: string
  address: string     // content-address of the (slug, title) tuple — a citation pins the community, not the query
}

export interface ZenodoCommunityRecord {
  id: string
  doi: string
  title: string
  publicationDate: string
  resourceType: string
  address: string
}

export interface ZenodoCommunitiesResult {
  definition: 'uuidnaOS·zenodo·communities'
  query: string
  url: string
  total: number       // what Zenodo says MATCHES, which is larger than what one page carries
  count: number       // what this page actually carries
  communities: ZenodoCommunity[]
  declined: boolean
  note: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}

export interface ZenodoCommunityResult {
  definition: 'uuidnaOS·zenodo·community'
  slug: string
  community: ZenodoCommunity | null
  total: number
  count: number
  records: ZenodoCommunityRecord[]
  declined: boolean
  note: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}

export interface ZenodoCommunityClaim {
  definition: 'uuidnaOS·zenodo·community-claim'
  record: string
  /** the communities the DEPOSIT's own metadata names — the claim */
  claimed: string[]
  /** per claimed community: does it exist, and does its own listing carry this record — the receipt */
  checked: { slug: string; communityExists: boolean; listsRecord: boolean; total: number; note: string }[]
  verdict: 'CARRIED' | 'CLAIMED-NOT-LISTED' | 'NO-COMMUNITY-CLAIMED' | 'DECLINED'
  declined: boolean
  note: string
  honest: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}

type CommunityRow = {
  id?: string; slug?: string
  metadata?: { title?: string; type?: { id?: string } }
  links?: { self_html?: string }
}
type CommunitiesPayload = { hits?: { total?: number; hits?: CommunityRow[] } }
type RecordRow = {
  id?: number; doi?: string
  metadata?: { title?: string; publication_date?: string; resource_type?: { title?: string; type?: string } }
}
type RecordsPayload = { hits?: { total?: number; hits?: RecordRow[] } }
type OneRecord = { id?: number; doi?: string; metadata?: { title?: string; communities?: { id?: string }[] } }

const communityOf = (r: CommunityRow): ZenodoCommunity | null => {
  const slug = r.slug ?? ''
  if (!slug) return null
  const title = r.metadata?.title ?? slug
  return {
    id: r.id ?? '',
    slug,
    title: title.slice(0, 240),
    type: r.metadata?.type?.id ?? 'community',
    url: r.links?.self_html ?? `https://zenodo.org/communities/${slug}/`,
    address: toUuid(`zenodo-community:${slug}|${title}`),
  }
}

const recordOf = (r: RecordRow): ZenodoCommunityRecord | null => {
  const id = String(r.id ?? '')
  if (!id) return null
  return {
    id,
    doi: r.doi ?? '',
    title: (r.metadata?.title ?? '').slice(0, 240),
    publicationDate: r.metadata?.publication_date ?? '',
    resourceType: r.metadata?.resource_type?.type ?? r.metadata?.resource_type?.title ?? '',
    address: toUuid('zenodo:' + id),
  }
}

/** zenodoCommunities(query, size) → communities matching a query, receipt-closed. Network (OS fetch cache). */
export async function zenodoCommunities(query: string, size = 8): Promise<ZenodoCommunitiesResult> {
  const url = `${ZENODO_COMMUNITIES}?size=${size}&q=${encodeURIComponent(query)}`
  const fold = (communities: ZenodoCommunity[], total: number, declined: boolean, note: string): ZenodoCommunitiesResult => {
    const receipt = merkleGravity([toUuid('zenodo-communities|' + query), ...communities.map((c) => c.address)])
    return {
      definition: 'uuidnaOS·zenodo·communities',
      query, url, total, count: communities.length, communities, declined, note, receipt, ...hexbitDoorOf(receipt),
    }
  }
  try {
    const got = await fetchData<CommunitiesPayload>(url, 'json')
    if (got.data === null) return fold([], 0, true, got.note)
    const communities = (got.data.hits?.hits ?? []).flatMap((r) => { const c = communityOf(r); return c ? [c] : [] })
    return fold(communities, Number(got.data.hits?.total ?? communities.length), false, 'ok')
  } catch (e) { return fold([], 0, true, String((e as Error).message).slice(0, 120)) }
}

/** zenodoCommunity(slug, size) → one community and the records ITS OWN listing carries. Network. */
export async function zenodoCommunity(slug: string, size = 8): Promise<ZenodoCommunityResult> {
  const fold = (community: ZenodoCommunity | null, records: ZenodoCommunityRecord[], total: number,
                declined: boolean, note: string): ZenodoCommunityResult => {
    const receipt = merkleGravity([toUuid('zenodo-community|' + slug), ...records.map((r) => r.address)])
    return {
      definition: 'uuidnaOS·zenodo·community',
      slug, community, total, count: records.length, records, declined, note, receipt, ...hexbitDoorOf(receipt),
    }
  }
  try {
    // BOTH DOORS AT ONCE. The listing does not depend on the community record — only on the slug — so asking them
    // in sequence paid two round trips for one answer, and this listing is the slowest door in the tree (tens of
    // seconds when Zenodo is busy). Concurrent, the pair costs the slower of the two instead of their sum, and it
    // carries its own longer deadline because a door known to be slow must not be called dead for being slow.
    const deadline = { signal: AbortSignal.timeout(45_000) }
    const [one, listed] = await Promise.all([
      fetchData<CommunityRow>(`${ZENODO_COMMUNITIES}/${encodeURIComponent(slug)}`, 'json', deadline),
      fetchData<RecordsPayload>(`${ZENODO_COMMUNITIES}/${encodeURIComponent(slug)}/records?size=${size}`, 'json', deadline),
    ])
    if (one.data === null) return fold(null, [], 0, true, one.note)
    const community = communityOf(one.data)
    if (listed.data === null) return fold(community, [], 0, true, listed.note)
    const records = (listed.data.hits?.hits ?? []).flatMap((r) => { const x = recordOf(r); return x ? [x] : [] })
    return fold(community, records, Number(listed.data.hits?.total ?? records.length), false, 'ok')
  } catch (e) { return fold(null, [], 0, true, String((e as Error).message).slice(0, 120)) }
}

/** verifyZenodoCommunityClaim(recordId, size) → the deposit's community CLAIM against the community's own listing.
 *  Three honest states, never conflated: nothing claimed, claimed but not listed, and carried. A door that could
 *  not be reached returns DECLINED — an unread listing is not an absent membership. */
export async function verifyZenodoCommunityClaim(recordId: string, size = 25): Promise<ZenodoCommunityClaim> {
  const honest = 'Membership is provenance, not peer review: a community listing proves who accepted a deposit, '
    + 'never that its contents are correct. Only a by-decide theorem seals a claim in this tree.'
  const fold = (claimed: string[], checked: ZenodoCommunityClaim['checked'],
                verdict: ZenodoCommunityClaim['verdict'], declined: boolean, note: string): ZenodoCommunityClaim => {
    const receipt = merkleGravity([
      toUuid('zenodo-claim|' + recordId),
      ...checked.map((c) => toUuid(`zenodo-claim:${recordId}|${c.slug}|${c.communityExists}|${c.listsRecord}`)),
    ])
    return {
      definition: 'uuidnaOS·zenodo·community-claim',
      record: recordId, claimed, checked, verdict, declined, note, honest, receipt, ...hexbitDoorOf(receipt),
    }
  }
  try {
    const got = await fetchData<OneRecord>(`${ZENODO_API}/records/${encodeURIComponent(recordId)}`, 'json')
    if (got.data === null) return fold([], [], 'DECLINED', true, got.note)
    const claimed = (got.data.metadata?.communities ?? []).flatMap((c) => (c.id ? [c.id] : []))
    if (claimed.length === 0) return fold([], [], 'NO-COMMUNITY-CLAIMED', false, 'the deposit names no community')
    // one deadline for every claimed community, not one per community walked in turn
    const checked: ZenodoCommunityClaim['checked'] = (await Promise.all(claimed.map((slug) => zenodoCommunity(slug, size))))
      .map((view, i) => ({
        slug: claimed[i]!,
        communityExists: view.community !== null,
        listsRecord: view.records.some((r) => r.id === recordId),
        total: view.total,
        note: view.note,
      }))
    if (checked.some((c) => c.note !== 'ok' && !c.listsRecord))
      return fold(claimed, checked, 'DECLINED', true, 'a community door did not answer — membership is UNREAD, not absent')
    const carried = checked.every((c) => c.communityExists && c.listsRecord)
    return fold(claimed, checked, carried ? 'CARRIED' : 'CLAIMED-NOT-LISTED', false, 'ok')
  } catch (e) { return fold([], [], 'DECLINED', true, String((e as Error).message).slice(0, 120)) }
}

/** renderZenodoCommunities(r) → CLI / exec / MCP summary lines. Pure. */
export function renderZenodoCommunities(r: ZenodoCommunitiesResult): string {
  const status = r.declined ? 'DECLINED' : r.count ? 'ANSWERING' : 'EMPTY'
  return [
    `${status} zenodo-communities · ${r.count} of ${r.total} · query "${r.query}"`,
    ...(r.declined ? [`  note: ${r.note}`] : []),
    ...r.communities.slice(0, 8).map((c) => `  ${c.type} ${c.slug}: ${c.title.slice(0, 64)}`),
    `  receipt ${handleOf(r.receipt)}… · door ${r.door}`,
  ].join('\n')
}

/** renderZenodoCommunity(r) → CLI / exec / MCP summary lines. Pure. */
export function renderZenodoCommunity(r: ZenodoCommunityResult): string {
  const status = r.declined ? 'DECLINED' : r.community ? 'READ' : 'ABSENT'
  return [
    `${status} zenodo-community ${r.slug} · ${r.count} of ${r.total} records`
      + (r.community ? ` · ${r.community.title.slice(0, 48)}` : ''),
    ...(r.declined ? [`  note: ${r.note}`] : []),
    ...r.records.slice(0, 8).map((x) => `  ${x.doi || x.id}: ${x.title.slice(0, 64)}`),
    `  receipt ${handleOf(r.receipt)}… · door ${r.door}`,
  ].join('\n')
}

/** renderZenodoCommunityClaim(r) → CLI / exec / MCP summary lines. Pure. */
export function renderZenodoCommunityClaim(r: ZenodoCommunityClaim): string {
  return [
    `${r.verdict} zenodo record ${r.record} · claims ${r.claimed.length ? r.claimed.join(', ') : '(none)'}`,
    ...(r.declined ? [`  note: ${r.note}`] : []),
    ...r.checked.map((c) =>
      `  ${c.slug}: community ${c.communityExists ? 'exists' : 'ABSENT'} · listing ${c.listsRecord ? 'carries the record' : 'does NOT carry it'} (${c.total} records)`),
    `  receipt ${handleOf(r.receipt)}… · door ${r.door}`,
  ].join('\n')
}
