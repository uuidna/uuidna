// SEO tests — the schema.org surface is recomputable and typed from the route: /school is a School, /trials is a
// MathSolver whose SolveMathAction targets the REAL live endpoint, and every other static page stays a plain WebPage.
// The finder folded from the schema.org/School + /MathSolver vocabulary pass (2026-08-16). Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { quantumSeo } from '../index.js'

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

test('quantum SEO: static pages without a richer subject stay plain WebPage — no invented entities', () => {
  for (const route of ['/', '/books', '/games', '/doctrine']) {
    const seo = quantumSeo({ route })
    assert.equal(seo.jsonLd['@type'], 'WebPage')
    assert.equal('mainEntity' in seo.jsonLd, false, `${route} must not claim a mainEntity`)
  }
})

test('quantum SEO: the receipt still folds description — a changed page voice moves the receipt', () => {
  const a = quantumSeo({ route: '/trials', title: 'Trials' })
  const b = quantumSeo({ route: '/trials', title: 'Trials', description: 'another voice' })
  assert.notEqual(a.receipt, b.receipt)
})
