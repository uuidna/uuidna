// arrival — A COIN PER REFERRER, A SUPERPOSITION PER DESTINATION.
//
// attachChat already mints handle 0 from the SUBJECT and isolates the room per referer, so the coin answers "what
// is this about" and the referer only rotates the fold. Neither answers what an arrival actually carries: WHO sent
// it, and WHERE the many of them meet. These are those two, kept on different axes on purpose — and each assertion
// below carries the control that would fail if the predicate were vacuous.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { coinOfReferer, meetAt } from '../conversation.js'
import { coin64, license, verifyLicense } from '../index.js'
import { grantAt, verifyGrant } from '../license.js'

const A = 'https://a.example', B = 'https://b.example', C = 'https://c.example'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

test('a coin per referrer — deterministic, 64 bits, and distinct per source', () => {
  assert.equal(coinOfReferer(A), coinOfReferer(A), 'the same referrer mints the same coin, always')
  assert.notEqual(coinOfReferer(A), coinOfReferer(B), 'two sources must not share a coin')
  assert.match(coinOfReferer(A), /^[0-9a-f]{16}$/, '64 bits, as coin64 mints them')
  // NAMESPACED: a referrer must never collide with a SUBJECT url minting through coin64 directly
  assert.notEqual(coinOfReferer(A), coin64(A), 'a referrer coin and a subject coin for the same url are different things')
})

test('a coin identifies a SOURCE— repeats do not mint more', () => {
  const once = meetAt('/checkout', [A, B, C])
  const many = meetAt('/checkout', [A, B, C, A, B, A])
  assert.equal(once.referrers, 3)
  assert.equal(many.referrers, 3, 'the same referrer arriving repeatedly is ONE coin')
  assert.equal(once.superposition, many.superposition, 'and the fold does not move for a repeat visit')
  // the control: a genuinely NEW referrer must move it, or the dedupe above is hiding a dead fold
  assert.notEqual(meetAt('/checkout', [A, B, C, 'https://d.example']).superposition, once.superposition,
    'a new source MUST move the superposition')
})

test('the superposition is ORDER-INVARIANT — all points of view as one', () => {
  const orders = [[A, B, C], [C, A, B], [B, C, A], [C, B, A]].map((o) => meetAt('/checkout', o).superposition)
  assert.equal(new Set(orders).size, 1, 'any arrival order folds to the same uuid')
  assert.match(orders[0], UUID)
})

test('per DESTINATION — the same crowd at another place is another meeting', () => {
  const here = meetAt('/checkout', [A, B, C]), there = meetAt('/pricing', [A, B, C])
  assert.notEqual(here.superposition, there.superposition,
    'the destination rides inside the fold, or it would describe the crowd and not the meeting')
  assert.equal(here.destination, '/checkout')
  // and the control: the SAME destination with the same crowd must be stable
  assert.equal(here.superposition, meetAt('/checkout', [C, B, A]).superposition)
})

test('the handle is the superposition read through the one derivation, and an empty meeting still answers', () => {
  const m = meetAt('/checkout', [A])
  assert.equal(m.handle, m.superposition.replace(/-/g, '').slice(0, 8), 'the handle is the first eight hex')
  const empty = meetAt('/checkout', [])
  assert.equal(empty.referrers, 0, 'a destination nobody reached is a real answer')
  assert.match(empty.superposition, UUID, 'and it still folds to an address')
  assert.notEqual(empty.superposition, m.superposition, 'nobody arriving and someone arriving are different facts')
})

