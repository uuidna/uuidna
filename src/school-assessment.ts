// school-assessment — WHAT COUNTS AS EVIDENCE IN THE TWELVE-AREA SCHOOL, and how a criterion is caught teaching nothing.
//
// The captain, 2026-09-28, asked how assessment could be designed for the twelve learning areas of
// src/school-areas.ts, and then asked for this written into the school with the vacuity audit implemented.
//
// THE DIMENSIONS ARE THE LEGS, and that correspondence was not invented for this file — it fell out of what the ledger
// already does. Every sealed theorem here is assessed by five independent legs (src/rosetta-legs.ts): a kernel proof, an
// independent falsifier, a content address, an external witness, and a symbolic form. The captain's four transversal
// dimensions ask for exactly those kinds of evidence about a student's work instead of a theorem's.
//
// AND THE LEDGER'S OWN DISTRIBUTION PREDICTS THE SCHOOL'S DIFFICULTY CURVE, which is the most useful thing this mapping
// buys. Measured across 71,085 sealed theorems: proof, falsifier and address at 100%, symbol at 2.0%, witness at 0.04%
// — 29 theorems fully anchored. So a school will find Making and Understanding cheap to evidence, Reflecting harder,
// and ENCOUNTERING by far the scarcest, because an anchor outside the institution is the expensive kind. A curriculum
// claiming rich Encountering across twelve areas is claiming what the analogous system achieves four times in ten
// thousand.
//
// ASSESSMENT IS A VECTOR AND NEVER AN AVERAGE. The seal this repository mints is refused unless every component of its
// equilibrium holds; on 2026-09-27 it refused on `messaging_total` alone while five others were true, and no average
// would have shown that. A project's assessment has the same shape — the cells it CLAIMS, each holding or not —
// because an average is what lets a strong Making conceal an absent Reflecting.
//
// REFLECTING CANNOT BE SELF-CERTIFIED. A student grading their own reflection is the failure this repository names as
// the ledger that witnessed itself, and one teacher is one hand: rosetta-legs says it outright, that symbol and proof
// "are written by one hand and share that hand's errors". So Reflecting takes two independent readings, and when they
// disagree the DISAGREEMENT IS RECORDED rather than resolved by seniority — src/cross-surface.ts already works this
// way, where the probe pairs agree or each disagreement is a lead.
//
// WHAT MUST NOT BE GIVEN A FAKE CHECK. Areas 4, 9, 11 and 12 — society and human thought, life skills, world cultures,
// environment of the self — carry no decidable criterion. Their evidence is witness plus recorded disagreement, which
// is genuinely weaker than a kernel verdict, and the honest move is to record that difference rather than dress it up.
// UNVERIFIED here means "not decidable by this instrument", never "absent" and never "false".
//
// AND UNREAD IS NOT PASS. The school's existing grader already holds this line: a submission's `axioms: []` means the
// kernel vouched with no axioms, while `null` means no axiom verdict was READ. Every count below keeps that third
// state, because a cohort audit over zero submissions must report that it did not run — an audit that reports health
// when nothing was checked is the exact defect it exists to find.


/** one of the captain's four transversal dimensions, with the leg whose evidence it asks for */
export interface Dimension {
  name: string
  /** the captain's words for what the dimension means */
  means: string
  /** the rosetta leg this dimension's evidence corresponds to */
  leg: 'address' | 'proof' | 'falsifier' | 'witness'
  /** what a submission must carry for the cell to hold */
  evidence: string
  /** the shape a FAILED claim takes — stated so the criterion can be checked for being unfailable */
  fails: string
  /** whether one party can certify it alone */
  selfCertifiable: boolean
}

export const ASSESSMENT: readonly Dimension[] = [
  { name: 'Making', means: 'students produce, build, perform or test something', leg: 'address',
    evidence: 'an artefact with a content address, AND a falsifiable claim about it that another party can recompute',
    fails: 'the artefact is absent, its address does not recompute, or its claim cannot fail',
    selfCertifiable: false },
  { name: 'Understanding', means: 'theory, knowledge, history and concepts', leg: 'proof',
    evidence: 'the claim derived so that someone who was not present can check the derivation',
    fails: 'an assertion the student cannot reconstruct on request',
    selfCertifiable: false },
  { name: 'Reflecting', means: 'ethics, critical thinking and self-reflection', leg: 'falsifier',
    evidence: 'the student states what would refute them, and a SECOND independent reading is recorded',
    fails: 'no statable refutation, or a single reading — self-assessment is self-witnessing',
    selfCertifiable: false },
  { name: 'Encountering', means: 'people, communities, places and the outside world', leg: 'witness',
    evidence: 'an anchor outside the school: a person, an institution, or a place record that can be consulted',
    fails: 'a self-reported encounter with nothing outside the school to consult',
    selfCertifiable: false },
] as const

/** the areas whose subjects no decidable criterion reaches — their evidence is witness plus recorded disagreement */
export const UNDECIDABLE_AREAS: readonly number[] = [4, 9, 11, 12] as const

