// os/apps — THE HARMONISATION MUST REFUSE, AND THE DECODER MUST READ THE SECOND MEMBER.
//
// Two things here can fail silently in production and did:
//
// 1. THE DECODER. `APKINDEX.tar.gz` is TWO concatenated gzip members — apk writes the signature first and the
//    index second — and `DecompressionStream('gzip')` decodes the first, then throws on the rest as trailing
//    junk. Wrapped in a best-effort catch, as every fetcher in this tree wraps it, that returns an EMPTY
//    catalogue: a broken decoder wearing the face of an empty upstream. The fixture below builds exactly that
//    shape locally, so the test needs no network and still fails if the multi-member walk is removed.
//
// 2. THE HARMONISATION. Binding an app to a sealed theorem is only worth anything if some apps are REFUSED.
//    The refusal cases below are not invented: every one is a real false positive the first version of these
//    rules produced against the live index — `libisoburn` (ISO-9660) and `iso-codes` (country codes) bound to
//    photography by a bare `iso`, `abseil-cpp-raw-logging-internal` bound to it by a bare `raw`, and "logic-less
//    mustache templates" bound to reasoning by a bare `logic`. They are the regression test for the class.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  harmoniseOf, originOf, portApp, portCatalogue, untarGzipMember, HARMONIES,
  type IndexPackage,
} from './index.js'
import { theoremByKey } from '../../theorems/index.js'
import { UUID_HEXBITS } from '../../hexbit/index.js'

const pkg = (name: string, desc: string, version = '1.0.0-r0', checksum = 'Q1abcdef='): IndexPackage =>
  ({ name, version, desc, checksum })

test('every harmony rule names a skill the ledger actually has sealed theorems for', () => {
  const skills = new Set([...theoremByKey().values()].map((t) => t.skill))
  const orphans = HARMONIES.map(([, skill]) => skill).filter((s) => !skills.has(s))
  assert.deepEqual(orphans, [], 'a rule pointing at a skill with no sealed theorem can never bind a witness')
})

test('an app whose declared purpose the ledger has arithmetic for is harmonised', () => {
  assert.equal(harmoniseOf('freetype', 'A free, high-quality and portable font engine')?.skill, 'typesetting')
  assert.equal(harmoniseOf('tzdata', 'Timezone data')?.skill, 'calendar')
  assert.equal(harmoniseOf('openssl', 'Toolkit for TLS and SSL protocols')?.skill, 'security')
  assert.equal(harmoniseOf('lcms2', 'Color Management Engine')?.skill, 'colour')
})

test('THE REFUSALS — every one of these was a real false positive against the live index', () => {
  const refused: [string, string][] = [
    ['libisoburn', 'Library to enable creation and expansion of ISO-9660 filesystems'],
    ['iso-codes', 'ISO codes and their translations'],
    ['abseil-cpp-raw-logging-internal', 'Abseil Common C++ library: abseil-cpp-raw-logging-internal'],
    ['lua-lustache', 'Logic-less {{mustache}} templates with Lua'],
    ['perl-extutils-installpaths', 'Build.PL install path logic made easy'],
    ['abseil-cpp-raw-hash-set', 'Abseil Common C++ library: abseil-cpp-raw-hash-set'],
  ]
  for (const [name, desc] of refused) {
    assert.equal(harmoniseOf(name, desc), null,
      `${name} was bound to a theorem by a rule matching a WORD where the claim is about a SUBJECT`)
  }
})

test('an ordinary package with no sealed arithmetic behind it harmonises with NOTHING', () => {
  // the honest majority. If this ever returns a skill, the rules have gone loose and every tally is inflated.
  assert.equal(harmoniseOf('perl-moose', 'A postmodern object system for Perl 5'), null)
  assert.equal(harmoniseOf('kubectl', 'Kubernetes command-line tool'), null)
  assert.equal(harmoniseOf('nginx', 'HTTP and reverse proxy server'), null)
})

