// github-audit — ASK GITHUB WHAT IT HOLDS AGAINST EVERY REPOSITORY OF THE OWNER.
//
// (the captain, 2026-11-09: "automate github audits like issues PR and whatever gh allows")
//
// Every other gate reads this filesystem; an open issue, a pull request nobody reviewed, a code-scanning alert, a
// workflow that fails on the default branch and an unprotected main all live on GitHub, where no local read reaches.
// Measured before this was written (2026-11-09, uuidna/*): qpu 100+ open code-scanning alerts, uuidna 22 Dependabot
// alerts, 12 failing workflows across 6 repositories, 6 of 7 default branches unprotected, and no door that asked.
//
// THE API IS INJECTED so the law is tested with no network: `api(path)` returns the parsed answer, or `{ error }`
// with GitHub's own message. A feature GitHub reports as disabled ("Dependabot alerts are disabled", "Advanced
// Security must be enabled", "no analysis found") is a FINDING, never an empty list: a repository that does not look
// for alerts and a repository with none return the same zero. Any other error is UNREAD, and unread is not clean.
//
// NO TIMESTAMP is written, for the reason api-leads.ts gives: the artefact must regenerate byte for byte.

export type ApiAnswer = unknown | { error: string }
export type Api = (path: string) => ApiAnswer | Promise<ApiAnswer>
export type AuditCheck = {
  name: string
  ok: boolean
  unread?: boolean
  measured: string
  why: string
  items?: readonly string[]
}
export type RepoAudit = { repo: string; visibility: string; branch: string; checks: AuditCheck[] }
export type GithubAudit = { owner: string; repos: RepoAudit[]; checked: number; failed: number; unread: number }

const isError = (a: ApiAnswer): a is { error: string } => typeof a === 'object' && a !== null && typeof (a as { error?: unknown }).error === 'string'
const list = (a: ApiAnswer): Record<string, unknown>[] => (Array.isArray(a) ? (a as Record<string, unknown>[]) : [])
const DISABLED = /disabled|must be enabled|no analysis found|not enabled/i

// the counts grouped by one key, largest first, ties by name, so the artefact is stable
const tally = (rows: readonly Record<string, unknown>[], key: (r: Record<string, unknown>) => string): string[] => {
  const n = new Map<string, number>()
  for (const r of rows) n.set(key(r), (n.get(key(r)) ?? 0) + 1)
  return [...n].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([k, c]) => `${c} × ${k}`)
}

const alertCheck = (name: string, answer: ApiAnswer, key: (r: Record<string, unknown>) => string, cure: string): AuditCheck => {
  if (isError(answer)) {
    return DISABLED.test(answer.error)
      ? { name, ok: false, measured: answer.error, why: `turn ${name} on for this repository, or record why it stays off` }
      : { name, ok: false, unread: true, measured: answer.error, why: 'GitHub did not answer this question, so nothing was learned; re-run with a token that may read it' }
  }
  const rows = list(answer)
  return rows.length === 0
    ? { name, ok: true, measured: 'no open alerts', why: '' }
    : { name, ok: false, measured: `${rows.length} open`, why: cure, items: tally(rows, key) }
}

