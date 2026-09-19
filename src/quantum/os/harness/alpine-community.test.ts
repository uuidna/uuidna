// alpine-community — catalogue community drives tests and trials (not dead census data).
//
// Sources: mirror/alpine-catalogue.tsv (repo=community), alpine-testing-leads (community dep closure),
// hexbitPortCoverage/manPagePortCoverage('community'). Trials: adjudicate + depositTrial + trial-protocol
// over catalogue-derived predicates. No theorem mint, no leads.json edit, no HONEST.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fresh, exec } from './index.js'
import {
  catalogue, catalogueBrowse, catalogueCompile, cataloguePackage, hexbitPortCoverage,
  isAlpineDistroPackage, manDrivenPortCoverage, manPagePortCoverage, packageSelfTest,
  type CataloguePackage,
} from '../catalogue/index.js'
import { adjudicate } from '../../../adjudicate.js'
import { depositTrial } from '../../../captain/trial/deposit/index.js'
import { trial } from '../../../trial-protocol.js'
import { callTool } from '../../../mcp.js'
import { UUID_HEXBITS } from '../../../hexbit/index.js'

test.beforeEach(fresh)

const communityOf = (): CataloguePackage[] => catalogue().filter((p) => p.repo === 'community')
const mainOf = (): CataloguePackage[] => catalogue().filter((p) => p.repo === 'main')

const FAKE: CataloguePackage = {
  repo: 'community', name: '!!!not-a-pkg!!!', version: 'not-a-version',
  checksum: '', desc: 'control — must fail packageSelfTest',
  deps: ['so:lib-zzz-missing-from-universe.so.99'], provides: [],
}

test('catalogue community is the majority of Alpine distro — browsable and listable', () => {
  const community = communityOf()
  const main = mainOf()
  assert.ok(community.length > 20000, `community rows from catalogue; got ${community.length}`)
  assert.ok(main.length > 5000)
  assert.ok(community.length > main.length, 'community outnumbers main on latest-stable')
  assert.equal(main.length + community.length, catalogue().filter(isAlpineDistroPackage).length)

  const browse = catalogueBrowse('ssl', 25, 'community')
  assert.ok(browse.total > 0)
  assert.ok(browse.hits.every((h) => h.repo === 'community'))

  const listed = exec('apk list community')
  assert.equal(listed.ok, true)
  assert.ok((listed.data as { total: number }).total === community.length)
  assert.ok(listed.output.some((l) => l.includes('[community]')))

  const ls = exec('ls /catalogue/community')
  assert.equal(ls.ok, true)
})

test('community man→app and hexbit ports are catalogue-driven completeness', () => {
  const hex = hexbitPortCoverage('community')
  assert.equal(hex.repo, 'community')
  assert.equal(hex.ported, hex.total)
  assert.equal(hex.total, communityOf().length)
  assert.equal(hex.missing.length, 0)

  const manHex = manPagePortCoverage('community')
  assert.ok(manHex.total > 3000, `community man packages; got ${manHex.total}`)
  assert.equal(manHex.ported, manHex.total)

  const driven = manDrivenPortCoverage('community')
  assert.equal(driven.definition, 'man→app→hexbit')
  assert.equal(driven.total, manHex.total)
  assert.ok(driven.witnessed >= driven.total - 25)
})

test('community sample packages self-test and compile from catalogue rows', () => {
  const sample = communityOf().filter((p) => p.provides.some((x) => x.startsWith('cmd:'))).slice(0, 32)
  assert.ok(sample.length >= 16, 'community publishes cmd: providers')
  for (const p of sample) {
    assert.equal(packageSelfTest(p).ok, true, p.name)
    const c = catalogueCompile(p)
    assert.equal(c.hexbits.length, UUID_HEXBITS)
    assert.equal(cataloguePackage(p.name)?.repo, 'community')
  }
})

test('TRIAL — community partition adjudicates from live catalogue counts', () => {
  const community = communityOf()
  const main = mainOf()
  const distro = catalogue().filter(isAlpineDistroPackage)
  const claim = `alpine community + main partition the distro catalogue (${main.length} + ${community.length} = ${distro.length})`
  const v = adjudicate(claim, () => main.length + community.length === distro.length && community.length > main.length)
  assert.equal(v.verdict, 'VERIFIED', v.note)

  const deposited = depositTrial(claim, [
    { party: 'main', test: () => main.length > 5000 && main.every((p) => p.repo === 'main') },
    { party: 'community', test: () => community.length > 20000 && community.every((p) => p.repo === 'community') },
  ])
  assert.equal(deposited.parity, true)
  assert.equal(deposited.remanded, false)
  assert.equal(deposited.diamonds.length, 2)
  // deposit buys computation against the sealed ledger; fresh catalogue arithmetic is not a sealed key
  assert.equal(deposited.verdict?.verdict, 'UNVERIFIED')
})

test('TRIAL PROTOCOL — community self-test with a control that must fail', () => {
  const subject = communityOf().find((p) => p.provides.some((x) => x.startsWith('cmd:')))!
  assert.ok(subject)
  const r = trial({
    hypothesis: 'every alpine community package with cmd: self-tests',
    refutedIf: 'packageSelfTest returns ok:false for a real community row',
    test: (p: CataloguePackage) => packageSelfTest(p).ok,
    control: FAKE,
    subject,
  })
  assert.equal(r.controlRejected, true)
  assert.equal(r.outcome, 'supported')
})

test('uuidna_trial ledger still folds; community row is reachable via uuidna_exec', () => {
  const trialRun = callTool('uuidna_trial', {}) as { verified: number; receipt: string }
  assert.ok(trialRun.verified > 0)
  assert.ok(typeof trialRun.receipt === 'string' && trialRun.receipt.includes('-'))

  const hit = communityOf().find((p) => p.name === 'ripgrep' || p.name === 'fd' || p.name === 'bat')
    ?? communityOf().find((p) => p.provides.some((x) => x.startsWith('cmd:')))!
  const info = exec(`apk info ${hit.name}`)
  assert.equal(info.ok, true)
  assert.equal((info.data as { state: string }).state, 'AVAILABLE')
  assert.ok(Array.isArray((info.data as { hexbits?: number[] }).hexbits))
})
