import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  EU_COMMUNITY, NAMED_COMMUNITIES, UUIDNA_COMMUNITY, ZENODO_COMMUNITIES, ZENODO_PROBE_QUERY,
  renderZenodoCommunities, renderZenodoCommunity, renderZenodoCommunityClaim,
  verifyZenodoCommunityClaim, zenodoCommunities, zenodoCommunity,
} from './index.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const DOOR = { receipt: '0'.repeat(32), handle: '0'.repeat(8), hexbits: [], door: 'https://uuidna.com/00000000' }

test('the communities door is the OTHER half of the API the records sweep already asks', () => {
  assert.equal(ZENODO_COMMUNITIES, 'https://zenodo.org/api/communities')
})

test('renderZenodoCommunity separates ABSENT from DECLINED — an unread listing is not a missing one', () => {
  const absent = renderZenodoCommunity({
    definition: 'uuidnaOS·zenodo·community', slug: 'nope', community: null, total: 0, count: 0, records: [],
    declined: false, note: 'ok', ...DOOR,
  })
  assert.match(absent, /^ABSENT zenodo-community nope/)
  const declined = renderZenodoCommunity({
    definition: 'uuidnaOS·zenodo·community', slug: 'nope', community: null, total: 0, count: 0, records: [],
    declined: true, note: 'responded 503', ...DOOR,
  })
  assert.match(declined, /^DECLINED zenodo-community nope/)
  assert.match(declined, /note: responded 503/)
  const claim = renderZenodoCommunityClaim({
    definition: 'uuidnaOS·zenodo·community-claim', record: '1', claimed: ['uuidna'],
    checked: [{ slug: 'uuidna', communityExists: true, listsRecord: false, total: 2, note: 'ok' }],
    verdict: 'CLAIMED-NOT-LISTED', declined: false, note: 'ok', honest: 'x', ...DOOR,
  })
  assert.match(claim, /^CLAIMED-NOT-LISTED zenodo record 1 · claims uuidna/)
  assert.match(claim, /listing does NOT carry it \(2 records\)/)
})

// uuidna_zenodo_communities is the wire name for all three modes. These reach the network, so each asserts the
// invariant that holds either way: an answer carries addressed rows and a total that bounds the page, a refusal
// carries a reason, and a verdict is never invented from an unread door.
test('uuidna_zenodo_communities search — the probe matches communities, or declines with a reason', async () => {
  const r = await zenodoCommunities(ZENODO_PROBE_QUERY, 5)
  assert.equal(r.definition, 'uuidnaOS·zenodo·communities')
  if (r.declined) { assert.ok(r.note.length > 0, 'a refusal must say why'); return }
  assert.ok(r.count >= 1, `"${ZENODO_PROBE_QUERY}" should match at least one community`)
  assert.equal(r.count, r.communities.length)
  assert.ok(r.total >= r.count, 'the total is what MATCHES; the count is what this page carries — never averaged')
  for (const c of r.communities) {
    assert.match(c.address, UUID)
    assert.ok(c.slug.length > 0 && c.url.includes(c.slug), 'the door names the slug it opens')
  }
  assert.equal(new Set(r.communities.map((c) => c.address)).size, r.count, 'distinct communities get distinct addresses')
})

test('uuidna_zenodo_communities — this tree’s own community exists and its listing is the receipt', async () => {
  const r = await zenodoCommunity(UUIDNA_COMMUNITY, 10)
  if (r.declined) { assert.ok(r.note.length > 0, 'an unread listing must say why'); return }
  assert.ok(r.community, `the ${UUIDNA_COMMUNITY} community must exist — the deposits name it`)
  assert.equal(r.community.slug, UUIDNA_COMMUNITY)
  assert.equal(r.count, r.records.length)
  assert.ok(r.total >= 1, 'the two-chain law mints in pairs — an empty listing would mean nothing was ever accepted')
  for (const x of r.records) {
    assert.match(x.address, UUID)
    assert.match(x.doi, /^10\.5281\/zenodo\.\d+$/, 'a Zenodo DOI, from Zenodo')
  }
})

test('uuidna_zenodo_communities claim — a deposit’s membership CLAIM is checked against the curators’ listing', async () => {
  const listing = await zenodoCommunity(UUIDNA_COMMUNITY, 10)
  if (listing.declined || listing.records.length === 0) return   // nothing to check without a reachable listing
  const carried = await verifyZenodoCommunityClaim(listing.records[0]!.id, 10)
  assert.equal(carried.definition, 'uuidnaOS·zenodo·community-claim')
  assert.match(carried.honest, /never that its contents are correct/)
  if (carried.declined) { assert.equal(carried.verdict, 'DECLINED'); assert.ok(carried.note.length > 0); return }
  assert.deepEqual(carried.claimed, [UUIDNA_COMMUNITY], 'the record the community lists must itself claim it')
  assert.equal(carried.verdict, 'CARRIED', 'claim and receipt agree on a record the listing carries')
  assert.deepEqual(carried.checked.map((c) => [c.communityExists, c.listsRecord]), [[true, true]])
  // NEGATIVE CONTROL: a record id that is not in the listing must NOT come back CARRIED for this community.
  const notThere = await verifyZenodoCommunityClaim('1', 10)
  assert.notEqual(notThere.verdict, 'CARRIED', 'a verdict must be earned by a listing, not by the door answering')
})

test('renderZenodoCommunities reports the page against the total, never one as the other', () => {
  const r = renderZenodoCommunities({
    definition: 'uuidnaOS·zenodo·communities', query: 'astronomy', url: ZENODO_COMMUNITIES, total: 1114, count: 1,
    communities: [{ id: 'x', slug: 'sochias', title: 'SOCHIAS', type: 'organization',
      url: 'https://zenodo.org/communities/sochias/', address: '0'.repeat(32) }],
    declined: false, note: 'ok', ...DOOR,
  })
  assert.match(r, /^ANSWERING zenodo-communities · 1 of 1114 · query "astronomy"/)
  assert.match(r, /organization sochias: SOCHIAS/)
})

test('every NAMED community is a real public community, and says why it is named', async () => {
  assert.ok(NAMED_COMMUNITIES.some((c) => c.slug === UUIDNA_COMMUNITY))
  assert.ok(NAMED_COMMUNITIES.some((c) => c.slug === EU_COMMUNITY))
  assert.equal(new Set(NAMED_COMMUNITIES.map((c) => c.slug)).size, NAMED_COMMUNITIES.length)
  for (const c of NAMED_COMMUNITIES) assert.ok(c.why.length > 40, `${c.slug} must say why it is cited here`)
  const views = await Promise.all(NAMED_COMMUNITIES.map((c) => zenodoCommunity(c.slug, 3)))
  for (const [i, v] of views.entries()) {
    const named = NAMED_COMMUNITIES[i]!
    if (v.declined) { assert.ok(v.note.length > 0, `${named.slug}: an unread community must say why`); continue }
    assert.ok(v.community, `${named.slug} must resolve to a public community — a cited slug that does not exist is a dead citation`)
    assert.equal(v.community.slug, named.slug)
    assert.ok(v.total >= 1, `${named.slug}: a community with nothing accepted is not a record of anything`)
  }
})
