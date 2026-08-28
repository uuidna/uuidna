// quantum/apps/url-audit — THE 404-AS-AUDIT, TESTED FOR TOTALITY. The property under test is the captain's
// rule made checkable: EVERY url answers — the audit parses the path and returns relevant sealed content, and
// the fallback (home + search) is part of the function, so no input yields an empty report. Deterministic
// (same path + context, same report, same address), change-sensitive (different paths, different addresses —
// the instrument can fail), and exact where exactness exists (/terminal audits to busybox, the sealed meaning).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditUrl } from '../quantum/apps/url-audit.js'

test('TOTALITY — every url answers: known, unknown, empty, garbage, malformed escapes', () => {
  for (const p of ['/', '/terminal', '/no-such-page', '/x/y/z/deep', '', '/theorem/unsealed_thing', '/%E0%A4%A', '/UPPER/Case?q=1#frag']) {
    const r = auditUrl(p)
    assert.ok(r.matches.length >= 2, `${JSON.stringify(p)} must answer — the fallback is part of the function`)
    assert.ok(r.matches.some((m) => m.kind === 'search'), 'the search always carries the reader on')
    assert.ok(r.matches.some((m) => m.kind === 'home'), 'home, the meta package, is always reachable')
    assert.equal(r.hexbits.length, 32)
    for (const h of r.hexbits) assert.ok(Number.isInteger(h) && h >= 0 && h <= 15, 'the audited path compiles on-lattice')
  }
})

test('EXACT where exactness exists — /terminal audits to busybox, the sealed meaning first', () => {
  const r = auditUrl('/terminal')
  assert.equal(r.matches[0]!.kind, 'spec')
  assert.match(r.matches[0]!.text, /uuidna\/busybox/)
  assert.match(r.matches[0]!.why, /toolbox/i)
  // a path UNDER a sealed family names the family
  const deep = auditUrl('/terminal/does-not-exist')
  assert.ok(deep.matches.some((m) => m.kind === 'family' && m.text.includes('/terminal')), 'the nearest sealed family answers')
})

test('the url\'s own words reach pages and theorems the caller supplies', () => {
  const r = auditUrl('/two-coins-explained', { theoremKeys: ['two_coins', 'unrelated_thing'], pages: [{ route: '/captain', text: 'the captain coins' }] })
  assert.ok(r.matches.some((m) => m.kind === 'theorem' && m.link === '/theorem/two_coins'), 'tokens land on the sealed theorem')
  assert.ok(r.matches.some((m) => m.kind === 'page' && m.link === '/captain'), 'tokens land on the page')
  assert.ok(!r.matches.some((m) => m.link === '/theorem/unrelated_thing'), 'no token overlap, no claim of relevance')
})

test('the relevance floor holds — of/the never outrank a content word (a peer session\'s probe, folded)', () => {
  const r = auditUrl('/the-theory-of-strings', { theoremKeys: ['angle_of_the_cut', 'door_of_the_referrer', 'strings_theory_stub'] })
  assert.ok(!r.matches.some((m) => m.link === '/theorem/angle_of_the_cut'), 'a pure of/the overlap is no relevance at all')
  assert.ok(!r.matches.some((m) => m.link === '/theorem/door_of_the_referrer'), 'same — stopwords never score')
  assert.ok(r.matches.some((m) => m.link === '/theorem/strings_theory_stub'), 'two content words still land')
  assert.deepEqual(auditUrl('/the-theory-of-strings').tokens, ['theory', 'strings'], 'the tokens ARE the content words')
  // numbers survive the letter-only law — /grid-432 genuinely says 432
  assert.ok(auditUrl('/grid-432').tokens.includes('432'))
})

test('CATALOGUE — /catalogue/<name> audits to the published package', () => {
  const r = auditUrl('/catalogue/openssl')
  assert.equal(r.matches[0]!.kind, 'catalogue')
  assert.match(r.matches[0]!.text, /openssl/)
  assert.match(r.matches[0]!.link, /pkg=openssl/)
  const root = auditUrl('/catalogue')
  assert.ok(root.matches.some((m) => m.link === '/catalogue' && m.score >= 90))
  const miss = auditUrl('/catalogue/zzz-no-such-package-ever')
  assert.ok(!miss.matches.some((m) => m.kind === 'catalogue'))
})

test('deterministic AND change-sensitive — the instrument can fail', () => {
  const a1 = auditUrl('/some/path', { theoremKeys: ['two_coins'] })
  const a2 = auditUrl('/some/path', { theoremKeys: ['two_coins'] })
  assert.equal(a1.address, a2.address, 'same url, same context, same report address')
  assert.deepEqual(a1.matches, a2.matches)
  const b = auditUrl('/some/other-path', { theoremKeys: ['two_coins'] })
  assert.notEqual(b.address, a1.address, 'a different url folding to the same report would be a dead instrument')
  // normalisation is honest: query/hash strip and case-fold, trailing slash collapses
  assert.equal(auditUrl('/Terminal/?utm=x#y').path, '/terminal')
  assert.equal(auditUrl('/Terminal/?utm=x#y').matches[0]!.kind, 'spec')
})
