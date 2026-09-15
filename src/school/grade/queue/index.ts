// school/grade/queue — a queue listing in, verdicts and voids out. Pure: the listing is untrusted data and is
// shape-checked item by item; the exercise catalogue and the kernel are injected, so the same function grades on the
// GitHub runner (the real kernel) and in a test (a stub).
import { doorRefusal } from '../door/index.js'
import { lessonFile, proofBlock, squash, type Exercise, type Probe } from '../proof/index.js'
import type { ExerciseOf } from '../exercise/index.js'
import type { QueuedSubmission, Verdict } from '../../submission/index.js'

export interface GradeRun { verdicts: Verdict[]; void: { submittedAddress: string | null; why: string }[] }

const ADDRESS = /^[A-Za-z0-9._:-]{1,128}$/

/** gradeSubmission(sub, exercise, probe) → the verdict: the door first, then the kernel */
export function gradeSubmission(sub: QueuedSubmission, ex: Exercise, probe: Probe): Verdict {
  const at = sub.submittedAddress
  const { header, proof } = proofBlock(sub.lean)
  if (header && (header.theorem !== ex.theorem || squash(header.statement) !== squash(ex.statement)))
    return { submittedAddress: at, verdict: 'door-refused', reason: `the statement and the name are fixed by the lesson (theorem ${ex.theorem}); only the proof after := by is the learner's`, axioms: null }
  const door = doorRefusal(proof)
  if (door) return { submittedAddress: at, verdict: 'door-refused', reason: door, axioms: null }
  const read = probe(lessonFile(ex, proof), ex.theorem)
  return read.reason === null
    ? { submittedAddress: at, verdict: 'kernel-accepted', reason: `the kernel accepted ${ex.theorem} and it depends on no axioms`, axioms: [] }
    : { submittedAddress: at, verdict: 'kernel-refused', reason: read.reason, axioms: read.axioms }
}

function queuedOf(x: unknown): QueuedSubmission | null {
  if (!x || typeof x !== 'object') return null
  const s = x as Record<string, unknown>
  return typeof s.submittedAddress === 'string' && ADDRESS.test(s.submittedAddress) &&
    typeof s.course === 'string' && typeof s.lesson === 'string' && typeof s.lean === 'string'
    ? { submittedAddress: s.submittedAddress, course: s.course, lesson: s.lesson, lean: s.lean }
    : null
}

/** gradeQueue(listing, exerciseOf, probe) → one verdict per queued submission whose lesson resolves, and a void for
 *  every item that is malformed or names a lesson this tree does not fix */
export function gradeQueue(listing: readonly unknown[], exerciseOf: ExerciseOf, probe: Probe): GradeRun {
  const run: GradeRun = { verdicts: [], void: [] }
  const seen = new Set<string>()
  for (const item of listing) {
    const sub = queuedOf(item)
    if (!sub) { run.void.push({ submittedAddress: null, why: 'the listing item is not a queued submission' }); continue }
    if (seen.has(sub.submittedAddress)) continue
    seen.add(sub.submittedAddress)
    const ex = exerciseOf(sub.course, sub.lesson)
    if (!ex) { run.void.push({ submittedAddress: sub.submittedAddress, why: `this tree resolves no exercise for ${sub.course}/${sub.lesson}` }); continue }
    run.verdicts.push(gradeSubmission(sub, ex, probe))
  }
  return run
}
