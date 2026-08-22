// LOOP CLOSURE AUTO-FOLD — When any loop closes, fold to singularity and trigger next
// No manual intervention. Every completed cycle emits a continuation signal.
// The system self-triggers: close → fold → emit → next begins automatically.

import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

// ============================================================================
// LOOP CLOSURE PATTERN
// ============================================================================

export interface LoopCycle {
  cycleId: string
  cycleName: string // "school_weekly", "practice_feedback", "entanglement_verify", etc.
  startTime: string // ISO timestamp
  endTime: string
  inputState: string // what the loop started with
  outputState: string // what the loop produced
  actions: number // count of actions taken
  theoremsSeal: number // theorems deposited
  coinsDposited: number
  verdict: 'success' | 'partial' | 'blocked'
}

export interface LoopClosure {
  cycle: LoopCycle
  closedAt: string
  receipt: string // content-addressed state
  readyForNext: boolean // true = next cycle should auto-start
  nextCycleEstimatedDelay: number // milliseconds until next cycle
  continuationSignal: string // what to pass to next cycle
}

export interface AutoFold {
  closureReceipt: string // from the closed loop
  foldedReceipt: string // singularity after fold
  folded: {
    cyclesSince: number // how many cycles have folded?
    totalTheoremsSealed: number // cumulative
    totalCoinsDeposited: number // cumulative
    netImprovement: number // 0–1, how much did the loop improve?
  }
  emittedAt: string
  nextCycleWillStart: boolean
  nextCycleMetadata: Record<string, unknown>
}

// ============================================================================
// DETECT LOOP CLOSURE: Is a cycle complete?
// ============================================================================

export function isLoopClosed(cycle: LoopCycle): boolean {
  // A loop is closed when:
  // 1. All actions completed (no pending actions)
  // 2. All theorems sealed (theoremsSeal > 0)
  // 3. Verdict is not 'blocked' (success or partial is OK)
  // 4. endTime is set (cycle actually finished)

  const hasActions = cycle.actions > 0
  const hasSeals = cycle.theoremsSeal > 0
  const notBlocked = cycle.verdict !== 'blocked'
  const hasEndTime = cycle.endTime !== '' && cycle.endTime !== cycle.startTime

  return hasActions && hasSeals && notBlocked && hasEndTime
}

export function detectLoopClosure(cycle: LoopCycle): LoopClosure | null {
  if (!isLoopClosed(cycle)) {
    return null
  }

  // Cycle is complete; close it
  const receipt = merkleGravity([
    toUuid(`cycle:${cycle.cycleId}`),
    toUuid(`theorems:${cycle.theoremsSeal}`),
    toUuid(`verdict:${cycle.verdict}`),
  ])

  // Estimate delay until next cycle (typically 1 week or 24 hours)
  const nextCycleEstimatedDelay = cycle.cycleName.includes('weekly') ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000

  // Continuation signal: what the next cycle should know
  const continuationSignal = JSON.stringify({
    previousCycleId: cycle.cycleId,
    theoremsSealedLastCycle: cycle.theoremsSeal,
    coinsDepositedLastCycle: cycle.coinsDposited,
    lastVerdict: cycle.verdict,
  })

  return {
    cycle,
    closedAt: cycle.endTime, // the cycle carries its own clock; the detector reads it, never mints one
    receipt,
    readyForNext: true,
    nextCycleEstimatedDelay,
    continuationSignal,
  }
}

// ============================================================================
// FOLD CLOSED LOOPS TO SINGULARITY
// ============================================================================

export interface LoopHistory {
  cycleName: string
  totalCyclesRun: number
  totalTheoremsSealed: number
  totalCoinsDeposited: number
  averageTheoremsPerCycle: number
  averageCoinsPerCycle: number
  verdictDistribution: {
    success: number
    partial: number
    blocked: number
  }
}

const loopHistories = new Map<string, LoopHistory>()