// ── THE VACUITY AUDIT ────────────────────────────────────────────────────────────────────────────────────────────
//
// TWO QUESTIONS, and they fail in opposite directions.
//
// A CRITERION WITH MORE THAN ONE RIGHT ANSWER is not the question it presents itself as. The school's exercises are
// "predict the value": one numeral is blanked and the learner fills it. `exerciseOf` already refuses to offer a blank
// unless it DISCRIMINATES — the sealed value plus one, and minus one, must both evaluate false — so `16 < 20` is never
// asked as a one-answer question. That guard is real and it is narrow: it tests the two NEIGHBOURS of the answer.
//
// A congruence passes it and stays wide open. `x % 9 = 4` refuses 3 and 5 and accepts 13, 22, 31 and every further step
// of nine, so the exercise is offered as having one answer and has many. A learner who answers 13 is told they are
// wrong by an answer key that is one of the correct values. That is not a hard exercise, it is a mislabelled one, and
// sweeping a bounded window of values finds every instance of it.
//
// THE WINDOW IS DERIVED FROM THE SEALED VALUE, not chosen: values from 0 to twice the answer plus a margin, so a small
// answer gets a small sweep and a large one a proportionate sweep. A sweep that found nothing would prove only that the
// window was too narrow, so the window is reported alongside the count and a criterion is never called single-answer —
// only "no second answer found below <bound>", which is what was actually measured.
//
// A CRITERION NOBODY EVER FAILS is a different defect and needs a cohort to detect. It may be a fine criterion that the
// teaching happens to have succeeded at, or an instrument that is not measuring — and the two are indistinguishable
// without the failures. So `cohortVacuity` returns `unread` when there are no verdicts, because reporting "no vacuous
// criteria" over an empty cohort would be the vacuous success it exists to catch.

export interface Criterion {
  course: string
  lesson: string
  theorem: string
  statement: string
}

export interface MultiAnswer {
  course: string
  lesson: string
  theorem: string
  /** the value the answer key holds */
  sealed: string
  /** other values that also satisfy the statement, in the window swept */
  also: string[]
  /** the exclusive upper bound of the sweep, so "none found" is never read as "none exists" */
  below: string
}

/**
 * The exercises with more than one right answer, found by sweeping a window derived from the answer itself.
 *
 * `satisfies` is injected rather than imported so this module stays pure over its arguments and a test can hand it a
 * predicate it controls — the same reason the rest of this tree passes its evaluators in.
 */
export function multiAnswerCriteria(
  criteria: readonly Criterion[],
  sealedOf: (c: Criterion) => string | null,
  satisfies: (c: Criterion, value: string) => boolean,
  /**
   * The widest sweep any one criterion gets, whatever its answer's size.
   *
   * Without it a sealed value of 16,777,216 would ask for a thirty-three-million-step sweep, so the bound is the
   * smaller of "twice the answer plus a margin" and this ceiling. The bound ACTUALLY swept is returned per criterion,
   * because a large answer gets a proportionally shallower search and a reader has to be able to see that.
   */
  ceiling: bigint = 4096n,
): MultiAnswer[] {
  const out: MultiAnswer[] = []
  for (const c of criteria) {
    const sealed = sealedOf(c)
    if (sealed === null) continue
    let v: bigint
    try { v = BigInt(sealed) } catch { continue }
    // twice the answer plus a margin: proportionate to the quantity asked about, and stated in the result
    const wanted = v * 2n + 32n
    const bound = wanted < ceiling ? wanted : ceiling
    const also: string[] = []
    for (let x = 0n; x < bound; x += 1n) {
      if (x === v) continue
      if (satisfies(c, String(x))) also.push(String(x))
      if (also.length >= 8) break
    }
    if (also.length > 0) {
      out.push({ course: c.course, lesson: c.lesson, theorem: c.theorem, sealed, also, below: String(bound) })
    }
  }
  return out
}

export interface CohortVerdict {
  /** the criterion this verdict is about */
  theorem: string
  /** true when the submission met the criterion */
  held: boolean
}

export interface CohortVacuity {
  /** null = NOT READ. No verdicts were supplied, so nothing was measured and nothing is claimed. */
  criteria: number | null
  /** criteria every submission met — candidates for not measuring, indistinguishable from successful teaching */
  neverFailed: string[]
  /** criteria no submission met — a broken instrument, or teaching that never happened */
  neverHeld: string[]
  /** how many verdicts the judgement rests on, so a reader can weigh it */
  verdicts: number
}

/**
 * Which criteria no cohort ever fails, and which none ever meets.
 *
 * BOTH ENDS ARE REPORTED because both are defects and they are not symmetric in cause: a criterion at zero failures may
 * be teaching that worked, while a criterion at zero successes is almost never that. Neither is decided here — the
 * audit names them and a person weighs them, which is the same division the rest of this tree keeps.
 */
export function cohortVacuity(verdicts: readonly CohortVerdict[]): CohortVacuity {
  if (verdicts.length === 0) {
    return { criteria: null, neverFailed: [], neverHeld: [], verdicts: 0 }
  }
  const seen = new Map<string, { held: number; failed: number }>()
  for (const v of verdicts) {
    const s = seen.get(v.theorem) ?? { held: 0, failed: 0 }
    if (v.held) s.held += 1
    else s.failed += 1
    seen.set(v.theorem, s)
  }
  return {
    criteria: seen.size,
    neverFailed: [...seen].filter(([, s]) => s.failed === 0).map(([k]) => k).sort(),
    neverHeld: [...seen].filter(([, s]) => s.held === 0).map(([k]) => k).sort(),
    verdicts: verdicts.length,
  }
}
