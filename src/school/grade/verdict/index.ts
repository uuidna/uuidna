// school/grade/verdict — recording a kernel verdict on a submission, and reading it back. Pure: no storage, no clock.
import { doorRefusal } from '../door/index.js'
import { proofBlock } from '../proof/index.js'
import { KERNEL_VERDICTS, QUEUED, type GradedBy, type KernelVerdict, type Submission, type Verdict } from '../../submission/index.js'

const ADDRESS = /^[A-Za-z0-9._:-]{1,128}$/
const REASON_MAX = 2000

/** verdictOf(x) → x as a Verdict when it has exactly the shape the kernel job writes, else null */
export function verdictOf(x: unknown): Verdict | null {
  if (!x || typeof x !== 'object') return null
  const v = x as Record<string, unknown>
  if (typeof v.submittedAddress !== 'string' || !ADDRESS.test(v.submittedAddress)) return null
  if (typeof v.verdict !== 'string' || !(KERNEL_VERDICTS as readonly string[]).includes(v.verdict)) return null
  if (typeof v.reason !== 'string') return null
  const axioms = v.axioms
  if (axioms !== null && !(Array.isArray(axioms) && axioms.every((a) => typeof a === 'string' && a.length <= 200))) return null
  return { submittedAddress: v.submittedAddress, verdict: v.verdict as KernelVerdict, reason: v.reason.slice(0, REASON_MAX), axioms: axioms as string[] | null }
}

/** applyVerdict(sub, v, by) → the graded record, or the reason the verdict is ignored. A verdict lands only on a
 *  submission still queued, and only when it agrees with what this side can recompute: an accepted proof must carry
 *  no axioms, and must be one the door admits — the grader never shows the kernel a proof the door refuses. */
export function applyVerdict(sub: Submission, v: Verdict, by: GradedBy): { record: Submission } | { ignored: string } {
  if (sub.submittedAddress !== v.submittedAddress) return { ignored: 'the verdict names a different submission' }
  if (sub.status !== QUEUED) return { ignored: `the submission is not queued (status: ${sub.status})` }
  if (v.verdict === 'kernel-accepted') {
    if (!Array.isArray(v.axioms) || v.axioms.length) return { ignored: 'an accepted verdict must carry an empty axiom list' }
    const door = doorRefusal(proofBlock(sub.lean).proof)
    if (door) return { ignored: `the door refuses this proof (${door}), so the grader could not have shown it to the kernel` }
  }
  return { record: { ...sub, status: v.verdict, reason: v.reason, axioms: v.axioms, gradedBy: by } }
}

/** kernelGraded(sub) → true when the kernel accepted this submission with no axioms and the verdict carries its
 *  signed provenance. Mastery and certificates count these. */
export function kernelGraded(sub: Submission): boolean {
  return sub.status === 'kernel-accepted' && Array.isArray(sub.axioms) && sub.axioms.length === 0 &&
    !!sub.gradedBy && typeof sub.gradedBy.workflowRef === 'string' && sub.gradedBy.workflowRef.length > 0
}