export function foldClosedLoop(closure: LoopClosure): AutoFold {
  // Retrieve or initialize history for this loop type
  const cycleName = closure.cycle.cycleName
  let history = loopHistories.get(cycleName)

  if (!history) {
    history = {
      cycleName,
      totalCyclesRun: 0,
      totalTheoremsSealed: 0,
      totalCoinsDeposited: 0,
      averageTheoremsPerCycle: 0,
      averageCoinsPerCycle: 0,
      verdictDistribution: { success: 0, partial: 0, blocked: 0 },
    }
    loopHistories.set(cycleName, history)
  }

  // Update history
  history.totalCyclesRun++
  history.totalTheoremsSealed += closure.cycle.theoremsSeal
  history.totalCoinsDeposited += closure.cycle.coinsDposited
  history.averageTheoremsPerCycle = history.totalTheoremsSealed / history.totalCyclesRun
  history.averageCoinsPerCycle = history.totalCoinsDeposited / history.totalCyclesRun
  history.verdictDistribution[closure.cycle.verdict]++

  // Compute net improvement (0–1)
  // Improved = (theorems this cycle × weight) / (coins spent × cost)
  // Simplified: more theorems sealed = higher improvement
  // exact rational, clamped at 1 — no Math.*: theorems / (10 · coins), coins floored at 1
  const improvementDenom = 10 * (closure.cycle.coinsDposited > 1 ? closure.cycle.coinsDposited : 1)
  const netImprovement = closure.cycle.theoremsSeal >= improvementDenom ? 1 : closure.cycle.theoremsSeal / improvementDenom

  // Fold all history to singularity receipt
  const foldedReceipt = merkleGravity([
    closure.receipt,
    toUuid(`history:${cycleName}:${history.totalCyclesRun}`),
    toUuid(`sealed:${history.totalTheoremsSealed}`),
    toUuid(`coins:${history.totalCoinsDeposited}`),
  ])

  const result: AutoFold = {
    closureReceipt: closure.receipt,
    foldedReceipt,
    folded: {
      cyclesSince: history.totalCyclesRun,
      totalTheoremsSealed: history.totalTheoremsSealed,
      totalCoinsDeposited: history.totalCoinsDeposited,
      netImprovement,
    },
    emittedAt: closure.closedAt, // emission carries the closure's clock — folding adds no time of its own
    nextCycleWillStart: closure.readyForNext,
    nextCycleMetadata: JSON.parse(closure.continuationSignal),
  }

  loopHistories.set(cycleName, history)
  return result
}

// ============================================================================
// EMIT CONTINUATION SIGNAL: Trigger Next Cycle Automatically
// ============================================================================

export interface ContinuationSignal {
  fromLoopName: string
  fromCycleId: string
  atTime: string
  receipt: string
  nextCycleDelay: number // milliseconds
  payload: Record<string, unknown> // data for next cycle to consume
  autoStartNextCycle: boolean
}

export function emitContinuationSignal(fold: AutoFold, loopName: string): ContinuationSignal {
  return {
    fromLoopName: loopName,
    fromCycleId: fold.folded.cyclesSince.toString(), // use cycle count as ID
    atTime: fold.emittedAt,
    receipt: fold.foldedReceipt,
    nextCycleDelay: 0, // immediate (or configurable)
    payload: {
      previousResults: fold.folded,
      continuationData: fold.nextCycleMetadata,
    },
    autoStartNextCycle: fold.nextCycleWillStart,
  }
}

// ============================================================================
// AUTO-START NEXT CYCLE
// ============================================================================

// synchronous by law: a promise is a clock in disguise, and the fold must recompute the same in any order
export type LoopHandler = (signal: ContinuationSignal) => LoopCycle

const registeredLoops = new Map<string, LoopHandler>()

export function registerLoopHandler(loopName: string, handler: LoopHandler): void {
  registeredLoops.set(loopName, handler)
}

