// @non-harmonic: the grader's kernel runs `lean` as a child process and reads process.env to hand it only what it needs to start — the host boundary of the school-grade workflow's kernel job; the grading it serves (proof/, queue/) is pure.
//
// school/grade/kernel — the grader's kernel on the host: the shared probe (src/kernel-probe.ts) bound to the lesson
// file in a private temp directory, a 60 s wall-clock budget, a heap ceiling, and an environment carrying only what
// `lean` needs to start — the runner's GITHUB_* and ACTIONS_* variables never reach learner-written code.
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { probeLean } from '../../../kernel-probe.js'
import { rdRoot } from '../../../boundary.js'
import type { Probe } from '../proof/index.js'

const KERNEL_BUDGET_MS = 60000
const KERNEL_MEMORY_MB = 4096
const LEAN_ENV_KEYS = ['PATH', 'HOME', 'ELAN_HOME', 'LANG', 'ELAN_TOOLCHAIN'] as const

// THE TOOLCHAIN IS THE REPOSITORY'S PIN, NAMED TO elan RATHER THAN FOUND BY DIRECTORY. elan picks a toolchain from the
// lean-toolchain file above the working directory, and the probe runs in a private temp directory with none above it,
// so it fell back to elan's default: on a host with no default set (a fresh install, 2026-11-24) every lesson came
// back "no default toolchain configured", while kernelPresent, run from the repository, said lean was there. The pin
// is read from the file it lives in and handed over as ELAN_TOOLCHAIN, so the grader's kernel is the ledger's kernel.
const PINNED_TOOLCHAIN = ((): string | undefined => {
  try { return rdRoot('lean-toolchain').trim() || undefined } catch { return undefined }
})()

export function leanEnv(from: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {}
  for (const k of LEAN_ENV_KEYS) if (from[k] !== undefined) env[k] = from[k]
  if (env.ELAN_TOOLCHAIN === undefined && PINNED_TOOLCHAIN !== undefined) env.ELAN_TOOLCHAIN = PINNED_TOOLCHAIN
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
