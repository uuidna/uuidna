// harmony — THE TWO RULES, ON ANY SOURCE, PURE.
//
// The repo scanner (scripts/harmonic-scan.ts) walks this tree. This module is the same instrument pointed at a
// CALLER'S text: any TypeScript, any project, any use case. Named `@non-harmonic` boundaries stay named; Math.*,
// wall-clock and RNG still settle no theorem. No filesystem — the host hands in a string.
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { merkleGravity } from './gravity/index.js'

export const HARMONIC_OPS: readonly [string, RegExp][] = [
  ['fetch', /\bfetch\s*\(/],
  ['async', /\basync\b/],
  ['await', /\bawait\b/],
  ['Promise', /\bnew Promise\b|\bPromise\s*\.\s*(all|allSettled|race|any|resolve|reject)\b/],
  ['timer', /\bset(Timeout|Interval)\s*\(/],
  ['process', /(?<![-\w])process\s*\.\s*[a-z]/],
  ['eval', /\beval\s*\(|\bnew Function\s*\(/],
]

export const MATH_CALL = /\bMath\s*\.\s*[a-zA-Z]/
export const WALLCLOCK = /\b(?:Date\s*\.\s*now|new\s+Date|performance\s*\.\s*now|process\s*\.\s*hrtime|crypto\s*\.\s*getRandomValues)\b/

export const stripCommentLines = (s: string): string =>
  s.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n')

export const looksLikeSource = (s: string): boolean =>
  /\b(?:function|import|export|const|let|class|interface|fetch\s*\(|Math\s*\.)\b/.test(s)

export interface SourceScan {
  declared: boolean
  ops: string[]
  math: boolean
  wallclock: boolean
  clean: boolean
  address: string
  handle: string
  receipt: string
}

/** scanSource(text) → the two harmonic rules on a pasted source. Same text, same receipt. */
export function scanSource(source: string): SourceScan {
  const declared = /@non-harmonic/.test(source)
  const ops = HARMONIC_OPS.filter(([, re]) => re.test(stripCommentLines(source))).map(([n]) => n)
  const math = MATH_CALL.test(source)
  const wallclock = WALLCLOCK.test(source)
  const undeclared = ops.length > 0 && !declared
  const stale = ops.length === 0 && declared
  const clean = !undeclared && !stale && !math && !wallclock
  const address = toUuid(source)
  return {
    declared, ops, math, wallclock, clean, address,
    handle: handleOf(address),
    receipt: merkleGravity([address, toUuid(ops.join(',')), toUuid(clean ? '1' : '0')]),
  }
}
