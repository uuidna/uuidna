// org-fit — the fit is driven here with no network and no checkout, which is the point of keeping the verdict in a
// library: the boundary fetches, the law decides, and the law can be interrogated with three rows of fixture.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fitOrg, routesFor, surfacesNamed, namesKey, ourLicenceAllowsDerivatives, type OutsideRepo, type Surface } from './org-fit.js'

const SURFACES: Surface[] = [
  { name: 'lean-ledger', keys: ['lean', 'theorem', 'proof'], magnitude: 2653, evidence: 'THEOREMS.length' },
  { name: 'mcp-surface', keys: ['mcp', 'model context protocol'], magnitude: 256, evidence: 'TOOL_NAMES.length' },
  { name: 'merkle-receipts', keys: ['merkle', 'transparency', 'ledger'], magnitude: 1, evidence: 'src/gravity' },
]

const REPOS: OutsideRepo[] = [
  { fullName: 'host/prover', license: 'MIT', archived: false, stars: 10, text: 'host/prover a theorem prover with lean support', claRequired: true },
  { fullName: 'host/log', license: 'Apache-2.0', archived: false, stars: 900, text: 'host/log a verifiable merkle transparency log' },
  { fullName: 'host/dead', license: 'MIT', archived: true, stars: 5000, text: 'host/dead an archived mcp server' },
]

test('NoDerivatives refuses source donation against every host, whatever the host licenses', () => {
  const fit = fitOrg('host', REPOS, SURFACES, 'CC-BY-NC-ND-4.0')
  assert.equal(fit.derivativesAllowed, false)
  assert.equal(fit.donatable, 0, 'ND means zero donatable hosts, not few')
  for (const r of fit.repos) {
    const donate = r.routes.find((t) => t.route === 'donate-source')
    assert.equal(donate?.open, false, `${r.fullName} must refuse donation`)
    assert.match(donate?.because ?? '', /NoDerivatives/, 'the refusal names our licence, never the host')
  }
})

test('a licence without ND opens the donation route — the law reads our licence, not our habits', () => {
  assert.equal(ourLicenceAllowsDerivatives('CC-BY-NC-ND-4.0'), false)
  assert.equal(ourLicenceAllowsDerivatives('MIT'), true)
  const fit = fitOrg('host', REPOS, SURFACES, 'MIT')
  assert.equal(fit.donatable, 3, 'every host becomes donatable the moment ND leaves our licence')
})

test('an archived repository closes what needs the host and leaves what does not', () => {
  const dead = REPOS[2]
  assert.ok(dead, 'fixture present')
  const routes = routesFor(dead, false)
  const open = routes.filter((t) => t.open).map((t) => t.route)
  assert.deepEqual(open, ['interop-demo'], 'only the route that asks nothing of them survives archiving')
})

test('surfaces are matched by what the host says of itself, in surface order', () => {
  const prover = REPOS[0]
  const log = REPOS[1]
  assert.ok(prover && log, 'fixtures present')
  assert.deepEqual(surfacesNamed(prover, SURFACES), ['lean-ledger'])
  assert.deepEqual(surfacesNamed(log, SURFACES), ['merkle-receipts'])
  assert.deepEqual(surfacesNamed({ ...prover, text: 'lean theorems over an mcp merkle ledger' }, SURFACES),
    ['lean-ledger', 'mcp-surface', 'merkle-receipts'], 'all three, in the order the surfaces were declared')
})

test('fit orders by surfaces named, and popularity only separates equals', () => {
  const fit = fitOrg('host', REPOS, SURFACES, 'CC-BY-NC-ND-4.0')
  assert.equal(fit.repos[0]?.score, 1)
  const scores = fit.repos.map((r) => r.score)
  assert.deepEqual([...scores].sort((a, b) => b - a), scores, 'non-increasing by fit')
  const equals = fit.repos.filter((r) => r.score === 1).map((r) => r.fullName)
  assert.deepEqual(equals, ['host/dead', 'host/log', 'host/prover'], '5000 then 900 then 10 stars among the equally-fitting')
})

test('the receipt folds the verdict, so a permuted input folds the same', () => {
  const a = fitOrg('host', REPOS, SURFACES, 'CC-BY-NC-ND-4.0')
  const b = fitOrg('host', [...REPOS].reverse(), SURFACES, 'CC-BY-NC-ND-4.0')
  assert.equal(a.receipt, b.receipt, 'the order repositories arrived in is not part of the verdict')
  const c = fitOrg('host', REPOS, SURFACES, 'MIT')
  assert.notEqual(a.receipt, c.receipt, 'a changed verdict is a changed receipt')
})

test('reachable counts the hosts some route still reaches — archiving does not remove a host from reach', () => {
  const fit = fitOrg('host', REPOS, SURFACES, 'CC-BY-NC-ND-4.0')
  assert.equal(fit.reachable, 3, 'interop-demo reaches even the archived one')
})

test('a key matches at a word START, so "clean" is not "lean" and "crypto" is still "cryptography"', () => {
  assert.equal(namesKey('compiles to clean javascript output', 'lean'), false, 'the live defect: TypeScript read as a theorem prover')
  assert.equal(namesKey('a lean 4 formalisation', 'lean'), true)
  assert.equal(namesKey('a cryptography library', 'crypto'), true, 'a prefix is the same word')
  assert.equal(namesKey('built for node.js', 'node.js'), true, 'a key with regex metacharacters is matched literally')
  const typescriptish: OutsideRepo = { fullName: 'host/ts', license: 'MIT', archived: false, stars: 1, text: 'compiles to clean javascript' }
  assert.deepEqual(surfacesNamed(typescriptish, SURFACES), [], 'no surface is named by an accident of spelling')
})
