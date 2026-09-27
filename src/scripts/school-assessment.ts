#!/usr/bin/env node
// school-assessment — THE ASSESSMENT DESIGN, and the vacuity audit over the school's own exercises.
//
// Writes docs/school-assessment.md from the live figures, so no number in the document can drift from the ledger it
// describes (the llm.txt lesson: a count frozen in prose is a count that will be wrong).

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { theorems } from '../theorems/index.js'
import { mirrorRows, type Leg } from '../rosetta-legs.js'
import { exerciseOf, checkAnswer } from '../school/lesson/index.js'
import { LEARNING_AREAS } from '../school-areas.js'
import { ASSESSMENT, UNDECIDABLE_AREAS, cohortVacuity, multiAnswerCriteria, type Criterion } from '../school-assessment.js'

// ── the live leg distribution, which is what predicts the difficulty of each dimension
const rows = mirrorRows()
const legShare = (leg: Leg): { n: number; pct: string } => {
  const n = rows.filter((r) => r.legs.includes(leg)).length
  return { n, pct: `${((n / rows.length) * 100).toFixed(2)}%` }
}

// ── the school's exercises, as the learner meets them
const criteria: Criterion[] = []
const exOf = new Map<string, ReturnType<typeof exerciseOf>>()
for (const t of theorems()) {
  const statement = String(t.statement ?? '')
  const ex = exerciseOf(statement)
  if (ex === null) continue
  const c: Criterion = { course: String(t.file), lesson: String(t.key), theorem: String(t.key), statement }
  criteria.push(c)
  exOf.set(c.theorem, ex)
}

const sealedOf = (c: Criterion): string | null => {
  const ex = exOf.get(c.theorem)
  if (!ex) return null
  return c.statement.slice(ex.at, ex.at + ex.length)
}
const satisfies = (c: Criterion, value: string): boolean => {
  const ex = exOf.get(c.theorem)
  if (!ex) return false
  return checkAnswer(c.statement, ex, value).verdict === 'correct'
}

// THE CEILING IS WHAT MAKES THIS RUNNABLE, and it is reported rather than hidden. 2,747 exercises swept to 4,096
// values each is eleven million evaluator calls; at 64 it is under two hundred thousand and finds every congruence
// with a modulus below the ceiling — which is where the school's ±1 guard is weakest. A wider sweep would find more,
// and the result carries the bound so "none found" is never read as "none exists".
const SWEEP = 64n
const multi = multiAnswerCriteria(criteria, sealedOf, satisfies, SWEEP)
// NO SUBMISSIONS EXIST YET: the SCHOOL KV namespace is an owner act, so the cohort half reports NOT READ by design.
const cohort = cohortVacuity([])

console.log(`exercises offered: ${criteria.length} of ${theorems().length} sealed statements`)
console.log(`swept every offered exercise for a second answer below ${SWEEP}`)
console.log(`MORE THAN ONE RIGHT ANSWER: ${multi.length} (${((multi.length / Math.max(criteria.length, 1)) * 100).toFixed(1)}% of exercises)`)
for (const m of multi.slice(0, 6)) {
  console.log(`  ✗ ${m.theorem} [${m.course}] — key ${m.sealed}, also ${m.also.slice(0, 5).join(', ')} (swept below ${m.below})`)
}
console.log()
console.log(`cohort audit: criteria ${cohort.criteria === null ? 'NOT READ — no verdicts exist' : cohort.criteria}, verdicts ${cohort.verdicts}`)

