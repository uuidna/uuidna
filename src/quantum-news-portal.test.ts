import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildNewsPortal, extractFactsFromArticle, auditFactAgainstLedger, renderPortalSummary } from './index.js'
import { buildPoliticsPortal } from './index.js'

test('quantum-news-portal: extracts facts from articles', () => {
  const article = {
    title: 'Senate Votes on Bill',
    body: 'Bill ABC-123 passed with 60 to 40 votes. The 2024 election is approaching.',
    source: 'news.example.com',
    domain: 'politics' as const,
    date: '2026-08-14'
  }

  const facts = extractFactsFromArticle(article)
  assert.ok(facts.length > 0, 'should extract at least one fact')
  assert.ok(facts.some(f => f.type === 'number' || f.type === 'date'), 'should extract facts')
})

test('quantum-news-portal: audits facts against ledger', () => {
  const article = {
    title: 'Climate Report',
    body: 'Temperature rose to 25.5°C. CO2 levels reached 420 ppm.',
    source: 'climate.example.com',
    domain: 'climate' as const,
    date: '2026-08-14'
  }

  const facts = extractFactsFromArticle(article)
  const judgments = facts.map((f) => auditFactAgainstLedger(f))

  assert.ok(judgments.length > 0, 'should produce judgments')
  judgments.forEach((j) => {
    assert.ok(['provable', 'open', 'overclaimed', 'narrative_gap'].includes(j.status),
      `status should be one of the four categories, got ${j.status}`)
  })
})

test('quantum-news-portal: builds a domain portal', () => {
  const articles = [
    {
      title: 'Senate Election 2024',
      body: '2024 election saw record turnout. Bill XYZ passed with 65 to 35 votes.',
      source: 'politics.example.com',
      domain: 'politics' as const,
      date: '2026-08-14'
    },
    {
      title: 'Budget Vote',
      body: 'Budget bill passed with 51 to 49 votes. 2025 budget of $10 trillion approved.',
      source: 'politics.example.com',
      domain: 'politics' as const,
      date: '2026-08-14'
    }
  ]

  const portal = buildPoliticsPortal(articles)

  assert.equal(portal.domain, 'politics', 'portal domain should be politics')
  assert.equal(portal.articles.length, 2, 'portal should have 2 articles')
  assert.ok(portal.judgments.length > 0, 'portal should have judgments')
  assert.ok(portal.receipt, 'portal should have a receipt')
})

test('quantum-news-portal: renders summary', () => {
  const article = {
    title: 'Test Article',
    body: 'Date: 2026-08-14. Count: 42. Another fact.',
    source: 'test.example.com',
    domain: 'medicine' as const,
    date: '2026-08-14'
  }

  const portal = buildNewsPortal('medicine', [article])
  const summary = renderPortalSummary(portal)

  const totalJudgments = summary.provable + summary.open + summary.overclaimed + summary.narrativeGap
  assert.equal(totalJudgments, portal.judgments.length,
    'summary counts should sum to total judgments')
  assert.ok(summary.receipt, 'summary should have a receipt')
})

test('quantum-news-portal: produces order-invariant receipts', () => {
  const articles1 = [
    {
      title: 'Article 1',
      body: 'Fact A: 2026-01-01. Fact B: 42%.',
      source: 'test.com',
      domain: 'economics' as const,
      date: '2026-08-14'
    }
  ]

  const articles2 = [
    {
      title: 'Article 1',
      body: 'Fact B: 42%. Fact A: 2026-01-01.',
      source: 'test.com',
      domain: 'economics' as const,
      date: '2026-08-14'
    }
  ]

  const portal1 = buildNewsPortal('economics', articles1)
  const portal2 = buildNewsPortal('economics', articles2)

  assert.equal(portal1.receipt, portal2.receipt,
    'receipts should be order-invariant')
})
