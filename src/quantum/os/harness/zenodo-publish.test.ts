// zenodo-publish — Zenodo DOI minting is WORKFLOW-ONLY (captain, 2026-08-26).
// gen-zenodo regenerates .zenodo.json (metadata). The deposit API lives only in publish.yml.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import {
  zenodoPublishAllowed,
  ZENODO_PUBLISH_WORKFLOW,
  ZENODO_PUBLISH_JOB,
  ZENODO_SEALS_PUBLISH_JOB,
} from '../../../zenodo-publish.js'

const DEPOSIT_API = /zenodo\.org\/api\/deposit/
const PUBLISH_ACTION = /actions\/newversion/

test('local env cannot publish a Zenodo DOI — the gate names the workflow FIX', () => {
  const g = zenodoPublishAllowed({ ...process.env, GITHUB_ACTIONS: undefined, GITHUB_WORKFLOW: undefined, GITHUB_REF: undefined })
  assert.equal(g.ok, false)
  assert.match(g.reason, /WORKFLOW-ONLY|refused outside GitHub Actions/i)
  assert.equal(g.workflowPath, ZENODO_PUBLISH_WORKFLOW)
  assert.match(g.reason, /publish\.yml/)
})

test('a non-publish Actions workflow is refused even when GITHUB_ACTIONS is set', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'wave',
    GITHUB_REF: 'refs/tags/v0.0.0',
  })
  assert.equal(g.ok, false)
  assert.match(g.reason, /not "publish"/)
})

test('publish.yml zenodo on a release tag is allowed', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'publish',
    GITHUB_JOB: 'zenodo',
    GITHUB_REF: 'refs/tags/v0.2.8',
  })
  assert.equal(g.ok, true)
})

test('publish.yml zenodo-seals on a release tag is allowed (agnostic publication loop)', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'publish',
    GITHUB_JOB: ZENODO_SEALS_PUBLISH_JOB,
    GITHUB_REF: 'refs/tags/v0.2.9',
  })
  assert.equal(g.ok, true)
  assert.match(g.reason, /zenodo-seals/)
})

test('publish on a branch ref is refused — deposits are tag-only', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'publish',
    GITHUB_JOB: 'zenodo',
    GITHUB_REF: 'refs/heads/main',
  })
  assert.equal(g.ok, false)
  assert.match(g.reason, /not a release tag/)
})

test('the deposit API appears ONLY in publish.yml', () => {
  const offenders: string[] = []
  const scan = (dir: string, rel: string) => {
    if (!existsSync(dir)) return
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      if (name.name === 'node_modules' || name.name === 'dist' || name.name === '.git') continue
      const p = join(dir, name.name)
      const r = join(rel, name.name)
      if (name.isDirectory()) { scan(p, r); continue }
      if (!/\.(ts|js|mjs|sh|yml|yaml|md)$/.test(name.name)) continue
      if (r === ZENODO_PUBLISH_WORKFLOW) continue
      const text = readFileSync(p, 'utf8')
      if (DEPOSIT_API.test(text) || PUBLISH_ACTION.test(text)) offenders.push(r)
    }
  }
  scan(join(ROOT, 'src'), 'src')
  scan(join(ROOT, '.github', 'workflows'), '.github/workflows')
  assert.deepEqual(offenders, [], 'deposit/publish API must stay in ' + ZENODO_PUBLISH_WORKFLOW + ' only')
})

// ONE DEPOSIT JOB REMAINS, AND THE ARCHIVE IS NOT IT. (the captain, 2026-09-26: "let zenodo mint the doi from github
// release. No need of redundancy".) publish.yml's `zenodo` job deposited the SOFTWARE ARCHIVE by API while the
// GitHub↔Zenodo integration was already minting it from the release — two records per release, six seconds apart,
// seventeen releases deep. The job is gone; `zenodo-seals` stays, because the PUBLICATIONS are different works and a
// source archive does not cover a monograph.
test('publish.yml deposits the publications by API and does NOT deposit the archive', () => {
  const yml = readFileSync(join(ROOT, ZENODO_PUBLISH_WORKFLOW), 'utf8')
  assert.match(yml, new RegExp(`^\\s+${ZENODO_SEALS_PUBLISH_JOB}:`, 'm'), 'the publication seals still deposit by API')
  assert.doesNotMatch(yml, new RegExp(`^\\s+${ZENODO_PUBLISH_JOB}:`, 'm'),
    'and the archive job is gone — Zenodo mints that DOI from the GitHub release')
  assert.match(yml, DEPOSIT_API, 'the seals job still calls the deposit API')
  assert.match(yml, /ZENODO_ACCESS_TOKEN/)
  assert.match(yml, /zenodo\/manifest\.json/)
  assert.doesNotMatch(yml, /\.zenodo\.clay\.json/)
  // the release the integration mints from must still be created, or nothing archives the archive
  assert.match(yml, /gh release create/, 'the GitHub Release is what Zenodo now mints the archive from')
  assert.match(yml, /^\s+verify:/m, 'and `verify` is what proves the record appeared')
})

test('gen-zenodo writes metadata only — it never calls the deposit API', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'gen-zenodo.ts'), 'utf8')
  assert.equal(DEPOSIT_API.test(src), false)
  assert.match(src, /\.zenodo\.json/)
})