test('subpackage variants fold to their project, so a tally counts things and not publications', () => {
  for (const suffix of ['-doc', '-dev', '-dbg', '-libs', '-static', '-lang']) {
    assert.equal(originOf(`freetype${suffix}`), 'freetype')
  }
  assert.equal(originOf('freetype'), 'freetype', 'a project with no suffix is its own origin')
  assert.equal(originOf('alpine-base'), 'alpine-base', 'a hyphen is not a variant marker')
})

test('a ported app is an identity — deterministic address, uuidna/<name>, 32 hexbit states', () => {
  const a = portApp(pkg('freetype', 'A free font engine'), 'main', 'latest-stable', 'x86_64')
  const b = portApp(pkg('freetype', 'A free font engine'), 'main', 'latest-stable', 'x86_64')
  assert.equal(a.address, b.address, 'the same published tuple must recompute to the same address')
  assert.equal(a.id, 'uuidna/freetype')
  assert.equal(a.hexbits.length, UUID_HEXBITS)
  assert.ok(a.hexbits.every((h) => h >= 0 && h < 16))
  // a moved version is a different release and must address elsewhere
  const moved = portApp(pkg('freetype', 'A free font engine', '2.0.0-r0'), 'main', 'latest-stable', 'x86_64')
  assert.notEqual(moved.address, a.address)
})

test('a harmonised app carries a witness that IS in the ledger; an unharmonised one carries null, not a guess', () => {
  const bound = portApp(pkg('freetype', 'A free font engine'), 'main', 'latest-stable', 'x86_64')
  assert.equal(bound.skill, 'typesetting')
  assert.ok(bound.theorem && theoremByKey().has(bound.theorem), 'the bound witness must be a sealed theorem')
  assert.ok(bound.why)

  const loose = portApp(pkg('nginx', 'HTTP and reverse proxy server'), 'main', 'latest-stable', 'x86_64')
  assert.equal(loose.skill, null)
  assert.equal(loose.theorem, null)
  assert.equal(loose.why, null)
  assert.ok(loose.address, 'an unharmonised app is still PORTED — it keeps its identity, it just carries no proof')
})

test('the catalogue counts packages AND projects, and reports the unharmonised majority', () => {
  const packages = [
    pkg('freetype', 'A free font engine'), pkg('freetype-doc', 'A free font engine (documentation)'),
    pkg('freetype-dev', 'A free font engine (development files)'),
    pkg('nginx', 'HTTP server'), pkg('kubectl', 'Kubernetes CLI'), pkg('perl-moose', 'Object system'),
  ]
  const c = portCatalogue(packages, ['main'])
  assert.equal(c.count, 6)
  assert.equal(c.origins, 4, 'three freetype packages are one project')
  assert.equal(c.harmonised, 3)
  assert.equal(c.harmonisedOrigins, 1)
  assert.equal(c.unharmonised, 3)
  assert.equal(c.bySkill.length, 1)
  assert.equal(c.bySkill[0].skill, 'typesetting')
  assert.equal(c.bySkill[0].apps, 3)
  assert.equal(c.bySkill[0].origins, 1)
})

test('the catalogue root is ORDER-INVARIANT — two readers of the same index get the same proof of the set', () => {
  const packages = [pkg('a', 'font engine'), pkg('b', 'HTTP server'), pkg('c', 'Timezone data')]
  const forward = portCatalogue(packages, ['main'])
  const backward = portCatalogue([...packages].reverse(), ['main'])
  assert.equal(forward.root, backward.root)
  assert.deepEqual(forward.sample.map((s) => s.address), backward.sample.map((s) => s.address),
    'the sample must be a function of the catalogue, not of who read it')
  // and a changed catalogue must move the root, or it proves nothing about the set
  const plus = portCatalogue([...packages, pkg('d', 'one more')], ['main'])
  assert.notEqual(plus.root, forward.root)
})

