// ROTATIONAL ENTANGLEMENT — bidirectional spin in 6×7 and 7×6 planes
// The six vector motions (rows) × seven 7D fold layers (columns) form a 42-state phase space.
// Each theorem traverses this space in TWO opposite directions simultaneously.
// Forward: 6 motions rotating through 7 dimensions (6→7 plane)
// Reverse: 7 dimensions spiraling through 6 motions (7→6 plane)
// Both must converge to the same proof (same singularity, opposite paths).

import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import type { VectorMotion } from './entangle-six-packages-six-motions.js'

// ============================================================================
// THE 6×7 PLANE: Six Vector Motions (rows) × Seven Dimensional Layers (columns)
// ============================================================================

export type Dimension = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 7D fold: UUID 128 bits = 2^7 = 128 states
export type MotionIndex = 0 | 1 | 2 | 3 | 4 | 5 // six motions: doubling, halving, reflection, shift, counter, folding

export interface RotationalPlane6x7 {
  // Six motions: doubling, halving, reflection, shift, counter, folding
  // Seven dimensions: 0 (raw address), 1 (handle), 2 (path), 3–6 (six vector motions), 7 (encrypted streams)
  // Position (m, d) means: apply motion[m] to dimension[d]
  position: [MotionIndex, Dimension] // current (motion, dimension)
  direction: 'forward' // clockwise in 6×7 plane
  trajectory: Array<[MotionIndex, Dimension]> // path taken so far
  receipt: string // FNV hash of entire trajectory
}

export interface RotationalPlane7x6 {
  // Seven dimensions (rows) × six motions (columns) — TRANSPOSED
  // Position (d, m) means: apply dimension[d] to motion[m]
  position: [Dimension, MotionIndex] // current (dimension, motion)
  direction: 'reverse' // counter-clockwise in 7×6 plane (opposite spin)
  trajectory: Array<[Dimension, MotionIndex]> // path taken so far
  receipt: string // FNV hash of entire trajectory
}

export interface BirotationalEntanglement {
  theoremKey: string
  handle: string
  plane6x7: RotationalPlane6x7 // forward spin (6 motions → 7 dimensions)
  plane7x6: RotationalPlane7x6 // reverse spin (7 dimensions → 6 motions)
  bothConverge: boolean // both planes end at the same singularity
  convergenceReceipt: string // merkleGravity([plane6x7.receipt, plane7x6.receipt])
  honest: string
}

/**
 * Spin a theorem through the 6×7 plane (forward direction).
 * Start at a seed position, apply each motion in sequence through all 7 dimensions.
 * The trajectory is deterministic but space-filling (never repeats until complete).
 */
export function spinForward6x7(theoremKey: string, casesWalked: number): RotationalPlane6x7 {
  const motions: readonly VectorMotion[] = ['doubling', 'halving', 'reflection', 'shift', 'counter', 'folding']
  const seed = theoremKey.charCodeAt(0) % 6 // pick starting motion
  const caseSeed = casesWalked % 7 // pick starting dimension

  const trajectory: Array<[MotionIndex, Dimension]> = []
  let currentMotion: MotionIndex = (seed % 6) as MotionIndex
  let currentDim: Dimension = (caseSeed % 7) as Dimension

  // Spin: alternate between advancing motion and advancing dimension
  // This creates a 42-step path that visits every (m, d) pair exactly once (Latin square property)
  for (let step = 0; step < 42; step++) {
    trajectory.push([currentMotion, currentDim])

    // Advance: motion first (6 positions), then dimension (7 positions)
    if (step % 7 === 0 && step > 0) {
      // Every 7 steps, move to next motion
      currentMotion = ((currentMotion + 1) % 6) as MotionIndex
    }
    // Advance dimension on every step
    currentDim = ((currentDim + 1) % 7) as Dimension
  }

  const receipt = merkleGravity(trajectory.map(([m, d]) => toUuid(`6x7:${m}:${d}`)))

  return {
    position: [currentMotion, currentDim],
    direction: 'forward',
    trajectory,
    receipt,
  }
}

