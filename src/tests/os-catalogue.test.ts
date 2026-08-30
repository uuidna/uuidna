// os-catalogue — four states; Alpine corpus ≠ boot closure
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fresh, exec } from '../quantum/os/harness/index.js'
import { catalogue, catalogueState, cataloguePackage, catalogueSearch, catalogueRdepends, parseCatalogue, CATALOGUE_FILE, packageSelfTest, testAllPackages, testAllPackagesChunked, primeCatalogue, primeCatalogueFrom, cataloguePrimed, packageSelfTestCoverage, catalogueRouteOf, catalogueFor, resolveAlpineApp } from '../quantum/os/catalogue/index.js'
import { ROOT } from '../scripts/api.js'

test.beforeEach(fresh)


test('the catalogue carries ALL of Alpine, not the boot closure', () => {
  const st = catalogueState()
  assert.equal(st.present, true, `the committed catalogue must be readable — ${st.why ?? ''}`)
  // the exact number moves with every Alpine release, so the ASSERTION is the order of magnitude, not a frozen
  // count (this repo has a finder for pinned counts). What must never regress is 25.
  assert.ok(st.count > 20000, `Alpine publishes tens of thousands of packages; catalogued ${st.count}`)
  assert.equal(catalogue().length, st.count, 'the state must report the set it actually holds')
})

test('a package OUTSIDE the boot closure is now ANSWERED, with upstream\'s own version and checksum', () => {
  // the exact case from the report: `apk search nodejs` used to return "(no ported package matches)".
  const node = cataloguePackage('nodejs')
  assert.ok(node, 'nodejs is published by Alpine and must be findable')
  assert.equal(node.repo, 'main')
  assert.match(node.version, /^\d+\./, 'a real published version, not a placeholder')
  assert.match(node.checksum, /^Q1/, 'upstream\'s PUBLISHED checksum — provenance, never a recomputation')
  assert.ok(node.deps.length > 0, 'and its published dependency edge, which `apk depends` now walks')

  const r = exec('apk search nodejs')
  assert.equal(r.ok, true)
  assert.ok(r.output.some((l) => l.startsWith('nodejs-')), 'the surface returns it, not a miss')
  assert.ok(!r.output.some((l) => l.includes('no ported package matches')), 'the old string must never come back')
})

test('INSTALLED, AVAILABLE and ABSENT are three DIFFERENT answers', () => {
  // (1) in the boot closure — installed, and still carrying its route in the virtual OS
  const inst = exec('apk info busybox')
  assert.equal(inst.ok, true)
  assert.equal((inst.data as { state: string }).state, 'INSTALLED')
  assert.ok(inst.output.some((l) => l.includes('webpage')), 'an installed package keeps its uuidnaOS route')
  const instHex = (inst.data as { hexbits?: number[] }).hexbits
  assert.ok(Array.isArray(instHex) && instHex.length === 32, 'INSTALLED carries its 32 hexbit compile')
  assert.ok(typeof (inst.data as { address?: string }).address === 'string', 'INSTALLED carries its address')

  // (2) published by Alpine but not booted — available, and SAID to be available rather than silently listed
  const avail = exec('apk info nodejs')
  assert.equal(avail.ok, true)
  assert.equal((avail.data as { state: string }).state, 'AVAILABLE')
  assert.ok(avail.output.some((l) => l.includes('AVAILABLE')), 'the distinction is stated to the reader, not only in data')
  // THE GAP THE CATALOGUE SHIP MADE VISIBLE: AVAILABLE answered without address/hexbits while the self-test
  // claimed "32 hexbit states". Same mint as the boot port — AVAILABLE is the same kind of object.
  const availData = avail.data as { address?: string; hexbits?: number[] }
  assert.ok(typeof availData.address === 'string' && availData.address.includes('-'), 'AVAILABLE compiles to an address')
  assert.ok(Array.isArray(availData.hexbits) && availData.hexbits.length === 32, 'AVAILABLE carries its 32 hexbit compile')
  assert.ok(availData.hexbits!.every((h) => Number.isInteger(h) && h >= 0 && h < 16), 'every state is a hexbit')

  // (3) not published at all — a refusal that names its DENOMINATOR, so the claim is checkable
  const gone = exec('apk info zzz-no-such-package-anywhere')
  assert.equal(gone.ok, false)
  assert.match(gone.output[0]!, /no such package/)
  assert.match(gone.output[0]!, /28\d{3}|\d{5}/, 'it states how many packages it actually searched')
  assert.match(gone.output[0]!, /Absent UPSTREAM/, 'and that this is a claim about Alpine, which it has earned')

  // and the three must not collide
  assert.notEqual((inst.data as { state: string }).state, (avail.data as { state: string }).state)
  assert.equal(gone.ok, false)
  assert.equal(inst.ok, true)
})

