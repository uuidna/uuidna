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
