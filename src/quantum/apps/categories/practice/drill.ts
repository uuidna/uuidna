// categories/practice/drill — THE DRILL (lead 81c, 1 of 4): a sealed theorem presented as a recompute challenge.
// The student does not read that a theorem is true — they are handed its exact statement and its case count and
// asked to recompute; the drill records the attempt through the school's own loop (recordPracticeTrial), so a
// drill IS a practice trial, never a flashcard. Pure over the ledger the caller passes. HONEST SCOPE: the drill
// presents and records; it never grades understanding — the statement either recomputes for the student or the
// walker (4 of 4) names what to learn first.
import { foldPracticeTrial, type PracticeTrial } from '../../../../school/practice/feedback/loop/trial/index.js'

export interface TheoremLike { key: string; name: string; statement: string; cases?: number; skill?: string }
export interface Drill { key: string; name: string; statement: string; cases: number; skill: string }

export function drillOf(key: string, ledger: readonly TheoremLike[]): Drill {
  const t = ledger.find((x) => x.key === key)
  if (!t) throw new Error(`drill: ${key} is not sealed — only the sealed can be drilled; the open belongs to /open-questions`)
  return { key: t.key, name: t.name, statement: t.statement, cases: t.cases ?? 1, skill: t.skill ?? 'unskilled' }
}

/** the attempt, recorded the school's way — the caller keeps the trials; nothing is stored here. The loop's
 *  verdict is the LEDGER's (a sealed key verifies), so `correct` here feeds attemptCount/hintCount bookkeeping:
 *  a wrong attempt is attempt 1 with a hint owed, a right one attempt 1 clean — the same trial law, adapted. */
export function attemptDrill(d: Drill, correct: boolean, ms: number, student = 'anonymous'): PracticeTrial {
  return foldPracticeTrial(student, d.key, 1, ms, correct ? 0 : 1, 'VERIFIED')
}
