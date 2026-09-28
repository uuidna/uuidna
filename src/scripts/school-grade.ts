#!/usr/bin/env node
// school-grade — the kernel job of .github/workflows/school-grade.yml. Reads the public queue, grades each queued
// submission against its lesson's fixed statement (door, then kernel), and writes the verdicts as data to the path
// given (default school-verdicts.json). It posts nothing: this job holds no token, and the post job never executes
// anything from the file. A submission whose lesson this tree does not resolve is VOID and stays queued. The lesson is
// read from this tree's served course file (docs/public/school/<course>.json) and pinned to the ledger's seal.
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { sealedAddressOf } from '../theorems/index.js'
import { gradeQueue } from '../school/grade/queue/index.js'
import { exerciseOfCourses } from '../school/grade/exercise/index.js'
import { kernelPresent, kernelProbe } from '../school/grade/kernel/index.js'
import { NO_SCHOOL_STORE } from '../school/routes/index.js'
import type { CourseFile } from '../school/lesson/shape/index.js'
import { wrArtifact } from '../artifact.js'

const QUEUE_URL = process.env.SCHOOL_QUEUE ?? 'https://uuidna.com/school/submissions?status=queued'

/** servedCourse(course) → the course file gen-school-lessons wrote for this tree, or null; the caller has checked the id */
const servedCourse = (course: string): CourseFile | null => {
  const file = join(ROOT, 'docs', 'public', 'school', `${course}.json`)
  if (!existsSync(file)) return null
  try { return JSON.parse(readFileSync(file, 'utf8')) as CourseFile } catch { return null }
}
const exerciseOf = exerciseOfCourses(servedCourse, (key) => sealedAddressOf(key) ?? null)

async function main(): Promise<void> {
  const out = process.argv[2] ?? 'school-verdicts.json'
  const res = await fetch(QUEUE_URL, { headers: { accept: 'application/json' } })
  const text = await res.text()

  // NOT PROVISIONED IS NOT BROKEN, AND NEITHER OF THEM IS FINE.
  //
  // This job had failed six times in a row when it was looked at, every one of them on `the queue answered 503`,
  // and the 503 was our own production endpoint saying the SCHOOL KV namespace has never been bound — which
  // wrangler.toml states as the intended state until the owner runs `wrangler kv namespace create SCHOOL`. So a
  // scheduled job was reporting an owner action pending, every six hours, in the same red as a broken grader. Six
  // identical failures is how a repository teaches everybody to stop reading its CI, and it was also hiding the
  // signal: nothing here could have told you whether grading itself still worked.
  //
  // The exit codes now say which it is, borrowing audit-doi-harvest's convention because the distinction is the
  // same one: 1 is BROKEN (the queue exists and misbehaved), 2 is UNPROVISIONED (there is no store to read, so
  // nothing was learned). 2 is deliberately NOT 0 — an absent store means the grader has graded nothing and has
  // proven nothing, and a green run would be the vacuous pass this tree refuses everywhere else. The artefact
  // below is what carries it onward: src/api-leads.ts reads it, so an unprovisioned production route is an OPEN
  // LEAD that holds the next release until the owner provisions it or the feature is retired by name.
  const unprovisioned = res.status === 503 && text.includes(NO_SCHOOL_STORE)
  const note = (state: string, why: string, graded: number, voided: number): void => {
    wrArtifact('lean/school-queue.json', { queue: QUEUE_URL, state, why, graded, void: voided })
  }

  if (unprovisioned) {
    note('unprovisioned', NO_SCHOOL_STORE, 0, 0)
    console.error(`· school-grade — UNPROVISIONED: ${QUEUE_URL} answered 503 — ${NO_SCHOOL_STORE}`)
    console.error('  Nothing was graded, so nothing is proven. This is an OWNER act, not a code defect:')
    console.error('    wrangler kv namespace create SCHOOL   then uncomment [[kv_namespaces]] SCHOOL in wrangler.toml')
    console.error('  Recorded as an open lead in lean/school-queue.json — leads-gate holds the next release on it.')
    process.exit(2)
  }
  if (!res.ok) {
    note('broken', `the queue answered ${res.status}`, 0, 0)
    console.error(`✗ school-grade — the queue answered ${res.status}: ${text.slice(0, 200)}`)
    process.exit(1)
  }
  const body = JSON.parse(text) as { submissions?: unknown }
  if (!Array.isArray(body.submissions)) {
    note('broken', 'the queue listing has no submissions array — a shape drift', 0, 0)
    console.error('✗ school-grade — the queue listing has no submissions array')
    process.exit(1)
  }

  // THE PROBE IS RECORDED BEFORE THE KERNEL IS REQUIRED. Reading the queue needs no toolchain; judging a proof does.
  // Keeping them in the old order meant the artefact the release gate reads could only ever be written on a host
  // with Lean installed, so outward.yml — which installs none — would have reported it UNREAD every single day and
  // blocked on its own missing prerequisite. `ungraded` is the honest name for "the queue answered and this host
  // cannot judge": it is a lead when something is actually waiting, and nothing at all when the queue is empty.
  if (!kernelPresent()) {
    note('ungraded', '`lean` does not start on this host, so no proof could be judged', 0, body.submissions.length)
    console.error(`· school-grade — UNGRADED: the queue served ${body.submissions.length} submission(s) and \`lean\` does not start here.`)
    process.exit(2)
  }
  const dir = mkdtempSync(join(tmpdir(), 'uuidna-grade-'))
  try {
    const run = gradeQueue(body.submissions, exerciseOf, kernelProbe(dir))
    writeFileSync(out, JSON.stringify(run, null, 2) + '\n')
    const count = (k: string): number => run.verdicts.filter((v) => v.verdict === k).length
    console.log(`school-grade — ${run.verdicts.length} graded: ${count('kernel-accepted')} kernel-accepted, ${count('kernel-refused')} kernel-refused, ${count('door-refused')} door-refused; ${run.void.length} void`)
    for (const v of run.void) console.log(`  VOID ${v.submittedAddress}: ${v.why}`)
    note('graded', 'the queue answered and every submission was judged', run.verdicts.length, run.void.length)
  } finally { rmSync(dir, { recursive: true, force: true }) }
}

main().catch((e: unknown) => { console.error('✗ school-grade —', e instanceof Error ? e.message : String(e)); process.exit(1) })
