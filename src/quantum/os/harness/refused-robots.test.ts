// refused-robots — live robots.txt recompute for refused hosts (residual on the refused[] finder lead).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  parseRobots, robotsForHost, recomputeRefusedRobots, disallowHolds, type FetchRobots,
} from '../../../refused-robots.js'

const CHITANKA = `# robots.txt
User-agent: *
Disallow: /api
Disallow: /text
Disallow: /fb2
Disallow: /epub
Disallow: /download
`

test('parseRobots reads Disallow under User-agent: *', () => {
  assert.deepEqual(parseRobots(CHITANKA), ['/api', '/download', '/epub', '/fb2', '/text'])
})

test('parseRobots ignores another user-agent block', () => {
  const body = `User-agent: Googlebot\nDisallow: /secret\nUser-agent: *\nDisallow: /api\n`
  assert.deepEqual(parseRobots(body), ['/api'])
})

test('robotsForHost uses the injected fetch — no network in the suite', async () => {
  const fetchRobots: FetchRobots = async (url) => {
    assert.match(url, /^https:\/\/chitanka\.info\/robots\.txt$/)
    return { status: 200, body: CHITANKA }
  }
  const r = await robotsForHost('chitanka.info', fetchRobots)
  assert.equal(r.read, true)
  assert.ok(disallowHolds(r.disallow, '/api'))
  assert.ok(disallowHolds(r.disallow, '/text'))
})

test('418 is unread, never an empty allow-all', async () => {
  const r = await robotsForHost('stackoverflow.com', async () => ({ status: 418, body: '' }))
  assert.equal(r.read, false)
  assert.equal(r.status, 418)
  assert.deepEqual(r.disallow, [])
  assert.match(r.reason ?? '', /418/)
})

test('recomputeRefusedRobots walks every refused host through the injected fetch', async () => {
  const seen: string[] = []
  const fetchRobots: FetchRobots = async (url) => {
    seen.push(url)
    if (url.includes('stackoverflow')) return { status: 418, body: '' }
    if (url.includes('chitanka')) return { status: 200, body: CHITANKA }
    return { status: 404, body: '' }
  }
  const r = await recomputeRefusedRobots(fetchRobots)
  assert.equal(r.read, true)
  assert.ok(r.hosts.length >= 2, `refused hosts from the ledger, got ${r.hosts.length}`)
  assert.ok(seen.every((u) => u.endsWith('/robots.txt')))
  const chitanka = r.hosts.find((h) => h.host === 'chitanka.info')
  assert.ok(chitanka?.read, 'chitanka robots readable from fixture')
  const so = r.hosts.find((h) => h.host === 'stackoverflow.com')
  assert.equal(so?.read, false, 'stackoverflow 418 stays unread')
})
