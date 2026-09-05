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
import { pushVerdict, parseRunRows, type RunRow } from '../post-push.js'

const sh = (cmd: string): string => execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })

/** the forge, asked once. A `gh` that cannot answer is UNMEASURED — it is never read as an empty run list. */
export function runsFor(limit = 30): RunRow[] {
  return parseRunRows(sh(`gh run list --limit ${limit} --json workflowName,headSha,status,conclusion`))
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
  let verdict = pushVerdict(sha, runsFor())
  for (let i = 0; wait && !verdict.settled && i < ROUNDS; i++) {
    console.log(`· post-push — ${verdict.reason}`)
    sh(`sleep ${PAUSE}`)
    verdict = pushVerdict(sha, runsFor())
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
    : `    FIX the forge reports nothing for this commit yet. Ask again (\`node dist/scripts/post-push.js ${sha.slice(0, 9)} --wait\`). Silence is UNMEASURED and must never be recorded as a pass.`)
  process.exit(1)
}