test('the honest scope travels in the catalogue, not only in a comment', () => {
  const c = portCatalogue([pkg('freetype', 'A free font engine')], ['main'])
  // WAS /NEVER EXECUTION/, and that was a false claim this test was keeping alive (the captain, 2026-09-01).
  // uuidnaOS executes: uuidnaExec runs applets, os/runtime verifies then runs host binaries. What is true is
  // narrower and belongs to THIS module — it carries provenance and runs nothing.
  assert.match(c.honest, /PROVENANCE ONLY IN THIS MODULE/)
  assert.match(c.honest, /does NOT mean the app was verified/)
})

// ── the decoder ──────────────────────────────────────────────────────────────────────────────────────────────

/** a minimal tar of one member — untarMember reads the name at 0..100 and the octal size at 124..136 */
const tarOf = (name: string, body: string): Uint8Array => {
  const data = new TextEncoder().encode(body)
  const pad = (512 - (data.length % 512)) % 512
  const out = new Uint8Array(512 + data.length + pad + 1024)   // header + body + padding + two zero blocks
  out.set(new TextEncoder().encode(name), 0)
  out.set(new TextEncoder().encode(data.length.toString(8).padStart(11, '0') + '\0'), 124)
  out.set(data, 512)
  return out
}

const gzip = async (bytes: Uint8Array): Promise<Uint8Array> => {
  const cs = new CompressionStream('gzip')
  return new Uint8Array(await new Response(new Blob([bytes as unknown as BlobPart]).stream().pipeThrough(cs)).arrayBuffer())
}

const concat = (a: Uint8Array, b: Uint8Array): Uint8Array => {
  const out = new Uint8Array(a.length + b.length)
  out.set(a, 0); out.set(b, a.length)
  return out
}

test('A TWO-MEMBER GZIP IS READ TO THE END — the shape APKINDEX.tar.gz actually has', async () => {
  const signature = await gzip(tarOf('.SIGN.RSA.alpine-devel.pub', 'not the index'))
  const index = await gzip(tarOf('APKINDEX', 'P:freetype\nV:1.0.0-r0\nC:Q1abc=\nT:A free font engine\n'))
  const both = concat(signature, index)

  // THE CONTROL MEASURES THE PLATFORM INSTEAD OF REQUIRING IT TO STAY BROKEN (2026-08-26, Node 26). It used to
  // assert that the whole-buffer recipe REJECTS a concatenated gzip, and it carried its own expiry note: "if
  // this ever passes, the platform learned to concatenate members and the walk below is merely redundant."
  // Node 26 learned exactly that — DecompressionStream now returns BOTH members — so the assertion was failing
  // on the platform improving, which is the one thing a control stays clear of, by decision. Redundant HERE is not redundant
  // everywhere: workerd and older runtimes still stop at the first member, so the walk stays and is still the
  // decoder the tree ships; what the control now records is which of the two worlds it ran in.
  let naive: string | null = null
  try {
    const ds = new DecompressionStream('gzip')
    naive = new TextDecoder().decode(await new Response(new Blob([both as unknown as BlobPart]).stream().pipeThrough(ds)).arrayBuffer())
  } catch {
    naive = null   // the runtime stopped at the first member — the world the walk was written for
  }
  // whichever world, the ORDER is the invariant that matters: the signature is member one, never the index.
  if (naive !== null) assert.ok(naive.includes('not the index'),
    'a concatenating runtime still yields the signature FIRST — the index is never member one')

  // THE GUARANTEE, asserted identically in BOTH worlds: the walk reaches the SECOND member.
  const found = await untarGzipMember(both, 'APKINDEX')
  assert.match(found, /^P:freetype/, 'the index is the SECOND member; reading only the first returns the signature')
})

test('the decoder returns EMPTY rather than a wrong answer when the member is not there', async () => {
  const only = await gzip(tarOf('.SIGN.RSA.alpine-devel.pub', 'not the index'))
  assert.equal(await untarGzipMember(only, 'APKINDEX'), '')
  assert.equal(await untarGzipMember(new Uint8Array([1, 2, 3, 4]), 'APKINDEX'), '', 'junk is not a member')
})
