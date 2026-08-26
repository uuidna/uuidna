// zenodo-publish — Zenodo DOI minting is WORKFLOW-ONLY (captain, 2026-08-26).
// gen-zenodo regenerates .zenodo.json (metadata). The deposit API lives only in publish.yml job `zenodo`.
// A local script that could publish would split the standing chain — this suite refuses that class.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  zenodoPublishAllowed,
  ZENODO_PUBLISH_WORKFLOW,
  ZENODO_PUBLISH_JOB,
} from '../zenodo-publish.js'

const DEPOSIT_API = /zenodo\.org\/api\/deposit/
const PUBLISH_ACTION = /actions\/newversion/

test('local env cannot publish a Zenodo DOI — the gate names the workflow FIX', () => {
  const g = zenodoPublishAllowed({ ...process.env, GITHUB_ACTIONS: undefined, GITHUB_WORKFLOW: undefined, GITHUB_REF: undefined })
  assert.equal(g.ok, false)
  assert.match(g.reason, /WORKFLOW-ONLY|refused outside GitHub Actions/i)
  assert.equal(g.workflowPath, ZENODO_PUBLISH_WORKFLOW)
  assert.equal(g.workflowJob, ZENODO_PUBLISH_JOB)
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

test('publish.yml on a release tag is the only allowed gate', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'publish',
    GITHUB_JOB: 'zenodo',
    GITHUB_REF: 'refs/tags/v0.2.8',
  })
  assert.equal(g.ok, true)
  assert.match(g.reason, /allowed/)
})

test('publish.yml zenodo-clay on a release tag is also allowed (clay concept 21781602)', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'publish',
    GITHUB_JOB: 'zenodo-clay',
    GITHUB_REF: 'refs/tags/v0.2.9',
  })
  assert.equal(g.ok, true)
  assert.match(g.reason, /zenodo-clay/)
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

test('publish.yml non-deposit job is refused even on a tag', () => {
  const g = zenodoPublishAllowed({
    GITHUB_ACTIONS: 'true',
    GITHUB_WORKFLOW: 'publish',
    GITHUB_JOB: 'editorial',
    GITHUB_REF: 'refs/tags/v0.2.8',
  })
  assert.equal(g.ok, false)
  assert.match(g.reason, /not a Zenodo deposit job/)
})

test('the deposit API appears ONLY in publish.yml — no local script may curl a DOI', () => {
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
  // package scripts that would mint
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts?: Record<string, string> }
  for (const [k, v] of Object.entries(pkg.scripts ?? {})) {
    if (/zenodo\.org\/api\/deposit|zenodo-deposit --publish|ZENODO_TOKEN/.test(v)) offenders.push(`package.json#scripts.${k}`)
  }
  assert.deepEqual(offenders, [], 'deposit/publish API must stay in ' + ZENODO_PUBLISH_WORKFLOW + ' only')
})

test('publish.yml jobs zenodo and zenodo-clay run the gate before the deposit curl', () => {
  const yml = readFileSync(join(ROOT, ZENODO_PUBLISH_WORKFLOW), 'utf8')
  assert.match(yml, new RegExp(`^\\s+${ZENODO_PUBLISH_JOB}:`, 'm'))
  assert.match(yml, /^\s+zenodo-clay:/m)
  assert.match(yml, /zenodo-deposit/)
  assert.match(yml, DEPOSIT_API)
  assert.match(yml, /ZENODO_ACCESS_TOKEN/)
  assert.match(yml, /CONCEPT_RECORD: "21781603"/)
  assert.match(yml, /CONCEPT_CHAIN: "21781602"/)
  assert.match(yml, /\.zenodo\.clay\.json/)
})

test('gen-zenodo writes metadata only — it never calls the deposit API', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'gen-zenodo.ts'), 'utf8')
  assert.equal(DEPOSIT_API.test(src), false)
  assert.equal(PUBLISH_ACTION.test(src), false)
  assert.match(src, /\.zenodo\.json/)
})

test('gen-zenodo-clay writes clay metadata only — it never calls the deposit API', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'gen-zenodo-clay.ts'), 'utf8')
  assert.equal(DEPOSIT_API.test(src), false)
  assert.equal(PUBLISH_ACTION.test(src), false)
  assert.match(src, /\.zenodo\.clay\.json/)
  assert.match(src, /21781603|21781602/)
})