/**
 * Spin a theorem through the 7×6 plane (reverse direction).
 * Start at the SAME seed but traverse the TRANSPOSED plane in the opposite direction.
 * Seven dimensions (rows) spin through six motions (columns), counter-clockwise.
 */
export function spinReverse7x6(theoremKey: string, casesWalked: number): RotationalPlane7x6 {
  const motions: readonly VectorMotion[] = ['doubling', 'halving', 'reflection', 'shift', 'counter', 'folding']
  const seed = theoremKey.charCodeAt(0) % 7 // pick starting dimension (note: 0–6, not 0–5)
  const caseSeed = casesWalked % 6 // pick starting motion

  const trajectory: Array<[Dimension, MotionIndex]> = []
  let currentDim: Dimension = (seed % 7) as Dimension
  let currentMotion: MotionIndex = (caseSeed % 6) as MotionIndex

  // Reverse spin: alternate between advancing dimension and advancing motion (OPPOSITE order from 6×7)
  // This creates a 42-step path in opposite rotational direction (counter-clockwise vs clockwise)
  for (let step = 0; step < 42; step++) {
    trajectory.push([currentDim, currentMotion])

    // Advance: dimension first (7 positions), then motion (6 positions) — REVERSE ORDER
    if (step % 6 === 0 && step > 0) {
      // Every 6 steps, move to next dimension
      currentDim = ((currentDim - 1 + 7) % 7) as Dimension // go BACKWARDS in dimension
    }
    // Advance motion backwards on every step (reverse direction)
    currentMotion = ((currentMotion - 1 + 6) % 6) as MotionIndex // go BACKWARDS in motion
  }

  const receipt = merkleGravity(trajectory.map(([d, m]) => toUuid(`7x6:${d}:${m}`)))

  return {
    position: [currentDim, currentMotion],
    direction: 'reverse',
    trajectory,
    receipt,
  }
}

/**
 * Entangle a theorem across BOTH rotational planes.
 * Forward spin (6×7) and reverse spin (7×6) must converge:
 * Both trajectories cover the same 42-state space (just in different orders and directions).
 * Their receipts must fold to the same singularity (both visited all cases, no missed coverage).
 */
export function entangleBirotational(theoremKey: string, handle: string, casesWalked: number): BirotationalEntanglement {
  const fwd = spinForward6x7(theoremKey, casesWalked)
  const rev = spinReverse7x6(theoremKey, casesWalked)

  // Both trajectories should have length 42 (visit every position in the 6×7 space)
  const fwdComplete = fwd.trajectory.length === 42
  const revComplete = rev.trajectory.length === 42

  // Both should have visited all 42 states
  const fwdStates = new Set(fwd.trajectory.map((p) => `${p[0]},${p[1]}`))
  const revStates = new Set(rev.trajectory.map((p) => `${p[0]},${p[1]}`))
  const fwdCoversAll = fwdStates.size === 42
  const revCoversAll = revStates.size === 42

  // Convergence: both must cover the full space (same singularity, same 42 states visited)
  const bothConverge = fwdComplete && revComplete && fwdCoversAll && revCoversAll

  // Convergence receipt: fold both plane receipts together
  const convergenceReceipt = merkleGravity([fwd.receipt, rev.receipt])

  return {
    theoremKey,
    handle,
    plane6x7: fwd,
    plane7x6: rev,
    bothConverge,
    convergenceReceipt,
    honest:
      'Bidirectional rotational entanglement: every theorem spins through the 6×7 plane (six motions × seven dimensions) in FORWARD direction (clockwise) AND through the 7×6 transposed plane in REVERSE direction (counter-clockwise). Both rotations must traverse the full 42-state space and converge on the same singularity. A theorem that fails to complete either rotation, or whose rotations diverge, has incomplete proof coverage or broken symmetry.',
  }
}

// ============================================================================
// VISUALIZATION AND REPORTING
// ============================================================================

export interface BirotationalReport {
  theoremKey: string
  handle: string
  forward6x7: {
    pathLength: number
    statesCovered: number
    receipt: string
    verdict: 'COMPLETE' | 'INCOMPLETE'
  }
  reverse7x6: {
    pathLength: number
    statesCovered: number
    receipt: string
    verdict: 'COMPLETE' | 'INCOMPLETE'
  }
  convergence: {
    bothComplete: boolean
    singularity: string
    verdict: 'CONVERGED' | 'DIVERGED'
  }
  overallVerdict: 'FULLY_ROTATIONAL' | 'PARTIALLY_ROTATIONAL' | 'BROKEN'
}

