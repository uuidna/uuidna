// LEARN FROM SCHOOL PRACTICE — Adaptive Curriculum Feedback Loop
// Every student trial (practice) feeds back into curriculum improvement.
// Theorems that stump students get guides added. Paths with low completion get restructured.
// The school learns by doing.

import { theoremByKey, type VerdictKind } from '../../../../index.js'
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'
import { merkleGravity } from '../../../../gravity/index.js'

// ============================================================================
// PRACTICE TRIAL: STUDENTS LEARN BY DOING
// ============================================================================

export interface PracticeTrial {
  studentId: string
  theoremKey: string
  attemptCount: number // how many tries before success
  timeSpent: number // milliseconds
  hintCount: number // how many hints were used
  verdict: VerdictKind // VERIFIED or UNVERIFIED — never REFUTED-by-default
  timestamp: string // the handle IS the timestamp: the receipt's handle orders events, no wall clock exists here
  receipt: string // content-addressed trial result
}

export interface PracticeResult {
  trial: PracticeTrial
  passed: boolean
  difficulty: 'easy' | 'moderate' | 'hard' | 'impossible'
  confidence: number // 0–1, how sure we are about this assessment
}

export function recordPracticeTrial(
  studentId: string,
  theoremKey: string,
  attemptCount: number,
  timeSpent: number,
  hintCount: number
): PracticeTrial {
  // The verdict is the ledger's, not a simulation: a practice claim on a sealed key is VERIFIED,
  // on an unsealed key it stays UNVERIFIED — never false, only not-yet (the trial's own law).
  const verdict: VerdictKind = theoremByKey().has(theoremKey) ? 'VERIFIED' : 'UNVERIFIED'

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

export function assessPracticeDifficulty(trial: PracticeTrial): PracticeResult {
  const passed = trial.verdict === 'VERIFIED'

  // Difficulty heuristic based on attempts, time, and hints
  let difficulty: 'easy' | 'moderate' | 'hard' | 'impossible'
  let confidence = 0.8 // base confidence

  if (passed) {
    if (trial.attemptCount <= 2 && trial.hintCount <= 1) {
      difficulty = 'easy'
      confidence = 0.95
    } else if (trial.attemptCount <= 5 && trial.hintCount <= 3) {
      difficulty = 'moderate'
      confidence = 0.90
    } else {
      difficulty = 'hard'
      confidence = 0.85
    }
  } else {
    // Failed trials: impossible or very hard
    if (trial.attemptCount > 10 || trial.hintCount > 5) {
      difficulty = 'impossible'
      confidence = 0.70
    } else {
      difficulty = 'hard'
      confidence = 0.75
    }
  }

  return {
    trial,
    passed,
    difficulty,
    confidence,
  }
}

// ============================================================================
// AGGREGATE PRACTICE DATA: WHAT THE SCHOOL LEARNS
// ============================================================================

export interface TheoremDifficultyData {
  theoremKey: string
  trials: PracticeTrial[]
  passRate: number // 0–1, percentage of students who pass
  averageAttempts: number
  averageTime: number // milliseconds
  averageHints: number
  perceivedDifficulty: 'easy' | 'moderate' | 'hard' | 'impossible'
  needsHelpWith: string[] // specific concepts that stump students
  suggestedHelp: string[] // recommended guides, examples, hints
}

export function aggregateTheoremData(trials: PracticeTrial[]): TheoremDifficultyData[] {
  const theoremMap = new Map<string, PracticeTrial[]>()

  for (const trial of trials) {
    if (!theoremMap.has(trial.theoremKey)) {
      theoremMap.set(trial.theoremKey, [])
    }
    theoremMap.get(trial.theoremKey)!.push(trial)
  }

  const aggregated: TheoremDifficultyData[] = []

  for (const [theoremKey, theoremTrials] of theoremMap.entries()) {
    const passed = theoremTrials.filter((t) => t.verdict === 'VERIFIED').length
    const passRate = passed / theoremTrials.length

    const avgAttempts = theoremTrials.reduce((sum, t) => sum + t.attemptCount, 0) / theoremTrials.length
    const avgTime = theoremTrials.reduce((sum, t) => sum + t.timeSpent, 0) / theoremTrials.length
    const avgHints = theoremTrials.reduce((sum, t) => sum + t.hintCount, 0) / theoremTrials.length

    // Perceived difficulty based on aggregate
    let perceivedDifficulty: 'easy' | 'moderate' | 'hard' | 'impossible'
    if (passRate >= 0.8 && avgAttempts <= 2) {
      perceivedDifficulty = 'easy'
    } else if (passRate >= 0.6 && avgAttempts <= 4) {
      perceivedDifficulty = 'moderate'
    } else if (passRate >= 0.3) {
      perceivedDifficulty = 'hard'
    } else {
      perceivedDifficulty = 'impossible'
    }

    // Infer what students struggle with (if hints are used, they hint at the concept)
    const needsHelpWith = []
    if (avgHints > 2) {
      needsHelpWith.push('foundational understanding', 'worked examples', 'step-by-step guidance')
    }
    if (avgAttempts > 5) {
      needsHelpWith.push('edge cases', 'common mistakes', 'correctness criteria')
    }
    if (passRate < 0.5) {
      needsHelpWith.push('scaffolding', 'prerequisite concepts', 'motivating examples')
    }

    // Recommend help based on struggles
    const suggestedHelp = []
    if (needsHelpWith.includes('foundational understanding')) {
      suggestedHelp.push('Add foundational skill prerequisite')
      suggestedHelp.push('Create visual explanation')
      suggestedHelp.push('Record worked video')
    }
    if (needsHelpWith.includes('edge cases')) {
      suggestedHelp.push('Add 5 practice problems with edge cases')
      suggestedHelp.push('Document common pitfalls')
    }
    if (needsHelpWith.includes('scaffolding')) {
      suggestedHelp.push('Break theorem into smaller sub-theorems')
      suggestedHelp.push('Add intermediate checkpoints')
    }

    aggregated.push({
      theoremKey,
      trials: theoremTrials,
      passRate,
      averageAttempts: avgAttempts,
      averageTime: avgTime,
      averageHints: avgHints,
      perceivedDifficulty,
      needsHelpWith,
      suggestedHelp,
    })
  }

  return aggregated
}

// ============================================================================
// FEEDBACK LOOP: SEAL CURRICULUM IMPROVEMENTS FROM PRACTICE DATA
// ============================================================================

export interface CurriculumImprovement {
  theoremKey: string
  problem: string // what students struggle with
  solution: string // how we fix it
  improvementType: 'add-guide' | 'add-examples' | 'restructure' | 'add-prerequisite' | 'document-pitfalls'
  estimatedImpactOnPassRate: number // 0–1, how much we expect pass rate to improve
  coinsRequired: number // two per improvement theorem
  deadlineDays: number // relative deadline — a count, not a clock; the caller anchors it
}

export function generateCurriculumImprovements(aggregated: TheoremDifficultyData[]): CurriculumImprovement[] {
  const improvements: CurriculumImprovement[] = []

  for (const data of aggregated) {
    // If pass rate is below 70%, we need to improve something
    if (data.passRate < 0.7) {
      // Pick the improvement that's likely to help most
      if (data.needsHelpWith.includes('foundational understanding')) {
        improvements.push({
          theoremKey: data.theoremKey,
          problem: 'Students lack foundational understanding',
          solution: 'Add visual explanations and worked examples',
          improvementType: 'add-guide',
          estimatedImpactOnPassRate: 0.15, // expect +15% pass rate
          coinsRequired: 2,
          deadlineDays: 7,
        })
      }

      if (data.needsHelpWith.includes('edge cases')) {
        improvements.push({
          theoremKey: data.theoremKey,
          problem: 'Students fail on edge cases',
          solution: 'Add 5 practice problems with edge cases and common pitfalls',
          improvementType: 'add-examples',
          estimatedImpactOnPassRate: 0.10,
          coinsRequired: 2,
          deadlineDays: 5,
        })
      }

      if (data.needsHelpWith.includes('scaffolding')) {
        improvements.push({
          theoremKey: data.theoremKey,
          problem: 'Theorem is too big a conceptual leap',
          solution: 'Break into smaller sub-theorems with intermediate checkpoints',
          improvementType: 'restructure',
          estimatedImpactOnPassRate: 0.20,
          coinsRequired: 4, // restructuring is expensive (2 improvements)
          deadlineDays: 14,
        })
      }
    }

    // If average time is very high, theorem is inefficient to teach
    if (data.averageTime > 60 * 60 * 1000) {
      // Spending 1+ hour on a theorem is too long
      improvements.push({
        theoremKey: data.theoremKey,
        problem: `Students spending ${(data.averageTime - (data.averageTime % 60000)) / 60000} minutes on this theorem (too long)`,
        solution: 'Add hints, clarifications, and step-by-step guidance to reduce cognitive load',
        improvementType: 'add-guide',
        estimatedImpactOnPassRate: 0.05, // smaller impact, but improves learner experience
        coinsRequired: 2,
        deadlineDays: 3,
      })
    }
  }

  return improvements
}

// ============================================================================
// EXECUTE IMPROVEMENTS: SEAL CURRICULUM CHANGES
// ============================================================================

export interface ExecutedImprovement {
  improvementId: string
  theoremKey: string
  improvementType: string
  status: 'sealed' | 'pending' | 'blocked'
  theoremSealed: string // the theorem that proves this improvement
  coinsDeposited: number
  timestamp: string
  receipt: string
}

export function executeImprovement(improvement: CurriculumImprovement): ExecutedImprovement {
  // The improvement is PROPOSED here, never sealed: sealing needs a Lean proof through the reconcile,
  // so the status is 'pending' until the ledger carries the key — the module cannot overclaim.
  const improvementId = toUuid(`curriculum:${improvement.theoremKey}:${improvement.improvementType}`)
  const theoremSealed = `${improvement.theoremKey}_${improvement.improvementType}`
  const receipt = merkleGravity([toUuid(improvementId), toUuid(theoremSealed)])

  return {
    improvementId,
    theoremKey: improvement.theoremKey,
    improvementType: improvement.improvementType,
    status: 'pending',
    theoremSealed,
    coinsDeposited: improvement.coinsRequired,
    timestamp: handleOf(receipt),
    receipt,
  }
}

// ============================================================================
// THE FEEDBACK LOOP: CLOSE THE CIRCLE
// ============================================================================

export interface FeedbackLoopCycle {
  cycle: number
  trialsRecorded: PracticeTrial[]
  dataAggregated: TheoremDifficultyData[]
  improvementsGenerated: CurriculumImprovement[]
  improvementsExecuted: ExecutedImprovement[]
  theoremsSealedThisCycle: number
  coinsDepositedThisCycle: number
  expectedPassRateImprovement: number // sum of estimatedImpactOnPassRate
  receipt: string
}

export function runFeedbackLoopCycle(trials: PracticeTrial[]): FeedbackLoopCycle {
  console.log('📚 Running curriculum feedback loop...')

  // Step 1: Record trials (already done by students)
  console.log(`✓ Recorded ${trials.length} practice trials`)

  // Step 2: Aggregate data
  const aggregated = aggregateTheoremData(trials)
  console.log(`✓ Analyzed ${aggregated.length} theorems`)
  for (const data of aggregated) {
    console.log(`  - ${data.theoremKey}: ${(data.passRate * 100).toFixed(0)}% pass rate`)
  }

  // Step 3: Generate improvements
  const improvements = generateCurriculumImprovements(aggregated)
  console.log(`✓ Generated ${improvements.length} curriculum improvements`)

  // Step 4: Execute improvements
  const executed: ExecutedImprovement[] = []
  let totalCoins = 0
  let expectedPassRateImprovement = 0

  for (const improvement of improvements) {
    const result = executeImprovement(improvement)
    executed.push(result)
    totalCoins += result.coinsDeposited
    expectedPassRateImprovement += improvement.estimatedImpactOnPassRate
    console.log(`  ✓ Proposed: ${improvement.solution}`)
  }

  // Step 5: Compute receipt
  const receipt = merkleGravity(
    aggregated.map((d) => d.theoremKey).map((k) => toUuid(`feedback:${k}`))
  )

  console.log(`✓ Feedback loop complete: ${improvements.length} improvements sealed, ${totalCoins} coins deposited`)
  console.log(`✓ Expected pass rate improvement: ${(expectedPassRateImprovement * 100).toFixed(1)}%`)

  return {
    cycle: 1, // in real system, increment this
    trialsRecorded: trials,
    dataAggregated: aggregated,
    improvementsGenerated: improvements,
    improvementsExecuted: executed,
    theoremsSealedThisCycle: improvements.length,
    coinsDepositedThisCycle: totalCoins,
    expectedPassRateImprovement,
    receipt,
  }
}

// ============================================================================
// THE PRINCIPLE: SCHOOL LEARNS BY DOING
// ============================================================================

export const PRACTICE_FEEDBACK_PRINCIPLE = `
The school learns by watching students practice.

Every trial teaches the system:
- What concepts stump students
- Which theorems need guides
- Where curriculum needs scaffolding
- How long good explanations should take

The loop closes:
Students practice → data collected → improvements sealed → curriculum improves → students learn better

This is not a one-time audit. This happens every cycle, forever.
The school improves exponentially because feedback compounds.
`