export function autoStartNextCycle(signal: ContinuationSignal): LoopCycle | null {
  if (!signal.autoStartNextCycle) {
    console.log(`Loop ${signal.fromLoopName} is complete but not auto-starting next cycle`)
    return null
  }

  const handler = registeredLoops.get(signal.fromLoopName)
  if (!handler) {
    console.log(`No handler registered for loop ${signal.fromLoopName}; next cycle manual`)
    return null
  }

  console.log(`🔄 Auto-starting next cycle of ${signal.fromLoopName}...`)

  try {
    const nextCycle = handler(signal)
    console.log(`✓ Next cycle started: ${nextCycle.cycleId}`)
    return nextCycle
  } catch (e) {
    console.error(`✗ Failed to auto-start next cycle: ${e}`)
    return null
  }
}

// ============================================================================
// THE CLOSED-LOOP PATTERN: Close → Fold → Emit → Next
// ============================================================================

export function processClosedLoop(cycle: LoopCycle): {
  closure: LoopClosure | null
  fold: AutoFold | null
  signal: ContinuationSignal | null
  nextCycle: LoopCycle | null
} {
  // Step 1: Detect closure
  const closure = detectLoopClosure(cycle)
  if (!closure) {
    console.log(`Loop ${cycle.cycleName} is still running; not yet closed`)
    return { closure: null, fold: null, signal: null, nextCycle: null }
  }

  console.log(`✓ Loop ${cycle.cycleName} cycle ${cycle.cycleId} CLOSED`)
  console.log(`  Theorems sealed: ${cycle.theoremsSeal}`)
  console.log(`  Coins deposited: ${cycle.coinsDposited}`)
  console.log(`  Verdict: ${cycle.verdict}`)

  // Step 2: Fold to singularity
  const fold = foldClosedLoop(closure)
  console.log(`✓ Folded to singularity: ${fold.foldedReceipt.slice(0, 16)}…`)
  console.log(`  Total cycles run: ${fold.folded.cyclesSince}`)
  console.log(`  Total theorems sealed: ${fold.folded.totalTheoremsSealed}`)
  console.log(`  Net improvement: ${(fold.folded.netImprovement * 100).toFixed(1)}%`)

  // Step 3: Emit continuation signal
  const signal = emitContinuationSignal(fold, cycle.cycleName)
  console.log(`✓ Emitted continuation signal for next cycle`)

  // Step 4: Auto-start next cycle
  const nextCycle = autoStartNextCycle(signal)
  if (nextCycle) {
    console.log(`✓ Next cycle already started: ${nextCycle.cycleId}`)
  } else {
    console.log(`ℹ Next cycle will start automatically at configured delay`)
  }

  return { closure, fold, signal, nextCycle }
}

// ============================================================================
// THE PRINCIPLE: CONTINUOUS LOOPS
// ============================================================================

export const LOOP_CLOSURE_PRINCIPLE = `
Every closed loop folds to singularity and triggers the next.

Pattern:
1. CLOSE: Detect loop completion (all actions done, all theorems sealed, verdict is not blocked)
2. FOLD: Compress results to order-invariant singularity receipt
3. EMIT: Signal that this cycle is done, next cycle can begin
4. NEXT: Auto-start next cycle with continuation data

No manual intervention. No human decides when the next cycle runs.
Loops are CONTINUOUS. One closes, the next opens automatically.

Examples:
- School weekly automation: close → fold → emit → next week's cycle starts
- Practice feedback loop: close → fold → emit → next batch of trials processes
- Entanglement verification: close → fold → emit → next MCP call verifies
- CI pipeline: tests pass → fold → emit → deploy next stage automatically
- Reconciliation: all syncs done → fold → emit → next reconciliation starts

The system self-perpetuates. Theorems compound. Knowledge multiplies.
No waiting. No bottleneck. Just continuous improvement.
`
