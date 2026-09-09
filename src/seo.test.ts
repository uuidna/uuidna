// SEO tests — the schema.org surface is recomputable and typed from the route: /school is a School, /trials is a
// MathSolver whose SolveMathAction targets the REAL live endpoint, and every other static page stays a plain WebPage.
// The finder folded from the schema.org/School + /MathSolver vocabulary pass (2026-08-16). Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { quantumSeo, theorems, publications } from './index.js'
import { handleOf, handleBirthdayPoint, uniqueHandleRouteMap } from './handle.js'
import { auditJsonLd } from './schema-org-vocab.js'

// ── THE NAMING AUDIT — the finder, folded ─────────────────────────────────────────────────────────────────────────
// Every @type and property the SEO surface emits must be VETTED schema.org vocabulary. The vetted list and the
// walk itself now live in schema-org-vocab.ts — shared with gen-feed.ts's own audit — so this project has ONE
// vocabulary list, not one private copy per file that happens to emit JSON-LD. (The name lesson: a name is not
// its proof; here a name is not schema.org until the vocabulary says so.)

test('schema.org naming audit — every emitted @type and property across the WHOLE surface is vetted vocabulary', () => {
  const failures: string[] = []
  const routes = readdirSync(join(ROOT, 'docs'), { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => (e.name === 'index.md' ? '/' : '/' + e.name.replace(/\.md$/, '')))
  for (const route of routes) auditJsonLd(quantumSeo({ route }).jsonLd, `page ${route}`, failures)
  for (const t of theorems()) auditJsonLd(quantumSeo({ key: t.key }).jsonLd, `theorem ${t.key}`, failures)
  for (const p of publications()) auditJsonLd(quantumSeo({ slug: p.slug }).jsonLd, `publication ${p.slug}`, failures)
  assert.deepEqual(failures, [], 'unvetted schema.org naming — vet the name (with its schema.org URL) or fix the emission')
})

test('quantum SEO: /school is a WebPage whose mainEntity is a schema.org School', () => {
  const seo = quantumSeo({ route: '/school', title: 'The quantum school' })
  assert.equal(seo.jsonLd['@type'], 'WebPage')
  const entity = seo.jsonLd['mainEntity'] as Record<string, unknown>
  assert.equal(entity['@type'], 'School')
  assert.equal(entity['name'], 'The quantum school')
  assert.equal(entity['url'], 'https://uuidna.com/school')
  assert.equal(entity['identifier'], seo.address)
})

test('quantum SEO: /trials is a MathSolver whose SolveMathAction targets the live endpoint', () => {
  const seo = quantumSeo({ route: '/trials', title: 'Trials' })
  const entity = seo.jsonLd['mainEntity'] as Record<string, unknown>
  assert.equal(entity['@type'], 'MathSolver')
  assert.equal(typeof entity['mathExpression'], 'string')
  const action = entity['potentialAction'] as Record<string, unknown>
  assert.equal(action['@type'], 'SolveMathAction')
  const target = action['target'] as Record<string, unknown>
  assert.deepEqual(
    { url: target['urlTemplate'], method: target['httpMethod'], type: target['contentType'] },
    { url: 'https://uuidna.com/trials', method: 'POST', type: 'application/json' },
  )
})

test('quantum SEO: a page frontmatter description flows into the entity — one voice, no second copy', () => {
  const description = 'How the uuidna trial works — one answer for any statement, VERIFIED or UNVERIFIED.'
  const seo = quantumSeo({ route: '/trials', title: 'Trials', description })
  assert.equal(seo.description, description)
  const entity = seo.jsonLd['mainEntity'] as Record<string, unknown>
  assert.equal(entity['description'], description)
})

test('quantum SEO: /theorems is the SAME Dataset node every theorem cites as isPartOf — the graph closes', () => {
  const page = quantumSeo({ route: '/theorems', title: 'Theorems' })
  const entity = page.jsonLd['mainEntity'] as Record<string, unknown>
  assert.equal(entity['@type'], 'Dataset')
  const theorem = quantumSeo({ key: 'two_coins' })
  assert.equal(theorem.jsonLd['@type'], 'ScholarlyArticle')
  const isPartOf = theorem.jsonLd['isPartOf'] as Record<string, unknown>
  assert.equal(isPartOf['@type'], 'Dataset')
  assert.equal(isPartOf['name'], entity['name'])
  assert.equal(isPartOf['url'], entity['url'])
})

// Each computational Lean line indexed as its own computable JSON-LD node: @id is the line's content-uuid
// (RFC 4122 urn:uuid:), distinct from `identifier` (the proposition's content-uuid, key+statement) — two
// different addresses for two different questions.
test('quantum SEO: every theorem carries its own line-content @id, distinct from its proposition identifier', () => {
  const t = theorems()[0]
  const seo = quantumSeo({ key: t.key })
  assert.equal(seo.jsonLd['@id'], `urn:uuid:${t.lineAddress}`)
  assert.equal(seo.jsonLd['identifier'], t.address)
  assert.notEqual(t.lineAddress, t.address, 'the line address and the proposition address must differ — two different questions')
  // deterministic and recomputable: same key, same line, same @id, every time
  const again = quantumSeo({ key: t.key })
  assert.equal(again.jsonLd['@id'], seo.jsonLd['@id'])
  // every theorem gets a DISTINCT line address — no two Lean lines collide
  const all = theorems()
  const lineAddresses = new Set(all.map((x) => x.lineAddress))
  assert.equal(lineAddresses.size, all.length, 'every theorem\'s lineAddress must be distinct — a collision would mean two different Lean lines hashed the same')
})

// The FULL address being distinct (checked above, and by guard.js's own no-address-collision) does NOT guarantee
// the TRUNCATED 8-hex-char handle stays distinct too — that's the real pigeonhole risk (editor.ts's own handle
// convention: "the first segment (8 hex) you CITE"; Handle.vue renders exactly this truncation for citation).
// Below the birthday point a collision would silently point a reader at the wrong proof. Past it (HexSpan filled
// 2^16, the rest of the tree sits on top) truncated collisions are the capacity speaking — theorem
// message_carries_address — and uniqueHandleRouteMap omits those doors so the worker never unique-routes them.
test('theorem handle citation shorthand: full addresses stay distinct; truncated collisions are omitted from unique routing', () => {
  const all = theorems()
  const bound = handleBirthdayPoint()
  assert.equal(new Set(all.map((t) => t.address)).size, all.length, 'full proposition addresses stay distinct')
  assert.equal(new Set(all.map((t) => t.lineAddress)).size, all.length, 'full line addresses stay distinct')
  const entries = all.map((t) => ({
    route: `/theorem/${t.key}`,
    kind: 'theorem' as const,
    identity: t.key,
    canonical: `https://uuidna.com/theorem/${t.key}`,
    address: t.address,
    handle: handleOf(t.address),
    hexbitDoor: `https://uuidna.com/${handleOf(t.address)}`,
  }))
  const { routes, collisions } = uniqueHandleRouteMap(entries)
  for (const c of collisions) {
    assert.equal(c.routes.length >= 2, true, `${c.handle} must name at least two editorial routes`)
    assert.equal(routes[c.handle], undefined, `colliding door ${c.handle} must be omitted from unique routing`)
  }
  if (all.length < bound) {
    assert.equal(collisions.length, 0, `address-handle collision among ${all.length} theorems below birthday ${bound}`)
  }
})

test('quantum SEO: /quantum-cryptography is a free Course provided by the School node', () => {
  const seo = quantumSeo({ route: '/quantum-cryptography', title: 'Quantum Cryptography' })
  const entity = seo.jsonLd['mainEntity'] as Record<string, unknown>
  assert.equal(entity['@type'], 'Course')
  assert.equal(entity['isAccessibleForFree'], true)
  const provider = entity['provider'] as Record<string, unknown>
  assert.equal(provider['@type'], 'School')
  assert.equal(provider['url'], 'https://uuidna.com/school')
  const school = quantumSeo({ route: '/school' }).jsonLd['mainEntity'] as Record<string, unknown>
  assert.equal(provider['name'], school['name'])
})

test('quantum SEO: strict means refusing too — the law pages stay WebPage, no legal types anywhere', () => {
  for (const route of ['/', '/books', '/games', '/doctrine', '/justice']) {
    const seo = quantumSeo({ route })
    assert.equal(seo.jsonLd['@type'], 'WebPage')
    assert.equal('mainEntity' in seo.jsonLd, false, `${route} must not claim a mainEntity`)
    const flat = JSON.stringify(seo.jsonLd)
    for (const banned of ['Legislation', 'LegalService', 'Courthouse', 'GovernmentOrganization'])
      assert.equal(flat.includes(banned), false, `${route} must not claim ${banned}`)
  }
})

test('quantum SEO: the receipt still folds description — a changed page voice moves the receipt', () => {
  const a = quantumSeo({ route: '/trials', title: 'Trials' })
  const b = quantumSeo({ route: '/trials', title: 'Trials', description: 'another voice' })
  assert.notEqual(a.receipt, b.receipt)
})