export const auditRepo = async (owner: string, repo: string, visibility: string, branch: string, api: Api): Promise<RepoAudit> => {
  const at = `repos/${owner}/${repo}`
  const [issues, pulls, dependabot, codeScanning, secretScanning, runs, protection] = await Promise.all([
    api(`${at}/issues?state=open&per_page=100`),
    api(`${at}/pulls?state=open&per_page=100`),
    api(`${at}/dependabot/alerts?state=open&per_page=100`),
    api(`${at}/code-scanning/alerts?state=open&per_page=100`),
    api(`${at}/secret-scanning/alerts?state=open&per_page=100`),
    api(`${at}/actions/runs?branch=${branch}&per_page=100`),
    api(`${at}/branches/${branch}/protection`),
  ])
  const checks: AuditCheck[] = []

  if (isError(issues)) checks.push({ name: 'issues', ok: false, unread: true, measured: issues.error, why: 'the issues were not read; re-run with a token that may read them' })
  else {
    const open = list(issues).filter((i) => !i.pull_request).sort((a, b) => Number(a.number) - Number(b.number))
    checks.push(open.length
      ? { name: 'issues', ok: false, measured: `${open.length} open`, why: 'answer each issue, or close it with the reason', items: open.map((i) => `#${i.number} ${String(i.title)}`) }
      : { name: 'issues', ok: true, measured: 'none open', why: '' })
  }

  if (isError(pulls)) checks.push({ name: 'pull requests', ok: false, unread: true, measured: pulls.error, why: 'the pull requests were not read; re-run with a token that may read them' })
  else {
    const open = list(pulls).sort((a, b) => Number(a.number) - Number(b.number))
    checks.push(open.length
      ? { name: 'pull requests', ok: false, measured: `${open.length} open`, why: 'review and merge each, or close it with the reason', items: open.map((p) => `#${p.number} ${String(p.title)}${p.draft ? ' (draft)' : ''} by ${String((p.user as { login?: string } | null)?.login ?? '?')}`) }
      : { name: 'pull requests', ok: true, measured: 'none open', why: '' })
  }

  checks.push(alertCheck('Dependabot alerts', dependabot, (a) => `${String((a.security_advisory as { severity?: string } | null)?.severity ?? '?')} ${String((a.dependency as { package?: { name?: string } } | null)?.package?.name ?? '?')}`, 'upgrade the vulnerable dependencies, or dismiss each alert with its reason'))
  checks.push(alertCheck('code scanning', codeScanning, (a) => `${String((a.rule as { severity?: string } | null)?.severity ?? '?')} ${String((a.rule as { id?: string } | null)?.id ?? '?')}`, 'fix each rule the scanner flags, or dismiss each alert with its reason'))
  checks.push(alertCheck('secret scanning', secretScanning, (a) => String(a.secret_type_display_name ?? a.secret_type ?? '?'), 'revoke each exposed secret at its issuer, then resolve the alert'))

  if (isError(runs)) checks.push({ name: 'workflows on the default branch', ok: false, unread: true, measured: runs.error, why: 'the workflow runs were not read; re-run with a token that may read Actions' })
  else {
    // the newest run of each workflow decides it: GitHub lists runs newest first. Keyed by workflow_id, never by the
    // run's name — a workflow with a dynamic run-name gives every run a different name (lean read "5 of 92" by name)
    const latest = new Map<string, Record<string, unknown>>()
    for (const r of list((runs as { workflow_runs?: unknown }).workflow_runs)) {
      const id = String(r.workflow_id ?? r.path ?? r.name)
      if (!latest.has(id)) latest.set(id, r)
    }
    const failing = [...latest.values()].filter((r) => r.conclusion === 'failure').map((r) => String(r.path ?? r.name)).sort()
    checks.push(failing.length
      ? { name: 'workflows on the default branch', ok: false, measured: `${failing.length} of ${latest.size} failing on ${branch}`, why: 'make each workflow pass on the default branch, or remove it', items: failing }
      : { name: 'workflows on the default branch', ok: true, measured: `${latest.size} workflow(s), none failing on ${branch}`, why: '' })
  }

  if (isError(protection)) {
    checks.push(/not protected/i.test(protection.error)
      ? { name: 'branch protection', ok: false, measured: `${branch} is not protected`, why: `protect ${branch} (required checks, no force-push), or record why it stays open` }
      // GitHub answered: the plan does not offer protection for a private repository, which is a finding, not silence
      : /upgrade to github pro|make this repository public/i.test(protection.error)
        ? { name: 'branch protection', ok: false, measured: `${branch} cannot be protected on the current plan`, why: 'upgrade the plan, make the repository public, or record why the branch stays unprotected' }
        : { name: 'branch protection', ok: false, unread: true, measured: protection.error, why: 'branch protection was not read; it needs a token with admin read on the repository' })
  } else checks.push({ name: 'branch protection', ok: true, measured: `${branch} is protected`, why: '' })

  return { repo, visibility, branch, checks }
}

export const githubAudit = async (owner: string, repos: readonly { name: string; visibility: string; branch: string }[], api: Api): Promise<GithubAudit> => {
  const audited = await Promise.all([...repos].sort((a, b) => a.name.localeCompare(b.name)).map((r) => auditRepo(owner, r.name, r.visibility, r.branch, api)))
  const all = audited.flatMap((r) => r.checks)
  return { owner, repos: audited, checked: all.length, failed: all.filter((c) => !c.ok && !c.unread).length, unread: all.filter((c) => c.unread).length }
}
