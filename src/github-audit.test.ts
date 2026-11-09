// A disabled feature and a missing permission return the same empty answer if read carelessly; these tests show the
// audit telling them apart, with a fake GitHub that answers exactly as the live API did on 2026-11-09.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditRepo, githubAudit, type Api } from './github-audit.js'

const fake = (answers: Record<string, unknown>): Api => (path) => {
  const hit = Object.keys(answers).find((k) => path.includes(k))
  return hit ? answers[hit] : []
}

test('github-audit: a disabled alert feature is a finding, a refused read is unread, an empty list is clean', async () => {
  const r = await auditRepo('uuidna', 'payload', 'private', 'main', fake({
    '/dependabot/': { error: 'Dependabot alerts are disabled for this repository.' },
    '/code-scanning/': { error: 'Resource not accessible by integration' },
    '/secret-scanning/': [],
    '/protection': { error: 'Branch not protected' },
    '/actions/runs': { workflow_runs: [
      { workflow_id: 1, path: '.github/workflows/deploy.yml', name: 'Land: a', conclusion: 'failure' },
      { workflow_id: 1, path: '.github/workflows/deploy.yml', name: 'Land: b', conclusion: 'success' },
      { workflow_id: 2, path: '.github/workflows/next.yml', name: 'next', conclusion: 'success' },
    ] },
  }))
  const by = Object.fromEntries(r.checks.map((c) => [c.name, c]))
  assert.equal(by['Dependabot alerts']!.ok, false)
  assert.equal(by['Dependabot alerts']!.unread, undefined, 'disabled is a finding, not unread')
  assert.equal(by['code scanning']!.unread, true, 'a refused read is unread')
  assert.equal(by['secret scanning']!.ok, true)
  assert.match(by['branch protection']!.measured, /main is not protected/)
  // the newest run of each workflow decides, keyed by workflow_id though every run carries its own name
  assert.deepEqual(by['workflows on the default branch']!.items, ['.github/workflows/deploy.yml'])
  assert.match(by['workflows on the default branch']!.measured, /1 of 2 failing/)
})

test('github-audit: protection the plan does not offer is a finding, not unread', async () => {
  const r = await auditRepo('uuidna', 'verify', 'private', 'main', fake({ '/protection': { error: 'Upgrade to GitHub Pro or make this repository public to enable this feature.' } }))
  const p = r.checks.find((c) => c.name === 'branch protection')!
  assert.equal(p.unread, undefined)
  assert.match(p.measured, /cannot be protected on the current plan/)
})

test('github-audit: issues exclude pull requests, and alerts are tallied largest first', async () => {
  const r = await auditRepo('uuidna', 'uuidna', 'public', 'main', fake({
    '/issues': [{ number: 2, title: 'b' }, { number: 1, title: 'a' }, { number: 3, title: 'pr', pull_request: {} }],
    '/dependabot/': [
      { security_advisory: { severity: 'high' }, dependency: { package: { name: 'x' } } },
      { security_advisory: { severity: 'low' }, dependency: { package: { name: 'y' } } },
      { security_advisory: { severity: 'high' }, dependency: { package: { name: 'x' } } },
    ],
  }))
  const by = Object.fromEntries(r.checks.map((c) => [c.name, c]))
  assert.deepEqual(by['issues']!.items, ['#1 a', '#2 b'])
  assert.deepEqual(by['Dependabot alerts']!.items, ['2 × high x', '1 × low y'])
})

test('github-audit: repositories are audited in name order, and the totals add up', async () => {
  const a = await githubAudit('uuidna', [{ name: 'b', visibility: 'public', branch: 'main' }, { name: 'a', visibility: 'public', branch: 'main' }], fake({}))
  assert.deepEqual(a.repos.map((r) => r.repo), ['a', 'b'])
  assert.equal(a.checked, 14)
  assert.equal(a.failed + a.unread + a.repos.flatMap((r) => r.checks).filter((c) => c.ok).length, a.checked)
})