const doc = [
  '# Assessment in the twelve-area school',
  '',
  '> GENERATED from `src/school-assessment.ts`. Every figure below is read from the live ledger at generation time,',
  '> never typed. The architecture is the captain\'s (2026-09-28); the mapping to evidence is derived from what this',
  '> ledger already does to its own theorems.',
  '',
  '## The four dimensions are the five legs',
  '',
  'Every sealed theorem here is assessed by independent legs: a kernel proof, an independent falsifier, a content',
  'address, an external witness, a symbolic form. The captain\'s transversal dimensions ask for those same kinds of',
  'evidence about a student\'s work instead of a theorem\'s.',
  '',
  '| dimension | means | leg | evidence | fails when |',
  '| --- | --- | --- | --- | --- |',
  ...ASSESSMENT.map((d) => `| **${d.name}** | ${d.means} | \`${d.leg}\` | ${d.evidence} | ${d.fails} |`),
  '',
  '## The ledger\'s own distribution predicts the difficulty',
  '',
  `Measured across ${rows.length} sealed theorems:`,
  '',
  '| leg | carried by | share |',
  '| --- | --- | --- |',
  ...(['proof', 'falsifier', 'address', 'symbol', 'witness'] as Leg[]).map((l) => {
    const s = legShare(l)
    return `| \`${l}\` | ${s.n} | ${s.pct} |`
  }),
  '',
  'So Making and Understanding are cheap to evidence, Reflecting harder, and **Encountering by far the scarcest** —',
  'an anchor outside the institution is the expensive kind. A curriculum claiming rich Encountering across twelve areas',
  'is claiming what the analogous system achieves in a fraction of one percent of cases.',
  '',
  '## Assessment is a vector, never an average',
  '',
  'The seal this repository mints is refused unless every component of its equilibrium holds. An average is what lets a',
  'strong Making conceal an absent Reflecting, so a project\'s assessment is the set of cells it CLAIMS, each holding or',
  'not. No cell is self-certifiable: ' + ASSESSMENT.map((d) => d.name).join(', ') + ' each require a second party.',
  '',
  '## Reflecting cannot be self-certified',
  '',
  'A student grading their own reflection is the failure this repository calls the ledger that witnessed itself, and one',
  'teacher is one hand — symbol and proof "are written by one hand and share that hand\'s errors". Reflecting takes two',
  'independent readings, and a disagreement between them is RECORDED rather than resolved by seniority, the way',
  '`cross-surface` treats every probe disagreement as a lead.',
  '',
  '## What must not be given a fake check',
  '',
  `Areas ${UNDECIDABLE_AREAS.join(', ')} — ` +
    UNDECIDABLE_AREAS.map((n) => LEARNING_AREAS.find((a) => a.n === n)!.name).join('; ') +
    ' — carry no decidable criterion.',
  'Their evidence is witness plus recorded disagreement, which is genuinely weaker than a kernel verdict, and the',
  'honest move is to record that difference rather than dress it up. `UNVERIFIED` means "not decidable by this',
  'instrument", never "absent" and never "false".',
  '',
  '## The vacuity audit',
  '',
  'Two defects, failing in opposite directions.',
  '',
  '**More than one right answer.** The school\'s exercises are *predict the value*: one numeral blanked, the learner',
  'fills it. `exerciseOf` already refuses a blank unless it discriminates against the answer ±1, so `16 < 20` is never',
  'asked as a one-answer question. That guard tests two neighbours. A congruence passes it and stays wide open:',
  '`x % 9 = 4` refuses 3 and 5 and accepts 13, 22, 31 and every further step of nine. Sweeping a window derived from',
  'the answer finds these.',
  '',
  `Measured now: **${multi.length} of ${criteria.length} offered exercises have more than one right answer**` +
    ` (${((multi.length / Math.max(criteria.length, 1)) * 100).toFixed(1)}%), sweeping values below ${SWEEP}.` +
    ' A wider sweep would find more: the bound is carried in every finding, so "none found" is never "none exists".',
  '',
  '**Nobody ever fails it.** A criterion at zero failures may be teaching that worked, or an instrument that is not',
  'measuring, and the two are indistinguishable without failures — so this half needs a cohort.',
  '',
  `Measured now: **${cohort.criteria === null ? 'NOT READ' : String(cohort.criteria)}**.` +
    ' No verdicts exist, because storing a submission needs the `SCHOOL` KV namespace and',
  '`wrangler kv namespace create SCHOOL` is an owner act. An audit reporting "no vacuous criteria" over an empty',
  'cohort would be the exact defect it exists to find, so it reports that it did not run.',
  '',
].join('\n') + '\n'

const out = join(ROOT, 'docs', 'school-assessment.md')
writeFileSync(out, doc)
console.log(`\n✓ docs/school-assessment.md — ${doc.length} bytes, every figure live`)
