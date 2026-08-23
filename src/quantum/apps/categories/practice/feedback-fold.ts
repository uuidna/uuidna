// categories/practice/feedback-fold — THE FEEDBACK FOLD (lead 81c, 2 of 4): a student's trials fold to ONE
// order-invariant receipt. Two students who made the same attempts hold the same receipt whatever order they
// practiced in — comparable without sharing a single answer, the privacy the fold buys for free. The aggregation
// is the school's own (aggregateTheoremData); the fold adds only the address. HONEST SCOPE: the receipt
// identifies a body of practice, never ranks a person — comparing receipts says "same work", not "same worth".
import { aggregateTheoremData, type PracticeTrial, type TheoremDifficultyData } from '../../../../school/practice/feedback/loop/index.js'
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'

export interface FeedbackFold { aggregated: TheoremDifficultyData[]; receipt: string; handle: string; trials: number }

export function foldFeedback(trials: readonly PracticeTrial[]): FeedbackFold {
  const aggregated = aggregateTheoremData([...trials])
  // order-invariance by sorting the canonical trial lines before folding — same attempts, same address, any order
  const lines = trials.map((t) => `${t.theoremKey}|${t.verdict}|${t.timeSpent}|${t.hintCount}`).sort()
  const receipt = toUuid('practice-fold|' + lines.join('\n'))
  return { aggregated, receipt, handle: handleOf(receipt), trials: trials.length }
}