// ── THE MUTATION THAT BREAKS IT (the falsifiability law in scripts/api.ts). The whole value of the change is that
// an UNREADABLE CATALOGUE never renders as "Alpine does not have this". That is a fourth state, it is the one a
// caller is most likely to be misled by, and it cannot be reached by deleting the file in a shared checkout — so
// the parser and the wording are driven directly.
test('an ABSENT catalogue reports ABSENCE, never a miss — the fourth state', () => {
  // the parser is the load path's whole content, so an empty/garbage read is exercised where it actually decides
  assert.deepEqual(parseCatalogue(''), [], 'nothing read is no packages')
  assert.deepEqual(parseCatalogue('# only a header\n'), [], 'a header alone is not a package')
  assert.deepEqual(parseCatalogue('main\tfoo\t1.0\tQ1x\tdesc\tbar baz\tso:libfoo.so'), [
    { repo: 'main', name: 'foo', version: '1.0', checksum: 'Q1x', desc: 'desc', deps: ['bar', 'baz'], provides: ['so:libfoo.so'] },
  ], 'a real row parses by position')
  // a row written before the provides column existed must still parse, with an empty provides rather than a crash
  assert.deepEqual(parseCatalogue('main\tfoo\t1.0\tQ1x\tdesc\tbar')[0]!.provides, [], 'a short row degrades, it does not throw')

  // THE POINT: zero packages and a present catalogue are different worlds, and the state type is what carries it.
  // If load() ever reported {present:true,count:0} for an unreadable file, apkMiss would say "no such package in
  // Alpine, searched all 0" — confidently wrong. Pinned as a property of the type's own contract:
  const st = catalogueState()
  assert.equal(st.present, st.count > 0, 'present and non-empty must agree — the two ways to be empty stay one')
  assert.equal(st.why === null, st.present, 'a catalogue that is absent must SAY WHY; one that is present has no why')
})

test('search is bounded and ranked, and reports the total it did not show', () => {
  const r = catalogueSearch('lib', 10)
  assert.equal(r.hits.length, 10, 'the cap holds — 28,639 rows must never land in a caller\'s context')
  assert.ok(r.total > 10, 'and the true count is still reported, so the cap is visible rather than silent')
  // an exact name outranks a substring: `apk search musl` must not bury musl under musl-dev-doc-whatever
  const m = catalogueSearch('musl', 5)
  assert.equal(m.hits[0]!.name, 'musl', 'an exact hit ranks first')
  assert.deepEqual(catalogueSearch('', 5), { hits: [], total: 0 }, 'an empty query matches nothing rather than everything')
})

test('resolveAlpineApp — package name, published cmd:, busybox cmd: stays applets', () => {
  const nginx = resolveAlpineApp('nginx')
  assert.ok(nginx)
  assert.equal(nginx.pkg.name, 'nginx')
  assert.equal(nginx.via, 'name')

  const box = resolveAlpineApp('busybox')
  assert.ok(box)
  assert.equal(box.pkg.name, 'busybox')
  assert.equal(box.via, 'name')

  const dotnet = resolveAlpineApp('dotnet')
  assert.ok(dotnet)
  assert.equal(dotnet.pkg.name, 'dotnet-host')
  assert.equal(dotnet.via, 'cmd')

  const omp = resolveAlpineApp('omp')
  assert.ok(omp)
  assert.equal(omp.pkg.name, 'oh-my-pi')
  assert.equal(omp.via, 'cmd')

  assert.equal(resolveAlpineApp('rm'), null, 'busybox cmd:rm stays an applet miss (uutils-coreutils does not steal it)')
  assert.equal(resolveAlpineApp(''), null)
})

test('rdepends walks the WHOLE published graph, not the 25 that boot', () => {
  // musl is depended on by far more than the boot closure contains; the boot names are kept first because
  // "who in the running world needs this" is a different question from "who could".
  const r = catalogueRdepends('musl')
  assert.ok(r.total >= 5, `the published reverse edge must be real: got ${r.total}`)
  const surfaced = exec('apk rdepends musl')
  assert.equal(surfaced.ok, true)
  assert.ok(surfaced.output.some((l) => l.includes('[installed]')), 'boot packages are marked, not merged away')
})

