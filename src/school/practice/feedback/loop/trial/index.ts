// school/practice/feedback/loop/trial — one practice attempt, folded. Verdict is an argument: the mill
// looks the key up; the monitor already holds a sealed drill and does not recompute the ledger.
import { toUuid } from '../../../../../address.js'
import { handleOf } from '../../../../../handle.js'
import type { VerdictKind } from '../../../../../adjudicate.js'

export interface PracticeTrial {
  studentId: string
  theoremKey: string
  attemptCount: number
  timeSpent: number
  hintCount: number
  verdict: VerdictKind
  timestamp: string
  receipt: string
}

/** foldPracticeTrial(...) → one addressed attempt. Verdict is passed in, never looked up here. */
export function foldPracticeTrial(
  studentId: string,
  theoremKey: string,
  attemptCount: number,
  timeSpent: number,
  hintCount: number,
  verdict: VerdictKind,
): PracticeTrial {
  const receipt = toUuid(`practice:${studentId}:${theoremKey}:${attemptCount}:${verdict}`)
  return {
    studentId,
    theoremKey,
    attemptCount,
    timeSpent,
    hintCount,
    verdict,
    timestamp: handleOf(receipt),
    receipt,
  }
}
