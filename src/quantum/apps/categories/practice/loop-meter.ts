// categories/practice/loop-meter — THE LOOP-CLOSURE METER (lead 81c, 3 of 4): when does practice CLOSE? The
// trinity closes the loop: three consecutive correct recomputations, because one right answer is a step and a
// step is not a walk (the ledger paid for that lesson), two could be the coin-pair of luck, and three is the
// smallest walk the rosette's own generator takes. The meter is exact: closed or not, streak counted, remainder
// named — never a percentage feeling. closure measures CONSISTENT RECOMPUTATION of one sealed
// statement, not mastery of a field and not intelligence; the loop reopens the moment an attempt fails, because
// a ratchet that cannot reopen is a certificate, not a meter.
export const CLOSES_AT = 3   // the trinity: the smallest walk that is not a step and not a coin-toss pair

export interface LoopMeter { closed: boolean; streak: number; needed: number; attempts: number; reopened: number }

export function meterLoop(attempts: readonly boolean[]): LoopMeter {
  let streak = 0
  let reopened = 0
  for (const a of attempts) {
    if (a) streak += 1
    else { if (streak > 0) reopened += 1; streak = 0 }
  }
  const closed = streak >= CLOSES_AT
  return { closed, streak, needed: closed ? 0 : CLOSES_AT - streak, attempts: attempts.length, reopened }
}