test('the committed catalogue is a FUNCTION of upstream — sorted, headed, and reproducible', () => {
  const text = readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8')
  assert.match(text, /^# uuidna alpine catalogue — GENERATED/, 'it names its generator, so nobody hand-edits it')
  assert.match(text, /packages=\d+/, 'and carries the count it was written with')
  // sort order is what makes two runs against one Alpine release byte-identical; without it the derived layer
  // never reaches a fixed point and spin would report drift on every regeneration.
  const rows = parseCatalogue(text)
  const byRepo = rows.filter((r) => r.repo === 'main').map((r) => r.name)
  assert.deepEqual(byRepo, [...byRepo].sort(), 'main is sorted by name — the file must not depend on fetch order')
  assert.ok(rows.every((r) => r.name && r.version), 'every row carries a name and a version')
})

// ── EACH PACKAGE TESTS ITSELF (2026-08-25). Not one test over the catalogue — a verdict per package, from its own
// published record, since uuidnaOS runs nothing and cannot test by executing.
test('every package tests ITSELF, and the suite reports its own denominator', () => {
  const r = testAllPackages()
  assert.equal(r.present, true)
  assert.equal(r.tested, catalogueState().count, 'the suite must test every catalogued package, not a sample')
  assert.equal(r.passed + r.failed, r.tested, 'every package lands in exactly one bucket')
  const cov = packageSelfTestCoverage()
  assert.equal(cov.total, r.tested)
  assert.equal(cov.passed, r.passed)
  assert.equal(cov.failed, r.failed)
  assert.equal(cov.failed, 0,
    `self-test must close; got ${cov.failed}: ${cov.missing.join(', ')}`)
})

test('a package\'s self-test CAN FAIL — all four checks, driven by hand', () => {
  // THE FALSIFIABILITY LAW. A suite reporting 28,634/28,639 proves nothing unless a bad record actually fails,
  // so each check is broken deliberately. Without this the whole audit could be `ok: true` and look identical.
  const good = cataloguePackage('musl')!
  assert.equal(packageSelfTest(good).ok, true, 'a real package passes')
  const compile = packageSelfTest(good).checks.find((c) => c.check === 'compile')!
  assert.equal(compile.ok, true)
  assert.match(compile.detail, /hexbit states/, 'compile names the unit')
  assert.match(compile.detail, /[0-9a-f-]{36}/, 'and carries the address it compiled from — never a bare claim')

  const badName = packageSelfTest({ ...good, name: 'not a valid name!' })
  assert.equal(badName.ok, false)
  assert.equal(badName.checks.find((c) => c.check === 'identity')!.ok, false)

  const badVersion = packageSelfTest({ ...good, version: 'not-a-version' })
  assert.equal(badVersion.checks.find((c) => c.check === 'identity')!.ok, false, 'a version must start with a digit')

  // PROVENANCE is the one that makes the port a port: a digest that decodes to the wrong length names nothing
  assert.equal(packageSelfTest({ ...good, checksum: 'Q1tooshort' }).checks.find((c) => c.check === 'provenance')!.ok, false)
  assert.equal(packageSelfTest({ ...good, checksum: '' }).checks.find((c) => c.check === 'provenance')!.ok, false)
  assert.equal(packageSelfTest({ ...good, checksum: 'XX' + good.checksum.slice(2) }).checks.find((c) => c.check === 'provenance')!.ok, false,
    'the Q1 prefix is apk\'s published form and is not optional')

  // CLOSURE — the check that only a COMPLETE world can run. At 25 packages nearly every dep pointed outside,
  // so "unresolved" was the normal case and the check could not have discriminated at all.
  const dangling = packageSelfTest({ ...good, deps: ['so:libthis-does-not-exist.so.999'] })
  assert.equal(dangling.ok, false)
  assert.deepEqual(dangling.unresolved, ['so:libthis-does-not-exist.so.999'])
  assert.equal(packageSelfTest({ ...good, deps: ['!conflict-marker'] }).checks.find((c) => c.check === 'closure')!.ok, true,
    'a conflict marker excludes and is not a dependency to resolve')
})

test('the closure check resolves through PROVIDES, not just names — the other half of the edge', () => {
  // so:/cmd:/pc: deps name a capability, never a package. Without the published `provides` column they would all
  // dangle, and 28,639 packages would each fail a check that was really the catalogue's own missing field.
  const node = cataloguePackage('nodejs')!
  assert.ok(node.deps.some((d) => d.startsWith('so:')), 'nodejs depends on shared objects by capability')
  assert.equal(packageSelfTest(node).checks.find((c) => c.check === 'closure')!.ok, true,
    'and every one of them resolves to a package that PROVIDES it')
})

// ── IT RUNS IN THE BROWSER (2026-08-25). uuidnaOS is a PWA; a host with no synchronous filesystem must be a
// FULL host, not a crippled one that answers "absent" to every question.
test('a runtime with NO filesystem is primed, not crippled', async () => {
  const text = readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8')
  const st = primeCatalogue(text)
  assert.equal(st.present, true)
  assert.ok(st.count > 20000, 'the browser gets the WHOLE catalogue, not a subset')
  assert.equal(cataloguePrimed(), true)
  // and the sync surface still works afterwards — exec is sync by design and must not become async
  // because one host opens files differently
  assert.ok(cataloguePackage('nodejs'), 'the sync accessors read the primed world')

  // priming with a shape drift is ABSENT, never an empty Alpine — the same distinction, at the browser's door
  const drift = primeCatalogue('# header only\n')
  assert.equal(drift.present, false)
  assert.match(drift.why!, /zero packages/)
  primeCatalogue(text)                                    // restore for any test that follows
})

test('primeCatalogueFrom reports an unreachable catalogue as ABSENT, never as an empty Alpine', async () => {
  // the offline PWA case: no cache entry and no network. It must not read as "Alpine has no packages".
  const st = await primeCatalogueFrom('http://127.0.0.1:1/no-such-catalogue.tsv')
  assert.equal(st.present, false)
  assert.equal(st.count, 0)
  assert.match(st.why!, /failed|HTTP/, 'it names what went wrong, so a host fault is not read as a fact about Alpine')
  primeCatalogue(readFileSync(join(ROOT, CATALOGUE_FILE), 'utf8'))
})

// ── THE CHUNKED WALK IS THE SAME WALK. uuidnaOS runs this suite in a browser once per page load, where what costs
// the visitor is not the total but the longest UNINTERRUPTED block: past roughly 50 ms the page stops answering
// input. Measured on this tree, cold and in a fresh process, because a once-per-load operation has no warm pass
// to average into — the visitor's only call IS the cold one:
//
//   synchronous   total ~91 ms, longest block ~92 ms   (one span: the whole thing)
//   chunked       total ~117 ms, longest block ~37 ms  (parse alone, the walk divided beneath it)
//
// The total goes UP. That is the trade and it is the right one on a main thread: nothing is faster, but the page
// keeps answering. What made it work was separating the two costs rather than dividing the loop — parsing 7 MB of
// TSV is 35 ms and indivisible, the walk is 56 ms and divides freely, and chunking only the walk left them fused
// in one 53 ms span that still blocked. The first attempt is recorded because the measurement is what corrected it.
//
// WHAT THIS TEST HOLDS is not the timing — a number pinned in a test is wrong on the next host, and this tree
// refuses those. It holds that the two functions ANSWER THE SAME, so the fast-path cannot quietly drift from the
// one the ledger trusts, and that the chunked walk keeps the denominator discipline: a partial count reported as
// a whole one would be exactly the absence-as-a-clean-result the rest of this file exists to refuse.
test('the chunked walk returns EXACTLY the synchronous walk — a scheduling change, never a scope change', async () => {
  const sync = testAllPackages()
  const chunked = await testAllPackagesChunked()
  assert.equal(chunked.tested, sync.tested, 'the denominator is the whole catalogue on both paths')
  assert.equal(chunked.passed, sync.passed)
  assert.equal(chunked.failed, sync.failed)
  assert.equal(chunked.present, sync.present)
  assert.deepEqual(chunked.byCheck, sync.byCheck, 'the same checks fail for the same reasons')
  assert.deepEqual(chunked.failures.map((x) => x.name).sort(), sync.failures.map((x) => x.name).sort())
})

test('the chunk size changes the SCHEDULE and nothing else', async () => {
  // the control that would catch a chunked walk reporting only the chunks it finished: vary the boundary and the
  // answer must not move. A loop that dropped its remainder would answer differently at a size that does not
  // divide the catalogue evenly, and 28,639 is not divisible by any of these.
  const base = await testAllPackagesChunked(1500)
  for (const size of [97, 999, 20000]) {
    const r = await testAllPackagesChunked(size)
    assert.equal(r.tested, base.tested, `chunk ${size}: every package is still counted`)
    assert.equal(r.passed, base.passed, `chunk ${size}: the verdict does not depend on where the yields fall`)
    assert.equal(r.failed, base.failed)
  }
})

test('editorial catalogue routes — /catalogue/<name> beyond the 25 install paths', () => {
  assert.equal(catalogueRouteOf('openssl'), '/catalogue/openssl')
  const pkg = catalogueFor('/catalogue/openssl')
  assert.ok(pkg)
  assert.equal(pkg!.name, 'openssl')
  assert.equal(catalogueFor('/catalogue'), null)
  assert.equal(catalogueFor('/catalogue/main/openssl'), null)
  assert.equal(catalogueFor('/terminal'), null)
})
