import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseListRecords, harvestCommunity, communitySet, oaiRecordExists } from './zenodo-oai.js'
import { ZENODO_SEALS } from './zenodo-seals.js'

// OFFLINE BY CONSTRUCTION — every fetch is injected. The live harvest is the script's job; these prove the
// parsing and, more importantly, the PARTITION, because the first run reported "20 undeclared" and eighteen of
// those were our own superseded versions. A count that mixes a version history with someone else's work reads
// as twenty problems when there are two.

const page = (records: string, token = '') => `<OAI-PMH><ListRecords>${records}` +
  (token ? `<resumptionToken>${token}</resumptionToken>` : '<resumptionToken></resumptionToken>') +
  '</ListRecords></OAI-PMH>'

const rec = (id: string, title: string, doi: string, rel: string[] = []) =>
  `<record><header><identifier>oai:zenodo.org:${id}</identifier><datestamp>2026-09-02T14:35:00Z</datestamp></header>` +
  `<metadata><dc:title>${title}</dc:title><dc:identifier>https://doi.org/${doi}</dc:identifier>` +
  rel.map((r) => `<dc:relation>${r}</dc:relation>`).join('') + '</metadata></record>'

const ours = ZENODO_SEALS.find((z) => z.id === 'uuidna-software')!

test('a community is the OAI set named after it', () => {
  assert.equal(communitySet('uuidna'), 'user-uuidna')
})

test('parseListRecords reads the id, title, DOI, datestamp and relations', () => {
  const { records, token } = parseListRecords(page(rec('123', 'A work', '10.5281/zenodo.123', ['10.5281/zenodo.122'])))
  assert.equal(records.length, 1)
  assert.equal(records[0]!.recordId, '123')
  assert.equal(records[0]!.title, 'A work')
  assert.equal(records[0]!.doi, '10.5281/zenodo.123')
  assert.deepEqual(records[0]!.relations, ['10.5281/zenodo.122'])
  assert.equal(token, null, 'an empty resumption token is the last page, not a token')
})

test('it pages through resumption tokens rather than stopping at the first page', async () => {
  const asked: string[] = []
  const h = await harvestCommunity('uuidna', async (url) => {
    asked.push(url)
    if (!url.includes('resumptionToken')) return { status: 200, body: page(rec('1', 'A', '10.5281/zenodo.1'), 'MORE') }
    return { status: 200, body: page(rec('2', 'B', '10.5281/zenodo.2')) }
  })
  assert.equal(h.records.length, 2, 'both pages must be harvested')
  assert.equal(asked.length, 2)
  assert.match(asked[1]!, /resumptionToken=MORE/)
})

// THE PARTITION. Superseded versions of OUR work and works by other people are different facts.
test('our own older versions are SUPERSEDED, not foreign', async () => {
  const h = await harvestCommunity('uuidna', async () => ({
    status: 200,
    body: page(
      rec('900', ours.title + ': 2612 theorems', ours.standingDoi!) +          // declared
      rec('800', ours.title + ': 2400 theorems', '10.5281/zenodo.800') +       // ours, older
      rec('700', 'Somebody Else’s Paper v1.0', '10.5281/zenodo.700'),          // not ours
    ),
  }))
  assert.equal(h.records.length, 3)
  assert.equal(h.declared.length, 1, 'the declared seal is found by DOI')
  assert.deepEqual(h.superseded.map((r) => r.recordId), ['800'], 'a title match makes it ours')
  assert.deepEqual(h.foreign.map((r) => r.recordId), ['700'], 'only a foreign title is a finding')
})

test('works group by title, so a version chain reads as one work', async () => {
  const h = await harvestCommunity('uuidna', async () => ({
    status: 200,
    body: page(rec('1', 'W: a', '10.5281/zenodo.1') + rec('2', 'W: b', '10.5281/zenodo.2') + rec('3', 'Other', '10.5281/zenodo.3')),
  }))
  const w = h.works.find((x) => x.title === 'W')
  assert.deepEqual(w?.versions, ['1', '2'], 'two releases of one work, grouped')
  assert.equal(h.works.length, 2)
})

// UNREAD IS NOT EMPTY, and the two are indistinguishable in an empty array BY CONSTRUCTION — which is why the
// harvest carries a `read` flag rather than letting the caller infer emptiness from a length of zero.
test('an unreachable endpoint is UNREAD, never an empty community', async () => {
  const h = await harvestCommunity('uuidna', async () => ({ status: 503, body: '' }))
  assert.equal(h.read, false)
  assert.deepEqual(h.records, [])
  assert.match(String(h.reason), /UNREAD here, not empty/)
  const t = await harvestCommunity('uuidna', async () => { throw new Error('ENOTFOUND') })
  assert.equal(t.read, false)
  assert.match(String(t.reason), /ENOTFOUND/)
})

// THE LIMITATION, HELD AS A TEST so nobody builds a gate on a false absence.
test('a concept identifier is not an OAI record, and that is reported as unread', async () => {
  const idDoesNot = await oaiRecordExists('21787143', async () => ({ status: 200, body: '<error code="idDoesNotExist"/>' }))
  assert.equal(idDoesNot.exists, false)
  assert.match(idDoesNot.reason, /NOT evidence the work is missing/)
  const rejected = await oaiRecordExists('21787143', async () => ({ status: 422, body: '' }))
  assert.equal(rejected.exists, false)
  assert.match(rejected.reason, /unread, not absent/)
  assert.match(rejected.reason, /resolve it over HTTP/)
  const real = await oaiRecordExists('22256708', async () => ({ status: 200, body: page(rec('22256708', 'x', '10.5281/zenodo.22256708')) }))
  assert.equal(real.exists, true)
})

test('the harvest receipt is deterministic for the same answer', async () => {
  const body = page(rec('1', 'A', '10.5281/zenodo.1'))
  const f = async () => ({ status: 200, body })
  assert.equal((await harvestCommunity('uuidna', f)).receipt, (await harvestCommunity('uuidna', f)).receipt)
})