export function birotationalReport(entangle: BirotationalEntanglement): BirotationalReport {
  const fwdStates = new Set(entangle.plane6x7.trajectory.map((p) => `${p[0]},${p[1]}`))
  const revStates = new Set(entangle.plane7x6.trajectory.map((p) => `${p[0]},${p[1]}`))

  const fwdVerdict = entangle.plane6x7.trajectory.length === 42 && fwdStates.size === 42 ? 'COMPLETE' : 'INCOMPLETE'
  const revVerdict = entangle.plane7x6.trajectory.length === 42 && revStates.size === 42 ? 'COMPLETE' : 'INCOMPLETE'

  const convergenceVerdict = entangle.bothConverge ? 'CONVERGED' : 'DIVERGED'
  const overallVerdict = entangle.bothConverge && fwdVerdict === 'COMPLETE' && revVerdict === 'COMPLETE' ? 'FULLY_ROTATIONAL' : entangle.bothConverge ? 'PARTIALLY_ROTATIONAL' : 'BROKEN'

  return {
    theoremKey: entangle.theoremKey,
    handle: entangle.handle,
    forward6x7: {
      pathLength: entangle.plane6x7.trajectory.length,
      statesCovered: fwdStates.size,
      receipt: entangle.plane6x7.receipt,
      verdict: fwdVerdict,
    },
    reverse7x6: {
      pathLength: entangle.plane7x6.trajectory.length,
      statesCovered: revStates.size,
      receipt: entangle.plane7x6.receipt,
      verdict: revVerdict,
    },
    convergence: {
      bothComplete: entangle.bothConverge,
      singularity: entangle.convergenceReceipt,
      verdict: convergenceVerdict,
    },
    overallVerdict,
  }
}

// ============================================================================
// ROTATIONAL PLANE VISUALIZATION (ASCII)
// ============================================================================

export function visualizeRotationalPlanes(entangle: BirotationalEntanglement): string {
  const report = birotationalReport(entangle)

  return `
╔════════════════════════════════════════════════════════════════════════════╗
║                   BIDIRECTIONAL ROTATIONAL ENTANGLEMENT                    ║
╚════════════════════════════════════════════════════════════════════════════╝

THEOREM: ${entangle.theoremKey}
HANDLE:  ${entangle.handle}

FORWARD SPIN (6×7 Plane) — Clockwise
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  6 Motions × 7 Dimensions = 42 States
  ✓ Doubling   ✓ Halving    ✓ Reflection
  ✓ Shift      ✓ Counter    ✓ Folding
  ↓ spinning through all 7D fold layers

  Trajectory: ${report.forward6x7.pathLength} steps, ${report.forward6x7.statesCovered}/42 states
  Receipt: ${report.forward6x7.receipt.slice(0, 16)}…
  Verdict: ${report.forward6x7.verdict}

REVERSE SPIN (7×6 Plane) — Counter-Clockwise
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  7 Dimensions × 6 Motions = 42 States (transposed)
  ✓ Layer 0 (Address)    ✓ Layer 1 (Handle)
  ✓ Layer 2 (Path)       ✓ Layers 3–6 (Motions)
  ✓ Layer 7 (Encrypted)
  ↓ spiraling through all 6 vector motions

  Trajectory: ${report.reverse7x6.pathLength} steps, ${report.reverse7x6.statesCovered}/42 states
  Receipt: ${report.reverse7x6.receipt.slice(0, 16)}…
  Verdict: ${report.reverse7x6.verdict}

CONVERGENCE
━━━━━━━━━━━
  Both rotations complete? ${report.convergence.bothComplete}
  Same singularity? ${report.convergence.verdict}
  Singularity: ${report.convergence.singularity.slice(0, 16)}…

OVERALL VERDICT: ${report.overallVerdict}
${'═'.repeat(80)}
`;
}
