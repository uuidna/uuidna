#!/usr/bin/env node
// gen-school-lessons — ONE SERVED FILE PER COURSE, composed from the ledger rows (src/school/lesson).
//
// A page per course is 242 more pages for an SSG already rendering ~11,400 at a 12 GiB pin, so the courses are served
// as data instead: docs/public/school/<course>.json per wing and docs/public/school/index.json for the catalogue, which
// the one interactive page (docs/school/learn.md) loads on demand and the Worker reads to re-check an answer. The
// directory is rewritten whole each run, so a wing that leaves the ledger leaves the school with it.
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { theoremByKey } from '../theorems/index.js'
import { courses } from '../school.js'
import { evaluatorDigestOf, seedHolds } from '../involution/index.js'
import { composeCourse, composeIndex, summaryOf, whyOfLean, courseSlugOf, type CourseSummary } from '../school/lesson/index.js'

/** Cloudflare's static-asset ceiling per file (25 MiB) — a host fact; a course over it is refused by name */
const ASSET_BYTES_MAX = 25 * 1024 * 1024
const OUT = join(ROOT, 'docs', 'public', 'school')

// the sealed statements' verdicts, served from the falsifier cache when it was minted by this evaluator
const EVALUATOR = evaluatorDigestOf(readFileSync(join(ROOT, 'src', 'involution', 'index.ts'), 'utf8'))
try {
  const c = JSON.parse(readFileSync(join(ROOT, 'lean', 'falsifier-cache.json'), 'utf8')) as { evaluator?: string; verdicts?: Record<string, boolean | null> }
  if (c.evaluator === EVALUATOR && c.verdicts) seedHolds(c.verdicts)
} catch { /* no cache for this evaluator: every sealed statement is decided here once */ }

const byKey = theoremByKey()
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const summaries: CourseSummary[] = []
let largest = 0
for (const c of courses()) {
  const leanPath = join(ROOT, 'lean', c.wing)
  const why = existsSync(leanPath) ? whyOfLean(readFileSync(leanPath, 'utf8')) : new Map<string, string>()
  const rows = c.roll.map((l) => byKey.get(l.key)!).filter(Boolean)
  const file = composeCourse(
    { wing: c.wing, title: c.title, principle: rows[0]?.principle ?? '', skills: c.skills, level: c.level, band: c.band, rank: c.rank },
    rows, (k) => why.get(k) ?? null,
  )
  const text = JSON.stringify(file) + '\n'
  const bytes = Buffer.byteLength(text)
  if (bytes > ASSET_BYTES_MAX) { console.log(`✗ gen-school-lessons — ${c.wing} is ${bytes} bytes, over the ${ASSET_BYTES_MAX}-byte asset ceiling`); process.exit(1) }
  if (bytes > largest) largest = bytes
  writeFileSync(join(OUT, `${courseSlugOf(c.wing)}.json`), text)
  summaries.push(summaryOf(file))
}
const index = composeIndex(summaries)
writeFileSync(join(OUT, 'index.json'), JSON.stringify(index) + '\n')
const withExercise = index.courses.filter((c) => c.exercises > 0).length
console.log(`✓ gen-school-lessons — ${index.courses.length} courses, ${index.lessons} lessons, ${index.exercises} with an instantly checked exercise (${withExercise} courses carry one); largest file ${largest} bytes`)
