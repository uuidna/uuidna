#!/usr/bin/env node
// post-push — ASK THE FORGE WHAT IT DID WITH THE COMMIT. The pre-push court cannot: it runs before the push, so
// a workflow that fails afterwards is outside everything it can see. On 2026-09-05 the `security` workflow failed
// on 44 consecutive pushes across three sessions and a full day, and not one push was blocked, because every
// local gate was green for every one of them.
//
// The verdict logic is src/post-push.ts and is PURE — the network lives here, so the law can be tested against
// the real row sets (including that day's) without a forge. NO RUN FOUND IS UNMEASURED, NEVER A PASS: a poll is
// always faster than a queue, so a check that read silence as clean would report green on every push.
//
// Usage:  node dist/scripts/post-push.js [sha]     (default: HEAD)
//         --wait   poll until every run for the sha has settled, then report
import { execSync } from 'node:child_process'
import { ROOT } from './api.js'
import { pushVerdict, parseRunRows, type RunRow, type CheckRow } from '../post-push.js'

const sh = (cmd: string): string => execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })

/** the forge, asked once. A `gh` that cannot answer is UNMEASURED — it is never read as an empty run list. */
export function runsFor(limit = 30): RunRow[] {
  return parseRunRows(sh(`gh run list --limit ${limit} --json workflowName,headSha,status,conclusion,event,databaseId`))
}

/** THE RUNS FOR ONE COMMIT, ASKED FOR BY NAME. `gh run list --limit N` is a WINDOW, and the join that gives a
 *  check run its event failed through it the first time it ran: three real checks on origin/main came back
 *  "unattributed" because their workflow runs sat outside the last thirty. A window truncation wearing the
 *  costume of an absent run — the same conflation this arm has now met four times. `?head_sha=` is exact and
 *  needs no window at all. */
export function runsForSha(sha: string): RunRow[] {
  const raw: unknown = JSON.parse(sh(`gh api repos/uuidna/uuidna/actions/runs?head_sha=${encodeURIComponent(sha)} --paginate`))
  const list = (raw as { workflow_runs?: unknown[] }).workflow_runs
  if (!Array.isArray(list)) throw new Error('post-push: the actions/runs api did not return a list — refusing to read a malformed answer as "no runs"')
  return list.map((r) => {
    const o = r as Record<string, unknown>
    return {
      workflowName: String(o.name ?? '?'),
      headSha: String(o.head_sha ?? ''),
      status: String(o.status ?? ''),
      conclusion: o.conclusion === null || o.conclusion === undefined ? null : String(o.conclusion),
      event: String(o.event ?? ''),
      databaseId: typeof o.id === 'number' ? o.id : Number(o.id),
    }
  })
}

/** THE FINER SURFACE. `gh run list` returns workflows and cannot see a check posted by a GitHub App —
 *  `Workers Builds: uuidna` failed on five consecutive pushes and this arm reported every one of them green.
 *  The run id is recovered from details_url so an Actions check inherits its workflow's event; a foreign app's
 *  url carries none, which is why the roster exists. */
export function checksFor(sha: string): CheckRow[] {
  const raw: unknown = JSON.parse(sh(`gh api repos/uuidna/uuidna/commits/${sha}/check-runs --paginate`))
  const list = (raw as { check_runs?: unknown[] }).check_runs
  if (!Array.isArray(list)) throw new Error('post-push: the check-runs api did not return a list — refusing to read a malformed answer as "no failures"')
  return list.map((r) => {
    const o = r as Record<string, unknown>
    const url = String(o.details_url ?? '')
    const m = /actions\/runs\/(\d+)/.exec(url)
    return {
      name: String(o.name ?? '?'),
      status: String(o.status ?? ''),
      conclusion: o.conclusion === null || o.conclusion === undefined ? null : String(o.conclusion),
      appSlug: String((o.app as { slug?: unknown } | undefined)?.slug ?? '?'),
      runId: m ? Number(m[1]) : null,
    }
  })
}

// POLLING WITHOUT A CLOCK, which the determinism law requires: a bounded number of rounds, each waiting on the
// shell rather than on a timestamp this process reads. The bound is the honesty — the arm reports UNMEASURED or
// STILL RUNNING when it runs out, and never converts patience into a verdict.
const ROUNDS = 24
const PAUSE = 20

const isMain = process.argv[1]?.endsWith('post-push.js') ?? false
if (isMain) {
  const wait = process.argv.includes('--wait')
  const sha = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? sh('git rev-parse HEAD').trim()
  // A SATURATED WINDOW IS NOT AN EMPTY FORGE. `gh run list --limit N` returning exactly N rows means the answer
  // was TRUNCATED, and asking about an older commit then reports "no run at all" — which reads as "not queued
  // yet" when it means "outside what I asked for". Two different silences wearing one sentence; the same
  // conflation this arm exists to refuse. So the limit is reported whenever the window came back full.
  const LIMIT = 30
  let rows = runsForSha(sha)
  let verdict = pushVerdict(sha, rows, checksFor(sha))
  for (let i = 0; wait && !verdict.settled && i < ROUNDS; i++) {
    console.log(`· post-push — ${verdict.reason}`)
    sh(`sleep ${PAUSE}`)
    rows = runsForSha(sha)
    verdict = pushVerdict(sha, rows, checksFor(sha))
  }
  if (verdict.ok) {
    console.log(`✓ post-push — ${verdict.reason}`)
    process.exit(0)
  }
  console.error(`✗ post-push — ${verdict.reason}`)
  for (const f of verdict.failing) console.error(`    FAILED  ${f}`)
  for (const p of verdict.pending) console.error(`    RUNNING ${p}`)
  console.error(verdict.measured
    ? '    FIX read the failing run — `gh run view --workflow=<name> --log-failed` — and land the cure. A local gate cannot see this; only asking the forge can.'
    : rows.length >= LIMIT
      ? `    FIX the window came back FULL (${rows.length} of ${LIMIT} asked for), so this commit may simply be older than the answer. Ask with a larger limit before believing the silence — a truncated answer is not an empty forge.`
      : `    FIX the forge reports nothing for this commit yet. Ask again (\`node dist/scripts/post-push.js ${sha.slice(0, 9)} --wait\`). Silence is UNMEASURED and must never be recorded as a pass.`)
  process.exit(1)
}
