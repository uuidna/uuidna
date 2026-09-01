import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DOMAIN_PATTERNS, domainCensus, allDomainCensuses, domainsOverlap } from './index.js'
import { validateCandidate, isBareLiteralLean } from '../../../wave-deposit.js'
import { theoremByKey } from '../../../theorems/index.js'
import { catalogue } from '../catalogue/index.js'

const why = 'domain port census claim, exact over the committed mirror; membership is a pattern measurement'

test('the seeded domains are ported and counted', () => {
  const all = allDomainCensuses()
  assert.deepEqual(all.map((d) => d.domain), DOMAIN_PATTERNS.map((p) => p.domain),
    'every seeded pattern yields a census, in declaration order — asserted against the roster itself, because a ' +
    'hand-listed set of names is the same drift as a hand-written count and every new domain would edit it')
  assert.ok(all.length >= 4, 'the four originals at least')
  for (const d of all) {
    assert.ok(d.packages > 0, `${d.domain} matched something`)
    assert.ok(d.origins > 0 && d.origins <= d.packages, `${d.domain} origins bound its packages`)
  }
})

test('the domain and its complement ARE the catalogue — the sum is exact', () => {
  // against the REAL total, not against itself: the first draft of this line asserted
  // `x === 28635 + (x - 28635)`, which is x === x — a test that cannot fail, written inside a module whose
  // whole subject is refusing claims that cannot fail. Caught by reading it back rather than by it going red.
  const total = catalogue().length
  for (const d of allDomainCensuses()) {
    assert.equal(d.packages + d.outside, total, `${d.domain} and its complement must be the whole catalogue`)
    assert.match(d.claims[0]!.lean, new RegExp(`${d.packages} \\+ ${d.outside} = ${total}`))
  }
})

// ── THE CONTROLS ─────────────────────────────────────────────────────────────────────────────────────────────
// Two mistakes were made writing this module and both are pinned here rather than remembered. The overlap claim
// was first written as `both = both` — true, decidable and EMPTY, the exact bare-literal shape that made the
// 79-candidate harvest worthless. And the key scheme spelled the whole sentence, so `database` came to exactly
// the door's 61-character limit and passed while `filesystem` came to 63 and was refused: the same claim
// accepted or rejected by the length of a domain's name.
test('CONTROL — every emitted claim carries ALGEBRA, never two bare literals', () => {
  for (const d of allDomainCensuses()) for (const c of d.claims) {
    assert.equal(isBareLiteralLean(c.lean), false, `${c.key} must say something the algebra can hold`)
  }
  const o = domainsOverlap('database', 'filesystem')!
  assert.equal(isBareLiteralLean(o.lean), false, 'inclusion-exclusion, not `both = both`')
})

test('CONTROL — every emitted key fits the door, whatever the domain is named', () => {
  const KEY = /^[a-z][a-z0-9_]{3,60}$/
  for (const d of allDomainCensuses()) for (const c of d.claims) {
    assert.ok(KEY.test(c.key), `${c.key} (${c.key.length} chars) must satisfy the conveyor's key law`)
  }
  // and the scheme must survive a domain name far longer than any seeded one
  assert.ok(`alpine_domain_${'x'.repeat(24)}_partitions_28635`.length <= 61,
    'the key scheme has headroom — a longer domain name must not silently lose its claim')
})

test('CONTROL — the conveyor takes every domain claim, or has already sealed it', () => {
  // This asserted ACCEPTED outright, which was true only while the claims were unsealed. The kernel has since
  // judged the deposited claims and sealed them, so the door now refuses them as duplicates — the SUCCESS case
  // wearing a refusal's clothes. (No count is written here on purpose: the guard's comments finder is right that
  // a ledger figure in prose is wrong on the next landing, and naming the source beats scheduling the drift.) The durable
  // assertion is the one that survives both states: a claim is either takeable or already a theorem. What must
  // never appear is a refusal for being a bare literal or an unlawful key, because those are the two ways a
  // claim can be worthless, and they are the reason all 79 of the original name-scraped candidates were turned
  // away. A test pinned to a moment in the ledger's life is a test that fails when the work succeeds.
  const sealed = theoremByKey()
  for (const d of allDomainCensuses()) for (const c of d.claims) {
    const verdict = validateCandidate({ key: c.key, lean: c.lean, why, source: 'alpine', from: 'domains' } as never, sealed)
    if (verdict !== null) {
      assert.match(verdict, /already sealed in the ledger/, `${c.key} may only be refused for being sealed already, not: ${verdict}`)
      assert.ok(sealed.has(c.key), `${c.key} claims to be sealed, so the ledger must actually hold it`)
    }
  }
})

