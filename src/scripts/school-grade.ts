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
import type { CourseFile } from '../school/lesson/shape/index.js'

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
  if (!kernelPresent()) { console.error('✗ school-grade — VOID: `lean` does not start on this host, so no proof can be judged'); process.exit(1) }
  const res = await fetch(QUEUE_URL, { headers: { accept: 'application/json' } })
  if (!res.ok) { console.error(`✗ school-grade — the queue answered ${res.status}`); process.exit(1) }
  const body = await res.json() as { submissions?: unknown }
  if (!Array.isArray(body.submissions)) { console.error('✗ school-grade — the queue listing has no submissions array'); process.exit(1) }
  const dir = mkdtempSync(join(tmpdir(), 'uuidna-grade-'))
  try {
    const run = gradeQueue(body.submissions, exerciseOf, kernelProbe(dir))
    writeFileSync(out, JSON.stringify(run, null, 2) + '\n')
    const count = (k: string): number => run.verdicts.filter((v) => v.verdict === k).length
    console.log(`school-grade — ${run.verdicts.length} graded: ${count('kernel-accepted')} kernel-accepted, ${count('kernel-refused')} kernel-refused, ${count('door-refused')} door-refused; ${run.void.length} void`)
    for (const v of run.void) console.log(`  VOID ${v.submittedAddress}: ${v.why}`)
  } finally { rmSync(dir, { recursive: true, force: true }) }
}

main().catch((e: unknown) => { console.error('✗ school-grade —', e instanceof Error ? e.message : String(e)); process.exit(1) })
