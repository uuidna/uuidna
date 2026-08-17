// SEO tests — the schema.org surface is recomputable and typed from the route: /school is a School, /trials is a
// MathSolver whose SolveMathAction targets the REAL live endpoint, and every other static page stays a plain WebPage.
// The finder folded from the schema.org/School + /MathSolver vocabulary pass (2026-08-16). Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { quantumSeo, theorems, publications } from '../index.js'

// ── THE NAMING AUDIT — the finder, folded ─────────────────────────────────────────────────────────────────────────
// Every @type and property the SEO surface emits must be VETTED schema.org vocabulary, recorded here with its
// schema.org URL. Add a new name to seo.ts without vetting it here and this audit fails — naming compliance is a
// gate, not a one-time hand check. (The name lesson: a name is not its proof; here a name is not schema.org until
// the vocabulary says so.)
const SCHEMA_ORG_TYPES: Record<string, string> = {
  ScholarlyArticle: 'https://schema.org/ScholarlyArticle',
  WebPage: 'https://schema.org/WebPage',
  WebSite: 'https://schema.org/WebSite',
  Dataset: 'https://schema.org/Dataset',
  Organization: 'https://schema.org/Organization',
  Person: 'https://schema.org/Person',
  School: 'https://schema.org/School',
  MathSolver: 'https://schema.org/MathSolver',
  SolveMathAction: 'https://schema.org/SolveMathAction',
  EntryPoint: 'https://schema.org/EntryPoint',
  Course: 'https://schema.org/Course',
}
const SCHEMA_ORG_PROPERTIES: Record<string, string> = {
  name: 'https://schema.org/name',
  headline: 'https://schema.org/headline',
  abstract: 'https://schema.org/abstract',
  identifier: 'https://schema.org/identifier',
  url: 'https://schema.org/url',
  keywords: 'https://schema.org/keywords',
  isBasedOn: 'https://schema.org/isBasedOn',
  creativeWorkStatus: 'https://schema.org/creativeWorkStatus',
  isPartOf: 'https://schema.org/isPartOf',
  publisher: 'https://schema.org/publisher',
  mainEntity: 'https://schema.org/mainEntity',
  description: 'https://schema.org/description',
  mathExpression: 'https://schema.org/mathExpression',
  potentialAction: 'https://schema.org/potentialAction',
  target: 'https://schema.org/target',
  urlTemplate: 'https://schema.org/urlTemplate',
  httpMethod: 'https://schema.org/httpMethod',
  contentType: 'https://schema.org/contentType',
  isAccessibleForFree: 'https://schema.org/isAccessibleForFree',
  provider: 'https://schema.org/provider',
  license: 'https://schema.org/license',
  copyrightYear: 'https://schema.org/copyrightYear',
  creditText: 'https://schema.org/creditText',
  copyrightHolder: 'https://schema.org/copyrightHolder',
}

// Walk a JSON-LD node: every nested @type must be a vetted type, every key a vetted property.
function auditNode(node: unknown, where: string, failures: string[]): void {
  if (Array.isArray(node)) { node.forEach((n, i) => auditNode(n, `${where}[${i}]`, failures)); return }
  if (!node || typeof node !== 'object') return
  const rec = node as Record<string, unknown>
  const type = rec['@type']
  if (typeof type === 'string' && !(type in SCHEMA_ORG_TYPES)) failures.push(`${where}: unvetted @type "${type}"`)
  for (const [k, v] of Object.entries(rec)) {
    if (k === '@context' || k === '@type') continue
    if (!(k in SCHEMA_ORG_PROPERTIES)) failures.push(`${where}: unvetted property "${k}"`)
    auditNode(v, `${where}.${k}`, failures)
  }
}

test('schema.org naming audit — every emitted @type and property across the WHOLE surface is vetted vocabulary', () => {
  const failures: string[] = []
  const routes = readdirSync(join(ROOT, 'docs'), { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => (e.name === 'index.md' ? '/' : '/' + e.name.replace(/\.md$/, '')))
  for (const route of routes) auditNode(quantumSeo({ route }).jsonLd, `page ${route}`, failures)
  for (const t of theorems()) auditNode(quantumSeo({ key: t.key }).jsonLd, `theorem ${t.key}`, failures)
  for (const p of publications()) auditNode(quantumSeo({ slug: p.slug }).jsonLd, `publication ${p.slug}`, failures)
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
