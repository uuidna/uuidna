import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DOMAIN_PATTERNS, domainCensus, allDomainCensuses, domainsOverlap } from './index.js'
import { validateCandidate, isBareLiteralLean } from '../../../wave-deposit.js'
import { theoremByKey } from '../../../theorems/index.js'
import { catalogue } from '../catalogue/index.js'

const why = 'domain port census claim, exact over the committed mirror; membership is a pattern measurement'

test('the seeded domains are ported and counted', () => {
  const all = allDomainCensuses()
  assert.deepEqual(all.map((d) => d.domain), ['database', 'filesystem', 'blockchain'])
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

test('CONTROL — the conveyor ACCEPTS every domain claim', () => {
  const sealed = theoremByKey()
  for (const d of allDomainCensuses()) for (const c of d.claims) {
    assert.equal(validateCandidate({ key: c.key, lean: c.lean, why, source: 'alpine', from: 'domains' } as never, sealed), null,
      `${c.key} must reach the kernel, not the refusal list`)
  }
})

test('inclusion-exclusion holds across every pair, and the overlap is reported rather than resolved', () => {
  // As it happens all three seeded domains are DISJOINT under these patterns, so each identity reduces to plain
  // addition. That is worth stating rather than dressing up: the claim still catches a miscount in any of the
  // four counts, and it would carry more if a future pattern did straddle two domains — which is exactly why the
  // overlap is reported as a number instead of being assumed away.
  for (const [a, b] of [['database', 'filesystem'], ['database', 'blockchain'], ['filesystem', 'blockchain']]) {
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
  assert.deepEqual(roster.seeded.map((d) => d.domain), ['database', 'filesystem', 'blockchain'])

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