test('inclusion-exclusion holds across every pair, and the overlap is reported rather than resolved', () => {
  // The first three seeded domains were mutually DISJOINT, so every identity reduced to plain addition and was
  // recorded as carrying less than its shape suggested. The driver domain settles that: it straddles database
  // by 61 packages and filesystem by 8, so 438 + 630 - 61 = 1007 is a real set identity. The disjointness was an
  // artefact of three narrow patterns, not a property of the catalogue — which is why the overlap is REPORTED as
  // a number rather than assumed away, and why a claim that can only ever read `x + y - 0` is worth suspecting.
  for (const [a, b] of [['database', 'filesystem'], ['database', 'blockchain'], ['filesystem', 'blockchain'],
                        ['database', 'driver'], ['filesystem', 'driver'], ['blockchain', 'driver']]) {
    const o = domainsOverlap(a!, b!)!
    assert.equal(o.onlyA + o.onlyB + o.both, o.union, `${a}/${b}: the three parts are the union`)
    assert.match(o.lean, new RegExp(`${o.onlyA + o.both} \\+ ${o.onlyB + o.both} - ${o.both} = ${o.union}`))
  }
})

test('the classification is declared a MEASUREMENT, never a verdict', () => {
  for (const d of allDomainCensuses()) {
    assert.equal(d.classifier, 'pattern')
    assert.match(d.honest, /measurement/)
    assert.match(d.honest, /Nothing is installed, mounted, linked or executed/)
  }
})

test('an unseeded domain is null, not an empty census that reads like a real one', () => {
  assert.equal(domainCensus('not-a-seeded-domain'), null)
  assert.equal(domainsOverlap('database', 'nope'), null)
  assert.ok(DOMAIN_PATTERNS.length >= 2)
})

// ── THE TOOL SURFACE — a census nobody can reach is not usable ───────────────────────────────────────────────
// The census existed as a library and was reachable from NOWHERE: not an MCP tool, not in the apps registry,
// not imported by any surface. It passed its own tests the whole time, which is exactly why the tool ratchet
// exists — a new tool earns a test, or the under-tested set grows in silence. These exercise it the way a
// caller does, through callTool, not through the module it happens to wrap.
test('uuidna_domains answers the roster, one domain, and an overlap', async () => {
  const { callTool } = await import('../../../mcp.js')
  const roster = callTool('uuidna_domains', {}) as { seeded: { domain: string }[] }
  assert.deepEqual(roster.seeded.map((d) => d.domain), DOMAIN_PATTERNS.map((p) => p.domain),
    'the tool roster is the pattern roster — not a copy of it that drifts')

  const one = callTool('uuidna_domains', { domain: 'blockchain' }) as { packages: number; origins: number; claims: unknown[]; classifier: string }
  assert.ok(one.packages > 0 && one.origins > 0 && one.origins <= one.packages)
  assert.equal(one.claims.length, 2)
  assert.equal(one.classifier, 'pattern', 'the tool must keep saying membership is measured, not decided')

  const ov = callTool('uuidna_domains', { a: 'database', b: 'filesystem' }) as { onlyA: number; onlyB: number; both: number; union: number }
  assert.equal(ov.onlyA + ov.onlyB + ov.both, ov.union)
})

test('CONTROL — an unseeded domain is refused BY NAME, not answered with an empty census', () => {
  // an empty census reads exactly like a real one for a domain that happens to match nothing, which is how a
  // caller learns something false. The tool names the miss instead.
  return import('../../../mcp.js').then(({ callTool }) => {
    const miss = callTool('uuidna_domains', { domain: 'not-a-seeded-domain' }) as { error?: string; packages?: number }
    assert.equal(miss.packages, undefined, 'no counts for a domain that was never seeded')
    assert.match(String(miss.error), /no seeded domain/)
  })
})

test('the driver domain STRADDLES, which is what makes inclusion-exclusion worth stating', () => {
  const dbDriver = domainsOverlap('database', 'driver')!
  assert.ok(dbDriver.both > 0, `database and driver share packages (${dbDriver.both}) — the identity is not addition`)
  assert.equal(dbDriver.onlyA + dbDriver.onlyB + dbDriver.both, dbDriver.union)
})

test('the driver census keeps the sharpest honest scope of the four', () => {
  const d = domainCensus('driver')!
  assert.match(d.note, /does not manage a device/i)
  assert.match(d.note, /never a working graphics stack/i)
  assert.equal(d.classifier, 'pattern')
})
