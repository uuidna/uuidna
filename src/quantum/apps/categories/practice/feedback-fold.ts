// categories/practice/feedback-fold — THE FEEDBACK FOLD: trials fold to ONE order-invariant receipt.
// Aggregation of school difficulty lives on the mill; this leaf only addresses the attempts.
import { type PracticeTrial } from '../../../../school/practice/feedback/loop/trial/index.js'
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'

export interface FeedbackFold { receipt: string; handle: string; trials: number }

export function foldFeedback(trials: readonly PracticeTrial[]): FeedbackFold {
  const lines = trials.map((t) => `${t.theoremKey}|${t.verdict}|${t.timeSpent}|${t.hintCount}`).sort()
  const receipt = toUuid('practice-fold|' + lines.join('\n'))
  return { receipt, handle: handleOf(receipt), trials: trials.length }
}
