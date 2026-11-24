# Assessment in the twelve-area school

> GENERATED from `src/school-assessment.ts`. Every figure below is read from the live ledger at generation time,
> never typed. The architecture is the captain's (2026-09-28); the mapping to evidence is derived from what this
> ledger already does to its own theorems.

## The four dimensions are the five legs

Every sealed theorem here is assessed by independent legs: a kernel proof, an independent falsifier, a content
address, an external witness, a symbolic form. The captain's transversal dimensions ask for those same kinds of
evidence about a student's work instead of a theorem's.

| dimension | means | leg | evidence | fails when |
| --- | --- | --- | --- | --- |
| **Making** | students produce, build, perform or test something | `address` | an artefact with a content address, AND a falsifiable claim about it that another party can recompute | the artefact is absent, its address does not recompute, or its claim cannot fail |
| **Understanding** | theory, knowledge, history and concepts | `proof` | the claim derived so that someone who was not present can check the derivation | an assertion the student cannot reconstruct on request |
| **Reflecting** | ethics, critical thinking and self-reflection | `falsifier` | the student states what would refute them, and a SECOND independent reading is recorded | no statable refutation, or a single reading — self-assessment is self-witnessing |
| **Encountering** | people, communities, places and the outside world | `witness` | an anchor outside the school: a person, an institution, or a place record that can be consulted | a self-reported encounter with nothing outside the school to consult |

## The ledger's own distribution predicts the difficulty

Measured across 72409 sealed theorems:

| leg | carried by | share |
| --- | --- | --- |
| `proof` | 72409 | 100.00% |
| `falsifier` | 72409 | 100.00% |
| `address` | 72409 | 100.00% |
| `symbol` | 1419 | 1.96% |
| `witness` | 51 | 0.07% |

So Making and Understanding are cheap to evidence, Reflecting harder, and **Encountering by far the scarcest** —
an anchor outside the institution is the expensive kind. A curriculum claiming rich Encountering across twelve areas
is claiming what the analogous system achieves in a fraction of one percent of cases.

## Assessment is a vector, never an average

The seal this repository mints is refused unless every component of its equilibrium holds. An average is what lets a
strong Making conceal an absent Reflecting, so a project's assessment is the set of cells it CLAIMS, each holding or
not. No cell is self-certifiable: Making, Understanding, Reflecting, Encountering each require a second party.

## Reflecting cannot be self-certified

A student grading their own reflection is the failure this repository calls the ledger that witnessed itself, and one
teacher is one hand — symbol and proof "are written by one hand and share that hand's errors". Reflecting takes two
independent readings, and a disagreement between them is RECORDED rather than resolved by seniority, the way
`cross-surface` treats every probe disagreement as a lead.

## What must not be given a fake check

Areas 4, 9, 11, 12 — Society, History & Human Thought; Life Skills & Society; World, Cultures & Global Perspectives; Environment of the Self — carry no decidable criterion.
Their evidence is witness plus recorded disagreement, which is genuinely weaker than a kernel verdict, and the
honest move is to record that difference rather than dress it up. `UNVERIFIED` means "not decidable by this
instrument", never "absent" and never "false".

## The vacuity audit

Two defects, failing in opposite directions.

**More than one right answer.** The school's exercises are *predict the value*: one numeral blanked, the learner
fills it. `exerciseOf` already refuses a blank unless it discriminates against the answer ±1, so `16 < 20` is never
asked as a one-answer question. That guard tests two neighbours. A congruence passes it and stays wide open:
`x % 9 = 4` refuses 3 and 5 and accepts 13, 22, 31 and every further step of nine. Sweeping a window derived from
the answer finds these.

Measured now: **71 of 3242 offered exercises have more than one right answer** (2.2%), sweeping values below 64. A wider sweep would find more: the bound is carried in every finding, so "none found" is never "none exists".

**Nobody ever fails it.** A criterion at zero failures may be teaching that worked, or an instrument that is not
measuring, and the two are indistinguishable without failures — so this half needs a cohort.

Measured now: **NOT READ**. No verdicts exist, because storing a submission needs the `SCHOOL` KV namespace and
`wrangler kv namespace create SCHOOL` is an owner act. An audit reporting "no vacuous criteria" over an empty
cohort would be the exact defect it exists to find, so it reports that it did not run.

