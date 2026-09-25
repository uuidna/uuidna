// A GATE IS WORTH WHAT ITS FAILURE IS WORTH. Every check below is driven to FAIL from facts, because a release
// verifier that has never been seen to fail is indistinguishable from one that returns true. The pure evaluator
// exists for exactly this: the network is the subject, so it must not also be the test's dependency.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { evaluateRelease, zenodoReleases, newerVersion, type ReleaseFacts } from './release-live.js'

const DIST = {
  tarball: 'https://registry.npmjs.org/@uuidna/uuidna/-/uuidna-0.3.0.tgz',
  shasum: 'aa', integrity: 'sha512-bb', fileCount: 2093, unpackedSize: 19_015_854, attestations: { url: 'u', provenance: { predicateType: 'https://slsa.dev/provenance/v1' } },
}

/** A release that is genuinely, completely live — the only fixture from which `live` may be true. */
const GOOD: ReleaseFacts = {
  version: '0.3.0',
  tagged: true,   // a released version has a tag; that is what makes its absence from npm a finding
  npm: { read: true, reason: '', latest: '0.3.0', versions: ['0.2.9', '0.3.0'], dist: DIST },
  attestation: { read: true, reason: '', predicateTypes: ['https://slsa.dev/provenance/v1'] },
  tarball: { read: true, reason: '', bytes: 4_000_000, sha512: 'sha512-bb', sha1: 'aa' },
  zenodo: { read: true, reason: '', versions: [{ id: '22256708', version: '0.3.0', files: 1, bytes: 17_440_878, doi: '10.5281/zenodo.22256708' }] },
  doi: { read: true, reason: '', status: 200, landedOn: 'https://zenodo.org/records/22256708' },
}

test('release-live: a complete live release passes every check', () => {
  const r = evaluateRelease(GOOD)
  assert.equal(r.live, true, r.failed.map((c) => `${c.name}: ${c.measured}`).join(' | '))
  assert.equal(r.unread, 0)
  assert.equal(r.failed.length, 0)
  assert.ok(r.checks.length >= 11, `expected the full battery, got ${r.checks.length}`)
})

// ─── each check, driven to fail ──────────────────────────────────────────────────────────────────────────────
// THE CASE THAT MADE THIS FILE: version bumped, release never cut. Measured in the real world on 2026-09-25 —
// package.json 0.3.1, npm latest 0.3.0, Zenodo newest 0.3.0, no v0.3.1 tag anywhere. No repository gate saw it.
test('release-live: a version that was TAGGED and never published is caught', () => {
  const r = evaluateRelease({ ...GOOD, version: '0.3.1', tagged: true })
  assert.equal(r.live, false)
  const names = r.failed.map((c) => c.name)
  assert.ok(names.includes('npm-version-published'), names.join(','))
  assert.ok(names.includes('npm-latest-is-the-release'), names.join(','))
  assert.ok(names.includes('zenodo-version-deposited'), names.join(','))
  // and it is a REFUTATION, not an unread: the registry answered clearly that the version is absent
  assert.equal(r.unread, 0)
})

const fails = (name: string, f: ReleaseFacts): void => {
  const r = evaluateRelease(f)
  assert.equal(r.live, false, `${name} should have failed but the release read as live`)
  assert.ok(r.failed.some((c) => c.name === name), `expected ${name} to fail; failed were ${r.failed.map((c) => c.name).join(',')}`)
}

test('release-live: npm-tarball-serves fails when the CDN serves nothing', () => {
  fails('npm-tarball-serves', { ...GOOD, tarball: { read: true, reason: '', bytes: 0, sha512: 'sha512-bb', sha1: 'aa' } })
})

// THE DIGEST CHECKS ARE THE ONES MOST EASILY WRITTEN VACUOUSLY — comparing the metadata to itself cannot fail, BY
// CONSTRUCTION, because a value equals itself and no served bytes were ever consulted.
// These two prove the comparison is bytes-against-claim by corrupting the served bytes and nothing else.
test('release-live: npm-bytes-match-integrity fails when the served bytes differ from the signed digest', () => {
  fails('npm-bytes-match-integrity', { ...GOOD, tarball: { ...GOOD.tarball, sha512: 'sha512-TAMPERED' } })
})

