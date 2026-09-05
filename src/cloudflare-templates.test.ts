import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { cloudflareTemplates, coverageOf, templateCensus, templatesFor, BINDING_FIT, TEMPLATE_MIRROR } from './cloudflare-templates.js'
import { callTool, MCP_CATALOG as MCP_SERVED } from './mcp.js'

test('the mirror is read, and a row carries what the template declares', () => {
  const ts = cloudflareTemplates()
  assert.ok(ts.length > 30, `the mirror must hold the real template set: ${ts.length}`)
  for (const t of ts) {
    assert.match(t.template, /^[a-z0-9-]+$/)
    assert.ok(t.main.length > 0)
    assert.ok(!t.bindings.includes(''), `${t.template}: an empty binding name is a parse fault`)
  }
})

// THE E2E CONFIG DESCRIBES THE TEST HARNESS, NOT THE TEMPLATE, and letting it win cost a real binding: six
// templates ship a wrangler.e2e.* alongside the real config, and the first harvest kept whichever filename
// collapsed last — which lost Workers AI from text-to-image-template entirely and reported it as a template
// with no bindings at all. This holds the exclusion by naming the row that exposed it.
test('text-to-image-template declares Workers AI — the binding the e2e config hid', () => {
  const t = cloudflareTemplates().find((x) => x.template === 'text-to-image-template')
  assert.ok(t, 'the template must be in the mirror')
  assert.ok(t.bindings.includes('Workers AI'),
    `it declares ai in its own wrangler config; got ${JSON.stringify(t.bindings)}`)
  assert.ok(readFileSync(join(ROOT, TEMPLATE_MIRROR), 'utf8').includes('wrangler.e2e'),
    'the mirror must record WHY the e2e configs are excluded, or the next harvest repeats the fault')
})

test('every binding any template declares is mapped — an unmapped binding is a gap, not a silence', () => {
  const c = templateCensus()
  assert.deepEqual(c.unmapped, [],
    'a template declaring a binding this map has never heard of gets no answer and must be named')
  assert.equal(c.bindings, c.byBinding.length)
  for (const b of c.byBinding) assert.ok(b.templates > 0 && b.mapped)
})

// TWO BINDINGS MAP TO NOTHING ON PURPOSE. That is the honest answer for vars and mTLS, and it has to be
// DECLARED rather than omitted: an absent row reads like an oversight, and this tree treats a silent absence
// as worse than a stated boundary.
test('the bindings uuidna adds nothing to are declared, not omitted', () => {
  for (const b of ['Vars', 'mTLS']) {
    const fit = BINDING_FIT[b]
    assert.ok(fit, `${b} must have an entry`)
    assert.deepEqual(fit.symbols, [], `${b} must offer no symbols`)
    assert.ok(fit.offers.length > 20, `${b} must SAY that it offers nothing and why`)
    assert.match(fit.offers, /nothing/i)
  }
  const neutral = cloudflareTemplates().map(coverageOf).filter((c) => c.neutral.length > 0)
  assert.ok(neutral.length > 0, 'if nothing is neutral, the honest-nothing rows have stopped being reachable')
})

test('every fit that claims symbols names an importable path for them', () => {
  for (const [binding, fit] of Object.entries(BINDING_FIT)) {
    if (fit.symbols.length === 0) { assert.equal(fit.from, ''); continue }
    assert.match(fit.from, /^@uuidna\/uuidna/, `${binding}: a symbol with no import path cannot be used`)
    assert.ok(fit.offers.length > 40, `${binding}: state what it offers, not a label`)
  }
})

test('coverage is DERIVED from the bindings — the same bindings give the same answer', () => {
  const globe = cloudflareTemplates().find((t) => t.template === 'multiplayer-globe-template')!
  const c = coverageOf(globe)
  assert.ok(globe.bindings.includes('Durable Objects'), 'the template the captain named uses a Durable Object')
  assert.equal(c.fitted.length + c.neutral.length + c.unmapped.length, globe.bindings.length,
    'every declared binding must land in exactly one of the three')
  assert.deepEqual(coverageOf(globe), c, 'the answer is a function of the row alone')
})

test('templatesFor matches WHOLE words, and drops a word that matches EVERYTHING', () => {
  assert.deepEqual(templatesFor('globe').map((t) => t.template), ['multiplayer-globe-template'])
  assert.equal(templatesFor('').length, 0)
  assert.equal(templatesFor('zzz-no-such-idea').length, 0)
  assert.ok(templatesFor('d1').length >= 2, 'a binding name is a searchable word')
  // EVERY row is named `*-template`, so the word carries no information and must not return the catalogue.
  // It did: "zzz-not-a-template" matched all 36 through its last word and was answered instead of refused.
  assert.equal(templatesFor('template').length, 0, 'a word every template shares tells the caller nothing')
  assert.equal(templatesFor('zzz-not-a-template').length, 0, 'and it must not smuggle a match in either')
  assert.ok(templatesFor('chat').length >= 2 && templatesFor('chat').length < 10, 'an informative word narrows')
})

test('uuidna_cloudflare serves the census, one template, and an idea — through ONE field', () => {
  const census = callTool('uuidna_cloudflare') as { templates: number; e2eWorkers: number; unmapped: string[]; honest: string }
  assert.ok(census.templates > 30)
  assert.equal(census.e2eWorkers, 6, 'the e2e workers are reported, not silently dropped')
  assert.deepEqual(census.unmapped, [])
  assert.match(census.honest, /replaces no binding/i)
  assert.match(census.honest, /not a Cloudflare product/i)
  const one = callTool('uuidna_cloudflare', { q: 'd1-template' }) as { bindings: string[] }
  assert.ok(one.bindings.includes('D1'), 'an exact template name opens that template')
  const idea = callTool('uuidna_cloudflare', { q: 'globe' }) as { matches: { template: string }[] }
  assert.deepEqual(idea.matches.map((m) => m.template), ['multiplayer-globe-template'], 'words match by whole word')
  const bad = callTool('uuidna_cloudflare', { q: 'zzz-not-a-template' }) as { refused?: string }
  assert.match(bad.refused ?? '', /neither a template/, 'an unknown q is refused by name, never answered emptily')
})

// THE DISCLAIMER HAS TO SURVIVE THE WIRE. Descriptions are clipped for the served catalogue — the first
// sentence plus the Returns clause — so a caveat placed later in the text is elided before any client reads it.
// This tool's first version put "not a Cloudflare product and replaces no binding" in the middle, and the
// served description was the headline and the return shape with the honesty cut out of the gap between them.
test('the served description carries the disclaimer, not just the headline', () => {
  const t = (callTool('uuidna_mcp_benchmark') as unknown) // touch the catalogue so it is built
  void t
  const served = MCP_SERVED.find((x) => x.name === 'uuidna_cloudflare')
  assert.ok(served, 'the tool must be in the served catalogue')
  assert.match(served.description, /replaces no binding/i,
    'a caveat that does not survive clipping is a caveat nobody is shown')
  assert.match(served.description, /not a Cloudflare product/i)
})
