import { test } from 'node:test'
import assert from 'node:assert/strict'
import { post, readPost, feedRoot, follow, timeline, socialApi, socialCensus } from './index.js'

test('attribution rides in the address — same text, two authors, two addresses', () => {
  assert.notEqual(post('alice', 'port day').address, post('bob', 'port day').address)
  assert.equal(post('alice', 'port day').address, post('alice', 'port day').address)
})

test('a feed is ORDERED — position is bound, so a permutation is a different feed', () => {
  // merkleGravity folds order-invariantly, which is right for a set of files and wrong for a timeline.
  // fsVerify shipped that exact defect once. The cure is structural rather than careful: feedRoot binds the
  // index into every leaf by construction, so a permuted feed reaches a different root whatever anyone edits.
  const a = post('alice', 'first')
  const b = post('alice', 'second')
  assert.notEqual(feedRoot([a, b]), feedRoot([b, a]))
  assert.equal(feedRoot([a, b]), feedRoot([a, b]))
})

test('a follow is DIRECTED — being read is not the same as reading', () => {
  assert.notEqual(follow('a', 'b').address, follow('b', 'a').address)
})

test('a fabricated citation posts NOTHING but still ANSWERS — no address, and the reason named', () => {
  const p = post('mallory', 'Backed by theorem no_such_theorem_anywhere')
  assert.equal(p.posted, false)
  assert.equal(p.address, null)                       // nothing was addressed: the gate is unchanged
  assert.deepEqual(p.unsealed, ['no_such_theorem_anywhere'])
  assert.match(p.why, /the ledger does not seal/)
  // and the cure computes: drop the forged citation and the same author posts
  assert.equal(post('mallory', 'said plainly, uncited').posted, true)
})

test('an anonymous end answers too — the edge does not link, and says why', () => {
  const e = follow('a', '  ')
  assert.equal(e.linked, false)
  assert.equal(e.address, null)
  assert.match(e.why, /both ends named/)
})

test('the scrub is disclosed, never silent — and the raw bytes survive it', () => {
  const p = post('eve', 'looks fine‮reversed')
  const r = readPost(p)
  assert.equal(r.altered, true)
  assert.equal(r.raw, p.raw)                 // the address is over these; scrubbing must not rewrite history
  assert.ok(!r.text.includes('‮'))
})

test('timeline carries only what the handle follows', () => {
  const posts = [post('alice', 'a'), post('bob', 'b'), post('carol', 'c')]
  const t = timeline('me', posts, [follow('me', 'alice'), follow('me', 'carol')])
  assert.deepEqual(t.posts.map((p) => p.author), ['alice', 'carol'])
  assert.equal(t.root, feedRoot([posts[0]!, posts[2]!]))
})

test('the census is the committed mirror, and the port names what it is not', () => {
  const c = socialCensus()
  assert.equal(c.packages + c.outside, 28635)
  const a = socialApi()
  assert.equal(a.ported.packages, c.packages)
  assert.match(a.honest, /no feed fetched|nothing federated/)
  assert.ok(a.shelves.some((s) => s.shelf === 'mail' && s.packages > 0))
})