test('release-live: npm-shasum-matches fails when the legacy digest differs', () => {
  fails('npm-shasum-matches', { ...GOOD, tarball: { ...GOOD.tarball, sha1: 'deadbeef' } })
})

test('release-live: npm-tarball-complete fails on a tarball that does not expand', () => {
  fails('npm-tarball-complete', { ...GOOD, npm: { ...GOOD.npm, dist: { ...DIST, unpackedSize: 1 } } })
  fails('npm-tarball-complete', { ...GOOD, npm: { ...GOOD.npm, dist: { ...DIST, fileCount: 0 } } })
})

test('release-live: npm-provenance-attested fails when the attestation bundle carries no slsa predicate', () => {
  fails('npm-provenance-attested', { ...GOOD, attestation: { read: true, reason: '', predicateTypes: [] } })
})

test('release-live: zenodo-record-carries-a-file fails on a landing page with no archive', () => {
  fails('zenodo-record-carries-a-file', {
    ...GOOD,
    zenodo: { read: true, reason: '', versions: [{ id: '1', version: '0.3.0', files: 0, bytes: 0, doi: 'd' }] },
  })
})

test('release-live: zenodo-doi-resolves fails while DataCite has not registered the DOI', () => {
  fails('zenodo-doi-resolves', { ...GOOD, doi: { read: true, reason: '', status: 404, landedOn: '' } })
  // and a DOI that resolves somewhere that is not Zenodo is not our record either
  fails('zenodo-doi-resolves', { ...GOOD, doi: { read: true, reason: '', status: 200, landedOn: 'https://example.com/elsewhere' } })
})

test('release-live: npm-and-zenodo-agree fails when one half of the release landed and the other did not', () => {
  fails('npm-and-zenodo-agree', {
    ...GOOD,
    zenodo: { read: true, reason: '', versions: [{ id: '1', version: '0.2.9', files: 1, bytes: 9, doi: 'd' }] },
  })
})

// ─── UNREAD IS NOT LIVE ─────────────────────────────────────────────────────────────────────────────────────
// The vacuous-success class, stated as a test. A verifier whose subject is the network will spend most of its
// failures on an unreachable network — a host fact, not a verdict about the release — and the one thing it must never
// do is call that a pass.
test('release-live: an unreachable registry makes the release NOT live, and says unread rather than refuted', () => {
  const r = evaluateRelease({
    ...GOOD,
    npm: { read: false, reason: 'registry.npmjs.org unreachable: ENETDOWN', latest: '', versions: [], dist: null },
    tarball: { read: false, reason: 'not attempted — no tarball url', bytes: 0, sha512: '', sha1: '' },
    attestation: { read: false, reason: 'not attempted', predicateTypes: [] },
  })
  assert.equal(r.live, false, 'an unread subject must never read as live')
  assert.ok(r.unread > 0, 'the unread checks must be counted as unread')
  const u = r.checks.find((c) => c.name === 'npm-version-published')!
  assert.equal(u.unread, true)
  assert.equal(u.ok, false, 'unread can never be ok — that is the whole distinction')
  assert.match(u.measured, /unreachable/, 'the reason must survive into the report')
  // every gap from an unread check must say so, so a reader never mistakes silence for a verdict
  assert.ok(r.gaps.every((g) => !g.fix.includes('unread is not live') || g.what.length > 0))
})

test('release-live: an unreachable Zenodo does not refute the deposit, but does withhold `live`', () => {
  const r = evaluateRelease({ ...GOOD, zenodo: { read: false, reason: 'zenodo.org answered 503', versions: [] }, doi: { read: false, reason: 'no record', status: 0, landedOn: '' } })
  assert.equal(r.live, false)
  assert.equal(r.checks.find((c) => c.name === 'zenodo-version-deposited')!.unread, true)
})

// ─── the chain holds foreign works ──────────────────────────────────────────────────────────────────────────
test('release-live: records without a version are not read as releases', () => {
  // measured on the live chain: the Clay proofs and the ℤ/9 Vortex Framework share concept 21787143 and carry
  // no `version`. Selecting the newest record without filtering would read another author's paper as this release.
  const picked = zenodoReleases([
    { id: '21787144', version: '', files: 5, bytes: 1, doi: 'clay' },
    { id: '22256708', version: '0.3.0', files: 1, bytes: 2, doi: 'ours' },
  ])
  assert.deepEqual(picked.map((p) => p.id), ['22256708'])
})

