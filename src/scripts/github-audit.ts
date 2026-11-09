#!/usr/bin/env node
// github-audit — the boundary half: asks GitHub through `gh api` and writes lean/github-audit.json, which
// api-leads.ts reads so every finding holds a release. The law lives in src/github-audit.ts.
//
// The owner is the first argument (default uuidna). `gh` reads GH_TOKEN; the workflow's own token reads only its
// repository, so the other repositories answer as unread until a token that may read them is set — unread is
// written down, never dropped.
//
// EXIT CODES MATCH release-live: 0 written with nothing failing, 1 written with findings, 2 nothing could be read.
import { execFileSync } from 'node:child_process'
import { githubAudit, type ApiAnswer } from '../github-audit.js'
import { wrArtifact } from '../artifact.js'

const owner = process.argv.slice(2).find((a) => !a.startsWith('-')) ?? 'uuidna'

const gh = (path: string): ApiAnswer => {
  try {
    return JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 })) as unknown
  } catch (e) {
    const out = String((e as { stdout?: unknown }).stdout ?? '')
    try { return { error: String((JSON.parse(out) as { message?: unknown }).message ?? out) } } catch { const x = e as { stderr?: unknown; message?: unknown }; return { error: String(x.stderr ?? '').trim() || String(x.message ?? e).trim() || 'gh api failed' } }
  }
}

const listed = gh(`orgs/${owner}/repos?per_page=100&type=all`)
if (!Array.isArray(listed)) {
  console.error(`github-audit — the repositories of ${owner} were not listed: ${JSON.stringify(listed)}`)
  process.exit(2)
}
const repos = (listed as { name: string; private: boolean; archived: boolean; default_branch: string }[])
  .filter((r) => !r.archived)
  .map((r) => ({ name: r.name, visibility: r.private ? 'private' : 'public', branch: r.default_branch }))

const audit = await githubAudit(owner, repos, gh)
const seal = wrArtifact('lean/github-audit.json', audit)

console.log(`github-audit — ${owner}: ${repos.length} repositories, ${audit.checked} checks\n`)
for (const r of audit.repos) {
  console.log(`  ${r.repo} (${r.visibility}, ${r.branch})`)
  for (const c of r.checks) console.log(`    ${c.unread ? '·' : c.ok ? '✓' : '✗'} ${c.name}: ${c.measured}`)
}
console.log(`\n  ${audit.failed} failing · ${audit.unread} unread · written lean/github-audit.json · receipt ${JSON.stringify(seal)}`)
process.exit(audit.checked === audit.unread ? 2 : audit.failed ? 1 : 0)
