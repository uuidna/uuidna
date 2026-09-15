// school/submission — THE ONE RECORD A PROOF EXERCISE BECOMES, shared by the learner's door and the kernel grader.
//
// A proof exercise is a lesson's Lean line with `sorry` where the proof goes (lesson/shape proofExerciseOf); a learner
// replaces it and submits. This module shapes and addresses the submission; the Worker stores it in the SCHOOL KV
// namespace under `school/submission/<address>` with status QUEUED, and the grader (src/school/grade) records the
// kernel's verdict on the same record. A learner is a pseudonymous handle and nothing else: no field carries personal
// data, and the grader's public queue listing omits the handle too.
import { toUuid, canonicalJson } from '../../address.js'
import { doorRefusal } from '../grade/door/index.js'
import { proofBlock } from '../grade/proof/index.js'

/** the status a submission holds until the kernel speaks */
export const QUEUED = 'queued for the kernel'

export type KernelVerdict = 'kernel-accepted' | 'kernel-refused' | 'door-refused'
export const KERNEL_VERDICTS: readonly KernelVerdict[] = ['kernel-accepted', 'kernel-refused', 'door-refused']
export type SubmissionStatus = typeof QUEUED | KernelVerdict

/** the signed provenance of a recorded verdict, read from the OIDC token's claims */
export interface GradedBy { workflowRef: string; sha: string; runId: string }

/** the stored submission: written QUEUED by POST /school/submit, graded in place by POST /school/grade */
export interface Submission {
  kind: 'school-submission'
  handle: string
  course: string
  lesson: string
  /** the whole exercise text with the hole filled */
  lean: string
  /** toUuid of the canonical {handle, course, lesson, lean} — the submission's own address */
  submittedAddress: string
  status: SubmissionStatus
  /** set when a kernel verdict is recorded */
  reason?: string
  axioms?: string[] | null
  gradedBy?: GradedBy
}

/** what the public queue listing serves the grader: no handle */
export interface QueuedSubmission { submittedAddress: string; course: string; lesson: string; lean: string }

/** one verdict, as the kernel job writes it and POST /school/grade reads it */
export interface Verdict {
  submittedAddress: string
  verdict: KernelVerdict
  reason: string
  /** [] = the kernel vouched for the term with no axioms; null = no axiom verdict was read */
  axioms: string[] | null
}

/** the Workers KV surface the school's doors use — the SCHOOL namespace */
export interface KvLike {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  list(opts: { prefix: string; cursor?: string; limit?: number }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>
}

/** the key a submission is stored under */
export const SUBMISSION_PREFIX = 'school/submission/'
export const submissionKey = (address: string): string => SUBMISSION_PREFIX + address

/** the largest submission accepted — a request-size bound; a proof of one sealed statement fits well within it */
export const LEAN_BYTES_MAX = 65_536

export const submittedAddressOf = (handle: string, course: string, lesson: string, lean: string): string =>
  toUuid(canonicalJson({ handle, course, lesson, lean }))

/** submissionOf(handle, course, lesson, lean) → a queued submission, or why it is refused before the kernel sees it.
 *  The learner proves the SEALED statement: the submission must declare `theorem <key> : <statement> := by` with the
 *  lesson's name and statement, and its proof block must pass the grader's door — the same two checks the grader
 *  applies, so nothing is queued that the grader would refuse unseen. */
export function submissionOf(handle: string, course: string, lesson: { key: string; statement: string }, lean: string):
  { ok: true; submission: Submission } | { ok: false; why: string } {
  if (new TextEncoder().encode(lean).length > LEAN_BYTES_MAX) return { ok: false, why: `a submission is at most ${LEAN_BYTES_MAX} bytes` }
  const { header, proof } = proofBlock(lean)
  const squash = (s: string): string => s.replace(/\s+/g, ' ').trim()
  if (!header || header.theorem !== lesson.key || squash(header.statement) !== squash(lesson.statement))
    return { ok: false, why: `the submission must declare the sealed statement: theorem ${lesson.key} : ${lesson.statement} := by` }
  const door = doorRefusal(proof)
  if (door) return { ok: false, why: door }
  return {
    ok: true,
    submission: { kind: 'school-submission', handle, course, lesson: lesson.key, lean, submittedAddress: submittedAddressOf(handle, course, lesson.key, lean), status: QUEUED },
  }
}