test('release-live: the newest version is picked numerically, not lexicographically', () => {
  // '0.3.0' < '0.10.0' numerically and the other way round as strings; an odometer past nine would silently
  // report the wrong release as newest.
  assert.equal(newerVersion('0.10.0', '0.3.0'), '0.10.0')
  assert.equal(newerVersion('0.3.0', '0.3.1'), '0.3.1')
})

test('release-live: the receipt changes when any single verdict changes', () => {
  const a = evaluateRelease(GOOD)
  const b = evaluateRelease({ ...GOOD, doi: { ...GOOD.doi, status: 404 } })
  assert.notEqual(a.receipt, b.receipt, 'a receipt that cannot distinguish two verdicts records nothing')
})

// A BLANK MEASUREMENT IS A ROW THAT SAYS NOTHING, and one slipped through on the first live run: the registry
// answered, carried no `dist` for an unpublished version, and `npm.reason` was empty by construction.
test('release-live: no check ever reports an empty measurement, on any fixture', () => {
  const fixtures: ReleaseFacts[] = [
    GOOD,
    { ...GOOD, version: '9.9.9' },
    { ...GOOD, npm: { read: true, reason: '', latest: '0.3.0', versions: ['0.3.0'], dist: null } },
    { ...GOOD, npm: { read: false, reason: 'unreachable', latest: '', versions: [], dist: null }, tarball: { read: false, reason: 'none', bytes: 0, sha512: '', sha1: '' }, attestation: { read: false, reason: 'none', predicateTypes: [] }, zenodo: { read: false, reason: 'none', versions: [] }, doi: { read: false, reason: 'none', status: 0, landedOn: '' } },
  ]
  for (const f of fixtures) {
    for (const c of evaluateRelease(f).checks) {
      assert.ok(c.measured.trim().length > 0, `${c.name} reported an empty measurement for version ${f.version}`)
    }
  }
})

// ─── the deadlock, stated as a test ─────────────────────────────────────────────────────────────────────────
// publish.yml runs leads-gate BEFORE it publishes. If "0.3.1 is not on npm" were a finding while 0.3.1 was being
// released, the gate would block the act that puts it there — on a true statement, for ever. The tag is the
// discriminator, and these two tests are the same world with only the tag changed.
test('release-live: an UNTAGGED version missing from npm is pending, not a finding', () => {
  const r = evaluateRelease({ ...GOOD, version: '0.3.1', tagged: false })
  assert.equal(r.live, false, 'it genuinely is not live, and pending must not pretend otherwise')
  assert.ok(r.pending >= 3, `expected the cut-sensitive checks to be pending, got ${r.pending}`)
  assert.equal(r.gaps.length, 0, 'an uncut release opens no gap — this is the deadlock guard')
  const c = r.checks.find((x) => x.name === 'npm-version-published')!
  assert.equal(c.pending, true)
  assert.equal(c.ok, false, 'pending is never ok')
  assert.equal(c.unread, false, 'pending is never unread — nothing failed to answer')
  assert.match(c.measured, /no tag v0\.3\.1 exists/)
})

test('release-live: the SAME state with a tag is a finding — the tag is the whole difference', () => {
  const untagged = evaluateRelease({ ...GOOD, version: '0.3.1', tagged: false })
  const tagged = evaluateRelease({ ...GOOD, version: '0.3.1', tagged: true })
  assert.equal(untagged.gaps.length, 0)
  assert.ok(tagged.gaps.length > 0, 'a cut release that did not land must open gaps')
  assert.notEqual(untagged.receipt, tagged.receipt, 'the receipt must distinguish cut from uncut')
})

test('release-live: pending never counts as passed', () => {
  const r = evaluateRelease({ ...GOOD, version: '0.3.1', tagged: false })
  assert.ok(r.passed < r.checks.length)
  for (const c of r.checks) assert.ok(!(c.ok && c.pending), `${c.name} is both ok and pending`)
})