// ── THE LICENCE BINDING. The edge licenses by a hand-kept allowlist of hostnames (worker.js, LICENSED), and a
// hostname is IMITABLE — anyone can point a CNAME, and the list is only as current as its last edit. The sealed
// theorem redirect_imitable_but_coins_authorise is the law: the redirect can be copied, the COINS authorise.
test('a bound licence names WHO and WHERE, and both ride inside its address', () => {
  const usage = { commercial: true, recomputeOps: 100, verifyOps: 1 }
  const here = license('acme', usage, { referer: 'https://acme.example', destination: 'shop.acme.com' })
  const there = license('acme', usage, { referer: 'https://acme.example', destination: 'other.acme.com' })
  assert.ok(here.at, 'a bound licence must carry the pair')
  assert.equal(here.at.coin, coinOfReferer('https://acme.example'), 'the coin is the referrer\'s own')
  assert.notEqual(here.address, there.address,
    'the same licence at another destination is another record — a CNAME cannot carry it across')
  assert.equal(verifyLicense(here), true)
})

test('a forged referrer is REJECTED — the coin is recomputed', () => {
  const usage = { commercial: true, recomputeOps: 100, verifyOps: 1 }
  const real = license('acme', usage, { referer: 'https://acme.example', destination: 'shop.acme.com' })
  assert.ok(real.at)
  // swap the referrer but keep its coin: the two are now inconsistent, and recomputation is what notices
  assert.equal(verifyLicense({ ...real, at: { ...real.at, referer: 'https://evil.example' } }), false)
  // and move the destination while keeping the address: the digest no longer recomputes
  assert.equal(verifyLicense({ ...real, at: { ...real.at, destination: 'evil.example' } }), false)
})

// THE STABILITY LAW, again: binding is OPTIONAL and APPENDED, so an unbound licence digests to the byte-identical
// string it always did. Every address ever issued still recomputes — a licence record is cited, and a citation that
// stops resolving is the one breakage this change could not be worth.
test('binding is additive — an UNBOUND licence address does not move', () => {
  const usage = { commercial: true, recomputeOps: 100, verifyOps: 1 }
  const plain = license('acme', usage)
  assert.equal(plain.at, undefined, 'no pair given, none claimed')
  assert.equal(plain.address, '643b00c7-8b46-894c-8336-ebfea2272a17',
    'measured before the change — an unbound licence must recompute to exactly what it always did')
  assert.equal(verifyLicense(plain), true)
})

// ── A COIN IDENTIFIES; A SIGNATURE AUTHORISES. coinOfReferer and meetAt are PUBLIC arithmetic over public strings:
// anyone who knows a referrer and a destination computes the same coin and the same superposition. A gate that only
// recomputed them would prove the presenter can do arithmetic everyone can do. What gates is the secret.
test('a grant needs the KEY — recomputation alone authorises nothing', () => {
  const K = 'server-secret-key'
  const g = grantAt('https://acme.example', 'shop.acme.com', K)
  assert.equal(verifyGrant(g, K), true)
  assert.equal(verifyGrant(g, 'attacker-key'), false, 'without the key a grant cannot be verified — or minted')
  // the control that matters: the public halves DO recompute for anyone, which is why they cannot be the gate
  assert.equal(coinOfReferer(g.referer), g.coin, 'the coin is public arithmetic, by design')
  assert.equal(meetAt(g.destination, [g.referer]).superposition, g.superposition, 'so is the superposition')
})

test('a grant is destination-bound — a CNAME cannot carry it', () => {
  const K = 'server-secret-key'
  const g = grantAt('https://acme.example', 'shop.acme.com', K)
  assert.equal(verifyGrant({ ...g, destination: 'evil.example' }, K), false)
  assert.equal(verifyGrant({ ...g, referer: 'https://evil.example' }, K), false)
  assert.notEqual(grantAt('https://acme.example', 'other.acme.com', K).signature, g.signature,
    'the same holder at another destination is another grant')
})

test('both halves are required — a signature over unchecked fields would authorise anything handed to it', () => {
  const K = 'server-secret-key'
  const g = grantAt('https://acme.example', 'shop.acme.com', K)
  // swap the coin for one the referrer does not mint, keeping the signature: recomputation is what notices
  assert.equal(verifyGrant({ ...g, coin: coinOfReferer('https://evil.example') }, K), false)
  assert.equal(verifyGrant({ ...g, superposition: meetAt('elsewhere', ['https://acme.example']).superposition }, K), false)
})
