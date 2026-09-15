import { test } from 'node:test'
import assert from 'node:assert/strict'
import { verifyRightsClaim, natureReport, articlesCited, instrumentsNamed, nearestPaths, RIGHTS_INSTRUMENTS } from './index.js'
import { pageText, type NetRead } from '../os/netapi/index.js'
import { receiptSealed, SEALED_BY } from '../refusal-trials.js'

test('the table the doors answer from holds only verified rows', () => {
  assert.ok(RIGHTS_INSTRUMENTS.length > 0)
  assert.ok(RIGHTS_INSTRUMENTS.every((r) => r.verified))
})

test('a citation that exists as cited is VERIFIED, and shows what the table records of it', () => {
  const a = verifyRightsClaim('UNDROP Art. 17 recognises a right to land')
  assert.equal(a.verdict, 'VERIFIED')
  assert.ok(a.found.some((p) => p.instrument === 'undrop' && p.article.startsWith('17')))
  assert.ok(a.found.every((p) => p.qualifications !== undefined && p.url.startsWith('https://')))
  assert.deepEqual(a.nearest, [])
})

test('an article the instrument does not carry is UNVERIFIED, and says which', () => {
  const a = verifyRightsClaim('UNDROP Art. 99 grants every person a castle')
  assert.equal(a.verdict, 'UNVERIFIED')
  assert.match(a.why, /99/)
})

test('a claim naming no instrument is UNVERIFIED — with the nearest rows the table does hold', () => {
  const a = verifyRightsClaim('everyone may walk in any forest they like')
  assert.equal(a.verdict, 'UNVERIFIED')
  assert.match(a.why, /names no instrument/)
  assert.ok(a.nearest.length > 0, 'forest access shares vocabulary with the access rows')
})

test('a named instrument with no article cited has nothing to check against', () => {
  const a = verifyRightsClaim('the Aarhus Convention protects the environment')
  assert.equal(a.verdict, 'UNVERIFIED')
  assert.match(a.why, /cites no article/)
})

test('a Nordic citation — the native name first, the section sign after the number — is read as written', () => {
  assert.deepEqual(articlesCited('Miljöbalken 7 kap. 1 §'), ['7 kap. 1 §'])
  const a = verifyRightsClaim('Regeringsformen 2 kap. 15 § gives everyone access to nature (allemansrätten)')
  assert.equal(a.verdict, 'VERIFIED')
  assert.ok(a.found.some((p) => p.instrument === 'se_rf' && p.article.startsWith('2 kap. 15 §')))
})

test('article and instrument parsing', () => {
  assert.deepEqual(articlesCited('Art. 17(1) and § 3, article 144(1)'), ['17(1)', '3', '144(1)'])
  assert.ok(instrumentsNamed('under the Aarhus Convention').some((r) => r.id === 'aarhus'))
  assert.deepEqual(instrumentsNamed('a sentence about nothing in particular'), [])
})

test('nearest paths are ranked by shared content words, strongest first', () => {
  const p = nearestPaths('public access to forests and beaches')
  assert.ok(p.length > 0)
  assert.ok(p.every((x, i) => i === 0 || p[i - 1]!.shared >= x.shared))
})

test('every answer carries a receipt signed by 2×7 theorems that re-verifies, and a changed answer does not', () => {
  const a = verifyRightsClaim('UNDROP Art. 17 recognises a right to land')
  assert.equal(a[SEALED_BY].legal, true)
  assert.equal(a[SEALED_BY].signed, a[SEALED_BY].of)
  assert.ok(receiptSealed(a))
  assert.equal(receiptSealed({ ...a, verdict: 'UNVERIFIED' }), false)
})

test('pageText keeps what a reader sees and drops what the page runs', () => {
  assert.equal(pageText('<p>a</p><script>alert(1)</script><p>b &amp; c</p>'), 'a\nb & c')
  assert.equal(pageText('<style>p{}</style>x&nbsp;y &#167; 3'), 'x y § 3')
})

const page = (body: string): (u: string) => Promise<NetRead> => async (url) =>
  ({ url, body, digest: 'd', address: 'a0000000-0000-8000-8000-000000000000', reached: true, note: 'test page' })

test('one link: the page is audited, its citations checked, and its legislative paths returned', async () => {
  const html = '<h1>Village forest fenced</h1><p>The company fenced the village forest and the beach.</p>'
    + '<p>UNDROP Art. 17 recognises a right to land for peasants.</p><p>2 + 2 = 5.</p>'
  const r = await natureReport('https://example.org/news', page(html))
  assert.equal(r.reached, true)
  assert.ok(r.audit !== null && r.audit.details > 0)
  assert.ok(r.citations.some((c) => c.verdict === 'VERIFIED'))
  assert.ok(r.paths.length > 0)
  assert.ok(r.paths.every((p, i) => i === 0 || r.paths[i - 1]!.shared >= p.shared))
  assert.ok(receiptSealed(r))
})

test('one link that cannot be read says so and reports nothing else', async () => {
  const r = await natureReport('https://example.org/gone', async (url) =>
    ({ url, body: null, digest: null, address: null, reached: false, note: 'not reached: 404' }))
  assert.equal(r.reached, false)
  assert.equal(r.audit, null)
  assert.deepEqual(r.paths, [])
  assert.ok(receiptSealed(r))
})
