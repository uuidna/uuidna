// @non-harmonic: the grader's kernel runs `lean` as a child process and reads process.env to hand it only what it needs to start — the host boundary of the school-grade workflow's kernel job; the grading it serves (proof/, queue/) is pure.
//
// school/grade/kernel — the grader's kernel on the host: the shared probe (src/kernel-probe.ts) bound to the lesson
// file in a private temp directory, a 60 s wall-clock budget, a heap ceiling, and an environment carrying only what
// `lean` needs to start — the runner's GITHUB_* and ACTIONS_* variables never reach learner-written code.
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { probeLean } from '../../../kernel-probe.js'
import type { Probe } from '../proof/index.js'

export const KERNEL_BUDGET_MS = 60000
export const KERNEL_MEMORY_MB = 4096
const LEAN_ENV_KEYS = ['PATH', 'HOME', 'ELAN_HOME', 'LANG'] as const

export function leanEnv(from: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {}
  for (const k of LEAN_ENV_KEYS) if (from[k] !== undefined) env[k] = from[k]
  return env
}

/** kernelPresent() → false when `lean` does not start; an absent kernel voids a run, it never refuses a proof */
export function kernelPresent(): boolean {
  try { execFileSync('lean', ['--version'], { stdio: 'pipe', env: leanEnv() }); return true } catch { return false }
}

/** kernelProbe(dir) → the Probe the grader uses, writing each lesson file to dir/Lesson.lean */
export function kernelProbe(dir: string): Probe {
  return (lean, key) => probeLean(lean, key, join(dir, 'Lesson.lean'), {
    cwd: dir, timeoutMs: KERNEL_BUDGET_MS, memoryMb: KERNEL_MEMORY_MB, env: leanEnv(), hide: [dir],
  })
}
